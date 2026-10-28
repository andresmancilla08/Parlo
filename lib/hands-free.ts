"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  isIosStandalone,
  mapRecognitionError,
  recognitionCtor,
  type DictationError,
  type Recognition,
} from "@/lib/dictation";

// Modo manos libres de la conversación: el micro escucha solo, envía tras un
// silencio y vuelve a abrirse cuando el tutor termina de hablar. Es MEDIO
// DÚPLEX a propósito: mientras el tutor habla (o se piensa la respuesta) el
// reconocedor está apagado, si no se transcribiría la voz del propio tutor.
//
// Va con la misma Web Speech API que el dictado: nada de audio a un servidor
// ni dependencias. Donde no hay reconocimiento (Firefox) o no funciona (iOS
// con la app instalada), el interruptor ni se muestra.

/** Silencio tras el que se da la frase por terminada y se envía. */
export const HANDS_FREE_SILENCE_MS = 1200;
/** Pausa antes de reabrir el micro cuando el navegador lo cierra solo. */
const RESTART_MS = 150;

function subscribeNever(): () => void {
  return () => {};
}

/** ¿Se puede ofrecer manos libres en este navegador? */
export function useHandsFreeSupported(): boolean {
  const available = useSyncExternalStore(subscribeNever, () => recognitionCtor() !== null, () => false);
  const ios = useSyncExternalStore(subscribeNever, isIosStandalone, () => false);
  return available && !ios;
}

/**
 * Escucha mientras `active` sea `true` y llama a `onUtterance` con la frase
 * cuando el usuario deja de hablar. Quien llama decide cuándo puede escuchar:
 * `active` debe ser `false` mientras se piensa la respuesta o habla el tutor.
 */
export function useHandsFree({
  active,
  onUtterance,
}: {
  active: boolean;
  onUtterance: (text: string) => void;
}): { listening: boolean; heard: string; error: DictationError; clearError: () => void } {
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [error, setError] = useState<DictationError>(null);

  const rec = useRef<Recognition | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restart = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef("");
  const wanted = useRef(active);
  const cb = useRef(onUtterance);
  /** `start` se llama a sí mismo (reabrir tras `onend`): va por ref. */
  const startRef = useRef<() => void>(() => {});
  useEffect(() => {
    cb.current = onUtterance;
    wanted.current = active;
  });

  const clearTimers = () => {
    if (timer.current) clearTimeout(timer.current);
    if (restart.current) clearTimeout(restart.current);
    timer.current = null;
    restart.current = null;
  };

  /** Corta YA, descartando lo que llegue después (como `mic.abort`). */
  const kill = useCallback(() => {
    clearTimers();
    const r = rec.current;
    rec.current = null;
    if (r) {
      r.onresult = null;
      r.abort();
    }
  }, []);

  const commit = useCallback(() => {
    const text = pending.current.trim();
    pending.current = "";
    setHeard("");
    if (!text) return;
    kill();
    setListening(false);
    cb.current(text);
  }, [kill]);

  const start = useCallback(() => {
    const Ctor = recognitionCtor();
    if (!Ctor || rec.current) return;
    const r = new Ctor();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    pending.current = "";

    r.onresult = (e) => {
      // En modo continuo `results` trae TODA la sesión: se recompone entera.
      let text = "";
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0]?.transcript ?? "";
      pending.current = text.replace(/\s+/g, " ").trim();
      setHeard(pending.current);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(commit, HANDS_FREE_SILENCE_MS);
    };
    r.onerror = (e) => {
      if (rec.current !== r) return;
      const mapped = mapRecognitionError(e.error);
      // Silencio largo o corte nuestro: no es un fallo, se reabre en `onend`.
      if (mapped === null || mapped === "nospeech") return;
      setError(mapped);
      // Permiso denegado, sin micro o sin red: insistir no arregla nada.
      wanted.current = false;
    };
    r.onend = () => {
      if (rec.current !== r) return;
      rec.current = null;
      setListening(false);
      // El navegador cierra la sesión solo (Chrome, al minuto o tras un
      // silencio). Si quedaba algo dicho se envía; si no, se reabre.
      if (pending.current.trim()) return commit();
      if (wanted.current) restart.current = setTimeout(() => startRef.current(), RESTART_MS);
    };
    // `onstart` no está en el tipo mínimo de `dictation.ts`: se asigna aparte.
    (r as Recognition & { onstart: (() => void) | null }).onstart = () => {
      if (rec.current === r) setListening(true);
    };

    rec.current = r;
    try {
      r.start();
    } catch {
      rec.current = null;
    }
  }, [commit]);
  useEffect(() => {
    startRef.current = start;
  });

  useEffect(() => {
    if (!active) return;
    start();
    return () => {
      kill();
      pending.current = "";
    };
  }, [active, start, kill]);

  // Al desmontar, nada escuchando.
  useEffect(() => kill, [kill]);

  const clearError = useCallback(() => setError(null), []);

  return { listening: listening && active, heard: active ? heard : "", error, clearError };
}
