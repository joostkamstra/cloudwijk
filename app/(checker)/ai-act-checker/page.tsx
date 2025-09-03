import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Shield, FileText, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getI18n } from '@/lib/i18n/server'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()
  
  return {
    title: t('checker.title'),
    description: t('checker.subtitle'),
    openGraph: {
      title: t('checker.title'),
      description: t('checker.subtitle'),
      type: 'website',
    },
  }
}

export default async function AIActCheckerPage() {
  const t = await getI18n()

  const features = [
    'Volledige dekking van EU verordening 2024/1689',
    'Juridisch correcte classificatie en verplichtingen', 
    'Concrete actieplannen met tijdslijnen',
    'PDF-rapport voor management en compliance teams',
  ]

  const stats = [
    { icon: Users, label: 'Organisaties geholpen', value: '500+' },
    { icon: FileText, label: 'Rapporten gegenereerd', value: '1,200+' },
    { icon: Clock, label: 'Gemiddelde tijd', value: '8 min' },
    { icon: Shield, label: 'Compliance score', value: '94%' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cloudwijk-blue/5 via-white to-cloudwijk-light/5 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8">
                <div className="inline-flex items-center rounded-full bg-cloudwijk-blue/10 px-4 py-2 text-sm font-medium text-cloudwijk-blue ring-1 ring-inset ring-cloudwijk-blue/20">
                  <Shield className="mr-2 h-4 w-4" />
                  Gratis AI Act Assessment
                </div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {t('checker.intro.title')}
              </h1>
              
              <p className="mt-6 text-xl text-gray-600">
                {t('checker.intro.description')}
              </p>

              {/* Features */}
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center text-left">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Button asChild size="lg" className="text-lg px-8 py-4">
                  <Link href="/ai-act-checker/assessment">
                    {t('checker.intro.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="mt-3 text-sm text-gray-500">
                  {t('checker.intro.estimatedTime')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-cloudwijk-blue/10">
                      <IconComponent className="h-8 w-8 text-cloudwijk-blue" />
                    </div>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Hoe werkt het?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                In drie eenvoudige stappen krijgt u duidelijkheid over uw AI Act compliance
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Vul assessment in',
                  description: 'Beantwoord vragen over uw AI-systeem in 8-12 minuten',
                  icon: FileText,
                },
                {
                  step: '02', 
                  title: 'Krijg analyse',
                  description: 'Onze AI Act engine analyseert uw antwoorden en genereert classificatie',
                  icon: Shield,
                },
                {
                  step: '03',
                  title: 'Download rapport',
                  description: 'Ontvang gedetailleerd PDF-rapport met concrete acties per e-mail',
                  icon: CheckCircle,
                },
              ].map((step, index) => {
                const IconComponent = step.icon
                return (
                  <Card key={index} className="relative border-0 shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto w-16 h-16 bg-cloudwijk-blue text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                        {step.step}
                      </div>
                      <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-lg bg-cloudwijk-blue/10 mb-4">
                        <IconComponent className="h-6 w-6 text-cloudwijk-blue" />
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Belangrijke disclaimer
              </h3>
              <div className="text-sm text-gray-600 space-y-3">
                <p>
                  {t('checker.intro.disclaimer')}
                </p>
                <p>
                  <strong>Gebaseerd op EU AI Act verordening 2024/1689.</strong> Laatste update: december 2024. 
                  Staged applicability: verboden praktijken en GPAI-verplichtingen zijn al van kracht, 
                  hoog-risico verplichtingen uiterlijk 2 augustus 2026.
                </p>
                <p>
                  Voor definitieve juridische compliance-beslissingen bij (vermoedelijk) hoog-risico systemen 
                  raden we aan een AI Act specialist te raadplegen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-cloudwijk-blue">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start nu uw gratis AI Act compliance assessment
            </p>
            <Button asChild size="lg" className="bg-white text-cloudwijk-blue hover:bg-gray-50">
              <Link href="/ai-act-checker/assessment">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}