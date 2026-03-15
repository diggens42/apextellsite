"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/app/lib/validations";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

type FormData = z.infer<typeof registerSchema>;

const referralOptions = [
  "",
  "Reddit",
  "TwoPlusTwo",
  "Discord",
  "YouTube",
  "Friend",
  "Twitter / X",
  "Other",
];

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error);
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (success) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-crimson/30 bg-crimson/10">
            <span className="text-2xl">&#10003;</span>
          </div>
          <h1 className="font-display text-3xl tracking-wide text-text-primary">Check Your Email</h1>
          <p className="mt-4 text-text-secondary">
            We&apos;ve sent a verification link to your email. Click it to activate your account and receive your beta key.
          </p>
          <Link href="/auth/login" className="mt-6 inline-block font-sans text-sm text-crimson hover:underline">
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl tracking-wide text-text-primary">
            Join the Beta<span className="text-crimson">.</span>
          </h1>
          <p className="mt-2 text-text-secondary">
            Create your account and get free access to ApexTell.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="space-y-1.5">
            <label htmlFor="referralSource" className="block text-sm font-sans font-medium text-text-secondary">
              How did you hear about us? <span className="text-text-muted">(optional)</span>
            </label>
            <select
              id="referralSource"
              {...register("referralSource")}
              className="w-full rounded-md border border-border bg-card px-4 py-3 text-text-primary font-sans text-sm focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson/50 cursor-pointer"
            >
              {referralOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt || "Select..."}
                </option>
              ))}
            </select>
          </div>

          {serverError && (
            <p className="text-sm text-crimson-light font-sans">{serverError}</p>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted font-sans">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-crimson hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-text-muted font-sans">
          By registering, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-text-secondary">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-text-secondary">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}
