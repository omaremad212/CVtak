import Groq from 'groq-sdk'
import type { CVFormData } from './supabase'

const MODEL = 'llama-3.3-70b-versatile'

function getGroq(): Groq {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) throw new Error('GROQ_API_KEY environment variable is not set')
  return new Groq({ apiKey })
}

export async function generateCV(formData: CVFormData): Promise<string> {
  const groq = getGroq()

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
  ].filter(Boolean).join('\n').trim()

  const completion = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [
      {
        role: 'system',
        content: 'أنت خبير في كتابة السير الذاتية الاحترافية باللغة العربية. تكتب سيراً ذاتية منظمة ومناسبة لسوق العمل المصري.',
      },
      {
        role: 'user',
        content: `اكتب سيرة ذاتية احترافية باللغة العربية للشخص التالي:

${userDataText}

يجب أن تكون السيرة الذاتية:
1. منظمة بشكل احترافي مع عناوين واضحة لكل قسم
2. مناسبة لسوق العمل المصري
3. تبرز نقاط القوة والمهارات
4. مكتوبة بأسلوب رسمي ومحترف
5. شاملة لجميع الأقسام المهمة (الملخص المهني، الخبرات، المهارات، التعليم)

قدم السيرة الذاتية بتنسيق HTML نظيف. استخدم وسوم h1، h2، p، ul، li فقط. لا تضف CSS أو شروحات أو markdown.`,
      },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error('Groq returned an empty response')

  return content
}
