import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Crown } from 'lucide-react'
import Link from 'next/link'
import { SettingsClient } from './SettingsClient'

export const metadata: Metadata = {
  title: 'Profile & Settings — DailyFinance',
  description: 'Your DailyFinance profile, plan and preferences.',
}

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
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
}

export default async function SettingsPage() {
  const supabase = await getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isPro = false
  let memberSince: string | null = null
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_status, created_at')
      .eq('id', user.id)
      .single()
    isPro = profile?.subscription_status === 'active'
    memberSince = profile?.created_at ?? user.created_at ?? null
  }

  const { count: vaultCount } = user
    ? await supabase
        .from('saved_calculators')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
    : { count: 0 }

  const email = user?.email ?? ''
  const displayName =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    email.split('@')[0] ||
    'Account'
  const initials =
    displayName
      .replace(/[^a-zA-Z ]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'U'

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">Profile &amp; settings</h1>
      <p className="mt-1.5 font-light text-muted-foreground">Who you are, what plan you are on, and how DailyFinance behaves for you.</p>

      {/* Profile */}
      <section className="mt-8 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#064E3B] to-[#0B7A5C] text-xl font-bold text-white">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-foreground">{displayName}</p>
            <p className="truncate text-sm text-muted-foreground">{email}</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {memberSince
                ? `Member since ${new Date(memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
                : 'Member'}
            </p>
          </div>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              isPro ? 'bg-[#D97706]/10 text-[#D97706]' : 'bg-muted text-muted-foreground'
            }`}
          >
            {isPro && <Crown className="h-3.5 w-3.5" />}
            {isPro ? 'Pro plan' : 'Free plan'}
          </span>
        </div>

        <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-muted/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Scenario Vault</p>
            <p className="mt-1.5 text-2xl font-extrabold text-foreground">
              {vaultCount ?? 0}
              <span className="text-base font-semibold text-muted-foreground"> / {isPro ? '∞' : '3'} saved</span>
            </p>
            <p className="mt-1 text-sm font-light text-muted-foreground">
              {isPro ? 'Unlimited saves with Pro.' : 'Free accounts keep up to 3 saved scenarios.'}
            </p>
          </div>
          <div className="rounded-2xl bg-muted/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Plan</p>
            <p className="mt-1.5 text-2xl font-extrabold text-foreground">{isPro ? 'Pro' : 'Free'}</p>
            <p className="mt-1 text-sm font-light text-muted-foreground">
              {isPro ? 'All Pro features are unlocked on this account.' : 'Every calculator is free. Pro adds the power features.'}
            </p>
          </div>
        </div>

        {!isPro && (
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#043327]"
          >
            <Crown className="h-4 w-4" /> Upgrade to Pro — $2.99/mo
          </Link>
        )}
      </section>

      {/* Preferences + account actions (client island) */}
      <SettingsClient />
    </div>
  )
}
