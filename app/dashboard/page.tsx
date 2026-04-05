import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase'
import DashboardClient from './DashboardClient'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string }
}) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const supabase = createServerSupabase()

  const [{ data: cvs }, { data: subscription }] = await Promise.all([
    supabase
      .from('cvs')
      .select('id, title, created_at, form_data')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single(),
  ])

  const isPro = !!subscription
  const cvCount = cvs?.length ?? 0

  return (
    <DashboardClient
      cvs={cvs ?? []}
      isPro={isPro}
      cvCount={cvCount}
      showSuccess={searchParams.success === 'true'}
      showCanceled={searchParams.canceled === 'true'}
    />
  )
}
