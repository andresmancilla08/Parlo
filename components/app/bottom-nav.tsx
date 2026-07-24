"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
        {items.map(({ href, label, icon: Icon }) => {
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
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
