import type { ExtraMap } from "./index";

// Ejercicios adicionales de A2: tres por lección, para pasar de 5 a 8.
// No repiten los originales: cubren el hueco que dejaban (otra irregularidad,
// otra posición en la frase, la forma negativa o la pregunta).
export const a2Extra: ExtraMap = {
  /* ---------------- Rutinas y presente simple ---------------- */

  "a2-routines-1": [
    {
      kind: "choose",
      prompt: "«He ___ his teeth twice a day.» (brush)",
      options: ["brushes", "brushs", "brush", "brushies"],
      answer: "brushes",
      explain:
        "Terminados en -sh, -ch, -ss, -x y -o añaden -ES: brush → brushes, igual que watch → watches.",
      speak: "He brushes his teeth twice a day.",
    },
    {
      kind: "type",
      prompt: "Tercera persona de «fly»: «the bird ___»",
      answer: ["flies"],
      explain: "Consonante + y → -ies: fly → flies, try → tries. Pero play → plays (vocal + y).",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Mi padre lava el coche los domingos»",
      answer: "my father washes the car on Sundays",
      bank: ["my", "father", "washes", "the", "car", "on", "Sundays", "wash", "in"],
      explain:
        "«Washes» por la -es, y los días de la semana en plural con «on»: on Sundays = los domingos.",
    },
  ],

  "a2-routines-2": [
    {
      kind: "choose",
      prompt: "«I ___ go to the gym.» (casi nunca)",
      options: ["hardly ever", "hard", "hardly", "ever"],
      answer: "hardly ever",
      explain:
        "«Hardly ever» = casi nunca. Ojo: «hardly» solo significa «apenas», no «duramente» (eso es «hard»).",
      speak: "I hardly ever go to the gym.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «A veces trabajo desde casa»",
      answer: "sometimes I work from home",
      bank: ["sometimes", "I", "work", "from", "home", "at", "the"],
      explain:
        "«Sometimes» es el único adverbio de frecuencia que también puede abrir la frase. Y «from home», no «at home», cuando hablas del origen del trabajo.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «tres veces al mes» (4 palabras)",
      answer: ["three times a month"],
      explain: "Desde tres se usa el número + «times»: three times, four times. Una vez = once.",
    },
  ],

  "a2-routines-3": [
    {
      kind: "choose",
      prompt: "«Does he live here?» Responde que NO, en corto.",
      options: ["No, he doesn't", "No, he don't", "No, he not", "No, he doesn't live"],
      answer: "No, he doesn't",
      explain:
        "La respuesta corta acaba en el auxiliar: No, he doesn't. Repetir el verbo suena a traducción.",
      speak: "No, he doesn't.",
    },
    {
      kind: "type",
      prompt: "Pon en negativo: «She plays tennis»",
      answer: ["she doesn't play tennis", "she does not play tennis"],
      explain: "Doesn't + verbo base: la -s de «plays» desaparece porque ya está en «doesn't».",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Trabajas los viernes?»",
      answer: "do you work on Fridays?",
      bank: ["do", "you", "work", "on", "Fridays?", "does", "in"],
      explain: "Pregunta con «do» + sujeto + verbo base. Días de la semana con «on».",
    },
  ],

  /* ---------------- Hablar del pasado ---------------- */

  "a2-past-1": [
    {
      kind: "choose",
      prompt: "«There ___ a lot of people at the party.»",
      options: ["were", "was", "did", "had"],
      answer: "were",
      explain:
        "«People» es plural en inglés (no lleva -s pero es plural), así que va con «were».",
      speak: "There were a lot of people at the party.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «No estábamos cansados»",
      answer: "we weren't tired",
      bank: ["we", "weren't", "tired", "didn't", "be", "was"],
      explain: "Negativo de «were» → weren't. Con «to be» nunca se usa «didn't».",
    },
    {
      kind: "type",
      prompt: "Pasado de «there is»: «___ ___ a problem» (2 palabras)",
      answer: ["there was"],
      explain: "there is → there was (singular) · there are → there were (plural).",
    },
  ],

  "a2-past-2": [
    {
      kind: "choose",
      prompt: "Pasado de «play»:",
      options: ["played", "plaied", "plied", "playd"],
      answer: "played",
      explain: "Vocal + y NO cambia: play → played, enjoy → enjoyed. Solo cambia consonante + y.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Ayer limpié la casa»",
      answer: "I cleaned the house yesterday",
      bank: ["I", "cleaned", "the", "house", "yesterday", "clean", "did"],
      explain:
        "En afirmativa el pasado va en el verbo (cleaned). El «did» solo aparece en preguntas y negaciones.",
    },
    {
      kind: "type",
      prompt: "Completa: «Did you ___ (watch) the film?»",
      answer: ["watch"],
      explain: "Tras «did», forma base: did you watch, nunca «did you watched».",
    },
  ],

  "a2-past-3": [
    {
      kind: "choose",
      prompt: "Pasado de «buy»:",
      options: ["bought", "buyed", "brought", "boughted"],
      answer: "bought",
      explain:
        "buy → bought. Cuidado con «brought», que es el pasado de «bring» (traer): se parecen mucho.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Anoche comí pizza»",
      answer: "I ate pizza last night",
      bank: ["I", "ate", "pizza", "last", "night", "eat", "the"],
      explain: "eat → ate. «Last night» va sin artículo ni preposición.",
    },
    {
      kind: "type",
      prompt: "Pasado de «take»:",
      answer: ["took"],
      explain: "take → took → taken. El participio (taken) es el que va con «have».",
    },
  ],

  /* ---------------- Planes y futuro ---------------- */

  "a2-future-1": [
    {
      kind: "choose",
      prompt: "¿Cuál es el negativo correcto?",
      options: [
        "I'm not going to work tomorrow",
        "I don't going to work tomorrow",
        "I not am going to work",
        "I'm going not to work",
      ],
      answer: "I'm not going to work tomorrow",
      explain: "El «not» va pegado al «be»: I'm not going to… Nunca con «don't».",
      speak: "I'm not going to work tomorrow.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Van a mudarse a Madrid»",
      answer: "they are going to move to Madrid",
      bank: ["they", "are", "going", "to", "move", "to", "Madrid", "is", "will"],
      explain: "be + going to + base. Fíjate en los dos «to»: el de «going to» y el de destino.",
    },
    {
      kind: "type",
      prompt: "Escribe la pregunta: «¿Vas a venir?» (5 palabras)",
      answer: ["are you going to come", "are you going to come?"],
      explain: "En preguntas se invierte el «be»: ARE you going to…?",
    },
  ],

  "a2-future-2": [
    {
      kind: "choose",
      prompt: "«I ___ be thirty next year.»",
      options: ["will", "am going", "go to", "will to"],
      answer: "will",
      explain:
        "Un hecho futuro inevitable va con «will». Y siempre sin «to»: will be, will go.",
      speak: "I will be thirty next year.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Te llamaré esta noche»",
      answer: "I will call you tonight",
      bank: ["I", "will", "call", "you", "tonight", "to", "going"],
      explain: "will + base. En conversación se contrae: «I'll call you tonight».",
    },
    {
      kind: "type",
      prompt: "Contracción de «she will»:",
      answer: ["she'll", "shell"],
      explain: "she will → she'll. Igual: I'll, you'll, we'll, they'll, it'll.",
    },
  ],

  "a2-future-3": [
    {
      kind: "choose",
      prompt: "«What ___ you doing this weekend?»",
      options: ["are", "do", "will", "is"],
      answer: "are",
      explain:
        "Planes ya acordados → presente continuo, y la pregunta se hace con el «be»: What ARE you doing?",
      speak: "What are you doing this weekend?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Mañana ceno con Ana»",
      answer: "I'm having dinner with Ana tomorrow",
      bank: ["I'm", "having", "dinner", "with", "Ana", "tomorrow", "have", "at"],
      explain:
        "«Have dinner» = cenar (nada de «take dinner»), y en continuo porque es un plan cerrado.",
    },
    {
      kind: "type",
      prompt: "Escribe la pregunta: «¿Estás libre?» (3 palabras)",
      answer: ["are you free", "are you free?"],
      explain: "«Free» es libre de tiempo y también gratis; aquí lo aclara el contexto.",
    },
  ],

  /* ---------------- Comparar y describir ---------------- */

  "a2-compare-1": [
    {
      kind: "choose",
      prompt: "Comparativo de «happy»:",
      options: ["happier", "more happy", "happyer", "happiest"],
      answer: "happier",
      explain:
        "Dos sílabas acabadas en -y → -ier: happy → happier, easy → easier. La «y» pasa a «i».",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Este libro es más interesante que ese»",
      answer: "this book is more interesting than that one",
      bank: ["this", "book", "is", "more", "interesting", "than", "that", "one", "as"],
      explain:
        "Adjetivo largo → «more». Y «that one» = ese: en inglés no se deja el demostrativo solo.",
    },
    {
      kind: "type",
      prompt: "Comparativo de «bad»:",
      answer: ["worse"],
      explain: "bad → worse → the worst. Irregular, hay que sabérselo.",
    },
  ],

  "a2-compare-2": [
    {
      kind: "choose",
      prompt: "«It's ___ exercise of the three.» (easy)",
      options: ["the easiest", "the most easy", "the easyest", "easier"],
      answer: "the easiest",
      explain: "Acaba en -y → the easiest. Y el superlativo casi siempre lleva «the».",
      speak: "It's the easiest exercise of the three.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Es el día más feliz de mi vida»",
      answer: "it's the happiest day of my life",
      bank: ["it's", "the", "happiest", "day", "of", "my", "life", "most", "in"],
      explain: "Con periodos y grupos se usa «of»: of my life, of the year. Con lugares, «in».",
    },
    {
      kind: "type",
      prompt: "Superlativo de «far» (2 palabras, con «the»)",
      answer: ["the furthest", "the farthest"],
      explain: "far → further/farther → the furthest/the farthest. Las dos formas valen.",
    },
  ],

  "a2-compare-3": [
    {
      kind: "choose",
      prompt: "«This one isn't as good ___ that one.»",
      options: ["as", "than", "that", "like"],
      answer: "as",
      explain: "La fórmula no cambia en negativo: not as + adjetivo + AS.",
      speak: "This one isn't as good as that one.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Es tan caro como el otro»",
      answer: "it is as expensive as the other one",
      bank: ["it", "is", "as", "as", "expensive", "the", "other", "one", "than"],
      explain: "Dos «as»: uno delante del adjetivo y otro detrás. Ni «more» ni «than».",
    },
    {
      kind: "type",
      prompt: "Completa: «She's very good ___ maths» (una palabra)",
      answer: ["at"],
      explain: "«Good AT something» = bueno en algo. Nunca «good in».",
    },
  ],

  /* ---------------- Viajar y pedir cosas ---------------- */

  "a2-travel-1": [
    {
      kind: "choose",
      prompt: "«Could I ___ the menu, please?»",
      options: ["see", "watch", "look", "read"],
      answer: "see",
      explain:
        "«See the menu» o «have the menu». «Watch» es mirar algo en movimiento (una peli, un partido).",
      speak: "Could I see the menu, please?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Qué me recomienda?»",
      answer: "what do you recommend?",
      bank: ["what", "do", "you", "recommend?", "does", "recommends"],
      explain: "Pregunta con «do» y verbo base. Es la frase que más rentabiliza un restaurante.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «para llevar» (3 palabras)",
      answer: ["to take away", "to go"],
      explain: "«To take away» en Reino Unido; en EE. UU. dicen «to go». Lo contrario: «for here».",
    },
  ],

  "a2-travel-2": [
    {
      kind: "choose",
      prompt: "«Is it far ___ here?»",
      options: ["from", "of", "to", "at"],
      answer: "from",
      explain: "«Far from here» = lejos de aquí. La distancia se mide desde un punto: from.",
      speak: "Is it far from here?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Voy al trabajo en tren»",
      answer: "I go to work by train",
      bank: ["I", "go", "to", "work", "by", "train", "in", "the"],
      explain:
        "Medios de transporte con «by» y sin artículo: by train, by car, by bus. Y «go to work», sin «the».",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «a pie» (2 palabras)",
      answer: ["on foot"],
      explain: "«On foot» es la excepción: todo lo demás va con «by». También vale «I walk».",
    },
  ],

  "a2-travel-3": [
    {
      kind: "choose",
      prompt: "«Do you have this ___ a bigger size?»",
      options: ["in", "on", "at", "of"],
      answer: "in",
      explain: "Tallas y colores con «in»: in a bigger size, in blue, in medium.",
      speak: "Do you have this in a bigger size?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Puedo pagar con tarjeta?»",
      answer: "can I pay by card?",
      bank: ["can", "I", "pay", "by", "card?", "with", "the"],
      explain:
        "«Pay BY card» (método) o «pay IN cash». «Pay with my card» también se oye, pero «by card» es lo estándar.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «me lo llevo» (contracción + 2 palabras)",
      answer: ["I'll take it", "ill take it"],
      explain: "«I'll take it» cierra cualquier compra. Literal: me lo llevaré.",
    },
  ],

  /* ---------------- Presente perfecto ---------------- */

  "a2-perfect-1": [
    {
      kind: "choose",
      prompt: "Participio de «do»:",
      options: ["done", "did", "doed", "doing"],
      answer: "done",
      explain: "do → did (pasado) → done (participio). «I have done», nunca «I have did».",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Hemos terminado el trabajo»",
      answer: "we have finished the work",
      bank: ["we", "have", "finished", "the", "work", "has", "finish"],
      explain: "have + participio. Con «we» va «have»; «has» es solo para he/she/it.",
    },
    {
      kind: "type",
      prompt: "Participio de «write»:",
      answer: ["written"],
      explain: "write → wrote → written. «I have written» = he escrito.",
    },
  ],

  "a2-perfect-2": [
    {
      kind: "choose",
      prompt: "«Has she arrived ___?»",
      options: ["yet", "already", "still", "ever"],
      answer: "yet",
      explain: "«Yet» va al final en preguntas y negativas. En afirmativa sería «already».",
      speak: "Has she arrived yet?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Nunca he estado en Londres»",
      answer: "I have never been to London",
      bank: ["I", "have", "never", "been", "to", "London", "gone", "haven't"],
      explain:
        "«Been to» = haber estado y vuelto. «Gone to» significaría que sigues allí. Y con «never» el auxiliar va en positivo.",
    },
    {
      kind: "type",
      prompt: "Escribe: «Acabo de terminar» (con «just», contracción)",
      answer: ["I've just finished", "ive just finished", "I have just finished"],
      explain: "«Just» entre el auxiliar y el participio: I've JUST finished.",
    },
  ],

  "a2-perfect-3": [
    {
      kind: "choose",
      prompt: "«I haven't seen her ___ Monday.»",
      options: ["since", "for", "from", "ago"],
      answer: "since",
      explain: "«Monday» es un punto de inicio → since. «For» necesitaría una duración (for three days).",
      speak: "I haven't seen her since Monday.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Llevo aquí dos horas»",
      answer: "I have been here for two hours",
      bank: ["I", "have", "been", "here", "for", "two", "hours", "since", "am"],
      explain:
        "El español usa presente («llevo»); el inglés, presente perfecto: I HAVE BEEN here.",
    },
    {
      kind: "type",
      prompt: "Completa: «She has worked here ___ three years» (una palabra)",
      answer: ["for"],
      explain: "Duración → for. Si fuera «since 2021» sería un punto de inicio.",
    },
  ],
};
