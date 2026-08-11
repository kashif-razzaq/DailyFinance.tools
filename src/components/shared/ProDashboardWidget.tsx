'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Copy, CheckCircle2, Bookmark, Lightbulb, Keyboard, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PRO_TIPS = [
  "When negotiating flat fees, always add a 20% risk buffer to account for unseen scope creep.",
  "S-Corp elections can save you 15.3% on self-employment taxes for distributions.",
  "Never quote an hourly rate directly. Translate it into a 'weekly sprint' or 'monthly retainer'.",
  "If your billable utilization is below 60%, you either have a marketing problem or an administrative bottleneck.",
  "Set aside 30% of every freelance invoice into a separate high-yield tax savings account."
]

export function ProDashboardWidget({ userName, vaultCount = 0 }: { userName?: string, vaultCount?: number }) {
  const [tip, setTip] = useState(PRO_TIPS[0])
  const [copied, setCopied] = useState(false)

  // Hydrate random tip on mount to avoid server mismatch
  useEffect(() => {
    setTip(PRO_TIPS[Math.floor(Math.random() * PRO_TIPS.length)])
  }, [])

  const copyTip = () => {
    navigator.clipboard.writeText(tip)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Daily Tip Section (Left Card) */}
      <div className="flex flex-col justify-between bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-2xl transition-all hover:border-primary/40">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold tracking-tight text-foreground">
              Pro Tip of the Day
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-3">
            "{tip}"
          </p>
        </div>
        
        <div className="pt-3 mt-3 border-t border-primary/10">
          <button 
            onClick={copyTip}
            className="flex items-center gap-1 text-[10px] font-semibold text-primary/80 hover:text-primary transition-colors w-fit"
          >
            {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied to clipboard!" : "Copy Tip"}
          </button>
        </div>
      </div>

      {/* Pro Shortcuts and Vault Info (Right Card) */}
      <div className="hidden sm:flex flex-col justify-between bg-muted/20 border border-border/50 p-4 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold tracking-tight text-foreground">
              Hey There, {userName ? userName.split(' ')[0] : 'Member'}
            </span>
            <span className="bg-primary text-primary-foreground text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-sm">
              PRO
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </span>
        </div>

        <div className="flex flex-col items-end gap-1.5 mt-4">
          <Link href="/dashboard" passHref className="w-full">
            <Button variant="outline" size="sm" className="w-full h-8 rounded-lg bg-background hover:bg-primary/5 dark:hover:bg-primary/10 text-primary border-primary/30 font-semibold group flex justify-between px-3">
              <span className="flex items-center">
                <Bookmark className="h-3.5 w-3.5 mr-2 text-primary" />
                My Vault
              </span>
              <span className="flex items-center">
                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5">
                  {vaultCount}
                </span>
                <ArrowRight className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </span>
            </Button>
          </Link>
          <span className="text-[9px] text-muted-foreground font-medium text-right w-full pr-1">
            You have {vaultCount} saved calculators.
          </span>
        </div>
      </div>

    </div>
  )
}
