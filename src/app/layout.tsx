import type { Metadata } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { PostHogPageview } from "@/components/providers/PostHogPageview";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${tajawal.variable} ${inter.variable} h-full antialiased`}
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
