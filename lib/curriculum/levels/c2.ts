import type { Unit } from "../types";

// Nivel C2. Explicaciones SIEMPRE en español: es el diferenciador.
// C2 no es saber más gramática que C1: es control. Elegir qué se calla, dónde
// cae el foco de la frase, qué registro pide la situación y qué se está
// diciendo sin decirlo. Aquí casi ninguna opción es «incorrecta»: son todas
// posibles y solo una es la que usaría un nativo en esa situación.
export const c2: Unit[] = [
  /* ---------------- Economía y precisión ---------------- */
  {
    id: "c2-precision",
    level: "C2",
    titleEs: "Economía y precisión",
    titleEn: "Economy and precision",
    lessons: [
      {
        id: "c2-precision-1",
        titleEs: "Lo que se calla",
        titleEn: "Ellipsis",
        vocab: [
          { en: "I'd love to", es: "me encantaría (hacerlo)" },
          { en: "if you can", es: "si puedes" },
          { en: "some can, some can't", es: "unos pueden, otros no" },
          { en: "she said she would", es: "dijo que lo haría" },
          { en: "not that I know of", es: "que yo sepa, no" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Are you coming?» — «I'd love ___.»",
            options: ["to", "to come it", "it", "so"],
            answer: "to",
            explain:
              "El infinitivo se corta y queda solo el «to»: I'd love to, I'd like to, I ought to. Repetir el verbo suena redundante.",
            speak: "I'd love to.",
          },
          {
            kind: "choose",
            prompt: "«Has anyone called?» — «___»",
            options: ["Not that I know of", "Not that I know it", "No that I know", "Not what I know"],
            answer: "Not that I know of",
            explain:
              "Fórmula fija con «of» al final: la preposición se queda huérfana porque su complemento ya se ha callado.",
            speak: "Not that I know of.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está bien elidida?",
            options: [
              "He can swim and she can too",
              "He can swim and she can swim too also",
              "He can swim and she too can swim it",
              "He can to swim and she can",
            ],
            answer: "He can swim and she can too",
            explain:
              "Se conserva el auxiliar y se borra el resto: «she can too». El auxiliar es el gancho del que cuelga lo callado.",
            speak: "He can swim and she can too.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Dijo que llamaría, pero no lo hizo»",
            answer: "she said she would call but she didn't",
            bank: ["she", "said", "she", "would", "call", "but", "she", "didn't", "do", "it"],
            explain:
              "«But she didn't» basta: el verbo se recupera del contexto. Añadir «do it» no está mal, pero pesa.",
          },
          {
            kind: "type",
            prompt: "Acorta «Yes, I have finished» a tres palabras (respuesta corta)",
            answer: ["yes, I have", "yes I have"],
            explain:
              "La respuesta corta se queda en el auxiliar. Repetir el participio suena a examen, no a conversación.",
          },
        ],
      },
      {
        id: "c2-precision-2",
        titleEs: "Sustituir en vez de repetir",
        titleEn: "Substitution",
        vocab: [
          { en: "do so", es: "hacerlo (formal)" },
          { en: "the blue one", es: "el azul" },
          { en: "I think so", es: "creo que sí" },
          { en: "I'm afraid not", es: "me temo que no" },
          { en: "if so", es: "de ser así" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Please sign the form. If you have already ___, ignore this.»",
            options: ["done so", "done it so", "made so", "so done"],
            answer: "done so",
            explain:
              "«Do so» sustituye a un verbo de acción ya mencionado y es el registro escrito. En conversación diríamos «done it».",
            speak: "If you have already done so, ignore this.",
          },
          {
            kind: "choose",
            prompt: "«Is it going to rain?» — «I hope ___.»",
            options: ["not", "no", "not so", "it not"],
            answer: "not",
            explain:
              "Con hope, guess, believe y afraid el negativo es «not»: I hope not. Con think se prefiere «I don't think so».",
            speak: "I hope not.",
          },
          {
            kind: "choose",
            prompt: "«I need a chair.» — «Take the wooden ___.»",
            options: ["one", "chair one", "it", "ones"],
            answer: "one",
            explain:
              "«One» sustituye a un sustantivo contable ya dicho: the wooden one. Nunca sustituye a incontables (no «a bread one»).",
            speak: "Take the wooden one.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Vienes? De ser así, avísame»",
            answer: "are you coming? if so let me know",
            bank: ["are", "you", "coming?", "if", "so", "let", "me", "know", "yes", "that"],
            explain:
              "«If so» = de ser así, y «if not» = si no. Dos palabras que se comen una condicional entera.",
          },
          {
            kind: "type",
            prompt: "Responde «me temo que no» en tres palabras",
            answer: ["I'm afraid not", "I am afraid not"],
            explain:
              "«I'm afraid not» suaviza una negativa. Literalmente «me temo», pero funciona como un «lo siento, no».",
          },
        ],
      },
      {
        id: "c2-precision-3",
        titleEs: "El verbo exacto",
        titleEn: "The precise verb",
        vocab: [
          { en: "to soar", es: "dispararse (subir mucho)" },
          { en: "to plummet", es: "desplomarse" },
          { en: "to tackle", es: "abordar (un problema)" },
          { en: "to curb", es: "frenar / contener" },
          { en: "to streamline", es: "simplificar / agilizar" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Prices ___ by 40% in a single month.» (subieron muchísimo)",
            options: ["soared", "went up a lot", "raised much", "climbed up big"],
            answer: "soared",
            explain:
              "Un verbo exacto vale por tres palabras: soar (dispararse), plummet (desplomarse), edge up (subir poco a poco).",
            speak: "Prices soared by 40% in a single month.",
          },
          {
            kind: "choose",
            prompt: "«The new law aims to ___ speculation.» (frenarla)",
            options: ["curb", "cut", "stop to", "make less"],
            answer: "curb",
            explain:
              "«Curb» es contener sin eliminar: se usa con inflación, gastos o especulación. «Stop» sería cortarla del todo.",
            speak: "The new law aims to curb speculation.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál dice lo mismo con menos palabras que «make the process simpler and faster»?",
            options: [
              "streamline the process",
              "simplify more the process",
              "do the process quick",
              "make process easy",
            ],
            answer: "streamline the process",
            explain:
              "Nominalizar y elegir el verbo justo es la marca del C2: streamline lleva dentro «simpler AND faster».",
            speak: "We need to streamline the process.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Tenemos que abordar el problema de raíz»",
            answer: "we need to tackle the root of the problem",
            bank: ["we", "need", "to", "tackle", "the", "root", "of", "the", "problem", "attack", "make"],
            explain:
              "«Tackle a problem» es la colocación natural. «Attack a problem» existe pero suena agresivo; «face» sería solo afrontarlo.",
          },
          {
            kind: "type",
            prompt: "Un verbo para «caer en picado» (empieza por «p», 7 letras)",
            answer: ["plummet"],
            explain:
              "Plummet = desplomarse. Se usa con precios, temperaturas y audiencias; para personas se prefiere «plunge».",
          },
        ],
      },
    ],
  },

  /* ---------------- Foco y orden de la información ---------------- */
  {
    id: "c2-focus",
    level: "C2",
    titleEs: "Dónde cae el foco",
    titleEn: "Where the focus falls",
    lessons: [
      {
        id: "c2-focus-1",
        titleEs: "Frases hendidas",
        titleEn: "Cleft sentences",
        vocab: [
          { en: "what surprised me was", es: "lo que me sorprendió fue" },
          { en: "it was John who", es: "fue John quien" },
          { en: "all I want is", es: "lo único que quiero es" },
          { en: "the thing is", es: "la cosa es que" },
          { en: "what he did was", es: "lo que hizo fue" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Enfatiza el CULPABLE en «Marta broke the vase»:",
            options: [
              "It was Marta who broke the vase",
              "It was the vase that Marta broke",
              "What Marta did was the vase",
              "Marta it was the vase broke",
            ],
            answer: "It was Marta who broke the vase",
            explain:
              "La hendida «It is/was X that/who…» pone el foco justo en X. Cambiar X cambia lo que estás señalando.",
            speak: "It was Marta who broke the vase.",
          },
          {
            kind: "choose",
            prompt: "«___ I need is a week off.» (lo único)",
            options: ["All", "What all", "The all", "Everything what"],
            answer: "All",
            explain:
              "«All I need is…» = lo único que necesito. Es una hendida con «all» que además añade el matiz de «nada más».",
            speak: "All I need is a week off.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál enfatiza la ACCIÓN y no el sujeto?",
            options: [
              "What he did was resign",
              "It was he who resigned",
              "He was the one resigning",
              "Resign was what him did",
            ],
            answer: "What he did was resign",
            explain:
              "«What + sujeto + do + was + infinitivo sin to» destaca el acto. Ojo: «was resign», no «was to resign».",
            speak: "What he did was resign.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Lo que me molesta es el ruido»",
            answer: "what bothers me is the noise",
            bank: ["what", "bothers", "me", "is", "the", "noise", "that", "it"],
            explain:
              "En español «lo que», en inglés «what» a secas: nunca «the thing what» ni «that what».",
          },
          {
            kind: "type",
            prompt: "Completa la hendida: «___ was the price that put me off» (una palabra)",
            answer: ["It"],
            explain:
              "El «it» de las hendidas es un sujeto vacío: no señala nada, solo sostiene la estructura para poder enfocar.",
          },
        ],
      },
      {
        id: "c2-focus-2",
        titleEs: "Adelantar al principio",
        titleEn: "Fronting",
        vocab: [
          { en: "down came the rain", es: "cayó la lluvia" },
          { en: "such was his anger", es: "tal era su enfado" },
          { en: "this I cannot accept", es: "esto no lo puedo aceptar" },
          { en: "in came the boss", es: "entró el jefe" },
          { en: "gone are the days", es: "atrás quedaron los días" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ the days when a degree guaranteed a job.»",
            options: ["Gone are", "Gone is", "Are gone", "Went are"],
            answer: "Gone are",
            explain:
              "Al adelantar el participio, el verbo va antes del sujeto y concuerda con «the days»: gone ARE.",
            speak: "Gone are the days when a degree guaranteed a job.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta con un adverbio de lugar delante?",
            options: [
              "Up the stairs came a strange noise",
              "Up the stairs came it",
              "Up the stairs it came a noise",
              "Came up the stairs a noise",
            ],
            answer: "Up the stairs came a strange noise",
            explain:
              "Con lugar adelantado se invierte SOLO si el sujeto es un sustantivo. Con pronombre no: «up he came», no «up came he».",
          },
          {
            kind: "choose",
            prompt: "«___ his anger that he walked out.»",
            options: ["Such was", "So was", "Such is", "So big was"],
            answer: "Such was",
            explain:
              "«Such + was + sustantivo + that»: con sustantivo va «such»; con adjetivo iría «so» (so angry was he).",
            speak: "Such was his anger that he walked out.",
          },
          {
            kind: "bank",
            prompt: "Traduce con énfasis: «Eso no lo pienso discutir»",
            answer: "that I will not discuss",
            bank: ["that", "I", "will", "not", "discuss", "it", "about"],
            explain:
              "Adelantar el objeto («that») lo marca como tema. Y «discuss» no lleva «about»: se discute algo, no sobre algo.",
          },
          {
            kind: "type",
            prompt: "Completa: «___ came the rain, and the match was over» (una palabra, adverbio)",
            answer: ["Down", "down"],
            explain:
              "«Down came the rain» es orden literario: el adverbio abre, el verbo sigue y el sujeto cierra. Da imagen y ritmo.",
          },
        ],
      },
      {
        id: "c2-focus-3",
        titleEs: "El peso, al final",
        titleEn: "End weight",
        vocab: [
          { en: "it turned out that", es: "resultó que" },
          { en: "there arose a problem", es: "surgió un problema" },
          { en: "it is worth noting", es: "conviene señalar" },
          { en: "it strikes me that", es: "me da la impresión de que" },
          { en: "there remains the question of", es: "queda la cuestión de" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál suena natural?",
            options: [
              "It is worth noting that the data come from two sources",
              "That the data come from two sources is worth noting",
              "Worth noting is that the data it comes from two sources",
              "It is worth to note that the data come from two sources",
            ],
            answer: "It is worth noting that the data come from two sources",
            explain:
              "El inglés manda lo largo al final: se abre con un «it» vacío y la frase pesada va detrás. Se llama extraposición.",
            speak: "It is worth noting that the data come from two sources.",
          },
          {
            kind: "choose",
            prompt: "«___ turned out that nobody had read it.»",
            options: ["It", "There", "That", "This"],
            answer: "It",
            explain:
              "«It turned out that…» presenta el desenlace. «There» presenta la existencia (there turned out to be a problem).",
            speak: "It turned out that nobody had read it.",
          },
          {
            kind: "choose",
            prompt: "«___ remains the question of who pays.»",
            options: ["There", "It", "That", "This"],
            answer: "There",
            explain:
              "Con verbos de existencia y aparición (remain, arise, exist) el sujeto vacío es «there», no «it».",
            speak: "There remains the question of who pays.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Me da la impresión de que nadie lo comprobó»",
            answer: "it strikes me that nobody checked it",
            bank: ["it", "strikes", "me", "that", "nobody", "checked", "it", "there", "no"],
            explain:
              "«It strikes me that» = me da la impresión. Y con «nobody» ya está la negación: no se añade «didn't».",
          },
          {
            kind: "type",
            prompt: "Reordena para dar peso al final: «That he lied is obvious» → «___ is obvious that he lied»",
            answer: ["It", "it"],
            explain:
              "La versión con «it» es la normal; la otra existe pero suena a tesis doctoral porque carga el peso al principio.",
          },
        ],
      },
    ],
  },

  /* ---------------- Registro extremo ---------------- */
  {
    id: "c2-register",
    level: "C2",
    titleEs: "Cada registro, su inglés",
    titleEn: "Register extremes",
    lessons: [
      {
        id: "c2-register-1",
        titleEs: "Administrativo y legal",
        titleEn: "Official and legal",
        vocab: [
          { en: "hereby", es: "por la presente" },
          { en: "shall be deemed", es: "se considerará" },
          { en: "in the event of", es: "en caso de" },
          { en: "pursuant to", es: "conforme a" },
          { en: "the undersigned", es: "el abajo firmante" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«The tenant ___ pay the rent on the first of each month.» (obligación en un contrato)",
            options: ["shall", "will", "is going to", "must to"],
            answer: "shall",
            explain:
              "En textos legales «shall» no es futuro: es obligación. Fuera de un contrato suena arcaico y se usa «must» o «will».",
            speak: "The tenant shall pay the rent on the first of each month.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál traduce «en caso de impago»?",
            options: [
              "In the event of non-payment",
              "In case of not pay",
              "In the case of no payment happen",
              "At the event of non-payment",
            ],
            answer: "In the event of non-payment",
            explain:
              "«In the event of + sustantivo» es la fórmula administrativa. Y el prefijo «non-» crea el sustantivo negativo.",
          },
          {
            kind: "choose",
            prompt: "«___ to article 5, the contract is void.»",
            options: ["Pursuant", "According", "Agreeing", "Complying"],
            answer: "Pursuant",
            explain:
              "«Pursuant to» = conforme a, sólo en registro jurídico. En un correo normal sería «according to» o «under».",
          },
          {
            kind: "bank",
            prompt: "Traduce (formal): «Por la presente confirmo que he leído el documento»",
            answer: "I hereby confirm that I have read the document",
            bank: ["I", "hereby", "confirm", "that", "I", "have", "read", "the", "document", "here", "by"],
            explain:
              "«Hereby» va entre sujeto y verbo, y sólo cabe en documentos: en conversación no existe.",
          },
          {
            kind: "type",
            prompt: "Completa: «Any delay ___ be deemed a breach» (una palabra, obligación legal)",
            answer: ["shall"],
            explain:
              "«Shall be deemed» = se considerará. «Deem» es «considerar» en registro legal; en la calle sería «be treated as».",
          },
        ],
      },
      {
        id: "c2-register-2",
        titleEs: "Titulares de prensa",
        titleEn: "Headlines",
        vocab: [
          { en: "PM to visit Berlin", es: "el primer ministro visitará Berlín" },
          { en: "talks collapse", es: "las negociaciones fracasan" },
          { en: "three held over theft", es: "tres detenidos por un robo" },
          { en: "bid to cut costs", es: "intento de recortar costes" },
          { en: "row over pay", es: "polémica por los sueldos" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«PM to visit Berlin» significa que la visita…",
            options: ["está por ocurrir", "ya ocurrió", "ocurre todos los años", "se canceló"],
            answer: "está por ocurrir",
            optionsLang: "es",
            explain:
              "En titulares el infinitivo con «to» marca FUTURO: se ahorran el «will». «PM visits» sería presente o pasado reciente.",
          },
          {
            kind: "choose",
            prompt: "«Three held over theft». ¿Qué falta y qué significa «held»?",
            options: [
              "Falta «are»: están detenidos",
              "Falta «have»: han sostenido algo",
              "Falta «will»: los detendrán",
              "No falta nada: sostienen tres robos",
            ],
            answer: "Falta «are»: están detenidos",
            optionsLang: "es",
            explain:
              "Los titulares borran artículos y el verbo «to be». «Held» aquí es participio pasivo: hold a alguien = detenerlo.",
          },
          {
            kind: "choose",
            prompt: "¿Qué palabra usaría un titular en lugar de «disagreement»?",
            options: ["row", "line", "queue", "fight"],
            answer: "row",
            explain:
              "Los titulares eligen palabras cortas: row (polémica), bid (intento), axe (recortar), curb (frenar), probe (investigación).",
          },
          {
            kind: "bank",
            prompt: "Convierte en titular: «The company is going to cut 200 jobs»",
            answer: "firm to axe 200 jobs",
            bank: ["firm", "to", "axe", "200", "jobs", "will", "the", "cut"],
            explain:
              "Titular = sin artículo, futuro con «to», palabra corta: firm (empresa), axe (recortar). Cuatro palabras en vez de nueve.",
          },
          {
            kind: "type",
            prompt: "Palabra de titular para «investigación» (5 letras, empieza por «p»)",
            answer: ["probe"],
            explain: "Probe = investigación (y también sonda). Cabe en una columna; «investigation» no.",
          },
        ],
      },
      {
        id: "c2-register-3",
        titleEs: "Habla rápida y coloquial",
        titleEn: "Fast, casual speech",
        vocab: [
          { en: "gonna", es: "voy a (hablado)" },
          { en: "d'you reckon?", es: "¿tú crees?" },
          { en: "sort of", es: "en plan / más o menos" },
          { en: "innit", es: "¿no? (muy coloquial)" },
          { en: "I'm knackered", es: "estoy hecho polvo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Dónde NO se puede escribir «gonna»?",
            options: [
              "En un informe de trabajo",
              "En un mensaje a un amigo",
              "En el guion de una serie",
              "En la letra de una canción",
            ],
            answer: "En un informe de trabajo",
            optionsLang: "es",
            explain:
              "«Gonna», «wanna» y «gotta» son transcripciones del habla: valen en diálogo y mensajes, nunca en un texto formal.",
          },
          {
            kind: "choose",
            prompt: "«You're coming, ___?» (coletilla neutra)",
            options: ["aren't you", "isn't it", "no", "right it"],
            answer: "aren't you",
            explain:
              "La coletilla repite el auxiliar y le da la vuelta. «Innit» vale para todo pero marca un registro muy informal.",
            speak: "You're coming, aren't you?",
          },
          {
            kind: "choose",
            prompt: "«I'm knackered» significa:",
            options: ["Estoy agotado", "Estoy enfadado", "Estoy sin dinero", "Estoy perdido"],
            answer: "Estoy agotado",
            optionsLang: "es",
            explain:
              "Knackered (británico) = reventado de cansancio. Sin blanca sería «skint»; enfadado, «wound up».",
          },
          {
            kind: "bank",
            prompt: "Traduce (coloquial): «¿Tú crees que va a funcionar?»",
            answer: "d'you reckon it's gonna work?",
            bank: ["d'you", "reckon", "it's", "gonna", "work?", "do", "think"],
            explain:
              "«Reckon» = creer, en registro hablado británico y australiano. La contracción «d'you» es cómo suena «do you».",
          },
          {
            kind: "type",
            prompt: "Muletilla de dos palabras para «en plan / más o menos» (empieza por «sort»)",
            answer: ["sort of", "sorta"],
            explain:
              "«Sort of» / «kind of» suavizan lo que dices. En habla rápida se oyen como «sorta» y «kinda».",
          },
        ],
      },
    ],
  },

  /* ---------------- Lenguaje figurado ---------------- */
  {
    id: "c2-figurative",
    level: "C2",
    titleEs: "Hablar con imágenes",
    titleEn: "Figurative language",
    lessons: [
      {
        id: "c2-figurative-1",
        titleEs: "Metáforas que estructuran",
        titleEn: "Structuring metaphors",
        vocab: [
          { en: "to spend time", es: "gastar tiempo" },
          { en: "a heated argument", es: "una discusión acalorada" },
          { en: "prices are high", es: "los precios están altos" },
          { en: "I see your point", es: "entiendo lo que dices" },
          { en: "a solid argument", es: "un argumento sólido" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ two hours on that email.» (el tiempo es dinero)",
            options: ["spent", "passed", "used", "lost time"],
            answer: "spent",
            explain:
              "El inglés trata el tiempo como dinero: spend, save, waste, invest time. «Pass the time» es solo entretenerse.",
            speak: "I spent two hours on that email.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál sigue la metáfora «discutir es pelear»?",
            options: [
              "He attacked every point I made",
              "He touched every point I made",
              "He walked every point I made",
              "He cooked every point I made",
            ],
            answer: "He attacked every point I made",
            explain:
              "Attack, defend, shoot down, win an argument: la discusión se habla como una batalla, y por eso «heated» suena natural.",
          },
          {
            kind: "choose",
            prompt: "«Entiendo lo que dices» en la metáfora «entender es ver»:",
            options: ["I see your point", "I hear your point", "I touch your point", "I know your point"],
            answer: "I see your point",
            explain:
              "Entender se dice con la vista: I see, it's clear, a bright idea, that's transparent. Por eso «I see» = ya entiendo.",
            speak: "I see your point.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Vamos a ahorrar tiempo si lo hacemos juntos»",
            answer: "we will save time if we do it together",
            bank: ["we", "will", "save", "time", "if", "we", "do", "it", "together", "win", "economise"],
            explain:
              "«Save time», nunca «win time» ni «economise time»: el tiempo se ahorra, como el dinero.",
          },
          {
            kind: "type",
            prompt: "Adjetivo para un argumento bien construido (5 letras, metáfora de edificio)",
            answer: ["solid"],
            explain:
              "Las ideas son edificios: a solid argument, to build a case, the theory collapsed, shaky foundations.",
          },
        ],
      },
      {
        id: "c2-figurative-2",
        titleEs: "Modismos que no se deducen",
        titleEn: "Opaque idioms",
        vocab: [
          { en: "to bite the bullet", es: "hacer de tripas corazón" },
          { en: "to let the cat out of the bag", es: "irse de la lengua" },
          { en: "to be on the fence", es: "estar indeciso" },
          { en: "to jump the gun", es: "precipitarse" },
          { en: "to move the goalposts", es: "cambiar las reglas a mitad" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«We'll have to ___ and tell them the truth.»",
            options: ["bite the bullet", "eat the bullet", "bite the ball", "take the bullet"],
            answer: "bite the bullet",
            explain:
              "«Bite the bullet» = afrontar algo desagradable de una vez. «Take a bullet» es sacrificarse por otro: no es lo mismo.",
            speak: "We'll have to bite the bullet and tell them the truth.",
          },
          {
            kind: "choose",
            prompt: "«They keep moving the goalposts» significa:",
            options: [
              "Cambian las condiciones cuando ya casi cumples",
              "Retrasan la reunión",
              "Cambian de opinión sobre el precio",
              "Aplazan el partido",
            ],
            answer: "Cambian las condiciones cuando ya casi cumples",
            optionsLang: "es",
            explain:
              "Del fútbol: mover la portería cuando vas a marcar. Se usa mucho en trabajo y negociación.",
          },
          {
            kind: "choose",
            prompt: "«Don't ___: we haven't signed anything yet.» (no te precipites)",
            options: ["jump the gun", "jump the fence", "run the gun", "shoot the gun"],
            answer: "jump the gun",
            explain:
              "Del atletismo: salir antes del disparo. «Jump the fence» no existe con ese sentido; sí «sit on the fence» = no mojarse.",
            speak: "Don't jump the gun: we haven't signed anything yet.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Se fue de la lengua antes del anuncio»",
            answer: "he let the cat out of the bag before the announcement",
            bank: ["he", "let", "the", "cat", "out", "of", "the", "bag", "before", "the", "announcement", "said"],
            explain:
              "El modismo es fijo palabra por palabra: cualquier cambio (a cat, out the bag) lo rompe.",
          },
          {
            kind: "type",
            prompt: "Completa: «She's still on the ___» (indecisa, 5 letras)",
            answer: ["fence"],
            explain:
              "«On the fence» = ni de un lado ni del otro. Con «sit» delante añade el matiz de no querer mojarse.",
          },
        ],
      },
      {
        id: "c2-figurative-3",
        titleEs: "Eufemismos y rodeos",
        titleEn: "Euphemism",
        vocab: [
          { en: "to let someone go", es: "despedir a alguien" },
          { en: "to pass away", es: "fallecer" },
          { en: "between jobs", es: "en paro (dicho con tacto)" },
          { en: "a challenging situation", es: "una situación complicada" },
          { en: "economical with the truth", es: "que no cuenta toda la verdad" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«We had to let three people ___.» (despedirlos)",
            options: ["go", "out", "away", "off"],
            answer: "go",
            explain:
              "«Let someone go» es el eufemismo estándar de despedir. «Let off» es perdonar un castigo, no despedir.",
            speak: "We had to let three people go.",
          },
          {
            kind: "choose",
            prompt: "En una empresa, «a challenging quarter» normalmente significa:",
            options: [
              "Un trimestre malo",
              "Un trimestre estimulante",
              "Un trimestre récord",
              "Un trimestre corto",
            ],
            answer: "Un trimestre malo",
            optionsLang: "es",
            explain:
              "«Challenging» es el eufemismo corporativo de «malo». Igual que «restructuring» son despidos y «headwinds», problemas.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es el eufemismo para «he lied»?",
            options: [
              "He was economical with the truth",
              "He was expensive with the truth",
              "He was careful of the truth",
              "He saved the truth",
            ],
            answer: "He was economical with the truth",
            explain:
              "Ironía muy británica: «ahorrar verdad». Acusa de mentir sin usar la palabra, que es justo lo que hace un eufemismo.",
          },
          {
            kind: "bank",
            prompt: "Traduce con tacto: «Su abuelo falleció el año pasado»",
            answer: "his grandfather passed away last year",
            bank: ["his", "grandfather", "passed", "away", "last", "year", "died", "out"],
            explain:
              "«Pass away» es el registro respetuoso. «Pass out» es desmayarse: una letra de diferencia y un malentendido garantizado.",
          },
          {
            kind: "type",
            prompt: "Completa el eufemismo para estar en paro: «I'm between ___»",
            answer: ["jobs"],
            explain:
              "«Between jobs» presenta el paro como una pausa entre dos trabajos. Muy usado al presentarse en eventos.",
          },
        ],
      },
    ],
  },

  /* ---------------- Lo que no se dice ---------------- */
  {
    id: "c2-implicature",
    level: "C2",
    titleEs: "Lo que no se dice",
    titleEn: "What goes unsaid",
    lessons: [
      {
        id: "c2-implicature-1",
        titleEs: "Quitar hierro",
        titleEn: "Understatement",
        vocab: [
          { en: "not bad at all", es: "nada mal (muy bueno)" },
          { en: "a bit of a problem", es: "un problemón" },
          { en: "I've had better days", es: "he tenido días mejores" },
          { en: "it's not ideal", es: "es un desastre" },
          { en: "rather chilly", es: "hace un frío que pela" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Tu jefe dice «that's not ideal» sobre tu informe. Significa:",
            options: [
              "Hay un problema serio",
              "Está casi perfecto",
              "Le da igual",
              "Quiere el informe mañana",
            ],
            answer: "Hay un problema serio",
            optionsLang: "es",
            explain:
              "El understatement rebaja el volumen, no la gravedad. «Not ideal» en boca británica suele ser «esto está mal».",
          },
          {
            kind: "choose",
            prompt: "«How was the concert?» — «___» (te encantó)",
            options: ["Not bad at all", "Not bad nothing", "No bad", "Not so bad at all"],
            answer: "Not bad at all",
            explain:
              "«Not bad at all» es un elogio, no una queja. Decir «amazing» también vale, pero suena menos británico.",
            speak: "Not bad at all.",
          },
          {
            kind: "choose",
            prompt: "«We have a bit of a problem» describe un problema…",
            options: ["grande", "pequeño", "inexistente", "ya resuelto"],
            answer: "grande",
            optionsLang: "es",
            explain:
              "«A bit of a» delante de un sustantivo negativo lo AGRAVA por contraste: a bit of a disaster es un desastre completo.",
          },
          {
            kind: "bank",
            prompt: "Traduce quitando hierro: «Ha sido un día horrible»",
            answer: "I have had better days",
            bank: ["I", "have", "had", "better", "days", "worse", "a", "terrible"],
            explain:
              "En vez de decir que fue horrible, se dice que los ha habido mejores. El oyente completa el resto.",
          },
          {
            kind: "type",
            prompt: "Completa: «It's ___ chilly today» (adverbio de 6 letras para rebajar)",
            answer: ["rather"],
            explain:
              "rather / quite / somewhat rebajan la forma pero no el fondo. «Rather chilly» puede ser un frío considerable.",
          },
        ],
      },
      {
        id: "c2-implicature-2",
        titleEs: "Ironía y sarcasmo",
        titleEn: "Irony and sarcasm",
        vocab: [
          { en: "well, that went well", es: "pues qué bien ha salido (no)" },
          { en: "just what I needed", es: "justo lo que me faltaba" },
          { en: "you don't say", es: "no me digas" },
          { en: "tell me about it", es: "y que lo digas" },
          { en: "how very original", es: "qué original (no)" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Se cae la conexión en mitad de una reunión y alguien dice «Well, that went well». Está:",
            options: [
              "Diciendo lo contrario, con ironía",
              "Contento con la reunión",
              "Pidiendo repetir la reunión",
              "Despidiéndose",
            ],
            answer: "Diciendo lo contrario, con ironía",
            optionsLang: "es",
            explain:
              "La ironía inglesa se apoya en la entonación y en el contexto: la frase es positiva y la situación, no.",
          },
          {
            kind: "choose",
            prompt: "«It's raining and I forgot my umbrella.» — «___» (con ironía)",
            options: ["Just what you needed", "Just what you need it", "Just that you needed", "Just what needed you"],
            answer: "Just what you needed",
            explain:
              "«Just what I/you needed» siempre es irónico: nadie necesitaba eso. Es una de las fórmulas fijas del sarcasmo.",
            speak: "Just what you needed.",
          },
          {
            kind: "choose",
            prompt: "«Tell me about it» como respuesta significa:",
            options: [
              "Ya lo sé de sobra, me pasa igual",
              "Cuéntame los detalles",
              "No te creo",
              "Cambia de tema",
            ],
            answer: "Ya lo sé de sobra, me pasa igual",
            optionsLang: "es",
            explain:
              "Es un acuerdo enfático, no una petición. Si de verdad quieres detalles, hay que decir «tell me more».",
          },
          {
            kind: "bank",
            prompt: "Responde con ironía a algo obvio: «No me digas»",
            answer: "you don't say",
            bank: ["you", "don't", "say", "me", "tell", "not"],
            explain:
              "«You don't say» (sin «it») es la respuesta irónica a una obviedad. Con «it» sería una orden distinta.",
          },
          {
            kind: "type",
            prompt: "Completa el sarcasmo ante una idea muy vista: «How very ___»",
            answer: ["original"],
            explain:
              "«How very + adjetivo» es una estructura enfática que en ironía se vuelve demoledora: how very original.",
          },
        ],
      },
      {
        id: "c2-implicature-3",
        titleEs: "Decir que no sin decirlo",
        titleEn: "Saying no without saying it",
        vocab: [
          { en: "I'll see what I can do", es: "veré qué puedo hacer" },
          { en: "let's park that for now", es: "dejémoslo aparcado" },
          { en: "with all due respect", es: "con todo el respeto" },
          { en: "that's one way of looking at it", es: "es una forma de verlo" },
          { en: "I'm not sure that's feasible", es: "no lo veo viable" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«With all due respect…» anuncia:",
            options: [
              "Un desacuerdo firme",
              "Un elogio",
              "Una disculpa",
              "Un cambio de tema",
            ],
            answer: "Un desacuerdo firme",
            optionsLang: "es",
            explain:
              "La cortesía es el envoltorio del golpe: quien empieza así va a decir que estás equivocado. Igual que «no offence, but…».",
          },
          {
            kind: "choose",
            prompt: "En una reunión, «let's park that» quiere decir:",
            options: [
              "No lo vamos a tratar ahora (y quizá nunca)",
              "Vamos a decidirlo ya",
              "Está aprobado",
              "Lo pasamos a votación",
            ],
            answer: "No lo vamos a tratar ahora (y quizá nunca)",
            optionsLang: "es",
            explain:
              "«Park it» aplaza sin rechazar en voz alta. Hermanas: «take it offline» y «let's circle back».",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es la negativa MÁS suave a una propuesta?",
            options: [
              "I'm not sure that's feasible",
              "That won't work",
              "No",
              "That's a bad idea",
            ],
            answer: "I'm not sure that's feasible",
            explain:
              "Hedge («I'm not sure») + palabra técnica neutra («feasible»): rechaza sin señalar a nadie ni cerrar la puerta.",
            speak: "I'm not sure that's feasible.",
          },
          {
            kind: "bank",
            prompt: "Responde sin comprometerte: «Veré qué puedo hacer»",
            answer: "I will see what I can do",
            bank: ["I", "will", "see", "what", "I", "can", "do", "look", "that"],
            explain:
              "Promete esfuerzo, no resultado. Es la respuesta educada cuando no piensas o no puedes hacerlo.",
          },
          {
            kind: "type",
            prompt: "Completa la discrepancia educada: «That's one way of ___ at it»",
            answer: ["looking"],
            explain:
              "«That's one way of looking at it» = ni de broma, pero dicho con una sonrisa. Tras preposición, siempre -ing.",
          },
        ],
      },
    ],
  },

  /* ---------------- Variedades y cambio ---------------- */
  {
    id: "c2-variety",
    level: "C2",
    titleEs: "Un inglés, muchos ingleses",
    titleEn: "Many Englishes",
    lessons: [
      {
        id: "c2-variety-1",
        titleEs: "Británico y americano",
        titleEn: "British and American",
        vocab: [
          { en: "lift / elevator", es: "ascensor" },
          { en: "flat / apartment", es: "piso" },
          { en: "queue / line", es: "cola" },
          { en: "have you got? / do you have?", es: "¿tienes?" },
          { en: "at the weekend / on the weekend", es: "el fin de semana" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I've just eaten» es británico. ¿Y el americano habitual?",
            options: ["I just ate", "I have just ate", "I just have eaten", "I am just eating"],
            answer: "I just ate",
            explain:
              "Con just, already y yet, el británico prefiere el present perfect y el americano el pasado simple. Ambos son correctos.",
            speak: "I just ate.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es la pareja MAL emparejada?",
            options: [
              "boot (UK) = trunk (US) = bota del coche que se abre por delante",
              "lorry (UK) = truck (US)",
              "pavement (UK) = sidewalk (US)",
              "petrol (UK) = gas (US)",
            ],
            answer: "boot (UK) = trunk (US) = bota del coche que se abre por delante",
            optionsLang: "es",
            explain:
              "«Boot» y «trunk» sí son el maletero, pero va detrás; lo de delante es «bonnet» (UK) o «hood» (US).",
          },
          {
            kind: "choose",
            prompt: "En un texto para EE. UU., ¿cómo escribes «organisation»?",
            options: ["organization", "organisation", "organizacion", "organisationn"],
            answer: "organization",
            explain:
              "EE. UU. usa -ize y -or (color, organization); Reino Unido admite -ise y usa -our (colour). Lo importante es no mezclar.",
          },
          {
            kind: "bank",
            prompt: "Traduce al británico: «Do you have a car?»",
            answer: "have you got a car?",
            bank: ["have", "you", "got", "a", "car?", "do", "has"],
            explain:
              "«Have you got…?» es la forma británica habitual; «Do you have…?» es americana y hoy también se oye en el Reino Unido.",
          },
          {
            kind: "type",
            prompt: "Palabra británica para «apartment» (4 letras)",
            answer: ["flat"],
            explain:
              "Flat (UK) = apartment (US). Ojo: «flat» también es «plano» y, en EE. UU., un pinchazo (a flat tyre).",
          },
        ],
      },
      {
        id: "c2-variety-2",
        titleEs: "Jerga de oficina",
        titleEn: "Corporate speak",
        vocab: [
          { en: "to circle back", es: "retomarlo más adelante" },
          { en: "low-hanging fruit", es: "lo fácil de conseguir" },
          { en: "bandwidth", es: "capacidad / tiempo disponible" },
          { en: "to align on", es: "ponerse de acuerdo en" },
          { en: "a deep dive", es: "un análisis a fondo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I don't have the bandwidth for this» significa:",
            options: [
              "No tengo tiempo ni energía",
              "No tengo buena conexión",
              "No tengo permiso",
              "No tengo presupuesto",
            ],
            answer: "No tengo tiempo ni energía",
            optionsLang: "es",
            explain:
              "Metáfora de red aplicada a personas. Es la forma corporativa de decir «voy hasta arriba» sin decir que no.",
          },
          {
            kind: "choose",
            prompt: "«Let's start with the low-hanging fruit» propone empezar por:",
            options: [
              "Lo más fácil y de efecto rápido",
              "Lo más importante",
              "Lo más barato de comprar",
              "Lo que nadie quiere hacer",
            ],
            answer: "Lo más fácil y de efecto rápido",
            optionsLang: "es",
            explain:
              "La fruta que está a mano se coge sin escalera: las mejoras que cuestan poco y se notan enseguida.",
          },
          {
            kind: "choose",
            prompt: "«We need to ___ on the priorities before Friday.»",
            options: ["align", "alignate", "aline", "alignment"],
            answer: "align",
            explain:
              "«Align on something» = llegar a un acuerdo. Es verbo; el sustantivo sería «alignment» y no encaja tras «to».",
            speak: "We need to align on the priorities before Friday.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Retomamos esto la semana que viene»",
            answer: "let us circle back on this next week",
            bank: ["let", "us", "circle", "back", "on", "this", "next", "week", "return", "again"],
            explain:
              "«Circle back» = volver sobre el tema. Cuidado: en muchas reuniones equivale a aparcarlo indefinidamente.",
          },
          {
            kind: "type",
            prompt: "Expresión de dos palabras para «análisis a fondo» (empieza por «deep»)",
            answer: ["deep dive", "a deep dive"],
            explain:
              "«A deep dive into the data» = meterse hasta el fondo. Como verbo: «let's deep-dive into this», con guion.",
          },
        ],
      },
      {
        id: "c2-variety-3",
        titleEs: "Inglés que cambia",
        titleEn: "English on the move",
        vocab: [
          { en: "to google something", es: "buscar algo en internet" },
          { en: "to ghost someone", es: "desaparecer sin dar explicaciones" },
          { en: "they as singular", es: "«they» para una sola persona" },
          { en: "a hard pass", es: "un no rotundo" },
          { en: "to gatekeep", es: "guardarse el acceso a algo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Someone left ___ umbrella.» (no sabes quién ni cómo se identifica)",
            options: ["their", "his", "its", "his or her own"],
            answer: "their",
            explain:
              "El «they» singular es hoy la opción estándar y neutra para una persona sin especificar. Lleva verbo en plural: they are.",
            speak: "Someone left their umbrella.",
          },
          {
            kind: "choose",
            prompt: "¿Qué proceso comparten «to google», «to ghost» y «to adult»?",
            options: [
              "Un sustantivo pasa a usarse como verbo",
              "Un verbo pasa a usarse como sustantivo",
              "Son préstamos de otro idioma",
              "Son abreviaturas",
            ],
            answer: "Un sustantivo pasa a usarse como verbo",
            optionsLang: "es",
            explain:
              "Se llama «verbing» y es una de las máquinas de crear palabras del inglés: no hace falta sufijo, basta con usarlo así.",
          },
          {
            kind: "choose",
            prompt: "«He ghosted me» quiere decir que:",
            options: [
              "Dejó de contestar y desapareció",
              "Me asustó",
              "Me copió el trabajo",
              "Me sustituyó en el puesto",
            ],
            answer: "Dejó de contestar y desapareció",
            optionsLang: "es",
            explain:
              "Nacido en las citas por app y hoy también laboral: una empresa puede «ghost» a un candidato tras la entrevista.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Lo busqué en internet antes de la reunión»",
            answer: "I googled it before the meeting",
            bank: ["I", "googled", "it", "before", "the", "meeting", "searched", "in"],
            explain:
              "«Google» como verbo se conjuga normal: googled, googling. Y es transitivo: se googlea algo, sin «in» ni «for».",
          },
          {
            kind: "type",
            prompt: "Completa: «Dinner at midnight? That's a hard ___ for me» (rechazo, 4 letras)",
            answer: ["pass"],
            explain:
              "«A hard pass» = un no rotundo pero informal. Viene de rechazar tu turno en un juego de cartas.",
          },
        ],
      },
    ],
  },
];
