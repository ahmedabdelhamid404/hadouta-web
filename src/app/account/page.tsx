"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  fetchOrdersByPhone,
  type PublicOrderRow,
} from "@/lib/account/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STATUS_AR: Record<string, string> = {
  queued: "في الانتظار",
  generating_story: "بنحضّر الحدوتة",
  story_done: "الحدوتة جاهزة",
  generating_illustrations: "بنرسم الصور",
  illustrations_done: "الرسومات جاهزة",
  awaiting_review: "في مرحلة المراجعة",
  approved: "تمت الموافقة",
  assembling_pdf: "بنجهز الكتاب",
  delivered: "وصلت!",
  rejected: "بنعملها تاني",
  failed: "في مشكلة — هنتواصل معاك",
};

const STATUS_BADGE: Record<string, string> = {
  delivered: "bg-hadouta-teal/15 text-hadouta-teal",
  failed: "bg-destructive/10 text-destructive",
  rejected: "bg-hadouta-ochre/15 text-hadouta-ochre",
  awaiting_review: "bg-hadouta-ochre/15 text-hadouta-ochre",
};

function AccountInner() {
  const params = useSearchParams();
  const initialPhone = params?.get("phone") ?? "";
  const [phone, setPhone] = useState(initialPhone);
  const [orders, setOrders] = useState<PublicOrderRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(p: string) {
    setError(null);
    setLoading(true);
    try {
      const list = await fetchOrdersByPhone(p);
      setOrders(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  // Auto-load if phone in URL.
  useEffect(() => {
    if (initialPhone) {
      void load(initialPhone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPhone]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    void load(phone.trim());
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">حسابك</h1>
        <p className="text-sm text-foreground/65 mt-1">
          ادخل رقم موبايلك عشان تشوف الحدوتات اللي طلبتها
        </p>
      </header>

      <form onSubmit={onSubmit} className="bg-card rounded-lg border border-border p-4 space-y-3">
        <label htmlFor="phone" className="block text-sm font-medium">
          رقم الموبايل
        </label>
        <div className="flex gap-2" dir="ltr">
          <span className="bg-card border border-border rounded-md px-3 py-2 text-sm whitespace-nowrap">
            🇪🇬 +20
          </span>
          <Input
            id="phone"
            dir="ltr"
            className="text-right"
            placeholder="100 1234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading || !phone.trim()}>
          {loading ? "بحمّل..." : "اعرض حدوتاتي"}
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>

      {orders && (
        <div className="space-y-3">
          <h2 className="font-heading text-xl font-bold">
            {orders.length === 0
              ? "ما لقيناش حدوتات على الرقم ده"
              : `${orders.length} حدوتة`}
          </h2>
          {orders.map((o) => (
            <OrderCard key={o.orderId} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: PublicOrderRow }) {
  const status = order.generationStatus ?? order.orderStatus;
  const label = STATUS_AR[status] ?? status;
  const badgeClass = STATUS_BADGE[status] ?? "bg-card text-foreground/65";
  const created = new Date(order.createdAt).toLocaleDateString("ar-EG");

  return (
    <Link
      href={`/account/orders/${order.orderId}`}
      className="block bg-card rounded-lg border border-border p-4 hover:border-hadouta-teal/40 transition-colors"
    >
      <div className="flex items-start gap-4">
        {order.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={order.coverUrl}
            alt=""
            className="w-20 h-20 rounded object-cover bg-card border border-border/40"
          />
        ) : (
          <div className="w-20 h-20 rounded bg-hadouta-blush/30 flex items-center justify-center text-2xl">
            📖
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold text-base">
                حدوتة {order.childName ?? "—"}
              </h3>
              <p className="text-xs text-foreground/55">
                {order.themeTitleAr ?? ""} · {created}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded font-semibold whitespace-nowrap ${badgeClass}`}
            >
              {label}
            </span>
          </div>
          {order.pdfUrl && (
            <div className="mt-2 text-xs text-hadouta-teal font-semibold">
              📥 جاهزة للتحميل
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="text-foreground/60">بحمّل...</div>}>
      <AccountInner />
    </Suspense>
  );
}
