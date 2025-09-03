'use client'

import { Button } from '@/components/ui/button'

export function SkipLink() {
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Button
      onClick={skipToMain}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-cloudwijk-blue text-white hover:bg-cloudwijk-blue/90"
      onFocus={(e) => {
        e.target.classList.remove('sr-only')
      }}
      onBlur={(e) => {
        e.target.classList.add('sr-only')
      }}
    >
      Ga naar hoofdinhoud
    </Button>
  )
}