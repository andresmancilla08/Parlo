"use client";

import { useEffect, useRef } from "react";
import { weekDays } from "@/lib/gamification";
import { useProgress } from "@/lib/progress";
import { pushScore, useLeague, weeklyXp } from "@/lib/league";

// Publica MI XP de la semana en la liga cuando cambia el progreso. Sin esto,
// el marcador sólo se actualizaría al abrir la pantalla de la liga y los demás
// verían datos viejos.
//
// Igual que el sync del progreso: debounce y fallo silencioso (la liga es un
// extra; que no haya red no puede romper la sesión de estudio).

const DEBOUNCE_MS = 4000;

export function useLeagueSync(uid: string | null) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!uid) return;

    function publish() {
      const { leagueId, alias } = useLeague.getState();
      if (!leagueId || !alias || !uid) return;
      const now = new Date();
      const xp = weeklyXp(useProgress.getState().days, weekDays(now));
      pushScore(leagueId, uid, alias, xp, now).catch(() => {
        // Sin red o fuera de la liga: se reintenta en el próximo cambio.
      });
    }

    publish(); // al entrar, por si se estudió en otro dispositivo

    const unsubscribe = useProgress.subscribe((state) => {
      if (!state.hydrated) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(publish, DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [uid]);
}
