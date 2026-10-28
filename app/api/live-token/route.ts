import { allow } from "@/lib/rate-limit";
import { guard } from "@/lib/api-guard";
import { busyResponse, upstreamBusy } from "@/lib/ai-errors";
import { SCENARIOS } from "@/lib/coach";
import { liveSystemPrompt } from "@/lib/live/prompt";
import {
  authTokenBody,
  authTokensUrl,
  CEFR_LEVELS,
  LIVE_MODEL,
  liveSetup,
  validHandle,
  type LiveLevel,
} from "@/lib/live/protocol";

// Token efímero para el modo llamada. El navegador abre el WebSocket de Gemini
// Live directamente (el audio no pasa por Vercel), pero NUNCA ve la clave: se
// lleva un token de un solo uso, de vida corta y con el modelo, el prompt y la
// configuración bloqueados dentro.

export const maxDuration = 15;

const RATE = {
  ip: { store: new Map<string, number[]>(), limit: 12, windowMs: 60_000 },
  // Una llamada pide 1 token, más 1 por reconexión (cada ~10 min o al
  // cortarse la red). 6/min deja reconectar sin dejar abrir sesiones en bucle.
  uid: { store: new Map<string, number[]>(), limit: 6, windowMs: 60_000 },
};

/**
 * Tope diario por cuenta (ventana deslizante de 24 h, en memoria por instancia
 * como el resto de límites). 40 tokens dan para ~15 llamadas largas al día.
 */
const DAILY = { store: new Map<string, number[]>(), limit: 40, windowMs: 24 * 60 * 60_000 };

const SCENARIO_IDS = new Set(SCENARIOS.map((s) => s.id));

export async function POST(req: Request) {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return Response.json({ error: "AI not configured" }, { status: 503 });

  const gate = await guard(req, RATE);
  if (gate instanceof Response) return gate;

  let body: { scenario?: unknown; level?: unknown; handle?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Todo lo que acaba en el prompt sale de listas cerradas, nunca de texto libre.
  const scenarioId = body.scenario ?? null;
  if (scenarioId !== null && (typeof scenarioId !== "string" || !SCENARIO_IDS.has(scenarioId))) {
    return Response.json({ error: "Invalid scenario" }, { status: 400 });
  }
  const level = CEFR_LEVELS.find((l) => l === body.level) as LiveLevel | undefined;
  if (!level) return Response.json({ error: "Invalid level" }, { status: 400 });
  if (body.handle !== undefined && body.handle !== null && !validHandle(body.handle)) {
    return Response.json({ error: "Invalid handle" }, { status: 400 });
  }
  const handle = validHandle(body.handle) ? body.handle : null;

  const now = Date.now();
  if (!allow(`day:${gate.uid}`, now, DAILY)) {
    return Response.json({ error: "daily_limit" }, { status: 429 });
  }

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? null;
  const setup = liveSetup({ system: liveSystemPrompt(scenario, level), level, handle });

  let res: Response;
  try {
    res = await fetch(authTokensUrl(), {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(authTokenBody(setup, now)),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error("[live-token] Gemini inalcanzable:", err);
    return Response.json({ error: "AI unavailable" }, { status: 502 });
  }

  if (res.status === 429 || res.status === 503) {
    // Misma lectura del plazo (`retry-after` o `RetryInfo`) que el coach.
    const busy = upstreamBusy({
      statusCode: res.status,
      responseHeaders: { "retry-after": res.headers.get("retry-after") ?? "" },
      responseBody: await res.text().catch(() => ""),
    });
    console.warn("[live-token] Gemini saturado o sin cuota:", res.status);
    if (busy) return busyResponse(busy);
  }
  if (!res.ok) {
    // El cuerpo puede reflejar la petición, pero nunca la clave: va en cabecera.
    console.error("[live-token] auth_tokens respondió", res.status, (await res.text().catch(() => "")).slice(0, 300));
    return Response.json({ error: "AI unavailable" }, { status: 502 });
  }

  const data = (await res.json().catch(() => null)) as { name?: string; expireTime?: string } | null;
  if (!data?.name) return Response.json({ error: "AI unavailable" }, { status: 502 });

  return Response.json(
    { token: data.name, model: LIVE_MODEL, expireTime: data.expireTime ?? null },
    { headers: { "cache-control": "no-store" } },
  );
}
