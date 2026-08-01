"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconFeather } from "@tabler/icons-react";
import { useAuth, watchAuth } from "@/lib/auth";
import { useProgressSync } from "@/lib/sync";
import { useLeagueSync } from "@/lib/league-sync";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { Sidebar } from "@/components/app/sidebar";
import { VerifyBanner } from "@/components/app/verify-banner";

/**
 * Rutas en MODO FOCO: mientras practicas no hay barras ni pestañas. La única
 * salida es la «X» del propio ejercicio (si no, se compite con la navegación
 * y se abandona la lección a medias).
 */
const FOCUS_ROUTES = ["/app/leccion", "/app/repaso", "/app/test", "/app/pronunciacion"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // La escucha sólo entra en foco cuando hay una pista en marcha (`?t=`);
  // el listado de piezas sí lleva navegación.
  const focus =
    FOCUS_ROUTES.some((r) => pathname.startsWith(r)) ||
    (pathname.startsWith("/app/escucha") && Boolean(params.get("t")));
  const uid = useAuth((s) => s.uid);
  const hydrated = useAuth((s) => s.hydrated);
  const scroller = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  /**
   * El aterrizaje del contenido bajo la barra, ligado al scroll real (no a un
   * on/off al pasar de 0). Escribe dos variables CSS en el armazón:
   *   --bar   0→1  cuánto se materializa la barra (fondo, desenfoque, borde)
   *   --fade  0→28px  el degradado que difumina el corte superior del contenido
   * Se escriben en el DOM, no en el estado: esto corre en cada frame de scroll
   * y un re-render de React por frame sería tirar la lista entera a la basura.
   */
  const onScroll = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const top = scroller.current?.scrollTop ?? 0;
      const p = Math.min(1, top / 56);
      shell.current?.style.setProperty("--bar", p.toFixed(3));
      shell.current?.style.setProperty("--fade", `${(p * 28).toFixed(1)}px`);
    });
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  useEffect(() => watchAuth(), []);
  useProgressSync(uid);
  useLeagueSync(uid);

  // El que scrollea es <main>, no el documento: Next ya no puede restaurar la
  // posición al cambiar de ruta, así que la devolvemos arriba a mano.
  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
    shell.current?.style.setProperty("--bar", "0");
    shell.current?.style.setProperty("--fade", "0px");
  }, [pathname]);

  useEffect(() => {
    if (hydrated && !uid) router.replace("/login");
  }, [hydrated, uid, router]);

  if (!hydrated || !uid) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <IconFeather className="size-8 animate-pulse text-primary" />
      </div>
    );
  }

  // El armazón mide exactamente la pantalla y NO scrollea: lo que se mueve es
  // el contenido. Si scrollease el documento, el rebote del móvil (y el del
  // trackpad en macOS) arrastraría también las barras, que deben quedarse
  // quietas. `overscroll-contain` corta esa propagación al llegar al final.
  if (focus)
    return <main className="h-dvh overflow-y-auto overscroll-contain">{children}</main>;

  return (
    <div
      ref={shell}
      className="flex h-dvh overflow-hidden"
      style={{ "--bar": 0, "--fade": "0px" } as React.CSSProperties}
    >
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppBar />
        <main
          ref={scroller}
          onScroll={onScroll}
          // El contenido no se corta en seco al llegar arriba: se desvanece en
          // los últimos --fade píxeles. Con --fade a 0 (arriba del todo) la
          // máscara es opaca entera, así que no hay coste ni recorte visible.
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0, #000 var(--fade))",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 var(--fade))",
          }}
          className="flex-1 overflow-y-auto overscroll-contain pb-24 md:pb-10"
        >
          {/* Dentro del área que scrollea: es un aviso, no una barra. Fuera de
              ella se quedaría clavado comiéndose media pantalla en móvil.
              Y fuera del modo foco: nunca interrumpe una lección a medias. */}
          <VerifyBanner />
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
