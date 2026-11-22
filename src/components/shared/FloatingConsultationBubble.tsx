'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { AccountingLeadModal } from './AccountingLeadModal'

export function FloatingConsultationBubble() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  // UX03: this bubble (z-999, bottom-20 right-4) used to render on top of
  // the cookie banner (z-90, same bottom-20 on mobile) and cover its
  // Decline button, and it floated over the open full-screen mobile menu
  // (z-100). It now waits for a cookie choice and hides while the menu is
  // open — and while the banner is visible at all, including when the
  // footer's "Cookie settings" control re-opens it after a choice exists.
  // The dismissal rules below are unchanged.
  const [consentResolved, setConsentResolved] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const pathname = usePathname()
  const calculatorPrefixes = ['/freelance', '/creator', '/ecommerce', '/real-estate', '/personal-wealth', '/tools', '/dashboard/tools']
  const isToolPage = pathname ? calculatorPrefixes.some(prefix => pathname.startsWith(prefix)) : false

  // Cookie-banner gate: the banner writes `df-cookie-consent` to
  // localStorage when the visitor chooses. Same-tab writes don't fire
  // `storage` events, so poll once a second until the key appears (and
  // listen for `storage` too, for a choice made in another tab).
  useEffect(() => {
    const checkConsent = () => {
      try {
        if (localStorage.getItem('df-cookie-consent')) {
          setConsentResolved(true)
          return true
        }
      } catch {
        // Storage unavailable — don't block the bubble forever.
        setConsentResolved(true)
        return true
      }
      return false
    }
    if (checkConsent()) return
    const onStorage = () => { checkConsent() }
    window.addEventListener('storage', onStorage)
    const id = window.setInterval(() => {
      if (checkConsent()) window.clearInterval(id)
    }, 1000)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.clearInterval(id)
    }
  }, [])

  // Mobile-menu gate: MobileMenu dispatches `df:mobile-menu` with
  // { open } whenever the full-screen menu opens or closes.
  useEffect(() => {
    const onMenu = (e: Event) => {
      setMenuOpen(Boolean((e as CustomEvent<{ open?: boolean }>).detail?.open))
    }
    window.addEventListener('df:mobile-menu', onMenu)
    return () => window.removeEventListener('df:mobile-menu', onMenu)
  }, [])

  // Banner-presence gate: the banner can also re-appear after a choice
  // exists (footer "Cookie settings" re-opens it), when the localStorage
  // gate above has already passed — so watch the DOM for the banner itself
  // and hide the bubble whenever it is mounted. Same for the search palette
  // (z-100): the bubble (z-999) would otherwise float over the open search.
  // The state setters only re-render when the presence actually changes.
  useEffect(() => {
    const update = () => {
      const present = !!document.querySelector('[role="region"][aria-label="Cookie consent"]')
      setBannerVisible((prev) => (prev === present ? prev : present))
      const search = !!document.querySelector('[role="dialog"][aria-label="Search calculators and guides"]')
      setSearchOpen((prev) => (prev === search ? prev : search))
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  // The bubble must never nag: once a visitor dismisses it, it stays away
  // for 30 days (localStorage); once they submit the form, forever; and it
  // appears at most once per browser session.
  useEffect(() => {
    // UX03: don't start the show timer until the cookie banner is resolved,
    // so the bubble can never cover the banner's Decline button.
    if (!consentResolved) return
    try {
      if (localStorage.getItem('df-consult-submitted')) return
      const dismissedAt = Number(localStorage.getItem('df-consult-dismissed-at') || 0)
      if (dismissedAt && Date.now() - dismissedAt < 30 * 24 * 60 * 60 * 1000) return
      if (sessionStorage.getItem('df-consult-handled')) return
    } catch { /* storage unavailable — fall through and show once */ }
    const timer = setTimeout(() => {
      setIsVisible(true)
      try { sessionStorage.setItem('df-consult-handled', '1') } catch { /* ignore */ }
    }, 5000)
    return () => clearTimeout(timer)
  }, [consentResolved])

  const dismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    try { localStorage.setItem('df-consult-dismissed-at', String(Date.now())) } catch { /* ignore */ }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Engaging with the modal counts as handled — no re-pop this session.
    setIsVisible(false)
    try { sessionStorage.setItem('df-consult-handled', '1') } catch { /* ignore */ }
  }

  // UX03: stay hidden while the mobile menu is open, the cookie banner
  // is mounted, or the search palette is open, so the bubble never floats
  // over any of them; it reappears when they close (isVisible unchanged).
  if (!isVisible || isDismissed || menuOpen || bannerVisible || searchOpen) return null

  return (
    <>
      <div className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[999] animate-in slide-in-from-bottom-10 fade-in duration-500 ease-out print:hidden ${isModalOpen ? 'opacity-0 pointer-events-none' : ''} ${isToolPage ? 'lg:hidden' : 'flex'}`}>
        <div className="relative group">
          {/* Close button */}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation()
              dismiss()
            }}
            className="absolute -top-2.5 -right-2.5 bg-background border shadow-md rounded-full p-2 z-10 hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          
          {/* Bubble Trigger */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-card border border-border/50 shadow-xl rounded-full p-2 pr-5 hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
          >
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary shrink-0">
              <Image 
                src="/icon.svg" 
                alt="DailyFinance" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover p-2"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Expert Help</span>
              <span className="text-sm font-semibold text-foreground">Request Consultation</span>
            </div>
          </button>
        </div>
      </div>

      <AccountingLeadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  )
}
