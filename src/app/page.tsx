import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { StorytellerSetup } from "@/components/landing/storyteller-setup";
import { SamplePreview } from "@/components/landing/sample-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ThemeGalleryPreview } from "@/components/landing/theme-gallery-preview";
import { TrustBand } from "@/components/landing/trust-band";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { SiteFooter } from "@/components/landing/site-footer";

/**
 * Hadouta landing page — Phase 5 implementation of Phase 3 design spec.
 * Section rhythm: Option C (Story-first with team-photo trust band).
 *
 * Section sequence (band colors per brand brief):
 *   1. Hero (cream)               — option A: illustration-right RTL
 *   2. Storyteller setup (cream)  — emotional frame
 *   3. Sample preview (terracotta) — placeholder spreads
 *   4. How it works (cream)       — 4-step explainer
 *   5. Theme gallery (ochre)      — 6 themes preview
 *   6. Trust band (teal)          — 3-part honest claim
 *   7. Pricing (ochre-tinted)     — single 250 EGP tier
 *   8. FAQ (cream)                — 5 honest answers
 *   9. Footer (cream-tinted)
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <StorytellerSetup />
        <SamplePreview />
        <HowItWorks />
        <ThemeGalleryPreview />
        <TrustBand />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
