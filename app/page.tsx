import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'
import { Trust } from '@/components/marketing/trust'
import { Story } from '@/components/marketing/story'
import { CTA } from '@/components/marketing/cta'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1} role="main" aria-label="Hoofdinhoud">
        <Hero />
        <Features />
        <Trust />
        <Story />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}