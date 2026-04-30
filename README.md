# Hadouta Web (حدوتة)

Next.js frontend for Hadouta — Egyptian AI personalized children's book platform.

> **Heads-up to anyone reading this**: this repo is one of two. The backend lives at `../hadouta-backend`. The shared design doc, sprint plans, ADRs, and session notes live at `../docs/`. **Read `../docs/sprints/sprint-tracker.md` first to understand current state.**

> **Important — about this Next.js version**: see `AGENTS.md` at the root. This installation has breaking changes from older Next.js. Read `node_modules/next/dist/docs/` for current API patterns before writing code that touches App Router conventions.

---

## Stack

- **Framework**: Next.js 16 + React 19 (App Router)
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (RTL-enabled) + Radix UI primitives
- **i18n**: next-intl (Arabic primary, English secondary)
- **Forms**: react-hook-form + Zod
- **Auth**: Better-Auth client SDK (matches backend)
- **API client**: openapi-fetch + openapi-typescript (types generated from backend OpenAPI)
- **Fonts**: Tajawal (Arabic) + Inter (Latin)
- **Analytics**: PostHog
- **Errors**: Sentry
- **Deploy**: Vercel (free Hobby tier MVP → Pro at scale)

Full architectural decisions: see `../docs/decisions/ADR-*.md`.

---

## Quick start

### Prereqs

- Node.js 20.18+ (`nvm use` if you have nvm)
- pnpm 10+
- The backend running locally at `http://localhost:3001` (see `../hadouta-backend/README.md`)

### Setup

```bash
# 1. Install
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:3001 (default if backend is local)

# 3. Run dev server
pnpm dev
```

The app runs on `http://localhost:3000`. Default page is the Arabic landing + waitlist signup form.

### Sync types from backend

When backend API changes:

```bash
# Make sure backend dev server is running
pnpm sync-types
```

This regenerates `src/lib/api/api-types.ts` from the backend's OpenAPI export.

---

## Project structure

```
src/
├── app/                       Next.js App Router
│   ├── layout.tsx             RTL Arabic layout, Tajawal + Inter fonts
│   ├── page.tsx               landing page (Arabic, waitlist signup)
│   ├── globals.css            shadcn theme tokens + Tailwind 4 directives
│   ├── (customer)/            customer ordering flow (Sprint 4)
│   ├── admin/                 admin panel routes (guarded, Sprint 5)
│   └── api/                   Next.js route handlers (mostly auth callbacks)
├── components/
│   ├── ui/                    shadcn/ui copy-paste components
│   └── landing/               landing-page-specific components
├── lib/
│   ├── api/                   API client (openapi-fetch) + generated types
│   ├── auth/                  Better-Auth client setup
│   └── utils.ts               cn() utility
messages/                      next-intl translations
├── ar.json
└── en.json
public/                        static assets
.specify/                      spec-kit workflows + memory + templates
.claude/                       project-scope Claude Code config
```

---

## Useful scripts

```bash
pnpm dev              # start dev server
pnpm build            # production build
pnpm start            # serve production build
pnpm typecheck        # type-check without emit
pnpm lint             # run ESLint
pnpm sync-types       # regenerate API types from backend OpenAPI
```

---

## Multi-session continuity

Every session reads `../docs/sprints/sprint-tracker.md` first. Every session writes a session note in `../docs/session-notes/` at the end. Decisions get documented as ADRs in `../docs/decisions/`. The sprint plans live in `../docs/sprints/`.

If you're starting a new session: **read the tracker, read the latest session note, open the current sprint plan, continue.**

---

## License

Private. Not for redistribution.
