import type { ProgressSnapshot } from "@/lib/progress";

// Lógica PURA de la sincronización del progreso (sin Firebase ni zustand) para
// poder probarla con `node --experimental-strip-types lib/progress-merge.check.ts`.
// Por eso sólo hay imports de tipos: se borran al quitar los tipos.

/** El día más reciente de los dos (nunca `undefined`: Firestore lo rechaza). */
function maxDay(a: string | null, b: string | null): string | null {
  return (a ?? "") > (b ?? "") ? (a ?? null) : (b ?? null);
}

/**
 * Fusión SIN base común (primer encuentro local↔remoto): gana lo más avanzado.
 * Nunca se pierde lo hecho offline, a costa de no poder restar (lo que se
 * gastó en un lado puede reaparecer). Por eso, tras la primera fusión, las
 * escrituras usan `rebase`, que sí conoce la base.
 */
export function merge(local: ProgressSnapshot, remote: ProgressSnapshot): ProgressSnapshot {
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

  // La racha la manda quien cumplió el objetivo MÁS RECIENTE: si aquí se rompió
  // y volvió a empezar hoy, una racha vieja más larga del otro lado no vale.
  const lg = local.lastGoalDay ?? "";
  const rg = remote.lastGoalDay ?? "";
  const streak = lg > rg ? local.streak : rg > lg ? remote.streak : Math.max(local.streak, remote.streak);

  return {
    xp: Math.max(local.xp, remote.xp),
    gems: Math.max(local.gems, remote.gems),
    streak,
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
    saved: { ...remote.saved, ...local.saved },
    lastActiveDay: maxDay(local.lastActiveDay, remote.lastActiveDay),
    completed: [...new Set([...local.completed, ...remote.completed])],
    stars,
    cards,
    tutorMessages: Math.max(local.tutorMessages, remote.tutorMessages),
    listens: Math.max(local.listens, remote.listens),
  };
}

/** Contadores que suben y BAJAN (gemas gastadas, escudos usados): van por delta. */
const COUNTERS = ["xp", "gems", "shields", "tutorMessages", "listens"] as const;

/**
 * Fusión a tres bandas para las escrituras: `base` es lo que este dispositivo
 * sabía del remoto la última vez que sincronizó. Los contadores se aplican como
 * DIFERENCIA (`remoto + (local − base)`), así que dos dispositivos que suman
 * XP a la vez no se pisan y gastar gemas no se deshace al fusionar. El resto
 * (lecciones, cartas, días, retos…) sólo crece y usa `merge`.
 */
export function rebase(
  base: ProgressSnapshot,
  local: ProgressSnapshot,
  remote: ProgressSnapshot,
): ProgressSnapshot {
  const out = merge(local, remote);
  for (const key of COUNTERS) {
    out[key] = Math.max(0, remote[key] + (local[key] - base[key]));
  }
  // El objetivo sólo lo cambia este dispositivo si de verdad lo tocó.
  out.goalXp = local.goalXp !== base.goalXp ? local.goalXp : remote.goalXp;
  return out;
}

/** ¿Hay algo en el snapshot que valga la pena conservar? */
export function isEmptySnapshot(s: ProgressSnapshot): boolean {
  return (
    s.xp === 0 &&
    s.gems === 0 &&
    s.completed.length === 0 &&
    Object.keys(s.cards).length === 0 &&
    Object.keys(s.days).length === 0 &&
    s.taught.length === 0 &&
    s.startLevel === null
  );
}

/**
 * Qué hacer con el progreso que hay en este dispositivo al entrar `uid`:
 *  - `merge`: es suyo, anónimo (anterior a guardar el dueño) o está vacío.
 *  - `discard`: es de OTRA cuenta. Fusionarlo regalaría a `uid` el progreso
 *    de quien usó el dispositivo antes (y lo subiría a su documento).
 */
export function ownerDecision(
  owner: string | null | undefined,
  uid: string,
  local: ProgressSnapshot,
): "merge" | "discard" {
  if (!owner || owner === uid) return "merge";
  return isEmptySnapshot(local) ? "merge" : "discard";
}
