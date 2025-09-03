'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight, Shield, FileCheck, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/client'

export function AIActHighlight() {
  const t = useI18n()

  const benefits = [
    {
      icon: FileCheck,
      title: 'Gratis assessment in 10 minuten',
      description: 'Krijg direct inzicht in uw AI Act verplichtingen'
    },
    {
      icon: Shield,
      title: 'Juridisch onderbouwde rapporten',
      description: 'Gebaseerd op EU verordening 2024/1689'
    },
    {
      icon: CheckCircle,
      title: 'Concrete actieplannen',
      description: 'Stap-voor-stap implementatie roadmap'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Content */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/20 mb-6">
                <AlertCircle className="mr-2 h-4 w-4" />
                Gratis AI Act Compliance Tool
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                EU AI Act Compliance Checker
              </h2>
              
              <p className="mt-4 text-xl text-gray-600 leading-relaxed">
                Controleer of uw AI-systeem voldoet aan de EU AI Act verordening. 
                Ontvang een gedetailleerd rapport met concrete acties en tijdslijnen.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/ai-act-checker">
                    Start gratis assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/platform">
                    Bekijk AI Infrastructure
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center text-xl">
                  <Shield className="mr-3 h-6 w-6" />
                  AI Act Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Risicoklassificatie</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Transparantieverplichtingen</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">GDPR alignment</span>
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Documentatievereisten</span>
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">Sample</div>
                    <div className="text-sm text-gray-600">Compliance Report</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}