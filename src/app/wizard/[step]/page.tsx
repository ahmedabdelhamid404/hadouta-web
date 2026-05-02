"use client";
import { useParams } from "next/navigation";
import { Step1 } from "@/components/wizard/step-1-child-info";
import { Step2 } from "@/components/wizard/step-2-appearance";
import { Step3 } from "@/components/wizard/step-3-supporting";
import { Step4 } from "@/components/wizard/step-4-story";
import { Step5 } from "@/components/wizard/step-5-review";
import { Step6 } from "@/components/wizard/step-6-checkout";
import { Step7 } from "@/components/wizard/step-7-confirmation";

export default function WizardStepPage() {
  const params = useParams<{ step: string }>();
  switch (params?.step) {
    case "1":
      return <Step1 />;
    case "2":
      return <Step2 />;
    case "3":
      return <Step3 />;
    case "4":
      return <Step4 />;
    case "5":
      return <Step5 />;
    case "6":
      return <Step6 />;
    case "7":
      return <Step7 />;
    default:
      return (
        <div className="text-center py-12 text-foreground/65" dir="rtl">
          الخطوة غير موجودة.
        </div>
      );
  }
}
