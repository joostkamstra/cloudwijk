export const defaultLocale = 'nl' as const
export const locales = ['nl', 'en'] as const

export type Locale = typeof locales[number]

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getDefaultLocale(): Locale {
  return defaultLocale
}

export function getValidLocale(locale?: string): Locale {
  if (locale && isValidLocale(locale)) {
    return locale
  }
  return defaultLocale
}

export const localeNames: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
}

export const localeFlags: Record<Locale, string> = {
  nl: '🇳🇱',
  en: '🇬🇧',
}