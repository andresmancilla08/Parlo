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
