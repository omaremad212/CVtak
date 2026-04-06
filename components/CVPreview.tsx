'use client'

import { useRef } from 'react'

interface CVPreviewProps {
  content: string
  isGenerating: boolean
  cvId?: string
}

export default function CVPreview({ content, isGenerating, cvId }: CVPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => window.print()

  if (isGenerating) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center bg-white border border-oat rounded-card p-8">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-off-black border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="font-semibold text-off-black mb-1 tracking-tighter-xs">الذكاء الاصطناعي يكتب سيرتك...</p>
          <p className="text-xs text-muted mb-6">نحن نحلل بياناتك ونصيغ سيرة ذاتية احترافية</p>
          <div className="space-y-2 text-right">
            {['تحليل الخبرات...', 'صياغة الملخص المهني...', 'تنسيق السيرة الذاتية...'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-1 h-1 bg-orange rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
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
      <div className="min-h-[600px] flex flex-col items-center justify-center bg-white border-2 border-dashed border-oat rounded-card p-8">
        <div className="text-center">
          <div className="w-14 h-14 bg-cream border border-oat rounded-card flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="font-semibold text-off-black mb-1 tracking-tighter-xs">معاينة السيرة الذاتية</p>
          <p className="text-xs text-muted max-w-xs">
            أكمل البيانات في النموذج واضغط على زر التوليد لرؤية سيرتك هنا
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Actions bar */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-orange rounded-full" />
          <span className="text-xs font-semibold text-dark-neutral tracking-tighter-xs">تم إنشاء السيرة الذاتية</span>
        </div>
        <div className="flex items-center gap-2">
          {cvId && (
            <a href={`/cv/${cvId}`}
              className="text-xs text-muted hover:text-off-black border border-oat px-3 py-1.5 rounded-btn transition-colors">
              عرض كاملاً
            </a>
          )}
          <button onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs bg-off-black text-white px-3 py-1.5 rounded-btn transition-transform hover:scale-105 active:scale-90">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            طباعة / PDF
          </button>
        </div>
      </div>

      {/* CV */}
      <div ref={printRef}
        className="cv-container bg-white border border-oat rounded-card p-8 overflow-auto"
        style={{ direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}>
        <style>{`
          .cv-container h1 { font-size: 1.6rem; font-weight: 700; color: #111111; letter-spacing: -0.03em; line-height: 1.0; margin-bottom: 0.25rem; }
          .cv-container h2 { font-size: 0.7rem; font-weight: 600; color: #7b7b78; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #dedbd6; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
          .cv-container h3 { font-size: 0.9rem; font-weight: 600; color: #111111; margin-bottom: 0.2rem; }
          .cv-container p { font-size: 0.875rem; color: #313130; line-height: 1.7; margin-bottom: 0.5rem; }
          .cv-container ul { list-style: none; padding: 0; margin: 0.5rem 0; }
          .cv-container ul li { font-size: 0.875rem; color: #313130; padding: 0.2rem 0 0.2rem 1.25rem; position: relative; line-height: 1.6; }
          .cv-container ul li::before { content: ""; width: 4px; height: 4px; background: #ff5600; border-radius: 50%; position: absolute; left: 0; top: 0.6rem; }
          .cv-container strong { color: #111111; }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}
