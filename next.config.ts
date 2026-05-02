import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

// Wrap with Sentry config — adds source-map upload during build (when
// SENTRY_AUTH_TOKEN is set), error-monitoring telemetry, and tunnel
// routing to bypass ad-blockers. All behaviors degrade gracefully when
// the relevant env vars are unset (local dev / no Sentry org yet).
export default withSentryConfig(nextConfig, {
  // Suppress logs from the Sentry build plugin unless we explicitly want them.
  silent: !process.env.CI,

  // Tunnel route to bypass browser ad-blockers that block sentry.io.
  // Reduces false-negative error reporting from users with privacy extensions.
  tunnelRoute: "/monitoring",

  // Source maps: only upload during CI builds where SENTRY_AUTH_TOKEN is
  // available. Skip in local dev to keep build times fast and not require
  // every developer to have a Sentry auth token.
  sourcemaps: {
    disable: !process.env.SENTRY_AUTH_TOKEN,
  },
});
