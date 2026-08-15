'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { AccountingLeadModal } from './AccountingLeadModal'

export function TahirLeadGenCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm transition-all hover:shadow-md group relative overflow-hidden">
        {/* Primary Color Faded Background */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent"></div>
        
        {/* DAILYFINANCE Watermark */}
        <div className="absolute top-4 left-0 right-0 overflow-hidden flex justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none">
          <span className="text-[4.5rem] font-black tracking-tighter text-foreground whitespace-nowrap leading-none">
            DAILYFINANCE
          </span>
        </div>
        
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-5 border border-border/50 shadow-sm bg-white mt-2 flex items-center justify-center p-3">
          <Image 
            src="/icon.svg" 
            alt="DailyFinance Solutions" 
            fill 
            className="object-contain p-4 transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground mb-1 relative">DailyFinance Expert Consultation</h3>
        <div className="flex items-center gap-2 mb-6 relative">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Official Partner Network</span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Business Solutions</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative">
          Need help setting up your business structure, optimizing taxes, or handling complex financial reporting? Our team of certified professionals can help.
        </p>

        <ul className="w-full space-y-3 text-sm text-foreground/80 mb-8 text-left relative">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <span>Tax Optimization & Structuring</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <span>QuickBooks & Xero Setup</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <span>Financial Modeling & Pricing</span>
          </li>
        </ul>

        <div className="w-full pt-2 border-t border-border/40 relative">
          <Button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11 rounded-xl mt-4 shadow-sm group/btn"
          >
            Request Consultation <ArrowRight className="ml-2 h-4 w-4 text-accent group-hover/btn:translate-x-1 transition-transform" />
          </Button>
          <p className="text-[9px] text-muted-foreground mt-4 uppercase tracking-[0.2em] font-semibold text-center">
            Free Initial Assessment
          </p>
        </div>
      </div>

      <AccountingLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
