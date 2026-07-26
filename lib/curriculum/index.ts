import { curriculum } from "./data";
import type { Exercise, Lesson, Unit, Vocab } from "./types";

export { curriculum };
export type { Exercise, Lesson, Unit, Vocab };

/** Todas las lecciones en orden de ruta (unidades en orden, lecciones en orden). */
export const allLessons: Lesson[] = curriculum.flatMap((u) => u.lessons);

export function getLesson(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

export function unitOfLesson(id: string): Unit | undefined {
  return curriculum.find((u) => u.lessons.some((l) => l.id === id));
}

/**
 * Título en el idioma de la UI. El contenido es datos bilingües (no i18n de
 * strings), así que se elige aquí y no en `locales/`.
 */
export function localTitle(
  item: { titleEs: string; titleEn: string },
  lang: string,
): string {
  return lang.startsWith("en") ? item.titleEn : item.titleEs;
}

export type NodeState = "done" | "current" | "locked";

/**
 * Estado de cada lección según el set de completadas.
 * `current` = primera no completada en orden; el resto tras ella queda `locked`.
 */
export function lessonState(id: string, completed: Set<string>): NodeState {
  if (completed.has(id)) return "done";
  const firstPending = allLessons.find((l) => !completed.has(l.id));
  return firstPending?.id === id ? "current" : "locked";
}

/** Todo el vocabulario de las lecciones ya completadas (fuente del repaso). */
export function learnedVocab(completed: Set<string>): Vocab[] {
  return allLessons.filter((l) => completed.has(l.id)).flatMap((l) => l.vocab);
}

/**
 * Construye ejercicios de repaso (es→en) para las claves dadas, con distractores
 * tomados del resto del vocabulario aprendido.
 */
export function buildReviewExercises(
  keys: string[],
  pool: Vocab[],
): Exercise[] {
  const byEn = new Map(pool.map((v) => [v.en, v]));
  return keys
    .map((k) => byEn.get(k))
    .filter((v): v is Vocab => Boolean(v))
    .map((v) => {
      const distractors = pool
        .filter((o) => o.en !== v.en)
        .map((o) => o.en);
      const options = shuffle([v.en, ...pickN(distractors, 3)]);
      return {
        kind: "choose" as const,
        prompt: `¿Cómo se dice «${v.es}»?`,
        options,
        answer: v.en,
        explain: `«${v.en}» = ${v.es}.`,
        speak: v.en,
        srsKey: v.en,
      };
    });
}

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle([...arr]).slice(0, n);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
