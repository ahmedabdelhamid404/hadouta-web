// 6-swatch visual skin-tone picker — Phase 3 Decision 1 description path.

const TONES = [
  "#3a2415",
  "#6e4528",
  "#a06d3e",
  "#c8915f",
  "#e0b685",
  "#f0d2a8",
];

export function SkinTonePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {TONES.map((tone) => (
        <button
          key={tone}
          type="button"
          onClick={() => onChange(tone)}
          aria-label={`Skin tone ${tone}`}
          aria-pressed={value === tone}
          className={`w-8 h-8 rounded-full border-2 transition-all ${
            value === tone
              ? "border-primary ring-2 ring-primary/20 scale-110"
              : "border-foreground/10 hover:border-foreground/30"
          }`}
          style={{ background: tone }}
        />
      ))}
    </div>
  );
}
