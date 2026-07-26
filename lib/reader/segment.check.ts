// Check runnable del lector. Correr:
//   node --experimental-strip-types lib/reader/segment.check.ts
import assert from "node:assert";
import { buildIndex, cleanWord, search, toSentences, toWords } from "./segment.ts";

const text = "I woke up early. The city was still asleep! Was it Monday? Yes, it was.";
const sentences = toSentences(text);
assert.equal(sentences.length, 4, `esperaba 4 frases, hay ${sentences.length}`);
assert.ok(sentences[0].text.startsWith("I woke"));
assert.equal(toSentences("   ").length, 0);

// Las palabras conservan los espacios para poder pintarlas una a una.
const words = toWords("The city was still asleep!");
assert.equal(words.filter((w) => w.trim()).length, 5);
assert.equal(cleanWord("asleep!"), "asleep");
assert.equal(cleanWord("don't"), "don't");
assert.equal(cleanWord("«hola»"), "hola");

const index = buildIndex(sentences);
assert.deepEqual(search(index, "city"), [1]);
assert.deepEqual(search(index, "was"), [1, 2, 3]);
assert.deepEqual(search(index, "mon"), [2]); // por prefijo
assert.deepEqual(search(index, "x"), []);

console.log(`OK — ${sentences.length} frases, índice con ${index.size} palabras.`);
