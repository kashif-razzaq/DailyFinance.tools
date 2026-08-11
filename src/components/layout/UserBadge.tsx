/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { User, LogOut, Settings, Crown, LayoutDashboard } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export function UserBadge({ user, isPremium }: { user: any, isPremium?: boolean }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)


  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      
      {/* Desktop View */}
      <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background hover:bg-muted transition-colors">
        <div className="bg-primary/10 text-primary p-1 rounded-full">
          <User className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium truncate max-w-[120px]">
          {user.email?.split('@')[0]}
        </span>
      </button>

      {/* Mobile View */}
      <button 
        className="sm:hidden flex items-center justify-center p-1 rounded-full hover:bg-muted/50 transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-primary/10 text-primary rounded-full flex items-center justify-center w-8 h-8">
          <User className="h-5 w-5" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background border shadow-md rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b bg-muted/30 flex flex-col gap-1.5">
            <p className="text-sm font-semibold truncate text-foreground">{user.email}</p>
            {isPremium ? (
              <div className="flex w-fit items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-xs font-semibold text-amber-600 border border-amber-500/20">
                <Crown className="h-3 w-3" />
                Premium Member
              </div>
            ) : (
              <div className="flex w-fit items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground border">
                Free Plan
              </div>
            )}
          </div>
          <div className="p-2 flex flex-col gap-1">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors w-full text-left"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              Dashboard
            </button>
            <button className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors w-full text-left">
              <Settings className="h-4 w-4 text-muted-foreground" />
              Account Settings
            </button>
            
            <div className="h-px bg-border my-1 mx-2" />
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full text-left"
            >
              <LogOut className="h-4 w-4 text-destructive/70" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
