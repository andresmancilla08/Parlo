import { allow } from "@/lib/rate-limit";
import { emulatorMode, TokenError, verifyEmulatorToken, verifyIdToken } from "@/lib/firebase-token";

// Puerta común de las rutas de IA (/api/coach, /api/translate, /api/tts).
// Sin ella cualquiera con la URL podía gastar la cuota gratuita de Gemini.
//
// Orden: límite por IP (barato, antes de verificar nada) → token de Firebase
// → límite por uid (una cuenta no puede repartirse entre IPs para saltárselo).

type Rate = { store: Map<string, number[]>; limit: number; windowMs: number };

/** Cabecera alternativa para /api/tts (ver `decisiones.md`: la CDN no cachea peticiones con Authorization). */
export const TOKEN_HEADER = "x-parlo-token";

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

function tokenOf(req: Request): string | null {
  const bearer = /^Bearer\s+(.+)$/i.exec(req.headers.get("authorization") ?? "")?.[1];
  return bearer?.trim() || req.headers.get(TOKEN_HEADER)?.trim() || null;
}

/** Respuesta de límite propio: el cliente la distingue de la de Gemini por `error`. */
export function rateLimited(seconds: number): Response {
  return Response.json(
    { error: "rate_limited", retryAfter: seconds },
    { status: 429, headers: { "retry-after": String(seconds) } },
  );
}

/**
 * Devuelve `{ uid }` si la petición puede pasar, o la `Response` de rechazo
 * (401/429/503) que la ruta debe devolver tal cual.
 */
export async function guard(
  req: Request,
  rates: { ip: Rate; uid: Rate },
): Promise<{ uid: string } | Response> {
  const now = Date.now();
  if (!allow(clientIp(req), now, rates.ip)) {
    return rateLimited(Math.ceil(rates.ip.windowMs / 1000));
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!projectId) return Response.json({ error: "Auth not configured" }, { status: 503 });

  const token = tokenOf(req);
  if (!token) return Response.json({ error: "unauthorized" }, { status: 401 });

  let uid: string;
  try {
    uid = emulatorMode() ? verifyEmulatorToken(token, projectId).uid : (await verifyIdToken(token, projectId)).uid;
  } catch (err) {
    if (err instanceof TokenError) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    // No se pudieron bajar las claves de Google: es nuestro problema, no del usuario.
    console.error("[guard] no se pudo verificar el token:", err);
    return Response.json({ error: "Auth unavailable" }, { status: 503 });
  }

  if (!allow(`uid:${uid}`, now, rates.uid)) {
    return rateLimited(Math.ceil(rates.uid.windowMs / 1000));
  }
  return { uid };
}
