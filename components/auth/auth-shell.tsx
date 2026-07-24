import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Logo } from "@/components/ui/logo";

/** Contenedor de las pantallas de auth: header con logo (→ inicio) + contenido centrado. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <AuroraBackground className="flex min-h-dvh flex-col px-5 py-6">
      <header className="mx-auto w-full max-w-5xl">
        <Link href="/" aria-label="Volver al inicio" className="inline-block">
          <Logo height={30} />
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center py-8">
        {children}
      </div>
    </AuroraBackground>
  );
}
