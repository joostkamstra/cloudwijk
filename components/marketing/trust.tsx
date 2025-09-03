'use client'

import { Shield, Globe, Lock, Zap, CheckCircle, Award } from 'lucide-react'
import { useI18n } from '@/lib/i18n/client'

export function Trust() {
  const t = useI18n()

  const trustBadges = [
    {
      icon: Globe,
      title: t('home.trust.euHosted'),
      description: t('home.trust.euHostedDesc'),
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: t('home.trust.gdprCompliant'),
      description: t('home.trust.gdprCompliantDesc'), 
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Lock,
      title: t('home.trust.noCloudAct'),
      description: t('home.trust.noCloudActDesc'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Zap,
      title: t('home.trust.nis2Ready'),
      description: t('home.trust.nis2ReadyDesc'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
  ]

  const certifications = [
    { name: 'ISO 27001', status: 'In process' },
    { name: 'SOC 2 Type II', status: 'Planned Q2 2024' },
    { name: 'GDPR Compliant', status: 'Certified' },
    { name: 'NEN 7510', status: 'Planned' },
  ]

  const locations = [
    { country: 'Nederland', city: 'Amsterdam', flag: '🇳🇱', primary: true },
    { country: 'Duitsland', city: 'Frankfurt', flag: '🇩🇪', primary: false },
    { country: 'Frankrijk', city: 'Paris', flag: '🇫🇷', primary: false },
  ]

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('home.trust.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Volledig transparant over onze beveiliging, compliance en data-locaties
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${badge.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${badge.color}`} />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{badge.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{badge.description}</p>
              </div>
            )
          })}
        </div>

        {/* Data Locations */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Data Locaties</h3>
            <p className="mt-2 text-gray-600">Uw data blijft binnen de EU-grenzen</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <div key={index} className={`bg-white rounded-lg p-6 border-2 ${location.primary ? 'border-cloudwijk-blue' : 'border-gray-200'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-3">{location.flag}</div>
                  <h4 className="font-semibold text-gray-900">{location.country}</h4>
                  <p className="text-sm text-gray-600">{location.city}</p>
                  {location.primary && (
                    <div className="mt-2 inline-flex items-center text-xs bg-cloudwijk-blue text-white px-2 py-1 rounded">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Primary
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Compliance Status</h3>
            <p className="mt-2 text-gray-600">Transparant over onze certificeringen en compliance</p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border max-w-2xl mx-auto">
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-cloudwijk-blue mr-3" />
                    <span className="font-medium text-gray-900">{cert.name}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded ${
                    cert.status === 'Certified' 
                      ? 'bg-green-100 text-green-800' 
                      : cert.status.includes('process')
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border">
          <h4 className="text-xl font-bold text-gray-900 mb-6">Technische Specificaties</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Beveiliging</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  End-to-end encryptie (AES-256)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Zero-knowledge architectuur
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Multi-factor authenticatie
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Regular security audits
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Infrastructure</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  EU-only data centers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  High availability SLA
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Automated backups
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Disaster recovery plan
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}