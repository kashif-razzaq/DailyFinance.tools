'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import nodemailer from 'nodemailer'
import { CONTACT_TYPE_LABELS, isValidContactType, type ContactInquiryType } from '@/lib/contact'

/**
 * Contact form submissions (/contact) — paid promotion, guest posting,
 * white label, and anything else.
 *
 * Every submission is stored in Supabase (contact_submissions) AND emailed
 * to info@dailyfinance.tools. The Supabase insert is the record of truth:
 * if the email fails, the submission is still saved and the visitor still
 * sees success — a failed email is an ops problem, not the visitor's.
 *
 * Bot protection, in order:
 * 1. Honeypot field (bots fill it, people never see it) — silently dropped.
 * 2. Cloudflare Turnstile, verified server-side against the secret key.
 *    When TURNSTILE_SECRET_KEY is not set (local dev before keys exist),
 *    verification is skipped and a warning is logged — the form must work
 *    in dev, but production without keys is unprotected. Add both
 *    Turnstile keys to Vercel before this is spam-safe.
 *
 * Email goes out over Zoho SMTP (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS).
 * Supabase's own SMTP settings are Auth-only and cannot send from the app,
 * so this uses nodemailer directly. When SMTP_USER/SMTP_PASS are not set,
 * email is skipped (logged) and the Supabase record is the only copy.
 */

export type { ContactInquiryType } from '@/lib/contact'

export type ContactSubmitInput = {
  name: string
  email: string
  type: ContactInquiryType
  message: string
  /** Cloudflare Turnstile token from the widget; null when the widget is not configured. */
  turnstileToken: string | null
  /** Honeypot — must stay empty. */
  honeypot?: string
}

export type ContactSubmitResult = { ok: true } | { ok: false; error: string }

const CONTACT_EMAIL = 'info@dailyfinance.tools'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.warn('[contact] TURNSTILE_SECRET_KEY is not set — skipping captcha verification (dev only)')
    return true
  }
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch (error) {
    console.error('[contact] Turnstile verification request failed:', error)
    return false
  }
}

async function sendContactEmail(input: {
  name: string
  email: string
  type: ContactInquiryType
  message: string
}): Promise<void> {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) {
    console.warn('[contact] SMTP_USER/SMTP_PASS are not set — skipping email, submission saved to Supabase only')
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtppro.zoho.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  })

  const label = CONTACT_TYPE_LABELS[input.type]
  const textBody = [
    `New ${label} inquiry from the DailyFinance contact form.`,
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Type: ${label}`,
    '',
    'Message:',
    input.message,
    '',
    'A copy is stored in Supabase (contact_submissions).',
  ].join('\n')

  await transporter.sendMail({
    from: `"DailyFinance Contact Form" <${user}>`,
    to: CONTACT_EMAIL,
    replyTo: input.email,
    subject: `[DailyFinance] ${label} inquiry from ${input.name}`,
    text: textBody,
    html: [
      `<p>New <strong>${escapeHtml(label)}</strong> inquiry from the DailyFinance contact form.</p>`,
      `<p><strong>Name:</strong> ${escapeHtml(input.name)}<br />`,
      `<strong>Email:</strong> ${escapeHtml(input.email)}<br />`,
      `<strong>Type:</strong> ${escapeHtml(label)}</p>`,
      `<p><strong>Message:</strong></p>`,
      `<p>${escapeHtml(input.message).replace(/\n/g, '<br />')}</p>`,
      `<p style="color:#666;font-size:12px;">A copy is stored in Supabase (contact_submissions).</p>`,
    ].join('\n'),
  })
}

export async function submitContactAction(input: ContactSubmitInput): Promise<ContactSubmitResult> {
  // 1. Honeypot — a filled hidden field means a bot. Drop it silently and
  // pretend it worked, so the bot gets no signal.
  if (input.honeypot) {
    return { ok: true }
  }

  // 2. Validate.
  const name = input.name.trim()
  const email = input.email.trim()
  const message = input.message.trim()
  if (name.length < 2 || name.length > 100) {
    return { ok: false, error: 'Please enter your name.' }
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (!isValidContactType(input.type)) {
    return { ok: false, error: 'Please choose an inquiry type.' }
  }
  if (message.length < 10 || message.length > 5000) {
    return { ok: false, error: 'Please write a message between 10 and 5,000 characters.' }
  }

  // 3. Turnstile verification (verifyTurnstile skips + warns when no secret
  // key is configured — local dev only).
  if (process.env.TURNSTILE_SECRET_KEY && !input.turnstileToken) {
    return { ok: false, error: 'Please complete the verification check.' }
  }
  const verified = await verifyTurnstile(input.turnstileToken ?? '')
  if (!verified) {
    return { ok: false, error: 'Verification failed. Please try again.' }
  }

  // 4. Store in Supabase (the backup record — and the only copy when email is unconfigured).
  // NOTE: plain .insert() with no .select() — the table has an INSERT-only
  // RLS policy, so asking for the inserted row back (return=representation)
  // would fail RLS. Verified live 2026-11-13: anon insert 201, anon select 0 rows.
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

  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    type: input.type,
    message,
  })

  if (error) {
    console.error('[contact] Failed to save submission:', error)
    return { ok: false, error: `Something went wrong saving your message. Please email us directly at ${CONTACT_EMAIL}.` }
  }

  // 5. Email it to the team. A failed send is logged but does not fail the
  // submission — the Supabase record is already safe.
  try {
    await sendContactEmail({ name, email, type: input.type, message })
  } catch (error) {
    console.error('[contact] Failed to send notification email:', error)
  }

  return { ok: true }
}
