// Transcripción en vivo del modo llamada. Módulo puro.
//
// Las dos transcripciones llegan a trozos y DESORDENADAS entre sí: la de
// entrada (lo que dijo el usuario) suele terminar de llegar cuando el modelo ya
// está respondiendo. Por eso cada lado se acumula en su propio borrador y al
// cerrar el turno del modelo se consolida en orden: primero el usuario, luego
// el modelo.

export type CallRole = "user" | "assistant";
export type CallLine = { role: CallRole; text: string };

export type Transcript = {
  lines: CallLine[];
  user: string;
  model: string;
};

export const EMPTY_TRANSCRIPT: Transcript = { lines: [], user: "", model: "" };

/** Los trozos ya traen sus espacios; sólo se normaliza al mostrar o guardar. */
function tidy(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function addFragment(t: Transcript, role: CallRole, text: string): Transcript {
  if (!text) return t;
  return role === "user" ? { ...t, user: t.user + text } : { ...t, model: t.model + text };
}

/**
 * Cierra el turno: pasa los borradores a líneas. Si el modelo fue interrumpido
 * se guarda lo que llegó a decir (es lo que el usuario oyó).
 */
export function closeTurn(t: Transcript): Transcript {
  const lines = [...t.lines];
  const user = tidy(t.user);
  const model = tidy(t.model);
  if (user) pushLine(lines, "user", user);
  if (model) pushLine(lines, "assistant", model);
  return { lines, user: "", model: "" };
}

/** Dos líneas seguidas del mismo lado se funden (el VAD a veces parte una frase). */
function pushLine(lines: CallLine[], role: CallRole, text: string) {
  const last = lines.at(-1);
  if (last?.role === role) lines[lines.length - 1] = { role, text: `${last.text} ${text}` };
  else lines.push({ role, text });
}

/** Lo que se pinta: líneas cerradas + borradores en curso (usuario primero). */
export function visibleLines(t: Transcript): (CallLine & { live: boolean })[] {
  const out = t.lines.map((l) => ({ ...l, live: false }));
  const user = tidy(t.user);
  const model = tidy(t.model);
  if (user) out.push({ role: "user", text: user, live: true });
  if (model) out.push({ role: "assistant", text: model, live: true });
  return out;
}

/** Tope del texto que se manda a revisar: `/api/coach` corta cada mensaje en 2000. */
export const REVIEW_MAX_CHARS = 1800;

/**
 * Lo que dijo el usuario, para que el coach lo corrija al colgar. Va como UN
 * solo mensaje: el coach revisa el último mensaje del usuario, así que
 * juntarlo todo es la forma de que mire la llamada entera. Si no cabe, se
 * queda lo último (lo más reciente es lo que el usuario recuerda).
 */
export function reviewText(t: Transcript): string {
  const said = closeTurn(t)
    .lines.filter((l) => l.role === "user")
    .map((l) => l.text);
  let text = said.join("\n");
  if (text.length > REVIEW_MAX_CHARS) {
    text = text.slice(-REVIEW_MAX_CHARS);
    const cut = text.indexOf("\n");
    // Empezar en una frase entera si se puede.
    if (cut > 0 && cut < REVIEW_MAX_CHARS / 2) text = text.slice(cut + 1);
  }
  return text.trim();
}

/** mm:ss para el temporizador. */
export function formatClock(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
