import type { Theme } from "@/lib/wizard/api";

const ICONS: Record<string, string> = {
  school: "🏫",
  friendship: "🤝",
  eid: "🌙",
  ramadan: "🕌",
  christmas: "⭐",
  shamel: "🥚",
  birthday: "🎂",
  adventure: "⛰️",
};

interface Props {
  theme: Theme;
  selected: boolean;
  onSelect: () => void;
}

export function ThemeCard({ theme, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative bg-card rounded-lg p-2 text-center border-2 transition-all ${
        selected
          ? "border-primary bg-primary/8"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div
        className="h-9 flex items-center justify-center text-2xl"
        aria-hidden="true"
      >
        {(theme.illustrationKey && ICONS[theme.illustrationKey]) || "📖"}
      </div>
      <div className="font-heading font-semibold text-xs leading-tight mt-1">
        {theme.titleAr}
      </div>
      <div className="text-[9px] text-hadouta-teal bg-hadouta-teal/10 inline-block px-1.5 rounded mt-1">
        {theme.suitableAgeBands.join(" · ")}
      </div>
    </button>
  );
}
