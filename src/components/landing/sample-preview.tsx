/**
 * Sample preview — Phase 3 design section rhythm Option C, slot #3.
 * Terracotta accent band; 3 placeholder spreads.
 *
 * Real sample images come from the AI pipeline (Sprint 3+). For now, gradient
 * placeholders match the watercolor expectation set in the hero.
 */
export function SamplePreview() {
  return (
    <section
      id="sample"
      className="bg-primary py-14 md:py-20 text-primary-foreground"
    >
      <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          شوف نموذج
        </h2>
        <p className="opacity-90 mb-8 text-base md:text-lg">
          صفحات من حدوتة &quot;أحمد&quot; — كل طفل يصبح بطل قصته الخاصة.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="aspect-[3/4] rounded-xl bg-gradient-to-br from-hadouta-blush/30 via-hadouta-ochre/20 to-hadouta-cream/15 flex items-center justify-center text-primary-foreground/55 text-sm font-sans"
              role="img"
              aria-label={`نموذج صفحة ${n}`}
            >
              صفحة {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
