import type { User } from '@supabase/supabase-js'

/**
 * safeGetUser — auth.getUser() that cannot take the site down.
 *
 * Supabase THROWS AuthRetryableFetchError on network-level failures
 * (status 0: the auth server could not be reached) instead of returning
 * an error object. Unguarded, that throw kills whatever is rendering —
 * it intermittently broke live page loads and made link clicks appear
 * to "go nowhere" whenever the Vercel → Supabase fetch hiccuped
 * (production log, 2026-11-11).
 *
 * On any failure this degrades to "logged out" for the current render
 * only; the next request retries, so the state self-heals. Accepts any
 * of the SSR clients used across the app (structural typing on purpose).
 */
type GetUserClient = {
  auth: {
    getUser: () => Promise<{ data: { user: User | null } }>
  }
}

export async function safeGetUser(supabase: GetUserClient): Promise<User | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch {
    return null
  }
}
