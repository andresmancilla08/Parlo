"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IconFlame, IconSparkles, type Icon } from "@tabler/icons-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress";
import { useHydrated } from "@/lib/use-hydrated";

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
    <span className="inline-flex shrink-0 items-center gap-1 rounded-pill border border-border bg-card px-2.5 py-1.5 text-sm font-bold sm:px-3">
      <Icon className={cn("size-4", className)} />
      {value}
    </span>
  );
}

/** Barra superior de la app: logo (móvil) + racha/gemas. En desktop el logo vive en el Sidebar. */
export function AppBar() {
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const streak = useProgress((s) => s.streak);
  const gems = useProgress((s) => s.gems);
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border bg-bg/80 px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] backdrop-blur-md sm:gap-3 sm:px-5">
      {/* min-w-0 + overflow: en 320px el wordmark forzaba el ancho de toda la app */}
      <Link
        href="/app"
        className="min-w-0 overflow-hidden md:hidden"
        aria-label={t("a11y.home")}
      >
        <Logo height={24} />
      </Link>
      <div className="hidden md:block" />
      <div className="flex shrink-0 items-center gap-2">
        <StatPill icon={IconFlame} value={String(hydrated ? streak : 0)} className="text-primary" />
        <StatPill icon={IconSparkles} value={String(hydrated ? gems : 0)} className="text-gem" />
      </div>
    </header>
  );
}
