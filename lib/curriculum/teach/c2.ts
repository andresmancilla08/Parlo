import type { TeachMap } from "./types";

// Teoría del nivel C2. Todo en español, como el resto.
// A esta altura ya no se enseña «cómo se forma», sino «cuándo se elige»: qué
// se calla, dónde cae el foco, qué registro pide la situación y qué está
// diciendo el otro cuando dice algo distinto de lo que quiere decir.
export const c2Teach: TeachMap = {
  /* ---------------- Economía y precisión ---------------- */

  "c2-precision-1": [
    {
      kind: "idea",
      title: "El inglés borra lo que ya se sabe",
      body: "Cuando algo se puede recuperar del contexto, el inglés lo quita y deja solo el gancho: el auxiliar («she can too»), el «to» del infinitivo («I'd love to») o la preposición suelta («not that I know of»). Repetirlo entero no es un error de gramática, pero delata al que traduce en lugar de hablar.",
    },
    {
      kind: "table",
      title: "Qué se queda y qué se cae",
      head: ["Completo", "Como se dice"],
      rows: [
        ["I would love to come", "I'd love to"],
        ["She can swim and he can swim", "She can swim and he can too"],
        ["Yes, I have finished", "Yes, I have"],
        ["He said he would call, but he didn't call", "He said he would, but he didn't"],
      ],
    },
    {
      kind: "pitfall",
      title: "El «to» no se cae con el verbo",
      wrong: "Are you coming? — I'd love.",
      right: "Are you coming? — I'd love to.",
      body: "Se borra el verbo, no el «to»: es justo la partícula que avisa de que había un infinitivo. Dejar «I'd love» a secas suena incompleto, igual que en español «me encantaría» sin más contexto.",
    },
    {
      kind: "examples",
      title: "Elipsis en conversación",
      items: [
        { en: "I'd love to.", es: "Me encantaría.", note: "se calla el verbo, se queda el to" },
        { en: "Not that I know of.", es: "Que yo sepa, no." },
        { en: "Some can, some can't.", es: "Unos pueden, otros no." },
        { en: "She said she would, but she didn't.", es: "Dijo que lo haría, pero no." },
      ],
    },
  ],

  "c2-precision-2": [
    {
      kind: "idea",
      title: "Sustituir es más elegante que repetir",
      body: "El inglés tiene piezas cuyo único trabajo es ocupar el sitio de algo ya dicho: «do so» por un verbo de acción, «one/ones» por un sustantivo contable y «so/not» por una frase entera. Sin ellas, el texto repite y suena pesado; con ellas, avanza.",
    },
    {
      kind: "table",
      title: "Cada hueco, su sustituto",
      head: ["Sustituye a", "Pieza"],
      rows: [
        ["Un verbo de accion ya dicho (formal)", "do so"],
        ["Un verbo de accion ya dicho (hablado)", "do it"],
        ["Un sustantivo contable", "one / ones"],
        ["Una frase entera, en afirmativo", "so (I think so)"],
        ["Una frase entera, en negativo", "not (I hope not)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«So» y «not» no se mezclan al azar",
      wrong: "Is it going to rain? — I hope no.",
      right: "Is it going to rain? — I hope not.",
      body: "«No» es la respuesta a una pregunta; «not» es la pieza que sustituye a la frase negada. Con hope, afraid, guess y believe la negación va con «not»; con think, lo normal es negar el verbo: I don't think so.",
    },
    {
      kind: "examples",
      title: "Sustitución en contexto",
      items: [
        { en: "If you have not done so, please sign it.", es: "Si aun no lo ha hecho, firme, por favor.", note: "registro escrito" },
        { en: "Take the wooden one.", es: "Coge la de madera." },
        { en: "Are you coming? If so, let me know.", es: "Vienes? De ser asi, avisame." },
        { en: "I'm afraid not.", es: "Me temo que no." },
      ],
    },
  ],

  "c2-precision-3": [
    {
      kind: "idea",
      title: "Un verbo exacto vale por tres palabras",
      body: "En C2 la precisión no se consigue añadiendo adverbios, sino eligiendo el verbo que ya lleva dentro el matiz. «Prices went up a lot» es correcto; «prices soared» es lo que escribiría un periodista. El adverbio se nota como parche cuando existe un verbo que dice lo mismo.",
    },
    {
      kind: "table",
      title: "Subir y bajar, por intensidad",
      head: ["Movimiento", "Verbo"],
      rows: [
        ["Subir poco a poco", "edge up / creep up"],
        ["Subir sin mas", "rise / increase"],
        ["Subir muchisimo", "soar / rocket"],
        ["Bajar poco a poco", "ease / dip"],
        ["Desplomarse", "plummet / plunge"],
      ],
    },
    {
      kind: "pitfall",
      title: "No traduzcas «hacer más simple» palabra por palabra",
      wrong: "We need to make the process more simple and more fast.",
      right: "We need to streamline the process.",
      body: "El inglés tiene un verbo para casi cualquier proceso: streamline (simplificar y agilizar), curb (frenar), tackle (abordar), scrap (eliminar del todo). Encadenar «make + adjetivo» funciona, pero se lee como un rodeo.",
    },
    {
      kind: "examples",
      title: "El verbo justo",
      items: [
        { en: "Prices soared by 40% in a single month.", es: "Los precios se dispararon un 40% en un solo mes." },
        { en: "The new law aims to curb speculation.", es: "La nueva ley busca frenar la especulacion." },
        { en: "We need to tackle the root of the problem.", es: "Tenemos que abordar la raiz del problema." },
        { en: "The subsidy will be phased out by 2030.", es: "La subvencion se retirara por fases antes de 2030." },
      ],
    },
  ],

  /* ---------------- Foco y orden de la información ---------------- */

  "c2-focus-1": [
    {
      kind: "idea",
      title: "Partir la frase para señalar con el dedo",
      body: "Las frases hendidas parten una oración en dos para poner una parte bajo el foco: «It was Marta who broke it» señala a Marta, no al jarrón. En español el foco se marca con la entonación; en inglés, que tiene el orden más rígido, se marca con estructura.",
    },
    {
      kind: "table",
      title: "Tres formas de enfocar",
      head: ["Estructura", "Que enfoca"],
      rows: [
        ["It was X that/who…", "una parte concreta (X)"],
        ["What I need is…", "toda la idea, presentada como novedad"],
        ["All I want is…", "eso y nada mas"],
        ["The reason I left was that…", "la causa"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Lo que» no es «the thing what»",
      wrong: "The thing what bothers me is the noise.",
      right: "What bothers me is the noise.",
      body: "«What» ya significa «lo que» y no necesita antecedente. Si quieres el sustantivo, la fórmula es «the thing THAT bothers me», nunca «the thing what»: eso es dialectal y en un examen cuenta como error.",
    },
    {
      kind: "examples",
      title: "Enfocar a voluntad",
      items: [
        { en: "It was Marta who broke the vase.", es: "Fue Marta quien rompio el jarron." },
        { en: "What I need is a week off.", es: "Lo que necesito es una semana libre." },
        { en: "All I want is a straight answer.", es: "Lo unico que quiero es una respuesta clara." },
        { en: "The reason I left was that I was tired.", es: "Me fui porque estaba cansado." },
      ],
    },
  ],

  "c2-focus-2": [
    {
      kind: "idea",
      title: "Adelantar para dar dramatismo",
      body: "Sacar al principio algo que iría después convierte una frase neutra en una frase marcada: «Down came the rain» tiene ritmo de relato, «The rain came down» no. Es un recurso de narración, discurso y titular; en un correo de trabajo llamaría demasiado la atención.",
    },
    {
      kind: "table",
      title: "Qué se adelanta y qué pasa con el verbo",
      head: ["Se adelanta", "Orden que sigue"],
      rows: [
        ["Adverbio de lugar + sujeto sustantivo", "Down came the rain"],
        ["Adverbio de lugar + sujeto pronombre", "Off he went (sin invertir)"],
        ["so + adjetivo", "So tired was I that…"],
        ["such + sustantivo", "Such was his anger that…"],
        ["Participio", "Gone are the days"],
      ],
    },
    {
      kind: "pitfall",
      title: "Con pronombre NO se invierte",
      wrong: "Off went he to the station.",
      right: "Off he went to the station.",
      body: "La inversión solo entra si el sujeto es un sustantivo con peso. Con un pronombre (he, she, it) el sujeto se queda delante del verbo: la frase suena rara justamente porque el pronombre no tiene peso que aguante el final.",
    },
    {
      kind: "examples",
      title: "Orden marcado",
      items: [
        { en: "Gone are the days when a degree guaranteed a job.", es: "Atras quedaron los dias en que un titulo garantizaba trabajo." },
        { en: "Such was his anger that he walked out.", es: "Tal era su enfado que se marcho." },
        { en: "Down came the rain, and the match was over.", es: "Cayo la lluvia y se acabo el partido." },
        { en: "That I will not discuss.", es: "Eso no lo pienso discutir." },
      ],
    },
  ],

  "c2-focus-3": [
    {
      kind: "idea",
      title: "Lo largo, al final",
      body: "El inglés coloca lo corto y conocido al principio y lo largo y nuevo al final. Por eso una frase con sujeto larguísimo se reescribe con un «it» vacío delante: «It is worth noting that…». La información pesada al principio obliga a leer dos veces.",
    },
    {
      kind: "table",
      title: "«It» o «there», según qué presentes",
      head: ["Que introduces", "Sujeto vacio"],
      rows: [
        ["Una frase completa detras", "it (it turned out that…)"],
        ["Existencia o aparicion", "there (there arose a problem)"],
        ["Una valoracion", "it (it is worth noting…)"],
        ["Algo que queda pendiente", "there (there remains the question of…)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Worth» pide -ing, no infinitivo",
      wrong: "It is worth to note that the data are provisional.",
      right: "It is worth noting that the data are provisional.",
      body: "«Worth» funciona como preposición y todo lo que va detrás va en -ing: worth noting, worth trying, worth doing. Es el mismo motivo por el que se dice «look forward to seeing you».",
    },
    {
      kind: "examples",
      title: "Peso al final",
      items: [
        { en: "It is worth noting that the data come from two sources.", es: "Conviene senalar que los datos vienen de dos fuentes." },
        { en: "It turned out that nobody had read it.", es: "Resulto que nadie lo habia leido." },
        { en: "There remains the question of who pays.", es: "Queda la cuestion de quien paga." },
        { en: "It strikes me that nobody checked it.", es: "Me da la impresion de que nadie lo comprobo." },
      ],
    },
  ],

  /* ---------------- Registro extremo ---------------- */

  "c2-register-1": [
    {
      kind: "idea",
      title: "El inglés de los contratos es otro idioma",
      body: "En un documento legal «shall» no es futuro sino obligación, «deem» es considerar y «hereby» significa «con este mismo documento». No hace falta escribir así, pero sí reconocerlo: es el inglés de los contratos de alquiler, los términos de servicio y las cartas oficiales.",
    },
    {
      kind: "table",
      title: "Legal y su equivalente normal",
      head: ["Registro legal", "Ingles corriente"],
      rows: [
        ["The tenant shall pay", "The tenant must pay"],
        ["Pursuant to article 5", "Under article 5"],
        ["In the event of non-payment", "If you do not pay"],
        ["Shall be deemed a breach", "Will count as a breach"],
        ["The undersigned", "The person signing"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Shall» fuera de un contrato suena antiguo",
      wrong: "I shall send you the file this afternoon.",
      right: "I'll send you the file this afternoon.",
      body: "En un contrato «shall» impone obligación; en un correo normal suena a novela del siglo XIX. La excepción viva es la propuesta: «Shall we start?», que sí es actual y muy común.",
    },
    {
      kind: "examples",
      title: "Cláusulas típicas",
      items: [
        { en: "I hereby confirm that I have read the document.", es: "Por la presente confirmo que he leido el documento." },
        { en: "In the event of non-payment, the contract is void.", es: "En caso de impago, el contrato queda anulado." },
        { en: "Failure to comply may result in a fine.", es: "El incumplimiento puede acarrear una multa." },
        { en: "The parties agree to the terms set out below.", es: "Las partes aceptan las condiciones expuestas a continuacion." },
      ],
    },
  ],

  "c2-register-2": [
    {
      kind: "idea",
      title: "Los titulares tienen su propia gramática",
      body: "Un titular quita artículos y el verbo «to be», usa el presente para hablar del pasado reciente y el infinitivo con «to» para el futuro. Además elige palabras cortas que en la vida normal casi no se usan: row, bid, probe, axe, curb. Sin esas reglas, un titular parece agramatical.",
    },
    {
      kind: "table",
      title: "Vocabulario de titular",
      head: ["En el titular", "Significa"],
      rows: [
        ["row", "polemica, disputa"],
        ["bid", "intento"],
        ["probe", "investigacion"],
        ["axe", "recortar, suprimir"],
        ["held", "detenido"],
        ["hit", "afectado gravemente"],
      ],
    },
    {
      kind: "pitfall",
      title: "«PM to visit Berlin» no es pasado",
      wrong: "PM to visit Berlin = el primer ministro visito Berlin.",
      right: "PM to visit Berlin = el primer ministro visitara Berlin.",
      body: "El infinitivo con «to» en un titular marca futuro, porque se ahorran el «will» o el «is going to». Si el titular dice «PM visits Berlin», entonces sí es presente o pasado muy reciente.",
    },
    {
      kind: "examples",
      title: "Titular y frase completa",
      items: [
        { en: "Talks collapse over pay row.", es: "Las negociaciones fracasan por una polemica salarial." },
        { en: "Three held over theft.", es: "Tres detenidos por un robo." },
        { en: "Firm to axe 200 jobs.", es: "Una empresa recortara 200 empleos." },
        { en: "Bid to save hospital fails.", es: "Fracasa el intento de salvar el hospital." },
      ],
    },
  ],

  "c2-register-3": [
    {
      kind: "idea",
      title: "El inglés hablado se come sílabas",
      body: "«Going to» suena «gonna», «want to» suena «wanna» y «do you» suena «d'you». No son formas incorrectas: son la pronunciación real, y por eso aparecen escritas en diálogos, canciones y mensajes. En un texto formal, en cambio, chirrían.",
    },
    {
      kind: "table",
      title: "Cómo suena de verdad",
      head: ["Escrito", "Hablado"],
      rows: [
        ["going to", "gonna"],
        ["want to", "wanna"],
        ["got to", "gotta"],
        ["do you", "d'you"],
        ["let me", "lemme"],
      ],
    },
    {
      kind: "pitfall",
      title: "«You alright?» no pregunta por tu salud",
      wrong: "You alright? — Well, my back hurts and I slept badly...",
      right: "You alright? — Yeah, you?",
      body: "En el Reino Unido es un saludo, equivalente a «qué tal». Se responde con otro saludo, no con un parte médico. Contestar en serio es una de las señales más claras de que alguien no es nativo.",
    },
    {
      kind: "examples",
      title: "Conversación real",
      items: [
        { en: "D'you reckon it's gonna work?", es: "Tu crees que va a funcionar?" },
        { en: "I'm knackered, honestly.", es: "Estoy hecho polvo, de verdad." },
        { en: "You're coming, aren't you?", es: "Vienes, no?" },
        { en: "It was sort of weird.", es: "Fue un poco raro." },
      ],
    },
  ],

  /* ---------------- Lenguaje figurado ---------------- */

  "c2-figurative-1": [
    {
      kind: "idea",
      title: "Las metáforas deciden qué colocación es natural",
      body: "El inglés trata el tiempo como dinero (spend, save, waste), la discusión como una pelea (attack, defend, shoot down) y entender como ver (I see, it's clear). No son adornos: son la razón por la que «save time» suena bien y «win time» suena raro.",
    },
    {
      kind: "table",
      title: "Tres metáforas que mandan",
      head: ["Metafora", "Colocaciones"],
      rows: [
        ["El tiempo es dinero", "spend, save, waste, invest time"],
        ["Discutir es pelear", "attack a point, defend a claim, win an argument"],
        ["Entender es ver", "I see, it's clear, a bright idea"],
        ["Las ideas son edificios", "a solid argument, build a case, it collapsed"],
      ],
    },
    {
      kind: "pitfall",
      title: "El tiempo no se gana, se ahorra",
      wrong: "If we work together we will win time.",
      right: "If we work together we will save time.",
      body: "Como el tiempo se conceptualiza como dinero, se ahorra (save), se gasta (spend) y se malgasta (waste). «Win time» solo tiene sentido en una carrera, donde de verdad se gana tiempo a un rival.",
    },
    {
      kind: "examples",
      title: "Metáforas en uso",
      items: [
        { en: "I spent two hours on that email.", es: "Le dedique dos horas a ese correo." },
        { en: "He attacked every point I made.", es: "Rebatio todos mis argumentos." },
        { en: "I see your point.", es: "Entiendo lo que dices." },
        { en: "That argument does not hold up.", es: "Ese argumento no se sostiene." },
      ],
    },
  ],

  "c2-figurative-2": [
    {
      kind: "idea",
      title: "Modismos que no se pueden deducir",
      body: "Hay expresiones cuyo significado no sale de sus palabras: «bite the bullet» no habla de balas ni «move the goalposts» de fútbol. Son fijas palabra por palabra, así que cambiar un artículo o una preposición las rompe. Se aprenden enteras, como si fueran una sola palabra larga.",
    },
    {
      kind: "table",
      title: "Modismos frecuentes en el trabajo",
      head: ["Modismo", "Significado"],
      rows: [
        ["bite the bullet", "hacer de tripas corazon"],
        ["move the goalposts", "cambiar las condiciones a mitad"],
        ["jump the gun", "precipitarse"],
        ["sit on the fence", "no mojarse"],
        ["let the cat out of the bag", "irse de la lengua"],
      ],
    },
    {
      kind: "pitfall",
      title: "Un modismo no admite retoques",
      wrong: "He let a cat out of a bag.",
      right: "He let the cat out of the bag.",
      body: "Los artículos forman parte de la expresión. Al cambiarlos, el oyente deja de reconocer el modismo y entiende la frase literalmente, que es justo lo que no quieres: hablar de un gato dentro de una bolsa.",
    },
    {
      kind: "examples",
      title: "Modismos en contexto",
      items: [
        { en: "We'll have to bite the bullet and tell them.", es: "Vamos a tener que hacer de tripas corazon y decirselo." },
        { en: "They keep moving the goalposts.", es: "No paran de cambiar las condiciones." },
        { en: "Don't jump the gun: nothing is signed.", es: "No te precipites: no hay nada firmado." },
        { en: "She's still sitting on the fence.", es: "Sigue sin mojarse." },
      ],
    },
  ],

  "c2-figurative-3": [
    {
      kind: "idea",
      title: "El eufemismo dice y no dice",
      body: "Despedir es «let someone go», morir es «pass away» y un trimestre malo es «challenging». El eufemismo no engaña a nadie: señala que el tema es delicado y que quien habla lo trata con cuidado. Reconocerlos es entender la noticia de verdad.",
    },
    {
      kind: "table",
      title: "Lo que se dice y lo que significa",
      head: ["Eufemismo", "Significado real"],
      rows: [
        ["We had to let him go", "Le despedimos"],
        ["A challenging quarter", "Un trimestre malo"],
        ["Restructuring", "Despidos"],
        ["Between jobs", "En paro"],
        ["Economical with the truth", "Mintio"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Pass away» y «pass out» no son lo mismo",
      wrong: "I'm sorry, I heard your grandfather passed out last year.",
      right: "I'm sorry, I heard your grandfather passed away last year.",
      body: "«Pass away» es fallecer, con respeto; «pass out» es desmayarse o emborracharse hasta caer. Una partícula de diferencia y un malentendido incómodo garantizado en el peor momento posible.",
    },
    {
      kind: "examples",
      title: "Eufemismos habituales",
      items: [
        { en: "We had to let three people go.", es: "Tuvimos que despedir a tres personas." },
        { en: "His grandfather passed away last year.", es: "Su abuelo fallecio el ano pasado." },
        { en: "It's been a challenging quarter.", es: "Ha sido un trimestre malo." },
        { en: "I'm between jobs at the moment.", es: "Ahora mismo estoy en paro." },
      ],
    },
  ],

  /* ---------------- Lo que no se dice ---------------- */

  "c2-implicature-1": [
    {
      kind: "idea",
      title: "Bajar el volumen sin bajar la gravedad",
      body: "El understatement dice menos de lo que quiere decir y deja que el oyente complete. «Not bad» puede ser buenísimo y «a bit of a problem» puede ser un desastre. En el inglés británico es la norma, no una excepción graciosa.",
    },
    {
      kind: "table",
      title: "Lo que se oye y lo que se quiere decir",
      head: ["Se dice", "Significa"],
      rows: [
        ["Not bad at all", "Muy bueno"],
        ["That's not ideal", "Esto esta mal"],
        ["A bit of a problem", "Un problema serio"],
        ["I've had better days", "Ha sido un dia horrible"],
        ["There may be some discomfort", "Va a doler"],
      ],
    },
    {
      kind: "pitfall",
      title: "«A bit of a» delante de algo malo lo agrava",
      wrong: "We have a bit of a problem = tenemos un problemilla.",
      right: "We have a bit of a problem = tenemos un problema serio.",
      body: "Con sustantivos negativos, «a bit of a» funciona por contraste y suele anunciar algo gordo: a bit of a disaster, a bit of a nightmare. La entonación y la cara del que habla completan el resto.",
    },
    {
      kind: "examples",
      title: "Quitar hierro",
      items: [
        { en: "Not bad at all.", es: "Nada mal (muy bueno)." },
        { en: "That's not ideal.", es: "Eso es un desastre." },
        { en: "I've had better days.", es: "He tenido dias mejores." },
        { en: "It's rather chilly today.", es: "Hoy hace un frio considerable." },
      ],
    },
  ],

  "c2-implicature-2": [
    {
      kind: "idea",
      title: "Decir lo contrario y que se entienda",
      body: "La ironía inglesa no cambia las palabras: cambia el contexto y la entonación, que suele caer al final. «Well, that went well» tras un fracaso es la fórmula más reconocible. Si el contexto es malo y la frase es buena, casi siempre hay ironía.",
    },
    {
      kind: "table",
      title: "Fórmulas irónicas hechas",
      head: ["Frase", "Cuando se usa"],
      rows: [
        ["Well, that went well", "Cuando ha salido fatal"],
        ["Just what I needed", "Cuando pasa algo inoportuno"],
        ["You don't say", "Ante una obviedad"],
        ["How very original", "Ante algo muy visto"],
        ["Thanks a lot", "Tras una faena"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Tell me about it» no pide detalles",
      wrong: "This traffic is awful. — Tell me about it. — Well, it started at the roundabout...",
      right: "This traffic is awful. — Tell me about it. — I know, right?",
      body: "Es una forma enfática de decir «y que lo digas, me pasa igual». Si de verdad quieres que te cuenten más, hay que pedirlo con «tell me more» o «what happened?».",
    },
    {
      kind: "examples",
      title: "Ironía en frases hechas",
      items: [
        { en: "Well, that went well.", es: "Pues que bien ha salido (no)." },
        { en: "Just what I needed.", es: "Justo lo que me faltaba." },
        { en: "You don't say.", es: "No me digas." },
        { en: "Brilliant, simply brilliant.", es: "Brillante, sin mas." },
      ],
    },
  ],

  "c2-implicature-3": [
    {
      kind: "idea",
      title: "El no educado tiene fórmulas propias",
      body: "En inglés profesional casi nadie dice «no». Se dice «I'm not sure that's feasible», «let's park that» o «I'll see what I can do». Reconocer estas fórmulas evita salir de una reunión convencido de que te han dicho que sí.",
    },
    {
      kind: "table",
      title: "Del aplazamiento al no rotundo",
      head: ["Frase", "Cuanto no es"],
      rows: [
        ["Let me look into it", "Quiza; aun hay margen"],
        ["I'll see what I can do", "Probablemente no, pero lo intento"],
        ["Let's park that for now", "No ahora, y quiza nunca"],
        ["I'm not sure that's feasible", "No, dicho con suavidad"],
        ["I'm afraid that won't be possible", "No, y no hay vuelta"],
      ],
    },
    {
      kind: "pitfall",
      title: "«With all due respect» no es un cumplido",
      wrong: "With all due respect = con todo el respeto, estoy de acuerdo.",
      right: "With all due respect = con todo el respeto, creo que se equivoca.",
      body: "Es un aviso: lo que viene detrás es un desacuerdo, y a veces bastante duro. Lo mismo pasa con «no offence, but…» y con «I hear what you're saying, but…».",
    },
    {
      kind: "examples",
      title: "Negativas educadas",
      items: [
        { en: "I'm not sure that's feasible.", es: "No lo veo viable." },
        { en: "Let's park that for now.", es: "Dejemoslo aparcado por ahora." },
        { en: "I'll see what I can do.", es: "Vere que puedo hacer." },
        { en: "That's one way of looking at it.", es: "Es una forma de verlo (no la mia)." },
      ],
    },
  ],

  /* ---------------- Variedades y cambio ---------------- */

  "c2-variety-1": [
    {
      kind: "idea",
      title: "Dos normas, ninguna equivocada",
      body: "Británico y americano se diferencian en vocabulario, ortografía y algo de gramática. Ninguna es mejor: lo que sí es un error es mezclarlas en el mismo texto. Elige una según tu lector y sé coherente de principio a fin.",
    },
    {
      kind: "table",
      title: "Diferencias que más se notan",
      head: ["Britanico", "Americano"],
      rows: [
        ["flat, lift, lorry, queue", "apartment, elevator, truck, line"],
        ["colour, organisation, centre", "color, organization, center"],
        ["I've just eaten", "I just ate"],
        ["at the weekend", "on the weekend"],
        ["The team are playing well", "The team is playing well"],
      ],
    },
    {
      kind: "pitfall",
      title: "No mezcles las dos ortografías",
      wrong: "Our organisation is committed to the color of the centre.",
      right: "Our organization is committed to the color of the center.",
      body: "Mezclar -ise con -or (o -ize con -our) es lo que delata un texto sin revisar. Si escribes para EE. UU., todo en americano; si es para el Reino Unido, todo en británico, incluido el corrector del editor.",
    },
    {
      kind: "examples",
      title: "La misma idea en dos ingleses",
      items: [
        { en: "I live in a flat near the lift.", es: "Vivo en un piso cerca del ascensor.", note: "britanico" },
        { en: "I live in an apartment near the elevator.", es: "Vivo en un piso cerca del ascensor.", note: "americano" },
        { en: "Have you got a car?", es: "Tienes coche?", note: "britanico" },
        { en: "Do you have a car?", es: "Tienes coche?", note: "americano" },
      ],
    },
  ],

  "c2-variety-2": [
    {
      kind: "idea",
      title: "La jerga de oficina es un dialecto",
      body: "«Let's circle back and align on the deliverables» no es inglés difícil: es inglés de reunión. Conviene entenderlo porque se usa todos los días, y conviene dosificarlo porque abusar de él es la manera más rápida de sonar hueco.",
    },
    {
      kind: "table",
      title: "Traducción del corporate",
      head: ["Se dice", "Quiere decir"],
      rows: [
        ["Let's circle back", "Lo retomamos mas adelante"],
        ["Low-hanging fruit", "Lo facil, con resultado rapido"],
        ["I don't have the bandwidth", "No tengo tiempo ni energia"],
        ["Let's align on this", "Pongamonos de acuerdo"],
        ["A deep dive", "Un analisis a fondo"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Align» es verbo, no sustantivo",
      wrong: "We need to alignment on the priorities.",
      right: "We need to align on the priorities.",
      body: "Tras «to» va el infinitivo: to align. El sustantivo «alignment» encaja en otro sitio: «we need alignment on the priorities», que también es correcto y suena aún más corporativo.",
    },
    {
      kind: "examples",
      title: "Frases de reunión",
      items: [
        { en: "Let's circle back on this next week.", es: "Lo retomamos la semana que viene." },
        { en: "Let's start with the low-hanging fruit.", es: "Empecemos por lo facil." },
        { en: "I don't have the bandwidth for this.", es: "No tengo capacidad para esto." },
        { en: "Can we take this offline?", es: "Lo hablamos aparte?" },
      ],
    },
  ],

  "c2-variety-3": [
    {
      kind: "idea",
      title: "El inglés cambia mientras lo aprendes",
      body: "Cada año entran verbos nuevos hechos con sustantivos (to google, to ghost, to screenshot) y se asientan usos que antes se corregían, como el «they» para una sola persona. Saber qué es nuevo y qué es estándar hoy es parte del nivel C2.",
    },
    {
      kind: "table",
      title: "Palabras que hoy ya son normales",
      head: ["Palabra", "Que significa"],
      rows: [
        ["to google", "buscar en internet"],
        ["to ghost someone", "desaparecer sin dar explicaciones"],
        ["to screenshot", "hacer una captura"],
        ["a hard pass", "un no rotundo"],
        ["to gatekeep", "guardarse el acceso a algo"],
      ],
    },
    {
      kind: "pitfall",
      title: "El «they» singular ya no es un error",
      wrong: "Someone left his or her umbrella in his or her seat.",
      right: "Someone left their umbrella in their seat.",
      body: "Cuando no sabes de quién hablas o no procede especificar, el estándar actual es «they» con verbo en plural. La fórmula «his or her» sigue siendo correcta, pero pesa y hoy suena antigua.",
    },
    {
      kind: "examples",
      title: "Inglés de hoy",
      items: [
        { en: "I googled it before the meeting.", es: "Lo busque en internet antes de la reunion." },
        { en: "He ghosted me after the interview.", es: "Desaparecio sin decir nada tras la entrevista." },
        { en: "Someone left their umbrella.", es: "Alguien se dejo el paraguas." },
        { en: "Dinner at midnight? That's a hard pass.", es: "Cenar a medianoche? Ni de broma." },
      ],
    },
  ],
};
