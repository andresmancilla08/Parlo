import type { Exercise } from "./types";

// ¿Se pueden escuchar las opciones de un ejercicio? (voz inglesa)

const ES_CHARS = /[áéíóúñüÁÉÍÓÚÑ¿¡]/;
/** Palabras españolas inequívocas (NO ambiguas con inglés: nada de «no», «me», «a»). */
const ES_WORDS = new Set(
  ("que,cual,cuando,porque,para,con,sin,pero,este,esta,esto,ese,esa,eso,los,las,del," +
    "al,es,son,ser,estar,hola,gracias,nunca,siempre,veces,casi,tiempo,hora,noche,mesa," +
    "cuenta,izquierda,derecha,mismo,igual,menos,muy,tan,todo,nada,algo,aunque,hacer," +
    "hizo,dijo,cocinar,llegar,sabe,alguien,ella,ellos,nosotros,una,unos,unas,un," +
    "sustantivo,frase,adjetivo,verbo,planes,hobby,contratar,quitar,llevar,encender," +
    "advertencia,sugerencia,legal,permiso,duda,suave,fuerte,ahora,ayer,hoy,ir,venir," +
    "comer,beber,tomar,hablar,decir,ver,mirar,salir,entrar,jugar,trabajar,leche,jugo," +
    "agua,pan,casa,coche,perro,gato,libro,padres,primos,abuelos,parientes,verano," +
    "invierno,otono,primavera,nublado,ventoso,helado,favor").split(","),
);

function looksSpanish(text: string): boolean {
  if (ES_CHARS.test(text)) return true;
  return text
    .toLowerCase()
    .split(/[^a-záéíóúñü]+/)
    .some((w) => w.length > 1 && ES_WORDS.has(w));
}

/**
 * ¿Tiene sentido ofrecer «escuchar» cada opción? Sólo si están en inglés:
 * en los ejercicios de significado las opciones son español y la voz inglesa
 * las leería fatal. `optionsLang` en los datos manda sobre la heurística.
 */
export function optionsSpeakable(ex: Extract<Exercise, { kind: "choose" }>): boolean {
  if (ex.optionsLang) return ex.optionsLang === "en";
  if (/significa|suena a:|» pregunta:/i.test(ex.prompt)) return false;
  return !ex.options.some(looksSpanish);
}

