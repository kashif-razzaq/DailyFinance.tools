'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { verifyEmailTokenAction } from '@/actions/auth.actions'

/**
 * ConfirmClient — ONE screen for every Supabase email-link verification
 * (sign-up confirm, invite, magic link, password recovery, email change).
 *
 * Email links point here with a token hash:
 *   /auth/confirm?token_hash=...&type=signup&next=/dashboard
 * Token-hash links verify on any device, unlike the default PKCE links,
 * which only work in the browser that requested them.
 *
 * States: verifying → success (auto-redirect) or error (friendly copy +
 * the right CTA for the link type). The page also has an error-DISPLAY
 * mode (?error=expired|failed) used by the PKCE callback when an old-style
 * link fails — in that mode no verification is attempted.
 *
 * Security notes:
 * - `next` is validated with the same rules as the callback route
 *   (same-site relative paths only; anything else falls back to
 *   /dashboard) and is honoured ONLY for signup/magiclink.
 * - `type` is whitelisted before any verifyOtp call; UI strings come
 *   only from the TYPE_CONTENT map below — the raw query value is never
 *   rendered.
 * - The token hash is passed only to the server action; it is never
 *   logged, never stored, and never appears in a redirect URL.
 * - Error copy is identical for expired, already-used and invalid
 *   tokens, so the page never reveals whether an email or user exists.
 * - A ref guards the effect so React StrictMode double-invocation
 *   cannot fire verifyOtp twice for one page load.
 */

type VerifyType = 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change'

const VALID_TYPES: readonly VerifyType[] = [
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
]

function validType(raw: string | null): VerifyType | null {
  if (!raw) return null
  return (VALID_TYPES as readonly string[]).includes(raw) ? (raw as VerifyType) : null
}

/**
 * Only same-site relative paths may be used as the post-auth destination.
 * Mirrors getSafeNext in src/app/auth/callback/route.ts — kept in sync
 * deliberately (a crafted `next` param must never turn this page into
 * an open redirect).
 */
function getSafeNext(raw: string | null): string {
  if (!raw) return '/dashboard'
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/dashboard'
  if (raw.includes('://') || raw.includes('\\')) return '/dashboard'
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) return '/dashboard'
  return raw
}

/** Per-type copy and routing. UI strings come only from this map. */
const TYPE_CONTENT: Record<
  VerifyType,
  {
    successHeading: string
    successBody: string
    redirectNote: string
    errorBody: string
    ctaLabel: string
    ctaHref: string
  }
> = {
  signup: {
    successHeading: "You're signed in",
    successBody: 'Your email is confirmed. Welcome to DailyFinance.',
    redirectNote: 'Taking you to your dashboard…',
    errorBody: 'Links work once and last 1 hour. Request a new one below.',
    ctaLabel: 'Request a new sign-in link',
    ctaHref: '/login',
  },
  magiclink: {
    successHeading: "You're signed in",
    successBody: 'Welcome back.',
    redirectNote: 'Taking you to your dashboard…',
    errorBody: 'Links work once and last 1 hour. Request a new one below.',
    ctaLabel: 'Request a new sign-in link',
    ctaHref: '/login',
  },
  recovery: {
    successHeading: 'Link confirmed',
    successBody: 'Now choose a new password.',
    redirectNote: 'Taking you to set a new password…',
    errorBody: 'Reset links work once and last 1 hour. Request a new one below.',
    ctaLabel: 'Request a new reset link',
    ctaHref: '/auth/forgot-password',
  },
  email_change: {
    successHeading: 'Email address updated',
    successBody: 'Your new email address is confirmed.',
    redirectNote: 'Taking you to your settings…',
    errorBody: 'Links work once and last 1 hour. Request a new one below.',
    ctaLabel: 'Request a new sign-in link',
    ctaHref: '/login',
  },
  invite: {
    successHeading: 'Invite accepted',
    successBody: 'Set a password to finish setting up your account.',
    redirectNote: 'Taking you to set your password…',
    errorBody: 'Invite links work once and last 1 hour. Ask for a new invite to set up your account.',
    ctaLabel: 'Back to sign in',
    ctaHref: '/login',
  },
}

const DEFAULT_ERROR = {
  errorBody: 'Links work once and last 1 hour. Request a new one below.',
  ctaLabel: 'Request a new sign-in link',
  ctaHref: '/login',
}

/**
 * Where a verified link lands. `next` is honoured ONLY for signup and
 * magiclink; every other type has a fixed destination, so a crafted
 * next param cannot reroute a recovery or invite link. The signed-in
 * toast param is added only for destinations under /dashboard, where
 * the toast catalog lives (ParamToast is mounted globally, but the
 * dashboard is where these landings happen).
 */
function destinationFor(type: VerifyType, rawNext: string | null): string {
  switch (type) {
    case 'recovery':
      return '/auth/reset-password'
    case 'email_change':
      return '/dashboard/settings?toast=email-changed'
    case 'invite':
      return '/auth/reset-password?mode=invite'
    case 'signup':
    case 'magiclink': {
      const dest = getSafeNext(rawNext)
      if (!dest.startsWith('/dashboard')) return dest
      const toast = type === 'signup' ? 'email-confirmed' : 'signed-in'
      const [path, frag] = dest.split('#', 2)
      const sep = path.includes('?') ? '&' : '?'
      return `${path}${sep}toast=${toast}${frag ? `#${frag}` : ''}`
    }
  }
}

type Phase = 'verifying' | 'success' | 'error'

const VERIFY_MIN_MS = 1200
const SUCCESS_HOLD_MS = 1500

export function ConfirmClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('verifying')
  const [verifiedType, setVerifiedType] = useState<VerifyType | null>(null)
  const [errorType, setErrorType] = useState<VerifyType | null>(null)
  const attemptedRef = useRef(false)

  useEffect(() => {
    // Single attempt: the ref stops React StrictMode's double-invocation
    // from firing verifyOtp twice for one page load. (No `cancelled`
    // flag: the StrictMode remount runs cleanup before the async work
    // finishes, and a cancelled flag would strand the page on
    // "Verifying" in dev. Setting state after unmount is a harmless
    // no-op in React 18+.)
    if (attemptedRef.current) return
    attemptedRef.current = true

    let redirectTimer: ReturnType<typeof setTimeout> | undefined

    const run = async () => {
      // Error-display mode (from the PKCE callback): show the error
      // state WITHOUT attempting verification. Every ?error value —
      // mapped ('expired' | 'failed') or anything else — renders the
      // same generic error state; the raw query value is never rendered
      // and never changes the copy, so unknown values are
      // indistinguishable from the mapped ones.
      const errorParam = searchParams.get('error')
      if (errorParam !== null) {
        setErrorType(validType(searchParams.get('type')))
        setPhase('error')
        return
      }

      const tokenHash = searchParams.get('token_hash')
      const type = validType(searchParams.get('type'))
      if (!tokenHash || !type) {
        setErrorType(type)
        setPhase('error')
        return
      }

      const started = Date.now()
      const result = await verifyEmailTokenAction(tokenHash, type)
      // Hold the verifying state for at least ~1.2s so it reads as a
      // real step instead of a flash.
      const elapsed = Date.now() - started
      if (elapsed < VERIFY_MIN_MS) {
        await new Promise((resolve) => setTimeout(resolve, VERIFY_MIN_MS - elapsed))
      }

      if (!result.ok) {
        setErrorType(type)
        setPhase('error')
        return
      }

      setVerifiedType(type)
      setPhase('success')
      const dest = destinationFor(type, searchParams.get('next'))
      redirectTimer = setTimeout(() => router.replace(dest), SUCCESS_HOLD_MS)
    }

    run()
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
    // Run once on mount: the params are read at load time and the page
    // never re-verifies for the same load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'verifying') {
    return (
      <div className="py-8 flex flex-col items-center justify-center space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300">
        <Loader2 className="h-12 w-12 text-primary animate-spin motion-reduce:animate-none" />
        <h2 className="text-xl font-bold tracking-tight text-foreground mt-2">
          Verifying your link…
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-[280px]">
          This takes a moment.
        </p>
      </div>
    )
  }

  if (phase === 'success' && verifiedType) {
    const content = TYPE_CONTENT[verifiedType]
    return (
      <div className="py-8 flex flex-col items-center justify-center space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300">
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-2 text-center">
          {content.successHeading}
        </h2>
        <p className="text-base text-muted-foreground text-center max-w-[300px]">
          {content.successBody}
        </p>
        <p className="text-sm text-muted-foreground text-center flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
          {content.redirectNote}
        </p>
      </div>
    )
  }

  // Error state — identical copy whether the link expired, was already
  // used, or was never valid. The CTA follows the link type.
  const errorContent = errorType ? TYPE_CONTENT[errorType] : DEFAULT_ERROR
  return (
    <div className="py-8 flex flex-col items-center justify-center space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-300">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-2 text-center">
        This link has expired or was already used
      </h2>
      <p className="text-base text-muted-foreground text-center max-w-[300px]">
        {errorContent.errorBody}
      </p>
      <div className="w-full pt-2">
        <Link
          href={errorContent.ctaHref}
          className="flex w-full h-12 items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          {errorContent.ctaLabel}
        </Link>
      </div>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  )
}
