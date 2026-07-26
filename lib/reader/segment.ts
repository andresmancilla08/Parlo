// Segmentación del documento en frases y palabras con `Intl.Segmenter`, que es
// nativo del navegador: sin dependencias y con reglas reales de cada idioma.

export type Sentence = { i: number; text: string; start: number };

/** Parte el texto en frases. Si el navegador no trae Segmenter, cae a puntuación. */
export function toSentences(text: string): Sentence[] {
  const clean = text.replace(/\r\n?/g, "\n").trim();
  if (!clean) return [];

  const out: Sentence[] = [];
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter("en", { granularity: "sentence" });
    let i = 0;
    for (const s of seg.segment(clean)) {
      const t = s.segment.trim();
      if (t) out.push({ i: i++, text: t, start: s.index });
    }
    return out;
  }
  let cursor = 0;
  for (const raw of clean.split(/(?<=[.!?])\s+/)) {
    const t = raw.trim();
    if (t) out.push({ i: out.length, text: t, start: cursor });
    cursor += raw.length + 1;
  }
  return out;
}

/** Palabras de una frase, conservando los separadores para poder pintarlas. */
export function toWords(sentence: string): string[] {
  return sentence.split(/(\s+)/).filter((chunk) => chunk.length > 0);
}

/** Sólo letras y apóstrofos: lo que se consulta y lo que va al repaso. */
export function cleanWord(token: string): string {
  return token.replace(/^[^\p{L}']+|[^\p{L}']+$/gu, "");
}

/** Índice invertido palabra → frases, para buscar dentro del documento. */
export function buildIndex(sentences: Sentence[]): Map<string, number[]> {
  const index = new Map<string, number[]>();
  for (const s of sentences) {
    for (const raw of s.text.split(/\s+/)) {
      const w = cleanWord(raw).toLowerCase();
      if (w.length < 2) continue;
      const list = index.get(w);
      if (list) {
        if (list[list.length - 1] !== s.i) list.push(s.i);
      } else index.set(w, [s.i]);
    }
  }
  return index;
}

/** Frases que contienen la búsqueda (por palabra completa o prefijo). */
export function search(index: Map<string, number[]>, query: string): number[] {
  const q = cleanWord(query).toLowerCase();
  if (q.length < 2) return [];
  const hits = new Set<number>();
  for (const [word, list] of index) {
    if (word === q || word.startsWith(q)) list.forEach((i) => hits.add(i));
  }
  return [...hits].sort((a, b) => a - b);
}
