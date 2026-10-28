// Check runnable. Correr: node --experimental-strip-types lib/live/pcm.check.ts
import assert from "node:assert";
import {
  base64ToBytes,
  bytesToBase64,
  ChunkBuffer,
  Downsampler,
  floatToPcm16,
  meterLevel,
  pcm16ToFloat,
  rms,
} from "./pcm.ts";

// --- PCM16: extremos, signo y little-endian ---
const pcm = floatToPcm16(Float32Array.from([0, 1, -1, 2, -2, 0.5]));
const view = new DataView(pcm.buffer);
assert.equal(pcm.length, 12, "2 bytes por muestra");
assert.equal(view.getInt16(0, true), 0);
assert.equal(view.getInt16(2, true), 32767, "+1 → 32767");
assert.equal(view.getInt16(4, true), -32768, "−1 → −32768");
assert.equal(view.getInt16(6, true), 32767, "lo que pasa de 1 se recorta");
assert.equal(view.getInt16(8, true), -32768, "lo que baja de −1 se recorta");
assert.equal(pcm[2], 0xff, "little-endian: byte bajo primero");
assert.equal(pcm[3], 0x7f);

const back = pcm16ToFloat(pcm);
assert.equal(back.length, 6);
assert.ok(Math.abs(back[5] - 0.5) < 1e-4, "ida y vuelta conserva el valor");
assert.equal(pcm16ToFloat(new Uint8Array(3)).length, 1, "un byte suelto al final se ignora");
// Un trozo que no empieza en el byte 0 de su buffer (subarray de base64ToBytes).
const offset = new Uint8Array([9, 0x00, 0x40]).subarray(1);
assert.ok(Math.abs(pcm16ToFloat(offset)[0] - 0.5) < 1e-6, "respeta byteOffset");

// --- base64 ---
const bytes = Uint8Array.from({ length: 70_000 }, (_, i) => (i * 31) % 256);
const b64 = bytesToBase64(bytes);
assert.equal(b64, Buffer.from(bytes).toString("base64"), "igual que Buffer (trozos > 32 KB sin reventar la pila)");
assert.deepEqual(base64ToBytes(b64), bytes, "ida y vuelta");

// --- Remuestreo 48 kHz → 16 kHz ---
const d = new Downsampler(48_000);
const total = 48_000; // 1 s
let produced = 0;
// Trozos de 128 (los del AudioWorklet): 48000/128 no es entero y 128/3 tampoco.
for (let i = 0; i < total; i += 128) produced += d.push(new Float32Array(Math.min(128, total - i)).fill(0.25)).length;
assert.ok(Math.abs(produced - 16_000) <= 1, `1 s a 48 kHz → ~16000 muestras (salió ${produced})`);

// Una constante sigue siendo la misma constante (el promedio no la altera).
const flat = new Downsampler(48_000).push(new Float32Array(300).fill(0.5));
assert.ok(flat.every((v) => Math.abs(v - 0.5) < 1e-6));

// 44,1 kHz (ratio no entero): la cuenta sale bien a la larga.
const d44 = new Downsampler(44_100);
let n44 = 0;
for (let i = 0; i < 44_100 * 2; i += 128) n44 += d44.push(new Float32Array(Math.min(128, 44_100 * 2 - i))).length;
assert.ok(Math.abs(n44 - 32_000) <= 1, `2 s a 44,1 kHz → ~32000 (salió ${n44})`);

// El filtro de caja apaga una señal en Nyquist de la entrada (alterna +1/−1):
// diezmar a pelo la dejaría como ±1 (aliasing puro).
const nyq = Float32Array.from({ length: 4800 }, (_, i) => (i % 2 ? -1 : 1));
const nyqOut = new Downsampler(48_000).push(nyq);
assert.ok(rms(nyqOut) < 0.4, `Nyquist atenuado (rms ${rms(nyqOut).toFixed(2)})`);

// Un seno de 440 Hz sobrevive con la misma frecuencia (cruces por cero).
const sine = Float32Array.from({ length: 48_000 }, (_, i) => Math.sin((2 * Math.PI * 440 * i) / 48_000));
const sineOut = new Downsampler(48_000).push(sine);
let crossings = 0;
for (let i = 1; i < sineOut.length; i++) if (sineOut[i - 1] < 0 !== sineOut[i] < 0) crossings++;
assert.ok(Math.abs(crossings - 880) <= 4, `440 Hz → ~880 cruces por cero en 1 s (salieron ${crossings})`);

assert.throws(() => new Downsampler(8_000), "no sube la frecuencia");

// reset() olvida la cola.
const r = new Downsampler(48_000);
r.push(new Float32Array(2));
r.reset();
assert.equal(r.push(new Float32Array(3)).length, 1, "tras reset empieza limpio");

// --- ChunkBuffer ---
const cb = new ChunkBuffer(4);
assert.deepEqual(cb.push(Uint8Array.from([1, 2, 3])), [], "aún no llena");
const full = cb.push(Uint8Array.from([4, 5, 6, 7, 8, 9, 10]));
assert.equal(full.length, 2, "dos bloques llenos");
assert.deepEqual(Array.from(full[0]), [1, 2, 3, 4]);
assert.deepEqual(Array.from(full[1]), [5, 6, 7, 8]);
assert.deepEqual(Array.from(cb.flush() ?? []), [9, 10], "flush entrega el resto");
assert.equal(cb.flush(), null, "y queda vacío");

// --- medidor ---
assert.equal(rms(new Float32Array(0)), 0);
assert.ok(Math.abs(rms(new Float32Array(10).fill(0.5)) - 0.5) < 1e-9);
assert.equal(meterLevel(0), 0);
assert.equal(meterLevel(1), 1, "lo muy alto satura en 1");
assert.equal(meterLevel(0.001), 0, "−60 dB es silencio");
assert.ok(meterLevel(0.05) > 0.3 && meterLevel(0.05) < 0.8, "voz normal cae en medio");

console.log("live/pcm.check ✓ todos los asserts pasan");
