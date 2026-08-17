import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import React from 'react'
import { getToolUrl } from '@/config/navigation'

const calculators = {
  'emergency-fund-calculator': dynamic(() => import('@/app/personal-wealth/emergency-fund-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'stripe-paypal-fee-calculator': dynamic(() => import('@/app/freelance/stripe-paypal-fee-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'freelance-project-pricing-calculator': dynamic(() => import('@/app/freelance/freelance-project-pricing-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'client-lifetime-value-calculator': dynamic(() => import('@/app/freelance/client-lifetime-value-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'self-employment-tax-calculator': dynamic(() => import('@/app/freelance/self-employment-tax-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  's-corp-tax-savings-calculator': dynamic(() => import('@/app/freelance/s-corp-tax-savings-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'billable-hours-calculator': dynamic(() => import('@/app/freelance/billable-hours-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'digital-nomad-cost-of-living-calculator': dynamic(() => import('@/app/freelance/digital-nomad-cost-of-living-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'freelance-hourly-rate-calculator': dynamic(() => import('@/app/freelance/freelance-hourly-rate-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'quarterly-estimated-tax-calculator': dynamic(() => import('@/app/freelance/quarterly-estimated-tax-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'w2-vs-1099-calculator': dynamic(() => import('@/app/freelance/w2-vs-1099-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'business-vehicle-tax-deduction-calculator': dynamic(() => import('@/app/freelance/business-vehicle-tax-deduction-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'youtube-adsense-estimator': dynamic(() => import('@/app/creator/youtube-adsense-estimator/CalculatorClient').then(m => m.CalculatorClient)),
  'sponsorship-pricing-calculator': dynamic(() => import('@/app/creator/sponsorship-pricing-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'tiktok-creator-fund-calculator': dynamic(() => import('@/app/creator/tiktok-creator-fund-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'patreon-tier-optimization': dynamic(() => import('@/app/creator/patreon-tier-optimization/CalculatorClient').then(m => m.CalculatorClient)),
  'platform-fee-visualizer': dynamic(() => import('@/app/creator/platform-fee-visualizer/CalculatorClient').then(m => m.CalculatorClient)),
  'course-launch-revenue-calculator': dynamic(() => import('@/app/creator/course-launch-revenue-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'substack-growth-predictor-simulator': dynamic(() => import('@/app/creator/substack-growth-predictor-simulator/CalculatorClient').then(m => m.CalculatorClient)),
  'affiliate-link-roi-calculator': dynamic(() => import('@/app/creator/affiliate-link-roi-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'merch-margin-calculator': dynamic(() => import('@/app/creator/merch-margin-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'agency-vs-solo-margin-calculator': dynamic(() => import('@/app/creator/agency-vs-solo-margin-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'target-roas-break-even-calculator': dynamic(() => import('@/app/ecommerce/target-roas-break-even-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'shopify-margin-calculator': dynamic(() => import('@/app/ecommerce/shopify-margin-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'inventory-reorder-point-calculator': dynamic(() => import('@/app/ecommerce/inventory-reorder-point-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'customer-acquisition-cost-calculator': dynamic(() => import('@/app/ecommerce/customer-acquisition-cost-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'subscription-churn-impact-simulator': dynamic(() => import('@/app/ecommerce/subscription-churn-impact-simulator/CalculatorClient').then(m => m.CalculatorClient)),
  'amazon-fba-fee-calculator': dynamic(() => import('@/app/ecommerce/amazon-fba-fee-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'black-friday-discount-roi-calculator': dynamic(() => import('@/app/ecommerce/black-friday-discount-roi-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'aov-upsell-simulator': dynamic(() => import('@/app/ecommerce/aov-upsell-simulator/CalculatorClient').then(m => m.CalculatorClient)),
  'shipping-zone-optimizer': dynamic(() => import('@/app/ecommerce/shipping-zone-optimizer/CalculatorClient').then(m => m.CalculatorClient)),
  'ltv-to-cac-ratio-calculator': dynamic(() => import('@/app/ecommerce/ltv-to-cac-ratio-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'sales-tax-vat-calculator': dynamic(() => import('@/app/ecommerce/sales-tax-vat-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'business-loan-runway-calculator': dynamic(() => import('@/app/ecommerce/business-loan-runway-calculator/CalculatorClient').then(m => m.CalculatorClient)),
}

export default async function EmbeddedCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const CalculatorClient = calculators[slug as keyof typeof calculators]
  
  if (!CalculatorClient) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <style>{`body { background-color: transparent !important; }`}</style>
      <div className="w-full max-w-5xl mx-auto mt-4 px-4 sm:px-0">
        <CalculatorClient isPro={false} />
      </div>
      <div className="mt-6 text-center pb-4">
        <a 
          href={`https://dailyfinance.tools${getToolUrl(slug as string)}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Powered by DailyFinance Tools
        </a>
      </div>
    </div>
  )
}
