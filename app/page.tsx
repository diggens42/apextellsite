import Hero from "./components/landing/Hero";
import StatsBar from "./components/landing/StatsBar";
import FeaturesGrid from "./components/landing/FeaturesGrid";
import WhyApexTell from "./components/landing/WhyApexTell";
import CTASection from "./components/landing/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <FeaturesGrid />
      <WhyApexTell />
      <CTASection />
    </main>
  );
}
