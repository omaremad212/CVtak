import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">و</span>
            </div>
            <span className="text-2xl font-extrabold text-blue-600">وظيفني</span>
          </a>
          <p className="text-slate-500 mt-2 text-sm">سجل دخولك للمتابعة</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
