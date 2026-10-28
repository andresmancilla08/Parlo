"use client";

import { NativeSpeech, type NativeSpeechEvent } from "@/lib/native";
import type { Recognition, RecognitionEvent } from "@/lib/dictation";

// Reconocimiento de voz de la APK: el WebView de Android no trae
// SpeechRecognition, así que se usa el del sistema a través del plugin
// `ParloSpeech`. Esta clase se comporta como la de la Web Speech API
// (`lang`, `interimResults`, `start/stop/abort`, `onresult/onerror/onend`…),
// de modo que el dictado, manos libres, «Dilo tú» y Pronunciación no cambian.
//
// Diferencia con Chrome: el reconocedor de Android escucha UNA frase y se
// cierra solo al detectar silencio. En `continuous` (manos libres) eso ya lo
// cubre `useHandsFree`, que reabre el micro en `onend`.

/** Instancias vivas por sesión: los eventos del plugin llegan todos juntos. */
const live = new Map<string, NativeRecognition>();
let subscribed: Promise<unknown> | null = null;
let counter = 0;

function subscribe() {
  subscribed ??= NativeSpeech.addListener("speech", (e) => live.get(e.session)?.handle(e)).catch(() => {
    subscribed = null;
  });
  return subscribed;
}

function event(text: string, isFinal: boolean): RecognitionEvent {
  const result = Object.assign([{ transcript: text }], { isFinal });
  return { resultIndex: 0, results: [result] };
}

export class NativeRecognition implements Recognition {
  lang = "en-US";
  continuous = false;
  interimResults = false;
  onresult: ((e: RecognitionEvent) => void) | null = null;
  onerror: ((e: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  onspeechstart: (() => void) | null = null;
  onstart: (() => void) | null = null;

  private session = "";
  /** `start` aún no llegó al plugin (espera a la suscripción). */
  private pending = false;
  /** Se pidió parar antes de que `start` llegara al plugin. */
  private cancelled = false;

  start() {
    if (this.session) throw new Error("InvalidStateError: already started");
    this.session = `s${Date.now().toString(36)}${counter++}`;
    live.set(this.session, this);
    const session = this.session;
    this.pending = true;
    this.cancelled = false;
    void subscribe()
      .then(() => {
        this.pending = false;
        if (this.cancelled) {
          // Cortado antes de empezar: no se abre el micro.
          this.handle({ session, type: "end" });
          return;
        }
        return NativeSpeech.start({ session, lang: this.lang, interimResults: this.interimResults });
      })
      .catch(() => {
        // El puente falló (APK sin el plugin, etc.): se cierra como un fallo.
        this.handle({ session, type: "error", error: "service-not-allowed" });
        this.handle({ session, type: "end" });
      });
  }

  stop() {
    if (!this.session) return;
    if (this.pending) this.cancelled = true;
    else void NativeSpeech.stop({ session: this.session }).catch(() => {});
  }

  abort() {
    if (!this.session) return;
    if (this.pending) this.cancelled = true;
    else void NativeSpeech.abort({ session: this.session }).catch(() => {});
  }

  /** Evento del plugin para esta sesión. */
  handle(e: NativeSpeechEvent) {
    if (e.session !== this.session) return;
    switch (e.type) {
      case "start":
        this.onstart?.();
        break;
      case "speechstart":
        this.onspeechstart?.();
        break;
      case "result":
        if (e.text) this.onresult?.(event(e.text, e.final === true));
        break;
      case "error":
        this.onerror?.({ error: e.error ?? "failed" });
        break;
      case "end":
        live.delete(this.session);
        this.session = "";
        this.onend?.();
        break;
    }
  }
}
