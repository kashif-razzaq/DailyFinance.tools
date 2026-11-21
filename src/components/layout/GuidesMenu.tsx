'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GUIDE_HUBS, HUB_DESCRIPTIONS, hubAnchor } from '@/data/guides'
import { ChevronDown, BookOpen, MapPin, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Desktop "Guides" dropdown: all guides (the blog) + the five guide categories + state guides. */
export function GuidesMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isActive = pathname === '/guides' || pathname.startsWith('/guides/')

  // Handle entry/exit animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true)
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close when clicking outside, or on Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors",
          isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          isActive && "text-foreground underline underline-offset-4 decoration-2"
        )}
      >
        Guides
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {isRendered && (
        <div className={cn(
          "absolute left-0 top-full mt-3 w-96 bg-background border border-border/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden duration-100 z-50 origin-top",
          isOpen
            ? "animate-in fade-in-0 zoom-in-95"
            : "animate-out fade-out-0 zoom-out-95 fill-mode-forwards"
        )}>
          <div className="p-3">
            <Link
              href="/guides"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold group-hover:text-primary transition-colors">All guides</div>
                <div className="text-xs text-muted-foreground mt-0.5">The full blog, every category</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 pt-4 pb-2">Categories</p>
            <div className="flex flex-col gap-0.5">
              {GUIDE_HUBS.map((hub) => (
                <Link
                  key={hub}
                  href={`/guides/category/${hubAnchor(hub)}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex flex-col px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{hub}</span>
                  <span className="text-xs text-muted-foreground">{HUB_DESCRIPTIONS[hub]}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-border/50 mt-3 pt-3">
              <Link
                href="/guides/states"
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold group-hover:text-primary transition-colors">State tax guides</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Sales, income and property tax by state</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
