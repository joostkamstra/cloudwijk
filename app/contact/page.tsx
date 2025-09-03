'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle, Rocket, Building, GraduationCap, TrendingUp, Clock, Users, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useI18n } from '@/lib/i18n/client'
import { useToast } from '@/components/ui/use-toast'

export default function ContactPage() {
  const t = useI18n()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAudience, setSelectedAudience] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    audience: '',
    useCase: '',
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
          description: t('contact.form.success'),
        })
        setFormData({ name: '', email: '', company: '', role: '', audience: '', useCase: '', message: '' })
        setSelectedAudience('')
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: t('contact.form.error'),
        description: t('contact.form.error'),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const audiences = [
    {
      id: 'startups',
      icon: Rocket,
      title: t('contact.audiences.startups.title'),
      description: t('contact.audiences.startups.description'),
      benefits: t('contact.audiences.startups.benefits'),
      cta: t('contact.audiences.startups.cta'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'enterprise',
      icon: Building,
      title: t('contact.audiences.enterprise.title'),
      description: t('contact.audiences.enterprise.description'),
      benefits: t('contact.audiences.enterprise.benefits'),
      cta: t('contact.audiences.enterprise.cta'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'research',
      icon: GraduationCap,
      title: t('contact.audiences.research.title'),
      description: t('contact.audiences.research.description'),
      benefits: t('contact.audiences.research.benefits'),
      cta: t('contact.audiences.research.cta'),
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      id: 'investors',
      icon: TrendingUp,
      title: t('contact.audiences.investors.title'),
      description: t('contact.audiences.investors.description'),
      benefits: t('contact.audiences.investors.benefits'),
      cta: t('contact.audiences.investors.cta'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
  ]

  const contactChannels = [
    {
      ...t('contact.info.general'),
      icon: Mail,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      ...t('contact.info.sales'),
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      ...t('contact.info.technical'),
      icon: Phone,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      ...t('contact.info.investors'),
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
  ]

  const locations = [
    {
      ...t('contact.locations.netherlands'),
      icon: MapPin,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      ...t('contact.locations.sweden'),
      icon: Globe,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      ...t('contact.locations.france'),
      icon: Globe,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ]

  const faqItems = t('contact.faq.items')

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('contact.hero.title')}
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            {t('contact.hero.subtitle')}
          </p>
        </div>

        {/* Target Audiences */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('contact.audiences.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('contact.audiences.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((audience) => {
              const IconComponent = audience.icon
              return (
                <Card 
                  key={audience.id} 
                  className={`border-0 shadow-lg ${audience.borderColor} bg-white hover:shadow-xl transition-all cursor-pointer ${
                    selectedAudience === audience.id ? 'ring-2 ring-cloudwijk-blue' : ''
                  }`}
                  onClick={() => {
                    setSelectedAudience(audience.id)
                    setFormData(prev => ({ ...prev, audience: audience.id }))
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${audience.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${audience.color}`} />
                    </div>
                    <CardTitle className="text-lg">{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm text-gray-600">
                      {audience.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {audience.benefits.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`w-full ${selectedAudience === audience.id ? 'bg-cloudwijk-blue text-white' : ''}`}
                    >
                      {audience.cta}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-24">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t('contact.form.title')}</CardTitle>
                <CardDescription className="text-lg">
                  {t('contact.form.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
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

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                      <Label htmlFor="role">{t('contact.form.role')}</Label>
                      <Input
                        id="role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="audience">{t('contact.form.audience')}</Label>
                      <Select value={formData.audience} onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(t('contact.form.audienceOptions')).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value as string}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="useCase">{t('contact.form.useCase')}</Label>
                      <Select value={formData.useCase} onValueChange={(value) => setFormData(prev => ({ ...prev, useCase: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(t('contact.form.useCaseOptions')).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value as string}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Versturen...
                      </>
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
        </div>

        {/* Contact Channels */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('contact.info.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('contact.info.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, index) => {
              const IconComponent = channel.icon
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-16 h-16 ${channel.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-8 w-8 ${channel.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{channel.title}</h3>
                    <a 
                      href={`mailto:${channel.email}`}
                      className="text-cloudwijk-blue font-medium hover:underline block mb-2"
                    >
                      {channel.email}
                    </a>
                    <p className="text-sm text-gray-600">{channel.response}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Locations */}
        <div className="mb-24">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('contact.locations.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => {
              const IconComponent = location.icon
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className={`h-12 w-12 ${location.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className={`h-6 w-6 ${location.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{location.title}</CardTitle>
                        <p className="text-sm text-gray-600">{location.address}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{location.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-24 text-center">
          <Card className="border-2 border-cloudwijk-blue/20 bg-gradient-to-r from-cloudwijk-blue/5 to-cloudwijk-light/5 max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <Calendar className="mx-auto h-16 w-16 text-cloudwijk-blue mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {t('contact.cta.title')}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {t('contact.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="https://calendly.com/cloudwijk" target="_blank" rel="noopener noreferrer">
                    {t('contact.cta.primary')}
                  </a>
                </Button>
                <Button variant="outline" size="lg">
                  {t('contact.cta.secondary')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('contact.faq.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('contact.faq.subtitle')}
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {faqItems.map((faq: any, index: number) => (
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
      </div>
    </div>
  )
}