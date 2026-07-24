"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  IconFeather,
  IconHome2,
  IconMessageChatbot,
  IconUser,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const items: { href: string; label: string; icon: Icon }[] = [
  { href: "/app", label: "Ruta", icon: IconHome2 },
  { href: "/app/tutor", label: "Tutor", icon: IconMessageChatbot },
  { href: "/app/perfil", label: "Perfil", icon: IconUser },
];

/** Navegación lateral para desktop (md+). En móvil se usa BottomNav. */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface/60 px-4 py-6 md:flex">
      <Link href="/app" className="mb-8 flex items-center gap-2 px-2">
        <IconFeather className="size-6 text-primary" />
        <span className="font-display text-xl font-extrabold tracking-tight">
          Parlo
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map(({ href, label, icon: Icon }) => {
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
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
