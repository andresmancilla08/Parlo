// Puntuación de pronunciación. No hay análisis de audio: se usa el
// reconocimiento de voz del navegador (gratis) y se compara lo que ENTENDIÓ
// con la frase de referencia. Si la máquina te entiende, un humano también.
//
// La comparación es por palabras alineadas (subsecuencia común más larga), no
// por posición: así una palabra de más o de menos no descuadra el resto.

/** Palabra de la referencia y si el reconocedor la captó. */
export type WordResult = { word: string; ok: boolean };

export type Attempt = {
  words: WordResult[];
  /** Palabras acertadas. */
  correct: number;
  total: number;
  /** 0..1 */
  score: number;
  /** Etiqueta de resultado según el score. */
  rating: "great" | "good" | "retry";
};

/** Minúsculas, sin acentos ni puntuación: el reconocedor no la devuelve igual. */
export function normalizeWord(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9']/g, "")
    .replace(/^'+|'+$/g, "");
}

/**
 * Contracciones: el reconocedor devuelve unas veces la forma corta y otras la
 * larga («I'm» / «I am»). Se expanden LAS DOS partes antes de comparar, porque
 * eso no es un fallo de pronunciación y no debe restar.
 */
const CONTRACTIONS: [RegExp, string][] = [
  [/\bi'm\b/g, "i am"],
  [/\bi've\b/g, "i have"],
  [/\bi'll\b/g, "i will"],
  [/\bi'd\b/g, "i would"],
  [/\b(\w+)n't\b/g, "$1 not"], // don't, doesn't, isn't, wouldn't…
  [/\bcan not\b/g, "cannot"],
  [/\bwo not\b/g, "will not"], // won't → wo n't → wo not
  [/\b(\w+)'re\b/g, "$1 are"],
  [/\b(\w+)'ve\b/g, "$1 have"],
  [/\b(\w+)'ll\b/g, "$1 will"],
  [/\b(it|that|there|he|she|what|who|let)'s\b/g, "$1 is"],
  [/\blet is\b/g, "let us"],
];

function expand(text: string): string {
  let out = text.toLowerCase();
  for (const [re, to] of CONTRACTIONS) out = out.replace(re, to);
  return out;
}

export function words(text: string): string[] {
  return expand(text).split(/\s+/).map(normalizeWord).filter(Boolean);
}

function same(a: string, b: string): boolean {
  return a === b;
}

/** Umbrales de la etiqueta final. */
export const GREAT = 0.9;
export const GOOD = 0.7;

/**
 * Compara la frase de referencia con lo que entendió el reconocedor.
 * Devuelve qué palabras se captaron para poder resaltarlas en la UI.
 */
export function scoreAttempt(reference: string, heard: string): Attempt {
  const ref = words(reference);
  const got = words(heard);

  // Subsecuencia común más larga: tolera palabras extra o que falten sin
  // desplazar todo lo que viene detrás (que es lo que haría comparar por índice).
  const n = ref.length;
  const m = got.length;
  const table: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      table[i][j] = same(ref[i], got[j])
        ? table[i + 1][j + 1] + 1
        : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const matched = new Array<boolean>(n).fill(false);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (same(ref[i], got[j])) {
      matched[i] = true;
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }

  const wordList = ref.map((w, idx) => ({ word: w, ok: matched[idx] }));
  const correct = wordList.filter((w) => w.ok).length;
  const total = ref.length;
  const score = total === 0 ? 0 : correct / total;

  return {
    words: wordList,
    correct,
    total,
    score,
    rating: score >= GREAT ? "great" : score >= GOOD ? "good" : "retry",
  };
}
