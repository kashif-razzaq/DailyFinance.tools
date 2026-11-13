'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { navigationCategories } from '@/config/navigation'
import { MobileBottomNav } from './MobileBottomNav'
import { NavigationLoader } from './NavigationLoader'
import { LoginModalHost } from '@/components/auth/LoginModalHost'
import { AppSplash } from './AppSplash'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { ParamToast } from '@/components/shared/ParamToast'

export function ConditionalLayout({
  header,
  footer,
  children
}: {
  header: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Hide global nav/footer on auth pages, dashboard workspace, and embeds
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register') || pathname?.startsWith('/auth')
  const isDashboard = pathname?.startsWith('/dashboard')
  const isEmbed = pathname !== '/embed' && pathname?.startsWith('/embed/')
  const shouldHide = isAuthPage || isDashboard || isEmbed

  // Tool pages have their own dedicated mobile action bar (CalculatorActions,
  // fixed bottom, 68px) — the global bottom nav must not cover it there.
  const segments = pathname?.split('/').filter(Boolean) ?? []
  const isToolPage =
    segments.length === 2 &&
    navigationCategories.some(
      (c) => c.slug === segments[0] && c.calculators.some((t) => t.slug === segments[1])
    )
  const showBottomNav = !shouldHide && !isToolPage

  return (
    <>
      {!shouldHide && header}
      <main className={`flex-1 flex flex-col ${!shouldHide ? 'pb-[68px] md:pb-0' : ''}`}>{children}</main>
      {!shouldHide && footer}
      {showBottomNav && <MobileBottomNav />}
      {!shouldHide && <NavigationLoader />}
      {!shouldHide && <AppSplash />}
      {!shouldHide && <LoginModalHost />}
      {!shouldHide && <CookieConsent />}
      {/* Param-driven toasts (?toast=…) — mounted once, on every page
          including auth and dashboard pages, where most of them land. */}
      <Suspense fallback={null}>
        <ParamToast />
      </Suspense>
    </>
  )
}
