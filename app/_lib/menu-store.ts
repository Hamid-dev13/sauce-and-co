"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type MenuOverride = {
  available?: boolean;
  price?: number;
};

type MenuState = {
  overrides: Record<string, MenuOverride>;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  toggleAvailable: (productId: string, current: boolean) => void;
  setPrice: (productId: string, price: number) => void;
  reset: (productId: string) => void;
  resetAll: () => void;
};

export const useMenu = create<MenuState>()(
  persist(
    (set) => ({
      overrides: {},
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      toggleAvailable: (productId, current) =>
        set((s) => ({
          overrides: {
            ...s.overrides,
            [productId]: {
              ...s.overrides[productId],
              available: !(s.overrides[productId]?.available ?? current),
            },
          },
        })),
      setPrice: (productId, price) =>
        set((s) => ({
          overrides: {
            ...s.overrides,
            [productId]: { ...s.overrides[productId], price },
          },
        })),
      reset: (productId) =>
        set((s) => {
          const next = { ...s.overrides };
          delete next[productId];
          return { overrides: next };
        }),
      resetAll: () => set({ overrides: {} }),
    }),
    {
      name: "sauceco-menu",
      partialize: (state) => ({ overrides: state.overrides }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
