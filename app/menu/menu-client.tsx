"use client";

import { useMemo, useState } from "react";
import { Search, X, Leaf, WheatOff, MilkOff } from "lucide-react";
import { products } from "../_data/products";
import { categories } from "../_data/categories";
import ProductCard from "../_components/product-card";
import type { Category } from "../_lib/types";

type DietFilter = "veggie" | "no-gluten" | "no-lactose";

const dietConfig: Record<
  DietFilter,
  { label: string; icon: typeof Leaf; check: (p: (typeof products)[number]) => boolean }
> = {
  veggie: {
    label: "Veggie",
    icon: Leaf,
    check: (p) => p.tags.includes("veggie"),
  },
  "no-gluten": {
    label: "Sans gluten",
    icon: WheatOff,
    check: (p) => !p.allergens?.includes("gluten"),
  },
  "no-lactose": {
    label: "Sans lactose",
    icon: MilkOff,
    check: (p) => !p.allergens?.includes("lactose"),
  },
};

export default function MenuClient() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [diets, setDiets] = useState<Set<DietFilter>>(new Set());
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      for (const d of diets) {
        if (!dietConfig[d].check(p)) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [cat, diets, query]);

  const toggleDiet = (d: DietFilter) => {
    setDiets((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  };

  const reset = () => {
    setCat("all");
    setDiets(new Set());
    setQuery("");
  };

  const hasFilters = cat !== "all" || diets.size > 0 || query.trim().length > 0;

  return (
    <section className="bg-[var(--kraft)] pb-20">
      {/* Filter bar */}
      <div className="border-b-[3px] border-[var(--noir)] bg-[var(--creme)]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          {/* Categories */}
          <div className="sauceco-scroll -mx-2 flex gap-2 overflow-x-auto px-2 pb-2">
            <FilterChip
              active={cat === "all"}
              onClick={() => setCat("all")}
            >
              ★ Tout
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={cat === c.id}
                onClick={() => setCat(c.id)}
              >
                <span className="mr-1">{c.emoji}</span>
                {c.label}
              </FilterChip>
            ))}
          </div>

          {/* Diet + search */}
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(dietConfig) as DietFilter[]).map((d) => {
                const cfg = dietConfig[d];
                const Icon = cfg.icon;
                const active = diets.has(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleDiet(d)}
                    className={`flex items-center gap-1.5 border-2 border-[var(--noir)] px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                      active
                        ? "bg-[var(--vert-salsa)] text-[var(--creme)]"
                        : "bg-[var(--creme)] text-[var(--noir)] hover:bg-[var(--vert-salsa)]/10"
                    }`}
                  >
                    <Icon size={14} />
                    {cfg.label}
                  </button>
                );
              })}
              {hasFilters && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium uppercase tracking-wide text-[var(--rouge-sauce)] underline-offset-4 hover:underline"
                >
                  <X size={12} />
                  Reset
                </button>
              )}
            </div>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--noir)]/40"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Chercher un burger…"
                className="w-full border-2 border-[var(--noir)] bg-[var(--creme)] py-2 pl-9 pr-3 text-sm placeholder:text-[var(--noir)]/40 focus:outline-none focus:bg-[var(--moutarde)]/20 md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="font-marker text-2xl text-[var(--noir)]">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
          </p>
          {cat !== "all" && (
            <span className="font-display text-2xl uppercase text-[var(--rouge-sauce)]">
              {categories.find((c) => c.id === cat)?.label}
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState onReset={reset} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap border-2 border-[var(--noir)] px-4 py-2 font-display text-sm uppercase tracking-wider transition-all ${
        active
          ? "bg-[var(--rouge-sauce)] text-[var(--creme)] shadow-brutal-sm"
          : "bg-[var(--creme)] text-[var(--noir)] hover:bg-[var(--kraft-light)]"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 border-brutal bg-[var(--creme)] py-20 text-center shadow-brutal-sm">
      <p className="font-display text-5xl uppercase">Rien trouvé.</p>
      <p className="font-marker text-2xl text-[var(--rouge-sauce)]">
        Tes critères sont trop pointus, chef.
      </p>
      <button
        onClick={onReset}
        className="mt-4 border-brutal bg-[var(--noir)] px-6 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      >
        Tout réinitialiser
      </button>
    </div>
  );
}
