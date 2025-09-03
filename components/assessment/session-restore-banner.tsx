'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RotateCcw, X, Clock } from 'lucide-react'

interface SessionRestoreBannerProps {
  onRestore: () => void
  onDismiss: () => void
  lastSaved?: Date
}

export function SessionRestoreBanner({ 
  onRestore, 
  onDismiss, 
  lastSaved 
}: SessionRestoreBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss()
  }

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return 'zojuist'
    if (minutes === 1) return '1 minuut geleden'
    if (minutes < 60) return `${minutes} minuten geleden`
    
    const hours = Math.floor(minutes / 60)
    if (hours === 1) return '1 uur geleden'
    return `${hours} uur geleden`
  }

  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-800">
                Je hebt een onvoltooide assessment
              </p>
              <p className="text-sm text-orange-600">
                {lastSaved 
                  ? `Laatst opgeslagen: ${formatLastSaved(lastSaved)}`
                  : 'Wil je doorgaan waar je was gebleven?'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRestore}
              className="text-orange-700 border-orange-300 hover:bg-orange-100"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Hervatten
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-orange-600 hover:bg-orange-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}