"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl" role="navigation" aria-label="Main">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-2xl tracking-widest text-text-primary">
              APEX<span className="text-crimson">TELL</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/auth/login" className="font-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
              Login
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Join Beta</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="text-text-secondary md:hidden cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background px-6 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="font-sans text-base text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={close}
              className="font-sans text-base text-text-secondary hover:text-text-primary"
            >
              Login
            </Link>
            <Link href="/auth/register" onClick={close}>
              <Button size="sm" className="w-full">Join Beta</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
