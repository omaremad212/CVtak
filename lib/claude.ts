import Anthropic from '@anthropic-ai/sdk'
import type { CVFormData } from './supabase'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateCV(formData: CVFormData): Promise<string> {
  const userDataText = `
الاسم الكامل: ${formData.fullName}
المسمى الوظيفي المطلوب: ${formData.jobTitle}
المدينة: ${formData.city || 'غير محدد'}
البريد الإلكتروني: ${formData.email || 'غير محدد'}
الهاتف: ${formData.phone || 'غير محدد'}
${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ''}

الخبرات السابقة:
${formData.experience}

المهارات:
${formData.skills}

التعليم:
${formData.education}
  `.trim()

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `أنت خبير في كتابة السير الذاتية الاحترافية. اكتب سيرة ذاتية احترافية باللغة العربية للشخص التالي:

${userDataText}

يجب أن تكون السيرة الذاتية:
1. منظمة بشكل احترافي مع عناوين واضحة لكل قسم
2. مناسبة لسوق العمل المصري
3. تبرز نقاط القوة والمهارات
4. مكتوبة بأسلوب رسمي ومحترف
5. شاملة لجميع الأقسام المهمة (الملخص المهني، الخبرات، المهارات، التعليم)

قدم السيرة الذاتية بتنسيق HTML نظيف مع تنسيق مناسب للطباعة والعرض. استخدم وسوم HTML مناسبة مثل h1، h2، p، ul، li. لا تضف أي CSS inline أو شروحات، فقط محتوى HTML النظيف.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  return content.text
}
