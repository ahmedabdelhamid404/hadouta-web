/**
 * Server-side instrumentation. Runs once on Next.js server boot.
 * Loads Sentry for the active runtime (Node or Edge). When SENTRY_DSN
 * is unset (e.g. local dev without Sentry account), init is a no-op.
 */

import * as Sentry from "@sentry/nextjs";
import type { Instrumentation } from "next";

export async function register() {
  const dsn =
    process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN;

  if (!dsn) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[sentry] NEXT_PUBLIC_SENTRY_DSN not set in production — error tracking disabled.",
      );
    }
    return;
  }

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV ?? "development",
      sampleRate: 1.0,
      tracesSampleRate: 0.1,
      sendDefaultPii: false,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV ?? "development",
      sampleRate: 1.0,
      tracesSampleRate: 0.1,
      sendDefaultPii: false,
    });
  }
}

/**
 * Server error reporter — Next.js calls this for any server-side error
 * (Server Components, Route Handlers, Server Actions, Middleware).
 * See docs/01-app/03-api-reference/03-file-conventions/instrumentation.md
 */
export const onRequestError: Instrumentation.onRequestError = (
  err,
  request,
  context,
) => {
  Sentry.captureRequestError(err, request, context);
};
