// Check runnable. Correr: node --experimental-strip-types lib/sentences.check.ts
import assert from "node:assert";
import { MAX_CHUNK, MIN_CHUNK, sentenceEnds, takeSentences } from "./sentences.ts";

// Frase corta: no sale hasta tener MIN_CHUNK o hasta el final.
assert.deepEqual(takeSentences("Hi there! ", false), { chunks: [], rest: "Hi there! " }, "corta y sin terminar: espera");
assert.deepEqual(takeSentences("Hi there!", true), { chunks: ["Hi there!"], rest: "" }, "al final se vacía todo");

// Se juntan oraciones cortas hasta pasar el mínimo y se corta en el fin de oración.
const two = "Hi there! Welcome to the café, it's lovely to see you. What can";
const r1 = takeSentences(two, false);
assert.deepEqual(r1.chunks, ["Hi there! Welcome to the café, it's lovely to see you."], "junta hasta ≥40 y corta en el punto");
assert.equal(r1.rest, " What can", "lo que sigue queda pendiente");
assert.ok(r1.chunks[0].length >= MIN_CHUNK);

// Un punto al final del buffer NO cuenta si aún llega texto («3.» de «3.5»).
assert.deepEqual(sentenceEnds("It costs 3.", false), [], "punto al final sin terminar: no es fin");
assert.deepEqual(sentenceEnds("It costs 3.5 pounds.", true), [20], "3.5 no corta; el punto final sí");

// Abreviaturas: «Mr.» no cierra la oración.
const mr = "Good morning, I'm here to see Mr. Smith about the flat on the high street. Is he in?";
assert.deepEqual(
  takeSentences(mr, true).chunks,
  ["Good morning, I'm here to see Mr. Smith about the flat on the high street.", "Is he in?"],
  "Mr. no corta",
);

// Signos repetidos y comillas de cierre van con la frase.
assert.deepEqual(sentenceEnds('He said "Really?!" and left.', true), [18, 28]);

// Oración larguísima sin punto: se corta en una coma antes del tope.
const long = "I think that " + "we should probably talk about it, ".repeat(8);
const r2 = takeSentences(long, false);
assert.ok(r2.chunks.length >= 1, "corta aunque no haya punto");
for (const c of r2.chunks) assert.ok(c.length <= MAX_CHUNK, "ningún trozo pasa del tope");
assert.ok(r2.chunks[0].endsWith(","), "corta en la coma");
assert.equal(
  (r2.chunks.join(" ") + " " + r2.rest).replace(/\s+/g, " ").trim(),
  long.replace(/\s+/g, " ").trim(),
  "no se pierde texto",
);

// Alimentación incremental (como el stream): el resultado final es el texto entero.
const reply =
  "That sounds great! A flat white and a croissant coming right up. Would you like it to take away, or are you staying in?";
let buffer = "";
const spoken: string[] = [];
for (let i = 0; i < reply.length; i += 7) {
  buffer += reply.slice(i, i + 7);
  const { chunks, rest } = takeSentences(buffer, false);
  spoken.push(...chunks);
  buffer = rest;
}
spoken.push(...takeSentences(buffer, true).chunks);
assert.equal(spoken.join(" "), reply, "incremental = texto completo");
assert.equal(spoken[0], "That sounds great! A flat white and a croissant coming right up.", "primera frase con ≥40 + punto");

// Vacío.
assert.deepEqual(takeSentences("", true), { chunks: [], rest: "" });
assert.deepEqual(takeSentences("   ", true), { chunks: [], rest: "" });

console.log("sentences.check: OK");
