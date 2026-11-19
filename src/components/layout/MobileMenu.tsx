/* eslint-disable @typescript-eslint/no-require-imports */
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { GUIDE_HUBS, guidesByHub, hubAnchor } from '@/data/guides'
import { X, ChevronRight, ArrowRight, User, Globe, BookOpen, MapPin } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { CurrencySelector } from '@/components/layout/CurrencySelector'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function MobileMenu({ user, isPremium }: { user?: any; isPremium?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [guidesExpanded, setGuidesExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Handle entry/exit animations and scroll lock
  React.useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 100)
      return () => clearTimeout(timer)
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsOpen(false)
    router.refresh()
  }

  const menuContent = (
    <div className={cn(
      "fixed inset-0 z-[100] flex flex-col bg-background duration-100",
      isOpen 
        ? "animate-in fade-in-0 zoom-in-95" 
        : "animate-out fade-out-0 zoom-out-95 fill-mode-forwards"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Menu</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full bg-muted/50">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">Tools By Categories</h3>
          
          <div className="flex flex-col gap-2">
            {navigationCategories.map((cat) => {
              const Icon = cat.icon
              const isExpanded = expandedCategory === cat.slug
              
              return (
                <div key={cat.slug} className="bg-muted/30 rounded-2xl overflow-hidden border">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.slug)}
                    className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", cat.colorClass)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{cat.name}</span>
                    </div>
                    <ChevronRight className={cn("h-5 w-5 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
                  </button>
                  
                  {/* Expanded state */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
                      {cat.calculators.map(calc => {
                        const CalcIcon = calc.icon
                        return (
                        <Link 
                          key={calc.slug} 
                          href={getToolUrl(calc.slug)}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-start gap-3 p-3 rounded-xl bg-background border hover:border-primary/50 transition-colors"
                        >
                          <div className="mt-0.5 p-1.5 rounded-md bg-muted text-muted-foreground group-hover:text-primary transition-colors">
                            <CalcIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-sm group-hover:text-primary transition-colors">{calc.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{calc.description}</div>
                          </div>
                        </Link>
                      )})}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">Guides</h3>

          <div className="bg-muted/30 rounded-2xl overflow-hidden border">
            <button
              onClick={() => setGuidesExpanded(!guidesExpanded)}
              className="flex items-center justify-between w-full p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-semibold">Blog &amp; Guides</span>
              </div>
              <ChevronRight className={cn("h-5 w-5 text-muted-foreground transition-transform", guidesExpanded && "rotate-90")} />
            </button>

            {/* Expanded state */}
            {guidesExpanded && (
              <div className="px-4 pb-4 pt-2 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
                <Link
                  href="/guides"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between p-3 rounded-xl bg-background border hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">All guides</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1 pt-1">Categories</p>
                {GUIDE_HUBS.map((hub) => (
                  <Link
                    key={hub}
                    href={`/guides#${hubAnchor(hub)}`}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-background border hover:border-primary/50 transition-colors"
                  >
                    <span className="font-medium text-sm group-hover:text-primary transition-colors">{hub}</span>
                    <span className="text-xs text-muted-foreground shrink-0 ml-3">{guidesByHub(hub).length} guides</span>
                  </Link>
                ))}
                <Link
                  href="/guides/states"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-background border hover:border-primary/50 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">State tax guides</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-base font-medium py-3 px-2 hover:bg-muted rounded-xl">
            Home <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-base font-medium py-3 px-2 hover:bg-muted rounded-xl">
            Pricing <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-base font-medium py-3 px-2 hover:bg-muted rounded-xl">
            About Us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-base font-medium py-3 px-2 hover:bg-muted rounded-xl">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Settings — currency only (logged-out); the theme toggle lives in the top bar */}
      {!user && (
        <div className="border-t px-4 py-2">
          <div className="flex items-center justify-between gap-3 px-2 py-3">
            <span className="flex items-center gap-2.5 text-base font-medium shrink-0">
              <Globe className="h-5 w-5 text-muted-foreground" />
              Currency
            </span>
            <div className="w-[140px] shrink-0">
              <CurrencySelector variant="menu" />
            </div>
          </div>
        </div>
      )}

      {/* Sticky Auth Footer */}
      <div className="border-t p-4 bg-muted/20">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{user.email?.split('@')[0]}</div>
                {isPremium ? (
                  <div className="text-xs text-accent font-bold">Premium</div>
                ) : (
                  <div className="text-xs text-muted-foreground font-bold">Free</div>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Sign Out</Button>
          </div>
        ) : (
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className={cn(buttonVariants({ variant: "default" }), "w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center rounded-xl")}
          >
            Sign In to DailyFinance
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <div className="lg:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="group flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none p-[6px]"
        aria-label="Open Menu"
      >
        <div className="flex flex-col justify-center items-start gap-[5px] bg-primary/10 rounded-lg w-9 h-9 pl-[9px] group-hover:bg-primary/20 transition-colors">
          <div className="w-[18px] h-[2px] bg-primary rounded-full transition-all duration-300" />
          <div className="w-[12px] h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-[18px]" />
          <div className="w-[14px] h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-[18px]" />
        </div>
      </button>

      {/* Render via Portal to escape Navbar's backdrop-filter stacking context */}
      {isRendered && mounted && require('react-dom').createPortal(menuContent, document.body)}
    </div>
  )
}
