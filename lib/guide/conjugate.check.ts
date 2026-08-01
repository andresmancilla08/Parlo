// Check runnable del motor de conjugación y de las tablas de la guía. Correr:
//   node --experimental-strip-types lib/guide/conjugate.check.ts
// La ortografía inglesa del -ing y del -ed es donde se cuela el error tonto,
// así que aquí está cada regla con su caso, incluidos los que NO doblan.
import assert from "node:assert";
import { conjugate, formsOf, ing, PRONOUNS, regularPast, thirdPerson } from "./conjugate.ts";
import { IRREGULARS, GROUPS, irregularOf } from "./irregulars.ts";
import { PHRASALS } from "./phrasals.ts";
import { FALSE_FRIENDS } from "./false-friends.ts";

/* ---------------- tercera persona ---------------- */
assert.equal(thirdPerson("work"), "works");
assert.equal(thirdPerson("watch"), "watches");
assert.equal(thirdPerson("miss"), "misses");
assert.equal(thirdPerson("fix"), "fixes");
assert.equal(thirdPerson("go"), "goes");
assert.equal(thirdPerson("study"), "studies");
assert.equal(thirdPerson("play"), "plays", "vocal + y NO se convierte en -ies");
assert.equal(thirdPerson("have"), "has");
assert.equal(thirdPerson("be"), "is");

/* ---------------- gerundio ---------------- */
assert.equal(ing("work"), "working");
assert.equal(ing("make"), "making", "la -e muda se cae");
assert.equal(ing("see"), "seeing", "-ee se queda");
assert.equal(ing("agree"), "agreeing");
assert.equal(ing("die"), "dying", "-ie pasa a -ying");
assert.equal(ing("lie"), "lying");
assert.equal(ing("stop"), "stopping", "monosilabo CVC dobla");
assert.equal(ing("run"), "running");
assert.equal(ing("sit"), "sitting");
assert.equal(ing("open"), "opening", "polisilabo con acento delante NO dobla");
assert.equal(ing("visit"), "visiting");
assert.equal(ing("listen"), "listening");
assert.equal(ing("prefer"), "preferring", "polisilabo acentuado al final SI dobla");
assert.equal(ing("begin"), "beginning");
assert.equal(ing("show"), "showing", "-w nunca dobla");
assert.equal(ing("play"), "playing", "-y nunca dobla");
assert.equal(ing("fix"), "fixing", "-x nunca dobla");
assert.equal(ing("study"), "studying");
assert.equal(ing("be"), "being");

/* ---------------- pasado regular ---------------- */
assert.equal(regularPast("work"), "worked");
assert.equal(regularPast("like"), "liked", "acabado en -e solo añade -d");
assert.equal(regularPast("study"), "studied");
assert.equal(regularPast("play"), "played");
assert.equal(regularPast("stop"), "stopped");
assert.equal(regularPast("visit"), "visited");
assert.equal(regularPast("prefer"), "preferred");
assert.equal(regularPast("fix"), "fixed");

/* ---------------- formas completas ---------------- */
const go = formsOf("to go", irregularOf("go"));
assert.equal(go.base, "go", "se admite escribir «to go»");
assert.equal(go.past, "went");
assert.equal(go.participle, "gone");
assert.ok(go.irregular);

const want = formsOf("want", irregularOf("want"));
assert.equal(want.past, "wanted");
assert.equal(want.participle, "wanted");
assert.equal(want.irregular, false);

/* ---------------- tiempos ---------------- */
const i = PRONOUNS.find((p) => p.id === "i")!;
const he = PRONOUNS.find((p) => p.id === "he")!;
const they = PRONOUNS.find((p) => p.id === "they")!;

// El check hace de cableador: pasa la tabla de irregulares igual que hace
// `lib/guide/index.ts` en la app, así se prueba la integración de verdad.
function tense(verb: string, pronoun: typeof i, id: string) {
  const t = conjugate(verb, pronoun, irregularOf(verb)).find((x) => x.id === id);
  assert.ok(t, `falta el tiempo ${id}`);
  return t;
}

assert.equal(tense("work", he, "present-simple").affirmative, "he works");
assert.equal(tense("work", he, "present-simple").negative, "he doesn't work");
assert.equal(tense("work", he, "present-simple").question, "Does he work?");
assert.equal(tense("work", i, "present-simple").negative, "I don't work");

assert.equal(tense("go", i, "past-simple").affirmative, "I went");
assert.equal(
  tense("go", i, "past-simple").negative,
  "I didn't go",
  "tras «didn't» el verbo vuelve a la forma base",
);
assert.equal(tense("go", he, "present-perfect").affirmative, "he has gone");
assert.equal(tense("go", they, "present-perfect").affirmative, "they have gone");
assert.equal(tense("study", i, "present-continuous").affirmative, "I am studying");
assert.equal(tense("study", they, "past-continuous").affirmative, "they were studying");
assert.equal(tense("study", he, "past-continuous").affirmative, "he was studying");
assert.equal(tense("work", i, "future-will").negative, "I won't work");
assert.equal(tense("work", i, "conditional-perfect").affirmative, "I would have worked");

// «To be» es la excepción: sin auxiliar en presente ni en pasado simple.
assert.equal(tense("be", i, "present-simple").affirmative, "I am");
assert.equal(tense("be", i, "present-simple").negative, "I am not");
assert.equal(tense("be", he, "present-simple").question, "Is he?");
assert.equal(tense("be", they, "past-simple").affirmative, "they were");
assert.equal(tense("be", i, "past-simple").negative, "I wasn't");
assert.equal(tense("be", i, "present-perfect").affirmative, "I have been");

// Todos los tiempos, para todos los pronombres, sin huecos.
for (const p of PRONOUNS) {
  const all = conjugate("take", p, irregularOf("take"));
  assert.equal(all.length, 15, `${p.id}: se esperaban 15 tiempos`);
  const ids = new Set(all.map((t) => t.id));
  assert.equal(ids.size, all.length, `${p.id}: ids de tiempo repetidos`);
  for (const t of all) {
    for (const form of [t.affirmative, t.negative, t.question] as const) {
      assert.ok(form.trim().length > 2, `${p.id}/${t.id}: forma vacía`);
      assert.ok(!form.includes("undefined"), `${p.id}/${t.id}: hueco sin rellenar`);
    }
    assert.ok(t.question.endsWith("?"), `${p.id}/${t.id}: la pregunta no acaba en «?»`);
    assert.ok(t.useEs.length > 20, `${t.id}: falta explicar cuándo se usa`);
  }
}

/* ---------------- tablas ---------------- */
const bases = IRREGULARS.map((v) => v.base);
assert.equal(new Set(bases).size, bases.length, "verbo irregular repetido");
const groupIds = new Set(GROUPS.map((g) => g.id));
for (const v of IRREGULARS) {
  assert.ok(v.past.trim() && v.participle.trim() && v.es.trim(), `${v.base}: fila incompleta`);
  assert.ok(groupIds.has(v.group), `${v.base}: grupo desconocido (${v.group})`);
  // El patrón declarado tiene que cuadrar con las formas de verdad.
  const same = (a: string, b: string) => a === b;
  if (v.group === "AAA") {
    assert.ok(same(v.base, v.past) && same(v.past, v.participle), `${v.base}: no es AAA`);
  }
  if (v.group === "AAB") {
    assert.ok(same(v.base, v.past) && !same(v.past, v.participle), `${v.base}: no es AAB`);
  }
  if (v.group === "ABB") {
    assert.ok(!same(v.base, v.past) && same(v.past, v.participle), `${v.base}: no es ABB`);
  }
  if (v.group === "ABA") {
    assert.ok(same(v.base, v.participle) && !same(v.base, v.past), `${v.base}: no es ABA`);
  }
  if (v.group === "ABC") {
    assert.ok(
      !same(v.base, v.past) && !same(v.past, v.participle) && !same(v.base, v.participle),
      `${v.base}: no es ABC`,
    );
  }
}
assert.ok(irregularOf("Go"), "la búsqueda de irregulares ignora mayúsculas");
assert.equal(irregularOf("want"), undefined, "«want» es regular");

const phrasalKeys = PHRASALS.map((p) => `${p.verb} ${p.particle}`);
assert.equal(new Set(phrasalKeys).size, phrasalKeys.length, "phrasal verb repetido");
for (const p of PHRASALS) {
  const at = `${p.verb} ${p.particle}`;
  assert.ok(p.es.trim(), `${at}: sin traducción`);
  assert.ok(p.example.length > 12, `${at}: ejemplo demasiado corto`);
  const text = p.example.toLowerCase();
  // El ejemplo tiene que usar el verbo DE VERDAD, en la forma que sea: por eso
  // se comprueba contra las formas que da el propio motor (took, broke, ran…).
  const f = formsOf(p.verb, irregularOf(p.verb));
  const forms = [f.base, f.third, f.ing, ...f.past.split(" / "), f.participle];
  assert.ok(
    forms.some((form) => new RegExp(`\\b${form}\\b`).test(text)),
    `${at}: el ejemplo no usa el verbo en ninguna de sus formas`,
  );
  assert.ok(text.includes(p.particle.toLowerCase()), `${at}: el ejemplo no usa la partícula`);
}

const ffKeys = FALSE_FRIENDS.map((f) => f.en);
assert.equal(new Set(ffKeys).size, ffKeys.length, "falso amigo repetido");
for (const f of FALSE_FRIENDS) {
  assert.ok(f.looksLike.trim() && f.means.trim() && f.sayInstead.trim(), `${f.en}: fila incompleta`);
  assert.notEqual(f.means, f.looksLike, `${f.en}: si significa lo que parece, no es un falso amigo`);
  assert.ok(
    f.example.toLowerCase().includes(f.en.toLowerCase()),
    `${f.en}: el ejemplo no usa la palabra`,
  );
}

console.log(
  `OK — ${IRREGULARS.length} irregulares en ${GROUPS.length} patrones, ` +
    `${PHRASALS.length} phrasal verbs, ${FALSE_FRIENDS.length} falsos amigos, ` +
    `15 tiempos × ${PRONOUNS.length} pronombres.`,
);
