'use client'

import { useEffect, useRef } from 'react'
import { useSessionStorage } from './use-session-storage'

interface AutoSaveOptions {
  delay?: number // milliseconds, default 2000
  enabled?: boolean // default true
}

export function useAutoSave<T>(
  key: string,
  data: T,
  options: AutoSaveOptions = {}
) {
  const { delay = 2000, enabled = true } = options
  const [savedData, setSavedData] = useSessionStorage(key, data)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastDataRef = useRef(data)

  useEffect(() => {
    if (!enabled) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Only save if data actually changed
    if (JSON.stringify(data) !== JSON.stringify(lastDataRef.current)) {
      timeoutRef.current = setTimeout(() => {
        setSavedData(data)
        lastDataRef.current = data
        console.log(`Auto-saved to ${key}`)
      }, delay)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, key, delay, enabled, setSavedData])

  return {
    savedData,
    clearSaved: () => setSavedData({} as T),
    hasSavedData: Object.keys(savedData as any).length > 0
  }
}

export function useAssessmentAutoSave(answers: any) {
  const assessmentKey = 'cloudwijk-assessment-draft'
  
  const {
    savedData: savedAnswers,
    clearSaved,
    hasSavedData
  } = useAutoSave(assessmentKey, answers, {
    delay: 3000, // Auto-save every 3 seconds
    enabled: true
  })

  const restoreSavedAssessment = () => savedAnswers
  
  const clearAssessmentDraft = () => {
    clearSaved()
    sessionStorage.removeItem(assessmentKey)
  }

  return {
    savedAnswers,
    restoreSavedAssessment,
    clearAssessmentDraft,
    hasSavedData
  }
}