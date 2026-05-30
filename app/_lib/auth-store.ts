"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isLoggedIn: boolean;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      login: (user, pass) => {
        if (user === "admin" && pass === "admin") {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "sauceco-auth",
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
