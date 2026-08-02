"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconAlertTriangle, IconArrowRight } from "@tabler/icons-react";
import { searchFalseFriends } from "@/lib/guide";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Card } from "@/components/ui/card";
import { SearchBox, ResultCount } from "@/components/guide/search-box";
import { AddToReview } from "@/components/guide/add-to-review";

/**
 * Falsos amigos: el error que no suena a error, porque la palabra existe y la
 * frase es correcta; simplemente dice otra cosa. Por eso cada ficha da las
 * cuatro piezas: qué parece, qué significa y cómo se dice lo que querías decir.
 */
export function FalseFriendsView() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchFalseFriends(query), [query]);

  return (
    <div>
      <SearchBox value={query} onChange={setQuery} />
      <ResultCount n={results.length} />

      <div className="mt-4 space-y-3">
        {results.map((f) => (
          <Card key={f.en} className="p-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-bold">{f.en}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-danger-ink">
                  <IconAlertTriangle className="size-3.5 shrink-0" />
                  {t("guia.ff_looks")}: {f.looksLike}
                </p>
              </div>
              <SpeakControls text={f.example} size="sm" variant="outline" />
              {/* Lo que hay que recordar no es la palabra, es lo que significa
                  de verdad: por eso la carta guarda `means`, no `looksLike`. */}
              <AddToReview en={f.en} es={f.means} />
            </div>

            <p className="mt-3 text-sm leading-relaxed">
              <span className="font-bold">{t("guia.ff_means")}: </span>
              {f.means}
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm">
              <span className="font-bold">{t("guia.ff_instead")}:</span>
              <IconArrowRight className="size-4 shrink-0 text-muted" />
              <span className="font-semibold text-primary">{f.sayInstead}</span>
            </p>
            <p className="mt-3 border-t border-border pt-3 text-sm font-semibold text-muted">
              {f.example}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
