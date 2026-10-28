// Check runnable. Correr: node --experimental-strip-types lib/ai-errors.check.ts
import assert from "node:assert";
import { busyResponse, dailyQuotaExceeded, upstreamBusy } from "./ai-errors.ts";

const quota = {
  statusCode: 429,
  responseHeaders: {},
  responseBody: '{"error":{"code":429,"details":[{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay": "23s"}]}}',
};

assert.deepEqual(upstreamBusy(quota), { status: 429, retryAfter: 23 }, "plazo del cuerpo (RetryInfo)");
assert.deepEqual(
  upstreamBusy({ statusCode: 429, responseHeaders: { "retry-after": "7" } }),
  { status: 429, retryAfter: 7 },
  "la cabecera manda sobre el cuerpo",
);
assert.deepEqual(upstreamBusy({ statusCode: 429 }), { status: 429, retryAfter: 30 }, "por defecto 30 s");
assert.deepEqual(upstreamBusy({ statusCode: 503 }), { status: 503, retryAfter: 10 }, "saturado: 10 s");
assert.deepEqual(
  upstreamBusy({ statusCode: 429, responseHeaders: { "retry-after": "9999" } }),
  { status: 429, retryAfter: 120 },
  "nunca más de 2 minutos",
);

// Envuelto por el SDK (RetryError.lastError o cause).
assert.equal(upstreamBusy({ lastError: quota })?.retryAfter, 23);
assert.equal(upstreamBusy({ cause: { lastError: { statusCode: 503 } } })?.status, 503);

// Otros fallos no son «saturado».
assert.equal(upstreamBusy({ statusCode: 400 }), null);
assert.equal(upstreamBusy(new Error("JSON roto")), null);
assert.equal(upstreamBusy(null), null);

// Tope diario del free tier: se distingue del de por minuto.
const daily = {
  statusCode: 429,
  responseBody:
    '{"error":{"code":429,"message":"Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-3.8-flash, description: Generate content requests per day limit exceeded on Free Tier.","details":[{"quotaId":"GenerateRequestsPerDayPerProjectPerModel-FreeTier"}]}}',
};
assert.equal(dailyQuotaExceeded(daily), true, "tope diario");
assert.equal(dailyQuotaExceeded({ lastError: daily }), true, "tope diario envuelto");
assert.equal(dailyQuotaExceeded(quota), false, "el de por minuto no es diario");
assert.equal(dailyQuotaExceeded({ statusCode: 503, responseBody: "per day" }), false, "sólo 429");

const res = busyResponse({ status: 429, retryAfter: 23 });
assert.equal(res.status, 429);
assert.equal(res.headers.get("retry-after"), "23");
assert.deepEqual(await res.json(), { error: "ai_busy", retryAfter: 23 });

console.log("ai-errors: OK");
