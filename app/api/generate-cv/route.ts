import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateCV } from '@/lib/claude'
import { createServerSupabase } from '@/lib/supabase'
import type { CVFormData } from '@/lib/supabase'

function errorDetail(e: unknown): string {
  if (e instanceof Error) {
    // Anthropic SDK errors expose .status and .error
    const ae = e as Error & { status?: number; error?: { error?: { message?: string } } }
    const apiMsg = ae.error?.error?.message
    return [
      ae.constructor.name,
      ae.status ? `HTTP ${ae.status}` : '',
      apiMsg || ae.message,
    ].filter(Boolean).join(' — ')
  }
  return String(e)
}

export async function POST(req: NextRequest) {
  // ── 1. Auth ──────────────────────────────────────────────────────────────
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'You must be signed in.' }, { status: 401 })
  }

  // ── 2. Body ───────────────────────────────────────────────────────────────
  let formData: CVFormData
  try {
    formData = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!formData.fullName || !formData.jobTitle || !formData.summary || !formData.education || !formData.experience || !formData.skills) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
  }

  // ── 3. AI Generation ─────────────────────────────────────────────────────
  let cvContent: string
  try {
    cvContent = await generateCV(formData)
  } catch (aiErr) {
    const detail = errorDetail(aiErr)
    console.error('[generate-cv] Claude error:', detail)

    // Map known Groq errors to clear messages
    const raw = detail.toLowerCase()
    let userMessage: string
    if (raw.includes('invalid api key') || raw.includes('authentication') || raw.includes('401')) {
      userMessage = 'Invalid Groq API key — check GROQ_API_KEY in Vercel settings.'
    } else if (raw.includes('not set')) {
      userMessage = 'Groq API key not configured — add GROQ_API_KEY in Vercel environment variables.'
    } else if (raw.includes('model') && (raw.includes('not found') || raw.includes('does not exist'))) {
      userMessage = 'AI model not available — check the model name in lib/claude.ts.'
    } else if (raw.includes('rate limit') || raw.includes('429') || raw.includes('tokens per')) {
      userMessage = 'Rate limit reached — please try again in a minute.'
    } else if (raw.includes('quota') || raw.includes('billing') || raw.includes('payment')) {
      userMessage = 'Groq quota exceeded — check your account at console.groq.com.'
    } else {
      userMessage = `AI generation error: ${detail}`
    }

    return NextResponse.json({ error: userMessage }, { status: 500 })
  }

  // ── 5. Save ───────────────────────────────────────────────────────────────
  try {
    const supabase = createServerSupabase()
    const { data: cv, error } = await supabase
      .from('cvs')
      .insert({
        user_id: userId,
        title: `${formData.jobTitle} - ${formData.fullName}`,
        content: cvContent,
        form_data: formData,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ cv })
  } catch (saveErr) {
    const detail = errorDetail(saveErr)
    console.error('[generate-cv] Save error:', detail)
    // Still return the CV content — saving is non-fatal
    return NextResponse.json({
      cv: {
        id: null,
        content: cvContent,
        title: `${formData.jobTitle} - ${formData.fullName}`,
      },
      warning: `CV generated but could not be saved: ${detail}`,
    })
  }
}
