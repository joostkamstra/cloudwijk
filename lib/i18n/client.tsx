'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import nl from './nl'
import en from './en'

const translations = { nl, en }

const I18nContext = createContext<{
  locale: 'nl' | 'en'
  t: any
  changeLocale: (newLocale: 'nl' | 'en') => void
}>({
  locale: 'nl',
  t: nl,
  changeLocale: () => {}
})

export function I18nProviderClient({ 
  children, 
  locale: initialLocale 
}: { 
  children: ReactNode
  locale?: 'nl' | 'en' 
}) {
  const [locale, setLocale] = useState<'nl' | 'en'>(initialLocale || 'nl')

  useEffect(() => {
    // Check localStorage for saved locale preference
    const savedLocale = localStorage.getItem('cloudwijk-locale') as 'nl' | 'en'
    if (savedLocale && (savedLocale === 'nl' || savedLocale === 'en')) {
      setLocale(savedLocale)
    }
  }, [])

  const changeLocale = (newLocale: 'nl' | 'en') => {
    setLocale(newLocale)
    localStorage.setItem('cloudwijk-locale', newLocale)
    
    // Update document lang attribute
    document.documentElement.lang = newLocale
  }

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], changeLocale }}>
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
  const { changeLocale } = useContext(I18nContext)
  return changeLocale
}