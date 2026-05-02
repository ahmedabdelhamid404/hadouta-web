/**
 * FAQ — Phase 3 design section rhythm Option C, slot #8.
 * Uses semantic <details>/<summary> for accordion behavior — no JS dependency,
 * no shadcn Accordion install needed.
 *
 * 5 honest answers per AI-honesty middle path: describes production via
 * Egyptian human review + 2-3 day care window, never claims hand-painted.
 */

const faqs = [
  {
    q: "إزاي بتعملوا الحدوتة؟",
    a: "بنحضّر كل حدوتة بعناية لطفلك — موضوع، قصة، ورسومات. بعد كده فريقنا المصري بيراجعها بدقة قبل ما توصلك. التحضير بياخد ٢-٣ أيام.",
  },
  {
    q: "لو ما رضيتش عن الحدوتة؟",
    a: "بنحضّرها تاني — وقت إضافي حوالي ٢٤ ساعة، شامل في السعر. هدفنا ترضى أنت وطفلك.",
  },
  {
    q: "هل لازم أرفع صورة لطفلي؟",
    a: "لأ — تقدر ترفع صور أو توصف طفلك بنفسك (لون البشرة، الشعر، اللباس). الطريقتين بيطلعوا حدوتة جميلة.",
  },
  {
    q: "الكتاب مطبوع ولا رقمي؟",
    a: "PDF رقمي عالي الجودة دلوقتي. النسخة المطبوعة هتكون متاحة كإضافة في v1.5 (أوائل ٢٠٢٧).",
  },
  {
    q: "بتاخدوا أي طرق دفع؟",
    a: "كارت فيزا/ماستركارد، فودافون كاش، إنستاباي — كله عبر Paymob الآمن.",
  },
];

export function Faq() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl" dir="rtl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-center">
          أسئلة متكررة
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-card rounded-lg border border-border/40 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-4 py-3 md:px-5 md:py-4 font-heading font-semibold text-base md:text-lg select-none hover:bg-secondary/40 transition-colors">
                <span>{f.q}</span>
                <span
                  className="text-primary text-xl transition-transform group-open:rotate-45 leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-4 pb-4 md:px-5 md:pb-5 text-foreground/75 leading-relaxed border-t border-border/30 pt-3">
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
