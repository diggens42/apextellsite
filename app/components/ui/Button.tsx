"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "danger" | "gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-crimson text-white hover:bg-crimson-dark active:bg-crimson-dark/90 shadow-lg shadow-crimson/20",
  ghost:
    "border border-border text-text-primary hover:bg-hover hover:border-text-muted",
  outline:
    "border border-crimson text-crimson hover:bg-crimson hover:text-white",
  danger:
    "bg-red-900/40 text-red-400 border border-red-800 hover:bg-red-900/60",
  gold:
    "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
