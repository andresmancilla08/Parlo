// Check runnable del decodificador REST de Firestore. Correr:
//   node --experimental-strip-types lib/firestore-rest.check.ts
import assert from "node:assert";
import { decodeFields, decodeValue } from "./firestore-rest.ts";

// --- valores sueltos ---
assert.equal(decodeValue({ stringValue: "hola" }), "hola");
assert.equal(decodeValue({ booleanValue: true }), true);
assert.equal(decodeValue({ nullValue: null }), null);
assert.equal(decodeValue(undefined), undefined);
// Los enteros llegan como STRING en la API REST: si no se convierten, `hour`
// se compararía "20" === 20 y nunca se enviaría el aviso.
assert.strictEqual(decodeValue({ integerValue: "20" }), 20);
assert.deepEqual(decodeValue({ arrayValue: { values: [{ integerValue: "1" }] } }), [1]);
assert.deepEqual(decodeValue({ arrayValue: {} }), []); // array vacío: sin `values`

// --- documento como el que devuelve la query de recordatorios ---
const doc = decodeFields({
  reminder: {
    mapValue: {
      fields: {
        enabled: { booleanValue: true },
        hour: { integerValue: "20" },
        timeZone: { stringValue: "America/Bogota" },
        lastSent: { nullValue: null },
        subscription: {
          mapValue: {
            fields: {
              endpoint: { stringValue: "https://example.invalid/x" },
              keys: {
                mapValue: { fields: { p256dh: { stringValue: "a" }, auth: { stringValue: "b" } } },
              },
            },
          },
        },
      },
    },
  },
  progress: {
    mapValue: {
      fields: {
        streak: { integerValue: "12" },
        days: {
          mapValue: { fields: { "2026-07-26": { mapValue: { fields: { xp: { integerValue: "30" } } } } } },
        },
      },
    },
  },
});

assert.deepEqual(doc.reminder, {
  enabled: true,
  hour: 20,
  timeZone: "America/Bogota",
  lastSent: null,
  subscription: { endpoint: "https://example.invalid/x", keys: { p256dh: "a", auth: "b" } },
});
assert.deepEqual(doc.progress, { streak: 12, days: { "2026-07-26": { xp: 30 } } });

// Mapa vacío (documento sin campos) no rompe.
assert.deepEqual(decodeValue({ mapValue: {} }), {});

console.log("✓ firestore-rest.check.ts");
