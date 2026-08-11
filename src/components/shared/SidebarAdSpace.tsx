'use client'

import React from 'react'

export function SidebarAdSpace() {
  return (
    <aside className="w-full h-[600px] bg-muted/5 border border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent -translate-y-[100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
      
      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-2">
        Advertisement
      </span>
      <span className="text-sm font-semibold text-foreground/30 px-6">
        Sidebar AdSense Placeholder
      </span>
      
      <div className="absolute bottom-6 text-[10px] text-muted-foreground/50 max-w-[80%] text-center leading-tight">
        This space is reserved for premium sidebar ad placements.
      </div>
    </aside>
  )
}
