import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackButton } from "@/components/ui/back-button";

/** Contenedor de las pantallas de auth: botón "volver" al inicio + contenido centrado. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <AuroraBackground className="flex min-h-dvh flex-col px-5 py-6">
      <header className="mx-auto w-full max-w-5xl">
        <BackButton href="/" />
      </header>
      <div className="flex flex-1 items-center justify-center py-8">
        {children}
      </div>
    </AuroraBackground>
  );
}
