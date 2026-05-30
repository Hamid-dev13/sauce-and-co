"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Check, X, Save, RotateCcw } from "lucide-react";
import { products } from "../../_data/products";
import { categories } from "../../_data/categories";
import { useMenu } from "../../_lib/menu-store";

export default function MenuEditor() {
  const overrides = useMenu((s) => s.overrides);
  const hasHydrated = useMenu((s) => s.hasHydrated);
  const toggleAvailable = useMenu((s) => s.toggleAvailable);
  const setPrice = useMenu((s) => s.setPrice);
  const reset = useMenu((s) => s.reset);
  const resetAll = useMenu((s) => s.resetAll);

  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [draftPrice, setDraftPrice] = useState("");

  const overrideCount = Object.keys(overrides).length;

  const startEdit = (id: string, currentPrice: number) => {
    setEditingPrice(id);
    setDraftPrice(currentPrice.toFixed(2));
  };

  const savePrice = (id: string) => {
    const v = parseFloat(draftPrice.replace(",", "."));
    if (!isNaN(v) && v > 0) {
      setPrice(id, v);
      toast.success("Prix mis à jour");
    }
    setEditingPrice(null);
  };

  return (
    <section className="p-6 md:p-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-marker text-lg text-[var(--rouge-sauce)]">
            Catalogue
          </p>
          <h1 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
            Le menu
          </h1>
        </div>
        {hasHydrated && overrideCount > 0 && (
          <button
            onClick={() => {
              resetAll();
              toast.success("Modifs réinitialisées");
            }}
            className="flex items-center gap-2 border-2 border-[var(--noir)] bg-[var(--creme)] px-4 py-2 font-display text-xs uppercase tracking-wider hover:bg-[var(--rouge-sauce)] hover:text-[var(--creme)]"
          >
            <RotateCcw size={14} />
            Tout réinitialiser ({overrideCount})
          </button>
        )}
      </header>

      {categories.map((cat) => {
        const items = products.filter((p) => p.category === cat.id);
        if (items.length === 0) return null;
        return (
          <div key={cat.id} className="mb-10">
            <h2 className="mb-4 flex items-center gap-2 font-display text-2xl uppercase text-[var(--noir)]">
              <span>{cat.emoji}</span>
              {cat.label}
              <span className="text-sm text-[var(--noir)]/40">
                · {items.length}
              </span>
            </h2>

            <div className="border-brutal bg-[var(--creme)] shadow-brutal">
              <ul className="divide-y-2 divide-[var(--noir)]/10">
                {items.map((p) => {
                  const o = overrides[p.id];
                  const available = o?.available ?? true;
                  const price = o?.price ?? p.price;
                  const modified = !!o;
                  return (
                    <li
                      key={p.id}
                      className={`flex items-center gap-4 p-4 transition-colors ${
                        !available ? "opacity-50" : ""
                      } ${modified ? "bg-[var(--moutarde)]/15" : ""}`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-[var(--noir)]">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-lg uppercase">
                            {p.name}
                          </h3>
                          {modified && (
                            <span className="border border-[var(--noir)] bg-[var(--moutarde)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--noir)]">
                              Modifié
                            </span>
                          )}
                        </div>
                        <p className="line-clamp-1 text-xs text-[var(--noir)]/60">
                          {p.description}
                        </p>
                      </div>

                      {/* Price edit */}
                      <div className="shrink-0">
                        {editingPrice === p.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              autoFocus
                              value={draftPrice}
                              onChange={(e) => setDraftPrice(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") savePrice(p.id);
                                if (e.key === "Escape") setEditingPrice(null);
                              }}
                              className="w-20 border-2 border-[var(--noir)] bg-[var(--creme)] px-2 py-1 text-right font-display"
                            />
                            <button
                              onClick={() => savePrice(p.id)}
                              className="border-2 border-[var(--noir)] bg-[var(--vert-salsa)] p-1 text-[var(--creme)]"
                              aria-label="Sauver"
                            >
                              <Save size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEdit(p.id, price)}
                            className="w-24 border-2 border-[var(--noir)] bg-[var(--creme)] py-1 text-right font-display text-lg hover:bg-[var(--moutarde)]/30"
                          >
                            {price.toFixed(2)}€
                          </button>
                        )}
                      </div>

                      {/* Available toggle */}
                      <button
                        onClick={() => {
                          toggleAvailable(p.id, true);
                          toast.success(
                            available
                              ? `${p.name} désactivé`
                              : `${p.name} réactivé`
                          );
                        }}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border-brutal transition-colors ${
                          available
                            ? "bg-[var(--vert-salsa)] text-[var(--creme)]"
                            : "bg-[var(--rouge-sauce)] text-[var(--creme)]"
                        }`}
                        aria-label={available ? "Désactiver" : "Activer"}
                      >
                        {available ? <Check size={16} /> : <X size={16} />}
                      </button>

                      {modified && (
                        <button
                          onClick={() => {
                            reset(p.id);
                            toast.success("Modif annulée");
                          }}
                          className="shrink-0 text-xs text-[var(--noir)]/50 underline-offset-4 hover:underline"
                        >
                          Reset
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}

      <div className="mt-12 border-brutal bg-[var(--noir)] p-6 text-[var(--creme)] shadow-brutal">
        <p className="font-marker text-base text-[var(--moutarde)]">
          Bon à savoir
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--creme)]/80">
          Les modifications sont persistées en{" "}
          <code className="border border-[var(--creme)]/30 bg-[var(--creme)]/10 px-1.5 py-0.5 font-mono text-xs">
            localStorage
          </code>
          . Sur un vrai back-office, elles partiraient vers ta base de données
          (Supabase, Postgres, etc.) via une Server Action.
        </p>
      </div>
    </section>
  );
}
