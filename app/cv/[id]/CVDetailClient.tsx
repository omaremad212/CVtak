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
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="bg-white border-b border-oat no-print sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard"
            className="flex items-center gap-2 text-xs text-muted hover:text-off-black transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <Link href={`/builder?edit=${cv.id}`}
              className="text-xs border border-oat text-muted hover:border-off-black hover:text-off-black px-4 py-2 rounded-btn transition-colors">
              Edit
            </Link>

            <button onClick={handleShare}
              className="text-xs border border-oat text-muted hover:border-off-black hover:text-off-black px-4 py-2 rounded-btn transition-colors flex items-center gap-1.5">
              {copied ? (
                <><span className="w-1 h-1 bg-orange rounded-full" /><span className="text-orange">Copied!</span></>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>Share</>
              )}
            </button>

            <button onClick={() => window.print()}
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* CV */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="cv-print-area">
        <div ref={printRef}
          className="cv-wrap bg-white border border-oat rounded-card p-10 md:p-14">
          <style>{`
            .cv-doc { font-family: 'Times New Roman', Times, Georgia, serif; font-size: 11pt; color: #000; line-height: 1.45; }
            .cv-doc h1 { font-size: 22pt; font-weight: bold; margin: 0 0 2pt; letter-spacing: -0.01em; }
            .cv-doc .cv-subtitle { font-size: 11pt; font-weight: normal; margin: 0 0 6pt; }
            .cv-doc hr { border: none; border-top: 1px solid #111; margin: 6pt 0; }
            .cv-doc .cv-contact { font-size: 9.5pt; margin: 0 0 10pt; color: #111; }
            .cv-doc .cv-contact a { color: #111; text-decoration: underline; }
            .cv-doc h2 { font-size: 13pt; font-weight: bold; border-bottom: 1.5px solid #111; padding-bottom: 2pt; margin: 14pt 0 6pt; }
            .cv-doc p { font-size: 11pt; margin: 0 0 5pt; }
            .cv-doc .cv-date { font-size: 11pt; margin: 0 0 2pt; }
            .cv-doc ul { list-style: disc; padding-left: 1.4em; margin: 2pt 0 6pt; }
            .cv-doc ul li { font-size: 11pt; margin-bottom: 2pt; line-height: 1.45; }
            .cv-doc ul ul { list-style: circle; padding-left: 1.4em; margin: 2pt 0; }
            .cv-doc ul ul li { font-size: 10.5pt; }
            .cv-doc .cv-two-col { display: grid; grid-template-columns: 1fr 1fr; column-gap: 1.5em; }
            .cv-doc .cv-two-col ul { margin-top: 0; }
            .cv-doc strong { font-weight: bold; }
            .cv-doc a { color: #000; text-decoration: underline; }
          `}</style>
          <div className="cv-doc" dangerouslySetInnerHTML={{ __html: cv.content }} />
        </div>
        </div>
      </main>
    </div>
  )
}
