"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Preferencias de la conversación con el tutor (se cambian en el perfil).
 *
 * `strict` = la puerta de antes: las correcciones bloquean la charla hasta
 * leerlas. Por defecto apagado: la respuesta suena enseguida y las
 * correcciones aparecen debajo de tu mensaje sin cortar el ritmo. En manos
 * libres siempre se corrige en suave (nadie toca la pantalla para seguir).
 */
export const useCoachPrefs = create<{ strict: boolean; setStrict: (on: boolean) => void }>()(
  persist((set) => ({ strict: false, setStrict: (strict) => set({ strict }) }), {
    name: "parlo-coach-prefs",
    storage: createJSONStorage(() => localStorage),
  }),
);
