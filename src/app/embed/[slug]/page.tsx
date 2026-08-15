import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import React from 'react'
import { getToolUrl } from '@/config/navigation'

const calculators = {
  'freelance-emergency-fund-calculator': dynamic(() => import('@/app/freelance/freelance-emergency-fund-calculator/CalculatorClient').then(m => m.CalculatorClient)),
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
}

export default async function EmbeddedCalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const CalculatorClient = calculators[slug as keyof typeof calculators]
  
  if (!CalculatorClient) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Force the body background to be transparent so the iframe blends into the parent site */}
      <style>{`body { background-color: transparent !important; }`}</style>
      <div className="w-full max-w-5xl mx-auto mt-4 px-4 sm:px-0">
        {/* We pass isPro=false so it defaults to the standard free embedded version */}
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
