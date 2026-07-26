"use client";

import { cn } from "@/lib/utils";

/**
 * Titular con relleno de degradado. El degradado vive en el token
 * `--gradient-headline` porque cambia por tema: en claro usa los "inks"
 * (coral/ámbar/mint puros sobre crema dan 1.5–2.7:1, ilegible).
 * Sin animación infinita: el movimiento decorativo permanente distrae y
 * compite con la lectura del titular.
 */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{ backgroundImage: "var(--gradient-headline)" }}
    >
      {children}
    </span>
  );
}
