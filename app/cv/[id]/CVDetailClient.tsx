'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { CV } from '@/lib/supabase'

export default function CVDetailClient({ cv }: { cv: CV }) {
  const [copied, setCopied] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-cream" dir="rtl">
      {/* Top bar */}
      <header className="bg-white border-b border-oat no-print sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard"
            className="flex items-center gap-2 text-xs text-muted hover:text-off-black transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            لوحة التحكم
          </Link>

          <div className="flex items-center gap-2">
            <Link href={`/builder?edit=${cv.id}`}
              className="text-xs border border-oat text-muted hover:border-off-black hover:text-off-black px-4 py-2 rounded-btn transition-colors">
              تعديل
            </Link>

            <button onClick={handleShare}
              className="text-xs border border-oat text-muted hover:border-off-black hover:text-off-black px-4 py-2 rounded-btn transition-colors flex items-center gap-1.5">
              {copied ? (
                <><span className="w-1 h-1 bg-orange rounded-full" /><span className="text-orange">تم النسخ</span></>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>مشاركة</>
              )}
            </button>

            <button onClick={() => window.print()}
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              تحميل PDF
            </button>
          </div>
        </div>
      </header>

      {/* CV */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div ref={printRef}
          className="cv-container bg-white border border-oat rounded-card p-10 md:p-14"
          style={{ direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}>
          <style>{`
            @media print {
              .no-print { display: none !important; }
              body { background: white; }
              .cv-container { box-shadow: none; border: none; border-radius: 0; padding: 0; }
            }
            .cv-container h1 { font-size: 2rem; font-weight: 700; color: #111111; letter-spacing: -0.04em; line-height: 1.0; margin-bottom: 0.25rem; }
            .cv-container h2 { font-size: 0.65rem; font-weight: 600; color: #7b7b78; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #dedbd6; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 0.75rem; }
            .cv-container h3 { font-size: 0.95rem; font-weight: 600; color: #111111; margin-bottom: 0.25rem; }
            .cv-container p { font-size: 0.875rem; color: #313130; line-height: 1.75; margin-bottom: 0.75rem; }
            .cv-container ul { list-style: none; padding: 0; margin: 0.75rem 0; }
            .cv-container ul li { font-size: 0.875rem; color: #313130; padding: 0.25rem 0 0.25rem 1.5rem; position: relative; line-height: 1.6; }
            .cv-container ul li::before { content: ""; width: 4px; height: 4px; background: #ff5600; border-radius: 50%; position: absolute; left: 0; top: 0.6rem; }
            .cv-container strong { color: #111111; }
            .cv-container hr { border-color: #dedbd6; margin: 1.5rem 0; }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: cv.content }} />
        </div>
      </main>
    </div>
  )
}
