"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * Botón pill con brillo animado. Primario = fondo sólido coral;
 * ghost = superficie con borde (regla de colores de botones).
 */
export function ShimmerButton({
  href,
  children,
  variant = "primary",
  className,
}: Props) {
  const isPrimary = variant === "primary";
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-7 py-3.5 font-display text-base font-bold transition-colors",
          isPrimary
            ? "bg-primary text-primary-fg shadow-lg shadow-primary/25"
            : "border border-border bg-surface text-fg",
          className,
        )}
      >
        {isPrimary && (
          <span className="pointer-events-none absolute inset-0 animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}
