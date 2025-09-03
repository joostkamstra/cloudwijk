'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/lib/i18n/client'
import { useToast } from '@/components/ui/use-toast'

export default function ContactPage() {
  const t = useI18n()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: t('contact.form.success'),
          description: 'We nemen binnen 24 uur contact op.',
        })
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: t('contact.form.error'),
        description: 'Probeer het opnieuw of mail direct naar hallo@cloudwijk.eu',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-mail',
      value: 'hallo@cloudwijk.eu',
      href: 'mailto:hallo@cloudwijk.eu',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Phone,
      title: 'Telefoon',
      value: '+31 (0)20 123 4567',
      href: 'tel:+31201234567',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: MapPin,
      title: 'Locatie',
      value: 'Amsterdam, Nederland',
      href: null,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ]

  const faqs = [
    {
      question: 'Hoe snel krijg ik mijn AI Act rapport?',
      answer: 'Direct na het voltooien van de assessment. Het rapport wordt automatisch gegenereerd en naar uw e-mail verzonden.',
    },
    {
      question: 'Is de assessment echt gratis?',
      answer: 'Ja, de AI Act Compliance Checker is volledig gratis. Geen verborgen kosten of verplichtingen.',
    },
    {
      question: 'Hoe juridisch betrouwbaar is het rapport?',
      answer: 'Het rapport is gebaseerd op EU verordening 2024/1689 en wordt regelmatig bijgewerkt. Voor definitieve juridische beslissingen raden we aan een specialist te raadplegen.',
    },
    {
      question: 'Werken jullie ook met niet-Nederlandse organisaties?',
      answer: 'Ja, we ondersteunen alle EU-organisaties. Ons platform is beschikbaar in Nederlands en Engels.',
    },
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('contact.title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.form.title')}</CardTitle>
                <CardDescription>
                  We nemen binnen 24 uur contact op voor een persoonlijk gesprek.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">{t('contact.form.name')}</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('contact.form.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">{t('contact.form.company')}</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="mt-2"
                      placeholder="Vertel ons over uw AI Act compliance uitdagingen..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Versturen...'
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Additional */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t('contact.info.title')}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon
                  const content = (
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                      <div className={`h-12 w-12 flex items-center justify-center rounded-lg ${item.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  )

                  return item.href ? (
                    <a key={index} href={item.href} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>
            </div>

            {/* Schedule Call CTA */}
            <Card className="border-2 border-cloudwijk-blue/20 bg-gradient-to-r from-cloudwijk-blue/5 to-cloudwijk-light/5">
              <CardContent className="p-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-cloudwijk-blue mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('contact.cta.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('contact.cta.subtitle')}
                </p>
                <Button asChild>
                  <a href="https://calendly.com/cloudwijk" target="_blank" rel="noopener noreferrer">
                    {t('contact.cta.primary')}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Snel aan de slag
              </h3>
              <div className="space-y-3">
                {[
                  'Gratis AI Act assessment in 10 minuten',
                  'Direct PDF rapport met acties',
                  'Nederlandse compliance specialisten',
                  'EU-hosted platform zonder CLOUD Act risico',
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Veelgestelde vragen
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Antwoorden op de meest voorkomende vragen over onze diensten
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Office Hours */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Kantooruren
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Maandag - Vrijdag</p>
                <p>09:00 - 18:00 CET</p>
              </div>
              <div>
                <p className="font-medium">Weekend</p>
                <p>Alleen voor urgente zaken</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Voor urgente AI Act compliance vragen zijn we ook buiten kantooruren bereikbaar via e-mail.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}