'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/client'

export function CTA() {
  const t = useI18n()

  return (
    <section className="relative overflow-hidden bg-cloudwijk-blue">
      <div className="absolute inset-0 bg-gradient-to-br from-cloudwijk-blue via-cloudwijk-blue to-cloudwijk-light"></div>
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('home.cta.title')}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            {t('home.cta.subtitle')}
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-cloudwijk-blue hover:bg-gray-50 sm:px-8"
            >
              <Link href="/ai-act-checker">
                {t('home.cta.primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="border-white text-white hover:bg-white/10 sm:px-8"
            >
              <Link href="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                {t('home.cta.secondary')}
              </Link>
            </Button>
          </div>

          {/* Additional info */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { label: 'Gratis', value: 'AI Act Check' },
              { label: '8-12 minuten', value: 'Assessment tijd' },
              { label: 'Direct rapport', value: 'PDF + E-mail' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-sm text-blue-200">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-blue-400">
            <p className="text-sm text-blue-200 mb-4">
              Gebruikt door Nederlandse organisaties
            </p>
            <div className="flex items-center justify-center space-x-6 opacity-60">
              {/* Placeholder trust indicators */}
              <div className="h-8 w-20 bg-white/20 rounded"></div>
              <div className="h-8 w-24 bg-white/20 rounded"></div>
              <div className="h-8 w-16 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}