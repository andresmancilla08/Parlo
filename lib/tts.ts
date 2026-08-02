"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
 * Lee `text`. Usa la voz elegida en el perfil; si no hay, la mejor puntuada.
 * `rate` baja a `RATE_SLOW` cuando se pulsa la tortuga.
 */
export function speak(
  text: string,
  lang: "en" | "es" = "en",
  rate = RATE_NORMAL,
  /** `true` fuerza la voz del dispositivo (lo usa el propio respaldo). */
  device = false,
) {
  if (!text.trim()) return;

  if (!device && serverAvailable(text)) {
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
    Date.now() >= serverDownUntil
  );
}

export function ttsUrl(text: string): string {
  return `/api/tts?t=${encodeURIComponent(text)}`;
}

/** Corta lo que esté sonando, venga de donde venga. */
export function stopSpeaking() {
  synth()?.cancel();
  if (current) {
    current.pause();
    current = null;
  }
}

/**
 * Reproduce con la voz del servidor. Resuelve al terminar y RECHAZA si no se
 * puede (para que quien llama pueda tirar de Web Speech).
 */
function playServer(text: string, rate: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(ttsUrl(text));
    // El servidor devuelve la frase a velocidad normal; la tortuga se consigue
    // bajando la reproducción, que además no cambia la URL cacheada.
    audio.playbackRate = rate / RATE_NORMAL;
    audio.preservesPitch = true;
    current = audio;
    audio.addEventListener("ended", () => {
      if (current === audio) current = null;
      resolve();
    });
    audio.addEventListener("error", () => {
      serverDownUntil = Date.now() + COOLDOWN_MS;
      reject(new Error("tts"));
    });
    audio.play().catch((err) => {
      serverDownUntil = Date.now() + COOLDOWN_MS;
      reject(err);
    });
  });
}

/**
 * Lee y espera a que termine, para poder encadenar frases (lectura continua).
 * Intenta la voz neural y, si no puede, la del dispositivo.
 */
export async function speakAndWait(
  text: string,
  lang: "en" | "es" = "en",
  rate = RATE_NORMAL,
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
  await new Promise<void>((resolve) => {
    speak(text, lang, rate, true);
    const s = synth();
    if (!s) return resolve();
    const check = setInterval(() => {
      if (!s.speaking && !s.pending) {
        clearInterval(check);
        resolve();
      }
    }, 200);
  });
}

/** ¿Sólo hay voces malas instaladas? Sirve para avisar en la UI. */
export function hasGoodVoice(list: SpeechSynthesisVoice[]): boolean {
  return list.some((v) => scoreVoice(v) >= 25);
}
