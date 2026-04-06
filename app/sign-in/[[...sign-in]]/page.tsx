import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 bg-off-black rounded-btn flex items-center justify-center">
              <span className="text-white font-bold">و</span>
            </div>
            <span className="text-xl font-bold text-off-black tracking-tighter-xs">وظيفني</span>
          </a>
          <p className="text-muted text-sm mt-2">سجل دخولك للمتابعة</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
