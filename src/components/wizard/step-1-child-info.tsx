"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/lib/wizard/store";
import { createDraftOrder, patchOrder } from "@/lib/wizard/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
  childName: z.string().min(1, "اسم الطفل مطلوب").max(80),
  childAgeBand: z.enum(["3-5", "5-7", "6-8"]),
  childAgeExact: z.number().int().min(3).max(8),
  childGender: z.enum(["boy", "girl"]),
  childHobbies: z.string().max(500).optional(),
  childFavoriteFood: z.string().max(120).optional(),
  childFavoriteColor: z.string().max(80).optional(),
  childSpecialTraits: z.string().max(500).optional(),
  buyerName: z.string().min(1, "اسمك مطلوب").max(120),
});

type FormData = z.infer<typeof schema>;

export function Step1() {
  const router = useRouter();
  const store = useWizardStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      childName: store.childInfo.childName,
      childAgeBand: store.childInfo.childAgeBand,
      childAgeExact: store.childInfo.childAgeExact,
      childGender: store.childInfo.childGender,
      childHobbies: store.childInfo.childHobbies,
      childFavoriteFood: store.childInfo.childFavoriteFood,
      childFavoriteColor: store.childInfo.childFavoriteColor,
      childSpecialTraits: store.childInfo.childSpecialTraits,
      buyerName: store.childInfo.buyerName,
    },
  });

  const ageBand = watch("childAgeBand");
  const gender = watch("childGender");

  const onSubmit = async (data: FormData) => {
    let orderId = store.orderId;
    if (!orderId) {
      orderId = await createDraftOrder(data.buyerName);
      store.setOrderId(orderId);
    }
    await patchOrder(orderId, data);
    store.updateChildInfo(data);
    store.setStep(2);
    router.push("/wizard/2");
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <header>
        <h2 className="font-heading text-2xl font-bold">
          أخبرنا عن بطل الحدوتة
        </h2>
        <p className="text-foreground/70 text-sm mt-1">
          كل حدوتة بتبدأ بطفل. عرّفنا عن طفلك ونحضّر له قصته.{" "}
          <span className="font-display text-primary">۞</span>
        </p>
      </header>

      <div className="space-y-2">
        <Label htmlFor="childName">اسم الطفل *</Label>
        <Input
          id="childName"
          placeholder="مثلاً: ليلى"
          {...register("childName")}
        />
        {errors.childName && (
          <p className="text-sm text-destructive">{errors.childName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>الفئة العمرية *</Label>
          <div className="grid grid-cols-3 gap-1">
            {(["3-5", "5-7", "6-8"] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setValue("childAgeBand", b, { shouldValidate: true })}
                className={cn(
                  "rounded-md py-2 text-xs font-heading border transition-colors",
                  ageBand === b
                    ? "bg-primary/15 border-primary font-semibold"
                    : "border-border hover:bg-secondary/40",
                )}
              >
                {b.replace("-", "–")}
              </button>
            ))}
          </div>
          {errors.childAgeBand && (
            <p className="text-sm text-destructive">
              {errors.childAgeBand.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="childAgeExact">العمر *</Label>
          <Input
            id="childAgeExact"
            type="number"
            min={3}
            max={8}
            {...register("childAgeExact", { valueAsNumber: true })}
          />
          {errors.childAgeExact && (
            <p className="text-sm text-destructive">
              {errors.childAgeExact.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>الجنس *</Label>
        <div className="grid grid-cols-2 gap-2">
          {(["girl", "boy"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setValue("childGender", g, { shouldValidate: true })}
              className={cn(
                "rounded-md py-3 font-heading border transition-colors",
                gender === g
                  ? "bg-primary/15 border-primary font-semibold"
                  : "border-border hover:bg-secondary/40",
              )}
            >
              {g === "girl" ? "👧 بنت" : "👦 ولد"}
            </button>
          ))}
        </div>
        {errors.childGender && (
          <p className="text-sm text-destructive">{errors.childGender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="childHobbies">
          هوايات طفلك{" "}
          <span className="text-foreground/50 text-xs">(اختياري)</span>
        </Label>
        <Input
          id="childHobbies"
          placeholder="الرسم، الموسيقى، اللعب في الحديقة..."
          {...register("childHobbies")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="childFavoriteFood">
            أكلة مفضلة{" "}
            <span className="text-foreground/50 text-xs">(اختياري)</span>
          </Label>
          <Input
            id="childFavoriteFood"
            placeholder="الكنافة..."
            {...register("childFavoriteFood")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="childFavoriteColor">
            لون مفضل{" "}
            <span className="text-foreground/50 text-xs">(اختياري)</span>
          </Label>
          <Input
            id="childFavoriteColor"
            placeholder="الأزرق..."
            {...register("childFavoriteColor")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="childSpecialTraits">
          حاجة مميزة عن طفلك{" "}
          <span className="text-foreground/50 text-xs">(اختياري)</span>
        </Label>
        <textarea
          id="childSpecialTraits"
          className="w-full rounded-md border border-border bg-background p-2 text-sm"
          rows={3}
          placeholder="ضحكتها مميزة، شجاعة، تحب الحيوانات..."
          {...register("childSpecialTraits")}
        />
      </div>

      <div className="rounded-md bg-hadouta-teal/8 border-t border-hadouta-teal/20 p-4 space-y-2">
        <Label htmlFor="buyerName">اسمك (ولي الأمر) *</Label>
        <Input
          id="buyerName"
          placeholder="مثلاً: أحمد محمد"
          {...register("buyerName")}
        />
        {errors.buyerName && (
          <p className="text-sm text-destructive">{errors.buyerName.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4 border-t border-border/30">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
        >
          ← الرئيسية
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "التالي ←"}
        </Button>
      </div>
    </form>
  );
}
