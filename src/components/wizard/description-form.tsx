"use client";
import { useWizardStore, type ClothingStyle } from "@/lib/wizard/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SkinTonePicker } from "./skin-tone-picker";
import { cn } from "@/lib/utils";

const CLOTHING_OPTIONS: { value: ClothingStyle; label: string }[] = [
  { value: "modern", label: "عصري" },
  { value: "egyptian_traditional", label: "تقليدي مصري" },
  { value: "school_uniform", label: "زي مدرسي" },
  { value: "custom", label: "مخصص" },
];

export function DescriptionForm() {
  const { appearance, updateAppearance } = useWizardStore();
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>لون البشرة *</Label>
        <SkinTonePicker
          value={appearance.descriptionSkinTone}
          onChange={(v) => updateAppearance({ descriptionSkinTone: v })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hair">وصف الشعر *</Label>
        <Input
          id="hair"
          placeholder="شعر طويل أسود، شعر قصير بني مجعد..."
          value={appearance.descriptionHair ?? ""}
          onChange={(e) => updateAppearance({ descriptionHair: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>طريقة اللباس *</Label>
        <div className="grid grid-cols-2 gap-2">
          {CLOTHING_OPTIONS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() =>
                updateAppearance({ descriptionClothingStyle: c.value })
              }
              className={cn(
                "rounded-md py-2 px-1 text-sm border transition-colors",
                appearance.descriptionClothingStyle === c.value
                  ? "bg-primary/15 border-primary font-semibold"
                  : "border-border hover:bg-secondary/40",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eyeColor">
          لون العيون{" "}
          <span className="text-foreground/50 text-xs">(اختياري)</span>
        </Label>
        <Input
          id="eyeColor"
          placeholder="بني، أخضر، أزرق..."
          value={appearance.descriptionEyeColor ?? ""}
          onChange={(e) =>
            updateAppearance({ descriptionEyeColor: e.target.value })
          }
        />
      </div>
    </div>
  );
}
