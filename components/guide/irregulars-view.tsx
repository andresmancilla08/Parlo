"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GROUPS, searchIrregulars, type Irregular } from "@/lib/guide";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Card } from "@/components/ui/card";
import { SearchBox, ResultCount } from "@/components/guide/search-box";
import { AddToReview } from "@/components/guide/add-to-review";
import { cn } from "@/lib/utils";

/**
 * Los irregulares agrupados por PATRÓN, no en una lista alfabética de cien
 * filas: cut/cut/cut y go/went/gone no se estudian igual, y verlos juntos es
 * lo que hace que se queden.
 */
export function IrregularsView() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<Irregular["group"] | null>(null);
  const en = i18n.language.startsWith("en");

  const results = useMemo(() => {
    const found = searchIrregulars(query);
    return group ? found.filter((v) => v.group === group) : found;
  }, [query, group]);

  const byGroup = useMemo(
    () => GROUPS.map((g) => ({ g, rows: results.filter((v) => v.group === g.id) })).filter((x) => x.rows.length),
    [results],
  );

  return (
    <div>
      <SearchBox value={query} onChange={setQuery} />

      <div className="mt-3 flex flex-wrap gap-2">
        <Chip active={group === null} onClick={() => setGroup(null)}>
          {t("guia.irr_all")}
        </Chip>
        {GROUPS.map((g) => (
          <Chip key={g.id} active={group === g.id} onClick={() => setGroup(g.id)}>
            {g.id}
          </Chip>
        ))}
      </div>

      <ResultCount n={results.length} />

      <div className="mt-4 space-y-6">
        {byGroup.map(({ g, rows }) => (
          <section key={g.id}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
              {en ? g.en : g.es}
            </h2>
            <p className="mt-0.5 text-xs font-semibold text-primary">{g.hint}</p>
            <Card className="mt-2.5 divide-y divide-border overflow-hidden">
              {rows.map((v) => (
                <Row key={v.base} verb={v} />
              ))}
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}

function Row({ verb }: { verb: Irregular }) {
  return (
    <div className="flex items-center gap-3 p-3.5">
      <div className="min-w-0 flex-1">
        {/* Las tres formas en una línea: es como se recitan y como se recuerdan. */}
        <p className="font-display text-sm font-bold">
          {verb.base} · <span className="text-primary">{verb.past}</span> ·{" "}
          <span className="text-accent-ink">{verb.participle}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted">{verb.es}</p>
      </div>
      <SpeakControls
        text={`${verb.base}, ${verb.past}, ${verb.participle}`}
        size="sm"
        variant="outline"
      />
      <AddToReview en={verb.base} es={verb.es} />
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
