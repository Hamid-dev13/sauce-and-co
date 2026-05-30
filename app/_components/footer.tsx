"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.includes("/admin")) return null;
  return (
    <footer className="border-t-[3px] border-[var(--noir)] bg-[var(--noir)] text-[var(--creme)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-display text-5xl text-[var(--creme)]">
              SAUCE<span className="text-[var(--rouge-sauce)]">&</span>CO
              <span className="text-[var(--rouge-sauce)]">.</span>
            </h3>
            <p className="mt-4 max-w-md font-marker text-lg text-[var(--moutarde)]">
              On fait la sauce. Toi tu mets l'ambiance.
            </p>
            <p className="mt-6 max-w-md text-sm text-[var(--creme)]/70">
              8 sauces maison, des smash burgers comme là-bas, et zéro
              compromis sur la qualité. Depuis 2024.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg uppercase tracking-wider text-[var(--moutarde)]">
              Le menu
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/menu" className="hover:text-[var(--rouge-sauce)]">
                  Tout le menu
                </Link>
              </li>
              <li>
                <Link href="/sauces" className="hover:text-[var(--rouge-sauce)]">
                  Les 8 sauces
                </Link>
              </li>
              <li>
                <Link href="/commander" className="hover:text-[var(--rouge-sauce)]">
                  Commander
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-lg uppercase tracking-wider text-[var(--moutarde)]">
              Le local
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>14 rue de Belleville, 75020 Paris</li>
              <li>Lun-Dim 11h30 — 23h00</li>
              <li>Ven-Sam jusqu'à 01h00</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border-2 border-[var(--creme)] text-[var(--creme)] transition-colors hover:bg-[var(--rouge-sauce)] hover:border-[var(--rouge-sauce)]"
              >
                <IconInstagram />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center border-2 border-[var(--creme)] text-[var(--creme)] transition-colors hover:bg-[var(--rouge-sauce)] hover:border-[var(--rouge-sauce)]"
              >
                <IconFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--creme)]/20 pt-6 text-xs text-[var(--creme)]/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} SAUCE&CO. Tous droits réservés (sauf les recettes).</p>
          <p>
            Démo portfolio — réalisée par{" "}
            <a
              href="https://github.com/Hamid-dev13"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-[var(--moutarde)]"
            >
              Hamid Bennacef
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
