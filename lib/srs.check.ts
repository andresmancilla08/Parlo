// Check runnable de SM-2. Correr: node --experimental-strip-types lib/srs.check.ts
import assert from "node:assert";
import { newCard, review, isDue } from "./srs.ts";

const T0 = 1_000_000_000_000;
const DAY = 86_400_000;

// Aciertos consecutivos: intervalos 1 → 6 → round(6*ef).
let c = newCard("hello", T0);
c = review(c, 5, T0);
assert.equal(c.reps, 1);
assert.equal(c.interval, 1);
assert.equal(c.due, T0 + DAY);

c = review(c, 5, T0);
assert.equal(c.reps, 2);
assert.equal(c.interval, 6);

const efBefore = c.ef;
c = review(c, 5, T0);
assert.equal(c.reps, 3);
assert.equal(c.interval, Math.round(6 * efBefore));
assert.ok(c.ef >= efBefore); // q=5 sube (o mantiene) el EF

// Fallo (q<3): reinicia repeticiones y reaparece mañana.
c = review(c, 1, T0);
assert.equal(c.reps, 0);
assert.equal(c.interval, 1);
assert.equal(c.due, T0 + DAY);

// EF nunca baja de 1.3.
let hard = newCard("x", T0);
for (let i = 0; i < 10; i++) hard = review(hard, 3, T0);
assert.ok(hard.ef >= 1.3);

// isDue.
assert.equal(isDue(newCard("y", T0), T0), true);
assert.equal(isDue({ ...newCard("y", T0), due: T0 + DAY }, T0), false);

console.log("srs.check ✓ todos los asserts pasan");
