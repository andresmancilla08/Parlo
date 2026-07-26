import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { create } from "zustand";
import { auth, pinToPassword } from "@/lib/firebase";

// Auth real multi-usuario con Firebase (correo + PIN de 4 dígitos).
// La sesión la mantiene el SDK (IndexedDB); aquí sólo se refleja para la UI.

export type AuthResult = { ok: true } | { ok: false; code: string };

type AuthState = {
  uid: string | null;
  email: string | null;
  hydrated: boolean; // ya sabemos si hay sesión o no
  login: (email: string, pin: string) => Promise<AuthResult>;
  register: (email: string, pin: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
};

/**
 * Cookie de presencia (NO es seguridad): permite que `proxy.ts` redirija a
 * /login en el servidor sin que parpadee la app. La frontera real de datos son
 * las reglas de Firestore, que validan `request.auth.uid` en el servidor.
 */
function setSessionCookie(active: boolean) {
  if (typeof document === "undefined") return;
  document.cookie = active
    ? "parlo_session=1; path=/; max-age=2592000; samesite=lax"
    : "parlo_session=; path=/; max-age=0; samesite=lax";
}

function apply(set: (s: Partial<AuthState>) => void, user: User | null) {
  setSessionCookie(Boolean(user));
  set({ uid: user?.uid ?? null, email: user?.email ?? null, hydrated: true });
}

export const useAuth = create<AuthState>()((set) => ({
  uid: null,
  email: null,
  hydrated: false,

  login: async (email, pin) => {
    try {
      const cred = await signInWithEmailAndPassword(auth(), email.trim(), pinToPassword(pin));
      apply(set, cred.user);
      return { ok: true };
    } catch (e) {
      return { ok: false, code: errorCode(e) };
    }
  },

  register: async (email, pin) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth(), email.trim(), pinToPassword(pin));
      apply(set, cred.user);
      return { ok: true };
    } catch (e) {
      return { ok: false, code: errorCode(e) };
    }
  },

  logout: async () => {
    try {
      await signOut(auth());
    } finally {
      apply(set, null);
    }
  },
}));

/** Escucha la sesión del SDK (recarga, expiración, otra pestaña). */
export function watchAuth(): () => void {
  return onAuthStateChanged(auth(), (user) => apply(useAuth.setState, user));
}

function errorCode(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  return code.replace("auth/", "") || "unknown";
}
