// Correcciones del tutor sobre el mensaje del usuario. Módulo puro (sin
// imports en runtime) para que su `.check.ts` corra con node.

type Fix = { original: string; corrected: string };

/** Trozo del mensaje: texto normal o un fragmento con corrección (`fix` = índice). */
export type Segment = { text: string; fix?: number };

/** Dónde aparece cada `original` en el mensaje (sin distinguir mayúsculas). */
function locate(message: string, fixes: Fix[]): { start: number; end: number; fix: number }[] {
  const lower = message.toLowerCase();
  const found: { start: number; end: number; fix: number }[] = [];
  fixes.forEach((f, fix) => {
    const needle = f.original.trim().toLowerCase();
    if (!needle) return;
    let from = 0;
    while (from <= lower.length) {
      const start = lower.indexOf(needle, from);
      if (start < 0) return;
      const end = start + needle.length;
      // Dos correcciones sobre el mismo trozo: se queda la primera.
      if (!found.some((g) => start < g.end && end > g.start)) {
        found.push({ start, end, fix });
        return;
      }
      from = start + 1;
    }
  });
  return found.sort((a, b) => a.start - b.start);
}

/**
 * Parte el mensaje en trozos para subrayar en la burbuja lo que se corrigió.
 * Lo que el modelo citó y no está literal en el mensaje simplemente no se
 * subraya (la tarjeta de corrección lo sigue mostrando).
 */
export function markFragments(message: string, fixes: Fix[]): Segment[] {
  const out: Segment[] = [];
  let at = 0;
  for (const { start, end, fix } of locate(message, fixes)) {
    if (start > at) out.push({ text: message.slice(at, start) });
    out.push({ text: message.slice(start, end), fix });
    at = end;
  }
  if (at < message.length) out.push({ text: message.slice(at) });
  return out;
}

/**
 * La frase entera ya corregida (para «Dilo tú»). Si ningún fragmento aparece
 * literal en el mensaje, se usa la primera corrección sola: repetir el trozo
 * bueno también sirve.
 */
export function applyCorrections(message: string, fixes: Fix[]): string {
  const spots = locate(message, fixes);
  if (spots.length === 0) return fixes[0]?.corrected.trim() ?? message;
  let out = "";
  let at = 0;
  for (const { start, end, fix } of spots) {
    out += message.slice(at, start) + fixes[fix].corrected;
    at = end;
  }
  return (out + message.slice(at)).replace(/\s{2,}/g, " ").trim();
}
