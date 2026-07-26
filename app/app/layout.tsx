"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconFeather } from "@tabler/icons-react";
import { useAuth, watchAuth } from "@/lib/auth";
import { useProgressSync } from "@/lib/sync";
import { AppBar } from "@/components/app/app-bar";
import { BottomNav } from "@/components/app/bottom-nav";
import { Sidebar } from "@/components/app/sidebar";

/**
 * Rutas en MODO FOCO: mientras practicas no hay barras ni pestañas. La única
 * salida es la «X» del propio ejercicio (si no, se compite con la navegación
 * y se abandona la lección a medias).
 */
const FOCUS_ROUTES = ["/app/leccion", "/app/repaso"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const focus = FOCUS_ROUTES.some((r) => pathname.startsWith(r));
  const uid = useAuth((s) => s.uid);
  const hydrated = useAuth((s) => s.hydrated);

  useEffect(() => watchAuth(), []);
  useProgressSync(uid);

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

  if (focus) return <main className="min-h-dvh">{children}</main>;

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-h-dvh flex-1 flex-col">
        <AppBar />
        <main className="flex-1 pb-24 md:pb-10">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
