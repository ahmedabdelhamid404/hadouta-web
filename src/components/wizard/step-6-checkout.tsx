"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/lib/wizard/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Phase = "enter-phone" | "enter-otp" | "verified" | "paying";

export function Step6() {
  const router = useRouter();
  const store = useWizardStore();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [phase, setPhase] = useState<Phase>("enter-phone");
  const [resendIn, setResendIn] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fullPhone = () => `+20${phone.replace(/^0/, "").replace(/\s/g, "")}`;

  const sendOtp = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/phone-number/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: fullPhone() }),
      });
      if (!res.ok) {
        setError("فشل إرسال الرمز. تأكد من الرقم.");
        return;
      }
      setPhase("enter-otp");
      let countdown = 60;
      setResendIn(countdown);
      const t = setInterval(() => {
        countdown--;
        setResendIn(countdown);
        if (countdown <= 0) clearInterval(t);
      }, 1000);
    } catch {
      setError("فشل الاتصال بالسيرفر.");
    }
  };

  const verifyOtp = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/auth/phone-number/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: fullPhone(), code: otp }),
      });
      if (!res.ok) {
        setError("الرمز غلط أو انتهت صلاحيته.");
        return;
      }
      setPhase("verified");
    } catch {
      setError("فشل التحقق من الرمز.");
    }
  };

  const pay = async () => {
    if (!store.orderId) return;
    setPhase("paying");
    try {
      const res = await fetch(`${API_URL}/api/payments/intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: store.orderId }),
      });
      if (!res.ok) {
        setError(
          "Paymob integration not configured yet. Provide credentials and re-deploy. " +
            "(Phase 5 Task 1.10 deferred — see implementation plan.)",
        );
        setPhase("verified");
        return;
      }
      const data = (await res.json()) as { iframeUrl: string };
      window.location.href = data.iframeUrl;
    } catch {
      setError("فشل الاتصال ببوابة الدفع.");
      setPhase("verified");
    }
  };

  return (
    <div dir="rtl" className="space-y-4">
      <header>
        <h2 className="font-heading text-2xl font-bold">تأكيد + الدفع</h2>
        <p className="text-foreground/70 text-sm mt-1">
          محتاجين رقم موبايل لما الكتاب يجهز نبعتلك إشعار على واتساب. مش هتسجل
          أو تحفظ كلمة سر.
        </p>
      </header>

      <div className="bg-card rounded-lg border border-border p-4 space-y-3">
        <h4 className="font-heading font-bold text-sm">رقم موبايلك</h4>
        <p className="text-xs text-foreground/55">
          مصري — هنبعت رمز التأكيد على واتساب أول
        </p>
        <div className="flex gap-2">
          <span className="bg-card border border-border rounded-md px-3 py-2 text-sm whitespace-nowrap">
            🇪🇬 +20
          </span>
          <Input
            dir="ltr"
            className="text-right"
            placeholder="100 1234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={phase !== "enter-phone"}
          />
        </div>

        {phase === "enter-phone" && (
          <Button
            onClick={() => void sendOtp()}
            className="w-full"
            disabled={phone.length < 9}
          >
            أرسل رمز التأكيد
          </Button>
        )}

        {(phase === "enter-otp" || phase === "verified" || phase === "paying") && (
          <>
            {phase === "verified" && (
              <p className="text-xs text-hadouta-teal bg-hadouta-teal/10 inline-block px-2 py-0.5 rounded">
                ✓ تم التأكيد
              </p>
            )}
            <p className="text-xs text-foreground/65">
              الرمز اللي وصلك على واتساب:
            </p>
            <div className="grid grid-cols-6 gap-1" dir="ltr">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  maxLength={1}
                  inputMode="numeric"
                  value={otp[i] ?? ""}
                  onChange={(e) => {
                    const next = otp.split("");
                    next[i] = e.target.value.replace(/\D/g, "");
                    setOtp(next.join("").slice(0, 6));
                    if (e.target.value && i < 5) {
                      const sib = e.target.nextElementSibling;
                      if (sib instanceof HTMLInputElement) sib.focus();
                    }
                  }}
                  className="rounded border-2 border-border py-2 text-center text-base font-bold disabled:opacity-50"
                  disabled={phase !== "enter-otp"}
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            {phase === "enter-otp" && (
              <div className="flex justify-between text-xs text-foreground/65 pt-2">
                <span>
                  {resendIn > 0 ? (
                    `إعادة الإرسال متاحة في 0:${String(resendIn).padStart(2, "0")}`
                  ) : (
                    <button
                      onClick={() => void sendOtp()}
                      className="text-hadouta-teal underline underline-offset-2"
                    >
                      إعادة الإرسال
                    </button>
                  )}
                </span>
                <button
                  onClick={() => {
                    setPhase("enter-phone");
                    setOtp("");
                  }}
                  className="text-hadouta-teal underline underline-offset-2"
                >
                  تغيير الرقم
                </button>
              </div>
            )}

            {phase === "enter-otp" && otp.length === 6 && (
              <Button onClick={() => void verifyOtp()} className="w-full">
                تأكيد الرمز
              </Button>
            )}
          </>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="bg-gradient-to-b from-hadouta-ochre/15 to-card rounded-lg border border-hadouta-ochre/30 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>حدوتة {store.childInfo.childName ?? "طفلك"}</span>
          <span>٢٥٠ ج.م</span>
        </div>
        <div className="flex justify-between font-heading font-bold text-base pt-2 border-t border-dashed border-border/40">
          <span>المجموع</span>
          <span>٢٥٠ ج.م</span>
        </div>
        <p className="text-center text-xs text-foreground/55 pt-1">
          الدفع آمن عبر Paymob
          <br />
          💳 📱 🏦
          <br />
          <span className="text-[10px]">
            كارت فيزا/ماستركارد · فودافون كاش · إنستاباي
          </span>
        </p>
      </div>

      <Button
        onClick={() => void pay()}
        disabled={phase !== "verified"}
        className="w-full"
        size="lg"
      >
        ابدأ حدوتة {store.childInfo.childName ?? "طفلك"} — ادفع ٢٥٠ ج.م
        <span className="block text-xs opacity-85 mt-1 font-normal">
          هتتحول للدفع الآمن عبر Paymob
        </span>
      </Button>

      <div className="flex justify-end pt-2">
        <Button variant="outline" onClick={() => router.push("/wizard/5")}>
          ← مراجعة
        </Button>
      </div>
    </div>
  );
}
