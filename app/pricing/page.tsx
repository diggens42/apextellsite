import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export const metadata: Metadata = {
  title: "Pricing",
  description: "ApexTell pricing — currently in Closed Beta with free access.",
};

const betaFeatures = [
  "Full HUD overlay with all stats",
  "Embedded GTO solver",
  "AI Coach (offline)",
  "Leak Detector",
  "Hand Replayer",
  "Stats Browser & Graphs",
  "Equity Calculator",
  "GTO Trainer",
  "All 8 supported poker sites",
  "Up to 24 simultaneous tables",
  "Direct feature input & priority support",
  "Founding member badge at launch",
];

export default function PricingPage() {
  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase mb-4">
            Pricing
          </p>
          <h1 className="font-display text-5xl tracking-wide text-text-primary md:text-6xl">
            Closed Beta<span className="text-crimson">.</span> Free Access<span className="text-crimson">.</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
            During the Closed Beta, all features are available at no cost.
            Help us build the best poker software — and get rewarded for it.
          </p>
        </div>

        {/* Beta Card */}
        <div className="mx-auto max-w-md">
          <Card className="border-crimson/30 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-crimson/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-crimson/10 px-3 py-1 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                <span className="font-sans text-xs font-semibold text-crimson">NOW OPEN</span>
              </div>

              <h3 className="font-display text-3xl tracking-wide text-text-primary">
                Closed Beta
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl text-gold">$0</span>
                <span className="font-sans text-sm text-text-muted">/ during beta</span>
              </div>

              <ul className="mt-8 space-y-3">
                {betaFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                    <Check className="h-4 w-4 text-crimson shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/auth/register">
                  <Button className="w-full" size="lg">
                    Join Closed Beta
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Future pricing hint */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-text-muted max-w-md mx-auto">
            After launch, ApexTell will offer monthly and annual subscription plans.
            Beta participants will receive a significant discount as founding members.
          </p>
        </div>
      </div>
    </main>
  );
}
