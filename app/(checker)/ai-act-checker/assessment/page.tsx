'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { ProgressBar } from '@/components/assessment/progress-bar'
import { QuestionCard } from '@/components/assessment/question-card'
import { LeadForm } from '@/components/assessment/lead-form'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { assessmentQuestions, questionSections, getNextQuestions } from '@/lib/ai-act/questions'
import { AssessmentAnswers } from '@/lib/ai-act/types'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AssessmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // State management
  const [currentStep, setCurrentStep] = useState(0)
  const [currentSection, setCurrentSection] = useState<string>('email')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [sessionId] = useState(() => uuidv4())
  const [leadData, setLeadData] = useState<{leadId?: string; email: string; name?: string; company?: string} | null>(null)
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize session
  useEffect(() => {
    sessionStorage.setItem('session-id', sessionId)
  }, [sessionId])

  // Calculate total steps
  const totalQuestions = Object.values(assessmentQuestions).flat().length
  const totalSteps = totalQuestions + 1 // +1 for email step

  // Get current questions based on answers
  const getCurrentQuestions = () => {
    if (currentSection === 'email') return []
    return getNextQuestions(currentSection, answers[currentSection as keyof AssessmentAnswers] || {})
  }

  const currentQuestions = getCurrentQuestions()
  const currentQuestion = currentQuestions[currentQuestionIndex]

  // Handle lead form submission
  const handleLeadSubmit = (data: {leadId?: string; email: string; name?: string; company?: string}) => {
    setLeadData(data)
    setCurrentSection('scope')
    setCurrentQuestionIndex(0)
    setCurrentStep(1)
  }

  // Handle question answer
  const handleAnswer = (questionId: string, value: any) => {
    const sectionKey = currentSection as keyof AssessmentAnswers
    setAnswers(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [questionId]: value
      }
    }))
  }

  // Handle next question
  const handleNext = () => {
    const questions = getCurrentQuestions()
    
    if (currentQuestionIndex < questions.length - 1) {
      // Next question in current section
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentStep(currentStep + 1)
    } else {
      // Move to next section
      const currentSectionIndex = questionSections.indexOf(currentSection as any)
      if (currentSectionIndex < questionSections.length - 1) {
        const nextSection = questionSections[currentSectionIndex + 1]
        if (nextSection) {
          setCurrentSection(nextSection)
          setCurrentQuestionIndex(0)
          setCurrentStep(currentStep + 1)
        }
      } else {
        // Assessment complete
        handleSubmitAssessment()
      }
    }
  }

  // Handle back navigation
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setCurrentStep(currentStep - 1)
    } else {
      // Move to previous section
      const currentSectionIndex = questionSections.indexOf(currentSection as any)
      if (currentSectionIndex > 0) {
        const prevSection = questionSections[currentSectionIndex - 1]
        setCurrentSection(prevSection)
        const prevQuestions = getNextQuestions(prevSection, answers[prevSection as keyof AssessmentAnswers] || {})
        setCurrentQuestionIndex(Math.max(0, prevQuestions.length - 1))
        setCurrentStep(currentStep - 1)
      } else if (currentSection === 'scope') {
        // Back to email form
        setCurrentSection('email')
        setCurrentStep(0)
      }
    }
  }

  // Submit assessment
  const handleSubmitAssessment = async () => {
    if (!leadData) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          leadId: leadData.leadId,
          sessionId,
          answers: answers as AssessmentAnswers,
        }),
      })

      if (!response.ok) {
        throw new Error('Assessment submission failed')
      }

      const result = await response.json()

      // Send email with report
      try {
        await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-session-id': sessionId,
          },
          body: JSON.stringify({
            type: 'assessment_report',
            recipient: leadData.email,
            data: {
              name: leadData.name,
              riskCategory: result.result.riskCategory,
              complianceScore: result.result.complianceScore,
              reportUrl: `${window.location.origin}${result.reportUrl}`,
              assessmentId: result.assessmentId,
            },
            assessmentId: result.assessmentId,
            leadId: leadData.leadId,
          }),
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Don't fail the whole process if email fails
      }

      // Redirect to results
      router.push(`/ai-act-checker/report/${result.assessmentId}`)

    } catch (error) {
      console.error('Assessment error:', error)
      toast({
        title: 'Fout',
        description: 'Er ging iets mis bij het opslaan van uw assessment. Probeer het opnieuw.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={totalSteps}
            currentSection={currentSection}
            className="mb-8"
          />

          {/* Back button */}
          {currentStep > 0 && (
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Vorige
              </Button>
            </div>
          )}

          {/* Content */}
          {currentSection === 'email' ? (
            <LeadForm 
              onSubmit={handleLeadSubmit}
              isSubmitting={isSubmitting}
            />
          ) : currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              value={answers[currentSection as keyof AssessmentAnswers]?.[currentQuestion.id]}
              onChange={(value) => handleAnswer(currentQuestion.id, value)}
              onNext={handleNext}
              showNext={!isSubmitting}
              isValid={true}
            />
          ) : (
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cloudwijk-blue mx-auto"></div>
              <p className="mt-4 text-lg text-gray-600">
                {isSubmitting ? 'Uw assessment wordt verwerkt...' : 'Laden...'}
              </p>
            </div>
          )}

          {/* Footer disclaimer */}
          {currentSection !== 'email' && (
            <div className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto">
              <p>
                Dit is een educatief hulpmiddel gebaseerd op EU AI Act verordening 2024/1689. 
                Het vervangt geen juridisch advies. Voor definitieve compliance-beslissingen 
                raden we aan een AI Act specialist te raadplegen.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}