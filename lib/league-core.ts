// Lógica pura de la liga (sin Firestore ni React): validación del alias,
// códigos, XP semanal y ranking. Separada para poder probarla con
// `node --experimental-strip-types lib/league.check.ts`.

/** Tope de miembros: es una liga de amigos, no una red social. */
export const MAX_MEMBERS = 20;
export const CODE_LENGTH = 6;
/** Sin vocales para que no salgan palabras, y sin 0/O ni 1/I (se confunden). */
const CODE_ALPHABET = "BCDFGHJKLMNPQRSTVWXYZ23456789";

export type LeagueMember = { alias: string; joinedAt: number };
export type League = {
  id: string;
  name: string;
  code: string;
  ownerUid: string;
  members: Record<string, LeagueMember>;
};
export type LeagueScore = { uid: string; alias: string; xp: number };

/* ---------------- validación (pura, con check propio) ---------------- */

export type AliasError = "short" | "long" | "chars" | null;

/**
 * El alias es público para los demás miembros: se valida para que nadie meta
 * ahí un correo o un teléfono sin darse cuenta.
 */
export function validateAlias(alias: string): AliasError {
  const value = alias.trim();
  if (value.length < 2) return "short";
  if (value.length > 16) return "long";
  if (!/^[\p{L}\p{N} ._-]+$/u.test(value)) return "chars";
  return null;
}

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isValidCode(code: string): boolean {
  return normalizeCode(code).length === CODE_LENGTH;
}

/** Código legible: sin vocales (no salen palabras) ni caracteres ambiguos. */
export function makeCode(random: () => number = Math.random): string {
  let out = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    out += CODE_ALPHABET[Math.floor(random() * CODE_ALPHABET.length)];
  }
  return out;
}

/**
 * XP de la semana en curso: es lo único que se publica en la liga.
 * Los días de la semana llegan de fuera (`weekDays` de gamification) para que
 * este archivo no dependa de nada y se pueda probar con Node a secas.
 */
export function weeklyXp(days: Record<string, { xp: number }>, week: string[]): number {
  return week.reduce((sum, key) => sum + (days[key]?.xp ?? 0), 0);
}

/** Ranking: más XP primero; a igualdad, orden alfabético estable por alias. */
export function rank(scores: LeagueScore[]): LeagueScore[] {
  return [...scores].sort((a, b) => b.xp - a.xp || a.alias.localeCompare(b.alias));
}

/* ---------------- reto compartido ---------------- */

/**
 * Reto de la liga: uno por semana, el MISMO para todos y sin escribir nada
 * nuevo en Firestore. Se deriva de la semana y del id de la liga, y su
 * progreso se calcula con los marcadores que ya se publican. Así no hace falta
 * tocar las reglas ni confiar en que alguien no manipule un contador común.
 */
export type LeagueChallenge = {
  /** Clave de cobro, única por liga y semana (se cobra en el progreso local). */
  key: string;
  id: "team_xp" | "everyone" | "leader";
  /** Objetivo, ya escalado al tamaño de la liga cuando toca. */
  target: number;
  reward: number;
};

/** Gemas del reto de liga: entre el reto diario (5) y el semanal (25). */
export const LEAGUE_REWARD = 20;

const LEAGUE_IDS = ["team_xp", "everyone", "leader"] as const;

/** XP que tiene que hacer cada miembro para contar en el reto «everyone». */
export const EVERYONE_XP = 100;

/** Índice determinista a partir de una cadena (sin Math.random, como en retos). */
function rotate(key: string, mod: number): number {
  let n = 0;
  for (const ch of key) n = (n * 31 + ch.charCodeAt(0)) % 100000;
  return n % mod;
}

/**
 * El reto de esta semana para esta liga. `members` escala el objetivo: una
 * liga de tres no puede tener la misma meta que una de veinte.
 */
export function leagueChallenge(
  leagueId: string,
  week: string,
  members: number,
): LeagueChallenge {
  const id = LEAGUE_IDS[rotate(`${leagueId}:${week}`, LEAGUE_IDS.length)];
  const people = Math.max(1, members);
  const target =
    id === "team_xp" ? 250 * people : id === "everyone" ? people : 500;
  return { key: `league:${week}:${leagueId}:${id}`, id, target, reward: LEAGUE_REWARD };
}

/** Progreso del reto compartido, calculado con los marcadores de la semana. */
export function leagueProgress(
  challenge: LeagueChallenge,
  scores: LeagueScore[],
): { value: number; target: number; done: boolean } {
  const value =
    challenge.id === "team_xp"
      ? scores.reduce((sum, s) => sum + s.xp, 0)
      : challenge.id === "everyone"
        ? scores.filter((s) => s.xp >= EVERYONE_XP).length
        : scores.reduce((max, s) => Math.max(max, s.xp), 0);
  return { value, target: challenge.target, done: value >= challenge.target };
}

/* ---------------- adelantamientos ---------------- */

/**
 * Quién estaba por debajo de mí la última vez que miré y ahora está por
 * encima. Se compara contra una foto GUARDADA EN EL DISPOSITIVO: no hace falta
 * publicar nada nuevo ni saber cuándo entra cada uno.
 */
export function overtakenBy(
  previous: LeagueScore[],
  current: LeagueScore[],
  uid: string,
): string[] {
  const before = rank(previous).findIndex((s) => s.uid === uid);
  const now = rank(current);
  const nowIndex = now.findIndex((s) => s.uid === uid);
  // Si antes no estaba en la foto (o ya no estoy), no hay adelantamiento que contar.
  if (before < 0 || nowIndex < 0) return [];

  const wasBelow = new Set(
    rank(previous)
      .slice(before + 1)
      .map((s) => s.uid),
  );
  return now
    .slice(0, nowIndex)
    .filter((s) => wasBelow.has(s.uid))
    .map((s) => s.alias);
}
