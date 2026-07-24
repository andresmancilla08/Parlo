"use client";

import { useTranslation } from "react-i18next";
import {
  IconDeviceDesktop,
  IconMoon,
  IconSun,
  type Icon,
} from "@tabler/icons-react";
import { useTheme, type Theme } from "@/lib/theme";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const icons: Record<Theme, Icon> = {
  light: IconSun,
  dark: IconMoon,
  system: IconDeviceDesktop,
};

/** Botón que cicla claro → oscuro → sistema. */
export function ThemeToggle({
  showLabel = false,
  className,
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const { t } = useTranslation();
  const theme = useTheme((s) => s.theme);
  const cycle = useTheme((s) => s.cycle);
  const mounted = useHydrated();

  const current: Theme = mounted ? theme : "system";
  const Icon = icons[current];
  const label = t(`theme.${current}`);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${t("a11y.change_theme")}: ${label}`}
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary",
        className,
      )}
    >
      <Icon className="size-5 text-primary" />
      {showLabel && <span>{label}</span>}
    </button>
  );
}
