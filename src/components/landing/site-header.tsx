import Link from "next/link";

/**
 * Top navigation bar — Aref Ruqaa logotype + 2 nav links.
 * Per brand brief: Aref Ruqaa appears max once per page → use it for the logo only.
 */
export function SiteHeader() {
  return (
    <header className="bg-background border-b border-border/40 sticky top-0 z-10 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link
          href="/"
          className="font-display text-2xl text-primary leading-none"
          aria-label="حدوتة — الصفحة الرئيسية"
        >
          حدوتة
        </Link>
        <nav className="flex gap-5 text-sm" aria-label="القائمة الرئيسية">
          <Link
            href="#sample"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            شوف نموذج
          </Link>
          <Link
            href="/wizard"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            ابدأ
          </Link>
        </nav>
      </div>
    </header>
  );
}
