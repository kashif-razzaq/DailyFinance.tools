'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { AccountingLeadModal } from './AccountingLeadModal'

export function FloatingConsultationBubble() {
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show after 5 seconds
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [isDismissed])

  if (!isVisible || isDismissed) return null

  return (
    <>
      <div className="lg:hidden fixed bottom-[100px] right-4 sm:bottom-6 sm:right-6 z-[999] animate-in slide-in-from-bottom-10 fade-in duration-500 ease-out">
        <div className="relative group">
          {/* Close button */}
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsVisible(false)
              setIsDismissed(true)
            }}
            className="absolute -top-2 -right-2 bg-background border shadow-sm rounded-full p-1 z-10 hover:bg-muted transition-colors focus:outline-none"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
          
          {/* Bubble Trigger */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-card border border-border/50 shadow-xl rounded-full p-2 pr-5 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 focus:outline-none"
          >
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary shrink-0">
              <Image 
                src="/team/tahir-shehzad.jpg" 
                alt="Tahir" 
                fill 
                className="object-cover"
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
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
