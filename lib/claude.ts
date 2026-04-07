import Anthropic from '@anthropic-ai/sdk'
import type { CVFormData } from './supabase'

// Primary model, falls back to 3.5-sonnet if 4-series not available on the key
const MODEL = 'claude-sonnet-4-5'

function getAnthropic(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY environment variable is not set')
  return new Anthropic({ apiKey })
}

export async function generateCV(formData: CVFormData): Promise<string> {
  const anthropic = getAnthropic()

  const userDataText = [
    `الاسم الكامل: ${formData.fullName}`,
    `المسمى الوظيفي المطلوب: ${formData.jobTitle}`,
    `المدينة: ${formData.city || 'غير محدد'}`,
    `البريد الإلكتروني: ${formData.email || 'غير محدد'}`,
    `الهاتف: ${formData.phone || 'غير محدد'}`,
    formData.linkedin ? `LinkedIn: ${formData.linkedin}` : '',
    '',
    'الخبرات السابقة:',
    formData.experience,
    '',
    'المهارات:',
    formData.skills,
    '',
    'التعليم:',
    formData.education,
  ].filter(line => line !== undefined).join('\n').trim()

  const message = await anthropic.messages.create({
    model: MODEL,
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

قدم السيرة الذاتية بتنسيق HTML نظيف. استخدم وسوم h1، h2، p، ul، li فقط. لا تضف CSS أو شروحات.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error(`Unexpected Claude response type: ${content.type}`)

  return content.text
}
