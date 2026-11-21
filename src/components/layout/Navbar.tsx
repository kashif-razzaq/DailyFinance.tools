import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/layout/Logo'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { GuidesMenu } from '@/components/layout/GuidesMenu'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { AuthModal } from '@/components/auth/AuthModal'
import { UserBadge } from '@/components/layout/UserBadge'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createSupabaseContext } from '@/utils/supabase/server'
import { CurrencySelector } from '@/components/layout/CurrencySelector'
import { HeaderSearch } from '@/components/layout/HeaderSearch'
import { ActiveLink } from '@/components/layout/ActiveLink'

export async function Navbar() {
  const { data } = await createSupabaseContext()
  const user = data?.userClaims
  let isPremium = false

  if (user && data?.supabase) {
    const userId = (user as any).sub || (user as any).id
    const { data: profile } = await data.supabase
      .from('users')
      .select('subscription_status')
      .eq('id', userId)
      .single()
    
    isPremium = (profile as any)?.subscription_status === 'active'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 print:hidden">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Left Side: Logo & Mega Menu */}
        <div className="flex items-center gap-4 md:gap-8">
          <MobileMenu user={user} isPremium={isPremium} />
          <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">
              DailyFinance
            </span>
          </Link>
          <div className="hidden lg:block border-l h-6 mx-2 border-muted" />
          <div className="hidden lg:flex items-center gap-6">
            <ActiveLink href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </ActiveLink>
            <MegaMenu />
            <GuidesMenu />
            <ActiveLink href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </ActiveLink>
            <ActiveLink href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </ActiveLink>
            <ActiveLink href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </ActiveLink>
          </div>
        </div>

        {/* Right Side: CTA & Auth */}
        <div className="flex items-center gap-3">
          {!user && (
            <div className="hidden md:block">
              <CurrencySelector />
            </div>
          )}
          <HeaderSearch />
          {user ? (
            <UserBadge user={user} isPremium={isPremium} />
          ) : (
            <>
              <AuthModal>
                <div className={cn(buttonVariants({ variant: "default" }), "hidden sm:flex min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 shadow-sm shadow-primary/20 transition-all active:scale-95 cursor-pointer")}>
                  Sign In
                </div>
              </AuthModal>
              <AuthModal>
                <div 
                  className="group flex sm:hidden items-center justify-center p-[6px] cursor-pointer"
                  aria-label="Sign In"
                  role="button"
                >
                  <div className="flex items-center justify-center bg-primary/10 rounded-lg w-9 h-9 text-primary group-hover:bg-primary/20 transition-colors">
                    <User className="h-4 w-4" />
                  </div>
                </div>
              </AuthModal>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
