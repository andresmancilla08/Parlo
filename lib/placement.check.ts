// Check runnable del test de nivel. Correr:
//   node --experimental-strip-types lib/placement.check.ts
import assert from "node:assert";
import {
  BLOCK,
  blockResult,
  DONT_KNOW,
  itemsForLevel,
  nextLevel,
  PASS,
  PLACEMENT_ITEMS,
  PLACEMENT_LEVELS,
  placementResult,
} from "./placement.ts";

const ids = new Set<string>();
for (const it of PLACEMENT_ITEMS) {
  assert.ok(!ids.has(it.id), `id duplicado: ${it.id}`);
  ids.add(it.id);
  assert.ok(it.options.includes(it.answer), `${it.id}: la respuesta no está entre las opciones`);
  assert.equal(new Set(it.options).size, it.options.length, `${it.id}: opciones repetidas`);
  assert.ok(it.explain.length > 10, `${it.id}: falta explicación`);
  assert.ok(!it.options.includes(DONT_KNOW), `${it.id}: «no lo sé» no es una opción del ítem`);
  assert.ok(it.full, `${it.id}: falta la frase completa (se escucha al repasar)`);
}
for (const lvl of PLACEMENT_LEVELS) {
  const n = itemsForLevel(lvl).length;
  assert.equal(n, BLOCK, `${lvl}: se esperaban ${BLOCK} ítems, hay ${n}`);
}
assert.equal(nextLevel("A1"), "A2");
assert.equal(nextLevel("B1"), null);

/** Respuestas de los niveles indicados; `ok` decide si se acierta. */
function answersFor(levels: string[], ok: (id: string) => boolean) {
  return Object.fromEntries(
    PLACEMENT_ITEMS.filter((i) => levels.includes(i.level)).map((i) => [
      i.id,
      ok(i.id) ? i.answer : DONT_KNOW,
    ]),
  );
}

// Falla el primer bloque → empieza en A1 y el test ni pregunta A2/B1.
const zero = placementResult(answersFor(["A1"], () => false));
assert.equal(zero.level, "A1");
assert.equal(zero.total, BLOCK, "sólo se cuentan los ítems respondidos");
assert.equal(zero.missed.length, BLOCK);
assert.deepEqual(Object.keys(zero.byLevel), ["A1"]);

// A1 bien y A2 mal → empieza en A2.
assert.equal(placementResult(answersFor(["A1", "A2"], (id) => id.startsWith("p-a1"))).level, "A2");

// A1 y A2 bien, B1 mal → empieza en B1.
assert.equal(
  placementResult(answersFor(["A1", "A2", "B1"], (id) => !id.startsWith("p-b1"))).level,
  "B1",
);

// Todo bien → B1 (es el nivel más alto con contenido hoy).
const full = placementResult(answersFor(["A1", "A2", "B1"], () => true));
assert.equal(full.level, "B1");
assert.equal(full.correct, PLACEMENT_ITEMS.length);
assert.equal(full.missed.length, 0);

// Justo en el umbral: PASS de BLOCK basta para subir de bloque.
const threshold: Record<string, string> = {};
itemsForLevel("A1").forEach((i, idx) => {
  threshold[i.id] = idx < PASS ? i.answer : DONT_KNOW;
});
assert.ok(blockResult("A1", threshold).passed);
assert.equal(placementResult(threshold).level, "A2");

// Un acierto menos ya no sube.
const belowThreshold: Record<string, string> = {};
itemsForLevel("A1").forEach((i, idx) => {
  belowThreshold[i.id] = idx < PASS - 1 ? i.answer : DONT_KNOW;
});
assert.equal(blockResult("A1", belowThreshold).passed, false);
assert.equal(placementResult(belowThreshold).level, "A1");

console.log(
  `OK — ${PLACEMENT_ITEMS.length} ítems en bloques de ${BLOCK} ` +
    `(${PLACEMENT_LEVELS.length} niveles, ${PASS} aciertos para subir), colocación coherente.`,
);
