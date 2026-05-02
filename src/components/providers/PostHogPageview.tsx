"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import posthog from "posthog-js";

/**
 * Manual pageview capture — wired to Next.js's App Router navigation.
 * Companion to PostHogProvider's `capture_pageview: false` setting.
 *
 * Wrapped in <Suspense> at usage site (per Next.js requirement for
 * useSearchParams in the App Router).
 */
function PostHogPageviewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    let url = window.origin + pathname;
    const search = searchParams?.toString();
    if (search) url += `?${search}`;

    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogPageview() {
  return (
    <Suspense fallback={null}>
      <PostHogPageviewInner />
    </Suspense>
  );
}
