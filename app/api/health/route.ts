import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import Groq from 'groq-sdk'

export async function GET() {
  const results: Record<string, { ok: boolean; detail: string }> = {}

  // 1. Check env vars
  results.env = {
    ok: !!(
      process.env.GROQ_API_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ),
    detail: JSON.stringify({
      GROQ_API_KEY: process.env.GROQ_API_KEY ? `set (${process.env.GROQ_API_KEY.slice(0, 10)}...)` : 'MISSING',
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'MISSING',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'set' : 'MISSING',
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'set' : 'MISSING',
    }),
  }

  // 2. Check Clerk auth
  try {
    const { userId } = await auth()
    results.clerk = { ok: true, detail: userId ? `authenticated: ${userId}` : 'not signed in' }
  } catch (e) {
    results.clerk = { ok: false, detail: String(e) }
  }

  // 3. Check Supabase connection + tables
  try {
    const supabase = createServerSupabase()
    const { error } = await supabase.from('cvs').select('id').limit(1)
    if (error) throw error
    results.supabase_cvs = { ok: true, detail: 'cvs table accessible' }
  } catch (e) {
    results.supabase_cvs = { ok: false, detail: String(e) }
  }

  try {
    const supabase = createServerSupabase()
    const { error } = await supabase.from('subscriptions').select('id').limit(1)
    if (error) throw error
    results.supabase_subscriptions = { ok: true, detail: 'subscriptions table accessible' }
  } catch (e) {
    results.supabase_subscriptions = { ok: false, detail: String(e) }
  }

  // 4. Check Groq API key validity
  try {
    if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY not set')
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    // Lightweight check — list models
    await groq.models.list()
    results.groq = { ok: true, detail: 'API key valid' }
  } catch (e: unknown) {
    const err = e as { status?: number; message?: string }
    results.groq = {
      ok: false,
      detail: `status=${err.status ?? 'n/a'} ${err.message ?? String(e)}`,
    }
  }

  const allOk = Object.values(results).every(r => r.ok)

  return NextResponse.json({ allOk, results }, { status: allOk ? 200 : 500 })
}
