'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/client'

export function Footer() {
  const t = useI18n()

  const footerLinks = {
    product: [
      { name: t('footer.product.checker'), href: '/ai-act-checker' },
      { name: t('footer.product.platform'), href: '/platform' },
      { name: t('footer.product.consulting'), href: '/contact' },
      { name: t('footer.product.pricing'), href: '/platform#pricing' },
    ],
    company: [
      { name: t('footer.company.about'), href: '/about' },
      { name: t('footer.company.team'), href: '/about#team' },
      { name: t('footer.company.careers'), href: '/careers' },
      { name: t('footer.company.contact'), href: '/contact' },
    ],
    legal: [
      { name: t('footer.legal.privacy'), href: '/privacy' },
      { name: t('footer.legal.terms'), href: '/terms' },
      { name: t('footer.legal.security'), href: '/security' },
      { name: t('footer.legal.gdpr'), href: '/gdpr' },
    ],
    support: [
      { name: t('footer.support.help'), href: '/help' },
      { name: t('footer.support.documentation'), href: '/docs' },
      { name: t('footer.support.status'), href: '/status' },
      { name: t('footer.support.contact'), href: '/contact' },
    ],
  }

  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Cloudwijk"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>EU Hosted</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>AI Act Ready</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {t('footer.links.product')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-cloudwijk-blue transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {t('footer.links.company')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-cloudwijk-blue transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {t('footer.links.legal')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-cloudwijk-blue transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {t('footer.links.support')}
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-cloudwijk-blue transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-600">{t('footer.copyright')}</p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500">
                Made with ❤️ in the Netherlands 🇳🇱
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}