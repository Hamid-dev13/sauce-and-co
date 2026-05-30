import type { OrderStatus } from "../../_lib/types";

const config: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  new: { label: "Nouveau", bg: "var(--moutarde)", text: "var(--noir)" },
  preparing: { label: "En cuisine", bg: "var(--rouge-sauce)", text: "var(--creme)" },
  ready: { label: "Prêt", bg: "var(--vert-salsa)", text: "var(--creme)" },
  delivered: { label: "Livré", bg: "var(--noir)", text: "var(--creme)" },
  cancelled: { label: "Annulé", bg: "var(--kraft-dark)", text: "var(--creme)" },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const c = config[status];
  return (
    <span
      className="inline-flex items-center border-2 border-[var(--noir)] px-2 py-0.5 font-display text-xs uppercase tracking-wider"
      style={{ background: c.bg, color: c.text }}
    >
      {c.label}
    </span>
  );
}
