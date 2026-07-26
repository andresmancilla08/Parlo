import { generateObject, jsonSchema } from "ai";
import { google } from "@ai-sdk/google";
import { allow } from "@/lib/rate-limit";

// Traducción por frase y significado de palabras para el lector. Se genera en la
// sesión del usuario y el cliente la cachea: aquí no se guarda su documento.

export const maxDuration = 30;

const MAX_SENTENCES = 25;
const MAX_CHARS = 5_000;
const RATE = { store: new Map<string, number[]>(), limit: 40, windowMs: 60_000 };

const LINES = jsonSchema<{ lines: string[] }>({
  type: "object",
  additionalProperties: false,
  required: ["lines"],
  properties: {
    lines: {
      type: "array",
      description: "Traducción al español, una por frase recibida y en el mismo orden.",
      items: { type: "string" },
    },
  },
});

const WORD = jsonSchema<{ translation: string; meaning: string; example: string }>({
  type: "object",
  additionalProperties: false,
  required: ["translation", "meaning", "example"],
  properties: {
    translation: { type: "string", description: "Traducción al español en contexto." },
    meaning: { type: "string", description: "Qué significa aquí, en español, breve." },
    example: { type: "string", description: "Otra frase de ejemplo en inglés." },
  },
});

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json({ error: "AI not configured" }, { status: 503 });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip, Date.now(), RATE)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { mode?: unknown; lines?: unknown; word?: unknown; context?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // El más barato verificado con esta cuenta; de sobra para traducir.
  const model = google("gemini-flash-lite-latest");

  try {
    if (body.mode === "word") {
      const word = String(body.word ?? "").slice(0, 80).trim();
      const context = String(body.context ?? "").slice(0, 400).trim();
      if (!word) return Response.json({ error: "Invalid word" }, { status: 400 });
      const { object } = await generateObject({
        model,
        schema: WORD,
        system:
          "Explicas inglés a un hispanohablante. Responde SIEMPRE en español, claro y breve. Si la palabra forma parte de una expresión, explica la expresión entera.",
        prompt: `Palabra: «${word}»\nFrase donde aparece: «${context}»`,
        maxOutputTokens: 300,
      });
      return Response.json(object);
    }

    const lines = body.lines;
    if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_SENTENCES) {
      return Response.json({ error: "Invalid lines" }, { status: 400 });
    }
    const clean = lines.map((l) => String(l).slice(0, 400));
    if (clean.join(" ").length > MAX_CHARS) {
      return Response.json({ error: "Too long" }, { status: 413 });
    }

    const { object } = await generateObject({
      model,
      schema: LINES,
      system:
        "Traduces del inglés al español para alguien que está aprendiendo: natural, no literal, respetando el sentido de cada frase. Devuelve exactamente una traducción por frase recibida y en el mismo orden.",
      prompt: clean.map((l, i) => `${i + 1}. ${l}`).join("\n"),
      // Con menos, el JSON se corta y llega texto suelto.
      maxOutputTokens: 1600,
    });
    return Response.json({ lines: clean.map((_, i) => object.lines[i] ?? "") });
  } catch (error) {
    console.error("[translate] falló:", error);
    return Response.json({ error: "AI unavailable" }, { status: 502 });
  }
}
