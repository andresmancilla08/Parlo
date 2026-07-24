"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Fondo tipo "aurora" con parallax: los blobs se desplazan a distinta
 * velocidad según el scroll, creando profundidad. Inspirado en Aceternity.
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

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <Blob y={y1} className="left-[-10%] top-[-15%] bg-primary/40" delay={0} />
        <Blob y={y2} className="right-[-15%] top-[10%] bg-accent/35" delay={1.5} />
        <Blob
          y={y3}
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
  y,
}: {
  className?: string;
  delay: number;
  size?: number;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn("absolute rounded-full blur-[90px]", className)}
      style={{ width: size, height: size, y }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 12, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
