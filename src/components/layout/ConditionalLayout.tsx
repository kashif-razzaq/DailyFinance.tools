'use client'

import { usePathname } from 'next/navigation'

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
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register')
  const isDashboard = pathname?.startsWith('/dashboard')
  const isEmbed = pathname?.startsWith('/embed')
  const shouldHide = isAuthPage || isDashboard || isEmbed

  return (
    <>
      {!shouldHide && header}
      <main className="flex-1 flex flex-col">{children}</main>
      {!shouldHide && footer}
    </>
  )
}
