"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill font-display font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-fg shadow-lg shadow-primary/25 hover:bg-primary-hover",
  secondary: "border border-border bg-surface text-fg",
  ghost: "text-fg hover:bg-primary-soft",
  danger: "border border-border bg-surface text-danger-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-8 py-4 text-lg",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  shimmer?: boolean;
  fullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
};

/** Botón único del design system. Link si recibe `href`, si no `<button>`. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled,
  shimmer = false,
  fullWidth,
  className,
  ...rest
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);

  const inner = (
    <>
      {shimmer && !disabled && <Sheen />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.03 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: spring,
  };

  if (href) {
    return (
      <motion.div {...motionProps} className={cn("inline-block", fullWidth && "w-full")}>
        <Link href={href} className={classes} {...rest}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}

/** Brillo que barre el botón: reset fuera de pantalla + pausa → siempre suave. */
function Sheen() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -inset-x-1 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      initial={{ x: "-160%" }}
      animate={{ x: "260%" }}
      transition={{
        duration: 1.1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2.4,
      }}
    />
  );
}
