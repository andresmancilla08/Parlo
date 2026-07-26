import type { Unit } from "../types";

// Nivel A1. Explicaciones SIEMPRE en español: es el diferenciador.
export const a1: Unit[] = [
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
    id: "a1-places",
    level: "A1",
    titleEs: "Lugares y direcciones",
    titleEn: "Places & directions",
    lessons: [
      {
        id: "a1-places-1",
        titleEs: "¿Dónde está?",
        titleEn: "Where is it?",
        vocab: [
          { en: "there is", es: "hay (singular)" },
          { en: "there are", es: "hay (plural)" },
          { en: "in", es: "en (dentro)" },
          { en: "on", es: "en (encima)" },
          { en: "next to", es: "al lado de" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "«___ a book on the table.» (hay un libro)",
            options: ["There is", "There are", "It has", "Have"],
            answer: "There is",
            explain:
              "«Hay» se dice «there is» con singular y «there are» con plural. Nunca «it has».",
            speak: "there is a book on the table",
          },
          {
            kind: "choose",
            prompt: "«___ three chairs in the room.»",
            options: ["There is", "There are", "There have", "It is"],
            answer: "There are",
            explain: "«Three chairs» es plural → «there are».",
            speak: "there are three chairs in the room",
          },
          {
            kind: "choose",
            prompt: "El libro está ENCIMA de la mesa: «The book is ___ the table.»",
            options: ["in", "on", "at", "under"],
            answer: "on",
            explain:
              "«On» = sobre una superficie; «in» = dentro; «under» = debajo. El español usa «en» para casi todo, por eso cuesta.",
            speak: "the book is on the table",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Las llaves están en el bolso»",
            answer: "The keys are in the bag",
            bank: ["The", "keys", "are", "in", "the", "bag", "on", "is"],
            explain: "Dentro de algo → «in». Y «keys» es plural → «are».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «al lado de»",
            answer: ["next to"],
            explain: "«Next to» = al lado de. También vale «beside».",
          },
        ],
      },
      {
        id: "a1-places-2",
        titleEs: "En la ciudad",
        titleEn: "Around town",
        vocab: [
          { en: "street", es: "calle" },
          { en: "shop", es: "tienda" },
          { en: "train station", es: "estación de tren" },
          { en: "hospital", es: "hospital" },
          { en: "park", es: "parque" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se dice «tienda»?",
            options: ["shop", "shirt", "ship", "sheep"],
            answer: "shop",
            explain:
              "«Shop» = tienda (en EE. UU. también «store»). Ojo con «ship» (barco) y «sheep» (oveja).",
            speak: "shop",
          },
          {
            kind: "choose",
            prompt: "Vas a coger un tren. Vas a la…",
            options: ["train station", "bus stop", "airport", "park"],
            answer: "train station",
            explain: "«Train station» = estación de tren; «bus stop» = parada de autobús.",
            speak: "train station",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Hay un parque cerca de mi casa»",
            answer: "There is a park near my house",
            bank: ["There", "is", "a", "park", "near", "my", "house", "are", "in"],
            explain: "«Near» = cerca de. Fíjate: «near my house», sin «of».",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «calle»",
            answer: ["street"],
            explain: "«Street» = calle. En direcciones se abrevia «St.».",
          },
          {
            kind: "choose",
            prompt: "«I live ___ Main Street.»",
            options: ["on", "in", "at", "to"],
            answer: "on",
            explain:
              "Con el nombre de una calle se usa «on» (EE. UU.) o «in» (Reino Unido); con el número exacto, «at 25 Main Street».",
            speak: "I live on Main Street",
          },
        ],
      },
      {
        id: "a1-places-3",
        titleEs: "Pedir direcciones",
        titleEn: "Asking for directions",
        vocab: [
          { en: "excuse me", es: "disculpe" },
          { en: "where is…?", es: "¿dónde está…?" },
          { en: "turn left", es: "gira a la izquierda" },
          { en: "go straight", es: "sigue recto" },
          { en: "it's over there", es: "está por allí" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Vas a preguntar a un desconocido. Empiezas con:",
            options: ["Excuse me", "Sorry me", "Please you", "Hey you"],
            answer: "Excuse me",
            explain:
              "«Excuse me» se usa para llamar la atención de alguien; «sorry» es para pedir perdón.",
            speak: "excuse me",
          },
          {
            kind: "bank",
            prompt: "Traduce: «¿Dónde está la estación?»",
            answer: "Where is the station?",
            bank: ["Where", "is", "the", "station", "?", "are", "does"],
            explain: "«Where is…?» = ¿dónde está…? El verbo va antes del sujeto en la pregunta.",
          },
          {
            kind: "choose",
            prompt: "«___ left at the bank.» (gira a la izquierda)",
            options: ["Turn", "Go", "Take", "Walk"],
            answer: "Turn",
            explain: "«Turn left/right» = girar. «Go straight» = seguir recto.",
            speak: "turn left at the bank",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «sigue recto»",
            answer: ["go straight", "go straight ahead"],
            explain: "«Go straight» (o «go straight ahead») = sigue recto.",
          },
          {
            kind: "choose",
            prompt: "Te preguntan por el baño y está allí enfrente. Respondes:",
            options: ["It's over there", "It's over here", "There it is not", "Is there"],
            answer: "It's over there",
            explain: "«Over there» = por allí (lejos de quien habla); «over here» = por aquí.",
            speak: "it's over there",
          },
        ],
      },
    ],
  },
  {
    id: "a1-weather",
    level: "A1",
    titleEs: "El tiempo y el calendario",
    titleEn: "Weather & calendar",
    lessons: [
      {
        id: "a1-weather-1",
        titleEs: "¿Qué tiempo hace?",
        titleEn: "What's the weather like?",
        vocab: [
          { en: "it's sunny", es: "hace sol" },
          { en: "it's raining", es: "está lloviendo" },
          { en: "it's cold", es: "hace frío" },
          { en: "it's hot", es: "hace calor" },
          { en: "windy", es: "ventoso" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Hace sol. Dices:",
            options: ["It's sunny", "It does sun", "There is sun", "It has sun"],
            answer: "It's sunny",
            explain:
              "El clima siempre lleva «it»: it's sunny, it's cold. En español no hay sujeto («hace sol»), en inglés es obligatorio.",
            speak: "it's sunny",
          },
          {
            kind: "choose",
            prompt: "Hace frío. Dices:",
            options: ["I have cold", "It's cold", "It makes cold", "There is cold"],
            answer: "It's cold",
            explain:
              "Error clásico: «I have cold» sería «tengo un resfriado». Para el clima: «it's cold».",
            speak: "it's cold",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Está lloviendo hoy»",
            answer: "It is raining today",
            bank: ["It", "is", "raining", "today", "rains", "there"],
            explain:
              "Lo que ocurre AHORA va en presente continuo: «is raining», no «rains».",
          },
          {
            kind: "type",
            prompt: "Escribe la pregunta: «¿Qué tiempo hace?»",
            answer: ["what is the weather like?", "what is the weather like", "what's the weather like?", "what's the weather like"],
            explain:
              "«What's the weather like?» es la forma natural. Literalmente: ¿a qué se parece el tiempo?",
          },
          {
            kind: "choose",
            prompt: "«Windy» significa:",
            options: ["ventoso", "nublado", "húmedo", "helado"],
            answer: "ventoso",
            explain: "«Wind» = viento → «windy» = ventoso. Igual que cloud → cloudy.",
          },
        ],
      },
      {
        id: "a1-weather-2",
        titleEs: "Meses y estaciones",
        titleEn: "Months & seasons",
        vocab: [
          { en: "January", es: "enero" },
          { en: "July", es: "julio" },
          { en: "summer", es: "verano" },
          { en: "winter", es: "invierno" },
          { en: "birthday", es: "cumpleaños" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "¿Cómo se escribe «enero»?",
            options: ["January", "Janary", "Enero", "Jenuary"],
            answer: "January",
            explain:
              "Los meses en inglés SIEMPRE van con mayúscula: January, February… En español no.",
            speak: "January",
          },
          {
            kind: "choose",
            prompt: "«Summer» es:",
            options: ["verano", "invierno", "otoño", "primavera"],
            answer: "verano",
            explain: "summer = verano · winter = invierno · spring = primavera · autumn/fall = otoño.",
            speak: "summer",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Mi cumpleaños es en julio»",
            answer: "My birthday is in July",
            bank: ["My", "birthday", "is", "in", "July", "on", "at"],
            explain: "Con meses se usa «in»: in July. Con días, «on»: on Monday.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «invierno»",
            answer: ["winter"],
            explain: "«Winter» = invierno.",
          },
          {
            kind: "choose",
            prompt: "¿Cuál es correcta?",
            options: [
              "I was born in 1995",
              "I was born on 1995",
              "I born in 1995",
              "I am born in 1995",
            ],
            answer: "I was born in 1995",
            explain:
              "«Nací» = «I was born» (pasado del verbo to be + born). Con años se usa «in».",
          },
        ],
      },
      {
        id: "a1-weather-3",
        titleEs: "Ropa para cada clima",
        titleEn: "Clothes for the weather",
        vocab: [
          { en: "coat", es: "abrigo" },
          { en: "shoes", es: "zapatos" },
          { en: "T-shirt", es: "camiseta" },
          { en: "to wear", es: "llevar puesto" },
          { en: "umbrella", es: "paraguas" },
        ],
        exercises: [
          {
            kind: "choose",
            prompt: "Hace frío, así que llevas un…",
            options: ["coat", "T-shirt", "umbrella", "hat"],
            answer: "coat",
            explain: "«Coat» = abrigo.",
            speak: "coat",
          },
          {
            kind: "choose",
            prompt: "«Llevar puesto» (ropa) es:",
            options: ["to wear", "to carry", "to take", "to bring"],
            answer: "to wear",
            explain:
              "«Wear» es llevar puesto; «carry» es llevar cargando algo. En español usamos «llevar» para las dos.",
            speak: "to wear",
          },
          {
            kind: "bank",
            prompt: "Traduce: «Está lloviendo, necesito un paraguas»",
            answer: "It is raining, I need an umbrella",
            bank: ["It", "is", "raining", "I", "need", "an", "umbrella", "a", "the"],
            explain:
              "«An» y no «a» porque «umbrella» empieza por sonido vocálico.",
          },
          {
            kind: "type",
            prompt: "Escribe en inglés: «zapatos»",
            answer: ["shoes"],
            explain: "«Shoes» ya es plural; un zapato es «a shoe».",
          },
          {
            kind: "choose",
            prompt: "«She ___ a red T-shirt today.»",
            options: ["is wearing", "wears", "wear", "is wear"],
            answer: "is wearing",
            explain:
              "Hoy, ahora mismo → presente continuo: «is wearing». «She wears» sería su costumbre.",
            speak: "she is wearing a red T-shirt today",
          },
        ],
      },
    ],
  },
];
