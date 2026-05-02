"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchOrderStatus, type PublicOrderStatus } from "@/lib/account/api";
import { buttonVariants } from "@/components/ui/button";

const STATUS_LABELS: Record<string, { title: string; sub: string }> = {
  pending_payment: {
    title: "في انتظار الدفع",
    sub: "ارجع للوجارد لتكميل الدفع",
  },
  paid: {
    title: "استلمنا الطلب",
    sub: "بنبدأ نحضر الحدوتة دلوقتي…",
  },
  queued: {
    title: "بنبدأ التحضير",
    sub: "هياخد ٢-٥ دقايق",
  },
  generating_story: {
    title: "بنكتب الحدوتة",
    sub: "كاتبنا الذكي بيشتغل…",
  },
  story_done: {
    title: "الحدوتة جاهزة",
    sub: "بنبدأ نرسم دلوقتي",
  },
  generating_illustrations: {
    title: "بنرسم الصور",
    sub: "١٧ صورة بألوان مائية",
  },
  illustrations_done: {
    title: "الرسومات خلصت",
    sub: "بنخلي فريقنا يراجعها",
  },
  awaiting_review: {
    title: "في مرحلة المراجعة",
    sub: "فريقنا المصري بيراجع الحدوتة. عادة بياخد دقايق.",
  },
  approved: {
    title: "اتمت الموافقة",
    sub: "بنجهز الكتاب النهائي…",
  },
  assembling_pdf: {
    title: "بنجهز الكتاب",
    sub: "بنحط الصور والكلام مع بعض",
  },
  delivered: {
    title: "حدوتتك وصلت!",
    sub: "حملها من الزر تحت — بصيغة PDF",
  },
  rejected: {
    title: "بنعمل النسخة تاني",
    sub: "الإصدار الأول مكنش بمستواكم — بنحضّر تاني، شامل في السعر.",
  },
  failed: {
    title: "في مشكلة بسيطة",
    sub: "فريقنا بيتعامل معاها — هنبعتلك تحديث.",
  },
};

export default function OrderDetail({ orderId }: { orderId: string }) {
  const [data, setData] = useState<PublicOrderStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      setData(await fetchOrderStatus(orderId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, [orderId]);

  // Poll while not in terminal state — picks up status changes from the
  // generation pipeline without requiring page refresh.
  useEffect(() => {
    if (!data) return;
    const status = data.generationStatus ?? data.orderStatus;
    const terminal = ["delivered", "failed", "rejected"].includes(status);
    if (terminal) return;
    const t = setInterval(() => void load(), 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.generationStatus, data?.orderStatus]);

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4 text-destructive">
        {error}
      </div>
    );
  }
  if (!data) {
    return <div className="text-foreground/60">بحمّل...</div>;
  }

  const status = data.generationStatus ?? data.orderStatus;
  const meta = STATUS_LABELS[status] ?? {
    title: status,
    sub: "",
  };

  return (
    <div className="space-y-6">
      <Link
        href="/account"
        className="inline-block text-sm text-foreground/55 hover:text-foreground"
      >
        → كل حدوتاتي
      </Link>

      <div className="bg-gradient-to-b from-hadouta-blush/30 to-card rounded-lg border border-border/40 p-6 text-center">
        {data.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.coverUrl}
            alt=""
            className="w-40 h-40 mx-auto mb-4 rounded-lg object-cover shadow-sm"
          />
        ) : (
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-hadouta-blush via-hadouta-ochre to-hadouta-teal/40 flex items-center justify-center text-3xl">
            📖
          </div>
        )}
        <h1 className="font-display text-2xl font-bold">{meta.title}</h1>
        <p className="text-sm text-foreground/65 mt-2">{meta.sub}</p>
      </div>

      <div className="bg-card rounded-lg border border-border/40 p-4 space-y-2 text-sm">
        <Row label="رقم الطلب">
          #HAD-{new Date(data.createdAt).getFullYear()}-{orderId.slice(0, 8)}
        </Row>
        {data.childName && <Row label="الطفل">{data.childName}</Row>}
        {data.themeTitleAr && <Row label="الموضوع">{data.themeTitleAr}</Row>}
        {data.moralNameAr && <Row label="القيمة">{data.moralNameAr}</Row>}
        <Row label="تاريخ الطلب">
          {new Date(data.createdAt).toLocaleDateString("ar-EG")}
        </Row>
      </div>

      {data.pdfUrl && (
        <a
          href={data.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg", className: "w-full" })}
        >
          📥 حمّل الكتاب (PDF)
        </a>
      )}

      {!data.pdfUrl && status !== "delivered" && status !== "failed" && (
        <div className="text-center text-sm text-foreground/55">
          الصفحة بتتحدث تلقائياً كل ٥ ثواني
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-dashed border-border/30 last:border-0">
      <span className="text-foreground/55">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
}
