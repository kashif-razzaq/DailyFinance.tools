/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
      <DialogContent className="w-[95vw] max-w-md sm:max-w-2xl p-6 sm:p-8 sm:rounded-[1rem] border-border/40 shadow-2xl overflow-hidden gap-0 animate-in fade-in zoom-in-95 duration-300 ease-out">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Logo className="h-8 w-8 text-accent" />
            <DialogTitle className="text-xl font-bold">Share this Calculator</DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground mt-1">
            Copy a link or embed this tool directly on your own website.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="share">Share & Embed</TabsTrigger>
            <TabsTrigger value="cite">Cite</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-6 mt-0">
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
              <div className="relative overflow-hidden rounded-xl border border-accent/20 bg-accent/5 p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent/10 text-accent">
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
                    className="group inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-accent/90"
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
          </TabsContent>

          <TabsContent value="cite" className="mt-0">
            <CiteContent url={url} slug={slug} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function CiteContent({ url, slug }: { url: string, slug: string }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('text')
  
  const title = typeof document !== 'undefined' ? document.title.split(' | ')[0] : 'Calculator'
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const year = new Date().getFullYear()

  const citations = {
    text: `Shehzad, T. ${title}. DailyFinance.tools. Available at: ${url}. Accessed: ${today}.`,
    html: `Shehzad, T. <i>${title}</i>. DailyFinance.tools. <a href="${url}">${url}</a> (accessed ${today}).`,
    bibtex: `@misc{dailyfinance_${slug.replace(/-/g, '_')},\n  author = {Shehzad, Tahir},\n  title = {${title}},\n  year = {${year}},\n  url = {${url}},\n  urldate = {${today}}\n}`
  }

  const handleCopy = () => {
    const textToCopy = citations[activeTab as keyof typeof citations]
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="text" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 bg-muted/30 border border-border/50 rounded-lg p-4 font-mono text-xs text-muted-foreground break-all min-h-[120px] relative">
          <TabsContent value="text" className="mt-0 outline-none">
            {citations.text}
          </TabsContent>
          <TabsContent value="html" className="mt-0 outline-none">
            {citations.html}
          </TabsContent>
          <TabsContent value="bibtex" className="mt-0 outline-none whitespace-pre-wrap">
            {citations.bibtex}
          </TabsContent>
        </div>
      </Tabs>

      <div className="pt-2">
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Appreciate our content creators and cite this page. Your support matters and keeps us motivated!
        </p>
        <Button onClick={handleCopy} className="w-full font-bold bg-accent hover:bg-accent/90 text-accent-foreground">
          {copied ? (
            <><Check className="mr-2 h-4 w-4" /> Copied to clipboard</>
          ) : (
            <span className="flex items-center gap-2">Copy Citation Format</span>
          )}
        </Button>
      </div>
    </div>
  )
}
