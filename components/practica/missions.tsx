"use client";

import { useTranslation } from "react-i18next";
import { IconCircle, IconCircleCheckFilled, IconTargetArrow } from "@tabler/icons-react";
import type { Scenario } from "@/lib/coach";
import { cn } from "@/lib/utils";

/** Misiones del escenario: se marcan cuando el tutor dice que se cumplieron. */
export function Missions({
  scenario,
  done,
  className,
}: {
  scenario: Scenario;
  done: ReadonlySet<string>;
  className?: string;
}) {
  const { t } = useTranslation();
  const count = scenario.goals.filter((g) => done.has(g.id)).length;
  const total = scenario.goals.length;

  return (
    <section aria-labelledby="missions-title" className={className}>
      <p
        id="missions-title"
        className="flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-[0.13em] text-muted"
      >
        <IconTargetArrow className="size-4" aria-hidden />
        {t("practica.missions_title")}
        <span className="tabular-nums">{t("practica.missions_count", { count, total })}</span>
      </p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {scenario.goals.map((g) => {
          const ok = done.has(g.id);
          return (
            <li
              key={g.id}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-bold transition-colors duration-150",
                ok ? "border-success/40 bg-success/15 text-success-ink" : "border-border bg-surface text-muted",
              )}
            >
              {ok ? (
                <IconCircleCheckFilled className="size-4 shrink-0" aria-hidden />
              ) : (
                <IconCircle className="size-4 shrink-0" aria-hidden />
              )}
              <span>{t(`practica.mission_${scenario.id}_${g.id}`)}</span>
              <span className="sr-only">{t(ok ? "practica.mission_done" : "practica.mission_pending")}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
