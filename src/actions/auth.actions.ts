'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * verifyEmailTokenAction — verifies a Supabase email-link token hash.
 *
 * Email links in the DailyFinance templates point at /auth/confirm with a
 * token hash ({{ .TokenHash }}), NOT the default PKCE ConfirmationURL.
 * PKCE links only exchange in the browser that requested them (the
 * verifier lives in that browser's storage), so a link requested on one
 * device and opened on another fails with "auth code error". Token-hash
 * links verify on any device via verifyOtp.
 *
 * Runs ONLY server-side, with the publishable key and the @supabase/ssr
 * client. The session is set through the client's cookie setAll, exactly
 * like the /auth/callback route. Never call verifyOtp from the browser,
 * and never use the secret/service key here.
 *
 * Returns a typed result — never throws. Production redacts messages
 * thrown inside server actions, so the outcome travels as data (same
 * pattern as saveCalculatorAction in calculator.actions.ts). The token
 * hash is never logged and never appears in any error message.
 */

export type VerifyEmailTokenType =
  | 'signup'
  | 'invite'
  | 'magiclink'
  | 'recovery'
  | 'email_change'

const VALID_TYPES: readonly VerifyEmailTokenType[] = [
  'signup',
  'invite',
  'magiclink',
  'recovery',
  'email_change',
]

export type VerifyEmailTokenResult =
  | { ok: true }
  | { ok: false; reason: 'expired' | 'failed' }

/**
 * Verifies one email-link token. 'expired' covers expired, already-used
 * and invalid tokens — the client shows identical copy for all of them,
 * so the result never reveals whether an email or user exists.
 * 'failed' is reserved for transport errors reaching Supabase.
 */
export async function verifyEmailTokenAction(
  tokenHash: string,
  type: string
): Promise<VerifyEmailTokenResult> {
  // Defence in depth: the client validates first, but the action never
  // trusts its input — unknown types are rejected before any verifyOtp
  // call, and an empty hash is rejected outright.
  if (!tokenHash || !VALID_TYPES.includes(type as VerifyEmailTokenType)) {
    return { ok: false, reason: 'failed' }
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Can be ignored in Server Actions.
          }
        },
      },
    }
  )

  try {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as VerifyEmailTokenType,
    })
    if (error) {
      return { ok: false, reason: 'expired' }
    }
    return { ok: true }
  } catch {
    return { ok: false, reason: 'failed' }
  }
}
