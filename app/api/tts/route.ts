import { allow } from "@/lib/rate-limit";

// Voz neural para el lector. La calidad de Web Speech depende del dispositivo
// (en un Android barato suena metálica), y en un lector de textos largos eso
// se nota más que en ningún otro sitio.
//
// Es un GET a propósito: la misma frase es siempre la misma URL, así que la
// CDN de Vercel la cachea y la segunda vez ni siquiera llega aquí. Ese es todo
// el «cacheado»: sin base de datos, sin bucket y sin coste de almacenamiento.

export const maxDuration = 30;

/** Frase de lectura. Más largo que esto no es una frase, es un párrafo. */
const MAX_CHARS = 400;

const MODEL = "gemini-2.5-flash-preview-tts";
/** Voces del modelo; `Kore` es neutra y clara para aprender. */
const VOICES: Record<string, string> = { f: "Kore", m: "Puck" };

const RATE = { store: new Map<string, number[]>(), limit: 60, windowMs: 60_000 };

/**
 * El modelo devuelve PCM crudo (L16 24 kHz mono). El navegador no lo reproduce
 * tal cual: hay que ponerle delante la cabecera RIFF de 44 bytes.
 */
function toWav(pcm: Buffer, sampleRate = 24_000): Buffer {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // tamaño del bloque fmt
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28); // bytes por segundo (16 bits mono)
  header.writeUInt16LE(2, 32); // alineación de bloque
  header.writeUInt16LE(16, 34); // bits por muestra
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

export async function GET(req: Request) {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  // Sin clave no se rompe nada: el cliente vuelve a la voz del dispositivo.
  if (!key) return new Response("TTS not configured", { status: 503 });

  const url = new URL(req.url);
  const text = (url.searchParams.get("t") ?? "").trim();
  const voice = VOICES[url.searchParams.get("v") ?? "f"] ?? VOICES.f;

  if (!text) return new Response("Missing text", { status: 400 });
  if (text.length > MAX_CHARS) return new Response("Text too long", { status: 413 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!allow(ip, Date.now(), RATE)) {
    return new Response("Too many requests", { status: 429 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
        },
      }),
    },
  );

  if (!res.ok) {
    // Cuota agotada, límite por minuto o modelo caído: el cliente se va a la
    // voz del dispositivo. Se registra el motivo para poder verlo en los logs.
    const detail = await res.text().catch(() => "");
    console.error("[tts] upstream", res.status, detail.slice(0, 200));
    return new Response("TTS upstream error", { status: res.status === 429 ? 429 : 502 });
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { inlineData?: { data?: string } }[] } }[];
  };
  const b64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!b64) return new Response("No audio", { status: 502 });

  const wav = toWav(Buffer.from(b64, "base64"));

  return new Response(new Uint8Array(wav), {
    headers: {
      "content-type": "audio/wav",
      "content-length": String(wav.length),
      // Una frase suena siempre igual: se cachea para siempre en la CDN y en el
      // navegador. Es lo que hace que esto no queme la cuota gratuita.
      "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable",
    },
  });
}
