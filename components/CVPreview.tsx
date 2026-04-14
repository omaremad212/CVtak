'use client'

interface CVPreviewProps {
  content: string
  isGenerating: boolean
  cvId?: string
}

const CV_STYLES = `
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
`

export default function CVPreview({ content, isGenerating, cvId }: CVPreviewProps) {
  if (isGenerating) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center bg-white border border-oat rounded-card p-8">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-off-black border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="font-semibold text-off-black mb-1 tracking-tighter-xs">AI is writing your CV...</p>
          <p className="text-xs text-muted mb-6">Analyzing your data and crafting a professional CV</p>
          <div className="space-y-2">
            {['Analyzing experience...', 'Writing professional summary...', 'Formatting CV...'].map((step, i) => (
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
          <p className="font-semibold text-off-black mb-1 tracking-tighter-xs">CV Preview</p>
          <p className="text-xs text-muted max-w-xs">
            Fill in your details and click Generate to see your CV here
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
          <span className="text-xs font-semibold text-dark-neutral tracking-tighter-xs">CV Generated</span>
        </div>
        <div className="flex items-center gap-2">
          {cvId && (
            <a href={`/cv/${cvId}`}
              className="text-xs text-muted hover:text-off-black border border-oat px-3 py-1.5 rounded-btn transition-colors">
              Full View
            </a>
          )}
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs bg-off-black text-white px-3 py-1.5 rounded-btn transition-transform hover:scale-105 active:scale-90">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Print / PDF
          </button>
        </div>
      </div>

      {/* CV document */}
      <div className="cv-print-area">
        <div className="cv-wrap bg-white border border-oat rounded-card p-8 overflow-auto">
          <style>{CV_STYLES}</style>
          <div className="cv-doc" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  )
}
