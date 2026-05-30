export default function DemoBanner() {
  return (
    <div
      className="relative z-50 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[11px] font-medium tracking-wide sm:text-xs"
      style={{
        background: "var(--noir)",
        color: "var(--creme)",
      }}
    >
      <span>
        Démo fictive — réalisée par{" "}
        <a
          href="https://github.com/Hamid-dev13"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dotted underline-offset-4 hover:text-[var(--moutarde)]"
        >
          Hamid Bennacef
        </a>
        .{" "}
        <span className="hidden opacity-70 sm:inline">
          Aucune vraie commande ne sera prise.
        </span>
      </span>
    </div>
  );
}
