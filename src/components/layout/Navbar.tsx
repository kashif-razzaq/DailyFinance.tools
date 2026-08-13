import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Logo } from '@/components/layout/Logo'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { AuthModal } from '@/components/auth/AuthModal'
import { UserBadge } from '@/components/layout/UserBadge'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createSupabaseContext } from '@/utils/supabase/server'
import { CurrencySelector } from '@/components/layout/CurrencySelector'

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        
        {/* Left Side: Logo & Mega Menu */}
        <div className="flex items-center gap-4 md:gap-8">
          <MobileMenu user={user} />
          <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight">
              DailyFinance
            </span>
          </Link>
          <div className="hidden lg:block border-l h-6 mx-2 border-muted" />
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <MegaMenu />
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side: CTA & Auth */}
        <div className="flex items-center gap-3">
          <CurrencySelector />
          {user ? (
            <UserBadge user={user} isPremium={isPremium} />
          ) : (
            <>
              <AuthModal>
                <div className={cn(buttonVariants({ variant: "default" }), "hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 shadow-sm shadow-primary/20 transition-all active:scale-95 cursor-pointer")}>
                  Sign In
                </div>
              </AuthModal>
              <AuthModal>
                <div 
                  className="flex sm:hidden items-center justify-center bg-primary/10 rounded-lg w-9 h-9 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                  aria-label="Sign In"
                  role="button"
                >
                  <User className="h-4 w-4" />
                </div>
              </AuthModal>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
