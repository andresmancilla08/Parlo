// Check runnable. Correr: node --experimental-strip-types lib/coach-window.check.ts
import assert from "node:assert";
import {
  COACH_MAX_CHARS,
  COACH_MAX_MESSAGES,
  COACH_TAIL,
  coachWindow,
  type WindowTurn,
} from "./coach-window.ts";

/** Conversación de escenario: abre el personaje y se alterna. */
function chat(n: number, len = 40): WindowTurn[] {
  const out: WindowTurn[] = [{ role: "assistant", content: "Hi there! What can I get you?" }];
  for (let i = 0; i < n; i++) {
    out.push({ role: i % 2 === 0 ? "user" : "assistant", content: `m${i} ${"x".repeat(len)}` });
  }
  return out;
}

function valid(w: WindowTurn[]) {
  assert.ok(w.length <= COACH_MAX_MESSAGES, "nunca más mensajes de los que acepta el servidor");
  assert.ok(
    JSON.stringify(w).length <= COACH_MAX_CHARS,
    "nunca más caracteres de los que acepta el servidor",
  );
}

// Corta: se manda tal cual.
const short = chat(5);
assert.deepEqual(coachWindow(short), short, "conversación corta sin tocar");

// Larga en número de turnos (el bug: >40 = error para siempre).
const long = chat(101); // termina en turno del usuario
const w = coachWindow(long);
valid(w);
assert.equal(w[0], long[0], "conserva el primer mensaje (el escenario)");
assert.equal(w.at(-1), long.at(-1), "conserva el último turno, el que hay que contestar");
assert.ok(w.length <= COACH_TAIL + 1, "primer mensaje + cola");
assert.notEqual(w[1].role, w[0].role, "en la costura se alternan los papeles");

// Larga en caracteres con pocos turnos.
const fat = chat(13, 1500);
const wf = coachWindow(fat);
valid(wf);
assert.equal(wf.at(-1), fat.at(-1), "el último turno sobrevive al recorte por tamaño");
assert.notEqual(wf[1].role, wf[0].role, "alternancia también al recortar por tamaño");

// Un único mensaje gigante: se recorta el texto antes que romper.
const huge: WindowTurn[] = [{ role: "user", content: "y".repeat(20_000) }];
const wh = coachWindow(huge);
valid(wh);
assert.equal(wh.at(-1)!.role, "user");

// Charla libre (empieza el usuario).
const free: WindowTurn[] = Array.from({ length: 60 }, (_, i) => ({
  role: i % 2 === 0 ? "user" : "assistant",
  content: `t${i}`,
}));
free.push({ role: "user", content: "last" });
const wfree = coachWindow(free);
valid(wfree);
assert.equal(wfree[0], free[0]);
assert.equal(wfree[1].role, "assistant", "tras un primer turno del usuario la cola empieza por el tutor");
assert.equal(wfree.at(-1)!.content, "last");

// Vacío.
assert.deepEqual(coachWindow([]), []);

console.log("coach-window: OK");
