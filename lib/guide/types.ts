// Sección de consulta («Guía»): tablas para estudiar por temas, no un curso.
// Igual que el currículo, el contenido es BILINGÜE por naturaleza, así que
// vive aquí como datos y no en `locales/`: las etiquetas de la interfaz sí van
// por i18n, pero un verbo irregular no se traduce, se muestra.

/**
 * Verbo irregular. `group` es el patrón de las tres formas, que es lo que de
 * verdad ayuda a memorizarlos: no es lo mismo cut/cut/cut que go/went/gone.
 */
export type Irregular = {
  base: string;
  past: string;
  participle: string;
  es: string;
  /** AAA iguales · AAB base y pasado iguales · ABB pasado y participio iguales · ABA base y participio iguales · ABC las tres distintas */
  group: "AAA" | "AAB" | "ABB" | "ABA" | "ABC";
};

/**
 * Phrasal verb. `separable` decide si el objeto puede ir en medio
 * (turn it down) o no (look after it): es el error práctico más común.
 */
export type Phrasal = {
  verb: string;
  particle: string;
  es: string;
  example: string;
  separable: boolean;
};

/** Falso amigo: la trampa es que se parece a una palabra española que no significa. */
export type FalseFriend = {
  en: string;
  /** La palabra española a la que se parece (y que NO significa). */
  looksLike: string;
  /** Lo que significa de verdad. */
  means: string;
  /** Cómo se dice en inglés lo que uno creía que significaba. */
  sayInstead: string;
  example: string;
};

/** Las cinco formas de las que sale cualquier tiempo verbal. */
export type VerbForms = {
  base: string;
  third: string;
  ing: string;
  past: string;
  participle: string;
  /** `true` si el pasado y el participio salen de la tabla de irregulares. */
  irregular: boolean;
};

/** Un tiempo verbal ya conjugado para un pronombre concreto. */
export type Tense = {
  id: string;
  nameEs: string;
  nameEn: string;
  /** Cuándo se usa, en español. */
  useEs: string;
  /** La fórmula, para verla de un vistazo. */
  formula: string;
  affirmative: string;
  negative: string;
  question: string;
};
