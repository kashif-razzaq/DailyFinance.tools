'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback-dev-secret-2026'

// 1. Generate a cryptographically signed math puzzle
export async function generateCaptchaAction() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  const timestamp = Date.now()
  
  // Create a signature so the client cannot simply send back 1+1=2 without it originating from here
  const payload = `${a}:${b}:${timestamp}`
  const signature = crypto.createHmac('sha256', CAPTCHA_SECRET).update(payload).digest('hex')
  
  return { a, b, timestamp, signature }
}

export type LeadSubmitResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitAccountingLeadAction(formData: FormData): Promise<LeadSubmitResponse> {
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

  // 1. Honeypot check (hidden field to catch bots)
  const honeypot = formData.get('company_website')
  if (honeypot) {
    return { success: false, message: 'Spam detected.' } // silently fail
  }

  // 2. Math Captcha verification
  const a = parseInt(formData.get('captcha_a') as string || '0', 10)
  const b = parseInt(formData.get('captcha_b') as string || '0', 10)
  const timestamp = parseInt(formData.get('captcha_timestamp') as string || '0', 10)
  const signature = formData.get('captcha_signature') as string
  const userAnswer = parseInt(formData.get('captcha_answer') as string || '0', 10)

  // Re-verify signature
  const payload = `${a}:${b}:${timestamp}`
  const expectedSignature = crypto.createHmac('sha256', CAPTCHA_SECRET).update(payload).digest('hex')
  
  if (signature !== expectedSignature) {
    return { success: false, message: 'Invalid captcha signature. Please refresh.' }
  }

  // Time-to-fill check (Must be completed within 10 minutes, and take at least 3 seconds)
  const timeElapsed = Date.now() - timestamp
  if (timeElapsed > 10 * 60 * 1000) {
    return { success: false, message: 'Captcha expired. Please refresh and try again.' }
  }
  if (timeElapsed < 3000) {
    return { success: false, message: 'Spam detected (filled too quickly).' }
  }

  // Math check
  if (userAnswer !== a + b) {
    return { success: false, message: 'Incorrect math answer. Please try again.' }
  }

  // 3. Extract and validate Lead Data
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const bestTime = formData.get('best_time') as string
  const details = formData.get('details') as string
  const sourceUrl = formData.get('source_url') as string

  if (!email || !details) {
    return { success: false, message: 'Email and request details are required.' }
  }

  // 4. Save to Supabase
  const { error } = await supabase
    .from('accounting_leads')
    .insert({
      email,
      phone: phone || null,
      best_time_to_connect: bestTime || null,
      request_details: details,
      source_url: sourceUrl || null
    })

  if (error) {
    console.error('Failed to save lead:', error)
    return { success: false, message: 'Failed to submit request. Please try again later.' }
  }

  return { success: true }
}
