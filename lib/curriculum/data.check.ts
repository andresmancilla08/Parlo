// Check runnable del currículo. Correr:
//   node --experimental-strip-types lib/curriculum/data.check.ts
// Verifica que ningún ejercicio sea irresoluble (el fallo típico al añadir contenido).
import assert from "node:assert";
// Importa los niveles directamente: Node (strip-types) exige la extensión .ts,
// y `data.ts` importa sin extensión porque es lo que espera el bundler.
import { a1 } from "./levels/a1.ts";
import { a2 } from "./levels/a2.ts";
import { b1 } from "./levels/b1.ts";

const curriculum = [...a1, ...a2, ...b1];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const lessonIds = new Set<string>();
let exercises = 0;

for (const unit of curriculum) {
  for (const lesson of unit.lessons) {
    assert.ok(!lessonIds.has(lesson.id), `id de lección duplicado: ${lesson.id}`);
    lessonIds.add(lesson.id);
    assert.ok(lesson.vocab.length > 0, `${lesson.id}: sin vocabulario (no alimenta el SRS)`);
    assert.ok(lesson.exercises.length > 0, `${lesson.id}: sin ejercicios`);

    for (const [i, ex] of lesson.exercises.entries()) {
      const at = `${lesson.id}#${i} (${ex.kind})`;
      exercises++;

      if (ex.kind === "choose") {
        assert.ok(ex.options.includes(ex.answer), `${at}: la respuesta no está entre las opciones`);
        assert.equal(new Set(ex.options).size, ex.options.length, `${at}: opciones repetidas`);
      }

      if (ex.kind === "bank") {
        // Cada palabra de la respuesta debe existir en el banco, contando repeticiones.
        // (normalize parte las contracciones: «don't» → «don t», por eso se aplana.)
        const need = normalize(ex.answer).split(" ").filter(Boolean);
        const have = ex.bank.flatMap((tk) => normalize(tk).split(" ")).filter(Boolean);
        for (const w of need) {
          const idx = have.indexOf(w);
          assert.notEqual(idx, -1, `${at}: falta «${w}» en el banco`);
          have.splice(idx, 1);
        }
        assert.ok(
          !ex.bank.some((tk) => /\s/.test(tk)),
          `${at}: cada ficha del banco es una sola palabra`,
        );
      }
    }
  }
}

console.log(`OK — ${curriculum.length} unidades, ${lessonIds.size} lecciones, ${exercises} ejercicios.`);
