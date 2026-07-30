import type { Lesson } from "../types";
import type { TeachMap, TeachStep } from "./types";
import { a1Teach } from "./a1";
import { a2Teach } from "./a2";
import { b1Teach } from "./b1";
import { b2Teach } from "./b2";

export type { TeachExample, TeachStep } from "./types";

const TEACH: TeachMap = { ...a1Teach, ...a2Teach, ...b1Teach, ...b2Teach };

/**
 * Teoría de una lección. Nunca devuelve vacío: si una lección todavía no tiene
 * teoría escrita a mano, se deriva de su vocabulario y de las explicaciones de
 * sus ejercicios. Así ninguna práctica llega sin haber enseñado antes.
 */
export function getTeach(lesson: Lesson): TeachStep[] {
  return TEACH[lesson.id] ?? fallbackTeach(lesson);
}

/** `true` si la teoría está escrita a mano (no derivada). */
export function hasAuthoredTeach(lessonId: string): boolean {
  return lessonId in TEACH;
}

function fallbackTeach(lesson: Lesson): TeachStep[] {
  const keys = lesson.exercises
    .map((e) => e.explain)
    .filter((x, i, arr) => arr.indexOf(x) === i)
    .slice(0, 4);

  return [
    {
      kind: "examples",
      title: `Lo que vas a usar en «${lesson.titleEs}»`,
      items: lesson.vocab.map((v) => ({ en: v.en, es: v.es })),
    },
    ...keys.map((body, i): TeachStep => ({
      kind: "idea",
      title: `Clave ${i + 1}`,
      body,
    })),
  ];
}
