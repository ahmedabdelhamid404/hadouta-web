/**
 * Trust band — Phase 3 design section rhythm Option C, slot #6.
 * THREE-PART HONEST CLAIM (per brand brief AI-honesty quiet middle path):
 *   1. Egyptian writers + illustrators design our story templates
 *   2. Egyptian team reviews every book
 *   3. 2-3 day production window — NOT minutes
 *
 * Team photos: Track B — Ahmed sources photos and we swap into the cards.
 * Until then: gradient avatar placeholders + names.
 */

const claims = [
  {
    ar: "كتّاب ورسامين مصريين",
    sub: "بيصمموا قوالب حكاياتنا — ثقافة مصرية أصيلة في كل صفحة",
  },
  {
    ar: "مراجعة بإيد مصرية",
    sub: "فريقنا بيراجع كل حدوتة بدقة قبل ما توصلك",
  },
  {
    ar: "جاهزة في ٢-٣ أيام",
    sub: "وقت كافي للعناية والمراجعة — مش دقايق",
  },
];

export function TrustBand() {
  return (
    <section className="bg-hadouta-teal py-14 md:py-20 text-hadouta-cream">
      <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 md:mb-14 text-center">
          وعدنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {claims.map((c) => (
            <div key={c.ar} className="text-center space-y-3">
              <h3 className="font-heading text-xl md:text-2xl font-semibold">
                {c.ar}
              </h3>
              <p className="text-sm md:text-base opacity-90 leading-relaxed">
                {c.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
