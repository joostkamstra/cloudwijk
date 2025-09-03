'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n, useChangeLocale, useCurrentLocale } from '@/lib/i18n/client'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useI18n()
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.platform'), href: '/platform' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.investors'), href: '/investors' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const toggleLocale = () => {
    const newLocale = currentLocale === 'nl' ? 'en' : 'nl'
    changeLocale(newLocale)
  }

  return (
    <header className={cn('sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b', className)}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Cloudwijk"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-cloudwijk-blue transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className="hidden sm:flex items-center space-x-1"
              title={t('nav.toggleLanguage')}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{currentLocale.toUpperCase()}</span>
            </Button>

            {/* CTA Button */}
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/contact">
                {t('nav.cta')}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('nav.menu')}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-cloudwijk-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex items-center justify-between px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLocale}
                  className="flex items-center space-x-1"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{t('nav.toggleLanguage')}</span>
                </Button>
                
                <Button asChild size="sm">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.cta')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}