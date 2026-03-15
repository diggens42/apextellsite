"use client";

import { useReducer, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Status = { state: "loading" } | { state: "success"; message: string } | { state: "error"; message: string };

async function verifyToken(token: string): Promise<Status> {
  try {
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const json = await res.json();
    if (!res.ok) return { state: "error", message: json.error };
    return { state: "success", message: json.message };
  } catch {
    return { state: "error", message: "Something went wrong." };
  }
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useReducer((_: Status, next: Status) => next, { state: "loading" } as Status);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    if (!token) {
      setStatus({ state: "error", message: "No verification token provided." });
      return;
    }
    verifyToken(token).then(setStatus);
  }, [token]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {status.state === "loading" && (
          <>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-border animate-spin">
              <span className="h-4 w-4 rounded-full bg-crimson" />
            </div>
            <h1 className="font-display text-3xl tracking-wide text-text-primary">Verifying...</h1>
          </>
        )}

        {status.state === "success" && (
          <>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <span className="text-2xl text-emerald-400">&#10003;</span>
            </div>
            <h1 className="font-display text-3xl tracking-wide text-text-primary">Email Verified</h1>
            <p className="mt-4 text-text-secondary">{status.message}</p>
            <p className="mt-2 text-text-secondary">Your beta key has been sent to your email.</p>
            <Link href="/auth/login" className="mt-6 inline-block">
              <span className="font-sans text-sm text-crimson hover:underline">Sign in to your dashboard</span>
            </Link>
          </>
        )}

        {status.state === "error" && (
          <>
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-crimson/30 bg-crimson/10">
              <span className="text-2xl text-crimson">&#10007;</span>
            </div>
            <h1 className="font-display text-3xl tracking-wide text-text-primary">Verification Failed</h1>
            <p className="mt-4 text-text-secondary">{status.message}</p>
            <Link href="/auth/login" className="mt-6 inline-block">
              <span className="font-sans text-sm text-crimson hover:underline">Go to Login</span>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-[80vh] items-center justify-center px-6">
        <p className="text-text-secondary">Loading...</p>
      </main>
    }>
      <VerifyContent />
    </Suspense>
  );
}
