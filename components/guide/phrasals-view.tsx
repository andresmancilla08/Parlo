"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconArrowsSplit2, IconLock } from "@tabler/icons-react";
import { PARTICLES, PHRASAL_VERBS, searchPhrasals, type Phrasal } from "@/lib/guide";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Card } from "@/components/ui/card";
import { SearchBox, ResultCount } from "@/components/guide/search-box";
import { cn } from "@/lib/utils";

/**
 * Phrasal verbs agrupados por VERBO BASE: «get» tiene doce y no se parecen en
 * nada, así que verlos juntos es lo único que ordena el desastre. El dato que
 * de verdad se necesita al hablar es si se pueden separar.
 */
export function PhrasalsView() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [particle, setParticle] = useState<string | null>(null);

  const results = useMemo(
    () => searchPhrasals(query, particle ?? undefined),
    [query, particle],
  );

  const grouped = useMemo(
    () =>
      PHRASAL_VERBS.map((verb) => ({
        verb,
        rows: results.filter((p) => p.verb === verb),
      })).filter((g) => g.rows.length),
    [results],
  );

  return (
    <div>
      <SearchBox value={query} onChange={setQuery} />

      <div className="mt-3 flex flex-wrap gap-2">
        <Chip active={particle === null} onClick={() => setParticle(null)}>
          {t("guia.ph_all")}
        </Chip>
        {PARTICLES.map((p) => (
          <Chip key={p} active={particle === p} onClick={() => setParticle(p)}>
            {p}
          </Chip>
        ))}
      </div>

      <ResultCount n={results.length} />

      <div className="mt-4 space-y-5">
        {grouped.map(({ verb, rows }) => (
          <section key={verb}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
              {verb}
            </h2>
            <Card className="mt-2 divide-y divide-border overflow-hidden">
              {rows.map((p) => (
                <Row key={`${p.verb}-${p.particle}`} phrasal={p} />
              ))}
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}

function Row({ phrasal }: { phrasal: Phrasal }) {
  const { t } = useTranslation();

  return (
    <div className="p-3.5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold">
            {phrasal.verb} <span className="text-primary">{phrasal.particle}</span>
          </p>
          <p className="mt-0.5 text-xs text-muted">{phrasal.es}</p>
        </div>
        <SpeakControls text={phrasal.example} size="sm" variant="outline" />
      </div>

      <p className="mt-2 text-sm font-semibold leading-relaxed">{phrasal.example}</p>

      <span
        className={cn(
          "mt-2 inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[0.65rem] font-bold",
          phrasal.separable ? "bg-accent-soft text-accent-ink" : "bg-border/60 text-muted",
        )}
        title={t(phrasal.separable ? "guia.ph_separable_hint" : "guia.ph_inseparable_hint")}
      >
        {phrasal.separable ? (
          <IconArrowsSplit2 className="size-3.5" />
        ) : (
          <IconLock className="size-3.5" />
        )}
        {t(phrasal.separable ? "guia.ph_separable" : "guia.ph_inseparable")}
      </span>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-pill border-2 px-3 py-1.5 text-xs font-bold transition-colors",
        active
          ? "border-primary bg-primary-soft text-primary"
          : "border-border bg-card text-muted hover:border-primary/40",
      )}
    >
      {children}
    </button>
  );
}
