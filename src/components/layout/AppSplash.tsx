'use client'

import { useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'

/**
 * App-style splash screen (Kashif's request, 2026-11-09 — site should feel
 * like an app on phones). Rules:
 * - Mobile only (max-width 767px); desktop never sees it.
 * - Once per browser session (sessionStorage "df-splash-seen").
 * - Auto-dismisses in ~950ms, or immediately on tap; it never blocks
 *   interaction once dismissed and is pointer-events-none while fading.
 * - Skipped entirely when the user prefers reduced motion.
 */
export function AppSplash() {
  const [phase, setPhase] = useState<'hidden' | 'visible' | 'leaving'>('hidden')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!mobile || reducedMotion) return
    if (sessionStorage.getItem('df-splash-seen')) return
    sessionStorage.setItem('df-splash-seen', '1')

    const raf = requestAnimationFrame(() => setPhase('visible'))
    const t1 = setTimeout(() => setPhase('leaving'), 650)
    const t2 = setTimeout(() => setPhase('hidden'), 950)
    timers.current = [t1, t2]
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      timers.current = []
    }
  }, [])

  if (phase === 'hidden') return null

  const dismiss = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('leaving')
    timers.current.push(setTimeout(() => setPhase('hidden'), 300))
  }

  return (
    <div
      role="presentation"
      onClick={dismiss}
      className={`md:hidden fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background px-6 transition-opacity duration-300 ${
        phase === 'leaving' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-500">
        <span className="bg-primary/10 p-3.5 rounded-2xl">
          <Logo className="h-12 w-12" />
        </span>
        <span className="font-bold text-3xl tracking-tight text-foreground">
DailyFinance
        </span>
        <p className="text-sm text-muted-foreground text-center">
          Precision-engineered financial calculators.
        </p>
      </div>
      <div className="w-36 h-1 rounded-full bg-primary/15 overflow-hidden" aria-hidden="true">
        <div className="h-full w-12 rounded-full bg-primary animate-df-progress" />
      </div>
    </div>
  )
}
