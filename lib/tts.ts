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

/**
 * Lee `text`. Usa la voz elegida en el perfil; si no hay, la mejor puntuada.
 * `rate` algo por debajo de 1 se entiende mejor cuando estás aprendiendo.
 */
export function speak(text: string, lang: "en" | "es" = "en") {
  const s = synth();
  if (!s || !text.trim()) return;
  refresh(); // en Chrome la lista llega tarde la primera vez
  s.cancel();

  const preferred = lang === "en" ? useVoicePref.getState().name : null;
  const list = voicesFor(lang);
  const chosen = preferred ? list.find((v) => v.name === preferred) : undefined;
  const voice = chosen ?? list[0] ?? null;

  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice?.lang ?? (lang === "en" ? "en-US" : "es-ES");
  u.rate = 0.95;
  u.pitch = 1;
  u.volume = 1;
  s.speak(u);
}

/** ¿Sólo hay voces malas instaladas? Sirve para avisar en la UI. */
export function hasGoodVoice(list: SpeechSynthesisVoice[]): boolean {
  return list.some((v) => scoreVoice(v) >= 25);
}
