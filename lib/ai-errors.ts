// ¿El fallo de Gemini es «estoy saturado / sin cuota»? Módulo puro (mira la
// forma del error, no importa `ai`) para poder probarlo con node.
//
// Distinguirlo importa: ante 429/503 reintentar en el acto sólo vuelve a
// gastar la cuota que ya no hay. Se devuelve el estado al cliente con
// `retry-after` y es él quien espera y ofrece reintentar.

type Shape = {
  statusCode?: number;
  responseHeaders?: Record<string, string>;
  responseBody?: string;
  lastError?: unknown;
  cause?: unknown;
};

/** Segundos de espera por defecto si Google no dice cuántos. */
const DEFAULT_429_S = 30;
const DEFAULT_503_S = 10;
const MAX_S = 120;

/** Busca el error HTTP real dentro de los envoltorios del SDK (RetryError, causas). */
function apiError(err: unknown, depth = 0): Shape | null {
  if (!err || typeof err !== "object" || depth > 4) return null;
  const e = err as Shape;
  if (typeof e.statusCode === "number") return e;
  return apiError(e.lastError, depth + 1) ?? apiError(e.cause, depth + 1);
}

function secondsFrom(e: Shape, fallback: number): number {
  const header = Number(e.responseHeaders?.["retry-after"]);
  // Google manda el plazo en el cuerpo: `"retryDelay": "23s"` (RetryInfo).
  const body = Number(/"retryDelay"\s*:\s*"(\d+(?:\.\d+)?)s"/.exec(e.responseBody ?? "")?.[1]);
  const s = Number.isFinite(header) && header > 0 ? header : Number.isFinite(body) && body > 0 ? body : fallback;
  return Math.min(MAX_S, Math.max(1, Math.ceil(s)));
}

/** `{ status, retryAfter }` si Gemini está saturado o sin cuota; `null` si es otro fallo. */
export function upstreamBusy(err: unknown): { status: 429 | 503; retryAfter: number } | null {
  const e = apiError(err);
  if (!e) return null;
  if (e.statusCode === 429) return { status: 429, retryAfter: secondsFrom(e, DEFAULT_429_S) };
  if (e.statusCode === 503) return { status: 503, retryAfter: secondsFrom(e, DEFAULT_503_S) };
  return null;
}

/** Respuesta JSON que entiende el cliente (`error: "ai_busy"`). */
export function busyResponse(busy: { status: 429 | 503; retryAfter: number }): Response {
  return Response.json(
    { error: "ai_busy", retryAfter: busy.retryAfter },
    { status: busy.status, headers: { "retry-after": String(busy.retryAfter) } },
  );
}
