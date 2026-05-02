"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore, type SupportingChar } from "@/lib/wizard/store";
import { patchOrder } from "@/lib/wizard/api";
import { CharacterForm } from "./character-form";
import { Button } from "@/components/ui/button";

export function Step3() {
  const router = useRouter();
  const store = useWizardStore();
  const [chars, setChars] = useState<SupportingChar[]>(
    store.supportingCharacters,
  );

  const skipOrContinue = async (skip: boolean) => {
    if (!store.orderId) return;
    const finalChars = skip ? [] : chars;
    await patchOrder(store.orderId, { supportingCharacters: finalChars });
    store.setSupportingCharacters(finalChars);
    store.setStep(4);
    router.push("/wizard/4");
  };

  if (chars.length === 0) {
    return (
      <div dir="rtl" className="space-y-6">
        <header>
          <h2 className="font-heading text-2xl font-bold">حد تاني في الحدوتة؟</h2>
          <p className="text-foreground/70 text-sm mt-1">
            حدوتة {store.childInfo.childName ?? "طفلك"} هتكون عنها أساساً. لو
            حابة تضيفي أخت، صديق، تيتا، أو حد من العيلة في القصة — تقدر
            دلوقتي. <strong>اختياري</strong>.
          </p>
        </header>

        <div className="bg-card rounded-xl border border-border p-6 text-center space-y-3">
          <div
            className="w-20 h-14 mx-auto rounded-lg bg-gradient-to-br from-hadouta-blush/60 via-hadouta-ochre/40 to-hadouta-teal/30 flex items-center justify-center text-2xl"
            aria-hidden="true"
          >
            👨‍👩‍👧‍👦
          </div>
          <h3 className="font-heading font-semibold">أضف شخصية للحدوتة</h3>
          <p className="text-sm text-foreground/65">
            أخ، أخت، صديق، تيتا، جدو، أو شخصية مهمة لطفلك. حتى ٢ شخصيات.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              setChars([
                {
                  name: "",
                  role: "sibling",
                  appearanceInputType: "description",
                  position: 1,
                },
              ])
            }
          >
            + أضف شخصية
          </Button>
        </div>

        <div className="flex justify-between pt-4 border-t border-border/30">
          <Button
            variant="ghost"
            className="text-hadouta-teal underline underline-offset-2"
            onClick={() => skipOrContinue(true)}
          >
            تخطي هذه الخطوة
          </Button>
          <Button variant="outline" onClick={() => router.push("/wizard/2")}>
            ← السابق
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-4">
      <header>
        <h2 className="font-heading text-2xl font-bold">العائلة في الحدوتة</h2>
      </header>

      {chars.map((char, idx) => (
        <CharacterForm
          key={idx}
          char={char}
          onChange={(c) =>
            setChars((prev) => prev.map((x, i) => (i === idx ? c : x)))
          }
          onRemove={() =>
            setChars((prev) =>
              prev
                .filter((_, i) => i !== idx)
                .map((c, i) => ({ ...c, position: (i + 1) as 1 | 2 })),
            )
          }
        />
      ))}

      {chars.length < 2 && (
        <button
          onClick={() =>
            setChars([
              ...chars,
              {
                name: "",
                role: "friend",
                appearanceInputType: "description",
                position: (chars.length + 1) as 1 | 2,
              },
            ])
          }
          className="w-full border-2 border-dashed border-border rounded-lg py-3 text-sm text-foreground/65 hover:bg-secondary/30 transition-colors"
        >
          + شخصية تانية (اختياري)
        </button>
      )}

      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button variant="outline" onClick={() => router.push("/wizard/2")}>
          ← السابق
        </Button>
        <Button onClick={() => skipOrContinue(false)}>التالي ←</Button>
      </div>
    </div>
  );
}
