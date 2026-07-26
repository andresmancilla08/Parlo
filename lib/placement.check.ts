// Check runnable del test de nivel. Correr:
//   node --experimental-strip-types lib/placement.check.ts
import assert from "node:assert";
import { PASS, PLACEMENT_ITEMS, PLACEMENT_LEVELS, placementResult } from "./placement.ts";

const ids = new Set<string>();
for (const it of PLACEMENT_ITEMS) {
  assert.ok(!ids.has(it.id), `id duplicado: ${it.id}`);
  ids.add(it.id);
  assert.ok(it.options.includes(it.answer), `${it.id}: la respuesta no está entre las opciones`);
  assert.equal(new Set(it.options).size, it.options.length, `${it.id}: opciones repetidas`);
  assert.ok(it.explain.length > 10, `${it.id}: falta explicación`);
}
for (const lvl of PLACEMENT_LEVELS) {
  const n = PLACEMENT_ITEMS.filter((i) => i.level === lvl).length;
  assert.equal(n, 4, `${lvl}: se esperaban 4 ítems, hay ${n}`);
}

const all = (pred: (id: string) => boolean) =>
  Object.fromEntries(PLACEMENT_ITEMS.map((i) => [i.id, pred(i.id) ? i.answer : "___"]));

// Nadie acierta nada → empieza en A1.
assert.equal(placementResult(all(() => false)).level, "A1");
// Sólo A1 bien → empieza en A2.
assert.equal(placementResult(all((id) => id.startsWith("p-a1"))).level, "A2");
// A1 y A2 bien → empieza en B1.
assert.equal(
  placementResult(all((id) => id.startsWith("p-a1") || id.startsWith("p-a2"))).level,
  "B1",
);
// Todo bien → B1 (es el nivel más alto con contenido hoy).
assert.equal(placementResult(all(() => true)).level, "B1");
// Justo en el umbral: PASS de 4 en A1 basta para subir.
const partial = all(() => false);
PLACEMENT_ITEMS.filter((i) => i.level === "A1")
  .slice(0, PASS)
  .forEach((i) => (partial[i.id] = i.answer));
assert.equal(placementResult(partial).level, "A2");

const full = placementResult(all(() => true));
assert.equal(full.correct, PLACEMENT_ITEMS.length);
console.log(`OK — ${PLACEMENT_ITEMS.length} ítems, ${PLACEMENT_LEVELS.length} niveles, colocación coherente.`);
