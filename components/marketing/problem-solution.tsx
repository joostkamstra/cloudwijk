'use client'

import { AlertTriangle, CheckCircle } from 'lucide-react'
import { useI18n } from '@/lib/i18n/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ProblemSolution() {
  const t = useI18n()

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem */}
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <CardTitle className="ml-4 text-2xl">{t('home.problem.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base leading-relaxed text-gray-700">
                {t('home.problem.subtitle')}
              </CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{t('home.problem.point1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{t('home.problem.point2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{t('home.problem.point3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <CardTitle className="ml-4 text-2xl">{t('home.solution.title')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base leading-relaxed text-gray-700">
                {t('home.solution.subtitle')}
              </CardDescription>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{t('home.solution.point1')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{t('home.solution.point2')}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{t('home.solution.point3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}