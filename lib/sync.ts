"use client";

import { useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseReady } from "@/lib/firebase";
import { DEFAULT_GOAL_XP } from "@/lib/gamification";
import { useProgress, type ProgressSnapshot } from "@/lib/progress";

// Sincroniza el progreso local (zustand persist) con `users/{uid}` en Firestore.
// Local-first: la app funciona sin red; Firestore es la copia entre dispositivos.

const WRITE_DEBOUNCE_MS = 1500;

/**
 * Firestore RECHAZA `undefined`. Los documentos escritos antes de la
 * gamificación no traen `days`/`claims`/`shields`/`goalXp`/`lastGoalDay`, así
 * que todo lo que entra o sale del sync pasa por aquí con valores por defecto.
 */
function sanitize(s: Partial<ProgressSnapshot> | undefined): ProgressSnapshot {
  return {
    xp: s?.xp ?? 0,
    gems: s?.gems ?? 0,
    streak: s?.streak ?? 0,
    lastActiveDay: s?.lastActiveDay ?? null,
    completed: s?.completed ?? [],
    stars: s?.stars ?? {},
    cards: s?.cards ?? {},
    tutorMessages: s?.tutorMessages ?? 0,
    listens: s?.listens ?? 0,
    days: s?.days ?? {},
    goalXp: s?.goalXp ?? DEFAULT_GOAL_XP,
    claims: s?.claims ?? {},
    shields: s?.shields ?? 0,
    lastGoalDay: s?.lastGoalDay ?? null,
    startLevel: s?.startLevel ?? null,
    skipped: s?.skipped ?? [],
    taught: s?.taught ?? [],
  };
}

/** Gana el progreso MÁS avanzado: nunca se pierde lo hecho offline. */
function merge(local: ProgressSnapshot, remote: ProgressSnapshot): ProgressSnapshot {
  const cards = { ...remote.cards };
  for (const [key, card] of Object.entries(local.cards)) {
    const other = cards[key];
    // La carta más reciente es la que se repasó después (mayor `due`).
    if (!other || card.due > other.due) cards[key] = card;
  }
  const stars: Record<string, number> = { ...remote.stars };
  for (const [id, n] of Object.entries(local.stars)) {
    stars[id] = Math.max(n, stars[id] ?? 0);
  }
  // Estadísticas por día: se queda el mejor valor de cada métrica en cada día.
  const days = { ...remote.days };
  for (const [key, day] of Object.entries(local.days ?? {})) {
    const other = days[key];
    days[key] = other
      ? {
          xp: Math.max(day.xp, other.xp),
          lessons: Math.max(day.lessons, other.lessons),
          correct: Math.max(day.correct, other.correct),
          reviews: Math.max(day.reviews, other.reviews),
          tutor: Math.max(day.tutor, other.tutor),
          listens: Math.max(day.listens, other.listens),
        }
      : day;
  }

  return {
    xp: Math.max(local.xp, remote.xp),
    gems: Math.max(local.gems, remote.gems),
    streak: Math.max(local.streak, remote.streak),
    days,
    // El objetivo lo manda este dispositivo (es lo último que tocó el usuario).
    goalXp: local.goalXp,
    claims: { ...remote.claims, ...local.claims },
    shields: Math.max(local.shields, remote.shields ?? 0),
    lastGoalDay: maxDay(local.lastGoalDay, remote.lastGoalDay),
    // El test de nivel se hace una vez: vale el que exista (local manda).
    startLevel: local.startLevel ?? remote.startLevel,
    skipped: [...new Set([...local.skipped, ...remote.skipped])],
    taught: [...new Set([...local.taught, ...remote.taught])],
    lastActiveDay: maxDay(local.lastActiveDay, remote.lastActiveDay),
    completed: [...new Set([...local.completed, ...remote.completed])],
    stars,
    cards,
    tutorMessages: Math.max(local.tutorMessages, remote.tutorMessages),
    listens: Math.max(local.listens, remote.listens),
  };
}

/** El día más reciente de los dos (nunca `undefined`: Firestore lo rechaza). */
function maxDay(a: string | null, b: string | null): string | null {
  return (a ?? "") > (b ?? "") ? (a ?? null) : (b ?? null);
}

/**
 * Al iniciar sesión: fusiona local↔remoto y deja el resultado en ambos.
 * Después, cada cambio del store se escribe con debounce.
 */
export function useProgressSync(uid: string | null) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!uid || !firebaseReady) return;
    let cancelled = false;
    const ref = doc(db(), "users", uid);

    (async () => {
      try {
        const snap = await getDoc(ref);
        if (cancelled) return;
        const local = sanitize(useProgress.getState().snapshot());
        const remote = snap.exists()
          ? (snap.data().progress as Partial<ProgressSnapshot> | undefined)
          : undefined;
        const next = remote ? merge(local, sanitize(remote)) : local;
        useProgress.getState().hydrateFrom(next);
        await setDoc(ref, { progress: next }, { merge: true });
      } catch (err) {
        // Sin red o reglas denegando: la app sigue funcionando en local.
        console.warn("[parlo] sync inicial falló", err);
      }
    })();

    const unsubscribe = useProgress.subscribe((state) => {
      if (!state.hydrated) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setDoc(
          ref,
          { progress: sanitize(useProgress.getState().snapshot()) },
          { merge: true },
        ).catch((err) => console.warn("[parlo] no se pudo guardar el progreso", err));
      }, WRITE_DEBOUNCE_MS);
    });

    return () => {
      cancelled = true;
      unsubscribe();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [uid]);
}
