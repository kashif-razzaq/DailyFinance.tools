/* eslint-disable @next/next/no-location-assign-relative-destination */
'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Lock, ShieldCheck, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ProUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProUpgradeModal({ isOpen, onClose }: ProUpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl max-w-md p-8 sm:rounded-[1rem] border-border/40 shadow-2xl overflow-hidden gap-0">
        
        {/* Hidden title/desc for accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>Unlock Pro Features</DialogTitle>
          <DialogDescription>Upgrade to unlock premium calculator tools.</DialogDescription>
        </DialogHeader>

        <div className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 bg-muted/50 text-foreground border shadow-sm rounded-full flex items-center justify-center mb-6">
            <Lock className="h-7 w-7 opacity-80" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight text-foreground">
            Unlock Pro Features
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
            Join our Pro tier to instantly unlock saving, exporting, and powerful analytics across all 50+ calculators.
          </p>
          
          <div className="bg-muted/30 p-5 rounded-2xl mb-8 text-left space-y-3.5 border border-border/50 text-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Zero display ads</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Unlimited Scenario Vault storage</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Dynamic version history & cloning</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Live results sharing </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Instant CSV & Excel exports</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Premium PDF report generation</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="font-medium text-foreground">Cross-Data Analytics Engine</span>
            </div>
          </div>
          
          <Button onClick={() => window.location.href = '/pricing'} className="w-full py-6 text-lg font-bold shadow-md group rounded-xl bg-amber-600 hover:bg-amber-700 text-white border-none transition-all">
            Upgrade to Pro — $2.99/mo
            <ArrowRight className="ml-2 h-5 w-5 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
          </Button>
          
          <button onClick={onClose} className="mt-6 text-sm text-muted-foreground hover:text-foreground font-medium underline underline-offset-4 transition-colors">
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
