import type { TeachMap } from "./types";

// Teoría de B2. Aquí ya no se trata de hacerse entender, sino de precisión y
// naturalidad: los matices que separan «se entiende» de «suena bien».
export const b2Teach: TeachMap = {
  /* ---------------- Oraciones de relativo ---------------- */

  "b2-relatives-1": [
    {
      kind: "idea",
      title: "Una frase dentro de otra",
      body:
        "Las oraciones de relativo pegan información a un sustantivo: «el hombre» → «el hombre QUE llamó». El español lo resuelve casi todo con «que»; el inglés elige pieza según de qué hables: personas, cosas, lugares o tiempo.",
    },
    {
      kind: "table",
      title: "Qué relativo toca",
      head: ["Antecedente", "Relativo"],
      rows: [
        ["Persona", "who (o that)"],
        ["Cosa o animal", "which (o that)"],
        ["Lugar", "where"],
        ["Tiempo", "when"],
        ["Posesión", "whose"],
      ],
    },
    {
      kind: "pitfall",
      title: "Se puede omitir… solo si es objeto",
      wrong: "The film won the prize was great.",
      right: "The film that won the prize was great.",
      body:
        "Si el relativo hace de SUJETO («the film won»), es obligatorio. Si es objeto («we saw the film»), se puede quitar: «the film we saw».",
    },
    {
      kind: "examples",
      title: "Las cuatro en frases reales",
      items: [
        { en: "The man who called you is my boss.", es: "El hombre que te llamó es mi jefe." },
        { en: "This is the restaurant where we had dinner.", es: "Este es el restaurante donde cenamos." },
        { en: "The house that we bought is old.", es: "La casa que compramos es antigua.", note: "también: the house we bought" },
        { en: "I remember the day when we met.", es: "Recuerdo el día en que nos conocimos." },
      ],
    },
  ],

  "b2-relatives-2": [
    {
      kind: "idea",
      title: "Las comas cambian el significado",
      body:
        "«My sister who lives in Rome» (sin comas) sugiere que tienes varias hermanas y hablas de una. «My sister, who lives in Rome,» (con comas) dice que solo tienes una y añade un dato. La coma no es decorativa: informa.",
    },
    {
      kind: "table",
      title: "Especificativa contra explicativa",
      head: ["Sin comas (identifica)", "Con comas (añade)"],
      rows: [
        ["The students who passed…", "My brother, who passed, …"],
        ["Admite that", "NUNCA that"],
        ["El relativo se puede omitir", "No se puede omitir"],
        ["Sin pausa al hablar", "Con pausa al hablar"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Whose» no es «who's»",
      wrong: "That's the woman who's car was stolen.",
      right: "That's the woman whose car was stolen.",
      body:
        "«Whose» es posesivo (cuyo). «Who's» es la contracción de «who is». Se pronuncian igual, y por eso se confunden al escribir.",
    },
    {
      kind: "examples",
      title: "Información extra",
      items: [
        { en: "My brother, who lives in Paris, is a chef.", es: "Mi hermano, que vive en París, es cocinero." },
        { en: "Paris, which I visited last year, is beautiful.", es: "París, que visité el año pasado, es preciosa." },
        { en: "That's the woman whose car was stolen.", es: "Esa es la mujer a la que le robaron el coche." },
        { en: "A man whose name I don't remember called.", es: "Llamó un hombre cuyo nombre no recuerdo." },
      ],
    },
  ],

  "b2-relatives-3": [
    {
      kind: "idea",
      title: "La preposición se va al final",
      body:
        "En español la preposición va delante: «la persona CON LA QUE hablé». En inglés natural se queda al final: «the person I spoke to». Ponerla delante («to whom I spoke») es correcto, pero suena a documento legal.",
    },
    {
      kind: "table",
      title: "Natural contra formal",
      head: ["Natural", "Formal"],
      rows: [
        ["the person I spoke to", "the person to whom I spoke"],
        ["the topic we talked about", "the topic about which we talked"],
        ["the house I grew up in", "the house in which I grew up"],
      ],
    },
    {
      kind: "pitfall",
      title: "Para comentar toda la frase, «which»",
      wrong: "He arrived late, what annoyed everyone.",
      right: "He arrived late, which annoyed everyone.",
      body:
        "Ese «lo cual» del español es «which», nunca «what». Va precedido de coma y se refiere a lo dicho antes entero.",
    },
    {
      kind: "examples",
      title: "En conversación",
      items: [
        { en: "The person I spoke to was helpful.", es: "La persona con la que hablé fue amable." },
        { en: "He arrived late, which annoyed everyone.", es: "Llegó tarde, lo cual molestó a todos." },
        { en: "That's the reason why I left.", es: "Esa es la razón por la que me fui." },
        { en: "The topic we talked about was difficult.", es: "El tema del que hablamos era difícil." },
      ],
    },
  ],

  /* ---------------- Deseos y situaciones irreales ---------------- */

  "b2-unreal-1": [
    {
      kind: "idea",
      title: "Un paso atrás para lo imposible",
      body:
        "«Wish» funciona como el segundo condicional: el verbo retrocede un tiempo para marcar que el deseo NO se cumple. Presente → pasado; pasado → past perfect.",
    },
    {
      kind: "table",
      title: "Los tres usos",
      head: ["Sobre qué", "Estructura"],
      rows: [
        ["El presente", "I wish I knew (no lo sé)"],
        ["El pasado", "I wish I had studied (no estudié)"],
        ["Lo que hace otro y te molesta", "I wish you would stop"],
        ["Habilidad", "I wish I could sing"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I wish I would» no existe",
      wrong: "I wish I would have more time.",
      right: "I wish I had more time.",
      body:
        "«Wish + would» solo sirve para quejarse de OTRA persona o de algo externo (I wish it would stop raining). Sobre ti mismo se usa el pasado.",
    },
    {
      kind: "examples",
      title: "Deseos y arrepentimientos",
      items: [
        { en: "I wish I knew the answer.", es: "Ojalá supiera la respuesta." },
        { en: "I wish I had studied harder.", es: "Ojalá hubiera estudiado más." },
        { en: "I wish you would stop complaining.", es: "Ojalá dejaras de quejarte." },
        { en: "If only I were taller!", es: "¡Ojalá fuera más alto!" },
      ],
    },
  ],

  "b2-unreal-2": [
    {
      kind: "idea",
      title: "Preferir y avisar de que ya toca",
      body:
        "«I'd rather» y «it's time» comparten truco: si el sujeto cambia, el verbo se va al pasado aunque hables del presente. «I'd rather YOU didn't», «it's time WE left».",
    },
    {
      kind: "table",
      title: "Con y sin cambio de sujeto",
      head: ["Mismo sujeto", "Sujeto distinto"],
      rows: [
        ["I'd rather stay", "I'd rather you stayed"],
        ["It's time to leave", "It's time we left"],
        ["I'd prefer to wait", "I'd prefer you to wait"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I'd rather» va sin «to»",
      wrong: "I'd rather to stay at home.",
      right: "I'd rather stay at home.",
      body:
        "«Rather» pide verbo base. El «to» es de «prefer»: «I'd prefer to stay». Y el negativo es «I'd rather not», sin «don't».",
    },
    {
      kind: "examples",
      title: "Preferencias educadas",
      items: [
        { en: "I'd rather stay at home tonight.", es: "Prefiero quedarme en casa esta noche." },
        { en: "I'd rather you didn't do that.", es: "Preferiría que no hicieras eso." },
        { en: "It's time we left.", es: "Ya va siendo hora de irnos." },
        { en: "I'd rather not talk about it.", es: "Preferiría no hablar de eso." },
      ],
    },
  ],

  "b2-unreal-3": [
    {
      kind: "idea",
      title: "Condicionales que mezclan tiempos",
      body:
        "Los condicionales de manual tienen las dos mitades en el mismo tiempo. La vida real no: una decisión del pasado puede explicar tu presente. Ahí se mezclan.",
    },
    {
      kind: "table",
      title: "Las dos mezclas",
      head: ["Condición", "Resultado"],
      rows: [
        ["Pasado: If I had taken that job…", "Presente: …I would be living in Madrid"],
        ["Presente: If she were more careful…", "Pasado: …she wouldn't have crashed"],
        ["Puro 2.º: If I had time…", "…I would help you"],
        ["Puro 3.º: If I had known…", "…I would have called"],
      ],
    },
    {
      kind: "pitfall",
      title: "Tras «if», nunca «would»",
      wrong: "If I would have known…",
      right: "If I had known…",
      body:
        "Vale para todos los condicionales, mezclados o no: el «would» solo puede aparecer en la mitad del resultado.",
    },
    {
      kind: "examples",
      title: "Causa y consecuencia cruzadas",
      items: [
        { en: "If I had taken that job, I would be living in Madrid now.", es: "Si hubiera aceptado ese trabajo, ahora viviría en Madrid." },
        { en: "If she were more careful, she wouldn't have crashed.", es: "Si fuera más cuidadosa, no habría chocado." },
        { en: "Take the map, otherwise you'll get lost.", es: "Coge el mapa, si no te perderás." },
        { en: "I'll help you as long as you're honest with me.", es: "Te ayudo siempre que seas sincero conmigo." },
      ],
    },
  ],

  /* ---------------- Pasiva avanzada ---------------- */

  "b2-passive-1": [
    {
      kind: "idea",
      title: "Cuando lo hace otro por ti",
      body:
        "«I painted my house» = lo pintaste tú. «I had my house painted» = pagaste a alguien. El español no lo distingue («me pintaron la casa» lleva un sujeto vago), el inglés tiene estructura propia.",
    },
    {
      kind: "table",
      title: "La fórmula",
      head: ["Estructura", "Ejemplo"],
      rows: [
        ["have + objeto + participio", "I had my car repaired"],
        ["get + objeto + participio (informal)", "I got my hair cut"],
        ["En futuro", "We're having the kitchen painted"],
        ["En pregunta", "Where do you get your hair cut?"],
      ],
    },
    {
      kind: "pitfall",
      title: "El participio va detrás del objeto",
      wrong: "I had repaired my car.",
      right: "I had my car repaired.",
      body:
        "«I had repaired my car» es past perfect: lo habías arreglado TÚ antes. El orden cambia el significado por completo.",
    },
    {
      kind: "examples",
      title: "Servicios del día a día",
      items: [
        { en: "I had my car repaired yesterday.", es: "Ayer me repararon el coche." },
        { en: "She's getting her hair cut.", es: "Va a cortarse el pelo." },
        { en: "We had our house painted last year.", es: "Nos pintaron la casa el año pasado." },
        { en: "I need to get my phone fixed.", es: "Necesito que me arreglen el móvil." },
      ],
    },
  ],

  "b2-passive-2": [
    {
      kind: "idea",
      title: "El «se dice que» del inglés",
      body:
        "El español tiene un «se» impersonal comodísimo: se dice, se cree, se espera. El inglés no lo tiene y lo resuelve con pasiva. Es el registro de las noticias, los informes y los correos formales.",
    },
    {
      kind: "table",
      title: "Dos formas de decir lo mismo",
      head: ["Con «it»", "Con el sujeto real"],
      rows: [
        ["It is said that he is rich", "He is said to be rich"],
        ["It is believed that she left", "She is believed to have left"],
        ["It is expected that prices will rise", "Prices are expected to rise"],
      ],
    },
    {
      kind: "pitfall",
      title: "Nada de traducir el «se» literal",
      wrong: "It says that prices will rise. / They say him rich.",
      right: "It is said that prices will rise. / He is said to be rich.",
      body:
        "«It says» significa «pone que» (en un cartel o un texto). El impersonal necesita la pasiva completa: is said, is believed, is thought.",
    },
    {
      kind: "examples",
      title: "Registro informativo",
      items: [
        { en: "It is expected that prices will rise.", es: "Se espera que los precios suban." },
        { en: "He is considered to be the best player.", es: "Se le considera el mejor jugador." },
        { en: "The building is believed to be very old.", es: "Se cree que el edificio es muy antiguo." },
        { en: "It is said that the museum will close.", es: "Se dice que el museo cerrará." },
      ],
    },
  ],

  "b2-passive-3": [
    {
      kind: "idea",
      title: "Pasiva con modales y con dos objetos",
      body:
        "Dos ampliaciones útiles: con modal se intercala «be» (must be done), y con verbos que llevan dos objetos (give, offer, send) la PERSONA puede ser el sujeto: «I was given a prize».",
    },
    {
      kind: "table",
      title: "Cómo queda",
      head: ["Activa", "Pasiva"],
      rows: [
        ["We must finish the report", "The report must be finished"],
        ["You can solve this", "This can be solved"],
        ["They gave me a prize", "I was given a prize"],
        ["They offered her a job", "She was offered a job"],
      ],
    },
    {
      kind: "pitfall",
      title: "El modal no se conjuga; «be» sí aparece",
      wrong: "It must done. / It musts be done.",
      right: "It must be done.",
      body:
        "Modal + be + participio, siempre. Los modales no llevan -s ni tiempos: must, can, should, might.",
    },
    {
      kind: "examples",
      title: "Obligación y posibilidad sin sujeto",
      items: [
        { en: "The report must be finished before Friday.", es: "El informe hay que terminarlo antes del viernes." },
        { en: "This problem can be solved easily.", es: "Este problema se puede resolver fácilmente." },
        { en: "I was given a prize for my work.", es: "Me dieron un premio por mi trabajo." },
        { en: "She was offered a job in London.", es: "Le ofrecieron un trabajo en Londres." },
      ],
    },
  ],

  /* ---------------- Conectar y matizar ---------------- */

  "b2-discourse-1": [
    {
      kind: "idea",
      title: "Conectores de registro alto",
      body:
        "«But» y «so» valen para hablar; para escribir bien hacen falta sus versiones formales. La clave no es el significado, es la PUNTUACIÓN: unos unen dentro de la frase y otros abren frase nueva.",
    },
    {
      kind: "table",
      title: "Dónde va cada uno",
      head: ["Conector", "Uso"],
      rows: [
        ["whereas", "une dos mitades contrastadas: A, whereas B"],
        ["however / nevertheless", "abre frase nueva, con coma"],
        ["moreover", "suma otro argumento igual"],
        ["therefore", "introduce la consecuencia"],
        ["in contrast", "compara dos cosas opuestas"],
      ],
    },
    {
      kind: "pitfall",
      title: "«However» no une como «but»",
      wrong: "It was raining however we went out.",
      right: "It was raining. However, we went out.",
      body:
        "«However» necesita punto (o punto y coma) delante y coma detrás. Para unir dentro de la frase se usa «but» o «whereas».",
    },
    {
      kind: "examples",
      title: "Argumentar por escrito",
      items: [
        { en: "He earns a lot, whereas his brother earns very little.", es: "Él gana mucho, mientras que su hermano gana muy poco." },
        { en: "The plan is risky. Nevertheless, we have no choice.", es: "El plan es arriesgado. No obstante, no tenemos opción." },
        { en: "The flat is small. Moreover, it's expensive.", es: "El piso es pequeño. Además, es caro." },
        { en: "It was raining; therefore, we cancelled the match.", es: "Llovía; por lo tanto, cancelamos el partido." },
      ],
    },
  ],

  "b2-discourse-2": [
    {
      kind: "idea",
      title: "Condiciones con matiz",
      body:
        "Más allá de «if» hay una familia entera: poner una condición (provided that), prevenir (in case), excluir (unless) o conceder (even if). Cada una dice algo distinto sobre tu intención.",
    },
    {
      kind: "table",
      title: "Qué expresa cada una",
      head: ["Conector", "Significado"],
      rows: [
        ["provided that / as long as", "solo con esa condición"],
        ["unless", "si no (ya es negativo)"],
        ["in case", "por prevención, antes de que pase"],
        ["even if", "aunque pase, da igual"],
        ["otherwise", "si no, esto ocurrirá"],
      ],
    },
    {
      kind: "pitfall",
      title: "«In case» no es «if»",
      wrong: "I'll take an umbrella if it rains. (dicho al salir con sol)",
      right: "I'll take an umbrella in case it rains.",
      body:
        "«If» = solo cuando ocurra. «In case» = por si acaso, lo hago ANTES. Cambia por completo lo que estás diciendo.",
    },
    {
      kind: "examples",
      title: "Negociar y prevenir",
      items: [
        { en: "Take an umbrella in case it rains.", es: "Coge un paraguas por si llueve." },
        { en: "You can borrow it provided that you return it tomorrow.", es: "Te lo presto siempre que lo devuelvas mañana." },
        { en: "Even if we leave now, we'll be late.", es: "Aunque salgamos ahora, llegaremos tarde." },
        { en: "I won't go unless you invite me.", es: "No iré a menos que me invites." },
      ],
    },
  ],

  "b2-discourse-3": [
    {
      kind: "idea",
      title: "Hedging: el arte de no sonar tajante",
      body:
        "En inglés profesional casi nada se afirma en seco. Se rebaja con «tend to», «somewhat», «it seems», «I'm not entirely sure». No es falta de seguridad: es la norma social, y su ausencia suena agresiva.",
    },
    {
      kind: "table",
      title: "Directo contra matizado",
      head: ["Directo (choca)", "Matizado (natural)"],
      rows: [
        ["You are wrong", "I'm not entirely sure I agree"],
        ["It's bad", "It's somewhat disappointing"],
        ["Prices rise in December", "Prices tend to rise in December"],
        ["There was a mistake", "It seems that there was a mistake"],
      ],
    },
    {
      kind: "pitfall",
      title: "Traducir la franqueza española sale caro",
      wrong: "That's not true. / You're wrong.",
      right: "I'm not sure that's right. / I see it a bit differently.",
      body:
        "Lo que en español es sinceridad, en una reunión en inglés se lee como hostilidad. El contenido es el mismo; el envoltorio, no.",
    },
    {
      kind: "examples",
      title: "Discrepar sin romper nada",
      items: [
        { en: "I'm not entirely sure I agree.", es: "No estoy del todo seguro de estar de acuerdo." },
        { en: "Prices tend to rise in December.", es: "Los precios suelen subir en diciembre." },
        { en: "The results were somewhat disappointing.", es: "Los resultados fueron un tanto decepcionantes." },
        { en: "I agree to some extent, but…", es: "Estoy de acuerdo hasta cierto punto, pero…" },
      ],
    },
  ],

  /* ---------------- Patrones verbales ---------------- */

  "b2-patterns-1": [
    {
      kind: "idea",
      title: "El mismo verbo, dos significados",
      body:
        "Con stop, remember, forget, try y regret, elegir -ing o «to» no es cuestión de estilo: cambia lo que dices. «Stop smoking» es dejarlo; «stop to smoke» es parar para fumar.",
    },
    {
      kind: "table",
      title: "La diferencia, verbo a verbo",
      head: ["Con -ing", "Con to"],
      rows: [
        ["stop smoking (lo dejas)", "stop to smoke (paras para fumar)"],
        ["remember locking (ya lo hiciste)", "remember to lock (acuérdate)"],
        ["forget meeting (no recuerdas)", "forget to meet (se te olvidó ir)"],
        ["try opening (pruébalo)", "try to open (haz el esfuerzo)"],
        ["regret telling (te arrepientes)", "regret to tell (mala noticia formal)"],
      ],
    },
    {
      kind: "pitfall",
      title: "El clásico de los recordatorios",
      wrong: "Remember locking the door when you leave.",
      right: "Remember to lock the door when you leave.",
      body:
        "Con -ing estarías pidiéndole que recuerde algo que ya hizo. Para un encargo futuro, siempre «to».",
    },
    {
      kind: "examples",
      title: "En contexto",
      items: [
        { en: "He stopped smoking two years ago.", es: "Dejó de fumar hace dos años." },
        { en: "Remember to lock the door.", es: "Acuérdate de cerrar con llave." },
        { en: "I remember meeting her in Madrid.", es: "Recuerdo haberla conocido en Madrid." },
        { en: "I tried opening the window.", es: "Probé a abrir la ventana." },
      ],
    },
  ],

  "b2-patterns-2": [
    {
      kind: "idea",
      title: "Cada verbo lleva su preposición pegada",
      body:
        "No hay lógica que valga: se aprenden en bloque, verbo + preposición. Y hay una regla de oro: después de una preposición, el verbo va SIEMPRE en -ing.",
    },
    {
      kind: "table",
      title: "Los que más se fallan",
      head: ["Inglés", "Español (que engaña)"],
      rows: [
        ["depend on", "depender DE"],
        ["insist on", "insistir EN"],
        ["accuse of", "acusar DE"],
        ["apologise for", "pedir perdón POR"],
        ["succeed in", "lograr"],
        ["consist of", "consistir EN"],
      ],
    },
    {
      kind: "pitfall",
      title: "Tras preposición, -ing",
      wrong: "She insisted on to pay. / I'm interested in learn English.",
      right: "She insisted on paying. / I'm interested in learning English.",
      body:
        "Es mecánico: on paying, in learning, of lying, for being. Nunca infinitivo con «to» detrás de una preposición.",
    },
    {
      kind: "examples",
      title: "Bloques listos para usar",
      items: [
        { en: "It depends on the weather.", es: "Depende del tiempo." },
        { en: "She insisted on paying for dinner.", es: "Insistió en pagar la cena." },
        { en: "They accused me of lying.", es: "Me acusaron de mentir." },
        { en: "We finally succeeded in finding a flat.", es: "Por fin logramos encontrar piso." },
      ],
    },
  ],

  "b2-patterns-3": [
    {
      kind: "idea",
      title: "Dónde colocar el objeto",
      body:
        "Muchos phrasal verbs se pueden partir: «call off the meeting» o «call the meeting off». Pero si el objeto es un pronombre (it, them, him), va OBLIGATORIAMENTE en medio: «call it off».",
    },
    {
      kind: "table",
      title: "Separables y no separables",
      head: ["Separable", "No separable"],
      rows: [
        ["turn down the offer / turn it down", "put up with it"],
        ["call off the meeting / call it off", "run out of milk"],
        ["look up the word / look it up", "look after the kids"],
      ],
    },
    {
      kind: "pitfall",
      title: "Nunca «look up it»",
      wrong: "I'll look up it. / They called off it.",
      right: "I'll look it up. / They called it off.",
      body:
        "Con pronombre, en medio y punto. Es el error que más delata a un hispanohablante avanzado.",
    },
    {
      kind: "examples",
      title: "Los cinco más útiles",
      items: [
        { en: "They called the meeting off.", es: "Cancelaron la reunión." },
        { en: "I don't know this word, I'll look it up.", es: "No conozco esta palabra, la busco." },
        { en: "I can't put up with this noise.", es: "No aguanto este ruido." },
        { en: "We ran out of petrol.", es: "Nos quedamos sin gasolina." },
      ],
    },
  ],

  /* ---------------- Sonar natural ---------------- */

  "b2-natural-1": [
    {
      kind: "idea",
      title: "Collocations: palabras que van juntas",
      body:
        "«Tomar una decisión» no es «take a decision», es «make a decision». No hay regla: son parejas fijas que el oído nativo espera. Usar la incorrecta se entiende, pero suena a traducción.",
    },
    {
      kind: "table",
      title: "El reparto de los cuatro grandes",
      head: ["Verbo", "Va con"],
      rows: [
        ["make", "a decision, a mistake, progress, money, a plan"],
        ["do", "homework, the dishes, business, exercise, a favour"],
        ["take", "a break, a photo, a shower, a risk, notes"],
        ["have", "an argument, a look, breakfast, fun, a problem"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Argument» no es «argumento»",
      wrong: "His argument was very interesting. (queriendo decir razonamiento)",
      right: "His point was very interesting. / They had an argument.",
      body:
        "«Argument» es discusión o pelea. Un argumento en el sentido de razón es «point», «reason» o «case».",
    },
    {
      kind: "examples",
      title: "Combinaciones que hay que fijar",
      items: [
        { en: "We need to make a decision today.", es: "Tenemos que tomar una decisión hoy." },
        { en: "I have to do my homework.", es: "Tengo que hacer los deberes." },
        { en: "Let's take a break.", es: "Vamos a tomarnos un descanso." },
        { en: "We are making a lot of progress.", es: "Estamos progresando mucho." },
      ],
    },
  ],

  "b2-natural-2": [
    {
      kind: "idea",
      title: "Dos ingleses en el mismo idioma",
      body:
        "El informal tira de phrasal verbs y contracciones (sort it out, we'll, get in touch). El formal usa verbos largos de origen latino y frases completas (resolve, receive, I would like to). Mezclarlos al azar es lo que suena raro.",
    },
    {
      kind: "table",
      title: "El mismo mensaje en dos registros",
      head: ["Informal", "Formal"],
      rows: [
        ["We'll sort it out", "We will resolve the issue"],
        ["I want to ask about…", "I would like to enquire about…"],
        ["Get in touch", "Please contact us"],
        ["Sorry about the delay", "We apologise for the delay"],
        ["Thanks!", "Kind regards"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Look forward to» pide -ing",
      wrong: "I look forward to hear from you.",
      right: "I look forward to hearing from you.",
      body:
        "Aquí «to» es preposición, no parte del infinitivo. Es el cierre estándar de un correo profesional, y verlo mal salta a la vista.",
    },
    {
      kind: "examples",
      title: "Correo profesional",
      items: [
        { en: "I would like to enquire about the position.", es: "Quisiera consultar sobre el puesto." },
        { en: "I look forward to hearing from you.", es: "Quedo a la espera de su respuesta." },
        { en: "We'll sort it out.", es: "Ya lo solucionamos.", note: "informal" },
        { en: "Kind regards, Ana.", es: "Un saludo cordial, Ana." },
      ],
    },
  ],

  "b2-natural-3": [
    {
      kind: "idea",
      title: "Poner el foco donde quieres",
      body:
        "El inglés tiene el orden de palabras muy fijo, así que para enfatizar usa estructuras: «What I need is…», «It was John who…», el auxiliar «do» y la inversión. Son las que dan aire de dominio.",
    },
    {
      kind: "table",
      title: "Cuatro formas de subrayar",
      head: ["Recurso", "Ejemplo"],
      rows: [
        ["What… is", "What I need is a holiday"],
        ["It was… who/that", "It was John who broke it"],
        ["do enfático", "I do like it"],
        ["Inversión", "Never have I seen such a mess"],
        ["not only… but also", "Not only is it cheap, but it's good"],
      ],
    },
    {
      kind: "pitfall",
      title: "Tras «not only» al principio, se invierte",
      wrong: "Not only it is cheap, but also good.",
      right: "Not only is it cheap, but it's also good.",
      body:
        "Cuando la frase empieza por una expresión negativa (not only, never, rarely), el verbo pasa delante del sujeto, como en una pregunta.",
    },
    {
      kind: "examples",
      title: "Con énfasis",
      items: [
        { en: "What I need is a holiday.", es: "Lo que necesito son unas vacaciones." },
        { en: "It was John who broke the window.", es: "Fue John quien rompió la ventana." },
        { en: "I do like it, I just prefer the other one.", es: "Sí que me gusta, solo que prefiero el otro." },
        { en: "Never have I seen such a mess.", es: "Nunca había visto semejante desastre." },
      ],
    },
  ],
};
