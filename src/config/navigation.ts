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
    colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    calculators: [
      { title: "Hourly Rate", slug: "freelance-hourly-rate-calculator", description: "Calculate exactly what to charge to hit your goals.", icon: DollarSign },
      { title: "Quarterly Tax", slug: "quarterly-estimated-tax-calculator", description: "Never miss a 1099 tax payment.", icon: Percent },
      { title: "Stripe & PayPal Fee", slug: "stripe-paypal-fee-calculator", description: "See what Stripe & PayPal actually take.", icon: Globe },
      { title: "Project Pricing", slug: "freelance-project-pricing-calculator", description: "Convert hourly rates to profitable flat fees.", icon: FileText },
      { title: "Client LTV", slug: "client-lifetime-value-calculator", description: "Calculate the exact lifetime value of a customer and your target CAC.", icon: Target },
      { title: "S-Corp Tax Savings", slug: "s-corp-tax-savings-calculator", description: "Optimize your W2 payroll ratio.", icon: Building },
      { title: "Billable Hours", slug: "billable-hours-calculator", description: "Calculate your effective hourly rate and utilization.", icon: Clock },
      { title: "1099 vs W2", slug: "w2-vs-1099-calculator", description: "Convert rates and compare true net take-home pay.", icon: Banknote },
      { title: "Vehicle Deduction", slug: "business-vehicle-tax-deduction-calculator", description: "Section 179 vehicle tax deductions.", icon: Calculator },
      { title: "Cost of Living", slug: "digital-nomad-cost-of-living-calculator", description: "Compare cities and estimate your living expenses.", icon: Map },
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
      { title: "YouTube AdSense", slug: "youtube-adsense-estimator", description: "Convert views to money and estimate channel earnings.", icon: Video },
      { title: "Sponsorship Pricing", slug: "sponsorship-pricing-calculator", description: "Price your dedicated brand integrations across all platforms.", icon: Camera },
      { title: "Patreon Earnings", slug: "patreon-calculator", description: "Model churn and membership tier ARPU.", icon: Coffee },
      { title: "Course Launch ROI", slug: "course-launch-revenue-calculator", description: "Model conversions from email list launches.", icon: BookOpen },
      { title: "Substack Growth", slug: "substack-growth-predictor-simulator", description: "Free-to-paid subscriber conversion modeling.", icon: PenTool },
      { title: "TikTok Fund", slug: "tiktok-creator-fund-calculator", description: "Estimate Creator Rewards Program earnings.", icon: Smartphone },
      { title: "Affiliate ROI", slug: "affiliate-link-roi-calculator", description: "Calculate Earnings Per Click (EPC).", icon: Anchor },
      { title: "Merch Margin", slug: "merch-margin-calculator", description: "Print-on-demand COGS and profit margin.", icon: Box },
      { title: "Agency vs Solo", slug: "agency-vs-solo-margin-calculator", description: "Calculate time arbitrage and outsourcing ROI.", icon: Star },
    ]
  },
  {
    name: "Employment & Salary",
    slug: "employment",
    seoSlug: "salary-payroll-calculators",
    icon: Wallet,
    description: "Payroll, W2, 1099, and take-home pay.",
    colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    calculators: [
      { title: "Take Home Pay", slug: "take-home-pay-calculator", description: "Calculate take home pay for W-2, 1099, and Creators.", icon: Wallet },
      { title: "Salary to Hourly", slug: "hourly-rate-calculator", description: "Convert salary to hourly wage and calculate total earnings.", icon: Calculator },
      { title: "Paycheck Deductions", slug: "employee-deduction-calculator", description: "Model 401k, HSA, and payroll tax withholdings.", icon: Receipt },
      { title: "Severance Pay", slug: "severance-pay-calculator", description: "Calculate your severance package and estimated taxes.", icon: Wallet },
      { title: "Prorated Salary", slug: "prorated-salary-calculator", description: "Calculate partial paychecks for mid-period starts.", icon: Calculator },
      { title: "Bonus Tax", slug: "bonus-tax-calculator", description: "Calculate net bonus after supplemental tax rates.", icon: DollarSign },
      { title: "Overtime Pay", slug: "overtime-pay-calculator", description: "Calculate time-and-a-half and double-time FLSA pay.", icon: Clock },
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
      { title: "Target ROAS", slug: "target-roas-break-even-calculator", description: "Know exactly when your ads are profitable.", icon: TrendingUp },
      { title: "Shopify Margin", slug: "shopify-margin-calculator", description: "Factor in shipping, COGS, and payment fees.", icon: Calculator },
      { title: "Inventory Reorder", slug: "inventory-reorder-point-calculator", description: "Never run out of stock during Q4.", icon: Box },
      { title: "CAC Modeler", slug: "customer-acquisition-cost-calculator", description: "Blended vs Paid CAC modeling.", icon: Target },
      { title: "Subscription Churn", slug: "subscription-churn-impact-simulator", description: "How 1% less churn scales MRR.", icon: Activity },
      { title: "Amazon FBA Fees", slug: "amazon-fba-fee-calculator", description: "Storage and fulfillment deductions.", icon: ShoppingCart },
      { title: "Discount ROI", slug: "black-friday-discount-roi-calculator", description: "How volume makes up for lower margins.", icon: Award },
      { title: "AOV Upsell", slug: "aov-upsell-simulator", description: "Impact of post-purchase bumps.", icon: Zap },
      { title: "Shipping Zones", slug: "shipping-zone-optimizer", description: "Flat rate vs calculated costs.", icon: Globe },
      { title: "LTV:CAC Ratio", slug: "ltv-to-cac-ratio-calculator", description: "The golden metric of e-com growth.", icon: PieChart },
      { title: "Sales Tax & VAT", slug: "sales-tax-vat-calculator", description: "Inclusive vs exclusive pricing.", icon: Receipt },
      { title: "Business Loan", slug: "business-loan-runway-calculator", description: "SBA loans and startup burn rate.", icon: Building },
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
      { title: "House Hacking", slug: generateSlug("House Hacking ROI", "calculator"), description: "Offset your mortgage with rental income.", icon: Home },
      { title: "Rental Cash Flow", slug: generateSlug("Rental Cash Flow", "calculator"), description: "Cap rates and monthly net operating income.", icon: Building },
      { title: "BRRRR Analyzer", slug: generateSlug("BRRRR Strategy Analyzer", "analyzer"), description: "Buy, Rehab, Rent, Refinance, Repeat.", icon: Wallet },
      { title: "Airbnb Arbitrage", slug: generateSlug("Airbnb Arbitrage Margin", "calculator"), description: "Subleasing profit estimates.", icon: Map },
      { title: "Mortgage Amortization", slug: generateSlug("Mortgage Amortization", "calculator"), description: "See how extra payments destroy interest.", icon: Calculator },
      { title: "Flipping Margin", slug: generateSlug("Flipping Profit Margin", "calculator"), description: "70% rule calculator for wholesale.", icon: DollarSign },
      { title: "HELOC Drawdown", slug: generateSlug("HELOC Drawdown", "simulator"), description: "Interest-only period payment estimator.", icon: Banknote },
      { title: "Property Tax", slug: generateSlug("Property Tax Assessor", "calculator"), description: "Estimate millage rate impacts.", icon: Receipt },
      { title: "CapEx Reserves", slug: generateSlug("CapEx Reserve Planner", "planner"), description: "Save for roofs and HVACs.", icon: Shield },
      { title: "REIT vs Physical", slug: generateSlug("REIT vs Physical Yield", "calculator"), description: "Compare passive vs active returns.", icon: TrendingUp },
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
      { title: "Coast FIRE", slug: generateSlug("Coast FIRE Calculator", "calculator"), description: "When can you stop contributing to retirement?", icon: Shield },
      { title: "Debt Avalanche", slug: generateSlug("Debt Avalanche vs Snowball", "calculator"), description: "The mathematical fastest way out of debt.", icon: Smartphone },
      { title: "401k vs Solo 401k", slug: generateSlug("401k vs Solo 401k", "calculator"), description: "Contribution limits for self-employed.", icon: Briefcase },
      { title: "Roth IRA Conversion", slug: generateSlug("Roth IRA Conversion", "simulator"), description: "Tax implications of a backdoor Roth.", icon: Bookmark },
      { title: "Emergency Fund", slug: "emergency-fund-calculator", description: "Calculate your ideal emergency fund based on your unique risk profile.", icon: Shield },
      { title: "Compound Interest", slug: generateSlug("Compound Interest Scaler", "calculator"), description: "The 8th wonder of the world.", icon: TrendingUp },
      { title: "Inflation Power", slug: generateSlug("Inflation Purchasing Power", "calculator"), description: "What your money is worth in 10 years.", icon: Globe },
      { title: "HSA Triple Tax", slug: generateSlug("HSA Triple Tax Advantage", "calculator"), description: "Investing your healthcare savings.", icon: Shield },
      { title: "Fat vs Lean FIRE", slug: generateSlug("Fat FIRE vs Lean FIRE", "calculator"), description: "Define your ideal retirement number.", icon: Target },
      { title: "Net Worth Tracker", slug: generateSlug("Net Worth Tracker", "tracker"), description: "Assets minus liabilities overview.", icon: PieChart },
      { title: "Student Loan Payoff", slug: generateSlug("Student Loan Payoff", "calculator"), description: "Avalanche your student debt.", icon: BookOpen },
      { title: "Credit Card Payoff", slug: generateSlug("Credit Card Payoff", "calculator"), description: "Crush high-interest credit card debt.", icon: Wallet },
      { title: "HYSA & CD", slug: generateSlug("High Yield Savings CD", "calculator"), description: "Park your tax savings efficiently.", icon: Banknote },
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
