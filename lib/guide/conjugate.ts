import type { Tense, VerbForms } from "./types";

// Motor de conjugación. NO importa la tabla de irregulares a propósito: se le
// pasa desde fuera (`lib/guide/index.ts` la cablea) para que este módulo siga
// siendo puro y se pueda correr con
//   node --experimental-strip-types lib/guide/conjugate.check.ts
//
// Con cinco formas (base, 3.ª persona, -ing, pasado y
// participio) se construyen TODOS los tiempos, porque el inglés conjuga con
// auxiliares y no con terminaciones. Por eso esto no es una tabla gigante:
// son cuatro reglas de ortografía y una lista de irregulares.

const VOWELS = "aeiou";

/** Consonantes que NUNCA se doblan aunque la palabra acabe en consonante-vocal-consonante. */
const NEVER_DOUBLE = "wxy";

/**
 * Verbos de más de una sílaba que SÍ doblan porque el acento cae en la última
 * (prefér → preferred, permít → permitted). La regla real depende del acento y
 * el acento no está en la ortografía, así que aquí va la lista de los que
 * salen de verdad; el resto (visit, listen, open) no dobla.
 */
const STRESSED_DOUBLERS = new Set([
  "prefer", "refer", "occur", "permit", "admit", "commit", "submit", "transfer",
  "control", "patrol", "propel", "rebel", "expel", "compel", "regret", "forget",
  "begin", "equip", "upset", "omit", "prefer", "deter", "infer", "confer",
]);

function endsWithCvc(word: string): boolean {
  if (word.length < 3) return false;
  const [c1, v, c2] = word.slice(-3);
  return (
    !VOWELS.includes(c1) &&
    VOWELS.includes(v) &&
    !VOWELS.includes(c2) &&
    !NEVER_DOUBLE.includes(c2)
  );
}

/** ¿Se dobla la última consonante antes de -ing / -ed? */
function doubles(base: string): boolean {
  if (!endsWithCvc(base)) return false;
  // Sílabas ≈ grupos de vocales: stop → 1, open → 2, prefer → 2.
  const syllables = (base.match(/[aeiou]+/g) ?? []).length;
  // Monosílabo (stop, run) siempre; polisílabo sólo si el acento cae al final.
  return syllables <= 1 || STRESSED_DOUBLERS.has(base);
}

/** Tercera persona del singular: works, watches, studies, goes. */
export function thirdPerson(base: string): string {
  if (base === "be") return "is";
  if (base === "have") return "has";
  if (/(s|sh|ch|x|z|o)$/.test(base)) return `${base}es`;
  if (/[^aeiou]y$/.test(base)) return `${base.slice(0, -1)}ies`;
  return `${base}s`;
}

/** Gerundio/participio de presente: working, making, stopping, dying. */
export function ing(base: string): string {
  if (base === "be") return "being";
  if (base.endsWith("ie")) return `${base.slice(0, -2)}ying`; // die → dying
  if (base.endsWith("ee") || base.endsWith("oe") || base.endsWith("ye")) return `${base}ing`;
  if (base.endsWith("e")) return `${base.slice(0, -1)}ing`; // make → making
  if (doubles(base)) return `${base + base.slice(-1)}ing`;
  return `${base}ing`;
}

/** Pasado regular: worked, liked, studied, stopped. */
export function regularPast(base: string): string {
  if (base.endsWith("e")) return `${base}d`;
  if (/[^aeiou]y$/.test(base)) return `${base.slice(0, -1)}ied`;
  if (doubles(base)) return `${base + base.slice(-1)}ed`;
  return `${base}ed`;
}

/** Pasado y participio de un verbo irregular, tal y como salen de la tabla. */
export type IrregularForms = { past: string; participle: string };

/**
 * Las cinco formas de un verbo. Si se le pasa la entrada de la tabla de
 * irregulares, manda ella; si no, se aplican las reglas del regular.
 */
export function formsOf(input: string, irr?: IrregularForms): VerbForms {
  const base = input.trim().toLowerCase().replace(/^to\s+/, "");
  return {
    base,
    third: thirdPerson(base),
    ing: ing(base),
    past: irr ? irr.past : regularPast(base),
    participle: irr ? irr.participle : regularPast(base),
    irregular: Boolean(irr),
  };
}

/* ---------------- pronombres ---------------- */

export type Pronoun = {
  id: string;
  subject: string;
  third: boolean;
  /** «were» en vez de «was» (you, we, they). */
  plural: boolean;
};

export const PRONOUNS: Pronoun[] = [
  { id: "i", subject: "I", third: false, plural: false },
  { id: "you", subject: "you", third: false, plural: true },
  { id: "he", subject: "he", third: true, plural: false },
  { id: "we", subject: "we", third: false, plural: true },
  { id: "they", subject: "they", third: false, plural: true },
];

function be(p: Pronoun): string {
  if (p.subject === "I") return "am";
  return p.third ? "is" : "are";
}

function beNegative(p: Pronoun): string {
  if (p.subject === "I") return "am not";
  return p.third ? "isn't" : "aren't";
}

function wasWere(p: Pronoun): string {
  return p.third || p.subject === "I" ? "was" : "were";
}

function cap(sentence: string): string {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/* ---------------- los tiempos ---------------- */

/**
 * Todos los tiempos de un verbo para un pronombre. La explicación de cuándo se
 * usa va SIEMPRE en español, como en el resto de Parlo: saber formar el tiempo
 * no sirve de nada si no sabes cuándo toca.
 */
export function conjugate(input: string, pronoun: Pronoun, irr?: IrregularForms): Tense[] {
  const v = formsOf(input, irr);
  const s = pronoun.subject;
  const isBe = v.base === "be";

  // «To be» no lleva auxiliar en presente ni en pasado simple: es la excepción
  // que rompe cualquier motor que no la contemple.
  const presentSimple = isBe
    ? {
        affirmative: `${s} ${be(pronoun)}`,
        negative: `${s} ${beNegative(pronoun)}`,
        question: `${cap(be(pronoun))} ${s}?`,
      }
    : {
        affirmative: `${s} ${pronoun.third ? v.third : v.base}`,
        negative: `${s} ${pronoun.third ? "doesn't" : "don't"} ${v.base}`,
        question: `${pronoun.third ? "Does" : "Do"} ${s} ${v.base}?`,
      };

  const pastSimple = isBe
    ? {
        affirmative: `${s} ${wasWere(pronoun)}`,
        negative: `${s} ${wasWere(pronoun) === "was" ? "wasn't" : "weren't"}`,
        question: `${cap(wasWere(pronoun))} ${s}?`,
      }
    : {
        affirmative: `${s} ${v.past}`,
        negative: `${s} didn't ${v.base}`,
        question: `Did ${s} ${v.base}?`,
      };

  const has = pronoun.third ? "has" : "have";
  const hasNot = pronoun.third ? "hasn't" : "haven't";

  return [
    {
      id: "present-simple",
      nameEs: "Presente simple",
      nameEn: "Present simple",
      useEs: "Rutinas, hechos y cosas que son verdad siempre. Es el tiempo de «todos los días».",
      formula: pronoun.third ? "sujeto + verbo + -s" : "sujeto + verbo",
      ...presentSimple,
    },
    {
      id: "present-continuous",
      nameEs: "Presente continuo",
      nameEn: "Present continuous",
      useEs: "Lo que pasa ahora mismo o en esta temporada. También un plan cerrado para pronto.",
      formula: "sujeto + am/is/are + -ing",
      affirmative: `${s} ${be(pronoun)} ${v.ing}`,
      negative: `${s} ${beNegative(pronoun)} ${v.ing}`,
      question: `${cap(be(pronoun))} ${s} ${v.ing}?`,
    },
    {
      id: "present-perfect",
      nameEs: "Presente perfecto",
      nameEn: "Present perfect",
      useEs: "Pasado SIN momento concreto, o que sigue tocando el presente. Con ever, never, just, already, yet.",
      formula: "sujeto + have/has + participio",
      affirmative: `${s} ${has} ${v.participle}`,
      negative: `${s} ${hasNot} ${v.participle}`,
      question: `${cap(has)} ${s} ${v.participle}?`,
    },
    {
      id: "present-perfect-continuous",
      nameEs: "Presente perfecto continuo",
      nameEn: "Present perfect continuous",
      useEs: "Algo que empezó antes y sigue ahora, poniendo el foco en la duración: for, since.",
      formula: "sujeto + have/has been + -ing",
      affirmative: `${s} ${has} been ${v.ing}`,
      negative: `${s} ${hasNot} been ${v.ing}`,
      question: `${cap(has)} ${s} been ${v.ing}?`,
    },
    {
      id: "past-simple",
      nameEs: "Pasado simple",
      nameEn: "Past simple",
      useEs: "Pasado terminado y con momento concreto: yesterday, last week, in 2019.",
      formula: v.irregular ? "sujeto + pasado irregular" : "sujeto + verbo + -ed",
      ...pastSimple,
    },
    {
      id: "past-continuous",
      nameEs: "Pasado continuo",
      nameEn: "Past continuous",
      useEs: "Lo que estaba pasando cuando ocurrió otra cosa. Es el fondo de la escena.",
      formula: "sujeto + was/were + -ing",
      affirmative: `${s} ${wasWere(pronoun)} ${v.ing}`,
      negative: `${s} ${wasWere(pronoun) === "was" ? "wasn't" : "weren't"} ${v.ing}`,
      question: `${cap(wasWere(pronoun))} ${s} ${v.ing}?`,
    },
    {
      id: "past-perfect",
      nameEs: "Pasado perfecto",
      nameEn: "Past perfect",
      useEs: "El pasado del pasado: lo que ya había ocurrido antes de otro momento pasado.",
      formula: "sujeto + had + participio",
      affirmative: `${s} had ${v.participle}`,
      negative: `${s} hadn't ${v.participle}`,
      question: `Had ${s} ${v.participle}?`,
    },
    {
      id: "past-perfect-continuous",
      nameEs: "Pasado perfecto continuo",
      nameEn: "Past perfect continuous",
      useEs: "Cuánto tiempo llevaba pasando algo antes de otro momento del pasado.",
      formula: "sujeto + had been + -ing",
      affirmative: `${s} had been ${v.ing}`,
      negative: `${s} hadn't been ${v.ing}`,
      question: `Had ${s} been ${v.ing}?`,
    },
    {
      id: "future-will",
      nameEs: "Futuro con will",
      nameEn: "Future simple",
      useEs: "Decisión que tomas al hablar, predicción o promesa. No para planes ya cerrados.",
      formula: "sujeto + will + verbo",
      affirmative: `${s} will ${v.base}`,
      negative: `${s} won't ${v.base}`,
      question: `Will ${s} ${v.base}?`,
    },
    {
      id: "future-going-to",
      nameEs: "Futuro con going to",
      nameEn: "Going to",
      useEs: "Intención decidida antes de hablar, o predicción con pruebas a la vista.",
      formula: "sujeto + am/is/are going to + verbo",
      affirmative: `${s} ${be(pronoun)} going to ${v.base}`,
      negative: `${s} ${beNegative(pronoun)} going to ${v.base}`,
      question: `${cap(be(pronoun))} ${s} going to ${v.base}?`,
    },
    {
      id: "future-continuous",
      nameEs: "Futuro continuo",
      nameEn: "Future continuous",
      useEs: "Lo que estarás haciendo en un momento futuro concreto: this time tomorrow.",
      formula: "sujeto + will be + -ing",
      affirmative: `${s} will be ${v.ing}`,
      negative: `${s} won't be ${v.ing}`,
      question: `Will ${s} be ${v.ing}?`,
    },
    {
      id: "future-perfect",
      nameEs: "Futuro perfecto",
      nameEn: "Future perfect",
      useEs: "Lo que ya estará hecho antes de una fecha futura: by Friday, by then.",
      formula: "sujeto + will have + participio",
      affirmative: `${s} will have ${v.participle}`,
      negative: `${s} won't have ${v.participle}`,
      question: `Will ${s} have ${v.participle}?`,
    },
    {
      id: "future-perfect-continuous",
      nameEs: "Futuro perfecto continuo",
      nameEn: "Future perfect continuous",
      useEs: "Cuánto tiempo llevarás haciendo algo cuando llegue un momento futuro.",
      formula: "sujeto + will have been + -ing",
      affirmative: `${s} will have been ${v.ing}`,
      negative: `${s} won't have been ${v.ing}`,
      question: `Will ${s} have been ${v.ing}?`,
    },
    {
      id: "conditional",
      nameEs: "Condicional",
      nameEn: "Conditional",
      useEs: "Lo que pasaría en una situación imaginaria: la parte del «would» del segundo condicional.",
      formula: "sujeto + would + verbo",
      affirmative: `${s} would ${v.base}`,
      negative: `${s} wouldn't ${v.base}`,
      question: `Would ${s} ${v.base}?`,
    },
    {
      id: "conditional-perfect",
      nameEs: "Condicional perfecto",
      nameEn: "Conditional perfect",
      useEs: "Lo que habría pasado y no pasó: el arrepentimiento del tercer condicional.",
      formula: "sujeto + would have + participio",
      affirmative: `${s} would have ${v.participle}`,
      negative: `${s} wouldn't have ${v.participle}`,
      question: `Would ${s} have ${v.participle}?`,
    },
  ];
}
