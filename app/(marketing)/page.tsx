import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'
import { Trust } from '@/components/marketing/trust'
import { Story } from '@/components/marketing/story'
import { CTA } from '@/components/marketing/cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Trust />
      <Story />
      <CTA />
    </>
  )
}