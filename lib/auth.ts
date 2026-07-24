import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ponytail: auth demo — un único usuario hardcodeado, sin backend.
// TODO: reemplazar por Firebase Auth (email + PIN real) cuando toque.
const DEMO_EMAIL = "andresmancilla08@gmail.com";
const DEMO_PIN = "1111";

type AuthState = {
  email: string | null;
  hydrated: boolean;
  login: (email: string, pin: string) => { ok: boolean; error?: string };
  logout: () => void;
  setHydrated: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      hydrated: false,
      login: (email, pin) => {
        const e = email.trim().toLowerCase();
        if (e === DEMO_EMAIL && pin === DEMO_PIN) {
          set({ email: e });
          return { ok: true };
        }
        return { ok: false, error: "Correo o PIN incorrecto." };
      },
      logout: () => set({ email: null }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "parlo-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ email: s.email }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);
