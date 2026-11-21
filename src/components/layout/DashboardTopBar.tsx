'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Settings, LifeBuoy, LogOut } from 'lucide-react'
import { UserAvatar } from '@/components/layout/UserBadge'
import { createClient } from '@/utils/supabase/client'

/**
 * Dashboard top bar (Kashif, 2026-11-21): back arrow on the left, avatar on
 * the right. Clicking the avatar opens a menu with the user's basic info,
 * Profile & settings, Help & support (→ /contact) and Sign out. The
 * sidebar no longer carries a user card or a Back to Home link — this bar
 * is the dashboard's account surface. Also visible on mobile, where there
 * is no sidebar.
 */
export function DashboardTopBar({
  user,
  isPro,
}: {
  user: { email?: string; user_metadata?: Record<string, unknown> } | null
  isPro: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const email: string = user?.email ?? ''
  const displayName: string =
    (user?.user_metadata?.full_name as string) ||
    (user?.user_metadata?.name as string) ||
    email.split('@')[0] ||
    'Account'
  const avatarUrl: string | undefined =
    (user?.user_metadata?.avatar_url as string) || (user?.user_metadata?.picture as string)
  const initials =
    displayName
      .replace(/[^a-zA-Z ]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join('') || 'U'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/?toast=signed-out')
    router.refresh()
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl md:px-8 print:hidden">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden sm:inline">Back to site</span>
      </Link>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Account menu"
          aria-expanded={isOpen}
          className="rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          <UserAvatar avatarUrl={avatarUrl} initials={initials} isPremium={isPro} size="sm" />
        </button>

        {isOpen && (
          <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border bg-background shadow-xl">
            <div className="flex items-center gap-3 border-b bg-muted/30 p-4">
              <UserAvatar avatarUrl={avatarUrl} initials={initials} isPremium={isPro} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-foreground">{displayName}</p>
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              </div>
            </div>
            <div className="p-2">
              <Link
                href="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-4 w-4 shrink-0" /> Profile &amp; settings
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LifeBuoy className="h-4 w-4 shrink-0" /> Help &amp; support
              </Link>
            </div>
            <div className="border-t p-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 shrink-0" /> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
