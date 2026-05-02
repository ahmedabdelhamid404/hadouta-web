/**
 * Theme gallery preview — Phase 3 design section rhythm Option C, slot #5.
 * Static preview of 6 themes from the brand brief catalog.
 * Religion-neutral pan-Egyptian: includes Christmas + Sham El-Nessim
 * alongside Eid + Ramadan (vs. Hekaya's Muslim-only lineup).
 *
 * Full catalog (8 themes age-band-tagged) is loaded inside the wizard step 4.
 * This is just a teaser for the landing.
 */

const themes = [
  { ar: "أول يوم مدرسة", icon: "🏫" },
  { ar: "الصداقة", icon: "🤝" },
  { ar: "العيد", icon: "🌙" },
  { ar: "الكريسماس", icon: "⭐" },
  { ar: "شم النسيم", icon: "🥚" },
  { ar: "مغامرة كبيرة", icon: "⛰️" },
];

export function ThemeGalleryPreview() {
  return (
    <section className="bg-secondary/40 py-14 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl" dir="rtl">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            مواضيع للحدوتة
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            من رمضان والعيد لشم النسيم وأول يوم مدرسة
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 list-none">
          {themes.map((t) => (
            <li
              key={t.ar}
              className="bg-background rounded-xl p-4 md:p-5 text-center border border-border/30 hover:border-primary/30 transition-colors"
            >
              <div className="text-3xl md:text-4xl mb-2" aria-hidden="true">
                {t.icon}
              </div>
              <p className="font-heading font-semibold text-sm md:text-base">
                {t.ar}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
