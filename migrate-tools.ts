import * as fs from 'fs';
import * as path from 'path';

// Simplified navigation data for the script to use
const navigationCategories = [
  {
    name: "Freelance",
    slug: "freelance",
    calculators: [
      { title: "Hourly Rate Reverse Engineer", slug: "hourly-rate-reverse-engineer-calculator" },
      { title: "Quarterly Estimated Taxes", slug: "quarterly-estimated-taxes-calculator" },
      { title: "Irregular Income Buffer", slug: "irregular-income-buffer-calculator" },
      { title: "Cross-Border FX Impact", slug: "cross-border-fx-impact-calculator" },
      { title: "Project Flat Fee Quoter", slug: "project-flat-fee-quoter" },
      { title: "Client LTV Calculator", slug: "client-ltv-calculator" },
      { title: "Freelance Tax Deductions", slug: "freelance-tax-deductions-calculator" },
      { title: "S-Corp Salary vs Dividend", slug: "s-corp-salary-dividend-calculator" },
      { title: "Time Tracking ROI", slug: "time-tracking-roi-calculator" },
      { title: "Nomad Cost of Living", slug: "nomad-cost-of-living-calculator" },
    ]
  },
  {
    name: "Creator Economy",
    slug: "creator",
    calculators: [
      { title: "YouTube AdSense Estimator", slug: "youtube-adsense-estimator" },
      { title: "Sponsorship Pricing Calculator", slug: "sponsorship-pricing-calculator" },
      { title: "Patreon Tier Optimization", slug: "patreon-tier-optimization" },
      { title: "Platform Fee Visualizer", slug: "platform-fee-visualizer" },
      { title: "Course Launch Revenue", slug: "course-launch-revenue-calculator" },
      { title: "Substack Growth Predictor", slug: "substack-growth-predictor-simulator" },
      { title: "TikTok Creator Fund", slug: "tiktok-creator-fund-calculator" },
      { title: "Affiliate Link ROI", slug: "affiliate-link-roi-calculator" },
      { title: "Merch Margin Calculator", slug: "merch-margin-calculator" },
      { title: "Agency vs Solo Margin", slug: "agency-vs-solo-margin-calculator" },
    ]
  },
  {
    name: "E-Commerce",
    slug: "ecommerce",
    calculators: [
      { title: "Target ROAS Break-Even", slug: "target-roas-break-even-calculator" },
      { title: "Shopify Margin Calculator", slug: "shopify-margin-calculator" },
      { title: "Inventory Reorder Point", slug: "inventory-reorder-point-calculator" },
      { title: "Customer Acquisition Cost", slug: "customer-acquisition-cost-calculator" },
      { title: "Subscription Churn Impact", slug: "subscription-churn-impact-simulator" },
      { title: "Amazon FBA Fee Calculator", slug: "amazon-fba-fee-calculator" },
      { title: "Black Friday Discount ROI", slug: "black-friday-discount-roi-calculator" },
      { title: "AOV Upsell Simulator", slug: "aov-upsell-simulator" },
      { title: "Shipping Zone Optimizer", slug: "shipping-zone-optimizer" },
      { title: "LTV to CAC Ratio", slug: "ltv-to-cac-ratio-calculator" },
    ]
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    calculators: [
      { title: "House Hacking ROI", slug: "house-hacking-roi-calculator" },
      { title: "Rental Cash Flow", slug: "rental-cash-flow-calculator" },
      { title: "BRRRR Strategy Analyzer", slug: "brrrr-strategy-analyzer" },
      { title: "Airbnb Arbitrage Margin", slug: "airbnb-arbitrage-margin-calculator" },
      { title: "Mortgage Amortization", slug: "mortgage-amortization-calculator" },
      { title: "Flipping Profit Margin", slug: "flipping-profit-margin-calculator" },
      { title: "HELOC Drawdown", slug: "heloc-drawdown-simulator" },
      { title: "Property Tax Assessor", slug: "property-tax-assessor-calculator" },
      { title: "CapEx Reserve Planner", slug: "capex-reserve-planner" },
      { title: "REIT vs Physical Yield", slug: "reit-vs-physical-yield-calculator" },
    ]
  },
  {
    name: "Personal Wealth",
    slug: "personal-wealth",
    calculators: [
      { title: "Coast FIRE Calculator", slug: "coast-fire-calculator" },
      { title: "Debt Avalanche vs Snowball", slug: "debt-avalanche-vs-snowball-calculator" },
      { title: "401k vs Solo 401k", slug: "401k-vs-solo-401k-calculator" },
      { title: "Roth IRA Conversion", slug: "roth-ira-conversion-simulator" },
      { title: "Emergency Fund Visualizer", slug: "emergency-fund-visualizer" },
      { title: "Compound Interest Scaler", slug: "compound-interest-scaler-calculator" },
      { title: "Inflation Purchasing Power", slug: "inflation-purchasing-power-calculator" },
      { title: "HSA Triple Tax Advantage", slug: "hsa-triple-tax-advantage-calculator" },
      { title: "Fat FIRE vs Lean FIRE", slug: "fat-fire-vs-lean-fire-calculator" },
      { title: "Net Worth Tracker", slug: "net-worth-tracker" },
    ]
  }
];

const appDir = path.join(process.cwd(), 'src', 'app');
const toolsDir = path.join(appDir, 'tools');

function generateScaffoldPage(title: string, slug: string) {
    return `import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "${title} | DailyFinance",
  description: "Calculate your ${title.toLowerCase()}.",
}

export default function Page() {
  return (
    <ToolLayout
      title="${title}"
      description="Use our free ${title.toLowerCase()} to optimize your finances."
      slug="${slug}"
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the ${title}</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
`;
}

// 1. Ensure category directories exist
for (const cat of navigationCategories) {
  const catDir = path.join(appDir, cat.slug);
  if (!fs.existsSync(catDir)) {
    fs.mkdirSync(catDir, { recursive: true });
  }

  // 2. Create calculator directories inside the category
  for (const calc of cat.calculators) {
    const calcDir = path.join(catDir, calc.slug);
    
    // Check if it already exists in src/app/tools
    const oldPath = path.join(toolsDir, calc.slug);
    
    if (fs.existsSync(oldPath)) {
      // Move the directory!
      console.log(`Moving ${oldPath} to ${calcDir}`);
      fs.renameSync(oldPath, calcDir);
    } else {
      // It doesn't exist, generate scaffold
      if (!fs.existsSync(calcDir)) {
        console.log(`Generating scaffold for ${calcDir}`);
        fs.mkdirSync(calcDir, { recursive: true });
        fs.writeFileSync(path.join(calcDir, 'page.tsx'), generateScaffoldPage(calc.title, calc.slug));
      }
    }
  }
}

console.log("Migration completed.");
