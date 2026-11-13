import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Only same-site relative paths may be used as the post-auth destination.
 * Anything else — absolute URLs, protocol-relative URLs, schemes,
 * backslashes — falls back to /dashboard, so a crafted `next` param can
 * never turn this route into an open redirect. Query strings on relative
 * paths are allowed (e.g. /dashboard/settings?email-changed=1).
 */
function getSafeNext(raw: string | null): string {
  if (!raw) return '/dashboard'
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/dashboard'
  if (raw.includes('://') || raw.includes('\\')) return '/dashboard'
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) return '/dashboard'
  return raw
}

/**
 * Map GoTrue's error params to the friendly reason the /auth/confirm
 * page understands. Expired or already-used links are the common case
 * (access_denied / otp_expired); anything else is a generic failure.
 */
function mapSupabaseError(error: string | null, errorCode: string | null): string {
  if (errorCode === 'otp_expired' || error === 'access_denied') return 'expired'
  return 'failed'
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = getSafeNext(searchParams.get('next'))

  // GoTrue sends error params (not a code) when a link is expired,
  // invalid, or already used — send the user to the confirm screen's
  // error state with a mapped reason instead of failing silently.
  const supabaseError = searchParams.get('error')
  if (supabaseError) {
    const reason = mapSupabaseError(supabaseError, searchParams.get('error_code'))
    return NextResponse.redirect(`${origin}/auth/confirm?error=${reason}`)
  }

  if (code) {
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
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // No code, or the exchange failed (expired or already-used link):
  // send the user to the confirm screen's error state with something
  // actionable.
  return NextResponse.redirect(`${origin}/auth/confirm?error=expired`)
}
