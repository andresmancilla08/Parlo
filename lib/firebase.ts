import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Config pública por diseño (la protección real son las reglas de Firestore).
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(config.apiKey && config.projectId);

function app() {
  return getApps().length ? getApp() : initializeApp(config);
}

/** Auth del cliente. Lanza si falta configuración: fallar pronto y claro. */
export function auth(): Auth {
  if (!firebaseReady) throw new Error("Firebase sin configurar (NEXT_PUBLIC_FIREBASE_*)");
  return getAuth(app());
}

export function db(): Firestore {
  if (!firebaseReady) throw new Error("Firebase sin configurar (NEXT_PUBLIC_FIREBASE_*)");
  return getFirestore(app());
}

/**
 * Firebase exige contraseñas de 6+ caracteres y Parlo usa PIN de 4 dígitos
 * (mismo patrón que Spendia): se completa con un sufijo fijo. La entropía
 * sigue siendo la del PIN; Firebase limita los intentos por fuerza bruta.
 */
export function pinToPassword(pin: string): string {
  return `${pin}00`;
}
