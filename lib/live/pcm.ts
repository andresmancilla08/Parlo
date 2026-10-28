// Audio del modo llamada: remuestreo y conversión PCM. Módulo PURO (sin DOM ni
// imports locales) para que su `.check.ts` corra con node.
//
// Gemini Live pide PCM 16 bits little-endian a 16 kHz y devuelve PCM 16 bits a
// 24 kHz. El micro llega en Float32 a la frecuencia del AudioContext (44,1 o
// 48 kHz, según el dispositivo), así que hay que bajarla aquí.

export const INPUT_RATE = 16_000;
export const OUTPUT_RATE = 24_000;

/**
 * Baja la frecuencia de un flujo Float32 trozo a trozo. Promedia las muestras
 * de entrada que caen en cada muestra de salida (filtro de caja): sin ese
 * promedio, diezmar a pelo mete aliasing que el reconocedor oye como siseo.
 *
 * Guarda estado entre trozos (la fase fraccionaria y la cola sin consumir):
 * los trozos del AudioWorklet son de 128 muestras y 48000/16000 no siempre
 * cuadra con el borde del trozo.
 */
export class Downsampler {
  private readonly ratio: number;
  private carry: number[] = [];
  private pos = 0;

  constructor(inRate: number, outRate = INPUT_RATE) {
    if (!(inRate > 0) || !(outRate > 0)) throw new Error("rate");
    if (inRate < outRate) throw new Error("upsampling not supported");
    this.ratio = inRate / outRate;
  }

  push(input: Float32Array): Float32Array {
    // La cola del trozo anterior va delante del nuevo.
    const data = this.carry.length ? concat(this.carry, input) : input;
    const out: number[] = [];
    let pos = this.pos;
    while (pos + this.ratio <= data.length) {
      const start = Math.floor(pos);
      const end = Math.floor(pos + this.ratio);
      let sum = 0;
      for (let i = start; i < end; i++) sum += data[i];
      out.push(end > start ? sum / (end - start) : data[start]);
      pos += this.ratio;
    }
    const consumed = Math.floor(pos);
    this.carry = Array.from(data.subarray(consumed));
    this.pos = pos - consumed;
    return Float32Array.from(out);
  }

  reset(): void {
    this.carry = [];
    this.pos = 0;
  }
}

function concat(a: number[], b: Float32Array): Float32Array {
  const out = new Float32Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

/** Float32 [-1, 1] → PCM16 little-endian (recorta lo que se sale del rango). */
export function floatToPcm16(input: Float32Array): Uint8Array {
  const out = new Uint8Array(input.length * 2);
  const view = new DataView(out.buffer);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return out;
}

/** PCM16 little-endian → Float32 [-1, 1]. Ignora un byte suelto al final. */
export function pcm16ToFloat(bytes: Uint8Array): Float32Array {
  const n = bytes.length >> 1;
  const out = new Float32Array(n);
  const view = new DataView(bytes.buffer, bytes.byteOffset, n * 2);
  for (let i = 0; i < n; i++) out[i] = view.getInt16(i * 2, true) / 0x8000;
  return out;
}

/** Bytes → base64 (por bloques: `String.fromCharCode(...big)` revienta la pila). */
export function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** Nivel RMS 0..1 de un trozo, para el medidor. */
export function rms(input: Float32Array): number {
  if (input.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < input.length; i++) sum += input[i] * input[i];
  return Math.sqrt(sum / input.length);
}

/**
 * Nivel para pintar: el RMS de la voz ronda 0,02–0,2, así que se estira en
 * escala logarítmica a 0..1 (−50 dB → 0, −10 dB → 1).
 */
export function meterLevel(value: number): number {
  if (value <= 0) return 0;
  const db = 20 * Math.log10(value);
  return Math.max(0, Math.min(1, (db + 50) / 40));
}

/** Junta trozos de PCM hasta tener `size` bytes; devuelve los bloques llenos. */
export class ChunkBuffer {
  private parts: Uint8Array[] = [];
  private length = 0;
  private readonly size: number;

  // Sin «parameter properties»: node las rechaza al quitar los tipos.
  constructor(size: number) {
    this.size = size;
  }

  push(bytes: Uint8Array): Uint8Array[] {
    this.parts.push(bytes);
    this.length += bytes.length;
    const ready: Uint8Array[] = [];
    while (this.length >= this.size) {
      const all = this.take(this.length);
      ready.push(all.subarray(0, this.size));
      const rest = all.subarray(this.size);
      if (rest.length) {
        this.parts = [rest];
        this.length = rest.length;
      }
    }
    return ready;
  }

  /** Lo que quede (para no perder el final de una frase al silenciar). */
  flush(): Uint8Array | null {
    if (this.length === 0) return null;
    return this.take(this.length);
  }

  private take(n: number): Uint8Array {
    const out = new Uint8Array(n);
    let off = 0;
    for (const p of this.parts) {
      out.set(p, off);
      off += p.length;
    }
    this.parts = [];
    this.length = 0;
    return out;
  }
}
