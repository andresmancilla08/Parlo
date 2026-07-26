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
};

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    level: "A1",
    roleEn: "a friendly barista in a busy London coffee shop",
    situationEn: "the user is ordering a coffee and something to eat",
    openerEn: "Hi there! What can I get you today?",
  },
  {
    id: "intro",
    level: "A1",
    roleEn: "a new colleague meeting the user for the first time",
    situationEn: "small talk: names, where you are from, what you do",
    openerEn: "Hi! I don't think we've met. I'm Sam — what's your name?",
  },
  {
    id: "travel",
    level: "A2",
    roleEn: "an airline agent at the check-in desk",
    situationEn: "the user is checking in for a flight and asking about luggage",
    openerEn: "Good morning! May I see your passport, please?",
  },
  {
    id: "doctor",
    level: "A2",
    roleEn: "a doctor at a walk-in clinic",
    situationEn: "the user explains a health problem and answers questions",
    openerEn: "Come in, please. What seems to be the problem?",
  },
  {
    id: "interview",
    level: "B1",
    roleEn: "a hiring manager interviewing the user for a job",
    situationEn: "a job interview: experience, strengths, why this role",
    openerEn: "Thanks for coming in. So, tell me a little about yourself.",
  },
  {
    id: "flat",
    level: "B1",
    roleEn: "a landlord showing a flat to the user",
    situationEn: "the user asks about the flat, the rent and the neighbourhood",
    openerEn: "So this is the living room. What do you think?",
  },
];

export function scenarioById(id: string | null): Scenario | null {
  return SCENARIOS.find((s) => s.id === id) ?? null;
}
