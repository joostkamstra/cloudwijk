'use client'

import { CheckCircle, Shield, Zap, Users, FileText, BarChart3, Server, Settings, Cpu, TrendingUp, Target, GraduationCap, Building, Lightbulb } from 'lucide-react'
import { useI18n } from '@/lib/i18n/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Features() {
  const t = useI18n()

  const features = [
    {
      name: t('home.features.gpuCloud.title'),
      description: t('home.features.gpuCloud.description'),
      icon: Server,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: t('home.features.platform.title'), 
      description: t('home.features.platform.description'),
      icon: Settings,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: t('home.features.services.title'),
      description: t('home.features.services.description'),
      icon: Cpu,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ]

  const benefits = [
    {
      title: t('home.features.datasoevereiniteit'),
      description: 'Alle data en workloads blijven binnen EU-grenzen, geen afhankelijkheid van Amerikaanse moederbedrijven',
      icon: Shield,
    },
    {
      title: t('home.features.complianceByDesign'),
      description: 'Audit logs, EU-encryptie en AI Act compliance dashboard standaard ingebouwd',
      icon: FileText,
    },
    {
      title: t('home.features.duurzaamheid'),
      description: '100% hernieuwbare energie, realtime CO₂-footprint inzicht en energie-efficiënte GPU\'s',
      icon: Lightbulb,
    },
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-cloudwijk-blue">
            EU Sovereign AI Infrastructure
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('home.features.title')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Van GPU-infrastructuur tot beheerde AI-diensten — alles wat u nodig heeft voor AI-inferentie binnen Europese kaders.
          </p>
        </div>

        {/* Main Features */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card key={feature.name} className="border-0 shadow-lg">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="mt-4 text-xl">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Benefits Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Waarom organisaties kiezen voor Cloudwijk
          </h3>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-cloudwijk-blue/10">
                    <IconComponent className="h-8 w-8 text-cloudwijk-blue" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h4>
                  <p className="mt-2 text-gray-600 max-w-sm mx-auto">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Hoe het werkt
          </h3>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { step: '01', title: 'Setup', desc: 'Snel aan boord met onze self-service omgeving' },
              { step: '02', title: 'Deploy', desc: 'AI-modellen uitrollen op EU-infrastructuur' },
              { step: '03', title: 'Scale', desc: 'Automatisch opschalen naar vraag' },
              { step: '04', title: 'Monitor', desc: 'Realtime inzicht in prestaties en compliance' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-cloudwijk-blue text-white rounded-full flex items-center justify-center text-sm font-bold mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}