"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconFeather } from "@tabler/icons-react";

// Una URL que no existe no debe dejar al usuario en un callejón: se le manda al
// inicio y `proxy.ts` ya lleva a /app a quien tiene la sesión abierta.
//
// Antes leía la cookie con `cookies()` en el servidor, y eso volvía DINÁMICAS
// todas las rutas (el not-found raíz forma parte del árbol de cada página):
// la landing y el login dejaban de servirse estáticos desde la CDN.
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="grid min-h-dvh place-items-center">
      <Link href="/" aria-label="Parlo">
        <IconFeather className="size-8 animate-pulse text-primary" />
      </Link>
    </div>
  );
}
