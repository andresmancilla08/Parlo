// Vocabulario de un documento para el repaso espaciado.
//
// Criterio: las palabras que MÁS aparecen y que no son de relleno. Se
// descartan las funcionales (the, of, and…), los nombres propios (empiezan por
// mayúscula en medio de la frase) y lo que ya está en el SRS. Ordenadas por
// frecuencia: si algo sale ocho veces en el texto, merece la pena aprenderlo.

/** Palabras funcionales: aparecen siempre y no enseñan nada nuevo. */
const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","of","to","in","on","at","for","with","from","by","as",
  "is","are","was","were","be","been","being","am","do","does","did","have","has","had","will",
  "would","can","could","should","may","might","must","shall","this","that","these","those",
  "i","you","he","she","it","we","they","me","him","her","us","them","my","your","his","its",
  "our","their","who","whom","which","what","when","where","why","how","not","no","nor","so",
  "than","then","there","here","all","any","some","such","own","same","too","very","just","now",
  "up","down","out","off","over","under","again","once","only","also","into","about","after",
  "before","because","while","during","between","both","each","few","more","most","other","one",
]);

export type VocabCandidate = { word: string; count: number };

function clean(token: string): string {
  return token.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, "");
}

/**
 * Candidatas a entrar en el repaso, de más a menos frecuente.
 * `known` son las palabras que ya están en el SRS (no se repiten).
 */
export function vocabCandidates(
  text: string,
  known: Set<string> = new Set(),
  limit = 20,
): VocabCandidate[] {
  // Por palabra se cuenta cuántas veces sale, cuántas con mayúscula y cuántas
  // con mayúscula EN MEDIO de una frase: eso último delata al nombre propio.
  type Tally = { count: number; capital: number; midCapital: number };
  const tally = new Map<string, Tally>();
  // Se parte por espacios y se limpia cada token: así «word,» y «word» cuentan igual.
  const tokens = text.split(/\s+/);

  for (const [i, raw] of tokens.entries()) {
    const token = clean(raw);
    if (!token) continue;

    const word = token.toLowerCase();
    if (word.length < 4) continue; // demasiado corta para ser vocabulario útil
    if (!/^[\p{L}'-]+$/u.test(word)) continue; // fuera números y códigos
    if (STOPWORDS.has(word)) continue;
    if (known.has(word)) continue;

    const capital = /^\p{Lu}/u.test(token);
    const startsSentence = i === 0 || /[.!?¡¿"»)]$/.test(tokens[i - 1] ?? "");
    const entry = tally.get(word) ?? { count: 0, capital: 0, midCapital: 0 };
    entry.count++;
    if (capital) entry.capital++;
    if (capital && !startsSentence) entry.midCapital++;
    tally.set(word, entry);
  }

  return [...tally.entries()]
    // Nombre propio: sale SIEMPRE con mayúscula y alguna vez en medio de frase.
    // «Climate» al principio de varias frases sigue siendo vocabulario; «Sarah»,
    // que aparece también a mitad, no.
    .filter(([, t]) => !(t.midCapital > 0 && t.capital === t.count))
    .map(([word, t]) => ({ word, count: t.count }))
    // Frecuencia primero; a igualdad, alfabético para que sea determinista.
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}
