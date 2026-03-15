"use client";

import { useSyncExternalStore } from "react";
import Button from "../ui/Button";

function getSnapshot() {
  return localStorage.getItem("cookie-consent");
}

function getServerSnapshot() {
  return null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new StorageEvent("storage"));
  }

  function decline() {
    localStorage.setItem("cookie-consent", "essential-only");
    window.dispatchEvent(new StorageEvent("storage"));
  }

  // Don't render on server or if consent already given
  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl p-4 md:p-6 animate-fade-in">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-sans text-sm font-medium text-text-primary">
            This website uses cookies
          </p>
          <p className="font-sans text-xs text-text-muted max-w-lg">
            We use essential cookies for site functionality. Optional analytics cookies help us improve
            the experience. See our{" "}
            <a href="/privacy" className="text-crimson underline">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="ghost" size="sm" onClick={decline}>
            Essential Only
          </Button>
          <Button size="sm" onClick={accept}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
