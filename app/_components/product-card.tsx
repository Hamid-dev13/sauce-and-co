"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useCart } from "../_lib/cart-store";
import Sticker from "./sticker";
import type { Product, Tag } from "../_lib/types";

const tagConfig: Record<Tag, { label: string; variant: "red" | "yellow" | "black" | "cream"; rotate: number }> = {
  best: { label: "Best", variant: "red", rotate: -6 },
  new: { label: "New", variant: "yellow", rotate: 4 },
  spicy: { label: "🌶 ça pique", variant: "red", rotate: 3 },
  veggie: { label: "Veggie", variant: "yellow", rotate: -3 },
  limited: { label: "Édition", variant: "black", rotate: -5 },
};

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);

  const handleAdd = () => {
    add(product.id);
    openCart();
    toast.success(`${product.name} ajouté`);
  };

  return (
    <article className="group relative flex flex-col border-brutal bg-[var(--creme)] shadow-brutal transition-transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden border-b-[3px] border-[var(--noir)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tags.length > 0 && (
          <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
            {product.tags.map((t) => (
              <Sticker
                key={t}
                variant={tagConfig[t].variant}
                rotate={tagConfig[t].rotate}
                className="!text-xs"
              >
                {tagConfig[t].label}
              </Sticker>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl uppercase leading-none">
            {product.name}
          </h3>
          <span className="shrink-0 font-display text-2xl text-[var(--rouge-sauce)]">
            {product.price.toFixed(2)}€
          </span>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-[var(--noir)]/75">
          {product.description}
        </p>
        <button
          onClick={handleAdd}
          className="mt-2 flex items-center justify-center gap-2 border-brutal bg-[var(--noir)] py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>
    </article>
  );
}
