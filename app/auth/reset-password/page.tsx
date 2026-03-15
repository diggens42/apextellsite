"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

const schema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error);
        return;
      }
      setSuccess(true);
    } catch {
      setServerError("Something went wrong.");
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-3xl text-text-primary">Invalid Link</h1>
          <p className="mt-4 text-text-secondary">No reset token provided.</p>
          <Link href="/auth/forgot-password" className="mt-4 inline-block font-sans text-sm text-crimson hover:underline">
            Request a new reset link
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-3xl text-text-primary">Password Reset</h1>
          <p className="mt-4 text-text-secondary">Your password has been updated successfully.</p>
          <Link href="/auth/login" className="mt-6 inline-block font-sans text-sm text-crimson hover:underline">
            Sign in
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
            New Password<span className="text-crimson">.</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="password"
            label="New Password"
            type="password"
            placeholder="Min. 8 characters"
            error={errors.password?.message}
            {...register("password")}
          />
          {serverError && <p className="text-sm text-crimson-light font-sans">{serverError}</p>}
          <Button type="submit" loading={isSubmitting} className="w-full">
            Reset Password
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-[80vh] items-center justify-center"><p className="text-text-secondary">Loading...</p></main>
    }>
      <ResetForm />
    </Suspense>
  );
}
