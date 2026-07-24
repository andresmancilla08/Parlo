"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IconFeather } from "@tabler/icons-react";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <span className="mx-auto mb-5 inline-flex size-16 items-center justify-center rounded-3xl bg-primary-soft text-primary">
          <IconFeather className="size-8" />
        </span>
        <p className="font-display text-5xl font-extrabold text-primary">404</p>
        <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
          {t("notfound.title")}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
          {t("notfound.body")}
        </p>
        <Link
          href="/"
          className="mt-7 inline-block rounded-pill bg-primary px-6 py-3 font-display font-bold text-primary-fg shadow-lg shadow-primary/25"
        >
          {t("notfound.home")}
        </Link>
      </div>
    </div>
  );
}
