// Check runnable de la escucha activa. Correr:
//   node --experimental-strip-types lib/listening.check.ts
import assert from "node:assert";
import {
  blankHint,
  blanksFor,
  coreOf,
  DIFFICULTIES,
  sameWord,
  tokenize,
  TRACKS,
} from "./listening.ts";

const ids = new Set<string>();
for (const track of TRACKS) {
  assert.ok(!ids.has(track.id), `pista duplicada: ${track.id}`);
  ids.add(track.id);
  assert.ok(track.lines.length >= 5, `${track.id}: muy corta`);
  for (const line of track.lines) {
    assert.ok(tokenize(line).length >= 4, `${track.id}: frase demasiado corta «${line}»`);
    for (const d of DIFFICULTIES) {
      const blanks = blanksFor(line, d);
      // Siempre hay algo que completar y nunca se oculta toda la frase.
      assert.ok(blanks.length >= 1, `${track.id}/${d.id}: sin huecos en «${line}»`);
      assert.ok(
        blanks.length < tokenize(line).length,
        `${track.id}/${d.id}: se oculta la frase entera`,
      );
      // Determinista: dos llamadas dan lo mismo.
      assert.deepEqual(blanks, blanksFor(line, d));
      for (const i of blanks) {
        const tk = tokenize(line)[i];
        assert.ok(coreOf(tk).length >= 1, `hueco sin letras en «${tk}»`);
        assert.ok(blankHint(tk, d).length >= 1);
      }
    }
  }
}

// Comparación de palabras: tolera mayúsculas y puntuación, no acepta vacío.
assert.ok(sameWord("water", "water."));
assert.ok(sameWord("Water", "water,"));
assert.ok(sameWord("don't", "don't"));
assert.ok(!sameWord("", "water"));
assert.ok(!sameWord("waters", "water"));

const total = TRACKS.reduce((a, t) => a + t.lines.length, 0);
console.log(`OK — ${TRACKS.length} pistas, ${total} frases, huecos deterministas en 4 dificultades.`);
