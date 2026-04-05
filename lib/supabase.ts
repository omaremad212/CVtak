import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function createServerSupabase() {
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
  experience: string
  skills: string
  education: string
  linkedin?: string
  phone?: string
  email?: string
  city?: string
}
