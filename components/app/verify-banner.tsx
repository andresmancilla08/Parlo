"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconLoader2, IconMailExclamation, IconX } from "@tabler/icons-react";
import { useAuth, verifyCooldownLeft } from "@/lib/auth";
import { useHydrated } from "@/lib/use-hydrated";
import { spring } from "@/lib/motion";

const DISMISS_KEY = "parlo-verify-hidden";

/**
 * Aviso de correo sin verificar. Es un recordatorio, NO una puerta: aprender
 * nunca se bloquea por esto (la frontera real de datos son las reglas de
 * Firestore, que ya validan el uid). Se puede ocultar hasta la próxima sesión.
 */
export function VerifyBanner() {
  const { t } = useTranslation();
  const uid = useAuth((s) => s.uid);
  const email = useAuth((s) => s.email);
  const verified = useAuth((s) => s.emailVerified);
  const sendVerification = useAuth((s) => s.sendVerification);
  const refreshVerified = useAuth((s) => s.refreshVerified);

  const hydrated = useHydrated();
  const [dismissed, setDismissed] = useState(false);
  const [busy, setBusy] = useState<"send" | "check" | null>(null);
  const [note, setNote] = useState<string | null>(null);
  // Enfriamiento persistido: sobrevive a recargas (el banner arranca oculto,
  // así que el primer render sigue siendo vacío en servidor y cliente).
  const [left, setLeft] = useState(verifyCooldownLeft);

  // El enlace se abre en el correo (otra app o pestaña): al volver a Parlo se
  // relee el usuario, así el aviso se va solo sin pedir nada.
  useEffect(() => {
    if (!uid || verified) return;
    const check = () => {
      if (document.visibilityState === "visible") refreshVerified();
    };
    check();
    document.addEventListener("visibilitychange", check);
    return () => document.removeEventListener("visibilitychange", check);
  }, [uid, verified, refreshVerified]);

  // Cuenta atrás del reenvío mientras el aviso esté a la vista.
  useEffect(() => {
    const id = setInterval(() => setLeft(verifyCooldownLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!uid || verified || !hydrated) return null;
  if (dismissed || sessionStorage.getItem(DISMISS_KEY) === "1") return null;

  const send = async () => {
    setBusy("send");
    setNote(null);
    const res = await sendVerification();
    setBusy(null);
    setLeft(verifyCooldownLeft());
    setNote(
      res.ok
        ? t("verify.sent")
        : t(res.code === "too-many-requests" ? "auth.too_many" : "verify.send_failed"),
    );
  };

  const check = async () => {
    setBusy("check");
    setNote(null);
    const ok = await refreshVerified();
    setBusy(null);
    if (!ok) setNote(t("verify.still_pending"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="shrink-0 px-4 pt-4 sm:px-5"
    >
      {/* Ámbar (warning), no mint: el verde de éxito diría «todo en orden». */}
      <div className="flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/12 p-3 sm:p-4">
        <IconMailExclamation className="mt-0.5 size-5 shrink-0 text-primary" stroke={2.2} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-fg">{t("verify.title")}</p>
          <p className="mt-0.5 text-xs text-muted">{note ?? t("verify.body", { email })}</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={send}
              disabled={busy !== null || left > 0}
              className="inline-flex items-center gap-1.5 rounded-pill bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-fg transition-colors disabled:border disabled:border-border disabled:bg-surface disabled:text-muted"
            >
              {busy === "send" && <IconLoader2 className="size-3.5 animate-spin" />}
              {left > 0 ? t("verify.resend_in", { s: left }) : t("verify.resend")}
            </button>
            <button
              type="button"
              onClick={check}
              disabled={busy !== null}
              className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3.5 py-1.5 text-xs font-bold text-fg transition-colors disabled:text-muted"
            >
              {busy === "check" && <IconLoader2 className="size-3.5 animate-spin" />}
              {t("verify.done")}
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label={t("common.close")}
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setDismissed(true);
          }}
          className="-mr-1 -mt-1 grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
        >
          <IconX className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}
