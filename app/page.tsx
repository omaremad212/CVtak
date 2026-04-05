import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { SignUpButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2MmgydjRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDJ2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NGgwdjJoMnY0aDJWNjZoNHYtMkg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            مدعوم بأحدث تقنيات الذكاء الاصطناعي
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            أنشئ سيرتك الذاتية
            <br />
            <span className="text-blue-600">بالذكاء الاصطناعي</span>
            <br />
            في دقيقتين فقط
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            وظيفني يساعدك على كتابة سيرة ذاتية احترافية بالعربية مناسبة لسوق العمل المصري،
            بضغطة زر واحدة باستخدام أحدث تقنيات الذكاء الاصطناعي.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 hover:shadow-blue-300 transition-all duration-200 hover:-translate-y-0.5">
                أنشئ سيرتك الذاتية مجاناً الآن ←
              </button>
            </SignUpButton>
            <Link
              href="#features"
              className="text-slate-600 hover:text-blue-600 text-base font-medium px-6 py-4 rounded-2xl hover:bg-blue-50 transition-colors"
            >
              تعرف على المميزات
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            لا يلزم بطاقة ائتمان · إنشاء سيرة ذاتية مجانية واحدة
          </p>
        </div>

        {/* Hero Preview Card */}
        <div className="relative max-w-4xl mx-auto mt-16 px-4">
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-lg">أحمد محمد السيد</p>
                  <p className="text-blue-200 text-sm">مهندس برمجيات أول</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-blue-200">
                <span>📍 القاهرة</span>
                <span>📧 ahmed@email.com</span>
                <span>📱 01X-XXXX-XXXX</span>
              </div>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 text-sm">
              <div className="col-span-2 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-700 border-b border-blue-100 pb-1 mb-2">الملخص المهني</h3>
                  <div className="space-y-1">
                    <div className="h-2.5 bg-slate-100 rounded-full w-full" />
                    <div className="h-2.5 bg-slate-100 rounded-full w-4/5" />
                    <div className="h-2.5 bg-slate-100 rounded-full w-5/6" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 border-b border-blue-100 pb-1 mb-2">الخبرات العملية</h3>
                  <div className="space-y-1">
                    <div className="h-2.5 bg-slate-100 rounded-full w-full" />
                    <div className="h-2.5 bg-slate-100 rounded-full w-3/4" />
                    <div className="h-2.5 bg-slate-100 rounded-full w-5/6" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-700 border-b border-blue-100 pb-1 mb-2">المهارات</h3>
                  <div className="space-y-1.5">
                    {['React.js', 'Node.js', 'Python', 'SQL'].map(s => (
                      <div key={s} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -top-4 -left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            ✓ تم التوليد في 8 ثوانٍ
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              لماذا وظيفني؟
            </h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              ثلاثة أسباب تجعلنا الخيار الأول لإنشاء السيرة الذاتية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'ذكاء اصطناعي متطور',
                description: 'نستخدم أحدث نماذج الذكاء الاصطناعي من Anthropic لكتابة سيرة ذاتية احترافية مخصصة لك',
                color: 'blue',
              },
              {
                icon: '🇪🇬',
                title: 'مناسب لسوق العمل المصري',
                description: 'السيرة الذاتية مصممة خصيصاً لتلائم متطلبات أصحاب العمل في مصر والدول العربية',
                color: 'green',
              },
              {
                icon: '⚡',
                title: 'سريع وسهل الاستخدام',
                description: 'أدخل بياناتك في دقيقة واحدة واحصل على سيرة ذاتية كاملة واحترافية في ثوانٍ معدودة',
                color: 'purple',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-bl from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              كيف يعمل؟
            </h2>
            <p className="text-lg text-slate-500">ثلاث خطوات بسيطة للحصول على سيرتك الذاتية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 right-1/6 left-1/6 h-0.5 bg-blue-200" />

            {[
              { step: '١', title: 'أدخل بياناتك', desc: 'أملأ النموذج بمعلوماتك الشخصية وخبراتك ومهاراتك' },
              { step: '٢', title: 'اضغط توليد', desc: 'الذكاء الاصطناعي يحلل بياناتك ويكتب سيرة ذاتية احترافية' },
              { step: '٣', title: 'حمّل وشارك', desc: 'حمّل سيرتك كـ PDF وابدأ في التقدم للوظائف فوراً' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              الأسعار
            </h2>
            <p className="text-lg text-slate-500">ابدأ مجاناً، وطوّر عند الحاجة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-1">مجاني</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">0</span>
                  <span className="text-slate-500 font-medium">جنيه</span>
                </div>
                <p className="text-slate-400 text-sm mt-1">للأبد</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'إنشاء سيرة ذاتية واحدة',
                  'توليد بالذكاء الاصطناعي',
                  'معاينة مباشرة',
                  'طباعة',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl transition-colors">
                  ابدأ مجاناً
                </button>
              </SignUpButton>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-600 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                الأكثر شعبية
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">احترافي</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">29</span>
                  <span className="text-blue-200 font-medium">جنيه / شهر</span>
                </div>
                <p className="text-blue-200 text-sm mt-1">أقل من قهوة يومياً</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'سير ذاتية غير محدودة',
                  'تحميل PDF عالي الجودة',
                  'تخصيص متقدم',
                  'أولوية في الدعم الفني',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-white">
                    <svg className="w-5 h-5 text-blue-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl transition-colors">
                  ابدأ الآن
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            جاهز لتبدأ مسيرتك المهنية؟
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            أنشئ سيرتك الذاتية الاحترافية الآن وابدأ في التقدم للوظائف
          </p>
          <SignUpButton mode="modal">
            <button className="bg-white text-blue-600 hover:bg-blue-50 text-lg font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-200 hover:-translate-y-0.5">
              أنشئ سيرتك الذاتية مجاناً ←
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">و</span>
              </div>
              <span className="text-white font-bold text-lg">وظيفني</span>
            </div>
            <p className="text-sm">
              © 2025 وظيفني. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
              <Link href="#" className="hover:text-white transition-colors">الشروط والأحكام</Link>
              <Link href="#" className="hover:text-white transition-colors">تواصل معنا</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
