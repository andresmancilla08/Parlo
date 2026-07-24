import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

const INSTRUCTIONS = `Eres el tutor de inglés de Parlo. El usuario es hispanohablante y está aprendiendo inglés (asume nivel principiante A1–A2 salvo que demuestre más).

Reglas:
- Conversa en inglés sencillo, natural y a su nivel. Mensajes cortos.
- Termina casi siempre con una pregunta para que siga practicando.
- Tras cada mensaje del usuario, si hay errores, añade al final una sección "💡 Corrección" con: la versión correcta y una explicación breve del porqué EN ESPAÑOL. Si no hay errores, felicítalo en una línea en español.
- Sé cálido y motivador. Nunca uses lenguaje ofensivo.
- Si el usuario escribe en español, respóndele igual pero anímalo suavemente a intentarlo en inglés.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    instructions: INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
