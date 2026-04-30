import { WaitlistForm } from "@/components/landing/waitlist-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12 md:py-20">
      {/* Hero */}
      <section className="w-full max-w-3xl text-center mb-16">
        <p className="text-sm font-medium text-muted-foreground mb-4">
          🌟 الإصدار الأول قريباً — سبتمبر ٢٠٢٦
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          حدوتة طفلك… <br />
          <span className="text-primary">وهو البطل</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          كتاب أطفال شخصي مصنوع بالذكاء الاصطناعي خصيصاً لطفلك.
          ارفعي صورته، اختاري الموضوع، وفي دقائق هتلاقي كتاب فاخر هو بطله.
        </p>
      </section>

      {/* Waitlist signup */}
      <section className="w-full max-w-md mb-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">
              انضمي لقائمة الانتظار
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WaitlistForm />
          </CardContent>
        </Card>
      </section>

      {/* How it works */}
      <section className="w-full max-w-4xl mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          كيف بنعمل الحدوتة؟
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "١",
              title: "خصّصي البطل",
              desc:
                "اكتبي اسم طفلك، عمره، ارفعي صور حلوة ليه. تقدري كمان تضيفي الأم أو الأب أو إخواته.",
            },
            {
              step: "٢",
              title: "اختاري الموضوع",
              desc:
                "نبدأ بقصة \"أول يوم مدرسة\". مواضيع تانية زي الأعياد والعيد جايّة قريب.",
            },
            {
              step: "٣",
              title: "استلمي الكتاب",
              desc:
                "في دقائق، بنبعتلك الكتاب الرقمي على واتساب وإيميل. النسخة الفاخرة المطبوعة هتبقى متاحة بعد كده.",
            },
          ].map(({ step, title, desc }) => (
            <Card key={step}>
              <CardHeader>
                <div className="text-3xl font-extrabold text-primary mb-2">
                  {step}
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          أسئلة شائعة
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "إمتى الإطلاق الرسمي؟",
              a: "نخطط للإطلاق مع بداية العام الدراسي ٢٠٢٦/٢٠٢٧ في سبتمبر. اللي في قائمة الانتظار هيكونوا أول الناس اللي يجربوا.",
            },
            {
              q: "هل أحتاج أرفع صور لطفلي؟",
              a: "نعم، الصور هي اللي بتخلي شخصية الكتاب شبه طفلك. بنحذف الصور من سيرفراتنا تلقائياً بعد ٣٠ يوم من إنشاء الكتاب.",
            },
            {
              q: "بكام الكتاب؟",
              a: "السعر النهائي هنحدده بعد المرحلة التجريبية. التوقع المبدئي: ٢٥٠–٣٠٠ جنيه للنسخة الرقمية، مع إمكانية الترقية للنسخة المطبوعة بسعر إضافي.",
            },
            {
              q: "هل القصة بالعربية الفصحى ولا العامية؟",
              a: "السرد بالفصحى، والحوارات العائلية بالعامية المصرية — أحلى مزيج للأذن المصرية.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b pb-4 last:border-0">
              <h3 className="font-semibold text-lg mb-2">{q}</h3>
              <p className="text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-3xl pt-8 border-t text-center text-sm text-muted-foreground">
        <p>© ٢٠٢٦ حدوتة. جميع الحقوق محفوظة.</p>
        <div className="mt-2 space-x-4 space-x-reverse">
          <a href="/privacy" className="hover:underline">
            سياسة الخصوصية
          </a>
          <a href="/terms" className="hover:underline">
            الشروط والأحكام
          </a>
        </div>
      </footer>
    </main>
  );
}
