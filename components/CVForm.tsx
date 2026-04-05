'use client'

import { useState } from 'react'
import type { CVFormData } from '@/lib/supabase'

interface CVFormProps {
  onGenerate: (data: CVFormData) => Promise<void>
  isGenerating: boolean
  initialData?: Partial<CVFormData>
}

export default function CVForm({ onGenerate, isGenerating, initialData }: CVFormProps) {
  const [formData, setFormData] = useState<CVFormData>({
    fullName: initialData?.fullName || '',
    jobTitle: initialData?.jobTitle || '',
    experience: initialData?.experience || '',
    skills: initialData?.skills || '',
    education: initialData?.education || '',
    linkedin: initialData?.linkedin || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    city: initialData?.city || '',
  })
  const [errors, setErrors] = useState<Partial<CVFormData>>({})

  const validate = (): boolean => {
    const newErrors: Partial<CVFormData> = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم الكامل مطلوب'
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'المسمى الوظيفي مطلوب'
    if (!formData.experience.trim()) newErrors.experience = 'الخبرات السابقة مطلوبة'
    if (!formData.skills.trim()) newErrors.skills = 'المهارات مطلوبة'
    if (!formData.education.trim()) newErrors.education = 'التعليم مطلوب'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await onGenerate(formData)
  }

  const handleChange = (field: keyof CVFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const inputClass = (field: keyof CVFormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      errors[field]
        ? 'border-red-400 bg-red-50'
        : 'border-slate-200 bg-white hover:border-blue-300'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* Personal Info */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">١</span>
          المعلومات الشخصية
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              placeholder="مثال: أحمد محمد علي"
              className={inputClass('fullName')}
            />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              المسمى الوظيفي المطلوب <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={handleChange('jobTitle')}
              placeholder="مثال: مطور برمجيات، محاسب، مهندس"
              className={inputClass('jobTitle')}
            />
            {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                placeholder="01XXXXXXXXX"
                className={inputClass('phone')}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="example@email.com"
                className={inputClass('email')}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              المدينة
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={handleChange('city')}
              placeholder="مثال: القاهرة، الإسكندرية"
              className={inputClass('city')}
            />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">٢</span>
          الخبرات العملية
        </h3>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            الخبرات السابقة <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.experience}
            onChange={handleChange('experience')}
            placeholder="اكتب خبراتك العملية السابقة بالتفصيل&#10;مثال: عملت مطوراً في شركة XYZ لمدة 3 سنوات، قمت فيها بتطوير تطبيقات الويب باستخدام React و Node.js"
            rows={5}
            className={`${inputClass('experience')} resize-none`}
          />
          {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">٣</span>
          المهارات
        </h3>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            المهارات <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.skills}
            onChange={handleChange('skills')}
            placeholder="مثال: JavaScript، Python، إدارة المشاريع، التواصل الفعال، العمل ضمن فريق"
            rows={3}
            className={`${inputClass('skills')} resize-none`}
          />
          {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">٤</span>
          التعليم
        </h3>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            المؤهلات الدراسية <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.education}
            onChange={handleChange('education')}
            placeholder="مثال: بكالوريوس هندسة حاسبات - جامعة القاهرة - 2020"
            rows={3}
            className={`${inputClass('education')} resize-none`}
          />
          {errors.education && <p className="mt-1 text-xs text-red-500">{errors.education}</p>}
        </div>
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          رابط LinkedIn (اختياري)
        </label>
        <input
          type="url"
          value={formData.linkedin}
          onChange={handleChange('linkedin')}
          placeholder="https://linkedin.com/in/yourprofile"
          className={inputClass('linkedin')}
          dir="ltr"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-base shadow-lg shadow-blue-200 hover:shadow-blue-300"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>جاري إنشاء سيرتك الذاتية...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>توليد السيرة الذاتية بالذكاء الاصطناعي</span>
          </>
        )}
      </button>
    </form>
  )
}
