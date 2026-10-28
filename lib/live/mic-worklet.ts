// Procesador del AudioWorklet que lee el micro. Va como texto y se carga desde
// un Blob: así no hace falta servir un fichero suelto desde `public/` (el
// service worker lo precachearía con otra versión) y el código vive junto al
// resto del modo llamada.
//
// No remuestrea: sólo junta los bloques de 128 muestras en trozos de ~40 ms y
// los manda al hilo principal, donde `Downsampler` (probado con node) los baja
// a 16 kHz.

export const MIC_PROCESSOR = "parlo-mic";

const SOURCE = `
class ParloMic extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buf = new Float32Array(2048);
    this.len = 0;
  }
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch) {
      let i = 0;
      while (i < ch.length) {
        const n = Math.min(ch.length - i, this.buf.length - this.len);
        this.buf.set(ch.subarray(i, i + n), this.len);
        this.len += n;
        i += n;
        if (this.len === this.buf.length) {
          this.port.postMessage(this.buf, [this.buf.buffer]);
          this.buf = new Float32Array(2048);
          this.len = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor("${MIC_PROCESSOR}", ParloMic);
`;

/** URL del módulo (Blob). Quien la pide la revoca tras `addModule`. */
export function micWorkletUrl(): string {
  return URL.createObjectURL(new Blob([SOURCE], { type: "text/javascript" }));
}
