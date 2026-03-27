"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden noise">
      {/* Background grid effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-crimson/[0.04] blur-[120px] animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-crimson/[0.03] blur-[100px] animate-float-reverse"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.015] blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex min-h-[90vh] flex-col items-center justify-center text-center">
          {/* Eyebrow — Invitation Only */}
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-widest text-gold uppercase">
              Invitation Only — Closed Beta
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-6xl leading-none tracking-wide text-text-primary sm:text-7xl md:text-8xl lg:text-9xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
          >
            See Everything<span className="text-crimson">.</span>
            <br className="hidden sm:block" />
            Solve Anything<span className="text-crimson">.</span>
            <br className="hidden sm:block" />
            Win More<span className="text-crimson">.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            The all-in-one poker HUD, tracker, solver, trainer, and AI coach.
            Local-first. Private. Built for serious players.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col gap-4 sm:flex-row opacity-0 animate-fade-in-up"
            style={{ animationDelay: "450ms", animationFillMode: "forwards" }}
          >
            <Link href="/auth/register">
              <Button size="lg" className="animate-pulse-glow">
                Request Beta Access
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="lg" className="group">
                See Features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Exclusivity & Scarcity */}
          <div
            className="mt-10 flex flex-col items-center gap-3 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
          >
            <p className="text-sm text-gold font-medium">
              Limited to 500 founding members
            </p>
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                Free access during beta
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                Founding member badge at launch
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-text-muted/60">
              Beta closes Q2 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
