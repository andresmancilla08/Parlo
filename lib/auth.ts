import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// El email se guarda solo para la UI (saludo, avatar). La verdad de la sesión es
// la cookie httpOnly firmada que valida el proxy. Las credenciales viven en el
// servidor (/api/login), NO en este bundle.
type AuthState = {
  email: string | null;
  hydrated: boolean;
  login: (email: string, pin: string) => Promise<{ ok: boolean }>;
  logout: () => Promise<void>;
  setHydrated: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      hydrated: false,
      login: async (email, pin) => {
        try {
          const res = await fetch("/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, pin }),
          });
          if (!res.ok) return { ok: false };
          const data = (await res.json()) as { email: string };
          set({ email: data.email });
          return { ok: true };
        } catch {
          return { ok: false };
        }
      },
      logout: async () => {
        try {
          await fetch("/api/logout", { method: "POST" });
        } finally {
          set({ email: null });
        }
      },
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
