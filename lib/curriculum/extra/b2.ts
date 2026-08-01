import type { ExtraMap } from "./index";

// Ejercicios adicionales de B2: tres por lección, para pasar de 5 a 8.
// En B2 el hueco no es de vocabulario, es de MATIZ: el mismo relativo con y
// sin coma, el condicional que mezcla tiempos, el phrasal que cambia de
// sentido al separarlo. Por eso los extra piden elegir entre dos formas
// correctas en gramática pero distintas en significado.
export const b2Extra: ExtraMap = {
  /* ---------------- Oraciones de relativo ---------------- */

  "b2-relatives-1": [
    {
      kind: "choose",
      prompt: "«The keys ___ were on the table have disappeared.»",
      options: ["that", "who", "whose", "what"],
      answer: "that",
      explain:
        "Para cosas: that o which. «What» NUNCA es relativo en inglés (ese es el calco del «que» español): «the keys what» está mal.",
      speak: "The keys that were on the table have disappeared.",
    },
    {
      kind: "choose",
      prompt: "¿En cuál NO se puede quitar el relativo?",
      options: [
        "The woman who lives upstairs",
        "The book that I read",
        "The film we watched",
        "The email she sent",
      ],
      answer: "The woman who lives upstairs",
      explain:
        "El relativo sólo se puede omitir cuando es OBJETO (the book [that] I read). Si es sujeto del verbo que sigue, se queda: who lives upstairs.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Este es el hospital donde nació mi hija»",
      answer: "this is the hospital where my daughter was born",
      bank: ["this", "is", "the", "hospital", "where", "my", "daughter", "was", "born", "which", "in"],
      explain:
        "Lugar → «where» (equivale a «in which»). Y «nacer» es pasivo en inglés: was born, nunca «borned».",
    },
  ],

  "b2-relatives-2": [
    {
      kind: "choose",
      prompt: "«My colleague ___ speaks Japanese is on holiday.» (tengo varios colegas)",
      options: ["who", ", who", "whose", ", which"],
      answer: "who",
      explain:
        "Sin comas = especificativa: distingue a ESE colega de los demás. Con comas serían todos mis colegas, y sólo tengo uno.",
      speak: "My colleague who speaks Japanese is on holiday.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es correcta con coma delante?",
      options: [
        "The report, which took weeks, is ready",
        "The report, that took weeks, is ready",
        "The report, what took weeks, is ready",
        "The report, who took weeks, is ready",
      ],
      answer: "The report, which took weeks, is ready",
      explain:
        "Regla dura: después de coma NUNCA va «that». En explicativas sólo which (cosas) o who (personas).",
    },
    {
      kind: "type",
      prompt: "Une con «whose»: «I met a writer. His novels sell millions.»",
      answer: [
        "I met a writer whose novels sell millions",
        "I met a writer whose novels sell millions.",
      ],
      explain:
        "«Whose» sustituye al posesivo (his/her/its) y va pegado al sustantivo, sin artículo detrás: whose novels, no «whose the novels».",
    },
  ],

  "b2-relatives-3": [
    {
      kind: "choose",
      prompt: "¿Cuál es el registro FORMAL (escrito)?",
      options: [
        "The colleague with whom I work",
        "The colleague who I work with",
        "The colleague I work with",
        "The colleague that I work with",
      ],
      answer: "The colleague with whom I work",
      explain:
        "En formal la preposición se adelanta y arrastra «whom». En conversación se deja al final y se quita el relativo: the colleague I work with.",
    },
    {
      kind: "choose",
      prompt: "«She passed the exam, ___ surprised nobody.»",
      options: ["which", "that", "what", "it"],
      answer: "which",
      explain:
        "Cuando el relativo se refiere a TODA la frase anterior sólo vale «which», y siempre con coma. «That» no puede hacerlo.",
      speak: "She passed the exam, which surprised nobody.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Vinieron veinte personas, la mayoría de las cuales eran estudiantes»",
      answer: "twenty people came most of whom were students",
      bank: ["twenty", "people", "came", "most", "of", "whom", "were", "students", "which", "them"],
      explain:
        "Con cuantificador + of se usa whom para personas (most of whom) y which para cosas (all of which). «Of them» rompería la frase en dos.",
    },
  ],

  /* ---------------- Deseos y situaciones irreales ---------------- */

  "b2-unreal-1": [
    {
      kind: "choose",
      prompt: "«I wish I ___ speak Chinese.» (no sé, y me gustaría)",
      options: ["could", "can", "would", "will"],
      answer: "could",
      explain:
        "Para una capacidad que no tienes: wish + could. «Would» se reserva para lo que hace OTRA persona y te molesta.",
      speak: "I wish I could speak Chinese.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es imposible en inglés?",
      options: [
        "I wish I would be taller",
        "I wish I were taller",
        "I wish I could be taller",
        "If only I were taller",
      ],
      answer: "I wish I would be taller",
      explain:
        "«Wish + would» no se usa con uno mismo: no puedes quejarte de tu propio comportamiento en futuro. Para estados va «were».",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Ojalá no le hubiera dicho nada»",
      answer: "I wish I had not said anything to him",
      bank: ["I", "wish", "I", "had", "not", "said", "anything", "to", "him", "nothing"],
      explain:
        "Arrepentimiento del pasado → wish + past perfect (had said). Y doble negación prohibida: not… ANYTHING, nunca «not nothing».",
    },
  ],

  "b2-unreal-2": [
    {
      kind: "choose",
      prompt: "«I'd rather ___ than fly.» (prefiero el tren)",
      options: ["take the train", "to take the train", "taking the train", "took the train"],
      answer: "take the train",
      explain:
        "«Would rather» pide infinitivo SIN to cuando el sujeto es el mismo: I'd rather take. Con otro sujeto cambia a pasado: I'd rather you took.",
      speak: "I'd rather take the train than fly.",
    },
    {
      kind: "choose",
      prompt: "«It's about time you ___ a proper job.»",
      options: ["got", "get", "will get", "getting"],
      answer: "got",
      explain:
        "«It's time / it's about time + pasado» aunque hablemos del presente: es un pasado irreal, con reproche incluido.",
      speak: "It's about time you got a proper job.",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «Preferiría que no fumaras aquí» (empieza por «I'd rather you»)",
      answer: [
        "I'd rather you didn't smoke here",
        "I would rather you didn't smoke here",
        "I'd rather you did not smoke here",
        "I would rather you did not smoke here",
      ],
      explain:
        "Sujeto distinto → verbo en pasado: I'd rather you DIDN'T smoke. Es la forma educada de pedir que alguien pare.",
    },
  ],

  "b2-unreal-3": [
    {
      kind: "choose",
      prompt: "«If I ___ so much last night, I wouldn't feel terrible now.»",
      options: ["hadn't eaten", "didn't eat", "wouldn't eat", "don't eat"],
      answer: "hadn't eaten",
      explain:
        "Mixto pasado→presente: la causa está en el pasado (past perfect) y la consecuencia en el presente (would + infinitivo).",
      speak: "If I hadn't eaten so much last night, I wouldn't feel terrible now.",
    },
    {
      kind: "choose",
      prompt: "«If she weren't so shy, she ___ the job last week.»",
      options: ["would have got", "would get", "will get", "had got"],
      answer: "would have got",
      explain:
        "Mixto al revés: la causa es permanente (weren't so shy) y la consecuencia un momento concreto del pasado → would HAVE got.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Si no fuera por ti, aún estaría perdido»",
      answer: "if it were not for you I would still be lost",
      bank: ["if", "it", "were", "not", "for", "you", "I", "would", "still", "be", "lost", "was", "have"],
      explain:
        "«If it weren't for + persona/cosa» = si no fuera por. En el irreal se prefiere «were» para todas las personas, también con «it».",
    },
  ],

  /* ---------------- Pasiva avanzada ---------------- */

  "b2-passive-1": [
    {
      kind: "choose",
      prompt: "«He ___ his phone stolen on the train.»",
      options: ["had", "did", "made", "got it"],
      answer: "had",
      explain:
        "La misma estructura «have + objeto + participio» sirve para algo malo que te pasa: he had his phone stolen = le robaron el móvil.",
      speak: "He had his phone stolen on the train.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál significa que lo hiciste TÚ mismo?",
      options: ["I painted the kitchen", "I had the kitchen painted", "I got the kitchen painted", "I had someone paint it"],
      answer: "I painted the kitchen",
      explain:
        "Sin «have/get» el sujeto ejecuta la acción. Con ellos, la encarga: la diferencia entre pintar y pagar a un pintor.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Dónde te arreglas el coche?»",
      answer: "where do you get your car repaired?",
      bank: ["where", "do", "you", "get", "your", "car", "repaired?", "repair", "have"],
      explain:
        "Pregunta con do + get + objeto + participio. «Repaired», no «repair»: el coche recibe la acción, no la hace.",
    },
  ],

  "b2-passive-2": [
    {
      kind: "choose",
      prompt: "«The suspect ___ to have left the country.»",
      options: ["is believed", "is believing", "believes", "has believed"],
      answer: "is believed",
      explain:
        "Estructura de prensa: sujeto + is said/believed/thought + to + infinitivo. Evita nombrar la fuente sin sonar vago.",
      speak: "The suspect is believed to have left the country.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál dice que la acción ocurrió ANTES?",
      options: [
        "He is said to have won",
        "He is said to win",
        "He was said to win",
        "He is saying to win",
      ],
      answer: "He is said to have won",
      explain:
        "«To have + participio» retrasa el infinitivo al pasado: se dice ahora que ganó antes. «To win» sería habitual o futuro.",
    },
    {
      kind: "type",
      prompt: "Reescribe con «It»: «People expect the strike to end soon»",
      answer: [
        "it is expected that the strike will end soon",
        "it's expected that the strike will end soon",
        "it is expected the strike will end soon",
      ],
      explain:
        "Dos pasivas equivalentes: «It is expected that + frase» o «The strike is expected to end». La primera empieza por el «it» vacío.",
    },
  ],

  "b2-passive-3": [
    {
      kind: "choose",
      prompt: "«Nothing ___ about it yet.» (no se ha hecho nada)",
      options: ["has been done", "has done", "was doing", "is doing"],
      answer: "has been done",
      explain:
        "Pasiva en present perfect: have/has + BEEN + participio. Se olvida el «been» constantemente y la frase pasa a decir lo contrario.",
      speak: "Nothing has been done about it yet.",
    },
    {
      kind: "choose",
      prompt: "«The children ___ by their grandmother while we were away.»",
      options: ["were being looked after", "were looking after", "looked after", "have looked after"],
      answer: "were being looked after",
      explain:
        "Pasiva continua en pasado: were being + participio. Y el phrasal conserva su preposición: looked AFTER, no se cae al pasar a pasiva.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Se me dijo que esperara fuera»",
      answer: "I was told to wait outside",
      bank: ["I", "was", "told", "to", "wait", "outside", "said", "me"],
      explain:
        "Con «tell» la persona puede ser sujeto de la pasiva: I was told. Con «say» no: sería «it was said to me», mucho menos natural.",
    },
  ],

  /* ---------------- Conectar y matizar ---------------- */

  "b2-discourse-1": [
    {
      kind: "choose",
      prompt: "«___ the delay, the audience stayed.»",
      options: ["Despite", "Although", "However", "Whereas"],
      answer: "Despite",
      explain:
        "Despite/in spite of van con SUSTANTIVO o -ing. Although va con frase completa: although it was delayed. Confundirlos es el fallo típico de B2.",
      speak: "Despite the delay, the audience stayed.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál está bien puntuada?",
      options: [
        "It rained; however, we went out",
        "It rained, however we went out",
        "It rained however, we went out",
        "It rained, however, we went out anyway however",
      ],
      answer: "It rained; however, we went out",
      explain:
        "«However» no une dos frases como «but»: necesita punto y coma o punto delante, y coma detrás. Con coma sola es un error de escritura.",
    },
    {
      kind: "type",
      prompt: "Conector formal para «además» que abre frase (2 sílabas, empieza por «further»)",
      answer: ["furthermore", "Furthermore"],
      explain:
        "Furthermore / moreover = además, en registro formal. En conversación bastaría «and also» o «on top of that».",
    },
  ],

  "b2-discourse-2": [
    {
      kind: "choose",
      prompt: "«I'll lend you the car ___ you drive carefully.»",
      options: ["as long as", "in case", "unless", "even if"],
      answer: "as long as",
      explain:
        "as long as / provided that = condición que debe cumplirse. «In case» es previsión (por si acaso) y no condiciona nada.",
      speak: "I'll lend you the car as long as you drive carefully.",
    },
    {
      kind: "choose",
      prompt: "¿Cuál está MAL?",
      options: [
        "Unless you don't hurry, we'll miss it",
        "Unless you hurry, we'll miss it",
        "If you don't hurry, we'll miss it",
        "We'll miss it unless you hurry",
      ],
      answer: "Unless you don't hurry, we'll miss it",
      explain:
        "«Unless» YA significa «si no». Añadirle otro negativo lo invierte: unless you don't hurry = si no te das prisa… al revés.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Llevaré efectivo por si la tarjeta no funciona»",
      answer: "I will take cash in case the card does not work",
      bank: ["I", "will", "take", "cash", "in", "case", "the", "card", "does", "not", "work", "if", "won't"],
      explain:
        "Tras «in case» el verbo va en PRESENTE, nunca en futuro: in case the card doesn't work. La previsión ya está en «in case».",
    },
  ],

  "b2-discourse-3": [
    {
      kind: "choose",
      prompt: "¿Cuál suaviza más una crítica en el trabajo?",
      options: [
        "There may be a slight issue with the deadline",
        "The deadline is wrong",
        "You got the deadline wrong",
        "The deadline is a disaster",
      ],
      answer: "There may be a slight issue with the deadline",
      explain:
        "El inglés profesional acolcha con modal (may) + atenuador (slight) + palabra neutra (issue). No es hipocresía: es el registro esperado.",
    },
    {
      kind: "choose",
      prompt: "«The data ___ suggest a link between the two.»",
      options: ["would seem to", "seems", "is seeming to", "seem it"],
      answer: "would seem to",
      explain:
        "«Would seem to» es el hedge académico por excelencia: afirma sin comprometerse. «Data» además es plural en registro formal.",
    },
    {
      kind: "type",
      prompt: "Completa el matiz: «It's ___ likely that he'll accept» (bastante, empieza por «f»)",
      answer: ["fairly"],
      explain:
        "Escala de intensidad: somewhat < fairly < quite < very < extremely. «Fairly likely» = bastante probable, sin exagerar.",
    },
  ],

  /* ---------------- Patrones verbales ---------------- */

  "b2-patterns-1": [
    {
      kind: "choose",
      prompt: "«On the way home he stopped ___ petrol.»",
      options: ["to get", "getting", "get", "for getting"],
      answer: "to get",
      explain:
        "stop TO do = parar con el fin de hacer algo. stop DOING = abandonar el hábito. Aquí paró para repostar, no dejó de repostar.",
      speak: "On the way home he stopped to get petrol.",
    },
    {
      kind: "choose",
      prompt: "«I regret ___ you that your application was unsuccessful.»",
      options: ["to inform", "informing", "inform", "of informing"],
      answer: "to inform",
      explain:
        "regret TO inform/tell = fórmula fija para dar malas noticias ahora. regret DOING sería arrepentirse de algo ya hecho.",
      speak: "I regret to inform you that your application was unsuccessful.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «No olvides cerrar con llave» (aún no lo ha hecho)",
      answer: "do not forget to lock the door",
      bank: ["do", "not", "forget", "to", "lock", "the", "door", "locking", "don't"],
      explain:
        "forget TO do = una tarea pendiente. forget DOING sería no recordar haberlo hecho, que aquí no tiene sentido.",
    },
  ],

  "b2-patterns-2": [
    {
      kind: "choose",
      prompt: "«She's very good ___ dealing with difficult clients.»",
      options: ["at", "in", "on", "with"],
      answer: "at",
      explain:
        "good AT + -ing para habilidades. Y tras preposición el verbo va SIEMPRE en -ing: at dealing, nunca «at to deal».",
      speak: "She's very good at dealing with difficult clients.",
    },
    {
      kind: "choose",
      prompt: "«They congratulated him ___ passing the exam.»",
      options: ["on", "for", "about", "of"],
      answer: "on",
      explain:
        "congratulate ON, apologise FOR, accuse OF, blame FOR. No hay lógica: se aprenden en bloque con el verbo.",
    },
    {
      kind: "type",
      prompt: "Completa: «I'm looking forward ___ you» (a verte; 2 palabras)",
      answer: ["to seeing", "to see you"],
      explain:
        "En «look forward to» el «to» es PREPOSICIÓN, no infinitivo: por eso pide -ing. To seeing, to hearing, to meeting.",
    },
  ],

  "b2-patterns-3": [
    {
      kind: "choose",
      prompt: "¿Cuál es la ÚNICA correcta?",
      options: [
        "I'll pick you up at eight",
        "I'll pick up you at eight",
        "I'll pick you at eight up",
        "I'll up pick you at eight",
      ],
      answer: "I'll pick you up at eight",
      explain:
        "Con phrasal separable, el PRONOMBRE va obligatoriamente en medio: pick you up. «Pick up you» está mal siempre.",
      speak: "I'll pick you up at eight.",
    },
    {
      kind: "choose",
      prompt: "«The meeting was ___ until Monday.» (aplazada)",
      options: ["put off", "put out", "put up", "put down"],
      answer: "put off",
      explain:
        "put off = aplazar · put up with = aguantar · put out = apagar (un fuego) · put down = dejar en el suelo. La partícula lo cambia todo.",
      speak: "The meeting was put off until Monday.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Se me acabó la paciencia»",
      answer: "I ran out of patience",
      bank: ["I", "ran", "out", "of", "patience", "run", "off", "finished"],
      explain:
        "«Run out of» es inseparable de tres partes: nunca se parte (nada de «run it out of»). Pasado irregular: ran.",
    },
  ],

  /* ---------------- Sonar natural ---------------- */

  "b2-natural-1": [
    {
      kind: "choose",
      prompt: "«Could you ___ me a favour?»",
      options: ["do", "make", "take", "have"],
      answer: "do",
      explain:
        "DO a favour, MAKE a mistake. La regla aproximada: make = crear algo nuevo; do = ejecutar una tarea o algo abstracto.",
      speak: "Could you do me a favour?",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es la colocación natural?",
      options: ["take a shower", "make a shower", "do a shower", "have a bath and make"],
      answer: "take a shower",
      explain:
        "take a shower / take a photo / take a seat. En inglés británico también «have a shower»; lo que no existe es «make a shower».",
    },
    {
      kind: "type",
      prompt: "Completa: «Take your time, there's no need to ___ a fuss» (armar un escándalo)",
      answer: ["make"],
      explain: "make a fuss, make a mess, make an effort: todo lo que se GENERA va con make.",
    },
  ],

  "b2-natural-2": [
    {
      kind: "choose",
      prompt: "Correo a un desconocido cuyo nombre no sabes. ¿Cómo lo abres?",
      options: ["Dear Sir or Madam", "Hi there", "Dear friend", "To whoever reads this"],
      answer: "Dear Sir or Madam",
      explain:
        "Sin nombre: Dear Sir or Madam (y se cierra con «Yours faithfully»). Con nombre: Dear Ms Smith + «Yours sincerely».",
    },
    {
      kind: "choose",
      prompt: "¿Cuál es el equivalente FORMAL de «I need to find out about the price»?",
      options: [
        "I would be grateful if you could confirm the price",
        "Tell me the price",
        "What's the price?",
        "I wanna know the price",
      ],
      answer: "I would be grateful if you could confirm the price",
      explain:
        "«I would be grateful if you could…» es la petición formal estándar: convierte una orden en un favor sin alargar el correo.",
    },
    {
      kind: "bank",
      prompt: "Traduce (formal): «Adjunto encontrará mi currículum»",
      answer: "please find attached my CV",
      bank: ["please", "find", "attached", "my", "CV", "here", "is"],
      explain:
        "«Please find attached» es fórmula fija de correo. «Here is my CV» no está mal, pero baja el registro a informal.",
    },
  ],

  "b2-natural-3": [
    {
      kind: "choose",
      prompt: "«Only after the meeting ___ what had happened.»",
      options: ["did I understand", "I understood", "I did understand", "understood I"],
      answer: "did I understand",
      explain:
        "Al abrir con un elemento negativo o restrictivo (only, never, rarely) el orden se invierte como en una pregunta: did I understand.",
      speak: "Only after the meeting did I understand what had happened.",
    },
    {
      kind: "choose",
      prompt: "«It's the service ___ I'm complaining about, not the food.»",
      options: ["that", "which is", "what", "who"],
      answer: "that",
      explain:
        "Estructura enfática «It's X that…»: sirve para señalar la parte importante. Tras «it's + cosa/persona» siempre «that».",
    },
    {
      kind: "type",
      prompt: "Enfatiza con «do»: «I told you» → «I ___ tell you»",
      answer: ["did"],
      explain:
        "El auxiliar do/does/did en afirmativa añade énfasis (¡sí que te lo dije!) y obliga al verbo a volver a su forma base: did tell.",
    },
  ],
};
