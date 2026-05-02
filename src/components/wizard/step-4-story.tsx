"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/lib/wizard/store";
import {
  patchOrder,
  fetchThemes,
  fetchMoralValues,
  type Theme,
  type MoralValue,
} from "@/lib/wizard/api";
import { ThemeCard } from "./theme-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Step4() {
  const router = useRouter();
  const store = useWizardStore();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [morals, setMorals] = useState<MoralValue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchThemes(store.childInfo.childAgeBand),
      fetchMoralValues(),
    ])
      .then(([t, m]) => {
        if (!cancelled) {
          setThemes(t);
          setMorals(m);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [store.childInfo.childAgeBand]);

  const proceed = async () => {
    if (
      !store.orderId ||
      !store.storyDetails.themeId ||
      !store.storyDetails.moralValueId
    ) {
      return;
    }
    await patchOrder(store.orderId, { ...store.storyDetails });
    store.setStep(5);
    router.push("/wizard/5");
  };

  const canProceed = !!(
    store.storyDetails.themeId && store.storyDetails.moralValueId
  );

  if (loading) {
    return (
      <div dir="rtl" className="text-center py-12 text-foreground/65">
        بنحضّر القائمة...
      </div>
    );
  }

  return (
    <form
      dir="rtl"
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void proceed();
      }}
    >
      <header>
        <h2 className="font-heading text-2xl font-bold">
          حدوتة {store.childInfo.childName ?? "طفلك"} عن إيه؟
        </h2>
        <p className="text-foreground/70 text-sm mt-1">
          اختار موضوع القصة + قيمة تربوية تحب طفلك يتعلمها.
        </p>
      </header>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          موضوع الحدوتة *
          {store.childInfo.childAgeBand && (
            <span className="text-xs text-hadouta-teal bg-hadouta-teal/10 px-1.5 rounded">
              مفلتر للعمر {store.childInfo.childAgeBand}
            </span>
          )}
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {themes.map((t) => (
            <ThemeCard
              key={t.id}
              theme={t}
              selected={store.storyDetails.themeId === t.id}
              onSelect={() => store.updateStoryDetails({ themeId: t.id })}
            />
          ))}
        </div>
        {themes.length === 0 && (
          <p className="text-sm text-foreground/55 text-center py-4">
            مفيش مواضيع متاحة للفئة العمرية دي حالياً.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>قيمة تربوية تحب طفلك يتعلمها *</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
          {morals.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => store.updateStoryDetails({ moralValueId: m.id })}
              className={cn(
                "rounded py-2 px-1 text-xs border text-center leading-tight transition-colors",
                store.storyDetails.moralValueId === m.id
                  ? "bg-primary/15 border-primary font-semibold"
                  : "border-border hover:bg-secondary/40",
              )}
            >
              {m.nameAr}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="customScene">
          مشهد خاص تحب يكون في الحدوتة{" "}
          <span className="text-foreground/50 text-xs">(اختياري)</span>
        </Label>
        <textarea
          id="customScene"
          className="w-full rounded-md border border-border bg-background p-2 text-sm"
          rows={3}
          placeholder="مثلاً: مشهد ليلى بتساعد أخوها الصغير يربط الحذاء..."
          value={store.storyDetails.customSceneText ?? ""}
          onChange={(e) =>
            store.updateStoryDetails({ customSceneText: e.target.value })
          }
          maxLength={500}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="occasion">
          مناسبة خاصة{" "}
          <span className="text-foreground/50 text-xs">(اختياري)</span>
        </Label>
        <Input
          id="occasion"
          placeholder="عيد ميلاد ليلى، نجاحها بالمدرسة..."
          value={store.storyDetails.specialOccasionText ?? ""}
          onChange={(e) =>
            store.updateStoryDetails({ specialOccasionText: e.target.value })
          }
          maxLength={200}
        />
      </div>

      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/wizard/3")}
        >
          ← السابق
        </Button>
        <Button type="submit" disabled={!canProceed}>
          التالي ←
        </Button>
      </div>
    </form>
  );
}
