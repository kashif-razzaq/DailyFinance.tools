/* eslint-disable @typescript-eslint/no-require-imports */
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { navigationCategories } from '@/config/navigation'
import { Menu, X, ChevronRight, ArrowRight, User } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AuthModal } from '@/components/auth/AuthModal'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function MobileMenu({ user }: { user?: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
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
    <div className="fixed inset-0 z-[100] flex flex-col bg-background animate-in slide-in-from-bottom-2 duration-300 ease-out">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Menu</span>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full bg-muted/50">
          <X className="h-5 w-5" />
        </Button>
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
                      {cat.calculators.map(calc => (
                        <Link 
                          key={calc.slug} 
                          href={`/tools/${calc.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="group block p-3 rounded-xl bg-background border hover:border-primary/50 transition-colors"
                        >
                          <div className="font-medium text-sm group-hover:text-primary transition-colors">{calc.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{calc.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
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
                <div className="text-xs text-accent font-bold">Premium</div>
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
        className="group flex items-center justify-center hover:opacity-80 transition-opacity focus:outline-none"
        aria-label="Open Menu"
      >
        <div className="flex flex-col justify-center items-start gap-[5px] bg-primary/10 rounded-lg w-9 h-9 pl-[9px] group-hover:bg-primary/20 transition-colors">
          <div className="w-[18px] h-[2px] bg-primary rounded-full transition-all duration-300" />
          <div className="w-[12px] h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-[18px]" />
          <div className="w-[14px] h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-[18px]" />
        </div>
      </button>

      {/* Render via Portal to escape Navbar's backdrop-filter stacking context */}
      {isOpen && mounted && require('react-dom').createPortal(menuContent, document.body)}
    </div>
  )
}
