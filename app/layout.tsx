import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Wazzifni — AI-Powered CV Builder',
  description: 'Create a professional English CV in minutes using advanced AI. Free to start.',
  keywords: 'CV, resume, AI, professional, job application, career',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="antialiased bg-cream text-off-black" style={{ fontFamily: "'Inter', sans-serif" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
