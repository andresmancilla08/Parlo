"use client";

import { useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, firebaseReady } from "@/lib/firebase";
import { DEFAULT_GOAL_XP } from "@/lib/gamification";
import { useProgress, type ProgressSnapshot } from "@/lib/progress";
import { merge, ownerDecision } from "@/lib/progress-merge";

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
    saved: s?.saved ?? {},
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

    // El progreso local tiene dueño: si es de OTRA cuenta (dispositivo
    // compartido, o una salida que no llegó a limpiar), se descarta antes de
    // fusionar. Si no, la cuenta nueva heredaría —y subiría— lo ajeno.
    const store = useProgress.getState();
    if (ownerDecision(store.owner, uid, sanitize(store.snapshot())) === "discard") {
      store.reset();
    }
    useProgress.getState().setOwner(uid);

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
      if (!state.hydrated || state.owner !== uid) return;
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
