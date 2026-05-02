/**
 * Storyteller setup — Phase 3 design section rhythm Option C, slot #2.
 * Sets emotional frame between hero and product details.
 *
 * Final copy is Phase 6 brand statements; this is acceptable Storyteller-voice
 * placeholder honored by the brand brief voice example sheet.
 */
export function StorytellerSetup() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary/40 py-14 md:py-20">
      <div
        className="container mx-auto px-4 max-w-3xl text-center"
        dir="rtl"
      >
        <p
          className="font-display text-3xl md:text-4xl text-primary/80 mb-3 leading-none"
          aria-hidden="true"
        >
          ۞
        </p>
        <p className="font-heading text-xl md:text-2xl leading-relaxed text-foreground/85">
          كل حدوتة بتبدأ بطفل. اسم، ضحكة، طريقة لما يضحك ولما يعيط.
          خلينا نعرفه أكتر — ونحضّر له حدوتته.
        </p>
      </div>
    </section>
  );
}
