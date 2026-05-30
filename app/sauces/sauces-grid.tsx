"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { sauces } from "../_data/sauces";

export default function SaucesGrid() {
  return (
    <section className="border-b-[3px] border-[var(--noir)] bg-[var(--kraft)] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center font-marker text-2xl text-[var(--noir)]">
          Clique sur une sauce pour son histoire complète ↓
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sauces.map((s, i) => (
            <motion.a
              key={s.id}
              href={`#sauce-${s.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative flex aspect-square flex-col justify-between overflow-hidden border-brutal bg-[var(--creme)] p-4 transition-transform hover:-translate-y-1"
              style={{ boxShadow: `6px 6px 0 0 ${s.color}` }}
            >
              {/* Color tag big */}
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full"
                style={{ background: s.color }}
              />
              <div className="relative z-10">
                <div className="font-display text-3xl uppercase leading-none text-[var(--noir)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 flex gap-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Flame
                      key={j}
                      size={10}
                      fill={j < s.spice ? "var(--rouge-sauce)" : "transparent"}
                      className={
                        j < s.spice
                          ? "text-[var(--rouge-sauce)]"
                          : "text-[var(--noir)]/20"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-xl uppercase leading-none text-[var(--noir)]">
                  {s.name}
                </h3>
                <p className="mt-1 font-marker text-sm text-[var(--noir)]/70">
                  {s.tagline}
                </p>
              </div>

              <div
                className="absolute bottom-0 left-0 h-2 w-full transition-all duration-300 group-hover:h-4"
                style={{ background: s.color }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
