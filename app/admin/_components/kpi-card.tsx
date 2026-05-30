import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  label: string;
  value: string;
  delta?: number; // %
  sub?: string;
  accent?: "red" | "moutarde" | "noir" | "vert";
};

const accents = {
  red: "bg-[var(--rouge-sauce)] text-[var(--creme)]",
  moutarde: "bg-[var(--moutarde)] text-[var(--noir)]",
  noir: "bg-[var(--noir)] text-[var(--creme)]",
  vert: "bg-[var(--vert-salsa)] text-[var(--creme)]",
};

export default function KpiCard({
  label,
  value,
  delta,
  sub,
  accent = "noir",
}: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className={`relative border-brutal p-6 shadow-brutal ${accents[accent]}`}>
      <p className="font-display text-xs uppercase tracking-wider opacity-70">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl uppercase leading-none">
        {value}
      </p>
      <div className="mt-3 flex items-center justify-between">
        {sub && <p className="text-xs opacity-70">{sub}</p>}
        {delta !== undefined && (
          <span
            className={`flex items-center gap-1 text-xs font-bold ${
              positive ? "text-[var(--moutarde)]" : "text-[var(--creme)]/80"
            }`}
          >
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {positive ? "+" : ""}
            {delta}%
          </span>
        )}
      </div>
    </div>
  );
}
