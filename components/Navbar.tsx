'use client'

import Link from 'next/link'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser()

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">و</span>
            </div>
            <span className="text-xl font-bold text-blue-600">وظيفني</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/#features" className="hover:text-blue-600 transition-colors">المميزات</Link>
            <Link href="/#pricing" className="hover:text-blue-600 transition-colors">الأسعار</Link>
            {isSignedIn && (
              <Link href="/dashboard" className="hover:text-blue-600 transition-colors">لوحة التحكم</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {!isLoaded ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
            ) : isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/builder"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  + سيرة ذاتية جديدة
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="text-slate-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors">
                    تسجيل الدخول
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
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
