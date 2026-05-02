"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/lib/wizard/store";
import {
  patchOrder,
  fetchThemes,
  fetchMoralValues,
  type Theme,
  type MoralValue,
} from "@/lib/wizard/api";
import { Button } from "@/components/ui/button";

const ROLE_LABELS: Record<string, string> = {
  sibling: "أخ/أخت",
  friend: "صديق",
  grandparent: "تيتا/جدو",
  parent: "أب/أم",
  pet: "حيوان أليف",
  other: "آخر",
};

export function Step5() {
  const router = useRouter();
  const store = useWizardStore();
  const { childInfo, appearance, supportingCharacters, storyDetails, dedicationText, orderId } = store;

  const [themes, setThemes] = useState<Theme[]>([]);
  const [morals, setMorals] = useState<MoralValue[]>([]);

  useEffect(() => {
    Promise.all([fetchThemes(), fetchMoralValues()])
      .then(([t, m]) => {
        setThemes(t);
        setMorals(m);
      })
      .catch(() => {
        /* fallthrough — review still renders without name lookup */
      });
  }, []);

  const themeName =
    themes.find((t) => t.id === storyDetails.themeId)?.titleAr ?? "—";
  const moralName =
    morals.find((m) => m.id === storyDetails.moralValueId)?.nameAr ?? "—";

  const editJump = (step: number) => {
    store.setStep(step);
    router.push(`/wizard/${step}`);
  };

  const proceedToCheckout = async () => {
    if (!orderId) return;
    await patchOrder(orderId, {
      dedicationText,
      status: "pending_payment",
      priceCents: 25000,
    });
    store.setStep(6);
    router.push("/wizard/6");
  };

  return (
    <div dir="rtl" className="space-y-4">
      <header>
        <h2 className="font-heading text-2xl font-bold">
          حكاية {childInfo.childName ?? "طفلك"} جاهزة تبدأ
        </h2>
        <p className="text-foreground/70 text-sm mt-1">
          راجع التفاصيل قبل ما نبدأ. تقدر تعدل أي قسم بضغطة واحدة.
        </p>
      </header>

      <SummaryCard icon="👧" title="الطفل" onEdit={() => editJump(1)}>
        <Row label="الاسم">{childInfo.childName ?? "—"}</Row>
        <Row label="العمر">
          {childInfo.childAgeExact} سنوات (الفئة {childInfo.childAgeBand})
        </Row>
        <Row label="الجنس">
          {childInfo.childGender === "girl" ? "بنت" : "ولد"}
        </Row>
        {childInfo.childHobbies && (
          <Row label="هوايات">{childInfo.childHobbies}</Row>
        )}
        {childInfo.childSpecialTraits && (
          <Row label="حاجة مميزة">{childInfo.childSpecialTraits}</Row>
        )}
      </SummaryCard>

      <SummaryCard icon="📷" title="الصورة" onEdit={() => editJump(2)}>
        <Row label="الطريقة">
          {appearance.appearanceInputType === "photo"
            ? `صور (${appearance.photoIds?.length ?? 0} مرفوعة)`
            : appearance.appearanceInputType === "description"
              ? "وصف يدوي"
              : "—"}
        </Row>
      </SummaryCard>

      <SummaryCard icon="👨‍👩‍👧" title="العائلة" onEdit={() => editJump(3)}>
        {supportingCharacters.length === 0 ? (
          <p className="italic text-foreground/55 text-sm">
            مفيش شخصيات إضافية — الحدوتة عن {childInfo.childName ?? "طفلك"}
          </p>
        ) : (
          supportingCharacters.map((c, i) => (
            <Row key={i} label={`شخصية ${c.position}`}>
              {c.name} ({ROLE_LABELS[c.role] ?? c.role})
            </Row>
          ))
        )}
      </SummaryCard>

      <SummaryCard icon="📖" title="الحدوتة" onEdit={() => editJump(4)}>
        <Row label="الموضوع">
          <span className="font-semibold">{themeName}</span>
        </Row>
        <Row label="القيمة">
          <span className="font-semibold">{moralName}</span>
        </Row>
        {storyDetails.customSceneText && (
          <Row label="مشهد خاص">{storyDetails.customSceneText}</Row>
        )}
        {storyDetails.specialOccasionText && (
          <Row label="المناسبة">{storyDetails.specialOccasionText}</Row>
        )}
      </SummaryCard>

      <div className="bg-gradient-to-b from-hadouta-blush/15 to-card rounded-xl border border-hadouta-blush/40 p-4">
        <div className="text-xl mb-1" aria-hidden="true">
          ✉
        </div>
        <h3 className="font-heading font-bold mb-1">إهداء (اختياري)</h3>
        <p className="text-sm text-foreground/65 mb-2">
          جملة قصيرة هتظهر في أول صفحة من الكتاب — لمسة عائلية.
        </p>
        <textarea
          className="w-full rounded-md border border-border bg-background p-2 text-sm"
          rows={2}
          maxLength={280}
          placeholder='مثال: "إلى ليلى، شجاعتك أحلى من كل حدوتة — من بابا، أحمد"'
          value={dedicationText ?? ""}
          onChange={(e) => store.setDedication(e.target.value)}
        />
      </div>

      <div className="bg-hadouta-teal/8 border-t border-hadouta-teal/20 px-4 py-4 rounded-md">
        <p className="text-center text-xs text-foreground/65 mb-2">
          <strong className="text-hadouta-teal font-heading">
            فريقنا المصري بيراجع كل كتاب قبل التسليم
          </strong>{" "}
          — حدوتتك جاهزة في ٢-٣ أيام
        </p>
        <Button
          onClick={proceedToCheckout}
          className="w-full"
          size="lg"
        >
          ابدأ حدوتة {childInfo.childName ?? "طفلك"} — ٢٥٠ ج.م
          <span className="block text-xs opacity-85 mt-1 font-normal">
            الخطوة التالية: تأكيد رقم الموبايل + الدفع
          </span>
        </Button>
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="outline" onClick={() => router.push("/wizard/4")}>
          ← السابق
        </Button>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  onEdit,
  children,
}: {
  icon: string;
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <div className="bg-card rounded-lg border border-border/40 p-3">
      <div className="flex items-center gap-2 pb-2 mb-2 border-b border-dashed border-border/40">
        <span aria-hidden="true">{icon}</span>
        <h4 className="font-heading font-bold text-sm">{title}</h4>
        <button
          onClick={onEdit}
          className="ml-auto text-xs text-hadouta-teal underline underline-offset-2 hover:text-hadouta-teal/80"
        >
          تعديل
        </button>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex text-xs">
      <span className="text-foreground/55 min-w-[80px]">{label}:</span>
      <span className="text-foreground flex-1">{children}</span>
    </div>
  );
}
