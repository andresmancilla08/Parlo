"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// Dictado por voz con la Web Speech API (SpeechRecognition). Es gratis y va en
// el navegador: nada de audio a un servidor. Chrome/Edge/Safari la traen;
// Firefox no, así que el botón simplemente no se muestra allí.
//
// La API no está en las definiciones de TypeScript del DOM, así que aquí se
// describe lo mínimo que se usa en vez de arrastrar un paquete de tipos.

type RecognitionAlternative = { transcript: string };
type RecognitionResult = ArrayLike<RecognitionAlternative> & { isFinal: boolean };
export type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };

export type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onspeechstart: (() => void) | null;
};

type RecognitionCtor = new () => Recognition;

export function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type DictationError = "denied" | "nospeech" | "network" | "nomic" | "failed" | null;

/** Clave i18n del aviso que corresponde a cada fallo. */
export function dictationErrorKey(error: Exclude<DictationError, null>): string {
  return `practica.mic_${error}`;
}

/**
 * Traduce el código de error del reconocedor. `aborted` NO es un error: llega
 * cuando lo cortamos nosotros (al enviar, al salir de la pantalla).
 */
export function mapRecognitionError(code: string): DictationError {
  switch (code) {
    case "aborted":
      return null;
    case "no-speech":
      return "nospeech";
    case "network":
      return "network";
    case "audio-capture":
      return "nomic";
    case "not-allowed":
    case "service-not-allowed":
      return "denied";
    default:
      return "failed";
  }
}

/** Cuánto se queda a la vista un aviso de dictado antes de irse solo. */
const ERROR_TTL_MS = 6_000;

/**
 * iOS con Parlo instalada en la pantalla de inicio: WebKit expone
 * `webkitSpeechRecognition` pero en modo standalone no funciona (no pide
 * permiso o falla en silencio). Mejor no enseñar un micro roto.
 * La APK de Android es una TWA (Chrome) y ahí sí funciona: no entra aquí.
 */
export function isIosStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & { standalone?: boolean };
  const ios =
    /iPad|iPhone|iPod/.test(nav.userAgent) ||
    // iPadOS se hace pasar por Mac de escritorio.
    (nav.platform === "MacIntel" && nav.maxTouchPoints > 1);
  if (!ios) return false;
  return nav.standalone === true || window.matchMedia?.("(display-mode: standalone)").matches;
}

/** El soporte del navegador no cambia en caliente: nada a lo que suscribirse. */
function subscribeNever(): () => void {
  return () => {};
}

/**
 * Dicta en `lang` y va entregando el texto: primero provisional (mientras
 * hablas) y luego definitivo. El texto definitivo es el que hay que conservar.
 */
export function useDictation(
  lang: string,
  onText: (text: string, final: boolean) => void,
): {
  supported: boolean;
  /** iOS con la PWA instalada: hay API pero no funciona (ver `isIosStandalone`). */
  iosStandalone: boolean;
  listening: boolean;
  error: DictationError;
  toggle: () => void;
  stop: () => void;
  /** Corta YA y descarta cualquier resultado que aún esté por llegar. */
  abort: () => void;
} {
  const [listening, setListening] = useState(false);
  const [error, setErrorState] = useState<DictationError>(null);
  const rec = useRef<Recognition | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Un aviso de dictado no se queda para siempre: se va al volver a hablar o
  // a los pocos segundos.
  const setError = useCallback((next: DictationError) => {
    if (errorTimer.current) clearTimeout(errorTimer.current);
    errorTimer.current = null;
    setErrorState(next);
    if (next) errorTimer.current = setTimeout(() => setErrorState(null), ERROR_TTL_MS);
  }, []);
  // El callback cambia en cada render; se guarda aparte para no reiniciar nada.
  const cb = useRef(onText);
  useEffect(() => {
    cb.current = onText;
  });

  // En el servidor no hay `window`: se declara «no compatible» y el cliente lo
  // corrige al hidratar (sin setState en efecto, que dispara render en cascada).
  const iosStandalone = useSyncExternalStore(subscribeNever, isIosStandalone, () => false);
  const available = useSyncExternalStore(
    subscribeNever,
    () => recognitionCtor() !== null,
    () => false,
  );
  const supported = available && !iosStandalone;

  useEffect(() => {
    return () => {
      const r = rec.current;
      if (r) {
        r.onresult = null;
        r.abort();
      }
      rec.current = null;
      if (errorTimer.current) clearTimeout(errorTimer.current);
    };
  }, []);

  const stop = useCallback(() => {
    rec.current?.stop();
    setListening(false);
  }, []);

  const abort = useCallback(() => {
    const r = rec.current;
    if (r) {
      // Sin esto, un resultado «final» que llega tras enviar reescribía en el
      // cuadro de texto la frase que ya se había mandado.
      r.onresult = null;
      r.abort();
    }
    rec.current = null;
    setListening(false);
  }, []);

  const toggle = useCallback(() => {
    if (rec.current) {
      stop();
      return;
    }
    const Ctor = recognitionCtor();
    if (!Ctor) return;

    const r = new Ctor();
    r.lang = lang;
    r.continuous = false;
    r.interimResults = true;

    r.onresult = (e) => {
      let text = "";
      let final = false;
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        text += result[0]?.transcript ?? "";
        if (result.isFinal) final = true;
      }
      if (text) cb.current(text.trim(), final);
    };
    r.onspeechstart = () => setError(null);
    r.onerror = (e) => {
      // Un reconocedor viejo (ya sustituido o abortado) no pisa el estado.
      if (rec.current !== r) return;
      setError(mapRecognitionError(e.error));
      setListening(false);
      rec.current = null;
    };
    r.onend = () => {
      if (rec.current !== r) return;
      setListening(false);
      rec.current = null;
    };

    setError(null);
    rec.current = r;
    setListening(true);
    try {
      r.start();
    } catch {
      // Un segundo `start()` seguido lanza; se ignora y se deja el estado limpio.
      setListening(false);
      rec.current = null;
    }
  }, [lang, stop, setError]);

  return { supported, iosStandalone, listening, error, toggle, stop, abort };
}
