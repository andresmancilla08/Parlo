// Verificación del ID token de Firebase Auth SIN firebase-admin ni service
// account (la org de GCP prohíbe sus claves y el proyecto está en Spark).
// Es un JWT RS256 firmado por Google: basta con comprobar la firma contra las
// claves públicas de securetoken y validar aud/iss/exp/sub como pide Firebase:
// https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
//
// Módulo puro (sólo Web Crypto y fetch, sin imports locales) para que su
// `.check.ts` corra con node y pruebe la firma con un par de claves generado
// en local.

export const SECURETOKEN_JWKS =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

export type Jwk = JsonWebKey & { kid?: string };
export type KeySource = () => Promise<Jwk[]>;

export type VerifiedToken = { uid: string; exp: number };

export class TokenError extends Error {}

/** Tolerancia de reloj entre Google y nuestro servidor. */
const SKEW_S = 60;

function b64urlBytes(part: string): Uint8Array<ArrayBuffer> {
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64urlJson(part: string): Record<string, unknown> {
  try {
    return JSON.parse(new TextDecoder().decode(b64urlBytes(part)));
  } catch {
    throw new TokenError("malformed");
  }
}

/* ---------------- claves públicas con caché ---------------- */

let cached: { keys: Jwk[]; until: number } | null = null;

/**
 * Descarga las claves de securetoken y las guarda lo que diga su
 * `cache-control: max-age` (Google las rota cada pocas horas). Si la descarga
 * falla con claves aún en memoria, se siguen usando: mejor que tumbar el tutor.
 */
export const googleKeys: KeySource = async () => {
  const now = Date.now();
  if (cached && now < cached.until) return cached.keys;
  try {
    const res = await fetch(SECURETOKEN_JWKS);
    if (!res.ok) throw new Error(`jwks ${res.status}`);
    const { keys } = (await res.json()) as { keys: Jwk[] };
    const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get("cache-control") ?? "")?.[1] ?? 3600);
    cached = { keys, until: now + Math.min(maxAge, 6 * 3600) * 1000 };
    return keys;
  } catch (err) {
    if (cached) return cached.keys;
    throw err;
  }
};

/* ---------------- verificación ---------------- */

/**
 * Emulador de Auth (`pnpm dev:emu`): sus tokens no van firmados. Solo se aceptan fuera de producción, con el
 * emulador activo y en un proyecto `demo-*` (que no existe en Google): nunca abre las rutas reales.
 */
export function emulatorMode(env: Record<string, string | undefined> = process.env): boolean {
  return env.NODE_ENV !== "production" && !!env.FIREBASE_AUTH_EMULATOR_HOST && !!env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.startsWith("demo-");
}
export function verifyEmulatorToken(token: string, projectId: string): VerifiedToken {
  const [, p] = token.split(".");
  if (!p) throw new TokenError("malformed");
  const claims = b64urlJson(p);
  if (claims.aud !== projectId || typeof claims.sub !== "string" || !claims.sub) throw new TokenError("emulator");
  return { uid: claims.sub, exp: Number(claims.exp) || 0 };
}

/**
 * Devuelve el uid si el token es un ID token válido del proyecto; lanza
 * `TokenError` si no. `nowS` y `keys` se inyectan para poder probarlo.
 */
export async function verifyIdToken(
  token: string,
  projectId: string,
  { keys = googleKeys, nowS = Math.floor(Date.now() / 1000) }: { keys?: KeySource; nowS?: number } = {},
): Promise<VerifiedToken> {
  const parts = token.split(".");
  if (parts.length !== 3) throw new TokenError("malformed");
  const [h, p, s] = parts;

  const header = b64urlJson(h);
  if (header.alg !== "RS256") throw new TokenError("alg");
  if (typeof header.kid !== "string") throw new TokenError("kid");

  const jwk = (await keys()).find((k) => k.kid === header.kid);
  if (!jwk) throw new TokenError("unknown kid");

  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    b64urlBytes(s),
    new TextEncoder().encode(`${h}.${p}`),
  );
  if (!ok) throw new TokenError("signature");

  // Sólo se mira el contenido después de comprobar la firma.
  const claims = b64urlJson(p);
  if (claims.aud !== projectId) throw new TokenError("aud");
  if (claims.iss !== `https://securetoken.google.com/${projectId}`) throw new TokenError("iss");
  if (typeof claims.exp !== "number" || claims.exp + SKEW_S < nowS) throw new TokenError("expired");
  if (typeof claims.iat !== "number" || claims.iat - SKEW_S > nowS) throw new TokenError("iat");
  if (typeof claims.auth_time === "number" && claims.auth_time - SKEW_S > nowS) {
    throw new TokenError("auth_time");
  }
  if (typeof claims.sub !== "string" || !claims.sub || claims.sub.length > 128) {
    throw new TokenError("sub");
  }
  return { uid: claims.sub, exp: claims.exp };
}
