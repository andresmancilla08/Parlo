"use client";

import { useEffect, useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import i18n, { LANG_KEY } from "@/lib/i18n";
import { reloadOnceForChunkError } from "@/lib/chunk-reload";
import "./globals.css";

// Último recurso: falla el propio layout raíz. Sustituye al documento entero,
// así que no hay providers (ni i18n ni tema): se leen aquí a mano.
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    if (reloadOnceForChunkError(error)) return;
    try {
      const stored = localStorage.getItem(LANG_KEY);
      const theme = JSON.parse(localStorage.getItem("parlo-theme") ?? "{}")?.state?.theme;
      const dark =
        theme === "dark" ||
        ((theme === "system" || !theme) && matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", dark);
      const next = stored === "en" || (!stored && navigator.language?.startsWith("en")) ? "en" : "es";
      if (next !== "es") Promise.resolve().then(() => setLang(next));
    } catch {
      // Almacenamiento bloqueado: español y tema del sistema.
    }
  }, [error]);

  const t = i18n.getFixedT(lang);

  return (
    <html lang={lang}>
      <body className="min-h-full bg-bg text-fg antialiased">
        <title>{t("error.title")}</title>
        <div className="grid min-h-dvh place-items-center px-6 text-center">
          <div>
            <span className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-3xl bg-danger/15 text-danger">
              <IconAlertTriangle className="size-8" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">{t("error.title")}</h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{t("error.body")}</p>
            <button
              onClick={retry}
              className="mt-7 rounded-pill bg-primary px-6 py-3 font-bold text-primary-fg"
            >
              {t("common.retry")}
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
