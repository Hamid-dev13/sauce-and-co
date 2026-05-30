"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  Droplets,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { useAuth } from "../../_lib/auth-store";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Commandes", icon: ClipboardList },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/sauces", label: "Sauces", icon: Droplets },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuth((s) => s.logout);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="sticky top-[33px] z-30 flex items-center justify-between border-b-[3px] border-[var(--noir)] bg-[var(--noir)] px-4 py-3 text-[var(--creme)] md:hidden">
        <Link
          href="/admin"
          className="flex items-baseline gap-1 font-display text-xl"
        >
          SAUCE
          <span className="text-[var(--rouge-sauce)]">&</span>
          CO
          <span className="text-[var(--rouge-sauce)]">.</span>
          <span className="ml-2 font-marker text-sm text-[var(--moutarde)]">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="border-2 border-[var(--creme)] p-1.5"
          aria-label="Ouvrir le menu"
        >
          <MenuIcon size={18} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-[var(--noir)]/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar (desktop static, mobile drawer) */}
      <aside
        className={`fixed top-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r-[3px] border-[var(--noir)] bg-[var(--noir)] text-[var(--creme)] transition-transform duration-300 md:sticky md:top-[33px] md:h-[calc(100vh-33px)] md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + close on mobile */}
        <div className="flex items-center justify-between border-b-2 border-[var(--creme)]/15 p-6">
          <Link
            href="/admin"
            onClick={close}
            className="flex items-baseline gap-1 font-display text-2xl"
          >
            SAUCE
            <span className="text-[var(--rouge-sauce)]">&</span>
            CO
            <span className="text-[var(--rouge-sauce)]">.</span>
          </Link>
          <button
            onClick={close}
            className="text-[var(--creme)] md:hidden"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        <p className="px-6 pb-4 font-marker text-sm text-[var(--moutarde)]">
          Back-office
        </p>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`flex items-center gap-3 border-2 px-4 py-3 font-display text-sm uppercase tracking-wider transition-all ${
                      active
                        ? "border-[var(--noir)] bg-[var(--rouge-sauce)] text-[var(--creme)] shadow-[3px_3px_0_0_var(--moutarde)]"
                        : "border-transparent text-[var(--creme)]/70 hover:border-[var(--creme)]/20 hover:bg-[var(--creme)]/5 hover:text-[var(--creme)]"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="space-y-1 border-t-2 border-[var(--creme)]/15 p-3">
          <Link
            href="/"
            target="_blank"
            onClick={close}
            className="flex items-center gap-3 border-2 border-transparent px-4 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)]/70 transition-colors hover:border-[var(--creme)]/20 hover:bg-[var(--creme)]/5 hover:text-[var(--moutarde)]"
          >
            <ExternalLink size={16} />
            Voir le site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 border-2 border-transparent px-4 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)]/70 transition-colors hover:border-[var(--rouge-sauce)] hover:bg-[var(--rouge-sauce)]/10 hover:text-[var(--rouge-sauce)]"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
