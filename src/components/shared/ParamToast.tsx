'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SaveToast } from '@/components/shared/SaveToast'

/**
 * ParamToast — the ONE host for param-driven toasts, mounted globally
 * in ConditionalLayout so any page can show one. It reads the `?toast=`
 * search param, shows the matching toast from the catalog below through
 * the shared SaveToast design, auto-dismisses after 5s, and strips the
 * param from the URL so a refresh or back-button press never re-shows
 * it.
 *
 * Only whitelisted param values produce a toast; anything else is
 * ignored, and the raw param value is never rendered.
 *
 * The catalog carries a `variant` per entry: the error (red) variant is
 * supported by the host for future use, but no error toast is wired in
 * this round — every entry below is a success toast.
 */

type ToastEntry = {
  message: string
  actionLabel: string
  actionHref: string
  variant: 'success' | 'error'
}

const TOAST_CATALOG: Record<string, ToastEntry> = {
  'signed-in': {
    message: "You're signed in.",
    actionLabel: 'Browse calculators',
    actionHref: '/tools',
    variant: 'success',
  },
  'email-confirmed': {
    message: 'Email confirmed — welcome to DailyFinance.',
    actionLabel: 'Browse calculators',
    actionHref: '/tools',
    variant: 'success',
  },
  'password-changed': {
    message: 'Password changed.',
    actionLabel: 'View Vault',
    actionHref: '/dashboard',
    variant: 'success',
  },
  'password-set': {
    message: 'Password set — welcome to DailyFinance.',
    actionLabel: 'Browse calculators',
    actionHref: '/tools',
    variant: 'success',
  },
  'email-changed': {
    message: 'Email address changed.',
    actionLabel: 'View Vault',
    actionHref: '/dashboard',
    variant: 'success',
  },
  'signed-out': {
    message: "You've signed out.",
    actionLabel: 'Sign in again',
    actionHref: '/login',
    variant: 'success',
  },
}

export function ParamToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [entry, setEntry] = useState<ToastEntry | null>(null)
  const shownRef = useRef(false)

  useEffect(() => {
    const raw = searchParams.get('toast')
    const found = raw ? TOAST_CATALOG[raw] : undefined
    if (!found) {
      // No (or unknown) toast param: re-arm for a future one.
      shownRef.current = false
      return
    }
    if (shownRef.current) return
    shownRef.current = true
    setEntry(found)

    // Strip the param so the toast shows exactly once.
    const params = new URLSearchParams(searchParams.toString())
    params.delete('toast')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })

    const timer = setTimeout(() => setEntry(null), 5000)
    return () => clearTimeout(timer)
  }, [searchParams, router, pathname])

  return (
    <SaveToast
      show={entry !== null}
      variant={entry?.variant ?? 'success'}
      message={entry?.message}
      actionLabel={entry?.actionLabel}
      actionHref={entry?.actionHref}
      onClose={() => setEntry(null)}
    />
  )
}
