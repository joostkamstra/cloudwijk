'use client'

import React, { createContext, useContext, useState } from 'react'
import nl from './nl'
import en from './en'

const translations = { nl, en }

const I18nContext = createContext({
  locale: 'nl' as 'nl' | 'en',
  changeLocale: (locale: 'nl' | 'en') => {},
  t: (key: string) => key,
})

export function useI18n() {
  const { t } = useContext(I18nContext)
  return t
}

export function useCurrentLocale() {
  const { locale } = useContext(I18nContext)
  return locale
}

export function useChangeLocale() {
  const { changeLocale } = useContext(I18nContext)
  return changeLocale
}

export function I18nProviderClient({ 
  children, 
  locale: initialLocale = 'nl' 
}: { 
  children: React.ReactNode
  locale?: 'nl' | 'en' 
}) {
  const [locale, setLocale] = useState<'nl' | 'en'>(initialLocale as 'nl' | 'en')

  const changeLocale = (newLocale: 'nl' | 'en') => {
    setLocale(newLocale)
  }

  const t = (key: string): string => {
    try {
      const keys = key.split('.')
      let value: any = translations[locale]
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k]
        } else {
          return key
        }
      }
      return value || key
    } catch (error) {
      return key
    }
  }

  return React.createElement(I18nContext.Provider, { value: { locale, changeLocale, t } }, children)
}