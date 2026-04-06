'use client'

import Link from 'next/link'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser()

  return (
    <nav className="bg-white border-b border-oat sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-off-black rounded-btn flex items-center justify-center">
              <span className="text-white font-bold text-sm">و</span>
            </div>
            <span className="text-lg font-bold text-off-black tracking-tighter-xs">وظيفني</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-mid-neutral">
            <Link href="/#features" className="hover:text-off-black transition-colors">المميزات</Link>
            <Link href="/#pricing" className="hover:text-off-black transition-colors">الأسعار</Link>
            {isSignedIn && (
              <Link href="/dashboard" className="hover:text-off-black transition-colors">لوحة التحكم</Link>
            )}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {!isLoaded ? (
              <div className="w-8 h-8 rounded-full bg-oat animate-pulse" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/builder" className="btn-primary text-xs px-4 py-2">
                  + سيرة جديدة
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="text-sm text-mid-neutral hover:text-off-black px-4 py-2 transition-colors">
                    تسجيل الدخول
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-primary text-xs px-4 py-2">
                    ابدأ مجاناً
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
