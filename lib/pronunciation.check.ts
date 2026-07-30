// Check runnable de la puntuación de pronunciación. Correr:
//   node --experimental-strip-types lib/pronunciation.check.ts
import assert from "node:assert";
import { GOOD, GREAT, normalizeWord, scoreAttempt, words } from "./pronunciation.ts";

// Normalización: el reconocedor devuelve texto con puntuación y mayúsculas.
assert.equal(normalizeWord("Hello,"), "hello");
assert.equal(normalizeWord("«What's»"), "what's");
// Las contracciones se expanden: así «I'm» y «I am» comparan igual.
assert.deepEqual(words("I'm  fine, thank you."), ["i", "am", "fine", "thank", "you"]);
assert.deepEqual(words("She doesn't know"), ["she", "does", "not", "know"]);
assert.deepEqual(words("We won't go"), ["we", "will", "not", "go"]);

// Clavada: todas las palabras.
const perfect = scoreAttempt("I would like a coffee", "I would like a coffee");
assert.equal(perfect.correct, 5);
assert.equal(perfect.score, 1);
assert.equal(perfect.rating, "great");
assert.ok(perfect.words.every((w) => w.ok));

// Insensible a mayúsculas y puntuación.
assert.equal(scoreAttempt("Good morning!", "good morning").score, 1);

// Contracción contra forma larga: no se penaliza (no es un fallo de pronunciación).
assert.equal(scoreAttempt("I'm fine", "I am fine").score, 1);
assert.equal(scoreAttempt("I don't know", "I do not know").score, 1);

// Una palabra que no se capta: se marca SOLO esa, el resto sigue alineado.
const oneMissing = scoreAttempt("the house that we bought", "the house we bought");
assert.equal(oneMissing.correct, 4);
assert.equal(oneMissing.total, 5);
assert.equal(oneMissing.words.find((w) => !w.ok)?.word, "that");

// Palabra de MÁS en lo reconocido: no descuadra las siguientes.
const extra = scoreAttempt("take a break", "take a big break");
assert.equal(extra.correct, 3, "las tres de la referencia siguen contando");
assert.equal(extra.score, 1);

// Frase equivocada: puntuación baja y sugerencia de repetir.
const wrong = scoreAttempt("she insisted on paying", "he needs a taxi");
assert.ok(wrong.score < GOOD, `esperaba < ${GOOD}, salió ${wrong.score}`);
assert.equal(wrong.rating, "retry");

// Silencio: 0 palabras captadas, nunca NaN ni excepción.
const silence = scoreAttempt("hello there", "");
assert.equal(silence.correct, 0);
assert.equal(silence.score, 0);
assert.equal(silence.rating, "retry");
assert.equal(scoreAttempt("", "").score, 0, "referencia vacía no rompe");

// Umbrales: 4 de 5 es «good», 9 de 10 es «great».
assert.equal(scoreAttempt("one two three four five", "one two three four").rating, "good");
assert.ok(GREAT > GOOD);

console.log("pronunciation.check ✓ todos los asserts pasan");
