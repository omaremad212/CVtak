import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'وظيفني — منصة السيرة الذاتية بالذكاء الاصطناعي',
  description: 'أنشئ سيرتك الذاتية الاحترافية بالعربية في دقائق باستخدام الذكاء الاصطناعي',
  keywords: 'سيرة ذاتية, وظيفة, ذكاء اصطناعي, CV, مصر',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-arabic antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
