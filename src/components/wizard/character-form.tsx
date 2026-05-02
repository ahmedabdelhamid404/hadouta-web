"use client";
import type { SupportingChar, CharacterRole } from "@/lib/wizard/store";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ROLES: { value: CharacterRole; label: string }[] = [
  { value: "sibling", label: "أخ/أخت" },
  { value: "friend", label: "صديق" },
  { value: "grandparent", label: "تيتا/جدو" },
  { value: "parent", label: "أب/أم" },
  { value: "pet", label: "حيوان أليف" },
  { value: "other", label: "آخر" },
];

interface Props {
  char: SupportingChar;
  onChange: (c: SupportingChar) => void;
  onRemove: () => void;
}

export function CharacterForm({ char, onChange, onRemove }: Props) {
  return (
    <div className="bg-secondary/30 border border-border/50 rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2">
        <span className="bg-hadouta-ochre/30 px-2 py-0.5 rounded text-xs font-heading font-semibold">
          شخصية {char.position}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="ml-auto text-xs text-foreground/55 underline underline-offset-2 hover:text-destructive"
        >
          إزالة
        </button>
      </div>

      <Input
        placeholder="اسم الشخصية، مثلاً: نور"
        value={char.name}
        onChange={(e) => onChange({ ...char, name: e.target.value })}
      />

      <div className="grid grid-cols-3 gap-1">
        {ROLES.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => onChange({ ...char, role: r.value })}
            className={cn(
              "rounded text-xs py-1 border transition-colors",
              char.role === r.value
                ? "bg-primary/15 border-primary font-semibold"
                : "border-border hover:bg-secondary/50",
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => onChange({ ...char, appearanceInputType: "photo" })}
          className={cn(
            "rounded text-xs py-1.5 border-dashed border transition-colors",
            char.appearanceInputType === "photo"
              ? "border-primary bg-primary/10"
              : "border-border",
          )}
        >
          📷 ارفع صورة
        </button>
        <button
          type="button"
          onClick={() =>
            onChange({ ...char, appearanceInputType: "description" })
          }
          className={cn(
            "rounded text-xs py-1.5 border-dashed border transition-colors",
            char.appearanceInputType === "description"
              ? "border-primary bg-primary/10"
              : "border-border",
          )}
        >
          ✎ اوصف
        </button>
      </div>

      {/* Per-character photo upload + description fields are deferred to a
          follow-up wireframe iteration; for MVP we capture path choice here,
          and the actual upload/description fields land in a sub-modal or
          inline expansion in a later pass. */}
    </div>
  );
}
