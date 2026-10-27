"use client";

import { auth, firebaseReady } from "@/lib/firebase";

// Llamadas del cliente a las rutas de IA: todas exigen el ID token de Firebase.
// `getIdToken()` lo renueva solo cuando está a punto de caducar (dura 1 h), así
// que llamarlo en cada petición no cuesta una ida y vuelta.

export class NotSignedInError extends Error {}

/** ¿Hay sesión de Firebase ahora mismo? (sin esperar). */
export function hasSession(): boolean {
  if (!firebaseReady) return false;
  try {
    return auth().currentUser !== null;
  } catch {
    return false;
  }
}

export async function idToken(): Promise<string> {
  if (!firebaseReady) throw new NotSignedInError();
  // Recién cargada la página la sesión aún se está leyendo de IndexedDB.
  await auth().authStateReady();
  const user = auth().currentUser;
  if (!user) throw new NotSignedInError();
  return user.getIdToken();
}

/** `fetch` con `Authorization: Bearer <ID token>`. */
export async function apiFetch(url: string, init: RequestInit = {}): Promise<Response> {
  const token = await idToken();
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  return fetch(url, { ...init, headers });
}
