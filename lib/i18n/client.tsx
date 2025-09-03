'use client'

import { createContext, useContext, ReactNode } from 'react'
import nl from './nl'
import en from './en'

const translations = { nl, en }

const I18nContext = createContext<{
  locale: 'nl' | 'en'
  t: typeof nl
}>({
  locale: 'nl',
  t: nl
})

export function I18nProviderClient({ 
  children, 
  locale = 'nl' 
}: { 
  children: ReactNode
  locale?: 'nl' | 'en' 
}) {
  return (
    <I18nContext.Provider value={{ locale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const { t } = useContext(I18nContext)
  return (key: string) => {
    const keys = key.split('.')
    let value: any = t
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // fallback to key if not found
      }
    }
    return value || key
  }
}

export function useCurrentLocale() {
  const { locale } = useContext(I18nContext)
  return locale
}

export function useChangeLocale() {
  return (newLocale: 'nl' | 'en') => {
    window.location.href = `/${newLocale}`
  }
}