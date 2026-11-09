'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'df-cookie-consent'

/**
 * Cookie consent banner (Google/AdSense requirement). Slim, non-blocking:
 * the page stays fully usable behind it. The choice is stored in
 * localStorage ("df-cookie-consent" = "accepted" | "declined") and the
 * banner never shows again once a choice exists. On mobile it sits above
 * the MobileBottomNav (bottom-20) so the two never overlap; on desktop it
 * is a compact card in the bottom-right corner.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    // Small delay so the banner never competes with first paint / the splash.
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  const choose = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed z-[90] inset-x-3 bottom-20 md:inset-x-auto md:right-4 md:bottom-4 md:w-[380px] animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="rounded-2xl border bg-card text-card-foreground shadow-xl p-4">
        <div className="flex items-start gap-3">
          <span className="bg-primary/10 p-2 rounded-lg shrink-0">
            <Cookie className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <p className="text-xs leading-relaxed text-muted-foreground">
            We use cookies for analytics and to serve ads that keep these
            calculators free. Read the{' '}
            <Link href="/cookies" className="font-medium text-foreground underline underline-offset-2 hover:text-primary">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 mt-3.5">
          <Button
            type="button"
            size="sm"
            onClick={() => choose('accepted')}
            className="flex-1 rounded-xl font-semibold bg-primary hover:bg-primary/90"
          >
            Accept
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => choose('declined')}
            className="flex-1 rounded-xl font-semibold"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  )
}
