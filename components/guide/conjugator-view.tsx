"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { conjugationOf, PRONOUNS, SUGGESTED_VERBS, verbForms } from "@/lib/guide";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Card } from "@/components/ui/card";
import { SearchBox } from "@/components/guide/search-box";
import { cn } from "@/lib/utils";

/**
 * Conjugador. No es una tabla guardada: los quince tiempos se construyen con
 * el motor de `lib/guide/conjugate.ts`, así que funciona con CUALQUIER verbo
 * que se escriba, sea de la tabla de irregulares o no.
 */
export function ConjugatorView() {
  const { t, i18n } = useTranslation();
  const en = i18n.language.startsWith("en");
  const [verb, setVerb] = useState("go");
  const [pronounId, setPronounId] = useState("i");

  const pronoun = PRONOUNS.find((p) => p.id === pronounId) ?? PRONOUNS[0];
  const clean = verb.trim().toLowerCase().replace(/^to\s+/, "");
  const forms = useMemo(() => (clean ? verbForms(clean) : null), [clean]);
  const tenses = useMemo(
    () => (clean ? conjugationOf(clean, pronoun) : []),
    [clean, pronoun],
  );

  return (
    <div>
      <SearchBox value={verb} onChange={setVerb} placeholder={t("guia.ten_placeholder")} />

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED_VERBS.slice(0, 10).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVerb(v)}
            className={cn(
              "rounded-pill border-2 px-3 py-1.5 text-xs font-bold transition-colors",
              clean === v
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-card text-muted hover:border-primary/40",
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {forms && (
        <>
          <Card className="mt-5 p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
                {t("guia.ten_forms")}
              </h2>
              <span
                className={cn(
                  "rounded-pill px-2.5 py-1 text-xs font-bold",
                  forms.irregular
                    ? "bg-gem-soft text-gem-ink"
                    : "bg-accent-soft text-accent-ink",
                )}
              >
                {t(forms.irregular ? "guia.ten_irregular" : "guia.ten_regular")}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(
                [
                  ["base", forms.base],
                  ["-s", forms.third],
                  ["-ing", forms.ing],
                  [t("guia.irr_past"), forms.past],
                  [t("guia.irr_participle"), forms.participle],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border p-2.5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted">
                    {label}
                  </p>
                  <p className="mt-0.5 font-display text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* El pronombre cambia la conjugación entera: por eso se elige aquí
              arriba y no se repite la tabla cinco veces. */}
          <div className="mt-5 flex flex-wrap gap-2">
            {PRONOUNS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPronounId(p.id)}
                className={cn(
                  "rounded-pill border-2 px-3.5 py-1.5 text-sm font-bold transition-colors",
                  p.id === pronounId
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-card text-muted hover:border-primary/40",
                )}
              >
                {p.subject === "he" ? "he / she / it" : p.subject}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            {tenses.map((tense) => (
              <Card key={tense.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold">
                      {en ? tense.nameEn : tense.nameEs}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-primary">{tense.formula}</p>
                  </div>
                  <SpeakControls text={tense.affirmative} size="sm" variant="outline" />
                </div>

                <dl className="mt-3 space-y-1.5">
                  {(
                    [
                      ["guia.ten_affirmative", tense.affirmative],
                      ["guia.ten_negative", tense.negative],
                      ["guia.ten_question", tense.question],
                    ] as const
                  ).map(([key, value]) => (
                    <div key={key} className="flex items-baseline gap-2">
                      <dt className="w-24 shrink-0 text-[0.65rem] font-bold uppercase tracking-wide text-muted">
                        {t(key)}
                      </dt>
                      <dd className="min-w-0 flex-1 text-sm font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted">
                  <span className="font-bold text-fg">{t("guia.ten_when")}: </span>
                  {tense.useEs}
                </p>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
