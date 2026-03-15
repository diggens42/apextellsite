import Link from "next/link";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-crimson/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex min-h-[90vh] flex-col items-center justify-center text-center">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
              Closed Beta — Now Open
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-6xl leading-none tracking-wide text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
            The Edge<span className="text-crimson">.</span>{" "}
            <br className="hidden sm:block" />
            The Data<span className="text-crimson">.</span>{" "}
            <br className="hidden sm:block" />
            The Win<span className="text-crimson">.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
            The all-in-one poker HUD, tracker, solver, trainer, and AI coach.
            Local-first. Private. Built for serious players.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/auth/register">
              <Button size="lg" className="animate-pulse-glow">
                Join Closed Beta
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="lg">
                See Features
              </Button>
            </Link>
          </div>

          {/* Mock UI Frame */}
          <div className="mt-20 w-full max-w-4xl">
            <div className="rounded-xl border border-border bg-card/50 p-2 shadow-2xl shadow-crimson/5">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-crimson/60" />
                <div className="h-3 w-3 rounded-full bg-gold/40" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/40" />
                <span className="ml-4 font-mono text-xs text-text-muted">apextell — session active</span>
              </div>
              <div className="grid grid-cols-3 gap-px bg-border/30">
                <div className="bg-card p-6 text-center">
                  <p className="font-mono text-2xl font-medium text-gold">+$1,247</p>
                  <p className="mt-1 font-sans text-xs text-text-muted">Session P/L</p>
                </div>
                <div className="bg-card p-6 text-center">
                  <p className="font-mono text-2xl font-medium text-text-primary">847</p>
                  <p className="mt-1 font-sans text-xs text-text-muted">Hands Played</p>
                </div>
                <div className="bg-card p-6 text-center">
                  <p className="font-mono text-2xl font-medium text-emerald-400">6</p>
                  <p className="mt-1 font-sans text-xs text-text-muted">Active Tables</p>
                </div>
              </div>
              <div className="bg-card p-6">
                <div className="flex gap-4">
                  {["VPIP 22%", "PFR 17%", "3Bet 8.4%", "AF 2.9", "WTSD 28%"].map((stat) => (
                    <span key={stat} className="rounded border border-border bg-elevated px-3 py-1.5 font-mono text-xs text-text-secondary">
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
