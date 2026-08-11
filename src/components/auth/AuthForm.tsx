'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2, Mail, AlertCircle, Lock } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export type AuthMode = 'magic' | 'login' | 'signup'

export function AuthForm({ 
  onSuccess,
  defaultMode = 'magic'
}: { 
  onSuccess?: () => void
  defaultMode?: AuthMode
}) {
  const [mode, setMode] = useState<AuthMode>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    const supabase = createClient()
    let authError: any = null

    if (mode === 'magic') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
      })
      authError = error
    } else if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      authError = error
    } else if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
      })
      authError = error
    }

    if (authError) {
      setStatus('error')
      setErrorMessage(authError.message)
    } else {
      if (mode === 'login') {
        if (onSuccess) onSuccess()
        router.refresh()
        router.push('/dashboard')
      } else {
        setStatus('success')
      }
    }
  }

  const resetState = () => {
    setStatus('idle')
    setErrorMessage('')
    setPassword('')
  }

  if (status === 'loading') {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <h3 className="text-lg font-semibold mt-4">
          {mode === 'magic' ? 'Sending Link...' : 'Authenticating...'}
        </h3>
        <p className="text-sm text-muted-foreground text-center">Securely connecting to your account.</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <CheckCircle2 className="h-16 w-16 text-emerald-500" />
        <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">Check your email!</h3>
        <p className="text-base text-muted-foreground text-center max-w-[250px]">
          We sent a secure link to <strong>{email}</strong> to verify your account.
        </p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="py-8 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h3 className="text-lg font-semibold mt-4">Something went wrong</h3>
        <p className="text-sm text-destructive text-center max-w-[250px]">{errorMessage}</p>
        <Button variant="outline" className="mt-4" onClick={resetState}>
          Try again
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
          {mode === 'signup' ? 'Create an account' : 'Welcome back'}
        </h2>
        <p className="text-center text-sm text-muted-foreground mt-2">
          {mode === 'signup' 
            ? 'Sign up to save your calculator scenarios.' 
            : 'Sign in to access your saved scenarios.'}
        </p>
      </div>

      {mode !== 'signup' && (
        <div className="flex bg-muted/50 p-1 rounded-xl mb-6">
          <button 
            type="button"
            onClick={() => { setMode('magic'); resetState(); }}
            className={cn("flex-1 text-sm font-medium py-2 rounded-lg transition-all", mode === 'magic' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Magic Link
          </button>
          <button 
            type="button"
            onClick={() => { setMode('login'); resetState(); }}
            className={cn("flex-1 text-sm font-medium py-2 rounded-lg transition-all", mode === 'login' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            Password
          </button>
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
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

        {(mode === 'login' || mode === 'signup') && (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <Label htmlFor="password" className="sr-only">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                id="password" 
                type="password" 
                placeholder="Password" 
                className="pl-10 h-12 text-base rounded-xl bg-muted/50 focus-visible:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>
        )}

        <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]">
          {mode === 'magic' ? 'Send Magic Link' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          type="button" 
          onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); resetState(); }}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          {mode === 'signup' ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
