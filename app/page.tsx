'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { SignUpButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      <Navbar />

      {/* ── Hero with Aurora ── */}
      <AuroraBackground
        className="h-auto min-h-[92vh] py-24 lg:py-36 border-b border-oat items-start justify-start bg-zinc-50"
        showRadialGradient={true}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-oat rounded-btn px-3 py-1 text-xs font-medium text-muted mb-8 bg-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              مدعوم بأحدث تقنيات الذكاء الاصطناعي
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-off-black leading-100 tracking-tighter-lg mb-6">
              أنشئ سيرتك
              <br />
              الذاتية بالذكاء
              <br />
              <span className="text-orange">الاصطناعي</span>
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl">
              وظيفني يكتب لك سيرة ذاتية احترافية بالعربية مناسبة لسوق العمل
              المصري — بضغطة زر واحدة.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <SignUpButton mode="modal">
                <button className="btn-primary text-base px-7 py-3.5">
                  أنشئ سيرتك مجاناً ←
                </button>
              </SignUpButton>
              <Link href="#features" className="btn-outlined text-base px-7 py-3.5 bg-white/80 backdrop-blur-sm">
                تعرف على المميزات
              </Link>
            </div>

            <p className="mt-5 text-xs text-muted">
              لا يلزم بطاقة ائتمان · سيرة ذاتية مجانية واحدة
            </p>
          </motion.div>

          {/* Hero card preview */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
            className="mt-20"
          >
            <div className="bg-white/90 backdrop-blur-sm border border-oat rounded-card overflow-hidden shadow-sm">
              <div className="bg-off-black px-8 py-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-xl leading-100 tracking-tighter-xs">أحمد محمد السيد</p>
                  <p className="text-sand text-sm mt-1">مهندس برمجيات أول</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                  <span className="text-sand text-xs">تم التوليد</span>
                </div>
              </div>
              <div className="p-8 grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-5">
                  {['الملخص المهني', 'الخبرات العملية'].map((section) => (
                    <div key={section}>
                      <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3 border-b border-oat pb-2">{section}</h3>
                      <div className="space-y-2">
                        <div className="h-2 bg-cream rounded-full w-full" />
                        <div className="h-2 bg-cream rounded-full w-4/5" />
                        <div className="h-2 bg-cream rounded-full w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3 border-b border-oat pb-2">المهارات</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'Python', 'SQL'].map((s) => (
                        <span key={s} className="text-xs px-2 py-1 bg-cream border border-oat rounded-btn text-dark-neutral">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3 border-b border-oat pb-2">التعليم</h3>
                    <div className="space-y-2">
                      <div className="h-2 bg-cream rounded-full w-full" />
                      <div className="h-2 bg-cream rounded-full w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              تم الإنشاء في 8 ثوانٍ
            </div>
          </motion.div>
        </div>
      </AuroraBackground>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-white border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-3">المميزات</p>
            <h2 className="heading-section">لماذا وظيفني؟</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '01', title: 'ذكاء اصطناعي متطور', body: 'نستخدم أحدث نماذج Claude من Anthropic لكتابة سيرة ذاتية احترافية مخصصة لك تماماً.' },
              { label: '02', title: 'مناسب لسوق العمل المصري', body: 'السيرة الذاتية مصممة لتلائم متطلبات أصحاب العمل في مصر والدول العربية.' },
              { label: '03', title: 'سريع وسهل', body: 'أدخل بياناتك في دقيقة واحدة واحصل على سيرة ذاتية كاملة في ثوانٍ معدودة.' },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-7"
              >
                <p className="text-xs font-mono text-orange mb-4">{f.label}</p>
                <h3 className="heading-card mb-3">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-cream border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-3">كيف يعمل</p>
            <h2 className="heading-section">ثلاث خطوات بسيطة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '١', title: 'أدخل بياناتك', desc: 'أملأ النموذج بمعلوماتك الشخصية وخبراتك ومهاراتك' },
              { step: '٢', title: 'اضغط توليد', desc: 'الذكاء الاصطناعي يحلل بياناتك ويكتب سيرة ذاتية احترافية' },
              { step: '٣', title: 'حمّل وشارك', desc: 'حمّل سيرتك كـ PDF وابدأ في التقدم للوظائف فوراً' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-9 h-9 border border-off-black rounded-btn flex items-center justify-center text-sm font-bold text-off-black">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-off-black mb-1 tracking-tighter-xs">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-white border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-3">الأسعار</p>
            <h2 className="heading-section">ابدأ مجاناً</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="card p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">مجاني</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-off-black leading-100 tracking-tighter-md">0</span>
                  <span className="text-muted text-sm">جنيه</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['سيرة ذاتية واحدة', 'توليد بالذكاء الاصطناعي', 'معاينة مباشرة', 'طباعة'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-dark-neutral">
                    <span className="w-1 h-1 bg-off-black rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <SignUpButton mode="modal">
                <button className="btn-outlined w-full justify-center">ابدأ مجاناً</button>
              </SignUpButton>
            </div>

            <div className="bg-off-black border border-off-black rounded-card p-8 flex flex-col relative">
              <span className="absolute top-4 left-4 text-xs bg-orange text-white px-2.5 py-1 rounded-btn font-semibold">
                الأكثر شعبية
              </span>
              <div className="mb-6">
                <p className="text-xs font-semibold text-sand uppercase tracking-widest mb-3">احترافي</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white leading-100 tracking-tighter-md">29</span>
                  <span className="text-sand text-sm">جنيه / شهر</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['سير ذاتية غير محدودة', 'تحميل PDF عالي الجودة', 'تخصيص متقدم', 'أولوية في الدعم الفني'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-sand">
                    <span className="w-1 h-1 bg-orange rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full bg-white text-off-black font-semibold py-2.5 px-5 rounded-btn text-sm transition-transform duration-150 hover:scale-105 active:scale-90">
                  ابدأ الآن
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA with mini Aurora ── */}
      <AuroraBackground
        className="h-auto py-24 bg-zinc-50 border-b border-oat"
        showRadialGradient={false}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="bg-off-black/90 backdrop-blur-sm rounded-card p-12 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-100 tracking-tighter-md mb-4">
              جاهز لتبدأ مسيرتك المهنية؟
            </h2>
            <p className="text-sand text-base mb-8">
              أنشئ سيرتك الذاتية الاحترافية الآن وابدأ في التقدم للوظائف
            </p>
            <SignUpButton mode="modal">
              <button className="bg-white text-off-black font-bold px-8 py-3.5 rounded-btn text-sm transition-transform duration-150 hover:scale-105 active:scale-90">
                أنشئ سيرتك مجاناً ←
              </button>
            </SignUpButton>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-oat py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-off-black rounded-btn flex items-center justify-center">
                <span className="text-white font-bold text-xs">و</span>
              </div>
              <span className="font-bold text-off-black tracking-tighter-xs">وظيفني</span>
            </div>
            <p className="text-xs text-muted">© 2025 وظيفني. جميع الحقوق محفوظة.</p>
            <div className="flex gap-5 text-xs text-muted">
              <Link href="#" className="hover:text-off-black transition-colors">سياسة الخصوصية</Link>
              <Link href="#" className="hover:text-off-black transition-colors">الشروط والأحكام</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
