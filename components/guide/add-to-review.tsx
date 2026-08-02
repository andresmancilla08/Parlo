"use client";

import { useTranslation } from "react-i18next";
import { IconCards, IconCheck } from "@tabler/icons-react";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

/**
 * Manda una entrada de la guía al repaso espaciado. Guarda SIEMPRE el par
 * (inglés → español): una carta sin significado se queda en el repaso sin
 * poder preguntarse nunca, porque el ejercicio se construye con la traducción.
 */
export function AddToReview({ en, es, className }: { en: string; es: string; className?: string }) {
  const { t } = useTranslation();
  const addCard = useProgress((s) => s.addCard);
  const inReview = useProgress((s) => Boolean(s.cards[en]));
  const label = t(inReview ? "guia.added" : "guia.add_review");

  return (
    <button
      type="button"
      onClick={() => addCard(en, es)}
      disabled={inReview}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-full transition-transform active:scale-95",
        inReview ? "bg-success-soft text-success-ink" : "bg-primary-soft text-primary",
        className,
      )}
    >
      {inReview ? <IconCheck className="size-4" /> : <IconCards className="size-4" />}
    </button>
  );
}
