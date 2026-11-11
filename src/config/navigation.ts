import React from 'react'
import { 
  Briefcase, Video, TrendingUp, Home, Wallet, Calculator, Percent, DollarSign, Building, Camera, Coffee, Globe, PieChart, Shield, Smartphone, PenTool, Receipt, FileText,
  Clock, Map, BookOpen, Star, Target, ShoppingCart, Activity, Anchor, Award, Banknote, Bookmark, Box, Zap, Crown, Scale
} from "lucide-react"

export type CalculatorItem = {
  title: string
  slug: string
  description: string
  icon: React.ElementType
  isPremium?: boolean
}

export type Category = {
  name: string
  slug: string
  seoSlug: string
  icon: React.ElementType
  description: string
  colorClass: string
  calculators: CalculatorItem[]
}

const generateSlug = (title: string, slugType: 'calculator' | 'estimator' | 'visualizer' | 'tracker' | 'simulator' | 'quoter' | 'planner' | 'analyzer' | 'optimizer' | 'tool' = 'calculator') => {
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const hasToolWord = /calculator|estimator|visualizer|tracker|simulator|quoter|planner|analyzer|optimizer|tool/.test(baseSlug)
  
  if (hasToolWord) return baseSlug
  return `${baseSlug}-${slugType}`
}

export const navigationCategories: Category[] = [
  {
    name: "Freelance",
    slug: "freelance",
    seoSlug: "freelance-financial-calculators",
    icon: Briefcase,
    description: "Optimize your rates, taxes, and cash flow.",
    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    calculators: [
      { title: "Freelance Hourly Rate Calculator", slug: "freelance-hourly-rate-calculator", description: "Calculate exactly what to charge to hit your goals.", icon: DollarSign },
      { title: "Quarterly Estimated Tax Calculator", slug: "quarterly-estimated-tax-calculator", description: "Never miss a 1099 tax payment.", icon: Percent },
      { title: "Freelance Emergency Fund Calculator", slug: "freelance-emergency-fund-calculator", description: "Plan for the lean months.", icon: Wallet },
      { title: "Stripe & PayPal Fee Calculator", slug: "stripe-paypal-fee-calculator", description: "See what Stripe & PayPal actually take.", icon: Globe },
      { title: "Freelance Project Pricing Calculator", slug: "freelance-project-pricing-calculator", description: "Convert hourly rates to profitable flat fees.", icon: FileText },
      { title: "Client Lifetime Value (LTV) Calculator", slug: "client-lifetime-value-calculator", description: "Calculate the lifetime value of a retainer client.", icon: Target },
      { title: "Self-Employment Tax Calculator", slug: "self-employment-tax-calculator", description: "See how much your home office saves you.", icon: Receipt },
      { title: "S-Corp Tax Savings Calculator", slug: "s-corp-tax-savings-calculator", description: "Optimize your W2 payroll ratio.", icon: Building },
      { title: "Billable Hours Calculator", slug: "billable-hours-calculator", description: "Find out how much unbilled time costs you.", icon: Clock },
      { title: "W2 vs 1099 Paycheck Calculator", slug: "w2-vs-1099-calculator", description: "Compare true take-home pay.", icon: Banknote },
      { title: "Business Vehicle Tax Deduction Calculator", slug: "business-vehicle-tax-deduction-calculator", description: "Section 179 vehicle tax deductions.", icon: Calculator },
      { title: "Digital Nomad Cost of Living Calculator", slug: "digital-nomad-cost-of-living-calculator", description: "Geo-arbitrage your freelance income.", icon: Map },
      { title: "Salary to Hourly Calculator", slug: "salary-to-hourly-calculator", description: "Convert salary to an hourly rate, both ways.", icon: Clock },
      { title: "1099 Tax Calculator", slug: "1099-tax-calculator", description: "SE tax, federal estimate and quarterly amounts.", icon: Receipt },
    ]
  },
  {
    name: "Creator Economy",
    slug: "creator",
    seoSlug: "creator-economy-tools",
    icon: Video,
    description: "Model YouTube, Patreon, and Sponsor revenue.",
    colorClass: "bg-primary/10 text-primary dark:text-primary",
    calculators: [
      { title: "YouTube AdSense Estimator", slug: "youtube-adsense-estimator", description: "Project revenue based on RPM and views.", icon: Video },
      { title: "Sponsorship Pricing Calculator", slug: "sponsorship-pricing-calculator", description: "Price your dedicated integrations.", icon: Camera },
      { title: "Patreon Tier Optimization", slug: "patreon-tier-optimization", description: "Model churn and tier upgrades.", icon: Coffee },
      { title: "Platform Fee Visualizer", slug: "platform-fee-visualizer", description: "See who takes what cut.", icon: PieChart },
      { title: "Course Launch Revenue", slug: "course-launch-revenue-calculator", description: "Model conversions from email lists.", icon: BookOpen },
      { title: "Substack Growth Predictor", slug: "substack-growth-predictor-simulator", description: "Free to paid conversion modeling.", icon: PenTool },
      { title: "TikTok Creator Fund", slug: "tiktok-creator-fund-calculator", description: "Estimate RPM on short form content.", icon: Smartphone },
      { title: "Affiliate Link ROI", slug: "affiliate-link-roi-calculator", description: "Track earnings per click (EPC).", icon: Anchor },
      { title: "Merch Margin Calculator", slug: "merch-margin-calculator", description: "Print-on-demand profit projections.", icon: Box },
      { title: "Agency vs Solo Margin", slug: "agency-vs-solo-margin-calculator", description: "When to hire an editor vs do it yourself.", icon: Star },
      { title: "Instagram Money Calculator", slug: "instagram-money-calculator", description: "Per-post and monthly earnings estimates.", icon: Camera },
      { title: "Instagram Engagement Rate Calculator", slug: "instagram-engagement-rate-calculator", description: "Your rate graded against tier benchmarks.", icon: Activity },
      { title: "YouTube CPM / RPM Calculator", slug: "youtube-cpm-calculator", description: "CPM to RPM to real earnings per view.", icon: Video },
      { title: "Twitch Earnings Calculator", slug: "twitch-earnings-calculator", description: "Subs, bits and ads after the split.", icon: Smartphone },
    ]
  },
  {
    name: "E-Commerce",
    slug: "ecommerce",
    seoSlug: "ecommerce-profit-calculators",
    icon: TrendingUp,
    description: "ROAS, margins, and break-even points.",
    colorClass: "bg-primary/50/10 text-blue-600 dark:text-blue-400",
    calculators: [
      { title: "Target ROAS Break-Even", slug: "target-roas-break-even-calculator", description: "Know exactly when your ads are profitable.", icon: TrendingUp },
      { title: "Shopify Margin Calculator", slug: "shopify-margin-calculator", description: "Factor in shipping, COGS, and payment fees.", icon: Calculator },
      { title: "Inventory Reorder Point", slug: "inventory-reorder-point-calculator", description: "Never run out of stock during Q4.", icon: Box },
      { title: "Customer Acquisition Cost", slug: "customer-acquisition-cost-calculator", description: "Blended vs Paid CAC modeling.", icon: Target },
      { title: "Subscription Churn Impact", slug: "subscription-churn-impact-simulator", description: "How 1% less churn scales MRR.", icon: Activity },
      { title: "Amazon FBA Fee Calculator", slug: "amazon-fba-fee-calculator", description: "Storage and fulfillment deductions.", icon: ShoppingCart },
      { title: "Black Friday Discount ROI", slug: "black-friday-discount-roi-calculator", description: "How volume makes up for lower margins.", icon: Award },
      { title: "AOV Upsell Simulator", slug: "aov-upsell-simulator", description: "Impact of post-purchase bumps.", icon: Zap },
      { title: "Shipping Zone Optimizer", slug: "shipping-zone-optimizer", description: "Flat rate vs calculated costs.", icon: Globe },
      { title: "LTV to CAC Ratio", slug: "ltv-to-cac-ratio-calculator", description: "The golden metric of e-com growth.", icon: PieChart },
      { title: "Sales Tax & VAT", slug: "sales-tax-vat-calculator", description: "Inclusive vs exclusive pricing.", icon: Receipt },
      { title: "Business Loan & Runway", slug: "business-loan-runway-calculator", description: "SBA loans and startup burn rate.", icon: Building },
      { title: "Profit Margin Calculator", slug: "profit-margin-calculator", description: "Margin and markup, plus reverse pricing.", icon: Percent },
      { title: "ROI Calculator", slug: "roi-calculator", description: "Return on investment, annualised.", icon: TrendingUp },
      { title: "Markup Calculator", slug: "markup-calculator", description: "Cost plus markup to price and margin.", icon: DollarSign },
      { title: "Etsy Fee Calculator", slug: "etsy-fee-calculator", description: "Every Etsy fee on a sale, line by line.", icon: ShoppingCart },
      { title: "eBay Fee Calculator", slug: "ebay-fee-calculator", description: "Final value and promoted listing fees.", icon: ShoppingCart },
    ]
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    seoSlug: "real-estate-investment-calculators",
    icon: Home,
    description: "House hacking, BRRRR, and ROI.",
    colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    calculators: [
      { title: "House Hacking ROI", slug: "house-hacking-roi-calculator", description: "Offset your mortgage with rental income.", icon: Home },
      { title: "Rental Cash Flow", slug: "rental-cash-flow-calculator", description: "Cap rates and monthly net operating income.", icon: Building },
      { title: "BRRRR Strategy Analyzer", slug: "brrrr-strategy-analyzer", description: "Buy, Rehab, Rent, Refinance, Repeat.", icon: Wallet },
      { title: "Airbnb Arbitrage Margin", slug: "airbnb-arbitrage-margin-calculator", description: "Subleasing profit estimates.", icon: Map },
      { title: "Mortgage Amortization", slug: "mortgage-amortization-calculator", description: "See how extra payments destroy interest.", icon: Calculator },
      { title: "Flipping Profit Margin", slug: "flipping-profit-margin-calculator", description: "70% rule calculator for wholesale.", icon: DollarSign },
      { title: "HELOC Drawdown", slug: "heloc-drawdown-simulator", description: "Interest-only period payment estimator.", icon: Banknote },
      { title: "Property Tax Assessor", slug: "property-tax-assessor-calculator", description: "Estimate millage rate impacts.", icon: Receipt },
      { title: "CapEx Reserve Planner", slug: "capex-reserve-planner", description: "Save for roofs and HVACs.", icon: Shield },
      { title: "REIT vs Physical Yield", slug: "reit-vs-physical-yield-calculator", description: "Compare passive vs active returns.", icon: TrendingUp },
      { title: "Mortgage Payment Calculator", slug: "mortgage-payment-calculator", description: "Full PITI payment with a cost breakdown.", icon: Home },
      { title: "Mortgage Payoff Calculator", slug: "mortgage-payoff-calculator", description: "Extra payments: payoff date and interest saved.", icon: Zap },
      { title: "Home Affordability Calculator", slug: "home-affordability-calculator", description: "Max home price under the 28/36 rule.", icon: Building },
      { title: "Refinance Calculator", slug: "refinance-calculator", description: "Break-even month and lifetime savings.", icon: Percent },
      { title: "Rent vs Buy Calculator", slug: "rent-vs-buy-calculator", description: "Net cost of renting vs buying over time.", icon: Home },
      { title: "Down Payment Calculator", slug: "down-payment-calculator", description: "When your down payment goal is reached.", icon: DollarSign },
      { title: "Closing Cost Calculator", slug: "closing-cost-calculator", description: "Itemised closing costs and cash to close.", icon: Receipt },
      { title: "Home Equity Calculator", slug: "home-equity-calculator", description: "Equity, LTV and HELOC room.", icon: PieChart },
      { title: "Cap Rate Calculator", slug: "cap-rate-calculator", description: "Cap rate, cash-on-cash and GRM for rentals.", icon: Target },
    ]
  },
  {
    name: "Personal Wealth",
    slug: "personal-wealth",
    seoSlug: "personal-wealth-planners",
    icon: Shield,
    description: "FIRE movement and long-term planning.",
    colorClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    calculators: [
      { title: "Coast FIRE Calculator", slug: "coast-fire-calculator", description: "When can you stop contributing to retirement?", icon: Shield },
      { title: "Debt Avalanche vs Snowball", slug: "debt-avalanche-vs-snowball-calculator", description: "The mathematical fastest way out of debt.", icon: Smartphone },
      { title: "401k vs Solo 401k", slug: "401k-vs-solo-401k-calculator", description: "Contribution limits for self-employed.", icon: Briefcase },
      { title: "Roth IRA Conversion", slug: "roth-ira-conversion-simulator", description: "Tax implications of a backdoor Roth.", icon: Bookmark },
      { title: "Emergency Fund Visualizer", slug: "emergency-fund-visualizer", description: "Months of runway based on burn rate.", icon: Activity },
      { title: "Compound Interest Scaler", slug: "compound-interest-scaler-calculator", description: "The 8th wonder of the world.", icon: TrendingUp },
      { title: "Inflation Purchasing Power", slug: "inflation-purchasing-power-calculator", description: "What your money is worth in 10 years.", icon: Globe },
      { title: "HSA Triple Tax Advantage", slug: "hsa-triple-tax-advantage-calculator", description: "Investing your healthcare savings.", icon: Shield },
      { title: "Fat FIRE vs Lean FIRE", slug: "fat-fire-vs-lean-fire-calculator", description: "Define your ideal retirement number.", icon: Target },
      { title: "Net Worth Tracker", slug: "net-worth-tracker", description: "Assets minus liabilities overview.", icon: PieChart },
      { title: "Student Loan Payoff", slug: "student-loan-payoff-calculator", description: "Avalanche your student debt.", icon: BookOpen },
      { title: "Credit Card Payoff", slug: "credit-card-payoff-calculator", description: "Crush high-interest credit card debt.", icon: Wallet },
      { title: "High Yield Savings & CD", slug: "high-yield-savings-cd-calculator", description: "Park your tax savings efficiently.", icon: Banknote },
      { title: "Savings Calculator", slug: "savings-calculator", description: "Project your balance with monthly contributions and APY.", icon: Wallet },
      { title: "Interest Calculator", slug: "interest-calculator", description: "Compound growth with a real (after-inflation) view.", icon: Percent },
      { title: "Simple Interest Calculator", slug: "simple-interest-calculator", description: "I = P × R × T, with a compound comparison.", icon: Calculator },
      { title: "APY Calculator", slug: "apy-calculator", description: "Convert any rate and compounding frequency to APY.", icon: Percent },
      { title: "High-Yield Savings Calculator", slug: "high-yield-savings-calculator", description: "HYSA vs regular bank: the interest difference.", icon: Banknote },
      { title: "Savings Goal Calculator", slug: "savings-goal-calculator", description: "The monthly saving a goal and deadline require.", icon: Target },
      { title: "Future Value Calculator", slug: "future-value-calculator", description: "Future value of deposits plus a payment series.", icon: TrendingUp },
      { title: "Budget Calculator", slug: "budget-calculator", description: "Income vs spending categories and savings rate.", icon: PieChart },
      { title: "50/30/20 Budget Calculator", slug: "50-30-20-budget-calculator", description: "Needs, wants and savings against the rule.", icon: PieChart },
      { title: "Rule of 72 Calculator", slug: "rule-of-72-calculator", description: "How fast money doubles — rule vs exact maths.", icon: Zap },
      { title: "Retirement Calculator", slug: "retirement-calculator", description: "Project your nest egg to retirement age.", icon: Shield },
      { title: "Roth IRA Calculator", slug: "roth-ira-calculator", description: "Tax-free growth vs a taxable account.", icon: Star },
      { title: "IRA Calculator", slug: "ira-calculator", description: "Traditional vs Roth, side by side.", icon: Bookmark },
      { title: "Social Security Calculator", slug: "social-security-calculator", description: "Estimated benefit at 62, 67 and 70.", icon: Award },
      { title: "RMD Calculator", slug: "rmd-calculator", description: "Required minimum distributions, IRS table.", icon: FileText },
      { title: "Investment Calculator", slug: "investment-calculator", description: "Growth scenarios with fee drag included.", icon: Activity },
    ]
  },
  {
    name: "Loans & Debt",
    slug: "loans",
    seoSlug: "loan-debt-calculators",
    icon: Banknote,
    description: "Payments, payoff plans and true borrowing costs.",
    colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    calculators: [
      { title: "Loan Calculator", slug: "loan-calculator", description: "Payment, total interest and amortization schedule.", icon: Calculator },
      { title: "Auto Loan Calculator", slug: "auto-loan-calculator", description: "Trade-in, tax and term presets included.", icon: DollarSign },
      { title: "Personal Loan Calculator", slug: "personal-loan-calculator", description: "Payments including the origination fee.", icon: Wallet },
      { title: "Student Loan Calculator", slug: "student-loan-calculator", description: "Term or payment mode, with plan comparison.", icon: BookOpen },
      { title: "Credit Card Calculator", slug: "credit-card-calculator", description: "Payoff time for fixed or minimum payments.", icon: Percent },
      { title: "Debt Payoff Calculator", slug: "debt-payoff-calculator", description: "Avalanche vs snowball across all your debts.", icon: Target },
      { title: "Debt Consolidation Calculator", slug: "debt-consolidation-calculator", description: "Does combining debts actually save money?", icon: Box },
      { title: "Debt-to-Income Ratio Calculator", slug: "debt-to-income-ratio-calculator", description: "Your DTI against lender thresholds.", icon: PieChart },
      { title: "APR Calculator", slug: "apr-calculator", description: "The true APR once fees are counted.", icon: Percent },
    ]
  },
  {
    name: "Tax & Salary",
    slug: "tax",
    seoSlug: "tax-salary-calculators",
    icon: Receipt,
    description: "Paychecks, brackets and what you actually keep.",
    colorClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    calculators: [
      { title: "Tax Calculator", slug: "tax-calculator", description: "Federal tax with a bracket-by-bracket breakdown.", icon: Calculator },
      { title: "Income Tax Calculator", slug: "income-tax-calculator", description: "Federal, state and FICA in one burden view.", icon: Receipt },
      { title: "Paycheck Calculator", slug: "paycheck-calculator", description: "Take-home for every pay frequency.", icon: Banknote },
      { title: "Salary Calculator", slug: "salary-calculator", description: "Annual, monthly, weekly and after-tax pay.", icon: DollarSign },
      { title: "Take-Home Pay Calculator", slug: "take-home-pay-calculator", description: "Net pay after 401(k), HSA and premiums.", icon: Wallet },
      { title: "Overtime Calculator", slug: "overtime-calculator", description: "Gross pay with 1.5x and 2x hours priced in.", icon: Clock },
      { title: "Capital Gains Tax Calculator", slug: "capital-gains-tax-calculator", description: "Short vs long-term gains, NIIT included.", icon: TrendingUp },
    ]
  },
  {
    name: "Pro Tools",
    slug: "pro",
    seoSlug: "pro-financial-tools",
    icon: Crown,
    description: "Advanced simulators and analyzers for Pro members.",
    colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    calculators: [
      { title: "Monte Carlo Retirement Simulator", slug: "monte-carlo-retirement-simulator", description: "1,000 simulated futures for your retirement plan — success rate, not averages.", icon: Activity, isPremium: true },
      { title: "Rental Property Analyzer", slug: "rental-property-analyzer", description: "Cash flow, cap rate, cash-on-cash and DSCR for any rental deal.", icon: Building, isPremium: true },
      { title: "Business Valuation Calculator", slug: "business-valuation-calculator", description: "What a business is worth: SDE multiples and a full DCF, side by side.", icon: Scale, isPremium: true },
      { title: "IRR & NPV Analyzer", slug: "irr-npv-analyzer", description: "NPV, IRR, payback and profitability index for any cash-flow series.", icon: TrendingUp, isPremium: true },
      { title: "Portfolio Rebalancer", slug: "portfolio-rebalancer", description: "The exact buy/sell list that restores your target allocation.", icon: PieChart, isPremium: true },
    ]
  }
]

export function getCategoryForTool(toolSlug: string): Category | undefined {
  return navigationCategories.find(cat => 
    cat.calculators.some(calc => calc.slug === toolSlug)
  )
}

/**
 * Legacy save-slugs: the original freelance tools save scenarios under
 * older internal slugs that are not page URLs. Map them to the real page
 * slug so a saved scenario always resolves to a working tool page.
 */
export const SCENARIO_SLUG_ALIASES: Record<string, string> = {
  'time-tracking-roi-calculator': 'billable-hours-calculator',
  'auto-lease-write-off-calculator': 'business-vehicle-tax-deduction-calculator',
  'client-ltv-calculator': 'client-lifetime-value-calculator',
  'nomad-cost-of-living-calculator': 'digital-nomad-cost-of-living-calculator',
  'irregular-income-buffer-calculator': 'freelance-emergency-fund-calculator',
  'hourly-rate-reverse-engineer-calculator': 'freelance-hourly-rate-calculator',
  'project-flat-fee-quoter': 'freelance-project-pricing-calculator',
  'quarterly-estimated-taxes-calculator': 'quarterly-estimated-tax-calculator',
  's-corp-salary-dividend-calculator': 's-corp-tax-savings-calculator',
  'freelance-tax-deductions-calculator': 'self-employment-tax-calculator',
  'cross-border-fx-impact-calculator': 'stripe-paypal-fee-calculator',
  'w2-vs-1099-paycheck-calculator': 'w2-vs-1099-calculator',
}

/** Canonical page URL for a saved scenario's calculator_slug. */
export function getScenarioUrl(toolSlug: string): string {
  return getToolUrl(SCENARIO_SLUG_ALIASES[toolSlug] ?? toolSlug)
}

export function getToolUrl(toolSlug: string): string {
  const category = getCategoryForTool(toolSlug)
  if (category) {
    return `/${category.slug}/${toolSlug}`
  }
  // Fallback just in case
  return `/tools/${toolSlug}`
}
