'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CVForm from '@/components/CVForm'
import CVPreview from '@/components/CVPreview'
import type { CVFormData } from '@/lib/supabase'

export default function BuilderPage() {
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
        setError(data.error || 'حدث خطأ غير متوقع')
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
    <div className="min-h-screen bg-cream" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-oat sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="وظيفني" width={140} height={42} className="h-10 w-auto object-contain" style={{ filter: 'brightness(0)' }} />
          </Link>
          <p className="text-xs font-semibold text-muted uppercase tracking-widest">إنشاء سيرة ذاتية</p>
          <Link href="/dashboard" className="text-xs text-muted hover:text-off-black transition-colors">
            لوحة التحكم
          </Link>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 bg-white border border-oat rounded-card p-4 flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-orange rounded-full flex-shrink-0 mt-1.5" />
            <div>
              <p className="text-sm text-off-black">{error}</p>
              {error.includes('الحد المجاني') && (
                <button
                  onClick={async () => {
                    const res = await fetch('/api/checkout', { method: 'POST' })
                    const { url } = await res.json()
                    if (url) window.location.href = url
                  }}
                  className="mt-3 btn-primary text-xs px-4 py-2"
                >
                  ترقية إلى الاحترافي — 29 جنيه/شهر
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success */}
        {cvId && !error && (
          <div className="mb-6 bg-white border border-oat rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              <p className="text-sm text-off-black font-medium">تم حفظ سيرتك الذاتية بنجاح</p>
            </div>
            <Link href={`/cv/${cvId}`} className="text-xs text-muted hover:text-off-black border border-oat px-3 py-1.5 rounded-btn transition-colors">
              عرض الصفحة الكاملة ←
            </Link>
          </div>
        )}

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-white border border-oat rounded-card p-6 lg:p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-2">النموذج</p>
              <h2 className="heading-card">بياناتك الشخصية</h2>
              <p className="text-xs text-muted mt-1">أدخل معلوماتك وسيقوم الذكاء الاصطناعي بإنشاء سيرتك</p>
            </div>
            <CVForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest">المعاينة</p>
            </div>
            <CVPreview content={cvContent} isGenerating={isGenerating} cvId={cvId} />
          </div>
        </div>
      </div>
    </div>
  )
}
