// Check runnable. Correr: node --experimental-strip-types lib/live/transcript.check.ts
import assert from "node:assert";
import {
  addFragment,
  closeTurn,
  EMPTY_TRANSCRIPT,
  formatClock,
  REVIEW_MAX_CHARS,
  reviewText,
  visibleLines,
} from "./transcript.ts";

// Trozos tal y como llegan: el modelo empieza ANTES de que termine de llegar
// la transcripción del usuario.
let t = EMPTY_TRANSCRIPT;
t = addFragment(t, "assistant", "Hi there!");
t = addFragment(t, "assistant", " What can I get you?");
t = closeTurn(t);
assert.deepEqual(t.lines, [{ role: "assistant", text: "Hi there! What can I get you?" }]);

t = addFragment(t, "user", "Can I have");
t = addFragment(t, "assistant", "Sure,");
t = addFragment(t, "user", " a flat white?");
t = addFragment(t, "assistant", "  coming   up.");

// En vivo: el usuario va antes que la respuesta, aunque llegara después.
assert.deepEqual(visibleLines(t), [
  { role: "assistant", text: "Hi there! What can I get you?", live: false },
  { role: "user", text: "Can I have a flat white?", live: true },
  { role: "assistant", text: "Sure, coming up.", live: true },
]);

t = closeTurn(t);
assert.equal(t.user, "");
assert.equal(t.model, "");
assert.deepEqual(
  t.lines.map((l) => l.role),
  ["assistant", "user", "assistant"],
);

// Cerrar sin nada pendiente no añade líneas vacías.
assert.equal(closeTurn(t).lines.length, 3);
// addFragment con texto vacío no cambia nada.
assert.equal(addFragment(t, "user", ""), t);

// Dos turnos seguidos del usuario (el VAD partió la frase) se funden.
let u = addFragment(EMPTY_TRANSCRIPT, "user", "I want");
u = closeTurn(u);
u = addFragment(u, "user", "a coffee");
u = closeTurn(u);
assert.deepEqual(u.lines, [{ role: "user", text: "I want a coffee" }]);

// Lo que se manda a revisar: SOLO lo del usuario, incluido lo que aún no se cerró.
let r = closeTurn(addFragment(addFragment(EMPTY_TRANSCRIPT, "assistant", "Hello"), "user", "I am agree"));
r = addFragment(r, "user", "He go to work");
assert.equal(reviewText(r), "I am agree\nHe go to work");
assert.equal(reviewText(EMPTY_TRANSCRIPT), "", "llamada sin habla: nada que revisar");

// Llamadas largas: se queda lo último y empieza en frase entera.
let long = EMPTY_TRANSCRIPT;
for (let i = 0; i < 80; i++) {
  long = addFragment(long, "user", `Sentence number ${i} is here.`);
  long = closeTurn(addFragment(long, "assistant", "ok"));
}
const reviewed = reviewText(long);
assert.ok(reviewed.length <= REVIEW_MAX_CHARS, "cabe en lo que acepta /api/coach");
assert.ok(reviewed.endsWith("Sentence number 79 is here."), "conserva lo más reciente");
assert.ok(reviewed.startsWith("Sentence number"), "no empieza a media frase");

assert.equal(formatClock(0), "00:00");
assert.equal(formatClock(65_400), "01:05");
assert.equal(formatClock(15 * 60_000), "15:00");
assert.equal(formatClock(-5), "00:00");

console.log("live/transcript.check ✓ todos los asserts pasan");
