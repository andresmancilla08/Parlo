"use client";

// Tras un despliegue, una pestaña abierta (o la PWA instalada) puede pedir un
// trozo de JS que ya no existe: «ChunkLoadError» / «Loading chunk N failed».
// No es un error de la app; se arregla recargando para traer la versión nueva.
// Se recarga UNA vez: la marca en sessionStorage evita el bucle si el fallo
// fuera otro (sin red de verdad, CDN caída).

const KEY = "parlo-chunk-reload";
/** Pasado este tiempo, un fallo nuevo (otro despliegue) puede volver a recargar. */
const WINDOW_MS = 60_000;

export function isChunkLoadError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const { name, message } = error as { name?: unknown; message?: unknown };
  if (name === "ChunkLoadError") return true;
  return typeof message === "string" && /Loading (CSS )?chunk [\w-]+ failed/i.test(message);
}

/** Recarga si es un fallo de trozo y no se ha recargado ya. Devuelve si recargó. */
export function reloadOnceForChunkError(error: unknown): boolean {
  if (!isChunkLoadError(error)) return false;
  try {
    const last = Number(sessionStorage.getItem(KEY) ?? 0);
    if (Date.now() - last < WINDOW_MS) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    return false; // sin sessionStorage no hay forma de evitar el bucle: no se recarga
  }
  location.reload();
  return true;
}
