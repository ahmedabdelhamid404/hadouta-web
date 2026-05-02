/**
 * Client-side instrumentation. Runs once after HTML loads, before React
 * hydration. Initializes Sentry browser SDK (env-driven; no-op when DSN
 * unset) and exposes router-transition tracking for navigation events.
 */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? "development",

    // Sample 100% of error events (free tier supports 5K/month).
    sampleRate: 1.0,

    // Performance + replay sampled lower to stay within free tier budgets.
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.0,

    // Don't auto-capture PII. Constitution Principle VII + ADR-018:
    // phone numbers and emails are PII, never sent to Sentry.
    sendDefaultPii: false,

    integrations: [
      Sentry.replayIntegration({
        // Mask all user-input fields by default — phone numbers, emails,
        // child names, and uploaded photos are all PII.
        maskAllText: false,
        maskAllInputs: true,
        blockAllMedia: true,
      }),
    ],
  });
}

// Exposed for Next.js to track navigation. Sentry's hook adds breadcrumbs
// automatically; we re-export so Next.js wires it correctly.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
