"use client";
import { useWizardStore } from "@/lib/wizard/store";
import { cn } from "@/lib/utils";

const labels = ["طفلك", "الصورة", "العائلة", "الحدوتة", "مراجعة", "الدفع", "تم"];
const arNumerals = ["١", "٢", "٣", "٤", "٥", "٦", "٧"];

export function WizardStepper() {
  const step = useWizardStore((s) => s.step);
  return (
    <div className="bg-secondary/40 border-b border-border/30 py-3">
      <div className="container mx-auto max-w-3xl px-4" dir="rtl">
        <div className="flex gap-1">
          {labels.map((label, i) => {
            const num = i + 1;
            const isActive = num === step;
            const isDone = num < step;
            const isCheckout = num === 6;
            const isConfirm = num === 7;
            return (
              <div
                key={num}
                className={cn(
                  "flex-1 rounded-md text-center font-heading text-xs py-2 px-1 leading-tight",
                  isActive && !isCheckout && !isConfirm &&
                    "bg-primary text-primary-foreground",
                  isActive && isCheckout && "bg-hadouta-ochre text-foreground",
                  isActive && isConfirm && "bg-hadouta-teal text-hadouta-cream",
                  isDone && "bg-hadouta-teal/15 text-hadouta-teal",
                  !isActive && !isDone && "bg-foreground/5 text-foreground/45",
                )}
              >
                <span
                  className="block font-display text-[10px] opacity-85"
                  aria-hidden="true"
                >
                  {arNumerals[i]}
                </span>
                {label}
                {isDone && " ✓"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
