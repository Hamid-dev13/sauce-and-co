"use client";

import { motion } from "framer-motion";
import { Hand, Wallet, Utensils } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Hand,
    title: "Tu choisis",
    text: "Burger, sauce, frites, shake. Tu prends ce qui te fait kiffer, point.",
  },
  {
    n: "02",
    icon: Wallet,
    title: "Tu paies",
    text: "Sur place ou en ligne. CB, espèces, ticket-resto. Pas de chichi.",
  },
  {
    n: "03",
    icon: Utensils,
    title: "Tu régales",
    text: "8 minutes, ton plateau est prêt. Mange chaud, c'est meilleur.",
  },
];

export default function Process() {
  return (
    <section className="border-b-[3px] border-[var(--noir)] bg-[var(--rouge-sauce)] py-20 text-[var(--creme)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-2 font-marker text-lg text-[var(--moutarde)]">
            Comment ça marche
          </p>
          <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl md:text-7xl">
            3 étapes. <span className="text-[var(--moutarde)]">0 prise de tête.</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border-brutal bg-[var(--creme)] p-8 text-[var(--noir)] shadow-brutal"
            >
              <div className="absolute -top-6 left-6 font-display text-6xl text-[var(--rouge-sauce)] [-webkit-text-stroke:2px_var(--noir)]">
                {s.n}
              </div>
              <div className="mb-6 mt-4 flex h-14 w-14 items-center justify-center border-brutal bg-[var(--moutarde)] text-[var(--noir)] shadow-brutal-sm">
                <s.icon size={26} />
              </div>
              <h3 className="font-display text-2xl uppercase">{s.title}</h3>
              <p className="mt-3 text-[var(--noir)]/75">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
