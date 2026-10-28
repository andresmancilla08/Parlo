"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconRefresh } from "@tabler/icons-react";
import { NotSignedInError } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

/**
 * Por qué no llegó la respuesta. `busy` es Gemini sin cuota o saturado;
 * `rate` es nuestro propio límite (demasiados mensajes seguidos). Los dos
 * traen `until`: hasta entonces reintentar es tirar la petición.
 */
export type SendError = {
  kind: "busy" | "rate" | "network" | "session" | "generic";
  until?: number;
};

export function isSendError(e: unknown): e is SendError {
  return typeof e === "object" && e !== null && "kind" in e;
}

export async function sendErrorFrom(res: Response): Promise<SendError> {
  if (res.status === 401) return { kind: "session" };
  if (res.status !== 429 && res.status !== 503) return { kind: "generic" };
  const body = (await res.json().catch(() => ({}))) as { error?: string; retryAfter?: number };
  const seconds = Number(res.headers.get("retry-after")) || body.retryAfter || 30;
  const until = Date.now() + seconds * 1000;
  if (body.error === "rate_limited") return { kind: "rate", until };
  if (body.error === "ai_busy") return { kind: "busy", until };
  return { kind: "generic" };
}

/** Cualquier fallo de una llamada al tutor convertido en `SendError`. */
export function toSendError(err: unknown): SendError {
  if (isSendError(err)) return err;
  if (err instanceof NotSignedInError) return { kind: "session" };
  // `fetch` sólo lanza sin respuesta: red caída o servidor inalcanzable.
  return { kind: "network" };
}

export function SendErrorNotice({ error, onRetry }: { error: SendError; onRetry: () => void }) {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => Date.now());
  const left = error.until ? Math.max(0, Math.ceil((error.until - now) / 1000)) : 0;

  // Cuenta atrás: se refresca cada segundo sólo mientras queda espera.
  useEffect(() => {
    if (!error.until) return;
    const id = setInterval(() => {
      const ts = Date.now();
      setNow(ts);
      if (ts >= error.until!) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [error.until]);

  const message =
    error.kind === "busy"
      ? left > 0
        ? t("practica.err_busy", { count: left })
        : t("practica.err_busy_ready")
      : error.kind === "rate"
        ? left > 0
          ? t("practica.err_rate", { count: left })
          : t("practica.err_busy_ready")
        : t(`practica.err_${error.kind}`);

  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-danger/30 bg-card px-4 py-3"
    >
      <p className="min-w-0 flex-1 text-sm font-bold text-danger-ink">{message}</p>
      {error.kind !== "session" && (
        <Button variant="secondary" size="sm" className="shrink-0" disabled={left > 0} onClick={onRetry}>
          <IconRefresh className="size-4" />
          {left > 0 ? t("practica.retry_in", { count: left }) : t("common.retry")}
        </Button>
      )}
    </div>
  );
}
