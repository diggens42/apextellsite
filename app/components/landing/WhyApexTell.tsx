"use client";

import { Layers, Shield, Cpu } from "lucide-react";
import ScrollReveal from "../ui/ScrollReveal";

const reasons = [
  {
    icon: Layers,
    title: "All-in-One",
    description:
      "HUD, tracker, solver, trainer, and AI coach in a single application. No need to juggle multiple subscriptions and tools.",
  },
  {
    icon: Shield,
    title: "Local-First & Private",
    description:
      "Your hand data, stats, and AI conversations stay on your machine. No cloud uploads. Works fully offline.",
  },
  {
    icon: Cpu,
    title: "Real Solver, Not a Toy",
    description:
      "Embedded GTO solver using Discounted CFR with parallel processing — the same algorithm class used by professional-grade solvers.",
  },
];

export default function WhyApexTell() {
  return (
    <section className="border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16">
            <p className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase mb-4">
              Why ApexTell
            </p>
            <h2 className="font-display text-4xl tracking-wide text-text-primary md:text-5xl">
              Built Different<span className="text-crimson">.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} variant="fade-up" delay={i * 150}>
              <div className="text-center md:text-left">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-crimson/20 bg-crimson/5 transition-colors duration-300 hover:bg-crimson/10">
                  <reason.icon className="h-7 w-7 text-crimson" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-xl font-semibold text-text-primary">
                  {reason.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {reason.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
