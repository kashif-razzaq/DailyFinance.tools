/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { LogOut, Settings, Crown, LayoutDashboard, FolderGit2, BarChart3, ChevronDown, Globe } from 'lucide-react'
import { CurrencySelector } from '@/components/layout/CurrencySelector'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

/**
 * UserBadge — the signed-in identity in the header (desktop + mobile).
 * Shows the user's avatar (photo when available, initials otherwise) with
 * a small Free/Pro tag on it; the dropdown is the account hub: dashboard,
 * vault, analytics, settings, upgrade and sign out.
 */
function UserAvatar({
  avatarUrl,
  initials,
  isPremium,
  size,
}: {
  avatarUrl?: string
  initials: string
  isPremium?: boolean
  size: 'sm' | 'lg'
}) {
  return (
    <span className={`relative inline-flex shrink-0 ${size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'}`}>
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt="" className="h-full w-full rounded-full object-cover ring-2 ring-white" />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#064E3B] to-[#0B7A5C] font-bold text-white ring-2 ring-white ${
            size === 'lg' ? 'text-base' : 'text-[13px]'
          }`}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
      <span
        className={`absolute -bottom-1 -right-1 rounded-full px-1 py-px text-[7.5px] font-extrabold leading-none tracking-wide ring-2 ring-white ${
          isPremium ? 'bg-[#D97706] text-white' : 'bg-neutral-200 text-neutral-600'
        }`}
      >
        {isPremium ? 'PRO' : 'FREE'}
      </span>
    </span>
  )
}

export function UserBadge({ user, isPremium }: { user: any; isPremium?: boolean }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const email: string = user?.email ?? ''
  const displayName: string =
    user?.user_metadata?.full_name || user?.user_metadata?.name || email.split('@')[0] || 'Account'
  const avatarUrl: string | undefined = user?.user_metadata?.avatar_url || user?.user_metadata?.picture
  const initials =
    displayName
      .replace(/[^a-zA-Z ]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join('') || 'U'

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsOpen(false)
    router.push('/?toast=signed-out')
    router.refresh()
  }

  const go = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  const menuItem =
    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted'

  return (
    <div className="relative">
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}

      {/* Desktop button */}
      <button
        className="hidden items-center gap-2.5 rounded-full border bg-background py-1 pl-1 pr-2.5 transition-colors hover:bg-muted sm:flex"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <UserAvatar avatarUrl={avatarUrl} initials={initials} isPremium={isPremium} size="sm" />
        <span className="max-w-[110px] truncate text-sm font-semibold">{displayName}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile button — same 48×48 footprint as the hamburger (p-[6px]
          around the 36×36 avatar), so size and edge spacing match. */}
      <button
        className="flex items-center justify-center p-[6px] transition-opacity hover:opacity-80 focus:outline-none sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Account menu"
      >
        <UserAvatar avatarUrl={avatarUrl} initials={initials} isPremium={isPremium} size="sm" />
      </button>

      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border bg-background shadow-xl">
          <div className="flex items-center gap-3 border-b bg-muted/30 p-4">
            <UserAvatar avatarUrl={avatarUrl} initials={initials} isPremium={isPremium} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-foreground">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
              {isPremium ? (
                <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent">
                  <Crown className="h-3 w-3" /> Pro member
                </span>
              ) : (
                <span className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded-full border bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  Free plan
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-0.5 p-2">
            <button onClick={() => go('/dashboard')} className={menuItem}>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
            </button>
            <button onClick={() => go('/dashboard')} className={menuItem}>
              <FolderGit2 className="h-4 w-4 text-muted-foreground" /> Scenario Vault
            </button>
            <button onClick={() => go('/dashboard/analytics')} className={menuItem}>
              <BarChart3 className="h-4 w-4 text-muted-foreground" /> Analytics
              {!isPremium && (
                <span className="ml-auto rounded-full bg-[#D97706]/10 px-1.5 py-0.5 text-[10px] font-extrabold text-[#D97706]">PRO</span>
              )}
            </button>
            <button onClick={() => go('/dashboard/settings')} className={menuItem}>
              <Settings className="h-4 w-4 text-muted-foreground" /> Profile &amp; settings
            </button>

            <div className="px-1 pb-1 pt-2">
              <p className="flex items-center gap-2 px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <Globe className="h-3.5 w-3.5" /> Currency
              </p>
              <CurrencySelector variant="menu" />
            </div>

            {!isPremium && (
              <button
                onClick={() => go('/pricing')}
                className="mt-1 flex w-full items-center gap-2.5 rounded-lg bg-[#064E3B] px-3 py-2.5 text-left text-sm font-bold text-white transition-colors hover:bg-[#043327]"
              >
                <Crown className="h-4 w-4" /> Upgrade to Pro — $2.99/mo
              </button>
            )}

            <div className="mx-2 my-1.5 h-px bg-border" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 text-destructive/70" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
