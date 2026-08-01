// Verbos regulares: dos cosas que nadie explica juntas y que van juntas.
// 1) Cómo se ESCRIBE el pasado (-ed) sin fallar en las excepciones.
// 2) Cómo se PRONUNCIA ese -ed, que tiene tres sonidos y ninguno es «ed».
// El contenido es bilingüe por naturaleza, así que vive aquí como datos.

export type SpellingRule = {
  id: string;
  titleEs: string;
  titleEn: string;
  ruleEs: string;
  examples: { base: string; past: string }[];
};

export const SPELLING_RULES: SpellingRule[] = [
  {
    id: "plain",
    titleEs: "Lo normal: + ed",
    titleEn: "The default: add -ed",
    ruleEs: "La inmensa mayoría de los verbos solo añaden -ed, sin tocar nada más.",
    examples: [
      { base: "work", past: "worked" },
      { base: "watch", past: "watched" },
      { base: "listen", past: "listened" },
      { base: "open", past: "opened" },
    ],
  },
  {
    id: "silent-e",
    titleEs: "Ya acaba en -e: solo + d",
    titleEn: "Already ends in -e: add -d",
    ruleEs: "Si el verbo acaba en -e, la -e ya está puesta: basta con añadir la -d.",
    examples: [
      { base: "like", past: "liked" },
      { base: "live", past: "lived" },
      { base: "close", past: "closed" },
      { base: "decide", past: "decided" },
    ],
  },
  {
    id: "y",
    titleEs: "Consonante + y → ied",
    titleEn: "Consonant + y → -ied",
    ruleEs:
      "La -y se convierte en -ied SOLO si delante hay consonante. Si delante hay vocal, no se toca: play → played.",
    examples: [
      { base: "study", past: "studied" },
      { base: "try", past: "tried" },
      { base: "carry", past: "carried" },
      { base: "play", past: "played" },
    ],
  },
  {
    id: "double",
    titleEs: "Se dobla la consonante final",
    titleEn: "Double the final consonant",
    ruleEs:
      "En verbos de una sílaba que acaban en consonante-vocal-consonante, la última consonante se dobla. Nunca con w, x ni y.",
    examples: [
      { base: "stop", past: "stopped" },
      { base: "plan", past: "planned" },
      { base: "travel", past: "travelled" },
      { base: "fix", past: "fixed" },
    ],
  },
  {
    id: "stress",
    titleEs: "Varias sílabas: manda el acento",
    titleEn: "Longer verbs: stress decides",
    ruleEs:
      "Con más de una sílaba solo se dobla si el acento cae en la última: preFER → preferred, pero VIsit → visited.",
    examples: [
      { base: "prefer", past: "preferred" },
      { base: "permit", past: "permitted" },
      { base: "visit", past: "visited" },
      { base: "happen", past: "happened" },
    ],
  },
];

export type EdSound = {
  id: string;
  /** El sonido, tal cual se oye. */
  sound: string;
  ruleEs: string;
  /** Cuándo se aplica, para poder decidir en un segundo. */
  afterEs: string;
  examples: { word: string; hint: string }[];
};

export const ED_SOUNDS: EdSound[] = [
  {
    id: "id",
    sound: "/ɪd/",
    ruleEs: "Se oye una sílaba nueva: wan-ted. Es el único caso en el que el verbo se alarga.",
    afterEs: "Detrás de los sonidos /t/ y /d/",
    examples: [
      { word: "wanted", hint: "WAN-tid" },
      { word: "needed", hint: "NEE-did" },
      { word: "started", hint: "STAR-tid" },
      { word: "decided", hint: "di-SAI-did" },
    ],
  },
  {
    id: "t",
    sound: "/t/",
    ruleEs: "No añade sílaba: suena una «t» seca pegada al final.",
    afterEs: "Detrás de sonido sordo: p, k, f, s, sh, ch",
    examples: [
      { word: "worked", hint: "workt" },
      { word: "stopped", hint: "stopt" },
      { word: "watched", hint: "wocht" },
      { word: "finished", hint: "finisht" },
    ],
  },
  {
    id: "d",
    sound: "/d/",
    ruleEs: "Tampoco añade sílaba: suena una «d» suave.",
    afterEs: "Detrás de sonido sonoro: vocales, b, g, l, m, n, r, v, z",
    examples: [
      { word: "played", hint: "playd" },
      { word: "opened", hint: "opend" },
      { word: "lived", hint: "livd" },
      { word: "called", hint: "cauld" },
    ],
  },
];

/** Los regulares más usados, para practicar la regla con verbos reales. */
export const COMMON_REGULARS: { base: string; es: string }[] = [
  { base: "work", es: "trabajar" },
  { base: "want", es: "querer" },
  { base: "need", es: "necesitar" },
  { base: "like", es: "gustar" },
  { base: "live", es: "vivir" },
  { base: "play", es: "jugar / tocar" },
  { base: "study", es: "estudiar" },
  { base: "watch", es: "ver (la tele)" },
  { base: "listen", es: "escuchar" },
  { base: "talk", es: "hablar" },
  { base: "ask", es: "preguntar" },
  { base: "answer", es: "responder" },
  { base: "help", es: "ayudar" },
  { base: "try", es: "intentar" },
  { base: "start", es: "empezar" },
  { base: "finish", es: "terminar" },
  { base: "open", es: "abrir" },
  { base: "close", es: "cerrar" },
  { base: "decide", es: "decidir" },
  { base: "travel", es: "viajar" },
  { base: "stop", es: "parar" },
  { base: "plan", es: "planear" },
  { base: "call", es: "llamar" },
  { base: "use", es: "usar" },
  { base: "change", es: "cambiar" },
  { base: "happen", es: "ocurrir" },
  { base: "prefer", es: "preferir" },
  { base: "carry", es: "llevar" },
  { base: "clean", es: "limpiar" },
  { base: "cook", es: "cocinar" },
];
