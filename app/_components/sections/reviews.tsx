"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "../../_data/reviews";

export default function Reviews() {
  return (
    <section className="border-b-[3px] border-[var(--noir)] bg-[var(--moutarde)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-2 font-marker text-lg text-[var(--rouge-deep)]">
            Sur Google, on est plutôt bien placés
          </p>
          <h2 className="font-display text-4xl uppercase leading-none text-[var(--noir)] sm:text-5xl md:text-7xl">
            4,9 sur 5.{" "}
            <span className="text-[var(--rouge-sauce)]">612 avis.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="relative flex flex-col gap-4 border-brutal bg-[var(--creme)] p-6 shadow-brutal"
            >
              <Quote
                size={32}
                className="absolute -right-2 -top-2 text-[var(--rouge-sauce)]"
                fill="currentColor"
              />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    fill={j < r.rating ? "currentColor" : "transparent"}
                    className={
                      j < r.rating ? "text-[var(--moutarde)]" : "text-[var(--noir)]/20"
                    }
                  />
                ))}
              </div>
              <p className="flex-1 text-[var(--noir)]/85">"{r.text}"</p>
              <div className="flex items-center gap-3 border-t-2 border-[var(--noir)]/15 pt-4">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-[var(--noir)] object-cover"
                />
                <div>
                  <p className="font-display text-sm uppercase">{r.name}</p>
                  <p className="text-xs text-[var(--noir)]/60">{r.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
