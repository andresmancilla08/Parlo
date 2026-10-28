"use client";

import { apiFetch, NotSignedInError } from "@/lib/api-client";
import { MIC_PROCESSOR, micWorkletUrl } from "./mic-worklet";
import {
  base64ToBytes,
  bytesToBase64,
  ChunkBuffer,
  Downsampler,
  floatToPcm16,
  meterLevel,
  OUTPUT_RATE,
  pcm16ToFloat,
  rms,
} from "./pcm";
import { CALL_START_CUE } from "./prompt";
import {
  audioMessage,
  audioStreamEndMessage,
  liveSocketUrl,
  parseServerMessage,
  setupMessage,
  textTurnMessage,
  type LiveEvent,
  type LiveLevel,
} from "./protocol";
import { addFragment, closeTurn, EMPTY_TRANSCRIPT, type Transcript } from "./transcript";

// Sesión de llamada con Gemini Live desde el navegador: micro → WebSocket →
// altavoz. El estado se publica con `onChange` (instantáneas inmutables, para
// React) y el nivel de audio con `onLevel` en cada frame (para escribirlo en el
// DOM sin re-renderizar).

export type CallStatus = "idle" | "connecting" | "listening" | "speaking" | "reconnecting" | "ended" | "error";

export type CallErrorKind =
  | "mic_denied"
  | "no_mic"
  | "unsupported"
  | "network"
  | "session"
  | "busy"
  | "rate"
  | "daily"
  | "generic";

export type CallError = { kind: CallErrorKind; until?: number };

export type CallSnapshot = {
  status: CallStatus;
  error: CallError | null;
  transcript: Transcript;
  muted: boolean;
  /** Epoch ms del descuelgue (cuando el servidor confirma la sesión). */
  startedAt: number | null;
  endedAt: number | null;
  /** La llamada se cortó por el tope de duración, no porque colgara el usuario. */
  hitTimeLimit: boolean;
};

/** Tope de una llamada: protege la cuota gratuita y la batería. */
export const MAX_CALL_MS = 15 * 60_000;
/** ~100 ms de audio a 16 kHz/16 bits por mensaje (lo que sugieren los ejemplos). */
const CHUNK_BYTES = 3200;
const RECONNECT_DELAYS = [0, 1000, 2500, 5000];
/** Margen para encolar audio: evita el «clic» de empezar justo en `currentTime`. */
const LEAD_S = 0.05;

/** ¿Este navegador puede hacer la llamada? (sin pedir permisos). */
export function liveSupported(): boolean {
  if (typeof window === "undefined") return false;
  return (
    typeof window.AudioContext === "function" &&
    typeof window.AudioWorkletNode === "function" &&
    typeof WebSocket === "function" &&
    typeof navigator.mediaDevices?.getUserMedia === "function"
  );
}

class CallFailure extends Error {
  constructor(readonly info: CallError) {
    super(info.kind);
  }
}

async function tokenError(res: Response): Promise<CallError> {
  if (res.status === 401) return { kind: "session" };
  const body = (await res.json().catch(() => ({}))) as { error?: string; retryAfter?: number };
  if (res.status === 429 || res.status === 503) {
    if (body.error === "daily_limit") return { kind: "daily" };
    const seconds = Number(res.headers.get("retry-after")) || body.retryAfter || 30;
    const until = Date.now() + seconds * 1000;
    return { kind: body.error === "rate_limited" ? "rate" : "busy", until };
  }
  return { kind: "generic" };
}

/** Cierre del WebSocket por cuota agotada (Live lo comunica en el `reason`). */
function quotaClose(ev: CloseEvent): boolean {
  return /quota|RESOURCE_EXHAUSTED|rate limit/i.test(ev.reason);
}

export class LiveCall {
  private snap: CallSnapshot = {
    status: "idle",
    error: null,
    transcript: EMPTY_TRANSCRIPT,
    muted: false,
    startedAt: null,
    endedAt: null,
    hitTimeLimit: false,
  };

  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private mic: AudioWorkletNode | null = null;
  private micSource: MediaStreamAudioSourceNode | null = null;
  private outGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private down: Downsampler | null = null;
  private chunks = new ChunkBuffer(CHUNK_BYTES);

  private ws: WebSocket | null = null;
  private ready = false; // setupComplete recibido en la conexión actual
  private handle: string | null = null;
  private greeted = false;
  private ending = false;
  private sentStreamEnd = false;

  private sources = new Set<AudioBufferSourceNode>();
  private playhead = 0;
  private inputLevel = 0;
  private raf = 0;
  private swapTimer: ReturnType<typeof setTimeout> | null = null;
  private swapPending = false;
  private limitTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly opts: {
      scenario: string | null;
      level: LiveLevel;
      onChange: (snap: CallSnapshot) => void;
      onLevel?: (level: number) => void;
    },
  ) {}

  get snapshot(): CallSnapshot {
    return this.snap;
  }

  private set(patch: Partial<CallSnapshot>) {
    this.snap = { ...this.snap, ...patch };
    this.opts.onChange(this.snap);
  }

  /**
   * Descuelga. Hay que llamarlo DENTRO del gesto del usuario: el AudioContext
   * se crea y se reanuda antes del primer `await` (iOS no deja sonar audio
   * creado fuera de un toque).
   */
  async start(): Promise<void> {
    if (this.snap.status !== "idle") return;
    if (!liveSupported()) {
      this.fail({ kind: "unsupported" });
      return;
    }
    this.set({ status: "connecting" });
    const ctx = new AudioContext();
    this.ctx = ctx;
    const resumed = ctx.resume();
    // iOS 16.4+: sin esto, con el micro abierto la voz sale por el auricular
    // y apenas se oye. En el resto no existe y no pasa nada.
    try {
      const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
      if (session) session.type = "play-and-record";
    } catch {
      /* no disponible */
    }

    try {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
        });
      } catch (err) {
        const name = (err as DOMException)?.name;
        throw new CallFailure({
          kind:
            name === "NotFoundError" || name === "OverconstrainedError"
              ? "no_mic"
              : name === "NotAllowedError" || name === "SecurityError"
                ? "mic_denied"
                : "generic",
        });
      }
      // Colgó mientras el navegador pedía permiso: se suelta el micro ya.
      if (this.ending) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      this.stream = stream;
      await resumed;

      const url = micWorkletUrl();
      try {
        await ctx.audioWorklet.addModule(url);
      } catch {
        throw new CallFailure({ kind: "unsupported" });
      } finally {
        URL.revokeObjectURL(url);
      }
      if (this.ending) return;

      this.down = new Downsampler(ctx.sampleRate);
      this.micSource = ctx.createMediaStreamSource(this.stream);
      // Con salida conectada a un nodo mudo: Safari no ejecuta `process` en un
      // worklet que no acaba en el destino.
      this.mic = new AudioWorkletNode(ctx, MIC_PROCESSOR, { numberOfInputs: 1, numberOfOutputs: 1, channelCount: 1 });
      const sink = ctx.createGain();
      sink.gain.value = 0;
      this.micSource.connect(this.mic).connect(sink).connect(ctx.destination);
      this.mic.port.onmessage = (e: MessageEvent<Float32Array>) => this.onMicChunk(e.data);

      this.outGain = ctx.createGain();
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.outGain.connect(this.analyser).connect(ctx.destination);
      this.meterLoop();

      await this.connect();
    } catch (err) {
      this.fail(err instanceof CallFailure ? err.info : err instanceof NotSignedInError ? { kind: "session" } : { kind: "network" });
    }
  }

  /** Cuelga y libera micro, socket y contexto de audio. Idempotente. */
  hangup(): void {
    if (this.ending) return;
    this.ending = true;
    this.teardown();
    this.set({
      status: this.snap.status === "error" ? "error" : "ended",
      transcript: closeTurn(this.snap.transcript),
      endedAt: Date.now(),
    });
  }

  setMuted(muted: boolean): void {
    if (muted === this.snap.muted) return;
    this.set({ muted });
    if (muted) {
      // Lo que quedaba en el búfer se descarta: era el arranque de lo que el
      // usuario decidió no decir.
      this.chunks.flush();
      this.sendStreamEnd();
    }
  }

  /* ---------------- conexión ---------------- */

  private async fetchToken(): Promise<string> {
    let res: Response;
    try {
      res = await apiFetch("/api/live-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenario: this.opts.scenario, level: this.opts.level, handle: this.handle }),
      });
    } catch (err) {
      if (err instanceof NotSignedInError) throw new CallFailure({ kind: "session" });
      throw new CallFailure({ kind: "network" });
    }
    if (!res.ok) throw new CallFailure(await tokenError(res));
    const data = (await res.json()) as { token?: string };
    if (!data.token) throw new CallFailure({ kind: "generic" });
    return data.token;
  }

  /** Abre una conexión (la primera o una reanudación) y espera al `setupComplete`. */
  private async connect(): Promise<void> {
    const token = await this.fetchToken();
    if (this.ending) return;

    await new Promise<void>((resolve, reject) => {
      const ws = new WebSocket(liveSocketUrl(token));
      this.ws = ws;
      this.ready = false;
      let opened = false;

      ws.onopen = () => ws.send(setupMessage());
      ws.onmessage = async (ev) => {
        const raw = typeof ev.data === "string" ? ev.data : await (ev.data as Blob).text();
        for (const event of parseServerMessage(raw)) {
          if (event.type === "setupComplete" && !opened) {
            opened = true;
            resolve();
          }
          this.onEvent(event);
        }
      };
      ws.onclose = (ev) => {
        if (this.ws !== ws) return; // conexión vieja ya sustituida
        this.ws = null;
        this.ready = false;
        if (!opened) {
          reject(new CallFailure(quotaClose(ev) ? { kind: "busy", until: Date.now() + 60_000 } : { kind: "network" }));
          return;
        }
        if (this.ending) return;
        if (quotaClose(ev)) {
          this.fail({ kind: "busy", until: Date.now() + 60_000 });
          return;
        }
        // Corte inesperado (red, fin de la vida de la conexión): se reanuda.
        void this.reconnect();
      };
    });
  }

  private async reconnect(): Promise<void> {
    if (this.ending) return;
    this.clearSwap();
    this.set({ status: "reconnecting" });
    for (const delay of RECONNECT_DELAYS) {
      if (delay) await new Promise((r) => setTimeout(r, delay));
      if (this.ending) return;
      if (typeof navigator !== "undefined" && !navigator.onLine) continue;
      try {
        await this.connect();
        return;
      } catch (err) {
        // Sesión, cuota o tope diario: reintentar no lo arregla.
        if (err instanceof CallFailure && err.info.kind !== "network") {
          this.fail(err.info);
          return;
        }
      }
    }
    this.fail({ kind: "network" });
  }

  /** `goAway`: el servidor va a cerrar. Se cambia de conexión en una pausa. */
  private scheduleSwap(ms: number) {
    if (this.swapTimer) return;
    this.swapPending = true;
    if (this.sources.size === 0) {
      this.swap();
      return;
    }
    this.swapTimer = setTimeout(() => this.swap(), Math.max(0, ms - 1500));
  }

  private swap() {
    this.clearSwap();
    const old = this.ws;
    this.ws = null; // su onclose ya no cuenta como corte
    old?.close(1000);
    void this.reconnect();
  }

  private clearSwap() {
    if (this.swapTimer) clearTimeout(this.swapTimer);
    this.swapTimer = null;
    this.swapPending = false;
  }

  /* ---------------- eventos del servidor ---------------- */

  private onEvent(event: LiveEvent) {
    switch (event.type) {
      case "setupComplete":
        this.ready = true;
        this.sentStreamEnd = false;
        this.chunks.flush();
        if (!this.greeted) {
          // Primera conexión: que el personaje descuelgue y hable primero.
          this.greeted = true;
          this.ws?.send(textTurnMessage(CALL_START_CUE));
          this.limitTimer = setTimeout(() => {
            this.set({ hitTimeLimit: true });
            this.hangup();
          }, MAX_CALL_MS);
          this.set({ status: "listening", startedAt: Date.now() });
        } else {
          this.set({ status: this.sources.size ? "speaking" : "listening" });
        }
        break;
      case "audio":
        this.play(event.data);
        break;
      case "inputText":
        this.set({ transcript: addFragment(this.snap.transcript, "user", event.text) });
        break;
      case "outputText":
        this.set({ transcript: addFragment(this.snap.transcript, "assistant", event.text) });
        break;
      case "interrupted":
        // El usuario habló encima: se calla YA lo que quedaba en cola.
        this.stopPlayback();
        this.set({ transcript: closeTurn(this.snap.transcript), status: "listening" });
        break;
      case "turnComplete":
        this.set({ transcript: closeTurn(this.snap.transcript) });
        if (this.swapPending && this.sources.size === 0) this.swap();
        break;
      case "resumeHandle":
        this.handle = event.handle;
        break;
      case "goAway":
        this.scheduleSwap(event.ms);
        break;
      case "voiceStart":
      case "voiceEnd":
        break;
    }
  }

  /* ---------------- audio ---------------- */

  private onMicChunk(f32: Float32Array) {
    this.inputLevel = rms(f32);
    if (!this.down || !this.ready || !this.ws || this.snap.muted) return;
    const pcm = floatToPcm16(this.down.push(f32));
    for (const block of this.chunks.push(pcm)) {
      if (this.ws.readyState !== WebSocket.OPEN) return;
      this.ws.send(audioMessage(bytesToBase64(block)));
      this.sentStreamEnd = false;
    }
  }

  private sendStreamEnd() {
    if (this.sentStreamEnd || !this.ready || this.ws?.readyState !== WebSocket.OPEN) return;
    this.ws.send(audioStreamEndMessage());
    this.sentStreamEnd = true;
  }

  /** Encola un trozo de 24 kHz justo detrás del anterior: sin huecos ni solapes. */
  private play(base64: string) {
    const ctx = this.ctx;
    if (!ctx || !this.outGain || ctx.state === "closed") return;
    const samples = pcm16ToFloat(base64ToBytes(base64));
    if (samples.length === 0) return;
    const buffer = ctx.createBuffer(1, samples.length, OUTPUT_RATE);
    buffer.getChannelData(0).set(samples);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this.outGain);
    const at = Math.max(ctx.currentTime + LEAD_S, this.playhead);
    src.start(at);
    this.playhead = at + buffer.duration;
    this.sources.add(src);
    src.onended = () => {
      this.sources.delete(src);
      if (this.sources.size === 0 && this.snap.status === "speaking") {
        this.set({ status: "listening" });
        if (this.swapPending) this.swap();
      }
    };
    if (this.snap.status === "listening") this.set({ status: "speaking" });
  }

  private stopPlayback() {
    for (const src of this.sources) {
      src.onended = null;
      try {
        src.stop();
      } catch {
        /* ya parado */
      }
    }
    this.sources.clear();
    this.playhead = 0;
  }

  private meterLoop = () => {
    const analyser = this.analyser;
    if (!analyser || this.ending) return;
    const data = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(data);
    const out = rms(data);
    const value = this.snap.status === "speaking" ? out : this.snap.muted ? 0 : this.inputLevel;
    this.opts.onLevel?.(meterLevel(value));
    this.raf = requestAnimationFrame(this.meterLoop);
  };

  /* ---------------- cierre ---------------- */

  private fail(error: CallError) {
    if (this.snap.status === "error") return;
    this.set({ status: "error", error });
    this.hangup();
  }

  private teardown() {
    cancelAnimationFrame(this.raf);
    this.clearSwap();
    if (this.limitTimer) clearTimeout(this.limitTimer);
    this.stopPlayback();
    const ws = this.ws;
    this.ws = null;
    if (ws && ws.readyState <= WebSocket.OPEN) ws.close(1000);
    if (this.mic) this.mic.port.onmessage = null;
    this.mic?.disconnect();
    this.micSource?.disconnect();
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    void this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.opts.onLevel?.(0);
  }
}
