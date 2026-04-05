'use client'

import { useRef } from 'react'

interface CVPreviewProps {
  content: string
  isGenerating: boolean
  cvId?: string
}

export default function CVPreview({ content, isGenerating, cvId }: CVPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = () => {
    if (!printRef.current) return
    window.print()
  }

  if (isGenerating) {
    return (
      <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">الذكاء الاصطناعي يكتب سيرتك...</h3>
          <p className="text-slate-500 text-sm">نحن نحلل بياناتك ونكتب سيرة ذاتية احترافية</p>
          <div className="mt-6 space-y-2">
            {['تحليل الخبرات...', 'صياغة الملخص المهني...', 'تنسيق السيرة الذاتية...'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="h-full min-h-[600px] flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">معاينة السيرة الذاتية</h3>
          <p className="text-slate-400 text-sm max-w-xs">
            أكمل البيانات في النموذج واضغط على زر التوليد لرؤية سيرتك الذاتية هنا
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Actions */}
      <div className="flex items-center justify-between mb-4 no-print">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          تم إنشاء السيرة الذاتية
        </h3>
        <div className="flex gap-2">
          {cvId && (
            <a
              href={`/cv/${cvId}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
            >
              عرض كاملاً
            </a>
          )}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 text-sm bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            طباعة / PDF
          </button>
        </div>
      </div>

      {/* CV Content */}
      <div
        ref={printRef}
        className="cv-container flex-1 bg-white rounded-2xl border border-slate-200 p-8 overflow-auto shadow-sm"
        style={{ direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}
      >
        <style>{`
          .cv-container h1 { font-size: 1.75rem; font-weight: 800; color: #1e40af; margin-bottom: 0.25rem; }
          .cv-container h2 { font-size: 1.1rem; font-weight: 700; color: #1e3a8a; border-bottom: 2px solid #bfdbfe; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
          .cv-container h3 { font-size: 0.95rem; font-weight: 700; color: #1e40af; margin-bottom: 0.25rem; }
          .cv-container p { font-size: 0.9rem; color: #374151; line-height: 1.8; margin-bottom: 0.5rem; }
          .cv-container ul { list-style: none; padding: 0; margin: 0.5rem 0; }
          .cv-container ul li { font-size: 0.875rem; color: #374151; padding: 0.2rem 0; padding-right: 1.25rem; position: relative; }
          .cv-container ul li::before { content: "•"; color: #3b82f6; position: absolute; right: 0; font-weight: bold; }
          .cv-container strong { color: #1e40af; }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
