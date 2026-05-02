import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

/**
 * Pricing — Phase 3 design section rhythm Option C, slot #7.
 * Single tier: 250 EGP digital (per ADR-014 A/B test default).
 * 300 EGP variant flips via backend feature flag for the A/B test.
 */
export function Pricing() {
  return (
    <section className="bg-hadouta-ochre/20 py-14 md:py-20">
      <div
        className="container mx-auto px-4 max-w-2xl text-center"
        dir="rtl"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          السعر
        </h2>
        <p className="text-foreground/65 mb-6 md:mb-8">
          سعر واحد، حدوتة كاملة
        </p>

        <div className="bg-background rounded-2xl p-8 md:p-10 shadow-sm border border-border/30">
          <div
            className="font-display text-5xl md:text-6xl text-primary mb-3 leading-none"
            aria-label="٢٥٠ جنيه مصري"
          >
            ٢٥٠ ج.م
          </div>
          <p className="text-foreground/70 mb-6 md:mb-8 text-base">
            حدوتة كاملة، PDF عالي الجودة، جاهز للتحميل
          </p>
          <Link
            href="/wizard"
            className={buttonVariants({ size: "lg", className: "w-full text-base" })}
          >
            ابدأ حدوتة طفلك
          </Link>
        </div>
      </div>
    </section>
  );
}
