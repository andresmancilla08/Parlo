// Modelo del currículo. El contenido es bilingüe por naturaleza (en↔es),
// así que vive aquí como datos, no en los locales de UI.

export type Cefr = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/** Par de vocabulario que alimenta el repaso espaciado (SRS). */
export type Vocab = { en: string; es: string };

/**
 * Campos comunes a todo ejercicio. `explain` es SIEMPRE en español: es el
 * diferenciador de Parlo (entender el porqué, no memorizar).
 * `srsKey` (opcional) = carta de repaso que este ejercicio evalúa; si está,
 * el resultado del ejercicio califica esa carta (SM-2) por separado.
 */
type ExerciseBase = { prompt: string; explain: string; srsKey?: string };

export type Exercise =
  // Opción múltiple. `speak` (opcional) = texto en inglés que se pronuncia (Web Speech).
  | (ExerciseBase & {
      kind: "choose";
      options: string[];
      answer: string;
      speak?: string;
    })
  // Ordenar palabras del banco hasta formar `answer`.
  | (ExerciseBase & {
      kind: "bank";
      answer: string;
      bank: string[];
    })
  // Escribir la respuesta. `answer` admite variantes aceptadas.
  | (ExerciseBase & {
      kind: "type";
      answer: string | string[];
    });

export type Lesson = {
  id: string; // único global, p.ej. "a1-greetings-1"
  titleEs: string;
  titleEn: string;
  vocab: Vocab[];
  exercises: Exercise[];
};

export type Unit = {
  id: string;
  level: Cefr;
  titleEs: string;
  titleEn: string;
  lessons: Lesson[];
};
