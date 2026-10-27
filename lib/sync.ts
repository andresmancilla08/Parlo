"use client";

import { useEffect } from "react";
import { doc, runTransaction, type DocumentSnapshot } from "firebase/firestore";
import { db, firebaseReady } from "@/lib/firebase";
import { DEFAULT_GOAL_XP } from "@/lib/gamification";
import { useProgress, type ProgressSnapshot } from "@/lib/progress";
import { merge, ownerDecision, rebase } from "@/lib/progress-merge";

// Sincroniza el progreso local (zustand persist) con `users/{uid}` en Firestore.
// Local-first: la app funciona sin red; Firestore es la copia entre dispositivos.
//
// Reglas para no perder nada entre dispositivos:
//  - Nada se escribe hasta que la fusión INICIAL ha salido bien (`ready`). Si
//    falla (sin red), se reintenta al volver la red o la pestaña; mientras
//    tanto, una escritura local jamás pisa un remoto más avanzado.
//  - Toda escritura es una transacción: lee el remoto, fusiona y escribe. Los
//    contadores van por diferencia respecto a `base` (lo último que se supo del
//    remoto), así que dos dispositivos que suman a la vez no se pisan.
//  - El resultado vuelve al store (sin disparar otra escritura): este
//    dispositivo ve también lo que se hizo en los demás.

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

/** Escritura pendiente de la sesión activa (para no perderla al cerrar sesión). */
let flushActive: (() => Promise<void>) | null = null;

/** Escribe YA lo pendiente (si la fusión inicial ya salió). Nunca lanza. */
export async function flushProgressSync(): Promise<void> {
  await flushActive?.().catch(() => {});
}

function remoteOf(snap: DocumentSnapshot): ProgressSnapshot | null {
  const data = snap.exists()
    ? (snap.data().progress as Partial<ProgressSnapshot> | undefined)
    : undefined;
  return data ? sanitize(data) : null;
}

/**
 * Al iniciar sesión: fusiona local↔remoto y deja el resultado en ambos.
 * Después, cada cambio del store se escribe con debounce y por transacción.
 */
export function useProgressSync(uid: string | null) {
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

    let ready = false; // la fusión inicial ya salió bien
    let base: ProgressSnapshot | null = null; // lo que se sabe del remoto
    let inflight: Promise<void> | null = null;
    let dirty = false; // hay cambios locales sin escribir
    let applying = false; // el cambio del store lo hacemos nosotros
    let timer: ReturnType<typeof setTimeout> | null = null;

    const local = () => sanitize(useProgress.getState().snapshot());

    /**
     * Lleva al store el resultado escrito sin perder lo que el usuario hizo
     * mientras la transacción viajaba: `resultado + (actual − enviado)`.
     */
    function applyResult(sent: ProgressSnapshot, result: ProgressSnapshot) {
      const current = local();
      const next = rebase(sent, current, result);
      if (JSON.stringify(next) === JSON.stringify(current)) return;
      applying = true;
      try {
        useProgress.getState().hydrateFrom(next);
      } finally {
        applying = false;
      }
    }

    /** Una transacción cada vez; si llegan cambios mientras, se encadena otra. */
    function sync(): Promise<void> {
      if (inflight) {
        dirty = true; // al terminar la actual se encadena otra
        return inflight.catch(() => {});
      }
      const first = !ready;
      const sent = local();
      const known = base;
      dirty = false;
      inflight = runTransaction(db(), async (tx) => {
        const remote = remoteOf(await tx.get(ref));
        const next = !remote ? sent : first || !known ? merge(sent, remote) : rebase(known, sent, remote);
        tx.set(ref, { progress: next }, { merge: true });
        return next;
      })
        .then((result) => {
          if (cancelled) return;
          applyResult(sent, result);
          base = result;
          ready = true;
        })
        .catch((err) => {
          // Sin red o reglas denegando: la app sigue en local y se reintenta
          // al volver la red. Lo no escrito sigue siendo «local − base».
          dirty = true;
          console.warn(
            first ? "[parlo] sync inicial falló" : "[parlo] no se pudo guardar el progreso",
            err,
          );
          throw err;
        })
        .finally(() => {
          inflight = null;
        });
      return inflight.then(
        () => {
          if (dirty && !cancelled) schedule();
        },
        () => {},
      );
    }

    function schedule() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (ready) void sync();
      }, WRITE_DEBOUNCE_MS);
    }

    void sync(); // fusión inicial

    const unsubscribe = useProgress.subscribe((state) => {
      if (applying || !state.hydrated || state.owner !== uid) return;
      dirty = true;
      // Antes de la fusión inicial no se escribe: se guardará cuando salga.
      if (ready) schedule();
    });

    /** Vuelve la red (o la pestaña): reintenta lo que quedó pendiente. */
    const retry = () => {
      if (cancelled || inflight) return;
      if (document.visibilityState === "hidden") return;
      if (!ready || dirty) void sync();
    };
    window.addEventListener("online", retry);
    document.addEventListener("visibilitychange", retry);

    flushActive = async () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (inflight) await inflight.catch(() => {});
      if (ready && dirty) await sync();
    };

    return () => {
      cancelled = true;
      unsubscribe();
      window.removeEventListener("online", retry);
      document.removeEventListener("visibilitychange", retry);
      if (timer) clearTimeout(timer);
      flushActive = null;
    };
  }, [uid]);
}
