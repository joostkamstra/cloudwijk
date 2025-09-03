import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { I18nProviderClient } from '@/lib/i18n/client'
import { getCurrentLocale } from '@/lib/i18n/server'
import { Toaster } from '@/components/ui/toaster'
import { SkipLink } from '@/components/accessibility/skip-link'
import ErrorBoundary from '@/components/error/error-boundary'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'], 
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cloudwijk.vercel.app'),
  title: {
    default: 'Cloudwijk — EU Sovereign AI Platform',
    template: '%s | Cloudwijk'
  },
  description: 'EU-soeverein managed AI platform. EU AI Act compliance checker en complete AI-oplossingen voor Nederlandse organisaties.',
  keywords: [
    'EU AI Act',
    'AI compliance',
    'EU sovereign AI',
    'GDPR compliant AI',
    'Dutch AI platform',
    'AI Act checker',
    'European AI solutions',
    'AI governance',
    'compliance assessment',
    'regulatory technology'
  ],
  authors: [{ name: 'Cloudwijk', url: 'https://cloudwijk.eu' }],
  creator: 'Cloudwijk',
  publisher: 'Cloudwijk',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: ['en_US'],
    url: '/',
    siteName: 'Cloudwijk',
    title: 'Cloudwijk — EU Sovereign AI Platform',
    description: 'EU-soeverein managed AI platform. EU AI Act compliance checker en complete AI-oplossingen.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Cloudwijk — EU Sovereign AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloudwijk — EU Sovereign AI Platform',
    description: 'EU-soeverein managed AI platform. EU AI Act compliance checker.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = 'nl'

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">
        <SkipLink />
        <I18nProviderClient locale={locale}>
          <ErrorBoundary>
            {children}
            <Toaster />
          </ErrorBoundary>
        </I18nProviderClient>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}