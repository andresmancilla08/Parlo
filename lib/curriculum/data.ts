import type { Unit } from "./types";
import { a1 } from "./levels/a1";
import { a2 } from "./levels/a2";
import { b1 } from "./levels/b1";
import { b2 } from "./levels/b2";
import { c1 } from "./levels/c1";
import { c2 } from "./levels/c2";
import { withExtra } from "./extra";
import { a1Extra } from "./extra/a1";
import { a2Extra } from "./extra/a2";
import { b2Extra } from "./extra/b2";
import { b1Extra } from "./extra/b1";
import { c1Extra } from "./extra/c1";
import { c2Extra } from "./extra/c2";

// El currículo se compone por niveles (un archivo por nivel, en `levels/`).
// El orden de este array ES el orden de la ruta de aprendizaje.
// Contenido bilingüe (en↔es); las explicaciones van SIEMPRE en español.
export const curriculum: Unit[] = [
  ...withExtra(a1, a1Extra),
  ...withExtra(a2, a2Extra),
  ...withExtra(b1, b1Extra),
  ...withExtra(b2, b2Extra),
  ...withExtra(c1, c1Extra),
  ...withExtra(c2, c2Extra),
];
