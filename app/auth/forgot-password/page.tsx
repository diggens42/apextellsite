"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPasswordSchema } from "@/app/lib/validations";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

type FormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: FormData) {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSent(true);
  }

  if (sent) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="font-display text-3xl tracking-wide text-text-primary">Check Your Email</h1>
          <p className="mt-4 text-text-secondary">
            If an account with that email exists, we&apos;ve sent a password reset link.
          </p>
          <Link href="/auth/login" className="mt-6 inline-block font-sans text-sm text-crimson hover:underline">
            Back to Login
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
            Reset Password<span className="text-crimson">.</span>
          </h1>
          <p className="mt-2 text-text-secondary">
            Enter your email and we&apos;ll send a reset link.
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
          <Button type="submit" loading={isSubmitting} className="w-full">
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-muted font-sans">
          <Link href="/auth/login" className="text-crimson hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}
