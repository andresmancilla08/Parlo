"use client";

import { useTranslation } from "react-i18next";
import { verbForms } from "@/lib/guide";
import { ED_SOUNDS, SPELLING_RULES, COMMON_REGULARS } from "@/lib/guide/regulars";
import { SpeakControls } from "@/components/ui/speak-controls";
import { Card } from "@/components/ui/card";

/**
 * Regulares. Dos cosas que casi nunca se explican juntas y que van juntas:
 * cómo se ESCRIBE el -ed y cómo SUENA, que son tres sonidos y ninguno es «ed».
 */
export function RegularsView() {
  const { t, i18n } = useTranslation();
  const en = i18n.language.startsWith("en");

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
          {t("guia.reg_spelling")}
        </h2>
        <div className="mt-3 space-y-3">
          {SPELLING_RULES.map((r) => (
            <Card key={r.id} className="p-4">
              <h3 className="font-display text-base font-bold">{en ? r.titleEn : r.titleEs}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.ruleEs}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.examples.map((e) => (
                  <span
                    key={e.base}
                    className="rounded-pill bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary"
                  >
                    {e.base} → {e.past}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
          {t("guia.reg_sounds")}
        </h2>
        <div className="mt-3 space-y-3">
          {ED_SOUNDS.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-accent-soft px-2.5 py-1 font-display text-sm font-bold text-accent-ink">
                  {s.sound}
                </span>
                <p className="min-w-0 flex-1 text-xs font-bold text-muted">{s.afterEs}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.ruleEs}</p>
              <div className="mt-3 divide-y divide-border">
                {s.examples.map((e) => (
                  <div key={e.word} className="flex items-center gap-3 py-2">
                    <p className="min-w-0 flex-1 text-sm font-bold">
                      {e.word} <span className="font-normal text-muted">· {e.hint}</span>
                    </p>
                    <SpeakControls text={e.word} size="sm" variant="outline" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-muted">
          {t("guia.reg_common")}
        </h2>
        {/* La regla aplicada de verdad: el pasado sale del mismo motor que usa
            el conjugador, así que lo que se ve aquí no puede desincronizarse. */}
        <Card className="mt-3 divide-y divide-border overflow-hidden">
          {COMMON_REGULARS.map((v) => {
            const f = verbForms(v.base);
            return (
              <div key={v.base} className="flex items-center gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold">
                    {v.base} · <span className="text-primary">{f.past}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{v.es}</p>
                </div>
                <SpeakControls text={`${v.base}, ${f.past}`} size="sm" variant="outline" />
              </div>
            );
          })}
        </Card>
      </section>
    </div>
  );
}
