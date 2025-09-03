import { createI18nServer } from 'next-international/server'
import { getValidLocale } from './config'

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    nl: () => import('./nl'),
    en: () => import('./en'),
  })

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