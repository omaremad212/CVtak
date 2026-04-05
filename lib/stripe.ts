import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const PLANS = {
  FREE: {
    name: 'مجاني',
    nameEn: 'Free',
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
    nameEn: 'Pro',
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
