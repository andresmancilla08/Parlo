// Check runnable de la fusión del progreso y de la decisión de dueño. Correr:
//   node --experimental-strip-types lib/progress-merge.check.ts
import assert from "node:assert";
import { isEmptySnapshot, merge, ownerDecision } from "./progress-merge.ts";
import type { ProgressSnapshot } from "./progress.ts";

const empty: ProgressSnapshot = {
  xp: 0,
  gems: 0,
  streak: 0,
  lastActiveDay: null,
  completed: [],
  stars: {},
  cards: {},
  saved: {},
  tutorMessages: 0,
  listens: 0,
  days: {},
  goalXp: 30,
  claims: {},
  shields: 0,
  lastGoalDay: null,
  startLevel: null,
  skipped: [],
  taught: [],
};
const snap = (patch: Partial<ProgressSnapshot>): ProgressSnapshot => ({ ...empty, ...patch });

// --- dueño ---
const mine = snap({ xp: 120, completed: ["a1-u1-l1"] });
assert.equal(isEmptySnapshot(empty), true);
assert.equal(isEmptySnapshot(mine), false);
assert.equal(ownerDecision("uid-a", "uid-a", mine), "merge", "mismo dueño → fusiona");
assert.equal(ownerDecision(null, "uid-a", mine), "merge", "anónimo/antiguo → fusiona");
assert.equal(ownerDecision(undefined, "uid-a", mine), "merge", "persistido sin campo owner → fusiona");
assert.equal(ownerDecision("uid-b", "uid-a", mine), "discard", "de otra cuenta → descarta");
assert.equal(ownerDecision("uid-b", "uid-a", empty), "merge", "vacío de otra cuenta → da igual");

// --- fusión sin base: gana lo más avanzado ---
const local = snap({
  xp: 100,
  gems: 5,
  completed: ["l1", "l2"],
  stars: { l1: 2 },
  cards: { cat: { key: "cat", ef: 2.5, interval: 1, reps: 1, due: 200 } },
  days: { "2026-10-27": { xp: 40, lessons: 2, correct: 4, reviews: 0, tutor: 0, listens: 1 } },
  goalXp: 50,
  lastActiveDay: "2026-10-27",
});
const remote = snap({
  xp: 300,
  gems: 2,
  completed: ["l2", "l3"],
  stars: { l1: 3, l3: 1 },
  cards: {
    cat: { key: "cat", ef: 2.5, interval: 3, reps: 2, due: 100 },
    dog: { key: "dog", ef: 2.5, interval: 1, reps: 1, due: 50 },
  },
  days: { "2026-10-27": { xp: 10, lessons: 3, correct: 1, reviews: 2, tutor: 0, listens: 0 } },
  lastActiveDay: "2026-10-26",
});
const m = merge(local, remote);
assert.equal(m.xp, 300);
assert.equal(m.gems, 5);
assert.deepEqual([...m.completed].sort(), ["l1", "l2", "l3"]);
assert.deepEqual(m.stars, { l1: 3, l3: 1 });
assert.equal(m.cards.cat.due, 200, "gana la carta repasada después");
assert.ok(m.cards.dog);
assert.deepEqual(m.days["2026-10-27"], { xp: 40, lessons: 3, correct: 4, reviews: 2, tutor: 0, listens: 1 });
assert.equal(m.goalXp, 50, "el objetivo lo manda el dispositivo");
assert.equal(m.lastActiveDay, "2026-10-27");
// Idempotente: fusionar dos veces con el mismo remoto no cambia nada.
assert.deepEqual(merge(m, remote), m);
// Nada sale `undefined` (Firestore lo rechaza).
for (const [k, v] of Object.entries(m)) assert.notStrictEqual(v, undefined, k);

console.log("progress-merge ✓");
