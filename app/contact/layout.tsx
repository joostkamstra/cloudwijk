import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Neem contact op',
  description: 'Neem contact op met Cloudwijk voor AI Act compliance vragen. Plan een gesprek of stuur een bericht voor persoonlijke begeleiding.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}