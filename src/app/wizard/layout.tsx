import { WizardStepper } from "@/components/wizard/stepper";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <WizardStepper />
      <main className="container mx-auto max-w-2xl px-4 py-8">{children}</main>
    </div>
  );
}
