"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useWizardStore } from "@/lib/wizard/store";
import { fetchOrder } from "@/lib/wizard/api";
import { buttonVariants } from "@/components/ui/button";

export function Step7() {
  const params = useSearchParams();
  const orderIdFromUrl = params?.get("orderId") ?? null;
  const store = useWizardStore();
  const orderId = orderIdFromUrl ?? store.orderId;
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId)
        .then(setOrder)
        .catch(() => setOrder(null));
    }
  }, [orderId]);

  useEffect(() => {
    // Track conversion event for funnel (Sentry/PostHog wired session 5)
    if (typeof window !== "undefined") {
      const ph = (window as unknown as { posthog?: { capture: (event: string, props?: Record<string, unknown>) => void } }).posthog;
      ph?.capture("order_confirmed", { orderId });
    }
  }, [orderId]);

  const childName =
    (order?.childName as string | undefined) ??
    store.childInfo.childName ??
    "طفلك";
  const buyerName =
    (order?.buyerName as string | undefined) ??
    store.childInfo.buyerName ??
    "";
  const phone =
    (order?.buyerPhone as string | undefined) ?? "";
  const orderShortId = orderId?.slice(0, 8) ?? "0042";

  return (
    <div dir="rtl" className="space-y-0">
      <div className="bg-gradient-to-b from-hadouta-blush/30 to-background py-12 text-center px-4 -mt-8 -mx-4 mb-0">
        <div
          className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-hadouta-blush via-hadouta-ochre to-hadouta-teal/40 flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          📖
        </div>
        <h2 className="font-display text-3xl font-bold leading-tight">
          حكاية {childName} بدأت
        </h2>
        {buyerName && (
          <p className="font-heading text-base mt-1">— شكراً يا {buyerName}</p>
        )}
        <p className="text-sm text-foreground/70 max-w-md mx-auto mt-4 leading-relaxed">
          بدأنا في إعداد حدوتة {childName}. خلال ٢-٣ أيام، فريقنا المصري
          بيراجعها وبيبعتلك رسالة على واتساب لما تكون جاهزة.
        </p>
      </div>

      <div className="bg-card rounded-lg border border-border/40 p-3 mt-4 space-y-1">
        <Row label="رقم الطلب">
          #HAD-{new Date().getFullYear()}-{orderShortId}
        </Row>
        <Row label="طول الكتاب">١٦ صفحة · رسومات مائية</Row>
        <Row label="جاهز خلال">٢-٣ أيام</Row>
        {phone && <Row label="الإشعار على">{phone} · واتساب</Row>}
      </div>

      <div className="bg-hadouta-teal/8 border border-hadouta-teal/20 rounded-md p-3 text-sm leading-relaxed mt-3">
        <strong className="text-hadouta-teal font-heading">
          كل حدوتة بنراجعها بعناية.
        </strong>{" "}
        لو الإصدار الأول مش بمستوى طفلك، بنحضّرها تاني — وقت إضافي حوالي ٢٤
        ساعة، شامل في السعر.
      </div>

      <div className="space-y-2 pt-4">
        <button
          type="button"
          className={buttonVariants({
            variant: "outline",
            className: "w-full",
          })}
          disabled
          title="Order tracking page lands Sprint 4+"
        >
          تتبع حالة الطلب
        </button>
        <Link
          href="/"
          className="block text-center text-sm text-hadouta-teal underline underline-offset-2 py-2 hover:text-hadouta-teal/80"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between text-sm py-1 border-b border-dashed border-border/30 last:border-0">
      <span className="text-foreground/55">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
}
