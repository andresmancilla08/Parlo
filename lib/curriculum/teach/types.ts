// Fase «Aprende»: la teoría que se ve ANTES de practicar.
// Todo el texto explicativo va en español (mismo criterio que `explain`): el
// diferenciador de Parlo es entender el porqué, no adivinar por repetición.

/** Ejemplo bilingüe. `en` es lo que se pronuncia; `note` es un matiz corto. */
export type TeachExample = { en: string; es: string; note?: string };

export type TeachStep =
  // Explicación del concepto: el «por qué» en dos o tres frases.
  | { kind: "idea"; title: string; body: string }
  // Ejemplos con audio: la regla vista en frases reales.
  | { kind: "examples"; title: string; items: TeachExample[] }
  // Patrón en tabla (conjugaciones, pares, formaciones).
  | { kind: "table"; title: string; head: [string, string]; rows: [string, string][] }
  // Error típico de hispanohablante: lo que NO se dice y su alternativa.
  | { kind: "pitfall"; title: string; wrong: string; right: string; body: string };

/** Teoría de una lección, por id de lección. */
export type TeachMap = Record<string, TeachStep[]>;
