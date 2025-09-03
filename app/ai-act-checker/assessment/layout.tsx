import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Act Assessment - Stap voor stap',
  description: 'Voer uw AI Act compliance assessment uit. Interactieve wizard om de AI Act-vereisten voor uw systeem te bepalen.',
}

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}