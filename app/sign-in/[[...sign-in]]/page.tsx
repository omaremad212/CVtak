import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'
import { AuroraBackground } from '@/components/ui/aurora-background'

export default function SignInPage() {
  return (
    <AuroraBackground className="bg-zinc-50" showRadialGradient={true} dir="rtl">
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex justify-center">
            <Image src="/logo.png" alt="وظيفني" width={160} height={48} className="h-12 w-auto object-contain" style={{ filter: 'brightness(0)' }} />
          </a>
          <p className="text-muted text-sm mt-2">سجل دخولك للمتابعة</p>
        </div>
        <SignIn />
      </div>
    </AuroraBackground>
  )
}
