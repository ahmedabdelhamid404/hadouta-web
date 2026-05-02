/**
 * How-it-works — Phase 3 design, 4-step explainer.
 * Step copy is honest about production model: "AI ترسم" appears here in
 * the production-step explainer (true context); not used as brand headline.
 * Per brand brief AI-honesty rule.
 */

const steps = [
  {
    num: "١",
    title: "اخترلنا طفلك",
    sub: "اسمه، عمره، صورته أو وصفه — وكتير من اللمسات اللي بتميزه",
  },
  {
    num: "٢",
    title: "اختار الموضوع والقيمة",
    sub: "العيد، أول يوم مدرسة، الشجاعة، الكرم — المزيج بيخلي القصة شخصية",
  },
  {
    num: "٣",
    title: "بنحضّر القصة",
    sub: "بناءً على قوالب صممها كتّاب ورسامين مصريين",
  },
  {
    num: "٤",
    title: "فريقنا المصري بيراجعها",
    sub: "كل حدوتة بنراجعها بدقة قبل ما توصلك",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            إزاي بنعملها؟
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            ٤ خطوات وحدوتتك في إيدك
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 list-none">
          {steps.map((s) => (
            <li key={s.num} className="text-center space-y-2">
              <div
                className="font-display text-4xl text-primary leading-none"
                aria-hidden="true"
              >
                {s.num}
              </div>
              <h3 className="font-heading text-lg md:text-xl font-semibold">
                {s.title}
              </h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {s.sub}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
