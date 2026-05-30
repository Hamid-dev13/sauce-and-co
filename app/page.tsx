import Hero from "./_components/sections/hero";
import Marquee from "./_components/marquee";
import MenuShowcase from "./_components/sections/menu-showcase";
import Process from "./_components/sections/process";
import SaucesTeaser from "./_components/sections/sauces-teaser";
import Story from "./_components/sections/story";
import Gallery from "./_components/sections/gallery";
import Reviews from "./_components/sections/reviews";
import MapCta from "./_components/sections/map-cta";

export default function SauceAndCoHome() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Livraison en 30min",
          "Sauce maison",
          "Ramassage gratuit",
          "Ouvert jusqu'à 1h",
          "Bœuf charolais",
          "Pains briochés du matin",
        ]}
        variant="black"
      />
      <MenuShowcase />
      <Process />
      <SaucesTeaser />
      <Marquee
        items={[
          "8 sauces. 0 compromis.",
          "Fait main chaque matin",
          "Du bœuf. Pas de bullshit.",
          "Depuis 2024",
        ]}
        variant="cream"
        fast
      />
      <Story />
      <Gallery />
      <Reviews />
      <MapCta />
    </>
  );
}
