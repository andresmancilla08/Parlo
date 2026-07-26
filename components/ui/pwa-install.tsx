"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconDeviceMobileDown, IconShare2, IconSquarePlus, IconX } from "@tabler/icons-react";
import { isIOS, usePwaInstall } from "@/lib/use-pwa-install";
import { cn } from "@/lib/utils";

/**
 * Invitación a instalar Parlo como app.
 * - Android/Chrome: lanza el diálogo nativo (`beforeinstallprompt`).
 * - iOS: Safari no tiene diálogo, así que se explican los 3 pasos reales.
 * No se muestra si ya está instalada.
 */
const DISMISS_KEY = "parlo-pwa-dismissed";

function wasDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function PwaInstall({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { isStandalone, canNativeInstall, install } = usePwaInstall();
  const [showSteps, setShowSteps] = useState(false);
  const [dismissed, setDismissed] = useState(() => wasDismissed());

  const ios = isIOS();
  // Sin prompt nativo y sin ser iOS no hay nada que ofrecer (p.ej. Firefox de escritorio).
  if (isStandalone || dismissed || (!canNativeInstall && !ios)) return null;

  return (
    <div className={cn("rounded-3xl border border-border bg-card p-4 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary-ink">
          <IconDeviceMobileDown className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold">{t("pwa.title")}</p>
          <p className="text-xs leading-snug text-muted">{t("pwa.subtitle")}</p>
        </div>
        <button
          onClick={() => (canNativeInstall ? install() : setShowSteps((v) => !v))}
          className="shrink-0 rounded-pill bg-primary px-4 py-2 font-display text-sm font-extrabold text-primary-fg transition-transform active:scale-95"
        >
          {t("pwa.cta")}
        </button>
        <button
          onClick={() => {
            setDismissed(true);
            try {
              localStorage.setItem(DISMISS_KEY, "1");
            } catch {
              // Sin localStorage sólo se oculta en esta visita.
            }
          }}
          aria-label={t("pwa.dismiss")}
          className="grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-primary-soft"
        >
          <IconX className="size-4" />
        </button>
      </div>

      <AnimatePresence>
        {showSteps && (
          <motion.ol
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-3 space-y-2 overflow-hidden border-t border-border pt-3 text-sm text-fg"
          >
            <li className="flex items-center gap-2">
              <IconShare2 className="size-4 shrink-0 text-primary" />
              <span>{t("pwa.step1")}</span>
            </li>
            <li className="flex items-center gap-2">
              <IconSquarePlus className="size-4 shrink-0 text-primary" />
              <span>{t("pwa.step2")}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="grid size-4 shrink-0 place-items-center font-display text-[0.7rem] font-extrabold text-primary">
                3
              </span>
              <span>{t("pwa.step3")}</span>
            </li>
          </motion.ol>
        )}
      </AnimatePresence>
    </div>
  );
}
