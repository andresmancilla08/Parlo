import type { Cefr } from "@/lib/curriculum/types";

// Test de nivel ADAPTATIVO: bloques de 5 ítems por nivel, de menos a más. Se
// sube de bloque mientras se aprueba; en cuanto un nivel falla, el test para.
// Así quien empieza de cero contesta 5 preguntas en vez de 15, y quien sabe
// llega hasta donde de verdad se le atraganta.
// No es un examen oficial: sirve para no obligar a empezar en A1 a quien ya
// sabe. La explicación sigue siendo SIEMPRE en español, como el resto de Parlo.

export type PlacementItem = {
  id: string;
  level: Cefr; // nivel que demuestra acertar este ítem
  prompt: string;
  options: string[];
  answer: string;
  explain: string;
  /** Frase completa y correcta en inglés, para poder escucharla al repasar. */
  full?: string;
};

/** Niveles por los que pasa el test, en orden. */
export const PLACEMENT_LEVELS: Cefr[] = ["A1", "A2", "B1", "B2", "C1"];

/** Ítems por nivel (un bloque). */
export const BLOCK = 5;

/** Aciertos necesarios (de 5) para dar un nivel por superado. */
export const PASS = 3;

/**
 * Respuesta «no lo sé». Cuenta como fallo, pero evita el ruido de adivinar:
 * acertar a ciegas coloca a alguien donde no le toca y arruina el arranque.
 */
export const DONT_KNOW = "__idk__";

export const PLACEMENT_ITEMS: PlacementItem[] = [
  // ---------------- A1 ----------------
  {
    id: "p-a1-1",
    level: "A1",
    prompt: "«___ name is Ana.»",
    options: ["My", "I", "Me", "Mine"],
    answer: "My",
    explain: "«My» es el posesivo (mi). «I» es el sujeto y «me» el objeto.",
    full: "My name is Ana.",
  },
  {
    id: "p-a1-2",
    level: "A1",
    prompt: "«She ___ a teacher.»",
    options: ["is", "are", "am", "be"],
    answer: "is",
    explain: "Con he/she/it el verbo «to be» es «is».",
    full: "She is a teacher.",
  },
  {
    id: "p-a1-3",
    level: "A1",
    prompt: "¿Cuál es el plural de «child»?",
    options: ["children", "childs", "childes", "child"],
    answer: "children",
    explain: "Plural irregular: child → children (igual que man → men).",
    full: "I have two children.",
  },
  {
    id: "p-a1-4",
    level: "A1",
    prompt: "«There ___ two books on the table.»",
    options: ["are", "is", "have", "has"],
    answer: "are",
    explain: "«There is» para singular y «there are» para plural.",
    full: "There are two books on the table.",
  },
  {
    id: "p-a1-5",
    level: "A1",
    prompt: "«I ___ from Spain.»",
    options: ["am", "is", "are", "be"],
    answer: "am",
    explain: "Con «I» el verbo «to be» es siempre «am»: I am, I'm.",
    full: "I am from Spain.",
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
    full: "Yesterday I went to the cinema.",
  },
  {
    id: "p-a2-2",
    level: "A2",
    prompt: "«This car is ___ than mine.»",
    options: ["faster", "more fast", "fastest", "fast"],
    answer: "faster",
    explain: "Adjetivo corto → comparativo con -er: fast → faster.",
    full: "This car is faster than mine.",
  },
  {
    id: "p-a2-3",
    level: "A2",
    prompt: "«I ___ never been to Japan.»",
    options: ["have", "has", "am", "did"],
    answer: "have",
    explain: "Presente perfecto: have/has + participio. Con «I» va «have».",
    full: "I have never been to Japan.",
  },
  {
    id: "p-a2-4",
    level: "A2",
    prompt: "«She doesn't ___ coffee.»",
    options: ["like", "likes", "liked", "liking"],
    answer: "like",
    explain: "Tras «doesn't» el verbo va en forma base: la -s ya está en «doesn't».",
    full: "She doesn't like coffee.",
  },
  {
    id: "p-a2-5",
    level: "A2",
    prompt: "«There isn't ___ milk in the fridge.»",
    options: ["any", "some", "a", "many"],
    answer: "any",
    explain:
      "En negativas e interrogativas se usa «any»; «some» va en afirmativas. Y «milk» es incontable, así que «many» no encaja.",
    full: "There isn't any milk in the fridge.",
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
    full: "If I had more time, I would travel.",
  },
  {
    id: "p-b1-2",
    level: "B1",
    prompt: "«I ___ TV when she called.»",
    options: ["was watching", "watched", "watch", "am watching"],
    answer: "was watching",
    explain:
      "La acción larga de fondo va en pasado continuo; la que interrumpe, en pasado simple.",
    full: "I was watching TV when she called.",
  },
  {
    id: "p-b1-3",
    level: "B1",
    prompt: "«She said she ___ come later.»",
    options: ["would", "will", "is going", "can"],
    answer: "would",
    explain: "En estilo indirecto «will» retrocede a «would».",
    full: "She said she would come later.",
  },
  {
    id: "p-b1-4",
    level: "B1",
    prompt: "«This bridge ___ in 1890.»",
    options: ["was built", "built", "is built", "was build"],
    answer: "was built",
    explain: "Pasiva en pasado: was/were + participio (build → built).",
    full: "This bridge was built in 1890.",
  },
  {
    id: "p-b1-5",
    level: "B1",
    prompt: "«I really enjoy ___ books.»",
    options: ["reading", "to read", "read", "readed"],
    answer: "reading",
    explain:
      "Enjoy, avoid, finish y mind piden -ing. Otros verbos (want, decide) piden «to».",
    full: "I really enjoy reading books.",
  },

  // ---------------- B2 ----------------
  {
    id: "p-b2-1",
    level: "B2",
    prompt: "«My brother, ___ lives in Paris, is a chef.»",
    options: ["who", "that", "which", "what"],
    answer: "who",
    explain:
      "En las oraciones entre comas (explicativas) nunca se usa «that»: sólo who para personas y which para cosas.",
    full: "My brother, who lives in Paris, is a chef.",
  },
  {
    id: "p-b2-2",
    level: "B2",
    prompt: "«I had my car ___ yesterday.» (lo llevé al taller)",
    options: ["repaired", "repair", "repairing", "to repair"],
    answer: "repaired",
    explain:
      "«Have + objeto + participio» = que otro lo haga por ti. «I repaired my car» sería que lo arreglaste tú.",
    full: "I had my car repaired yesterday.",
  },
  {
    id: "p-b2-3",
    level: "B2",
    prompt: "«He stopped ___ two years ago.» (lo dejó)",
    options: ["smoking", "to smoke", "smoke", "smoked"],
    answer: "smoking",
    explain:
      "«Stop + -ing» = dejar de hacerlo. «Stop to smoke» sería parar PARA fumar: cambia el significado entero.",
    full: "He stopped smoking two years ago.",
  },
  {
    id: "p-b2-4",
    level: "B2",
    prompt: "«It ___ that prices will rise.» (se espera)",
    options: ["is expected", "expects", "is expecting", "expected"],
    answer: "is expected",
    explain:
      "El «se» impersonal del español se dice con pasiva: it is said / it is expected / it is believed.",
    full: "It is expected that prices will rise.",
  },
  {
    id: "p-b2-5",
    level: "B2",
    prompt: "«She insisted ___ paying for dinner.»",
    options: ["on", "in", "to", "for"],
    answer: "on",
    explain:
      "«Insist ON», y tras preposición el verbo va en -ing: insist on paying. Nunca «insist to pay».",
    full: "She insisted on paying for dinner.",
  },

  // ---------------- C1 ----------------
  {
    id: "p-c1-1",
    level: "C1",
    prompt: "«Never before ___ such a mess.»",
    options: ["had I seen", "I had seen", "I saw", "did I saw"],
    answer: "had I seen",
    explain:
      "Con un negativo al principio, el auxiliar se adelanta al sujeto: never before HAD I seen.",
    full: "Never before had I seen such a mess.",
  },
  {
    id: "p-c1-2",
    level: "C1",
    prompt: "«No sooner had we left ___ it started to rain.»",
    options: ["than", "when", "that", "then"],
    answer: "than",
    explain: "«No sooner… THAN». Con «hardly» y «scarcely» sí se usa «when».",
    full: "No sooner had we left than it started to rain.",
  },
  {
    id: "p-c1-3",
    level: "C1",
    prompt: "«You ___ paid: it was already covered.»",
    options: ["needn't have", "mustn't have", "shouldn't", "couldn't have"],
    answer: "needn't have",
    explain:
      "«Needn't have + participio» = lo hiciste y no hacía falta. «Didn't need to» sería que ni lo hiciste.",
    full: "You needn't have paid: it was already covered.",
  },
  {
    id: "p-c1-4",
    level: "C1",
    prompt: "«___ the report, she went home.»",
    options: ["Having finished", "Have finished", "After finish", "Finished"],
    answer: "Having finished",
    explain:
      "Cláusula de participio: «having + participio» comprime «after she had finished».",
    full: "Having finished the report, she went home.",
  },
  {
    id: "p-c1-5",
    level: "C1",
    prompt: "«She's very ___ about criticism.» (le afecta)",
    options: ["sensitive", "sensible", "sensitivity", "sensate"],
    answer: "sensitive",
    explain:
      "Falso amigo: «sensitive» = sensible (emocional); «sensible» significa sensato.",
    full: "She's very sensitive about criticism.",
  },
];

/** Los 5 ítems de un nivel, en orden. */
export function itemsForLevel(level: Cefr): PlacementItem[] {
  return PLACEMENT_ITEMS.filter((i) => i.level === level);
}

/** Siguiente nivel del test, o `null` si ya era el último. */
export function nextLevel(level: Cefr): Cefr | null {
  const i = PLACEMENT_LEVELS.indexOf(level);
  return i < 0 ? null : PLACEMENT_LEVELS[i + 1] ?? null;
}

/** Resultado de UN bloque: aciertos y si se supera el nivel. */
export function blockResult(
  level: Cefr,
  answers: Record<string, string>,
): { correct: number; total: number; passed: boolean } {
  const items = itemsForLevel(level);
  const correct = items.filter((i) => answers[i.id] === i.answer).length;
  return { correct, total: items.length, passed: correct >= PASS };
}

export type PlacementResult = {
  /** Nivel por el que conviene empezar. */
  level: Cefr;
  /** Aciertos por nivel intentado, para explicar el resultado. */
  byLevel: Record<string, { correct: number; total: number }>;
  correct: number;
  total: number;
  /** Ítems fallados (o marcados «no lo sé»): son el repaso recomendado. */
  missed: PlacementItem[];
};

/**
 * Coloca al usuario: se sube de nivel mientras se superen los bloques
 * (≥ PASS de BLOCK). Se empieza en el primer nivel NO superado, porque es
 * donde queda algo que aprender. Los niveles que no se llegaron a hacer (el
 * test paró antes) no cuentan.
 */
export function placementResult(answers: Record<string, string>): PlacementResult {
  const byLevel: Record<string, { correct: number; total: number }> = {};
  let level: Cefr = PLACEMENT_LEVELS[0];

  for (const [i, lvl] of PLACEMENT_LEVELS.entries()) {
    const items = itemsForLevel(lvl);
    const attempted = items.some((it) => it.id in answers);
    if (!attempted) break; // el test paró aquí: lo de arriba ni se preguntó

    const r = blockResult(lvl, answers);
    byLevel[lvl] = { correct: r.correct, total: r.total };
    if (r.passed) {
      // superado: se propone el siguiente (o este mismo si era el último)
      level = PLACEMENT_LEVELS[i + 1] ?? lvl;
    } else {
      level = lvl;
      break;
    }
  }

  const answered = PLACEMENT_ITEMS.filter((i) => i.id in answers);
  const missed = answered.filter((i) => answers[i.id] !== i.answer);
  return {
    level,
    byLevel,
    correct: answered.length - missed.length,
    total: answered.length,
    missed,
  };
}
