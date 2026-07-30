// Check runnable del vocabulario del lector. Correr:
//   node --experimental-strip-types lib/reader/vocab.check.ts
import assert from "node:assert";
import { vocabCandidates } from "./vocab.ts";

const text = `
The weather was terrible yesterday. The weather is better today.
Sarah went to the market and Sarah bought bread.
Climate change affects the weather everywhere. Climate models predict more rain.
`;

const top = vocabCandidates(text);
const words = top.map((c) => c.word);

// La más repetida manda.
assert.equal(top[0].word, "weather");
assert.equal(top[0].count, 3);

// Las funcionales no entran aunque salgan más veces que ninguna.
for (const stop of ["the", "was", "and", "more"]) {
  assert.ok(!words.includes(stop), `«${stop}» es palabra funcional, no vocabulario`);
}

// Nombres propios fuera (Sarah aparece dos veces y NO es vocabulario).
assert.ok(!words.includes("sarah"), "los nombres propios no son vocabulario");

// Pero una palabra en mayúscula al empezar frase SÍ cuenta.
assert.ok(words.includes("climate"), "«Climate» abre frase: es vocabulario legítimo");

// Palabras cortas fuera.
assert.ok(
  words.every((w) => w.length >= 4),
  "nada de palabras de menos de 4 letras",
);

// Lo que ya está en el SRS no se propone otra vez.
const withKnown = vocabCandidates(text, new Set(["weather"])).map((c) => c.word);
assert.ok(!withKnown.includes("weather"), "no repetir lo que ya está en el repaso");

// El límite se respeta y el orden es determinista.
assert.ok(vocabCandidates(text, new Set(), 3).length <= 3);
assert.deepEqual(vocabCandidates(text).map((c) => c.word), words, "mismo texto → mismo orden");

// Casos límite: texto vacío o sólo funcionales.
assert.deepEqual(vocabCandidates(""), []);
assert.deepEqual(vocabCandidates("the of and to in"), []);

console.log(`vocab.check ✓ ${top.length} candidatas, la primera «${top[0].word}» (${top[0].count})`);
