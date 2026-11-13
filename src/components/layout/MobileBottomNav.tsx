'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, BookOpen, MapPin } from "lucide-react"

/**
 * App-style bottom navigation for phones (Kashif's request, 2026-11-06:
 * "make sure it looks like app on phones"). Rendered by ConditionalLayout on
 * public pages only; hidden on md+ screens where the top navbar serves.
 */
const ITEMS = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  { href: "/tools", label: "Tools", icon: LayoutGrid, match: (p: string) => p === "/tools" || p.startsWith("/hubs") },
  { href: "/guides", label: "Guides", icon: BookOpen, match: (p: string) => p.startsWith("/guides") && !p.startsWith("/guides/states") },
  { href: "/guides/states", label: "States", icon: MapPin, match: (p: string) => p.startsWith("/guides/states") || p.startsWith("/locations") || p.startsWith("/sales-tax") },
]

export function MobileBottomNav() {
  const pathname = usePathname() || "/"
  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur border-t border-neutral-200 dark:border-neutral-800"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4">
        {ITEMS.map((item) => {
          const active = item.match(pathname)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[56px] flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                active ? "text-[#064E3B] dark:text-emerald-400" : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              <span
                className={`flex items-center justify-center rounded-full px-5 py-1 transition-colors ${
                  active ? "bg-emerald-100 dark:bg-emerald-400/15" : "bg-transparent"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              </span>
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
