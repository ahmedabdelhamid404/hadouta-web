// Wizard client state — Zustand with localStorage persistence.
// Mirrors the backend orderPatchSchema fields so PATCH requests are 1:1 mapped.

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AgeBand = "3-5" | "5-7" | "6-8";
export type Gender = "boy" | "girl";
export type AppearanceInputType = "photo" | "description" | "persona";
export type ClothingStyle =
  | "modern"
  | "egyptian_traditional"
  | "school_uniform"
  | "custom";
export type CharacterRole =
  | "sibling"
  | "friend"
  | "grandparent"
  | "parent"
  | "pet"
  | "other";

export interface ChildInfo {
  childName?: string;
  childAgeBand?: AgeBand;
  childAgeExact?: number;
  childGender?: Gender;
  childHobbies?: string;
  childFavoriteFood?: string;
  childFavoriteColor?: string;
  childSpecialTraits?: string;
  buyerName?: string;
}

export interface Appearance {
  appearanceInputType?: AppearanceInputType;
  photoIds?: string[]; // up to 3
  photoUrls?: string[]; // parallel to photoIds — Cloudinary URLs for preview
  /** Persona library id (e.g. "curly-girl-young") — used when appearanceInputType === "persona". */
  mainChildPersonaId?: string;
  descriptionSkinTone?: string;
  descriptionHair?: string;
  descriptionClothingStyle?: ClothingStyle;
  descriptionEyeColor?: string;
}

export interface SupportingChar {
  name: string;
  role: CharacterRole;
  appearanceInputType: AppearanceInputType;
  photoId?: string;
  descriptionSkinTone?: string;
  descriptionHair?: string;
  descriptionClothingStyle?: ClothingStyle;
  position: 1 | 2;
}

export interface StoryDetails {
  themeId?: string;
  moralValueId?: string;
  customSceneText?: string;
  specialOccasionText?: string;
}

interface WizardState {
  orderId?: string;
  step: number;
  childInfo: ChildInfo;
  appearance: Appearance;
  supportingCharacters: SupportingChar[];
  storyDetails: StoryDetails;
  dedicationText?: string;

  setOrderId: (id: string) => void;
  setStep: (n: number) => void;
  updateChildInfo: (patch: Partial<ChildInfo>) => void;
  updateAppearance: (patch: Partial<Appearance>) => void;
  setSupportingCharacters: (chars: SupportingChar[]) => void;
  updateStoryDetails: (patch: Partial<StoryDetails>) => void;
  setDedication: (text: string) => void;
  reset: () => void;
}

const initial = {
  step: 1,
  childInfo: {} as ChildInfo,
  appearance: {} as Appearance,
  supportingCharacters: [] as SupportingChar[],
  storyDetails: {} as StoryDetails,
  dedicationText: undefined as string | undefined,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      ...initial,
      setOrderId: (orderId) => set({ orderId }),
      setStep: (step) => set({ step }),
      updateChildInfo: (patch) =>
        set((s) => ({ childInfo: { ...s.childInfo, ...patch } })),
      updateAppearance: (patch) =>
        set((s) => ({ appearance: { ...s.appearance, ...patch } })),
      setSupportingCharacters: (supportingCharacters) =>
        set({ supportingCharacters }),
      updateStoryDetails: (patch) =>
        set((s) => ({ storyDetails: { ...s.storyDetails, ...patch } })),
      setDedication: (dedicationText) => set({ dedicationText }),
      reset: () => set({ ...initial, orderId: undefined }),
    }),
    { name: "hadouta-wizard" },
  ),
);
