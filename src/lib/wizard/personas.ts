// Frontend mirror of backend personas (src/lib/ai/personas.ts on the server).
// Customer picks an id; the wizard sends mainChildPersonaId on the order PATCH;
// the backend Bible generator looks up the full persona description from the
// canonical server-side library. So this frontend mirror only needs the
// fields the picker UI displays — id, label, gender, ageBand, plus a small
// emoji tag for visual recognition in the grid.

export interface PersonaOption {
  id: string;
  label: string;
  gender: "boy" | "girl";
  ageBand: "3-5" | "5-7" | "6-8";
  emoji: string;
}

export const PERSONA_OPTIONS: readonly PersonaOption[] = [
  { id: "curly-girl-young", label: "بنت بشعر مجعد، 3-5 سنوات", gender: "girl", ageBand: "3-5", emoji: "👧🏽" },
  { id: "straight-girl-young", label: "بنت بشعر طويل ناعم، 3-5 سنوات", gender: "girl", ageBand: "3-5", emoji: "👧🏻" },
  { id: "hijab-girl-older", label: "بنت محجبة، 6-8 سنوات", gender: "girl", ageBand: "6-8", emoji: "🧕🏽" },
  { id: "glasses-boy-mid", label: "ولد بنظارة، 5-7 سنوات", gender: "boy", ageBand: "5-7", emoji: "👦🏽" },
  { id: "short-hair-boy-young", label: "ولد بشعر قصير، 3-5 سنوات", gender: "boy", ageBand: "3-5", emoji: "👦🏼" },
  { id: "curly-boy-older", label: "ولد بشعر مجعد، 6-8 سنوات", gender: "boy", ageBand: "6-8", emoji: "👦🏽" },
];
