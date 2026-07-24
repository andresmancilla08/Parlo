import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycle: () => void;
};

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (t) => set({ theme: t }),
      cycle: () => {
        const order: Theme[] = ["light", "dark", "system"];
        set({ theme: order[(order.indexOf(get().theme) + 1) % order.length] });
      },
    }),
    { name: "parlo-theme", storage: createJSONStorage(() => localStorage) },
  ),
);

/** Aplica la clase `dark` en <html> según el tema (resolviendo `system`). */
export function applyTheme(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}
