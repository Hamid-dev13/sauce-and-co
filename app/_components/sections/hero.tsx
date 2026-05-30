"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Sticker from "../sticker";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[var(--noir)]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-12 md:grid-cols-12 md:gap-12 md:pb-24 md:pt-20">
        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative md:col-span-7"
        >
          <div className="mb-6 flex items-center gap-3">
            <Sticker variant="black" rotate={-3}>
              Paris XX
            </Sticker>
            <div className="flex items-center gap-1 font-marker text-lg text-[var(--noir)]">
              <Star size={16} fill="currentColor" className="text-[var(--moutarde)]" />
              <Star size={16} fill="currentColor" className="text-[var(--moutarde)]" />
              <Star size={16} fill="currentColor" className="text-[var(--moutarde)]" />
              <Star size={16} fill="currentColor" className="text-[var(--moutarde)]" />
              <Star size={16} fill="currentColor" className="text-[var(--moutarde)]" />
              <span className="ml-1 text-sm">4,9 / 5 (612 avis)</span>
            </div>
          </div>

          <h1 className="font-display text-5xl uppercase leading-[0.85] text-[var(--noir)] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block">Le burger.</span>
            <span className="block text-[var(--rouge-sauce)]">La sauce.</span>
            <span className="block">
              <span className="text-outline">Rien d'autre.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-md font-marker text-2xl text-[var(--noir)]">
            8 sauces maison.{" "}
            <span className="underline-marker">0 compromis.</span>
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/menu"
              className="group flex items-center justify-center gap-3 border-brutal bg-[var(--rouge-sauce)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
            >
              Commander
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/sauces"
              className="border-brutal bg-[var(--creme)] px-8 py-4 text-center font-display text-lg uppercase tracking-wider text-[var(--noir)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Voir les 8 sauces
            </Link>
          </div>
        </motion.div>

        {/* Photo burger + stickers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative md:col-span-5"
        >
          <div className="relative aspect-square overflow-hidden border-brutal-thick shadow-brutal-red">
            <Image
              src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1400&q=85"
              alt="Smash burger SAUCE&CO"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <Sticker
            variant="yellow"
            rotate={-12}
            className="absolute -left-2 top-4 !text-sm md:-left-6 md:top-8 md:!text-base"
          >
            🔥 Best-seller
          </Sticker>
          <Sticker
            variant="red"
            rotate={8}
            className="absolute -bottom-2 right-1 !text-sm md:-bottom-4 md:right-2 md:!text-base"
          >
            Sauce house incluse
          </Sticker>
          <div
            className="absolute -bottom-6 -right-2 flex h-20 w-20 items-center justify-center rounded-full border-brutal bg-[var(--moutarde)] font-display text-xl uppercase leading-none text-[var(--noir)] shadow-brutal-sm md:-bottom-10 md:-right-6 md:h-24 md:w-24"
            style={{ transform: "rotate(-8deg)" }}
          >
            <div className="text-center">
              <div className="text-xl md:text-2xl">12€</div>
              <div className="text-[10px] font-marker normal-case tracking-normal">
                seulement
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
