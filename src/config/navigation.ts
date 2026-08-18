import React from 'react'
import { 
  Briefcase, Video, TrendingUp, Home, Wallet, Calculator, Percent, DollarSign, Building, Camera, Coffee, Globe, PieChart, Shield, Smartphone, PenTool, Receipt, FileText,
  Clock, Map, BookOpen, Star, Target, ShoppingCart, Activity, Anchor, Award, Banknote, Bookmark, Box, Zap
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
      { title: "Stripe & PayPal Fee Calculator", slug: "stripe-paypal-fee-calculator", description: "See what Stripe & PayPal actually take.", icon: Globe },
      { title: "Freelance Project Pricing Calculator", slug: "freelance-project-pricing-calculator", description: "Convert hourly rates to profitable flat fees.", icon: FileText },
      { title: "Customer Lifetime Value (CLV)", slug: "client-lifetime-value-calculator", description: "Calculate the exact lifetime value of a customer and your target CAC.", icon: Target },
      { title: "Self-Employment Tax Calculator", slug: "self-employment-tax-calculator", description: "Estimate your 1099 taxes and see how much to set aside.", icon: Receipt },
      { title: "S-Corp Tax Savings Calculator", slug: "s-corp-tax-savings-calculator", description: "Optimize your W2 payroll ratio.", icon: Building },
      { title: "Billable Hours Calculator", slug: "billable-hours-calculator", description: "Calculate your effective hourly rate and utilization.", icon: Clock },
      { title: "1099 vs W2 Calculator", slug: "w2-vs-1099-calculator", description: "Convert rates and compare true net take-home pay.", icon: Banknote },
      { title: "Business Vehicle Tax Deduction Calculator", slug: "business-vehicle-tax-deduction-calculator", description: "Section 179 vehicle tax deductions.", icon: Calculator },
      { title: "Cost of Living Calculator", slug: "digital-nomad-cost-of-living-calculator", description: "Compare cities and estimate your living expenses.", icon: Map },
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
      { title: "YouTube Money Calculator", slug: "youtube-adsense-estimator", description: "Convert views to money and estimate channel earnings.", icon: Video },
      { title: "Sponsorship Value Calculator", slug: "sponsorship-pricing-calculator", description: "Price your dedicated brand integrations.", icon: Camera },
      { title: "Patreon Earnings Calculator", slug: "patreon-tier-optimization", description: "Model churn and membership tier ARPU.", icon: Coffee },
      { title: "Creator Platform Fee Visualizer", slug: "platform-fee-visualizer", description: "Compare Patreon, Substack, & Gumroad fees.", icon: PieChart },
      { title: "Course Launch Revenue Calculator", slug: "course-launch-revenue-calculator", description: "Model conversions from email list launches.", icon: BookOpen },
      { title: "Substack Income Calculator", slug: "substack-growth-predictor-simulator", description: "Free-to-paid subscriber conversion modeling.", icon: PenTool },
      { title: "TikTok Money Calculator", slug: "tiktok-creator-fund-calculator", description: "Estimate Creator Rewards Program earnings.", icon: Smartphone },
      { title: "Affiliate Link ROI Calculator", slug: "affiliate-link-roi-calculator", description: "Calculate Earnings Per Click (EPC).", icon: Anchor },
      { title: "Merch Margin Calculator", slug: "merch-margin-calculator", description: "Print-on-demand COGS and profit margin.", icon: Box },
      { title: "Agency vs Solo Creator Calculator", slug: "agency-vs-solo-margin-calculator", description: "Calculate time arbitrage and outsourcing ROI.", icon: Star },
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
      { title: "Target ROAS Calculator", slug: "target-roas-break-even-calculator", description: "Know exactly when your ads are profitable.", icon: TrendingUp },
      { title: "Shopify Profit Margin Calculator", slug: "shopify-margin-calculator", description: "Factor in shipping, COGS, and payment fees.", icon: Calculator },
      { title: "Inventory Reorder Point Calculator", slug: "inventory-reorder-point-calculator", description: "Never run out of stock during Q4.", icon: Box },
      { title: "Customer Acquisition Cost Calculator", slug: "customer-acquisition-cost-calculator", description: "Blended vs Paid CAC modeling.", icon: Target },
      { title: "Subscription Churn Calculator", slug: "subscription-churn-impact-simulator", description: "How 1% less churn scales MRR.", icon: Activity },
      { title: "Amazon FBA Fee Calculator", slug: "amazon-fba-fee-calculator", description: "Storage and fulfillment deductions.", icon: ShoppingCart },
      { title: "Black Friday Discount ROI Calculator", slug: "black-friday-discount-roi-calculator", description: "How volume makes up for lower margins.", icon: Award },
      { title: "AOV Upsell Simulator", slug: "aov-upsell-simulator", description: "Impact of post-purchase bumps.", icon: Zap },
      { title: "Shipping Zone Optimizer", slug: "shipping-zone-optimizer", description: "Flat rate vs calculated costs.", icon: Globe },
      { title: "LTV to CAC Ratio Calculator", slug: "ltv-to-cac-ratio-calculator", description: "The golden metric of e-com growth.", icon: PieChart },
      { title: "Sales Tax & VAT Calculator", slug: "sales-tax-vat-calculator", description: "Inclusive vs exclusive pricing.", icon: Receipt },
      { title: "Business Loan Calculator", slug: "business-loan-runway-calculator", description: "SBA loans and startup burn rate.", icon: Building },
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
      { title: "House Hacking ROI", slug: generateSlug("House Hacking ROI", "calculator"), description: "Offset your mortgage with rental income.", icon: Home },
      { title: "Rental Cash Flow", slug: generateSlug("Rental Cash Flow", "calculator"), description: "Cap rates and monthly net operating income.", icon: Building },
      { title: "BRRRR Strategy Analyzer", slug: generateSlug("BRRRR Strategy Analyzer", "analyzer"), description: "Buy, Rehab, Rent, Refinance, Repeat.", icon: Wallet },
      { title: "Airbnb Arbitrage Margin", slug: generateSlug("Airbnb Arbitrage Margin", "calculator"), description: "Subleasing profit estimates.", icon: Map },
      { title: "Mortgage Amortization", slug: generateSlug("Mortgage Amortization", "calculator"), description: "See how extra payments destroy interest.", icon: Calculator },
      { title: "Flipping Profit Margin", slug: generateSlug("Flipping Profit Margin", "calculator"), description: "70% rule calculator for wholesale.", icon: DollarSign },
      { title: "HELOC Drawdown", slug: generateSlug("HELOC Drawdown", "simulator"), description: "Interest-only period payment estimator.", icon: Banknote },
      { title: "Property Tax Assessor", slug: generateSlug("Property Tax Assessor", "calculator"), description: "Estimate millage rate impacts.", icon: Receipt },
      { title: "CapEx Reserve Planner", slug: generateSlug("CapEx Reserve Planner", "planner"), description: "Save for roofs and HVACs.", icon: Shield },
      { title: "REIT vs Physical Yield", slug: generateSlug("REIT vs Physical Yield", "calculator"), description: "Compare passive vs active returns.", icon: TrendingUp },
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
      { title: "Coast FIRE Calculator", slug: generateSlug("Coast FIRE Calculator", "calculator"), description: "When can you stop contributing to retirement?", icon: Shield },
      { title: "Debt Avalanche vs Snowball", slug: generateSlug("Debt Avalanche vs Snowball", "calculator"), description: "The mathematical fastest way out of debt.", icon: Smartphone },
      { title: "401k vs Solo 401k", slug: generateSlug("401k vs Solo 401k", "calculator"), description: "Contribution limits for self-employed.", icon: Briefcase },
      { title: "Roth IRA Conversion", slug: generateSlug("Roth IRA Conversion", "simulator"), description: "Tax implications of a backdoor Roth.", icon: Bookmark },
      { title: "Emergency Fund Calculator", slug: "emergency-fund-calculator", description: "Calculate your ideal emergency fund based on your unique risk profile.", icon: Shield },
      { title: "Compound Interest Scaler", slug: generateSlug("Compound Interest Scaler", "calculator"), description: "The 8th wonder of the world.", icon: TrendingUp },
      { title: "Inflation Purchasing Power", slug: generateSlug("Inflation Purchasing Power", "calculator"), description: "What your money is worth in 10 years.", icon: Globe },
      { title: "HSA Triple Tax Advantage", slug: generateSlug("HSA Triple Tax Advantage", "calculator"), description: "Investing your healthcare savings.", icon: Shield },
      { title: "Fat FIRE vs Lean FIRE", slug: generateSlug("Fat FIRE vs Lean FIRE", "calculator"), description: "Define your ideal retirement number.", icon: Target },
      { title: "Net Worth Tracker", slug: generateSlug("Net Worth Tracker", "tracker"), description: "Assets minus liabilities overview.", icon: PieChart },
      { title: "Student Loan Payoff", slug: generateSlug("Student Loan Payoff", "calculator"), description: "Avalanche your student debt.", icon: BookOpen },
      { title: "Credit Card Payoff", slug: generateSlug("Credit Card Payoff", "calculator"), description: "Crush high-interest credit card debt.", icon: Wallet },
      { title: "High Yield Savings & CD", slug: generateSlug("High Yield Savings CD", "calculator"), description: "Park your tax savings efficiently.", icon: Banknote },
    ]
  }
]

export function getCategoryForTool(toolSlug: string): Category | undefined {
  return navigationCategories.find(cat => 
    cat.calculators.some(calc => calc.slug === toolSlug)
  )
}

export function getToolUrl(toolSlug: string): string {
  const category = getCategoryForTool(toolSlug)
  if (category) {
    return `/${category.slug}/${toolSlug}`
  }
  // Fallback just in case
  return `/tools/${toolSlug}`
}
