import type { ExtraMap } from "./index";

// Ejercicios adicionales de C1: tres por lección, para pasar de 5 a 8.
// En C1 lo que falla ya no es la regla, es el REGISTRO y la colocación: la
// inversión que suena a discurso y no a conversación, el verbo de decir que
// mete una valoración sin querer, la pareja de palabras casi idénticas.
export const c1Extra: ExtraMap = {
  /* ---------------- Inversión y énfasis ---------------- */

  "c1-inversion-1": [
    {
      kind: "choose",
      prompt: "«Not only ___ the deadline, he also went over budget.»",
      options: ["did he miss", "he missed", "he did miss", "missed he"],
      answer: "did he miss",
      explain:
        "Tras «not only» al principio, inversión obligatoria con auxiliar: did he miss. La segunda parte, en cambio, va en orden normal.",
      speak: "Not only did he miss the deadline, he also went over budget.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál NO lleva inversión?",
      options: [
        "I have never seen such a mess",
        "Never have I seen such a mess",
        "Rarely do we see this",
        "Seldom did they complain",
      ],
      answer: "I have never seen such a mess",
      explain:
        "La inversión sólo salta cuando el negativo abre la frase. Si «never» va en su sitio habitual, el orden es el normal.",
    },
    {
      kind: "bank",
      prompt: "Traduce (formal): «En ningún momento se nos informó del riesgo»",
      answer: "at no point were we informed of the risk",
      bank: ["at", "no", "point", "were", "we", "informed", "of", "the", "risk", "was", "did"],
      explain:
        "Con pasiva, el que se adelanta es el verbo «to be»: were we informed. No entra «did», porque ya hay auxiliar propio.",
    },
  ],

  "c1-inversion-2": [
    {
      kind: "choose",
      prompt: "«Hardly had the meeting started ___ the fire alarm went off.»",
      options: ["when", "than", "that", "then"],
      answer: "when",
      explain:
        "Pareja fija: hardly/scarcely… WHEN, pero no sooner… THAN. Cruzarlas es el error más frecuente de esta estructura.",
      speak: "Hardly had the meeting started when the fire alarm went off.",
    },
    {
      kind: "choose",
      prompt: "«Not until the results came out ___ how serious it was.»",
      options: ["did we understand", "we understood", "we did understand", "understood we"],
      answer: "did we understand",
      explain:
        "«Not until + frase» retrasa la inversión hasta la oración PRINCIPAL: la subordinada va normal, la principal invertida.",
    },
    {
      kind: "type",
      prompt: "Completa: «Only after signing ___ she realise what it meant» (una palabra)",
      answer: ["did"],
      explain:
        "«Only + complemento» al frente exige auxiliar + sujeto + verbo BASE: did she realise, nunca «did she realised».",
    },
  ],

  "c1-inversion-3": [
    {
      kind: "choose",
      prompt: "¿Cuál es la condicional formal sin «if» equivalente a «If the payment fails…»?",
      options: [
        "Should the payment fail",
        "Should the payment fails",
        "Would the payment fail",
        "Had the payment fail",
      ],
      answer: "Should the payment fail",
      explain:
        "«Should + sujeto + infinitivo sin to» = registro formal de un primer condicional. Sin -s: el verbo va en base.",
      speak: "Should the payment fail, please contact support.",
    },
    {
      kind: "choose",
      prompt: "«___ it not been for her, the project would have failed.»",
      options: ["Had", "If", "Were", "Should"],
      answer: "Had",
      explain:
        "«Had it not been for X» es la versión invertida de «If it hadn't been for X»: pasado irreal, registro alto y sin «if».",
    },
    {
      kind: "bank",
      prompt: "Traduce (enfático): «Tan convincente fue el argumento que todos votaron a favor»",
      answer: "so convincing was the argument that everyone voted in favour",
      bank: ["so", "convincing", "was", "the", "argument", "that", "everyone", "voted", "in", "favour", "such"],
      explain:
        "«So + adjetivo» al frente invierte el verbo: so convincing WAS the argument. Con sustantivo iría «such»: such was the argument.",
    },
  ],

  /* ---------------- Matices modales ---------------- */

  "c1-nuance-1": [
    {
      kind: "choose",
      prompt: "¿Cuál dice que la acción SÍ se hizo, aunque era innecesaria?",
      options: [
        "You needn't have waited",
        "You didn't need to wait",
        "You mustn't wait",
        "You don't have to wait",
      ],
      answer: "You needn't have waited",
      explain:
        "«Needn't have + participio» = lo hiciste y sobraba. «Didn't need to» deja abierto si llegaste a hacerlo o no.",
      speak: "You needn't have waited for me.",
    },
    {
      kind: "choose",
      prompt: "«The lights are off; they ___ home yet.»",
      options: ["can't have arrived", "mustn't have arrived", "couldn't arrive", "haven't must arrive"],
      answer: "can't have arrived",
      explain:
        "La deducción NEGATIVA sobre el pasado va con «can't have», nunca con «mustn't have» (eso es una prohibición).",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Deberías habérmelo dicho antes»",
      answer: "you should have told me earlier",
      bank: ["you", "should", "have", "told", "me", "earlier", "had", "say"],
      explain:
        "Reproche del pasado: should have + participio. Y «tell» pide persona directa (told me); «say» exigiría «said to me».",
    },
  ],

  "c1-nuance-2": [
    {
      kind: "choose",
      prompt: "Ordena de MENOS a MÁS probable:",
      options: [
        "unlikely to → may well → bound to",
        "bound to → may well → unlikely to",
        "may well → unlikely to → bound to",
        "unlikely to → bound to → may well",
      ],
      answer: "unlikely to → may well → bound to",
      explain:
        "unlikely (poco probable) < may well (bastante posible) < bound to (prácticamente seguro). Elegir mal la escala cambia el compromiso que asumes.",
    },
    {
      kind: "choose",
      prompt: "«She's ___ to have finished by now.» (cálculo razonable)",
      options: ["likely", "probable", "possible", "maybe"],
      answer: "likely",
      explain:
        "Sólo «likely» admite la estructura «be + adjetivo + to + infinitivo». Con probable/possible hay que decir «it is probable THAT…».",
      speak: "She's likely to have finished by now.",
    },
    {
      kind: "type",
      prompt: "Completa la duda formal: «I ___ whether that is the whole story» (verbo, 5 letras)",
      answer: ["doubt"],
      explain:
        "«I doubt whether/if» es más formal y menos tajante que «I don't think». Con «whether» suena a informe; con «if», a conversación.",
    },
  ],

  "c1-nuance-3": [
    {
      kind: "choose",
      prompt: "«Would you mind if I ___ the meeting?»",
      options: ["postponed", "postpone", "will postpone", "to postpone"],
      answer: "postponed",
      explain:
        "«Would you mind IF I + pasado» (petición sobre lo que hago yo). Con -ing sería lo que hace el otro: would you mind postponing it?",
      speak: "Would you mind if I postponed the meeting?",
    },
    {
      kind: "choose",
      prompt: "Alguien te dice «Would you mind opening the window?» y aceptas. ¿Qué respondes?",
      options: ["Not at all", "Yes, I would", "Yes, of course I mind", "Certainly I mind"],
      answer: "Not at all",
      explain:
        "Trampa clásica: «mind» significa «molestar», así que aceptar es decir NO. «Yes» equivaldría a negarte.",
    },
    {
      kind: "bank",
      prompt: "Traduce (muy educado): «Te agradecería que me confirmaras la fecha»",
      answer: "I would appreciate it if you could confirm the date",
      bank: ["I", "would", "appreciate", "it", "if", "you", "could", "confirm", "the", "date", "that", "will"],
      explain:
        "La fórmula lleva un «it» obligatorio antes del «if»: appreciate IT if. Sin él, la frase suena incompleta a un nativo.",
    },
  ],

  /* ---------------- Frases más compactas ---------------- */

  "c1-participle-1": [
    {
      kind: "choose",
      prompt: "«___ in 1890, the bridge still carries traffic.»",
      options: ["Built", "Building", "Having built", "It built"],
      answer: "Built",
      explain:
        "El participio PASADO (built) marca voz pasiva: el puente fue construido. Con -ing el puente estaría construyendo algo.",
      speak: "Built in 1890, the bridge still carries traffic.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál corrige «Reading the contract, the terms seemed unfair»?",
      options: [
        "Reading the contract, I found the terms unfair",
        "Reading the contract, the terms were unfair to me",
        "The terms, reading the contract, seemed unfair",
        "Reading the contract, unfair seemed the terms",
      ],
      answer: "Reading the contract, I found the terms unfair",
      explain:
        "Participio colgado: quien lee tiene que ser el SUJETO de la principal. «The terms» no leen nada; hay que poner «I».",
    },
    {
      kind: "bank",
      prompt: "Comprime en participio: «Because he had not received a reply, he called again»",
      answer: "not having received a reply he called again",
      bank: ["not", "having", "received", "a", "reply", "he", "called", "again", "didn't", "because"],
      explain:
        "El negativo va DELANTE del participio: «not having received». Y desaparece el conector: la causa ya la marca la estructura.",
    },
  ],

  "c1-participle-2": [
    {
      kind: "choose",
      prompt: "¿Cuál es la versión nominalizada de «The government decided to intervene»?",
      options: [
        "The government's decision to intervene",
        "The government deciding to intervene",
        "That the government decided to intervene",
        "The government, which decided to intervene",
      ],
      answer: "The government's decision to intervene",
      explain:
        "Nominalizar = convertir el verbo en sustantivo (decide → decision) y colgar de él el resto. Es la marca del registro escrito formal.",
    },
    {
      kind: "choose",
      prompt: "«There has been a sharp decline ___ attendance.»",
      options: ["in", "of", "to", "on"],
      answer: "in",
      explain:
        "Los sustantivos de variación piden «in»: an increase/decline/rise/fall IN. «Of» iría con la cosa poseída, no con la magnitud.",
    },
    {
      kind: "type",
      prompt: "Sustantivo de «analyse»:",
      answer: ["analysis"],
      explain:
        "analyse → analysis (plural analyses). Otros irregulares del mismo grupo: succeed → success, lose → loss.",
    },
  ],

  "c1-participle-3": [
    {
      kind: "choose",
      prompt: "«The clause was removed, ___ simplifying the contract.»",
      options: ["thus", "so", "then", "therefore of"],
      answer: "thus",
      explain:
        "«Thus/thereby + -ing» encadena la consecuencia sin frase nueva. «So» exigiría sujeto y verbo detrás.",
    },
    {
      kind: "choose",
      prompt: "«The agreement is valid ___ it complies with local law.»",
      options: ["insofar as", "notwithstanding", "hence", "thereby"],
      answer: "insofar as",
      explain:
        "«Insofar as» = en la medida en que: limita el alcance. «Notwithstanding» sería concesión y «hence» consecuencia.",
    },
    {
      kind: "bank",
      prompt: "Traduce (formal): «No obstante las objeciones, la propuesta salió adelante»",
      answer: "notwithstanding the objections the proposal went ahead",
      bank: ["notwithstanding", "the", "objections", "the", "proposal", "went", "ahead", "although", "despite"],
      explain:
        "«Notwithstanding» se comporta como «despite»: va con sustantivo, no con frase. Es la variante jurídico-administrativa.",
    },
  ],

  /* ---------------- Hablar con imágenes ---------------- */

  "c1-idioms-1": [
    {
      kind: "choose",
      prompt: "«I'm afraid we'll have to ___: it's nearly midnight.»",
      options: ["call it a night", "call the night", "make it a night", "take a night"],
      answer: "call it a night",
      explain:
        "«Call it a day» de día, «call it a night» de noche. La expresión es fija: cambiar el verbo la rompe.",
      speak: "I'm afraid we'll have to call it a night.",
    },
    {
      kind: "choose",
      prompt: "¿Qué significa «It's a piece of cake»?",
      options: ["Es facilísimo", "Es un trozo de tarta", "Es un asunto delicado", "Es caro"],
      answer: "Es facilísimo",
      optionsLang: "es",
      explain:
        "«A piece of cake» = tirado, muy fácil. Es hermana de «it's not rocket science», pero ésta afirma en positivo.",
    },
    {
      kind: "type",
      prompt: "Completa: «Learning the system took a while, but I got the ___ of it»",
      answer: ["hang"],
      explain: "«Get the hang of something» = cogerle el truco. Siempre con «the» y con «of» delante del objeto.",
    },
  ],

  "c1-idioms-2": [
    {
      kind: "choose",
      prompt: "«Let's ___ before we commit to a figure.» (revisar los números)",
      options: ["crunch the numbers", "break the numbers", "cut the numbers", "hit the numbers"],
      answer: "crunch the numbers",
      explain:
        "«Crunch the numbers» = hacer los cálculos a fondo. Muy común en reuniones antes de dar un precio.",
      speak: "Let's crunch the numbers before we commit to a figure.",
    },
    {
      kind: "choose",
      prompt: "¿Qué significa «That's out of scope»?",
      options: [
        "Queda fuera de lo acordado",
        "Está mal calculado",
        "Es urgente",
        "Está fuera de plazo",
      ],
      answer: "Queda fuera de lo acordado",
      optionsLang: "es",
      explain:
        "«Out of scope» = fuera del alcance del proyecto. Es la forma profesional de decir «eso no entraba» sin discutir.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Pongámonos al día el lunes por la mañana»",
      answer: "let us touch base on Monday morning",
      bank: ["let", "us", "touch", "base", "on", "Monday", "morning", "in", "bases"],
      explain:
        "«Touch base» va siempre en singular y sin artículo. Y las partes del día llevan «on» cuando van con un día concreto.",
    },
  ],

  "c1-idioms-3": [
    {
      kind: "choose",
      prompt: "«We're ___ with this deadline.» (llegamos muy justos)",
      options: ["cutting it fine", "cutting it thin", "cutting corners", "cutting it short"],
      answer: "cutting it fine",
      explain:
        "«Cut it fine» = ir con el tiempo justo. Ojo: «cut corners» es otra cosa, ahorrar saltándose pasos.",
      speak: "We're cutting it fine with this deadline.",
    },
    {
      kind: "choose",
      prompt: "¿Qué significa «to throw someone under the bus»?",
      options: [
        "Echarle la culpa para salvarse uno",
        "Despedir a alguien",
        "Darle una oportunidad",
        "Ascender a alguien",
      ],
      answer: "Echarle la culpa para salvarse uno",
      optionsLang: "es",
      explain:
        "Es lo contrario de «take the blame»: sacrificar a un compañero para protegerse. Muy usada en contexto de oficina.",
    },
    {
      kind: "type",
      prompt: "Completa: «After the audit, we were back to ___ one»",
      answer: ["square"],
      explain:
        "«Back to square one» = vuelta a la casilla de salida. Viene de los juegos de tablero, no del ajedrez.",
    },
  ],

  /* ---------------- Escribir con criterio ---------------- */

  "c1-academic-1": [
    {
      kind: "choose",
      prompt: "¿Cuál evita afirmar más de lo que muestran los datos?",
      options: [
        "The results suggest a possible link",
        "The results prove there is a link",
        "The results show the link definitively",
        "The results confirm the truth",
      ],
      answer: "The results suggest a possible link",
      explain:
        "En registro académico casi nada se «prueba»: se sugiere, se indica, se apunta. Afirmar de más resta credibilidad.",
    },
    {
      kind: "choose",
      prompt: "«___ Smith (2021), the effect disappears after a year.»",
      options: ["According to", "According with", "Accord to", "As according"],
      answer: "According to",
      explain:
        "Siempre «according to», nunca «according with». Y no se usa para uno mismo: «according to me» no existe.",
    },
    {
      kind: "type",
      prompt: "Completa: «This phenomenon ___ been documented since the 1970s» (una palabra)",
      answer: ["has"],
      explain:
        "«Phenomenon» es singular (plural: phenomena), así que concuerda con «has». Confundir el plural griego es un fallo típico.",
    },
  ],

  "c1-academic-2": [
    {
      kind: "choose",
      prompt: "«The sample was small; ___, the conclusions must be treated with caution.»",
      options: ["accordingly", "although", "despite", "whereas"],
      answer: "accordingly",
      explain:
        "«Accordingly» = en consecuencia, y encaja tras punto y coma. Los otros tres introducen contraste, que aquí no hay.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es el matiz de «arguably the best solution»?",
      options: [
        "Se puede defender que lo es",
        "Es sin duda la mejor",
        "Es discutible que sirva",
        "Nadie lo discute",
      ],
      answer: "Se puede defender que lo es",
      optionsLang: "es",
      explain:
        "«Arguably» no significa «discutiblemente»: afirma con reserva, invitando al lector a aceptar el argumento.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Estos resultados deben interpretarse con cautela»",
      answer: "these findings should be interpreted with caution",
      bank: ["these", "findings", "should", "be", "interpreted", "with", "caution", "must", "carefully"],
      explain:
        "Pasiva impersonal + «should»: la norma del texto académico es quitar al autor de en medio sin sonar tajante.",
    },
  ],

  "c1-academic-3": [
    {
      kind: "choose",
      prompt: "«___, the evidence points in one direction.» (en conjunto, sopesándolo todo)",
      options: ["On balance", "In balance", "By balance", "At balance"],
      answer: "On balance",
      explain: "Preposición fija: ON balance. Igual que on average, on the whole, on the contrary.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál NO sirve para cerrar un texto formal?",
      options: ["In a nutshell", "In conclusion", "To sum up", "Taken together"],
      answer: "In a nutshell",
      explain:
        "«In a nutshell» es idiomático y conversacional. En un informe se prefiere «in conclusion» o «taken together».",
    },
    {
      kind: "type",
      prompt: "Conector formal para «asimismo» (una palabra, 8 letras)",
      answer: ["likewise", "Likewise"],
      explain:
        "«Likewise» añade un caso paralelo. «Similarly» vale igual; «also» baja el registro y no puede abrir párrafo tan bien.",
    },
  ],

  /* ---------------- La palabra exacta ---------------- */

  "c1-precision-1": [
    {
      kind: "choose",
      prompt: "«She ___ that the figures had been altered.» (lo sostiene con argumentos)",
      options: ["argued", "told", "said to", "spoke"],
      answer: "argued",
      explain:
        "argue = defender una postura razonada. «Tell» exige persona (told us) y «say» no lleva objeto de persona sin «to».",
      speak: "She argued that the figures had been altered.",
    },
    {
      kind: "choose",
      prompt: "¿Qué verbo elige quien NO se cree lo que reporta?",
      options: ["alleged", "explained", "confirmed", "demonstrated"],
      answer: "alleged",
      explain:
        "«Allege/claim» marcan distancia: se dice, pero sin respaldo. «Confirm» o «demonstrate» comprometen al que escribe.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Negó haber recibido el correo»",
      answer: "he denied receiving the email",
      bank: ["he", "denied", "receiving", "the", "email", "to", "receive", "refused"],
      explain:
        "«Deny» pide -ing (denied receiving), nunca infinitivo. Y no es «refuse»: negar un hecho ≠ negarse a hacer algo.",
    },
  ],

  "c1-precision-2": [
    {
      kind: "choose",
      prompt: "«The measures had little ___ on unemployment.»",
      options: ["effect", "affect", "affection", "effective"],
      answer: "effect",
      explain:
        "Regla práctica: affect es el VERBO, effect el SUSTANTIVO. Tras «little» hace falta un sustantivo.",
    },
    {
      kind: "choose",
      prompt: "«Wearing a helmet is the ___ thing to do.» (lo prudente)",
      options: ["sensible", "sensitive", "sensational", "sensory"],
      answer: "sensible",
      explain:
        "Falso amigo doble: sensible = sensato; sensitive = sensible (que se afecta). El español los tiene cruzados.",
    },
    {
      kind: "type",
      prompt: "Elige el verbo: «Please ___ that the door is locked» (garantizar, 6 letras)",
      answer: ["ensure"],
      explain:
        "ensure = garantizar un hecho · assure = tranquilizar a una persona · insure = asegurar con una póliza.",
    },
  ],

  "c1-precision-3": [
    {
      kind: "choose",
      prompt: "«The report ___ serious concerns about safety.»",
      options: ["raises", "rises", "lifts", "grows"],
      answer: "raises",
      explain:
        "raise = subir algo (transitivo) · rise = subir por sí solo (intransitivo). Las preocupaciones las levanta el informe.",
      speak: "The report raises serious concerns about safety.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es la colocación natural para un error grave?",
      options: ["a serious mistake", "a strong mistake", "a hard mistake", "a heavy mistake"],
      answer: "a serious mistake",
      explain:
        "La intensidad tiene socio fijo: serious mistake, heavy rain, strong accent, deep concern. No se intercambian.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Sufrió una derrota aplastante»",
      answer: "they suffered a crushing defeat",
      bank: ["they", "suffered", "a", "crushing", "defeat", "big", "had", "strong"],
      explain:
        "«Crushing defeat» y «suffer a defeat» son las dos colocaciones esperadas. «Have a big defeat» se entiende, pero delata al no nativo.",
    },
  ],
};
