"use client";

import { useTranslation } from "react-i18next";
import { IconWorld } from "@tabler/icons-react";
import { LANG_KEY } from "@/lib/i18n";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

/** Botón que alterna español / inglés y persiste la preferencia. */
export function LangToggle({
  className,
  iconOnly,
}: {
  className?: string;
  /** Sólo el icono: para el lateral plegado, donde «ES» no cabe. */
  iconOnly?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const mounted = useHydrated();

  const lng = (mounted ? i18n.resolvedLanguage : "es")?.startsWith("en")
    ? "en"
    : "es";
  const next = lng === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => {
        i18n.changeLanguage(next);
        try {
          localStorage.setItem(LANG_KEY, next);
        } catch {
          /* localStorage no disponible: la preferencia no persiste */
        }
      }}
      aria-label={t("a11y.change_lang")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-2 text-sm font-bold text-fg transition-colors hover:border-primary",
        className,
      )}
    >
      <IconWorld className="size-5 shrink-0 text-primary" />
      {!iconOnly && lng.toUpperCase()}
    </button>
  );
}
