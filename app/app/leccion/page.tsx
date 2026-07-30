"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { IconArrowLeft } from "@tabler/icons-react";
import { getLesson, localTitle } from "@/lib/curriculum";
import { getTeach } from "@/lib/curriculum/teach";
import { useProgress } from "@/lib/progress";
import { LessonRunner } from "@/components/lesson/lesson-runner";
import { LessonTeach } from "@/components/lesson/lesson-teach";

export default function LeccionPage() {
  return (
    <Suspense fallback={null}>
      <LeccionInner />
    </Suspense>
  );
}

function LeccionInner() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  // `mode` deja entrar directo: `teoria` (repasar) o `practica` (saltarla).
  const mode = params.get("mode");
  const lesson = getLesson(id);

  const completeLesson = useProgress((s) => s.completeLesson);
  const noteTaught = useProgress((s) => s.noteTaught);

  // Se decide UNA vez al entrar (el layout monta esta página con el store ya
  // rehidratado): enseñar primero, salvo que ya se viera esta teoría antes.
  const [phase, setPhase] = useState<"teach" | "practice">(() => {
    if (mode === "practica") return "practice";
    if (mode === "teoria") return "teach";
    return useProgress.getState().taught.includes(id) ? "practice" : "teach";
  });
  // Consulta rápida de la teoría SIN perder el ejercicio en curso.
  const [overlay, setOverlay] = useState(false);

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

  const title = localTitle(lesson, i18n.language);
  const steps = getTeach(lesson);
  const seen = useProgress.getState().taught.includes(lesson.id);

  if (phase === "teach") {
    return (
      <LessonTeach
        title={title}
        steps={steps}
        canSkip={seen || mode === "teoria"}
        onExit={() => router.push("/app")}
        onDone={() => {
          noteTaught(lesson.id);
          // Si se entró a repasar teoría, al terminar se vuelve a la ruta.
          if (mode === "teoria") router.push("/app");
          else setPhase("practice");
        }}
      />
    );
  }

  return (
    <>
      <LessonRunner
        title={title}
        exercises={lesson.exercises}
        onTeach={() => setOverlay(true)}
        onComplete={(r) => completeLesson(lesson.id, r)}
      />
      {overlay && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-bg">
          <LessonTeach
            title={title}
            steps={steps}
            canSkip
            onExit={() => setOverlay(false)}
            onDone={() => setOverlay(false)}
          />
        </div>
      )}
    </>
  );
}
