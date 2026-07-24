"use client";

import { useEffect, useState } from "react";
import {
  IconDeviceDesktop,
  IconMoon,
  IconSun,
  type Icon,
} from "@tabler/icons-react";
import { useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const icons: Record<Theme, Icon> = {
  light: IconSun,
  dark: IconMoon,
  system: IconDeviceDesktop,
};
const labels: Record<Theme, string> = {
  light: "Claro",
  dark: "Oscuro",
  system: "Sistema",
};

/** Botón que cicla claro → oscuro → sistema. */
export function ThemeToggle({
  showLabel = false,
  className,
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const theme = useTheme((s) => s.theme);
  const cycle = useTheme((s) => s.cycle);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current: Theme = mounted ? theme : "system";
  const Icon = icons[current];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Tema: ${labels[current]}. Cambiar`}
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary",
        className,
      )}
    >
      <Icon className="size-5 text-primary" />
      {showLabel && <span>{labels[current]}</span>}
    </button>
  );
}
