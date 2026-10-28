"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { IconArrowRight, IconPhoneCall } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";

/**
 * Punto de entrada al modo llamada. Misma forma que las tarjetas de «Escucha»
 * y «Pronunciación» del selector de práctica, para encajar en su rejilla.
 */
export function CallEntryCard() {
  const { t } = useTranslation();
  return (
    <Link href="/app/llamada" className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-[0.99]">
      <Card className="flex h-full items-center gap-3.5 p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-success/15 text-success-ink">
          <IconPhoneCall className="size-5" stroke={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-base font-extrabold">{t("llamada.entry_title")}</span>
          <span className="block text-xs font-bold text-muted">{t("llamada.entry_body")}</span>
        </span>
        <IconArrowRight className="size-5 shrink-0 text-muted" />
      </Card>
    </Link>
  );
}
