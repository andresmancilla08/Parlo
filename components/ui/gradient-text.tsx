"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Texto con relleno de gradiente animado (coral → ámbar → teal). */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--color-primary), var(--color-gem), var(--color-accent), var(--color-primary))",
        backgroundSize: "300% 100%",
      }}
      animate={{ backgroundPositionX: ["0%", "100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}
