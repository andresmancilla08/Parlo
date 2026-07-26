import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getLesson } from "@/lib/curriculum";
import type { Cefr } from "@/lib/curriculum/types";
import { isDue, newCard, review, type SrsCard } from "@/lib/srs";
import {
  challengeProgress,
  DEFAULT_GOAL_XP,
  dayKey,
  emptyDay,
  SHIELD_COST,
  shiftDay,
  type Challenge,
  type DayStats,
} from "@/lib/gamification";

// Progreso real del usuario, local-first (zustand persist) y sincronizado a
// Firestore por `lib/sync.ts`. Las estadísticas por día (`days`) son la fuente
// única de la que se derivan objetivo diario, retos y racha.

/** Días de historial que se guardan (semana actual + margen). */
const KEEP_DAYS = 21;

function todayStr(): string {
  return dayKey(new Date());
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

/** Lo que se guarda y se sincroniza (sin acciones ni flags de UI). */
export type ProgressSnapshot = {
  xp: number;
  gems: number;
  streak: number;
  lastActiveDay: string | null;
  completed: string[];
  stars: Record<string, number>;
  cards: Record<string, SrsCard>;
  tutorMessages: number;
  listens: number;
  days: Record<string, DayStats>;
  goalXp: number;
  claims: Record<string, number>;
  shields: number;
  lastGoalDay: string | null;
  /** Nivel por el que empezar según el test de nivel (null = nunca se hizo). */
  startLevel: Cefr | null;
};

/**
 * Calidad SM-2 de un ejercicio suelto. Acertar en opción múltiple es
 * reconocimiento, no recuerdo puro → 4 (bien), no 5 (perfecto).
 */
export function qualityFromItem(ok: boolean): number {
  return ok ? 4 : 2;
}

/** Suma al día de hoy y poda el historial viejo. */
function addToday(
  days: Record<string, DayStats>,
  patch: Partial<DayStats>,
): { days: Record<string, DayStats>; today: DayStats } {
  const key = todayStr();
  const base = days[key] ?? emptyDay;
  const today: DayStats = {
    xp: base.xp + (patch.xp ?? 0),
    lessons: base.lessons + (patch.lessons ?? 0),
    correct: base.correct + (patch.correct ?? 0),
    reviews: base.reviews + (patch.reviews ?? 0),
    tutor: base.tutor + (patch.tutor ?? 0),
    listens: base.listens + (patch.listens ?? 0),
  };
  const cutoff = shiftDay(key, -(KEEP_DAYS - 1));
  const next: Record<string, DayStats> = { [key]: today };
  for (const [k, v] of Object.entries(days)) {
    if (k !== key && k >= cutoff) next[k] = v;
  }
  return { days: next, today };
}

type StreakPatch = { streak: number; lastGoalDay: string | null; shields: number; gems: number };

/**
 * La racha sube cuando se cumple el OBJETIVO del día (no con cualquier toque).
 * Si se falló justo un día y hay escudo, el escudo se gasta y la racha sigue.
 * Cumplir el objetivo también da gemas.
 */
function bumpStreak(
  s: { streak: number; lastGoalDay: string | null; shields: number; gems: number; goalXp: number },
  dayXp: number,
): StreakPatch | null {
  const today = todayStr();
  if (s.lastGoalDay === today || dayXp < s.goalXp) return null;

  const prev = s.lastGoalDay;
  let streak: number;
  let shields = s.shields;
  if (prev === shiftDay(today, -1)) {
    streak = s.streak + 1;
  } else if (prev && shields > 0 && prev === shiftDay(today, -2)) {
    streak = s.streak + 1; // el escudo tapa el día perdido
    shields -= 1;
  } else {
    streak = 1;
  }
  return { streak, lastGoalDay: today, shields, gems: s.gems + GOAL_GEMS };
}

/** Gemas por cumplir el objetivo diario. */
export const GOAL_GEMS = 2;

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
  days: Record<string, DayStats>; // estadísticas por día (objetivo, retos, racha)
  goalXp: number; // objetivo diario de XP
  claims: Record<string, number>; // retos ya cobrados → cuándo
  shields: number; // escudos de racha comprados con gemas
  lastGoalDay: string | null; // último día en que se cumplió el objetivo
  startLevel: Cefr | null; // nivel de arranque según el test de nivel
  hydrated: boolean;

  snapshot: () => ProgressSnapshot;
  hydrateFrom: (data: ProgressSnapshot) => void;
  completeLesson: (lessonId: string, result: LessonResult) => void;
  reviewCards: (results: { key: string; quality: number }[]) => void;
  noteTutorMessage: () => void;
  noteListen: () => void;
  setGoal: (xp: number) => void;
  setStartLevel: (level: Cefr) => void;
  claimChallenge: (challenge: Challenge) => void;
  buyShield: () => void;
  reset: () => void;
  setHydrated: () => void;
};

const initial = {
  xp: 0,
  gems: 0,
  streak: 0,
  lastActiveDay: null,
  completed: [] as string[],
  stars: {} as Record<string, number>,
  cards: {} as Record<string, SrsCard>,
  tutorMessages: 0,
  listens: 0,
  days: {} as Record<string, DayStats>,
  goalXp: DEFAULT_GOAL_XP,
  claims: {} as Record<string, number>,
  shields: 0,
  lastGoalDay: null as string | null,
  startLevel: null as Cefr | null,
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initial,
      hydrated: false,

      snapshot: () => {
        const s = get();
        return {
          xp: s.xp,
          gems: s.gems,
          streak: s.streak,
          lastActiveDay: s.lastActiveDay,
          completed: s.completed,
          stars: s.stars,
          cards: s.cards,
          tutorMessages: s.tutorMessages,
          listens: s.listens,
          days: s.days,
          goalXp: s.goalXp,
          claims: s.claims,
          shields: s.shields,
          lastGoalDay: s.lastGoalDay,
          startLevel: s.startLevel,
        };
      },

      hydrateFrom: (data) => set({ ...data }),

      completeLesson: (lessonId, { correct, total }) =>
        set((s) => {
          const lesson = getLesson(lessonId);
          const acc = total > 0 ? correct / total : 0;
          const firstTime = !s.completed.includes(lessonId);
          const stars = acc === 1 ? 3 : acc >= 0.8 ? 2 : 1;
          const gain = correct * 10;

          // SRS: siembra/repasa el vocabulario de la lección.
          const now = Date.now();
          const quality = qualityFromAccuracy(acc);
          const cards = { ...s.cards };
          for (const v of lesson?.vocab ?? []) {
            const card = cards[v.en] ?? newCard(v.en, now);
            cards[v.en] = review(card, quality, now);
          }

          const { days, today } = addToday(s.days, { xp: gain, lessons: 1, correct });
          const streak = bumpStreak({ ...s, gems: s.gems + (firstTime ? 5 : 0) }, today.xp);

          return {
            xp: s.xp + gain,
            gems: s.gems + (firstTime ? 5 : 0),
            lastActiveDay: todayStr(),
            completed: firstTime ? [...s.completed, lessonId] : s.completed,
            stars: { ...s.stars, [lessonId]: Math.max(s.stars[lessonId] ?? 0, stars) },
            cards,
            days,
            ...(streak ?? {}),
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
          const gain = hits * 5;
          const { days, today } = addToday(s.days, { xp: gain, reviews: hits });
          const streak = bumpStreak(s, today.xp);
          return {
            cards,
            xp: s.xp + gain,
            lastActiveDay: todayStr(),
            days,
            ...(streak ?? {}),
          };
        }),

      noteTutorMessage: () =>
        set((s) => ({
          tutorMessages: s.tutorMessages + 1,
          days: addToday(s.days, { tutor: 1 }).days,
        })),

      noteListen: () =>
        set((s) => ({
          listens: s.listens + 1,
          days: addToday(s.days, { listens: 1 }).days,
        })),

      setGoal: (xp) => set({ goalXp: xp }),

      setStartLevel: (level) => set({ startLevel: level }),

      claimChallenge: (challenge) =>
        set((s) => {
          if (s.claims[challenge.key]) return {};
          const done = challengeProgress(challenge, s.days, new Date()) >= challenge.target;
          if (!done) return {};
          return {
            gems: s.gems + challenge.reward,
            claims: { ...s.claims, [challenge.key]: Date.now() },
          };
        }),

      buyShield: () =>
        set((s) =>
          s.gems < SHIELD_COST
            ? {}
            : { gems: s.gems - SHIELD_COST, shields: s.shields + 1 },
        ),

      reset: () => set({ ...initial }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "parlo-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => s.snapshot(),
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
/** XP conseguida hoy (lo que mide el objetivo diario). */
export function todayXp(days: Record<string, DayStats>): number {
  return days[todayStr()]?.xp ?? 0;
}
export function goalDone(days: Record<string, DayStats>, goalXp: number): boolean {
  return todayXp(days) >= goalXp;
}
