"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { navItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-md md:hidden">
      {/* px-1 y min-w-0: con 5 pestañas, en 320px el texto ensanchaba la app entera */}
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 sm:px-4">
        {navItems.map(({ href, labelKey, icon: Icon }) => {
          const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-0.5 py-2 text-[0.7rem] font-semibold sm:text-xs"
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-2xl bg-primary-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "relative size-6 transition-colors",
                  active ? "text-primary" : "text-muted",
                )}
              />
              <span
                className={cn(
                  "relative max-w-full truncate transition-colors",
                  active ? "text-primary" : "text-muted",
                )}
              >
                {t(labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
