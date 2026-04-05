'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

interface CV {
  id: string
  title: string
  created_at: string
  form_data: {
    fullName: string
    jobTitle: string
  }
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">و</span>
              </div>
              <span className="text-lg font-bold text-blue-600">وظيفني</span>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-700 font-medium">تم الاشتراك في الخطة الاحترافية بنجاح! مبروك 🎉</p>
          </div>
        )}

        {showCanceled && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-yellow-700 font-medium">تم إلغاء عملية الدفع</p>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">لوحة التحكم</h1>
            <p className="text-slate-500 text-sm mt-1">
              إدارة سيرك الذاتية
              {isPro ? (
                <span className="mr-2 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">احترافي ✓</span>
              ) : (
                <span className="mr-2 text-slate-400">({cvCount}/1 مجاني)</span>
              )}
            </p>
          </div>
          <Link
            href="/builder"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            سيرة ذاتية جديدة
          </Link>
        </div>

        {/* Pro Upgrade Banner */}
        {!isPro && cvCount >= 1 && (
          <div className="mb-8 bg-gradient-to-l from-blue-600 to-blue-800 rounded-3xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">هل تريد سير ذاتية غير محدودة؟</h3>
                <p className="text-blue-100 text-sm">
                  قم بالترقية إلى الخطة الاحترافية مقابل 29 جنيه فقط شهرياً
                </p>
              </div>
              <button
                onClick={handleUpgrade}
                disabled={isCheckingOut}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl transition-colors flex-shrink-0 disabled:opacity-75"
              >
                {isCheckingOut ? 'جاري التحويل...' : 'ترقية الآن - 29 جنيه/شهر'}
              </button>
            </div>
          </div>
        )}

        {/* CVs Grid */}
        {cvs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">لا توجد سير ذاتية بعد</h3>
            <p className="text-slate-400 mb-6 text-sm">أنشئ سيرتك الذاتية الأولى الآن</p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              إنشاء سيرة ذاتية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(cv.created_at)}</span>
                </div>

                <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{cv.form_data?.fullName}</h3>
                <p className="text-sm text-blue-600 font-medium mb-4">{cv.form_data?.jobTitle}</p>

                <div className="flex gap-2">
                  <Link
                    href={`/cv/${cv.id}`}
                    className="flex-1 text-center text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    عرض
                  </Link>
                  <Link
                    href={`/builder?edit=${cv.id}`}
                    className="flex-1 text-center text-sm border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 font-semibold py-2 rounded-lg transition-colors"
                  >
                    تعديل
                  </Link>
                </div>
              </div>
            ))}

            {/* New CV Card */}
            {(isPro || cvCount < 1) && (
              <Link
                href="/builder"
                className="bg-slate-50 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 group min-h-[180px]"
              >
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
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
