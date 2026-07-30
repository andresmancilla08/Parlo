import type { Cefr } from "@/lib/curriculum/types";

// Entrenador de conversación: escenarios y forma de la respuesta del modelo.
// El texto que ve el usuario (títulos) sale de i18n; lo que va al modelo está
// en inglés a propósito: el prompt funciona mejor en el idioma que va a hablar.

export type CoachCorrection = {
  original: string;
  corrected: string;
  /** El porqué, SIEMPRE en español (es el diferenciador de Parlo). */
  why: string;
  examples: string[];
};

export type CoachTurn = {
  corrections: CoachCorrection[];
  reply: string;
};

export type Scenario = {
  id: string;
  level: Cefr;
  /** Papel que interpreta la IA. */
  roleEn: string;
  situationEn: string;
  /** Primer mensaje, para que la conversación no empiece en blanco. */
  openerEn: string;
  /**
   * Briefing: se enseña ANTES de conversar (misma regla que las lecciones).
   * Frases que de verdad hacen falta en esa situación, con su traducción.
   */
  prep: { en: string; es: string }[];
  /** Consejo en español para no quedarse en blanco. */
  tipEs: string;
};

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    level: "A1",
    roleEn: "a friendly barista in a busy London coffee shop",
    situationEn: "the user is ordering a coffee and something to eat",
    openerEn: "Hi there! What can I get you today?",
    prep: [
      { en: "Can I have a flat white, please?", es: "¿Me pones un flat white, por favor?" },
      { en: "To take away, please.", es: "Para llevar, por favor." },
      { en: "Anything else? — No, that's all, thanks.", es: "¿Algo más? — No, eso es todo, gracias." },
    ],
    tipEs:
      "Pide con «Can I have…?» o «I'd like…», nunca con «I want». Y si no entiendes al camarero, «Sorry, could you repeat that?» te salva.",
  },
  {
    id: "intro",
    level: "A1",
    roleEn: "a new colleague meeting the user for the first time",
    situationEn: "small talk: names, where you are from, what you do",
    openerEn: "Hi! I don't think we've met. I'm Sam — what's your name?",
    prep: [
      { en: "Nice to meet you. I'm Ana.", es: "Encantada. Soy Ana." },
      { en: "I'm from Colombia. And you?", es: "Soy de Colombia. ¿Y tú?" },
      { en: "I work as a designer.", es: "Trabajo de diseñadora." },
    ],
    tipEs:
      "Devuelve siempre la pregunta con «And you?»: en inglés la conversación se sostiene entre los dos, no la lleva uno solo.",
  },
  {
    id: "travel",
    level: "A2",
    roleEn: "an airline agent at the check-in desk",
    situationEn: "the user is checking in for a flight and asking about luggage",
    openerEn: "Good morning! May I see your passport, please?",
    prep: [
      { en: "Here's my passport.", es: "Aquí tiene mi pasaporte." },
      { en: "I have one bag to check in.", es: "Tengo una maleta para facturar." },
      { en: "Could I have a window seat?", es: "¿Me podría dar ventanilla?" },
    ],
    tipEs:
      "En el aeropuerto casi todo se resuelve con «Could I…?» y «Where is…?». Si te hablan rápido: «Sorry, I didn't catch that».",
  },
  {
    id: "doctor",
    level: "A2",
    roleEn: "a doctor at a walk-in clinic",
    situationEn: "the user explains a health problem and answers questions",
    openerEn: "Come in, please. What seems to be the problem?",
    prep: [
      { en: "I've had a headache since Monday.", es: "Tengo dolor de cabeza desde el lunes." },
      { en: "It hurts when I move.", es: "Me duele cuando me muevo." },
      { en: "I'm allergic to penicillin.", es: "Soy alérgico a la penicilina." },
    ],
    tipEs:
      "Para síntomas se usa «I've got» o «I have» + el síntoma, y «since» + cuándo empezó. Ojo: «I'm constipated» NO es estar resfriado.",
  },
  {
    id: "interview",
    level: "B1",
    roleEn: "a hiring manager interviewing the user for a job",
    situationEn: "a job interview: experience, strengths, why this role",
    openerEn: "Thanks for coming in. So, tell me a little about yourself.",
    prep: [
      { en: "I've been working in marketing for five years.", es: "Llevo cinco años trabajando en marketing." },
      { en: "My greatest strength is that I'm organised.", es: "Mi mayor punto fuerte es que soy organizado." },
      { en: "I'm looking for a new challenge.", es: "Busco un nuevo reto." },
    ],
    tipEs:
      "Habla de tu experiencia con «I've been + -ing» y en positivo: di qué buscas, no de qué huyes.",
  },
  {
    id: "flat",
    level: "B1",
    roleEn: "a landlord showing a flat to the user",
    situationEn: "the user asks about the flat, the rent and the neighbourhood",
    openerEn: "So this is the living room. What do you think?",
    prep: [
      { en: "How much is the rent per month?", es: "¿Cuánto es el alquiler al mes?" },
      { en: "Are bills included?", es: "¿Están incluidos los gastos?" },
      { en: "Is there a supermarket nearby?", es: "¿Hay un supermercado cerca?" },
    ],
    tipEs:
      "Para preguntar precios, «how much»; para cantidades contables, «how many». Y «bills» son luz, agua y gas, no facturas del banco.",
  },
  {
    id: "negotiation",
    level: "B2",
    roleEn: "a supplier negotiating a contract with the user",
    situationEn:
      "the user negotiates price, deadlines and terms, pushing back politely",
    openerEn:
      "Thanks for your time. I've looked at your proposal — I'm afraid the price is higher than we expected.",
    prep: [
      { en: "That's higher than we had in mind.", es: "Es más de lo que teníamos previsto." },
      { en: "Would you be flexible on the deadline?", es: "¿Tendrías flexibilidad con el plazo?" },
      { en: "I'd rather we agreed on a fixed fee.", es: "Preferiría que acordáramos una tarifa fija." },
    ],
    tipEs:
      "Negociar en inglés es suavizar: «that's a bit high» en vez de «that's expensive», y «would you be able to…?» en vez de «you must». Cuanto más rodeo, más firme puedes ser sin romper nada.",
  },
  {
    id: "debate",
    level: "C1",
    roleEn: "a journalist interviewing the user about a controversial topic",
    situationEn:
      "the user defends an opinion, concedes points and rebuts arguments",
    openerEn:
      "Many people would say remote work has damaged company culture. What's your take on that?",
    prep: [
      { en: "That's arguably true, but only to some extent.", es: "Eso es posiblemente cierto, pero solo hasta cierto punto." },
      { en: "I take your point, however the data suggest otherwise.", es: "Entiendo tu argumento, sin embargo los datos apuntan a lo contrario." },
      { en: "It may well be the case in large firms.", es: "Bien puede ser el caso en empresas grandes." },
    ],
    tipEs:
      "En un debate en inglés se concede antes de rebatir («I take your point, but…»). Ir de frente sin conceder suena agresivo y resta credibilidad, aunque tengas razón.",
  },
];

export function scenarioById(id: string | null): Scenario | null {
  return SCENARIOS.find((s) => s.id === id) ?? null;
}
