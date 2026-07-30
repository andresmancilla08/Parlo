import type { TeachMap } from "./types";

// Teoría de B1.
export const b1Teach: TeachMap = {
  /* ---------------- Condicionales ---------------- */

  "b1-conditionals-1": [
    {
      kind: "idea",
      title: "La regla de oro: «will» no entra en el «if»",
      body:
        "El primer condicional habla de algo real y probable en el futuro. Aunque el sentido sea futuro, la parte del «if» va en presente. El «will» vive en la otra mitad de la frase.",
    },
    {
      kind: "table",
      title: "Las dos mitades",
      head: ["Condición (if)", "Resultado"],
      rows: [
        ["If it rains", "we'll stay home"],
        ["If you study", "you will pass"],
        ["If I have time", "I'll call you"],
        ["Se puede invertir", "I'll call you if I have time"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Unless» ya lleva el no dentro",
      wrong: "Unless you don't hurry, we'll be late.",
      right: "Unless you hurry, we'll be late.",
      body:
        "«Unless» significa «si no». Añadirle otra negación invierte el sentido y dice justo lo contrario de lo que quieres.",
    },
    {
      kind: "examples",
      title: "Condiciones reales",
      items: [
        { en: "If it rains, we'll stay home.", es: "Si llueve, nos quedamos en casa." },
        { en: "If you study, you will pass.", es: "Si estudias, aprobarás." },
        { en: "Unless you hurry, we'll be late.", es: "Si no te das prisa, llegaremos tarde." },
        { en: "I'll do it as soon as I can.", es: "Lo haré en cuanto pueda." },
      ],
    },
  ],

  "b1-conditionals-2": [
    {
      kind: "idea",
      title: "El pasado que no habla del pasado",
      body:
        "En el segundo condicional el verbo va en pasado, pero no cuenta algo que pasó: marca que es imaginario. «If I had money» = si tuviera dinero (no lo tengo).",
    },
    {
      kind: "table",
      title: "Real contra imaginario",
      head: ["Primer condicional (real)", "Segundo (imaginario)"],
      rows: [
        ["If I have time, I'll help", "If I had time, I'd help"],
        ["If it rains, we'll stay", "If it rained, we'd stay"],
        ["If I am rich…", "If I were rich…"],
      ],
    },
    {
      kind: "pitfall",
      title: "Después de «if» jamás va «would»",
      wrong: "If I would have money, I'd travel.",
      right: "If I had money, I'd travel.",
      body:
        "Es el error estrella del B1. El «would» solo puede estar en la mitad del resultado. Y con «to be» se usa «were» para todas las personas: if I were you.",
    },
    {
      kind: "examples",
      title: "Imaginar y aconsejar",
      items: [
        { en: "If I were rich, I would travel the world.", es: "Si fuera rico, viajaría por el mundo." },
        { en: "If I were you, I wouldn't do it.", es: "Si yo fuera tú, no lo haría." },
        { en: "If I had time, I would help you.", es: "Si tuviera tiempo, te ayudaría." },
        { en: "I'd go if I could.", es: "Iría si pudiera." },
      ],
    },
  ],

  "b1-conditionals-3": [
    {
      kind: "idea",
      title: "Lo que ya no tiene arreglo",
      body:
        "El tercer condicional habla de un pasado imposible de cambiar: «si lo hubiera sabido…». Las dos mitades llevan participio, una con «had» y la otra con «would have».",
    },
    {
      kind: "table",
      title: "Arrepentirse en inglés",
      head: ["Fórmula", "Significado"],
      rows: [
        ["If I had known…", "Si lo hubiera sabido…"],
        ["I would have called", "Habría llamado"],
        ["I should have studied", "Debería haber estudiado"],
        ["I wish I had time", "Ojalá tuviera tiempo (ahora)"],
        ["I wish I had gone", "Ojalá hubiera ido (entonces)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I wish» retrocede un tiempo",
      wrong: "I wish I have more time.",
      right: "I wish I had more time.",
      body:
        "Tras «I wish» el verbo va un paso atrás: presente → pasado, pasado → past perfect. Es lo que marca que el deseo no se cumple.",
    },
    {
      kind: "examples",
      title: "Lo que pudo haber sido",
      items: [
        { en: "If I had known, I would have called you.", es: "Si lo hubiera sabido, te habría llamado." },
        { en: "I should have studied more.", es: "Debería haber estudiado más." },
        { en: "I wish I could fly.", es: "Ojalá pudiera volar." },
        { en: "I wish I had more time.", es: "Ojalá tuviera más tiempo." },
      ],
    },
  ],

  /* ---------------- Contar historias ---------------- */

  "b1-stories-1": [
    {
      kind: "idea",
      title: "El decorado y el suceso",
      body:
        "Al contar algo hay dos capas: lo que estaba pasando de fondo (pasado continuo) y lo que ocurrió de golpe (pasado simple). «I was watching TV when she called».",
    },
    {
      kind: "table",
      title: "Quién va con quién",
      head: ["Palabra", "Suele pedir"],
      rows: [
        ["while", "pasado continuo (while I was cooking)"],
        ["when", "pasado simple (when she called)"],
        ["suddenly", "pasado simple, abre frase"],
        ["as", "pasado continuo (as I was leaving)"],
      ],
    },
    {
      kind: "pitfall",
      title: "Los verbos de estado no van en continuo",
      wrong: "I was knowing the answer. / I was liking it.",
      right: "I knew the answer. / I liked it.",
      body:
        "Know, like, want, need, see y believe describen estados, no acciones en marcha. Se quedan siempre en simple.",
    },
    {
      kind: "examples",
      title: "Montar una escena",
      items: [
        { en: "I was watching TV when she called.", es: "Estaba viendo la tele cuando llamó." },
        { en: "While I was cooking, the phone rang.", es: "Mientras cocinaba, sonó el teléfono." },
        { en: "It was raining when I left.", es: "Estaba lloviendo cuando salí." },
        { en: "Suddenly, the lights went out.", es: "De repente, se fue la luz." },
      ],
    },
  ],

  "b1-stories-2": [
    {
      kind: "idea",
      title: "El pasado del pasado",
      body:
        "Cuando ya estás contando algo en pasado y necesitas mencionar algo AÚN más antiguo, se usa «had + participio». Es lo que ordena la historia sin tener que dar fechas.",
    },
    {
      kind: "table",
      title: "Orden de los hechos",
      head: ["Frase", "Qué pasó primero"],
      rows: [
        ["When I arrived, the train had left", "se fue el tren"],
        ["When I arrived, the train left", "llegué yo"],
        ["She had cooked when we got there", "cocinó ella"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Anything» en negativa, «something» en afirmativa",
      wrong: "I had never seen something like that.",
      right: "I had never seen anything like that.",
      body:
        "Con never, not o hardly la frase ya es negativa, así que toca «anything», «anybody», «anywhere».",
    },
    {
      kind: "examples",
      title: "Encadenar dos pasados",
      items: [
        { en: "When I arrived, the train had already left.", es: "Cuando llegué, el tren ya se había ido." },
        { en: "By the time we got there, the film had started.", es: "Cuando llegamos, la peli ya había empezado." },
        { en: "I had never seen anything like that.", es: "Nunca había visto algo así." },
        { en: "It was too late.", es: "Era demasiado tarde." },
      ],
    },
  ],

  "b1-stories-3": [
    {
      kind: "idea",
      title: "«Used to»: lo que hacías y ya no",
      body:
        "«I used to play football» dice dos cosas a la vez: antes lo hacía y ahora no. Solo existe en pasado; para hábitos de hoy se usa el presente simple con «usually».",
    },
    {
      kind: "table",
      title: "Tres estructuras que se parecen",
      head: ["Fórmula", "Significado"],
      rows: [
        ["used to + base", "antes lo hacía (ya no)"],
        ["be used to + -ing", "estoy acostumbrado a"],
        ["get used to + -ing", "acostumbrarse a"],
      ],
    },
    {
      kind: "pitfall",
      title: "Con «didn't» se pierde la -d",
      wrong: "I didn't used to like coffee.",
      right: "I didn't use to like coffee.",
      body:
        "Igual que didn't work o didn't go: el auxiliar ya marca el pasado, así que «used» vuelve a «use».",
    },
    {
      kind: "examples",
      title: "Antes y ahora",
      items: [
        { en: "I used to play football every Saturday.", es: "Antes jugaba al fútbol los sábados." },
        { en: "I didn't use to like coffee.", es: "Antes no me gustaba el café." },
        { en: "I don't smoke anymore.", es: "Ya no fumo." },
        { en: "I'm used to waking up early.", es: "Estoy acostumbrado a madrugar." },
      ],
    },
  ],

  /* ---------------- Obligación, consejo y probabilidad ---------------- */

  "b1-modals-1": [
    {
      kind: "idea",
      title: "Prohibido no es lo mismo que innecesario",
      body:
        "«You mustn't smoke» = está prohibido. «You don't have to smoke» = no hace falta, tú verás. En español los dos se acercan a «no tienes que», y ahí nace la confusión.",
    },
    {
      kind: "table",
      title: "Escala de obligación",
      head: ["Fórmula", "Fuerza"],
      rows: [
        ["must / have to", "obligatorio"],
        ["should", "recomendable"],
        ["don't have to", "opcional, no hace falta"],
        ["mustn't", "prohibido"],
        ["had to", "obligación en pasado"],
      ],
    },
    {
      kind: "pitfall",
      title: "Los modales no llevan «to»",
      wrong: "You must to go. / She cans swim.",
      right: "You must go. / She can swim.",
      body:
        "Must, can, should, might y will van pegados al verbo base, sin «to» y sin «-s». La excepción es «have to», que sí lo lleva.",
    },
    {
      kind: "examples",
      title: "Normas y obligaciones",
      items: [
        { en: "You mustn't smoke here.", es: "No se puede fumar aquí." },
        { en: "It's Sunday, I don't have to work.", es: "Es domingo, no tengo que trabajar." },
        { en: "I have to work tomorrow.", es: "Tengo que trabajar mañana." },
        { en: "Yesterday I had to work.", es: "Ayer tuve que trabajar." },
      ],
    },
  ],

  "b1-modals-2": [
    {
      kind: "idea",
      title: "Aconsejar sin sonar a jefe",
      body:
        "«Should» es el consejo neutro. «Why don't you…?» y «How about…?» suenan a sugerencia entre iguales. «You'd better» ya es un aviso serio: si no lo haces, va a pasar algo malo.",
    },
    {
      kind: "table",
      title: "De suave a fuerte",
      head: ["Fórmula", "Tono"],
      rows: [
        ["How about taking a break?", "sugerencia informal"],
        ["Why don't you rest?", "sugerencia amable"],
        ["You should rest.", "consejo normal"],
        ["You'd better rest.", "advertencia"],
        ["You must rest.", "orden"],
      ],
    },
    {
      kind: "pitfall",
      title: "«How about» pide -ing",
      wrong: "How about to take a break?",
      right: "How about taking a break?",
      body:
        "Tras «how about» y «what about» va un verbo en -ing. Tras «why don't you» va el verbo base.",
    },
    {
      kind: "examples",
      title: "Dar consejo",
      items: [
        { en: "You should see a doctor.", es: "Deberías ir al médico." },
        { en: "Why don't you take a break?", es: "¿Por qué no descansas un rato?" },
        { en: "I'd rather stay home.", es: "Prefiero quedarme en casa." },
        { en: "You'd better hurry.", es: "Más te vale darte prisa." },
      ],
    },
  ],

  "b1-modals-3": [
    {
      kind: "idea",
      title: "Los modales también miden probabilidad",
      body:
        "El mismo grupo de palabras sirve para deducir: «must be» (seguro que sí), «might/may be» (puede que) y «can't be» (imposible). Es la escala de la certeza.",
    },
    {
      kind: "table",
      title: "Escala de certeza",
      head: ["Fórmula", "Certeza"],
      rows: [
        ["It must be true", "95 % · seguro que sí"],
        ["It's probably true", "80 %"],
        ["It may / might be true", "50 % · puede que"],
        ["It can't be true", "0 % · imposible"],
      ],
    },
    {
      kind: "pitfall",
      title: "Lo imposible es «can't», no «mustn't»",
      wrong: "That mustn't be true.",
      right: "That can't be true.",
      body:
        "«Mustn't» es prohibición, no imposibilidad. Para deducir que algo no puede ser: «can't be».",
    },
    {
      kind: "examples",
      title: "Deducir en voz alta",
      items: [
        { en: "She might be at work, I'm not sure.", es: "Puede que esté en el trabajo, no estoy seguro." },
        { en: "His light is on, he must be home.", es: "Tiene la luz encendida, debe de estar en casa." },
        { en: "It might rain later.", es: "Puede que llueva más tarde." },
        { en: "That can't be true!", es: "¡Eso no puede ser verdad!" },
      ],
    },
  ],

  /* ---------------- Opiniones y conversación ---------------- */

  "b1-opinions-1": [
    {
      kind: "idea",
      title: "Fórmulas fijas: se aprenden enteras",
      body:
        "«In my opinion», «to be honest», «it seems to me»… no se traducen palabra por palabra; se memorizan como bloques. Traducir del español aquí es lo que delata el nivel.",
    },
    {
      kind: "table",
      title: "Calcos que hay que borrar",
      head: ["Calco (mal)", "Se dice"],
      rows: [
        ["You have reason", "You're right"],
        ["Under my point of view", "In my opinion / From my point of view"],
        ["I am agree", "I agree"],
        ["It depends of", "It depends on"],
      ],
    },
    {
      kind: "pitfall",
      title: "Tener razón = «be right»",
      wrong: "You have reason.",
      right: "You're right.",
      body:
        "«Reason» es motivo, no razón en el sentido de acierto. Igual pasa con «have hunger» → «be hungry».",
    },
    {
      kind: "examples",
      title: "Opinar con naturalidad",
      items: [
        { en: "In my opinion, it's too expensive.", es: "En mi opinión, es demasiado caro." },
        { en: "To be honest, I don't like it.", es: "Para ser sincero, no me gusta." },
        { en: "I think you're right.", es: "Creo que tienes razón." },
        { en: "It seems to me that it's a good idea.", es: "Me parece que es buena idea." },
      ],
    },
  ],

  "b1-opinions-2": [
    {
      kind: "idea",
      title: "«So do I» y «Neither do I»",
      body:
        "Para decir «yo también» hay que repetir el auxiliar de la frase anterior: si dijo «I love jazz» (presente simple) → «So do I». Si dijo «I'm tired» → «So am I».",
    },
    {
      kind: "table",
      title: "Coincidir en dos direcciones",
      head: ["Te dicen", "Respondes"],
      rows: [
        ["I love jazz", "So do I"],
        ["I'm tired", "So am I"],
        ["I went there", "So did I"],
        ["I don't like it", "Neither do I"],
        ["I can't swim", "Neither can I"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Agree» es verbo, no adjetivo",
      wrong: "I'm agree with you.",
      right: "I agree with you.",
      body:
        "En español «estar de acuerdo» lleva verbo + adjetivo, y de ahí sale el calco. En inglés «agree» ya es el verbo entero.",
    },
    {
      kind: "examples",
      title: "Acuerdo y desacuerdo",
      items: [
        { en: "I agree with you.", es: "Estoy de acuerdo contigo." },
        { en: "I disagree with you.", es: "No estoy de acuerdo contigo." },
        { en: "So do I.", es: "Yo también." },
        { en: "Neither do I.", es: "Yo tampoco." },
      ],
    },
  ],

  "b1-opinions-3": [
    {
      kind: "idea",
      title: "Conectores: lo que separa B1 de A2",
      body:
        "Encadenar ideas con however, although o despite hace que hables por párrafos y no por frases sueltas. Lo único que hay que controlar es qué va detrás de cada uno.",
    },
    {
      kind: "table",
      title: "Qué pide cada conector",
      head: ["Conector", "Detrás va"],
      rows: [
        ["although / even though", "sujeto + verbo"],
        ["despite / in spite of", "sustantivo o -ing"],
        ["because", "sujeto + verbo"],
        ["because of", "sustantivo"],
        ["however", "coma y frase nueva"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Despite» no lleva «of»",
      wrong: "Despite of the rain, we went out.",
      right: "Despite the rain / In spite of the rain.",
      body:
        "O «despite» solo, o «in spite of» completo. Mezclarlos es de los errores más frecuentes en textos B1.",
    },
    {
      kind: "examples",
      title: "Ideas encadenadas",
      items: [
        { en: "Although it was raining, we went out.", es: "Aunque llovía, salimos." },
        { en: "Despite the rain, we went out.", es: "A pesar de la lluvia, salimos." },
        { en: "I was tired, so I went home.", es: "Estaba cansado, así que me fui a casa." },
        { en: "However, prices went up.", es: "Sin embargo, los precios subieron." },
      ],
    },
  ],

  /* ---------------- Trabajo y estudios ---------------- */

  "b1-work-1": [
    {
      kind: "idea",
      title: "«Llevo trabajando» = have been working",
      body:
        "Cuando algo empezó en el pasado y sigue ahora, el inglés usa present perfect continuous: have/has been + -ing. El español lo dice en presente («llevo»), por eso cuesta.",
    },
    {
      kind: "table",
      title: "Vocabulario del CV",
      head: ["Español", "Inglés"],
      rows: [
        ["solicitar un puesto", "apply for a job"],
        ["experiencia", "experience (incontable)"],
        ["competencias", "skills"],
        ["fecha límite", "deadline"],
        ["¿a qué te dedicas?", "What do you do?"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Experience» casi nunca lleva plural",
      wrong: "I have three experiences in sales.",
      right: "I have three years of experience in sales.",
      body:
        "Como conocimiento acumulado es incontable. «Experiences» solo vale para vivencias sueltas (travel experiences).",
    },
    {
      kind: "examples",
      title: "Hablar de tu trayectoria",
      items: [
        { en: "I have been working here for three years.", es: "Llevo tres años trabajando aquí." },
        { en: "I want to apply for this job.", es: "Quiero solicitar este puesto." },
        { en: "I've been studying English for two years.", es: "Llevo dos años estudiando inglés." },
        { en: "We have a deadline on Friday.", es: "Tenemos una fecha límite el viernes." },
      ],
    },
  ],

  "b1-work-2": [
    {
      kind: "idea",
      title: "La entrevista tiene guion",
      body:
        "Las preguntas se repiten en todo el mundo: puntos fuertes, puntos débiles, por qué te vas, qué buscas. Prepararlas como bloques deja la cabeza libre para escuchar.",
    },
    {
      kind: "table",
      title: "Preposiciones del trabajo",
      head: ["Estructura", "Ejemplo"],
      rows: [
        ["work in a team", "trabajar en equipo"],
        ["work on a project", "trabajar en un proyecto"],
        ["work for a company", "trabajar para una empresa"],
        ["be good at something", "ser bueno en algo"],
        ["look for a job", "buscar trabajo"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Search» no es buscar trabajo",
      wrong: "I'm searching a new job.",
      right: "I'm looking for a new job.",
      body:
        "«Search» es registrar o rastrear (la policía registra una casa). Buscar algo que quieres encontrar es «look for».",
    },
    {
      kind: "examples",
      title: "Respuestas de entrevista",
      items: [
        { en: "My greatest strength is that I'm organised.", es: "Mi mayor punto fuerte es que soy organizado." },
        { en: "I work well in a team.", es: "Trabajo bien en equipo." },
        { en: "I'm looking for a new challenge.", es: "Busco un nuevo reto." },
        { en: "I'm looking for new opportunities.", es: "Estoy buscando nuevas oportunidades." },
      ],
    },
  ],

  "b1-work-3": [
    {
      kind: "idea",
      title: "Phrasal verbs: la partícula lo cambia todo",
      body:
        "Put off, put on, put up with y put out comparten verbo y no se parecen en nada. En el trabajo aparecen constantemente, así que conviene aprenderlos por bloques de significado.",
    },
    {
      kind: "table",
      title: "Los cinco de la oficina",
      head: ["Phrasal verb", "Significado"],
      rows: [
        ["come up with", "idear, ocurrírsele"],
        ["put off", "aplazar"],
        ["hand in", "entregar"],
        ["carry out", "llevar a cabo"],
        ["take on", "asumir / contratar"],
      ],
    },
    {
      kind: "pitfall",
      title: "El pronombre va en medio (en los separables)",
      wrong: "I handed in it.",
      right: "I handed it in.",
      body:
        "Con hand in, put off o take on, si el objeto es un pronombre (it, them) se cuela entre el verbo y la partícula. «Come up with» no se separa nunca.",
    },
    {
      kind: "examples",
      title: "Inglés de oficina",
      items: [
        { en: "We need to come up with a new plan.", es: "Necesitamos idear un plan nuevo." },
        { en: "They decided to put off the meeting.", es: "Decidieron aplazar la reunión." },
        { en: "I have to hand in the report tomorrow.", es: "Tengo que entregar el informe mañana." },
        { en: "We're taking on ten new people.", es: "Vamos a contratar a diez personas." },
      ],
    },
  ],

  /* ---------------- Contar lo que dijeron ---------------- */

  "b1-reported-1": [
    {
      kind: "idea",
      title: "Al reportar, todo retrocede un paso",
      body:
        "Si alguien dijo «I'm tired», al contarlo se convierte en «He said he was tired». Presente → pasado, will → would, have → had. También cambian los marcadores de tiempo.",
    },
    {
      kind: "table",
      title: "Cómo retrocede cada tiempo",
      head: ["Palabras originales", "Reportado"],
      rows: [
        ["I am tired", "he said he was tired"],
        ["I will come", "he said he would come"],
        ["I have finished", "he said he had finished"],
        ["tomorrow", "the next day"],
        ["today", "that day"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Tell» lleva persona, «say» no",
      wrong: "She said me she was late.",
      right: "She told me she was late. / She said she was late.",
      body:
        "Tell + persona (tell me, tell him). Say va solo o con «to»: «said to me». Es el par que más se falla en B1.",
    },
    {
      kind: "examples",
      title: "Contar lo que te dijeron",
      items: [
        { en: "He said he was tired.", es: "Dijo que estaba cansado." },
        { en: "She told me she was late.", es: "Me dijo que llegaba tarde." },
        { en: "He said he would come later.", es: "Dijo que vendría más tarde." },
        { en: "He said he would call me the next day.", es: "Dijo que me llamaría al día siguiente." },
      ],
    },
  ],

  "b1-reported-2": [
    {
      kind: "idea",
      title: "La pregunta reportada pierde la inversión",
      body:
        "«Where do you live?» reportada es «He asked where I lived»: desaparece el «do» y el orden vuelve a sujeto + verbo, como en una frase normal. Sin signo de interrogación.",
    },
    {
      kind: "table",
      title: "Directa contra reportada",
      head: ["Pregunta directa", "Reportada"],
      rows: [
        ["Do you live here?", "He asked if I lived there"],
        ["Where do you live?", "He asked where I lived"],
        ["What time is it?", "He asked what time it was"],
        ["Can you help me?", "She asked if I could help her"],
      ],
    },
    {
      kind: "pitfall",
      title: "Nada de «did» ni orden invertido",
      wrong: "She asked me what time was it.",
      right: "She asked me what time it was.",
      body:
        "Al reportar ya no estás preguntando, estás contando. Por eso la frase se comporta como una afirmación.",
    },
    {
      kind: "examples",
      title: "Reportar preguntas",
      items: [
        { en: "He asked if I lived there.", es: "Preguntó si yo vivía allí." },
        { en: "She asked where I lived.", es: "Preguntó dónde vivía." },
        { en: "He asked me what time it was.", es: "Me preguntó qué hora era." },
        { en: "She wanted to know whether I could help.", es: "Quería saber si podía ayudar." },
      ],
    },
  ],

  "b1-reported-3": [
    {
      kind: "idea",
      title: "El «se» español se dice con pasiva",
      body:
        "«Se habla inglés», «se construyó en 1920»: el inglés no tiene ese «se» impersonal. Usa la pasiva: be + participio, con el objeto convertido en sujeto.",
    },
    {
      kind: "table",
      title: "Activa → pasiva",
      head: ["Activa", "Pasiva"],
      rows: [
        ["They speak English here", "English is spoken here"],
        ["They built it in 1920", "It was built in 1920"],
        ["They cancelled the match", "The match was cancelled"],
        ["Cervantes wrote it", "It was written by Cervantes"],
      ],
    },
    {
      kind: "pitfall",
      title: "El «by» solo si aporta algo",
      wrong: "The match was cancelled by them.",
      right: "The match was cancelled.",
      body:
        "La pasiva se usa justo cuando el autor no importa o no se sabe. Se añade «by» solo si el autor es información relevante (by Cervantes).",
    },
    {
      kind: "examples",
      title: "Pasiva en uso",
      items: [
        { en: "English is spoken in many countries.", es: "Se habla inglés en muchos países." },
        { en: "This house was built in 1920.", es: "Esta casa fue construida en 1920." },
        { en: "The car was repaired yesterday.", es: "El coche fue reparado ayer." },
        { en: "It must be done today.", es: "Hay que hacerlo hoy." },
      ],
    },
  ],
};
