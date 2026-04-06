'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

interface CV {
  id: string
  title: string
  created_at: string
  form_data: { fullName: string; jobTitle: string }
}

interface Props {
  cvs: CV[]
  isPro: boolean
  cvCount: number
  showSuccess: boolean
  showCanceled: boolean
}

export default function DashboardClient({ cvs, isPro, cvCount, showSuccess, showCanceled }: Props) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleUpgrade = async () => {
    setIsCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setIsCheckingOut(false)
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-off-black rounded-btn flex items-center justify-center">
              <span className="text-white font-bold text-xs">و</span>
            </div>
            <span className="font-bold text-off-black tracking-tighter-xs">وظيفني</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Notifications */}
        {showSuccess && (
          <div className="mb-6 bg-white border border-oat rounded-card p-4 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-orange rounded-full" />
            <p className="text-sm text-off-black font-medium">تم الاشتراك في الخطة الاحترافية بنجاح!</p>
          </div>
        )}
        {showCanceled && (
          <div className="mb-6 bg-white border border-oat rounded-card p-4 flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-sand rounded-full" />
            <p className="text-sm text-muted">تم إلغاء عملية الدفع</p>
          </div>
        )}

        {/* Page title */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-2">لوحة التحكم</p>
            <h1 className="heading-section">سيرك الذاتية</h1>
            <p className="text-xs text-muted mt-2">
              {isPro
                ? <span className="inline-flex items-center gap-1"><span className="w-1 h-1 bg-orange rounded-full" />خطة احترافية</span>
                : `${cvCount} / 1 مجاني`}
            </p>
          </div>
          <Link href="/builder" className="btn-primary">
            + جديد
          </Link>
        </div>

        {/* Upgrade banner */}
        {!isPro && cvCount >= 1 && (
          <div className="mb-8 bg-off-black rounded-card p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <p className="font-semibold text-white mb-1 tracking-tighter-xs">سير ذاتية غير محدودة</p>
              <p className="text-sand text-xs">قم بالترقية مقابل 29 جنيه فقط شهرياً</p>
            </div>
            <button onClick={handleUpgrade} disabled={isCheckingOut}
              className="flex-shrink-0 bg-white text-off-black font-semibold text-sm px-5 py-2.5 rounded-btn transition-transform hover:scale-105 active:scale-90 disabled:opacity-60">
              {isCheckingOut ? 'جاري التحويل...' : 'ترقية الآن'}
            </button>
          </div>
        )}

        {/* Empty state */}
        {cvs.length === 0 ? (
          <div className="text-center py-24 bg-white border-2 border-dashed border-oat rounded-card">
            <div className="w-12 h-12 bg-cream border border-oat rounded-card flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="font-semibold text-off-black mb-1 tracking-tighter-xs">لا توجد سير ذاتية بعد</p>
            <p className="text-xs text-muted mb-6">أنشئ سيرتك الذاتية الأولى الآن</p>
            <Link href="/builder" className="btn-primary">إنشاء سيرة ذاتية</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cvs.map((cv) => (
              <div key={cv.id} className="bg-white border border-oat rounded-card p-6 hover:border-off-black transition-colors duration-200 group">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-9 h-9 bg-cream border border-oat rounded-btn flex items-center justify-center">
                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted">{formatDate(cv.created_at)}</span>
                </div>

                <p className="font-semibold text-off-black mb-0.5 tracking-tighter-xs truncate">{cv.form_data?.fullName}</p>
                <p className="text-xs text-orange mb-5">{cv.form_data?.jobTitle}</p>

                <div className="flex gap-2">
                  <Link href={`/cv/${cv.id}`}
                    className="flex-1 text-center text-xs bg-off-black text-white font-semibold py-2 rounded-btn transition-transform hover:scale-105 active:scale-90">
                    عرض
                  </Link>
                  <Link href={`/builder?edit=${cv.id}`}
                    className="flex-1 text-center text-xs border border-oat text-muted hover:border-off-black hover:text-off-black font-semibold py-2 rounded-btn transition-colors">
                    تعديل
                  </Link>
                </div>
              </div>
            ))}

            {(isPro || cvCount < 1) && (
              <Link href="/builder"
                className="bg-white border-2 border-dashed border-oat hover:border-off-black rounded-card p-6 flex flex-col items-center justify-center gap-3 transition-colors min-h-[180px] group">
                <div className="w-9 h-9 bg-cream border border-oat group-hover:border-off-black rounded-btn flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-muted group-hover:text-off-black transition-colors">
                  سيرة ذاتية جديدة
                </span>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
