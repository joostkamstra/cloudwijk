'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowRight, Mail, User, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useI18n } from '@/lib/i18n/client'

const leadFormSchema = z.object({
  email: z.string().email('Ongeldig e-mailadres'),
  name: z.string().optional(),
  company: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadFormSchema>

interface LeadFormProps {
  onSubmit: (data: { leadId?: string; email: string; name?: string; company?: string }) => void
  isSubmitting?: boolean
  className?: string
}

export function LeadForm({ onSubmit, isSubmitting = false, className }: LeadFormProps) {
  const t = useI18n()
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onChange',
  })

  const submitForm = async (data: LeadFormData) => {
    try {
      // Create/update lead
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionStorage.getItem('session-id') || '',
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          company: data.company,
          source: 'ai-act-checker',
          marketingConsent: false, // Will be asked later if they want updates
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save lead information')
      }

      const result = await response.json()
      
      onSubmit({
        leadId: result.leadId,
        email: data.email,
        name: data.name,
        company: data.company,
      })

      toast({
        title: 'Gegevens opgeslagen',
        description: 'We kunnen nu uw persoonlijke rapport versturen.',
      })

    } catch (error) {
      console.error('Lead form error:', error)
      toast({
        title: 'Fout',
        description: 'Er ging iets mis. Probeer het opnieuw.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          {t('checker.flow.email.title')}
        </CardTitle>
        <CardDescription>
          {t('checker.flow.email.subtitle')}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          {/* Email - Required */}
          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t('checker.flow.email.emailLabel')} *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('checker.flow.email.emailPlaceholder')}
              {...register('email')}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Name - Optional */}
          <div>
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('checker.flow.email.nameLabel')}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={t('checker.flow.email.namePlaceholder')}
              {...register('name')}
              className="mt-2"
            />
          </div>

          {/* Company - Optional */}
          <div>
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              {t('checker.flow.email.companyLabel')}
            </Label>
            <Input
              id="company"
              type="text"
              placeholder={t('checker.flow.email.companyPlaceholder')}
              {...register('company')}
              className="mt-2"
            />
          </div>

          {/* Privacy notice */}
          <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md">
            <p>
              We gebruiken uw e-mailadres alleen voor het versturen van uw rapport. 
              Uw gegevens worden conform onze{' '}
              <a href="/privacy" className="text-cloudwijk-blue hover:underline">
                privacyverklaring
              </a>{' '}
              behandeld en worden na 90 dagen automatisch geanonimiseerd (tenzij u akkoord gaat met marketing-communicatie).
            </p>
          </div>

          {/* Submit button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              'Opslaan...'
            ) : (
              <>
                {t('checker.flow.email.continue')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Time estimate */}
        <div className="text-center mt-4 text-sm text-gray-600">
          {t('checker.intro.estimatedTime')}
        </div>
      </CardContent>
    </Card>
  )
}