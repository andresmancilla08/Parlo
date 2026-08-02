// Check runnable de la lógica pura de la liga. Correr:
//   node --experimental-strip-types lib/league.check.ts
// (La parte de Firestore no se prueba aquí: la frontera real son las reglas.)
import assert from "node:assert";
import {
  CODE_LENGTH,
  isValidCode,
  makeCode,
  normalizeCode,
  rank,
  validateAlias,
  weeklyXp,
  leagueChallenge,
  leagueProgress,
  overtakenBy,
  LEAGUE_REWARD,
  EVERYONE_XP,
} from "./league-core.ts";
import { weekDays, weekKey } from "./gamification.ts";

// --- alias: es lo ÚNICO público, así que se valida de verdad ---
assert.equal(validateAlias("Ana"), null);
assert.equal(validateAlias("ana_92"), null);
assert.equal(validateAlias("Jose María"), null, "acentos y espacios valen");
assert.equal(validateAlias("A"), "short");
assert.equal(validateAlias("  "), "short");
assert.equal(validateAlias("x".repeat(17)), "long");
assert.equal(validateAlias("ana@correo.com"), "chars", "un correo NO puede colarse como alias");
assert.equal(validateAlias("+34600111222"), "chars");

// --- código: legible y sin ambigüedades ---
const code = makeCode();
assert.equal(code.length, CODE_LENGTH);
assert.ok(/^[BCDFGHJKLMNPQRSTVWXYZ23456789]+$/.test(code), `código raro: ${code}`);
assert.ok(!/[AEIOU01]/.test(code), "sin vocales ni caracteres ambiguos");
// Determinista con un generador fijo: mismo random → mismo código.
const fixed = makeCode(() => 0);
assert.equal(fixed, "B".repeat(CODE_LENGTH));

assert.equal(normalizeCode(" bc-df 23 "), "BCDF23");
assert.ok(isValidCode("bcdf23"));
assert.ok(!isValidCode("BCD"));

// --- XP de la semana: sólo cuentan los días de ESA semana ---
const monday = weekKey(new Date("2026-07-29T12:00:00Z")); // miércoles → lunes 27
const day = (xp: number) => ({ xp, lessons: 0, correct: 0, reviews: 0, tutor: 0, listens: 0 });
const days = {
  [monday]: day(30),
  "2026-07-28": day(20),
  "2026-07-29": day(50),
  "2026-07-20": day(999), // semana anterior: NO cuenta
};
const thisWeek = weekDays(new Date("2026-07-29T12:00:00Z"));
assert.equal(weeklyXp(days, thisWeek), 100);
assert.equal(weeklyXp({}, thisWeek), 0, "sin datos, cero");

// --- ranking ---
const ordered = rank([
  { uid: "1", alias: "Ana", xp: 40 },
  { uid: "2", alias: "Beto", xp: 120 },
  { uid: "3", alias: "Cris", xp: 40 },
]);
assert.deepEqual(
  ordered.map((s) => s.alias),
  ["Beto", "Ana", "Cris"],
  "más XP primero; a igualdad, alfabético",
);
// No muta la entrada.
const input = [{ uid: "1", alias: "Z", xp: 1 }, { uid: "2", alias: "A", xp: 2 }];
rank(input);
assert.equal(input[0].alias, "Z", "rank() no debe reordenar el array original");

console.log("league.check ✓ todos los asserts pasan");

/* ---------------- reto compartido ---------------- */
// El reto es el MISMO para todos los de la liga y cambia cada semana.
const chA = leagueChallenge("liga-1", "2026-W31", 4);
const chB = leagueChallenge("liga-1", "2026-W31", 4);
const chC = leagueChallenge("liga-1", "2026-W32", 4);
const chD = leagueChallenge("liga-2", "2026-W31", 4);
assert.deepEqual(chA, chB, "el reto tiene que ser determinista");
assert.notEqual(chA.key, chC.key, "cada semana, su reto");
assert.notEqual(chA.key, chD.key, "cada liga, su reto");
assert.ok(chA.reward === LEAGUE_REWARD);

// El objetivo escala con el tamaño de la liga (menos el del líder, que es fijo).
for (const id of ["team_xp", "everyone", "leader"]) {
  // se busca una liga cuyo reto sea el que toca probar
  let found = null;
  for (let n = 0; n < 500 && !found; n++) {
    const c = leagueChallenge(`l${n}`, "2026-W31", 4);
    if (c.id === id) found = c;
  }
  assert.ok(found, `no sale nunca el reto ${id}`);
}

const team = leagueChallenge("liga-team", "2026-W31", 4);
const scores = [
  { uid: "a", alias: "Ana", xp: 400 },
  { uid: "b", alias: "Beto", xp: 120 },
  { uid: "c", alias: "Caro", xp: 80 },
  { uid: "d", alias: "Dani", xp: 0 },
];
const p = leagueProgress({ ...team, id: "team_xp", target: 1000 }, scores);
assert.equal(p.value, 600, "team_xp suma la XP de todos");
assert.equal(p.done, false);
assert.ok(leagueProgress({ ...team, id: "team_xp", target: 600 }, scores).done);

const every = leagueProgress({ ...team, id: "everyone", target: 4 }, scores);
assert.equal(every.value, 2, "everyone cuenta a los que llegan a EVERYONE_XP");
assert.equal(EVERYONE_XP, 100);
assert.equal(every.done, false);

const leader = leagueProgress({ ...team, id: "leader", target: 500 }, scores);
assert.equal(leader.value, 400, "leader mira al que más XP tiene");
assert.equal(leagueProgress({ ...team, id: "leader", target: 400 }, scores).done, true);
assert.equal(leagueProgress({ ...team, id: "team_xp", target: 10 }, []).value, 0, "liga vacía");
assert.equal(leagueProgress({ ...team, id: "leader", target: 10 }, []).value, 0);

/* ---------------- adelantamientos ---------------- */
const antes = [
  { uid: "yo", alias: "Yo", xp: 300 },
  { uid: "a", alias: "Ana", xp: 200 },
  { uid: "b", alias: "Beto", xp: 100 },
];
const ahora = [
  { uid: "a", alias: "Ana", xp: 500 },
  { uid: "yo", alias: "Yo", xp: 300 },
  { uid: "b", alias: "Beto", xp: 100 },
];
assert.deepEqual(overtakenBy(antes, ahora, "yo"), ["Ana"]);
assert.deepEqual(overtakenBy(antes, antes, "yo"), [], "sin cambios, sin aviso");
assert.deepEqual(
  overtakenBy(antes, [{ uid: "yo", alias: "Yo", xp: 900 }, ...antes.slice(1)], "yo"),
  [],
  "adelantar yo a otros no es un adelantamiento en mi contra",
);
assert.deepEqual(
  overtakenBy(
    antes,
    [
      { uid: "b", alias: "Beto", xp: 800 },
      { uid: "a", alias: "Ana", xp: 700 },
      { uid: "yo", alias: "Yo", xp: 300 },
    ],
    "yo",
  ),
  ["Beto", "Ana"],
  "dos adelantamientos, en el orden del ranking nuevo",
);
assert.deepEqual(overtakenBy([], ahora, "yo"), [], "sin foto previa no se avisa");
assert.deepEqual(
  overtakenBy(antes, [{ uid: "a", alias: "Ana", xp: 500 }], "yo"),
  [],
  "si ya no estoy en la liga, no hay nada que avisar",
);
// Quien ya estaba por delante y sigue por delante NO cuenta como adelantamiento.
assert.deepEqual(
  overtakenBy(
    [
      { uid: "a", alias: "Ana", xp: 900 },
      { uid: "yo", alias: "Yo", xp: 300 },
    ],
    [
      { uid: "a", alias: "Ana", xp: 950 },
      { uid: "yo", alias: "Yo", xp: 310 },
    ],
    "yo",
  ),
  [],
);

console.log("league.check ✓ reto compartido y adelantamientos");
