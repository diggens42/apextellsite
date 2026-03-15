# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website + user portal for **ApexTell**, an all-in-one poker HUD, tracker, solver, trainer, and AI coach desktop application. The product spec lives in `app/website-features.md`.

The site serves two purposes:
1. Landing page that sells the product and drives Closed Beta signups
2. User portal for beta registration, account management, and admin tools

## Tech Stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS v4** (via `@tailwindcss/postcss` — uses `@import "tailwindcss"` and `@theme` syntax)
- **React 19**
- **PostgreSQL** via Prisma ORM v6 (v7 has breaking changes — do not upgrade)
- **NextAuth.js v5** (credentials provider, JWT sessions)
- **Resend** for transactional emails
- **React Hook Form + Zod v4** for form validation (Zod v4 uses `.issues` not `.errors`)
- **Lucide React** for icons

## Commands

```bash
npm run dev          # Dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run db:migrate   # Run Prisma migrations
npm run db:push      # Push schema without migrations
npm run db:seed      # Seed admin user
npm run db:studio    # Prisma Studio GUI
```

## Architecture

### Route Structure
- `/` — Landing page (hero, features, stats, CTA)
- `/features` — Detailed feature breakdown
- `/pricing` — Closed Beta pricing (free access)
- `/auth/*` — Register, login, verify-email, forgot-password, reset-password
- `/dashboard` — User portal (beta key, account info)
- `/dashboard/account` — Email/password change, GDPR account deletion
- `/admin` — Admin overview (protected, ADMIN role)
- `/admin/users` — User management with search/filter
- `/admin/beta-keys` — Beta key management (revoke, reactivate, CSV export)
- `/impressum`, `/privacy`, `/terms` — German legal pages (GDPR)

### Key Directories
- `app/components/ui/` — Reusable components (Button, Input, Card)
- `app/components/layout/` — Navbar, Footer, CookieBanner
- `app/components/landing/` — Landing page sections (Hero, StatsBar, FeaturesGrid, etc.)
- `app/lib/` — Auth config, DB client, email helpers, validation schemas, utilities
- `app/api/` — API routes (auth, account, admin)
- `prisma/` — Schema and seed script

### Auth & Middleware
- `middleware.ts` protects `/dashboard/*` (requires login) and `/admin/*` (requires ADMIN role)
- Auth is split: `auth.config.ts` (edge-safe, no Prisma) for middleware, `auth.ts` (full, with Prisma) for server components/API routes
- JWT tokens carry `id`, `role`, `emailVerified`
- Next.js 16 linter strictly forbids `setState` in effects — use `useReducer` + `.then(dispatch)` for data fetching

### Database Models
- `User` — email, passwordHash, role (USER|ADMIN), emailVerified
- `BetaKey` — unique key (APEX-XXXX-XXXX-XXXX format), linked to user, active/revoked
- `VerificationToken` — email verify and password reset tokens
- `AuditLog` — action logging with IP (90-day retention)

### Design System
- **Colors**: Deep black (#0a0a0a), Crimson (#dc2626), Gold (#d4af37), Off-white (#f5f5f5)
- **Fonts**: Bebas Neue (headlines), DM Mono (stats/numbers), Cormorant Garamond (body)
- **Aesthetic**: Dark luxury / editorial. Not generic SaaS.
- CSS custom properties defined in `app/globals.css`, mapped to Tailwind via `@theme inline`
- Path alias: `@/*` maps to project root

## Environment Variables

See `.env.example` for required variables: DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, RESEND_API_KEY, ADMIN_EMAIL
