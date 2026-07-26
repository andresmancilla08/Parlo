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
];
