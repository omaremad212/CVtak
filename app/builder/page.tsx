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
        setError(data.error || 'An unexpected error occurred.')
        return
      }

      setCvContent(data.cv.content)
      setCvId(data.cv.id ?? undefined)
      if (data.warning) setError(data.warning)
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-oat sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Wazzifni" width={180} height={54} className="h-14 w-auto object-contain" />
          </Link>
          <p className="text-xs font-semibold text-muted uppercase tracking-widest">CV Builder</p>
          <Link href="/dashboard" className="text-xs text-muted hover:text-off-black transition-colors">
            Dashboard
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
            </div>
          </div>
        )}

        {/* Success */}
        {cvId && !error && (
          <div className="mb-6 bg-white border border-oat rounded-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              <p className="text-sm text-off-black font-medium">CV saved successfully</p>
            </div>
            <Link href={`/cv/${cvId}`} className="text-xs text-muted hover:text-off-black border border-oat px-3 py-1.5 rounded-btn transition-colors">
              View full page →
            </Link>
          </div>
        )}

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-white border border-oat rounded-card p-6 lg:p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-2">Form</p>
              <h2 className="heading-card">Your Details</h2>
              <p className="text-xs text-muted mt-1">Enter your information and AI will write your CV</p>
            </div>
            <CVForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest">Preview</p>
            </div>
            <CVPreview content={cvContent} isGenerating={isGenerating} cvId={cvId} />
          </div>
        </div>
      </div>
    </div>
  )
}
