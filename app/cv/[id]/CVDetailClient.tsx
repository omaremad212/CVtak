'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { CV } from '@/lib/supabase'

interface Props {
  cv: CV
}

export default function CVDetailClient({ cv }: Props) {
  const [copied, setCopied] = useState(false)
  const printAreaRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Top Bar - no-print */}
      <header className="bg-white border-b border-slate-200 no-print sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة للوحة التحكم
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/builder?edit=${cv.id}`}
              className="flex items-center gap-1.5 text-sm border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              تعديل
            </Link>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-sm border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-600">تم النسخ</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  مشاركة
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تحميل PDF
            </button>
          </div>
        </div>
      </header>

      {/* CV Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div
          ref={printAreaRef}
          className="cv-container bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12"
          style={{ direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}
        >
          <style>{`
            @media print {
              .no-print { display: none !important; }
              body { background: white; }
              .cv-container { box-shadow: none; border: none; border-radius: 0; }
            }
            .cv-container h1 { font-size: 2rem; font-weight: 800; color: #1e40af; margin-bottom: 0.25rem; }
            .cv-container h2 { font-size: 1.15rem; font-weight: 700; color: #1e3a8a; border-bottom: 2px solid #bfdbfe; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 1rem; }
            .cv-container h3 { font-size: 1rem; font-weight: 700; color: #1e40af; margin-bottom: 0.25rem; }
            .cv-container p { font-size: 0.9rem; color: #374151; line-height: 1.9; margin-bottom: 0.75rem; }
            .cv-container ul { list-style: none; padding: 0; margin: 0.75rem 0; }
            .cv-container ul li { font-size: 0.875rem; color: #374151; padding: 0.3rem 0; padding-right: 1.5rem; position: relative; line-height: 1.7; }
            .cv-container ul li::before { content: "◀"; color: #3b82f6; position: absolute; right: 0; font-size: 0.5rem; top: 0.55rem; }
            .cv-container strong { color: #1e40af; }
            .cv-container hr { border-color: #bfdbfe; margin: 1.5rem 0; }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: cv.content }} />
        </div>
      </main>
    </div>
  )
}
