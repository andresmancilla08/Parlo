"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/** Botón claro de "volver" (flecha izquierda + texto). */
export function BackButton({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  const { t } = useTranslation();
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
