// Check runnable. Correr: node --experimental-strip-types lib/corrections.check.ts
import assert from "node:assert";
import { applyCorrections, markFragments } from "./corrections.ts";

const msg = "Yesterday I go to the cinema with my friends and we eat popcorns.";
const fixes = [
  { original: "I go", corrected: "I went" },
  { original: "we eat popcorns", corrected: "we ate popcorn" },
];

const segs = markFragments(msg, fixes);
assert.equal(segs.map((s) => s.text).join(""), msg, "los trozos reconstruyen el mensaje");
assert.deepEqual(
  segs.filter((s) => s.fix !== undefined).map((s) => [s.text, s.fix]),
  [
    ["I go", 0],
    ["we eat popcorns", 1],
  ],
);

assert.equal(applyCorrections(msg, fixes), "Yesterday I went to the cinema with my friends and we ate popcorn.");

// Mayúsculas distintas: se encuentra igual y se respeta el texto original al subrayar.
assert.deepEqual(
  markFragments("I Go home", [{ original: "i go", corrected: "I went" }]).map((s) => s.text),
  ["I Go", " home"],
);

// Fragmento que no está literal: no se subraya, y «Dilo tú» usa la corrección sola.
assert.deepEqual(markFragments("hello", [{ original: "xyz", corrected: "abc" }]), [{ text: "hello" }]);
assert.equal(applyCorrections("hello", [{ original: "xyz", corrected: "Hello there" }]), "Hello there");

// Solapes: gana la primera corrección.
const overlap = markFragments("a big dog", [
  { original: "big dog", corrected: "large dog" },
  { original: "big", corrected: "huge" },
]);
assert.deepEqual(overlap.filter((s) => s.fix !== undefined).map((s) => s.fix), [0]);

// Vacíos.
assert.deepEqual(markFragments("", fixes), []);
assert.equal(applyCorrections("ok", []), "ok");

console.log("corrections.check: OK");
