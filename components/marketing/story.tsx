'use client'

import { useI18n } from '@/lib/i18n/client'
import { Card, CardContent } from '@/components/ui/card'

export function Story() {
  const t = useI18n()

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('home.story.title')}
            </h2>
            <p className="mt-4 text-xl text-cloudwijk-blue font-semibold">
              {t('home.story.subtitle')}
            </p>
          </div>

          {/* Story Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Historical Context */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📻</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Radio Kootwijk 1918</h3>
                    <p className="text-sm text-gray-600">Telegraaf zonder grenzen</p>
                  </div>
                  
                  <div className="space-y-4 text-sm text-gray-700">
                    <p>
                      In 1918 opende Radio Kootwijk als het krachtigste radiozendstation ter wereld. 
                      Voor het eerst kon Nederland direct communiceren met Nederlands-Indië, zonder 
                      afhankelijk te zijn van Britse onderzeekabels.
                    </p>
                    <p className="font-medium text-cloudwijk-blue">
                      Een revolutie in Nederlandse communicatie-onafhankelijkheid.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Modern Context */}
            <div>
              <Card className="border-0 shadow-lg border-l-4 border-l-cloudwijk-blue">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cloudwijk-blue to-cloudwijk-light rounded-full flex items-center justify-center">
                      <span className="text-2xl text-white">🧠</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Cloudwijk 2024</h3>
                    <p className="text-sm text-gray-600">AI zonder grenzen</p>
                  </div>
                  
                  <div className="space-y-4 text-sm text-gray-700">
                    <p>
                      Vandaag staat Europa voor een vergelijkbare uitdaging: AI-innovatie zonder 
                      afhankelijkheid van Amerikaanse platformen die onder de CLOUD Act vallen 
                      en niet voldoen aan EU-wetgeving.
                    </p>
                    <p className="font-medium text-cloudwijk-blue">
                      Cloudwijk bouwt de infrastructuur voor Europese digitale soevereiniteit.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
              Van telegrafie naar AI
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
              
              <div className="space-y-12">
                {[
                  {
                    year: '1918',
                    title: 'Radio Kootwijk opent',
                    description: 'Nederland krijgt directe communicatie met Nederlands-Indië, onafhankelijk van Britse kabels',
                    side: 'left',
                    color: 'bg-amber-500'
                  },
                  {
                    year: '1924',
                    title: 'Europese communicatie-hub',
                    description: 'Radio Kootwijk wordt het belangrijkste communicatieknooppunt van Europa',
                    side: 'right',
                    color: 'bg-orange-500'
                  },
                  {
                    year: '2018',
                    title: 'GDPR in werking',
                    description: 'Europa zet de standaard voor digitale privacy en data-bescherming',
                    side: 'left',
                    color: 'bg-blue-500'
                  },
                  {
                    year: '2024',
                    title: 'EU AI Act actief',
                    description: 'Eerste comprehensive AI-wetgeving ter wereld. Cloudwijk helpt organisaties compliant blijven.',
                    side: 'right',
                    color: 'bg-cloudwijk-blue'
                  },
                ].map((event, index) => (
                  <div key={index} className={`flex items-center ${event.side === 'left' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1 px-6">
                      <div className={`${event.side === 'left' ? 'text-right' : ''}`}>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${event.color}`}>
                          {event.year}
                        </div>
                        <h4 className="mt-2 text-lg font-semibold text-gray-900">
                          {event.title}
                        </h4>
                        <p className="mt-1 text-gray-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className={`w-4 h-4 rounded-full ${event.color} border-4 border-white shadow-lg`}></div>
                    
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 bg-gradient-to-r from-cloudwijk-blue to-cloudwijk-light rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Onze Missie</h3>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              {t('home.story.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}