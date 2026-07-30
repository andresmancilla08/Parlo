"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Sonidos de acierto/error. Se sintetizan con WebAudio en vez de servir MP3:
// cero peso, cero peticiones y suenan igual en todos los dispositivos.
// El AudioContext se crea en el primer sonido, que siempre nace de un toque
// del usuario (los navegadores bloquean el audio sin gesto previo).

type SfxState = { on: boolean; setOn: (on: boolean) => void };

/** Preferencia del usuario. Por defecto encendido; se recuerda en el perfil. */
export const useSfx = create<SfxState>()(
  persist((set) => ({ on: true, setOn: (on) => set({ on }) }), {
    name: "parlo-sfx",
    storage: createJSONStorage(() => localStorage),
  }),
);

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  // Safari e iOS lo suspenden al salir de la pestaña.
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Una nota con envolvente suave (sin envolvente se oye un chasquido). */
function blip(
  freq: number,
  delay: number,
  dur: number,
  gain = 0.09,
  type: OscillatorType = "sine",
) {
  const c = audio();
  if (!c) return;
  const osc = c.createOscillator();
  const vol = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime + delay);

  const t0 = c.currentTime + delay;
  vol.gain.setValueAtTime(0.0001, t0);
  vol.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  vol.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

  osc.connect(vol).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function enabled(): boolean {
  return useSfx.getState().on;
}

/** Acierto: dos notas que suben (mi → si). */
export function playCorrect() {
  if (!enabled()) return;
  blip(659.25, 0, 0.11);
  blip(987.77, 0.08, 0.16);
}

/** Error: nota grave y corta. Avisa sin castigar. */
export function playWrong() {
  if (!enabled()) return;
  blip(196, 0, 0.16, 0.07, "triangle");
  blip(146.83, 0.09, 0.2, 0.06, "triangle");
}

/** Fin de lección: arpegio de do mayor. */
export function playComplete() {
  if (!enabled()) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => blip(f, i * 0.075, 0.22, 0.08));
}

/** Recompensa (cobrar un reto, subir de nivel): quinta ascendente rápida. */
export function playReward() {
  if (!enabled()) return;
  blip(783.99, 0, 0.1);
  blip(1046.5, 0.07, 0.14);
  blip(1318.51, 0.14, 0.2);
}
