// Sesión de demo firmada con HMAC-SHA256 (Web Crypto → sirve en proxy y rutas).
// El token viaja en una cookie httpOnly; el proxy verifica la firma antes de /app.
// ponytail: single-user demo. Multi-usuario real = Firebase Auth (pendiente de proyecto).

const enc = new TextEncoder();
export const SESSION_COOKIE = "parlo_session";

function secret(): string {
  return process.env.AUTH_SECRET ?? "parlo-dev-secret-change-me";
}

async function hmacHex(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compara en tiempo constante (evita fugas por timing). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signSession(email: string): Promise<string> {
  const payload = btoa(email);
  return `${payload}.${await hmacHex(payload)}`;
}

/** Devuelve el email si la firma es válida, o null. */
export async function verifySession(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  if (!safeEqual(sig, await hmacHex(payload))) return null;
  try {
    return atob(payload);
  } catch {
    return null;
  }
}
