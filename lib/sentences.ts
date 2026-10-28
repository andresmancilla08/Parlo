// División en frases para leer la respuesta del tutor MIENTRAS llega.
// Módulo puro (sin imports) para que su `.check.ts` corra con node.
//
// Cada trozo es una petición a la voz neural, así que no conviene trocear de
// más: se junta texto hasta tener al menos `MIN_CHUNK` caracteres y se corta
// en un fin de oración. Si una oración se alarga sin punto, se corta en una
// coma (o en un espacio) al pasar de `MAX_CHUNK`, para no esperar de más.

/** Trozo mínimo que merece una petición de voz (salvo el resto final). */
export const MIN_CHUNK = 40;
/** Por encima de esto se corta aunque la oración no haya terminado. */
export const MAX_CHUNK = 180;

/** Abreviaturas que terminan en punto y NO cierran la oración. */
const ABBREVIATIONS = /\b(?:mr|mrs|ms|dr|st|vs|etc|e\.g|i\.e|no|approx)\.$/i;

/**
 * Posiciones (exclusivas) donde termina una oración dentro de `text`. Si el
 * texto aún no ha terminado de llegar, un punto al final no cuenta: puede ser
 * «3.» de «3.5» o «Mr.» de «Mr. Smith».
 */
export function sentenceEnds(text: string, final: boolean): number[] {
  const ends: number[] = [];
  const re = /[.!?…]+["'”’)\]]*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const end = m.index + m[0].length;
    const next = text[end];
    const atEnd = end === text.length;
    if (atEnd ? !final : !/\s/.test(next)) continue;
    if (m[0] === "." && ABBREVIATIONS.test(text.slice(Math.max(0, m.index - 6), end))) continue;
    ends.push(end);
  }
  return ends;
}

/**
 * Saca de `buffer` los trozos ya listos para leer y devuelve lo que queda
 * pendiente. Con `final` (la respuesta terminó) se vacía todo.
 */
export function takeSentences(buffer: string, final: boolean): { chunks: string[]; rest: string } {
  const chunks: string[] = [];
  let start = 0;

  for (const end of sentenceEnds(buffer, final)) {
    if (buffer.slice(start, end).trim().length >= MIN_CHUNK) {
      chunks.push(buffer.slice(start, end).trim());
      start = end;
    }
  }

  let rest = buffer.slice(start);
  // Oración larguísima sin punto: se corta en la última coma (o espacio) antes
  // del tope. Con `final` no hace falta: el resto sale entero abajo.
  while (!final && rest.trim().length > MAX_CHUNK) {
    const head = rest.slice(0, MAX_CHUNK);
    const comma = Math.max(head.lastIndexOf(", "), head.lastIndexOf("; "), head.lastIndexOf(": "));
    const space = head.lastIndexOf(" ");
    const cut = comma >= MIN_CHUNK ? comma + 1 : space >= MIN_CHUNK ? space : MAX_CHUNK;
    chunks.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut);
  }

  if (final) {
    if (rest.trim()) chunks.push(rest.trim());
    rest = "";
  }
  return { chunks, rest };
}
