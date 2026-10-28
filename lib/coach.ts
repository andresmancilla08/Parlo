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
  /** Va PRIMERO en el esquema: es lo que se lee en voz alta mientras llega lo demás. */
  reply: string;
  /** Ids de misiones del escenario que el usuario cumplió en este turno. */
  goalsMet: string[];
  corrections: CoachCorrection[];
};

/** Resumen al cerrar la conversación (`mode: "summary"`). */
export type CoachSummary = {
  /** Errores que se repitieron: el patrón explicado en español y la forma buena. */
  mistakes: { pattern: string; fix: string }[];
  /** Palabras o frases útiles de la charla, con su traducción, para el repaso. */
  phrases: { en: string; es: string }[];
  /** Nota breve en español: qué salió bien y en qué fijarse. */
  note: string;
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
  /**
   * Misiones (2-3): lo que el usuario debería conseguir en la charla. `en` va
   * al modelo para que diga cuál se cumplió; el texto visible está en i18n
   * (`practica.mission_<escenario>_<id>`).
   */
  goals: { id: string; en: string }[];
  // El consejo para no quedarse en blanco vive en i18n: `practica.tip_<id>`.
};

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    level: "A1",
    roleEn: "a friendly barista in a busy London coffee shop",
    situationEn: "the user is ordering a coffee and something to eat",
    openerEn: "Hi there! What can I get you today?",
    goals: [
      { id: "order", en: "order a drink" },
      { id: "food", en: "order something to eat" },
      { id: "takeaway", en: "say whether it is to take away or to have in" },
    ],
    prep: [
      { en: "Can I have a flat white, please?", es: "¿Me pones un flat white, por favor?" },
      { en: "To take away, please.", es: "Para llevar, por favor." },
      { en: "Anything else? — No, that's all, thanks.", es: "¿Algo más? — No, eso es todo, gracias." },
    ],
  },
  {
    id: "intro",
    level: "A1",
    roleEn: "a new colleague meeting the user for the first time",
    situationEn: "small talk: names, where you are from, what you do",
    openerEn: "Hi! I don't think we've met. I'm Sam — what's your name?",
    goals: [
      { id: "name", en: "say their name" },
      { id: "origin", en: "say where they are from" },
      { id: "job", en: "say what they do for work" },
    ],
    prep: [
      { en: "Nice to meet you. I'm Ana.", es: "Encantada. Soy Ana." },
      { en: "I'm from Colombia. And you?", es: "Soy de Colombia. ¿Y tú?" },
      { en: "I work as a designer.", es: "Trabajo de diseñadora." },
    ],
  },
  {
    id: "travel",
    level: "A2",
    roleEn: "an airline agent at the check-in desk",
    situationEn: "the user is checking in for a flight and asking about luggage",
    openerEn: "Good morning! May I see your passport, please?",
    goals: [
      { id: "bag", en: "check in a bag" },
      { id: "seat", en: "ask for a seat preference" },
      { id: "gate", en: "ask about the gate or boarding time" },
    ],
    prep: [
      { en: "Here's my passport.", es: "Aquí tiene mi pasaporte." },
      { en: "I have one bag to check in.", es: "Tengo una maleta para facturar." },
      { en: "Could I have a window seat?", es: "¿Me podría dar ventanilla?" },
    ],
  },
  {
    id: "doctor",
    level: "A2",
    roleEn: "a doctor at a walk-in clinic",
    situationEn: "the user explains a health problem and answers questions",
    openerEn: "Come in, please. What seems to be the problem?",
    goals: [
      { id: "symptom", en: "describe the symptom" },
      { id: "since", en: "say how long they have had it" },
      { id: "allergy", en: "mention an allergy or a medicine they take" },
    ],
    prep: [
      { en: "I've had a headache since Monday.", es: "Tengo dolor de cabeza desde el lunes." },
      { en: "It hurts when I move.", es: "Me duele cuando me muevo." },
      { en: "I'm allergic to penicillin.", es: "Soy alérgico a la penicilina." },
    ],
  },
  {
    id: "interview",
    level: "B1",
    roleEn: "a hiring manager interviewing the user for a job",
    situationEn: "a job interview: experience, strengths, why this role",
    openerEn: "Thanks for coming in. So, tell me a little about yourself.",
    goals: [
      { id: "experience", en: "describe their experience" },
      { id: "strength", en: "name a strength with an example" },
      { id: "why", en: "explain why they want this role" },
    ],
    prep: [
      { en: "I've been working in marketing for five years.", es: "Llevo cinco años trabajando en marketing." },
      { en: "My greatest strength is that I'm organised.", es: "Mi mayor punto fuerte es que soy organizado." },
      { en: "I'm looking for a new challenge.", es: "Busco un nuevo reto." },
    ],
  },
  {
    id: "flat",
    level: "B1",
    roleEn: "a landlord showing a flat to the user",
    situationEn: "the user asks about the flat, the rent and the neighbourhood",
    openerEn: "So this is the living room. What do you think?",
    goals: [
      { id: "rent", en: "ask how much the rent is" },
      { id: "bills", en: "ask whether bills are included" },
      { id: "area", en: "ask about the neighbourhood" },
    ],
    prep: [
      { en: "How much is the rent per month?", es: "¿Cuánto es el alquiler al mes?" },
      { en: "Are bills included?", es: "¿Están incluidos los gastos?" },
      { en: "Is there a supermarket nearby?", es: "¿Hay un supermercado cerca?" },
    ],
  },
  {
    id: "negotiation",
    level: "B2",
    roleEn: "a supplier negotiating a contract with the user",
    situationEn:
      "the user negotiates price, deadlines and terms, pushing back politely",
    openerEn:
      "Thanks for your time. I've looked at your proposal — I'm afraid the price is higher than we expected.",
    goals: [
      { id: "pushback", en: "push back politely on the price" },
      { id: "deadline", en: "negotiate the deadline" },
      { id: "deal", en: "propose a compromise" },
    ],
    prep: [
      { en: "That's higher than we had in mind.", es: "Es más de lo que teníamos previsto." },
      { en: "Would you be flexible on the deadline?", es: "¿Tendrías flexibilidad con el plazo?" },
      { en: "I'd rather we agreed on a fixed fee.", es: "Preferiría que acordáramos una tarifa fija." },
    ],
  },
  {
    id: "debate",
    level: "C1",
    roleEn: "a journalist interviewing the user about a controversial topic",
    situationEn:
      "the user defends an opinion, concedes points and rebuts arguments",
    openerEn:
      "Many people would say remote work has damaged company culture. What's your take on that?",
    goals: [
      { id: "opinion", en: "state a nuanced opinion" },
      { id: "concede", en: "concede a point" },
      { id: "rebut", en: "rebut an argument with a reason or evidence" },
    ],
    prep: [
      { en: "That's arguably true, but only to some extent.", es: "Eso es posiblemente cierto, pero solo hasta cierto punto." },
      { en: "I take your point, however the data suggest otherwise.", es: "Entiendo tu argumento, sin embargo los datos apuntan a lo contrario." },
      { en: "It may well be the case in large firms.", es: "Bien puede ser el caso en empresas grandes." },
    ],
  },
  {
    id: "board",
    level: "C2",
    roleEn:
      "a sceptical board member questioning the user's proposal, using understatement and irony",
    situationEn:
      "the user defends a proposal under polite but pointed pressure, reads what is implied and answers without losing the room",
    openerEn:
      "Well, that's certainly an ambitious plan. I'm not entirely sure the numbers hold up, but do go on.",
    goals: [
      { id: "defend", en: "defend the numbers of the proposal" },
      { id: "irony", en: "answer an ironic remark without losing composure" },
      { id: "next", en: "propose a concrete next step" },
    ],
    prep: [
      { en: "I hear what you're saying, but the risk is smaller than it looks.", es: "Entiendo lo que dices, pero el riesgo es menor de lo que parece." },
      { en: "That's one way of looking at it.", es: "Es una forma de verlo." },
      { en: "It may well be worth parking that until we have the data.", es: "Bien puede merecer la pena aparcarlo hasta tener los datos." },
    ],
  },
];

export function scenarioById(id: string | null): Scenario | null {
  return SCENARIOS.find((s) => s.id === id) ?? null;
}
