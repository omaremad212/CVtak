'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CVForm from '@/components/CVForm'
import CVPreview from '@/components/CVPreview'
import type { CVFormData } from '@/lib/supabase'

export default function BuilderPage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [cvContent, setCvContent] = useState('')
  const [cvId, setCvId] = useState<string>()
  const [error, setError] = useState<string>()

  const handleGenerate = async (formData: CVFormData) => {
    setIsGenerating(true)
    setError(undefined)
    setCvContent('')

    try {
      const res = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.code === 'LIMIT_REACHED') {
          setError(data.error)
        } else {
          setError(data.error || 'حدث خطأ غير متوقع')
        }
        return
      }

      setCvContent(data.cv.content)
      setCvId(data.cv.id)
    } catch {
      setError('حدث خطأ في الاتصال بالخادم. الرجاء المحاولة مرة أخرى.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">و</span>
            </div>
            <span className="text-lg font-bold text-blue-600">وظيفني</span>
          </Link>
          <h1 className="text-base font-bold text-slate-700">إنشاء سيرة ذاتية جديدة</h1>
          <Link
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            لوحة التحكم
          </Link>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-700 text-sm font-medium">{error}</p>
              {error.includes('الحد المجاني') && (
                <button
                  onClick={async () => {
                    const res = await fetch('/api/checkout', { method: 'POST' })
                    const { url } = await res.json()
                    if (url) window.location.href = url
                  }}
                  className="mt-2 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ترقية إلى الخطة الاحترافية - 29 جنيه/شهر
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success Banner */}
        {cvId && !error && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-700 text-sm font-medium">تم حفظ سيرتك الذاتية بنجاح!</p>
            </div>
            <Link
              href={`/cv/${cvId}`}
              className="text-sm text-green-700 hover:text-green-800 font-semibold underline"
            >
              عرض الصفحة الكاملة ←
            </Link>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Panel */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-slate-800 mb-1">بياناتك الشخصية</h2>
              <p className="text-sm text-slate-400">أدخل معلوماتك وسيقوم الذكاء الاصطناعي بإنشاء سيرتك الذاتية</p>
            </div>
            <CVForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24">
            <CVPreview content={cvContent} isGenerating={isGenerating} cvId={cvId} />
          </div>
        </div>
      </div>
    </div>
  )
}
