import type { Unit } from "../types";

// Nivel B2. Explicaciones SIEMPRE en español: es el diferenciador.
// B2 = precisión y naturalidad: ya te haces entender, ahora toca sonar bien.
export const b2: Unit[] = [
  /* ---------------- Oraciones de relativo ---------------- */
  {
    id: "b2-relatives",
    level: "B2",
    titleEs: "Oraciones de relativo",
    titleEn: "Relative clauses",
    lessons: [
      {
        id: "b2-relatives-1",
        titleEs: "Who, which, that",
        titleEn: "Who, which, that",
        vocab: [
          { en: "the man who called", es: "el hombre que llamó" },
          { en: "the book which won", es: "el libro que ganó" },
          { en: "the house that we bought", es: "la casa que compramos" },
          { en: "the place where I work", es: "el lugar donde trabajo" },
          { en: "the day when we met", es: "el día en que nos conocimos" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«The man ___ called you is my boss.»",
            options: ["who", "which", "whose", "where"],
            answer: "who",
            explain:
              "«Who» para personas, «which» para cosas. «That» sirve para las dos en oraciones especificativas.",
            speak: "The man who called you is my boss.",
          },
          {
            kind: "choose",
            prompt: "«This is the restaurant ___ we had dinner.»",
            options: ["where", "which", "who", "when"],
            answer: "where",
            explain:
              "«Where» sustituye a «in which»: el lugar EN EL QUE pasó algo. Si dijeras «which», harían falta la preposición y el objeto: «which we had dinner in».",
            speak: "This is the restaurant where we had dinner.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál se puede omitir el relativo?",
            options: [
              "The film that we saw",
              "The film that won the prize",
              "The man who lives here",
              "The train that leaves at six",
            ],
            answer: "The film that we saw",
            explain:
              "Si el relativo es el OBJETO («we saw the film»), se puede quitar: «the film we saw». Si es el sujeto («the film won»), no.",
            speak: "The film we saw was great.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «La casa que compramos es antigua»",
            answer: "the house that we bought is old",
            bank: ["the", "house", "that", "we", "bought", "is", "old", "which", "who"],
            explain:
              "«That» vale para cosas y personas en las especificativas, y aquí es el objeto: también sería correcto «the house we bought».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «el día en que nos conocimos»",
            answer: ["the day when we met", "the day we met"],
            explain:
              "«When» para tiempo. Como es especificativa y no es sujeto, también se puede omitir: «the day we met».",
          },
        ],
      },
      {
        id: "b2-relatives-2",
        titleEs: "Con comas y con «whose»",
        titleEn: "Commas and whose",
        vocab: [
          { en: "my brother, who lives in Paris", es: "mi hermano, que vive en París" },
          { en: "whose car was stolen", es: "cuyo coche fue robado" },
          { en: "non-defining clause", es: "oración explicativa" },
          { en: "extra information", es: "información añadida" },
          { en: "as you know", es: "como sabes" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«My brother, ___ lives in Paris, is a chef.»",
            options: ["who", "that", "which", "whom"],
            answer: "who",
            explain:
              "Entre comas (explicativa) NUNCA se usa «that»: solo who/which/whose. Y el relativo no se puede omitir.",
            speak: "My brother, who lives in Paris, is a chef.",
          },
          {
            kind: "choose",
            prompt: "«That's the woman ___ car was stolen.»",
            options: ["whose", "who's", "which", "that"],
            answer: "whose",
            explain:
              "«Whose» = cuyo/de quien: marca posesión. Ojo: «who's» es «who is», otra cosa.",
            speak: "That's the woman whose car was stolen.",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «My sister, who lives in Rome, called»?",
            options: [
              "Tengo una sola hermana y vive en Roma",
              "Tengo varias hermanas y llamó la de Roma",
              "Mi hermana quiere vivir en Roma",
              "Mi hermana llamó desde Roma por casualidad",
            ],
            answer: "Tengo una sola hermana y vive en Roma",
            optionsLang: "es",
            explain:
              "Las comas indican información extra: solo hay una hermana. Sin comas («my sister who lives in Rome») estarías distinguiéndola de otras hermanas.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «París, que visité el año pasado, es preciosa»",
            answer: "Paris which I visited last year is beautiful",
            bank: ["Paris", "which", "I", "visited", "last", "year", "is", "beautiful", "that"],
            explain:
              "Con nombres propios la oración es siempre explicativa: va con comas al escribir y con «which», nunca «that».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «cuyo nombre no recuerdo» (empieza por «whose»)",
            answer: [
              "whose name I don't remember",
              "whose name I do not remember",
              "whose name I can't remember",
            ],
            explain:
              "Tras «whose» va directamente el sustantivo poseído, sin artículo: whose name, whose car.",
          },
        ],
      },
      {
        id: "b2-relatives-3",
        titleEs: "Preposiciones y «which» de frase",
        titleEn: "Prepositions and sentence which",
        vocab: [
          { en: "the person I spoke to", es: "la persona con la que hablé" },
          { en: "the topic we talked about", es: "el tema del que hablamos" },
          { en: "which was a surprise", es: "lo cual fue una sorpresa" },
          { en: "all of which", es: "todo lo cual" },
          { en: "the reason why", es: "la razón por la que" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál es lo natural en conversación?",
            options: [
              "The person I spoke to was helpful",
              "The person to who I spoke was helpful",
              "The person which I spoke was helpful",
              "The person I spoke was helpful",
            ],
            answer: "The person I spoke to was helpful",
            explain:
              "En inglés hablado la preposición se queda AL FINAL: «the person I spoke to». «To whom I spoke» es correcto pero muy formal.",
            speak: "The person I spoke to was helpful.",
          },
          {
            kind: "choose",
            prompt: "«He arrived late, ___ annoyed everyone.»",
            options: ["which", "that", "what", "who"],
            answer: "which",
            explain:
              "Ese «which» se refiere a TODA la frase anterior (el hecho de llegar tarde). El español lo dice con «lo cual». Nunca «what».",
            speak: "He arrived late, which annoyed everyone.",
          },
          {
            kind: "choose",
            prompt: "«That's the reason ___ I left.»",
            options: ["why", "which", "for", "how"],
            answer: "why",
            explain: "«The reason why» = la razón por la que. También vale «the reason I left».",
            speak: "That's the reason why I left.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «El tema del que hablamos era difícil»",
            answer: "the topic we talked about was difficult",
            bank: ["the", "topic", "we", "talked", "about", "was", "difficult", "which"],
            explain:
              "Preposición al final («talked about») y relativo omitido: es lo normal en inglés cotidiano.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «lo cual fue una sorpresa» (3 palabras + artículo)",
            answer: ["which was a surprise"],
            explain: "«Which» comenta lo dicho antes; en español se traduce por «lo cual/lo que».",
          },
        ],
      },
    ],
  },

  /* ---------------- Lo hipotético avanzado ---------------- */
  {
    id: "b2-unreal",
    level: "B2",
    titleEs: "Deseos y situaciones irreales",
    titleEn: "Wishes and unreal situations",
    lessons: [
      {
        id: "b2-unreal-1",
        titleEs: "I wish / if only",
        titleEn: "I wish / if only",
        vocab: [
          { en: "I wish I knew", es: "ojalá lo supiera" },
          { en: "if only I had", es: "ojalá tuviera / hubiera tenido" },
          { en: "I wish you would stop", es: "ojalá dejaras de" },
          { en: "I wish I had studied", es: "ojalá hubiera estudiado" },
          { en: "regret", es: "arrepentimiento" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I wish I ___ the answer.» (ahora no la sé)",
            options: ["knew", "know", "would know", "have known"],
            answer: "knew",
            explain:
              "Deseo sobre el presente: «wish» + pasado simple. El pasado marca que es irreal, no que sea pasado.",
            speak: "I wish I knew the answer.",
          },
          {
            kind: "choose",
            prompt: "«I wish I ___ harder for the exam.» (ya pasó)",
            options: ["had studied", "studied", "would study", "study"],
            answer: "had studied",
            explain:
              "Arrepentimiento del pasado: «wish» + past perfect (had + participio).",
            speak: "I wish I had studied harder for the exam.",
          },
          {
            kind: "choose",
            prompt: "«I wish you ___ complaining.» (me molesta lo que haces)",
            options: ["would stop", "stopped", "had stopped", "stop"],
            answer: "would stop",
            explain:
              "«Wish + would» sirve para quejarse de algo que OTRA persona hace y quieres que cambie. No se usa con «I wish I would».",
            speak: "I wish you would stop complaining.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Ojalá tuviera más tiempo»",
            answer: "I wish I had more time",
            bank: ["I", "I", "wish", "had", "more", "time", "have", "would"],
            explain: "Presente irreal → pasado: «I wish I had», nunca «I wish I have».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Ojalá estuviera aquí» (usando «wish»)",
            answer: ["I wish I were here", "I wish I was here", "I wish he were here"],
            explain:
              "Con «to be» lo cuidado es «were» para todas las personas: I wish I were. «Was» se oye, pero «were» es lo correcto en registro formal.",
          },
        ],
      },
      {
        id: "b2-unreal-2",
        titleEs: "I'd rather / it's time",
        titleEn: "I'd rather / it's time",
        vocab: [
          { en: "I'd rather stay", es: "prefiero quedarme" },
          { en: "I'd rather you didn't", es: "preferiría que no lo hicieras" },
          { en: "it's time we left", es: "ya va siendo hora de irnos" },
          { en: "I'd prefer to", es: "preferiría" },
          { en: "suppose", es: "supongamos / imagina" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I'd rather ___ at home tonight.»",
            options: ["stay", "to stay", "staying", "stayed"],
            answer: "stay",
            explain:
              "«I'd rather» + verbo base, sin «to». Con «prefer» sí: «I'd prefer to stay».",
            speak: "I'd rather stay at home tonight.",
          },
          {
            kind: "choose",
            prompt: "«I'd rather you ___ that.» (pido que no lo hagas)",
            options: ["didn't do", "don't do", "not do", "wouldn't to do"],
            answer: "didn't do",
            explain:
              "Cuando el sujeto CAMBIA, «I'd rather» pide pasado: «I'd rather you didn't». Es una forma muy educada de pedir algo.",
            speak: "I'd rather you didn't do that.",
          },
          {
            kind: "choose",
            prompt: "«It's time we ___.» (ya deberíamos irnos)",
            options: ["left", "leave", "to leave", "leaving"],
            answer: "left",
            explain:
              "«It's time» + sujeto + pasado = ya va siendo hora. Sin sujeto se usa infinitivo: «it's time to leave».",
            speak: "It's time we left.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Preferiría no hablar de eso»",
            answer: "I'd rather not talk about it",
            bank: ["I'd", "rather", "not", "talk", "about", "it", "to", "don't"],
            explain: "El negativo de «I'd rather» es «I'd rather not», sin «don't».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Ya va siendo hora de irnos» (con «it's time we»)",
            answer: ["it's time we left", "its time we left", "it is time we left"],
            explain: "Tras «it's time we» el verbo va en pasado aunque hables del presente.",
          },
        ],
      },
      {
        id: "b2-unreal-3",
        titleEs: "Condicionales mixtos",
        titleEn: "Mixed conditionals",
        vocab: [
          { en: "if I had studied, I would be", es: "si hubiera estudiado, estaría" },
          { en: "if I were you, I would have", es: "si yo fuera tú, habría" },
          { en: "otherwise", es: "de lo contrario" },
          { en: "as long as", es: "siempre que" },
          { en: "consequence", es: "consecuencia" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«If I had taken that job, I ___ in Madrid now.»",
            options: ["would be living", "would have lived", "will live", "lived"],
            answer: "would be living",
            explain:
              "Mixto: causa en el pasado (had taken) y consecuencia en el presente (would be living, ahora).",
            speak: "If I had taken that job, I would be living in Madrid now.",
          },
          {
            kind: "choose",
            prompt: "«If she ___ more careful, she wouldn't have crashed.»",
            options: ["were", "had been", "was being", "is"],
            answer: "were",
            explain:
              "El otro mixto: cómo ES ella siempre (característica presente) explica un hecho pasado. «If she were more careful…».",
            speak: "If she were more careful, she wouldn't have crashed.",
          },
          {
            kind: "choose",
            prompt: "«Take the map, ___ you'll get lost.»",
            options: ["otherwise", "unless", "in case", "although"],
            answer: "otherwise",
            explain:
              "«Otherwise» = de lo contrario, si no. «Unless» iría al principio de la condición: «unless you take the map…».",
            speak: "Take the map, otherwise you'll get lost.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Si me lo hubieras dicho, estaría preparado ahora»",
            answer: "if you had told me I would be ready now",
            bank: ["if", "you", "had", "told", "me", "I", "would", "be", "ready", "now", "have"],
            explain:
              "Pasado en el «if» (had told) + presente en el resultado (would be): consecuencia que dura hasta hoy.",
          },
          {
            kind: "type",
            prompt: "Completa: «I'll help you ___ ___ you're honest with me» (siempre que, 3 palabras)",
            answer: ["as long as"],
            explain:
              "«As long as» = siempre que / mientras. Va con presente aunque hables del futuro, igual que «if».",
          },
        ],
      },
    ],
  },

  /* ---------------- Pasiva avanzada ---------------- */
  {
    id: "b2-passive",
    level: "B2",
    titleEs: "Pasiva avanzada",
    titleEn: "Advanced passive",
    lessons: [
      {
        id: "b2-passive-1",
        titleEs: "Have something done",
        titleEn: "Have something done",
        vocab: [
          { en: "I had my car repaired", es: "me repararon el coche" },
          { en: "get your hair cut", es: "cortarse el pelo" },
          { en: "have it delivered", es: "que te lo entreguen" },
          { en: "we had our house painted", es: "nos pintaron la casa" },
          { en: "service", es: "servicio" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I had my car ___ yesterday.» (lo llevé al taller)",
            options: ["repaired", "repair", "repairing", "to repair"],
            answer: "repaired",
            explain:
              "«Have + objeto + participio» = pagar o pedir que otro lo haga. «I repaired my car» sería que lo arreglaste tú.",
            speak: "I had my car repaired yesterday.",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «She's getting her hair cut»?",
            options: [
              "Va a la peluquería",
              "Se corta el pelo ella misma",
              "Le crece el pelo",
              "Quiere cortarse el pelo",
            ],
            answer: "Va a la peluquería",
            optionsLang: "es",
            explain:
              "«Get something done» es lo mismo que «have something done», pero más informal: alguien lo hace por ti.",
          },
          {
            kind: "choose",
            prompt: "«We're having the kitchen ___ next week.»",
            options: ["painted", "paint", "painting", "to paint"],
            answer: "painted",
            explain: "Siempre participio detrás del objeto: have + the kitchen + painted.",
            speak: "We're having the kitchen painted next week.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Nos pintaron la casa el año pasado»",
            answer: "we had our house painted last year",
            bank: ["we", "had", "our", "house", "painted", "last", "year", "paint", "was"],
            explain:
              "Fíjate en el orden: had + lo poseído + participio. Y «our house», no «the house»: en inglés se marca de quién es.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Necesito que me corten el pelo» (con «get»)",
            answer: [
              "I need to get my hair cut",
              "I need to get a haircut",
              "I need to have my hair cut",
            ],
            explain: "«Cut» es irregular: su participio también es «cut».",
          },
        ],
      },
      {
        id: "b2-passive-2",
        titleEs: "Se dice que…",
        titleEn: "It is said that…",
        vocab: [
          { en: "it is said that", es: "se dice que" },
          { en: "he is thought to be", es: "se cree que es" },
          { en: "it is believed", es: "se cree" },
          { en: "reportedly", es: "según se informa" },
          { en: "source", es: "fuente" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«It ___ that prices will rise.»",
            options: ["is expected", "expects", "is expecting", "expected"],
            answer: "is expected",
            explain:
              "Pasiva impersonal: «it is said/thought/expected that…». Es el registro de las noticias y los informes.",
            speak: "It is expected that prices will rise.",
          },
          {
            kind: "choose",
            prompt: "«He ___ to be the best player in the team.»",
            options: ["is considered", "considers", "is considering", "considered"],
            answer: "is considered",
            explain:
              "La otra forma: sujeto + be + participio + to + infinitivo. «He is considered to be…» = se le considera…",
            speak: "He is considered to be the best player in the team.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál traduce «Se dice que es muy rico»?",
            options: [
              "He is said to be very rich",
              "It says he is very rich",
              "They say him very rich",
              "He says to be very rich",
            ],
            answer: "He is said to be very rich",
            explain:
              "El «se» impersonal español se resuelve con pasiva. «He is said to be…» o «It is said that he is…».",
            speak: "He is said to be very rich.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Se cree que el edificio es muy antiguo»",
            answer: "the building is believed to be very old",
            bank: ["the", "building", "is", "believed", "to", "be", "very", "old", "believes"],
            explain: "Sujeto + is believed + to be + adjetivo. Nada de «it believes».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Se dice que…» (4 palabras, empezando por «it»)",
            answer: ["it is said that", "it's said that"],
            explain:
              "Fórmula fija de registro formal. En conversación es más normal «they say that…» o «apparently».",
          },
        ],
      },
      {
        id: "b2-passive-3",
        titleEs: "Pasiva con modales y dos objetos",
        titleEn: "Passive with modals and two objects",
        vocab: [
          { en: "it must be done", es: "hay que hacerlo" },
          { en: "it can be repaired", es: "se puede reparar" },
          { en: "I was given a prize", es: "me dieron un premio" },
          { en: "she was offered a job", es: "le ofrecieron un trabajo" },
          { en: "deadline", es: "fecha límite" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«The report ___ before Friday.»",
            options: ["must be finished", "must finish", "must be finish", "must finished"],
            answer: "must be finished",
            explain:
              "Modal + be + participio. El modal no cambia nunca: must be done, can be repaired, should be sent.",
            speak: "The report must be finished before Friday.",
          },
          {
            kind: "choose",
            prompt: "«I ___ a prize for my work.»",
            options: ["was given", "was gave", "gave me", "was given to"],
            answer: "was given",
            explain:
              "Con verbos de dos objetos (give, offer, send…) la persona puede ser el sujeto de la pasiva: «I was given a prize».",
            speak: "I was given a prize for my work.",
          },
          {
            kind: "choose",
            prompt: "«This problem ___ easily.»",
            options: ["can be solved", "can solve", "can be solve", "is can solved"],
            answer: "can be solved",
            explain: "can + be + participio. «Solve» → «solved».",
            speak: "This problem can be solved easily.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Le ofrecieron un trabajo en Londres»",
            answer: "she was offered a job in London",
            bank: ["she", "was", "offered", "a", "job", "in", "London", "offer", "to"],
            explain:
              "La persona pasa a sujeto: «she was offered». Traducirlo como «a job was offered to her» es correcto pero suena raro.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Hay que hacerlo hoy» (con «must», 4 palabras + hoy)",
            answer: ["it must be done today"],
            explain:
              "El «hay que» impersonal se resuelve con pasiva + modal: it must be done.",
          },
        ],
      },
    ],
  },

  /* ---------------- Conectar y matizar ---------------- */
  {
    id: "b2-discourse",
    level: "B2",
    titleEs: "Conectar y matizar",
    titleEn: "Linking and hedging",
    lessons: [
      {
        id: "b2-discourse-1",
        titleEs: "Contraste y adición formales",
        titleEn: "Formal contrast and addition",
        vocab: [
          { en: "whereas", es: "mientras que" },
          { en: "nevertheless", es: "no obstante" },
          { en: "moreover", es: "además" },
          { en: "therefore", es: "por lo tanto" },
          { en: "in contrast", es: "en cambio" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«He earns a lot, ___ his brother earns very little.»",
            options: ["whereas", "however", "despite", "moreover"],
            answer: "whereas",
            explain:
              "«Whereas» une dos mitades de la MISMA frase para contrastarlas. «However» abre frase nueva con coma.",
            speak: "He earns a lot, whereas his brother earns very little.",
          },
          {
            kind: "choose",
            prompt: "«The plan is risky. ___, we have no choice.»",
            options: ["Nevertheless", "Whereas", "Moreover", "Because"],
            answer: "Nevertheless",
            explain:
              "«Nevertheless» = no obstante: concede lo dicho y lo contradice. Va al principio y con coma.",
            speak: "The plan is risky. Nevertheless, we have no choice.",
          },
          {
            kind: "choose",
            prompt: "«The flat is small. ___, it's very expensive.»",
            options: ["Moreover", "Therefore", "Whereas", "In contrast"],
            answer: "Moreover",
            explain:
              "«Moreover» suma un argumento en la misma dirección (otra pega). «Therefore» introduciría una consecuencia.",
            speak: "The flat is small. Moreover, it's very expensive.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Llovía, por lo tanto cancelamos el partido»",
            answer: "it was raining therefore we cancelled the match",
            bank: [
              "it",
              "was",
              "raining",
              "therefore",
              "we",
              "cancelled",
              "the",
              "match",
              "however",
            ],
            explain: "«Therefore» introduce la consecuencia; es el «por lo tanto» de registro formal.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «mientras que» (una palabra, para contrastar dos ideas)",
            answer: ["whereas", "while"],
            explain:
              "«Whereas» solo contrasta. «While» sirve para contrastar y también para tiempo («mientras»), así que puede ser ambiguo.",
          },
        ],
      },
      {
        id: "b2-discourse-2",
        titleEs: "Condiciones y precauciones",
        titleEn: "Conditions and precautions",
        vocab: [
          { en: "provided that", es: "siempre que" },
          { en: "in case", es: "por si acaso" },
          { en: "unless", es: "a menos que" },
          { en: "even if", es: "aunque / incluso si" },
          { en: "just in case", es: "por si acaso" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Take an umbrella ___ it rains.» (por si acaso)",
            options: ["in case", "if", "unless", "provided that"],
            answer: "in case",
            explain:
              "«In case» = por prevención, ANTES de que pase. «If it rains, take an umbrella» sería cogerlo solo si ya llueve.",
            speak: "Take an umbrella in case it rains.",
          },
          {
            kind: "choose",
            prompt: "«You can borrow it ___ you return it tomorrow.»",
            options: ["provided that", "in case", "even if", "unless"],
            answer: "provided that",
            explain:
              "«Provided/providing that» = siempre que, con la condición de que. Es más formal que «as long as».",
            speak: "You can borrow it provided that you return it tomorrow.",
          },
          {
            kind: "choose",
            prompt: "«___ we leave now, we'll be late.» (aunque salgamos ya)",
            options: ["Even if", "In case", "Unless", "Provided that"],
            answer: "Even if",
            explain:
              "«Even if» = aunque, incluso en ese supuesto. «Even though» sería sobre un hecho real, no hipotético.",
            speak: "Even if we leave now, we'll be late.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «No iré a menos que me invites»",
            answer: "I won't go unless you invite me",
            bank: ["I", "won't", "go", "unless", "you", "invite", "me", "don't", "if"],
            explain:
              "«Unless» ya lleva la negación: nada de «unless you don't invite me». Y tras él, presente.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «por si acaso» (3 palabras, al final de la frase)",
            answer: ["just in case"],
            explain:
              "«Just in case» puede ir solo al final: «Take some cash, just in case».",
          },
        ],
      },
      {
        id: "b2-discourse-3",
        titleEs: "Suavizar lo que dices",
        titleEn: "Softening what you say",
        vocab: [
          { en: "it tends to be", es: "suele ser" },
          { en: "it seems that", es: "parece que" },
          { en: "somewhat", es: "algo / un tanto" },
          { en: "I'm not entirely sure", es: "no estoy del todo seguro" },
          { en: "to some extent", es: "hasta cierto punto" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál suena más profesional al discrepar?",
            options: [
              "I'm not entirely sure I agree",
              "You are wrong",
              "That's not true",
              "No, that's bad",
            ],
            answer: "I'm not entirely sure I agree",
            explain:
              "El inglés profesional suaviza casi todo. Decir «you are wrong» en una reunión suena agresivo aunque tengas razón.",
            speak: "I'm not entirely sure I agree.",
          },
          {
            kind: "choose",
            prompt: "«Prices ___ to rise in December.»",
            options: ["tend", "tends", "are tending", "tended"],
            answer: "tend",
            explain:
              "«Tend to + base» = soler. «Prices» es plural, así que sin -s. Es la forma neutra de generalizar sin exagerar.",
            speak: "Prices tend to rise in December.",
          },
          {
            kind: "choose",
            prompt: "«The results were ___ disappointing.» (un tanto)",
            options: ["somewhat", "very much", "too much", "quite a"],
            answer: "somewhat",
            explain:
              "«Somewhat» baja la intensidad: decepcionantes, pero sin dramatizar. Es típico del registro escrito formal.",
            speak: "The results were somewhat disappointing.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Parece que hubo un error»",
            answer: "it seems that there was a mistake",
            bank: ["it", "seems", "that", "there", "was", "a", "mistake", "is", "have"],
            explain:
              "«It seems that…» evita acusar a nadie: es la forma educada de señalar un problema.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «hasta cierto punto» (4 palabras)",
            answer: ["to some extent", "to a certain extent"],
            explain:
              "Sirve para dar la razón a medias: «I agree to some extent, but…».",
          },
        ],
      },
    ],
  },

  /* ---------------- Patrones verbales ---------------- */
  {
    id: "b2-patterns",
    level: "B2",
    titleEs: "Patrones verbales",
    titleEn: "Verb patterns",
    lessons: [
      {
        id: "b2-patterns-1",
        titleEs: "-ing o «to» cambia el significado",
        titleEn: "-ing or to changes the meaning",
        vocab: [
          { en: "stop smoking", es: "dejar de fumar" },
          { en: "stop to smoke", es: "parar para fumar" },
          { en: "remember to call", es: "acordarse de llamar" },
          { en: "remember calling", es: "recordar haber llamado" },
          { en: "try doing", es: "probar a hacer" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«He stopped ___ two years ago.» (lo dejó)",
            options: ["smoking", "to smoke", "smoke", "smoked"],
            answer: "smoking",
            explain:
              "«Stop + -ing» = dejar de hacerlo. «Stop to smoke» sería parar (el coche, el trabajo) PARA fumar.",
            speak: "He stopped smoking two years ago.",
          },
          {
            kind: "choose",
            prompt: "«Remember ___ the door when you leave.»",
            options: ["to lock", "locking", "lock", "locked"],
            answer: "to lock",
            explain:
              "«Remember to + base» = acuérdate de hacerlo (futuro). «Remember locking» sería recordar que ya lo hiciste.",
            speak: "Remember to lock the door when you leave.",
          },
          {
            kind: "choose",
            prompt: "«I tried ___ the window, but it was still hot.» (probé a)",
            options: ["opening", "to open", "open", "opened"],
            answer: "opening",
            explain:
              "«Try + -ing» = probar algo a ver si funciona. «Try to open» sería intentarlo con esfuerzo (y quizá no lograrlo).",
            speak: "I tried opening the window, but it was still hot.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Recuerdo haberla conocido en Madrid»",
            answer: "I remember meeting her in Madrid",
            bank: ["I", "remember", "meeting", "her", "in", "Madrid", "to", "meet"],
            explain: "Recuerdo de algo YA hecho → «remember + -ing».",
          },
          {
            kind: "type",
            prompt: "Completa: «I regret ___ (tell) him the truth» (me arrepiento de haberlo dicho)",
            answer: ["telling"],
            explain:
              "«Regret + -ing» = arrepentirse de algo hecho. «Regret to tell you» sería dar una mala noticia formalmente.",
          },
        ],
      },
      {
        id: "b2-patterns-2",
        titleEs: "Verbos con preposición fija",
        titleEn: "Verbs with fixed prepositions",
        vocab: [
          { en: "depend on", es: "depender de" },
          { en: "accuse someone of", es: "acusar a alguien de" },
          { en: "insist on", es: "insistir en" },
          { en: "apologise for", es: "pedir perdón por" },
          { en: "succeed in", es: "lograr" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«It depends ___ the weather.»",
            options: ["on", "of", "in", "from"],
            answer: "on",
            explain:
              "«Depend ON», nunca «depend of» (calco del español «depender de»). Es de los errores que más se repiten.",
            speak: "It depends on the weather.",
          },
          {
            kind: "choose",
            prompt: "«She insisted ___ paying for dinner.»",
            options: ["on", "in", "to", "for"],
            answer: "on",
            explain:
              "«Insist on + -ing». Tras preposición SIEMPRE va -ing, nunca infinitivo: insist on paying.",
            speak: "She insisted on paying for dinner.",
          },
          {
            kind: "choose",
            prompt: "«He apologised ___ being late.»",
            options: ["for", "of", "about", "to"],
            answer: "for",
            explain:
              "«Apologise FOR something» (y «apologise TO someone»): «he apologised to me for being late».",
            speak: "He apologised for being late.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Me acusaron de mentir»",
            answer: "they accused me of lying",
            bank: ["they", "accused", "me", "of", "lying", "to", "lie", "for"],
            explain: "«Accuse somebody OF + -ing». Tras «of» va gerundio: of lying.",
          },
          {
            kind: "type",
            prompt: "Completa: «We finally succeeded ___ finding a flat» (una palabra)",
            answer: ["in"],
            explain: "«Succeed IN + -ing» = lograr hacer algo. No es «succeed to».",
          },
        ],
      },
      {
        id: "b2-patterns-3",
        titleEs: "Phrasal verbs que separan",
        titleEn: "Separable phrasal verbs",
        vocab: [
          { en: "turn it down", es: "rechazarlo / bajarlo" },
          { en: "call it off", es: "cancelarlo" },
          { en: "look it up", es: "buscarlo (en un diccionario)" },
          { en: "put up with", es: "aguantar" },
          { en: "run out of", es: "quedarse sin" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "They called the meeting off",
              "They called off it",
              "They called it off the meeting",
              "They off called the meeting",
            ],
            answer: "They called the meeting off",
            explain:
              "«Call off» es separable: puedes decir «call off the meeting» o «call the meeting off». Pero con pronombre SOLO en medio: «call it off».",
            speak: "They called the meeting off.",
          },
          {
            kind: "choose",
            prompt: "«I don't know this word. I'll ___.»",
            options: ["look it up", "look up it", "look it for", "up look it"],
            answer: "look it up",
            explain: "Con pronombre, obligatorio en medio: look IT up, turn IT down, call IT off.",
            speak: "I don't know this word. I'll look it up.",
          },
          {
            kind: "choose",
            prompt: "«I can't ___ this noise any longer.» (aguantar)",
            options: ["put up with", "put up", "put on", "put off"],
            answer: "put up with",
            explain:
              "«Put up with» lleva tres piezas y NO se separa nunca: I can't put up with it.",
            speak: "I can't put up with this noise any longer.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Nos quedamos sin gasolina»",
            answer: "we ran out of petrol",
            bank: ["we", "ran", "out", "of", "petrol", "run", "without"],
            explain:
              "«Run out of» = quedarse sin. Pasado: ran. En EE. UU. «gas» en vez de «petrol».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Rechazó la oferta» (con «turn down», 4 palabras)",
            answer: [
              "she turned down the offer",
              "he turned down the offer",
              "she turned the offer down",
              "he turned the offer down",
            ],
            explain:
              "«Turn down» = rechazar (y también bajar el volumen). El contexto lo aclara.",
          },
        ],
      },
    ],
  },

  /* ---------------- Sonar natural ---------------- */
  {
    id: "b2-natural",
    level: "B2",
    titleEs: "Sonar natural",
    titleEn: "Sounding natural",
    lessons: [
      {
        id: "b2-natural-1",
        titleEs: "Make, do, take, have",
        titleEn: "Make, do, take, have",
        vocab: [
          { en: "make a decision", es: "tomar una decisión" },
          { en: "do business", es: "hacer negocios" },
          { en: "take a break", es: "tomarse un descanso" },
          { en: "have an argument", es: "tener una discusión" },
          { en: "make progress", es: "progresar" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«We need to ___ a decision today.»",
            options: ["make", "take", "do", "have"],
            answer: "make",
            explain:
              "En inglés las decisiones se HACEN: make a decision. El español «tomar» engaña; «take a decision» solo se oye en británico muy formal.",
            speak: "We need to make a decision today.",
          },
          {
            kind: "choose",
            prompt: "«I have to ___ my homework.»",
            options: ["do", "make", "take", "have"],
            answer: "do",
            explain:
              "Regla útil: «do» para tareas y trabajos (do homework, do the dishes), «make» para crear algo (make a cake, make a plan).",
            speak: "I have to do my homework.",
          },
          {
            kind: "choose",
            prompt: "«Let's ___ a break.»",
            options: ["take", "do", "make", "give"],
            answer: "take",
            explain: "«Take a break», «take a shower», «take a photo»: son combinaciones fijas.",
            speak: "Let's take a break.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Estamos progresando mucho»",
            answer: "we are making a lot of progress",
            bank: ["we", "are", "making", "a", "lot", "of", "progress", "doing", "much"],
            explain:
              "«Make progress», y «progress» es incontable: «a lot of progress», nunca «progresses».",
          },
          {
            kind: "type",
            prompt: "Completa: «They had an ___ about money» (una discusión)",
            answer: ["argument"],
            explain:
              "«Have an argument» = discutir. Ojo: «argument» es discusión, no «argumento» (eso es «point» o «reason»).",
          },
        ],
      },
      {
        id: "b2-natural-2",
        titleEs: "Formal e informal",
        titleEn: "Formal and informal",
        vocab: [
          { en: "I would like to enquire", es: "quisiera consultar" },
          { en: "get in touch", es: "ponerse en contacto" },
          { en: "look forward to hearing", es: "quedo a la espera" },
          { en: "sort it out", es: "solucionarlo" },
          { en: "kind regards", es: "un saludo cordial" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "En un correo formal, ¿cómo pides información?",
            options: [
              "I would like to enquire about",
              "I wanna know about",
              "Tell me about",
              "Give me info about",
            ],
            answer: "I would like to enquire about",
            explain:
              "El registro formal usa verbos largos de origen latino (enquire, receive, request); el informal, phrasal verbs (ask about, get, find out).",
            speak: "I would like to enquire about the position.",
          },
          {
            kind: "choose",
            prompt: "«I look forward to ___ from you.»",
            options: ["hearing", "hear", "have heard", "listen"],
            answer: "hearing",
            explain:
              "Aquí «to» es preposición, no infinitivo: por eso va -ing. «Look forward to hearing/seeing/meeting».",
            speak: "I look forward to hearing from you.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es la versión informal de «We will resolve the issue»?",
            options: [
              "We'll sort it out",
              "We shall resolve it",
              "The issue will be resolved",
              "We are to resolve it",
            ],
            answer: "We'll sort it out",
            explain:
              "Los phrasal verbs son la marca del inglés informal: sort out, find out, put off, deal with.",
            speak: "We'll sort it out.",
          },
          {
            kind: "bank",
            prompt: "Traduce (informal): «Te escribo luego»",
            answer: "I'll get in touch later",
            bank: ["I'll", "get", "in", "touch", "later", "will", "contact"],
            explain: "«Get in touch» = ponerse en contacto. Formal sería «I will contact you».",
          },
          {
            kind: "type",
            prompt: "Cierre de un correo formal en inglés (2 palabras, empieza por «kind»)",
            answer: ["kind regards", "kindest regards"],
            explain:
              "«Kind regards» o «Best regards» cierran un correo profesional. «Yours sincerely» es más rígido y va con nombre.",
          },
        ],
      },
      {
        id: "b2-natural-3",
        titleEs: "Dar énfasis",
        titleEn: "Adding emphasis",
        vocab: [
          { en: "what I need is", es: "lo que necesito es" },
          { en: "it was John who", es: "fue John quien" },
          { en: "I do believe", es: "de verdad que creo" },
          { en: "not only… but also", es: "no solo… sino también" },
          { en: "never have I seen", es: "nunca había visto" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se enfatiza «I need a holiday»?",
            options: [
              "What I need is a holiday",
              "I need very a holiday",
              "That I need is a holiday",
              "It needs a holiday",
            ],
            answer: "What I need is a holiday",
            explain:
              "Estructura «cleft»: What + sujeto + verbo + is/was… Coloca el foco en lo que va detrás.",
            speak: "What I need is a holiday.",
          },
          {
            kind: "choose",
            prompt: "«___ John who broke the window.» (fue él, no otro)",
            options: ["It was", "There was", "That was", "He was"],
            answer: "It was",
            explain:
              "«It was X who/that…» señala al responsable. Es la forma natural de corregir a alguien.",
            speak: "It was John who broke the window.",
          },
          {
            kind: "choose",
            prompt: "«I ___ like it, I love it.» (énfasis con «do»)",
            options: ["don't just", "do not", "am", "does"],
            answer: "don't just",
            explain:
              "El auxiliar «do» también enfatiza en afirmativo: «I DO like it». Aquí la fórmula «don't just… I…» refuerza el contraste.",
            speak: "I don't just like it, I love it.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «No solo es barato, sino que también es bueno»",
            answer: "not only is it cheap but it is also good",
            bank: ["not", "only", "is", "is", "it", "it", "cheap", "but", "also", "good"],
            explain:
              "Tras «not only» al principio de frase hay INVERSIÓN: «not only IS IT», no «not only it is».",
          },
          {
            kind: "type",
            prompt: "Completa el énfasis: «___ have I seen such a mess» (nunca)",
            answer: ["never"],
            explain:
              "Con «never» al principio también se invierte: «Never have I seen…». Es literario, pero aparece en discursos y titulares.",
          },
        ],
      },
    ],
  },
];
