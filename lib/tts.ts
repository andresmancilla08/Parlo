"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { hasSession, idToken, NotSignedInError } from "@/lib/api-client";

/** Igual que `TOKEN_HEADER` de `lib/api-guard.ts` (ese módulo es de servidor). */
const TOKEN_HEADER = "x-parlo-token";

// Voz (Web Speech API). Es gratis, pero la calidad depende MUCHO de qué voz
// use el sistema: por defecto el navegador suele coger una compacta que suena
// metálica. Aquí se puntúan las voces instaladas para elegir la mejor y el
// usuario puede fijar la suya en el perfil.

/** Voces buenas: las «premium/enhanced/neural» son las de calidad de estudio. */
const GREAT = /premium|enhanced|neural|natural|siri|studio|journey|wavenet/i;
/** Voces de juguete o comprimidas de macOS: suenan fatal leyendo inglés. */
const AWFUL =
  /compact|albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|kathy|ralph|princess|grandma|grandpa|rocko|shelley|sandy|flo|eddy|reed|rishi/i;

export function scoreVoice(v: SpeechSynthesisVoice): number {
  let s = 0;
  if (GREAT.test(v.name)) s += 100;
  if (AWFUL.test(v.name)) s -= 120;
  if (/^google/i.test(v.name)) s += 70; // las de Chrome son de red y suenan bien
  if (/^microsoft/i.test(v.name)) s += 40;
  if (!v.localService) s += 25; // servidor ⇒ modelo más grande
  if (/^en-(us|gb)$/i.test(v.lang.replace("_", "-"))) s += 15;
  if (v.default) s += 5;
  return s;
}

/* ---------------- inventario de voces (store externo) ---------------- */

const EMPTY: SpeechSynthesisVoice[] = [];
let voices: SpeechSynthesisVoice[] = EMPTY;
const listeners = new Set<() => void>();

function synth(): SpeechSynthesis | null {
  return typeof window !== "undefined" && "speechSynthesis" in window
    ? window.speechSynthesis
    : null;
}

function refresh() {
  const next = synth()?.getVoices() ?? EMPTY;
  // Sólo se publica si cambió de verdad: `getSnapshot` debe ser estable.
  const same =
    next.length === voices.length && next.every((v, i) => v.name === voices[i]?.name);
  if (same) return;
  voices = next;
  for (const l of listeners) l();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const s = synth();
  refresh();
  s?.addEventListener("voiceschanged", refresh);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) s?.removeEventListener("voiceschanged", refresh);
  };
}

/** Voces del idioma pedido, de mejor a peor. */
export function voicesFor(lang: "en" | "es", all = voices): SpeechSynthesisVoice[] {
  return all
    .filter((v) => v.lang.toLowerCase().startsWith(lang))
    .sort((a, b) => scoreVoice(b) - scoreVoice(a));
}

/** Hook: lista ordenada de voces del idioma (se rellena al cargarlas). */
export function useVoices(lang: "en" | "es"): SpeechSynthesisVoice[] {
  const all = useSyncExternalStore(
    subscribe,
    () => voices,
    () => EMPTY,
  );
  return voicesFor(lang, all);
}

/* ---------------- preferencia del usuario ---------------- */

type VoiceState = { name: string | null; setVoice: (name: string | null) => void };

export const useVoicePref = create<VoiceState>()(
  persist(
    (set) => ({ name: null, setVoice: (name) => set({ name }) }),
    { name: "parlo-voice", storage: createJSONStorage(() => localStorage) },
  ),
);

/* ---------------- hablar ---------------- */

/** Velocidad normal (algo por debajo de 1: se entiende mejor aprendiendo). */
export const RATE_NORMAL = 0.95;
/** Modo tortuga: palabra a palabra, para pillar los sonidos que se comen. */
export const RATE_SLOW = 0.55;

/**
 * Velocidad de lectura preferida (perfil). Se aplica a TODA la voz de la app
 * —neural y del dispositivo— salvo la tortuga, que siempre es `RATE_SLOW`.
 * La voz neural se acelera o frena en la reproducción: la URL no cambia y la
 * caché de la CDN sigue valiendo.
 */
export type SpeechSpeed = "slow" | "normal" | "fast";
export const SPEECH_RATES: Record<SpeechSpeed, number> = { slow: 0.8, normal: RATE_NORMAL, fast: 1.15 };

export const useSpeechSpeed = create<{ speed: SpeechSpeed; setSpeed: (s: SpeechSpeed) => void }>()(
  persist((set) => ({ speed: "normal", setSpeed: (speed) => set({ speed }) }), {
    name: "parlo-voice-speed",
    storage: createJSONStorage(() => localStorage),
  }),
);

/** Velocidad «normal» de este usuario (la que eligió en el perfil). */
export function preferredRate(): number {
  return SPEECH_RATES[useSpeechSpeed.getState().speed] ?? RATE_NORMAL;
}

/**
 * Lee `text`. Usa la voz elegida en el perfil; si no hay, la mejor puntuada.
 * `rate` baja a `RATE_SLOW` cuando se pulsa la tortuga.
 */
export function speak(
  text: string,
  lang: "en" | "es" = "en",
  rate = preferredRate(),
  /** `true` fuerza la voz del dispositivo (lo usa el propio respaldo). */
  device = false,
) {
  if (!text.trim()) return;

  if (!device && serverAvailable(text)) {
    // `speak` casi siempre nace de un toque: se aprovecha para desbloquear.
    unlockAudio();
    stopSpeaking();
    playServer(text, rate).catch(() => speak(text, lang, rate, true));
    return;
  }

  const s = synth();
  if (!s) return;
  refresh(); // en Chrome la lista llega tarde la primera vez
  s.cancel();

  const preferred = lang === "en" ? useVoicePref.getState().name : null;
  const list = voicesFor(lang);
  const chosen = preferred ? list.find((v) => v.name === preferred) : undefined;
  const voice = chosen ?? list[0] ?? null;

  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice?.lang ?? (lang === "en" ? "en-US" : "es-ES");
  u.rate = rate;
  u.pitch = 1;
  u.volume = 1;
  s.speak(u);
}

/* ---------------- voz neural del servidor ---------------- */

/**
 * Voz neural (`/api/tts`) en vez de la del dispositivo. Se usa en el LECTOR,
 * que es donde más se nota: en un móvil barato la voz del sistema suena
 * metálica y ahí se leen textos largos.
 *
 * Cada frase es siempre la misma URL, así que la CDN la cachea y la segunda
 * vez ni llega al servidor. Si algo falla (sin red, cuota agotada, 503 porque
 * no hay clave) se cae con red a Web Speech: nunca deja al usuario sin voz.
 */
export const useServerVoice = create<{ on: boolean; toggle: () => void }>()(
  persist((set) => ({ on: true, toggle: () => set((s) => ({ on: !s.on })) }), {
    name: "parlo-voice-server",
    storage: createJSONStorage(() => localStorage),
  }),
);

/** Frases más largas que esto las rechaza el endpoint: van por Web Speech. */
const SERVER_MAX_CHARS = 400;

let current: HTMLAudioElement | null = null;

/**
 * Cortafuegos: la cuota gratuita del modelo tiene un tope POR MINUTO, así que
 * en una ráfaga de clics algunas peticiones fallan. Tras un fallo se deja de
 * intentar un rato y se habla con la voz del dispositivo: es peor esperar a
 * una petición que ya sabemos que va a fallar que sonar algo peor.
 */
const COOLDOWN_MS = 5 * 60_000;
let serverDownUntil = 0;

function serverAvailable(text: string): boolean {
  return (
    useServerVoice.getState().on &&
    text.length <= SERVER_MAX_CHARS &&
    Date.now() >= serverDownUntil &&
    // /api/tts exige sesión: sin ella (landing, test de nivel) ni se intenta.
    hasSession()
  );
}

export function ttsUrl(text: string): string {
  return `/api/tts?t=${encodeURIComponent(text)}`;
}

/** Petición de audio en vuelo: se cancela si llega otra o se pide silencio. */
let inflight: AbortController | null = null;
/** Termina la promesa del audio que suena si se corta antes de acabar. */
let interrupt: (() => void) | null = null;

/** Corta lo que esté sonando, venga de donde venga (y vacía la cola de frases). */
export function stopSpeaking() {
  clearQueue();
  synth()?.cancel();
  inflight?.abort();
  inflight = null;
  if (current) {
    current.pause();
    current = null;
  }
  const finish = interrupt;
  interrupt = null;
  finish?.();
}

/**
 * Baja el WAV con el token en `x-parlo-token`. La URL sigue siendo la misma
 * para la misma frase, así que la caché del navegador y la de la CDN valen
 * igual que antes (ver `app/api/tts/route.ts`).
 */
async function fetchVoice(text: string, signal: AbortSignal): Promise<Blob> {
  const token = await idToken();
  const res = await fetch(ttsUrl(text), { headers: { [TOKEN_HEADER]: token }, signal });
  if (!res.ok) throw new Error(`tts ${res.status}`);
  return res.blob();
}

/**
 * Reproduce con la voz del servidor. Resuelve al terminar y RECHAZA si no se
 * puede (para que quien llama pueda tirar de Web Speech).
 */
async function playServer(text: string, rate: number): Promise<void> {
  const ctrl = new AbortController();
  inflight = ctrl;
  let blob: Blob;
  try {
    blob = await fetchVoice(text, ctrl.signal);
  } catch (err) {
    // Cancelado a propósito: ni cortafuegos ni respaldo, sólo silencio.
    if (ctrl.signal.aborted) return;
    if (!(err instanceof NotSignedInError)) serverDownUntil = Date.now() + COOLDOWN_MS;
    throw err;
  } finally {
    if (inflight === ctrl) inflight = null;
  }
  return playBlob(blob, rate);
}

/** Reproduce un WAV ya descargado en el `<audio>` compartido. */
function playBlob(blob: Blob, rate: number): Promise<void> {
  const src = URL.createObjectURL(blob);
  const audio = player();
  if (!audio) return Promise.reject(new Error("tts"));
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (err?: unknown) => {
      if (settled) return;
      settled = true;
      audio.onended = null;
      audio.onerror = null;
      if (current === audio) current = null;
      if (interrupt === stop) interrupt = null;
      URL.revokeObjectURL(src);
      if (err) reject(err);
      else resolve();
    };
    // Si alguien corta (stopSpeaking u otra frase), la promesa termina igual:
    // la lectura continua no se queda colgada esperando un `ended` que no llega.
    const stop = () => finish();
    interrupt = stop;
    current = audio;

    audio.src = src;
    // Cambiar `src` reinicia `playbackRate` a `defaultPlaybackRate`: se fijan
    // los dos. El servidor devuelve la frase a velocidad normal; la tortuga se
    // consigue bajando la reproducción, que además no cambia la URL cacheada.
    audio.defaultPlaybackRate = rate / RATE_NORMAL;
    audio.playbackRate = rate / RATE_NORMAL;
    audio.preservesPitch = true;
    audio.onended = () => finish();
    audio.onerror = () => {
      serverDownUntil = Date.now() + COOLDOWN_MS;
      finish(new Error("tts"));
    };
    audio.play().catch((err: unknown) => {
      // `NotAllowedError` = el navegador exige un toque antes de sonar (iOS,
      // autoplay). El servidor está bien: NO se activa el cortafuegos, o una
      // sola respuesta leída sin gesto apagaba la voz neural 5 min en toda la app.
      if (isAutoplayBlock(err)) return finish(new AutoplayBlockedError());
      // Otro corte nuestro (pausa, nueva frase) llega como AbortError: silencio.
      if (err instanceof DOMException && err.name === "AbortError") return finish();
      serverDownUntil = Date.now() + COOLDOWN_MS;
      finish(err);
    });
  });
}

/* ---------------- autoplay (iOS y compañía) ---------------- */

/** El navegador no deja sonar sin un toque previo del usuario. */
export class AutoplayBlockedError extends Error {}

function isAutoplayBlock(err: unknown): boolean {
  return err instanceof DOMException && err.name === "NotAllowedError";
}

/**
 * UN solo `<audio>` para toda la voz neural. iOS sólo deja reproducir sin
 * gesto a un elemento que ya sonó dentro de un gesto; con un `new Audio()` por
 * frase cada respuesta del tutor (que llega tras un `await`) nacía bloqueada.
 */
let shared: HTMLAudioElement | null = null;
let unlocked = false;

function player(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  shared ??= new Audio();
  return shared;
}

/** WAV de 50 ms de silencio, para «estrenar» el elemento dentro de un toque. */
function silentWav(): string {
  const samples = 400; // 50 ms a 8 kHz, 8 bits
  const buf = new ArrayBuffer(44 + samples);
  const v = new DataView(buf);
  const str = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, "RIFF");
  v.setUint32(4, 36 + samples, true);
  str(8, "WAVE");
  str(12, "fmt ");
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, 8000, true);
  v.setUint32(28, 8000, true);
  v.setUint16(32, 1, true);
  v.setUint16(34, 8, true);
  str(36, "data");
  v.setUint32(40, samples, true);
  new Uint8Array(buf, 44).fill(128); // 128 = silencio en PCM de 8 bits
  let bin = "";
  new Uint8Array(buf).forEach((b) => (bin += String.fromCharCode(b)));
  return `data:audio/wav;base64,${btoa(bin)}`;
}

/**
 * Llamar DENTRO de un toque (Enviar, micro, altavoz): reproduce un silencio en
 * el elemento compartido para que después pueda sonar sin gesto. Es inocuo
 * llamarlo de más: sólo actúa la primera vez y nunca corta lo que suena.
 */
export function unlockAudio() {
  if (unlocked) return;
  const audio = player();
  if (!audio || current === audio) return;
  audio.src = silentWav();
  audio
    .play()
    .then(() => {
      unlocked = true;
    })
    .catch(() => {
      // Sin gesto válido: se intentará en el siguiente toque.
    });
}

/**
 * Lectura automática (respuesta del tutor): devuelve `false` si el navegador la
 * bloqueó por falta de gesto, para que la pantalla ofrezca «Toca para oír».
 * Cualquier otro fallo cae, como siempre, a la voz del dispositivo.
 */
export async function speakAuto(text: string, lang: "en" | "es" = "en"): Promise<boolean> {
  if (!text.trim()) return true;
  const rate = preferredRate();
  if (!serverAvailable(text)) {
    speak(text, lang, rate, true);
    return true;
  }
  stopSpeaking();
  try {
    await playServer(text, rate);
    return true;
  } catch (err) {
    if (err instanceof AutoplayBlockedError) return false;
    speak(text, lang, rate, true);
    return true;
  }
}

/**
 * Lee y espera a que termine, para poder encadenar frases (lectura continua).
 * Intenta la voz neural y, si no puede, la del dispositivo.
 */
export async function speakAndWait(
  text: string,
  lang: "en" | "es" = "en",
  rate = preferredRate(),
): Promise<void> {
  if (!text.trim()) return;
  if (serverAvailable(text)) {
    stopSpeaking();
    try {
      await playServer(text, rate);
      return;
    } catch {
      // Sigue con la voz del dispositivo.
    }
  }
  await deviceAndWait(text, lang, rate);
}

/** Voz del dispositivo, esperando a que termine. */
function deviceAndWait(text: string, lang: "en" | "es", rate: number): Promise<void> {
  return new Promise<void>((resolve) => {
    speak(text, lang, rate, true);
    const s = synth();
    if (!s) return resolve();
    // Chrome tarda un instante en marcar `speaking`: sin este margen, el
    // primer sondeo veía «nada sonando» y daba la frase por terminada.
    let grace = 1;
    const done = () => {
      clearInterval(check);
      deviceWaiters.delete(done);
      resolve();
    };
    const check = setInterval(() => {
      if (!s.speaking && !s.pending && grace-- <= 0) done();
    }, 100);
    deviceWaiters.add(done);
  });
}

/** Esperas de la voz del dispositivo que `stopSpeaking` debe soltar. */
const deviceWaiters = new Set<() => void>();

/* ---------------- cola de frases (respuesta del tutor en streaming) ---------------- */

/**
 * La respuesta del tutor llega por trozos; cada frase entra aquí en cuanto se
 * completa y suena en orden. La voz neural de las DOS siguientes se pide por
 * adelantado mientras suena la actual, para que no haya silencios entre
 * frases. Si una frase no se puede pedir, esa frase suena con la voz del
 * dispositivo y la cola sigue. `stopSpeaking()` la vacía.
 */
type QueueItem = { text: string; voice: Promise<Blob | null> | null };

const PREFETCH = 2;
let queue: QueueItem[] = [];
let queueRunning = false;
/** Cambia en cada `clearQueue`: una vuelta vieja de la cola deja de actuar. */
let queueGen = 0;
let queueCtrl: AbortController | null = null;
let onQueueBlocked: (() => void) | null = null;
let onQueueStart: (() => void) | null = null;
const queueListeners = new Set<() => void>();

function setQueueRunning(next: boolean) {
  if (queueRunning === next) return;
  queueRunning = next;
  for (const l of queueListeners) l();
}

function clearQueue() {
  queueGen++;
  queue = [];
  queueCtrl?.abort();
  queueCtrl = null;
  onQueueBlocked = null;
  onQueueStart = null;
  for (const release of deviceWaiters) release();
  deviceWaiters.clear();
  setQueueRunning(false);
}

/** Pide por adelantado la voz de las primeras frases de la cola. */
function prefetch() {
  for (const item of queue.slice(0, PREFETCH)) {
    if (item.voice || !serverAvailable(item.text)) continue;
    queueCtrl ??= new AbortController();
    const signal = queueCtrl.signal;
    item.voice = fetchVoice(item.text, signal).catch((err) => {
      if (!signal.aborted && !(err instanceof NotSignedInError)) {
        serverDownUntil = Date.now() + COOLDOWN_MS;
      }
      return null;
    });
  }
}

async function runQueue(gen: number) {
  setQueueRunning(true);
  let first = true;
  while (gen === queueGen && queue.length > 0) {
    prefetch();
    const item = queue[0];
    const blob = item.voice ? await item.voice : null;
    if (gen !== queueGen) return;
    queue.shift();
    prefetch();
    if (first) {
      first = false;
      onQueueStart?.();
      onQueueStart = null;
    }
    const rate = preferredRate();
    if (blob) {
      try {
        await playBlob(blob, rate);
        continue;
      } catch (err) {
        if (gen !== queueGen) return;
        if (err instanceof AutoplayBlockedError) {
          // Sin gesto previo (iOS): se avisa para que la UI ofrezca «Toca para oír».
          const blocked = onQueueBlocked;
          clearQueue();
          blocked?.();
          return;
        }
      }
    }
    if (gen !== queueGen) return;
    await deviceAndWait(item.text, "en", rate);
  }
  if (gen === queueGen) setQueueRunning(false);
}

/**
 * Añade una frase a la cola de lectura. `onStart` se llama cuando empieza a
 * sonar la primera frase de esta tanda (sirve para medir la latencia);
 * `onBlocked` si el navegador bloqueó el audio por falta de gesto.
 */
export function enqueueSpeech(
  text: string,
  opts: { onStart?: () => void; onBlocked?: () => void } = {},
) {
  const clean = text.trim();
  if (!clean) return;
  if (opts.onBlocked) onQueueBlocked = opts.onBlocked;
  if (opts.onStart && !queueRunning) onQueueStart = opts.onStart;
  // Antes de la primera frase se calla lo que sonara (otra frase suelta).
  if (!queueRunning) {
    const keep = { blocked: onQueueBlocked, start: onQueueStart };
    stopSpeaking();
    onQueueBlocked = keep.blocked;
    onQueueStart = keep.start;
  }
  queue.push({ text: clean, voice: null });
  prefetch();
  if (!queueRunning) void runQueue(queueGen);
}

/** ¿Está sonando (o por sonar) la cola de frases? Para el modo manos libres. */
export function useQueueSpeaking(): boolean {
  return useSyncExternalStore(
    (cb) => {
      queueListeners.add(cb);
      return () => queueListeners.delete(cb);
    },
    () => queueRunning,
    () => false,
  );
}

/** ¿Sólo hay voces malas instaladas? Sirve para avisar en la UI. */
export function hasGoodVoice(list: SpeechSynthesisVoice[]): boolean {
  return list.some((v) => scoreVoice(v) >= 25);
}
