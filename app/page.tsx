import Hero from "./components/landing/Hero";
import StatsBar from "./components/landing/StatsBar";
import FeaturesGrid from "./components/landing/FeaturesGrid";
import WhyApexTell from "./components/landing/WhyApexTell";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <FeaturesGrid />
      <WhyApexTell />
    </main>
  );
}
