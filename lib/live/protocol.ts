// Protocolo de Gemini Live (WebSocket `BidiGenerateContent`), sin SDK. Módulo
// PURO: arma los mensajes que se envían y traduce los que llegan a eventos
// simples. Lo usan el servidor (para el token) y el navegador (la sesión).
//
// Fuentes (consultadas 2026-10-27): ai.google.dev/api/live,
// ai.google.dev/gemini-api/docs/{live-guide,live-session,ephemeral-tokens} y el
// código de `@google/genai` 2.31.0 (URL y forma del cuerpo de `auth_tokens`).

/**
 * Modelo Live. `gemini-3.8-live` es el que la guía recomienda por defecto para
 * voz de baja latencia y sale gratis en la página de precios. El
 * `gemini-3.1-flash-live-preview` también funciona pero la guía lo da por
 * heredado. Si Google lo retira, se cambia aquí y en ningún otro sitio.
 */
export const LIVE_MODEL = "gemini-3.8-live";
export const LIVE_API_VERSION = "v1beta";
export const GEMINI_HOST = "generativelanguage.googleapis.com";

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type LiveLevel = (typeof CEFR_LEVELS)[number];

/** Con token efímero el método es el «Constrained» y el token va en `access_token`. */
export function liveSocketUrl(token: string): string {
  return `wss://${GEMINI_HOST}/ws/google.ai.generativelanguage.${LIVE_API_VERSION}.GenerativeService.BidiGenerateContentConstrained?access_token=${encodeURIComponent(token)}`;
}

export function authTokensUrl(): string {
  return `https://${GEMINI_HOST}/${LIVE_API_VERSION}/auth_tokens`;
}

/**
 * Silencio que cierra el turno del usuario. Quien aprende hace pausas largas
 * buscando la palabra; con los ~800 ms por defecto el modelo le pisa a mitad
 * de frase. Cuanto más bajo el nivel, más paciencia.
 */
export function silenceMsFor(level: LiveLevel): number {
  if (level === "A1" || level === "A2") return 1200;
  if (level === "B1" || level === "B2") return 1000;
  return 800;
}

/** Handle de reanudación: opaco, pero se acota antes de reenviarlo a Google. */
export function validHandle(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 4096 && /^[\x21-\x7e]+$/.test(value);
}

/**
 * El `setup` completo de la sesión. Va DENTRO del token efímero: sin
 * `fieldMask`, el servidor bloquea todos sus campos y lo que mande el cliente
 * se ignora (comprobado: un `systemInstruction` distinto desde el cliente no
 * cambia nada). Por eso el handle de reanudación también va aquí: si se manda
 * sólo desde el cliente, el token lo pisa con `sessionResumption: {}` y la
 * sesión empieza de cero.
 */
export function liveSetup(opts: { system: string; level: LiveLevel; handle?: string | null }) {
  return {
    model: `models/${LIVE_MODEL}`,
    generationConfig: { responseModalities: ["AUDIO"] },
    systemInstruction: { parts: [{ text: opts.system }] },
    realtimeInputConfig: {
      automaticActivityDetection: { silenceDurationMs: silenceMsFor(opts.level) },
    },
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    sessionResumption: opts.handle ? { handle: opts.handle } : {},
    // Sin compresión una sesión de solo audio muere a los 15 min.
    contextWindowCompression: { slidingWindow: {} },
  };
}

/** Cuerpo de `POST /v1beta/auth_tokens`: un solo uso y vida corta. */
export function authTokenBody(setup: ReturnType<typeof liveSetup>, now: number) {
  return {
    uses: 1,
    // Ventana total para mandar mensajes. Cada conexión dura ~10 min como
    // mucho y la reconexión pide un token nuevo, así que 15 min sobran.
    expireTime: new Date(now + 15 * 60_000).toISOString(),
    // Para ABRIR la conexión: el cliente lo usa al instante.
    newSessionExpireTime: new Date(now + 60_000).toISOString(),
    bidiGenerateContentSetup: setup,
  };
}

/* ---------------- mensajes del cliente ---------------- */

/** Primer mensaje: con el token bloqueado basta el modelo (el resto lo impone el token). */
export function setupMessage(): string {
  return JSON.stringify({ setup: { model: `models/${LIVE_MODEL}` } });
}

export function audioMessage(base64Pcm16k: string): string {
  return JSON.stringify({
    realtimeInput: { audio: { data: base64Pcm16k, mimeType: "audio/pcm;rate=16000" } },
  });
}

/** Al silenciar el micro: el VAD cierra el turno sin esperar más audio. */
export function audioStreamEndMessage(): string {
  return JSON.stringify({ realtimeInput: { audioStreamEnd: true } });
}

/** Un turno de texto. Se usa para que el personaje descuelgue y salude primero. */
export function textTurnMessage(text: string): string {
  return JSON.stringify({
    clientContent: { turns: [{ role: "user", parts: [{ text }] }], turnComplete: true },
  });
}

/* ---------------- mensajes del servidor ---------------- */

export type LiveEvent =
  | { type: "setupComplete" }
  | { type: "audio"; data: string }
  | { type: "inputText"; text: string }
  | { type: "outputText"; text: string }
  | { type: "interrupted" }
  | { type: "turnComplete" }
  | { type: "goAway"; ms: number }
  | { type: "resumeHandle"; handle: string }
  | { type: "voiceStart" }
  | { type: "voiceEnd" };

/** Duración protobuf («1.5s») → ms. */
export function durationMs(value: unknown): number {
  if (typeof value !== "string") return 0;
  const m = /^(\d+(?:\.\d+)?)s$/.exec(value.trim());
  return m ? Math.round(Number(m[1]) * 1000) : 0;
}

type Raw = {
  setupComplete?: unknown;
  serverContent?: {
    modelTurn?: { parts?: { inlineData?: { data?: string; mimeType?: string } }[] };
    inputTranscription?: { text?: string };
    outputTranscription?: { text?: string };
    interrupted?: boolean;
    turnComplete?: boolean;
  };
  goAway?: { timeLeft?: string };
  sessionResumptionUpdate?: { newHandle?: string; resumable?: boolean };
  voiceActivity?: { voiceActivityType?: string };
};

/**
 * Un mensaje del servidor → lista de eventos, en el orden en que hay que
 * aplicarlos (un mismo mensaje puede traer audio y transcripción a la vez).
 * Lo que no se entiende se ignora: el protocolo es preview y añade campos.
 */
export function parseServerMessage(raw: string): LiveEvent[] {
  let msg: Raw;
  try {
    msg = JSON.parse(raw) as Raw;
  } catch {
    return [];
  }
  if (!msg || typeof msg !== "object") return [];
  const events: LiveEvent[] = [];

  if (msg.setupComplete) events.push({ type: "setupComplete" });

  const va = msg.voiceActivity?.voiceActivityType;
  if (va === "ACTIVITY_START") events.push({ type: "voiceStart" });
  if (va === "ACTIVITY_END") events.push({ type: "voiceEnd" });

  const sc = msg.serverContent;
  if (sc) {
    // `interrupted` primero: el audio que venga después ya es de otro turno.
    if (sc.interrupted) events.push({ type: "interrupted" });
    if (sc.inputTranscription?.text) events.push({ type: "inputText", text: sc.inputTranscription.text });
    for (const part of sc.modelTurn?.parts ?? []) {
      const data = part.inlineData?.data;
      if (data && (part.inlineData?.mimeType ?? "audio/pcm").startsWith("audio/pcm")) {
        events.push({ type: "audio", data });
      }
    }
    if (sc.outputTranscription?.text) events.push({ type: "outputText", text: sc.outputTranscription.text });
    if (sc.turnComplete) events.push({ type: "turnComplete" });
  }

  const upd = msg.sessionResumptionUpdate;
  if (upd?.resumable && upd.newHandle) events.push({ type: "resumeHandle", handle: upd.newHandle });

  if (msg.goAway) events.push({ type: "goAway", ms: durationMs(msg.goAway.timeLeft) });
  return events;
}
