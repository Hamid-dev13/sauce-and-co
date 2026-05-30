"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SaucesCta() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--moutarde)] py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-marker text-2xl text-[var(--rouge-deep)]">
            Bon. Maintenant, le vrai test ↓
          </p>

          <h2 className="font-display text-4xl uppercase leading-[0.9] text-[var(--noir)] sm:text-5xl md:text-7xl">
            Lesquelles t'as <span className="text-[var(--rouge-sauce)]">pas encore</span> essayées&nbsp;?
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-lg text-[var(--noir)]/80">
            On le sait. Tu hésites. Spoiler : prends-en deux différentes. Le
            burger vient avec, en option. Aucune raison de se priver.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/menu"
              className="group flex items-center justify-center gap-3 border-brutal bg-[var(--noir)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
            >
              Choisir mon burger
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/nous-trouver"
              className="border-brutal bg-[var(--creme)] px-8 py-4 text-center font-display text-lg uppercase tracking-wider text-[var(--noir)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Venir au local
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
