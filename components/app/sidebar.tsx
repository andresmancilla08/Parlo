"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Image from "next/image";
import { Logo } from "@/components/ui/logo";
import logoMark from "@/public/brand/logo-mark.png";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
import { navItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";

/** Plegado del lateral: se recuerda entre sesiones. */
export const useSidebar = create<{ collapsed: boolean; toggle: () => void }>()(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    }),
    { name: "parlo-sidebar", storage: createJSONStorage(() => localStorage) },
  ),
);

/** Navegación lateral para desktop (md+). En móvil se usa BottomNav. */
export function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const collapsed = useSidebar((s) => s.collapsed);
  const toggle = useSidebar((s) => s.toggle);

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col overflow-y-auto overflow-x-hidden border-r border-border bg-surface/60 pb-8 pt-6 transition-[width] duration-150 md:flex",
        collapsed ? "w-[4.5rem] px-2" : "w-60 px-4",
      )}
    >
      <div
        className={cn(
          "mb-8 flex items-center",
          collapsed ? "flex-col gap-3" : "justify-between gap-2 px-2",
        )}
      >
        <Link href="/app" aria-label={t("a11y.home")}>
          {collapsed ? (
            <Image src={logoMark} alt="" height={30} width={30} className="size-[30px] object-contain" />
          ) : (
            <Logo height={30} />
          )}
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label={t(collapsed ? "a11y.expand_menu" : "a11y.collapse_menu")}
          aria-expanded={!collapsed}
          className="grid size-9 shrink-0 place-items-center rounded-xl text-muted transition-colors hover:bg-primary-soft hover:text-primary"
        >
          {collapsed ? (
            <IconLayoutSidebarLeftExpand className="size-5" />
          ) : (
            <IconLayoutSidebarLeftCollapse className="size-5" />
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, labelKey, icon: Icon }) => {
          const active =
            href === "/app" ? pathname === "/app" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              // Con el lateral plegado el nombre va en `title`: se ve al pasar el ratón.
              title={collapsed ? t(labelKey) : undefined}
              aria-label={collapsed ? t(labelKey) : undefined}
              className={cn(
                "relative flex items-center rounded-2xl py-3 font-display text-sm font-bold",
                collapsed ? "justify-center px-0" : "gap-3 px-3",
              )}
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
                  "relative size-5 shrink-0 transition-colors",
                  active ? "text-primary" : "text-muted",
                )}
              />
              {!collapsed && (
                <span
                  className={cn(
                    "relative truncate transition-colors",
                    active ? "text-primary" : "text-muted",
                  )}
                >
                  {t(labelKey)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={cn("mt-auto flex flex-col gap-2 pt-6", collapsed && "items-center")}>
        <ThemeToggle
          showLabel={!collapsed}
          className={
            collapsed ? "size-11 justify-center px-0 [&_span]:hidden" : "w-full justify-start"
          }
        />
        <LangToggle
          className={
            collapsed ? "size-11 justify-center px-0 [&_span]:hidden" : "w-full justify-start"
          }
        />
      </div>
    </aside>
  );
}
