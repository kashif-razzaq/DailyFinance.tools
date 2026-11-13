'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Globe2, CheckCircle2, AlertCircle, Loader2, Mail, Lock } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { CurrencySelector } from '@/components/layout/CurrencySelector'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * SettingsClient — the interactive half of /dashboard/settings:
 * the currency preference (writes to the same persisted global settings
 * store the header switcher uses, so every calculator follows it), the
 * email-address and password changes, and the sign-out action.
 *
 * Email change: secure email change is on in the project, so the change
 * needs confirmation from BOTH the old and the new inbox before it takes
 * effect — the copy below says so.
 */
export function SettingsClient({ email }: { email: string }) {
  const router = useRouter()

  const [newEmail, setNewEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [emailMessage, setEmailMessage] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [passwordMessage, setPasswordMessage] = useState('')

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/?toast=signed-out')
    router.refresh()
  }

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail) return

    setEmailStatus('loading')
    setEmailMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser(
      { email: newEmail },
      { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard/settings?email-changed=1` }
    )

    if (error) {
      setEmailStatus('error')
      setEmailMessage(error.message)
    } else {
      setEmailStatus('success')
      setEmailMessage(
        'Check both inboxes. Confirm the change from your current email address and from your new one — the change takes effect once both are confirmed.'
      )
      setNewEmail('')
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setPasswordStatus('error')
      setPasswordMessage('Passwords do not match.')
      return
    }

    setPasswordStatus('loading')
    setPasswordMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setPasswordStatus('error')
      setPasswordMessage(error.message)
    } else {
      setPasswordStatus('success')
      setPasswordMessage('Your password has been changed.')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  return (
    <>
      <section className="mt-6 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
          <Globe2 className="h-4.5 w-4.5 text-[#064E3B]" /> Preferences
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Currency</p>
            <p className="mt-0.5 max-w-md text-sm font-light text-muted-foreground">
              Used across every calculator on this device — amounts, charts and exports all follow your choice.
            </p>
          </div>
          <CurrencySelector />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
          <Mail className="h-4.5 w-4.5 text-[#064E3B]" /> Email address
        </h2>
        <p className="mt-2 max-w-md text-sm font-light text-muted-foreground">
          Current address: <span className="font-semibold text-foreground">{email}</span>
        </p>
        <p className="mt-1 max-w-md text-sm font-light text-muted-foreground">
          Changing your email sends a confirmation link to both your current address and the new one. The change takes effect once both are confirmed.
        </p>
        <form onSubmit={handleChangeEmail} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1 space-y-2 sm:max-w-sm">
            <Label htmlFor="new-email" className="sr-only">New email address</Label>
            <Input
              id="new-email"
              type="email"
              placeholder="New email address"
              className="h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={emailStatus === 'loading'}
            className="inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#043327] disabled:opacity-60"
          >
            {emailStatus === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
            Change email
          </button>
        </form>
        {emailStatus === 'success' && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            <p className="text-sm font-medium text-emerald-900">{emailMessage}</p>
          </div>
        )}
        {emailStatus === 'error' && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{emailMessage}</p>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
          <Lock className="h-4.5 w-4.5 text-[#064E3B]" /> Password
        </h2>
        <p className="mt-2 max-w-md text-sm font-light text-muted-foreground">
          At least 6 characters.
        </p>
        <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-0 flex-1 space-y-2 sm:max-w-sm">
              <Label htmlFor="new-password" className="sr-only">New password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="New password"
                className="h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-2 sm:max-w-sm">
              <Label htmlFor="confirm-new-password" className="sr-only">Confirm new password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                className="h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={passwordStatus === 'loading'}
            className="inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#043327] disabled:opacity-60"
          >
            {passwordStatus === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
            Change password
          </button>
        </form>
        {passwordStatus === 'success' && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            <p className="text-sm font-medium text-emerald-900">{passwordMessage}</p>
          </div>
        )}
        {passwordStatus === 'error' && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-sm text-destructive">{passwordMessage}</p>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <h2 className="text-base font-bold text-foreground">Account</h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-sm font-light text-muted-foreground">
            Sign out of DailyFinance on this device. Your saved scenarios stay in your account.
          </p>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-destructive/30 px-5 py-2.5 text-sm font-bold text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </section>
    </>
  )
}
