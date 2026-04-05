import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  }
  return _stripe
}

export const PLANS = {
  FREE: {
    name: 'مجاني',
    price: 0,
    currency: 'EGP',
    cvLimit: 1,
    features: [
      'إنشاء سيرة ذاتية واحدة',
      'توليد بالذكاء الاصطناعي',
      'معاينة مباشرة',
    ],
  },
  PRO: {
    name: 'احترافي',
    price: 29,
    currency: 'EGP',
    cvLimit: Infinity,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    features: [
      'سير ذاتية غير محدودة',
      'تحميل PDF',
      'تخصيص متقدم',
      'أولوية في الدعم',
    ],
  },
}
