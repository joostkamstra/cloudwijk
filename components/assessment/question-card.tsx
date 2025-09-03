'use client'

import { useState } from 'react'
import { HelpCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Question } from '@/lib/ai-act/types'
import { cn } from '@/lib/utils'

interface QuestionCardProps {
  question: Question
  value: any
  onChange: (value: any) => void
  onNext: () => void
  showNext?: boolean
  isValid?: boolean
  className?: string
}

export function QuestionCard({ 
  question, 
  value, 
  onChange, 
  onNext, 
  showNext = true,
  isValid = true,
  className 
}: QuestionCardProps) {
  const [showHelp, setShowHelp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid && showNext) {
      onNext()
    }
  }

  const renderInput = () => {
    switch (question.type) {
      case 'boolean':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`${question.id}-yes`}
                name={question.id}
                value="true"
                checked={value === true}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-cloudwijk-blue focus:ring-cloudwijk-blue border-gray-300"
              />
              <Label htmlFor={`${question.id}-yes`}>Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`${question.id}-no`}
                name={question.id}
                value="false"
                checked={value === false}
                onChange={(e) => onChange(!e.target.checked)}
                className="h-4 w-4 text-cloudwijk-blue focus:ring-cloudwijk-blue border-gray-300"
              />
              <Label htmlFor={`${question.id}-no`}>Nee</Label>
            </div>
          </div>
        )

      case 'single':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een optie..." />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${question.id}-${option.value}`}
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValue = value || []
                    if (e.target.checked) {
                      onChange([...currentValue, option.value])
                    } else {
                      onChange(currentValue.filter((v: string) => v !== option.value))
                    }
                  }}
                  className="h-4 w-4 text-cloudwijk-blue focus:ring-cloudwijk-blue border-gray-300 rounded"
                />
                <Label htmlFor={`${question.id}-${option.value}`} className="flex-1">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  )}
                </Label>
              </div>
            ))}
          </div>
        )

      case 'text':
        return question.id.includes('context') || question.id.includes('message') ? (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Beschrijf hier..."
            rows={4}
            className="resize-none"
          />
        ) : (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Vul hier in..."
          />
        )

      default:
        return null
    }
  }

  const canProceed = question.required ? (
    question.type === 'multiple' ? (value && Array.isArray(value) && value.length > 0) :
    question.type === 'boolean' ? value !== undefined :
    value && value !== ''
  ) : true

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">
              {question.title}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </CardTitle>
            <CardDescription className="text-base">
              {question.description}
            </CardDescription>
          </div>
          {question.help && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="flex-shrink-0 ml-4"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {showHelp && question.help && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <div className="text-sm text-blue-800">
              <strong>Hulp:</strong> {question.help}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderInput()}
          
          {question.validation && value && (
            <div className="text-sm text-red-600">
              {question.validation(value)}
            </div>
          )}
          
          {showNext && (
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={!canProceed}
                className="min-w-[120px]"
              >
                Volgende
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}