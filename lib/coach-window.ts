// Ventana del historial que viaja al tutor. Módulo puro (sin imports locales)
// para que su `.check.ts` corra con node y para que cliente y servidor
// compartan los MISMOS límites: si el cliente recorta con otros números que los
// que valida el servidor, la conversación muere en cuanto crece.

export type WindowTurn = { role: "user" | "assistant"; content: string };

/** Lo que acepta `/api/coach`. El servidor rechaza cualquier cosa por encima. */
export const COACH_MAX_MESSAGES = 40;
export const COACH_MAX_CHARS = 10_000;

/** Turnos recientes que se mandan además del primero (el que fija el escenario). */
export const COACH_TAIL = 16;

/** Margen bajo `COACH_MAX_CHARS`: el JSON del cuerpo añade comillas y escapes. */
const CHAR_BUDGET = COACH_MAX_CHARS - 1_000;

function size(turns: WindowTurn[]): number {
  return JSON.stringify(turns).length;
}

/**
 * Devuelve el trozo de conversación que se manda al modelo: el primer mensaje
 * (en un escenario es la frase con la que arranca el personaje y da contexto)
 * más los últimos `tail` turnos, recortando por delante hasta caber en el
 * presupuesto de caracteres. El último turno (el que hay que contestar) nunca
 * se pierde: si ni él cabe, se corta su texto.
 *
 * La cola nunca empieza con el mismo papel que el primer turno: dos turnos
 * seguidos del mismo papel en la costura confunden al modelo.
 */
export function coachWindow(turns: WindowTurn[], tail = COACH_TAIL): WindowTurn[] {
  if (turns.length === 0) return [];
  const maxTail = Math.min(tail, COACH_MAX_MESSAGES - 1);

  if (turns.length <= maxTail + 1 && size(turns) <= CHAR_BUDGET) return turns;

  const head = turns[0];
  let rest = turns.slice(1).slice(-maxTail);

  const fits = () => size([head, ...rest]) <= CHAR_BUDGET;
  // Se suelta por delante hasta caber, pero sin quedarse sin el último turno.
  while (rest.length > 1 && (!fits() || rest[0].role === head.role)) {
    rest = rest.slice(1);
  }

  let window = [head, ...rest];
  if (size(window) > CHAR_BUDGET) {
    // Caso extremo: un único mensaje enorme. Mejor el final recortado que nada.
    const last = window.at(-1)!;
    const room = Math.max(200, CHAR_BUDGET - size([head]) - 100);
    window = [head, { ...last, content: last.content.slice(0, room) }];
    if (size(window) > CHAR_BUDGET) window = [{ ...last, content: last.content.slice(0, room) }];
  }
  return window;
}
