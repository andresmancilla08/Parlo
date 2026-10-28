// Check runnable. Correr: node --experimental-strip-types lib/live/protocol.check.ts
import assert from "node:assert";
import {
  audioMessage,
  audioStreamEndMessage,
  authTokenBody,
  durationMs,
  LIVE_MODEL,
  liveSetup,
  liveSocketUrl,
  parseServerMessage,
  setupMessage,
  silenceMsFor,
  textTurnMessage,
  validHandle,
} from "./protocol.ts";
import { CALL_START_CUE, liveSystemPrompt } from "./prompt.ts";

// --- URL: método «Constrained» + access_token escapado ---
const url = liveSocketUrl("auth_tokens/a+b");
assert.ok(url.startsWith("wss://generativelanguage.googleapis.com/ws/"));
assert.ok(url.includes("GenerativeService.BidiGenerateContentConstrained?access_token="));
assert.ok(url.endsWith("auth_tokens%2Fa%2Bb"), "el token va escapado");

// --- setup bloqueado en el token ---
const setup = liveSetup({ system: "SYS", level: "A1" });
assert.equal(setup.model, `models/${LIVE_MODEL}`);
assert.deepEqual(setup.generationConfig.responseModalities, ["AUDIO"]);
assert.equal(setup.systemInstruction.parts[0].text, "SYS");
assert.deepEqual(setup.inputAudioTranscription, {});
assert.deepEqual(setup.outputAudioTranscription, {});
assert.deepEqual(setup.sessionResumption, {}, "sin handle: sesión nueva");
assert.ok(setup.contextWindowCompression.slidingWindow, "compresión activada (si no, 15 min)");
assert.equal(setup.realtimeInputConfig.automaticActivityDetection.silenceDurationMs, 1200);
assert.deepEqual(liveSetup({ system: "x", level: "B1", handle: "h1" }).sessionResumption, { handle: "h1" }, "el handle viaja DENTRO del token");

assert.ok(silenceMsFor("A2") > silenceMsFor("B2") && silenceMsFor("B2") > silenceMsFor("C2"), "más paciencia a menor nivel");

const now = Date.UTC(2026, 9, 27, 12, 0, 0);
const body = authTokenBody(setup, now);
assert.equal(body.uses, 1, "un solo uso");
assert.equal(body.newSessionExpireTime, "2026-10-27T12:01:00.000Z", "1 min para abrir");
assert.equal(body.expireTime, "2026-10-27T12:15:00.000Z");
assert.equal(body.bidiGenerateContentSetup, setup);
assert.ok(!("fieldMask" in body), "sin fieldMask: el servidor bloquea TODO el setup");

// --- handle ---
assert.equal(validHandle("CiQ2abc-_.=/+"), true);
assert.equal(validHandle(""), false);
assert.equal(validHandle("con espacio"), false);
assert.equal(validHandle("x".repeat(4097)), false);
assert.equal(validHandle(42), false);
assert.equal(validHandle("salto\n"), false);

// --- mensajes del cliente ---
assert.deepEqual(JSON.parse(setupMessage()), { setup: { model: `models/${LIVE_MODEL}` } });
assert.deepEqual(JSON.parse(audioMessage("QUJD")), {
  realtimeInput: { audio: { data: "QUJD", mimeType: "audio/pcm;rate=16000" } },
});
assert.deepEqual(JSON.parse(audioStreamEndMessage()), { realtimeInput: { audioStreamEnd: true } });
assert.deepEqual(JSON.parse(textTurnMessage("hi")), {
  clientContent: { turns: [{ role: "user", parts: [{ text: "hi" }] }], turnComplete: true },
});

// --- mensajes del servidor ---
assert.deepEqual(parseServerMessage('{"setupComplete":{}}'), [{ type: "setupComplete" }]);
assert.deepEqual(parseServerMessage("no es json"), []);
assert.deepEqual(parseServerMessage("null"), []);
assert.deepEqual(parseServerMessage('{"algoNuevo":1}'), [], "campos desconocidos se ignoran");

const mixed = parseServerMessage(
  JSON.stringify({
    serverContent: {
      modelTurn: { parts: [{ inlineData: { mimeType: "audio/pcm;rate=24000", data: "AAAA" } }, { text: "pensamiento" }] },
      outputTranscription: { text: "Hello" },
      inputTranscription: { text: "Hi" },
      turnComplete: true,
    },
  }),
);
assert.deepEqual(
  mixed.map((e) => e.type),
  ["inputText", "audio", "outputText", "turnComplete"],
  "orden: lo del usuario, el audio, su texto y el cierre al final",
);

const interrupted = parseServerMessage(
  JSON.stringify({ serverContent: { interrupted: true, modelTurn: { parts: [{ inlineData: { data: "BBBB" } }] } } }),
);
assert.equal(interrupted[0].type, "interrupted", "interrupted va antes que cualquier audio");

assert.deepEqual(
  parseServerMessage('{"serverContent":{"modelTurn":{"parts":[{"inlineData":{"mimeType":"image/png","data":"x"}}]}}}'),
  [],
  "sólo audio PCM",
);

assert.deepEqual(parseServerMessage('{"sessionResumptionUpdate":{"newHandle":"H","resumable":true}}'), [
  { type: "resumeHandle", handle: "H" },
]);
assert.deepEqual(
  parseServerMessage('{"sessionResumptionUpdate":{"newHandle":"H","resumable":false}}'),
  [],
  "un handle no reanudable no sirve",
);
assert.deepEqual(parseServerMessage('{"goAway":{"timeLeft":"9.5s"}}'), [{ type: "goAway", ms: 9500 }]);
assert.deepEqual(parseServerMessage('{"voiceActivity":{"voiceActivityType":"ACTIVITY_START"}}'), [{ type: "voiceStart" }]);
assert.deepEqual(parseServerMessage('{"voiceActivity":{"voiceActivityType":"ACTIVITY_END"}}'), [{ type: "voiceEnd" }]);

assert.equal(durationMs("2s"), 2000);
assert.equal(durationMs("0.25s"), 250);
assert.equal(durationMs("raro"), 0);
assert.equal(durationMs(undefined), 0);

// --- prompt ---
const cafe = { roleEn: "a barista", situationEn: "ordering coffee", openerEn: 'Hi! "What" can I get you?' };
const p = liveSystemPrompt(cafe, "A1");
assert.ok(p.includes("You are a barista"));
assert.ok(p.includes("open with exactly this line"));
assert.ok(p.includes("CEFR A1"));
assert.ok(p.includes("Speak ONLY English"));
assert.ok(p.includes("Do not correct the learner during the call"), "la corrección llega al colgar");
const free = liveSystemPrompt(null, "C2");
assert.ok(free.includes("casual phone chat") && free.includes("CEFR C2"));
assert.ok(CALL_START_CUE.startsWith("[") && CALL_START_CUE.endsWith("]"), "la señal de descolgar no parece habla del usuario");

console.log("live/protocol.check ✓ todos los asserts pasan");
