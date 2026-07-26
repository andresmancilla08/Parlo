"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/** Botón claro de "volver" (flecha izquierda + texto). */
export function BackButton({
  href = "/",
  onClick,
  className,
}: {
  href?: string;
  /** Si se pasa, vuelve dentro de la propia pantalla en vez de navegar. */
  onClick?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();
  const styles = cn(
    "inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface/70 px-4 py-2 text-sm font-semibold text-fg backdrop-blur transition-colors hover:border-primary hover:text-primary",
    className,
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles}>
        <IconArrowLeft className="size-4" />
        {t("common.back")}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface/70 px-4 py-2 text-sm font-semibold text-fg backdrop-blur transition-colors hover:border-primary hover:text-primary",
        className,
      )}
    >
      <IconArrowLeft className="size-4" />
      {t("common.back")}
    </Link>
  );
}
