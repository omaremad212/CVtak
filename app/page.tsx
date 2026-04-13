'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { SignUpButton } from '@clerk/nextjs'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ── Hero with Aurora ── */}
      <AuroraBackground
        className="h-auto min-h-[92vh] py-24 lg:py-36 border-b border-oat items-start justify-start bg-zinc-50"
        showRadialGradient={true}
      >
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-oat rounded-btn px-3 py-1 text-xs font-medium text-muted mb-8 bg-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              Powered by advanced AI
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-off-black leading-100 tracking-tighter-lg mb-6">
              Build your CV
              <br />
              with Artificial
              <br />
              <span className="text-orange">Intelligence</span>
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-10 max-w-xl">
              Wazzifni writes you a professional English CV tailored for global job markets — in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <SignUpButton mode="modal">
                <button className="btn-primary text-base px-7 py-3.5">
                  Create your CV free →
                </button>
              </SignUpButton>
              <Link href="#features" className="btn-outlined text-base px-7 py-3.5 bg-white/80 backdrop-blur-sm">
                See features
              </Link>
            </div>

            <p className="mt-5 text-xs text-muted">
              No credit card required · One free CV
            </p>
          </motion.div>

          {/* Hero card preview */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
            className="mt-20"
          >
            <div className="bg-white/90 backdrop-blur-sm border border-oat rounded-card overflow-hidden shadow-sm">
              <div className="bg-off-black px-8 py-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-xl leading-100 tracking-tighter-xs">John Smith</p>
                  <p className="text-sand text-sm mt-1">Senior Software Engineer</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                  <span className="text-sand text-xs">Generated</span>
                </div>
              </div>
              <div className="p-8 grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-5">
                  {['Summary', 'Professional Experience'].map((section) => (
                    <div key={section}>
                      <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3 border-b border-oat pb-2">{section}</h3>
                      <div className="space-y-2">
                        <div className="h-2 bg-cream rounded-full w-full" />
                        <div className="h-2 bg-cream rounded-full w-4/5" />
                        <div className="h-2 bg-cream rounded-full w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3 border-b border-oat pb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'Python', 'SQL'].map((s) => (
                        <span key={s} className="text-xs px-2 py-1 bg-cream border border-oat rounded-btn text-dark-neutral">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-3 border-b border-oat pb-2">Education</h3>
                    <div className="space-y-2">
                      <div className="h-2 bg-cream rounded-full w-full" />
                      <div className="h-2 bg-cream rounded-full w-3/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <span className="w-1.5 h-1.5 bg-orange rounded-full" />
              Generated in 8 seconds
            </div>
          </motion.div>
        </div>
      </AuroraBackground>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-white border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-3">Features</p>
            <h2 className="heading-section">Why Wazzifni?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '01', title: 'Advanced AI Writing', body: 'Powered by Groq\'s llama-3.3-70b model to craft a highly professional, personalized CV tailored to your experience.' },
              { label: '02', title: 'All Key Sections', body: 'Covers Summary, Education, Professional Experience, Internships & Certificates, Languages, and Skills.' },
              { label: '03', title: 'Fast & Easy', body: 'Enter your details in minutes and get a complete, print-ready CV in seconds.' },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-7"
              >
                <p className="text-xs font-mono text-orange mb-4">{f.label}</p>
                <h3 className="heading-card mb-3">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-cream border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-3">How it works</p>
            <h2 className="heading-section">Three simple steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Enter your details', desc: 'Fill in the form with your personal info, experience, education, and skills.' },
              { step: '2', title: 'Click Generate', desc: 'The AI analyzes your data and writes a professional English CV.' },
              { step: '3', title: 'Download & Share', desc: 'Print or save your CV as a PDF and start applying for jobs immediately.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-9 h-9 border border-off-black rounded-btn flex items-center justify-center text-sm font-bold text-off-black">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-off-black mb-1 tracking-tighter-xs">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-white border-b border-oat">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold text-orange uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="heading-section">Always free</h2>
          </div>
          <div className="max-w-sm">
            <div className="bg-off-black rounded-card p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-semibold text-sand uppercase tracking-widest mb-3">Free forever</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white leading-100 tracking-tighter-md">$0</span>
                  <span className="text-sand text-sm">/ always</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Unlimited CVs', 'AI-powered generation', 'All 7 CV sections', 'Live preview', 'Print to PDF'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-sand">
                    <span className="w-1 h-1 bg-orange rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <SignUpButton mode="modal">
                <button className="w-full bg-white text-off-black font-semibold py-2.5 px-5 rounded-btn text-sm transition-transform duration-150 hover:scale-105 active:scale-90">
                  Get started free →
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA with mini Aurora ── */}
      <AuroraBackground
        className="h-auto py-24 bg-zinc-50 border-b border-oat"
        showRadialGradient={false}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="bg-off-black/90 backdrop-blur-sm rounded-card p-12 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-100 tracking-tighter-md mb-4">
              Ready to land your next job?
            </h2>
            <p className="text-sand text-base mb-8">
              Create your professional CV now and start applying.
            </p>
            <SignUpButton mode="modal">
              <button className="bg-white text-off-black font-bold px-8 py-3.5 rounded-btn text-sm transition-transform duration-150 hover:scale-105 active:scale-90">
                Create your CV free →
              </button>
            </SignUpButton>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-oat py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image src="/logo.png" alt="Wazzifni" width={140} height={42} className="h-10 w-auto object-contain" />
            <p className="text-xs text-muted">© 2025 Wazzifni. All rights reserved.</p>
            <div className="flex gap-5 text-xs text-muted">
              <Link href="#" className="hover:text-off-black transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-off-black transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
