"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Clock, MapPin, User, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { ordersMock } from "../../_data/orders-mock";
import StatusBadge from "../_components/status-badge";
import type { Order, OrderStatus } from "../../_lib/types";

const statusFilters: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "new", label: "Nouveau" },
  { value: "preparing", label: "En cuisine" },
  { value: "ready", label: "Prêt" },
  { value: "delivered", label: "Livré" },
  { value: "cancelled", label: "Annulé" },
];

const flow: OrderStatus[] = ["new", "preparing", "ready", "delivered"];

export default function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>(ordersMock);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (
        query.trim() &&
        !o.customerName.toLowerCase().includes(query.toLowerCase()) &&
        !o.number.includes(query)
      ) {
        return false;
      }
      return true;
    });
  }, [orders, filter, query]);

  const advance = (id: string) => {
    setOrders((curr) =>
      curr.map((o) => {
        if (o.id !== id) return o;
        const idx = flow.indexOf(o.status);
        if (idx === -1 || idx === flow.length - 1) return o;
        const next = flow[idx + 1];
        toast.success(`${o.number} → ${next}`);
        return { ...o, status: next };
      })
    );
    if (selected?.id === id) {
      const updated = orders.find((o) => o.id === id);
      if (updated) setSelected({ ...updated });
    }
  };

  const cancel = (id: string) => {
    setOrders((curr) =>
      curr.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o))
    );
    toast.success(`Commande annulée`);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <section className="p-6 md:p-10">
      <header className="mb-8">
        <p className="font-marker text-lg text-[var(--rouge-sauce)]">
          Le flux du jour
        </p>
        <h1 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
          Commandes
        </h1>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="sauceco-scroll -mx-2 flex gap-2 overflow-x-auto px-2 pb-1">
          {statusFilters.map((s) => {
            const count =
              s.value === "all"
                ? orders.length
                : orders.filter((o) => o.status === s.value).length;
            return (
              <button
                key={s.value}
                onClick={() => setFilter(s.value)}
                className={`shrink-0 whitespace-nowrap border-2 border-[var(--noir)] px-4 py-2 font-display text-xs uppercase tracking-wider transition-all ${
                  filter === s.value
                    ? "bg-[var(--rouge-sauce)] text-[var(--creme)] shadow-brutal-sm"
                    : "bg-[var(--creme)] text-[var(--noir)] hover:bg-[var(--kraft-light)]"
                }`}
              >
                {s.label}{" "}
                <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--noir)]/40"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="N° ou nom…"
            className="w-full border-2 border-[var(--noir)] bg-[var(--creme)] py-2 pl-9 pr-3 text-sm focus:outline-none md:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border-brutal bg-[var(--creme)] shadow-brutal">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-[var(--noir)] bg-[var(--kraft-light)]/40 text-left">
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">N°</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">Heure</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">Client</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">Articles</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">Mode</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <p className="font-marker text-2xl text-[var(--noir)]/40">
                      Rien à voir ici.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    className="cursor-pointer border-b border-[var(--noir)]/10 transition-colors hover:bg-[var(--kraft-light)]/30"
                  >
                    <td className="px-4 py-3 font-display text-base">{o.number}</td>
                    <td className="px-4 py-3 text-xs text-[var(--noir)]/70">
                      {new Date(o.createdAt).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {o.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--noir)]/70">
                      {o.items.reduce((a, b) => a + b.qty, 0)}
                    </td>
                    <td className="px-4 py-3 text-sm uppercase tracking-wider">
                      {o.mode === "delivery" ? "Livr." : "Collect"}
                    </td>
                    <td className="px-4 py-3 font-display">
                      {o.total.toFixed(2)}€
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-[var(--noir)]/40">
                      Voir →
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[60] bg-[var(--noir)]/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l-[3px] border-[var(--noir)] bg-[var(--creme)]"
            >
              <header className="flex items-center justify-between border-b-[3px] border-[var(--noir)] bg-[var(--noir)] px-6 py-4 text-[var(--creme)]">
                <div>
                  <p className="font-marker text-base text-[var(--moutarde)]">
                    Détail commande
                  </p>
                  <h2 className="font-display text-3xl uppercase">
                    {selected.number}
                  </h2>
                </div>
                <button onClick={() => setSelected(null)} aria-label="Fermer">
                  <X size={24} />
                </button>
              </header>

              <div className="sauceco-scroll flex-1 overflow-y-auto p-6">
                <div className="mb-6 flex items-center gap-2">
                  <StatusBadge status={selected.status} />
                  <span className="text-xs text-[var(--noir)]/60">
                    <Clock size={12} className="inline" />{" "}
                    {new Date(selected.createdAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="mb-6 space-y-2 border-2 border-[var(--noir)] bg-[var(--kraft-light)]/20 p-4">
                  <p className="flex items-center gap-2 text-sm">
                    <User size={14} className="text-[var(--rouge-sauce)]" />
                    <span className="font-display uppercase">
                      {selected.customerName}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-[var(--rouge-sauce)]" />
                    06 12 34 56 78
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-[var(--rouge-sauce)]" />
                    {selected.mode === "delivery"
                      ? "Livraison · 14 rue de Belleville"
                      : "Click & Collect au comptoir"}
                  </p>
                </div>

                <h3 className="mb-3 font-display text-lg uppercase">
                  Articles
                </h3>
                <ul className="mb-6 divide-y-2 divide-[var(--noir)]/10 border-2 border-[var(--noir)] bg-[var(--creme)]">
                  {selected.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <div>
                        <p className="font-display text-base uppercase">
                          {item.name}
                        </p>
                        <p className="text-xs text-[var(--noir)]/60">
                          x{item.qty}
                        </p>
                      </div>
                      <p className="font-display">
                        {(item.price * item.qty).toFixed(2)}€
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-2 border-[var(--noir)] bg-[var(--moutarde)] p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-lg uppercase">
                      Total
                    </span>
                    <span className="font-display text-2xl">
                      {selected.total.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selected.status !== "delivered" &&
                selected.status !== "cancelled" && (
                  <footer className="space-y-2 border-t-[3px] border-[var(--noir)] bg-[var(--creme)] p-4">
                    <button
                      onClick={() => advance(selected.id)}
                      className="w-full border-brutal bg-[var(--vert-salsa)] py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                      Passer à l'étape suivante
                    </button>
                    <button
                      onClick={() => cancel(selected.id)}
                      className="w-full border-2 border-[var(--noir)] bg-[var(--creme)] py-3 font-display text-xs uppercase tracking-wider text-[var(--rouge-sauce)] transition-colors hover:bg-[var(--rouge-sauce)] hover:text-[var(--creme)]"
                    >
                      Annuler la commande
                    </button>
                  </footer>
                )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
