import type { Unit } from "./types";
import { a1 } from "./levels/a1";
import { a2 } from "./levels/a2";
import { b1 } from "./levels/b1";
import { b2 } from "./levels/b2";
import { c1 } from "./levels/c1";
import { withExtra } from "./extra";
import { a2Extra } from "./extra/a2";
import { b1Extra } from "./extra/b1";

// El currículo se compone por niveles (un archivo por nivel, en `levels/`).
// El orden de este array ES el orden de la ruta de aprendizaje.
// Contenido bilingüe (en↔es); las explicaciones van SIEMPRE en español.
export const curriculum: Unit[] = [
  ...a1,
  ...withExtra(a2, a2Extra),
  ...withExtra(b1, b1Extra),
  ...b2,
  ...c1,
];
