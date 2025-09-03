import { Metadata } from 'next'
import { Building2, Users, Target, Heart, Shield, Lightbulb, Eye, Handshake, MapPin, Zap, CheckCircle, Globe, RadioIcon } from 'lucide-react'
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
      icon: CheckCircle,
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
      icon: Zap,
      title: t('about.values.sustainability.title'),
      description: t('about.values.sustainability.description'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <RadioIcon className="h-12 w-12 text-cloudwijk-blue" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('about.hero.title')}
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.hero.subtitle')}
          </p>
        </div>

        {/* Company Story */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('about.story.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-cloudwijk-blue/10 to-blue-50">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-cloudwijk-blue" />
                  <CardTitle className="ml-4">{t('about.story.founding.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {t('about.story.founding.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center">
                  <RadioIcon className="h-8 w-8 text-green-600" />
                  <CardTitle className="ml-4">{t('about.story.inspiration.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {t('about.story.inspiration.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-cloudwijk-blue/10 to-blue-50">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-cloudwijk-blue" />
                  <CardTitle className="ml-4">{t('about.mission.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {t('about.mission.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-purple-600" />
                  <CardTitle className="ml-4">{t('about.vision.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {t('about.vision.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24 bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('about.team.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-cloudwijk-blue" />
                  <CardTitle className="ml-4">{t('about.team.leadership.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {t('about.team.leadership.description')}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center">
                  <Lightbulb className="h-8 w-8 text-yellow-500" />
                  <CardTitle className="ml-4">{t('about.team.culture.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base leading-relaxed text-gray-700">
                  {t('about.team.culture.description')}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Team Expertise */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cloudwijk-blue/10 to-blue-50">
              <CardTitle className="text-center">{t('about.team.expertise.title')}</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t('about.team.expertise.areas').map((area: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 leading-relaxed">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location & Partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-orange-600" />
                <CardTitle className="ml-4">{t('about.location.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-base leading-relaxed text-gray-700">
                {t('about.location.description')}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex items-center">
                <Handshake className="h-8 w-8 text-indigo-600" />
                <CardTitle className="ml-4">{t('about.investors.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="text-base leading-relaxed text-gray-700">
                {t('about.investors.description')}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}