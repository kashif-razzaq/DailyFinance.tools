'use client'

import React from 'react'
import Link from 'next/link'
import { Crown, Lock, Check } from 'lucide-react'
import { openLoginModal } from '@/lib/auth-modal'

/**
 * ProGuard — the Pro paywall for Pro-only tools.
 *
 * Pro members (isPro, resolved server-side from the Supabase subscription)
 * see the calculator untouched. Everyone else sees the real calculator
 * behind a soft blur with a lock panel: what the tool does, what it
 * computes, and the two ways in — upgrade, or log in if already Pro.
 * The editorial content below the calculator stays fully readable, so the
 * page still teaches (and ranks) while the interactive tool stays Pro.
 */
export function ProGuard({
  isPro,
  toolTitle,
  features,
  children,
}: {
  isPro: boolean
  toolTitle: string
  features: string[]
  children: React.ReactNode
}) {
  if (isPro) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-[1.5px]" aria-hidden="true" inert>
        {children}
      </div>

      <div className="absolute inset-0 z-10 flex items-start justify-center overflow-y-auto bg-white/55 px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-[#D97706]/25 bg-white p-7 text-center shadow-[0_24px_60px_-16px_rgba(6,78,59,0.35)]">
          <span className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-[#064E3B] text-white">
            <Lock className="h-6 w-6" />
          </span>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#D97706]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#D97706]">
            <Crown className="h-3.5 w-3.5" /> Pro tool
          </p>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-[#1F2937]">{toolTitle}</h2>
          <p className="mt-2 text-sm font-light leading-relaxed text-neutral-500">
            This is one of the advanced tools reserved for Pro members. The full guide below is free to read —
            the interactive tool unlocks with Pro.
          </p>

          <ul className="mt-5 space-y-2 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm font-medium text-[#1F2937]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#064E3B]/10">
                  <Check className="h-3 w-3 text-[#064E3B]" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/pricing"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#064E3B] px-6 py-3 text-sm font-bold text-white shadow transition-all hover:bg-[#043327]"
          >
            <Crown className="h-4 w-4" /> Unlock with Pro — $2.99/mo
          </Link>
          <button
            type="button"
            onClick={() => openLoginModal()}
            className="mt-3 w-full rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-[#1F2937] transition-colors hover:border-[#064E3B] hover:text-[#064E3B]"
          >
            Already Pro? Log in
          </button>
          <p className="mt-4 text-xs font-light text-neutral-400">
            Every free calculator stays free. Pro adds the advanced simulators, unlimited Vault, exports and
            analytics.
          </p>
        </div>
      </div>
    </div>
  )
}
