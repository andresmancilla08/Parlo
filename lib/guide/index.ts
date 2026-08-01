import { conjugate, formsOf, PRONOUNS, type Pronoun } from "./conjugate";
import { IRREGULARS, GROUPS, irregularOf } from "./irregulars";
import { PHRASALS, PARTICLES, PHRASAL_VERBS } from "./phrasals";
import { FALSE_FRIENDS } from "./false-friends";
import type { FalseFriend, Irregular, Phrasal, Tense, VerbForms } from "./types";

// Punto de entrada de la guía: aquí se cablea el motor (puro) con la tabla de
// irregulares, para que la interfaz no tenga que saber que están separados.

export { IRREGULARS, GROUPS, PHRASALS, PARTICLES, PHRASAL_VERBS, FALSE_FRIENDS, PRONOUNS };
export type { FalseFriend, Irregular, Phrasal, Pronoun, Tense, VerbForms };

/** Las cinco formas de un verbo, mirando primero si es irregular. */
export function verbForms(input: string): VerbForms {
  const base = input.trim().toLowerCase().replace(/^to\s+/, "");
  return formsOf(base, irregularOf(base));
}

/** Todos los tiempos de un verbo para un pronombre. */
export function conjugationOf(input: string, pronoun: Pronoun): Tense[] {
  const base = input.trim().toLowerCase().replace(/^to\s+/, "");
  return conjugate(base, pronoun, irregularOf(base));
}

/** Quita tildes y pasa a minúsculas: para buscar «oír» escribiendo «oir». */
function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Filtra irregulares por cualquiera de sus formas o por su significado. */
export function searchIrregulars(query: string): Irregular[] {
  const q = fold(query.trim());
  if (!q) return IRREGULARS;
  return IRREGULARS.filter((v) =>
    [v.base, v.past, v.participle, v.es].some((field) => fold(field).includes(q)),
  );
}

/** Filtra phrasal verbs por verbo, partícula, significado o ejemplo. */
export function searchPhrasals(query: string, particle?: string): Phrasal[] {
  const q = fold(query.trim());
  return PHRASALS.filter((p) => {
    if (particle && p.particle !== particle) return false;
    if (!q) return true;
    return [`${p.verb} ${p.particle}`, p.es, p.example].some((field) => fold(field).includes(q));
  });
}

/** Filtra falsos amigos por la palabra inglesa, el parecido o el significado. */
export function searchFalseFriends(query: string): FalseFriend[] {
  const q = fold(query.trim());
  if (!q) return FALSE_FRIENDS;
  return FALSE_FRIENDS.filter((f) =>
    [f.en, f.looksLike, f.means, f.sayInstead].some((field) => fold(field).includes(q)),
  );
}

/** Sugerencias del conjugador: irregulares primero, que son los que se consultan. */
export const SUGGESTED_VERBS: string[] = [
  "be", "have", "do", "go", "get", "make", "take", "see", "come", "know",
  "give", "find", "think", "tell", "become", "leave", "feel", "put", "bring", "begin",
];
