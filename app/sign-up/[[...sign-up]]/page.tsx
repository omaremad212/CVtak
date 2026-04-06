import { SignUp } from '@clerk/nextjs'
import { AuroraBackground } from '@/components/ui/aurora-background'

export default function SignUpPage() {
  return (
    <AuroraBackground className="bg-zinc-50" showRadialGradient={true} dir="rtl">
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 bg-off-black rounded-btn flex items-center justify-center">
              <span className="text-white font-bold">و</span>
            </div>
            <span className="text-xl font-bold text-off-black tracking-tighter-xs">وظيفني</span>
          </a>
          <p className="text-muted text-sm mt-2">أنشئ حسابك مجاناً الآن</p>
        </div>
        <SignUp />
      </div>
    </AuroraBackground>
  )
}
