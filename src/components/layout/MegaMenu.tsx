'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { navigationCategories, Category, getToolUrl } from '@/config/navigation'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>(navigationCategories[0])
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="hidden lg:block" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out",
          isOpen ? "bg-primary text-primary-foreground shadow-md" : "bg-primary/5 text-primary hover:bg-primary/10"
        )}
      >
        Tools & Calculators
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      {/* Full-Width Minimalist Overlay */}
      {isRendered && (
        <div className={cn(
          "absolute top-16 left-4 right-4 md:left-8 md:right-8 bg-background border border-border/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden duration-100 z-50 flex min-h-[500px] origin-top",
          isOpen 
            ? "animate-in fade-in-0 zoom-in-95" 
            : "animate-out fade-out-0 zoom-out-95 fill-mode-forwards"
        )}>
          
          {/* Left Navigation: Clean, Architectural */}
          <div className="w-[320px] bg-muted/20 border-r border-border/40 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-6">Explore Tools</h3>
              <div className="flex flex-col gap-1">
                {navigationCategories.map((cat) => {
                  const Icon = cat.icon
                  const isActive = activeCategory.slug === cat.slug
                  return (
                    <button
                      key={cat.slug}
                      onMouseEnter={() => setActiveCategory(cat)}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-left w-full group",
                        isActive 
                          ? "bg-background shadow-sm ring-1 ring-border/50 text-foreground" 
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            
            <div className="pt-8">
              <Link href="/tools" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group">
                View Complete Directory 
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Content: Spacious Grid */}
          <div className="flex-1 p-8 md:p-10 bg-background relative overflow-hidden flex flex-col">
            
            {/* Ambient Background Gradient based on category color */}
            <div className={cn("absolute -top-40 -right-40 w-96 h-96 blur-[100px] rounded-full opacity-20 pointer-events-none transition-colors duration-500", activeCategory.colorClass.split(' ')[0])} />

            <div className="mb-8 relative z-10 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">{activeCategory.name}</h2>
                <p className="text-base text-muted-foreground mt-2 max-w-xl leading-relaxed">{activeCategory.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 relative z-10 flex-1 content-start">
              {activeCategory.calculators.slice(0, 6).map((calc) => {
                const CalcIcon = calc.icon
                return (
                  <Link 
                    key={calc.slug} 
                    href={getToolUrl(calc.slug)}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col gap-1.5 p-4 rounded-xl border border-transparent hover:border-border/50 hover:bg-muted/20 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg bg-muted/50 text-muted-foreground group-hover:bg-background group-hover:shadow-sm transition-all",
                        "group-hover:text-primary"
                      )}>
                        <CalcIcon className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {calc.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-11 line-clamp-2">
                      {calc.description}
                    </p>
                  </Link>
                )
              })}
            </div>

            {/* View All CTA */}
            <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between relative z-10">
              <p className="text-sm text-muted-foreground">
                Showing top 6 of {activeCategory.calculators.length} {activeCategory.name} tools.
              </p>
              <Link 
                href={`/tools#${activeCategory.slug}`}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              >
                Explore All {activeCategory.name} Tools
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

