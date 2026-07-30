import type { TeachMap } from "./types";

// Teoría de A1. Se ve ANTES de practicar. Español para explicar, inglés para
// los ejemplos (que se pueden escuchar).
export const a1Teach: TeachMap = {
  /* ---------------- Saludos y presentaciones ---------------- */

  "a1-greetings-1": [
    {
      kind: "idea",
      title: "El saludo depende de la hora",
      body:
        "En inglés no hay un «buenos días» que valga todo el día. Se cambia el saludo según el momento: morning (mañana), afternoon (tarde) y evening (noche, al llegar). «Hello» y «hi» son el comodín: sirven siempre.",
    },
    {
      kind: "table",
      title: "Cuándo se usa cada uno",
      head: ["Momento", "Se dice"],
      rows: [
        ["Siempre, cualquier hora", "hello / hi"],
        ["Hasta el mediodía", "good morning"],
        ["De 12 h a ~18 h", "good afternoon"],
        ["A partir de las 18 h, al llegar", "good evening"],
        ["Al despedirte de noche", "good night"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Good night» no es un saludo",
      wrong: "Good night! (al entrar a una cena)",
      right: "Good evening!",
      body:
        "«Good night» solo sirve para despedirse o irse a dormir. Si llegas de noche, saludas con «good evening».",
    },
    {
      kind: "examples",
      title: "Escúchalo en frases reales",
      items: [
        { en: "Hello! How are you?", es: "¡Hola! ¿Cómo estás?" },
        { en: "Good morning, Ana.", es: "Buenos días, Ana." },
        { en: "Goodbye! See you later.", es: "¡Adiós! Hasta luego." },
        { en: "Good night, sleep well.", es: "Buenas noches, que duermas bien." },
      ],
    },
  ],

  "a1-greetings-2": [
    {
      kind: "idea",
      title: "Presentarte: dos formas, misma idea",
      body:
        "Para decir tu nombre tienes «My name is Ana» (mi nombre es Ana) o «I'm Ana» (soy Ana). Las dos son correctas; la segunda es más informal y la oirás todo el rato.",
    },
    {
      kind: "table",
      title: "El patrón",
      head: ["Español", "Inglés"],
      rows: [
        ["Me llamo Ana", "My name is Ana"],
        ["Soy Ana", "I'm Ana"],
        ["¿Cómo te llamas?", "What's your name?"],
        ["Encantado/a", "Nice to meet you"],
        ["Este es mi amigo", "This is my friend"],
      ],
    },
    {
      kind: "pitfall",
      title: "Las profesiones llevan artículo",
      wrong: "I am student.",
      right: "I am a student.",
      body:
        "En español decimos «soy estudiante», sin artículo. En inglés siempre va «a/an» delante de la profesión: a student, a doctor, an engineer.",
    },
    {
      kind: "examples",
      title: "Una presentación completa",
      items: [
        { en: "Hi, I'm Ana. What's your name?", es: "Hola, soy Ana. ¿Cómo te llamas?" },
        { en: "My name is Carlos. Nice to meet you.", es: "Me llamo Carlos. Encantado." },
        { en: "I am a teacher.", es: "Soy profesor.", note: "a + profesión" },
        { en: "This is my friend Marta.", es: "Esta es mi amiga Marta." },
      ],
    },
  ],

  "a1-greetings-3": [
    {
      kind: "idea",
      title: "Preguntar y devolver la pregunta",
      body:
        "«How are you?» se responde en dos tiempos: dices cómo estás y devuelves la pregunta con «and you?». Es lo que se espera; contestar solo «fine» suena cortante.",
    },
    {
      kind: "table",
      title: "Respuestas de menos a más",
      head: ["Estado", "Se dice"],
      rows: [
        ["Muy bien", "Great! / Very well"],
        ["Bien", "I'm fine / I'm good"],
        ["Más o menos", "So-so / Not bad"],
        ["Mal", "Not very well"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I'm» no se puede quitar",
      wrong: "Fine, thank you. And you? → «Yo bien».",
      right: "I'm fine, thank you. And you?",
      body:
        "En español el sujeto se puede omitir («estoy bien»), en inglés no: siempre hace falta «I». «I'm» es la contracción de «I am».",
    },
    {
      kind: "examples",
      title: "El intercambio completo",
      items: [
        { en: "How are you?", es: "¿Cómo estás?" },
        { en: "I'm fine, thank you. And you?", es: "Estoy bien, gracias. ¿Y tú?" },
        { en: "So-so. It's a long day.", es: "Más o menos. Es un día largo." },
        { en: "Thanks a lot!", es: "¡Muchas gracias!", note: "«thanks» = informal" },
      ],
    },
  ],

  /* ---------------- Números y la hora ---------------- */

  "a1-numbers-1": [
    {
      kind: "idea",
      title: "Del 1 al 10, la base de todo",
      body:
        "Estos diez números son la raíz de casi todos los demás: four → fourteen → forty. Si los dices bien, el resto sale casi solo.",
    },
    {
      kind: "table",
      title: "Los diez primeros",
      head: ["Número", "Inglés"],
      rows: [
        ["1 · 2", "one · two"],
        ["3 · 4", "three · four"],
        ["5 · 6", "five · six"],
        ["7 · 8", "seven · eight"],
        ["9 · 10", "nine · ten"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Three» no es «tree»",
      wrong: "tree cats (= gato árbol)",
      right: "three cats",
      body:
        "«Three» empieza con el sonido «th»: la lengua asoma entre los dientes. Sin ese sonido dices «tree» (árbol). Pasa igual con «free» (gratis).",
    },
    {
      kind: "examples",
      title: "Números en contexto",
      items: [
        { en: "I have two cats.", es: "Tengo dos gatos.", note: "plural: cat → cats" },
        { en: "Three coffees, please.", es: "Tres cafés, por favor." },
        { en: "It's five o'clock.", es: "Son las cinco." },
        { en: "Room number ten.", es: "Habitación número diez." },
      ],
    },
  ],

  "a1-numbers-2": [
    {
      kind: "idea",
      title: "La edad se TIENE en español, se ES en inglés",
      body:
        "Esta es de las diferencias que más se notan: en español «tengo 20 años», en inglés «I am 20 years old» (literalmente «soy 20 años viejo»). El verbo es «to be», nunca «have».",
    },
    {
      kind: "table",
      title: "-teen contra -ty",
      head: ["Termina en -teen", "Termina en -ty"],
      rows: [
        ["thirteen (13)", "thirty (30)"],
        ["fourteen (14)", "forty (40)"],
        ["fifteen (15)", "fifty (50)"],
        ["sixteen (16)", "sixty (60)"],
      ],
    },
    {
      kind: "pitfall",
      title: "Nunca «I have 20 years»",
      wrong: "I have twenty years.",
      right: "I am twenty years old.",
      body:
        "«I have twenty years» suena a que te quedan veinte años de algo. Y la pregunta también cambia: «How old are you?», no «how many years».",
    },
    {
      kind: "examples",
      title: "Preguntar y responder la edad",
      items: [
        { en: "How old are you?", es: "¿Cuántos años tienes?" },
        { en: "I am twenty years old.", es: "Tengo veinte años." },
        { en: "My sister is eleven.", es: "Mi hermana tiene once." },
        { en: "He is fifteen, not fifty.", es: "Tiene quince, no cincuenta." },
      ],
    },
  ],

  "a1-numbers-3": [
    {
      kind: "idea",
      title: "La hora se pregunta con «time», no con «hour»",
      body:
        "«What time is it?» es la pregunta. «Hour» existe, pero significa «una hora» como duración («two hours» = dos horas), no el momento del reloj.",
    },
    {
      kind: "table",
      title: "Decir la hora",
      head: ["Reloj", "Se dice"],
      rows: [
        ["3:00", "three o'clock"],
        ["3:15", "quarter past three"],
        ["3:30", "half past three"],
        ["3:45", "quarter to four"],
        ["3:20", "three twenty (la forma fácil)"],
      ],
    },
    {
      kind: "pitfall",
      title: "Los días van con mayúscula",
      wrong: "See you on monday.",
      right: "See you on Monday.",
      body:
        "Días y meses siempre con mayúscula en inglés: Monday, Friday, January. Y los días llevan «on»: on Monday.",
    },
    {
      kind: "examples",
      title: "Hora y día juntos",
      items: [
        { en: "What time is it?", es: "¿Qué hora es?" },
        { en: "It is three o'clock.", es: "Son las tres." },
        { en: "The class is on Monday.", es: "La clase es el lunes." },
        { en: "See you tomorrow!", es: "¡Hasta mañana!" },
      ],
    },
  ],

  /* ---------------- El día a día ---------------- */

  "a1-everyday-1": [
    {
      kind: "idea",
      title: "Pedir sin sonar brusco",
      body:
        "«I want a coffee» es correcto pero suena a orden. En un bar o restaurante se dice «I would like a coffee» (quisiera) o «Can I have a coffee, please?». Con «please» todo mejora.",
    },
    {
      kind: "table",
      title: "Escala de cortesía",
      head: ["Nivel", "Frase"],
      rows: [
        ["Directo (entre amigos)", "I want a coffee"],
        ["Normal", "Can I have a coffee, please?"],
        ["Educado", "I would like a coffee, please"],
        ["Muy educado", "Could I have a coffee, please?"],
      ],
    },
    {
      kind: "pitfall",
      title: "Comidas incontables: sin «a»",
      wrong: "I want a bread. / two waters",
      right: "I want some bread. / two bottles of water",
      body:
        "Bread, water, rice, coffee (la sustancia) no se cuentan. Se usa «some» o una medida: a glass of water, a piece of bread. En un bar sí se oye «two coffees» = dos tazas.",
    },
    {
      kind: "examples",
      title: "En la mesa",
      items: [
        { en: "I would like a coffee, please.", es: "Quisiera un café, por favor." },
        { en: "Can I have some water?", es: "¿Me pones agua?" },
        { en: "The bill, please.", es: "La cuenta, por favor." },
        { en: "This bread is very good.", es: "Este pan está muy bueno." },
      ],
    },
  ],

  "a1-everyday-2": [
    {
      kind: "idea",
      title: "El presente simple casi no cambia… salvo con he/she/it",
      body:
        "En español el verbo cambia con cada persona (como, comes, come…). En inglés es el mismo para todos menos para he, she e it, que añaden una «-s». Esa «-s» es el 90 % de los fallos en A1.",
    },
    {
      kind: "table",
      title: "«to eat» en presente",
      head: ["Persona", "Verbo"],
      rows: [
        ["I / you / we / they", "eat"],
        ["he / she / it", "eats"],
        ["Negativo (I/you/we/they)", "don't eat"],
        ["Negativo (he/she/it)", "doesn't eat"],
      ],
    },
    {
      kind: "pitfall",
      title: "La «-s» va una sola vez",
      wrong: "She doesn't eats meat.",
      right: "She doesn't eat meat.",
      body:
        "Si aparece «does» o «doesn't», la «-s» ya está ahí: el verbo vuelve a su forma base. Igual en preguntas: «Does she eat…?».",
    },
    {
      kind: "examples",
      title: "Los cinco verbos que más vas a usar",
      items: [
        { en: "I want water.", es: "Quiero agua." },
        { en: "She drinks coffee every day.", es: "Ella bebe café todos los días.", note: "she → drinks" },
        { en: "We have two children.", es: "Tenemos dos hijos." },
        { en: "They go to the park.", es: "Van al parque." },
      ],
    },
  ],

  "a1-everyday-3": [
    {
      kind: "idea",
      title: "«How much» y «how many»",
      body:
        "«How much?» pregunta por precio o por algo que no se cuenta (dinero, agua, tiempo). «How many?» pregunta por cosas contables (manzanas, entradas). Para un precio siempre «how much».",
    },
    {
      kind: "table",
      title: "Frases de tienda",
      head: ["Español", "Inglés"],
      rows: [
        ["¿Cuánto cuesta?", "How much is it?"],
        ["¿Tienen…?", "Do you have…?"],
        ["Solo estoy mirando", "I'm just looking"],
        ["Me lo llevo", "I'll take it"],
        ["¿Puedo pagar con tarjeta?", "Can I pay by card?"],
      ],
    },
    {
      kind: "pitfall",
      title: "Las preguntas empiezan con «do»",
      wrong: "You have coffee?",
      right: "Do you have coffee?",
      body:
        "En presente simple la pregunta necesita «do» (o «does» con he/she/it). Sin él suena a frase a medias, aunque se entienda.",
    },
    {
      kind: "examples",
      title: "Comprar de principio a fin",
      items: [
        { en: "Excuse me, how much is it?", es: "Disculpe, ¿cuánto cuesta?" },
        { en: "That's too expensive.", es: "Es demasiado caro." },
        { en: "Do you have a cheaper one?", es: "¿Tiene uno más barato?" },
        { en: "OK, I'll take it.", es: "Vale, me lo llevo." },
      ],
    },
  ],

  /* ---------------- Familia y personas ---------------- */

  "a1-family-1": [
    {
      kind: "idea",
      title: "Palabras distintas, no terminaciones",
      body:
        "El español cambia la terminación (hermano/hermana). El inglés usa palabras completamente distintas: brother / sister, father / mother, son / daughter. Hay que aprenderlas por pares.",
    },
    {
      kind: "table",
      title: "La familia por pares",
      head: ["Hombre", "Mujer"],
      rows: [
        ["father (padre)", "mother (madre)"],
        ["brother (hermano)", "sister (hermana)"],
        ["son (hijo)", "daughter (hija)"],
        ["grandfather (abuelo)", "grandmother (abuela)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Parents» no son «parientes»",
      wrong: "I have many parents in Spain.",
      right: "I have many relatives in Spain.",
      body:
        "«Parents» = padre y madre, solo ellos dos. Los parientes en general son «relatives». Es el falso amigo clásico de esta unidad.",
    },
    {
      kind: "examples",
      title: "Hablar de los tuyos",
      items: [
        { en: "She is my mother.", es: "Ella es mi madre." },
        { en: "I have one brother and two sisters.", es: "Tengo un hermano y dos hermanas." },
        { en: "My parents live in Madrid.", es: "Mis padres viven en Madrid." },
        { en: "This is my daughter.", es: "Esta es mi hija." },
      ],
    },
  ],

  "a1-family-2": [
    {
      kind: "idea",
      title: "El adjetivo va DELANTE",
      body:
        "En español decimos «un hombre alto»; en inglés el adjetivo se pone antes del sustantivo: «a tall man». Y no cambia nunca: no lleva plural ni femenino (two tall women, no «talls»).",
    },
    {
      kind: "table",
      title: "«Be» para cualidades, «have» para partes",
      head: ["Se dice con to be", "Se dice con have"],
      rows: [
        ["She is tall", "She has long hair"],
        ["He is friendly", "He has blue eyes"],
        ["They are young", "They have a beard"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Hair» no tiene plural",
      wrong: "She has long hairs.",
      right: "She has long hair.",
      body:
        "«Hair» es incontable cuando hablamos del pelo entero. «Hairs» serían pelos sueltos, uno a uno (y suena raro).",
    },
    {
      kind: "examples",
      title: "Describir a alguien",
      items: [
        { en: "He is a tall man.", es: "Es un hombre alto.", note: "adjetivo + sustantivo" },
        { en: "My sister is very friendly.", es: "Mi hermana es muy amable." },
        { en: "She has long hair.", es: "Ella tiene el pelo largo." },
        { en: "They are young.", es: "Son jóvenes." },
      ],
    },
  ],

  "a1-family-3": [
    {
      kind: "idea",
      title: "El posesivo concuerda con el DUEÑO",
      body:
        "Aquí el español engaña: «su hermana» no dice de quién. En inglés se elige según quién posee: si el dueño es él → his; si es ella → her. Lo poseído da igual.",
    },
    {
      kind: "table",
      title: "Tabla completa",
      head: ["Dueño", "Posesivo"],
      rows: [
        ["I → yo", "my"],
        ["you → tú/usted", "your"],
        ["he → él", "his"],
        ["she → ella", "her"],
        ["we → nosotros", "our"],
        ["they → ellos", "their"],
      ],
    },
    {
      kind: "pitfall",
      title: "Nada de apóstrofo en los posesivos",
      wrong: "This is her's car. / It's John and he's sister.",
      right: "This is her car. / John and his sister.",
      body:
        "«Her's» no existe. Y ojo: «he's» es «he is», no un posesivo. El posesivo de él es «his», siempre.",
    },
    {
      kind: "examples",
      title: "El mismo «su» en cuatro frases",
      items: [
        { en: "This is John and his sister.", es: "Este es John y su hermana." },
        { en: "This is Ana and her father.", es: "Esta es Ana y su padre." },
        { en: "Our house is small.", es: "Nuestra casa es pequeña." },
        { en: "What is your name?", es: "¿Cómo te llamas?" },
      ],
    },
  ],

  /* ---------------- Lugares y direcciones ---------------- */

  "a1-places-1": [
    {
      kind: "idea",
      title: "«Hay» = there is / there are",
      body:
        "El «hay» español se dice «there is» con una cosa y «there are» con varias. No se usa «have»: «have» es tener (alguien posee algo), «there is» es existir.",
    },
    {
      kind: "table",
      title: "in · on · under",
      head: ["Posición", "Preposición"],
      rows: [
        ["Dentro de algo", "in the bag"],
        ["Sobre una superficie", "on the table"],
        ["Debajo", "under the chair"],
        ["Al lado", "next to the door"],
        ["Entre dos cosas", "between the chairs"],
      ],
    },
    {
      kind: "pitfall",
      title: "El español usa «en» para todo",
      wrong: "The book is in the table.",
      right: "The book is on the table.",
      body:
        "«In the table» significaría dentro de la madera. Si algo está apoyado encima, siempre «on».",
    },
    {
      kind: "examples",
      title: "Decir dónde está algo",
      items: [
        { en: "There is a book on the table.", es: "Hay un libro sobre la mesa." },
        { en: "There are three chairs in the room.", es: "Hay tres sillas en la habitación." },
        { en: "The keys are in the bag.", es: "Las llaves están en el bolso." },
        { en: "The bank is next to the park.", es: "El banco está al lado del parque." },
      ],
    },
  ],

  "a1-places-2": [
    {
      kind: "idea",
      title: "Sitios de la ciudad",
      body:
        "Muchos nombres de lugar se forman juntando dos palabras: train + station, bus + stop, post + office. La primera dice de qué es y la segunda qué es.",
    },
    {
      kind: "table",
      title: "El mapa mínimo",
      head: ["Español", "Inglés"],
      rows: [
        ["calle", "street"],
        ["tienda", "shop (UK) / store (US)"],
        ["estación de tren", "train station"],
        ["parada de autobús", "bus stop"],
        ["parque", "park"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Near» va sin «of»",
      wrong: "It's near of my house.",
      right: "It's near my house.",
      body:
        "«Near» ya significa «cerca de». Con «next to» sí hay dos palabras, pero tampoco lleva «of».",
    },
    {
      kind: "examples",
      title: "Ubicarte en la ciudad",
      items: [
        { en: "There is a park near my house.", es: "Hay un parque cerca de mi casa." },
        { en: "I live on Main Street.", es: "Vivo en la calle Main." },
        { en: "The shop is next to the hospital.", es: "La tienda está al lado del hospital." },
        { en: "Where is the train station?", es: "¿Dónde está la estación de tren?" },
      ],
    },
  ],

  "a1-places-3": [
    {
      kind: "idea",
      title: "Primero llamas la atención, luego preguntas",
      body:
        "Para parar a un desconocido se dice «Excuse me» (disculpe). «Sorry» es para pedir perdón por algo que has hecho. Después va la pregunta: «Where is…?».",
    },
    {
      kind: "table",
      title: "Instrucciones que vas a oír",
      head: ["Inglés", "Español"],
      rows: [
        ["Go straight (ahead)", "Sigue recto"],
        ["Turn left / right", "Gira a la izquierda / derecha"],
        ["It's on your left", "Está a tu izquierda"],
        ["It's over there", "Está por allí"],
        ["It's five minutes from here", "Está a cinco minutos"],
      ],
    },
    {
      kind: "pitfall",
      title: "En la pregunta, el verbo va delante",
      wrong: "Where the station is?",
      right: "Where is the station?",
      body:
        "En las preguntas con «where», «what», «who»… el verbo «to be» pasa delante del sujeto. En español no se nota porque el orden es libre.",
    },
    {
      kind: "examples",
      title: "Preguntar por la calle",
      items: [
        { en: "Excuse me, where is the station?", es: "Disculpe, ¿dónde está la estación?" },
        { en: "Go straight and turn left.", es: "Sigue recto y gira a la izquierda." },
        { en: "It's over there, next to the bank.", es: "Está por allí, al lado del banco." },
        { en: "Thank you very much!", es: "¡Muchas gracias!" },
      ],
    },
  ],

  /* ---------------- El tiempo y el calendario ---------------- */

  "a1-weather-1": [
    {
      kind: "idea",
      title: "El clima siempre lleva «it»",
      body:
        "En español el tiempo no tiene sujeto: «hace sol», «llueve». En inglés hace falta uno obligatorio y es «it»: it's sunny, it's raining. Sin «it» la frase está incompleta.",
    },
    {
      kind: "table",
      title: "Sustantivo → adjetivo",
      head: ["Nombre", "Adjetivo (con -y)"],
      rows: [
        ["sun (sol)", "sunny (soleado)"],
        ["rain (lluvia)", "rainy (lluvioso)"],
        ["wind (viento)", "windy (ventoso)"],
        ["cloud (nube)", "cloudy (nublado)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I have cold» es otra cosa",
      wrong: "I have cold today.",
      right: "It's cold today. / I'm cold.",
      body:
        "«I have a cold» significa que estás resfriado. Para el clima: «it's cold». Para ti: «I'm cold» (tengo frío).",
    },
    {
      kind: "examples",
      title: "Hablar del tiempo",
      items: [
        { en: "What's the weather like?", es: "¿Qué tiempo hace?" },
        { en: "It's sunny and hot.", es: "Hace sol y calor." },
        { en: "It is raining today.", es: "Está lloviendo hoy.", note: "ahora → -ing" },
        { en: "It's very windy.", es: "Hace mucho viento." },
      ],
    },
  ],

  "a1-weather-2": [
    {
      kind: "idea",
      title: "in, on, at: la escala del tiempo",
      body:
        "Cuanto más grande es el periodo, más «amplia» es la preposición: «in» para meses, estaciones y años; «on» para días y fechas; «at» para horas.",
    },
    {
      kind: "table",
      title: "Qué preposición toca",
      head: ["Periodo", "Ejemplo"],
      rows: [
        ["Mes / estación / año", "in July · in summer · in 1995"],
        ["Día / fecha", "on Monday · on 5 May"],
        ["Hora", "at three o'clock"],
        ["Excepción útil", "at night"],
      ],
    },
    {
      kind: "pitfall",
      title: "Meses con mayúscula",
      wrong: "My birthday is in july.",
      right: "My birthday is in July.",
      body:
        "Meses, días e idiomas van siempre con mayúscula en inglés: July, Monday, Spanish. En español no, y de ahí el despiste.",
    },
    {
      kind: "examples",
      title: "Fechas y cumpleaños",
      items: [
        { en: "My birthday is in July.", es: "Mi cumpleaños es en julio." },
        { en: "I was born in 1995.", es: "Nací en 1995.", note: "nacer = to be born" },
        { en: "In winter it's very cold here.", es: "En invierno hace mucho frío aquí." },
        { en: "The party is on Saturday.", es: "La fiesta es el sábado." },
      ],
    },
  ],

  "a1-weather-3": [
    {
      kind: "idea",
      title: "«Wear» y «carry» son dos «llevar»",
      body:
        "En español «llevo un abrigo» y «llevo una bolsa» usan el mismo verbo. En inglés se separan: «wear» es llevar puesto (ropa) y «carry» es llevar cargando algo.",
    },
    {
      kind: "table",
      title: "Ropa básica",
      head: ["Español", "Inglés"],
      rows: [
        ["abrigo", "coat"],
        ["camiseta", "T-shirt"],
        ["zapatos", "shoes (siempre en plural)"],
        ["pantalones", "trousers / pants"],
        ["paraguas", "umbrella"],
      ],
    },
    {
      kind: "pitfall",
      title: "«A» o «an» según el SONIDO",
      wrong: "a umbrella",
      right: "an umbrella",
      body:
        "«An» va delante de sonido vocálico: an umbrella, an hour (la h es muda). Pero «a university», porque suena «yu». Manda el sonido, no la letra.",
    },
    {
      kind: "examples",
      title: "Vestirse según el tiempo",
      items: [
        { en: "It's cold, wear a coat.", es: "Hace frío, ponte un abrigo." },
        { en: "She is wearing a red T-shirt.", es: "Lleva puesta una camiseta roja.", note: "ahora mismo" },
        { en: "It is raining, I need an umbrella.", es: "Está lloviendo, necesito un paraguas." },
        { en: "These shoes are very cheap.", es: "Estos zapatos son muy baratos." },
      ],
    },
  ],
};
