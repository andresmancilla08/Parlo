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
