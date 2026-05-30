import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "black" | "cream";
  rotate?: number;
  className?: string;
};

const variants = {
  red: "bg-[var(--rouge-sauce)] text-[var(--creme)]",
  yellow: "bg-[var(--moutarde)] text-[var(--noir)]",
  black: "bg-[var(--noir)] text-[var(--creme)]",
  cream: "bg-[var(--creme)] text-[var(--noir)]",
} as const;

export default function Sticker({
  children,
  variant = "red",
  rotate = -4,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-block border-brutal px-3 py-1 font-display text-sm uppercase tracking-wider shadow-brutal-sm hover-wiggle",
        variants[variant],
        className
      )}
      style={
        {
          transform: `rotate(${rotate}deg)`,
          "--rot": `${rotate}deg`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
