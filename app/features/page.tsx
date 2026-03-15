import type { Metadata } from "next";
import {
  Monitor,
  Brain,
  Bot,
  Search,
  PlayCircle,
  BarChart3,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore ApexTell's complete feature set — HUD, solver, AI coach, leak detector, and more.",
};

const features = [
  {
    icon: Monitor,
    title: "Real-Time HUD Overlay",
    description:
      "Transparent overlay positioned directly on your poker client — no alt-tabbing required.",
    details: [
      "Color-coded stats for every opponent at the table",
      "Automatic player type classification (Nit / TAG / LAG / Fish / Whale)",
      "Click any stat for positional drill-down (SB/BB/UTG/MP/HJ/CO/BTN)",
      "Draggable player boxes with persistent positioning",
      "In-HUD player notes — view and edit without leaving the table",
      "Positional HUD mode with different stats per seat position",
      "Automatic site compliance enforcement",
    ],
  },
  {
    icon: BarChart3,
    title: "Stats Browser",
    description:
      "Deep-dive into any player's tendencies across 23+ tracked statistics.",
    details: [
      "Fuzzy player search with instant results",
      "Color-coded stat cards relative to optimal ranges",
      "VPIP, PFR, 3-Bet, Fold to 3-Bet, C-Bet, WTSD, W$SD, AF, and more",
      "Advanced filtering: position, table size, date range, stakes, pot type",
      "Save and load custom filter presets",
      "Automatic player type classification with manual override",
    ],
  },
  {
    icon: Brain,
    title: "GTO Solver (Postflop)",
    description:
      "Fully embedded postflop solver using Discounted CFR — professional-grade algorithm.",
    details: [
      "Configure any postflop spot: OOP/IP ranges, board, pot, effective stack",
      "Custom bet sizing trees: pot fractions, all-in, geometric sizing",
      "Browse solved game tree node by node with breadcrumb navigation",
      "13x13 strategy grid showing action frequencies for every combo",
      "Click any cell for exact action probabilities and EV",
      "Parallel processing for fast convergence",
    ],
  },
  {
    icon: Bot,
    title: "AI Coach",
    description:
      "A local, offline AI poker coach that answers theory questions and analyzes your hands.",
    details: [
      "Powered by an embedded language model with curated poker knowledge base",
      "Retrieval-augmented generation (RAG) for grounded answers",
      "Filter by topic: domain, street, position, concept",
      "Launch from Hand Replayer with full hand context pre-loaded",
      "Multi-turn conversation support",
      "Fully private — questions and hands never leave your machine",
    ],
  },
  {
    icon: Search,
    title: "Leak Detector",
    description:
      "Automated analysis of your play to identify and fix weaknesses.",
    details: [
      "Overall score gauge (0–100) based on 14+ stat categories",
      "Leaks ranked by severity: critical, major, minor",
      "Directional guidance — whether a stat is too high or too low",
      "Concrete improvement suggestions for each leak",
      "Estimated BB/100 impact per leak",
      "Low sample size warnings to avoid premature conclusions",
    ],
  },
  {
    icon: PlayCircle,
    title: "Hand Replayer",
    description:
      "Step through any hand action by action on a visual poker table.",
    details: [
      "Full graphical table: players, stacks, hole cards, bets, community cards",
      "Playback controls: step forward/back, play/pause, speed adjustment",
      "Street jump buttons (Preflop / Flop / Turn / River)",
      "Keyboard shortcuts (arrow keys, space, home/end)",
      "Hand tagging system (bluff, bad beat, leak, review later)",
      "One-click links to Equity Calculator and AI Coach",
    ],
  },
  {
    icon: Calculator,
    title: "Equity Calculator",
    description:
      "Fast, accurate equity calculations for up to 6 players.",
    details: [
      "Hand vs. hand, hand vs. range, range vs. range",
      "Interactive 13x13 range grid for range selection",
      "Standard range notation input (e.g., AKs, QQ+, 22-99)",
      "Board card picker with dead card tracking",
      "Monte Carlo simulation: 10K to 1M samples",
      "Auto-fills board and cards from Hand Replayer",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase mb-4">
            Feature Breakdown
          </p>
          <h1 className="font-display text-5xl tracking-wide text-text-primary md:text-6xl lg:text-7xl">
            Seven Tools<span className="text-crimson">.</span> One App<span className="text-crimson">.</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Every feature a serious poker player needs — HUD, solver, trainer, AI coach, and more —
            in a single local-first application.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex flex-col gap-12 md:flex-row md:items-start ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg border border-crimson/20 bg-crimson/5">
                  <feature.icon className="h-7 w-7 text-crimson" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-3xl tracking-wide text-text-primary md:text-4xl">
                  {feature.title}
                </h2>
                <p className="mt-4 text-lg text-text-secondary">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Placeholder visual */}
              <div className="flex-1">
                <div className="rounded-xl border border-border bg-card/50 p-8 aspect-[4/3] flex items-center justify-center">
                  <feature.icon className="h-24 w-24 text-border" strokeWidth={0.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
