"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IconArrowLeft, IconRefresh } from "@tabler/icons-react";
import {
  buildReviewExercises,
  learnedVocab,
  type Exercise,
} from "@/lib/curriculum";
import { dueCardKeys, qualityFromItem, useProgress } from "@/lib/progress";
import { LessonRunner } from "@/components/lesson/lesson-runner";

export default function RepasoPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const cards = useProgress((s) => s.cards);
  const completed = useProgress((s) => s.completed);
  const reviewCards = useProgress((s) => s.reviewCards);

  // La sesión de repaso se fija al entrar. El layout monta esta página solo en
  // cliente (tras auth), así que el inicializador perezoso corre una vez con el
  // store ya rehidratado.
  const [exercises] = useState<Exercise[]>(() => {
    const pool = learnedVocab(new Set(completed));
    const due = dueCardKeys(cards, Date.now());
    return buildReviewExercises(due, pool);
  });

  if (exercises.length === 0) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-6 text-center">
        <div>
          <span className="mx-auto mb-4 grid size-16 place-items-center rounded-3xl bg-accent-soft text-accent">
            <IconRefresh className="size-8" />
          </span>
          <h1 className="font-display text-2xl font-extrabold">{t("repaso.empty_title")}</h1>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{t("repaso.empty_body")}</p>
          <Link
            href="/app"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            <IconArrowLeft className="size-4" />
            {t("leccion.back")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LessonRunner
      title={t("repaso.title")}
      exercises={exercises}
      onComplete={({ graded }) => {
        // Cada carta avanza con la calidad de SU ejercicio (acierto 4 / fallo 2).
        reviewCards(
          graded
            .filter((g) => g.srsKey)
            .map((g) => ({ key: g.srsKey!, quality: qualityFromItem(g.ok) })),
        );
        router.push("/app");
      }}
    />
  );
}
