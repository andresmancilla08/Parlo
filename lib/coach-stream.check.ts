// Check runnable. Correr: node --experimental-strip-types lib/coach-stream.check.ts
import assert from "node:assert";
import { extractReply, parseCoachFinal, sanitizeTurn } from "./coach-stream.ts";

const REPLY = 'Great choice! "Flat white" coming up.\nAnything else?';
const full = JSON.stringify({
  reply: REPLY,
  goalsMet: ["order"],
  corrections: [
    { original: "I want a coffee", corrected: "Can I have a coffee", why: "Más cortés.", examples: ["Can I have a tea?"] },
  ],
});

// Antes de la clave: nada.
assert.equal(extractReply('{"rep'), null);
assert.equal(extractReply(""), null);

// La respuesta crece trozo a trozo, siempre como prefijo del texto final.
for (let i = 1; i <= full.length; i++) {
  const r = extractReply(full.slice(0, i));
  if (!r) continue;
  assert.ok(REPLY.startsWith(r.reply), `prefijo limpio en ${i}: ${JSON.stringify(r.reply)}`);
}
assert.deepEqual(extractReply(full), { reply: REPLY, done: true });

// Escapes partidos justo en la frontera.
assert.deepEqual(extractReply('{"reply":"He said \\'), { reply: "He said ", done: false });
assert.deepEqual(extractReply('{"reply":"caf\\u00'), { reply: "caf", done: false });
assert.deepEqual(extractReply('{"reply":"caf\\u00e9!"'), { reply: "café!", done: true });

// Si el modelo pone las correcciones antes, `"reply"` escapado dentro de otra cadena no engaña.
const tricky = '{"corrections":[{"original":"say \\"reply\\": hi","corrected":"x"}],"reply":"Real one"}';
assert.deepEqual(extractReply(tricky), { reply: "Real one", done: true });

// Final: JSON completo y limpio.
const turn = parseCoachFinal(full)!;
assert.equal(turn.corrections.length, 1);
assert.deepEqual(turn.goalsMet, ["order"]);

// Final con vallas de código.
assert.equal(parseCoachFinal("```json\n" + full + "\n```")?.reply, REPLY);

// JSON cortado a mitad de correcciones: se salva la respuesta, sin correcciones.
const cut = full.slice(0, full.indexOf('"corrections"') + 20);
assert.deepEqual(parseCoachFinal(cut), { reply: REPLY, goalsMet: [], corrections: [] });

// Respaldo del servidor (texto plano dentro de JSON) también vale.
assert.deepEqual(parseCoachFinal(JSON.stringify({ corrections: [], reply: "Hello!" })), {
  reply: "Hello!",
  goalsMet: [],
  corrections: [],
});

// Basura o respuesta vacía: null (el cliente lo trata como error).
assert.equal(parseCoachFinal("oops"), null);
assert.equal(parseCoachFinal('{"reply":"   "}'), null);

// sanitize descarta correcciones sin forma y limita a 3.
const messy = sanitizeTurn({
  reply: "ok",
  goalsMet: ["a", 3, "b"],
  corrections: [
    null,
    { original: "a" },
    { original: "a", corrected: "b", examples: ["1", "2", "3"] },
    ...Array(5).fill({ original: "x", corrected: "y" }),
  ],
})!;
assert.deepEqual(messy.goalsMet, ["a", "b"]);
assert.equal(messy.corrections.length, 3);
assert.deepEqual(messy.corrections[0], { original: "a", corrected: "b", why: "", examples: ["1", "2"] });

console.log("coach-stream.check: OK");
