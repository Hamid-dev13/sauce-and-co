"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Sticker from "../sticker";

const photos = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=800&q=80",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",
  "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80",
  "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&q=80",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80",
  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
];

export default function Gallery() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--creme)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 font-marker text-lg text-[var(--rouge-sauce)]">
              #sauceandco sur Instagram
            </p>
            <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl md:text-7xl">
              On a faim juste à regarder.
            </h2>
          </div>
          <Sticker variant="yellow" rotate={6} className="hidden sm:block">
            @sauceandco
          </Sticker>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className={`relative overflow-hidden border-brutal shadow-brutal-sm ${
                (i === 0 || i === 5)
                  ? "md:row-span-2 md:aspect-[1/2] aspect-square"
                  : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={`Photo ${i + 1}`}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
