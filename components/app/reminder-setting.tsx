"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconBell, IconLoader2 } from "@tabler/icons-react";
import { useAuth } from "@/lib/auth";
import {
  disableReminder,
  enableReminder,
  loadReminder,
  pushStatus,
  setReminderHour,
  type PushStatus,
} from "@/lib/push";
import { DEFAULT_REMINDER_HOUR, REMINDER_HOURS, type Reminder } from "@/lib/reminders";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Recordatorio diario de racha: aviso del navegador a la hora que elija. */
export function ReminderSetting() {
  const { t, i18n } = useTranslation();
  const uid = useAuth((s) => s.uid);
  const [saved, setSaved] = useState<Reminder | null>(null);
  const [status, setStatus] = useState<PushStatus | null>(null); // null = cargando
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    loadReminder(uid).then((r) => {
      if (cancelled) return;
      setSaved(r);
      setStatus(pushStatus(r));
    });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  // Sin claves VAPID en el despliegue no se ofrece algo que no puede funcionar.
  if (status === "unconfigured") return null;

  const hour = saved?.hour ?? DEFAULT_REMINDER_HOUR;
  const on = status === "on";
  // Mientras se lee la preferencia no se afirma «apagado»: parpadeaba off → on.
  const subtitle =
    status === null
      ? t("common.loading")
      : status === "unsupported"
        ? t("reminder.unsupported")
        : status === "denied"
          ? t("reminder.denied")
          : status === "error"
            ? t("reminder.error")
            : on
              ? t("reminder.on", { hour: `${hour}:00` })
              : t("reminder.off");

  const toggle = async () => {
    if (!uid || busy) return;
    setBusy(true);
    if (on) {
      await disableReminder(uid);
      setSaved(null);
      setStatus("off");
    } else {
      const lang = i18n.resolvedLanguage === "en" ? "en" : "es";
      const res = await enableReminder(uid, hour, lang);
      if (res.ok) {
        const next = await loadReminder(uid);
        setSaved(next);
        setStatus(pushStatus(next));
      } else {
        setStatus(res.reason);
      }
    }
    setBusy(false);
  };

  const pickHour = async (h: number) => {
    if (!uid) return;
    setSaved((s) => (s ? { ...s, hour: h } : s));
    await setReminderHour(uid, h);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <IconBell className={cn("size-5 shrink-0", on ? "text-primary" : "text-muted")} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">{t("reminder.title")}</p>
          <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
        </div>
        {status !== "unsupported" && status !== "denied" && (
          <button
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={t("reminder.title")}
            disabled={busy || status === null}
            onClick={toggle}
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-pill border transition-colors disabled:opacity-60",
              on ? "border-primary bg-primary" : "border-border bg-surface",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 grid size-5 place-items-center rounded-full bg-card shadow-sm transition-[left] duration-150",
                on ? "left-6" : "left-0.5",
              )}
            >
              {busy && <IconLoader2 className="size-3 animate-spin text-muted" />}
            </span>
          </button>
        )}
      </div>

      {on && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {REMINDER_HOURS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => pickHour(h)}
              className={cn(
                "rounded-pill border px-3 py-1.5 text-xs font-bold transition-colors",
                h === hour
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-surface text-fg",
              )}
            >
              {`${h}:00`}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
