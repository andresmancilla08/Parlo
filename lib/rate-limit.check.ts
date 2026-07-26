// Check runnable. Correr: node --experimental-strip-types lib/rate-limit.check.ts
import assert from "node:assert";
import { allow } from "./rate-limit.ts";

const opts = { store: new Map<string, number[]>(), limit: 3, windowMs: 1000 };
const T = 1_000_000;

assert.equal(allow("ip1", T, opts), true, "1ª pasa");
assert.equal(allow("ip1", T + 10, opts), true, "2ª pasa");
assert.equal(allow("ip1", T + 20, opts), true, "3ª pasa");
assert.equal(allow("ip1", T + 30, opts), false, "4ª dentro de la ventana se rechaza");

// Otra clave no se ve afectada por la primera.
assert.equal(allow("ip2", T + 30, opts), true, "otra IP no hereda el bloqueo");

// Al salir de la ventana vuelve a permitir.
assert.equal(allow("ip1", T + 1100, opts), true, "pasada la ventana vuelve a pasar");

// Rechazar no debe alargar el bloqueo (no se acumulan intentos fallidos).
const o2 = { store: new Map<string, number[]>(), limit: 1, windowMs: 1000 };
assert.equal(allow("ip3", T, o2), true);
assert.equal(allow("ip3", T + 100, o2), false);
assert.equal(allow("ip3", T + 1050, o2), true, "el rechazo no extiende la ventana");

console.log("rate-limit.check ✓ todos los asserts pasan");
