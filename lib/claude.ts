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

  // Normalize text: collapse broken parentheses spread across multiple lines
  // e.g. "Title (\n08/2019\n)" → "Title (08/2019)"
  function norm(s: string): string {
    return s
      .replace(/\(\s*\n+\s*/g, '(')   // "(\n  text" → "(text"
      .replace(/\s*\n+\s*\)/g, ')')   // "text\n)" → "text)"
      .replace(/\s*\n+\s*-\s*/g, ' - ') // "Title\n- Company" → "Title - Company"
  }

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
    norm(formData.experience),
    formData.internships ? `\nINTERNSHIPS & CERTIFICATES:\n${norm(formData.internships)}` : '',
    formData.languages   ? `\nLANGUAGES:\n${formData.languages}` : '',
    '',
    'SKILLS:',
    formData.skills,
  ].filter(l => l !== undefined)

  const userDataText = lines.join('\n').trim()

  const systemPrompt = `You are a CV formatter. Your only job is to convert the user's raw data into clean HTML. You do NOT rewrite, improve, embellish, expand, or change the user's words in any way.

You output ONLY valid HTML — no markdown, no explanations, no code fences.

HTML elements to use:
• <h1> — candidate name (exactly as written)
• <p class="cv-subtitle"> — job title (exactly as written)
• <hr> — single horizontal rule after the subtitle
• <p class="cv-contact"> — one line: City | Phone | Email | links as <a href="URL">Label</a>
• <h2> — section heading: Summary / Education / Professional Experience / Internships & Certificates / Languages / Skills
• <p> — paragraph text
• <p class="cv-date"> — date/year range (e.g. 2022–2026)
• <ul><li> — bullet points. Nested <ul><li> for sub-bullets under a job entry.
• <div class="cv-two-col"> — two-column grid (use for Languages and Skills)
• <strong> — bold text for job titles / certificate names

STRICT RULES — follow exactly:
1. Copy the user's text verbatim. Do NOT reword, add, remove, or reorder anything.
2. If the user writes "Microsoft Word & Excel" as ONE item, it stays as ONE <li>. Never split a single item into multiple lines or bullets.
3. Each line / comma-separated skill the user writes becomes exactly one <li> — nothing more, nothing less.
4. For Professional Experience: each job MUST be <li><strong>Title - Company (Dates)</strong> — the entire title+company+dates on ONE single line inside <strong>, never split across lines or broken by a newline. Then a nested <ul> with one <li> per bullet point.
5. For Internships & Certificates: each entry is one <li><strong>Name – Provider (Date)</strong> — Description</li> — everything on ONE single line. No newlines inside any <li>.
6. For Languages: <div class="cv-two-col"> with one <p> per language entry.
7. For Skills: divide the user's skill items roughly in half, put first half in a <ul> and second half in another <ul>, both inside <div class="cv-two-col">.
8. Omit any section where no data was provided.
9. Do NOT add CSS, <style>, <head>, <body>, or <html> tags.`

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
