import type { Unit } from "../types";

// Nivel A2. Explicaciones SIEMPRE en español: es el diferenciador.
export const a2: Unit[] = [
  {
    id: "a2-routines",
    level: "A2",
    titleEs: "Rutinas y presente simple",
    titleEn: "Routines & present simple",
    lessons: [
      {
        id: "a2-routines-1",
        titleEs: "Él, ella… y la -s",
        titleEn: "Third person -s",
        vocab: [
          { en: "she works", es: "ella trabaja" },
          { en: "he goes", es: "él va" },
          { en: "she studies", es: "ella estudia" },
          { en: "he watches", es: "él ve (mira)" },
          { en: "it costs", es: "cuesta" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«She ___ in a bank.» (trabajar)",
            options: ["work", "works", "working", "is work"],
            answer: "works",
            explain:
              "Con he/she/it el presente simple lleva -s: I work, pero she workS. Es el error nº1 de los hispanohablantes.",
            speak: "she works in a bank",
          },
          {
            kind: "choose",
            prompt: "«He ___ to the gym every day.» (ir)",
            options: ["gos", "goes", "go", "goess"],
            answer: "goes",
            explain:
              "Los verbos terminados en -o, -ch, -sh, -ss, -x añaden -ES: go → goes, watch → watches.",
            speak: "he goes to the gym every day",
          },
          {
            kind: "type",
            prompt: "Pon el verbo en tercera persona: «study» → «she ___»",
            answer: ["studies"],
            explain:
              "Consonante + y → la «y» se cambia por «ies»: study → studies, try → tries.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Mi hermano ve la tele por la noche»",
            answer: "My brother watches TV at night",
            bank: ["My", "brother", "watches", "TV", "at", "night", "watch", "in"],
            explain:
              "«Watches» por la -es, y «at night» es fijo (no «in the night»).",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está mal?",
            options: [
              "They works here",
              "They work here",
              "She works here",
              "He works here",
            ],
            answer: "They works here",
            explain:
              "La -s es SOLO para he/she/it. Con I/you/we/they el verbo va sin cambios.",
          },
        ],
      },
      {
        id: "a2-routines-2",
        titleEs: "¿Con qué frecuencia?",
        titleEn: "How often?",
        vocab: [
          { en: "always", es: "siempre" },
          { en: "usually", es: "normalmente" },
          { en: "sometimes", es: "a veces" },
          { en: "never", es: "nunca" },
          { en: "twice a week", es: "dos veces por semana" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Dónde va «always»? «I ___ drink ___ coffee ___»",
            options: [
              "I always drink coffee",
              "I drink always coffee",
              "Always I drink coffee",
              "I drink coffee always",
            ],
            answer: "I always drink coffee",
            explain:
              "Los adverbios de frecuencia van ANTES del verbo principal: I always drink. (Pero después de «to be»: I am always late.)",
            speak: "I always drink coffee",
          },
          {
            kind: "choose",
            prompt: "«Never» significa:",
            options: ["nunca", "siempre", "a veces", "casi"],
            answer: "nunca",
            explain:
              "Ojo: «never» ya es negativo, así que el verbo va en positivo: «I never eat meat», no «I don't never eat».",
            speak: "never",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Ella normalmente llega tarde»",
            answer: "She is usually late",
            bank: ["She", "is", "usually", "late", "always", "arrives"],
            explain:
              "Con el verbo «to be» el adverbio va DESPUÉS: «she is usually late».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «dos veces por semana»",
            answer: ["twice a week"],
            explain:
              "Una vez = once, dos veces = twice, y desde tres se usa el número: «three times a week».",
          },
          {
            kind: "choose",
            prompt: "Pregunta la frecuencia: «___ do you go to the gym?»",
            options: ["How often", "How much", "How many", "How long"],
            answer: "How often",
            explain: "«How often» = ¿con qué frecuencia?",
            speak: "how often do you go to the gym?",
          },
        ],
      },
      {
        id: "a2-routines-3",
        titleEs: "Preguntar y negar",
        titleEn: "Questions & negatives",
        vocab: [
          { en: "do you…?", es: "¿tú…?" },
          { en: "does she…?", es: "¿ella…?" },
          { en: "I don't", es: "yo no" },
          { en: "he doesn't", es: "él no" },
          { en: "Yes, I do", es: "sí (respuesta corta)" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ she like coffee?»",
            options: ["Do", "Does", "Is", "Has"],
            answer: "Does",
            explain:
              "Con he/she/it la pregunta usa «does». Y ojo: el verbo principal pierde la -s → «Does she like?», no «Does she likes?».",
            speak: "does she like coffee?",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "He doesn't works on Sunday",
              "He doesn't work on Sunday",
              "He don't work on Sunday",
              "He not work on Sunday",
            ],
            answer: "He doesn't work on Sunday",
            explain:
              "La -s ya está en «doesn't», así que el verbo va en forma base: doesn't work.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «No hablo francés»",
            answer: "I don't speak French",
            bank: ["I", "don't", "speak", "French", "no", "doesn't"],
            explain:
              "Para negar en presente simple: don't (I/you/we/they) o doesn't (he/she/it) + verbo base.",
          },
          {
            kind: "type",
            prompt: "Responde corto y afirmativo a «Do you live here?»",
            answer: ["yes, I do", "yes I do"],
            explain:
              "En inglés se responde con el auxiliar, no repitiendo el verbo: «Yes, I do» / «No, I don't».",
          },
          {
            kind: "choose",
            prompt: "«Where ___ your brother work?»",
            options: ["does", "do", "is", "are"],
            answer: "does",
            explain:
              "«Your brother» = he → «does». El orden es: pregunta + auxiliar + sujeto + verbo.",
            speak: "where does your brother work?",
          },
        ],
      },
    ],
  },
  {
    id: "a2-past",
    level: "A2",
    titleEs: "Hablar del pasado",
    titleEn: "Talking about the past",
    lessons: [
      {
        id: "a2-past-1",
        titleEs: "Was y were",
        titleEn: "Was & were",
        vocab: [
          { en: "I was", es: "yo era / estaba" },
          { en: "they were", es: "ellos eran / estaban" },
          { en: "yesterday", es: "ayer" },
          { en: "last year", es: "el año pasado" },
          { en: "it wasn't", es: "no era / no estaba" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ at home yesterday.»",
            options: ["was", "were", "am", "did"],
            answer: "was",
            explain:
              "Pasado de «to be»: was para I/he/she/it; were para you/we/they.",
            speak: "I was at home yesterday",
          },
          {
            kind: "choose",
            prompt: "«They ___ very tired.»",
            options: ["was", "were", "are", "is"],
            answer: "were",
            explain: "«They» va con «were». Sin excepciones.",
            speak: "they were very tired",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Ayer no estaba en casa»",
            answer: "I wasn't at home yesterday",
            bank: ["I", "wasn't", "at", "home", "yesterday", "didn't", "in"],
            explain:
              "Negativo de was = wasn't. Con «to be» NO se usa «didn't».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «el año pasado»",
            answer: ["last year"],
            explain:
              "«Last + periodo» = el … pasado: last year, last week, last night. Sin «the».",
          },
          {
            kind: "choose",
            prompt: "«___ you at the party?»",
            options: ["Were", "Was", "Did", "Do"],
            answer: "Were",
            explain:
              "Para preguntar con «to be» en pasado se invierte: «Were you…?». No hace falta «did».",
            speak: "were you at the party?",
          },
        ],
      },
      {
        id: "a2-past-2",
        titleEs: "Pasado regular (-ed)",
        titleEn: "Regular past (-ed)",
        vocab: [
          { en: "worked", es: "trabajé / trabajó" },
          { en: "studied", es: "estudié / estudió" },
          { en: "stopped", es: "paré / paró" },
          { en: "arrived", es: "llegué / llegó" },
          { en: "I didn't", es: "yo no (pasado)" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Pasado de «work»:",
            options: ["worked", "worket", "did work", "workd"],
            answer: "worked",
            explain:
              "El pasado regular añade -ed y es IGUAL para todas las personas: I worked, she worked.",
            speak: "worked",
          },
          {
            kind: "type",
            prompt: "Pasado de «study»:",
            answer: ["studied"],
            explain: "Consonante + y → -ied: study → studied, try → tried.",
          },
          {
            kind: "choose",
            prompt: "Pasado de «stop»:",
            options: ["stoped", "stopped", "stopt", "did stop"],
            answer: "stopped",
            explain:
              "Verbos cortos que acaban en consonante-vocal-consonante duplican la última: stop → stopped, plan → planned.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «No trabajé ayer»",
            answer: "I didn't work yesterday",
            bank: ["I", "didn't", "work", "yesterday", "worked", "wasn't"],
            explain:
              "Con «didn't» el verbo vuelve a su forma base: didn't work, NUNCA «didn't worked».",
          },
          {
            kind: "choose",
            prompt: "«She ___ at nine.» (arrive)",
            options: ["arrived", "arrive", "arrives", "was arrive"],
            answer: "arrived",
            explain:
              "Si el verbo ya acaba en -e, solo se añade -d: arrive → arrived.",
            speak: "she arrived at nine",
          },
        ],
      },
      {
        id: "a2-past-3",
        titleEs: "Irregulares imprescindibles",
        titleEn: "Key irregular verbs",
        vocab: [
          { en: "went", es: "fui / fue (ir)" },
          { en: "had", es: "tuve / tuvo" },
          { en: "saw", es: "vi / vio" },
          { en: "made", es: "hice / hizo" },
          { en: "said", es: "dije / dijo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Pasado de «go»:",
            options: ["goed", "went", "gone", "goes"],
            answer: "went",
            explain:
              "«Go» es irregular: go → went. «Gone» es el participio (I have gone), no el pasado simple.",
            speak: "went",
          },
          {
            kind: "choose",
            prompt: "«We ___ a great time.» (have)",
            options: ["had", "haved", "has", "did have"],
            answer: "had",
            explain:
              "have → had, para todas las personas. «Have a great time» = pasarlo genial.",
            speak: "we had a great time",
          },
          {
            kind: "bank",
            prompt: "Traduce: «La vi ayer»",
            answer: "I saw her yesterday",
            bank: ["I", "saw", "her", "yesterday", "seen", "she"],
            explain:
              "see → saw. Y tras el verbo se usa el pronombre objeto: «her», no «she».",
          },
          {
            kind: "type",
            prompt: "Pasado de «say»:",
            answer: ["said"],
            explain: "say → said (se pronuncia /sed/, no /seid/).",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "Did you went to the party?",
              "Did you go to the party?",
              "Did you gone to the party?",
              "You did go party?",
            ],
            answer: "Did you go to the party?",
            explain:
              "Con «did» el verbo va en forma base, aunque la frase sea pasado: did you GO.",
          },
        ],
      },
    ],
  },
  {
    id: "a2-future",
    level: "A2",
    titleEs: "Planes y futuro",
    titleEn: "Plans & the future",
    lessons: [
      {
        id: "a2-future-1",
        titleEs: "Voy a… (going to)",
        titleEn: "Going to",
        vocab: [
          { en: "I'm going to", es: "voy a" },
          { en: "are you going to…?", es: "¿vas a…?" },
          { en: "next week", es: "la semana que viene" },
          { en: "tonight", es: "esta noche" },
          { en: "a plan", es: "un plan" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ going to travel next month.»",
            options: ["am", "is", "are", "be"],
            answer: "am",
            explain:
              "La estructura es: to be + going to + verbo base. El que cambia es el «be»: I am, he is, we are.",
            speak: "I am going to travel next month",
          },
          {
            kind: "choose",
            prompt: "«She ___ to study tonight.»",
            options: ["is going", "going", "go", "will going"],
            answer: "is going",
            explain:
              "Sin el «be» la frase no existe: «she going» está mal. Y «will going» nunca es correcto.",
            speak: "she is going to study tonight",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Qué vas a hacer mañana?»",
            answer: "What are you going to do tomorrow",
            bank: [
              "What",
              "are",
              "you",
              "going",
              "to",
              "do",
              "tomorrow",
              "will",
              "doing",
            ],
            explain:
              "En preguntas se invierte el «be»: What ARE YOU going to do. El verbo final va en base: «do», no «doing».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «esta noche»",
            answer: ["tonight"],
            explain:
              "«Tonight» es una sola palabra. «This night» no se usa en inglés natural.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está bien construida?",
            options: [
              "I'm going to buy a car",
              "I'm going buy a car",
              "I'm going to bought a car",
              "I go to buy a car",
            ],
            answer: "I'm going to buy a car",
            explain:
              "Tras «going to» va SIEMPRE el verbo en forma base: to buy. Nunca pasado ni -ing.",
          },
        ],
      },
      {
        id: "a2-future-2",
        titleEs: "Will: decisiones y predicciones",
        titleEn: "Will: decisions & predictions",
        vocab: [
          { en: "I'll help you", es: "te ayudaré" },
          { en: "it will rain", es: "va a llover" },
          { en: "won't", es: "no (futuro)" },
          { en: "maybe", es: "quizá" },
          { en: "I promise", es: "te lo prometo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Don't worry, I ___ help you.» (decisión en el momento)",
            options: ["will", "am going to", "would", "do"],
            answer: "will",
            explain:
              "«Will» para lo que decides AHORA mismo; «going to» para lo que ya tenías planeado.",
            speak: "don't worry, I will help you",
          },
          {
            kind: "choose",
            prompt: "Negativo de «will»:",
            options: ["won't", "willn't", "don't will", "not will"],
            answer: "won't",
            explain: "will not → won't. Es la única contracción irregular con will.",
            speak: "won't",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Creo que lloverá mañana»",
            answer: "I think it will rain tomorrow",
            bank: ["I", "think", "it", "will", "rain", "tomorrow", "is", "going"],
            explain:
              "Tras «will» va el verbo base: will rain. Y en inglés hace falta el sujeto «it» (en español se omite).",
          },
          {
            kind: "type",
            prompt: "Escribe la contracción de «I will»",
            answer: ["I'll", "Ill"],
            explain:
              "I will → I'll. En conversación casi siempre se contrae: I'll, you'll, she'll.",
          },
          {
            kind: "choose",
            prompt: "«Look at those clouds! It ___ rain.»",
            options: ["is going to", "will", "would", "rains"],
            answer: "is going to",
            explain:
              "Si hay una prueba delante de tus ojos (las nubes), se usa «going to». «Will» es para predicciones sin evidencia.",
            speak: "look at those clouds! It is going to rain",
          },
        ],
      },
      {
        id: "a2-future-3",
        titleEs: "Planes de agenda",
        titleEn: "Arrangements",
        vocab: [
          { en: "I'm meeting Ana", es: "me veo con Ana" },
          { en: "an appointment", es: "una cita" },
          { en: "are you free?", es: "¿estás libre?" },
          { en: "to cancel", es: "cancelar" },
          { en: "at five", es: "a las cinco" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ Ana at six.» (ya quedasteis)",
            options: ["'m meeting", "meet", "will meet", "'m going meet"],
            answer: "'m meeting",
            explain:
              "Para citas ya acordadas el inglés usa presente continuo: «I'm meeting Ana at six». Suena más natural que «will».",
            speak: "I'm meeting Ana at six",
          },
          {
            kind: "choose",
            prompt: "«Are you free ___ Friday?»",
            options: ["on", "in", "at", "to"],
            answer: "on",
            explain:
              "Días → on (on Friday). Horas → at (at five). Meses y años → in (in May, in 2026).",
            speak: "are you free on Friday?",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Tengo una cita a las cinco»",
            answer: "I have an appointment at five",
            bank: ["I", "have", "an", "appointment", "at", "five", "a", "in"],
            explain:
              "«An» antes de sonido vocálico (an appointment) y «at» para la hora.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «cancelar»",
            answer: ["cancel", "to cancel"],
            explain:
              "«Cancel» se escribe con una sola L en el infinitivo (en británico dobla en «cancelled»).",
          },
          {
            kind: "choose",
            prompt: "¿Cuál suena a plan ya fijado (billetes comprados)?",
            options: [
              "We're flying on Monday",
              "We fly on Monday",
              "We will fly Monday maybe",
              "We are fly Monday",
            ],
            answer: "We're flying on Monday",
            explain:
              "Presente continuo = agenda cerrada. «We fly on Monday» sonaría a horario fijo repetido (como un piloto).",
          },
        ],
      },
    ],
  },
  {
    id: "a2-compare",
    level: "A2",
    titleEs: "Comparar y describir",
    titleEn: "Comparing & describing",
    lessons: [
      {
        id: "a2-compare-1",
        titleEs: "Más grande, más barato",
        titleEn: "Comparatives",
        vocab: [
          { en: "bigger", es: "más grande" },
          { en: "cheaper", es: "más barato" },
          { en: "more expensive", es: "más caro" },
          { en: "better", es: "mejor" },
          { en: "worse", es: "peor" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«This car is ___ than mine.» (big)",
            options: ["bigger", "more big", "biggest", "big"],
            answer: "bigger",
            explain:
              "Adjetivos de una sílaba → -er, duplicando la última consonante: big → bigger, hot → hotter.",
            speak: "this car is bigger than mine",
          },
          {
            kind: "choose",
            prompt: "Comparativo de «expensive»:",
            options: [
              "more expensive",
              "expensiver",
              "most expensive",
              "expensivest",
            ],
            answer: "more expensive",
            explain:
              "Adjetivos largos (3+ sílabas) usan «more», nunca -er: more expensive, more interesting.",
            speak: "more expensive",
          },
          {
            kind: "type",
            prompt: "Comparativo de «good»:",
            answer: ["better"],
            explain:
              "Irregulares que hay que saber: good → better, bad → worse, far → further.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Mi casa es más pequeña que la tuya»",
            answer: "My house is smaller than yours",
            bank: ["My", "house", "is", "smaller", "than", "yours", "more", "your"],
            explain:
              "«Than» = «que» en comparaciones (no «that»). Y «yours» = la tuya (pronombre, sin sustantivo detrás).",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está mal?",
            options: [
              "He is more tall than me",
              "She is taller than me",
              "This is better than that",
              "It's worse than yesterday",
            ],
            answer: "He is more tall than me",
            explain:
              "«Tall» es corto, así que va con -er: taller. Mezclar «more» + «-er» también está mal (more taller).",
          },
        ],
      },
      {
        id: "a2-compare-2",
        titleEs: "El mejor de todos",
        titleEn: "Superlatives",
        vocab: [
          { en: "the biggest", es: "el más grande" },
          { en: "the best", es: "el mejor" },
          { en: "the worst", es: "el peor" },
          { en: "the most beautiful", es: "el más bonito" },
          { en: "in the world", es: "del mundo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«It's the ___ city in the world.» (big)",
            options: ["biggest", "bigger", "most big", "big"],
            answer: "biggest",
            explain:
              "Superlativo corto: the + adjetivo + -est. Y casi siempre lleva «the» delante.",
            speak: "it's the biggest city in the world",
          },
          {
            kind: "choose",
            prompt: "Superlativo de «good»:",
            options: ["the best", "the goodest", "the better", "the most good"],
            answer: "the best",
            explain: "good → better → the best. bad → worse → the worst.",
            speak: "the best",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Es la película más interesante del año»",
            answer: "It's the most interesting film of the year",
            bank: [
              "It's",
              "the",
              "most",
              "interesting",
              "film",
              "of",
              "the",
              "year",
              "more",
            ],
            explain:
              "Adjetivo largo → the MOST interesting. «Del año» = of the year.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «el peor» (2 palabras)",
            answer: ["the worst"],
            explain: "«Worst» con -st: es superlativo, no comparativo (worse).",
          },
          {
            kind: "choose",
            prompt: "«The tallest building ___ the city»",
            options: ["in", "of", "at", "on"],
            answer: "in",
            explain:
              "Con superlativos + lugar se usa «in»: the best restaurant in Madrid.",
            speak: "the tallest building in the city",
          },
        ],
      },
      {
        id: "a2-compare-3",
        titleEs: "Igual que… (as … as)",
        titleEn: "As … as",
        vocab: [
          { en: "as tall as", es: "tan alto como" },
          { en: "not as … as", es: "no tan … como" },
          { en: "the same as", es: "igual que" },
          { en: "different from", es: "diferente de" },
          { en: "similar to", es: "parecido a" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«She is as tall ___ her brother.»",
            options: ["as", "than", "that", "like"],
            answer: "as",
            explain:
              "La fórmula es as + adjetivo + AS (tan… como). «Than» solo va con comparativos (-er / more).",
            speak: "she is as tall as her brother",
          },
          {
            kind: "choose",
            prompt: "«This hotel isn't ___ expensive as the other one.»",
            options: ["as", "so much", "more", "than"],
            answer: "as",
            explain:
              "En negativo la fórmula no cambia: not as … as = no tan … como.",
            speak: "this hotel isn't as expensive as the other one",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Mi teléfono es igual que el tuyo»",
            answer: "My phone is the same as yours",
            bank: ["My", "phone", "is", "the", "same", "as", "yours", "than", "similar"],
            explain:
              "«The same AS» (no «the same than» ni «the same that»). Siempre con «the».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «diferente de» (2 palabras)",
            answer: ["different from", "different to"],
            explain:
              "Lo estándar es «different from». «Different than» es americano y suena raro en Europa.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "It's similar to mine",
              "It's similar of mine",
              "It's similar than mine",
              "It's similar as mine",
            ],
            answer: "It's similar to mine",
            explain:
              "«Similar TO». Cada adjetivo pide su preposición: similar to, different from, good at.",
          },
        ],
      },
    ],
  },
  {
    id: "a2-travel",
    level: "A2",
    titleEs: "Viajar y pedir cosas",
    titleEn: "Travel & asking for things",
    lessons: [
      {
        id: "a2-travel-1",
        titleEs: "En el restaurante",
        titleEn: "At the restaurant",
        vocab: [
          { en: "I'd like", es: "quisiera" },
          { en: "a table for two", es: "una mesa para dos" },
          { en: "the bill", es: "la cuenta" },
          { en: "a starter", es: "un entrante" },
          { en: "Could I have…?", es: "¿me puede traer…?" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál es la forma educada de pedir?",
            options: [
              "I'd like a coffee, please",
              "I want a coffee",
              "Give me a coffee",
              "I take a coffee",
            ],
            answer: "I'd like a coffee, please",
            explain:
              "«I'd like» (= I would like) es el estándar educado. «I want» suena a niño exigiendo.",
            speak: "I'd like a coffee, please",
          },
          {
            kind: "choose",
            prompt: "«___ I have the bill, please?»",
            options: ["Could", "Do", "Am", "Will"],
            answer: "Could",
            explain:
              "«Could I…?» es la petición educada por defecto. «Can I…?» también vale, pero es más informal.",
            speak: "could I have the bill, please?",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Una mesa para dos, por favor»",
            answer: "A table for two please",
            bank: ["A", "table", "for", "two", "please", "of", "to"],
            explain: "«For two» = para dos. Ojo: «of two» no existe aquí.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés «la cuenta» (2 palabras, con «the»)",
            answer: ["the bill", "the check"],
            explain:
              "«The bill» en Reino Unido, «the check» en EE. UU. Las dos se entienden.",
          },
          {
            kind: "choose",
            prompt: "El camarero dice «Are you ready to order?». Significa:",
            options: [
              "¿listos para pedir?",
              "¿quieren pagar?",
              "¿está todo bien?",
              "¿quieren postre?",
            ],
            answer: "¿listos para pedir?",
            explain:
              "«To order» = pedir (en un restaurante o una tienda). No confundir con «to ask» (preguntar).",
            speak: "are you ready to order?",
          },
        ],
      },
      {
        id: "a2-travel-2",
        titleEs: "Direcciones y transporte",
        titleEn: "Directions & transport",
        vocab: [
          { en: "How do I get to…?", es: "¿cómo llego a…?" },
          { en: "catch the bus", es: "coger el autobús" },
          { en: "a return ticket", es: "un billete de ida y vuelta" },
          { en: "turn left", es: "gira a la izquierda" },
          { en: "it takes 20 minutes", es: "tarda 20 minutos" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«How do I ___ to the station?»",
            options: ["get", "go", "arrive", "take"],
            answer: "get",
            explain:
              "«Get to» = llegar a. Es la fórmula fija para pedir indicaciones: How do I get to…?",
            speak: "how do I get to the station?",
          },
          {
            kind: "choose",
            prompt: "Billete de ida y vuelta: «a ___ ticket»",
            options: ["return", "round", "double", "two-way"],
            answer: "return",
            explain:
              "«Return ticket» (británico) o «round-trip ticket» (americano). Solo ida = «single» / «one-way».",
            speak: "a return ticket",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Cuánto tarda en autobús?»",
            answer: "How long does it take by bus",
            bank: ["How", "long", "does", "it", "take", "by", "bus", "much", "in"],
            explain:
              "Tiempo → «how long» (no «how much time»). Medios de transporte → by bus, by car, by train.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «coger el autobús» (3 palabras)",
            answer: ["catch the bus", "take the bus"],
            explain:
              "«Catch the bus» (llegar a tiempo a cogerlo) o «take the bus» (usarlo como medio). Nunca «get the bus on».",
          },
          {
            kind: "choose",
            prompt: "«Turn ___ at the traffic lights.» (izquierda)",
            options: ["left", "to left", "on left", "the left"],
            answer: "left",
            explain:
              "Con «turn» no va preposición ni artículo: turn left, turn right. (Pero sí «on your left» para situar algo.)",
            speak: "turn left at the traffic lights",
          },
        ],
      },
      {
        id: "a2-travel-3",
        titleEs: "Tiendas y hotel",
        titleEn: "Shops & hotel",
        vocab: [
          { en: "How much is it?", es: "¿cuánto cuesta?" },
          { en: "try it on", es: "probárselo" },
          { en: "a single room", es: "una habitación individual" },
          { en: "to check in", es: "registrarse" },
          { en: "the receipt", es: "el recibo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ is this jacket?»",
            options: ["How much", "How many", "What price", "How cost"],
            answer: "How much",
            explain:
              "Precio → «how much». «How many» es solo para cosas contables (how many jackets).",
            speak: "how much is this jacket?",
          },
          {
            kind: "choose",
            prompt: "«Can I ___ these jeans on?»",
            options: ["try", "prove", "test", "probe"],
            answer: "try",
            explain:
              "Probarse ropa = «try on». Ojo con el falso amigo: «prove» es demostrar, no probar.",
            speak: "can I try these jeans on?",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Me gustaría reservar una habitación»",
            answer: "I'd like to book a room",
            bank: ["I'd", "like", "to", "book", "a", "room", "want", "reserve"],
            explain:
              "«Book» es el verbo normal para reservar. «Reserve» existe pero suena formal.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «el recibo» (2 palabras)",
            answer: ["the receipt"],
            explain:
              "«Receipt» lleva una «p» muda: se pronuncia /ri-SIIT/. No confundir con «recipe» (receta de cocina).",
          },
          {
            kind: "choose",
            prompt: "«I'd like to check ___, please.» (llegar al hotel)",
            options: ["in", "on", "up", "into"],
            answer: "in",
            explain: "Llegar → check in. Irse → check out. Sin «to» detrás.",
            speak: "I'd like to check in, please",
          },
        ],
      },
    ],
  },
  {
    id: "a2-perfect",
    level: "A2",
    titleEs: "Presente perfecto",
    titleEn: "Present perfect",
    lessons: [
      {
        id: "a2-perfect-1",
        titleEs: "Have + participio",
        titleEn: "Have + past participle",
        vocab: [
          { en: "I have finished", es: "he terminado" },
          { en: "she has gone", es: "se ha ido" },
          { en: "I've seen", es: "he visto" },
          { en: "been", es: "estado (participio)" },
          { en: "done", es: "hecho (participio)" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I ___ finished my homework.»",
            options: ["have", "has", "am", "did"],
            answer: "have",
            explain:
              "Presente perfecto = have/has + participio. «Has» solo con he/she/it.",
            speak: "I have finished my homework",
          },
          {
            kind: "choose",
            prompt: "«She ___ just arrived.»",
            options: ["has", "have", "is", "was"],
            answer: "has",
            explain: "She/he/it → has. El participio no cambia nunca.",
            speak: "she has just arrived",
          },
          {
            kind: "bank",
            prompt: "Traduce: «He perdido las llaves»",
            answer: "I've lost my keys",
            bank: ["I've", "lost", "my", "keys", "I", "have", "the"],
            explain:
              "En inglés las partes del cuerpo y las cosas propias llevan posesivo: MY keys, no «the keys».",
          },
          {
            kind: "type",
            prompt: "Participio de «see»:",
            answer: ["seen"],
            explain: "see → saw (pasado) → seen (participio). I have seen.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál está mal?",
            options: [
              "I have went there",
              "I have gone there",
              "I have been there",
              "I have done it",
            ],
            answer: "I have went there",
            explain:
              "«Went» es pasado simple, no participio. Con «have» va gone (me fui) o been (estuve y volví).",
          },
        ],
      },
      {
        id: "a2-perfect-2",
        titleEs: "Ever, never, just, already, yet",
        titleEn: "Ever, never, just, already, yet",
        vocab: [
          { en: "Have you ever…?", es: "¿alguna vez has…?" },
          { en: "I've never", es: "nunca he" },
          { en: "just", es: "acabar de" },
          { en: "already", es: "ya" },
          { en: "not yet", es: "todavía no" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ you ever been to London?»",
            options: ["Have", "Did", "Are", "Do"],
            answer: "Have",
            explain:
              "Experiencias de vida (sin fecha) → presente perfecto: Have you ever…?",
            speak: "have you ever been to London?",
          },
          {
            kind: "choose",
            prompt: "«I haven't finished ___.»",
            options: ["yet", "already", "just", "still"],
            answer: "yet",
            explain:
              "«Yet» va al final y solo en negativas y preguntas: not yet, have you finished yet?",
            speak: "I haven't finished yet",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Ya he comido»",
            answer: "I've already eaten",
            bank: ["I've", "already", "eaten", "yet", "ate", "have"],
            explain:
              "«Already» en afirmativas, entre el auxiliar y el participio. Participio de eat = eaten.",
          },
          {
            kind: "type",
            prompt: "Completa: «I have ___ seen it» (nunca)",
            answer: ["never"],
            explain:
              "«Never» ya es negativo, así que el auxiliar va en positivo: I have never, no «I haven't never».",
          },
          {
            kind: "choose",
            prompt: "¿Dónde va «just»?",
            options: [
              "I've just seen her",
              "I just have seen her",
              "I've seen just her",
              "Just I've seen her",
            ],
            answer: "I've just seen her",
            explain:
              "Entre el auxiliar y el participio. «I've just eaten» = acabo de comer.",
          },
        ],
      },
      {
        id: "a2-perfect-3",
        titleEs: "For, since y cuándo NO usarlo",
        titleEn: "For, since & past simple",
        vocab: [
          { en: "for two years", es: "desde hace dos años" },
          { en: "since 2020", es: "desde 2020" },
          { en: "How long…?", es: "¿cuánto tiempo…?" },
          { en: "I've lived here", es: "vivo aquí (desde…)" },
          { en: "last night", es: "anoche" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«I've lived here ___ five years.»",
            options: ["for", "since", "from", "during"],
            answer: "for",
            explain:
              "«For» + duración (for five years). «Since» + momento de inicio (since 2020).",
            speak: "I've lived here for five years",
          },
          {
            kind: "choose",
            prompt: "«She has worked here ___ 2020.»",
            options: ["since", "for", "from", "by"],
            answer: "since",
            explain:
              "Un año es un punto de inicio → since. Regla rápida: si puedes contestar «¿cuánto?» es for; si es «¿desde cuándo?» es since.",
            speak: "she has worked here since 2020",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Cuánto tiempo llevas aquí?»",
            answer: "How long have you been here",
            bank: ["How", "long", "have", "you", "been", "here", "are", "since"],
            explain:
              "El español usa presente («llevas»), el inglés presente perfecto: How long HAVE you BEEN.",
          },
          {
            kind: "type",
            prompt: "Completa en pasado: «I ___ (see) her last night»",
            answer: ["saw"],
            explain:
              "Con un tiempo TERMINADO (last night, yesterday, in 2019) va pasado simple, nunca presente perfecto.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "I saw him yesterday",
              "I have seen him yesterday",
              "I have saw him yesterday",
              "I did seen him yesterday",
            ],
            answer: "I saw him yesterday",
            explain:
              "«Yesterday» cierra el tiempo, así que exige pasado simple. Este es el error más común al aprender el perfecto.",
          },
        ],
      },
    ],
  },
];
