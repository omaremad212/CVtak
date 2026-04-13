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
    fullName:    initialData?.fullName    ?? '',
    jobTitle:    initialData?.jobTitle    ?? '',
    city:        initialData?.city        ?? '',
    email:       initialData?.email       ?? '',
    phone:       initialData?.phone       ?? '',
    linkedin:    initialData?.linkedin    ?? '',
    github:      initialData?.github      ?? '',
    behance:     initialData?.behance     ?? '',
    portfolio:   initialData?.portfolio   ?? '',
    summary:     initialData?.summary     ?? '',
    education:   initialData?.education   ?? '',
    experience:  initialData?.experience  ?? '',
    internships: initialData?.internships ?? '',
    languages:   initialData?.languages   ?? '',
    skills:      initialData?.skills      ?? '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CVFormData, string>>>({})

  const validate = (): boolean => {
    const e: Partial<Record<keyof CVFormData, string>> = {}
    if (!formData.fullName.trim())   e.fullName   = 'Full name is required'
    if (!formData.jobTitle.trim())   e.jobTitle   = 'Job title is required'
    if (!formData.summary.trim())    e.summary    = 'Summary is required'
    if (!formData.education.trim())  e.education  = 'Education is required'
    if (!formData.experience.trim()) e.experience = 'Professional experience is required'
    if (!formData.skills.trim())     e.skills     = 'Skills are required'
    setErrors(e)
    return Object.keys(e).length === 0
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

  const fc = (field: keyof CVFormData) =>
    `input-base ${errors[field] ? '!border-red-400 !ring-red-400 bg-red-50' : ''}`

  const SectionHeader = ({ n, title }: { n: string; title: string }) => (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono text-orange">{n}</span>
      <span className="text-xs font-semibold text-muted uppercase tracking-widest">{title}</span>
      <div className="flex-1 h-px bg-oat" />
    </div>
  )

  const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-xs font-semibold text-dark-neutral uppercase tracking-widest mb-1.5">
      {children}{required && <span className="text-orange ml-1">*</span>}
    </label>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* 01 Personal Info */}
      <div>
        <SectionHeader n="01" title="Personal Info" />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label required>Full Name</Label>
              <input type="text" value={formData.fullName} onChange={handleChange('fullName')}
                placeholder="e.g. John Smith" className={fc('fullName')} />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>
            <div>
              <Label required>Job Title</Label>
              <input type="text" value={formData.jobTitle} onChange={handleChange('jobTitle')}
                placeholder="e.g. Software Engineer" className={fc('jobTitle')} />
              {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Phone</Label>
              <input type="tel" value={formData.phone} onChange={handleChange('phone')}
                placeholder="+1 555 000 0000" className={fc('phone')} />
            </div>
            <div>
              <Label>Email</Label>
              <input type="email" value={formData.email} onChange={handleChange('email')}
                placeholder="you@email.com" className={fc('email')} />
            </div>
          </div>

          <div>
            <Label>City / Location</Label>
            <input type="text" value={formData.city} onChange={handleChange('city')}
              placeholder="e.g. Cairo, Egypt" className={fc('city')} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>LinkedIn</Label>
              <input type="url" value={formData.linkedin} onChange={handleChange('linkedin')}
                placeholder="linkedin.com/in/yourprofile" className={fc('linkedin')} />
            </div>
            <div>
              <Label>GitHub</Label>
              <input type="url" value={formData.github} onChange={handleChange('github')}
                placeholder="github.com/yourname" className={fc('github')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Behance</Label>
              <input type="url" value={formData.behance} onChange={handleChange('behance')}
                placeholder="behance.net/yourname" className={fc('behance')} />
            </div>
            <div>
              <Label>Portfolio</Label>
              <input type="url" value={formData.portfolio} onChange={handleChange('portfolio')}
                placeholder="yourportfolio.com" className={fc('portfolio')} />
            </div>
          </div>
        </div>
      </div>

      {/* 02 Summary */}
      <div>
        <SectionHeader n="02" title="Summary" />
        <Label required>Professional Summary</Label>
        <textarea value={formData.summary} onChange={handleChange('summary')} rows={4}
          placeholder="Brief overview of your experience, skills, and career goals..."
          className={`${fc('summary')} resize-none`} />
        {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary}</p>}
      </div>

      {/* 03 Education */}
      <div>
        <SectionHeader n="03" title="Education" />
        <Label required>Education Details</Label>
        <textarea value={formData.education} onChange={handleChange('education')} rows={4}
          placeholder={`e.g.\n(2020-2024)\n• Bachelor of Science in Computer Science, MIT\n• Cumulative GPA (3.8)`}
          className={`${fc('education')} resize-none`} />
        {errors.education && <p className="mt-1 text-xs text-red-500">{errors.education}</p>}
      </div>

      {/* 04 Professional Experience */}
      <div>
        <SectionHeader n="04" title="Professional Experience" />
        <Label required>Work History</Label>
        <textarea value={formData.experience} onChange={handleChange('experience')} rows={6}
          placeholder={`e.g.\nSoftware Engineer - Google (June 2022 - Present)\n• Developed scalable APIs serving 10M+ users\n• Led team of 5 engineers\n\nJunior Developer - Startup (Jan 2021 - May 2022)\n• Built React dashboard used by 500+ clients`}
          className={`${fc('experience')} resize-none`} />
        {errors.experience && <p className="mt-1 text-xs text-red-500">{errors.experience}</p>}
      </div>

      {/* 05 Internships & Certificates */}
      <div>
        <SectionHeader n="05" title="Internships & Certificates" />
        <Label>Internships & Certificates (optional)</Label>
        <textarea value={formData.internships} onChange={handleChange('internships')} rows={3}
          placeholder={`e.g.\n• Advanced React Course – Udemy (Jan 2024)\n• AWS Solutions Architect – Amazon (Mar 2023)`}
          className="input-base resize-none" />
      </div>

      {/* 06 Languages */}
      <div>
        <SectionHeader n="06" title="Languages" />
        <Label>Languages & Proficiency (optional)</Label>
        <textarea value={formData.languages} onChange={handleChange('languages')} rows={2}
          placeholder={`e.g.\nEnglish: Native | Arabic: Fluent (C1) | French: Intermediate (B1)`}
          className="input-base resize-none" />
      </div>

      {/* 07 Skills */}
      <div>
        <SectionHeader n="07" title="Skills" />
        <Label required>Skills</Label>
        <textarea value={formData.skills} onChange={handleChange('skills')} rows={3}
          placeholder="e.g. JavaScript, React, Node.js, Python, SQL, Team Leadership, Communication"
          className={`${fc('skills')} resize-none`} />
        {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
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
            Generating your CV...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate CV with AI
          </>
        )}
      </button>
    </form>
  )
}
