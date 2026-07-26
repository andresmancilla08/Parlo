import type { Cefr } from "@/lib/curriculum/types";

// Test de nivel: 12 ítems (4 por nivel) que se recorren de menos a más.
// No es un examen oficial: sirve para no obligar a empezar en A1 a quien ya
// sabe. La explicación sigue siendo SIEMPRE en español, como el resto de Parlo.

export type PlacementItem = {
  id: string;
  level: Cefr; // nivel que demuestra acertar este ítem
  prompt: string;
  options: string[];
  answer: string;
  explain: string;
};

/** Niveles por los que pasa el test, en orden. */
export const PLACEMENT_LEVELS: Cefr[] = ["A1", "A2", "B1"];

/** Aciertos necesarios (de 4) para dar un nivel por superado. */
export const PASS = 3;

export const PLACEMENT_ITEMS: PlacementItem[] = [
  // ---------------- A1 ----------------
  {
    id: "p-a1-1",
    level: "A1",
    prompt: "«___ name is Ana.»",
    options: ["My", "I", "Me", "Mine"],
    answer: "My",
    explain: "«My» es el posesivo (mi). «I» es el sujeto y «me» el objeto.",
  },
  {
    id: "p-a1-2",
    level: "A1",
    prompt: "«She ___ a teacher.»",
    options: ["is", "are", "am", "be"],
    answer: "is",
    explain: "Con he/she/it el verbo «to be» es «is».",
  },
  {
    id: "p-a1-3",
    level: "A1",
    prompt: "¿Cuál es el plural de «child»?",
    options: ["children", "childs", "childes", "child"],
    answer: "children",
    explain: "Plural irregular: child → children (igual que man → men).",
  },
  {
    id: "p-a1-4",
    level: "A1",
    prompt: "«There ___ two books on the table.»",
    options: ["are", "is", "have", "has"],
    answer: "are",
    explain: "«There is» para singular y «there are» para plural.",
  },

  // ---------------- A2 ----------------
  {
    id: "p-a2-1",
    level: "A2",
    prompt: "«Yesterday I ___ to the cinema.»",
    options: ["went", "go", "have gone", "goed"],
    answer: "went",
    explain:
      "«Yesterday» cierra el tiempo, así que va pasado simple: go → went (irregular).",
  },
  {
    id: "p-a2-2",
    level: "A2",
    prompt: "«This car is ___ than mine.»",
    options: ["faster", "more fast", "fastest", "fast"],
    answer: "faster",
    explain: "Adjetivo corto → comparativo con -er: fast → faster.",
  },
  {
    id: "p-a2-3",
    level: "A2",
    prompt: "«I ___ never been to Japan.»",
    options: ["have", "has", "am", "did"],
    answer: "have",
    explain: "Presente perfecto: have/has + participio. Con «I» va «have».",
  },
  {
    id: "p-a2-4",
    level: "A2",
    prompt: "«She doesn't ___ coffee.»",
    options: ["like", "likes", "liked", "liking"],
    answer: "like",
    explain: "Tras «doesn't» el verbo va en forma base: la -s ya está en «doesn't».",
  },

  // ---------------- B1 ----------------
  {
    id: "p-b1-1",
    level: "B1",
    prompt: "«If I ___ more time, I would travel.»",
    options: ["had", "have", "would have", "has"],
    answer: "had",
    explain:
      "Segundo condicional: if + pasado, would + base. Tras «if» nunca va «would».",
  },
  {
    id: "p-b1-2",
    level: "B1",
    prompt: "«I ___ TV when she called.»",
    options: ["was watching", "watched", "watch", "am watching"],
    answer: "was watching",
    explain:
      "La acción larga de fondo va en pasado continuo; la que interrumpe, en pasado simple.",
  },
  {
    id: "p-b1-3",
    level: "B1",
    prompt: "«She said she ___ come later.»",
    options: ["would", "will", "is going", "can"],
    answer: "would",
    explain: "En estilo indirecto «will» retrocede a «would».",
  },
  {
    id: "p-b1-4",
    level: "B1",
    prompt: "«This bridge ___ in 1890.»",
    options: ["was built", "built", "is built", "was build"],
    answer: "was built",
    explain: "Pasiva en pasado: was/were + participio (build → built).",
  },
];

export type PlacementResult = {
  /** Nivel por el que conviene empezar. */
  level: Cefr;
  /** Aciertos por nivel, para explicar el resultado. */
  byLevel: Record<string, { correct: number; total: number }>;
  correct: number;
  total: number;
};

/**
 * Coloca al usuario: se sube de nivel mientras se superen los ítems de ese
 * nivel (≥ PASS de 4). Se empieza en el primer nivel NO superado, porque es
 * donde queda algo que aprender.
 */
export function placementResult(answers: Record<string, string>): PlacementResult {
  const byLevel: Record<string, { correct: number; total: number }> = {};
  for (const item of PLACEMENT_ITEMS) {
    const bucket = (byLevel[item.level] ??= { correct: 0, total: 0 });
    bucket.total++;
    if (answers[item.id] === item.answer) bucket.correct++;
  }

  let level: Cefr = PLACEMENT_LEVELS[0];
  for (const [i, lvl] of PLACEMENT_LEVELS.entries()) {
    const b = byLevel[lvl];
    if (b && b.correct >= PASS) {
      // superado: se propone el siguiente (o este mismo si era el último)
      level = PLACEMENT_LEVELS[i + 1] ?? lvl;
    } else {
      level = lvl;
      break;
    }
  }

  const correct = Object.values(byLevel).reduce((a, b) => a + b.correct, 0);
  return { level, byLevel, correct, total: PLACEMENT_ITEMS.length };
}
