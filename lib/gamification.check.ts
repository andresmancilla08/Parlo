// Check runnable de la gamificación. Correr:
//   node --experimental-strip-types lib/gamification.check.ts
import assert from "node:assert";
import {
  challengeProgress,
  challengesFor,
  dayKey,
  emptyDay,
  levelFromXp,
  shiftDay,
  sumMetric,
  weekDays,
  weekKey,
  XP_PER_LEVEL,
  type DayStats,
} from "./gamification.ts";

// --- fechas ---
assert.equal(dayKey(new Date("2026-07-26T10:00:00Z")), "2026-07-26");
assert.equal(shiftDay("2026-03-01", -1), "2026-02-28"); // cruza mes
assert.equal(shiftDay("2026-01-01", -1), "2025-12-31"); // cruza año
// 2026-07-26 es domingo → su semana empieza el lunes 20.
assert.equal(weekKey(new Date("2026-07-26T23:00:00Z")), "2026-07-20");
assert.equal(weekKey(new Date("2026-07-20T00:00:00Z")), "2026-07-20");
const week = weekDays(new Date("2026-07-22T12:00:00Z"));
assert.deepEqual(week[0], "2026-07-20");
assert.equal(week.length, 7);
assert.equal(week.at(-1), "2026-07-26");

// --- retos: deterministas, 3 diarios + 2 semanales, sin repetir ---
const now = new Date("2026-07-22T12:00:00Z");
const a = challengesFor(now);
const b = challengesFor(new Date("2026-07-22T20:00:00Z"));
assert.deepEqual(a, b, "los retos del mismo día deben ser idénticos");
assert.equal(a.filter((c) => c.period === "daily").length, 3);
assert.equal(a.filter((c) => c.period === "weekly").length, 2);
for (const period of ["daily", "weekly"] as const) {
  const ids = a.filter((c) => c.period === period).map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, `retos ${period} repetidos`);
}
// Otro día debería cambiar al menos un reto diario (rotación real).
const other = challengesFor(new Date("2026-07-23T12:00:00Z"));
assert.notDeepEqual(
  a.filter((c) => c.period === "daily").map((c) => c.id),
  other.filter((c) => c.period === "daily").map((c) => c.id),
);

// --- progreso de retos ---
const days: Record<string, DayStats> = {
  "2026-07-20": { ...emptyDay, lessons: 1, xp: 30 },
  "2026-07-22": { ...emptyDay, lessons: 5, xp: 90 },
};
assert.equal(sumMetric(days, "lessons", week), 6);
const daily = a.find((c) => c.period === "daily" && c.metric === "lessons");
if (daily) {
  // Sólo cuenta hoy y nunca pasa del objetivo.
  assert.equal(challengeProgress(daily, days, now), Math.min(5, daily.target));
}
const weekly = a.find((c) => c.period === "weekly" && c.metric === "xp");
if (weekly) assert.equal(challengeProgress(weekly, days, now), Math.min(120, weekly.target));

// --- niveles ---
assert.equal(levelFromXp(0).level, 1);
assert.equal(levelFromXp(XP_PER_LEVEL - 1).level, 1);
assert.equal(levelFromXp(XP_PER_LEVEL).level, 2);
assert.equal(levelFromXp(0).rank, "polluelo");
assert.equal(levelFromXp(XP_PER_LEVEL * 5).rank, "aprendiz"); // nivel 6
assert.equal(levelFromXp(XP_PER_LEVEL * 500).rank, "maestro"); // tope
assert.equal(levelFromXp(XP_PER_LEVEL * 2 + 50).into, 50);

console.log("OK — fechas, retos deterministas, progreso y niveles.");
