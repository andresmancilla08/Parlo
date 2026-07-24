import { cookies } from "next/headers";
import { SESSION_COOKIE, signSession } from "@/lib/session";

// Creds del usuario demo en el SERVIDOR (nunca en el bundle del cliente).
// ponytail: env con fallback local. Multi-usuario real → Firebase Auth (pendiente).
function demoEmail(): string {
  return (process.env.DEMO_EMAIL ?? "andresmancilla08@gmail.com").trim().toLowerCase();
}
function demoPin(): string {
  return process.env.DEMO_PIN ?? "1111";
}

export async function POST(req: Request) {
  let body: { email?: unknown; pin?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { email, pin } = body;
  if (typeof email !== "string" || typeof pin !== "string") {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (email.trim().toLowerCase() !== demoEmail() || pin !== demoPin()) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const token = await signSession(demoEmail());
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  return Response.json({ ok: true, email: demoEmail() });
}
