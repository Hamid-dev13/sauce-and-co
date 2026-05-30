"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "../_data/products";
import type { CartItem } from "./types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (productId: string, sauceId?: string) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      add: (productId, sauceId) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...s.items, { productId, qty: 1, sauceId }] };
        }),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      increment: (productId) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + 1 } : i
          ),
        })),
      decrement: (productId) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.productId === productId ? { ...i, qty: i.qty - 1 } : i
            )
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((acc, i) => acc + i.qty, 0),
      total: () =>
        get().items.reduce((acc, i) => {
          const p = products.find((p) => p.id === i.productId);
          return acc + (p ? p.price * i.qty : 0);
        }, 0),
    }),
    {
      name: "sauceco-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
