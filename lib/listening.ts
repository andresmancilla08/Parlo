import type { Cefr } from "@/lib/curriculum/types";

// Escucha activa: se oye una frase y hay que completar los huecos.
// El contenido es ORIGINAL de Parlo (escrito para la app) y se lee con la voz
// del dispositivo: así no dependemos de licencias de música ni de
// transcripciones ajenas. La integración con vídeo/podcasts con licencia queda
// para una v2 (ver docs/contexto/checklist.md §6).

export type ListeningTrack = {
  id: string;
  level: Cefr;
  titleEs: string;
  titleEn: string;
  /** Frases en inglés, en orden. Cada una es una unidad de escucha. */
  lines: string[];
};

export const TRACKS: ListeningTrack[] = [
  {
    id: "morning",
    level: "A1",
    titleEs: "Mi mañana",
    titleEn: "My morning",
    lines: [
      "I wake up at seven every day.",
      "First I drink a big glass of water.",
      "Then I make coffee and toast for breakfast.",
      "My cat sits on the table and looks at me.",
      "I take a shower and get dressed.",
      "The bus stop is five minutes from my house.",
      "I always listen to music on the bus.",
      "At nine o'clock I start work.",
    ],
  },
  {
    id: "weekend",
    level: "A2",
    titleEs: "Un fin de semana fuera",
    titleEn: "A weekend away",
    lines: [
      "Last weekend we travelled to a small town by the sea.",
      "The hotel was cheap but the room was really nice.",
      "On Saturday morning we walked along the beach for two hours.",
      "We ate fish in a restaurant near the harbour.",
      "It started to rain, so we went into a museum.",
      "I bought a postcard for my sister.",
      "In the evening we were tired but happy.",
      "We are going back there next summer.",
    ],
  },
  {
    id: "firstday",
    level: "B1",
    titleEs: "Mi primer día de trabajo",
    titleEn: "My first day at work",
    lines: [
      "I had been waiting for that job for almost a year.",
      "When I arrived, nobody knew who I was.",
      "A woman from the team came up with a plan to help me.",
      "She said that I would meet the manager after lunch.",
      "If I had known how long the meeting was, I would have eaten first.",
      "By the time it finished, the office was already empty.",
      "I was told that my first project would start on Monday.",
      "Looking back, I should have asked more questions that day.",
    ],
  },
];

export type Difficulty = {
  id: "beginner" | "easy" | "hard" | "expert";
  /** Proporción de palabras ocultas. */
  ratio: number;
  /** Se muestra la primera letra del hueco. */
  initial: boolean;
  /** Longitud mínima de palabra que puede ocultarse. */
  minLen: number;
};

export const DIFFICULTIES: Difficulty[] = [
  { id: "beginner", ratio: 0.12, initial: true, minLen: 4 },
  { id: "easy", ratio: 0.22, initial: true, minLen: 3 },
  { id: "hard", ratio: 0.35, initial: false, minLen: 3 },
  { id: "expert", ratio: 0.5, initial: false, minLen: 1 },
];

/** Palabras de la frase, conservando la puntuación pegada a cada una. */
export function tokenize(line: string): string[] {
  return line.split(/\s+/).filter(Boolean);
}

/** Sólo letras y apóstrofos: es lo que se compara con lo que escribe el usuario. */
export function coreOf(token: string): string {
  return token.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, "");
}

export function sameWord(guess: string, token: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
  return norm(guess) === norm(coreOf(token)) && norm(guess).length > 0;
}

/** Hash estable: los mismos huecos en cualquier dispositivo y en cada render. */
function hash(s: string): number {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 1_000_003;
  return h;
}

/**
 * Índices de las palabras que se ocultan en una frase. Determinista (sin
 * Math.random) y siempre al menos un hueco por frase.
 */
export function blanksFor(line: string, difficulty: Difficulty): number[] {
  const tokens = tokenize(line);
  const eligible = tokens
    .map((tk, i) => ({ i, len: coreOf(tk).length }))
    .filter((t) => t.len >= difficulty.minLen);
  if (eligible.length === 0) return [];

  const target = Math.max(1, Math.round(tokens.length * difficulty.ratio));
  // Se ordenan por un hash de (frase + palabra) y se cogen los primeros:
  // reparte los huecos sin depender del azar.
  const picked = eligible
    .map((t) => ({ ...t, k: hash(`${line}#${t.i}`) }))
    .sort((a, b) => a.k - b.k)
    .slice(0, Math.min(target, eligible.length))
    .map((t) => t.i)
    .sort((a, b) => a - b);
  return picked;
}

/** Pista que se muestra en el hueco: inicial + guiones, o solo guiones. */
export function blankHint(token: string, difficulty: Difficulty): string {
  const core = coreOf(token);
  return difficulty.initial ? `${core[0]}${"·".repeat(Math.max(core.length - 1, 1))}` : "·".repeat(core.length);
}
