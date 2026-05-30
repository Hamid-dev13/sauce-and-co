import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "../../_data/products";
import ProductCard from "../product-card";

export default function MenuShowcase() {
  const featured = products
    .filter((p) => p.tags.includes("best") || p.tags.includes("new"))
    .slice(0, 6);

  return (
    <section className="border-b-[3px] border-[var(--noir)] bg-[var(--creme)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 font-marker text-lg text-[var(--rouge-sauce)]">
              Les incontournables ↓
            </p>
            <h2 className="font-display text-4xl uppercase leading-none text-[var(--noir)] sm:text-5xl md:text-7xl">
              Le menu du moment
            </h2>
          </div>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 border-brutal bg-[var(--noir)] px-5 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Tout le menu
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
