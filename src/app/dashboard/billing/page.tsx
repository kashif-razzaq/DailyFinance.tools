import type { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Crown, Check } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Subscription — DailyFinance',
  description: 'Your DailyFinance plan and subscription status.',
}

const PRO_FEATURES = [
  'Unlimited Scenario Vault storage',
  'CSV & Excel (XLSX) exports',
  'Premium PDF reports',
  'Cross-data analytics',
  'Zero ads',
]

const FREE_FEATURES = [
  'All 100+ calculators, free forever',
  'Scenario Vault — up to 3 saved scenarios',
  'Basic URL sharing',
]

export default async function BillingPage() {
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
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let status: string = 'free'
  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_status')
      .eq('id', user.id)
      .single()
    status = profile?.subscription_status ?? 'free'
  }
  const isPro = status === 'active'

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">Subscription</h1>
      <p className="mt-1.5 font-light text-muted-foreground">Your current plan, in plain terms.</p>

      <section className="mt-8 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              isPro ? 'bg-[#D97706]/10 text-[#D97706]' : 'bg-muted text-muted-foreground'
            }`}
          >
            {isPro && <Crown className="h-3.5 w-3.5" />}
            {isPro ? 'Pro — active' : status === 'free' ? 'Free plan' : `Plan status: ${status}`}
          </span>
          <p className="text-2xl font-extrabold text-foreground">
            {isPro ? '$2.99' : '$0'}
            <span className="text-base font-semibold text-muted-foreground">/month</span>
          </p>
        </div>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {(isPro ? PRO_FEATURES : FREE_FEATURES).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm font-medium text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#064E3B]" /> {feature}
            </li>
          ))}
        </ul>

        {isPro ? (
          <p className="mt-6 border-t pt-5 text-sm font-light leading-relaxed text-muted-foreground">
            Your Pro plan is active and every feature above is unlocked. If you need to change anything about
            your subscription, write to{' '}
            <a href="mailto:momintechltd@gmail.com" className="font-semibold text-[#064E3B] underline underline-offset-2">
              momintechltd@gmail.com
            </a>{' '}
            and we will sort it the same day.
          </p>
        ) : (
          <div className="mt-6 border-t pt-5">
            <p className="max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
              Pro removes ads and unlocks the Vault, exports and analytics for less than a coffee a month.
              Your saved scenarios carry over — nothing is lost when you upgrade.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#043327]"
            >
              <Crown className="h-4 w-4" /> See Pro — $2.99/mo
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
