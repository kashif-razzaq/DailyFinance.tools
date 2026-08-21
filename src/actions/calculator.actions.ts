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
}) {
  const supabase = await getSupabase()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized')
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
    // Insert new
    result = await supabase
      .from('saved_calculators')
      .insert([payload])
      .select()
      .single()
  }

  if (result.error) throw new Error(result.error.message)
  
  revalidatePath('/dashboard')
  return result.data as SavedCalculator
}

/**
 * Clones an existing saved calculator.
 */
export async function cloneCalculatorAction(id: string) {
  const supabase = await getSupabase()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('Unauthorized')

  // Fetch the original
  const { data: original, error: fetchError } = await supabase
    .from('saved_calculators')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !original) throw new Error('Original scenario not found')

  // Insert clone
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
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
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
  
  const { data: { user } } = await supabase.auth.getUser()
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

/**
 * Fetches a specific calculator by ID for embedding or sharing.
 * Bypass RLS if is_public is true by using a service role key OR ensuring RLS allows public reads on is_public=true.
 */
export async function getSharedCalculatorAction(id: string) {
  const supabase = await getSupabase()
  
  // Note: For true public sharing, the RLS policy must be updated to:
  // CREATE POLICY "Public can view shared calculators" ON public.saved_calculators FOR SELECT USING (is_public = true);
  
  const { data, error } = await supabase
    .from('saved_calculators')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  
  // Ensure we don't accidentally leak private calculators if RLS was misconfigured
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === data.user_id
  
  if (!data.is_public && !isOwner) {
    throw new Error('Unauthorized: This scenario is private.')
  }

  return data as SavedCalculator
}
