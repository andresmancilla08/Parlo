"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconHome2,
  IconMessageChatbot,
  IconUser,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const items: { href: string; labelKey: string; icon: Icon }[] = [
  { href: "/app", labelKey: "nav.ruta", icon: IconHome2 },
  { href: "/app/tutor", labelKey: "nav.tutor", icon: IconMessageChatbot },
  { href: "/app/perfil", labelKey: "nav.perfil", icon: IconUser },
];

export function BottomNav() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
        {items.map(({ href, labelKey, icon: Icon }) => {
          const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-xs font-semibold"
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
                  "relative transition-colors",
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
