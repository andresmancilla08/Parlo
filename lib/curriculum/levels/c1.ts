import type { Unit } from "../types";

// Nivel C1. Explicaciones SIEMPRE en español: es el diferenciador.
// C1 ya no es «entenderse»: es elegir la forma exacta, el registro correcto y
// sonar como alguien que piensa en inglés, no que traduce.
export const c1: Unit[] = [
  /* ---------------- Inversión y énfasis ---------------- */
  {
    id: "c1-inversion",
    level: "C1",
    titleEs: "Inversión y énfasis",
    titleEn: "Inversion and emphasis",
    lessons: [
      {
        id: "c1-inversion-1",
        titleEs: "Negativo al principio",
        titleEn: "Fronted negatives",
        vocab: [
          { en: "never before had I", es: "nunca antes había" },
          { en: "rarely do we see", es: "rara vez vemos" },
          { en: "under no circumstances", es: "bajo ninguna circunstancia" },
          { en: "at no point did he", es: "en ningún momento él" },
          { en: "little did she know", es: "poco se imaginaba" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Never before ___ such a mess.»",
            options: ["had I seen", "I had seen", "I saw", "did I saw"],
            answer: "had I seen",
            explain:
              "Con una expresión negativa al principio, el auxiliar se adelanta al sujeto, como en una pregunta: had I seen.",
            speak: "Never before had I seen such a mess.",
          },
          {
            kind: "choose",
            prompt: "«Rarely ___ such commitment in a junior.»",
            options: ["do we see", "we see", "we do see", "see we"],
            answer: "do we see",
            explain:
              "Si el verbo no tiene auxiliar propio, aparece «do/does/did» para poder invertir: rarely DO WE see.",
            speak: "Rarely do we see such commitment in a junior.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "Under no circumstances should you sign it",
              "Under no circumstances you should sign it",
              "Under no circumstances you sign it",
              "Under no circumstances signing it",
            ],
            answer: "Under no circumstances should you sign it",
            explain:
              "«Under no circumstances» es negativo: obliga a invertir. Es la fórmula de los avisos y los contratos.",
            speak: "Under no circumstances should you sign it.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Poco se imaginaba que iba a ganar»",
            answer: "little did she know she was going to win",
            bank: [
              "little","did","she","know","she","was","going","to","win","knew","that",
            ],
            explain:
              "«Little did she know» es una fórmula fija de narración: literalmente «poco sabía ella».",
          },
          {
            kind: "type",
            prompt: "Completa: «At no point ___ he mention the price» (una palabra)",
            answer: ["did"],
            explain:
              "«At no point» exige inversión y, sin auxiliar propio, entra «did» + verbo base: did he mention.",
          },
        ],
      },
      {
        id: "c1-inversion-2",
        titleEs: "Hardly, no sooner, only",
        titleEn: "Hardly, no sooner, only",
        vocab: [
          { en: "hardly had I arrived", es: "apenas había llegado" },
          { en: "no sooner had we left", es: "nada más salir" },
          { en: "only then did I realise", es: "solo entonces me di cuenta" },
          { en: "not until later", es: "no hasta más tarde" },
          { en: "scarcely", es: "apenas" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Hardly ___ when the phone rang.»",
            options: ["had I arrived", "I had arrived", "did I arrive", "I arrived"],
            answer: "had I arrived",
            explain:
              "«Hardly» + past perfect invertido, y la segunda parte con «when»: hardly had I arrived WHEN…",
            speak: "Hardly had I arrived when the phone rang.",
          },
          {
            kind: "choose",
            prompt: "«No sooner had we left ___ it started to rain.»",
            options: ["than", "when", "that", "then"],
            answer: "than",
            explain:
              "«No sooner… THAN» (no «when»); «hardly/scarcely… WHEN». Es el par que más se cruza.",
            speak: "No sooner had we left than it started to rain.",
          },
          {
            kind: "choose",
            prompt: "«Only when I read it again ___ the mistake.»",
            options: ["did I notice", "I noticed", "I did notice", "noticed I"],
            answer: "did I notice",
            explain:
              "Con «only + expresión de tiempo» al principio, la inversión va en la oración PRINCIPAL, no en la subordinada.",
            speak: "Only when I read it again did I notice the mistake.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Solo entonces me di cuenta del error»",
            answer: "only then did I realise the mistake",
            bank: ["only", "then", "did", "I", "realise", "the", "mistake", "realised"],
            explain: "Tras «did», verbo base: did I REALISE, nunca «did I realised».",
          },
          {
            kind: "type",
            prompt: "Completa: «No sooner ___ he sat down than the bell rang» (una palabra)",
            answer: ["had"],
            explain: "«No sooner» va siempre con past perfect: no sooner HAD he sat down.",
          },
        ],
      },
      {
        id: "c1-inversion-3",
        titleEs: "So, such y condicionales sin «if»",
        titleEn: "So, such and if-less conditionals",
        vocab: [
          { en: "so tired was I", es: "tan cansado estaba" },
          { en: "such was the noise", es: "tal era el ruido" },
          { en: "had I known", es: "de haberlo sabido" },
          { en: "were I you", es: "si yo fuera tú" },
          { en: "should you need", es: "si necesitaras" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ I known, I would have called.» (de haberlo sabido)",
            options: ["Had", "If", "Would", "Should"],
            answer: "Had",
            explain:
              "El condicional formal se hace SIN «if», invirtiendo: Had I known = If I had known.",
            speak: "Had I known, I would have called.",
          },
          {
            kind: "choose",
            prompt: "«___ you need any help, just ask.» (registro formal)",
            options: ["Should", "Would", "Had", "Were"],
            answer: "Should",
            explain:
              "«Should you need…» = si llegaras a necesitar. Es el tono de los correos formales y los manuales.",
            speak: "Should you need any help, just ask.",
          },
          {
            kind: "choose",
            prompt: "«___ was the noise that we couldn't sleep.»",
            options: ["Such", "So", "That", "So much"],
            answer: "Such",
            explain:
              "«Such + sustantivo» (such was the noise) frente a «so + adjetivo» (so loud was the noise).",
            speak: "Such was the noise that we couldn't sleep.",
          },
          {
            kind: "bank",
            prompt: "Traduce (formal): «Si yo fuera tú, lo pensaría dos veces»",
            answer: "were I you I would think twice",
            bank: ["were", "I", "you", "I", "would", "think", "twice", "was", "if"],
            explain:
              "«Were I you» es la versión invertida y formal de «if I were you». Nunca «was I you».",
          },
          {
            kind: "type",
            prompt: "Completa: «So exhausted ___ he that he fell asleep» (una palabra)",
            answer: ["was"],
            explain:
              "Con «so + adjetivo» al principio también hay inversión: so exhausted WAS HE.",
          },
        ],
      },
    ],
  },

  /* ---------------- Matices modales ---------------- */
  {
    id: "c1-nuance",
    level: "C1",
    titleEs: "Matices modales",
    titleEn: "Modal nuance",
    lessons: [
      {
        id: "c1-nuance-1",
        titleEs: "Reproche y arrepentimiento",
        titleEn: "Criticism and regret",
        vocab: [
          { en: "you needn't have paid", es: "no hacía falta que pagaras" },
          { en: "she must have forgotten", es: "se le debe de haber olvidado" },
          { en: "he might have told us", es: "podría habérnoslo dicho" },
          { en: "I could have sworn", es: "habría jurado" },
          { en: "you shouldn't have", es: "no tenías que haberlo hecho" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«You ___ paid: it was already covered.»",
            options: ["needn't have", "mustn't have", "shouldn't", "couldn't have"],
            answer: "needn't have",
            explain:
              "«Needn't have + participio» = lo hiciste y no hacía falta. «Didn't need to» sería que no hacía falta y NO lo hiciste.",
            speak: "You needn't have paid: it was already covered.",
          },
          {
            kind: "choose",
            prompt: "«He ___ told us! We had no idea.» (reproche)",
            options: ["might have", "must have", "should", "can have"],
            answer: "might have",
            explain:
              "«Might have + participio» con tono de queja: podría habérnoslo dicho y no lo hizo.",
            speak: "He might have told us! We had no idea.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál expresa una deducción sobre el pasado?",
            options: [
              "She must have forgotten",
              "She must forget",
              "She should have forgotten",
              "She can forget",
            ],
            answer: "She must have forgotten",
            explain:
              "«Must have + participio» deduce sobre lo ya ocurrido: seguro que se le olvidó.",
            speak: "She must have forgotten.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «No tenías que haberte molestado»",
            answer: "you shouldn't have bothered",
            bank: ["you", "shouldn't", "have", "bothered", "needn't", "bother"],
            explain:
              "«You shouldn't have» a secas es la fórmula social al recibir un regalo: no hacía falta.",
          },
          {
            kind: "type",
            prompt: "Completa: «I could have ___ I left the keys here» (jurado)",
            answer: ["sworn"],
            explain: "swear → swore → sworn. «I could have sworn…» = habría jurado que…",
          },
        ],
      },
      {
        id: "c1-nuance-2",
        titleEs: "Grados de probabilidad",
        titleEn: "Degrees of likelihood",
        vocab: [
          { en: "it may well be", es: "bien puede ser" },
          { en: "he is bound to", es: "seguro que va a" },
          { en: "she is unlikely to", es: "es poco probable que" },
          { en: "there is every chance", es: "hay muchas probabilidades" },
          { en: "I doubt whether", es: "dudo que" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«It ___ be the best option we have.» (bastante probable)",
            options: ["may well", "may good", "well may be", "should well"],
            answer: "may well",
            explain:
              "«May well» sube la probabilidad de «may»: no es un simple quizá, es «bien puede ser».",
            speak: "It may well be the best option we have.",
          },
          {
            kind: "choose",
            prompt: "«With that traffic, he ___ be late.» (seguro)",
            options: ["is bound to", "is likely", "must to", "will bound"],
            answer: "is bound to",
            explain: "«Be bound to» = es inevitable, seguro que pasa. Siempre con «to» + base.",
            speak: "With that traffic, he is bound to be late.",
          },
          {
            kind: "choose",
            prompt: "«She ___ accept the offer.» (poco probable)",
            options: ["is unlikely to", "is not likely accept", "unlikely will", "is unlike to"],
            answer: "is unlikely to",
            explain:
              "«Be (un)likely TO + base». Ojo: «unlike» sin -ly es «a diferencia de», otra palabra.",
            speak: "She is unlikely to accept the offer.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Dudo que llegue a tiempo»",
            answer: "I doubt whether he will arrive on time",
            bank: ["I", "doubt", "whether", "he", "will", "arrive", "on", "time", "that", "in"],
            explain:
              "«Doubt whether/if» es lo natural en registro cuidado. Y puntualidad con «on time».",
          },
          {
            kind: "type",
            prompt: "Completa: «There is every ___ that it will work» (una palabra)",
            answer: ["chance"],
            explain: "«There is every chance» = hay muchas probabilidades. Fórmula fija.",
          },
        ],
      },
      {
        id: "c1-nuance-3",
        titleEs: "Distancia y cortesía extrema",
        titleEn: "Distancing and extreme politeness",
        vocab: [
          { en: "I was wondering whether", es: "me preguntaba si" },
          { en: "would you mind if", es: "te importaría que" },
          { en: "I would appreciate it if", es: "te agradecería que" },
          { en: "it would seem that", es: "todo apunta a que" },
          { en: "apparently", es: "por lo visto" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál es la petición MÁS educada?",
            options: [
              "I was wondering whether you could help",
              "Can you help",
              "Could you help",
              "Help me please",
            ],
            answer: "I was wondering whether you could help",
            explain:
              "El pasado y el rodeo crean distancia, y la distancia es cortesía: «I was wondering whether…» es el tope formal.",
            speak: "I was wondering whether you could help.",
          },
          {
            kind: "choose",
            prompt: "«Would you mind ___ the window?»",
            options: ["opening", "to open", "open", "if you open"],
            answer: "opening",
            explain:
              "«Would you mind + -ing». Y ojo con la respuesta: «No, not at all» significa que SÍ lo hace.",
            speak: "Would you mind opening the window?",
          },
          {
            kind: "choose",
            prompt: "«I would appreciate it ___ you could reply today.»",
            options: ["if", "that", "when", "whether"],
            answer: "if",
            explain:
              "«I would appreciate IT IF…»: el «it» es obligatorio y se cae siempre al traducir del español.",
            speak: "I would appreciate it if you could reply today.",
          },
          {
            kind: "bank",
            prompt: "Traduce (suavizado): «Parece que hubo un malentendido»",
            answer: "it would seem that there was a misunderstanding",
            bank: [
              "it","would","seem","that","there","was","a","misunderstanding","seems","is",
            ],
            explain:
              "«It would seem that…» es aún más prudente que «it seems»: no señala a nadie.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «por lo visto» (una palabra)",
            answer: ["apparently"],
            explain:
              "«Apparently» marca que lo cuentas de oídas, sin comprometerte con que sea cierto.",
          },
        ],
      },
    ],
  },

  /* ---------------- Cláusulas reducidas ---------------- */
  {
    id: "c1-participle",
    level: "C1",
    titleEs: "Frases más compactas",
    titleEn: "Tighter sentences",
    lessons: [
      {
        id: "c1-participle-1",
        titleEs: "Cláusulas de participio",
        titleEn: "Participle clauses",
        vocab: [
          { en: "having finished the report", es: "una vez terminado el informe" },
          { en: "walking home, I saw", es: "yendo a casa, vi" },
          { en: "written in 1920", es: "escrito en 1920" },
          { en: "being new here", es: "al ser nuevo aquí" },
          { en: "once completed", es: "una vez completado" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ the report, she went home.» (una vez terminado)",
            options: ["Having finished", "Have finished", "After finish", "Finished"],
            answer: "Having finished",
            explain:
              "«Having + participio» comprime «After she had finished…». Es la marca del inglés escrito culto.",
            speak: "Having finished the report, she went home.",
          },
          {
            kind: "choose",
            prompt: "«___ home, I saw an old friend.»",
            options: ["Walking", "Walked", "I walked", "To walk"],
            answer: "Walking",
            explain:
              "Participio en -ing para la acción simultánea: mientras iba andando. El sujeto debe ser el MISMO en las dos partes.",
            speak: "Walking home, I saw an old friend.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está mal construida?",
            options: [
              "Walking home, the rain started",
              "Walking home, I got wet",
              "Having eaten, we left",
              "Written in 1920, the book still sells",
            ],
            answer: "Walking home, the rain started",
            explain:
              "El sujeto del participio y el de la frase deben coincidir: aquí parecería que la lluvia iba andando a casa.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Al ser nuevo aquí, no conozco a nadie»",
            answer: "being new here I don't know anyone",
            bank: ["being", "new", "here", "I", "don't", "know", "anyone", "am", "somebody"],
            explain:
              "«Being + adjetivo» expresa causa: como soy nuevo. Y en negativa, «anyone», no «someone».",
          },
          {
            kind: "type",
            prompt: "Comprime «After it was completed…»: «Once ___» (una palabra)",
            answer: ["completed"],
            explain:
              "Con once/when/if + participio se elimina el sujeto y el verbo «be»: once completed, if approved.",
          },
        ],
      },
      {
        id: "c1-participle-2",
        titleEs: "Nominalizar",
        titleEn: "Nominalisation",
        vocab: [
          { en: "the implementation of", es: "la implantación de" },
          { en: "a lack of resources", es: "falta de recursos" },
          { en: "the failure to comply", es: "el incumplimiento" },
          { en: "an increase in sales", es: "un aumento de ventas" },
          { en: "the arrival of", es: "la llegada de" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Versión formal de «They implemented the system quickly»:",
            options: [
              "The implementation of the system was rapid",
              "The implement of the system was rapid",
              "They implementation the system rapid",
              "The system implemented rapid",
            ],
            answer: "The implementation of the system was rapid",
            explain:
              "Nominalizar (verbo → sustantivo) es lo que da tono de informe: implement → implementation.",
            speak: "The implementation of the system was rapid.",
          },
          {
            kind: "choose",
            prompt: "«There was an increase ___ sales.»",
            options: ["in", "of", "on", "to"],
            answer: "in",
            explain:
              "«An increase IN» algo (la magnitud que sube) y «an increase OF» + cifra: an increase of 5%.",
            speak: "There was an increase in sales.",
          },
          {
            kind: "choose",
            prompt: "«The failure ___ comply led to a fine.»",
            options: ["to", "of", "in", "for"],
            answer: "to",
            explain: "«Failure TO + verbo» = incumplimiento. «Failure of» iría con un sustantivo.",
            speak: "The failure to comply led to a fine.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «La falta de recursos retrasó el proyecto»",
            answer: "a lack of resources delayed the project",
            bank: ["a", "lack", "of", "resources", "delayed", "the", "project", "lacked", "in"],
            explain: "«A lack OF». Y «delay» como verbo transitivo: delayed the project.",
          },
          {
            kind: "type",
            prompt: "Sustantivo de «arrive»:",
            answer: ["arrival"],
            explain:
              "arrive → arrival. Otras: refuse → refusal, decide → decision, analyse → analysis.",
          },
        ],
      },
      {
        id: "c1-participle-3",
        titleEs: "Conectores de registro alto",
        titleEn: "High-register linking",
        vocab: [
          { en: "given that", es: "dado que" },
          { en: "notwithstanding", es: "no obstante" },
          { en: "insofar as", es: "en la medida en que" },
          { en: "thereby", es: "con lo cual" },
          { en: "hence", es: "de ahí que" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ the delay, we decided to postpone.» (dado)",
            options: ["Given", "Giving", "Give", "Gave"],
            answer: "Given",
            explain:
              "«Given + sustantivo» o «given that + frase» = dado (que). Fórmula fija del registro formal.",
            speak: "Given the delay, we decided to postpone.",
          },
          {
            kind: "choose",
            prompt: "«The system failed, ___ delaying the launch.»",
            options: ["thereby", "therefore", "so that", "for"],
            answer: "thereby",
            explain:
              "«Thereby + -ing» encadena la consecuencia dentro de la misma frase, sin punto.",
            speak: "The system failed, thereby delaying the launch.",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «notwithstanding the criticism»?",
            options: [
              "a pesar de las críticas",
              "gracias a las críticas",
              "sin críticas",
              "según las críticas",
            ],
            answer: "a pesar de las críticas",
            optionsLang: "es",
            explain:
              "«Notwithstanding» = a pesar de. Muy formal; puede ir delante o detrás del sustantivo.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Dado que el plazo es corto, empezaremos hoy»",
            answer: "given that the deadline is short we will start today",
            bank: [
              "given","that","the","deadline","is","short","we","will","start","today","because",
            ],
            explain: "«Given that» + frase completa. Con solo un sustantivo bastaría «given».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «de ahí que» (una palabra, formal)",
            answer: ["hence"],
            explain:
              "«Hence» introduce la conclusión: hence the delay. Más rotundo que «so» y más breve que «therefore».",
          },
        ],
      },
    ],
  },

  /* ---------------- Lenguaje idiomático ---------------- */
  {
    id: "c1-idioms",
    level: "C1",
    titleEs: "Hablar con imágenes",
    titleEn: "Idiomatic language",
    lessons: [
      {
        id: "c1-idioms-1",
        titleEs: "Expresiones del día a día",
        titleEn: "Everyday idioms",
        vocab: [
          { en: "get the hang of it", es: "cogerle el truco" },
          { en: "it's not rocket science", es: "no es tan difícil" },
          { en: "call it a day", es: "dejarlo por hoy" },
          { en: "out of the blue", es: "de la nada" },
          { en: "a blessing in disguise", es: "no hay mal que por bien no venga" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Don't worry, you'll ___ it after a week.»",
            options: ["get the hang of", "take the hang of", "get the hand of", "catch the hang"],
            answer: "get the hang of",
            explain: "«Get the hang of something» = cogerle el truco. Se dice tal cual, sin cambios.",
            speak: "You'll get the hang of it after a week.",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «Let's call it a day»?",
            options: [
              "Dejémoslo por hoy",
              "Llamémoslo un día",
              "Pongámosle fecha",
              "Hagámoslo en un día",
            ],
            answer: "Dejémoslo por hoy",
            optionsLang: "es",
            explain:
              "«Call it a day» = dar por terminada la jornada. Traducirlo literal no lleva a ningún sitio.",
          },
          {
            kind: "choose",
            prompt: "«He quit ___.» (de repente, sin avisar)",
            options: ["out of the blue", "out of blue", "from the blue", "in the blue"],
            answer: "out of the blue",
            explain: "«Out of the blue» = de la nada, sin previo aviso. Lleva artículo.",
            speak: "He quit out of the blue.",
          },
          {
            kind: "bank",
            prompt: "Traduce la idea: «Perder ese trabajo fue una bendición»",
            answer: "losing that job was a blessing in disguise",
            bank: [
              "losing","that","job","was","a","blessing","in","disguise","lose","of",
            ],
            explain:
              "«A blessing in disguise» = algo que parecía malo y resultó bueno. Y el sujeto va en -ing: losing.",
          },
          {
            kind: "type",
            prompt: "Completa: «It's not rocket ___» (no es tan difícil)",
            answer: ["science"],
            explain: "«It's not rocket science» = no es tan complicado. Muy usada y algo irónica.",
          },
        ],
      },
      {
        id: "c1-idioms-2",
        titleEs: "En la oficina",
        titleEn: "At the office",
        vocab: [
          { en: "touch base", es: "ponerse al día" },
          { en: "the bottom line", es: "lo esencial" },
          { en: "on the same page", es: "de acuerdo" },
          { en: "a ballpark figure", es: "una cifra aproximada" },
          { en: "hit the nail on the head", es: "dar en el clavo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Let's ___ next week to review progress.»",
            options: ["touch base", "touch bases", "touch the base", "make base"],
            answer: "touch base",
            explain: "«Touch base (with someone)» = hablar brevemente para ponerse al día. Sin artículo.",
            speak: "Let's touch base next week to review progress.",
          },
          {
            kind: "choose",
            prompt: "¿Qué pides con «Can you give me a ballpark figure?»",
            options: [
              "Una cifra aproximada",
              "La cifra exacta",
              "Un informe completo",
              "Una fecha límite",
            ],
            answer: "Una cifra aproximada",
            optionsLang: "es",
            explain: "«Ballpark figure» = orden de magnitud, un número a ojo para orientarse.",
          },
          {
            kind: "choose",
            prompt: "«We need to make sure everyone is ___.»",
            options: [
              "on the same page",
              "in the same page",
              "at the same page",
              "on the same paper",
            ],
            answer: "on the same page",
            explain: "«On the same page» = todos entendiendo lo mismo. Preposición «on».",
            speak: "We need to make sure everyone is on the same page.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Diste en el clavo con ese comentario»",
            answer: "you hit the nail on the head with that comment",
            bank: [
              "you","hit","the","nail","on","the","head","with","that","comment","in",
            ],
            explain: "«Hit the nail on the head» = acertar de pleno. Ni una palabra se cambia.",
          },
          {
            kind: "type",
            prompt: "Completa: «The bottom ___ is that we can't afford it» (lo esencial)",
            answer: ["line"],
            explain:
              "«The bottom line» viene de la última línea del balance: lo que de verdad importa.",
          },
        ],
      },
      {
        id: "c1-idioms-3",
        titleEs: "Cuando algo va mal",
        titleEn: "When things go wrong",
        vocab: [
          { en: "back to square one", es: "vuelta a empezar" },
          { en: "a wake-up call", es: "un toque de atención" },
          { en: "to cut corners", es: "hacer chapuzas por ahorrar" },
          { en: "the last straw", es: "la gota que colma el vaso" },
          { en: "to take the blame", es: "asumir la culpa" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«The client rejected it, so we're ___.»",
            options: ["back to square one", "back to the square one", "in square one", "back at one"],
            answer: "back to square one",
            explain: "«Back to square one» = a empezar de cero otra vez. Sin artículo delante de «square».",
            speak: "The client rejected it, so we're back to square one.",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «They cut corners»?",
            options: [
              "Ahorraron saltándose pasos",
              "Recortaron el presupuesto",
              "Cortaron las esquinas",
              "Tomaron un atajo en el mapa",
            ],
            answer: "Ahorraron saltándose pasos",
            optionsLang: "es",
            explain:
              "«Cut corners» = hacerlo más rápido y peor para ahorrar tiempo o dinero. Siempre negativo.",
          },
          {
            kind: "choose",
            prompt: "«That was ___: I resigned the next day.»",
            options: ["the last straw", "the last drop", "the final drop", "a last straw"],
            answer: "the last straw",
            explain:
              "«The last straw» = la gota que colma el vaso (de «the straw that broke the camel's back»).",
            speak: "That was the last straw: I resigned the next day.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «El incidente fue un toque de atención»",
            answer: "the incident was a wake-up call",
            bank: ["the", "incident", "was", "a", "wake-up", "call", "wake", "up"],
            explain: "«A wake-up call» = un aviso que te obliga a reaccionar. Lleva guion.",
          },
          {
            kind: "type",
            prompt: "Completa: «Someone has to take the ___» (asumir la culpa)",
            answer: ["blame"],
            explain: "«Take the blame» = asumir la culpa; «put the blame on» = echársela a otro.",
          },
        ],
      },
    ],
  },

  /* ---------------- Registro académico ---------------- */
  {
    id: "c1-academic",
    level: "C1",
    titleEs: "Escribir con criterio",
    titleEn: "Academic writing",
    lessons: [
      {
        id: "c1-academic-1",
        titleEs: "Presentar evidencia",
        titleEn: "Presenting evidence",
        vocab: [
          { en: "it is widely acknowledged", es: "está ampliamente admitido" },
          { en: "the data suggest", es: "los datos apuntan a" },
          { en: "according to", es: "según" },
          { en: "a growing body of research", es: "cada vez más estudios" },
          { en: "to date", es: "hasta la fecha" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«It is widely ___ that sleep affects memory.»",
            options: ["acknowledged", "acknowledge", "acknowledging", "acknowledgement"],
            answer: "acknowledged",
            explain:
              "Pasiva impersonal: it is widely acknowledged/accepted/believed THAT… Fórmula de apertura académica.",
            speak: "It is widely acknowledged that sleep affects memory.",
          },
          {
            kind: "choose",
            prompt: "«The data ___ a clear pattern.»",
            options: ["suggest", "suggests", "is suggesting", "are suggest"],
            answer: "suggest",
            explain:
              "«Data» es plural en registro académico (singular: datum), así que «the data suggest».",
            speak: "The data suggest a clear pattern.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "According to the study, prices rose",
              "According the study, prices rose",
              "According with the study, prices rose",
              "In according to the study",
            ],
            answer: "According to the study, prices rose",
            explain:
              "«According TO». Y nunca «according to me»: para tu propia opinión, «in my view».",
            speak: "According to the study, prices rose.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Cada vez más estudios respaldan esta idea»",
            answer: "a growing body of research supports this idea",
            bank: [
              "a","growing","body","of","research","supports","this","idea","support","are",
            ],
            explain:
              "«A growing body of research» es incontable y va en singular: supportS.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «hasta la fecha» (2 palabras)",
            answer: ["to date", "so far"],
            explain: "«To date» es el registro formal; «so far», el neutro.",
          },
        ],
      },
      {
        id: "c1-academic-2",
        titleEs: "Matizar afirmaciones",
        titleEn: "Qualifying claims",
        vocab: [
          { en: "arguably", es: "posiblemente" },
          { en: "to a large extent", es: "en gran medida" },
          { en: "with the exception of", es: "con la excepción de" },
          { en: "this may be attributed to", es: "esto puede deberse a" },
          { en: "further research is needed", es: "hace falta más investigación" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«This is ___ the most important factor.» (defendible, no seguro)",
            options: ["arguably", "argue", "arguable", "argued"],
            answer: "arguably",
            explain:
              "«Arguably» = se puede sostener que. Permite afirmar fuerte sin cerrar el debate.",
            speak: "This is arguably the most important factor.",
          },
          {
            kind: "choose",
            prompt: "«The delay ___ poor planning.»",
            options: [
              "may be attributed to",
              "may attribute to",
              "may be attributed of",
              "may attributed",
            ],
            answer: "may be attributed to",
            explain: "«Be attributed TO»: pasiva + preposición fija. Evita señalar culpables.",
            speak: "The delay may be attributed to poor planning.",
          },
          {
            kind: "choose",
            prompt: "«___ two cases, all patients recovered.»",
            options: [
              "With the exception of",
              "With exception of",
              "In exception of",
              "Except of",
            ],
            answer: "With the exception of",
            explain: "«With the exception of» lleva artículo; la alternativa corta es «except for».",
            speak: "With the exception of two cases, all patients recovered.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Esto explica en gran medida el resultado»",
            answer: "this explains the result to a large extent",
            bank: [
              "this","explains","the","result","to","a","large","extent","explain","in",
            ],
            explain: "«To a large extent» va normalmente al final o al principio de la frase.",
          },
          {
            kind: "type",
            prompt: "Completa el cierre típico: «Further research ___ needed» (una palabra)",
            answer: ["is"],
            explain: "«Research» es incontable: is, no are. Nunca «researches» en este sentido.",
          },
        ],
      },
      {
        id: "c1-academic-3",
        titleEs: "Comparar y concluir",
        titleEn: "Comparing and concluding",
        vocab: [
          { en: "in contrast to", es: "a diferencia de" },
          { en: "likewise", es: "asimismo" },
          { en: "on balance", es: "en conjunto" },
          { en: "the findings indicate", es: "los resultados indican" },
          { en: "in conclusion", es: "en conclusión" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ the previous study, ours used a larger sample.»",
            options: ["In contrast to", "In contrast of", "Contrasting to", "In contrast with of"],
            answer: "In contrast to",
            explain: "«In contrast TO/WITH» + sustantivo. Sin sustantivo se usa «by contrast» solo.",
            speak: "In contrast to the previous study, ours used a larger sample.",
          },
          {
            kind: "choose",
            prompt: "«Sales fell in Europe. ___, they dropped in Asia.» (asimismo)",
            options: ["Likewise", "Otherwise", "Nevertheless", "Whereas"],
            answer: "Likewise",
            explain: "«Likewise» = del mismo modo: añade un caso que va en la misma dirección.",
            speak: "Likewise, they dropped in Asia.",
          },
          {
            kind: "choose",
            prompt: "«___, the benefits outweigh the risks.» (en conjunto)",
            options: ["On balance", "In balance", "At balance", "By balance"],
            answer: "On balance",
            explain: "«On balance» = sopesándolo todo. Introduce la conclusión de un análisis.",
            speak: "On balance, the benefits outweigh the risks.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Los resultados indican una mejora clara»",
            answer: "the findings indicate a clear improvement",
            bank: [
              "the","findings","indicate","a","clear","improvement","indicates","improve",
            ],
            explain: "«Findings» es plural → indicate. Y «improvement», el sustantivo de improve.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «en conclusión» (2 palabras)",
            answer: ["in conclusion", "to conclude"],
            explain: "«In conclusion» o «to conclude». Evita «in resume», que no existe en inglés.",
          },
        ],
      },
    ],
  },

  /* ---------------- Precisión léxica ---------------- */
  {
    id: "c1-precision",
    level: "C1",
    titleEs: "La palabra exacta",
    titleEn: "The precise word",
    lessons: [
      {
        id: "c1-precision-1",
        titleEs: "Verbos de decir",
        titleEn: "Reporting verbs",
        vocab: [
          { en: "he claimed", es: "afirmó (sin pruebas)" },
          { en: "she argued", es: "sostuvo" },
          { en: "they admitted", es: "reconocieron" },
          { en: "he denied", es: "negó" },
          { en: "she pointed out", es: "señaló" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«He ___ that he had never seen the document.» (lo niega)",
            options: ["denied", "refused", "negated", "declined"],
            answer: "denied",
            explain:
              "«Deny» = negar un hecho. «Refuse» es negarse A hacer algo: son cosas distintas.",
            speak: "He denied that he had never seen the document.",
          },
          {
            kind: "choose",
            prompt: "«She ___ paying the fine.» (se negó)",
            options: ["refused to pay", "denied to pay", "refused paying", "denied paying the"],
            answer: "refused to pay",
            explain:
              "«Refuse TO + base». «Deny + -ing» sería negar haberlo hecho: he denied paying = niega que pagara.",
            speak: "She refused to pay the fine.",
          },
          {
            kind: "choose",
            prompt: "¿Qué verbo implica que NO hay pruebas?",
            options: ["claimed", "showed", "proved", "demonstrated"],
            answer: "claimed",
            explain:
              "«Claim» marca distancia: lo dice él, no lo damos por cierto. «State» sería neutro.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Señaló que los datos estaban incompletos»",
            answer: "she pointed out that the data were incomplete",
            bank: [
              "she","pointed","out","that","the","data","were","incomplete","was","point",
            ],
            explain:
              "«Point out» = señalar un hecho. Y «data» en plural en registro cuidado: WERE incomplete.",
          },
          {
            kind: "type",
            prompt: "Completa: «They ___ the mistake» (lo reconocieron)",
            answer: ["admitted", "acknowledged"],
            explain: "«Admit» y «acknowledge» reconocen algo; «admit» insinúa que costó decirlo.",
          },
        ],
      },
      {
        id: "c1-precision-2",
        titleEs: "Parejas que se confunden",
        titleEn: "Commonly confused pairs",
        vocab: [
          { en: "affect / effect", es: "afectar / efecto" },
          { en: "economic / economical", es: "económico / ahorrador" },
          { en: "sensible / sensitive", es: "sensato / sensible" },
          { en: "historic / historical", es: "histórico (memorable) / histórico (del pasado)" },
          { en: "assure / ensure", es: "asegurar (a alguien) / garantizar" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«The decision will ___ everyone.»",
            options: ["affect", "effect", "afect", "effectuate"],
            answer: "affect",
            explain: "«Affect» es el VERBO (afectar); «effect», el sustantivo (el efecto).",
            speak: "The decision will affect everyone.",
          },
          {
            kind: "choose",
            prompt: "«Buying in bulk is more ___.» (sale más barato)",
            options: ["economical", "economic", "economy", "economics"],
            answer: "economical",
            explain:
              "«Economical» = que ahorra. «Economic» es lo relativo a la economía: economic growth.",
            speak: "Buying in bulk is more economical.",
          },
          {
            kind: "choose",
            prompt: "«She's very ___ about criticism.» (le afecta)",
            options: ["sensitive", "sensible", "sensitivity", "sensate"],
            answer: "sensitive",
            explain:
              "Falso amigo doble: «sensitive» = sensible (emocional); «sensible» = sensato, con criterio.",
            speak: "She's very sensitive about criticism.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Esto garantiza que todos reciban el correo»",
            answer: "this ensures that everyone receives the email",
            bank: [
              "this","ensures","that","everyone","receives","the","email","assures","receive",
            ],
            explain:
              "«Ensure» = garantizar que algo pase. «Assure» es tranquilizar a una persona; «insure», el seguro.",
          },
          {
            kind: "type",
            prompt: "Elige el sustantivo: «The ___ of the law was immediate» (efecto)",
            answer: ["effect"],
            explain: "Sustantivo → effect. Truco: «affect» empieza por A de acción (verbo).",
          },
        ],
      },
      {
        id: "c1-precision-3",
        titleEs: "Colocaciones fuertes",
        titleEn: "Strong collocations",
        vocab: [
          { en: "heavy rain", es: "lluvia intensa" },
          { en: "a heated debate", es: "un debate acalorado" },
          { en: "to raise awareness", es: "concienciar" },
          { en: "a narrow escape", es: "un escape por poco" },
          { en: "deeply concerned", es: "profundamente preocupado" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«There was ___ rain all night.»",
            options: ["heavy", "strong", "big", "hard"],
            answer: "heavy",
            explain:
              "La lluvia es «heavy», el viento «strong» y el tráfico «heavy». Son parejas fijas: no se razonan, se aprenden.",
            speak: "There was heavy rain all night.",
          },
          {
            kind: "choose",
            prompt: "«The campaign aims to ___ awareness of the problem.»",
            options: ["raise", "rise", "arise", "lift"],
            answer: "raise",
            explain:
              "«Raise awareness». Y ojo: «raise» lleva objeto; «rise» no (prices rise, you raise prices).",
            speak: "The campaign aims to raise awareness of the problem.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es la combinación natural?",
            options: [
              "deeply concerned",
              "strongly concerned",
              "heavily concerned",
              "highly concerned",
            ],
            answer: "deeply concerned",
            explain:
              "Cada adjetivo tiene su intensificador: deeply concerned, highly unlikely, strongly opposed.",
            speak: "We are deeply concerned about the results.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Fue un debate acalorado»",
            answer: "it was a heated debate",
            bank: ["it", "was", "a", "heated", "debate", "hot", "warm"],
            explain: "El debate se «calienta» con «heated», nunca con «hot» (eso es temperatura).",
          },
          {
            kind: "type",
            prompt: "Completa: «That was a ___ escape» (por poco)",
            answer: ["narrow"],
            explain: "«A narrow escape» = librarse por muy poco. También «a close call».",
          },
        ],
      },
    ],
  },
];
