import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase'
import DashboardClient from './DashboardClient'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const { success, canceled } = await searchParams
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const supabase = createServerSupabase()

  const { data: cvs } = await supabase
    .from('cvs')
    .select('id, title, created_at, form_data')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  const cvCount = cvs?.length ?? 0

  return (
    <DashboardClient
      cvs={cvs ?? []}
      cvCount={cvCount}
      showSuccess={success === 'true'}
      showCanceled={canceled === 'true'}
    />
  )
}
