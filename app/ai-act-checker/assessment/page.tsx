'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function AssessmentPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 10

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Progress value={(step / totalSteps) * 100} className="mb-8" />
        
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">
            Step {step} of {totalSteps}
          </h2>
          
          <div className="space-y-6">
            <p className="text-gray-600">
              Assessment questions will appear here. This is a placeholder for the actual assessment flow.
            </p>
            
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Previous
              </Button>
              <Button 
                onClick={() => setStep(Math.min(totalSteps, step + 1))}
              >
                {step === totalSteps ? 'Complete' : 'Next'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}