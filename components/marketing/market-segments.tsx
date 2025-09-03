'use client'

import { TrendingUp, Target, Rocket, Building, GraduationCap } from 'lucide-react'
import { useI18n } from '@/lib/i18n/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function MarketSegments() {
  const t = useI18n()

  const segments = [
    {
      icon: Rocket,
      title: t('home.segments.startups.title'),
      description: t('home.segments.startups.description'),
      value: t('home.segments.startups.value'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      icon: Building,
      title: t('home.segments.regulated.title'),
      description: t('home.segments.regulated.description'),
      value: t('home.segments.regulated.value'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      icon: GraduationCap,
      title: t('home.segments.research.title'),
      description: t('home.segments.research.description'),
      value: t('home.segments.research.value'),
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Market Growth Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-12 w-12 text-cloudwijk-blue" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('home.market.title')}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {t('home.market.subtitle')}
          </p>
        </div>

        {/* Market Drivers */}
        <div className="mb-16 bg-gradient-to-r from-cloudwijk-blue/10 to-cloudwijk-light/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center text-gray-900 mb-8">
            Belangrijkste groeidrivers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cloudwijk-blue mb-2">Strong</div>
              <p className="text-sm text-gray-700">{t('home.market.driver1')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cloudwijk-blue mb-2">Most</div>
              <p className="text-sm text-gray-700">{t('home.market.driver2')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cloudwijk-blue mb-2">Multi-B€</div>
              <p className="text-sm text-gray-700">{t('home.market.driver3')}</p>
            </div>
          </div>
        </div>

        {/* Target Segments */}
        <div className="mb-12">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t('home.segments.title')}
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              {t('home.segments.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {segments.map((segment, index) => {
              const IconComponent = segment.icon
              return (
                <Card 
                  key={index} 
                  className={`border-0 shadow-lg ${segment.borderColor} bg-white hover:shadow-xl transition-shadow`}
                >
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${segment.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${segment.color}`} />
                    </div>
                    <CardTitle className="text-xl">{segment.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base text-gray-600">
                      {segment.description}
                    </CardDescription>
                    <div className={`p-3 rounded-lg ${segment.bgColor}`}>
                      <div className="text-sm font-medium text-gray-900">
                        Gemiddelde contractwaarde
                      </div>
                      <div className={`text-lg font-bold ${segment.color}`}>
                        {segment.value}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}