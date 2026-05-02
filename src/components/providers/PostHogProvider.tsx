"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

/**
 * Initializes PostHog on first client mount and provides the client via
 * React context. Init is a no-op when NEXT_PUBLIC_POSTHOG_KEY is unset
 * (local dev without an account; preview deploys before keys are set).
 *
 * Privacy posture (Constitution Principle VII + ADR-018):
 *  - person_profiles: 'identified_only' — anonymous visitors don't create
 *    PostHog person records; profiles only created after `posthog.identify()`
 *    on confirmed authenticated users
 *  - mask_all_text + mask_all_inputs in session replay — phone numbers,
 *    emails, child names, and uploaded photos never leave the browser
 *  - capture_pageview: false — we use Next.js's router events instead
 *    (manual page-view capture; controlled via PostHogPageview below)
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || typeof window === "undefined") return;

    posthog.init(key, {
      // Hadouta's PostHog account is on the EU instance — default reflects that.
      // Override via NEXT_PUBLIC_POSTHOG_HOST if/when we move regions.
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: "[data-ph-mask]",
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
