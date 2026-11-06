import type { Metadata } from "next"
import Link from "next/link"
import { navigationCategories, getToolUrl } from "@/config/navigation"
import { Search, Home, Calculator } from "lucide-react"

export const metadata: Metadata = {
  title: "Page Not Found (404) | DailyFinance",
  description: "That page doesn't exist — but the calculator you need probably does. Browse freelance, creator, e-commerce, real estate and personal wealth tools.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl text-center">
        <p className="text-7xl font-black text-primary/15 mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">This page doesn&apos;t exist</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
          The link may be old, or the tool may have moved. Everything on DailyFinance is free — find the right calculator below.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link href="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"><Home className="h-4 w-4" /> Go to homepage</Link>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-card border px-6 py-3 rounded-xl font-semibold text-sm hover:border-primary/40 transition-colors"><Search className="h-4 w-4" /> Browse all tools</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {navigationCategories.map((cat) => (
            <div key={cat.slug} className="bg-card border rounded-3xl p-6">
              <Link href={`/${cat.slug}`} className="font-bold hover:text-primary transition-colors flex items-center gap-2 mb-3"><Calculator className="h-4 w-4 text-primary" /> {cat.name}</Link>
              <ul className="space-y-2">
                {cat.calculators.slice(0, 4).map((c) => (
                  <li key={c.slug}><Link href={getToolUrl(c.slug)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{c.title}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
            <h2 className="font-bold mb-3">Popular right now</h2>
            <ul className="space-y-2">
              <li><Link href="/freelance/freelance-hourly-rate-calculator" className="text-sm text-muted-foreground hover:text-foreground">Freelance Hourly Rate Calculator</Link></li>
              <li><Link href="/real-estate/mortgage-amortization-calculator" className="text-sm text-muted-foreground hover:text-foreground">Mortgage Calculator &amp; Amortization</Link></li>
              <li><Link href="/personal-wealth/compound-interest-scaler-calculator" className="text-sm text-muted-foreground hover:text-foreground">Compound Interest Calculator</Link></li>
              <li><Link href="/ecommerce/sales-tax-vat-calculator" className="text-sm text-muted-foreground hover:text-foreground">Sales Tax Calculator</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
