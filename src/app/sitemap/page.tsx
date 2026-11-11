import type { Metadata } from "next"
import Link from "next/link"
import { navigationCategories, getToolUrl } from "@/config/navigation"
import { US_STATES } from "@/data/locations/us-states"
import { US_CITIES } from "@/data/locations/us-cities"
import { GUIDES } from "@/data/guides"
import { HUBS } from "@/data/hubs"

export const metadata: Metadata = {
  title: "Sitemap — Every Calculator, Guide & State Page",
  description: "The complete DailyFinance.tools sitemap in hierarchy order: calculators by category, hubs, guides, and every state and city tax page.",
  alternates: { canonical: "https://dailyfinance.tools/sitemap" },
  openGraph: {
    title: "Sitemap — DailyFinance.tools",
    description: "Every calculator, guide and state page on DailyFinance.tools, in one clickable hierarchy.",
    url: "https://dailyfinance.tools/sitemap",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Sitemap — DailyFinance.tools" }],
  },
}

const MAIN_PAGES: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guides", label: "Guides" },
  { href: "/guides/states", label: "State tax guides" },
  { href: "/locations", label: "Calculators by state" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/methodology", label: "Methodology" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
]

function SectionTitle({ children, count }: { children: React.ReactNode; count: number }) {
  return (
    <h2 className="mb-4 mt-12 flex items-baseline gap-3 text-xl font-extrabold tracking-tight text-foreground first:mt-0">
      {children}
      <span className="text-sm font-semibold text-muted-foreground">{count}</span>
    </h2>
  )
}

const linkCls = "text-sm text-muted-foreground underline-offset-2 transition-colors hover:text-[#064E3B] hover:underline"

export default function SitemapPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 md:py-16">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#064E3B]">DailyFinance.tools</p>
      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">Sitemap</h1>
      <p className="mb-4 max-w-2xl font-light leading-relaxed text-muted-foreground">
        Every page on the site in hierarchy order — calculators under their category, and for each state its
        finance page, tax guide and sales-tax page followed by its city pages. Search engines use the{" "}
        <a href="/sitemap.xml" className="font-semibold text-[#064E3B] hover:underline">XML sitemap index</a> instead.
      </p>

      <SectionTitle count={MAIN_PAGES.length}>Main pages</SectionTitle>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4">
        {MAIN_PAGES.map((p) => (
          <li key={p.href}><Link href={p.href} className={linkCls}>{p.label}</Link></li>
        ))}
      </ul>

      <SectionTitle count={navigationCategories.reduce((n, c) => n + c.calculators.length, 0)}>Calculators by category</SectionTitle>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {navigationCategories.map((cat) => (
          <div key={cat.slug}>
            <h3 className="mb-2 font-bold text-foreground">
              <Link href={`/${cat.slug}`} className="transition-colors hover:text-[#064E3B]">{cat.name}</Link>
              <span className="ml-2 text-xs font-semibold text-muted-foreground">{cat.calculators.length}</span>
            </h3>
            <ul className="space-y-1.5">
              {cat.calculators.map((calc) => (
                <li key={calc.slug}><Link href={getToolUrl(calc.slug)} className={linkCls}>{calc.title}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionTitle count={HUBS.length}>Hubs</SectionTitle>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-3">
        {HUBS.map((h) => (
          <li key={h.slug}><Link href={`/hubs/${h.slug}`} className={linkCls}>{h.title}</Link></li>
        ))}
      </ul>

      <SectionTitle count={GUIDES.length}>Guides</SectionTitle>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <li key={g.slug}><Link href={`/guides/${g.slug}`} className={linkCls}>{g.title}</Link></li>
        ))}
      </ul>

      <SectionTitle count={US_STATES.length * 3 + US_CITIES.length * 2}>States &amp; cities</SectionTitle>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {US_STATES.map((s) => {
          const cities = US_CITIES.filter((c) => c.stateSlug === s.slug)
          return (
            <div key={s.slug}>
              <h3 className="mb-2 font-bold text-foreground">{s.name}</h3>
              <ul className="space-y-1.5">
                <li><Link href={`/locations/${s.slug}`} className={linkCls}>{s.name} finance &amp; tax overview</Link></li>
                <li><Link href={`/guides/states/${s.slug}`} className={linkCls}>{s.name} tax guide</Link></li>
                <li><Link href={`/sales-tax/${s.slug}`} className={linkCls}>{s.name} sales tax</Link></li>
                {cities.map((c) => (
                  <li key={c.slug} className="pl-4">
                    <Link href={`/guides/states/${s.slug}/${c.slug}`} className={linkCls}>{c.name} tax guide</Link>
                    {" · "}
                    <Link href={`/sales-tax/${s.slug}/${c.slug}`} className={linkCls}>sales tax</Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </main>
  )
}
