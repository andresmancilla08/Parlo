// Check runnable de la teoría. Correr:
//   node --experimental-strip-types lib/curriculum/teach.check.ts
// Verifica que TODA lección enseña antes de practicar y que la teoría es
// coherente con la lección (nada de teoría huérfana ni ejemplos vacíos).
import assert from "node:assert";
import { a1 } from "./levels/a1.ts";
import { a2 } from "./levels/a2.ts";
import { b1 } from "./levels/b1.ts";
import { b2 } from "./levels/b2.ts";
import { c1 } from "./levels/c1.ts";
import { c2 } from "./levels/c2.ts";
import { a1Teach } from "./teach/a1.ts";
import { a2Teach } from "./teach/a2.ts";
import { b1Teach } from "./teach/b1.ts";
import { b2Teach } from "./teach/b2.ts";
import { c1Teach } from "./teach/c1.ts";
import { c2Teach } from "./teach/c2.ts";
import type { TeachMap } from "./teach/types.ts";

const curriculum = [...a1, ...a2, ...b1, ...b2, ...c1, ...c2];
const teach: TeachMap = { ...a1Teach, ...a2Teach, ...b1Teach, ...b2Teach, ...c1Teach, ...c2Teach };
const lessonIds = new Set(curriculum.flatMap((u) => u.lessons.map((l) => l.id)));

// La teoría no puede apuntar a lecciones que no existen (typo en el id).
for (const id of Object.keys(teach)) {
  assert.ok(lessonIds.has(id), `teoría para una lección inexistente: ${id}`);
}

let steps = 0;
let examples = 0;

for (const id of lessonIds) {
  const t = teach[id];
  assert.ok(t, `${id}: sin teoría (se practicaría sin haber enseñado)`);
  assert.ok(t.length >= 3, `${id}: la teoría necesita al menos 3 pasos`);
  assert.ok(
    t.some((s) => s.kind === "examples"),
    `${id}: falta un paso de ejemplos (es el que se puede escuchar)`,
  );

  for (const [i, step] of t.entries()) {
    const at = `${id}#${i} (${step.kind})`;
    steps++;

    if (step.kind === "idea") {
      assert.ok(step.title.length > 3, `${at}: título vacío`);
      assert.ok(step.body.length > 40, `${at}: explicación demasiado corta`);
    }
    if (step.kind === "examples") {
      assert.ok(step.items.length >= 3, `${at}: pocos ejemplos`);
      for (const ex of step.items) {
        examples++;
        assert.ok(ex.en.trim() && ex.es.trim(), `${at}: ejemplo incompleto`);
        assert.ok(
          !/[áéíóúñ¿¡]/i.test(ex.en),
          `${at}: «${ex.en}» está en español pero se va a pronunciar en inglés`,
        );
      }
    }
    if (step.kind === "table") {
      assert.ok(step.rows.length >= 3, `${at}: tabla con menos de 3 filas`);
      for (const row of step.rows) {
        assert.ok(row[0]?.trim() && row[1]?.trim(), `${at}: fila incompleta`);
      }
    }
    if (step.kind === "pitfall") {
      assert.ok(step.wrong.trim() && step.right.trim(), `${at}: falta el par mal/bien`);
      assert.notEqual(step.wrong, step.right, `${at}: el error y el acierto son iguales`);
      assert.ok(step.body.length > 30, `${at}: explicación del error demasiado corta`);
    }
  }
}

console.log(
  `OK — ${lessonIds.size} lecciones con teoría, ${steps} pasos, ${examples} ejemplos con audio.`,
);
