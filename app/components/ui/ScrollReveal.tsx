"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const variantStyles: Record<Variant, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-in": {
    from: "opacity-0",
    to: "opacity-100",
  },
  "slide-left": {
    from: "opacity-0 -translate-x-12",
    to: "opacity-100 translate-x-0",
  },
  "slide-right": {
    from: "opacity-0 translate-x-12",
    to: "opacity-100 translate-x-0",
  },
  scale: {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal({ threshold, triggerOnce: true });
  const styles = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${visible ? styles.to : styles.from} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
