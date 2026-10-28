"use client";

import { Capacitor, registerPlugin } from "@capacitor/core";

// Puente con la APK de Android (Capacitor). La APK carga ESTA web desde
// Vercel y le inyecta `window.Capacitor`; en el navegador nada de esto existe
// y todo cae a las APIs web de siempre. Ver docs/contexto/decisiones.md.

/** ¿Corre dentro de la APK nativa (no en un navegador)? */
export function isNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

/** ¿La APK instalada trae este plugin? (una APK vieja puede no tenerlo). */
export function hasNativePlugin(name: string): boolean {
  return isNativeApp() && Capacitor.isPluginAvailable(name);
}

/* ---------------- voz del dispositivo (@capacitor-community/text-to-speech) ---------------- */

export type NativeVoice = {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
};

export type TextToSpeechPlugin = {
  speak(o: { text: string; lang?: string; rate?: number; pitch?: number; volume?: number; voice?: number }): Promise<void>;
  stop(): Promise<void>;
  getSupportedVoices(): Promise<{ voices: NativeVoice[] }>;
};

export const NativeTTS = registerPlugin<TextToSpeechPlugin>("TextToSpeech");

/* ---------------- reconocimiento de voz (plugin propio, android/…/ParloSpeechPlugin.java) ---------------- */

export type NativeSpeechEvent = {
  session: string;
  type: "start" | "speechstart" | "result" | "error" | "end";
  text?: string;
  final?: boolean;
  /** Código de la Web Speech API: no-speech, network, not-allowed, aborted… */
  error?: string;
};

export type ParloSpeechPlugin = {
  start(o: { session: string; lang: string; interimResults: boolean }): Promise<void>;
  stop(o: { session: string }): Promise<void>;
  abort(o: { session: string }): Promise<void>;
  addListener(event: "speech", cb: (e: NativeSpeechEvent) => void): Promise<{ remove: () => Promise<void> }>;
};

export const NativeSpeech = registerPlugin<ParloSpeechPlugin>("ParloSpeech");

/* ---------------- barra de estado ---------------- */

type ParloShellPlugin = { setTheme(o: { dark: boolean }): Promise<void> };
const ParloShell = registerPlugin<ParloShellPlugin>("ParloShell");

/**
 * Franjas de la barra de estado y de navegación del color del tema de la web
 * (que puede no ser el del sistema), con iconos legibles.
 */
export function syncStatusBar(dark: boolean) {
  if (!hasNativePlugin("ParloShell")) return;
  ParloShell.setTheme({ dark }).catch(() => {});
}
