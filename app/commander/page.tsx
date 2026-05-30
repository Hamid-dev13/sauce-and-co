import CheckoutClient from "./checkout-client";

export default function CommanderPage() {
  return (
    <section className="bg-[var(--kraft)]">
      <header className="border-b-[3px] border-[var(--noir)] bg-[var(--rouge-sauce)] py-12 text-[var(--creme)]">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-2 font-marker text-xl text-[var(--moutarde)]">
            Plus que 3 étapes
          </p>
          <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
            Ta commande, <br />
            <span className="text-[var(--moutarde)]">presque servie.</span>
          </h1>
        </div>
      </header>

      <CheckoutClient />
    </section>
  );
}
