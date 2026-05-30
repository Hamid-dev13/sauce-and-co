"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Sticker from "../_components/sticker";

const milestones = [
  { year: "2022", title: "L'idée", text: "Deux burgers ratés dans la même soirée. On en a marre. On décide de faire mieux." },
  { year: "2023", title: "La R&D", text: "8 mois à goûter du bœuf, tester 47 recettes de sauce, perdre du poids en goûtant." },
  { year: "2023", title: "La sauce", text: "On valide les 8 recettes. La House Sauce remporte les 4 panels de dégustation." },
  { year: "2024", title: "L'ouverture", text: "14 rue de Belleville. 2 fours, 8 sauces, 1 four à charbon. On y est." },
  { year: "2025", title: "612 avis", text: "4,9/5 sur Google. On est plutôt contents. On change rien." },
];

const promises = [
  {
    title: "Tout est fait ici",
    text: "Aucune cartouche industrielle. Aucune mayo sous vide. Aucune triche.",
  },
  {
    title: "Du bœuf charolais",
    text: "100% origine France. Notre boucher passe chaque mardi. On sait son prénom.",
  },
  {
    title: "Le pain du matin",
    text: "Brioché beurré, cuit avant 6h chez Pelletier rue Piat. Bonjour Christophe.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--noir)] py-20 text-[var(--creme)]">
        <div className="mx-auto max-w-7xl px-6">
          <Sticker variant="yellow" rotate={-3} className="mb-6">
            Depuis 2024
          </Sticker>
          <h1 className="font-display text-5xl uppercase leading-[0.85] sm:text-6xl md:text-8xl lg:text-9xl">
            On n'a pas <br />
            <span className="text-[var(--rouge-sauce)]">réinventé</span> <br />
            le burger.
          </h1>
          <p className="mt-8 max-w-xl font-marker text-2xl text-[var(--moutarde)]">
            On l'a juste pris au sérieux.
          </p>
        </div>
      </header>

      {/* Intro */}
      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--creme)] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:items-center">
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
                alt="Préparation des burgers"
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
            className="space-y-5 md:col-span-7"
          >
            <p className="font-marker text-2xl text-[var(--rouge-sauce)]">
              On voulait juste un bon burger.
            </p>
            <p className="text-lg leading-relaxed text-[var(--noir)]/85">
              SAUCE&CO est né de la même frustration qui vous traverse à 22h le
              jeudi : t'as faim, tu veux un truc rapide, mais tu veux pas
              manger un truc triste. À Paris, fallait choisir : ou la vitesse,
              ou le goût. Rarement les deux.
            </p>
            <p className="font-marker text-xl text-[var(--noir)]">
              On a refusé de choisir.
            </p>
            <p className="text-lg leading-relaxed text-[var(--noir)]/85">
              On a passé 2 ans à mettre au point les 8 sauces qui font notre
              signature. On a sourcé le bœuf charolais, on a trouvé le bon
              boulanger, on a installé un four à charbon. Et on a ouvert.
            </p>
            <p className="text-lg leading-relaxed text-[var(--noir)]/85">
              Aujourd'hui on est{" "}
              <strong className="font-bold underline-marker">
                4 dans la cuisine, 2 en salle
              </strong>
              , et on sert près de 200 burgers par jour. Toujours dans le même
              local. Toujours faits sur place. Toujours avec la même sauce
              maison.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--kraft)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="font-marker text-xl text-[var(--rouge-sauce)]">
              Comment on en est arrivés là
            </p>
            <h2 className="font-display text-5xl uppercase leading-none text-[var(--noir)] md:text-7xl">
              La chronologie
            </h2>
          </div>

          <ol className="relative space-y-12 border-l-[3px] border-[var(--noir)] pl-10">
            {milestones.map((m, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[3.25rem] flex h-10 w-10 items-center justify-center border-brutal bg-[var(--rouge-sauce)] font-display text-xs text-[var(--creme)] shadow-brutal-sm">
                  {m.year.slice(2)}
                </span>
                <div className="border-brutal bg-[var(--creme)] p-6 shadow-brutal-sm">
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="font-display text-3xl text-[var(--rouge-sauce)]">
                      {m.year}
                    </span>
                    <span className="font-display text-2xl uppercase text-[var(--noir)]">
                      {m.title}
                    </span>
                  </div>
                  <p className="text-[var(--noir)]/80">{m.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Promesses */}
      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--rouge-sauce)] py-20 text-[var(--creme)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="font-marker text-xl text-[var(--moutarde)]">
              Ce qu'on s'engage à faire
            </p>
            <h2 className="font-display text-5xl uppercase leading-none md:text-7xl">
              3 promesses. <br />
              <span className="text-[var(--moutarde)]">Pas une de plus.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {promises.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative border-brutal bg-[var(--creme)] p-8 text-[var(--noir)] shadow-brutal"
              >
                <span className="absolute -top-5 left-6 font-display text-7xl uppercase leading-none text-[var(--moutarde)] [-webkit-text-stroke:2px_var(--noir)]">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl uppercase">{p.title}</h3>
                <p className="mt-3 text-[var(--noir)]/80">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[var(--noir)] py-20 text-center text-[var(--creme)]">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-5xl uppercase leading-[0.9] md:text-7xl">
            Bon. <br />
            <span className="text-[var(--moutarde)]">On en mange un ?</span>
          </h2>
          <Link
            href="/menu"
            className="group mt-12 inline-flex items-center gap-3 border-brutal bg-[var(--rouge-sauce)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
          >
            Voir le menu
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
