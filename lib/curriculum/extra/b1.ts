import type { ExtraMap } from "./index";

// Ejercicios adicionales de B1: tres por lección, para pasar de 5 a 8.
export const b1Extra: ExtraMap = {
  /* ---------------- Condicionales ---------------- */

  "b1-conditionals-1": [
    {
      kind: "choose",
      prompt: "«As soon as I ___ home, I'll call you.»",
      options: ["get", "will get", "got", "am getting"],
      answer: "get",
      explain:
        "Tras as soon as, when, until y after va PRESENTE aunque hables del futuro, igual que tras «if».",
      speak: "As soon as I get home, I'll call you.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Si no llueve, iremos a la playa»",
      answer: "if it doesn't rain we will go to the beach",
      bank: ["if", "it", "doesn't", "rain", "we", "will", "go", "to", "the", "beach", "won't"],
      explain: "La negación va en la parte del «if», en presente: if it doesn't rain.",
    },
    {
      kind: "type",
      prompt: "Completa: «It ___ ___ the weather» (depende de, 2 palabras)",
      answer: ["depends on"],
      explain: "«Depend ON», nunca «depend of»: es calco directo del español.",
    },
  ],

  "b1-conditionals-2": [
    {
      kind: "choose",
      prompt: "«What would you do if you ___ the lottery?»",
      options: ["won", "win", "would win", "have won"],
      answer: "won",
      explain: "Segundo condicional: tras «if» va pasado simple, aunque hables de algo imaginario.",
      speak: "What would you do if you won the lottery?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Si tuviera coche, iría al trabajo conduciendo»",
      answer: "if I had a car I would drive to work",
      bank: ["if", "I", "had", "a", "car", "I", "would", "drive", "to", "work", "have"],
      explain: "if + pasado (had) / would + base (drive). El «would» nunca entra en el «if».",
    },
    {
      kind: "type",
      prompt: "Contracción de «I would»:",
      answer: ["I'd", "id"],
      explain: "I would → I'd. Ojo: «I'd» también es «I had»; lo distingue lo que venga detrás.",
    },
  ],

  "b1-conditionals-3": [
    {
      kind: "choose",
      prompt: "«You ___ told me!» (reproche: y no lo hiciste)",
      options: ["should have", "should", "must have", "would"],
      answer: "should have",
      explain: "«Should have + participio» reprocha algo que no se hizo: deberías habérmelo dicho.",
      speak: "You should have told me!",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Si hubiéramos salido antes, habríamos cogido el tren»",
      answer: "if we had left earlier we would have caught the train",
      bank: [
        "if","we","had","left","earlier","we","would","have","caught","the","train","would","catch",
      ],
      explain:
        "Tercer condicional: had + participio en la condición, would have + participio en el resultado.",
    },
    {
      kind: "type",
      prompt: "Escribe: «Ojalá pudiera» (3 palabras, con «wish»)",
      answer: ["I wish I could"],
      explain: "Tras «wish», el verbo retrocede: can → could.",
    },
  ],

  /* ---------------- Contar historias ---------------- */

  "b1-stories-1": [
    {
      kind: "choose",
      prompt: "«While she ___, the baby woke up.»",
      options: ["was sleeping", "slept", "sleeps", "had slept"],
      answer: "was sleeping",
      explain: "«While» pide la acción larga de fondo: pasado continuo.",
      speak: "While she was sleeping, the baby woke up.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «¿Qué estabas haciendo a las diez?»",
      answer: "what were you doing at ten?",
      bank: ["what", "were", "you", "doing", "at", "ten?", "was", "did"],
      explain: "Pasado continuo en pregunta: were + sujeto + -ing. Y la hora con «at».",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «mientras» (una palabra, para acciones simultáneas)",
      answer: ["while"],
      explain: "«While» + acción larga. «When» suele ir con la acción corta que interrumpe.",
    },
  ],

  "b1-stories-2": [
    {
      kind: "choose",
      prompt: "«She told me she ___ the book already.»",
      options: ["had read", "read", "has read", "was reading"],
      answer: "had read",
      explain:
        "Lo que ocurrió ANTES de otro momento pasado va en past perfect: había leído.",
      speak: "She told me she had read the book already.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Cuando llegué, ya habían empezado»",
      answer: "when I arrived they had already started",
      bank: ["when", "I", "arrived", "they", "had", "already", "started", "have", "start"],
      explain: "«Already» va entre «had» y el participio. Primero empezaron ellos, luego llegué yo.",
    },
    {
      kind: "type",
      prompt: "Past perfect de «eat»: «I ___ ___ before the meeting» (2 palabras)",
      answer: ["had eaten"],
      explain: "had + participio: eat → eaten.",
    },
  ],

  "b1-stories-3": [
    {
      kind: "choose",
      prompt: "«___ you use to smoke?»",
      options: ["Did", "Do", "Were", "Have"],
      answer: "Did",
      explain:
        "En pregunta también se usa «did + use to» (sin -d): Did you use to smoke?",
      speak: "Did you use to smoke?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Antes leía más»",
      answer: "I used to read more",
      bank: ["I", "used", "to", "read", "more", "use", "am"],
      explain: "«Used to + base» deja claro que ya no lo haces. «I read more» no diría eso.",
    },
    {
      kind: "type",
      prompt: "Completa: «It's hard at first, but you'll ___ ___ ___ it» (acostumbrarte, 3 palabras)",
      answer: ["get used to"],
      explain: "«Get used to + -ing/sustantivo» = acostumbrarse. Distinto de «used to + base».",
    },
  ],

  /* ---------------- Obligación, consejo y probabilidad ---------------- */

  "b1-modals-1": [
    {
      kind: "choose",
      prompt: "«You ___ wear a helmet on this site.» (norma escrita)",
      options: ["must", "have", "should to", "can"],
      answer: "must",
      explain:
        "«Must» es la obligación de las normas y los carteles; «have to», la de la vida diaria.",
      speak: "You must wear a helmet on this site.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «No hace falta que vengas»",
      answer: "you don't have to come",
      bank: ["you", "don't", "have", "to", "come", "mustn't", "must"],
      explain:
        "«Don't have to» = no es necesario. Con «mustn't» estarías prohibiéndole venir.",
    },
    {
      kind: "type",
      prompt: "Escribe la pregunta: «¿Tengo que reservar?» (4 palabras + book)",
      answer: ["do I have to book", "do I have to book?"],
      explain: "«Have to» sí necesita «do» para preguntar; los modales puros no.",
    },
  ],

  "b1-modals-2": [
    {
      kind: "choose",
      prompt: "«___ about going to the cinema?»",
      options: ["How", "Why", "What if", "Should"],
      answer: "How",
      explain: "«How about» / «What about» + -ing. Con «why don't you» iría el verbo base.",
      speak: "How about going to the cinema?",
    },
    {
      kind: "bank",
      prompt: "Traduce: «No deberías trabajar tanto»",
      answer: "you shouldn't work so much",
      bank: ["you", "shouldn't", "work", "so", "much", "too", "don't"],
      explain: "«So much» = tanto. «Too much» sería demasiado, con matiz de queja.",
    },
    {
      kind: "type",
      prompt: "Escribe la sugerencia: «¿Por qué no descansas?» (5 palabras)",
      answer: ["why don't you take a break", "why don't you rest"],
      explain: "«Why don't you + base». Es sugerencia, no reproche.",
    },
  ],

  "b1-modals-3": [
    {
      kind: "choose",
      prompt: "«She ___ be tired: she only slept three hours.»",
      options: ["must", "might", "can't", "should"],
      answer: "must",
      explain: "Deducción casi segura por una prueba clara → «must be».",
      speak: "She must be tired: she only slept three hours.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Puede que no venga»",
      answer: "he might not come",
      bank: ["he", "might", "not", "come", "doesn't", "to"],
      explain: "El negativo de «might» es «might not», sin «don't» y sin «to».",
    },
    {
      kind: "type",
      prompt: "Escribe: «No puede ser verdad» (4 palabras)",
      answer: ["it can't be true", "that can't be true"],
      explain: "Imposibilidad → «can't be», nunca «mustn't be».",
    },
  ],

  /* ---------------- Opiniones y conversación ---------------- */

  "b1-opinions-1": [
    {
      kind: "choose",
      prompt: "«___ my point of view, it's a mistake.»",
      options: ["From", "Under", "In", "At"],
      answer: "From",
      explain:
        "«From my point of view» o «in my opinion». «Under my point of view» es calco del español y no existe.",
      speak: "From my point of view, it's a mistake.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Para ser sincero, no me convence»",
      answer: "to be honest I'm not convinced",
      bank: ["to", "be", "honest", "I'm", "not", "convinced", "am", "don't"],
      explain: "«I'm not convinced» suaviza el rechazo; decir «it's bad» sonaría tajante.",
    },
    {
      kind: "type",
      prompt: "Completa: «I ___ so» (yo diría que sí, una palabra informal)",
      answer: ["reckon", "think"],
      explain: "«I reckon» es muy británico y coloquial; «I think» vale en cualquier registro.",
    },
  ],

  "b1-opinions-2": [
    {
      kind: "choose",
      prompt: "«I'm tired.» — «___ am I.»",
      options: ["So", "Neither", "Too", "Also"],
      answer: "So",
      explain:
        "En afirmativo: So + auxiliar + sujeto. Como la frase lleva «am», se repite: So am I.",
      speak: "So am I.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Depende del día»",
      answer: "it depends on the day",
      bank: ["it", "depends", "on", "the", "day", "of", "depend"],
      explain: "«It depends ON». Y lleva -s porque el sujeto es «it».",
    },
    {
      kind: "type",
      prompt: "Escribe: «Estoy totalmente de acuerdo» (3 palabras)",
      answer: ["I totally agree", "I completely agree", "I fully agree"],
      explain: "«Agree» es verbo: nada de «I'm totally agree».",
    },
  ],

  "b1-opinions-3": [
    {
      kind: "choose",
      prompt: "«___ of the rain, we went out.»",
      options: ["In spite", "Despite", "Although", "Even"],
      answer: "In spite",
      explain:
        "«In spite OF» lleva «of»; «despite» va solo. Mezclarlos («despite of») es el error clásico.",
      speak: "In spite of the rain, we went out.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Aunque estaba cansado, terminé el trabajo»",
      answer: "although I was tired I finished the work",
      bank: ["although", "I", "was", "tired", "I", "finished", "the", "work", "despite"],
      explain: "«Although» + sujeto + verbo. Con «despite» habría que decir «despite being tired».",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «debido a» (2 palabras)",
      answer: ["because of", "due to", "owing to"],
      explain: "«Because of» + sustantivo. Con frase completa se usa «because» a secas.",
    },
  ],

  /* ---------------- Trabajo y estudios ---------------- */

  "b1-work-1": [
    {
      kind: "choose",
      prompt: "«I'm responsible ___ the whole team.»",
      options: ["for", "of", "to", "about"],
      answer: "for",
      explain: "«Responsible FOR something/someone». «Responsible of» no existe.",
      speak: "I'm responsible for the whole team.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Llevo seis meses buscando trabajo»",
      answer: "I have been looking for a job for six months",
      bank: [
        "I","have","been","looking","for","a","job","for","six","months","since","look",
      ],
      explain:
        "have been + -ing (sigue pasando) y «for» + duración. Ojo a los dos «for»: uno es de «look for».",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «jornada completa» (una palabra con guion)",
      answer: ["full-time", "full time"],
      explain: "full-time / part-time. Como adjetivo van con guion: a full-time job.",
    },
  ],

  "b1-work-2": [
    {
      kind: "choose",
      prompt: "«I have experience ___ customer service.»",
      options: ["in", "on", "of", "with"],
      answer: "in",
      explain: "«Experience IN» un campo. «Experience OF» algo vivido, y «experience with» una herramienta.",
      speak: "I have experience in customer service.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Trabajé en una startup durante dos años»",
      answer: "I worked at a startup for two years",
      bank: ["I", "worked", "at", "a", "startup", "for", "two", "years", "in", "during"],
      explain:
        "«Work AT» una empresa concreta. Y duración con «for», no con «during» (que va con periodos: during the summer).",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «trabajo en equipo» (una palabra)",
      answer: ["teamwork"],
      explain: "«Teamwork» es el sustantivo; «work in a team» es la acción.",
    },
  ],

  "b1-work-3": [
    {
      kind: "choose",
      prompt: "«We need to ___ this problem today.» (ocuparnos de)",
      options: ["deal with", "deal", "deal of", "make with"],
      answer: "deal with",
      explain: "«Deal with» = ocuparse de, gestionar. No se separa.",
      speak: "We need to deal with this problem today.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Cancelaron la reunión»",
      answer: "they called off the meeting",
      bank: ["they", "called", "off", "the", "meeting", "cancel", "on"],
      explain: "«Call off» = cancelar. También «they called the meeting off».",
    },
    {
      kind: "type",
      prompt: "Escribe en inglés: «rellenar un formulario» (verbo + partícula, 2 palabras)",
      answer: ["fill in", "fill out"],
      explain: "«Fill in» (británico) o «fill out» (americano) a form. Con pronombre: fill it in.",
    },
  ],

  /* ---------------- Contar lo que dijeron ---------------- */

  "b1-reported-1": [
    {
      kind: "choose",
      prompt: "«I have finished» → «He said he ___ finished.»",
      options: ["had", "has", "have", "was"],
      answer: "had",
      explain: "Al reportar, el presente perfecto retrocede a past perfect: have → had.",
      speak: "He said he had finished.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Me dijo que estaba ocupada»",
      answer: "she told me she was busy",
      bank: ["she", "told", "me", "she", "was", "busy", "said", "is"],
      explain: "«Tell» lleva persona detrás (told me). Y «is» retrocede a «was».",
    },
    {
      kind: "type",
      prompt: "Reporta «I can help»: «He said he ___ help» (una palabra)",
      answer: ["could"],
      explain: "can → could al reportar, igual que will → would.",
    },
  ],

  "b1-reported-2": [
    {
      kind: "choose",
      prompt: "«Do you like the film?» → «She asked me ___ I liked the film.»",
      options: ["if", "that", "what", "do"],
      answer: "if",
      explain: "Las preguntas de sí/no se reportan con «if» o «whether». Y desaparece el «do».",
      speak: "She asked me if I liked the film.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Quería saber cuándo empezaba»",
      answer: "she wanted to know when it started",
      bank: ["she", "wanted", "to", "know", "when", "it", "started", "did", "start"],
      explain: "Sin inversión ni «did»: when it STARTED, como una frase normal.",
    },
    {
      kind: "type",
      prompt: "Reporta «Can you help me?»: «He asked ___ I could help» (una palabra)",
      answer: ["if", "whether"],
      explain: "«Whether» es la variante formal, obligatoria antes de «or not».",
    },
  ],

  "b1-reported-3": [
    {
      kind: "choose",
      prompt: "«The room ___ every day.» (se limpia)",
      options: ["is cleaned", "cleans", "is cleaning", "clean"],
      answer: "is cleaned",
      explain: "Presente pasivo: is/are + participio. El «se» español aquí es pasiva.",
      speak: "The room is cleaned every day.",
    },
    {
      kind: "bank",
      prompt: "Traduce: «Estos coches se fabrican en Japón»",
      answer: "these cars are made in Japan",
      bank: ["these", "cars", "are", "made", "in", "Japan", "is", "make"],
      explain: "«Cars» es plural → «are made». make → made.",
    },
    {
      kind: "type",
      prompt: "Pasa a pasiva «Someone stole my bike»: «My bike ___ ___» (2 palabras)",
      answer: ["was stolen"],
      explain:
        "El objeto pasa a sujeto y «someone» desaparece: no aporta nada. steal → stole → stolen.",
    },
  ],
};
