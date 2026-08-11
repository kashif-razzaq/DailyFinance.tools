'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderGit2, BarChart3, Settings, Sparkles } from "lucide-react"
import { cn } from '@/lib/utils'

export function DashboardMobileNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Vault", href: "/dashboard", icon: FolderGit2, color: "text-primary", matchExact: true },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "text-primary" },
    { name: "Pro Tools", href: "/dashboard/tools", icon: Sparkles, color: "text-accent" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, color: "text-muted-foreground" },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-background/90 backdrop-blur-xl border-t z-50 pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, idx) => {
          const isActive = item.matchExact 
            ? pathname === item.href 
            : pathname.startsWith(item.href)
            
          const Icon = item.icon

          return (
            <Link 
              key={idx}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full space-y-1 relative group"
            >
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-primary rounded-b-full animate-in slide-in-from-top-1" />
              )}
              <Icon 
                className={cn(
                  "h-5 w-5 transition-transform duration-200", 
                  isActive ? "scale-110" : "opacity-70 group-hover:opacity-100",
                  item.color
                )} 
              />
              <span className={cn(
                "text-[10px] font-medium transition-all duration-200",
                isActive ? "text-foreground font-bold" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
