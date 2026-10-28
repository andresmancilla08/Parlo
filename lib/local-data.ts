"use client";

import { useLeague } from "@/lib/league";
import { useProgress } from "@/lib/progress";
import { deleteAllDocs } from "@/lib/reader/store";

// Qué hay de cada cuenta en el dispositivo y qué se borra al cerrar sesión.
// Un dispositivo compartido no puede enseñar (ni subir a otra cuenta) lo de la
// persona anterior.
//
// Se BORRA (es de la cuenta):
//   parlo-progress (localStorage)     progreso, cartas, palabras guardadas
//   parlo-league (localStorage)       liga, alias y última foto del marcador
//   parlo-doc-es:<id> (localStorage)  traducciones de los documentos del lector
//   parlo-reader (IndexedDB)          los documentos subidos al lector
//   parlo-verify-sent (localStorage)  enfriamiento del correo de verificación (lo borra auth.ts)
//   parlo-verify-hidden (session)     banner de verificación ocultado
//
// Se CONSERVA (es del dispositivo, no de la persona):
//   parlo-theme, parlo-lang, parlo-sfx, parlo-sidebar, parlo-pwa-dismissed,
//   parlo-voice, parlo-voice-server, parlo-voice-speed, parlo-coach-prefs.

const DOC_CACHE_PREFIX = "parlo-doc-es:";
const SESSION_KEYS = ["parlo-verify-hidden"];

export async function clearLocalUserData(): Promise<void> {
  useProgress.getState().reset();
  useLeague.getState().resetLocal();

  try {
    const doomed: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(DOC_CACHE_PREFIX)) doomed.push(key);
    }
    doomed.forEach((key) => localStorage.removeItem(key));
    SESSION_KEYS.forEach((key) => sessionStorage.removeItem(key));
  } catch {
    // Almacenamiento bloqueado (modo privado estricto): no hay nada que borrar.
  }

  await deleteAllDocs();
}
