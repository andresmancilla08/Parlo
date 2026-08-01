import type { ExtraMap } from "./index";

// Ejercicios adicionales de C2: tres por lección, para llegar a 8.
// En C2 el error ya casi nunca es gramatical: es de registro, de foco o de
// implicatura. Por eso muchos de estos ejercicios ofrecen cuatro opciones
// posibles y piden la que de verdad usaría un nativo en esa situación.
export const c2Extra: ExtraMap = {
  /* ---------------- Economía y precisión ---------------- */

  "c2-precision-1": [
    {
      kind: "choose",
      prompt: "«Who wants coffee?» — «I ___.» (yo sí)",
      options: ["do", "want", "am", "yes"],
      answer: "do",
      explain:
        "La respuesta corta se apoya en el auxiliar que le tocaría al verbo. Con present simple ese auxiliar es «do».",
      speak: "I do.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál NO se puede elidir?",
      options: [
        "She has finished and he has finished",
        "She has finished and he has too",
        "She can go and he can too",
        "She will help and so will he",
      ],
      answer: "She has finished and he has finished",
      explain:
        "Repetir el verbo entero no es agramatical, es redundante: en inglés se espera la elipsis y no hacerla suena a traducción.",
    },
    {
      kind: "type",
      prompt: "Acorta «I would like to go, but I cannot go» quitando lo repetido (usa «can't»)",
      answer: [
        "I would like to go, but I can't",
        "I'd like to go, but I can't",
        "I would like to go but I can't",
        "I'd like to go but I can't",
      ],
      explain: "El segundo verbo se cae y queda el modal solo: «but I can't». Todo lo demás se recupera del contexto.",
    },
  ],

  "c2-precision-2": [
    {
      kind: "choose",
      prompt: "«Will they accept?» — «I don't ___ so.»",
      options: ["think", "hope", "believe not", "afraid"],
      answer: "think",
      explain:
        "«Think» prefiere negar el verbo principal: I don't think so. «Hope» y «afraid» niegan con «not»: I hope not.",
      speak: "I don't think so.",
    },
    {
      kind: "choose",
      prompt: "«I need scissors.» — «There are some in the drawer. Take the small ___.»",
      options: ["ones", "one", "some", "it"],
      answer: "ones",
      explain: "«Scissors» es plural, así que la sustitución también: the small ONES. «One» sólo vale para singulares contables.",
    },
    {
      kind: "bank",
      prompt: "Traduce (formal): «Si aún no lo ha hecho, hágalo antes del viernes»",
      answer: "if you have not done so please do it before Friday",
      bank: ["if", "you", "have", "not", "done", "so", "please", "do", "it", "before", "Friday", "make"],
      explain:
        "«Done so» sustituye a la acción anterior sin repetirla; el «do it» final ya puede ser normal porque es una orden nueva.",
    },
  ],

  "c2-precision-3": [
    {
      kind: "choose",
      prompt: "«Attendance ___ slightly last term.» (subió muy poco)",
      options: ["edged up", "soared", "plummeted", "exploded"],
      answer: "edged up",
      explain:
        "Cada verbo trae su intensidad: edge up (poquito), rise (normal), soar (mucho), plummet (desplome). El adverbio no la arregla.",
      speak: "Attendance edged up slightly last term.",
    },
    {
      kind: "choose",
      prompt: "Versión precisa de «make the rules less strict»:",
      options: ["relax the rules", "unstrict the rules", "lower the rules", "soften the laws down"],
      answer: "relax the rules",
      explain: "«Relax the rules» es la colocación fija. Tighten sería lo contrario: apretarlas.",
    },
    {
      kind: "type",
      prompt: "Un verbo para «reducir gradualmente» (dos palabras, empieza por «phase»)",
      answer: ["phase out"],
      explain:
        "«Phase out» = retirar por fases; «phase in» es lo contrario. Muy usado con productos, subsidios y tecnologías.",
    },
  ],

  /* ---------------- Foco y orden de la información ---------------- */

  "c2-focus-1": [
    {
      kind: "choose",
      prompt: "«___ we did was call a lawyer.»",
      options: ["The first thing", "First thing what", "The first that", "First what"],
      answer: "The first thing",
      explain:
        "Variante de hendida con sustantivo: «the thing / the first thing / the only thing + that we did + was…». Nunca con «what» detrás.",
      speak: "The first thing we did was call a lawyer.",
    },
    {
      kind: "choose",
      prompt: "«It wasn't until 2020 ___ they finally agreed.»",
      options: ["that", "when", "which", "than"],
      answer: "that",
      explain:
        "En las hendidas el conector es «that», también con tiempo. «When» iría en una frase normal: in 2020, when they agreed…",
    },
    {
      kind: "bank",
      prompt: "Enfatiza el motivo: «Me fui porque estaba cansado»",
      answer: "the reason I left was that I was tired",
      bank: ["the", "reason", "I", "left", "was", "that", "I", "was", "tired", "because", "why"],
      explain:
        "Tras «the reason … was» va «that», no «because»: el porqué ya lo dice «reason» y repetirlo es el error clásico.",
    },
  ],

  "c2-focus-2": [
    {
      kind: "choose",
      prompt: "¿Cuál es correcta con un pronombre?",
      options: ["Off he went", "Off went he", "Off did he go", "He off went"],
      answer: "Off he went",
      explain:
        "Con pronombre NO se invierte: off he went, up she jumped. La inversión sólo entra si el sujeto es un sustantivo.",
      speak: "Off he went.",
    },
    {
      kind: "choose",
      prompt: "«So exhausted ___ that she slept for ten hours.»",
      options: ["was she", "she was", "did she", "was her"],
      answer: "was she",
      explain:
        "Adelantar «so + adjetivo» obliga a invertir: so exhausted WAS SHE. Con «such» sería un sustantivo detrás.",
    },
    {
      kind: "type",
      prompt: "Completa: «Little ___ they know that the deal was already signed» (una palabra)",
      answer: ["did"],
      explain:
        "«Little did they know» es fórmula fija de narración: adelanta el negativo, invierte con «did» y anuncia una sorpresa.",
    },
  ],

  "c2-focus-3": [
    {
      kind: "choose",
      prompt: "¿Cuál respeta el peso al final?",
      options: [
        "I gave the manager the report I had spent all week on",
        "I gave the report I had spent all week on the manager",
        "The manager I gave the report all week on",
        "I gave to the manager it",
      ],
      answer: "I gave the manager the report I had spent all week on",
      explain:
        "Con dos objetos, el corto va primero y el largo al final. Si el largo se cuela en medio, la frase se lee dos veces.",
    },
    {
      kind: "choose",
      prompt: "«___ appears to be a misunderstanding.»",
      options: ["There", "It", "That", "This"],
      answer: "There",
      explain:
        "«There appears/seems to be + sustantivo» introduce algo que existe. «It appears that…» necesita una frase completa detrás.",
      speak: "There appears to be a misunderstanding.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Conviene señalar que las cifras son provisionales»",
      answer: "it is worth noting that the figures are provisional",
      bank: ["it", "is", "worth", "noting", "that", "the", "figures", "are", "provisional", "to", "note"],
      explain: "«Worth» pide -ing, nunca infinitivo: worth NOTING. Igual que «worth doing», «worth trying».",
    },
  ],

  /* ---------------- Registro extremo ---------------- */

  "c2-register-1": [
    {
      kind: "choose",
      prompt: "«The parties agree to the terms ___ below.»",
      options: ["set out", "set up", "set off", "set in"],
      answer: "set out",
      explain:
        "«Set out» = expuesto por escrito, en registro legal. Set up es montar, set off arrancar y set in instalarse (mal tiempo).",
    },
    {
      kind: "choose",
      prompt: "Traducción administrativa de «si no paga a tiempo»:",
      options: [
        "Failure to pay on time",
        "If not pay in the time",
        "The no payment on time",
        "Not paying in time is",
      ],
      answer: "Failure to pay on time",
      explain:
        "El registro administrativo nominaliza: «failure to + infinitivo» convierte una condición entera en un sujeto.",
    },
    {
      kind: "type",
      prompt: "Palabra formal para «el abajo firmante» (dos palabras, empieza por «the under»)",
      answer: ["the undersigned", "undersigned"],
      explain:
        "«The undersigned» funciona como sustantivo y puede ser singular o plural: the undersigned hereby declare(s).",
    },
  ],

  "c2-register-2": [
    {
      kind: "choose",
      prompt: "«Minister quits over expenses row.» ¿Cuándo pasó?",
      options: [
        "Acaba de pasar",
        "Pasará mañana",
        "Pasa todos los meses",
        "Pasó hace años",
      ],
      answer: "Acaba de pasar",
      optionsLang: "es",
      explain:
        "El presente simple en titulares es pasado reciente: da inmediatismo. El futuro se marca con «to + infinitivo».",
    },
    {
      kind: "choose",
      prompt: "«Bid to save hospital fails». ¿Qué es «bid» aquí?",
      options: ["Un intento", "Una puja de dinero", "Una orden", "Una encuesta"],
      answer: "Un intento",
      optionsLang: "es",
      explain:
        "En titulares «bid» es intento (a bid to do something). Fuera del titular sí suele ser una puja o una oferta.",
    },
    {
      kind: "bank",
      prompt: "Convierte en titular: «The police have arrested two men»",
      answer: "two men held by police",
      bank: ["two", "men", "held", "by", "police", "the", "have", "arrested"],
      explain:
        "Sin artículos, sin auxiliar y con la palabra corta: «held» en vez de «arrested». El agente sólo se pone si aporta.",
    },
  ],

  "c2-register-3": [
    {
      kind: "choose",
      prompt: "¿Qué significa «I could murder a coffee»?",
      options: [
        "Me tomaría un café ahora mismo",
        "Odio el café",
        "El café estaba malísimo",
        "Voy a preparar café",
      ],
      answer: "Me tomaría un café ahora mismo",
      optionsLang: "es",
      explain:
        "Hipérbole coloquial británica: «I could murder a…» = me muero por. Nada que ver con el sentido literal.",
    },
    {
      kind: "choose",
      prompt: "«You alright?» como saludo espera:",
      options: [
        "Un «yeah, you?» sin más",
        "Que cuentes cómo estás de verdad",
        "Una disculpa",
        "Un sí o un no",
      ],
      answer: "Un «yeah, you?» sin más",
      optionsLang: "es",
      explain:
        "En el Reino Unido «you alright?» es «hola», no una pregunta por tu salud. Contestar en serio descoloca a todo el mundo.",
    },
    {
      kind: "type",
      prompt: "Escribe cómo suena «want to» en habla rápida (5 letras)",
      answer: ["wanna"],
      explain:
        "wanna (want to), gonna (going to), gotta (got to). Sólo se escriben para reflejar el habla, nunca en registro formal.",
    },
  ],

  /* ---------------- Lenguaje figurado ---------------- */

  "c2-figurative-1": [
    {
      kind: "choose",
      prompt: "«We're running ___ of time.» (metáfora del tiempo como recurso)",
      options: ["out", "off", "away", "down"],
      answer: "out",
      explain:
        "«Run out of» = agotarse, igual que con la gasolina. El tiempo se gasta, se ahorra y se acaba: se habla como una sustancia.",
      speak: "We're running out of time.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál sigue la metáfora «más es arriba»?",
      options: [
        "Unemployment has risen sharply",
        "Unemployment has grown wide",
        "Unemployment has gone long",
        "Unemployment has walked up",
      ],
      answer: "Unemployment has risen sharply",
      explain:
        "Cantidad y arriba van juntos: rise, soar, peak, fall, bottom out. Por eso «high prices» y no «big prices».",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Ese argumento no se sostiene»",
      answer: "that argument does not hold up",
      bank: ["that", "argument", "does", "not", "hold", "up", "sustain", "itself"],
      explain:
        "Las ideas son estructuras: hold up, collapse, support, shaky. «Sustain itself» es traducción literal y no se dice.",
    },
  ],

  "c2-figurative-2": [
    {
      kind: "choose",
      prompt: "«It's not rocket science, but don't ___ either.» (no lo subestimes)",
      options: ["underestimate it", "under it estimate", "estimate it under", "make it small"],
      answer: "underestimate it",
      explain:
        "Los modismos conviven con verbos normales: lo idiomático es la primera parte, no toda la frase.",
    },
    {
      kind: "choose",
      prompt: "«They were caught red-handed» significa:",
      options: [
        "Los pillaron con las manos en la masa",
        "Se pusieron nerviosos",
        "Se disculparon a tiempo",
        "Los ascendieron",
      ],
      answer: "Los pillaron con las manos en la masa",
      optionsLang: "es",
      explain:
        "Imagen de las manos manchadas de sangre. Es un modismo opaco: la traducción palabra por palabra no lleva a ningún sitio.",
    },
    {
      kind: "type",
      prompt: "Completa: «Let's not beat about the ___» (dejarse de rodeos, 4 letras)",
      answer: ["bush"],
      explain:
        "«Beat about the bush» (UK) o «beat around the bush» (US) = irse por las ramas. Se usa casi siempre en negativo.",
    },
  ],

  "c2-figurative-3": [
    {
      kind: "choose",
      prompt: "«The company is undergoing a restructuring» probablemente significa:",
      options: [
        "Va a haber despidos",
        "Van a contratar",
        "Cambian de oficina",
        "Suben los sueldos",
      ],
      answer: "Va a haber despidos",
      optionsLang: "es",
      explain:
        "El eufemismo corporativo tapa la mala noticia con una palabra de proceso. Igual que «rightsizing» o «streamlining».",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es el eufemismo para «poor»?",
      options: ["low-income", "low-cost", "cheap", "small-money"],
      answer: "low-income",
      explain:
        "«Low-income» describe sin etiquetar a la persona. «Cheap» califica cosas (o a alguien tacaño), no situaciones económicas.",
    },
    {
      kind: "bank",
      prompt: "Suaviza la noticia: «Vamos a reducir plantilla»",
      answer: "we are going to reduce our headcount",
      bank: ["we", "are", "going", "to", "reduce", "our", "headcount", "fire", "people"],
      explain:
        "«Headcount» convierte a las personas en una cifra: por eso funciona como eufemismo y por eso conviene reconocerlo.",
    },
  ],

  /* ---------------- Lo que no se dice ---------------- */

  "c2-implicature-1": [
    {
      kind: "choose",
      prompt: "«The food was ___ good.» (te pareció excelente, dicho con contención)",
      options: ["rather", "very very", "so much", "too"],
      answer: "rather",
      explain:
        "«Rather good» suena a elogio contenido y, en contexto británico, alto. «Too good» significaría demasiado, que es negativo.",
      speak: "The food was rather good.",
    },
    {
      kind: "choose",
      prompt: "Un cirujano dice «there may be some discomfort». Espera:",
      options: ["Dolor", "Nada", "Un ruido", "Una espera larga"],
      answer: "Dolor",
      optionsLang: "es",
      explain:
        "«Discomfort» es el understatement médico de «pain». Reconocerlo es entender lo que de verdad te están diciendo.",
    },
    {
      kind: "type",
      prompt: "Completa el elogio contenido: «That's not ___» (nada mal, 3 letras)",
      answer: ["bad"],
      explain:
        "«Not bad» va de «aceptable» a «buenísimo» según la entonación. Es la frase más ambigua y más usada del inglés británico.",
    },
  ],

  "c2-implicature-2": [
    {
      kind: "choose",
      prompt: "Tras un desastre total, «well, that could have gone better» es:",
      options: [
        "Ironía y understatement a la vez",
        "Un elogio",
        "Una pregunta",
        "Una disculpa formal",
      ],
      answer: "Ironía y understatement a la vez",
      optionsLang: "es",
      explain:
        "Rebaja la catástrofe («could have gone better») y a la vez señala lo evidente. Las dos figuras suelen ir juntas.",
    },
    {
      kind: "choose",
      prompt: "«Thanks a lot», dicho tras un empujón, se entiende como:",
      options: [
        "Un reproche",
        "Un agradecimiento sincero",
        "Una despedida",
        "Una pregunta",
      ],
      answer: "Un reproche",
      optionsLang: "es",
      explain:
        "La ironía no cambia las palabras: la marca el contexto y la entonación descendente. Por eso cuesta pillarla en un idioma nuevo.",
    },
    {
      kind: "bank",
      prompt: "Responde con ironía a una idea malísima: «Brillante, sin más»",
      answer: "brilliant simply brilliant",
      bank: ["brilliant", "simply", "brilliant", "very", "good"],
      explain:
        "Repetir el elogio subiéndolo de tono es una fórmula irónica hecha: cuanto más grande el elogio, más clara la burla.",
    },
  ],

  "c2-implicature-3": [
    {
      kind: "choose",
      prompt: "«I hear what you're saying, but…» prepara:",
      options: [
        "Un rechazo",
        "Un acuerdo total",
        "Una pregunta",
        "Un cambio de tema",
      ],
      answer: "Un rechazo",
      optionsLang: "es",
      explain:
        "Reconoce que te ha oído (no que te da la razón) y el «but» trae lo que importa. Hermana de «with all due respect».",
    },
    {
      kind: "choose",
      prompt: "¿Cuál deja MENOS margen de esperanza?",
      options: [
        "I'm afraid that won't be possible",
        "I'll see what I can do",
        "Let me look into it",
        "Let's park that for now",
      ],
      answer: "I'm afraid that won't be possible",
      explain:
        "Es un no educado pero cerrado. Las otras tres aplazan; ésta usa «afraid» + «won't» y no deja puerta abierta.",
    },
    {
      kind: "type",
      prompt: "Completa el aplazamiento de reunión: «Let's take this ___» (fuera de la reunión, 7 letras)",
      answer: ["offline"],
      explain:
        "«Take it offline» = hablarlo aparte, aunque sea por videollamada. Sirve para cortar un debate sin negarlo.",
    },
  ],

  /* ---------------- Variedades y cambio ---------------- */

  "c2-variety-1": [
    {
      kind: "choose",
      prompt: "«I'll call you Monday through Friday» es:",
      options: [
        "Americano; en británico sería «Monday to Friday»",
        "Británico; en americano sería «Monday until Friday»",
        "Incorrecto en los dos",
        "Sólo formal",
      ],
      answer: "Americano; en británico sería «Monday to Friday»",
      optionsLang: "es",
      explain:
        "«Through» incluye el último día sin ambigüedad y es americano. El británico dice «to» y añade «inclusive» si hace falta.",
    },
    {
      kind: "choose",
      prompt: "En el Reino Unido, «the team ___ playing well» admite:",
      options: ["are", "be", "am", "were being"],
      answer: "are",
      explain:
        "Los colectivos (team, government, band) van en plural en británico y en singular en americano: the team IS (US).",
    },
    {
      kind: "type",
      prompt: "Palabra americana para «lorry» (5 letras)",
      answer: ["truck"],
      explain:
        "lorry (UK) = truck (US). Con vehículos hay muchos pares: boot/trunk, windscreen/windshield, motorway/highway.",
    },
  ],

  "c2-variety-2": [
    {
      kind: "choose",
      prompt: "«Let's touch base offline to align on the deliverables» dicho en cristiano:",
      options: [
        "Hablamos aparte para ponernos de acuerdo en lo que hay que entregar",
        "Nos vemos en la oficina para firmar",
        "Vamos a cancelar el proyecto",
        "Hay que apagar los ordenadores",
      ],
      answer: "Hablamos aparte para ponernos de acuerdo en lo que hay que entregar",
      optionsLang: "es",
      explain:
        "Tres expresiones de jerga en una frase. Entenderla es C2; escribir así en un correo a un cliente, no siempre buena idea.",
    },
    {
      kind: "choose",
      prompt: "«This is a quick win» describe algo que es:",
      options: [
        "Fácil y con resultado visible ya",
        "Barato pero lento",
        "Arriesgado",
        "Obligatorio por ley",
      ],
      answer: "Fácil y con resultado visible ya",
      optionsLang: "es",
      explain: "Pariente de «low-hanging fruit». Se usa para justificar por qué algo entra antes en la lista.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «No tengo capacidad para asumirlo esta semana»",
      answer: "I do not have the bandwidth to take this on this week",
      bank: ["I", "do", "not", "have", "the", "bandwidth", "to", "take", "this", "on", "this", "week", "capacity"],
      explain:
        "«Take something on» = asumirlo. Y «bandwidth» suena más natural que «capacity» hablando de una persona.",
    },
  ],

  "c2-variety-3": [
    {
      kind: "choose",
      prompt: "«Can you screenshot it and send it over?» El verbo «screenshot»:",
      options: [
        "Es un sustantivo usado como verbo, y es correcto hoy",
        "Es un error: hay que decir «take a screenshot»",
        "Sólo vale en americano",
        "Es formal",
      ],
      answer: "Es un sustantivo usado como verbo, y es correcto hoy",
      optionsLang: "es",
      explain:
        "El verbing normaliza rápido: screenshot, message, friend, inbox. Los diccionarios los recogen a los pocos años.",
    },
    {
      kind: "choose",
      prompt: "«Each student should bring ___ own laptop.» (neutro y estándar hoy)",
      options: ["their", "his", "its", "one's own his"],
      answer: "their",
      explain:
        "Con «each/every/someone» el posesivo neutro es «their», aunque el sujeto sea gramaticalmente singular. Es la norma actual.",
      speak: "Each student should bring their own laptop.",
    },
    {
      kind: "type",
      prompt: "Verbo nuevo para «guardarse el acceso a algo» (dos palabras juntas, empieza por «gate»)",
      answer: ["gatekeep", "to gatekeep"],
      explain:
        "De «gatekeeper» (portero) sale el verbo «gatekeep»: decidir quién entra en un grupo, una afición o una información.",
    },
  ],
};
