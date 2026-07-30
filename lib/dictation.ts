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
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type RecognitionCtor = new () => Recognition;

function ctor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type DictationError = "denied" | "failed" | null;

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
  listening: boolean;
  error: DictationError;
  toggle: () => void;
  stop: () => void;
} {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<DictationError>(null);
  const rec = useRef<Recognition | null>(null);
  // El callback cambia en cada render; se guarda aparte para no reiniciar nada.
  const cb = useRef(onText);
  useEffect(() => {
    cb.current = onText;
  });

  // En el servidor no hay `window`: se declara «no compatible» y el cliente lo
  // corrige al hidratar (sin setState en efecto, que dispara render en cascada).
  const supported = useSyncExternalStore(
    subscribeNever,
    () => ctor() !== null,
    () => false,
  );

  useEffect(() => {
    return () => {
      rec.current?.abort();
      rec.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    rec.current?.stop();
    setListening(false);
  }, []);

  const toggle = useCallback(() => {
    if (rec.current) {
      stop();
      return;
    }
    const Ctor = ctor();
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
    r.onerror = (e) => {
      setError(e.error === "not-allowed" || e.error === "service-not-allowed" ? "denied" : "failed");
      setListening(false);
      rec.current = null;
    };
    r.onend = () => {
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
  }, [lang, stop]);

  return { supported, listening, error, toggle, stop };
}
