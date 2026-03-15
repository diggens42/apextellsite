import Link from "next/link";
import Button from "../ui/Button";

export default function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-crimson/[0.06] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
            <p className="font-sans text-xs font-semibold tracking-widest text-gold uppercase mb-6">
              Invitation Only
            </p>
            <h2 className="font-display text-4xl tracking-wide text-text-primary md:text-5xl lg:text-6xl">
              Shape the Future of<br />Poker Software<span className="text-crimson">.</span>
            </h2>
            <p className="mt-6 text-lg text-text-secondary max-w-lg mx-auto">
              Join the Closed Beta. Get free access, direct influence on features,
              and a founding member badge when we launch.
            </p>
            <div className="mt-10">
              <Link href="/auth/register">
                <Button size="lg" className="animate-pulse-glow">
                  Request Beta Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
