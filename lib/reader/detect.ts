// Detección de idioma sin dependencias ni IA: se cuentan palabras funcionales,
// que son las más frecuentes y las que menos se comparten entre los dos idiomas.

export type DocLang = "en" | "es";

const EN = new Set(
  "the of and to in is that it was for on are as with his they at be this have from or one had by".split(" "),
);
const ES = new Set(
  "el la de que y en los las un una es se no por con para del al lo como más pero sus le ya".split(" "),
);

/** Idioma dominante del texto. Ante la duda, inglés (es el caso normal aquí). */
export function detectLang(text: string): DocLang {
  const words = text.toLowerCase().match(/[\p{L}']+/gu)?.slice(0, 600) ?? [];
  let en = 0;
  let es = 0;
  for (const w of words) {
    if (EN.has(w)) en++;
    if (ES.has(w)) es++;
  }
  // Los acentos y la eñe son señal fuerte de español.
  if (/[áéíóúñ¿¡]/i.test(text)) es += Math.round(words.length * 0.02);
  return es > en ? "es" : "en";
}

/** El idioma al que se traduce: siempre el contrario al del documento. */
export function targetLang(lang: DocLang): DocLang {
  return lang === "en" ? "es" : "en";
}
