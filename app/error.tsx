"use client";

import { useTranslation } from "react-i18next";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <span className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-3xl bg-danger/15 text-danger">
          <IconAlertTriangle className="size-8" />
        </span>
        <h1 className="font-display text-2xl font-extrabold tracking-tight">
          {t("error.title")}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
          {t("error.body")}
        </p>
        <button
          onClick={reset}
          className="mt-7 rounded-pill bg-primary px-6 py-3 font-display font-bold text-primary-fg shadow-lg shadow-primary/25"
        >
          {t("common.retry")}
        </button>
      </div>
    </div>
  );
}
