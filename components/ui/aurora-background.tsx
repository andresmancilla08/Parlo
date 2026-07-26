"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Fondo tipo "aurora": los blobs se desplazan a distinta velocidad con el
 * scroll (profundidad). NO respiran solos: el movimiento sin propósito
 * distrae y compite con el texto. Se anula con prefers-reduced-motion.
 */
export function AuroraBackground({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160 * k]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 140 * k]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80 * k]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <Blob y={y1} className="left-[-10%] top-[-15%] bg-primary/30" />
        <Blob y={y2} className="right-[-15%] top-[10%] bg-accent/25" />
        <Blob y={y3} className="bottom-[-20%] left-[25%] bg-gem/20" size={520} />
      </div>
      {/* El aurora se funde con el fondo: sin esta capa se ve un corte recto
          justo donde termina la sección. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Blob({
  className,
  size = 440,
  y,
}: {
  className?: string;
  size?: number;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("absolute rounded-full blur-[90px]", className)}
      style={{ width: size, height: size, y }}
    />
  );
}
