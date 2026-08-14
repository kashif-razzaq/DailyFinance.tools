import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "$0",
    description: "Essential access to the core calculator engine.",
    features: [
      "Access to all 57+ interactive calculators",
      "Real-time visual charts & graphs",
      "Responsive mobile experience",
      "Basic URL sharing",
      "Community support",
    ],
    notIncluded: [
      "No Scenario Vault storage",
      "No CSV/Excel data exports",
      "No Premium PDF generation",
      "No Cross-Data Analytics",
      "Contains display ads",
    ],
    cta: "Get Started Free",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "$2.99",
    billingCycle: "/month",
    description: "The complete financial drive for power users.",
    features: [
      "Everything in Free, plus:",
      "Zero display ads",
      "Unlimited Scenario Vault storage",
      "Dynamic version history & cloning",
      "Instant CSV & Excel (XLSX) exports",
      "Premium PDF report generation",
      "Cross-Data Analytics (Net Worth, Debt Waterfalls)",
      "Priority feature requests",
    ],
    notIncluded: [],
    cta: "Upgrade to Pro",
    mostPopular: true,
  },
]

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Clarity for less than a cup of coffee.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Turn DailyFinance into your personal financial drive. Upgrade to Pro for $2.99/mo to unlock the Vault, instant data exports, and powerful cross-data analytics.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.mostPopular ? 'ring-2 ring-primary bg-primary/5' : 'ring-1 ring-border bg-card'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-primary' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                {tier.mostPopular && (
                  <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                    Most popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
                {tier.billingCycle && <span className="text-sm font-semibold leading-6 text-muted-foreground">{tier.billingCycle}</span>}
              </p>
              <Button 
                variant={tier.mostPopular ? "default" : "outline"}
                className={`mt-6 w-full rounded-xl ${tier.mostPopular ? "shadow-sm shadow-primary/20" : ""}`}
              >
                {tier.cta}
              </Button>
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
          ))}
        </div>
      </div>
    </div>
  )
}
