import type { Variants } from "framer-motion";

// Presets de animación compartidos. Regla: rápidas (spring stiff ≥ 300, stagger ≤ 0.02s).
export const spring = { type: "spring" as const, stiffness: 320, damping: 24 };

export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.02 } },
};
