'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { SavedCalculator } from '@/types/database'

// Helper to get authenticated Supabase client in Server Actions
async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
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
            // Can be ignored in Server Actions
          }
        },
      },
    }
  )
}

/** Freemium rule (matches /pricing): free accounts may keep up to FREE_VAULT_LIMIT
 *  saved scenarios; Pro (subscription_status = 'active') is unlimited. */
const FREE_VAULT_LIMIT = 3

/**
 * getSession that cannot leak a transport error. Supabase throws
 * AuthRetryableFetchError when the auth server is unreachable (project
 * paused, DNS gone, network down); unguarded, that raw error reaches the
 * client, which cannot tell it apart from a generic failure and shows a
 * dead "could not save" message. Treating it as signed out routes the
 * caller into the normal 'Unauthorized' path — the client turns that
 * into the sign-in popup, as designed.
 */
async function getSessionSafe(supabase: Awaited<ReturnType<typeof getSupabase>>) {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  } catch {
    return { session: null, error: null }
  }
}

async function vaultLimitMessage(supabase: Awaited<ReturnType<typeof getSupabase>>, userId: string): Promise<string | null> {
  const { data: profile } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('id', userId)
    .single()
  if (profile?.subscription_status === 'active') return null
  const { count } = await supabase
    .from('saved_calculators')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  if ((count ?? 0) >= FREE_VAULT_LIMIT) {
    return `Free accounts can save up to ${FREE_VAULT_LIMIT} scenarios. Upgrade to Pro for unlimited Vault storage.`
  }
  return null
}

async function assertVaultCapacity(supabase: Awaited<ReturnType<typeof getSupabase>>, userId: string) {
  const message = await vaultLimitMessage(supabase, userId)
  if (message) throw new Error(message)
}

/** Save outcomes travel as RETURN VALUES, never thrown errors: production
 *  builds redact thrown server-action messages before they reach the
 *  browser, so the client cannot branch on them. Callers convert the
 *  result back into local errors with unwrapSaveResult (lib/save-result). */
export type SaveCalculatorResult =
  | { ok: true; data: SavedCalculator }
  | { ok: false; reason: 'unauthorized' | 'limit' | 'error'; message: string }

/**
 * Saves or updates a calculator scenario state for the logged-in user.
 */
export async function saveCalculatorAction({
  id,
  calculator_slug,
  category = 'uncategorized',
  saved_name,
  input_state,
  core_metric,
  is_public = false
}: {
  id?: string;
  calculator_slug: string;
  category?: string;
  saved_name: string;
  input_state: Record<string, unknown>;
  core_metric?: number;
  is_public?: boolean;
}): Promise<SaveCalculatorResult> {
  const supabase = await getSupabase()

  // Fast local session decoding (RLS securely enforces validity at the DB level)
  const { session, error: authError } = await getSessionSafe(supabase)
  const user = session?.user
  if (authError || !user) {
    return { ok: false, reason: 'unauthorized' as const, message: 'Unauthorized' }
  }

  const payload = {
    user_id: user.id,
    calculator_slug,
    category,
    saved_name,
    input_state,
    core_metric,
    is_public,
  }

  let result;
  if (id) {
    // Update existing
    result = await supabase
      .from('saved_calculators')
      .update(payload)
      .eq('id', id)
      .eq('user_id', user.id) // Extra safety check
      .select()
      .single()
  } else {
    // Insert new — enforce the free-tier Vault limit (Pro is unlimited)
    const limitMessage = await vaultLimitMessage(supabase, user.id)
    if (limitMessage) return { ok: false, reason: 'limit' as const, message: limitMessage }
    result = await supabase
      .from('saved_calculators')
      .insert([payload])
      .select()
      .single()
  }

  if (result.error) return { ok: false, reason: 'error' as const, message: result.error.message }

  revalidatePath('/dashboard')
  return { ok: true as const, data: result.data as SavedCalculator }
}

/**
 * Clones an existing saved calculator.
 */
export async function cloneCalculatorAction(id: string) {
  const supabase = await getSupabase()
  
  const { session, error: authError } = await getSessionSafe(supabase)
  const user = session?.user
  if (authError || !user) throw new Error('Unauthorized')

  // Fetch the original
  const { data: original, error: fetchError } = await supabase
    .from('saved_calculators')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !original) throw new Error('Original scenario not found')

  // Insert clone — same Vault capacity rule as a fresh save
  await assertVaultCapacity(supabase, user.id)
  const { data: clone, error: insertError } = await supabase
    .from('saved_calculators')
    .insert([{
      user_id: user.id,
      calculator_slug: original.calculator_slug,
      category: original.category,
      saved_name: `Copy of ${original.saved_name}`,
      input_state: original.input_state,
      core_metric: original.core_metric,
      is_public: false, // Clones are private by default
    }])
    .select()
    .single()

  if (insertError) throw new Error(insertError.message)
  
  revalidatePath('/dashboard')
  return clone as SavedCalculator
}

/**
 * Fetches all saved calculators for the logged-in user's dashboard.
 */
export async function getSavedCalculatorsAction() {
  const supabase = await getSupabase()
  
  const { session, error: authError } = await getSessionSafe(supabase)
  const user = session?.user
  if (authError || !user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('saved_calculators')
    .select('*')
    .eq('user_id', user.id)
    .order('last_updated', { ascending: false })

  if (error) throw new Error(error.message)
  return data as SavedCalculator[]
}

/**
 * Deletes a specific saved calculator.
 */
export async function deleteCalculatorAction(id: string) {
  const supabase = await getSupabase()
  
  const { session } = await getSessionSafe(supabase)
  const user = session?.user
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('saved_calculators')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/dashboard')
  return true
}

export type SetCalculatorPublicResult =
  | { ok: true; isPublic: boolean }
  | { ok: false; reason: 'unauthorized' | 'forbidden' | 'not-found' | 'error'; message: string }

/**
 * Turns live sharing on or off for one saved scenario (Pro only).
 *
 * The caller must own the scenario AND hold an active Pro subscription —
 * both checks run server-side; the Vault card's Pro gating is display
 * only. Sharing makes the scenario readable by anyone with its link
 * (see the "Public can view shared calculators" RLS policy); turning
 * sharing off makes the link open the tool with its defaults.
 */
export async function setCalculatorPublicAction(
  id: string,
  isPublic: boolean
): Promise<SetCalculatorPublicResult> {
  const supabase = await getSupabase()

  const { session, error: authError } = await getSessionSafe(supabase)
  const user = session?.user
  if (authError || !user) {
    return { ok: false, reason: 'unauthorized', message: 'Unauthorized' }
  }

  // Ownership: the scenario must belong to the caller.
  const { data: existing, error: fetchError } = await supabase
    .from('saved_calculators')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()
  if (fetchError || !existing) {
    return { ok: false, reason: 'not-found', message: 'Scenario not found.' }
  }

  // Pro only: live sharing is a Pro feature (/pricing).
  const { data: profile } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('id', user.id)
    .single()
  if (profile?.subscription_status !== 'active') {
    return { ok: false, reason: 'forbidden', message: 'Live sharing is a Pro feature. Upgrade to Pro to share scenarios.' }
  }

  const { error } = await supabase
    .from('saved_calculators')
    .update({ is_public: isPublic })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { ok: false, reason: 'error', message: error.message }
  }

  revalidatePath('/dashboard')
  return { ok: true, isPublic }
}

/**
 * Fetches a specific calculator by ID for embedding or sharing.
 * Public scenarios (is_public = true) are readable by anyone through the
 * "Public can view shared calculators" RLS policy; private ones stay
 * owner-only, enforced here as well as by RLS.
 */
export async function getSharedCalculatorAction(id: string) {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('saved_calculators')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  
  // Ensure we don't accidentally leak private calculators if RLS was misconfigured
  const { session } = await getSessionSafe(supabase)
  const user = session?.user
  const isOwner = user?.id === data.user_id
  
  if (!data.is_public && !isOwner) {
    throw new Error('Unauthorized: This scenario is private.')
  }

  return data as SavedCalculator
}
