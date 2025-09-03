import { Metadata } from 'next'
import { Building2, Users, Target, Heart, Shield, Lightbulb, Eye, Handshake } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function generateMetadata(): Metadata {
  return {
    title: 'Over Cloudwijk - EU Sovereign AI Platform',
    description: 'Ontdek het verhaal achter Cloudwijk en onze missie voor EU digital sovereignty.',
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cloudwijk-blue/5 via-white to-cloudwijk-light/5 py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Over Cloudwijk
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Wij bouwen aan een EU-soeverein AI-ecosysteem dat voldoet aan de hoogste 
              compliance-eisen en tegelijkertijd de innovatiekracht van Europa versterkt.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cloudwijk-blue/10 to-blue-50">
                  <div className="flex items-center">
                    <Target className="h-8 w-8 text-cloudwijk-blue" />
                    <CardTitle className="ml-4">Onze Missie</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-base leading-relaxed">
                    Organisaties helpen bij het navigeren door de complexiteit van de EU AI Act, 
                    terwijl we tegelijkertijd de voordelen van AI-technologie volledig benutten 
                    binnen een veilig, compliant en soeverein Europees kader.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8 text-green-600" />
                    <CardTitle className="ml-4">Onze Visie</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-base leading-relaxed">
                    Een Europa dat technologisch onafhankelijk is en leidend wordt in 
                    verantwoorde AI-ontwikkeling, met Cloudwijk als de vertrouwde partner 
                    voor compliance en innovatie.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Onze Kernwaarden
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'EU Digital Sovereignty',
                  description: 'Technologische onafhankelijkheid voor Europa',
                  color: 'text-green-500',
                  bgColor: 'bg-green-50',
                },
                {
                  icon: Heart,
                  title: 'AI Act Compliance',
                  description: 'Volledig conform EU-regelgeving',
                  color: 'text-red-500',
                  bgColor: 'bg-red-50',
                },
                {
                  icon: Lightbulb,
                  title: 'Transparantie',
                  description: 'Open en begrijpbare AI-systemen',
                  color: 'text-yellow-500',
                  bgColor: 'bg-yellow-50',
                },
                {
                  icon: Users,
                  title: 'Innovatie',
                  description: 'Vooruitstrevende technologische oplossingen',
                  color: 'text-blue-500',
                  bgColor: 'bg-blue-50',
                }
              ].map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className={`mx-auto w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mb-4`}>
                        <IconComponent className={`h-8 w-8 ${value.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Radio Kootwijk Connection */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              Het Verhaal van Radio Kootwijk
            </h2>
            <div className="prose prose-lg mx-auto text-left">
              <p className="text-gray-600 leading-relaxed">
                Net zoals Radio Kootwijk in de vroege 20e eeuw Europa verbond met de rest van 
                de wereld via geavanceerde communicatietechnologie, zo verbindt Cloudwijk vandaag 
                Europese organisaties met de toekomst van verantwoorde AI.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Radio Kootwijk stond symbool voor technologische vooruitgang binnen een Europees 
                kader. Wij eren die traditie door AI-innovatie mogelijk te maken binnen de grenzen 
                van Europese waarden en regelgeving.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}