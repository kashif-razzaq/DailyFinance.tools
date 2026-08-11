'use client'

import React, { useState } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FolderGit2, BarChart3, Settings, Crown, Sparkles, ArrowLeft, CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  isPro: boolean
}

export function DashboardSidebar({ isPro }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { section: "Workspace" },
    { name: "Scenario Vault", href: "/dashboard", icon: FolderGit2, color: "text-primary" },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "text-primary" },
    { section: "Calculator Engine" },
    { name: "Pro Tools Library", href: "/dashboard/tools", icon: Sparkles, color: "text-accent" },
    { section: "Account" },
    { name: "Subscription", href: "/dashboard/billing", icon: CreditCard, color: "text-muted-foreground" },
    { name: "Preferences", href: "/dashboard/settings", icon: Settings, color: "text-muted-foreground" },
  ]

  return (
    <aside className={cn(
      "border-r bg-background hidden md:flex flex-col transition-all duration-300 ease-in-out relative",
      isCollapsed ? "w-20" : "w-64"
    )}>
      
      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-background border shadow-sm rounded-full p-1 hover:bg-muted transition-colors z-20 focus:outline-none"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="h-full pt-6 pb-4 flex flex-col overflow-hidden">
        
        {/* Dashboard Branding */}
        <div className={cn("mb-8 flex items-center", isCollapsed ? "justify-center px-0" : "px-6")}>
          <Link href="/" className="flex items-center space-x-2 group" title="DailyFinance">
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
              <Logo className="h-6 w-6 text-primary" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden animate-in fade-in">
                DailyFinance
              </span>
            )}
          </Link>
        </div>
        
        <div className="space-y-6 flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-3">
          
          <div className="space-y-1">
            {navItems.map((item, idx) => {
              if (item.section) {
                if (isCollapsed) return <div key={idx} className="h-6" /> // spacer
                return (
                  <h4 key={idx} className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 whitespace-nowrap">
                    {item.section}
                    {item.section === "Calculator Engine" && <Crown className="h-3 w-3 inline-block ml-1 text-accent" />}
                  </h4>
                )
              }

              const isActive = pathname === item.href || (pathname.startsWith(item.href!) && item.href !== "/dashboard")
              const Icon = item.icon!
              
              return (
                <Link 
                  key={idx} 
                  href={item.href!} 
                  title={item.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative overflow-hidden",
                    isActive 
                      ? "bg-primary/5 text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full" />
                  )}
                  <Icon className={cn("h-[18px] w-[18px] shrink-0", item.color, isActive && "scale-110 transition-transform")} />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap flex-1">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </div>

        </div>

        {/* Bottom Banner & Nav */}
        <div className="pt-6 mt-4 flex flex-col gap-3 px-4 shrink-0">
          
          {/* Premium Banner */}
          {!isPro && (
            <div className={cn(
              "relative overflow-hidden bg-primary rounded-xl transition-all duration-300",
              isCollapsed ? "p-2 cursor-pointer group" : "p-4 shadow-sm border border-primary/20"
            )} onClick={() => isCollapsed && (window.location.href='/pricing')} title="Upgrade to Pro">
              {isCollapsed ? (
                <Crown className="h-5 w-5 text-accent mx-auto group-hover:scale-110 transition-transform" />
              ) : (
                <>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                  <div className="relative z-10 flex items-center gap-2 mb-2">
                    <Crown className="h-4 w-4 text-accent shrink-0" />
                    <span className="font-semibold text-sm text-primary-foreground whitespace-nowrap">Pro Tier</span>
                  </div>
                  <p className="relative z-10 text-[11px] text-primary-foreground/80 leading-relaxed mb-3">
                    Unlock full Analytics, PDF Exports, and unlimited storage.
                  </p>
                  <Link href="/pricing" className="relative z-10 block text-center text-xs font-bold bg-accent text-accent-foreground py-2 rounded-lg shadow-sm hover:brightness-110 transition-all">
                    Upgrade Now
                  </Link>
                </>
              )}
            </div>
          )}

          {!isCollapsed && !isPro && <hr className="border-border mx-2 my-1" />}

          <Link href="/" className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            isCollapsed && "justify-center px-0"
          )} title="Back to Home">
            <ArrowLeft className="h-[18px] w-[18px] shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Back to Home</span>}
          </Link>
        </div>
      </div>
    </aside>
  )
}
