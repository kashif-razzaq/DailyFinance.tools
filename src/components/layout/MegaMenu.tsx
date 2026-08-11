'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { navigationCategories, Category } from '@/config/navigation'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>(navigationCategories[0])
  const menuRef = useRef<HTMLDivElement>(null)

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

      {/* The Artisan Overlay */}
      {isOpen && (
        <div className="absolute top-16 mt-2 left-4 md:left-8 w-[900px] bg-background border shadow-sm rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 ease-out z-50 flex">
          
          {/* Left Sidebar: Categories */}
          <div className="w-1/3 bg-muted/30 border-r p-6 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3">Collections</h3>
            {navigationCategories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory.slug === cat.slug
              return (
                <button
                  key={cat.slug}
                  onMouseEnter={() => setActiveCategory(cat)}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 text-left w-full group",
                    isActive 
                      ? "bg-background shadow-sm ring-1 ring-border/50 text-foreground" 
                      : "hover:bg-background/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className={cn("p-2 rounded-lg transition-colors", isActive ? cat.colorClass : "bg-muted group-hover:bg-background")}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{cat.name}</div>
                  </div>
                </button>
              )
            })}
            
            <div className="mt-auto pt-6 px-3">
              <Link href="/tools" onClick={() => setIsOpen(false)} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                View Directory <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right Area: Calculators */}
          <div className="w-2/3 p-8 bg-background relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{activeCategory.name}</h2>
                <p className="text-muted-foreground">{activeCategory.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {activeCategory.calculators.map((calc, i) => {
                  const CalcIcon = calc.icon
                  return (
                    <Link 
                      key={calc.slug} 
                      href={`/tools/${calc.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="group p-4 rounded-xl border bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <CalcIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{calc.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{calc.description}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
