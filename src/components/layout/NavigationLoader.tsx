'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * NavigationLoader — the site's full-screen branded loader.
 *
 * Next's route-level `loading.tsx` rarely gets a chance to paint on a fully
 * static site (pages resolve almost instantly), so this loader is driven by
 * the click itself: it appears the moment a visitor taps an internal link
 * and fades out as soon as the new route lands, with a short minimum display
 * so it never strobes. External links, new-tab links, downloads, hash links,
 * mailto/tel and modifier-clicks are ignored, and a 5s safety timer
 * guarantees it can never get stuck on screen.
 *
 * The mark is the DailyFinance bar-chart logo brought to life: four bars
 * pulsing like a market equalizer inside a glass tile, over a deep emerald
 * backdrop with a soft gold glow.
 */
export function NavigationLoader() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const shownAt = useRef(0)
  const firstRender = useRef(true)

  // Show instantly on any internal link click (capture phase, so we paint
  // before the router starts work).
  useEffect(() => {
    let safety: number | undefined
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement | null)?.closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return
      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      shownAt.current = Date.now()
      setVisible(true)
      window.clearTimeout(safety)
      safety = window.setTimeout(() => setVisible(false), 5000)
    }
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.clearTimeout(safety)
    }
  }, [])

  // Fade out when the new route lands — but never before ~350ms on screen.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const wait = Math.max(0, 350 - (Date.now() - shownAt.current))
    const t = window.setTimeout(() => setVisible(false), wait)
    return () => window.clearTimeout(t)
  }, [pathname])

  // Back/forward navigation never fires our click handler.
  useEffect(() => {
    const onPop = () => setVisible(false)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-hidden={!visible}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#04382A] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Soft ambient glows */}
      <div aria-hidden="true" className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Glass tile with the animated bar-chart mark */}
      <div className="relative flex h-24 w-24 items-end justify-center gap-[6px] rounded-[1.75rem] border border-white/10 bg-white/5 pb-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
        <span className="df-eq-bar h-4 w-[7px] rounded-full bg-emerald-300" />
        <span className="df-eq-bar h-7 w-[7px] rounded-full bg-white" style={{ animationDelay: '0.12s' }} />
        <span className="df-eq-bar h-10 w-[7px] rounded-full bg-amber-400" style={{ animationDelay: '0.24s' }} />
        <span className="df-eq-bar h-6 w-[7px] rounded-full bg-white" style={{ animationDelay: '0.36s' }} />
      </div>

      <p className="relative mt-6 text-[1.7rem] font-bold leading-none tracking-tight text-white">
        Daily<span className="text-amber-400">Finance</span>
      </p>
      <p className="relative mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-100/60">
        Crunching the numbers
      </p>

      {/* Gold progress shimmer */}
      <div className="relative mt-8 h-[3px] w-44 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
        <div className="animate-df-progress h-full w-16 rounded-full bg-amber-400" />
      </div>
    </div>
  )
}
