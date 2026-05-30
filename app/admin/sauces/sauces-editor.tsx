"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Flame, Save, X } from "lucide-react";
import { sauces as initialSauces } from "../../_data/sauces";
import type { Sauce, SpiceLevel } from "../../_lib/types";

export default function SaucesEditor() {
  const [sauces, setSauces] = useState<Sauce[]>(initialSauces);
  const [editing, setEditing] = useState<Sauce | null>(null);

  const save = (updated: Sauce) => {
    setSauces((curr) =>
      curr.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditing(null);
    toast.success(`${updated.name} mise à jour`);
  };

  return (
    <section className="p-6 md:p-10">
      <header className="mb-8">
        <p className="font-marker text-lg text-[var(--rouge-sauce)]">
          La signature SAUCE&CO
        </p>
        <h1 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
          Les 8 sauces
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sauces.map((s, i) => (
          <article
            key={s.id}
            className="group relative border-brutal bg-[var(--creme)] p-5 shadow-brutal transition-transform hover:-translate-y-1"
            style={{ borderTop: `12px solid ${s.color}` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-wider text-[var(--noir)]/60">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Flame
                    key={j}
                    size={12}
                    fill={
                      j < s.spice ? "var(--rouge-sauce)" : "transparent"
                    }
                    className={
                      j < s.spice
                        ? "text-[var(--rouge-sauce)]"
                        : "text-[var(--noir)]/20"
                    }
                  />
                ))}
              </div>
            </div>
            <h3 className="font-display text-xl uppercase leading-none">
              {s.name}
            </h3>
            <p className="mt-1 font-marker text-sm text-[var(--rouge-sauce)]">
              {s.tagline}
            </p>
            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[var(--noir)]/75">
              {s.story}
            </p>
            <button
              onClick={() => setEditing(s)}
              className="mt-4 w-full border-2 border-[var(--noir)] bg-[var(--creme)] py-2 font-display text-xs uppercase tracking-wider transition-colors hover:bg-[var(--noir)] hover:text-[var(--creme)]"
            >
              Modifier
            </button>
          </article>
        ))}
      </div>

      {editing && (
        <EditDialog
          sauce={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </section>
  );
}

function EditDialog({
  sauce,
  onClose,
  onSave,
}: {
  sauce: Sauce;
  onClose: () => void;
  onSave: (s: Sauce) => void;
}) {
  const [name, setName] = useState(sauce.name);
  const [tagline, setTagline] = useState(sauce.tagline);
  const [story, setStory] = useState(sauce.story);
  const [spice, setSpice] = useState<SpiceLevel>(sauce.spice);
  const [color, setColor] = useState(sauce.color);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--noir)]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg border-brutal-thick bg-[var(--creme)] shadow-brutal"
      >
        <header
          className="flex items-center justify-between border-b-[3px] border-[var(--noir)] px-6 py-4 text-[var(--creme)]"
          style={{ background: color }}
        >
          <h2 className="font-display text-2xl uppercase mix-blend-difference">
            Modifier la sauce
          </h2>
          <button onClick={onClose} aria-label="Fermer">
            <X size={20} className="mix-blend-difference" />
          </button>
        </header>

        <div className="space-y-5 p-6">
          <Field label="Nom">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-[var(--noir)] bg-[var(--creme)] px-3 py-2 focus:outline-none"
            />
          </Field>

          <Field label="Tagline">
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full border-2 border-[var(--noir)] bg-[var(--creme)] px-3 py-2 focus:outline-none"
            />
          </Field>

          <Field label="Histoire">
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={3}
              className="w-full resize-none border-2 border-[var(--noir)] bg-[var(--creme)] px-3 py-2 focus:outline-none"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Couleur signature">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer border-2 border-[var(--noir)]"
                />
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 border-2 border-[var(--noir)] bg-[var(--creme)] px-3 py-2 font-mono text-sm focus:outline-none"
                />
              </div>
            </Field>

            <Field label="Niveau d'épice">
              <div className="flex gap-1">
                {([0, 1, 2, 3] as SpiceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSpice(lvl)}
                    className={`flex h-10 flex-1 items-center justify-center border-2 border-[var(--noir)] ${
                      spice === lvl
                        ? "bg-[var(--rouge-sauce)] text-[var(--creme)]"
                        : "bg-[var(--creme)] hover:bg-[var(--moutarde)]/30"
                    }`}
                  >
                    {lvl === 0 ? "0" : Array(lvl).fill("🌶").join("")}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </div>

        <footer className="flex gap-2 border-t-2 border-[var(--noir)] bg-[var(--kraft-light)]/30 px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-[var(--noir)] bg-[var(--creme)] py-3 font-display text-sm uppercase tracking-wider"
          >
            Annuler
          </button>
          <button
            onClick={() =>
              onSave({ ...sauce, name, tagline, story, spice, color })
            }
            className="flex flex-[2] items-center justify-center gap-2 border-brutal bg-[var(--rouge-sauce)] py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          >
            <Save size={14} />
            Enregistrer
          </button>
        </footer>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block font-display text-xs uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
