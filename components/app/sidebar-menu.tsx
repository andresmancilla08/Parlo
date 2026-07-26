"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconChevronRight, IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LangToggle } from "@/components/ui/lang-toggle";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Menú de cuenta del lateral: apariencia, idioma, perfil y cerrar sesión en un
 * panel translúcido (vidrio) para no ocupar sitio fijo en la barra.
 */
export function SidebarMenu({ collapsed }: { collapsed: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const email = useAuth((s) => s.email);
  const logout = useAuth((s) => s.logout);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Cerrar al pulsar fuera o con Escape, como cualquier menú del sistema.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const name = email?.split("@")[0] ?? "";

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("menu.account")}
        className={cn(
          "flex w-full items-center rounded-2xl border border-border bg-surface/70 py-2.5 font-display text-sm font-bold transition-colors hover:border-primary",
          collapsed ? "justify-center px-0" : "gap-2.5 px-3",
        )}
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary font-display text-xs font-extrabold uppercase text-primary-fg">
          {name.charAt(0) || "P"}
        </span>
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1 truncate text-left">{name || t("menu.account")}</span>
            <IconSettings className="size-4 shrink-0 text-muted" />
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ ...spring, duration: 0.15 }}
            className={cn(
              // Vidrio: translúcido, desenfocado y con borde de luz.
              "absolute bottom-full z-50 mb-2 w-60 rounded-[22px] border border-white/15 bg-surface/70 p-2 shadow-2xl shadow-black/30 backdrop-blur-2xl",
              collapsed ? "left-0" : "inset-x-0",
            )}
          >
            <p className="px-3 pb-2 pt-1 text-[0.7rem] font-bold uppercase tracking-wide text-muted">
              {t("menu.settings")}
            </p>
            <div className="space-y-1.5 px-1">
              <ThemeToggle showLabel className="w-full justify-start" />
              <LangToggle className="w-full justify-start" />
            </div>

            <div className="mt-2 border-t border-border/60 pt-2">
              <Link
                href="/app/perfil"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors hover:bg-primary-soft"
              >
                <IconUser className="size-4 shrink-0 text-muted" />
                <span className="flex-1">{t("nav.perfil")}</span>
                <IconChevronRight className="size-4 shrink-0 text-muted" />
              </Link>
              <button
                type="button"
                onClick={async () => {
                  setOpen(false);
                  await logout();
                  router.replace("/");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-bold text-danger-ink transition-colors hover:bg-danger/10"
              >
                <IconLogout className="size-4 shrink-0" />
                {t("perfil.logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
