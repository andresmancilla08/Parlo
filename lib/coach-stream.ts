// Lectura del JSON del tutor mientras llega por streaming. Módulo puro (sin
// imports en runtime) para que su `.check.ts` corra con node.
//
// El servidor reenvía el JSON tal cual lo escribe el modelo. `reply` va
// PRIMERO en el esquema, así que se puede ir sacando (y leyendo en voz alta)
// antes de que lleguen las correcciones. Al terminar, el texto completo es un
// JSON normal y se valida entero.

export type StreamCorrection = {
  original: string;
  corrected: string;
  why: string;
  examples: string[];
};

export type StreamTurn = {
  reply: string;
  goalsMet: string[];
  corrections: StreamCorrection[];
};

const HEX4 = /^[0-9a-fA-F]{4}$/;
const ESCAPES: Record<string, string> = { '"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t" };

/**
 * Decodifica una cadena JSON que empieza en `from` (justo después de la
 * comilla de apertura). Se detiene donde se acabe el texto recibido; un escape
 * a medias (`\` o `\u12`) se deja para la siguiente vuelta.
 */
function readJsonString(text: string, from: number): { value: string; done: boolean } {
  let out = "";
  let i = from;
  while (i < text.length) {
    const c = text[i];
    if (c === '"') return { value: out, done: true };
    if (c !== "\\") {
      out += c;
      i++;
      continue;
    }
    const e = text[i + 1];
    if (e === undefined) break;
    if (e === "u") {
      const hex = text.slice(i + 2, i + 6);
      if (!HEX4.test(hex)) break;
      out += String.fromCharCode(parseInt(hex, 16));
      i += 6;
      continue;
    }
    out += ESCAPES[e] ?? e;
    i += 2;
  }
  return { value: out, done: false };
}

/**
 * `reply` tal como va llegando. `null` si la clave aún no ha aparecido.
 * Sólo cuenta la clave, no el texto `"reply"` dentro de otra cadena (ahí la
 * comilla iría escapada).
 */
export function extractReply(text: string): { reply: string; done: boolean } | null {
  const m = /(?:^|[^\\])"reply"\s*:\s*"/.exec(text);
  if (!m) return null;
  const r = readJsonString(text, m.index + m[0].length);
  return { reply: r.value, done: r.done };
}

function strings(v: unknown, max: number): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, max) : [];
}

/** Valida y limpia un turno ya parseado: lo que no tenga forma se descarta. */
export function sanitizeTurn(raw: unknown): StreamTurn | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.reply !== "string" || !o.reply.trim()) return null;
  const corrections = Array.isArray(o.corrections)
    ? o.corrections
        .filter(
          (c): c is Record<string, unknown> =>
            !!c &&
            typeof c === "object" &&
            typeof (c as Record<string, unknown>).original === "string" &&
            typeof (c as Record<string, unknown>).corrected === "string",
        )
        .map((c) => ({
          original: String(c.original),
          corrected: String(c.corrected),
          why: typeof c.why === "string" ? c.why : "",
          examples: strings(c.examples, 2),
        }))
        .slice(0, 3)
    : [];
  return { reply: o.reply.trim(), goalsMet: strings(o.goalsMet, 5), corrections };
}

/**
 * El turno completo a partir de TODO el texto recibido. Si el JSON llegó roto
 * (corte de red, modelo que se pasó del tope), se salva al menos la respuesta:
 * mejor seguir la charla sin correcciones que dejar al usuario colgado.
 */
export function parseCoachFinal(text: string): StreamTurn | null {
  const clean = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/, "")
    .trim();
  try {
    const parsed = sanitizeTurn(JSON.parse(clean));
    if (parsed) return parsed;
  } catch {
    // Se intenta rescatar la respuesta abajo.
  }
  const partial = extractReply(clean);
  const reply = partial?.reply.trim();
  return reply ? { reply, goalsMet: [], corrections: [] } : null;
}
