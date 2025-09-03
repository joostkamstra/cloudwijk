import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { I18nProviderClient } from '@/lib/i18n/client'
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
    default: 'Cloudwijk — Europees AI-Infrastructuurplatform',
    template: '%s | Cloudwijk'
  },
  description: 'Het leidende Europese AI-infrastructuurplatform. GPU-cloud, CloudwikOS platform en Managed AI Services. Volledig EU-soeverein met compliance by design.',
  keywords: [
    'AI infrastructure',
    'GPU cloud',
    'AI inference',
    'EU sovereign AI',
    'European AI platform',
    'AI computing',
    'machine learning infrastructure',
    'NVIDIA GPU',
    'AI model hosting',
    'EU AI Act compliant',
    'data sovereignty',
    'CloudwikOS',
    'managed AI services',
    'European datacenter'
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
    title: 'Cloudwijk — Europees AI-Infrastructuurplatform',
    description: 'Het leidende Europese AI-infrastructuurplatform. GPU-cloud tot Managed AI Services, volledig EU-soeverein.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Cloudwijk — Europees AI Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloudwijk — Europees AI-Infrastructuurplatform',
    description: 'Het leidende Europese AI-infrastructuurplatform. GPU-cloud tot Managed AI Services.',
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
  return (
    <html lang="nl" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">
        <SkipLink />
        <I18nProviderClient>
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