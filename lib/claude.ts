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

  const lines: string[] = [
    `Full Name: ${formData.fullName}`,
    `Job Title: ${formData.jobTitle}`,
    formData.city      ? `City: ${formData.city}` : '',
    formData.email     ? `Email: ${formData.email}` : '',
    formData.phone     ? `Phone: ${formData.phone}` : '',
    formData.linkedin  ? `LinkedIn: ${formData.linkedin}` : '',
    formData.github    ? `GitHub: ${formData.github}` : '',
    formData.behance   ? `Behance: ${formData.behance}` : '',
    formData.portfolio ? `Portfolio: ${formData.portfolio}` : '',
    '',
    'SUMMARY:',
    formData.summary,
    '',
    'EDUCATION:',
    formData.education,
    '',
    'PROFESSIONAL EXPERIENCE:',
    formData.experience,
    formData.internships ? `\nINTERNSHIPS & CERTIFICATES:\n${formData.internships}` : '',
    formData.languages   ? `\nLANGUAGES:\n${formData.languages}` : '',
    '',
    'SKILLS:',
    formData.skills,
  ].filter(l => l !== undefined)

  const userDataText = lines.join('\n').trim()

  const systemPrompt = `You are a professional CV writer. You produce clean, well-formatted English CVs for international job applications.

You output ONLY valid HTML — no markdown, no explanations, no code fences.

Use exactly these HTML elements:
• <h1> — candidate name
• <p class="cv-subtitle"> — job title
• <hr> — single horizontal rule after the subtitle
• <p class="cv-contact"> — one line: City | Phone | Email | links with <a href="URL">Label</a>
• <h2> — section heading (Summary / Education / Professional Experience / Internships & Certificates / Languages / Skills)
• <p> — paragraph text
• <p class="cv-date"> — year range like (2022–2026)
• <ul><li> — bullet points. Nested <ul><li> for sub-bullets under a job.
• <div class="cv-two-col"> — two-column layout (use for Languages and Skills sections)
• <strong> — bold text inside list items

Rules:
1. Write in professional English only.
2. Enhance and expand the content using strong action verbs and quantified achievements where possible.
3. For Professional Experience: each job is a <li><strong>Title - Company (Dates)</strong> followed by a nested <ul> of accomplishments.
4. For Languages: put items side-by-side inside <div class="cv-two-col"> using <p> tags.
5. For Skills: split skills into two groups and put two <ul> lists side-by-side inside <div class="cv-two-col">.
6. Omit any section for which no data was provided.
7. Do NOT include any CSS, <style>, <head>, <body>, or <html> tags.`

  const completion = await groq.chat.completions.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Generate a professional English CV for the following person:\n\n${userDataText}`,
      },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error('Groq returned an empty response')

  // Strip any accidental code fences
  return content.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim()
}
