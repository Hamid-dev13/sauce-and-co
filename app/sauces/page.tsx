import SaucesHero from "./sauces-hero";
import SaucesGrid from "./sauces-grid";
import SaucesStories from "./sauces-stories";
import SaucesCta from "./sauces-cta";
import Marquee from "../_components/marquee";

export default function SaucesPage() {
  return (
    <>
      <SaucesHero />
      <Marquee
        items={[
          "Aucune machine",
          "Aucun mensonge",
          "8 sauces",
          "0 compromis",
          "Faites le matin",
          "Servies le midi",
        ]}
        variant="cream"
      />
      <SaucesGrid />
      <SaucesStories />
      <SaucesCta />
    </>
  );
}
