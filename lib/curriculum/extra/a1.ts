import type { ExtraMap } from "./index";

// Ejercicios adicionales de A1: tres por lección, para pasar de 5 a 8.
// A1 es la rampa de entrada: los extra NO suben la dificultad, ensanchan lo
// mismo (el saludo que faltaba, la forma negativa, el plural, la preposición
// hermana) para que la primera semana tenga repeticiones de sobra.
export const a1Extra: ExtraMap = {
  /* ---------------- Saludos y presentaciones ---------------- */

  "a1-greetings-1": [
    {
      kind: "choose",
      prompt: "Son las cuatro de la tarde. ¿Qué saludo usas?",
      options: ["good afternoon", "good morning", "good night", "good evening"],
      answer: "good afternoon",
      explain:
        "El inglés parte el día en tres: morning (hasta las 12), afternoon (hasta las 18) y evening (a partir de ahí). «Good night» NO es un saludo: es una despedida.",
      speak: "Good afternoon.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál se usa para DESPEDIRSE, no para saludar?",
      options: ["good night", "good morning", "hello", "good afternoon"],
      answer: "good night",
      explain:
        "«Good night» sólo se dice al irse o al acostarse. Para saludar de noche: «good evening».",
      speak: "Good night!",
    },
    {
      kind: "type",
      prompt: "Escribe el saludo informal de dos letras (equivale a «hola»)",
      answer: ["hi"],
      explain: "«Hi» es la versión informal de «hello». Con amigos se usa mucho más que «hello».",
    },
  ],

  "a1-greetings-2": [
    {
      kind: "choose",
      prompt: "«___ from Colombia.» (soy de Colombia)",
      options: ["I'm", "I", "Im", "Me"],
      answer: "I'm",
      explain:
        "En inglés el verbo «to be» NUNCA se omite: I'm from Colombia. «I from…» no existe, aunque en español el «yo» sí se cae.",
      speak: "I'm from Colombia.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿De dónde eres?»",
      answer: "where are you from?",
      bank: ["where", "are", "you", "from?", "is", "of"],
      explain:
        "«From» va al final, no al principio: where are you FROM. Y es «from», no «of» (of = de posesión).",
    },
    {
      kind: "type",
      prompt: "Responde presentándote: «___ Andrés» (me llamo Andrés, forma corta con «I»)",
      answer: ["I'm Andrés", "I am Andrés", "I'm Andres", "I am Andres"],
      explain:
        "«I'm + nombre» es lo más natural para presentarse. «My name is» también vale, pero suena algo más formal.",
    },
  ],

  "a1-greetings-3": [
    {
      kind: "choose",
      prompt: "«How are you?» Ni bien ni mal. Respondes:",
      options: ["So-so", "So", "Too-too", "Such-such"],
      answer: "So-so",
      explain: "«So-so» = más o menos. Va con guion y siempre doble; «so» solo significa «tan/así».",
      speak: "So-so.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Estoy muy bien, gracias»",
      answer: "I am very well thank you",
      bank: ["I", "am", "very", "well", "thank", "you", "good", "much"],
      explain:
        "Con «I am» para estado de salud se usa «well», no «good». Y «very», no «much»: «much» no acompaña a adjetivos.",
    },
    {
      kind: "type",
      prompt: "Alguien te da las gracias. Responde «de nada» (2 palabras, empieza por «you»)",
      answer: ["you're welcome", "you are welcome", "youre welcome"],
      explain:
        "«You're welcome» = de nada. Literalmente sería «eres bienvenido», pero es la fórmula fija.",
    },
  ],

  /* ---------------- Números y la hora ---------------- */

  "a1-numbers-1": [
    {
      kind: "choose",
      prompt: "¿Cómo se dice «ocho»?",
      options: ["eight", "eigth", "aight", "eit"],
      answer: "eight",
      explain: "Se escribe eight (con gh mudo) y suena /eit/. Mismo grupo que night y light.",
      speak: "Eight.",
    },
    {
      kind: "type",
      prompt: "Escribe el número 4 en inglés",
      answer: ["four"],
      explain: "Four lleva u; pero cuarenta es «forty», SIN u. Es el error de escritura más común.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Hay seis libros»",
      answer: "there are six books",
      bank: ["there", "are", "six", "books", "is", "book"],
      explain: "Plural → «there ARE» y el sustantivo también en plural: books, no book.",
    },
  ],

  "a1-numbers-2": [
    {
      kind: "choose",
      prompt: "¿Cuál es correcta?",
      options: ["I am thirty years old", "I have thirty years", "I am thirty years", "I have thirty years old"],
      answer: "I am thirty years old",
      explain:
        "La edad va con «to be», no con «have»: I AM thirty. «I have thirty years» es traducción literal del español y suena raro.",
      speak: "I am thirty years old.",
    },
    {
      kind: "type",
      prompt: "Escribe el número 13 en inglés",
      answer: ["thirteen"],
      explain:
        "13 = thirteen (acento al final). Ojo con 30 = thirty: cambia la terminación -teen por -ty.",
    },
    {
      kind: "choose",
      prompt: "¿Qué número es «fifty»?",
      options: ["50", "15", "5", "500"],
      answer: "50",
      explain:
        "-TY = decenas (fifty 50), -TEEN = adolescentes del 13 al 19 (fifteen 15). Si dudas al oírlo, fíjate en dónde cae la fuerza.",
    },
  ],

  "a1-numbers-3": [
    {
      kind: "choose",
      prompt: "Son las 7:30. Dices:",
      options: ["It's half past seven", "It's half to seven", "It's seven and half", "It's half seven past"],
      answer: "It's half past seven",
      explain: "«Half past + hora» = y media. Y «quarter past» = y cuarto, «quarter to» = menos cuarto.",
      speak: "It's half past seven.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «El lunes trabajo»",
      answer: "on Monday I work",
      bank: ["on", "Monday", "I", "work", "in", "the"],
      explain:
        "Los días llevan «on» (on Monday) y van con mayúscula SIEMPRE, aunque estén a mitad de frase. Sin artículo: nada de «the Monday».",
    },
    {
      kind: "type",
      prompt: "Escribe «ayer» en inglés",
      answer: ["yesterday"],
      explain: "today = hoy · tomorrow = mañana · yesterday = ayer. Las tres se escriben sin artículo.",
    },
  ],

  /* ---------------- El día a día ---------------- */

  "a1-everyday-1": [
    {
      kind: "choose",
      prompt: "Pides en un bar. ¿Cuál suena EDUCADO?",
      options: ["Could I have a coffee, please?", "Give me a coffee", "I want coffee", "Coffee for me"],
      answer: "Could I have a coffee, please?",
      explain:
        "«I want» suena a orden. En inglés se pide con «could I have…?» o «I'd like…» + please. La cortesía va en la fórmula, no en el tono.",
      speak: "Could I have a coffee, please?",
    },
    {
      kind: "type",
      prompt: "Escribe «leche» en inglés",
      answer: ["milk"],
      explain: "Milk es incontable: nunca «a milk» ni «milks». Se cuenta con envase: a glass of milk.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «La cuenta, por favor»",
      answer: "the bill please",
      bank: ["the", "bill", "please", "a", "count"],
      explain:
        "«Bill» (en EE. UU. «check»), nunca «count». Y con «the», porque es LA cuenta de tu mesa, no una cualquiera.",
    },
  ],

  "a1-everyday-2": [
    {
      kind: "choose",
      prompt: "«He ___ to work by bus.» (ir)",
      options: ["goes", "gos", "go", "goe"],
      answer: "goes",
      explain: "Go termina en -o, así que en tercera persona añade -ES: goes. Igual que do → does.",
      speak: "He goes to work by bus.",
    },
    {
      kind: "type",
      prompt: "Pon en negativo: «I want coffee»",
      answer: ["I don't want coffee", "I do not want coffee", "I dont want coffee"],
      explain:
        "El negativo se forma con don't + verbo base. El verbo NO cambia; el trabajo lo hace el auxiliar.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Quieres té?»",
      answer: "do you want tea?",
      bank: ["do", "you", "want", "tea?", "does", "wants"],
      explain:
        "Pregunta con «do» + you + verbo BASE. Nunca «do you wants»: la -s ya la asume el auxiliar.",
    },
  ],

  "a1-everyday-3": [
    {
      kind: "choose",
      prompt: "«___ are these shoes?» (¿cuánto cuestan?)",
      options: ["How much", "How many", "How cost", "What much"],
      answer: "How much",
      explain:
        "Para precio siempre «how much», aunque el objeto sea plural. «How many» es para CONTAR cosas (how many shoes?).",
      speak: "How much are these shoes?",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «demasiado caro» (2 palabras)",
      answer: ["too expensive"],
      explain:
        "«Too» = demasiado (negativo). «Very expensive» es sólo muy caro; «too expensive» es tan caro que no lo compras.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Sólo estoy mirando, gracias»",
      answer: "I am just looking thanks",
      bank: ["I", "am", "just", "looking", "thanks", "only", "watching"],
      explain:
        "Fórmula fija en tiendas: «I'm just looking». «Watching» es mirar algo en movimiento (la tele), no mirar escaparates.",
    },
  ],

  /* ---------------- Familia y personas ---------------- */

  "a1-family-1": [
    {
      kind: "choose",
      prompt: "¿Cómo se dice «hijos» (chico y chica juntos)?",
      options: ["children", "childs", "childrens", "childes"],
      answer: "children",
      explain: "Plural irregular: child → children. «Childs» no existe y «childrens» tampoco: ya es plural.",
      speak: "I have two children.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «abuela»",
      answer: ["grandmother", "grandma"],
      explain: "grandmother (formal) o grandma (cariñoso). El prefijo grand- sube una generación.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Tengo dos hermanos y una hermana»",
      answer: "I have two brothers and one sister",
      bank: ["I", "have", "two", "brothers", "and", "one", "sister", "brother", "sisters"],
      explain:
        "Plural con -s en brothers porque son dos; sister en singular porque es una. En inglés el número manda sobre el sustantivo siempre.",
    },
  ],

  "a1-family-2": [
    {
      kind: "choose",
      prompt: "¿Cuál es el orden correcto?",
      options: ["a tall young man", "a young tall man", "a man tall young", "a tall man young"],
      answer: "a tall young man",
      explain:
        "El adjetivo va SIEMPRE antes del sustantivo, y si hay varios el orden es tamaño → edad → color: tall young man.",
      speak: "He is a tall young man.",
    },
    {
      kind: "type",
      prompt: "Completa: «She ___ blue eyes.» (ella tiene los ojos azules)",
      answer: ["has"],
      explain:
        "Los rasgos físicos van con «have/has», no con «to be»: she HAS blue eyes. «She is blue eyes» no tiene sentido.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Mi padre no es alto»",
      answer: "my father is not tall",
      bank: ["my", "father", "is", "not", "tall", "does", "no"],
      explain:
        "Con «to be» el negativo se hace añadiendo «not» directamente: is not (isn't). No entra «don't/doesn't».",
    },
  ],

  "a1-family-3": [
    {
      kind: "choose",
      prompt: "«The dog eats ___ food.» (su comida, del perro)",
      options: ["its", "it's", "his", "her"],
      answer: "its",
      explain:
        "«Its» sin apóstrofo es el posesivo (su). «It's» CON apóstrofo es «it is». Es el error escrito nº 1 del inglés.",
      speak: "The dog eats its food.",
    },
    {
      kind: "choose",
      prompt: "«These are ___ books.» (de ellos)",
      options: ["their", "there", "they're", "them"],
      answer: "their",
      explain:
        "Suenan igual pero: their = su (de ellos), there = allí, they're = they are. El posesivo es el que lleva la «i».",
      speak: "These are their books.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Su coche es nuevo» (de ella)",
      answer: "her car is new",
      bank: ["her", "car", "is", "new", "his", "hers"],
      explain:
        "En inglés el posesivo concuerda con el DUEÑO, no con el objeto: ella → her, aunque «car» sea masculino en español.",
    },
  ],

  /* ---------------- Lugares y direcciones ---------------- */

  "a1-places-1": [
    {
      kind: "choose",
      prompt: "«The cat is ___ the chair.» (debajo de la silla)",
      options: ["under", "on", "in", "next to"],
      answer: "under",
      explain: "under = debajo · on = encima · in = dentro · next to = al lado. Cuatro posiciones, cuatro palabras.",
      speak: "The cat is under the chair.",
    },
    {
      kind: "type",
      prompt: "Pon en negativo: «There is a problem»",
      answer: [
        "there is not a problem",
        "there isn't a problem",
        "there isnt a problem",
        "there is no problem",
      ],
      explain:
        "Con «there is» el negativo va pegado al verbo: there isn't. También vale «there is no problem» (sin artículo).",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Hay un baño aquí?»",
      answer: "is there a bathroom here?",
      bank: ["is", "there", "a", "bathroom", "here?", "are", "have"],
      explain:
        "Para preguntar se da la vuelta: there is → IS THERE. No se usa «have» para «hay», ese es el error clásico.",
    },
  ],

  "a1-places-2": [
    {
      kind: "choose",
      prompt: "Necesitas dinero en efectivo. Vas al…",
      options: ["bank", "bakery", "library", "bookshop"],
      answer: "bank",
      explain:
        "bank = banco (dinero). Ojo con «library»: NO es librería, es biblioteca. La librería es «bookshop».",
      speak: "I am going to the bank.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «supermercado»",
      answer: ["supermarket"],
      explain: "Supermarket, en una sola palabra y sin espacio ni guion.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Vivo cerca del parque»",
      answer: "I live near the park",
      bank: ["I", "live", "near", "the", "park", "close", "of"],
      explain:
        "«Near + lugar» ya significa «cerca de»: no lleva «of». Con «close» sí: close TO the park.",
    },
  ],

  "a1-places-3": [
    {
      kind: "choose",
      prompt: "«Go ___ the bridge.» (cruza el puente)",
      options: ["across", "cross", "through", "over to"],
      answer: "across",
      explain:
        "across = de un lado a otro por encima de una superficie. «Through» es atravesar algo por dentro (a través del túnel).",
      speak: "Go across the bridge.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «gira a la derecha» (2 palabras)",
      answer: ["turn right"],
      explain: "left = izquierda, right = derecha. Sin preposición: turn right, no «turn to the right».",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Está a la izquierda»",
      answer: "it is on the left",
      bank: ["it", "is", "on", "the", "left", "at", "in"],
      explain:
        "La posición fija va con «on the left / on the right». «To the left» es el movimiento, no el lugar.",
    },
  ],

  /* ---------------- El tiempo y el calendario ---------------- */

  "a1-weather-1": [
    {
      kind: "choose",
      prompt: "Está nublado. Dices:",
      options: ["It's cloudy", "It's clouds", "It's cloud", "There's cloudy"],
      answer: "It's cloudy",
      explain:
        "El tiempo va con «it's» + adjetivo: cloudy, sunny, windy, rainy. Todos acaban en -y porque son adjetivos, no sustantivos.",
      speak: "It's cloudy today.",
    },
    {
      kind: "type",
      prompt: "Completa: «It's ___ .» (está nevando, verbo snow en -ing)",
      answer: ["snowing"],
      explain:
        "Lloviendo/nevando son acciones en curso: it's raining, it's snowing. Con -ing, no con adjetivo.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Hace mucho calor hoy»",
      answer: "it is very hot today",
      bank: ["it", "is", "very", "hot", "today", "makes", "much"],
      explain:
        "«Hacer» calor NO se traduce con «make»: es «it is hot». Y con adjetivos se usa «very», nunca «much».",
    },
  ],

  "a1-weather-2": [
    {
      kind: "choose",
      prompt: "¿Cuál es el orden correcto de las estaciones?",
      options: [
        "spring, summer, autumn, winter",
        "summer, spring, winter, autumn",
        "winter, autumn, summer, spring",
        "autumn, winter, spring, summer",
      ],
      answer: "spring, summer, autumn, winter",
      explain:
        "spring (primavera) → summer → autumn (fall en EE. UU.) → winter. Las estaciones van en minúscula; los meses, en mayúscula.",
    },
    {
      kind: "type",
      prompt: "Escribe «diciembre» en inglés",
      answer: ["December"],
      explain: "December, con D mayúscula: en inglés TODOS los meses van con mayúscula inicial.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Voy de vacaciones en agosto»",
      answer: "I go on holiday in August",
      bank: ["I", "go", "on", "holiday", "in", "August", "at", "vacations"],
      explain:
        "Meses con «in» (in August), días con «on». Y «holiday» en singular, aunque en español sean «vacaciones».",
    },
  ],

  "a1-weather-3": [
    {
      kind: "choose",
      prompt: "¿Qué te pones si hace frío y llueve?",
      options: ["a raincoat", "a swimsuit", "sunglasses", "sandals"],
      answer: "a raincoat",
      explain: "raincoat = impermeable. Se forma juntando rain + coat, como en swimsuit (swim + suit).",
      speak: "I need a raincoat.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «pantalones» (palabra que siempre va en plural)",
      answer: ["trousers", "pants"],
      explain:
        "Trousers (Reino Unido) o pants (EE. UU.), siempre en plural, como scissors o glasses: son cosas de dos partes.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Ella no lleva abrigo hoy»",
      answer: "she is not wearing a coat today",
      bank: ["she", "is", "not", "wearing", "a", "coat", "today", "does", "wear"],
      explain:
        "Lo que llevas puesto AHORA va en presente continuo: is wearing. «She wears a coat» sería una costumbre, no hoy.",
    },
  ],
};
