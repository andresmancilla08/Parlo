"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Fondo tipo "aurora": blobs de color desenfocados que respiran lentamente.
 * Inspirado en Aceternity. Puro CSS/transform → barato y suave.
 */
export function AuroraBackground({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <Blob className="left-[-10%] top-[-15%] bg-primary/40" delay={0} />
        <Blob className="right-[-15%] top-[10%] bg-accent/35" delay={1.5} />
        <Blob
          className="bottom-[-20%] left-[25%] bg-gem/30"
          delay={0.8}
          size={520}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Blob({
  className,
  delay,
  size = 440,
}: {
  className?: string;
  delay: number;
  size?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("absolute rounded-full blur-[90px]", className)}
      style={{ width: size, height: size }}
      animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
