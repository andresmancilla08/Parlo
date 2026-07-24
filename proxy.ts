import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Gate server-side de la app: sin sesión válida → /login. Complementa el gate
// del cliente (AppLayout). Runtime Node por defecto (Next 16).
export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const email = await verifySession(token);
  if (email) return NextResponse.next();

  const url = new URL("/login", request.url);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/app/:path*",
};
