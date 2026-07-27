// Check runnable del recordatorio diario. Correr:
//   node --experimental-strip-types lib/reminders.check.ts
import assert from "node:assert";
import { localParts, reminderText, shouldRemind } from "./reminders.ts";

// --- hora y día LOCALES, no del servidor ---
// 2026-07-27T01:30Z = 27 de julio 03:30 en Madrid, pero aún el 26 a las 21:30 en Bogotá.
const cross = new Date("2026-07-27T01:30:00Z");
assert.deepEqual(localParts("Europe/Madrid", cross), { day: "2026-07-27", hour: 3 });
assert.deepEqual(localParts("America/Bogota", cross), { day: "2026-07-26", hour: 20 });

// Medianoche local: la hora es 0, nunca 24.
assert.equal(localParts("Europe/Madrid", new Date("2026-07-26T22:10:00Z")).hour, 0);

// Zona inválida (dato viejo): cae a UTC en vez de romper el cron.
assert.deepEqual(localParts("Marte/Olympus", cross), { day: "2026-07-27", hour: 1 });

// --- a quién se avisa ---
const base = { enabled: true, hour: 20, timeZone: "America/Bogota", lastSent: null };
const now = cross; // 20 h en Bogotá

// Es su hora y hoy (26 en Bogotá) no ha practicado → aviso.
assert.deepEqual(shouldRemind(base, {}, now), { send: true, day: "2026-07-26" });

// Ya practicó hoy → nada. El día que cuenta es el LOCAL, no el UTC.
assert.equal(shouldRemind(base, { "2026-07-26": { xp: 30 } }, now).send, false);
assert.equal(shouldRemind(base, { "2026-07-27": { xp: 30 } }, now).send, true);

// Día registrado con 0 XP: cuenta como no practicado.
assert.equal(shouldRemind(base, { "2026-07-26": { xp: 0 } }, now).send, true);

// No es su hora → nada (el cron corre cada hora y no debe adelantarse).
assert.equal(shouldRemind({ ...base, hour: 21 }, {}, now).send, false);

// Ya avisado hoy → no se repite; el de ayer no bloquea el de hoy.
assert.equal(shouldRemind({ ...base, lastSent: "2026-07-26" }, {}, now).send, false);
assert.equal(shouldRemind({ ...base, lastSent: "2026-07-25" }, {}, now).send, true);

// Desactivado → nunca.
assert.equal(shouldRemind({ ...base, enabled: false }, {}, now).send, false);

// --- textos ---
assert.match(reminderText("es", 12).title, /12 días/);
assert.match(reminderText("en", 12).title, /12-day/);
assert.match(reminderText("es", 0).title, /Practicamos/); // sin racha: no miente
assert.match(reminderText("de", 3).title, /racha/); // idioma desconocido → español

console.log("✓ reminders.check.ts");
