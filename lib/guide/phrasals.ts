import type { Phrasal } from "./types";

// Phrasal verbs ordenados por VERBO BASE, que es como se aprenden de verdad:
// get tiene doce y no se parecen en nada entre sí, así que memorizar «get up»
// suelto no sirve; verlos juntos, sí.
//
// `separable` es el dato práctico: si es separable, el pronombre va OBLIGATORIO
// en medio (turn it down, nunca «turn down it»). Si no lo es, nunca se parte
// (look after it, nunca «look it after»).
export const PHRASALS: Phrasal[] = [
  /* ---------------- get ---------------- */
  { verb: "get", particle: "up", es: "levantarse", example: "I get up at seven every day.", separable: false },
  { verb: "get", particle: "on with", es: "llevarse bien con", example: "I get on with my colleagues.", separable: false },
  { verb: "get", particle: "over", es: "superar (algo malo)", example: "It took her months to get over the news.", separable: false },
  { verb: "get", particle: "by", es: "ir tirando", example: "We get by on one salary.", separable: false },
  { verb: "get", particle: "away with", es: "salirse con la suya", example: "He always gets away with it.", separable: false },
  { verb: "get", particle: "rid of", es: "deshacerse de", example: "We should get rid of the old sofa.", separable: false },
  { verb: "get", particle: "back", es: "volver / recuperar", example: "I'll get back to you tomorrow.", separable: true },
  { verb: "get", particle: "through", es: "superar / contactar", example: "I couldn't get through to the office.", separable: false },

  /* ---------------- take ---------------- */
  { verb: "take", particle: "off", es: "despegar / quitarse (ropa)", example: "Take off your coat, it's warm.", separable: true },
  { verb: "take", particle: "up", es: "empezar (una afición)", example: "She took up running last year.", separable: true },
  { verb: "take", particle: "over", es: "hacerse cargo", example: "A new manager will take over in May.", separable: true },
  { verb: "take", particle: "after", es: "parecerse a (un familiar)", example: "He takes after his mother.", separable: false },
  { verb: "take", particle: "on", es: "asumir / contratar", example: "Don't take on more work than you can handle.", separable: true },
  { verb: "take", particle: "back", es: "retirar (lo dicho)", example: "I take back what I said.", separable: true },

  /* ---------------- put ---------------- */
  { verb: "put", particle: "off", es: "aplazar", example: "They put off the meeting until Monday.", separable: true },
  { verb: "put", particle: "up with", es: "aguantar", example: "I can't put up with this noise.", separable: false },
  { verb: "put", particle: "on", es: "ponerse (ropa) / encender", example: "Put on your shoes, we're leaving.", separable: true },
  { verb: "put", particle: "out", es: "apagar (un fuego)", example: "Firefighters put out the blaze in an hour.", separable: true },
  { verb: "put", particle: "away", es: "guardar", example: "Put away your things before dinner.", separable: true },
  { verb: "put", particle: "down", es: "dejar / apuntar", example: "Put down the box, it's heavy.", separable: true },

  /* ---------------- look ---------------- */
  { verb: "look", particle: "for", es: "buscar", example: "I'm looking for my keys.", separable: false },
  { verb: "look", particle: "after", es: "cuidar de", example: "Can you look after the dog this weekend?", separable: false },
  { verb: "look", particle: "up", es: "buscar (en un diccionario)", example: "Look up the word if you don't know it.", separable: true },
  { verb: "look", particle: "forward to", es: "tener ganas de", example: "I look forward to hearing from you.", separable: false },
  { verb: "look", particle: "into", es: "investigar", example: "We'll look into the problem today.", separable: false },
  { verb: "look", particle: "out", es: "tener cuidado", example: "Look out! There's a car coming.", separable: false },
  { verb: "look", particle: "down on", es: "menospreciar", example: "She never looks down on anyone.", separable: false },

  /* ---------------- turn ---------------- */
  { verb: "turn", particle: "on", es: "encender", example: "Turn on the light, please.", separable: true },
  { verb: "turn", particle: "off", es: "apagar", example: "Turn off your phone during the film.", separable: true },
  { verb: "turn", particle: "down", es: "rechazar / bajar el volumen", example: "She turned down the offer.", separable: true },
  { verb: "turn", particle: "up", es: "aparecer / subir el volumen", example: "He turned up two hours late.", separable: true },
  { verb: "turn", particle: "out", es: "resultar", example: "It turned out to be a good decision.", separable: false },
  { verb: "turn", particle: "into", es: "convertirse en", example: "The rain turned into snow.", separable: false },

  /* ---------------- go ---------------- */
  { verb: "go", particle: "on", es: "continuar / pasar", example: "What's going on here?", separable: false },
  { verb: "go", particle: "over", es: "repasar", example: "Let's go over the plan once more.", separable: false },
  { verb: "go", particle: "through", es: "pasar por (algo duro)", example: "She's going through a hard time.", separable: false },
  { verb: "go", particle: "off", es: "sonar (una alarma) / estropearse", example: "My alarm went off at six.", separable: false },
  { verb: "go", particle: "out", es: "salir (de casa)", example: "We go out every Friday.", separable: false },
  { verb: "go", particle: "back", es: "volver", example: "I'd like to go back to Lisbon.", separable: false },

  /* ---------------- come ---------------- */
  { verb: "come", particle: "across", es: "encontrarse por casualidad", example: "I came across an old photo.", separable: false },
  { verb: "come", particle: "up with", es: "ocurrírsele (una idea)", example: "She came up with a brilliant idea.", separable: false },
  { verb: "come", particle: "back", es: "volver", example: "Come back when you're ready.", separable: false },
  { verb: "come", particle: "up", es: "surgir", example: "Something came up and I had to leave.", separable: false },
  { verb: "come", particle: "over", es: "pasarse (por casa)", example: "Come over for dinner tonight.", separable: false },

  /* ---------------- give ---------------- */
  { verb: "give", particle: "up", es: "rendirse / dejar (un hábito)", example: "Don't give up now.", separable: true },
  { verb: "give", particle: "back", es: "devolver", example: "Give back the book when you finish.", separable: true },
  { verb: "give", particle: "away", es: "regalar / revelar", example: "He gave away the ending of the film.", separable: true },
  { verb: "give", particle: "in", es: "ceder", example: "After an hour, I gave in.", separable: false },

  /* ---------------- break ---------------- */
  { verb: "break", particle: "down", es: "averiarse / derrumbarse", example: "My car broke down on the motorway.", separable: false },
  { verb: "break", particle: "up", es: "romper (una pareja)", example: "They broke up last summer.", separable: false },
  { verb: "break", particle: "into", es: "entrar a robar", example: "Someone broke into the office.", separable: false },
  { verb: "break", particle: "out", es: "estallar (una guerra, un incendio)", example: "A fire broke out in the kitchen.", separable: false },

  /* ---------------- run ---------------- */
  { verb: "run", particle: "out of", es: "quedarse sin", example: "We ran out of milk.", separable: false },
  { verb: "run", particle: "into", es: "toparse con", example: "I ran into an old friend downtown.", separable: false },
  { verb: "run", particle: "over", es: "atropellar", example: "A van almost ran over the cyclist.", separable: true },
  { verb: "run", particle: "by", es: "consultar (a alguien)", example: "Let me run it by my manager.", separable: true },

  /* ---------------- call, set, work y compañía ---------------- */
  { verb: "call", particle: "off", es: "cancelar", example: "They called off the wedding.", separable: true },
  { verb: "call", particle: "back", es: "devolver la llamada", example: "I'll call you back in five minutes.", separable: true },
  { verb: "set", particle: "up", es: "montar / configurar", example: "We set up the new office in a week.", separable: true },
  { verb: "set", particle: "off", es: "ponerse en camino", example: "We set off at dawn.", separable: false },
  { verb: "work", particle: "out", es: "salir bien / hacer ejercicio / resolver", example: "It all worked out in the end.", separable: true },
  { verb: "figure", particle: "out", es: "descifrar", example: "I can't figure out how it works.", separable: true },
  { verb: "carry", particle: "on", es: "seguir adelante", example: "Carry on, I'm listening.", separable: false },
  { verb: "carry", particle: "out", es: "llevar a cabo", example: "They carried out a full inspection.", separable: true },
  { verb: "bring", particle: "up", es: "sacar (un tema) / criar", example: "Don't bring up politics at dinner.", separable: true },
  { verb: "bring", particle: "about", es: "provocar", example: "The law brought about real change.", separable: true },
  { verb: "check", particle: "in", es: "registrarse", example: "We check in at three o'clock.", separable: false },
  { verb: "check", particle: "out", es: "dejar el hotel / echar un vistazo", example: "Check out this article.", separable: true },
  { verb: "find", particle: "out", es: "enterarse de", example: "How did you find out?", separable: true },
  { verb: "point", particle: "out", es: "señalar (un hecho)", example: "She pointed out the mistake.", separable: true },
  { verb: "fill", particle: "in", es: "rellenar (un formulario)", example: "Fill in the form and sign it.", separable: true },
  { verb: "hand", particle: "in", es: "entregar", example: "Hand in your report by Friday.", separable: true },
  { verb: "hold", particle: "on", es: "esperar un momento", example: "Hold on, I'll check.", separable: false },
  { verb: "pick", particle: "up", es: "recoger", example: "I'll pick you up at eight.", separable: true },
  { verb: "drop", particle: "off", es: "dejar (a alguien en un sitio)", example: "Can you drop me off at the station?", separable: true },
  { verb: "cut", particle: "down on", es: "reducir el consumo de", example: "I'm cutting down on sugar.", separable: false },
  { verb: "keep", particle: "up with", es: "seguir el ritmo de", example: "I can't keep up with the news.", separable: false },
  { verb: "make", particle: "up", es: "inventarse / reconciliarse", example: "He made up an excuse.", separable: true },
  { verb: "sort", particle: "out", es: "solucionar", example: "We'll sort out the details later.", separable: true },
  { verb: "show", particle: "up", es: "presentarse", example: "Nobody showed up to the meeting.", separable: false },
  { verb: "grow", particle: "up", es: "crecer (hacerse mayor)", example: "I grew up in a small town.", separable: false },
  { verb: "end", particle: "up", es: "acabar (de una manera)", example: "We ended up staying at home.", separable: false },
  { verb: "back", particle: "up", es: "respaldar / hacer copia", example: "Back up your files every week.", separable: true },
  { verb: "sign", particle: "up", es: "apuntarse", example: "I signed up for the course.", separable: false },
  { verb: "log", particle: "in", es: "iniciar sesión", example: "Log in with your email.", separable: false },
];

/** Todas las partículas presentes, para poder filtrar. */
export const PARTICLES: string[] = [...new Set(PHRASALS.map((p) => p.particle))].sort();

/** Todos los verbos base presentes, en el orden en que aparecen. */
export const PHRASAL_VERBS: string[] = [...new Set(PHRASALS.map((p) => p.verb))];
