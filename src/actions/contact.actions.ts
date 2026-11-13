'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import crypto from 'crypto'
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
 * 2. A math question (e.g. 3 + 4 = ?) issued by the server as an
 *    HMAC-signed challenge. The client sends the challenge back with its
 *    answer; the server re-checks the signature and the answer, so a bot
 *    cannot forge a challenge or skip the question. No third party, no
 *    keys to configure. The HMAC secret is CAPTCHA_SECRET when set
 *    (recommended in Vercel), otherwise the same fallback the lead form
 *    uses.
 *
 * Email goes out over Zoho SMTP (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS).
 * Supabase's own SMTP settings are Auth-only and cannot send from the app,
 * so this uses nodemailer directly. When SMTP_USER/SMTP_PASS are not set,
 * email is skipped (logged) and the Supabase record is the only copy.
 */

export type { ContactInquiryType } from '@/lib/contact'

export type MathCaptchaOperator = '+' | '-' | '×'

export type MathCaptchaChallenge = {
  a: number
  b: number
  op: MathCaptchaOperator
  timestamp: number
  signature: string
}

/** The challenge echoed back by the client, plus its answer. */
export type MathCaptchaSubmission = MathCaptchaChallenge & { answer: string }

export type ContactSubmitInput = {
  name: string
  email: string
  type: ContactInquiryType
  message: string
  /** The signed math challenge plus the visitor's answer; null before the challenge loads. */
  captcha: MathCaptchaSubmission | null
  /** Honeypot — must stay empty. */
  honeypot?: string
}

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; error: string; refreshCaptcha?: boolean }

const CONTACT_EMAIL = 'info@dailyfinance.tools'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Same secret chain as the lead form's captcha (lead.actions.ts).
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback-dev-secret-2026'

const CAPTCHA_MAX_AGE_MS = 10 * 60 * 1000 // 10 minutes
const CAPTCHA_MIN_AGE_MS = 3000 // 3 seconds — faster than a person can read and answer

function captchaSignature(a: number, op: string, b: number, timestamp: number): string {
  return crypto.createHmac('sha256', CAPTCHA_SECRET).update(`${a}:${op}:${b}:${timestamp}`).digest('hex')
}

function captchaAnswer(a: number, op: MathCaptchaOperator, b: number): number {
  if (op === '-') return a - b
  if (op === '×') return a * b
  return a + b
}

/** Issues a fresh signed math question for the contact form. */
export async function generateMathCaptchaAction(): Promise<MathCaptchaChallenge> {
  const ops: MathCaptchaOperator[] = ['+', '-', '×']
  const op = ops[Math.floor(Math.random() * ops.length)]

  let a: number
  let b: number
  if (op === '×') {
    // Keep products small enough to do in your head.
    a = Math.floor(Math.random() * 8) + 2
    b = Math.floor(Math.random() * 8) + 2
  } else if (op === '-') {
    // Non-negative result.
    a = Math.floor(Math.random() * 15) + 5
    b = Math.floor(Math.random() * a) + 1
  } else {
    a = Math.floor(Math.random() * 18) + 2
    b = Math.floor(Math.random() * 18) + 2
  }

  const timestamp = Date.now()
  return { a, b, op, timestamp, signature: captchaSignature(a, op, b, timestamp) }
}

function verifyMathCaptcha(captcha: MathCaptchaSubmission | null): { ok: true } | { ok: false; error: string } {
  if (!captcha) {
    return { ok: false, error: 'Please answer the verification question.' }
  }
  const { a, b, op, timestamp, signature, answer } = captcha
  if (
    !Number.isInteger(a) || !Number.isInteger(b) ||
    (op !== '+' && op !== '-' && op !== '×') ||
    !Number.isInteger(timestamp) || typeof signature !== 'string'
  ) {
    return { ok: false, error: 'Please answer the verification question.' }
  }
  if (typeof answer !== 'string' || answer.trim() === '' || !Number.isInteger(Number(answer))) {
    return { ok: false, error: 'Please answer the verification question.' }
  }

  // The challenge must be one this server issued.
  if (signature !== captchaSignature(a, op, b, timestamp)) {
    return { ok: false, error: 'Verification failed. Please try the new question.' }
  }

  // Must be answered within 10 minutes, and not faster than a person can read it.
  const age = Date.now() - timestamp
  if (age > CAPTCHA_MAX_AGE_MS) {
    return { ok: false, error: 'The verification question expired. Please answer the new one.' }
  }
  if (age < CAPTCHA_MIN_AGE_MS) {
    return { ok: false, error: 'Please wait a moment, then answer the new question.' }
  }

  if (Number(answer) !== captchaAnswer(a, op, b)) {
    return { ok: false, error: 'That answer was wrong — please try the new question.' }
  }
  return { ok: true }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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

  // 3. Math captcha — the challenge is HMAC-signed by the server, so the
  // answer and the challenge are both re-checked here, never trusted.
  // A failed check tells the form to load a fresh question.
  const captcha = verifyMathCaptcha(input.captcha)
  if (!captcha.ok) {
    return { ok: false, error: captcha.error, refreshCaptcha: true }
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
