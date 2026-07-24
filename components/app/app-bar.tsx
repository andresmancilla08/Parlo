"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IconFlame, IconSparkles, type Icon } from "@tabler/icons-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

function StatPill({
  icon: Icon,
  value,
  className,
}: {
  icon: Icon;
  value: string;
  className?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-pill border border-border bg-card px-3 py-1.5 text-sm font-bold">
      <Icon className={cn("size-4", className)} />
      {value}
    </span>
  );
}

/** Barra superior de la app: logo (móvil) + racha/gemas. En desktop el logo vive en el Sidebar. */
export function AppBar() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-bg/80 px-5 py-3 backdrop-blur-md">
      <Link href="/app" className="md:hidden" aria-label={t("a11y.home")}>
        <Logo height={26} />
      </Link>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <StatPill icon={IconFlame} value="3" className="text-primary" />
        <StatPill icon={IconSparkles} value="120" className="text-gem" />
      </div>
    </header>
  );
}
