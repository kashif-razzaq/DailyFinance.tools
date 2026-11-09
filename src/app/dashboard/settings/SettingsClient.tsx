'use client'

import { useRouter } from 'next/navigation'
import { LogOut, Globe2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { CurrencySelector } from '@/components/layout/CurrencySelector'

/**
 * SettingsClient — the interactive half of /dashboard/settings:
 * the currency preference (writes to the same persisted global settings
 * store the header switcher uses, so every calculator follows it) and
 * the sign-out action.
 */
export function SettingsClient() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
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
