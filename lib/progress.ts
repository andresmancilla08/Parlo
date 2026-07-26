import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getLesson } from "@/lib/curriculum";
import { isDue, newCard, review, type SrsCard } from "@/lib/srs";

// Progreso real del usuario, local-first (zustand persist).
// ponytail: localStorage por ahora; sync a Firestore cuando exista proyecto.

function dayStr(d: Date): string {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD (estable entre render/SSR)
}
function todayStr(): string {
  return dayStr(new Date());
}
function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayStr(d);
}

/** Calidad SM-2 (0..5) a partir del acierto en la lección. */
function qualityFromAccuracy(acc: number): number {
  if (acc >= 0.9) return 5;
  if (acc >= 0.7) return 4;
  if (acc >= 0.5) return 3;
  return 2;
}

/** Resultado de UN ejercicio. `srsKey` sólo existe si evaluaba una carta. */
export type GradedItem = { ok: boolean; srsKey?: string };

export type LessonResult = { correct: number; total: number; graded: GradedItem[] };

/**
 * Calidad SM-2 de un ejercicio suelto. Acertar en opción múltiple es
 * reconocimiento, no recuerdo puro → 4 (bien), no 5 (perfecto).
 */
export function qualityFromItem(ok: boolean): number {
  return ok ? 4 : 2;
}

type ProgressState = {
  xp: number;
  gems: number;
  streak: number;
  lastActiveDay: string | null;
  completed: string[]; // ids de lecciones
  stars: Record<string, number>; // 1..3 por lección
  cards: Record<string, SrsCard>; // SRS, clave = vocab.en
  tutorMessages: number; // mensajes enviados al tutor (logro «primera conversación»)
  listens: number; // veces que se ha escuchado la pronunciación (logro «oído fino»)
  hydrated: boolean;

  completeLesson: (lessonId: string, result: LessonResult) => void;
  reviewCards: (results: { key: string; quality: number }[]) => void;
  noteTutorMessage: () => void;
  noteListen: () => void;
  reset: () => void;
  setHydrated: () => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      xp: 0,
      gems: 0,
      streak: 0,
      lastActiveDay: null,
      completed: [],
      stars: {},
      cards: {},
      tutorMessages: 0,
      listens: 0,
      hydrated: false,

      completeLesson: (lessonId, { correct, total }) =>
        set((s) => {
          const lesson = getLesson(lessonId);
          const acc = total > 0 ? correct / total : 0;
          const firstTime = !s.completed.includes(lessonId);
          const stars = acc === 1 ? 3 : acc >= 0.8 ? 2 : 1;

          // Racha: solo cambia una vez por día.
          const today = todayStr();
          let streak = s.streak;
          let lastActiveDay = s.lastActiveDay;
          if (s.lastActiveDay !== today) {
            streak = s.lastActiveDay === yesterdayStr() ? s.streak + 1 : 1;
            lastActiveDay = today;
          }

          // SRS: siembra/repasa el vocabulario de la lección.
          const now = Date.now();
          const quality = qualityFromAccuracy(acc);
          const cards = { ...s.cards };
          for (const v of lesson?.vocab ?? []) {
            const card = cards[v.en] ?? newCard(v.en, now);
            cards[v.en] = review(card, quality, now);
          }

          return {
            xp: s.xp + correct * 10,
            gems: s.gems + (firstTime ? 5 : 0),
            streak,
            lastActiveDay,
            completed: firstTime ? [...s.completed, lessonId] : s.completed,
            stars: { ...s.stars, [lessonId]: Math.max(s.stars[lessonId] ?? 0, stars) },
            cards,
          };
        }),

      reviewCards: (results) =>
        set((s) => {
          const now = Date.now();
          const cards = { ...s.cards };
          for (const r of results) {
            const card = cards[r.key] ?? newCard(r.key, now);
            cards[r.key] = review(card, r.quality, now);
          }
          // XP sólo por las cartas recordadas (quality >= 3), no por los fallos.
          const hits = results.filter((r) => r.quality >= 3).length;
          return { cards, xp: s.xp + hits * 5 };
        }),

      noteTutorMessage: () => set((s) => ({ tutorMessages: s.tutorMessages + 1 })),

      noteListen: () => set((s) => ({ listens: s.listens + 1 })),

      reset: () =>
        set({
          xp: 0,
          gems: 0,
          streak: 0,
          lastActiveDay: null,
          completed: [],
          stars: {},
          cards: {},
          tutorMessages: 0,
          listens: 0,
        }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "parlo-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        xp: s.xp,
        gems: s.gems,
        streak: s.streak,
        lastActiveDay: s.lastActiveDay,
        completed: s.completed,
        stars: s.stars,
        cards: s.cards,
        tutorMessages: s.tutorMessages,
        listens: s.listens,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

/** Selectores derivados (fuera del store para no re-render de más). */
export function completedSet(s: ProgressState): Set<string> {
  return new Set(s.completed);
}
export function dueCardKeys(cards: Record<string, SrsCard>, now: number): string[] {
  return Object.values(cards)
    .filter((c) => isDue(c, now))
    .map((c) => c.key);
}
export function dailyGoalDone(lastActiveDay: string | null): boolean {
  return lastActiveDay === todayStr();
}
