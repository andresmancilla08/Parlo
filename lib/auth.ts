import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { create } from "zustand";
import { auth, pinToPassword } from "@/lib/firebase";
import { LANG_KEY } from "@/lib/i18n";

// Auth real multi-usuario con Firebase (correo + PIN de 4 dígitos).
// La sesión la mantiene el SDK (IndexedDB); aquí sólo se refleja para la UI.

export type AuthResult = { ok: true } | { ok: false; code: string };

type AuthState = {
  uid: string | null;
  email: string | null;
  emailVerified: boolean;
  hydrated: boolean; // ya sabemos si hay sesión o no
  login: (email: string, pin: string) => Promise<AuthResult>;
  register: (email: string, pin: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  /** Reenvía el correo de verificación (respeta el enfriamiento). */
  sendVerification: () => Promise<AuthResult>;
  /** Relee el usuario del servidor: devuelve si ya está verificado. */
  refreshVerified: () => Promise<boolean>;
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
  set({
    uid: user?.uid ?? null,
    email: user?.email ?? null,
    emailVerified: user?.emailVerified ?? false,
    hydrated: true,
  });
}

const SENT_KEY = "parlo-verify-sent";
const COOLDOWN_MS = 60_000;

/** Segundos que faltan para poder reenviar (0 = ya se puede). */
export function verifyCooldownLeft(): number {
  if (typeof localStorage === "undefined") return 0;
  const at = Number(localStorage.getItem(SENT_KEY) ?? 0);
  return Math.max(0, Math.ceil((at + COOLDOWN_MS - Date.now()) / 1000));
}

/**
 * Envía el correo de verificación en el idioma de la app y volviendo a /app.
 * Si el dominio no está en «Authorized domains» de Firebase, la URL de retorno
 * es rechazada: se reintenta sin ella antes que dejar al usuario sin correo.
 */
async function sendVerificationEmail(user: User) {
  const a = auth();
  a.languageCode = localStorage.getItem(LANG_KEY) === "en" ? "en" : "es";
  try {
    await sendEmailVerification(user, { url: `${location.origin}/app` });
  } catch (e) {
    if (errorCode(e) !== "unauthorized-continue-uri") throw e;
    await sendEmailVerification(user);
  }
  localStorage.setItem(SENT_KEY, String(Date.now()));
}

export const useAuth = create<AuthState>()((set, get) => ({
  uid: null,
  email: null,
  emailVerified: false,
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
      // El correo no bloquea el registro: si el envío falla, el banner de la app
      // deja reenviarlo. Peor error sería no dejar entrar por esto.
      try {
        await sendVerificationEmail(cred.user);
      } catch {}
      return { ok: true };
    } catch (e) {
      return { ok: false, code: errorCode(e) };
    }
  },

  logout: async () => {
    try {
      await signOut(auth());
    } finally {
      localStorage.removeItem(SENT_KEY);
      apply(set, null);
    }
  },

  sendVerification: async () => {
    const user = auth().currentUser;
    if (!user) return { ok: false, code: "no-session" };
    if (verifyCooldownLeft() > 0) return { ok: false, code: "cooldown" };
    try {
      await sendVerificationEmail(user);
      return { ok: true };
    } catch (e) {
      return { ok: false, code: errorCode(e) };
    }
  },

  refreshVerified: async () => {
    const user = auth().currentUser;
    if (!user) return false;
    try {
      await user.reload();
    } catch {
      return get().emailVerified; // sin red: no cambiamos lo que ya sabíamos
    }
    set({ emailVerified: user.emailVerified });
    return user.emailVerified;
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
