import { generateObject, jsonSchema } from "ai";
import { google } from "@ai-sdk/google";
import { allow } from "@/lib/rate-limit";

// Traducción de la letra que el usuario tiene cargada y significado de palabras
// sueltas. Se genera EN SU SESIÓN y el cliente la cachea en su dispositivo: no
// alojamos ni servimos letras ni traducciones de obras de terceros.

export const maxDuration = 30;

const MAX_LINES = 60;
const MAX_CHARS = 4_000;
const RATE = { store: new Map<string, number[]>(), limit: 30, windowMs: 60_000 };

const LINES_SCHEMA = jsonSchema<{ lines: string[] }>({
  type: "object",
  additionalProperties: false,
  required: ["lines"],
  properties: {
    lines: {
      type: "array",
      description:
        "Traducción al español, UNA por cada línea recibida y en el mismo orden.",
      items: { type: "string" },
    },
  },
});

const WORD_SCHEMA = jsonSchema<{
  translation: string;
  meaning: string;
  example: string;
}>({
  type: "object",
  additionalProperties: false,
  required: ["translation", "meaning", "example"],
  properties: {
    translation: { type: "string", description: "Traducción al español en contexto." },
    meaning: {
      type: "string",
      description: "Qué significa aquí, en español, una o dos frases.",
    },
    example: { type: "string", description: "Otra frase de ejemplo en inglés." },
  },
});

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json({ error: "AI not configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip, Date.now(), RATE)) {
    return Response.json(
      { error: "Too many requests" },
      { status: 429, headers: { "retry-after": "60" } },
    );
  }

  let body: { mode?: unknown; lines?: unknown; word?: unknown; context?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Modelo más barato verificado con esta cuenta: suficiente para traducir.
  const model = google("gemini-flash-lite-latest");

  try {
    if (body.mode === "word") {
      const word = String(body.word ?? "").slice(0, 80).trim();
      const context = String(body.context ?? "").slice(0, 300).trim();
      if (!word) return Response.json({ error: "Invalid word" }, { status: 400 });

      const { object } = await generateObject({
        model,
        schema: WORD_SCHEMA,
        system:
          "Explicas inglés a un hispanohablante. Responde SIEMPRE en español, breve y claro. Si la palabra forma parte de una expresión, explica la expresión.",
        prompt: `Palabra o frase: «${word}»\nAparece en: «${context}»`,
        maxOutputTokens: 300,
      });
      return Response.json(object);
    }

    const lines = body.lines;
    if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_LINES) {
      return Response.json({ error: "Invalid lines" }, { status: 400 });
    }
    const clean = lines.map((l) => String(l).slice(0, 200));
    if (clean.join("\n").length > MAX_CHARS) {
      return Response.json({ error: "Too long" }, { status: 413 });
    }

    const { object } = await generateObject({
      model,
      schema: LINES_SCHEMA,
      system:
        "Traduces del inglés al español para alguien que está aprendiendo. Traducción natural, no literal palabra por palabra, manteniendo el sentido de cada línea. Devuelve exactamente una traducción por línea recibida, en el mismo orden.",
      prompt: clean.map((l, i) => `${i + 1}. ${l}`).join("\n"),
      maxOutputTokens: 1200,
    });

    // Si el modelo devuelve otra cantidad de líneas, se rellena para no
    // desalinear la vista bilingüe.
    const out = clean.map((_, i) => object.lines[i] ?? "");
    return Response.json({ lines: out });
  } catch (error) {
    console.error("[lyrics] falló:", error);
    return Response.json({ error: "AI unavailable" }, { status: 502 });
  }
}
