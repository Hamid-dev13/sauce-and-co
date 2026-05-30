"use client";

import { motion } from "framer-motion";
import { sauces } from "../_data/sauces";
import Sticker from "../_components/sticker";

export default function SaucesHero() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--noir)] py-20 text-[var(--creme)]">
      {/* Drops de sauce en fond */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {sauces.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className="absolute rounded-full blur-3xl"
            style={{
              background: s.color,
              width: `${180 + (i % 3) * 80}px`,
              height: `${180 + (i % 3) * 80}px`,
              left: `${(i * 13) % 90}%`,
              top: `${(i * 23) % 70 + 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Sticker variant="red" rotate={-4}>
              Le différenciant
            </Sticker>
            <Sticker variant="yellow" rotate={3}>
              Maison 100%
            </Sticker>
          </div>

          <h1 className="font-display text-5xl uppercase leading-[0.85] sm:text-7xl md:text-[8rem] lg:text-[11rem] xl:text-[13rem]">
            <span className="block">8 sauces.</span>
            <span className="block text-[var(--moutarde)]">8 histoires.</span>
            <span className="block">
              <span className="text-outline" style={{ WebkitTextStroke: "2px var(--creme)" }}>
                0 cartouche.
              </span>
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-[var(--creme)]/80 md:text-2xl">
            On a passé{" "}
            <span className="font-marker text-[var(--moutarde)]">deux ans</span>{" "}
            à mettre au point chacune. Toutes sont préparées ici, à la main,
            tous les matins. Aucune sortie d'une cartouche. Aucune trace
            d'industriel. Et toutes sont incluses avec ton burger.
          </p>

          <p className="mt-6 font-marker text-2xl text-[var(--rouge-sauce)]">
            Voilà comment elles s'appellent ↓
          </p>
        </motion.div>
      </div>
    </section>
  );
}
