import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate de UX, no de seguridad: evita el parpadeo de /app antes de que el SDK de
// Firebase resuelva la sesión en el cliente. La cookie sólo marca "hay sesión".
// La frontera real es Firestore, que valida request.auth.uid en el servidor.
export async function proxy(request: NextRequest) {
  if (request.cookies.get("parlo_session")?.value) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/app/:path*",
};
