'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, Mail, AlertCircle } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

/**
 * ForgotPasswordForm — sends a password reset email. The link in the email
 * goes through /auth/callback, which exchanges the code for a session and
 * sends the user to /auth/reset-password to choose a new password.
 * Reset links work once and expire in 1 hour (mailer_otp_exp = 3600).
 */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    })

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">Check your email</h3>
        <p className="text-base text-muted-foreground text-center max-w-[300px]">
          We sent a password reset link to <strong>{email}</strong>. The link works once and expires in 1 hour.
        </p>
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 mt-2"
        >
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 w-full max-w-sm mx-auto">
      <div className="mb-6 flex flex-col items-center">
        <div className="bg-primary/10 p-2 rounded-lg mb-4">
          <Logo className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl text-center font-bold tracking-tight text-foreground">
          Reset your password
        </h2>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Enter the email address for your account and we will send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10 h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Sending...
            </>
          ) : (
            'Send reset link'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
