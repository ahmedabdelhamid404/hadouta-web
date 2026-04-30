# Hadouta Web Constitution

The inviolable principles that govern code, architecture, and operations in this Next.js frontend repository. Read before every significant change. Spec-kit `/speckit.plan` and `/speckit.tasks` MUST verify compliance before proceeding.

## Core Principles

### I. TypeScript Strict (NON-NEGOTIABLE)
TypeScript runs in strict mode. No `any`. No `as` casts except at integration boundaries with documented justification. All component props typed. All API client calls typed via OpenAPI-generated types from backend.

### II. RTL Arabic First
Default locale is Arabic with `dir="rtl"`. English support exists but is secondary (diaspora v2 priority). Tailwind's `rtl:` and `ltr:` variants used consistently. Test every new component in BOTH directions.

### III. Schema-Driven Forms
Every form uses Zod schema imported from the schemas package or generated from backend OpenAPI. Same schema validates client-side AND server-side. Form errors render in Arabic by default.

### IV. shadcn/ui Conventions
We use shadcn/ui (copy-paste, owned components in `src/components/ui/`). When adding new components, prefer shadcn's existing components over building custom. Custom variants extend via `cva` (class-variance-authority). NEVER edit shadcn components without recording why in a comment.

### V. Server Components First
Default to React Server Components. Use `'use client'` only when necessary (interactivity, hooks, browser APIs). The customer ordering flow is mostly client (form state heavy); marketing pages should be 100% server.

### VI. Performance Budget
- LCP < 2.5s on mobile 4G
- TTI < 3.5s on mobile 4G
- Bundle size for landing page < 200KB JS gzipped
- Images served via Cloudflare R2 + Next.js Image component
- Fonts: only the 2 chosen Arabic fonts + 1 Latin fallback

### VII. Accessibility
WCAG AA target. Every form has labels. Every image has alt text (Arabic). Keyboard navigation works. shadcn's Radix UI primitives give accessibility for free — don't undo it.

### VIII. Privacy First
Photo upload via signed R2 URLs (frontend uploads directly, our backend never touches photo bytes). Auto-deletion notice visible at upload step. Parental consent checkbox is mandatory. PII never logged to analytics.

### IX. Read the Local Next.js Docs (NON-NEGOTIABLE for this Next.js version)
This installation's `AGENTS.md` warns: this is NOT the Next.js you know — APIs, conventions, and file structure may differ from training data. **Before writing code that touches App Router conventions, route handlers, server actions, caching, or any framework-specific feature, read the relevant guide in `node_modules/next/dist/docs/`** to confirm current syntax. Heed deprecation notices.

## Technology Stack (Fixed for v1)

- **Framework**: Next.js 16 (App Router) — current install
- **React**: 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui + Radix UI primitives
- **i18n**: next-intl
- **Forms**: react-hook-form + Zod resolvers
- **State**: React Server Components by default; TanStack Query when client-side server-state caching is genuinely needed
- **Auth**: Better-Auth client SDK (matches backend)
- **API client**: openapi-fetch + openapi-typescript (generated from backend)
- **Fonts**: Tajawal (Arabic) + Inter (Latin) — to be confirmed
- **Analytics**: PostHog
- **Errors**: Sentry
- **Deploy**: Cloudflare Pages

Substitutions allowed only via documented ADR.

## Development Workflow

### Code Review (Mandatory)
Every PR-style change reviewed by Code Reviewer agent before merge. Frontend Developer agent does the implementation; Code Reviewer reviews; manager (Claude) does final read-through.

### Spec-Kit Workflow
Non-trivial features go through: `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`.

### Single Repo, Two Audiences
This single Next.js app serves BOTH customer flow (`app/(customer)/*`) and admin panel (`app/admin/*` guarded by Better-Auth role check). Do NOT split into two apps.

### Type Sync with Backend
When backend Zod schemas change, run `pnpm sync-types` to regenerate `src/lib/api/api-types.ts` from the backend's OpenAPI spec. Type-check should catch any mismatches immediately.

## Governance

This constitution supersedes any conflicting practice. Amendments require:
1. New ADR documenting the change + rationale (in `../docs/decisions/`)
2. Update to this file
3. Notification in current sprint's session notes

For runtime guidance during a feature build, agents reference:
- This constitution
- The current sprint plan
- Relevant ADRs in `../docs/decisions/`
- The local Next.js docs in `node_modules/next/dist/docs/` (per Principle IX)

**Version**: 1.0.0 | **Ratified**: 2026-04-30 | **Last Amended**: 2026-04-30
