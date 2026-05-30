import Link from "next/link";
import Sticker from "./_components/sticker";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[var(--kraft)] px-6 py-20">
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="absolute -left-2 -top-12 hidden md:block">
          <Sticker variant="red" rotate={-12} className="!text-base">
            Erreur 404
          </Sticker>
        </div>
        <div className="absolute -right-4 -top-8 hidden md:block">
          <Sticker variant="yellow" rotate={10} className="!text-base">
            T'es loin
          </Sticker>
        </div>

        <h1 className="font-display text-[7rem] leading-none text-[var(--rouge-sauce)] sm:text-[10rem] md:text-[14rem] lg:text-[18rem]">
          404
        </h1>

        <p className="mt-4 font-marker text-3xl text-[var(--noir)] md:text-4xl">
          T'as raté la sortie.
        </p>

        <p className="mx-auto mt-6 max-w-md text-lg text-[var(--noir)]/80">
          Cette page n'existe pas. Ou plus. Ou pas encore. Mais comme on est
          sympas, on t'offre une sauce pour la peine.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="border-brutal bg-[var(--rouge-sauce)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/menu"
            className="border-brutal bg-[var(--creme)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--noir)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Voir le menu
          </Link>
        </div>
      </div>
    </section>
  );
}
