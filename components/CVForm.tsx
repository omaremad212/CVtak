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

  const handleChange = (field: keyof CVFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    }

  const fieldClass = (field: keyof CVFormData) =>
    `input-base ${errors[field] ? '!border-red-400 !ring-red-400 bg-red-50' : ''}`

  const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-xs font-semibold text-dark-neutral uppercase tracking-widest mb-1.5">
      {children}{required && <span className="text-orange mr-1">*</span>}
    </label>
  )

  const sectionLabel = (n: string, title: string) => (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono text-orange">{n}</span>
      <span className="text-xs font-semibold text-muted uppercase tracking-widest">{title}</span>
      <div className="flex-1 h-px bg-oat" />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
      {/* Personal Info */}
      <div>
        {sectionLabel('01', 'المعلومات الشخصية')}
        <div className="space-y-4">
          <div>
            <Label required>الاسم الكامل</Label>
            <input type="text" value={formData.fullName} onChange={handleChange('fullName')}
              placeholder="مثال: أحمد محمد علي" className={fieldClass('fullName')} />
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <Label required>المسمى الوظيفي المطلوب</Label>
            <input type="text" value={formData.jobTitle} onChange={handleChange('jobTitle')}
              placeholder="مثال: مطور برمجيات، محاسب، مهندس" className={fieldClass('jobTitle')} />
            {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>رقم الهاتف</Label>
              <input type="tel" value={formData.phone} onChange={handleChange('phone')}
                placeholder="01XXXXXXXXX" className={fieldClass('phone')} />
            </div>
            <div>
              <Label>البريد الإلكتروني</Label>
              <input type="email" value={formData.email} onChange={handleChange('email')}
                placeholder="example@email.com" className={fieldClass('email')} />
            </div>
          </div>

          <div>
            <Label>المدينة</Label>
            <input type="text" value={formData.city} onChange={handleChange('city')}
              placeholder="مثال: القاهرة، الإسكندرية" className={fieldClass('city')} />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div>
        {sectionLabel('02', 'الخبرات العملية')}
        <Label required>الخبرات السابقة</Label>
        <textarea value={formData.experience} onChange={handleChange('experience')} rows={5}
          placeholder="اكتب خبراتك العملية السابقة بالتفصيل&#10;مثال: عملت مطوراً في شركة XYZ لمدة 3 سنوات..."
          className={`${fieldClass('experience')} resize-none`} />
        {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
      </div>

      {/* Skills */}
      <div>
        {sectionLabel('03', 'المهارات')}
        <Label required>المهارات</Label>
        <textarea value={formData.skills} onChange={handleChange('skills')} rows={3}
          placeholder="مثال: JavaScript، Python، إدارة المشاريع، التواصل الفعال"
          className={`${fieldClass('skills')} resize-none`} />
        {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
      </div>

      {/* Education */}
      <div>
        {sectionLabel('04', 'التعليم')}
        <Label required>المؤهلات الدراسية</Label>
        <textarea value={formData.education} onChange={handleChange('education')} rows={3}
          placeholder="مثال: بكالوريوس هندسة حاسبات - جامعة القاهرة - 2020"
          className={`${fieldClass('education')} resize-none`} />
        {errors.education && <p className="mt-1 text-xs text-red-500">{errors.education}</p>}
      </div>

      {/* LinkedIn */}
      <div>
        <Label>رابط LinkedIn (اختياري)</Label>
        <input type="url" value={formData.linkedin} onChange={handleChange('linkedin')}
          placeholder="https://linkedin.com/in/yourprofile"
          className={`${fieldClass('linkedin')}`} dir="ltr" />
      </div>

      {/* Submit */}
      <button type="submit" disabled={isGenerating}
        className="w-full bg-off-black text-white font-semibold py-4 px-6 rounded-btn
                   transition-transform duration-150 hover:scale-[1.02] active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center gap-3 text-sm">
        {isGenerating ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            جاري إنشاء سيرتك الذاتية...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            توليد السيرة الذاتية بالذكاء الاصطناعي
          </>
        )}
      </button>
    </form>
  )
}
