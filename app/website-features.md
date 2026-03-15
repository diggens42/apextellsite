# ApexTell — Feature Overview

> The all-in-one poker HUD, tracker, solver, trainer, and AI coach — in a single desktop app.

## At a Glance

- **Platform:** Windows, macOS, Linux
- **Architecture:** Local-first — all data stays on your machine, works fully offline
- **Supported Sites:** PokerStars, PartyPoker, 888poker, WPN/ACR, iPoker Network, Winamax, Unibet, Chico/BetOnline
- **Game Types:** Cash games, tournaments, sit & go's (Hold'em)
- **Multi-Table:** Up to 24 simultaneous tables

---

## Core Features

### Real-Time HUD Overlay

Transparent overlay positioned directly on top of your poker client — no alt-tabbing required.

- Color-coded stats for every opponent at the table
- Automatic player type classification (Nit / TAG / LAG / Fish / Whale)
- Click any stat for a positional drill-down (SB/BB/UTG/MP/HJ/CO/BTN breakdown)
- Draggable player boxes with persistent positioning
- In-HUD player notes — view and edit without leaving the table
- Positional HUD mode: display different stats depending on each player's seat position
- Automatic site compliance enforcement — the HUD respects each site's rules

### Live Session Dashboard

Monitor your session as it happens with real-time updates.

- Live profit/loss display
- Session timer with persistence across navigation
- Per-table breakdown: table name, stakes, hands played, profit
- Live hero stat grid (VPIP, PFR, 3Bet, AF, CBet, and more)
- KPI summary: total hands, session P/L, active tables

### Stats Browser

Deep-dive into any player's tendencies across 23+ tracked statistics.

- Fuzzy player search with instant results
- Color-coded stat cards showing where each value falls relative to optimal ranges
- Automatic player type classification with manual override
- Free-form player notes per player and per site

**Advanced Filtering:**
- Position, table size, game type
- Date range, stakes range, stack depth
- Pot type (unopened / single-raised / 3-bet / 4-bet+), players to flop
- Save and load custom filter presets

**Stats Tracked:**
VPIP, PFR, 3-Bet, Fold to 3-Bet, C-Bet Flop, Fold to C-Bet, WTSD, W$SD, Aggression Factor, Aggression Frequency, Steal, Fold to Steal, WWSF, 4-Bet, Fold to 4-Bet, Cold Call, Limp, Check-Raise, Donk Bet, Squeeze, and more.

### Graphs & Analytics

Visualize your results across every dimension.

- Cumulative P/L graphs (cash, tournament, combined)
- EV-adjusted profit graph (actual vs. expected value)
- Showdown vs. non-showdown winnings breakdown
- Per-position profitability
- Per-stakes profitability
- Volume charts (hands per day by game type)
- Flexible axis modes: USD, BB/100, chips
- Date range presets: week, month, 3 months, year, all time

### Leak Detector

Automated analysis of your play to identify and fix weaknesses.

- Overall score gauge (0–100) based on 14+ stat categories
- Leaks ranked by severity: critical, major, minor
- Directional guidance — tells you whether a stat is too high or too low
- Concrete improvement suggestions for each leak
- Estimated BB/100 impact per leak
- Strengths section highlighting what you're already doing well
- Low sample size warnings to avoid drawing premature conclusions

### Hand Replayer

Step through any hand action by action on a visual poker table.

- Full graphical table: players, stacks, hole cards, bets, community cards
- Playback controls: step forward/back, play/pause, speed adjustment
- Street jump buttons (Preflop / Flop / Turn / River)
- Keyboard shortcuts (arrow keys, space, home/end)
- Scrollable action timeline — click any action to jump directly to it
- Hand tagging system (bluff, bad beat, leak, review later, interesting spot, and more)
- One-click links to Equity Calculator and AI Coach with full hand context

### Equity Calculator

Fast, accurate equity calculations for up to 6 players.

- Hand vs. hand, hand vs. range, range vs. range
- Interactive 13x13 range grid for range selection
- Standard range notation input (e.g., `AKs, QQ+, 22-99`)
- Board card picker with dead card tracking
- Monte Carlo simulation: 10K to 1M samples
- Auto-fills board and cards when launched from the Hand Replayer

---

## Advanced Tools

### GTO Solver (Postflop)

A fully embedded postflop solver using Discounted CFR — the same class of algorithm used by dedicated solver software.

- Configure any postflop spot: OOP/IP ranges, board, pot size, effective stack
- Custom bet sizing trees: pot fractions, all-in, geometric sizing for flop/turn/river
- Adjustable solve parameters: max iterations, target exploitability
- Browse the solved game tree node by node with breadcrumb navigation
- 13x13 strategy grid showing action frequencies for every hand combo
- Click any cell for exact action probabilities and EV
- Stop button to interrupt long solves
- Parallel processing for fast convergence

### GTO Trainer

Practice your decision-making against solver-approved strategies — powered by the embedded solver.

- Configure the scenario: position, spot type, ranges, bet sizes, stack depth
- Random boards and hero hands dealt from your configured ranges
- Make your decision, then see the verdict: Best / Acceptable / Mistake
- Full GTO frequency breakdown after each action
- EV comparison: your action vs. the optimal action
- Statistics panel: accuracy %, best plays %, total drills completed
- Per-spot breakdown (root vs. facing-check vs. facing-bet accuracy)
- Drill history with recent results
- All results persisted across sessions

### AI Coach

A local, offline AI poker coach that answers theory questions and analyzes your hands — no internet required.

- Powered by an embedded language model with a curated poker theory knowledge base
- Retrieval-augmented generation (RAG) for grounded, accurate answers
- Streaming responses — answers appear word by word
- Filter by topic: domain, street, position, concept
- Hand context integration: launch from the Hand Replayer with board, cards, position, pot, and stack info pre-loaded
- Multi-turn conversation support
- Fully private — your questions and hands never leave your machine

---

## Import & Configuration

### Hand History Import

- Auto-detection: drop any hand history file and ApexTell identifies the site automatically
- Watched directories: set folders for live auto-import as you play
- Bulk import: select multiple folders for one-time batch import with detailed results
- 8 supported sites with dedicated parsers

### HUD Configuration

- Per-stat toggle: choose which stats to display
- 4-threshold color coding per stat (customizable breakpoints)
- Font size and opacity controls
- Site compliance panel with per-site toggle and compliance indicators
- Positional HUD configuration: choose stats per position group

### Auto-Notes Rule Builder

- Pre-built rule library with toggle and inline editing
- Visual rule builder for custom rules: pick stat, operator, value, note template
- Rules run automatically on every imported hand
- Category labels and variable substitution in note templates

### Player Type Configuration

- Customize VPIP/PFR thresholds for each player type
- Live test box: enter values and preview the assigned type
- Reset to defaults

### Display Settings

- Cash game display mode: USD / Big Blinds / Chips
- Tournament display mode: USD / Big Blinds / Chips

---

## Licensing & Updates

- Subscription-based licensing
- 7-day offline grace period — keep playing even without internet
- Built-in auto-updater: check for updates and install with one click

---

## Why ApexTell?

- **Everything in one app.** HUD, tracker, solver, trainer, and AI coach — no need to juggle multiple subscriptions and tools.
- **Local-first and private.** Your hand data, stats, and AI conversations stay on your machine. No cloud uploads.
- **Modern interface.** A clean, premium dark UI designed for long sessions — not a relic from 2010.
- **Real solver, not a toy.** The embedded GTO solver uses Discounted CFR with parallel processing — the same algorithm class used by professional-grade solvers.
- **AI-powered study.** An offline AI coach that actually understands your hands and can discuss theory — a category first.
- **Broad site coverage.** 8 supported poker sites out of the box, with auto-detection.
- **Multi-table ready.** Designed and tested for up to 24 simultaneous tables with minimal performance overhead.
