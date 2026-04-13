import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}

export function createServerSupabase(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type CV = {
  id: string
  user_id: string
  title: string
  content: string
  form_data: CVFormData
  created_at: string
  updated_at: string
}

export type CVFormData = {
  fullName: string
  jobTitle: string
  city?: string
  email?: string
  phone?: string
  linkedin?: string
  portfolio?: string
  summary: string
  education: string
  experience: string
  internships?: string
  languages?: string
  skills: string
}
