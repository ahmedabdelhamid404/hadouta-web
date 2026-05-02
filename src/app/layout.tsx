import type { Metadata } from "next";
import { Tajawal, El_Messiri, Aref_Ruqaa, Fraunces } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { PostHogPageview } from "@/components/providers/PostHogPageview";

// Body & UI — universal-modern Arabic, geometric, readable at every size.
// Already wired in session 2; kept as the foundation.
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

// General headers — Egyptian-designed humanist Arabic.
// Per brand brief: "El Messiri carries Egyptian visual heritage in the type itself."
const elMessiri = El_Messiri({
  variable: "--font-el-messiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Decorative / kid-magic / Hadouta logotype — calligraphic Arabic Ruqaa.
// RULE (brand brief): appears no more than once per page, at kid-magic
// moments or branded titles. Used too much, it becomes performatively-traditional.
const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

// Latin companion — modern serif with playful personality, warm-old-book feel.
// For secondary English text where it appears (small print, bilingual labels,
// occasional English-language UI for diaspora/expat users).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "حدوتة | كتاب أطفال شخصي بالذكاء الاصطناعي",
  description:
    "كتاب أطفال شخصي مصنوع بالذكاء الاصطناعي خصيصاً لطفلك. هو/هي بطل القصة. الإصدار الأول قريباً.",
  openGraph: {
    title: "حدوتة | كتاب أطفال شخصي",
    description: "كتاب أول يوم مدرسة لطفلك… وهو بطل القصة",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${elMessiri.variable} ${arefRuqaa.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <PostHogProvider>
          <PostHogPageview />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
