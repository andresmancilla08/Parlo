"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { db, firebaseReady } from "@/lib/firebase";
import { weekKey } from "@/lib/gamification";
import {
  makeCode,
  normalizeCode,
  rank,
  type League,
  type LeagueMember,
  type LeagueScore,
} from "@/lib/league-core";

export * from "@/lib/league-core";

// Liga entre amigos. Es el ÚNICO dato compartido de Parlo, así que se comparte
// lo mínimo: un alias que elige el usuario y su XP de la semana. Ni correo, ni
// nombre real, ni qué lecciones hace, ni cuándo entra.
//
// Modelo:
//   leagues/{id}          → { name, code, ownerUid, createdAt, members: { uid: {alias, joinedAt} } }
//   leagues/{id}/scores/{uid} → { alias, week, xp, updatedAt }
//   leagueCodes/{code}    → { leagueId }   (solo para poder entrar por código)
//
// Las reglas de Firestore (firestore.rules) son la frontera real: cada quien
// sólo puede tocar SU entrada de `members` y SU documento de `scores`.


/* ---------------- preferencia local ---------------- */

type LeagueState = {
  /** Liga en la que estoy (null = no participo: la liga es opt-in). */
  leagueId: string | null;
  alias: string;
  /**
   * Foto del marcador la última vez que lo miré, para poder avisar de quién me
   * ha adelantado. Vive en el dispositivo a propósito: publicar «cuándo miró
   * cada uno» sería compartir más de lo que la liga promete compartir.
   */
  lastSeen: LeagueScore[];
  /**
   * `false` mientras no se ha preguntado a la nube si este usuario ya está en
   * una liga. Sin esto, en un dispositivo nuevo se ve un instante la pantalla
   * de «crear liga» y se puede crear una SEGUNDA liga estando ya en otra.
   * No se persiste: hay que volver a preguntar en cada sesión.
   */
  checked: boolean;
  join: (leagueId: string, alias: string) => void;
  leaveLocal: () => void;
  markSeen: (scores: LeagueScore[]) => void;
  markChecked: () => void;
};

export const useLeague = create<LeagueState>()(
  persist(
    (set) => ({
      leagueId: null,
      alias: "",
      lastSeen: [],
      checked: false,
      join: (leagueId, alias) => set({ leagueId, alias, lastSeen: [], checked: true }),
      leaveLocal: () => set({ leagueId: null, alias: "", lastSeen: [], checked: true }),
      markSeen: (scores) => set({ lastSeen: scores }),
      markChecked: () => set({ checked: true }),
    }),
    {
      name: "parlo-league",
      storage: createJSONStorage(() => localStorage),
      // `checked` fuera: es de esta sesión, no una preferencia.
      partialize: (s) => ({ leagueId: s.leagueId, alias: s.alias, lastSeen: s.lastSeen }),
    },
  ),
);

/* ---------------- Firestore ---------------- */

export type JoinError = "not_found" | "full" | "offline";

function requireDb() {
  if (!firebaseReady) throw new Error("offline");
  return db();
}

/**
 * La liga en la que estoy, guardada en MI documento (`users/{uid}.league`).
 * Sin esto, la pertenencia sólo vivía en localStorage: al entrar desde otro
 * dispositivo (o tras limpiar el navegador) veías la pantalla de «crear liga»
 * mientras seguías ocupando una plaza en Firestore.
 * No comparte nada nuevo: ese documento sólo lo lee su dueño.
 */
async function rememberLeague(uid: string, league: { id: string; alias: string } | null) {
  await setDoc(doc(requireDb(), "users", uid), { league }, { merge: true }).catch(() => {
    // Que falle recordar la liga no puede tumbar el alta: se reintentará.
  });
}

/** Recupera la liga guardada en el documento del usuario (otro dispositivo). */
export async function fetchMyLeague(
  uid: string,
): Promise<{ id: string; alias: string } | null> {
  const snap = await getDoc(doc(requireDb(), "users", uid));
  const saved = snap.exists() ? (snap.data().league as { id: string; alias: string } | null) : null;
  return saved?.id ? saved : null;
}

/** Crea la liga y reserva su código. El creador entra como primer miembro. */
export async function createLeague(
  name: string,
  uid: string,
  alias: string,
): Promise<League> {
  const database = requireDb();
  // Si el código ya existiera (improbable), se reintenta con otro.
  let code = makeCode();
  for (let i = 0; i < 5; i++) {
    const taken = await getDoc(doc(database, "leagueCodes", code));
    if (!taken.exists()) break;
    code = makeCode();
  }

  const ref = doc(collection(database, "leagues"));
  const members = { [uid]: { alias, joinedAt: Date.now() } };
  await setDoc(ref, {
    name: name.trim().slice(0, 30) || "Liga",
    code,
    ownerUid: uid,
    createdAt: serverTimestamp(),
    members,
  });
  await setDoc(doc(database, "leagueCodes", code), { leagueId: ref.id });
  await rememberLeague(uid, { id: ref.id, alias });

  return { id: ref.id, name, code, ownerUid: uid, members };
}

/**
 * Entra por código. Devuelve la liga o el motivo por el que no se pudo.
 *
 * OJO con el orden: las reglas sólo dejan LEER la liga a quien ya es miembro
 * (`allow get: if isMember()`), así que aquí NO se puede mirar antes de entrar.
 * Se escribe primero la propia entrada de `members` —la regla de update ya
 * valida que sólo se toque la tuya y que no se pase del tope— y se lee después,
 * cuando el permiso ya existe. Leer primero es lo que hacía que entrar por
 * código fallara siempre en silencio.
 */
export async function joinLeague(
  code: string,
  uid: string,
  alias: string,
): Promise<League | JoinError> {
  const database = requireDb();
  const clean = normalizeCode(code);
  const codeSnap = await getDoc(doc(database, "leagueCodes", clean));
  if (!codeSnap.exists()) return "not_found";

  const leagueId = codeSnap.data().leagueId as string;
  const ref = doc(database, "leagues", leagueId);

  try {
    await updateDoc(ref, { [`members.${uid}`]: { alias, joinedAt: Date.now() } });
  } catch (err) {
    // La liga ya no existe (código huérfano) o la regla ha rechazado la
    // entrada, y lo único que puede rechazarla en un alta bien formada es el
    // tope de miembros.
    const codeName = (err as { code?: string })?.code ?? "";
    if (codeName === "not-found") return "not_found";
    if (codeName === "permission-denied") return "full";
    return "offline";
  }

  const snap = await getDoc(ref);
  if (!snap.exists()) return "not_found";
  const data = snap.data();
  await rememberLeague(uid, { id: leagueId, alias });

  return {
    id: leagueId,
    name: data.name,
    code: clean,
    ownerUid: data.ownerUid,
    members: (data.members ?? {}) as Record<string, LeagueMember>,
  };
}

export async function fetchLeague(leagueId: string): Promise<League | null> {
  const snap = await getDoc(doc(requireDb(), "leagues", leagueId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: snap.id,
    name: data.name,
    code: data.code,
    ownerUid: data.ownerUid,
    members: (data.members ?? {}) as Record<string, LeagueMember>,
  };
}

/** Publica MI XP de la semana. Nadie más puede escribir en este documento. */
export async function pushScore(
  leagueId: string,
  uid: string,
  alias: string,
  xp: number,
  now: Date,
): Promise<void> {
  await setDoc(doc(requireDb(), "leagues", leagueId, "scores", uid), {
    alias,
    week: weekKey(now),
    xp,
    updatedAt: Date.now(),
  });
}

/** Marcador de la semana. Los de semanas anteriores se ignoran. */
export async function fetchScores(leagueId: string, now: Date): Promise<LeagueScore[]> {
  const week = weekKey(now);
  const snap = await getDocs(collection(requireDb(), "leagues", leagueId, "scores"));
  const out: LeagueScore[] = [];
  snap.forEach((d) => {
    const data = d.data();
    if (data.week === week) out.push({ uid: d.id, alias: data.alias, xp: data.xp ?? 0 });
  });
  return rank(out);
}

/** Salir: se borra mi puntuación y mi entrada del mapa de miembros. */
export async function leaveLeague(leagueId: string, uid: string): Promise<void> {
  const database = requireDb();
  await deleteDoc(doc(database, "leagues", leagueId, "scores", uid)).catch(() => {});
  await updateDoc(doc(database, "leagues", leagueId), {
    [`members.${uid}`]: deleteField(),
  });
  await rememberLeague(uid, null);
}
