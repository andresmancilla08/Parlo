// Lógica pura del recordatorio diario de racha: la comparte el cliente (para
// guardar la preferencia) y el endpoint del cron (para decidir a quién avisar).
// Sin dependencias: se puede probar con `node --experimental-strip-types`.

export type PushSubscriptionJson = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export type Reminder = {
  enabled: boolean;
  /** Hora LOCAL del usuario (0-23) a la que quiere el aviso. */
  hour: number;
  /** Zona IANA (`Intl…timeZone`): sobrevive al horario de verano. */
  timeZone: string;
  lang: "es" | "en";
  subscription: PushSubscriptionJson;
  /** Último día local en el que ya se envió (evita repetir en la misma hora). */
  lastSent: string | null;
};

export const REMINDER_HOURS = [8, 12, 15, 18, 20, 21, 22] as const;
export const DEFAULT_REMINDER_HOUR = 20;

/** Día (`YYYY-MM-DD`) y hora en la zona del usuario, no en la del servidor. */
export function localParts(timeZone: string, now: Date): { day: string; hour: number } {
  try {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    // `hour12: false` da «24» a medianoche en algunos runtimes.
    const hour = Number(get("hour")) % 24;
    return { day: `${get("year")}-${get("month")}-${get("day")}`, hour };
  } catch {
    // Zona inválida (dato viejo o manipulado): se cae a UTC antes que fallar.
    return { day: now.toISOString().slice(0, 10), hour: now.getUTCHours() };
  }
}

type DayStats = { xp?: number } | undefined;

/**
 * ¿Le toca aviso AHORA? Sólo si tiene el recordatorio activo, es su hora local,
 * hoy no ha practicado y no se le ha avisado ya hoy.
 */
export function shouldRemind(
  reminder: Pick<Reminder, "enabled" | "hour" | "timeZone" | "lastSent">,
  days: Record<string, DayStats>,
  now: Date,
): { send: boolean; day: string } {
  const { day, hour } = localParts(reminder.timeZone, now);
  const practiced = (days?.[day]?.xp ?? 0) > 0;
  return {
    day,
    send: Boolean(reminder.enabled) && hour === reminder.hour && !practiced && reminder.lastSent !== day,
  };
}

/** Texto del aviso en el idioma del usuario (el SW no tiene i18next). */
export function reminderText(lang: string, streak: number) {
  const es = {
    title: streak > 0 ? `¡No pierdas tu racha de ${streak} días!` : "¿Practicamos inglés hoy?",
    body:
      streak > 0
        ? "Una lección de 3 minutos la mantiene viva."
        : "Con 3 minutos ya cuenta el día. Empieza tu racha.",
  };
  const en = {
    title: streak > 0 ? `Don't lose your ${streak}-day streak!` : "Ready for some English today?",
    body:
      streak > 0
        ? "A 3-minute lesson keeps it alive."
        : "Three minutes is enough to count today. Start your streak.",
  };
  return lang === "en" ? en : es;
}
