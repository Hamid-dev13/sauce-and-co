"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { sauces } from "../_data/sauces";
import Sticker from "../_components/sticker";

const spiceLabels = ["Doux", "Léger", "Ça réveille", "Ça pique sec"];

export default function SaucesStories() {
  return (
    <section className="border-b-[3px] border-[var(--noir)] bg-[var(--creme)]">
      {sauces.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <div
            key={s.id}
            id={`sauce-${s.id}`}
            className={`border-b-2 border-[var(--noir)]/15 py-20 last:border-b-0`}
            style={{
              backgroundColor: reverse ? "var(--kraft)" : "var(--creme)",
            }}
          >
            <div className="mx-auto max-w-7xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid items-center gap-12 md:grid-cols-12 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Visual */}
                <div className="md:col-span-5">
                  <div
                    className="relative aspect-square overflow-hidden border-brutal-thick"
                    style={{
                      backgroundColor: s.color,
                      boxShadow: `8px 8px 0 0 var(--noir)`,
                    }}
                  >
                    {/* Texture glaze */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6) 0%, transparent 35%)",
                      }}
                    />
                    {/* Splatter */}
                    <svg
                      viewBox="0 0 200 200"
                      className="absolute inset-0 h-full w-full mix-blend-overlay"
                    >
                      <circle cx="40" cy="50" r="6" fill="rgba(0,0,0,0.2)" />
                      <circle cx="160" cy="80" r="8" fill="rgba(0,0,0,0.2)" />
                      <circle cx="80" cy="160" r="5" fill="rgba(0,0,0,0.2)" />
                      <circle cx="140" cy="170" r="10" fill="rgba(0,0,0,0.2)" />
                      <circle cx="20" cy="180" r="4" fill="rgba(0,0,0,0.2)" />
                    </svg>
                    {/* Number stamp */}
                    <div
                      className="absolute left-6 top-6 font-display text-8xl uppercase leading-none mix-blend-difference"
                      style={{ color: "#fff" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="border-2 border-[var(--noir)] bg-[var(--creme)] px-3 py-2 text-center">
                        <p className="font-display text-2xl uppercase leading-none text-[var(--noir)]">
                          {s.name}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wider text-[var(--noir)]/70">
                          Sauce maison · 30g
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-display text-3xl text-[var(--rouge-sauce)]">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <Flame
                          key={j}
                          size={18}
                          fill={
                            j < s.spice ? "var(--rouge-sauce)" : "transparent"
                          }
                          className={
                            j < s.spice
                              ? "text-[var(--rouge-sauce)]"
                              : "text-[var(--noir)]/20"
                          }
                        />
                      ))}
                      <span className="ml-2 font-marker text-base text-[var(--noir)]/70">
                        {spiceLabels[s.spice]}
                      </span>
                    </div>
                  </div>

                  <h2 className="font-display text-4xl uppercase leading-none text-[var(--noir)] sm:text-5xl md:text-7xl">
                    {s.name}
                  </h2>

                  <p className="mt-4 font-marker text-2xl text-[var(--rouge-sauce)]">
                    {s.tagline}
                  </p>

                  <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--noir)]/85">
                    {s.story}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Sticker variant="black" rotate={-3}>
                      Incluse avec ton burger
                    </Sticker>
                    {s.spice >= 2 && (
                      <Sticker variant="red" rotate={2}>
                        🌶 Attention ça pique
                      </Sticker>
                    )}
                    {i === 0 && (
                      <Sticker variant="yellow" rotate={-4}>
                        Best-seller
                      </Sticker>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
