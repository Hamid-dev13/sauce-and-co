"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "../_lib/cart-store";
import { products } from "../_data/products";

export default function CartDrawer() {
  const pathname = usePathname();
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const remove = useCart((s) => s.remove);

  if (pathname?.includes("/admin")) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-[var(--noir)]/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l-[3px] border-[var(--noir)] bg-[var(--creme)]"
          >
            <header className="flex items-center justify-between border-b-[3px] border-[var(--noir)] bg-[var(--rouge-sauce)] px-6 py-4 text-[var(--creme)]">
              <h2 className="font-display text-2xl uppercase tracking-wider">
                Ta commande
              </h2>
              <button onClick={close} aria-label="Fermer">
                <X size={24} />
              </button>
            </header>

            <div className="sauceco-scroll flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-12 text-center">
                  <p className="font-marker text-2xl text-[var(--noir)]">
                    Panier vide.
                  </p>
                  <p className="text-sm text-[var(--noir)]/70">
                    Va te chercher un burger, ça presse.
                  </p>
                  <Link
                    href="/menu"
                    onClick={close}
                    className="mt-4 border-brutal bg-[var(--noir)] px-5 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                  >
                    Voir le menu →
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col">
                  {items.map((item) => {
                    const p = products.find((p) => p.id === item.productId);
                    if (!p) return null;
                    return (
                      <li
                        key={item.productId}
                        className="flex gap-4 border-b-2 border-[var(--noir)]/15 p-4"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-[var(--noir)]">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-lg uppercase leading-tight">
                              {p.name}
                            </h3>
                            <button
                              onClick={() => remove(item.productId)}
                              className="text-[var(--noir)]/50 hover:text-[var(--rouge-sauce)]"
                              aria-label="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border-2 border-[var(--noir)]">
                              <button
                                onClick={() => decrement(item.productId)}
                                className="px-2 py-1 hover:bg-[var(--noir)] hover:text-[var(--creme)]"
                                aria-label="Moins"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-8 px-2 text-center font-display">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => increment(item.productId)}
                                className="px-2 py-1 hover:bg-[var(--noir)] hover:text-[var(--creme)]"
                                aria-label="Plus"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-display text-lg">
                              {(p.price * item.qty).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t-[3px] border-[var(--noir)] bg-[var(--creme)] p-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-display text-xl uppercase">Total</span>
                  <span className="font-display text-3xl">
                    {total.toFixed(2)}€
                  </span>
                </div>
                <Link
                  href="/commander"
                  onClick={close}
                  className="group flex w-full items-center justify-center gap-2 border-brutal bg-[var(--rouge-sauce)] py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
                >
                  Passer commande
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
