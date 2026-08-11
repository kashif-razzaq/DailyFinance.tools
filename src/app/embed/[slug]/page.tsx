import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import React from 'react'

const calculators = {
  'irregular-income-buffer-calculator': dynamic(() => import('@/app/tools/irregular-income-buffer-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'cross-border-fx-impact-calculator': dynamic(() => import('@/app/tools/cross-border-fx-impact-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'project-flat-fee-quoter': dynamic(() => import('@/app/tools/project-flat-fee-quoter/CalculatorClient').then(m => m.CalculatorClient)),
  'client-ltv-calculator': dynamic(() => import('@/app/tools/client-ltv-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'freelance-tax-deductions-calculator': dynamic(() => import('@/app/tools/freelance-tax-deductions-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  's-corp-salary-dividend-calculator': dynamic(() => import('@/app/tools/s-corp-salary-dividend-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'time-tracking-roi-calculator': dynamic(() => import('@/app/tools/time-tracking-roi-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'nomad-cost-of-living-calculator': dynamic(() => import('@/app/tools/nomad-cost-of-living-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'hourly-rate-reverse-engineer-calculator': dynamic(() => import('@/app/tools/hourly-rate-reverse-engineer-calculator/CalculatorClient').then(m => m.CalculatorClient)),
  'quarterly-estimated-taxes-calculator': dynamic(() => import('@/app/tools/quarterly-estimated-taxes-calculator/CalculatorClient').then(m => m.CalculatorClient)),
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
          href={`https://dailyfinance.tools/tools/${slug}`} 
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
