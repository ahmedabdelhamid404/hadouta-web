"use client";
import { useWizardStore } from "@/lib/wizard/store";
import { PERSONA_OPTIONS } from "@/lib/wizard/personas";
import { cn } from "@/lib/utils";

export function PersonaPicker() {
  const store = useWizardStore();
  const selected = store.appearance.mainChildPersonaId;

  // Filter personas by the child's age band and gender (if those have been
  // collected in step 1). This narrows 6 options to typically 1–2, which is
  // what the customer actually wants to see.
  const ageBand = store.childInfo.childAgeBand;
  const gender = store.childInfo.childGender;
  const filtered = PERSONA_OPTIONS.filter((p) => {
    if (gender && p.gender !== gender) return false;
    if (ageBand && p.ageBand !== ageBand) return false;
    return true;
  });
  const display = filtered.length > 0 ? filtered : PERSONA_OPTIONS;

  return (
    <div className="space-y-3">
      <p className="text-sm text-foreground/70">
        اختار الشكل اللي يقرّب من طفلك. هنرسم بنفس الشكل في كل صفحة عشان يبقى
        ثابت.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {display.map((p) => {
          const isSelected = selected === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                store.updateAppearance({ mainChildPersonaId: p.id })
              }
              className={cn(
                "rounded-lg p-4 border-2 text-right transition-colors",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:bg-secondary/30",
              )}
            >
              <div className="text-3xl mb-2 text-center" aria-hidden="true">
                {p.emoji}
              </div>
              <div className="font-heading font-semibold text-sm leading-tight">
                {p.label}
              </div>
            </button>
          );
        })}
      </div>
      {filtered.length > 0 && filtered.length < PERSONA_OPTIONS.length && (
        <p className="text-xs text-foreground/55">
          فلترنا الخيارات حسب عمر وجنس طفلك. مش لاقي اللي يناسب؟ ارجع للوصف
          أو الصور.
        </p>
      )}
    </div>
  );
}
