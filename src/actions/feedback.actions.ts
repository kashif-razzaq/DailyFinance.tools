'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getFeedbackAction(slug: string) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const { data, error } = await supabase
    .from('calculator_feedback')
    .select('upvotes, downvotes')
    .eq('calculator_slug', slug)
    .single()

  if (error || !data) {
    return { upvotes: 0, downvotes: 0 }
  }

  return data
}

export async function voteFeedbackAction(slug: string, type: 'up' | 'down') {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  // We fetch current to increment, though in production a postgres RPC function is better for atomic increments
  const { data: current } = await supabase
    .from('calculator_feedback')
    .select('upvotes, downvotes')
    .eq('calculator_slug', slug)
    .single()

  let upvotes = current?.upvotes || 0
  let downvotes = current?.downvotes || 0

  if (type === 'up') upvotes++
  if (type === 'down') downvotes++

  const { data, error } = await supabase
    .from('calculator_feedback')
    .upsert({ 
      calculator_slug: slug, 
      upvotes, 
      downvotes 
    })
    .select()
    .single()

  if (error) {
    console.error('Failed to save vote', error)
    throw new Error('Failed to save vote')
  }

  return data
}
