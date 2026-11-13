'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock, AlertCircle } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/**
 * ResetPasswordForm — reached from the reset link in the email, via
 * /auth/confirm, which verifies the token and signs the user in before
 * landing here. If there is no session (link expired, already used, or
 * the page was opened directly), the form is replaced with an expired-
 * link message. Minimum password length is 6, matching the project's
 * password_min_length.
 *
 * Invite mode (?mode=invite, set by /auth/confirm after an invite link
 * is verified): same form and same session check, with invite wording —
 * "Set your password" instead of "Choose a new password".
 *
 * On success the form redirects to the dashboard — the ParamToast there
 * carries the confirmation (?toast=password-changed, or
 * ?toast=password-set for invites). There is no inline success screen.
 */
export function ResetPasswordForm({ mode = 'reset' }: { mode?: 'reset' | 'invite' }) {
  const isInvite = mode === 'invite'
  const router = useRouter()
  const [sessionChecked, setSessionChecked] = useState(false)
  const [hasSession, setHasSession] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      setHasSession(Boolean(data.user))
      setSessionChecked(true)
    }
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setStatus('error')
      setErrorMessage('Passwords do not match.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
    } else {
      // Success is confirmed by the dashboard toast, not an inline
      // screen — redirect straight there.
      router.push(isInvite ? '/dashboard?toast=password-set' : '/dashboard?toast=password-changed')
    }
  }

  if (!sessionChecked) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <h3 className="text-lg font-semibold mt-4">Checking your link...</h3>
      </div>
    )
  }

  if (!hasSession) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">
          {isInvite ? 'This invite link has expired' : 'This link has expired'}
        </h3>
        <p className="text-base text-muted-foreground text-center max-w-[300px]">
          {isInvite
            ? 'Invite links work once and last 1 hour. Ask for a new invite to set up your account.'
            : 'Reset links work once and last 1 hour. Request a new one to choose a new password.'}
        </p>
        <Button
          onClick={() => router.push(isInvite ? '/login' : '/auth/forgot-password')}
          className="mt-2 h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          {isInvite ? 'Back to sign in' : 'Request a new reset link'}
        </Button>
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
          {isInvite ? 'Set your password' : 'Choose a new password'}
        </h2>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {isInvite
            ? 'You accepted your invite — set a password to finish setting up your account.'
            : 'At least 6 characters.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="sr-only">New password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="New password"
              className="pl-10 h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="sr-only">Confirm new password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              className="pl-10 h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
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
              <Loader2 className="h-5 w-5 animate-spin" /> Saving...
            </>
          ) : (
            isInvite ? 'Set password' : 'Set new password'
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
