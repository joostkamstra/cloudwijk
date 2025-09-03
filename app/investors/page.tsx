import { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Target, DollarSign, Shield, Users, Rocket, CheckCircle, ArrowRight, BarChart3, PieChart, Trophy, Lightbulb, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getI18n } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()
  
  return {
    title: t('investors.title'),
    description: t('investors.subtitle'),
  }
}

export default async function InvestorsPage() {
  const t = await getI18n()

  const marketTrends = t('investors.market.trends')
  const businessLayers = t('investors.model.layers')
  const advantages = t('investors.competitive.advantages')
  const fundingAllocation = t('investors.funding.allocation')
  const credentials = t('investors.team.credentials')
  const tractionMetrics = t('investors.traction.metrics')
  const opportunityHighlights = t('investors.opportunity.highlights')

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-12 w-12 text-cloudwijk-blue" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('investors.hero.title')}
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('investors.hero.subtitle')}
          </p>
        </div>

        {/* Investment Opportunity */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('investors.opportunity.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('investors.opportunity.description')}
            </p>
          </div>

          <div className="bg-gradient-to-r from-cloudwijk-blue/10 to-cloudwijk-light/10 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {opportunityHighlights.map((highlight: string, index: number) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market & Timing */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('investors.market.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('investors.market.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {marketTrends.map((trend: any, index: number) => {
              const icons = [Rocket, Shield, Target] as const
              const IconComponent = icons[index] as React.ComponentType<{ className?: string }>
              const colors = ['text-purple-500', 'text-blue-500', 'text-green-500']
              const bgColors = ['bg-purple-50', 'bg-blue-50', 'bg-green-50']
              
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${bgColors[index]}`}>
                      <IconComponent className={`h-6 w-6 ${colors[index]}`} />
                    </div>
                    <CardTitle className="text-xl">{trend.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {trend.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('investors.model.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('investors.model.description')}
            </p>
          </div>

          <div className="space-y-6">
            {businessLayers.map((layer: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cloudwijk-blue/10 to-blue-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{layer.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{layer.model}</div>
                      <div className="font-bold text-cloudwijk-blue">{layer.arpu}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Margin</span>
                    <span className="font-semibold text-green-600">{layer.margins}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('investors.competitive.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage: any, index: number) => {
              const icons = [Trophy, Rocket, BarChart3, Shield] as const
              const IconComponent = icons[index] as React.ComponentType<{ className?: string }>
              const colors = ['text-yellow-500', 'text-purple-500', 'text-blue-500', 'text-green-500']
              const bgColors = ['bg-yellow-50', 'bg-purple-50', 'bg-blue-50', 'bg-green-50']
              
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className={`h-12 w-12 ${bgColors[index]} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className={`h-6 w-6 ${colors[index]}`} />
                      </div>
                      <CardTitle className="text-xl">{advantage.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {advantage.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Funding & Use of Funds */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('investors.funding.title')}
            </h2>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-md bg-cloudwijk-blue px-3 py-2 text-sm font-medium text-white">
                {t('investors.funding.round')}
              </span>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              {t('investors.funding.description')}
            </p>
          </div>

          <div className="space-y-6">
            {fundingAllocation.map((item: any, index: number) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
                    <span className="text-lg font-bold text-cloudwijk-blue">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="mb-3" />
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team & Traction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Team */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              {t('investors.team.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('investors.team.description')}
            </p>
            
            <div className="space-y-4">
              {credentials.map((credential: string, index: number) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 leading-relaxed">{credential}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traction */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              {t('investors.traction.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('investors.traction.description')}
            </p>
            
            <div className="space-y-4">
              {tractionMetrics.map((metric: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="h-2 w-2 bg-cloudwijk-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 leading-relaxed">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-cloudwijk-blue to-cloudwijk-light rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {t('investors.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('investors.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-cloudwijk-blue hover:bg-gray-100">
              {t('investors.cta.primary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {t('investors.cta.secondary')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}