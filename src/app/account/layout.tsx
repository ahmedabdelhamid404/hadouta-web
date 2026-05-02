export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border/40 bg-card">
        <div className="container mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold">
            حدوتة
          </a>
          <a
            href="/wizard/1"
            className="text-sm text-foreground/60 hover:text-hadouta-teal"
          >
            اطلب حدوتة جديدة
          </a>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  );
}
