import type { Unit } from "../types";

// Nivel B1. Explicaciones SIEMPRE en español: es el diferenciador.
export const b1: Unit[] = [
  {
    id: "b1-conditionals",
    level: "B1",
    titleEs: "Condicionales",
    titleEn: "Conditionals",
    lessons: [
      {
        id: "b1-conditionals-1",
        titleEs: "Si pasa esto (condicional real)",
        titleEn: "Real conditions",
        vocab: [
          { en: "if it rains", es: "si llueve" },
          { en: "unless", es: "a menos que" },
          { en: "as soon as", es: "en cuanto" },
          { en: "it depends on", es: "depende de" },
          { en: "you will pass", es: "aprobarás" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«If it ___, we'll stay home.» (rain)",
            options: ["rains", "will rain", "rained", "raining"],
            answer: "rains",
            explain:
              "Tras «if» va PRESENTE, aunque hablemos del futuro. «If it will rain» no existe en inglés.",
            speak: "if it rains, we'll stay home",
          },
          {
            kind: "choose",
            prompt: "«I'll call you if I ___ time.»",
            options: ["have", "will have", "had", "having"],
            answer: "have",
            explain:
              "El «will» va en la otra mitad de la frase (I'll call), nunca en la parte del «if».",
            speak: "I'll call you if I have time",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Si estudias, aprobarás»",
            answer: "If you study you will pass",
            bank: ["If", "you", "study", "you", "will", "pass", "studies", "would"],
            explain:
              "Primer condicional: if + presente, después will + verbo base. Es la estructura más útil del inglés.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «a menos que» (una palabra)",
            answer: ["unless"],
            explain:
              "«Unless» = if… not. «Unless you hurry» = si no te das prisa. Ya es negativo: no añadas «don't».",
          },
          {
            kind: "choose",
            prompt: "«Unless you hurry, we'll be late» significa:",
            options: [
              "si no te das prisa",
              "aunque te des prisa",
              "cuando te des prisa",
              "porque te das prisa",
            ],
            answer: "si no te das prisa",
            explain:
              "«Unless» lleva la negación dentro. Escribir «unless you don't hurry» diría lo contrario.",
            speak: "unless you hurry, we'll be late",
          },
        ],
      },
      {
        id: "b1-conditionals-2",
        titleEs: "Would: lo hipotético",
        titleEn: "Would: hypotheticals",
        vocab: [
          { en: "if I were you", es: "si yo fuera tú" },
          { en: "I would travel", es: "viajaría" },
          { en: "I'd buy", es: "compraría" },
          { en: "it would be", es: "sería" },
          { en: "imagine", es: "imagina" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«If I ___ rich, I would travel the world.»",
            options: ["were", "am", "will be", "would be"],
            answer: "were",
            explain:
              "Segundo condicional (imaginario): if + pasado, would + base. Con «to be» se usa «were» para todas las personas: if I were, if he were.",
            speak: "if I were rich, I would travel the world",
          },
          {
            kind: "choose",
            prompt: "«If I had time, I ___ help you.»",
            options: ["would", "will", "do", "would have"],
            answer: "would",
            explain:
              "El pasado en el «if» no habla del pasado: marca que es imaginario. La otra mitad va con would.",
            speak: "if I had time, I would help you",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Si yo fuera tú, no lo haría»",
            answer: "If I were you I wouldn't do it",
            bank: [
              "If",
              "I",
              "were",
              "you",
              "I",
              "wouldn't",
              "do",
              "it",
              "was",
              "don't",
            ],
            explain:
              "«If I were you…» es la fórmula fija para dar consejos. Nunca «if I was you» en inglés cuidado.",
          },
          {
            kind: "type",
            prompt: "Completa: «I ___ (go) if I could» (2 palabras)",
            answer: ["would go", "'d go"],
            explain:
              "Would + verbo base. En conversación se contrae: I'd go, she'd go.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está mal?",
            options: [
              "If I would have money, I'd travel",
              "If I had money, I'd travel",
              "If I were you, I'd wait",
              "If she knew, she'd tell us",
            ],
            answer: "If I would have money, I'd travel",
            explain:
              "Después de «if» NUNCA va «would». Es el error estrella del B1: if I HAD money.",
          },
        ],
      },
      {
        id: "b1-conditionals-3",
        titleEs: "Lo que pudo haber sido",
        titleEn: "Regrets & the third conditional",
        vocab: [
          { en: "if I had known", es: "si lo hubiera sabido" },
          { en: "I would have called", es: "habría llamado" },
          { en: "I should have studied", es: "debería haber estudiado" },
          { en: "I wish", es: "ojalá" },
          { en: "to regret", es: "arrepentirse" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«If I ___ known, I would have called you.»",
            options: ["had", "have", "would", "did"],
            answer: "had",
            explain:
              "Tercer condicional (pasado imposible): if + had + participio, would have + participio.",
            speak: "if I had known, I would have called you",
          },
          {
            kind: "choose",
            prompt: "«I ___ studied more.» (me arrepiento)",
            options: ["should have", "should", "would", "must have"],
            answer: "should have",
            explain:
              "«Should have + participio» = debería haber…. En conversación suena «shoulda».",
            speak: "I should have studied more",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Si lo hubiera sabido, te habría llamado»",
            answer: "If I had known I would have called you",
            bank: [
              "If",
              "I",
              "had",
              "known",
              "I",
              "would",
              "have",
              "called",
              "you",
              "knew",
            ],
            explain:
              "Las dos mitades llevan participio: had KNOWN / would have CALLED.",
          },
          {
            kind: "type",
            prompt: "Completa: «I ___ I could fly» (ojalá)",
            answer: ["wish"],
            explain:
              "«I wish» + pasado para deseos imposibles del presente: I wish I could, I wish I had.",
          },
          {
            kind: "choose",
            prompt: "«I wish I ___ more time.»",
            options: ["had", "have", "would have", "has"],
            answer: "had",
            explain:
              "Tras «I wish» se retrocede un tiempo: presente → pasado. I wish I had (ahora no lo tengo).",
            speak: "I wish I had more time",
          },
        ],
      },
    ],
  },
  {
    id: "b1-stories",
    level: "B1",
    titleEs: "Contar historias",
    titleEn: "Telling stories",
    lessons: [
      {
        id: "b1-stories-1",
        titleEs: "Estaba haciendo…",
        titleEn: "Past continuous",
        vocab: [
          { en: "I was working", es: "estaba trabajando" },
          { en: "while", es: "mientras" },
          { en: "when", es: "cuando" },
          { en: "suddenly", es: "de repente" },
          { en: "it happened", es: "pasó / ocurrió" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ TV when she called.»",
            options: ["was watching", "watched", "am watching", "watch"],
            answer: "was watching",
            explain:
              "La acción larga de fondo va en pasado continuo (was watching); la corta que la interrumpe, en pasado simple (called).",
            speak: "I was watching TV when she called",
          },
          {
            kind: "choose",
            prompt: "«While I ___, the phone rang.»",
            options: ["was cooking", "cooked", "cook", "am cooking"],
            answer: "was cooking",
            explain:
              "«While» pide casi siempre pasado continuo; «when», pasado simple.",
            speak: "while I was cooking, the phone rang",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Estaba lloviendo cuando salí»",
            answer: "It was raining when I left",
            bank: ["It", "was", "raining", "when", "I", "left", "rained", "leave"],
            explain:
              "El decorado de la escena va en continuo (was raining) y el hecho puntual en simple (left).",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «de repente»",
            answer: ["suddenly"],
            explain:
              "«Suddenly» abre la frase en las historias: Suddenly, the lights went out.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál cuenta bien la escena?",
            options: [
              "I was walking home when I saw him",
              "I walked home when I was seeing him",
              "I was walking home when I was seeing him",
              "I walk home when I saw him",
            ],
            answer: "I was walking home when I saw him",
            explain:
              "Y ojo: «see», «know» o «like» casi nunca van en continuo (son verbos de estado).",
          },
        ],
      },
      {
        id: "b1-stories-2",
        titleEs: "Ya había pasado antes",
        titleEn: "Past perfect",
        vocab: [
          { en: "had already left", es: "ya se había ido" },
          { en: "by the time", es: "cuando (ya)" },
          { en: "before", es: "antes de" },
          { en: "after", es: "después de" },
          { en: "it was too late", es: "era demasiado tarde" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«When I arrived, the train ___.»",
            options: [
              "had already left",
              "has already left",
              "already left",
              "was leaving",
            ],
            answer: "had already left",
            explain:
              "Past perfect (had + participio) = el pasado ANTERIOR a otro pasado. Primero se fue el tren, luego llegué yo.",
            speak: "when I arrived, the train had already left",
          },
          {
            kind: "choose",
            prompt: "«___ the time we got there, the film had started.»",
            options: ["By", "At", "In", "On"],
            answer: "By",
            explain:
              "«By the time» = cuando (ya). Va siempre con past perfect en la otra mitad.",
            speak: "by the time we got there, the film had started",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Nunca había visto algo así»",
            answer: "I had never seen anything like that",
            bank: [
              "I",
              "had",
              "never",
              "seen",
              "anything",
              "like",
              "that",
              "have",
              "thing",
            ],
            explain:
              "«Anything» en negativas (never ya niega); «something» sería en afirmativas.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «demasiado tarde» (2 palabras)",
            answer: ["too late"],
            explain:
              "«Too» = demasiado (negativo). «Very late» solo dice muy tarde, sin queja.",
          },
          {
            kind: "choose",
            prompt: "En «When we arrived, she had cooked dinner», ¿qué pasó primero?",
            options: ["cocinar", "llegar", "las dos a la vez", "no se sabe"],
            answer: "cocinar",
            explain:
              "El past perfect marca lo más antiguo: ella ya había cocinado cuando nosotros llegamos.",
          },
        ],
      },
      {
        id: "b1-stories-3",
        titleEs: "Antes solía…",
        titleEn: "Used to",
        vocab: [
          { en: "I used to play", es: "antes jugaba" },
          { en: "I didn't use to", es: "antes no" },
          { en: "not anymore", es: "ya no" },
          { en: "back then", es: "en aquella época" },
          { en: "I'm used to it", es: "estoy acostumbrado" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ play football every Saturday.» (antes sí, ya no)",
            options: ["used to", "use to", "am used to", "was used to"],
            answer: "used to",
            explain:
              "«Used to + verbo base» = hábito pasado que ya terminó. Solo existe en pasado (no hay «I use to» en presente).",
            speak: "I used to play football every Saturday",
          },
          {
            kind: "choose",
            prompt: "Negativo: «I ___ like coffee.»",
            options: [
              "didn't use to",
              "didn't used to",
              "don't used to",
              "wasn't used to",
            ],
            answer: "didn't use to",
            explain:
              "Con «didn't», «used» pierde la -d: didn't USE to. Igual que didn't work, didn't go.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Antes vivía en Madrid»",
            answer: "I used to live in Madrid",
            bank: ["I", "used", "to", "live", "in", "Madrid", "lived", "at"],
            explain:
              "«Used to live» deja claro que ya no vives ahí; «I lived in Madrid» solo dice cuándo.",
          },
          {
            kind: "type",
            prompt: "Completa: «I don't smoke ___» (ya no)",
            answer: ["anymore", "any more"],
            explain:
              "«Anymore» va al final y solo en negativas. En afirmativas se usa «still» (I still smoke).",
          },
          {
            kind: "choose",
            prompt: "«I'm used to waking up early» significa:",
            options: [
              "estoy acostumbrado a madrugar",
              "antes madrugaba",
              "voy a madrugar",
              "solía madrugar",
            ],
            answer: "estoy acostumbrado a madrugar",
            explain:
              "Cuidado con el par: «used to + base» = antes hacía; «BE used to + -ing» = estar acostumbrado.",
            speak: "I'm used to waking up early",
          },
        ],
      },
    ],
  },
  {
    id: "b1-modals",
    level: "B1",
    titleEs: "Obligación, consejo y probabilidad",
    titleEn: "Modals",
    lessons: [
      {
        id: "b1-modals-1",
        titleEs: "Tener que / no hace falta",
        titleEn: "Must & have to",
        vocab: [
          { en: "you mustn't", es: "no debes (prohibido)" },
          { en: "I have to", es: "tengo que" },
          { en: "I don't have to", es: "no hace falta que" },
          { en: "I had to", es: "tuve que" },
          { en: "be allowed to", es: "estar permitido" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«You ___ smoke here.» (está prohibido)",
            options: ["mustn't", "don't have to", "haven't to", "not must"],
            answer: "mustn't",
            explain:
              "«Mustn't» = prohibición. Es la forma de los carteles y las normas.",
            speak: "you mustn't smoke here",
          },
          {
            kind: "choose",
            prompt: "«It's Sunday, I ___ work.» (no es necesario)",
            options: ["don't have to", "mustn't", "can't", "shouldn't"],
            answer: "don't have to",
            explain:
              "Este par se confunde siempre: mustn't = prohibido; don't have to = eres libre de no hacerlo.",
            speak: "it's Sunday, I don't have to work",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Tengo que trabajar mañana»",
            answer: "I have to work tomorrow",
            bank: ["I", "have", "to", "work", "tomorrow", "must", "the"],
            explain:
              "«Have to» para obligaciones de la vida real (externas); «must» suena más a norma escrita.",
          },
          {
            kind: "type",
            prompt: "Pasado de la obligación (2 palabras): «Yesterday I ___ work»",
            answer: ["had to"],
            explain:
              "«Must» no tiene pasado: se usa «had to». Yesterday I had to work.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "You must go",
              "You must to go",
              "You have go",
              "You must going",
            ],
            answer: "You must go",
            explain:
              "Los modales (must, can, should, might) van con verbo base y SIN «to». Solo «have to» lleva «to».",
          },
        ],
      },
      {
        id: "b1-modals-2",
        titleEs: "Consejos y sugerencias",
        titleEn: "Advice & suggestions",
        vocab: [
          { en: "you should", es: "deberías" },
          { en: "you'd better", es: "más te vale" },
          { en: "Why don't you…?", es: "¿por qué no…?" },
          { en: "I'd rather", es: "prefiero" },
          { en: "How about…?", es: "¿qué tal si…?" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«You ___ see a doctor.»",
            options: ["should", "should to", "shoulds", "must to"],
            answer: "should",
            explain:
              "«Should» + verbo base, sin «to» y sin -s: he should, she should.",
            speak: "you should see a doctor",
          },
          {
            kind: "choose",
            prompt: "«___ don't you take a break?»",
            options: ["Why", "How", "What", "Where"],
            answer: "Why",
            explain:
              "«Why don't you…?» es una sugerencia amable, no un reproche. Alternativa: «How about taking a break?».",
            speak: "why don't you take a break?",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Deberías descansar más»",
            answer: "You should rest more",
            bank: ["You", "should", "rest", "more", "must", "to"],
            explain: "Consejo suave → should. «Must» sonaría a orden.",
          },
          {
            kind: "type",
            prompt: "Completa: «I'd ___ stay home» (prefiero)",
            answer: ["rather"],
            explain:
              "«I'd rather + base» = preferiría. Para comparar: I'd rather stay home than go out.",
          },
          {
            kind: "choose",
            prompt: "«You'd better hurry» suena a:",
            options: [
              "advertencia fuerte",
              "sugerencia suave",
              "obligación legal",
              "permiso",
            ],
            answer: "advertencia fuerte",
            explain:
              "«Had better» avisa de una consecuencia mala si no lo haces. Más fuerte que «should».",
            speak: "you'd better hurry",
          },
        ],
      },
      {
        id: "b1-modals-3",
        titleEs: "Puede que… (probabilidad)",
        titleEn: "Might, must & can't",
        vocab: [
          { en: "she might be", es: "puede que esté" },
          { en: "it may rain", es: "puede que llueva" },
          { en: "he must be", es: "debe de estar" },
          { en: "that can't be", es: "eso no puede ser" },
          { en: "probably", es: "probablemente" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«She ___ be at work, I'm not sure.»",
            options: ["might", "must", "can't", "will"],
            answer: "might",
            explain:
              "«Might / may» = puede que (50%). No confundir con «must» (deducción casi segura).",
            speak: "she might be at work",
          },
          {
            kind: "choose",
            prompt: "«His light is on, he ___ be home.» (casi seguro)",
            options: ["must", "might not", "can't", "should"],
            answer: "must",
            explain:
              "«Must» también sirve para deducir: debe de estar. Lo imposible es «can't be».",
            speak: "his light is on, he must be home",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Puede que llueva más tarde»",
            answer: "It might rain later",
            bank: ["It", "might", "rain", "later", "must", "to"],
            explain:
              "Might + verbo base, sin «to». Y hace falta el sujeto «it» para el clima.",
          },
          {
            kind: "type",
            prompt: "Completa: «That ___ true!» (eso no puede ser, 2 palabras)",
            answer: ["can't be"],
            explain:
              "Para deducciones imposibles se usa «can't be», no «mustn't be».",
          },
          {
            kind: "choose",
            prompt: "¿Cuál expresa duda?",
            options: [
              "He may be late",
              "He must be late",
              "He is late",
              "He can't be late",
            ],
            answer: "He may be late",
            explain:
              "«May/might» = duda. «Must» = deducción segura. «Can't» = imposible.",
          },
        ],
      },
    ],
  },
  {
    id: "b1-opinions",
    level: "B1",
    titleEs: "Opiniones y conversación",
    titleEn: "Opinions & conversation",
    lessons: [
      {
        id: "b1-opinions-1",
        titleEs: "Dar tu opinión",
        titleEn: "Giving your opinion",
        vocab: [
          { en: "in my opinion", es: "en mi opinión" },
          { en: "to be honest", es: "para ser sincero" },
          { en: "it seems to me", es: "me parece" },
          { en: "you're right", es: "tienes razón" },
          { en: "I reckon", es: "yo diría" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ my opinion, it's too expensive.»",
            options: ["In", "On", "At", "For"],
            answer: "In",
            explain:
              "«In my opinion» es fijo. «Under my point of view» (calco del español) no existe.",
            speak: "in my opinion, it's too expensive",
          },
          {
            kind: "choose",
            prompt: "¿Cuál suena natural para suavizar una opinión?",
            options: [
              "To be honest, I don't like it",
              "I say the truth, I no like it",
              "For be honest, I don't like it",
              "In honest, I don't like it",
            ],
            answer: "To be honest, I don't like it",
            explain:
              "«To be honest» (o «honestly») avisa de que viene una opinión sincera pero no agresiva.",
            speak: "to be honest, I don't like it",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Creo que tienes razón»",
            answer: "I think you're right",
            bank: ["I", "think", "you're", "right", "have", "reason"],
            explain:
              "«Tener razón» = BE right, no «have reason». Es uno de los calcos más delatores.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «en mi opinión» (3 palabras)",
            answer: ["in my opinion"],
            explain: "Fórmula fija: in + my + opinion.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es un error típico de hispanohablantes?",
            options: [
              "You have reason",
              "You're right",
              "I agree with you",
              "I think so",
            ],
            answer: "You have reason",
            explain:
              "Traducción literal de «tienes razón». Lo correcto: you're right / that's true.",
          },
        ],
      },
      {
        id: "b1-opinions-2",
        titleEs: "Estar de acuerdo (o no)",
        titleEn: "Agreeing & disagreeing",
        vocab: [
          { en: "I agree with you", es: "estoy de acuerdo contigo" },
          { en: "I disagree", es: "no estoy de acuerdo" },
          { en: "So do I", es: "yo también" },
          { en: "Neither do I", es: "yo tampoco" },
          { en: "it depends", es: "depende" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I agree ___ you.»",
            options: ["with", "to", "in", "on"],
            answer: "with",
            explain:
              "Agree WITH una persona; agree ON un tema o decisión (we agreed on the price).",
            speak: "I agree with you",
          },
          {
            kind: "choose",
            prompt: "«I love jazz.» — «___ I.» (yo también)",
            options: ["So do", "Also", "Too", "Neither do"],
            answer: "So do",
            explain:
              "Para coincidir en afirmativo: So + auxiliar + sujeto (So do I, So am I, So did I).",
            speak: "so do I",
          },
          {
            kind: "bank",
            prompt: "Traduce: «No estoy de acuerdo contigo»",
            answer: "I disagree with you",
            bank: ["I", "disagree", "with", "you", "agree", "not", "to"],
            explain:
              "«Disagree» ya es negativo. También vale «I don't agree», pero nunca «I'm not agree».",
          },
          {
            kind: "type",
            prompt: "Responde a «I don't like it»: «yo tampoco» (3 palabras)",
            answer: ["neither do I", "me neither"],
            explain:
              "En negativo: Neither + auxiliar + sujeto. En habla informal: «Me neither».",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está mal?",
            options: [
              "I'm agree with you",
              "I agree with you",
              "I don't agree",
              "I totally agree",
            ],
            answer: "I'm agree with you",
            explain:
              "«Agree» es VERBO, no adjetivo: nunca lleva «be» delante. I agree, he agrees.",
          },
        ],
      },
      {
        id: "b1-opinions-3",
        titleEs: "Conectar ideas",
        titleEn: "Linking ideas",
        vocab: [
          { en: "however", es: "sin embargo" },
          { en: "although", es: "aunque" },
          { en: "despite", es: "a pesar de" },
          { en: "because of", es: "debido a" },
          { en: "on the other hand", es: "por otro lado" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ it was raining, we went out.»",
            options: ["Although", "Despite", "However", "Even"],
            answer: "Although",
            explain:
              "«Although» + frase completa (sujeto + verbo). «Despite» + sustantivo o -ing.",
            speak: "although it was raining, we went out",
          },
          {
            kind: "choose",
            prompt: "«___ the rain, we went out.»",
            options: ["Despite", "Although", "Even", "Because"],
            answer: "Despite",
            explain:
              "Aquí «the rain» es un sustantivo, así que toca «despite» (o «in spite of»).",
            speak: "despite the rain, we went out",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Estaba cansado, así que me fui a casa»",
            answer: "I was tired so I went home",
            bank: ["I", "was", "tired", "so", "I", "went", "home", "because", "to"],
            explain:
              "«So» introduce la consecuencia; «because» la causa. Y «go home» va sin «to».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «sin embargo» (una palabra)",
            answer: ["however"],
            explain:
              "«However» abre frase y va con coma: However, prices went up. No es lo mismo que «but» (une dentro de la frase).",
          },
          {
            kind: "choose",
            prompt: "«Because of» va seguido de:",
            options: [
              "un sustantivo",
              "una frase con verbo",
              "un adjetivo solo",
              "nada",
            ],
            answer: "un sustantivo",
            explain:
              "because + frase (because it rained) / because of + sustantivo (because of the rain).",
          },
        ],
      },
    ],
  },
  {
    id: "b1-work",
    level: "B1",
    titleEs: "Trabajo y estudios",
    titleEn: "Work & studies",
    lessons: [
      {
        id: "b1-work-1",
        titleEs: "Hablar de tu experiencia",
        titleEn: "Talking about experience",
        vocab: [
          { en: "I've been working", es: "llevo trabajando" },
          { en: "to apply for", es: "solicitar (un puesto)" },
          { en: "experience", es: "experiencia" },
          { en: "skills", es: "competencias" },
          { en: "a deadline", es: "una fecha límite" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ here for three years.» (y sigo)",
            options: ["have been working", "am working", "work", "worked"],
            answer: "have been working",
            explain:
              "Present perfect continuous: empezó en el pasado y CONTINÚA. El español dice «llevo trabajando».",
            speak: "I have been working here for three years",
          },
          {
            kind: "choose",
            prompt: "«I want to ___ for this job.»",
            options: ["apply", "postulate", "present", "ask"],
            answer: "apply",
            explain:
              "«Apply for a job» = presentar tu candidatura. «Postulate» no significa eso en inglés.",
            speak: "I want to apply for this job",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Llevo dos años estudiando inglés»",
            answer: "I've been studying English for two years",
            bank: [
              "I've",
              "been",
              "studying",
              "English",
              "for",
              "two",
              "years",
              "since",
              "study",
            ],
            explain:
              "have been + -ing, y «for» porque son dos años de duración (no un punto de inicio).",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «fecha límite» (una palabra)",
            answer: ["deadline", "a deadline"],
            explain:
              "«Deadline» es una sola palabra. «Meet a deadline» = cumplir el plazo.",
          },
          {
            kind: "choose",
            prompt: "«What do you do?» pregunta:",
            options: [
              "tu profesión",
              "qué haces ahora mismo",
              "tus planes",
              "tu hobby",
            ],
            answer: "tu profesión",
            explain:
              "«What do you do?» = ¿a qué te dedicas? Para lo de ahora sería «What are you doing?».",
            speak: "what do you do?",
          },
        ],
      },
      {
        id: "b1-work-2",
        titleEs: "En la entrevista",
        titleEn: "In the interview",
        vocab: [
          { en: "my strengths", es: "mis puntos fuertes" },
          { en: "weaknesses", es: "puntos débiles" },
          { en: "a team player", es: "alguien que trabaja en equipo" },
          { en: "a challenge", es: "un reto" },
          { en: "salary expectations", es: "expectativas salariales" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«My greatest ___ is that I'm organised.»",
            options: ["strength", "strong", "force", "power"],
            answer: "strength",
            explain:
              "«Strength» es el sustantivo de «strong». Plural: strengths (con -ths, difícil de pronunciar pero así es).",
            speak: "my greatest strength is that I'm organised",
          },
          {
            kind: "choose",
            prompt: "«I work well ___ a team.»",
            options: ["in", "on", "with", "at"],
            answer: "in",
            explain:
              "«In a team» (dentro del equipo). «On a project» y «with people» usan otras preposiciones.",
            speak: "I work well in a team",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Estoy buscando un nuevo reto»",
            answer: "I'm looking for a new challenge",
            bank: ["I'm", "looking", "for", "a", "new", "challenge", "to", "search"],
            explain:
              "«Look FOR» = buscar. «Search» suena a registrar/rastrear, no a buscar trabajo.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «puntos débiles» (una palabra, plural)",
            answer: ["weaknesses"],
            explain: "weak → weakness → weaknesses. Doble -ss antes de -es.",
          },
          {
            kind: "choose",
            prompt: "¿Qué respuesta suena profesional al explicar por qué te vas?",
            options: [
              "I'm looking for new opportunities",
              "My boss is horrible",
              "I only want more money",
              "I'm bored",
            ],
            answer: "I'm looking for new opportunities",
            explain:
              "En inglés profesional se habla en positivo de lo que buscas, no en negativo de lo que dejas.",
            speak: "I'm looking for new opportunities",
          },
        ],
      },
      {
        id: "b1-work-3",
        titleEs: "Phrasal verbs del trabajo",
        titleEn: "Work phrasal verbs",
        vocab: [
          { en: "come up with", es: "idear / ocurrírsele" },
          { en: "put off", es: "aplazar" },
          { en: "hand in", es: "entregar" },
          { en: "carry out", es: "llevar a cabo" },
          { en: "take on", es: "asumir / contratar" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«We need to ___ a new plan.» (idear)",
            options: ["come up with", "come with", "think up on", "bring up"],
            answer: "come up with",
            explain:
              "«Come up with» lleva DOS partículas y no se separan: come up with an idea.",
            speak: "we need to come up with a new plan",
          },
          {
            kind: "choose",
            prompt: "«They decided to ___ the meeting until Friday.» (aplazar)",
            options: ["put off", "put on", "put up", "put out"],
            answer: "put off",
            explain:
              "put off = aplazar; put on = ponerse (ropa); put up with = soportar; put out = apagar.",
            speak: "they decided to put off the meeting",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Tengo que entregar el informe mañana»",
            answer: "I have to hand in the report tomorrow",
            bank: [
              "I",
              "have",
              "to",
              "hand",
              "in",
              "the",
              "report",
              "tomorrow",
              "on",
            ],
            explain:
              "«Hand in» = entregar un trabajo. También «hand it in» (el pronombre va en medio).",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «llevar a cabo» (2 palabras)",
            answer: ["carry out"],
            explain:
              "«Carry out a study / a plan». Suena más formal que «do» y queda bien en el trabajo.",
          },
          {
            kind: "choose",
            prompt: "«We're taking on ten new people.» Aquí «take on» es:",
            options: ["contratar", "quitar", "llevar", "encender"],
            answer: "contratar",
            explain:
              "«Take on» = contratar personal o asumir una tarea (take on more work).",
            speak: "we're taking on ten new people",
          },
        ],
      },
    ],
  },
  {
    id: "b1-reported",
    level: "B1",
    titleEs: "Contar lo que dijeron",
    titleEn: "Reported speech & passive",
    lessons: [
      {
        id: "b1-reported-1",
        titleEs: "Dijo que…",
        titleEn: "Reported speech",
        vocab: [
          { en: "he said that", es: "dijo que" },
          { en: "she told me", es: "me dijo" },
          { en: "he would come", es: "vendría" },
          { en: "the next day", es: "al día siguiente" },
          { en: "to explain", es: "explicar" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I'm tired» → «He said he ___ tired.»",
            options: ["was", "is", "were", "has been"],
            answer: "was",
            explain:
              "Al reportar, el tiempo retrocede un paso: am/is → was, will → would, have → had.",
            speak: "he said he was tired",
          },
          {
            kind: "choose",
            prompt: "«She ___ me she was late.»",
            options: ["told", "said", "says", "said to"],
            answer: "told",
            explain:
              "TELL lleva persona detrás (tell me, tell him). SAY no (say that…). Es el par que más se falla.",
            speak: "she told me she was late",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Dijo que vendría más tarde»",
            answer: "He said he would come later",
            bank: ["He", "said", "he", "would", "come", "later", "will", "that"],
            explain:
              "«Will» pasa a «would» en estilo indirecto. El «that» es opcional en inglés hablado.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «me dijo» (2 palabras, pasado)",
            answer: ["told me", "she told me", "he told me"],
            explain: "tell → told. «Said me» está mal: sería «said to me».",
          },
          {
            kind: "choose",
            prompt: "«I'll call you tomorrow» → «He said he would call me ___.»",
            options: ["the next day", "tomorrow", "yesterday", "today"],
            answer: "the next day",
            explain:
              "Los marcadores de tiempo también se mueven: tomorrow → the next day, today → that day, yesterday → the day before.",
          },
        ],
      },
      {
        id: "b1-reported-2",
        titleEs: "Preguntas reportadas",
        titleEn: "Reported questions",
        vocab: [
          { en: "he asked if", es: "preguntó si" },
          { en: "she wanted to know", es: "quería saber" },
          { en: "whether", es: "si (formal)" },
          { en: "where I lived", es: "dónde vivía" },
          { en: "what time it was", es: "qué hora era" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Do you live here?» → «He asked ___ I lived there.»",
            options: ["if", "that", "do", "what"],
            answer: "if",
            explain:
              "Las preguntas de sí/no se reportan con «if» (o «whether»).",
            speak: "he asked if I lived there",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "She asked where I lived",
              "She asked where did I live",
              "She asked where do I live",
              "She asked me where lived I",
            ],
            answer: "She asked where I lived",
            explain:
              "En la pregunta reportada desaparecen «do/did» y el orden vuelve a sujeto + verbo.",
            speak: "she asked where I lived",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Me preguntó qué hora era»",
            answer: "He asked me what time it was",
            bank: ["He", "asked", "me", "what", "time", "it", "was", "is", "if"],
            explain:
              "Sin inversión: «what time IT WAS», no «what time was it» (eso es pregunta directa).",
          },
          {
            kind: "type",
            prompt: "Sinónimo más formal de «if» en preguntas reportadas:",
            answer: ["whether"],
            explain:
              "«Whether» es obligatorio antes de «or not»: whether or not she comes.",
          },
          {
            kind: "choose",
            prompt: "«She asked me if I ___ help her.»",
            options: ["could", "can", "will", "do"],
            answer: "could",
            explain: "Al reportar, «can» retrocede a «could».",
            speak: "she asked me if I could help her",
          },
        ],
      },
      {
        id: "b1-reported-3",
        titleEs: "La pasiva",
        titleEn: "The passive",
        vocab: [
          { en: "English is spoken", es: "se habla inglés" },
          { en: "it was built", es: "fue construido" },
          { en: "it was made in", es: "fue fabricado en" },
          { en: "by", es: "por (autor)" },
          { en: "it must be done", es: "hay que hacerlo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«English ___ in many countries.»",
            options: ["is spoken", "speaks", "is speaking", "spoke"],
            answer: "is spoken",
            explain:
              "Pasiva = be + participio. En español dirías «se habla»; el inglés no usa «se», usa la pasiva.",
            speak: "English is spoken in many countries",
          },
          {
            kind: "choose",
            prompt: "«This house ___ in 1920.»",
            options: ["was built", "built", "was build", "is built"],
            answer: "was built",
            explain:
              "Pasado + pasiva: was/were + participio. «Build» → built (participio irregular).",
            speak: "this house was built in 1920",
          },
          {
            kind: "bank",
            prompt: "Traduce: «El coche fue reparado ayer»",
            answer: "The car was repaired yesterday",
            bank: ["The", "car", "was", "repaired", "yesterday", "is", "repair"],
            explain:
              "El sujeto es quien RECIBE la acción (the car), y el verbo va en participio.",
          },
          {
            kind: "type",
            prompt: "Completa: «Don Quixote was written ___ Cervantes»",
            answer: ["by"],
            explain:
              "«By» introduce al autor de la acción. Si no importa quién, simplemente se omite.",
          },
          {
            kind: "choose",
            prompt: "Pasiva de «They cancelled the match»:",
            options: [
              "The match was cancelled",
              "The match cancelled",
              "The match is cancel",
              "The match was cancel",
            ],
            answer: "The match was cancelled",
            explain:
              "El objeto pasa a sujeto y el verbo a be + participio. «They» desaparece porque no aporta nada.",
          },
        ],
      },
    ],
  },
];
