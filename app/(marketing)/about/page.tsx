import { Metadata } from 'next'
import { Building2, Users, Target, Heart, Shield, Lightbulb, Eye, Handshake } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getI18n } from '@/lib/i18n/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()
  
  return {
    title: t('about.title'),
    description: t('about.subtitle'),
  }
}

export default async function AboutPage() {
  const t = await getI18n()

  const values = [
    {
      icon: Shield,
      title: t('about.values.sovereignty.title'),
      description: t('about.values.sovereignty.description'),
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Target,
      title: t('about.values.compliance.title'),
      description: t('about.values.compliance.description'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Eye,
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
  ]

  const timeline = [
    {
      year: '2023',
      title: 'Oprichting Cloudwijk',
      description: 'Gestart met de visie voor Europese AI-soevereiniteit',
      milestone: true,
    },
    {
      year: '2024 Q1',
      title: 'EU AI Act implementatie',
      description: 'Eerste versie van AI Act Compliance Checker gelanceerd',
      milestone: false,
    },
    {
      year: '2024 Q2',
      title: 'Platform launch',
      description: 'Complete AI governance platform beschikbaar voor organisaties',
      milestone: true,
    },
    {
      year: '2024 Q3',
      title: 'Eerste klanten',
      description: 'Nederlandse organisaties beginnen met AI Act compliance via Cloudwijk',
      milestone: false,
    },
    {
      year: '2024 Q4',
      title: 'EU uitbreiding',
      description: 'Beschikbaar in Duitsland, Frankrijk en andere EU-landen',
      milestone: true,
    },
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('about.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-cloudwijk-blue/10">
                  <Target className="h-6 w-6 text-cloudwijk-blue" />
                </div>
                <CardTitle className="ml-4">{t('about.mission.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600">
                {t('about.mission.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-cloudwijk-light/10">
                  <Eye className="h-6 w-6 text-cloudwijk-light" />
                </div>
                <CardTitle className="ml-4">{t('about.vision.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600">
                {t('about.vision.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className={`h-12 w-12 flex items-center justify-center rounded-lg ${value.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${value.color}`} />
                      </div>
                      <CardTitle className="ml-4">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-gray-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Story & Timeline */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ons Verhaal
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Van idee tot Europese AI-infrastructuur
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1 px-6">
                    <div className={`${index % 2 === 0 ? 'text-right' : ''}`}>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        event.milestone 
                          ? 'bg-cloudwijk-blue text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {event.year}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-gray-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                    event.milestone 
                      ? 'bg-cloudwijk-blue' 
                      : 'bg-gray-400'
                  }`}></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div id="team" className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('about.team.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('about.team.description')}
            </p>
          </div>

          {/* Team Grid */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                name: 'Dr. Sarah van der Berg',
                role: 'Founder & CEO',
                expertise: 'AI Act specialist, voormalig EU policy advisor',
                image: null, // Placeholder
              },
              {
                name: 'Mark Jansen',
                role: 'CTO',
                expertise: 'Cloud infrastructure, AI governance platforms',
                image: null,
              },
              {
                name: 'Prof. Lisa Chen',
                role: 'Chief Compliance Officer',
                expertise: 'EU wetgeving, GDPR & AI Act implementatie',
                image: null,
              },
            ].map((person, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mx-auto h-24 w-24 bg-gray-200 rounded-full mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-sm text-cloudwijk-blue font-medium">{person.role}</p>
                    <p className="mt-2 text-sm text-gray-600">{person.expertise}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-24 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Vragen over onze missie?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We delen graag meer over onze visie voor Europese AI-soevereiniteit.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="rounded-md bg-cloudwijk-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-cloudwijk-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cloudwijk-blue"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}