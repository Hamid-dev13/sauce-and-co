"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../_lib/cart-store";

const links = [
  { label: "Menu", href: "/menu" },
  { label: "Les sauces", href: "/sauces" },
  { label: "Le local", href: "/nous-trouver" },
  { label: "L'histoire", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);
  if (pathname?.includes("/admin")) return null;

  return (
    <nav className="sticky top-0 z-40 border-b-[3px] border-[var(--noir)] bg-[var(--creme)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="flex items-baseline gap-1 font-display text-3xl text-[var(--noir)]"
        >
          SAUCE
          <span className="text-[var(--rouge-sauce)]">&</span>
          CO
          <span className="-ml-1 text-[var(--rouge-sauce)]">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-display text-lg uppercase tracking-wider text-[var(--noir)] transition-colors hover:text-[var(--rouge-sauce)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 border-brutal bg-[var(--rouge-sauce)] px-4 py-2 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            aria-label="Voir le panier"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Panier</span>
            {hasHydrated && count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--moutarde)] px-1 text-xs font-bold text-[var(--noir)]">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-[var(--noir)] md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-[3px] border-[var(--noir)] bg-[var(--creme)] md:hidden">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-xl uppercase tracking-wider text-[var(--noir)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
