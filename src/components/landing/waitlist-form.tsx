"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? "") || undefined,
          name: String(formData.get("name") ?? "") || undefined,
          source:
            new URLSearchParams(globalThis.location?.search).get("utm_source") ??
            "landing",
        }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "تم تسجيلك! هنبعتلك إشعار قريب.");
      } else {
        setStatus("error");
        setMessage(data.error ?? "حصل خطأ. حاولي مرة أخرى.");
      }
    } catch {
      setStatus("error");
      setMessage("الاتصال فشل. تحققي من الإنترنت وحاولي مرة أخرى.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-3">
        <div className="text-3xl">🌸</div>
        <p className="font-semibold">{message}</p>
        <p className="text-sm text-muted-foreground">
          تابعينا على إنستجرام @hadouta لمتابعة آخر التحديثات
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="mb-1.5 block">
          الاسم (اختياري)
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="منار"
          autoComplete="name"
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-1.5 block">
          البريد الإلكتروني
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="manar@example.com"
          autoComplete="email"
          dir="ltr"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="mb-1.5 block">
          رقم الموبايل (اختياري — للتنبيه على واتساب)
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+20 100 123 4567"
          autoComplete="tel"
          dir="ltr"
        />
      </div>

      {status === "error" && message && (
        <p className="text-sm text-destructive">{message}</p>
      )}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "جاري التسجيل…" : "احجزي مكانك"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        ما بنبعتش إيميلات تسويقية. هنبعتلك إشعار واحد بس عند الإطلاق.
      </p>
    </form>
  );
}
