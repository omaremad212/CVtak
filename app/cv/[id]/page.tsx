import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase'
import CVDetailClient from './CVDetailClient'

export default async function CVDetailPage({ params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const supabase = createServerSupabase()
  const { data: cv, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single()

  if (error || !cv) notFound()

  return <CVDetailClient cv={cv} />
}
