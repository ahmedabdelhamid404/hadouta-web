import Link from "next/link";

/**
 * Site footer — minimal pattern.
 * Per brand brief: Aref Ruqaa max once per page; logo here uses Tajawal-bold
 * because the hero uses Aref Ruqaa for the wordmark.
 */
export function SiteFooter() {
  return (
    <footer className="bg-secondary/40 border-t border-border/30 py-8 md:py-10">
      <div className="container mx-auto px-4" dir="rtl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
          <div>
            <span className="font-heading font-bold text-2xl text-primary">
              حدوتة
            </span>
            <p className="text-sm text-foreground/60 mt-1">
              — كتب أطفال مصرية مخصصة
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2 justify-center text-sm text-foreground/60"
            aria-label="روابط الفوتر"
          >
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              شروط الاستخدام
            </Link>
            <Link
              href="/contact"
              className="hover:text-foreground transition-colors"
            >
              تواصل معنا
            </Link>
          </nav>
        </div>
        <p className="text-xs text-foreground/45 text-center mt-6">
          © ٢٠٢٦ حدوتة. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
