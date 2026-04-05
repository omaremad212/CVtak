import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
    }

    const user = await currentUser()
    const email = user?.emailAddresses?.[0]?.emailAddress

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: { userId },
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/dashboard?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'حدث خطأ في عملية الدفع' }, { status: 500 })
  }
}
