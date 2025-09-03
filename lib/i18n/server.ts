import nl from './nl'
import en from './en'

const translations = { nl, en }

export function getI18n(locale: 'nl' | 'en' = 'nl') {
  const t = translations[locale]
  return (key: string) => {
    try {
      const keys = key.split('.')
      let value: any = t
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = value[k]
        } else {
          console.warn(`Translation key not found: ${key} at ${k}`)
          return key
        }
      }
      return value || key
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error)
      return key
    }
  }
}

export function getCurrentLocale() {
  return 'nl' as const
}

export function getLocaleFromRequest(request?: Request): string {
  if (!request) return 'nl'
  
  const url = new URL(request.url)
  const localeFromPath = url.pathname.split('/')[1]
  
  if (localeFromPath === 'en') return 'en'
  return 'nl'
}

export function getLocaleFromHeaders(headers?: Headers): string {
  if (!headers) return 'nl'
  
  const acceptLanguage = headers.get('accept-language')
  if (!acceptLanguage) return 'nl'
  
  // Simple language detection - prioritize Dutch for NL market
  if (acceptLanguage.includes('en') && !acceptLanguage.includes('nl')) {
    return 'en'
  }
  
  return 'nl'
}