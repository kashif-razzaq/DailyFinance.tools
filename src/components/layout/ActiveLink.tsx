'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

/**
 * A nav link that underlines itself in its own hover colour when it points
 * at the current page (Kashif, 2026-11-21). Home ("/") matches exactly;
 * every other href matches its own page and everything beneath it, so a
 * guide page keeps "Guides" underlined and a tool page keeps its category
 * underlined. The underline uses the link's own text colour (currentColor),
 * which is the hover colour on every menu that uses this component.
 */
export function ActiveLink({
  href,
  children,
  className,
  activeClassName,
  ...rest
}: {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) {
  const pathname = usePathname()
  const isActive =
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')
  return (
    <Link
      href={href}
      aria-current={pathname === href ? 'page' : undefined}
      className={cn(
        className,
        isActive && (activeClassName ?? 'text-foreground underline underline-offset-4 decoration-2')
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
