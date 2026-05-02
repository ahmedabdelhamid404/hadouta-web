import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

/**
 * Hero — Phase 3 design Option A.
 * RTL-natural eye-flow: illustration on the right (eye-start in Arabic),
 * headline + sub + CTA on the left.
 *
 * Honest copy per AI-honesty middle path: emphasizes "مخصص بعناية" + "٢-٣ أيام"
 * without claiming hand-painted or leading with AI.
 *
 * Hero illustration: placeholder gradient until Phase 5+ real watercolor lands.
 */
export function Hero() {
  return (
    <section className="bg-background py-12 md:py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Illustration first in source = RIGHT in RTL = eye-start */}
          <div
            className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-hadouta-blush/70 via-hadouta-ochre/40 to-hadouta-terracotta/30 flex items-center justify-center relative overflow-hidden order-1"
            role="img"
            aria-label="رسمة مائية: تيتة وطفل في مطبخ القاهرة (placeholder)"
          >
            {/* Placeholder watercolor "feel" — replaced with real illustration in Phase 5+ */}
            <span className="bg-background/85 text-foreground/55 text-xs px-3 py-1 rounded-md font-sans">
              رسمة مائية — placeholder
            </span>
          </div>

          {/* Text + CTA — LEFT in RTL */}
          <div className="space-y-5 md:space-y-6 order-2">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              حدوتة لطفلك،
              <br />
              من قلب مصر
            </h1>
            <p className="text-lg md:text-xl text-foreground/75 leading-relaxed max-w-md">
              كتاب مخصص بعناية لطفلك، جاهز في ٢-٣ أيام
            </p>
            <Link
              href="/wizard"
              className={buttonVariants({ size: "lg", className: "text-base px-6" })}
            >
              ابدأ حدوتة طفلك
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
