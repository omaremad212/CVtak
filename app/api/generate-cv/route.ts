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
    return NextResponse.json({ error: 'يجب تسجيل الدخول أولاً' }, { status: 401 })
  }

  // ── 2. Body ───────────────────────────────────────────────────────────────
  let formData: CVFormData
  try {
    formData = await req.json()
  } catch {
    return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
  }

  if (!formData.fullName || !formData.jobTitle || !formData.experience || !formData.skills || !formData.education) {
    return NextResponse.json({ error: 'جميع الحقول المطلوبة يجب ملؤها' }, { status: 400 })
  }

  // ── 3. Free-tier check (non-fatal if DB not ready) ────────────────────────
  try {
    const supabase = createServerSupabase()
    const [{ count }, { data: subscription }] = await Promise.all([
      supabase.from('cvs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('subscriptions').select('status').eq('user_id', userId).eq('status', 'active').single(),
    ])

    if (!subscription && (count ?? 0) >= 1) {
      return NextResponse.json(
        {
          error: 'لقد وصلت إلى الحد المجاني (سيرة ذاتية واحدة). قم بالترقية للحصول على سير ذاتية غير محدودة.',
          code: 'LIMIT_REACHED',
        },
        { status: 403 }
      )
    }
  } catch (dbErr) {
    // Tables may not exist yet — log and continue
    console.warn('[generate-cv] DB check skipped:', errorDetail(dbErr))
  }

  // ── 4. Claude API ─────────────────────────────────────────────────────────
  let cvContent: string
  try {
    cvContent = await generateCV(formData)
  } catch (aiErr) {
    const detail = errorDetail(aiErr)
    console.error('[generate-cv] Claude error:', detail)

    // Map known Anthropic errors to clear Arabic messages
    const raw = detail.toLowerCase()
    let userMessage: string
    if (raw.includes('credit balance') || raw.includes('too low') || raw.includes('billing')) {
      userMessage = 'رصيد API منتهي — يرجى إضافة رصيد على console.anthropic.com'
    } else if (raw.includes('invalid x-api-key') || raw.includes('authentication')) {
      userMessage = 'مفتاح Anthropic API غير صحيح — تحقق من ANTHROPIC_API_KEY في إعدادات Vercel'
    } else if (raw.includes('not set')) {
      userMessage = 'مفتاح Anthropic API غير موجود — أضف ANTHROPIC_API_KEY في إعدادات Vercel'
    } else if (raw.includes('model') && raw.includes('not found')) {
      userMessage = 'النموذج غير متاح — تحقق من اسم الموديل في lib/claude.ts'
    } else if (raw.includes('rate limit') || raw.includes('429')) {
      userMessage = 'تجاوزت الحد المسموح — حاول مرة أخرى بعد دقيقة'
    } else {
      userMessage = `خطأ في الذكاء الاصطناعي: ${detail}`
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
      warning: `تم توليد السيرة الذاتية لكن لم يتم حفظها: ${detail}`,
    })
  }
}
