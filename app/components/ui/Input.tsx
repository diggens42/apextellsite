"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, "aria-required": ariaRequired, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-sans font-medium text-text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          aria-required={ariaRequired}
          className={cn(
            "w-full rounded-md border bg-card px-4 py-3 text-text-primary font-sans text-sm placeholder:text-text-muted transition-colors focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/50",
            error ? "border-crimson-light" : "border-border",
            className
          )}
          {...props}
        />
        {error && <p id={errorId} className="text-sm text-crimson-light font-sans" role="alert">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
