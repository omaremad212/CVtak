import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateCV } from '@/lib/claude'
import { createServerSupabase } from '@/lib/supabase'
import type { CVFormData } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  // 1. Auth
  let userId: string
  try {
    const session = await auth()
    if (!session.userId) {
      return NextResponse.json({ error: 'يجب تسجيل الدخول أولاً' }, { status: 401 })
    }
    userId = session.userId
  } catch {
    return NextResponse.json({ error: 'خطأ في التحقق من الهوية' }, { status: 401 })
  }

  // 2. Parse body
  let formData: CVFormData
  try {
    formData = await req.json()
  } catch {
    return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
  }

  if (!formData.fullName || !formData.jobTitle || !formData.experience || !formData.skills || !formData.education) {
    return NextResponse.json({ error: 'جميع الحقول المطلوبة يجب ملؤها' }, { status: 400 })
  }

  // 3. Check free tier limit (skip gracefully if Supabase not configured)
  let isPro = false
  try {
    const supabase = createServerSupabase()

    const [{ count }, { data: subscription }] = await Promise.all([
      supabase.from('cvs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('subscriptions').select('status').eq('user_id', userId).eq('status', 'active').single(),
    ])

    isPro = !!subscription

    if (!isPro && (count ?? 0) >= 1) {
      return NextResponse.json(
        {
          error: 'لقد وصلت إلى الحد المجاني (سيرة ذاتية واحدة). قم بالترقية إلى الخطة الاحترافية للحصول على سير ذاتية غير محدودة.',
          code: 'LIMIT_REACHED',
        },
        { status: 403 }
      )
    }
  } catch (dbError) {
    console.error('Supabase check error (non-fatal):', dbError)
    // If tables don't exist yet, continue — don't block CV generation
  }

  // 4. Generate CV with Claude
  let cvContent: string
  try {
    cvContent = await generateCV(formData)
  } catch (aiError: unknown) {
    console.error('Claude API error:', aiError)
    const msg = aiError instanceof Error ? aiError.message : String(aiError)
    if (msg.includes('API key') || msg.includes('auth')) {
      return NextResponse.json({ error: 'خطأ في إعداد الذكاء الاصطناعي — تحقق من ANTHROPIC_API_KEY' }, { status: 500 })
    }
    return NextResponse.json({ error: 'فشل توليد السيرة الذاتية. الرجاء المحاولة مرة أخرى.' }, { status: 500 })
  }

  // 5. Save to Supabase
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
  } catch (saveError) {
    console.error('Supabase save error:', saveError)
    // Return the generated content even if saving fails
    return NextResponse.json({
      cv: {
        id: null,
        content: cvContent,
        title: `${formData.jobTitle} - ${formData.fullName}`,
      },
      warning: 'تم توليد السيرة الذاتية لكن لم يتم حفظها. تأكد من إعداد Supabase.',
    })
  }
}
