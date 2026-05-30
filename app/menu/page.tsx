import MenuClient from "./menu-client";
import Marquee from "../_components/marquee";

export default function MenuPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b-[3px] border-[var(--noir)] bg-[var(--moutarde)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 font-marker text-xl text-[var(--rouge-deep)]">
            Le menu en entier — rien à cacher
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.85] text-[var(--noir)] sm:text-6xl md:text-8xl lg:text-9xl">
            On a faim. <br />
            <span className="text-[var(--rouge-sauce)]">On mange.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--noir)]/80">
            7 burgers, 4 sides, 4 shakes, 2 boissons et quelques extras pour
            pimper le tout. Prix nets, pas de surprise.
          </p>
        </div>
      </header>

      <Marquee
        items={[
          "Bœuf charolais 100%",
          "Pain brioché du matin",
          "Frites coupées main",
          "Sauce maison incluse",
        ]}
        variant="black"
        fast
      />

      <MenuClient />
    </>
  );
}
