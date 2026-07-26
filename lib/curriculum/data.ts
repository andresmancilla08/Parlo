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
  {
    id: "a1-family",
    level: "A1",
    titleEs: "Familia y personas",
    titleEn: "Family & people",
    lessons: [
      {
        id: "a1-family-1",
        titleEs: "La familia",
        titleEn: "The family",
        vocab: [
          { en: "mother", es: "madre" },
          { en: "father", es: "padre" },
          { en: "sister", es: "hermana" },
          { en: "brother", es: "hermano" },
          { en: "parents", es: "padres" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se dice «hermana»?",
            options: ["brother", "sister", "daughter", "aunt"],
            answer: "sister",
            explain:
              "«Sister» = hermana; «brother» = hermano. El inglés no marca género con la terminación, son palabras distintas.",
            speak: "sister",
          },
          {
            kind: "choose",
            prompt: "«Parents» significa:",
            options: ["parientes", "padres (mamá y papá)", "primos", "abuelos"],
            answer: "padres (mamá y papá)",
            explain:
              "Ojo con el falso amigo: «parents» son mamá y papá. «Parientes» en general es «relatives».",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Ella es mi madre»",
            answer: "She is my mother",
            bank: ["She", "is", "my", "mother", "he", "her"],
            explain:
              "«She» para mujer, «he» para hombre. El verbo «to be» siempre aparece: no se dice «she my mother».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «mi hermano»",
            answer: ["my brother"],
            explain:
              "«My» no cambia con el género ni el número: my brother, my sister, my parents.",
          },
          {
            kind: "choose",
            prompt: "Tu padre y tu madre son tus…",
            options: ["parents", "children", "friends", "cousins"],
            answer: "parents",
            explain: "«Parents» = padres (los dos juntos).",
            speak: "parents",
          },
        ],
      },
      {
        id: "a1-family-2",
        titleEs: "Describir personas",
        titleEn: "Describing people",
        vocab: [
          { en: "tall", es: "alto" },
          { en: "short", es: "bajo / corto" },
          { en: "young", es: "joven" },
          { en: "friendly", es: "amable" },
          { en: "she has long hair", es: "ella tiene el pelo largo" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cuál es lo contrario de «tall»?",
            options: ["short", "young", "big", "slow"],
            answer: "short",
            explain:
              "«Short» sirve para personas bajas y para cosas cortas; el contexto lo aclara.",
            speak: "short",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Es un hombre alto»",
            answer: "He is a tall man",
            bank: ["He", "is", "a", "tall", "man", "short"],
            explain:
              "En inglés el adjetivo va ANTES del sustantivo: «a tall man», nunca «a man tall».",
          },
          {
            kind: "choose",
            prompt: "«She has long hair» significa:",
            options: [
              "Ella tiene el pelo largo",
              "Ella es larga",
              "Ella quiere pelo",
              "Su pelo es ella",
            ],
            answer: "Ella tiene el pelo largo",
            explain:
              "«Hair» es incontable en inglés: se dice «long hair», no «long hairs».",
            speak: "she has long hair",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «joven»",
            answer: ["young"],
            explain: "«Young» = joven. Se pronuncia /iáng/, con la «g» casi muda.",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Mi hermana es amable»",
            answer: "My sister is friendly",
            bank: ["My", "sister", "is", "friendly", "has", "very"],
            explain:
              "Las cualidades van con «to be»: «is friendly». Con «has» estarías diciendo que posee algo.",
          },
        ],
      },
      {
        id: "a1-family-3",
        titleEs: "Mi, tu, su",
        titleEn: "Possessives",
        vocab: [
          { en: "my", es: "mi" },
          { en: "your", es: "tu / su (de usted)" },
          { en: "his", es: "su (de él)" },
          { en: "her", es: "su (de ella)" },
          { en: "our", es: "nuestro" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«Este es John y ___ hermana.» ¿Qué falta?",
            options: ["her", "his", "your", "our"],
            answer: "his",
            explain:
              "Clave del inglés: el posesivo concuerda con EL DUEÑO, no con lo poseído. El dueño es John (él) → «his».",
            speak: "his sister",
          },
          {
            kind: "choose",
            prompt: "«Esta es Ana y ___ padre.» ¿Qué falta?",
            options: ["his", "her", "she", "hers"],
            answer: "her",
            explain:
              "La dueña es Ana (ella) → «her father», aunque el padre sea hombre.",
            speak: "her father",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Nuestra casa es pequeña»",
            answer: "Our house is small",
            bank: ["Our", "house", "is", "small", "ours", "we"],
            explain:
              "«Our» va antes del sustantivo; «ours» va solo («it's ours» = es nuestra).",
          },
          {
            kind: "type",
            prompt: "Completa: «What is ___ name?» (preguntando a alguien su nombre)",
            answer: ["your"],
            explain:
              "«What is your name?» = ¿cómo te llamas? Literalmente: ¿cuál es tu nombre?",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "Maria and her brother",
              "Maria and his brother",
              "Maria and their brother",
              "Maria and her's brother",
            ],
            answer: "Maria and her brother",
            explain:
              "Dueña femenina → «her». Y los posesivos nunca llevan apóstrofo: «her's» no existe.",
          },
        ],
      },
    ],
  },
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
