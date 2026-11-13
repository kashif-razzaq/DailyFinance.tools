'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, Lock, AlertCircle } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/**
 * ResetPasswordForm — reached from the reset link in the email, via
 * /auth/callback, which exchanges the code for a session before landing
 * here. If there is no session (link expired, already used, or the page
 * was opened directly), the form is replaced with an expired-link message.
 * Minimum password length is 6, matching the project's password_min_length.
 */
export function ResetPasswordForm() {
  const router = useRouter()
  const [sessionChecked, setSessionChecked] = useState(false)
  const [hasSession, setHasSession] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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
      setStatus('success')
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
        <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">This link has expired</h3>
        <p className="text-base text-muted-foreground text-center max-w-[300px]">
          Reset links work once and last 1 hour. Request a new one to choose a new password.
        </p>
        <Button
          onClick={() => router.push('/auth/forgot-password')}
          className="mt-2 h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          Request a new reset link
        </Button>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">Password changed</h3>
        <p className="text-base text-muted-foreground text-center max-w-[300px]">
          Your new password is set. You are signed in.
        </p>
        <Button
          onClick={() => router.push('/dashboard')}
          className="mt-2 h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          Go to your dashboard
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
          Choose a new password
        </h2>
        <p className="text-center text-sm text-muted-foreground mt-2">
          At least 6 characters.
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
            'Set new password'
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
