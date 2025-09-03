import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Star, Shield, Zap, Globe, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getI18n } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()
  
  return {
    title: t('platform.title'),
    description: t('platform.subtitle'),
  }
}

export default async function PlatformPage() {
  const t = await getI18n()

  const features = [
    {
      name: t('platform.features.assessment.title'),
      description: t('platform.features.assessment.description'),
      price: t('platform.features.assessment.price'),
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      features: [
        'Volledige EU AI Act coverage',
        'Juridisch correcte classificatie',
        'Gedetailleerd PDF rapport',
        'Concrete actieplannen',
        'E-mail notificaties',
      ],
    },
    {
      name: t('platform.features.governance.title'),
      description: t('platform.features.governance.description'),
      price: t('platform.features.governance.price'),
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      features: [
        'Risk management systeem',
        'Compliance monitoring',
        'Document management',
        'Audit trails',
        'Team collaboration',
      ],
    },
    {
      name: t('platform.features.infrastructure.title'),
      description: t('platform.features.infrastructure.description'),
      price: t('platform.features.infrastructure.price'),
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      features: [
        'EU-hosted AI models',
        'Custom fine-tuning',
        'API access',
        'SLA guarantees',
        '24/7 monitoring',
      ],
    },
    {
      name: t('platform.features.consulting.title'),
      description: t('platform.features.consulting.description'),
      price: t('platform.features.consulting.price'),
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      features: [
        'AI Act specialisten',
        'Implementation guidance',
        'Legal review',
        'Training sessies',
        'Ongoing support',
      ],
    },
  ]

  const comparison = [
    {
      feature: t('platform.comparison.dataLocation'),
      cloudwijk: t('platform.comparison.dataLocationCloudwijk'),
      others: t('platform.comparison.dataLocationOthers'),
      cloudwijkHighlight: true,
    },
    {
      feature: t('platform.comparison.compliance'),
      cloudwijk: t('platform.comparison.complianceCloudwijk'),
      others: t('platform.comparison.complianceOthers'),
      cloudwijkHighlight: true,
    },
    {
      feature: t('platform.comparison.jurisdiction'),
      cloudwijk: t('platform.comparison.jurisdictionCloudwijk'),
      others: t('platform.comparison.jurisdictionOthers'),
      cloudwijkHighlight: true,
    },
    {
      feature: t('platform.comparison.support'),
      cloudwijk: t('platform.comparison.supportCloudwijk'),
      others: t('platform.comparison.supportOthers'),
      cloudwijkHighlight: true,
    },
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('platform.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('platform.subtitle')}
          </p>
        </div>

        {/* Overview */}
        <div className="mt-16 bg-gradient-to-r from-cloudwijk-blue to-cloudwijk-light rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {t('platform.overview.title')}
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            {t('platform.overview.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="border-0 shadow-lg relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`h-12 w-12 flex items-center justify-center rounded-lg ${feature.bgColor}`}>
                          <IconComponent className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <div className="ml-4">
                          <CardTitle className="text-xl">{feature.name}</CardTitle>
                          <div className="text-2xl font-bold text-cloudwijk-blue mt-1">
                            {feature.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 mb-6">
                      {feature.description}
                    </CardDescription>
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('platform.comparison.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Waarom kiezen voor een EU-platform?
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden bg-white shadow-lg rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-cloudwijk-blue uppercase tracking-wider">
                      {t('platform.comparison.cloudwijk')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {t('platform.comparison.others')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparison.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          {row.cloudwijkHighlight && (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          )}
                          {row.cloudwijk}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.others}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div id="pricing" className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transparante prijzen
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Geen verborgen kosten. Schaal mee met uw behoeften.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Starter</h3>
                <div className="text-3xl font-bold text-cloudwijk-blue mb-4">Gratis</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI Act Assessment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    PDF Rapport
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    E-mail ondersteuning
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional</h3>
                <div className="text-3xl font-bold text-cloudwijk-blue mb-4">€2.500<span className="text-sm text-gray-500">/maand</span></div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI Governance Suite
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Compliance Monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Team toegang
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-cloudwijk-blue relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-cloudwijk-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                    Populair
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-cloudwijk-blue mb-4">Op maat</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Managed AI Infrastructure
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SLA garanties
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consulting</h3>
                <div className="text-3xl font-bold text-cloudwijk-blue mb-4">€250<span className="text-sm text-gray-500">/uur</span></div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI Act specialisten
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Implementation support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Legal review
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('platform.cta.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('platform.cta.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/ai-act-checker">
                  {t('platform.cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  {t('platform.cta.secondary')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}