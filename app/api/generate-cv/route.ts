import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateCV } from '@/lib/claude'
import { createServerSupabase } from '@/lib/supabase'
import type { CVFormData } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      )
    }

    const formData: CVFormData = await req.json()

    if (!formData.fullName || !formData.jobTitle || !formData.experience || !formData.skills || !formData.education) {
      return NextResponse.json(
        { error: 'جميع الحقول المطلوبة يجب ملؤها' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabase()

    const { count } = await supabase
      .from('cvs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (!subscription && (count ?? 0) >= 1) {
      return NextResponse.json(
        {
          error: 'لقد وصلت إلى الحد المجاني (سيرة ذاتية واحدة). قم بالترقية إلى الخطة الاحترافية للحصول على سير ذاتية غير محدودة.',
          code: 'LIMIT_REACHED',
        },
        { status: 403 }
      )
    }

    const cvContent = await generateCV(formData)

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

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ في حفظ السيرة الذاتية' },
        { status: 500 }
      )
    }

    return NextResponse.json({ cv })
  } catch (error) {
    console.error('Generate CV error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}
