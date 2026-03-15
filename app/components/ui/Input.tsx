"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-sans font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-md border bg-card px-4 py-3 text-text-primary font-sans text-sm placeholder:text-text-muted transition-colors focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/50",
            error ? "border-crimson-light" : "border-border",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-crimson-light font-sans">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
