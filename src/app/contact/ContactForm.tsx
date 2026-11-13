'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  submitContactAction,
  generateMathCaptchaAction,
  type ContactSubmitResult,
  type MathCaptchaChallenge,
} from '@/actions/contact.actions'
import { CONTACT_TYPES, type ContactInquiryType } from '@/lib/contact'

/**
 * ContactForm — the /contact form: name, email, inquiry type, message,
 * plus a math-question check and a honeypot field.
 *
 * The math question is issued by the server as an HMAC-signed challenge
 * (see contact.actions.ts) and verified server-side on submit — the
 * client never sees the answer. A wrong answer shows an inline error and
 * loads a fresh question.
 *
 * The inquiry type can be preselected with ?type= on the URL (validated
 * server-side in page.tsx and passed in as initialType).
 */

export function ContactForm({ initialType = 'other' }: { initialType?: ContactInquiryType }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState<ContactInquiryType>(initialType)
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [challenge, setChallenge] = useState<MathCaptchaChallenge | null>(null)
  const [challengeLoading, setChallengeLoading] = useState(true)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const loadChallenge = useCallback(async () => {
    setChallengeLoading(true)
    setCaptchaAnswer('')
    try {
      setChallenge(await generateMathCaptchaAction())
    } catch {
      // Challenge failed to load — the form shows a retry, and a submit
      // without a challenge surfaces as a verification error.
      setChallenge(null)
    } finally {
      setChallengeLoading(false)
    }
  }, [])

  // Load the first question when the form mounts.
  useEffect(() => {
    loadChallenge()
  }, [loadChallenge])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setErrorMessage('')

    let result: ContactSubmitResult
    try {
      result = await submitContactAction({
        name,
        email,
        type,
        message,
        captcha: challenge ? { ...challenge, answer: captchaAnswer } : null,
        honeypot,
      })
    } catch {
      // The action itself threw (network or server failure) instead of
      // returning an error — surface the form's error state rather than
      // leaving the button stuck on "Sending…".
      setStatus('error')
      setErrorMessage('Something went wrong sending your message. Please try again.')
      return
    }

    if (result.ok) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMessage(result.error)
      // A failed verification gets a fresh question, so the old answer
      // cannot simply be retried.
      if (result.refreshCaptcha) {
        await loadChallenge()
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Message sent</h3>
        <p className="text-base text-muted-foreground max-w-[360px]">
          Thanks — we read every message and aim to reply within 2–3 working days.
        </p>
      </div>
    )
  }

  const opWord = challenge
    ? challenge.op === '×'
      ? 'times'
      : challenge.op === '-'
        ? 'minus'
        : 'plus'
    : ''

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={100}
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email address</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={254}
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-type">What is this about?</Label>
        <select
          id="contact-type"
          value={type}
          onChange={(e) => setType(e.target.value as ContactInquiryType)}
          required
          className="h-12 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {CONTACT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us what you need — for business enquiries, include your website and audience."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          maxLength={5000}
          className="rounded-xl min-h-[140px] text-base md:text-sm"
        />
      </div>

      {/* Honeypot — hidden from people, visible to bots. A filled value
          means the submission is spam and is silently dropped server-side. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Math question — issued by the server as a signed challenge, so the
          answer is verified server-side and cannot be forged. */}
      <div className="space-y-2">
        <Label htmlFor="contact-captcha">Verification</Label>
        {challenge ? (
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="text-base font-semibold text-foreground tabular-nums">
              {challenge.a} {challenge.op} {challenge.b} =
            </span>
            <Input
              id="contact-captcha"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Answer"
              aria-label={`What is ${challenge.a} ${opWord} ${challenge.b}?`}
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              required
              maxLength={4}
              className="h-12 w-28 rounded-xl"
            />
            <button
              type="button"
              onClick={loadChallenge}
              aria-label="Get a new question"
              title="New question"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-input bg-background text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {challengeLoading ? 'Loading verification…' : 'Verification could not load.'}
            </span>
            {!challengeLoading && (
              <button
                type="button"
                onClick={loadChallenge}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Retry
              </button>
            )}
          </div>
        )}
        <p className="text-xs text-muted-foreground">A quick check that you are human.</p>
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'loading' || !challenge}
        className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  )
}
