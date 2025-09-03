import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Server, Settings, Cpu, Shield, Globe, Zap } from 'lucide-react'
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

  const layers = [
    {
      name: t('platform.layers.infrastructure.title'),
      subtitle: t('platform.layers.infrastructure.subtitle'),
      description: t('platform.layers.infrastructure.description'),
      features: t('platform.layers.infrastructure.features'),
      price: t('platform.layers.infrastructure.price'),
      icon: Server,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      name: t('platform.layers.platform.title'),
      subtitle: t('platform.layers.platform.subtitle'),
      description: t('platform.layers.platform.description'),
      features: t('platform.layers.platform.features'),
      price: t('platform.layers.platform.price'),
      icon: Settings,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      name: t('platform.layers.services.title'),
      subtitle: t('platform.layers.services.subtitle'),
      description: t('platform.layers.services.description'),
      features: t('platform.layers.services.features'),
      price: t('platform.layers.services.price'),
      icon: Cpu,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
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

        {/* Architecture Header */}
        <div className="mt-24 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('platform.architecture.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('platform.architecture.subtitle')}
          </p>
        </div>

        {/* Three-tier Architecture */}
        <div className="mt-16 space-y-8">
          {layers.map((layer, index) => {
            const IconComponent = layer.icon
            return (
              <Card key={index} className={`border-0 shadow-lg ${layer.borderColor} bg-white`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`h-12 w-12 flex items-center justify-center rounded-lg ${layer.bgColor} flex-shrink-0`}>
                        <IconComponent className={`h-6 w-6 ${layer.color}`} />
                      </div>
                      <div className="ml-4">
                        <CardTitle className="text-2xl">{layer.name}</CardTitle>
                        <p className={`text-lg font-medium ${layer.color} mt-1`}>
                          {layer.subtitle}
                        </p>
                        <div className="text-lg font-bold text-cloudwijk-blue mt-2">
                          {layer.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 mb-6 leading-relaxed">
                    {layer.description}
                  </CardDescription>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {layer.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Why Choose EU Platform */}
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

        {/* Key Benefits */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Waarom Cloudwijk onze klanten kiezen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-50">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">EU Datasoevereiniteit</h3>
              <p className="mt-2 text-gray-600">
                Alle data blijft binnen EU-grenzen, volledig gecontroleerd door EU-entiteiten
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-50">
                <Globe className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Compliance by Design</h3>
              <p className="mt-2 text-gray-600">
                AI Act, NIS2 en GDPR compliance ingebouwd, niet achteraf toegevoegd
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-purple-50">
                <Zap className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Complete Stack</h3>
              <p className="mt-2 text-gray-600">
                Van GPU-hardware tot AI-diensten — alles uit één vertrouwde hand
              </p>
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
                <Link href="/contact">
                  Start met Cloudwijk
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