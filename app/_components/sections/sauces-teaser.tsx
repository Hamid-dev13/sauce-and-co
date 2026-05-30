"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import { sauces } from "../../_data/sauces";

export default function SaucesTeaser() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--noir)] py-20 text-[var(--creme)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 font-marker text-xl text-[var(--moutarde)]">
              Le vrai différenciant
            </p>
            <h2 className="font-display text-4xl uppercase leading-[0.9] sm:text-5xl md:text-7xl">
              <span className="block text-[var(--rouge-sauce)]">8 sauces.</span>
              <span className="block">Aucune machine.</span>
              <span className="block text-[var(--moutarde)]">Aucun mensonge.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[var(--creme)]/80">
            On a passé deux ans à les développer. Chacune a son histoire,
            son piment, sa raison d'exister. On les fait toutes ici, à la main,
            tous les matins. Pas de cartouche industrielle. Pas de mayo
            désincarnée. Juste les vraies.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {sauces.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden border-brutal bg-[var(--creme)]"
              style={{
                boxShadow: `6px 6px 0 0 ${s.color}`,
              }}
            >
              <div
                className="absolute inset-x-0 bottom-0 h-3/5"
                style={{ background: s.color }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="mb-2 flex gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Flame
                      key={j}
                      size={14}
                      fill={j < s.spice ? "var(--rouge-sauce)" : "transparent"}
                      className={
                        j < s.spice ? "text-[var(--rouge-sauce)]" : "text-[var(--noir)]/30"
                      }
                    />
                  ))}
                </div>
                <h3 className="font-display text-xl uppercase leading-none text-[var(--noir)] mix-blend-difference">
                  {s.name}
                </h3>
                <p className="mt-1 text-xs text-[var(--noir)] mix-blend-difference">
                  {s.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/sauces"
            className="group inline-flex items-center gap-3 border-brutal bg-[var(--moutarde)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--noir)] shadow-brutal transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
          >
            Toutes les histoires
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
