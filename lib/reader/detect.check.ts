// Check runnable de la detección de idioma. Correr:
//   node --experimental-strip-types lib/reader/detect.check.ts
import assert from "node:assert";
import { detectLang, targetLang } from "./detect.ts";

assert.equal(
  detectLang("I woke up early and the house was quiet. The rain had stopped during the night."),
  "en",
);
assert.equal(
  detectLang("Me desperté temprano y la casa estaba en silencio. La lluvia se había detenido por la noche."),
  "es",
);
// Frases cortas y sin acentos: el conteo de palabras funcionales debe bastar.
assert.equal(detectLang("El perro come pan con la mano"), "es");
assert.equal(detectLang("The dog eats bread with the hand"), "en");
// Texto ambiguo o vacío: se asume inglés, que es el caso normal de la app.
assert.equal(detectLang(""), "en");
assert.equal(targetLang("en"), "es");
assert.equal(targetLang("es"), "en");

console.log("OK — detecta inglés y español, y elige el idioma contrario.");
