import type { Metadata } from "next"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import Link from "next/link"
import { breadcrumb, faq, offer, product, stringifyJsonLd } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { safeGetUser } from "@/utils/supabase/safe-user"
import { TOOL_COUNTS } from "@/config/navigation"

const PRICING_DESCRIPTION = `Free: ${TOOL_COUNTS.free} calculators and a 3-scenario Vault. Pro launching soon — planned at $2.99/mo: unlimited saves, comparison, ${TOOL_COUNTS.pro} Pro tools, analytics and premium PDFs.`
const PRICING_DESCRIPTION_SOCIAL = `Free: ${TOOL_COUNTS.free} calculators and a 3-scenario Vault. Pro is launching soon — planned at $2.99/mo: unlimited saves, comparison, ${TOOL_COUNTS.pro} Pro tools, full analytics, exports and live sharing.`

export const metadata: Metadata = {
  title: "Pricing — Free Tools, Pro Launching Soon | DailyFinance",
  description: PRICING_DESCRIPTION,
  alternates: { canonical: "https://www.dailyfinance.tools/pricing" },
  openGraph: {
    title: "Pricing — Free Tools, Pro Launching Soon | DailyFinance",
    description: PRICING_DESCRIPTION_SOCIAL,
    url: "https://www.dailyfinance.tools/pricing",
    siteName: "Daily Finance Tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Pricing — Free Tools, Pro Launching Soon | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Free Tools, Pro Launching Soon | DailyFinance",
    description: PRICING_DESCRIPTION_SOCIAL,
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
  keywords: ["dailyfinance pro", "financial calculator subscription", "scenario vault pricing"],
}

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "$0",
    description: "Essential access to the core calculator engine.",
    features: [
      `All ${TOOL_COUNTS.free} free calculators, with previews of the ${TOOL_COUNTS.pro} Pro tools`,
      "Real-time visual charts & graphs",
      "Responsive mobile experience",
      "Basic URL sharing",
      "Scenario Vault — save up to 3 scenarios",
      "Basic analytics snapshot (net position & balance sheet)",
      "Saved scenarios reopen with your numbers in place",
      "CSV & Excel data exports",
      "Community support",
    ],
    notIncluded: [
      "No Premium PDF reports",
      "No scenario comparison or Pro tools",
      "No full Cross-Data Analytics (charts, cash flow, DTI)",
    ],
    cta: "Get Started Free",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "$2.99",
    billingCycle: "/month",
    description: "Launching soon — the complete financial drive for power users, planned at $2.99/mo.",
    features: [
      "Everything in Free, plus:",
      "Unlimited Scenario Vault storage",
      "Scenario cloning & duplicates",
      "Analytics CSV export — your whole financial picture",
      "Premium PDF report generation",
      "Scenario comparison — saved plans side by side",
      "Live sharing — send clients pre-filled calculations",
      `${TOOL_COUNTS.pro} exclusive Pro tools (Monte Carlo, Rental Analyzer, Business Valuation, IRR & NPV, Portfolio Rebalancer)`,
      "Full Cross-Data Analytics (personal + business — balance sheet, debt costs, cash flow, charts & exports)",
      "Priority feature requests",
    ],
    notIncluded: [],
    cta: "See what's included",
    mostPopular: true,
  },
]

export default async function PricingPage() {
  // Pro has no checkout yet, so the Pro tier is framed as launching soon and
  // its CTA scrolls to the pricing FAQ instead of promising a purchase —
  // the old /pricing -> /dashboard/billing -> /pricing loop is gone.
  // The Free tier still respects login: logged out it starts at /login
  // (an account comes first); logged in it goes to the dashboard.
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const supabase =
    supabaseUrl && supabaseKey
      ? createServerClient(supabaseUrl, supabaseKey, {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
          },
        })
      : null
  const user = supabase ? await safeGetUser(supabase) : null
  const isLoggedIn = !!user

  const pricingFaqs = [
    { question: "Are the calculators really free?", answer: "Yes. Every calculator is free with no sign-up. A free account adds URL sharing and a Scenario Vault with up to 3 saved scenarios." },
    { question: "What does Pro add?", answer: `Pro — launching soon, planned at $2.99/mo — will unlock unlimited Vault storage with cloning, scenario comparison, live sharing of pre-filled calculations, ${TOOL_COUNTS.pro} exclusive Pro tools, premium PDF reports, an analytics CSV export and full Cross-Data Analytics across personal and business saves.` },
    { question: "Can I cancel anytime?", answer: "Pro will be a simple monthly subscription with no lock-in. When it launches, canceling will return the account to Free at the end of the billing period and saved data will be kept." },
  ]
  const pricingFaqSchema = faq(pricingFaqs)
  const pricingOfferSchema = product({
    name: "DailyFinance.tools",
    url: "https://www.dailyfinance.tools/pricing",
    description: "Free financial calculators for everyone; a Pro plan is launching soon, planned at $2.99 per month.",
    // Free only: Pro has no checkout yet, so it must not appear as a
    // purchasable offer in structured data. Add the Pro offer back when
    // checkout launches.
    offers: [offer({ name: "Free", price: "0" })],
  })
  const pricingCrumbSchema = breadcrumb([
    { name: "Home", url: "https://www.dailyfinance.tools/" },
    { name: "Pricing", url: "https://www.dailyfinance.tools/pricing" },
  ])
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base font-semibold leading-7 text-primary">Pricing</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Clarity for less than a cup of coffee.
          </h1>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Turn DailyFinance into your personal financial drive. Pro is launching soon — planned at $2.99/mo, it will add unlimited saves, scenario comparison, {TOOL_COUNTS.pro} Pro-only tools, instant exports and the full Cross-Data Analytics.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => {
            // Pro has no checkout: its CTA scrolls to the pricing FAQ
            // ("See what's included") instead of promising a purchase.
            const ctaHref = tier.mostPopular
              ? "#pricing-faq"
              : !isLoggedIn
                ? "/login"
                : "/dashboard"
            const ctaLabel = tier.mostPopular
              ? tier.cta
              : !isLoggedIn
                ? tier.cta
                : "Go to your dashboard"
            return (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.mostPopular ? 'ring-2 ring-primary bg-primary/5' : 'ring-1 ring-border bg-card'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h2 className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-primary' : 'text-foreground'}`}>
                  {tier.name}
                </h2>
                {tier.mostPopular && (
                  <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                    Launching soon
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
                {tier.billingCycle && <span className="text-sm font-semibold leading-6 text-muted-foreground">{tier.billingCycle}</span>}
              </p>
              {tier.mostPopular && (
                <p className="mt-1 text-xs font-medium text-muted-foreground">Planned price — Pro launches soon.</p>
              )}
              <Link
                href={ctaHref}
                className={`mt-6 flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${tier.mostPopular ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"}`}
              >
                {ctaLabel}
              </Link>
              {tier.mostPopular && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Pro launches soon — planned at $2.99/mo. Your saved scenarios will carry over when it launches.
                </p>
              )}
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className={`h-6 w-5 flex-none ${tier.mostPopular ? 'text-primary' : 'text-emerald-500'}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li key={feature} className="flex gap-x-3 text-muted-foreground/60">
                    <X className="h-6 w-5 flex-none" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            )
          })}
        </div>
        {/* Pricing FAQ — also emitted as FAQPage schema */}
        <div id="pricing-faq" className="mx-auto mt-24 max-w-3xl scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8 text-center">Pricing questions</h2>
          <FaqAccordion
            className="text-left"
            items={[
              { question: "Are the calculators really free?", answer: "Yes. Every calculator on DailyFinance is free to use with no sign-up, including real-time charts. A free account adds basic URL sharing and a Scenario Vault with up to 3 saved scenarios." },
              { question: "What does Pro add?", answer: `When it launches, Pro will unlock the power features: unlimited Scenario Vault storage with cloning, scenario comparison side by side, live sharing of pre-filled calculations, ${TOOL_COUNTS.pro} exclusive Pro tools, premium PDF report generation, an analytics-wide CSV export, and the full Cross-Data Analytics that combine your saved scenarios into a balance sheet, debt costs and cash flow.` },
              { question: "When will Pro be available?", answer: "Pro is launching soon — planned at $2.99/mo. Create a free account now and your saved scenarios and data will carry over when Pro launches; nothing is lost if you later return to Free." },
              { question: "Can I cancel anytime?", answer: "Yes. Pro will be a simple monthly subscription with no lock-in. Canceling returns your account to Free at the end of the billing period; your saved data stays in your account." },
            ]}
          />
        </div>
        <script id="schema-pricing-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(pricingFaqSchema) }} />
        <script id="schema-pricing-offer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(pricingOfferSchema) }} />
        <script id="schema-pricing-crumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(pricingCrumbSchema) }} />

      </div>
    </div>
  )
}
