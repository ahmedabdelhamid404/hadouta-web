"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/lib/wizard/store";
import { patchOrder } from "@/lib/wizard/api";
import { PhotoUpload } from "./photo-upload";
import { DescriptionForm } from "./description-form";
import { PersonaPicker } from "./persona-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Path = "photo" | "description" | "persona";

export function Step2() {
  const router = useRouter();
  const store = useWizardStore();
  const [path, setPath] = useState<Path | null>(
    store.appearance.appearanceInputType ?? null,
  );

  const proceed = async () => {
    if (!path || !store.orderId) return;
    store.updateAppearance({ appearanceInputType: path });
    // Persist appearance fields to backend
    await patchOrder(store.orderId, {
      appearanceInputType: path,
      mainChildPersonaId: store.appearance.mainChildPersonaId,
      descriptionSkinTone: store.appearance.descriptionSkinTone,
      descriptionHair: store.appearance.descriptionHair,
      descriptionClothingStyle: store.appearance.descriptionClothingStyle,
      descriptionEyeColor: store.appearance.descriptionEyeColor,
    });
    store.setStep(3);
    router.push("/wizard/3");
  };

  if (!path) {
    return (
      <div dir="rtl" className="space-y-6">
        <header>
          <h2 className="font-heading text-2xl font-bold">
            صورة طفلك في الكتاب
          </h2>
          <p className="text-foreground/70 text-sm mt-1">
            إزاي عاوز {store.childInfo.childName ?? "طفلك"} يظهر في الرسومات؟
            في تلات طرق، اختار اللي يريحك:
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => {
              setPath("photo");
              store.updateAppearance({ appearanceInputType: "photo" });
            }}
            className="relative bg-card rounded-xl p-4 text-center border-2 border-primary hover:bg-primary/5 transition-colors"
          >
            <span className="absolute -top-2 right-3 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded font-heading font-semibold">
              الأكثر شيوعاً
            </span>
            <div className="text-3xl mb-2">📷</div>
            <h3 className="font-heading font-semibold">ارفع صور طفلك</h3>
            <p className="text-xs text-foreground/65 mt-1 leading-relaxed">
              ١-٣ صور. هنرسم نسخة مائية لطفلك بنفس الوجه في كل صفحة.
            </p>
          </button>

          <button
            onClick={() => {
              setPath("persona");
              store.updateAppearance({ appearanceInputType: "persona" });
            }}
            className="bg-card rounded-xl p-4 text-center border-2 border-border hover:bg-secondary/30 transition-colors"
          >
            <div className="text-3xl mb-2">👧🏽</div>
            <h3 className="font-heading font-semibold">اختار شكل قريب</h3>
            <p className="text-xs text-foreground/65 mt-1 leading-relaxed">
              اختار من ٦ أشكال جاهزة قريبة من طفلك. أسرع، ومناسب للخصوصية.
            </p>
          </button>

          <button
            onClick={() => {
              setPath("description");
              store.updateAppearance({ appearanceInputType: "description" });
            }}
            className="bg-card rounded-xl p-4 text-center border-2 border-border hover:bg-secondary/30 transition-colors"
          >
            <div className="text-3xl mb-2">✎</div>
            <h3 className="font-heading font-semibold">اوصف طفلك بنفسك</h3>
            <p className="text-xs text-foreground/65 mt-1 leading-relaxed">
              اختار لون البشرة، اوصف الشعر واللباس بكلامك.
            </p>
          </button>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => router.push("/wizard/1")}>
            ← السابق
          </Button>
        </div>
      </div>
    );
  }

  const pathLabel =
    path === "photo"
      ? { tag: "📷 طريقة الصور", title: "صورة طفلك" }
      : path === "persona"
        ? { tag: "👧🏽 طريقة الأشكال", title: "اختار شكل قريب" }
        : { tag: "✎ طريقة الوصف", title: "اوصف طفلك" };

  return (
    <div dir="rtl" className="space-y-4">
      <header>
        <h2 className="font-heading text-2xl font-bold flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              "inline-block text-xs px-2 py-1 rounded",
              path === "photo"
                ? "bg-primary text-primary-foreground"
                : "bg-hadouta-teal text-hadouta-cream",
            )}
          >
            {pathLabel.tag}
          </span>
          <span>{pathLabel.title}</span>
        </h2>
      </header>

      <div className="bg-hadouta-teal/8 border border-hadouta-teal/20 rounded-md p-2 text-xs">
        <button
          onClick={() => setPath(null)}
          className="text-hadouta-teal underline underline-offset-2"
        >
          ↻ تحويل لطريقة تانية
        </button>
      </div>

      {path === "photo" ? (
        <PhotoUpload />
      ) : path === "persona" ? (
        <PersonaPicker />
      ) : (
        <DescriptionForm />
      )}

      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button variant="outline" onClick={() => router.push("/wizard/1")}>
          ← السابق
        </Button>
        <Button onClick={proceed}>التالي ←</Button>
      </div>
    </div>
  );
}
