"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 8, suffix: "", label: "Supported Sites" },
  { value: 24, suffix: "", label: "Tables Simultaneous" },
  { value: 23, suffix: "+", label: "Tracked Stats" },
  { value: 100, suffix: "%", label: "Local & Private" },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    function onChange(e: MediaQueryListEvent) { setReduced(e.matches); }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function AnimatedNumber({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    let start: number | null = null;
    let rafId: number;

    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, value, reducedMotion]);

  return (
    <span className="font-display text-5xl tracking-wide text-text-primary md:text-6xl">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 });

  return (
    <section ref={ref} className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-500 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} active={visible} />
              <p className="mt-2 font-sans text-sm font-medium text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
