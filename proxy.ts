import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate de UX, no de seguridad: la cookie sólo marca «hay sesión». La frontera
// real es Firestore, que valida request.auth.uid en el servidor.
//
// Con sesión abierta, las páginas públicas (landing, login, registro) llevan
// directamente a la app: quien ya entró no tiene por qué volver al escaparate.

const PUBLIC_ONLY = ["/", "/login", "/registro"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const signedIn = Boolean(request.cookies.get("parlo_session")?.value);

  if (signedIn && PUBLIC_ONLY.includes(pathname)) {
    return NextResponse.redirect(new URL("/app", request.url));
  }
  if (!signedIn && pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/registro", "/app/:path*"],
};
