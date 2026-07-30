import type { Unit } from "./types";
import { a1 } from "./levels/a1";
import { a2 } from "./levels/a2";
import { b1 } from "./levels/b1";
import { b2 } from "./levels/b2";

// El currículo se compone por niveles (un archivo por nivel, en `levels/`).
// El orden de este array ES el orden de la ruta de aprendizaje.
// Contenido bilingüe (en↔es); las explicaciones van SIEMPRE en español.
export const curriculum: Unit[] = [...a1, ...a2, ...b1, ...b2];
