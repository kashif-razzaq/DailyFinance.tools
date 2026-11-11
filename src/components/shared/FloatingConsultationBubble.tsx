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

  const pathname = usePathname()
  const calculatorPrefixes = ['/freelance', '/creator', '/ecommerce', '/real-estate', '/personal-wealth', '/tools', '/dashboard/tools']
  const isToolPage = pathname ? calculatorPrefixes.some(prefix => pathname.startsWith(prefix)) : false

  // The bubble must never nag: once a visitor dismisses it, it stays away
  // for 30 days (localStorage); once they submit the form, forever; and it
  // appears at most once per browser session.
  useEffect(() => {
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
  }, [])

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

  if (!isVisible || isDismissed) return null

  return (
    <>
      <div className={`fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[999] animate-in slide-in-from-bottom-10 fade-in duration-500 ease-out ${isModalOpen ? 'opacity-0 pointer-events-none' : ''} ${isToolPage ? 'lg:hidden' : 'flex'}`}>
        <div className="relative group">
          {/* Close button */}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation()
              dismiss()
            }}
            className="absolute -top-2.5 -right-2.5 bg-background border shadow-md rounded-full p-2 z-10 hover:bg-muted transition-colors focus:outline-none"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          
          {/* Bubble Trigger */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-card border border-border/50 shadow-xl rounded-full p-2 pr-5 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 focus:outline-none"
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
