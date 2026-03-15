import Link from "next/link";

const footerLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/impressum", label: "Impressum" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-xl tracking-widest text-text-primary">
            APEX<span className="text-crimson">TELL</span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-text-muted transition-colors hover:text-text-secondary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <hr className="hr-accent my-8" />

        <p className="text-center font-sans text-xs text-text-muted">
          &copy; {new Date().getFullYear()} ApexTell. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
