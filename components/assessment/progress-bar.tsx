'use client'

import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  currentSection?: string
  className?: string
}

export function ProgressBar({ currentStep, totalSteps, currentSection, className }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  const sections = [
    { key: 'scope', label: 'Scope', color: 'bg-blue-500' },
    { key: 'prohibited', label: 'Verboden', color: 'bg-red-500' },
    { key: 'highRisk', label: 'Hoog-risico', color: 'bg-orange-500' },
    { key: 'exceptions', label: 'Uitzonderingen', color: 'bg-yellow-500' },
    { key: 'limitedRisk', label: 'Beperkt', color: 'bg-amber-500' },
    { key: 'roles', label: 'Rollen', color: 'bg-purple-500' },
    { key: 'gpai', label: 'GPAI', color: 'bg-indigo-500' },
    { key: 'compliance', label: 'Compliance', color: 'bg-green-500' },
  ]

  return (
    <div className={className}>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Stap {currentStep} van {totalSteps}
          </span>
          <span className="text-sm font-medium text-cloudwijk-blue">
            {percentage}% voltooid
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>

      {/* Section indicators */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map((section, index) => {
          const isActive = currentSection === section.key
          const isCompleted = index < currentStep / (totalSteps / sections.length)
          
          return (
            <div
              key={section.key}
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-colors
                ${isActive 
                  ? `${section.color} text-white` 
                  : isCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }
              `}
            >
              {section.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}