import type { Unit } from "./types";

// Currículo A1 curado. Contenido bilingüe (en↔es); explicaciones SIEMPRE en español.
// ponytail: A1 fleshed; A2+ se añaden cuando toque, misma forma de datos.

export const curriculum: Unit[] = [
  {
    id: "a1-greetings",
    level: "A1",
    titleEs: "Saludos y presentaciones",
    titleEn: "Greetings & introductions",
    lessons: [
      {
        id: "a1-greetings-1",
        titleEs: "Saludos básicos",
        titleEn: "Basic greetings",
        vocab: [
          { en: "hello", es: "hola" },
          { en: "good morning", es: "buenos días" },
          { en: "good night", es: "buenas noches" },
          { en: "goodbye", es: "adiós" },
          { en: "see you later", es: "hasta luego" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo dices «hola»?",
            options: ["hello", "goodbye", "please", "thanks"],
            answer: "hello",
            explain: "«Hello» es el saludo más común y sirve a cualquier hora.",
            speak: "hello",
          },
          {
            kind: "choose",
            prompt: "Es de mañana. ¿Qué saludo usas?",
            options: ["good night", "good morning", "goodbye", "good afternoon"],
            answer: "good morning",
            explain:
              "«Good morning» = buenos días. Se usa hasta el mediodía, más o menos.",
            speak: "good morning",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «goodbye»?",
            options: ["hola", "gracias", "adiós", "por favor"],
            answer: "adiós",
            explain: "«Goodbye» es la despedida estándar; «bye» es su forma corta.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Hasta luego»",
            answer: "see you later",
            bank: ["see", "you", "later", "now", "again"],
            explain:
              "«See you later» es literal: te veo (see you) más tarde (later).",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Buenas noches»",
            answer: ["good night", "goodnight"],
            explain:
              "«Good night» se usa para despedirse de noche, no para saludar al llegar.",
          },
        ],
      },
      {
        id: "a1-greetings-2",
        titleEs: "Preséntate",
        titleEn: "Introduce yourself",
        vocab: [
          { en: "my name is", es: "me llamo" },
          { en: "I am", es: "yo soy / estoy" },
          { en: "nice to meet you", es: "encantado/a" },
          { en: "what is your name?", es: "¿cómo te llamas?" },
          { en: "this is", es: "este/esta es" },
        ],
        exercises: [
          {
            kind: "bank",
            prompt: "Traduce: «Me llamo Ana»",
            answer: "my name is Ana",
            bank: ["my", "name", "is", "Ana", "am", "I"],
            explain:
              "«My name is…» = mi nombre es… Es la forma más clara de presentarte.",
          },
          {
            kind: "choose",
            prompt: "Elige la traducción de «Yo soy estudiante»",
            options: ["I am student", "I am a student", "I student", "Me student"],
            answer: "I am a student",
            explain:
              "En inglés las profesiones llevan artículo: «a student». No se omite como en español.",
            speak: "I am a student",
          },
          {
            kind: "choose",
            prompt: "Alguien te presenta a otra persona. Respondes:",
            options: ["Goodbye", "Nice to meet you", "Good night", "See you"],
            answer: "Nice to meet you",
            explain: "«Nice to meet you» = encantado/a de conocerte.",
            speak: "Nice to meet you",
          },
          {
            kind: "type",
            prompt: "Escribe la pregunta: «¿Cómo te llamas?»",
            answer: ["what is your name?", "what is your name", "what's your name?", "what's your name"],
            explain:
              "«What is your name?» literalmente es «¿cuál es tu nombre?». «What's» es la contracción de «what is».",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Este es mi amigo»",
            answer: "this is my friend",
            bank: ["this", "is", "my", "friend", "are", "he"],
            explain: "«This is…» sirve para presentar a alguien cercano.",
          },
        ],
      },
      {
        id: "a1-greetings-3",
        titleEs: "¿Cómo estás?",
        titleEn: "How are you?",
        vocab: [
          { en: "how are you?", es: "¿cómo estás?" },
          { en: "I'm fine", es: "estoy bien" },
          { en: "thank you", es: "gracias" },
          { en: "and you?", es: "¿y tú?" },
          { en: "so-so", es: "más o menos" },
        ],
        exercises: [
          {
            kind: "type",
            prompt: "Escribe: «¿Cómo estás?»",
            answer: ["how are you?", "how are you"],
            explain: "«How are you?» es la pregunta habitual por el estado de alguien.",
          },
          {
            kind: "choose",
            prompt: "Te preguntan «How are you?». Respondes:",
            options: ["I'm fine, thank you", "My name is fine", "Yes, I do", "Good night"],
            answer: "I'm fine, thank you",
            explain:
              "«I'm fine, thank you» = estoy bien, gracias. «I'm» es la contracción de «I am».",
            speak: "I'm fine, thank you",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Bien, ¿y tú?»",
            answer: "fine, and you?",
            bank: ["fine", "and", "you", "?", "are", "how"],
            explain: "«And you?» devuelve la pregunta de forma natural.",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «thank you»?",
            options: ["por favor", "gracias", "de nada", "perdón"],
            answer: "gracias",
            explain: "«Thank you» = gracias. «You're welcome» sería «de nada».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «Gracias»",
            answer: ["thank you", "thanks"],
            explain: "«Thanks» es la versión informal y corta de «thank you».",
          },
        ],
      },
    ],
  },
  {
    id: "a1-numbers",
    level: "A1",
    titleEs: "Números y la hora",
    titleEn: "Numbers & time",
    lessons: [
      {
        id: "a1-numbers-1",
        titleEs: "Números del 1 al 10",
        titleEn: "Numbers 1–10",
        vocab: [
          { en: "one", es: "uno" },
          { en: "three", es: "tres" },
          { en: "five", es: "cinco" },
          { en: "seven", es: "siete" },
          { en: "ten", es: "diez" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se dice «tres»?",
            options: ["free", "three", "tree", "third"],
            answer: "three",
            explain:
              "«Three» (tres) se pronuncia con el sonido «th». Ojo: «tree» es árbol.",
            speak: "three",
          },
          {
            kind: "choose",
            prompt: "5 = ?",
            options: ["four", "five", "nine", "six"],
            answer: "five",
            explain: "«Five» = cinco.",
            speak: "five",
          },
          {
            kind: "type",
            prompt: "Escribe el número 7 en inglés",
            answer: ["seven"],
            explain: "«Seven» = siete.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Tengo dos gatos»",
            answer: "I have two cats",
            bank: ["I", "have", "two", "cats", "cat", "am"],
            explain:
              "En plural el sustantivo lleva «-s»: «two cats». El verbo «have» = tener.",
          },
          {
            kind: "type",
            prompt: "Escribe el número 10 en inglés",
            answer: ["ten"],
            explain: "«Ten» = diez.",
          },
        ],
      },
      {
        id: "a1-numbers-2",
        titleEs: "Números y edad",
        titleEn: "Numbers & age",
        vocab: [
          { en: "eleven", es: "once" },
          { en: "fifteen", es: "quince" },
          { en: "twenty", es: "veinte" },
          { en: "how old are you?", es: "¿cuántos años tienes?" },
          { en: "I am … years old", es: "tengo … años" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se dice «quince»?",
            options: ["fifty", "fifteen", "fourteen", "fifth"],
            answer: "fifteen",
            explain:
              "«Fifteen» (15) termina en «-teen». «Fifty» (50) termina en «-ty». No las confundas.",
            speak: "fifteen",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Cuántos años tienes?»",
            answer: "how old are you?",
            bank: ["how", "old", "are", "you", "?", "many"],
            explain:
              "En inglés la edad se pregunta con «how old» (literalmente «qué tan viejo»), no con «how many years».",
          },
          {
            kind: "choose",
            prompt: "«Tengo veinte años» =",
            options: ["I have twenty years", "I am twenty years old", "I am twenty", "My age twenty"],
            answer: "I am twenty years old",
            explain:
              "La edad usa el verbo «to be»: «I am … years old», nunca «I have … years».",
            speak: "I am twenty years old",
          },
          {
            kind: "type",
            prompt: "Escribe el número 11 en inglés",
            answer: ["eleven"],
            explain: "«Eleven» = once. Es irregular, no sigue el patrón «-teen».",
          },
          {
            kind: "choose",
            prompt: "20 = ?",
            options: ["twelve", "twenty", "twenteen", "two"],
            answer: "twenty",
            explain: "«Twenty» = veinte.",
            speak: "twenty",
          },
        ],
      },
      {
        id: "a1-numbers-3",
        titleEs: "La hora y los días",
        titleEn: "Time & days",
        vocab: [
          { en: "what time is it?", es: "¿qué hora es?" },
          { en: "it is three o'clock", es: "son las tres" },
          { en: "today", es: "hoy" },
          { en: "tomorrow", es: "mañana" },
          { en: "Monday", es: "lunes" },
        ],
        exercises: [
          {
            kind: "bank",
            prompt: "Traduce: «¿Qué hora es?»",
            answer: "what time is it?",
            bank: ["what", "time", "is", "it", "?", "hour"],
            explain:
              "Para la hora se dice «what time is it?», no «what hour». «Time» = tiempo/hora.",
          },
          {
            kind: "choose",
            prompt: "«Son las tres» =",
            options: ["it is three hours", "it is three o'clock", "they are three", "is three"],
            answer: "it is three o'clock",
            explain:
              "«O'clock» se usa solo para horas en punto: «three o'clock» = las tres en punto.",
            speak: "it is three o'clock",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «tomorrow»?",
            options: ["hoy", "ayer", "mañana", "ahora"],
            answer: "mañana",
            explain:
              "«Tomorrow» = mañana (el día siguiente). «Morning» es la mañana (parte del día).",
          },
          {
            kind: "type",
            prompt: "Escribe «hoy» en inglés",
            answer: ["today"],
            explain: "«Today» = hoy.",
          },
          {
            kind: "choose",
            prompt: "El primer día laboral de la semana:",
            options: ["Sunday", "Monday", "Friday", "March"],
            answer: "Monday",
            explain:
              "«Monday» = lunes. Los días de la semana SIEMPRE se escriben con mayúscula en inglés.",
            speak: "Monday",
          },
        ],
      },
    ],
  },
  {
    id: "a1-everyday",
    level: "A1",
    titleEs: "El día a día",
    titleEn: "Everyday basics",
    lessons: [
      {
        id: "a1-everyday-1",
        titleEs: "Comida y bebida",
        titleEn: "Food & drink",
        vocab: [
          { en: "water", es: "agua" },
          { en: "bread", es: "pan" },
          { en: "coffee", es: "café" },
          { en: "I would like", es: "me gustaría / quisiera" },
          { en: "the bill", es: "la cuenta" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se dice «agua»?",
            options: ["water", "wine", "milk", "butter"],
            answer: "water",
            explain: "«Water» = agua.",
            speak: "water",
          },
          {
            kind: "bank",
            prompt: "Traduce (educado): «Quisiera un café»",
            answer: "I would like a coffee",
            bank: ["I", "would", "like", "a", "coffee", "want"],
            explain:
              "«I would like…» es más educado que «I want…» para pedir en un restaurante.",
          },
          {
            kind: "choose",
            prompt: "Terminas de comer y pides:",
            options: ["the bread", "the water", "the bill", "the coffee"],
            answer: "the bill",
            explain:
              "«The bill» = la cuenta (en EE. UU. también «the check»).",
            speak: "the bill",
          },
          {
            kind: "type",
            prompt: "Escribe «pan» en inglés",
            answer: ["bread"],
            explain: "«Bread» = pan. Es incontable: no se dice «a bread».",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «coffee»?",
            options: ["té", "café", "leche", "jugo"],
            answer: "café",
            explain: "«Coffee» = café; «tea» = té.",
          },
        ],
      },
      {
        id: "a1-everyday-2",
        titleEs: "Verbos comunes",
        titleEn: "Common verbs",
        vocab: [
          { en: "to eat", es: "comer" },
          { en: "to drink", es: "beber" },
          { en: "to want", es: "querer" },
          { en: "to have", es: "tener" },
          { en: "to go", es: "ir" },
        ],
        exercises: [
          {
            kind: "bank",
            prompt: "Traduce: «Quiero agua»",
            answer: "I want water",
            bank: ["I", "want", "water", "wants", "the"],
            explain:
              "Con «I» el verbo va sin «-s»: «I want». La «-s» es solo para he/she/it.",
          },
          {
            kind: "choose",
            prompt: "«She ___ coffee every day.» (beber)",
            options: ["drink", "drinks", "drinking", "drank"],
            answer: "drinks",
            explain:
              "Con «she/he/it» en presente simple el verbo lleva «-s»: «she drinks».",
            speak: "she drinks coffee every day",
          },
          {
            kind: "choose",
            prompt: "¿Qué significa «to go»?",
            options: ["comer", "ir", "tener", "querer"],
            answer: "ir",
            explain: "«To go» = ir. Es uno de los verbos más frecuentes del inglés.",
          },
          {
            kind: "type",
            prompt: "Traduce: «I eat bread» (con «yo»)",
            answer: ["yo como pan", "como pan"],
            explain: "«I eat bread» = (yo) como pan. «Eat» = comer.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Tenemos dos hijos»",
            answer: "we have two children",
            bank: ["we", "have", "two", "children", "childs", "has"],
            explain:
              "El plural de «child» es irregular: «children», no «childs».",
          },
        ],
      },
      {
        id: "a1-everyday-3",
        titleEs: "De compras",
        titleEn: "Shopping",
        vocab: [
          { en: "how much is it?", es: "¿cuánto cuesta?" },
          { en: "expensive", es: "caro" },
          { en: "cheap", es: "barato" },
          { en: "I'll take it", es: "me lo llevo" },
          { en: "do you have…?", es: "¿tienen…?" },
        ],
        exercises: [
          {
            kind: "bank",
            prompt: "Traduce: «¿Cuánto cuesta?»",
            answer: "how much is it?",
            bank: ["how", "much", "is", "it", "?", "many"],
            explain:
              "Para precios de algo incontable se usa «how much», no «how many».",
          },
          {
            kind: "choose",
            prompt: "Lo contrario de «expensive» es:",
            options: ["big", "cheap", "old", "fast"],
            answer: "cheap",
            explain: "«Cheap» = barato; «expensive» = caro.",
            speak: "cheap",
          },
          {
            kind: "choose",
            prompt: "Decides comprarlo. Dices:",
            options: ["I'll take it", "I take", "I have it", "Take me"],
            answer: "I'll take it",
            explain:
              "«I'll take it» = me lo llevo. «I'll» es la contracción de «I will».",
            speak: "I'll take it",
          },
          {
            kind: "type",
            prompt: "Escribe «caro» en inglés",
            answer: ["expensive"],
            explain: "«Expensive» = caro.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Tienen café?»",
            answer: "do you have coffee?",
            bank: ["do", "you", "have", "coffee", "?", "are"],
            explain:
              "Las preguntas en presente simple empiezan con «do»: «Do you have…?».",
          },
        ],
      },
    ],
  },
];
