import type { TeachMap } from "./types";

// Teoría de C1. Aquí ya no se corrigen errores que impidan entenderse: se
// afina el registro, la precisión y el ritmo. El objetivo es sonar como
// alguien que piensa en inglés.
export const c1Teach: TeachMap = {
  /* ---------------- Inversión y énfasis ---------------- */

  "c1-inversion-1": [
    {
      kind: "idea",
      title: "Poner lo negativo delante obliga a invertir",
      body:
        "Si una frase empieza por una expresión negativa (never, rarely, at no point, under no circumstances), el inglés coloca el auxiliar ANTES del sujeto, igual que en una pregunta. Es el recurso más reconocible del registro alto.",
    },
    {
      kind: "table",
      title: "Normal contra invertido",
      head: ["Orden normal", "Invertido (enfático)"],
      rows: [
        ["I had never seen it", "Never had I seen it"],
        ["We rarely see this", "Rarely do we see this"],
        ["He didn't mention it once", "At no point did he mention it"],
        ["You shouldn't sign it", "Under no circumstances should you sign it"],
      ],
    },
    {
      kind: "pitfall",
      title: "Si no hay auxiliar, entra «do»",
      wrong: "Rarely we see such commitment.",
      right: "Rarely do we see such commitment.",
      body:
        "El verbo en presente o pasado simple no puede invertirse solo: aparece do/does/did y el verbo vuelve a su forma base.",
    },
    {
      kind: "examples",
      title: "Énfasis de verdad",
      items: [
        { en: "Never before had I seen such a mess.", es: "Nunca antes había visto semejante desastre." },
        { en: "Rarely do we see such commitment.", es: "Rara vez vemos tanto compromiso." },
        { en: "Under no circumstances should you sign it.", es: "Bajo ninguna circunstancia lo firmes." },
        { en: "Little did she know she was going to win.", es: "Poco se imaginaba que iba a ganar." },
      ],
    },
  ],

  "c1-inversion-2": [
    {
      kind: "idea",
      title: "Dos cosas casi a la vez",
      body:
        "«Hardly», «scarcely» y «no sooner» cuentan que algo pasó justo cuando acababa de ocurrir otra cosa. Van con past perfect invertido, y cada uno pide su conector.",
    },
    {
      kind: "table",
      title: "Cada uno con su pareja",
      head: ["Fórmula", "Conector"],
      rows: [
        ["Hardly had I arrived…", "…WHEN the phone rang"],
        ["Scarcely had we sat down…", "…WHEN it started"],
        ["No sooner had we left…", "…THAN it rained"],
        ["Only when I read it again…", "…did I notice"],
      ],
    },
    {
      kind: "pitfall",
      title: "«No sooner» va con «than», no con «when»",
      wrong: "No sooner had we left when it started to rain.",
      right: "No sooner had we left than it started to rain.",
      body:
        "«No sooner» es un comparativo (sooner = antes), y los comparativos piden «than». Hardly y scarcely, en cambio, van con «when».",
    },
    {
      kind: "examples",
      title: "Encadenar sucesos",
      items: [
        { en: "Hardly had I arrived when the phone rang.", es: "Apenas había llegado cuando sonó el teléfono." },
        { en: "No sooner had we left than it started to rain.", es: "Nada más salir, empezó a llover." },
        { en: "Only then did I realise the mistake.", es: "Solo entonces me di cuenta del error." },
        { en: "Not until later did we understand.", es: "No fue hasta más tarde cuando lo entendimos." },
      ],
    },
  ],

  "c1-inversion-3": [
    {
      kind: "idea",
      title: "Condicionales sin «if»",
      body:
        "En registro formal el «if» desaparece y se invierte: «Had I known», «Were I you», «Should you need». Es lo que verás en contratos, correos institucionales y literatura.",
    },
    {
      kind: "table",
      title: "Con «if» y sin él",
      head: ["Con if", "Formal (invertido)"],
      rows: [
        ["If I had known", "Had I known"],
        ["If I were you", "Were I you"],
        ["If you should need help", "Should you need help"],
        ["If it had not been for you", "Had it not been for you"],
      ],
    },
    {
      kind: "pitfall",
      title: "So + adjetivo, such + sustantivo",
      wrong: "So was the noise that we couldn't sleep.",
      right: "Such was the noise that we couldn't sleep. / So loud was the noise that…",
      body:
        "«Such» acompaña a un sustantivo y «so» a un adjetivo o adverbio. Al anteponerlos, la frase también se invierte.",
    },
    {
      kind: "examples",
      title: "Registro formal",
      items: [
        { en: "Had I known, I would have called.", es: "De haberlo sabido, habría llamado." },
        { en: "Should you need any help, just ask.", es: "Si necesitaras ayuda, solo pídela." },
        { en: "Were I you, I would think twice.", es: "Si yo fuera tú, me lo pensaría dos veces." },
        { en: "Such was the noise that we couldn't sleep.", es: "Tal era el ruido que no pudimos dormir." },
      ],
    },
  ],

  /* ---------------- Matices modales ---------------- */

  "c1-nuance-1": [
    {
      kind: "idea",
      title: "Modal + have + participio: juzgar el pasado",
      body:
        "Con esta combinación se opina sobre algo que ya ocurrió: deducirlo (must have), reprochar (might have, should have) o señalar que sobraba (needn't have). El matiz lo da el modal, no el verbo.",
    },
    {
      kind: "table",
      title: "Qué dice cada uno",
      head: ["Fórmula", "Significado"],
      rows: [
        ["must have forgotten", "deducción: seguro que se olvidó"],
        ["might have told us", "reproche: podría habérnoslo dicho"],
        ["should have studied", "arrepentimiento: debería haber"],
        ["needn't have paid", "lo hiciste y no hacía falta"],
        ["can't have been", "imposible que fuera"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Needn't have» no es «didn't need to»",
      wrong: "I didn't need to pay (queriendo decir que pagaste de más).",
      right: "I needn't have paid.",
      body:
        "«Needn't have paid» = pagaste y sobraba. «I didn't need to pay» = no hacía falta, y por eso no pagaste.",
    },
    {
      kind: "examples",
      title: "Opinar sobre lo ya hecho",
      items: [
        { en: "You needn't have paid: it was covered.", es: "No hacía falta que pagaras: estaba cubierto." },
        { en: "He might have told us!", es: "¡Podría habérnoslo dicho!" },
        { en: "She must have forgotten.", es: "Se le debe de haber olvidado." },
        { en: "I could have sworn I left the keys here.", es: "Habría jurado que dejé las llaves aquí." },
      ],
    },
  ],

  "c1-nuance-2": [
    {
      kind: "idea",
      title: "Medir la probabilidad con precisión",
      body:
        "Entre «puede» y «seguro» hay una escala entera. En C1 se espera que elijas el punto exacto: may well (bastante probable), be bound to (inevitable), be unlikely to (poco probable).",
    },
    {
      kind: "table",
      title: "De lo seguro a lo improbable",
      head: ["Fórmula", "Probabilidad"],
      rows: [
        ["is bound to happen", "inevitable"],
        ["there is every chance", "muy alta"],
        ["may well happen", "alta"],
        ["is unlikely to happen", "baja"],
        ["I doubt whether it will", "muy baja"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Likely» no funciona como en español",
      wrong: "It's likely that he arrives late. / He is likely arrive late.",
      right: "He is likely to arrive late. / It's likely that he will arrive late.",
      body:
        "«Be likely TO + base» o «it is likely THAT + will». Mezclar las dos estructuras es el fallo típico.",
    },
    {
      kind: "examples",
      title: "Afinar la apuesta",
      items: [
        { en: "It may well be the best option we have.", es: "Bien puede ser la mejor opción que tenemos." },
        { en: "With that traffic, he is bound to be late.", es: "Con ese tráfico, seguro que llega tarde." },
        { en: "She is unlikely to accept the offer.", es: "Es poco probable que acepte la oferta." },
        { en: "I doubt whether he will arrive on time.", es: "Dudo que llegue a tiempo." },
      ],
    },
  ],

  "c1-nuance-3": [
    {
      kind: "idea",
      title: "Cuanto más rodeo, más cortesía",
      body:
        "El inglés educado se construye alejando la petición: pasado en vez de presente, pregunta en vez de orden, condicional en vez de indicativo. «I was wondering whether you could…» es el extremo de esa escala.",
    },
    {
      kind: "table",
      title: "La escalera de la cortesía",
      head: ["Fórmula", "Nivel"],
      rows: [
        ["Open the window", "orden"],
        ["Can you open the window?", "neutro"],
        ["Could you open the window?", "educado"],
        ["Would you mind opening the window?", "muy educado"],
        ["I was wondering whether you could…", "formal máximo"],
      ],
    },
    {
      kind: "pitfall",
      title: "«I would appreciate it if» lleva «it»",
      wrong: "I would appreciate if you could reply today.",
      right: "I would appreciate it if you could reply today.",
      body:
        "El «it» es obligatorio y se cae siempre al traducir del español. Sin él, la frase suena incompleta a un nativo.",
    },
    {
      kind: "examples",
      title: "Pedir sin imponer",
      items: [
        { en: "I was wondering whether you could help.", es: "Me preguntaba si podrías ayudar." },
        { en: "Would you mind opening the window?", es: "¿Te importaría abrir la ventana?" },
        { en: "I would appreciate it if you could reply today.", es: "Te agradecería que respondieras hoy." },
        { en: "It would seem that there was a misunderstanding.", es: "Todo apunta a que hubo un malentendido." },
      ],
    },
  ],

  /* ---------------- Frases más compactas ---------------- */

  "c1-participle-1": [
    {
      kind: "idea",
      title: "Quitar palabras sin perder sentido",
      body:
        "«After she had finished the report, she went home» se comprime en «Having finished the report, she went home». El participio elimina sujeto y conector, y el resultado suena mucho más escrito.",
    },
    {
      kind: "table",
      title: "Qué participio toca",
      head: ["Forma", "Cuándo"],
      rows: [
        ["-ing (walking home)", "acción simultánea"],
        ["having + participio", "acción anterior"],
        ["participio (written in 1920)", "sentido pasivo"],
        ["being + adjetivo", "causa"],
        ["once/if + participio", "condición o tiempo"],
      ],
    },
    {
      kind: "pitfall",
      title: "El sujeto tiene que ser el mismo",
      wrong: "Walking home, the rain started.",
      right: "Walking home, I got caught in the rain.",
      body:
        "El participio se refiere al sujeto de la frase principal. Si no coinciden, sale una frase absurda (la lluvia andando a casa): es el «dangling participle».",
    },
    {
      kind: "examples",
      title: "Inglés escrito",
      items: [
        { en: "Having finished the report, she went home.", es: "Una vez terminado el informe, se fue a casa." },
        { en: "Walking home, I saw an old friend.", es: "Yendo a casa, vi a un viejo amigo." },
        { en: "Being new here, I don't know anyone.", es: "Al ser nuevo aquí, no conozco a nadie." },
        { en: "Once completed, the form must be signed.", es: "Una vez completado, el formulario debe firmarse." },
      ],
    },
  ],

  "c1-participle-2": [
    {
      kind: "idea",
      title: "Nominalizar: convertir verbos en sustantivos",
      body:
        "El registro formal prefiere sustantivos donde el hablado usa verbos: «they implemented it quickly» → «the implementation was rapid». Suena más denso y más objetivo, porque desaparece quién hizo qué.",
    },
    {
      kind: "table",
      title: "Verbo → sustantivo",
      head: ["Verbo", "Sustantivo"],
      rows: [
        ["implement", "implementation"],
        ["arrive", "arrival"],
        ["decide", "decision"],
        ["refuse", "refusal"],
        ["fail", "failure"],
        ["analyse", "analysis"],
      ],
    },
    {
      kind: "pitfall",
      title: "Cada sustantivo pide su preposición",
      wrong: "an increase of sales · the failure of comply",
      right: "an increase in sales · the failure to comply",
      body:
        "«Increase IN» algo (de qué sube), «increase OF» + cifra. «Failure TO + verbo», «failure OF + sustantivo». Se aprenden en bloque.",
    },
    {
      kind: "examples",
      title: "Tono de informe",
      items: [
        { en: "The implementation of the system was rapid.", es: "La implantación del sistema fue rápida." },
        { en: "There was an increase in sales.", es: "Hubo un aumento de ventas." },
        { en: "The failure to comply led to a fine.", es: "El incumplimiento acarreó una multa." },
        { en: "A lack of resources delayed the project.", es: "La falta de recursos retrasó el proyecto." },
      ],
    },
  ],

  "c1-participle-3": [
    {
      kind: "idea",
      title: "Conectores que casi nadie usa mal a propósito",
      body:
        "Given, notwithstanding, thereby, hence e insofar as son el vocabulario de los informes y las sentencias. Usados bien elevan el texto; usados de adorno, chirrían.",
    },
    {
      kind: "table",
      title: "Qué introduce cada uno",
      head: ["Conector", "Función"],
      rows: [
        ["given (that)", "causa asumida: dado que"],
        ["notwithstanding", "concesión: a pesar de"],
        ["thereby + -ing", "consecuencia dentro de la frase"],
        ["hence", "conclusión breve: de ahí"],
        ["insofar as", "límite: en la medida en que"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Hence» y «thereby» no llevan sujeto detrás",
      wrong: "Hence we can conclude that… (correcto) · Thereby the launch was delayed. (mal)",
      right: "…thereby delaying the launch.",
      body:
        "«Thereby» va seguido de -ing, no de una frase con sujeto. «Hence» sí puede abrir frase, pero se usa mejor con un sustantivo: hence the delay.",
    },
    {
      kind: "examples",
      title: "Registro alto",
      items: [
        { en: "Given the delay, we decided to postpone.", es: "Dado el retraso, decidimos aplazarlo." },
        { en: "The system failed, thereby delaying the launch.", es: "El sistema falló, con lo cual se retrasó el lanzamiento." },
        { en: "Notwithstanding the criticism, sales rose.", es: "A pesar de las críticas, las ventas subieron." },
        { en: "Costs went up; hence the price change.", es: "Los costes subieron; de ahí el cambio de precio." },
      ],
    },
  ],

  /* ---------------- Lenguaje idiomático ---------------- */

  "c1-idioms-1": [
    {
      kind: "idea",
      title: "Las expresiones no se traducen: se reconocen",
      body:
        "Un idiom significa algo distinto de la suma de sus palabras. No hay lógica que valga y casi nunca admiten cambios: se aprenden enteros, con su artículo y su preposición.",
    },
    {
      kind: "table",
      title: "Cinco que oirás esta semana",
      head: ["Expresión", "Significado"],
      rows: [
        ["get the hang of it", "cogerle el truco"],
        ["call it a day", "dejarlo por hoy"],
        ["out of the blue", "de la nada"],
        ["a blessing in disguise", "no hay mal que por bien no venga"],
        ["it's not rocket science", "no es tan difícil"],
      ],
    },
    {
      kind: "pitfall",
      title: "Ni una palabra de más ni de menos",
      wrong: "out of blue · get the hand of it · call it day",
      right: "out of the blue · get the hang of it · call it a day",
      body:
        "Cambiar un artículo rompe la expresión y delata al no nativo más que cualquier error de gramática.",
    },
    {
      kind: "examples",
      title: "En conversación",
      items: [
        { en: "You'll get the hang of it after a week.", es: "Le cogerás el truco en una semana." },
        { en: "Let's call it a day.", es: "Dejémoslo por hoy." },
        { en: "He quit out of the blue.", es: "Lo dejó de la nada." },
        { en: "Losing that job was a blessing in disguise.", es: "Perder ese trabajo fue una bendición." },
      ],
    },
  ],

  "c1-idioms-2": [
    {
      kind: "idea",
      title: "El inglés de oficina va lleno de imágenes",
      body:
        "Reuniones, correos y llamadas están plagados de expresiones fijas. Entenderlas no es opcional: «touch base», «on the same page» o «ballpark figure» aparecen a diario y no significan lo que parecen.",
    },
    {
      kind: "table",
      title: "Traducción real",
      head: ["Suena a", "Significa"],
      rows: [
        ["touch base", "hablar brevemente para ponerse al día"],
        ["on the same page", "entender todos lo mismo"],
        ["a ballpark figure", "una cifra aproximada"],
        ["the bottom line", "lo esencial, la conclusión"],
        ["hit the nail on the head", "dar en el clavo"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Touch base» no lleva artículo ni plural",
      wrong: "Let's touch the base. / Let's touch bases next week.",
      right: "Let's touch base next week.",
      body:
        "Viene del béisbol y va fijo. Con persona: «touch base WITH you».",
    },
    {
      kind: "examples",
      title: "En una reunión",
      items: [
        { en: "Let's touch base next week.", es: "Hablamos la semana que viene para ponernos al día." },
        { en: "Can you give me a ballpark figure?", es: "¿Me das una cifra aproximada?" },
        { en: "We need everyone on the same page.", es: "Necesitamos que todos estemos alineados." },
        { en: "You hit the nail on the head.", es: "Diste en el clavo." },
      ],
    },
  ],

  "c1-idioms-3": [
    {
      kind: "idea",
      title: "Hablar de problemas sin dramatizar",
      body:
        "Cuando algo sale mal, el inglés recurre a imágenes hechas: volver a empezar, un aviso, una chapuza, la gota que colma el vaso. Usarlas bien te ahorra tres frases de explicación.",
    },
    {
      kind: "table",
      title: "Cuando la cosa se tuerce",
      head: ["Expresión", "Significado"],
      rows: [
        ["back to square one", "vuelta a empezar de cero"],
        ["a wake-up call", "aviso que obliga a reaccionar"],
        ["to cut corners", "ahorrar saltándose pasos"],
        ["the last straw", "la gota que colma el vaso"],
        ["to take the blame", "asumir la culpa"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Cut corners» siempre es negativo",
      wrong: "We cut corners and finished early — great work! (como elogio)",
      right: "We cut corners, and it shows in the quality.",
      body:
        "No significa optimizar: significa hacerlo peor por ahorrar. Para lo positivo, «streamline» o «save time».",
    },
    {
      kind: "examples",
      title: "Contar un problema",
      items: [
        { en: "The client rejected it, so we're back to square one.", es: "El cliente lo rechazó, así que vuelta a empezar." },
        { en: "The incident was a wake-up call.", es: "El incidente fue un toque de atención." },
        { en: "That was the last straw.", es: "Esa fue la gota que colmó el vaso." },
        { en: "Someone has to take the blame.", es: "Alguien tiene que asumir la culpa." },
      ],
    },
  ],

  /* ---------------- Registro académico ---------------- */

  "c1-academic-1": [
    {
      kind: "idea",
      title: "Afirmar apoyándose en algo",
      body:
        "En un texto académico casi nada se afirma en primera persona: se atribuye a los datos, al consenso o a un estudio. Eso exige un puñado de fórmulas fijas que conviene tener memorizadas.",
    },
    {
      kind: "table",
      title: "Fórmulas de apertura",
      head: ["Fórmula", "Uso"],
      rows: [
        ["It is widely acknowledged that…", "consenso"],
        ["The data suggest that…", "evidencia propia"],
        ["According to X…", "fuente ajena"],
        ["A growing body of research…", "tendencia"],
        ["To date, little is known about…", "hueco de conocimiento"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Data» y «research» no se comportan como en español",
      wrong: "The data shows… / According to me… / many researches",
      right: "The data suggest… / In my view… / much research",
      body:
        "«Data» es plural en registro cuidado, «research» es incontable y «according to» nunca se usa con uno mismo.",
    },
    {
      kind: "examples",
      title: "Abrir un párrafo",
      items: [
        { en: "It is widely acknowledged that sleep affects memory.", es: "Está ampliamente admitido que el sueño afecta a la memoria." },
        { en: "The data suggest a clear pattern.", es: "Los datos apuntan a un patrón claro." },
        { en: "According to the study, prices rose.", es: "Según el estudio, los precios subieron." },
        { en: "A growing body of research supports this idea.", es: "Cada vez más estudios respaldan esta idea." },
      ],
    },
  ],

  "c1-academic-2": [
    {
      kind: "idea",
      title: "Afirmar sin cerrarse puertas",
      body:
        "Un texto académico afirma con cuidado: «arguably», «may be attributed to», «to a large extent». No es cobardía: es reconocer los límites de lo que se puede demostrar.",
    },
    {
      kind: "table",
      title: "Matizadores útiles",
      head: ["Expresión", "Qué hace"],
      rows: [
        ["arguably", "afirma fuerte, deja debate"],
        ["to a large extent", "acota el alcance"],
        ["may be attributed to", "sugiere causa sin acusar"],
        ["with the exception of", "excluye casos"],
        ["further research is needed", "cierre honesto"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Attributed» pide «to», y en pasiva",
      wrong: "The delay may attribute to poor planning.",
      right: "The delay may be attributed to poor planning.",
      body:
        "El retraso no atribuye nada: es atribuido. Pasiva + «to», siempre.",
    },
    {
      kind: "examples",
      title: "Escribir con prudencia",
      items: [
        { en: "This is arguably the most important factor.", es: "Este es posiblemente el factor más importante." },
        { en: "The delay may be attributed to poor planning.", es: "El retraso puede deberse a una mala planificación." },
        { en: "With the exception of two cases, all recovered.", es: "Con la excepción de dos casos, todos se recuperaron." },
        { en: "Further research is needed.", es: "Hace falta más investigación." },
      ],
    },
  ],

  "c1-academic-3": [
    {
      kind: "idea",
      title: "Comparar, sumar y cerrar",
      body:
        "La última pieza del texto académico es el andamiaje: contrastar (in contrast to), añadir en la misma línea (likewise), sopesar (on balance) y concluir (in conclusion).",
    },
    {
      kind: "table",
      title: "El andamiaje",
      head: ["Función", "Expresión"],
      rows: [
        ["Contrastar", "in contrast to / by contrast"],
        ["Añadir igual", "likewise / similarly"],
        ["Sopesar", "on balance"],
        ["Resultados", "the findings indicate"],
        ["Cerrar", "in conclusion / to conclude"],
      ],
    },
    {
      kind: "pitfall",
      title: "«In resume» no existe",
      wrong: "In resume, the results are positive.",
      right: "In conclusion / To sum up, the results are positive.",
      body:
        "«Resume» es un currículum (en EE. UU.) o reanudar. Para resumir: «to sum up», «in short», «in conclusion».",
    },
    {
      kind: "examples",
      title: "Cerrar un texto",
      items: [
        { en: "In contrast to the previous study, ours used a larger sample.", es: "A diferencia del estudio anterior, el nuestro usó una muestra mayor." },
        { en: "Likewise, sales dropped in Asia.", es: "Asimismo, las ventas cayeron en Asia." },
        { en: "On balance, the benefits outweigh the risks.", es: "En conjunto, los beneficios superan a los riesgos." },
        { en: "The findings indicate a clear improvement.", es: "Los resultados indican una mejora clara." },
      ],
    },
  ],

  /* ---------------- Precisión léxica ---------------- */

  "c1-precision-1": [
    {
      kind: "idea",
      title: "Elegir el verbo es tomar postura",
      body:
        "«Say» no compromete; «claim» insinúa duda; «admit» sugiere que costó; «point out» da por hecho que es cierto. En C1 se espera que la elección sea deliberada.",
    },
    {
      kind: "table",
      title: "Qué añade cada verbo",
      head: ["Verbo", "Matiz"],
      rows: [
        ["state / say", "neutro"],
        ["claim", "lo dice él, sin pruebas"],
        ["argue", "lo defiende con razones"],
        ["admit / acknowledge", "reconoce algo incómodo"],
        ["point out", "señala un hecho aceptado"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Deny» y «refuse» no son lo mismo",
      wrong: "He denied to pay the fine.",
      right: "He refused to pay the fine. / He denied paying the fine.",
      body:
        "«Refuse to + base» = negarse a hacerlo. «Deny + -ing» = negar que lo hicieras. Cambia por completo lo que estás contando.",
    },
    {
      kind: "examples",
      title: "Reportar con matiz",
      items: [
        { en: "He denied seeing the document.", es: "Negó haber visto el documento." },
        { en: "She refused to pay the fine.", es: "Se negó a pagar la multa." },
        { en: "The company claimed it was an error.", es: "La empresa afirmó que fue un error." },
        { en: "She pointed out that the data were incomplete.", es: "Señaló que los datos estaban incompletos." },
      ],
    },
  ],

  "c1-precision-2": [
    {
      kind: "idea",
      title: "Parejas que suenan igual y no lo son",
      body:
        "Affect/effect, economic/economical, sensible/sensitive, assure/ensure/insure. Un nativo las distingue sin pensar; para un hispanohablante son trampas, y algunas además son falsos amigos.",
    },
    {
      kind: "table",
      title: "La diferencia, en corto",
      head: ["Par", "Diferencia"],
      rows: [
        ["affect / effect", "verbo / sustantivo"],
        ["economic / economical", "de la economía / que ahorra"],
        ["sensible / sensitive", "sensato / sensible"],
        ["historic / historical", "memorable / del pasado"],
        ["assure / ensure / insure", "tranquilizar / garantizar / asegurar (póliza)"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Sensible» es el falso amigo más caro",
      wrong: "She is very sensible about criticism. (queriendo decir que le afecta)",
      right: "She is very sensitive about criticism.",
      body:
        "Decir que alguien es «sensible» en inglés es decir que es sensato. Lo que se conmueve es «sensitive».",
    },
    {
      kind: "examples",
      title: "Cada una en su sitio",
      items: [
        { en: "The decision will affect everyone.", es: "La decisión afectará a todos." },
        { en: "The effect was immediate.", es: "El efecto fue inmediato." },
        { en: "Buying in bulk is more economical.", es: "Comprar a granel sale más barato." },
        { en: "This ensures that everyone receives the email.", es: "Esto garantiza que todos reciban el correo." },
      ],
    },
  ],

  "c1-precision-3": [
    {
      kind: "idea",
      title: "Colocaciones: qué palabra va con cuál",
      body:
        "«Heavy rain», «strong wind», «deeply concerned», «raise awareness». No hay regla: son parejas que el oído nativo espera. Fallarlas se entiende igual, pero suena a traducción.",
    },
    {
      kind: "table",
      title: "Intensificadores por adjetivo",
      head: ["Adjetivo", "Va con"],
      rows: [
        ["concerned", "deeply concerned"],
        ["unlikely", "highly unlikely"],
        ["opposed", "strongly opposed"],
        ["rain / traffic", "heavy"],
        ["wind / accent", "strong"],
      ],
    },
    {
      kind: "pitfall",
      title: "«Raise» lleva objeto; «rise», no",
      wrong: "Prices raised last year. / They rised awareness.",
      right: "Prices rose last year. / They raised awareness.",
      body:
        "«Rise» (rose, risen) sube solo: prices rise. «Raise» (raised) necesita a alguien que suba algo: raise prices, raise awareness.",
    },
    {
      kind: "examples",
      title: "Combinaciones naturales",
      items: [
        { en: "There was heavy rain all night.", es: "Hubo lluvia intensa toda la noche." },
        { en: "The campaign aims to raise awareness.", es: "La campaña busca concienciar." },
        { en: "We are deeply concerned about the results.", es: "Estamos profundamente preocupados por los resultados." },
        { en: "It was a heated debate.", es: "Fue un debate acalorado." },
      ],
    },
  ],
};
