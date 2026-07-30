import type { Exercise, Unit } from "../types";

// Ejercicios adicionales por lección. Viven aparte de `levels/*.ts` por el
// mismo motivo que la teoría: esos archivos ya rondan las 1.100 líneas y
// ampliarlos por dentro es pedir un error tonto en una lección que ya funciona.
//
// La mezcla es simple: los extra se AÑADEN al final de los originales, así el
// orden de la lección no cambia y quien ya la hizo reconoce el principio.

export type ExtraMap = Record<string, Exercise[]>;

/** Devuelve las unidades con los ejercicios extra ya incorporados. */
export function withExtra(units: Unit[], extra: ExtraMap): Unit[] {
  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => {
      const more = extra[lesson.id];
      return more ? { ...lesson, exercises: [...lesson.exercises, ...more] } : lesson;
    }),
  }));
}
