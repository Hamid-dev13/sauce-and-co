"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";

export default function MapCta() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--rouge-sauce)] py-20 text-[var(--creme)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-marker text-xl text-[var(--moutarde)]">
              Tu es où ? Nous on est là ↓
            </p>
            <h2 className="font-display text-4xl uppercase leading-[0.9] sm:text-5xl md:text-7xl">
              Dans le 20<sup className="text-3xl md:text-5xl">ème</sup>,
              <span className="block text-[var(--moutarde)]">à Belleville.</span>
            </h2>

            <ul className="mt-10 flex flex-col gap-5 text-lg">
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--creme)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-display uppercase">14 rue de Belleville</p>
                  <p className="text-sm text-[var(--creme)]/80">75020 Paris</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--creme)]">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-display uppercase">Tous les jours</p>
                  <p className="text-sm text-[var(--creme)]/80">
                    11h30 → 23h00 (Ven-Sam 01h00)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--creme)]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-display uppercase">01 43 12 56 78</p>
                  <p className="text-sm text-[var(--creme)]/80">
                    Pour les commandes groupées
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/commander"
                className="group flex items-center justify-center gap-3 border-brutal bg-[var(--moutarde)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--noir)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
              >
                Commander maintenant
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/nous-trouver"
                className="border-brutal bg-[var(--noir)] px-8 py-4 text-center font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Voir le plan
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative aspect-square overflow-hidden border-brutal-thick bg-[var(--creme)] shadow-brutal"
          >
            <div className="absolute inset-0 bg-checker opacity-15" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--noir)]">
              <MapPin size={64} className="text-[var(--rouge-sauce)]" fill="currentColor" />
              <p className="font-display text-3xl uppercase">SAUCE&CO</p>
              <p className="font-marker text-lg">Belleville, Paris</p>
              <p className="mt-4 text-sm text-[var(--noir)]/60">Carte interactive →</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
