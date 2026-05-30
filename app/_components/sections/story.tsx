"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section className="border-b-[3px] border-[var(--noir)] bg-[var(--kraft)] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden border-brutal-thick shadow-brutal">
            <Image
              src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&q=85"
              alt="Préparation des burgers SAUCE&CO"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-7"
        >
          <p className="mb-3 font-marker text-xl text-[var(--rouge-sauce)]">
            On s'est juste posé une question
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            Pourquoi on devrait choisir entre{" "}
            <span className="text-[var(--rouge-sauce)]">vite</span> et{" "}
            <span className="underline-marker">bon</span>&nbsp;?
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--noir)]/85">
            <p>
              SAUCE&CO est né d'un constat simple : le fast food français,
              c'est presque toujours soit rapide et triste, soit bon mais on
              attend 35 minutes. Personne ne fait les deux.
            </p>
            <p className="font-marker text-2xl text-[var(--noir)]">
              Alors on l'a fait.
            </p>
            <p>
              Bœuf charolais, pains briochés cuits le matin, frites coupées
              à la main, et surtout — surtout —{" "}
              <strong className="font-bold underline-marker">
                8 sauces qu'on a mis 2 ans à mettre au point
              </strong>
              . C'est elles qui font le burger. Le reste est juste très bon.
            </p>
            <div className="flex items-center gap-3 pt-4">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80"
                alt="Hamid, fondateur"
                width={56}
                height={56}
                className="h-14 w-14 border-2 border-[var(--noir)] object-cover"
              />
              <div>
                <p className="font-display text-lg uppercase">Le chef</p>
                <p className="text-sm text-[var(--noir)]/60">
                  Fondateur, cuisinier, goûteur officiel.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
