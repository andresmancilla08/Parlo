"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IconArrowLeft } from "@tabler/icons-react";
import { getLesson } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";
import { LessonRunner } from "@/components/lesson/lesson-runner";

export default function LeccionPage() {
  return (
    <Suspense fallback={null}>
      <LeccionInner />
    </Suspense>
  );
}

function LeccionInner() {
  const { t } = useTranslation();
  const id = useSearchParams().get("id") ?? "";
  const lesson = getLesson(id);
  const completeLesson = useProgress((s) => s.completeLesson);

  if (!lesson) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-6 text-center">
        <div>
          <p className="text-muted">{t("leccion.not_found")}</p>
          <Link
            href="/app"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
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
      title={lesson.titleEs}
      exercises={lesson.exercises}
      onComplete={(r) => completeLesson(lesson.id, r)}
    />
  );
}
