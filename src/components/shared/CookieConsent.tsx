'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'df-cookie-consent'

/** Dispatched by the footer's Cookie settings button to re-open the banner. */
export const COOKIE_SETTINGS_EVENT = 'df:reopen-cookie-consent'

/** Re-opens the consent banner so the visitor can change their choice. */
export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT))
}

/**
 * Footer "Cookie settings" control (TD04). A client component exported from
 * here so the server-rendered Footer can use it without becoming a client
 * component itself. Clicking re-opens the banner; choosing again overwrites
 * the stored value, so no key-clearing or reload is needed.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  )
}

/**
 * Cookie consent banner (framework line 15). Slim, non-blocking: the page
 * stays fully usable behind it. The choice is stored in localStorage
 * ("df-cookie-consent" = "accepted" | "declined") and the banner never shows
 * again once a choice exists. The choice can be revisited any time from the
 * footer's "Cookie settings" button, which dispatches COOKIE_SETTINGS_EVENT
 * and re-opens the banner. On mobile it sits above the MobileBottomNav
 * (bottom-20) so the two never overlap; on desktop it is a compact card in
 * the bottom-right corner. Copy is honest: no analytics, no advertising
 * cookies run today — when optional cookies are ever added, they must gate
 * on this consent.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    // Small delay so the banner never competes with first paint / the splash.
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Footer "Cookie settings" control: re-open the banner on demand, even
  // when a choice is already stored. Choosing again overwrites the key.
  useEffect(() => {
    const reopen = () => setVisible(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
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
      className="fixed z-[90] inset-x-3 bottom-20 md:inset-x-auto md:right-4 md:bottom-4 md:w-[380px] animate-in fade-in slide-in-from-bottom-4 duration-300 print:hidden"
    >
      <div className="rounded-2xl border bg-card text-card-foreground shadow-xl p-4">
        <div className="flex items-start gap-3">
          <span className="bg-primary/10 p-2 rounded-lg shrink-0">
            <Cookie className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <p className="text-xs leading-relaxed text-muted-foreground">
            One cookie keeps you signed in; your preferences (currency, theme)
            stay on your device. We run no analytics and no advertising
            cookies. Read the{' '}
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
            className="flex-1 rounded-xl font-semibold bg-primary hover:bg-primary/90 h-12"
          >
            Accept
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => choose('declined')}
            className="flex-1 rounded-xl font-semibold h-12"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  )
}
