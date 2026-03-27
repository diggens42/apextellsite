"use client";

import {
  Monitor,
  Brain,
  Bot,
  Search,
  PlayCircle,
  BarChart3,
} from "lucide-react";
import Card from "../ui/Card";
import ScrollReveal from "../ui/ScrollReveal";

const features = [
  {
    icon: Monitor,
    title: "Real-Time HUD Overlay",
    description:
      "Color-coded opponent stats directly on your poker client. Automatic player classification, positional breakdowns, in-HUD notes.",
  },
  {
    icon: Brain,
    title: "GTO Solver",
    description:
      "Embedded postflop solver using Discounted CFR. Custom bet sizing trees, node-by-node browsing, parallel processing.",
  },
  {
    icon: Bot,
    title: "AI Coach",
    description:
      "Offline AI poker coach powered by RAG. Analyze hands, discuss theory, get answers — fully private, no internet required.",
  },
  {
    icon: Search,
    title: "Leak Detector",
    description:
      "Automated analysis scoring 14+ stat categories. Severity ranking, BB/100 impact estimates, concrete improvement suggestions.",
  },
  {
    icon: PlayCircle,
    title: "Hand Replayer",
    description:
      "Step through any hand on a visual table. Playback controls, keyboard shortcuts, hand tagging, one-click links to Equity Calc.",
  },
  {
    icon: BarChart3,
    title: "Stats Browser",
    description:
      "23+ tracked statistics with deep filtering. Position, stakes, date, pot type — save custom filter presets.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center">
            <h2 className="font-display text-4xl tracking-wide text-text-primary md:text-5xl">
              Everything You Need<span className="text-crimson">.</span> One App<span className="text-crimson">.</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
              Seven powerful tools that work together — no more juggling subscriptions.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} variant="fade-up" delay={i * 100}>
              <Card hover className="h-full group">
                <feature.icon className="h-8 w-8 text-crimson mb-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                <h3 className="font-sans text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
