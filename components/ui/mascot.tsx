"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import mascot from "@/public/brand/mascot.png";
import { cn } from "@/lib/utils";

const RATIO = mascot.width / mascot.height;

/** Loro mascota de Parlo. `float` le da un flotado suave; `glow` un halo detrás. */
export function Mascot({
  height = 160,
  float = false,
  glow = false,
  priority = false,
  className,
}: {
  height?: number;
  float?: boolean;
  glow?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const img = (
    <div className="relative">
      {glow && (
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
          style={{ width: height, height }}
        />
      )}
      <Image
        src={mascot}
        alt="Parlo, la mascota"
        height={height}
        width={Math.round(height * RATIO)}
        priority={priority}
        draggable={false}
        className="select-none"
      />
    </div>
  );

  if (!float) return <div className={className}>{img}</div>;

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {img}
    </motion.div>
  );
}
