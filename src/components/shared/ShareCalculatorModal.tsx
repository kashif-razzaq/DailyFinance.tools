/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LinkIcon, Code2, Check, Sparkles, ArrowRight } from "lucide-react"
import { Logo } from "@/components/layout/Logo"

interface ShareCalculatorModalProps {
  children: React.ReactNode
  url: string
  slug: string
  isPro?: boolean
}

export function ShareCalculatorModal({ children, url, slug, isPro = false }: ShareCalculatorModalProps) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedEmbed, setCopiedEmbed] = useState(false)

  const embedCode = `<script src="https://dailyfinance.tools/embed.js" data-calculator="${slug}" data-theme="light"></script>`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopiedEmbed(true)
    setTimeout(() => setCopiedEmbed(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogContent className="min-w-2xl p-6 animate-in fade-in zoom-in-95 duration-300 ease-out">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Logo className="h-8 w-8 text-primary" />
            <DialogTitle className="text-xl font-bold">Share this Calculator</DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground mt-1">
            Copy a link or embed this tool directly on your own website.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Direct Link Section */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <LinkIcon className="h-4 w-4" /> Direct Link
            </h4>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input 
                  readOnly 
                  value={url} 
                  className="bg-muted/50 border-emerald-400 focus-visible:ring-emerald-400 pr-10 truncate font-mono text-xs" 
                />
              </div>
              <Button onClick={handleCopyLink} variant="secondary" className="px-6 font-semibold bg-muted hover:bg-muted/80">
                {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : "Copy"}
              </Button>
            </div>
          </div>

          {/* Premium Conversion Banner */}
          {!isPro && (
            <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-600">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    Unlock Live Calculator Sharing
                  </h4>
                  <p className="text-xs font-medium text-muted-foreground max-w-[280px] pl-8">
                    Share interactive, pre-filled calculations with your clients directly. Stop sending static PDFs.
                  </p>
                </div>
                <a 
                  href="/pricing"
                  className="group inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-amber-600 px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-amber-700"
                >
                  Upgrade to Pro
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          )}

          {/* Embed Section */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Code2 className="h-4 w-4" /> Embed on your site
            </h4>
            <div className="relative border rounded-lg bg-muted/30 p-1">
              <textarea 
                readOnly 
                className="w-full h-24 p-3 text-xs font-mono bg-transparent resize-none focus:outline-none" 
                value={embedCode} 
              />
            </div>
            <Button onClick={handleCopyEmbed} variant="secondary" className="w-full font-semibold bg-muted hover:bg-muted/80">
              {copiedEmbed ? (
                <span className="flex items-center gap-2 text-emerald-600"><Check className="h-4 w-4" /> Copied!</span>
              ) : "Copy Embed Script"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Note: You can change the <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">data-theme</code> attribute to "dark" or "light".
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
