"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage("");

    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "") || undefined;
    const name = String(formData.get("name") ?? "") || undefined;
    const source =
      new URLSearchParams(globalThis.location?.search).get("utm_source") ??
      "landing";

    const { data, error, response } = await apiClient.POST("/waitlist", {
      body: { email, phone, name, source },
    });

    if (response.ok && data?.ok) {
      setStatus("success");
      setMessage(data.message ?? "تم تسجيلك! هنبعتلك إشعار قريب.");
      return;
    }

    setStatus("error");
    if (error && typeof error === "object" && "error" in error) {
      const errObj = (error as { error?: { issues?: Array<{ message?: string }> } }).error;
      const firstIssue = errObj?.issues?.[0]?.message;
      setMessage(firstIssue ?? "حصل خطأ. حاولي مرة أخرى.");
    } else {
      setMessage("حصل خطأ. حاولي مرة أخرى.");
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
