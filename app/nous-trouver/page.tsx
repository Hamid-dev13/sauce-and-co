"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Mail, Bike, Car } from "lucide-react";
import Sticker from "../_components/sticker";

const hours = [
  { day: "Lundi", time: "11h30 — 23h00" },
  { day: "Mardi", time: "11h30 — 23h00" },
  { day: "Mercredi", time: "11h30 — 23h00" },
  { day: "Jeudi", time: "11h30 — 23h00" },
  { day: "Vendredi", time: "11h30 — 01h00", highlight: true },
  { day: "Samedi", time: "11h30 — 01h00", highlight: true },
  { day: "Dimanche", time: "12h00 — 22h00" },
];

const spotPhotos = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=85",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1000&q=85",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1000&q=85",
];

export default function NousTrouverPage() {
  return (
    <>
      <header className="border-b-[3px] border-[var(--noir)] bg-[var(--vert-salsa)] py-16 text-[var(--creme)]">
        <div className="mx-auto max-w-7xl px-6">
          <Sticker variant="black" rotate={-3} className="mb-4">
            Belleville 75020
          </Sticker>
          <h1 className="font-display text-4xl uppercase leading-[0.9] sm:text-5xl md:text-7xl lg:text-8xl">
            On est ici. <br />
            <span className="text-[var(--moutarde)]">Pas ailleurs.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--creme)]/80">
            Un seul local pour l'instant. À deux pas du métro Belleville, entre
            le Café A et la boulangerie qui fait les meilleurs croissants du
            quartier.
          </p>
        </div>
      </header>

      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--kraft)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* "Carte" placeholder stylée */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <FakeMap />
            </motion.div>

            {/* Infos pratiques */}
            <div className="space-y-6 lg:col-span-2">
              <InfoBlock
                icon={MapPin}
                title="Adresse"
                lines={["14 rue de Belleville", "75020 Paris"]}
                bg="rouge"
              />
              <InfoBlock
                icon={Phone}
                title="Téléphone"
                lines={["01 43 12 56 78", "Commandes & groupes"]}
                bg="noir"
              />
              <InfoBlock
                icon={Mail}
                title="Email"
                lines={["hello@sauceandco.fr", "Réponse sous 24h"]}
                bg="moutarde"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Horaires */}
      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--creme)] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center border-brutal bg-[var(--moutarde)] text-[var(--noir)] shadow-brutal-sm">
              <Clock size={26} />
            </div>
            <div>
              <p className="font-marker text-lg text-[var(--rouge-sauce)]">
                Quand on ouvre
              </p>
              <h2 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
                Les horaires
              </h2>
            </div>
          </div>

          <ul className="grid gap-2">
            {hours.map((h) => (
              <li
                key={h.day}
                className={`flex items-center justify-between border-brutal px-6 py-3 ${
                  h.highlight
                    ? "bg-[var(--rouge-sauce)] text-[var(--creme)] shadow-brutal-sm"
                    : "bg-[var(--creme)]"
                }`}
              >
                <span className="font-display text-lg uppercase tracking-wider">
                  {h.day}
                </span>
                <span className="font-display text-lg">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center font-marker text-xl text-[var(--rouge-sauce)]">
            Ven-Sam c'est nocturne. Vous savez ce qu'il vous reste à faire.
          </p>
        </div>
      </section>

      {/* Transports */}
      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--noir)] py-16 text-[var(--creme)]">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center font-display text-4xl uppercase md:text-5xl">
            Comment <span className="text-[var(--moutarde)]">venir</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <TransportCard
              icon={<MetroBubble line="2" color="#0066B3" />}
              title="Métro"
              desc="Belleville (L2, L11) à 2 min à pied"
            />
            <TransportCard
              icon={<Bike size={32} />}
              title="Vélo"
              desc="Station Vélib' rue Rébeval à 50m"
            />
            <TransportCard
              icon={<Car size={32} />}
              title="Voiture"
              desc="Parking Belleville à 4 min"
            />
          </div>
        </div>
      </section>

      {/* Photos local */}
      <section className="border-b-[3px] border-[var(--noir)] bg-[var(--kraft)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="font-marker text-xl text-[var(--rouge-sauce)]">
              Le décor
            </p>
            <h2 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
              À quoi ça ressemble
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {spotPhotos.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[4/5] overflow-hidden border-brutal shadow-brutal"
              >
                <Image
                  src={src}
                  alt={`Le local ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--rouge-sauce)] py-16 text-center text-[var(--creme)]">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-4xl uppercase leading-none md:text-6xl">
            Plus pratique : commander.
          </h2>
          <p className="mx-auto mt-6 max-w-md font-marker text-2xl text-[var(--moutarde)]">
            Tu choisis. Tu paies. Tu viens chercher. 8 minutes plus tard.
          </p>
          <Link
            href="/menu"
            className="mt-10 inline-flex items-center gap-2 border-brutal bg-[var(--moutarde)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--noir)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
          >
            Voir le menu →
          </Link>
        </div>
      </section>
    </>
  );
}

function FakeMap() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border-brutal-thick bg-[var(--creme)] shadow-brutal">
      {/* Grid streets */}
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {/* Background streets */}
        <rect width="400" height="300" fill="#e8dcc0" />
        {/* Roads horizontal */}
        {[40, 100, 170, 230].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#c9a373" strokeWidth="14" />
        ))}
        {/* Roads vertical */}
        {[60, 130, 220, 320].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#c9a373" strokeWidth="14" />
        ))}
        {/* Big diagonal (boulevard) */}
        <line x1="0" y1="280" x2="400" y2="40" stroke="#a8865a" strokeWidth="22" />
        {/* Park (square green) */}
        <rect x="280" y="180" width="80" height="60" fill="#4a7c3a" opacity="0.6" />
        <text x="320" y="215" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="system-ui" fontWeight="700">
          PARC
        </text>
        {/* Metro symbol */}
        <circle cx="80" cy="240" r="12" fill="#0066B3" />
        <text x="80" y="244" textAnchor="middle" fontSize="11" fill="#fff" fontFamily="system-ui" fontWeight="700">
          M
        </text>
        {/* Street name */}
        <text x="200" y="33" textAnchor="middle" fontSize="9" fill="#8b6a4a" fontFamily="system-ui" fontWeight="600">
          RUE DE BELLEVILLE
        </text>
      </svg>

      {/* Pin SAUCE&CO */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <div className="relative">
          <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[var(--rouge-sauce)] border-2 border-[var(--noir)]" />
          <div className="relative flex items-center gap-2 border-brutal bg-[var(--rouge-sauce)] px-3 py-2 text-[var(--creme)] shadow-brutal-sm">
            <MapPin size={16} fill="currentColor" />
            <span className="font-display text-sm uppercase">SAUCE&CO</span>
          </div>
        </div>
      </div>

      {/* Coordinates */}
      <div className="absolute bottom-3 right-3 border-2 border-[var(--noir)] bg-[var(--creme)] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--noir)]/70">
        48.8721° N · 2.3771° E
      </div>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  lines,
  bg,
}: {
  icon: typeof MapPin;
  title: string;
  lines: string[];
  bg: "rouge" | "noir" | "moutarde";
}) {
  const colors = {
    rouge: "bg-[var(--rouge-sauce)] text-[var(--creme)]",
    noir: "bg-[var(--noir)] text-[var(--creme)]",
    moutarde: "bg-[var(--moutarde)] text-[var(--noir)]",
  };
  return (
    <div className={`border-brutal p-6 shadow-brutal ${colors[bg]}`}>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-current">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-display text-sm uppercase tracking-wider opacity-70">
            {title}
          </p>
          {lines.map((l, i) => (
            <p
              key={i}
              className={i === 0 ? "mt-1 font-display text-xl uppercase" : "text-sm opacity-80"}
            >
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetroBubble({ line, color }: { line: string; color: string }) {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--creme)] font-display text-lg text-[var(--creme)]"
      style={{ backgroundColor: color }}
    >
      {line}
    </div>
  );
}

function TransportCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="border-brutal bg-[var(--noir)] p-6 text-[var(--creme)]">
      <div className="mb-4">{icon}</div>
      <p className="font-display text-2xl uppercase">{title}</p>
      <p className="mt-1 text-sm text-[var(--creme)]/70">{desc}</p>
    </div>
  );
}
