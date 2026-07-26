// Sistema de avance: objetivo diario, retos (diarios/semanales), premios y niveles.
// Todo se DERIVA de las estadísticas por día que guarda `lib/progress.ts`:
// así no hay dos fuentes de verdad ni contadores que se desincronicen.

/** Lo que se mide cada día. Cualquier reto se define sobre una de estas métricas. */
export type DayStats = {
  xp: number;
  lessons: number; // lecciones terminadas
  correct: number; // ejercicios acertados
  reviews: number; // cartas de repaso recordadas
  tutor: number; // mensajes enviados al tutor
  listens: number; // pronunciaciones escuchadas
};

export type Metric = keyof DayStats;

export const emptyDay: DayStats = {
  xp: 0,
  lessons: 0,
  correct: 0,
  reviews: 0,
  tutor: 0,
  listens: 0,
};

/** Meta de XP por día. El usuario la elige entre estas opciones. */
export const GOAL_OPTIONS = [20, 50, 100] as const;
export const DEFAULT_GOAL_XP = 50;

/* ---------------- fechas ---------------- */

export function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function shiftDay(key: string, days: number): string {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return dayKey(d);
}

/** Clave de la semana = lunes de esa semana (YYYY-MM-DD). */
export function weekKey(d: Date): string {
  const day = d.getUTCDay(); // 0 = domingo
  const back = day === 0 ? 6 : day - 1;
  return shiftDay(dayKey(d), -back);
}

/** Los 7 días de la semana a la que pertenece `d` (de lunes a domingo). */
export function weekDays(d: Date): string[] {
  const monday = weekKey(d);
  return Array.from({ length: 7 }, (_, i) => shiftDay(monday, i));
}

/* ---------------- retos ---------------- */

export type Period = "daily" | "weekly";

export type ChallengeDef = {
  id: string;
  metric: Metric;
  daily: number; // objetivo si sale como reto del día
  weekly: number; // objetivo si sale como reto de la semana
};

/**
 * Catálogo de retos. Se rotan de forma determinista por fecha (no aleatoria):
 * el mismo día siempre muestra los mismos retos, en cualquier dispositivo.
 */
export const CHALLENGES: ChallengeDef[] = [
  { id: "lessons", metric: "lessons", daily: 2, weekly: 8 },
  { id: "correct", metric: "correct", daily: 15, weekly: 80 },
  { id: "reviews", metric: "reviews", daily: 10, weekly: 50 },
  { id: "tutor", metric: "tutor", daily: 3, weekly: 15 },
  { id: "listens", metric: "listens", daily: 8, weekly: 40 },
  { id: "xp", metric: "xp", daily: 80, weekly: 400 },
];

export const REWARD = { daily: 5, weekly: 25 } as const;

export type Challenge = {
  key: string; // clave de reclamo, única por periodo
  id: string;
  period: Period;
  metric: Metric;
  target: number;
  reward: number;
};

/** Índice determinista a partir de una clave de fecha (sin Math.random). */
function rotate(key: string, offset: number): number {
  let n = 0;
  for (const ch of key) n = (n * 31 + ch.charCodeAt(0)) % 100000;
  return (n + offset) % CHALLENGES.length;
}

/** 3 retos del día + 2 de la semana, siempre los mismos para esa fecha. */
export function challengesFor(now: Date): Challenge[] {
  const dk = dayKey(now);
  const wk = weekKey(now);
  const out: Challenge[] = [];
  const used = new Set<string>();

  for (let i = 0; out.length < 3 && i < CHALLENGES.length; i++) {
    const def = CHALLENGES[rotate(dk, i)];
    if (used.has(def.id)) continue;
    used.add(def.id);
    out.push({
      key: `daily:${dk}:${def.id}`,
      id: def.id,
      period: "daily",
      metric: def.metric,
      target: def.daily,
      reward: REWARD.daily,
    });
  }

  const weeklyUsed = new Set<string>();
  for (let i = 0; weeklyUsed.size < 2 && i < CHALLENGES.length; i++) {
    const def = CHALLENGES[rotate(wk, i * 2)];
    if (weeklyUsed.has(def.id)) continue;
    weeklyUsed.add(def.id);
    out.push({
      key: `weekly:${wk}:${def.id}`,
      id: def.id,
      period: "weekly",
      metric: def.metric,
      target: def.weekly,
      reward: REWARD.weekly,
    });
  }

  return out;
}

/** Suma una métrica en los días indicados. */
export function sumMetric(
  days: Record<string, DayStats>,
  metric: Metric,
  keys: string[],
): number {
  return keys.reduce((acc, k) => acc + (days[k]?.[metric] ?? 0), 0);
}

/** Progreso de un reto (0..target) con los días que le corresponden. */
export function challengeProgress(
  ch: Challenge,
  days: Record<string, DayStats>,
  now: Date,
): number {
  const keys = ch.period === "daily" ? [dayKey(now)] : weekDays(now);
  return Math.min(sumMetric(days, ch.metric, keys), ch.target);
}

/* ---------------- premios (tienda de gemas) ---------------- */

export const SHIELD_COST = 30;

/* ---------------- niveles de avance ---------------- */

export const XP_PER_LEVEL = 200;
/** 5 rangos; cada uno cubre 5 niveles. Del último en adelante ya no cambia. */
export const RANKS = ["polluelo", "aprendiz", "charlatan", "elocuente", "maestro"] as const;

export type Rank = (typeof RANKS)[number];

export type LevelInfo = {
  level: number; // 1, 2, 3…
  rank: Rank;
  into: number; // XP dentro del nivel actual
  need: number; // XP que pide el nivel
  fraction: number; // 0..1
};

export function levelFromXp(xp: number): LevelInfo {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const into = xp % XP_PER_LEVEL;
  return {
    level,
    rank: RANKS[Math.min(Math.floor((level - 1) / 5), RANKS.length - 1)],
    into,
    need: XP_PER_LEVEL,
    fraction: into / XP_PER_LEVEL,
  };
}
