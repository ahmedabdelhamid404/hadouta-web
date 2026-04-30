# API Client

This folder hosts the type-safe API client for talking to `hadouta-backend`.

## Files

- `api-types.ts` — auto-generated from backend's OpenAPI spec. **DO NOT edit by hand.**
- `client.ts` — typed `openapi-fetch` wrapper used throughout the app.

## Regenerating types

When the backend's Zod schemas / API change:

```bash
# Make sure backend dev server is running OR set BACKEND_OPENAPI_URL to staging spec
pnpm sync-types
```

This regenerates `api-types.ts`. Type errors after running it = something the frontend depends on changed in the backend. Fix and re-run typecheck.

## Status

📋 To be populated in Sprint 1 (after backend ships its first OpenAPI export).
