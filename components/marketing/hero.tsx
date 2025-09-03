'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/client'

export function Hero() {
  const t = useI18n()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cloudwijk-blue/5 via-white to-cloudwijk-light/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left lg:flex lg:items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-cloudwijk-blue/10 px-4 py-2 text-sm font-medium text-cloudwijk-blue ring-1 ring-inset ring-cloudwijk-blue/20 mb-8">
                <Shield className="mr-2 h-4 w-4" />
                {t('home.badge')}
              </div>

              {/* Headline */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{t('home.hero.title')}</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-xl text-gray-600 sm:text-2xl">
                {t('home.hero.subtitle')}
              </p>

              {/* Features */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-4 sm:space-y-0">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="mr-2 h-5 w-5 text-green-500" />
                  {t('home.features.aiActCompliant')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="mr-2 h-5 w-5 text-blue-500" />
                  {t('home.features.gdprFriendly')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="mr-2 h-5 w-5 text-purple-500" />
                  {t('home.features.euHosted')}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="sm:px-8">
                  <Link href="/ai-act-checker">
                    {t('home.hero.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="sm:px-8">
                  <Link href="/platform">
                    {t('home.hero.ctaSecondary')}
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">{t('home.socialProof')}</p>
                <div className="flex items-center space-x-8 opacity-60">
                  {/* Placeholder for customer logos */}
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
            <div className="relative">
              {/* Main visual */}
              <div className="aspect-square bg-gradient-to-br from-cloudwijk-blue to-cloudwijk-light rounded-2xl p-8 shadow-2xl">
                <div className="h-full w-full bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center text-white">
                    {/* Radio Kootwijk Tower Illustration */}
                    <svg viewBox="0 0 200 300" className="w-32 h-48 mx-auto mb-4">
                      {/* Tower structure */}
                      <rect x="95" y="50" width="10" height="200" fill="white" opacity="0.9"/>
                      
                      {/* Antenna arrays */}
                      <rect x="75" y="80" width="50" height="2" fill="white" opacity="0.8"/>
                      <rect x="80" y="100" width="40" height="2" fill="white" opacity="0.8"/>
                      <rect x="85" y="120" width="30" height="2" fill="white" opacity="0.8"/>
                      <rect x="90" y="140" width="20" height="2" fill="white" opacity="0.8"/>
                      
                      {/* Signal waves */}
                      <circle cx="100" cy="70" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.6"/>
                      <circle cx="100" cy="70" r="35" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
                      <circle cx="100" cy="70" r="50" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
                      
                      {/* Base */}
                      <rect x="90" y="250" width="20" height="10" fill="white" opacity="0.9"/>
                    </svg>
                    
                    <h3 className="text-xl font-semibold mb-2">{t('home.visual.title')}</h3>
                    <p className="text-sm opacity-90">{t('home.visual.subtitle')}</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Shield className="w-10 h-10 text-green-500" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-cloudwijk-light rounded-full shadow-lg flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}