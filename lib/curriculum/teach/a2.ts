import type { TeachMap } from "./types";

// Teoría de A2.
export const a2Teach: TeachMap = {
  /* ---------------- Rutinas y presente simple ---------------- */

  "a2-routines-1": [
    {
      kind: "idea",
      title: "Toda la conjugación en una letra",
      body:
        "El presente simple inglés es igual para todas las personas menos he, she e it, que llevan «-s». Suena a poca cosa, pero es el error número uno de los hispanohablantes durante años.",
    },
    {
      kind: "table",
      title: "Cómo se añade la -s",
      head: ["Terminación del verbo", "Tercera persona"],
      rows: [
        ["Normal", "work → works"],
        ["-o, -ch, -sh, -ss, -x", "go → goes · watch → watches"],
        ["consonante + y", "study → studies"],
        ["vocal + y", "play → plays"],
        ["Irregular", "have → has"],
      ],
    },
    {
      kind: "pitfall",
      title: "La -s es SOLO de he/she/it",
      wrong: "They works here.",
      right: "They work here.",
      body:
        "Con I, you, we y they el verbo va limpio. Si el sujeto se puede sustituir por «he» o «she», entonces sí lleva -s.",
    },
    {
      kind: "examples",
      title: "Rutinas de otra persona",
      items: [
        { en: "She works in a bank.", es: "Ella trabaja en un banco." },
        { en: "He goes to the gym every day.", es: "Él va al gimnasio todos los días." },
        { en: "My brother watches TV at night.", es: "Mi hermano ve la tele por la noche." },
        { en: "It costs ten euros.", es: "Cuesta diez euros." },
      ],
    },
  ],

  "a2-routines-2": [
    {
      kind: "idea",
      title: "La frecuencia tiene sitio fijo en la frase",
      body:
        "Always, usually, sometimes y never van ANTES del verbo principal… salvo con «to be», que los pone detrás. Es una regla mecánica: aprendida una vez, ya no falla.",
    },
    {
      kind: "table",
      title: "De siempre a nunca",
      head: ["Adverbio", "Frecuencia"],
      rows: [
        ["always", "100 % · siempre"],
        ["usually", "~80 % · normalmente"],
        ["often", "~60 % · a menudo"],
        ["sometimes", "~40 % · a veces"],
        ["never", "0 % · nunca"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Never» ya es negativo",
      wrong: "I don't never eat meat.",
      right: "I never eat meat.",
      body:
        "La doble negación española no existe en inglés estándar. Con never, el verbo va en positivo.",
    },
    {
      kind: "examples",
      title: "Antes del verbo, después de «be»",
      items: [
        { en: "I always drink coffee.", es: "Siempre bebo café.", note: "antes del verbo" },
        { en: "She is usually late.", es: "Ella normalmente llega tarde.", note: "después de «is»" },
        { en: "I go to the gym twice a week.", es: "Voy al gimnasio dos veces por semana." },
        { en: "How often do you cook?", es: "¿Con qué frecuencia cocinas?" },
      ],
    },
  ],

  "a2-routines-3": [
    {
      kind: "idea",
      title: "Para preguntar y negar hace falta un auxiliar",
      body:
        "El inglés no puede negar ni preguntar con el verbo suelto: necesita «do» o «does». Y en cuanto aparecen, el verbo principal vuelve a su forma base.",
    },
    {
      kind: "table",
      title: "El esquema",
      head: ["Tipo", "Estructura"],
      rows: [
        ["Afirmativa", "She likes coffee"],
        ["Negativa", "She doesn't like coffee"],
        ["Pregunta", "Does she like coffee?"],
        ["Respuesta corta", "Yes, she does / No, she doesn't"],
      ],
    },
    {
      kind: "pitfall",
      title: "La -s viaja al auxiliar",
      wrong: "Does she likes coffee?",
      right: "Does she like coffee?",
      body:
        "La «-s» ya está dentro de «does» y «doesn't». Ponerla dos veces es como decir «ella comes».",
    },
    {
      kind: "examples",
      title: "Preguntar por costumbres",
      items: [
        { en: "Do you live here?", es: "¿Vives aquí?" },
        { en: "Yes, I do.", es: "Sí.", note: "se responde con el auxiliar" },
        { en: "He doesn't work on Sunday.", es: "Él no trabaja los domingos." },
        { en: "Where does your brother work?", es: "¿Dónde trabaja tu hermano?" },
      ],
    },
  ],

  /* ---------------- Hablar del pasado ---------------- */

  "a2-past-1": [
    {
      kind: "idea",
      title: "El pasado de «to be» va por libre",
      body:
        "«To be» es el único verbo que no usa «did» para preguntar ni negar: se apaña solo con was y were, igual que en presente hace con am/is/are.",
    },
    {
      kind: "table",
      title: "was / were",
      head: ["Sujeto", "Pasado"],
      rows: [
        ["I / he / she / it", "was"],
        ["you / we / they", "were"],
        ["Negativo", "wasn't · weren't"],
        ["Pregunta", "Was I…? · Were you…?"],
      ],
    },
    {
      kind: "pitfall",
      title: "Con «to be» no hay «didn't»",
      wrong: "I didn't was at home.",
      right: "I wasn't at home.",
      body:
        "«Didn't» es para los demás verbos. «To be» niega añadiendo «not»: was not → wasn't.",
    },
    {
      kind: "examples",
      title: "Dónde estabas",
      items: [
        { en: "I was at home yesterday.", es: "Ayer estaba en casa." },
        { en: "They were very tired.", es: "Estaban muy cansados." },
        { en: "I wasn't at home last night.", es: "Anoche no estaba en casa." },
        { en: "Were you at the party?", es: "¿Estuviste en la fiesta?" },
      ],
    },
  ],

  "a2-past-2": [
    {
      kind: "idea",
      title: "-ed para todas las personas",
      body:
        "Buena noticia: el pasado regular no cambia con la persona. I worked, she worked, they worked. Solo hay que cuidar cómo se escribe el -ed.",
    },
    {
      kind: "table",
      title: "Ortografía del -ed",
      head: ["Verbo", "Pasado"],
      rows: [
        ["Normal", "work → worked"],
        ["Acaba en -e", "arrive → arrived"],
        ["consonante + y", "study → studied"],
        ["cvc corta y tónica", "stop → stopped"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Didn't» ya marca el pasado",
      wrong: "I didn't worked yesterday.",
      right: "I didn't work yesterday.",
      body:
        "Con did/didn't el verbo vuelve a la forma base. El pasado ya está dicho una vez; repetirlo sobra.",
    },
    {
      kind: "examples",
      title: "Contar lo que pasó",
      items: [
        { en: "I worked from home yesterday.", es: "Ayer trabajé desde casa." },
        { en: "She arrived at nine.", es: "Ella llegó a las nueve." },
        { en: "We studied all night.", es: "Estudiamos toda la noche." },
        { en: "I didn't work yesterday.", es: "Ayer no trabajé." },
      ],
    },
  ],

  "a2-past-3": [
    {
      kind: "idea",
      title: "Los irregulares se aprenden por uso, no por regla",
      body:
        "No hay lógica que los explique: hay que reconocerlos. La ventaja es que los realmente frecuentes son unos treinta, y con diez ya te defiendes en cualquier conversación.",
    },
    {
      kind: "table",
      title: "Los diez más usados",
      head: ["Presente", "Pasado"],
      rows: [
        ["go · have", "went · had"],
        ["see · say", "saw · said"],
        ["make · do", "made · did"],
        ["get · take", "got · took"],
        ["come · give", "came · gave"],
      ],
    },
    {
      kind: "pitfall",
      title: "Después de «did», forma base",
      wrong: "Did you went to the party?",
      right: "Did you go to the party?",
      body:
        "La pregunta ya está en pasado gracias a «did». El verbo principal se queda en base, aunque suene raro al principio.",
    },
    {
      kind: "examples",
      title: "Pasado en conversación",
      items: [
        { en: "I went to the cinema last night.", es: "Anoche fui al cine." },
        { en: "We had a great time.", es: "Lo pasamos genial." },
        { en: "I saw her yesterday.", es: "La vi ayer.", note: "her, no she" },
        { en: "She said no.", es: "Dijo que no.", note: "suena /sed/" },
      ],
    },
  ],

  /* ---------------- Planes y futuro ---------------- */

  "a2-future-1": [
    {
      kind: "idea",
      title: "«Going to» = ya lo tenías pensado",
      body:
        "Es el futuro de los planes: lo decidiste antes de esta conversación. La estructura tiene tres piezas y ninguna se puede saltar: be + going to + verbo base.",
    },
    {
      kind: "table",
      title: "La estructura",
      head: ["Sujeto + be", "going to + base"],
      rows: [
        ["I am", "going to travel"],
        ["She is", "going to study"],
        ["We are", "going to buy a car"],
        ["Pregunta", "What are you going to do?"],
      ],
    },
    {
      kind: "pitfall",
      title: "El «be» no se puede omitir",
      wrong: "She going to study. / I will going to travel.",
      right: "She is going to study. / I'm going to travel.",
      body:
        "En español «voy a estudiar» lleva un solo verbo auxiliar; en inglés hacen falta los dos: is + going to.",
    },
    {
      kind: "examples",
      title: "Planes ya decididos",
      items: [
        { en: "I'm going to travel next month.", es: "Voy a viajar el mes que viene." },
        { en: "She is going to study tonight.", es: "Ella va a estudiar esta noche." },
        { en: "What are you going to do tomorrow?", es: "¿Qué vas a hacer mañana?" },
        { en: "We're going to buy a car.", es: "Vamos a comprar un coche." },
      ],
    },
  ],

  "a2-future-2": [
    {
      kind: "idea",
      title: "«Will» = lo decides ahora mismo",
      body:
        "Si alguien dice que le pesa la bolsa y tú te ofreces en ese instante: «I'll help you». Es una decisión espontánea, una promesa o una predicción sin pruebas delante.",
    },
    {
      kind: "table",
      title: "will o going to",
      head: ["Situación", "Se usa"],
      rows: [
        ["Decisión en el momento", "will"],
        ["Promesa u ofrecimiento", "will"],
        ["Predicción con opinión (I think…)", "will"],
        ["Plan ya decidido", "going to"],
        ["Evidencia a la vista (nubes negras)", "going to"],
      ],
    },
    {
      kind: "pitfall",
      title: "Tras «will», verbo base",
      wrong: "It will rains tomorrow. / I will to help you.",
      right: "It will rain tomorrow. / I will help you.",
      body:
        "«Will» no admite -s ni «to» detrás. Y su negativo es irregular: will not → won't.",
    },
    {
      kind: "examples",
      title: "Ofrecerse y predecir",
      items: [
        { en: "Don't worry, I'll help you.", es: "No te preocupes, te ayudo." },
        { en: "I think it will rain tomorrow.", es: "Creo que lloverá mañana." },
        { en: "I won't be late, I promise.", es: "No llegaré tarde, te lo prometo." },
        { en: "Look at those clouds! It's going to rain.", es: "¡Mira esas nubes! Va a llover." },
      ],
    },
  ],

  "a2-future-3": [
    {
      kind: "idea",
      title: "La agenda se dice en presente continuo",
      body:
        "Cuando la cita ya está cerrada (hora, sitio, otra persona implicada), el inglés natural usa presente continuo: «I'm meeting Ana at six». Usar «will» ahí suena a que lo acabas de decidir.",
    },
    {
      kind: "table",
      title: "Preposiciones de la agenda",
      head: ["Cuándo", "Preposición"],
      rows: [
        ["Hora", "at five"],
        ["Día", "on Friday"],
        ["Mes / año", "in May · in 2026"],
        ["Este/próximo", "tonight · next week (sin preposición)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Next week» no lleva «the»",
      wrong: "I'm free the next week.",
      right: "I'm free next week.",
      body:
        "Con next y last no se pone artículo: next week, last night. Tampoco se dice «in next week».",
    },
    {
      kind: "examples",
      title: "Quedar con alguien",
      items: [
        { en: "I'm meeting Ana at six.", es: "He quedado con Ana a las seis." },
        { en: "Are you free on Friday?", es: "¿Estás libre el viernes?" },
        { en: "I have an appointment at five.", es: "Tengo una cita a las cinco." },
        { en: "We're flying on Monday.", es: "Volamos el lunes.", note: "billetes ya comprados" },
      ],
    },
  ],

  /* ---------------- Comparar y describir ---------------- */

  "a2-compare-1": [
    {
      kind: "idea",
      title: "La longitud del adjetivo manda",
      body:
        "Adjetivo corto (una sílaba) → se le pega «-er». Adjetivo largo (tres o más) → se le pone «more» delante. Y el «que» de la comparación es «than», nunca «that».",
    },
    {
      kind: "table",
      title: "Cómo se forma",
      head: ["Adjetivo", "Comparativo"],
      rows: [
        ["1 sílaba: small", "smaller"],
        ["cvc: big", "bigger (duplica)"],
        ["acaba en -y: happy", "happier"],
        ["3+ sílabas: expensive", "more expensive"],
        ["Irregulares", "good → better · bad → worse"],
      ],
    },
    {
      kind: "pitfall",
      title: "Nunca los dos a la vez",
      wrong: "He is more tall than me. / more taller",
      right: "He is taller than me.",
      body:
        "O «-er» o «more», jamás juntos. Y para dos sílabas normalmente vale «more» salvo si acaban en -y (happier, easier).",
    },
    {
      kind: "examples",
      title: "Comparar dos cosas",
      items: [
        { en: "This car is bigger than mine.", es: "Este coche es más grande que el mío." },
        { en: "My house is smaller than yours.", es: "Mi casa es más pequeña que la tuya." },
        { en: "It's more expensive than the other one.", es: "Es más caro que el otro." },
        { en: "Today is better than yesterday.", es: "Hoy es mejor que ayer." },
      ],
    },
  ],

  "a2-compare-2": [
    {
      kind: "idea",
      title: "El superlativo casi siempre lleva «the»",
      body:
        "Si dices que algo es el máximo de un grupo, va con artículo: the biggest, the best. Y el grupo se marca con «in» cuando es un lugar: the best restaurant in Madrid.",
    },
    {
      kind: "table",
      title: "Los tres grados",
      head: ["Adjetivo", "Comparativo → superlativo"],
      rows: [
        ["big", "bigger → the biggest"],
        ["interesting", "more interesting → the most interesting"],
        ["good", "better → the best"],
        ["bad", "worse → the worst"],
      ],
    },
    {
      kind: "pitfall",
      title: "«In», no «of», con lugares",
      wrong: "The tallest building of the city.",
      right: "The tallest building in the city.",
      body:
        "Con lugares se usa «in». «Of» se reserva para periodos y grupos: the best film of the year, the tallest of the three.",
    },
    {
      kind: "examples",
      title: "El máximo de todos",
      items: [
        { en: "It's the biggest city in the world.", es: "Es la ciudad más grande del mundo." },
        { en: "This is the best coffee in town.", es: "Este es el mejor café de la ciudad." },
        { en: "It's the most interesting film of the year.", es: "Es la película más interesante del año." },
        { en: "That was the worst day of my life.", es: "Fue el peor día de mi vida." },
      ],
    },
  ],

  "a2-compare-3": [
    {
      kind: "idea",
      title: "Cuando dos cosas empatan: as … as",
      body:
        "Para decir «tan alto como» se rodea el adjetivo con dos «as». En negativo, la fórmula no cambia: «not as expensive as» = no tan caro como.",
    },
    {
      kind: "table",
      title: "Cada adjetivo pide su preposición",
      head: ["Español", "Inglés"],
      rows: [
        ["igual que", "the same as"],
        ["diferente de", "different from"],
        ["parecido a", "similar to"],
        ["bueno en", "good at"],
        ["interesado en", "interested in"],
      ],
    },
    {
      kind: "pitfall",
      title: "«The same as», no «the same than»",
      wrong: "My phone is the same than yours.",
      right: "My phone is the same as yours.",
      body:
        "«Than» solo aparece con comparativos (-er, more). En cuanto usas «same», «as» o «similar», cambia la preposición.",
    },
    {
      kind: "examples",
      title: "Comparar sin ganador",
      items: [
        { en: "She is as tall as her brother.", es: "Es tan alta como su hermano." },
        { en: "This hotel isn't as expensive as the other one.", es: "Este hotel no es tan caro como el otro." },
        { en: "My phone is the same as yours.", es: "Mi teléfono es igual que el tuyo." },
        { en: "It's similar to mine.", es: "Es parecido al mío." },
      ],
    },
  ],

  /* ---------------- Viajar y pedir cosas ---------------- */

  "a2-travel-1": [
    {
      kind: "idea",
      title: "Pedir bien es media conversación",
      body:
        "En inglés la cortesía no está en el tono, está en la fórmula. «I'd like» y «Could I have…?» son las dos que resuelven cualquier restaurante.",
    },
    {
      kind: "table",
      title: "En la mesa, paso a paso",
      head: ["Momento", "Frase"],
      rows: [
        ["Al entrar", "A table for two, please"],
        ["Al pedir", "I'd like the chicken, please"],
        ["Pedir algo más", "Could I have some water?"],
        ["Al terminar", "The bill, please"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I want» suena a exigencia",
      wrong: "I want a coffee.",
      right: "I'd like a coffee, please.",
      body:
        "No es incorrecto, es maleducado. «I'd like» es la contracción de «I would like» y es lo que dice todo el mundo.",
    },
    {
      kind: "examples",
      title: "Restaurante completo",
      items: [
        { en: "A table for two, please.", es: "Una mesa para dos, por favor." },
        { en: "Are you ready to order?", es: "¿Están listos para pedir?", note: "lo dice el camarero" },
        { en: "I'd like a starter first.", es: "Quisiera un entrante primero." },
        { en: "Could I have the bill, please?", es: "¿Me trae la cuenta, por favor?" },
      ],
    },
  ],

  "a2-travel-2": [
    {
      kind: "idea",
      title: "«Get to» es llegar a",
      body:
        "«How do I get to…?» es la fórmula fija para pedir indicaciones. Y para el tiempo que se tarda, el inglés usa un «it» impersonal: «it takes twenty minutes».",
    },
    {
      kind: "table",
      title: "Transporte",
      head: ["Español", "Inglés"],
      rows: [
        ["en autobús / en coche", "by bus · by car"],
        ["a pie", "on foot"],
        ["ida y vuelta", "a return ticket"],
        ["solo ida", "a single / one-way ticket"],
        ["tarda 20 minutos", "it takes 20 minutes"],
      ],
    },
    {
      kind: "pitfall",
      title: "Duración: «how long», no «how much time»",
      wrong: "How much time does it take?",
      right: "How long does it take?",
      body:
        "«How long» es la pregunta natural para duración. «How much time» se entiende, pero nadie lo dice.",
    },
    {
      kind: "examples",
      title: "Moverte por la ciudad",
      items: [
        { en: "How do I get to the station?", es: "¿Cómo llego a la estación?" },
        { en: "How long does it take by bus?", es: "¿Cuánto se tarda en autobús?" },
        { en: "A return ticket, please.", es: "Un billete de ida y vuelta, por favor." },
        { en: "Turn left at the traffic lights.", es: "Gira a la izquierda en el semáforo." },
      ],
    },
  ],

  "a2-travel-3": [
    {
      kind: "idea",
      title: "Verbos con partícula: try on, check in",
      body:
        "El inglés cotidiano funciona a base de verbo + partícula, y la partícula cambia el significado por completo: check in (registrarse) y check out (dejar el hotel) no se parecen en nada.",
    },
    {
      kind: "table",
      title: "Los del viaje",
      head: ["Inglés", "Español"],
      rows: [
        ["try on", "probarse (ropa)"],
        ["check in / check out", "registrarse / dejar el hotel"],
        ["book a room", "reservar una habitación"],
        ["a single / double room", "habitación individual / doble"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Prove» no es probarse",
      wrong: "Can I prove these jeans?",
      right: "Can I try these jeans on?",
      body:
        "«Prove» es demostrar algo. Probarse ropa es «try on»; probar comida es «try» o «taste».",
    },
    {
      kind: "examples",
      title: "Tienda y hotel",
      items: [
        { en: "How much is this jacket?", es: "¿Cuánto cuesta esta chaqueta?" },
        { en: "Can I try these jeans on?", es: "¿Puedo probarme estos vaqueros?" },
        { en: "I'd like to book a room.", es: "Me gustaría reservar una habitación." },
        { en: "I'd like to check in, please.", es: "Quisiera registrarme, por favor." },
      ],
    },
  ],

  /* ---------------- Presente perfecto ---------------- */

  "a2-perfect-1": [
    {
      kind: "idea",
      title: "Un pasado que sigue tocando el presente",
      body:
        "«I have finished» no dice cuándo: dice que ahora ya está hecho. Se forma con have/has + participio, y el participio no cambia nunca con la persona.",
    },
    {
      kind: "table",
      title: "Las tres formas del verbo",
      head: ["Base", "Pasado → participio"],
      rows: [
        ["see", "saw → seen"],
        ["do", "did → done"],
        ["go", "went → gone / been"],
        ["eat", "ate → eaten"],
        ["lose", "lost → lost"],
      ],
    },
    {
      kind: "pitfall",
      title: "El pasado no sirve de participio",
      wrong: "I have went there.",
      right: "I have gone there. / I have been there.",
      body:
        "«Gone» es que se fue (y sigue fuera); «been» es que estuvo y volvió. «Went» solo va suelto: «I went there yesterday».",
    },
    {
      kind: "examples",
      title: "Resultados de ahora",
      items: [
        { en: "I have finished my homework.", es: "He terminado los deberes." },
        { en: "She has just arrived.", es: "Acaba de llegar." },
        { en: "I've lost my keys.", es: "He perdido las llaves.", note: "my, no the" },
        { en: "We have seen that film.", es: "Hemos visto esa película." },
      ],
    },
  ],

  "a2-perfect-2": [
    {
      kind: "idea",
      title: "Las palabras que acompañan al perfecto",
      body:
        "Ever, never, just, already y yet aparecen casi siempre con este tiempo, y cada una tiene su posición fija en la frase. Si dominas la posición, la frase sale sola.",
    },
    {
      kind: "table",
      title: "Dónde va cada una",
      head: ["Palabra", "Posición y uso"],
      rows: [
        ["ever", "en preguntas: Have you ever…?"],
        ["never", "entre auxiliar y participio"],
        ["just", "entre auxiliar y participio (acabar de)"],
        ["already", "entre auxiliar y participio (ya)"],
        ["yet", "al final, en negativas y preguntas"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Yet» solo en negativas y preguntas",
      wrong: "I have finished yet.",
      right: "I haven't finished yet. / Have you finished yet?",
      body:
        "En afirmativa se usa «already»: «I've already finished». Cambiarlas es un error muy visible.",
    },
    {
      kind: "examples",
      title: "Experiencias y noticias",
      items: [
        { en: "Have you ever been to London?", es: "¿Has estado alguna vez en Londres?" },
        { en: "I've never seen it.", es: "Nunca lo he visto." },
        { en: "I've just seen her.", es: "Acabo de verla." },
        { en: "I haven't finished yet.", es: "Todavía no he terminado." },
      ],
    },
  ],

  "a2-perfect-3": [
    {
      kind: "idea",
      title: "For, since… y la línea roja",
      body:
        "«For» mide cuánto (for five years) y «since» marca desde cuándo (since 2020). Y la línea roja: si el tiempo ya está cerrado (yesterday, last night, in 2019), el presente perfecto queda prohibido.",
    },
    {
      kind: "table",
      title: "Qué tiempo toca",
      head: ["Marcador", "Tiempo verbal"],
      rows: [
        ["for / since / How long…?", "presente perfecto"],
        ["ever / never / just / yet", "presente perfecto"],
        ["yesterday / last night / in 2019", "pasado simple"],
        ["ago (two years ago)", "pasado simple"],
      ],
    },
    {
      kind: "pitfall",
      title: "El español despista con «llevo»",
      wrong: "I live here since 2020.",
      right: "I have lived here since 2020.",
      body:
        "En español «vivo aquí desde 2020» va en presente; en inglés, si empezó antes y sigue, va en presente perfecto.",
    },
    {
      kind: "examples",
      title: "Cuánto tiempo llevas",
      items: [
        { en: "I've lived here for five years.", es: "Llevo cinco años viviendo aquí." },
        { en: "She has worked here since 2020.", es: "Trabaja aquí desde 2020." },
        { en: "How long have you been here?", es: "¿Cuánto tiempo llevas aquí?" },
        { en: "I saw him yesterday.", es: "Lo vi ayer.", note: "tiempo cerrado → pasado simple" },
      ],
    },
  ],
};
