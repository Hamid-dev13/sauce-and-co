type Props = {
  items: string[];
  variant?: "red" | "black" | "cream";
  fast?: boolean;
};

const variants = {
  red: "bg-[var(--rouge-sauce)] text-[var(--creme)]",
  black: "bg-[var(--noir)] text-[var(--creme)]",
  cream: "bg-[var(--creme)] text-[var(--noir)]",
} as const;

export default function Marquee({ items, variant = "red", fast }: Props) {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div
      className={`flex overflow-hidden border-y-[3px] border-[var(--noir)] py-3 ${variants[variant]}`}
    >
      <div
        className={`flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 ${
          fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {list.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl uppercase tracking-wider md:text-3xl"
          >
            {item}
            <span className="text-[var(--moutarde)]">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
