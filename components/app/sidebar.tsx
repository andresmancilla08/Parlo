"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
import { navItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";

/** Navegación lateral para desktop (md+). En móvil se usa BottomNav. */
export function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col overflow-y-auto border-r border-border bg-surface/60 px-4 pb-8 pt-6 md:flex">
      <Link href="/app" className="mb-8 flex items-center px-2">
        <Logo height={30} />
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, labelKey, icon: Icon }) => {
          const active =
            href === "/app" ? pathname === "/app" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-3 rounded-2xl px-3 py-3 font-display text-sm font-bold"
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl bg-primary-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "relative size-5 transition-colors",
                  active ? "text-primary" : "text-muted",
                )}
              />
              <span
                className={cn(
                  "relative transition-colors",
                  active ? "text-primary" : "text-muted",
                )}
              >
                {t(labelKey)}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-6">
        <ThemeToggle showLabel className="w-full justify-start" />
        <LangToggle className="w-full justify-start" />
      </div>
    </aside>
  );
}
