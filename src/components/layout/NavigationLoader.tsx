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
 * Design: the classic DailyFinance light loader — warm off-white backdrop
 * with a soft emerald glow, the bar-chart logo brought to life as an
 * equalizer inside a white glass tile, the wordmark, and a slim emerald
 * progress shimmer.
 */
export function NavigationLoader() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const shownAt = useRef(0)
  const firstRender = useRef(true)
  const showTimer = useRef<number | undefined>(undefined)

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
      window.clearTimeout(safety)
      window.clearTimeout(showTimer.current)
      // Anti-strobe: only paint the loader if the navigation is actually
      // taking a moment — instant prefetched pages never flash it.
      showTimer.current = window.setTimeout(() => {
        setVisible(true)
        safety = window.setTimeout(() => setVisible(false), 5000)
      }, 150)
    }
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.clearTimeout(safety)
      window.clearTimeout(showTimer.current)
    }
  }, [])

  // Fade out when the new route lands — but never before ~350ms on screen.
  useEffect(() => {
    window.clearTimeout(showTimer.current)
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
    const onPop = () => {
      window.clearTimeout(showTimer.current)
      setVisible(false)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-hidden={!visible}
      className={`df-loader fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#FAFAF8] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Soft ambient glows */}
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-48 -right-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      {/* White tile with the animated bar-chart mark */}
      <div
        className={`df-loader-tile relative flex h-24 w-24 items-end justify-center gap-[6px] rounded-[1.75rem] border border-neutral-200/70 bg-white pb-6 shadow-[0_24px_50px_-16px_rgba(6,78,59,0.25)] transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <span className="df-eq-bar h-4 w-[7px] rounded-full bg-[#064E3B]" />
        <span className="df-eq-bar h-7 w-[7px] rounded-full bg-[#064E3B]" style={{ animationDelay: '0.12s' }} />
        <span className="df-eq-bar h-10 w-[7px] rounded-full bg-[#D97706]" style={{ animationDelay: '0.24s' }} />
      </div>

      <p className="df-loader-word relative mt-6 text-[1.7rem] font-bold leading-none tracking-tight text-[#1F2937]">DailyFinance</p>
      <p className="df-loader-caption relative mt-2.5 text-sm text-neutral-500">Loading your money toolkit&hellip;</p>

      {/* Emerald progress shimmer */}
      <div className="df-loader-track relative mt-7 h-1 w-48 overflow-hidden rounded-full bg-[#064E3B]/10" aria-hidden="true">
        <div className="animate-df-progress h-full w-16 rounded-full bg-[#064E3B]" />
      </div>
    </div>
  )
}
