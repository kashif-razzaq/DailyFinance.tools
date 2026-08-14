import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { navigationCategories, getToolUrl } from '@/config/navigation'
import { ArrowRight, Calculator, TrendingUp, PieChart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The 57+ Free Financial Calculators and Tools | DailyFinance',
  description: 'Optimize your taxes, investments, and cash flow with our comprehensive suite of free, professional-grade financial calculators.',
  openGraph: {
    title: 'Professional Financial Calculators | DailyFinance',
    description: 'A complete suite of advanced financial tools to optimize your business and personal finances.',
    url: 'https://dailyfinance.tools/tools',
    siteName: 'DailyFinance Tools',
    type: 'website',
  }
}

export default function ToolsDirectoryPage() {
  // Generate ItemList JSON-LD Schema
  const allCalculators = navigationCategories.flatMap(c => c.calculators)
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Professional Financial Calculators Hub",
    "description": "Optimize your taxes, investments, and cash flow with our comprehensive suite of free financial calculators.",
    "url": "https://dailyfinance.tools/tools",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": allCalculators.map((calc, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebApplication",
          "name": calc.title,
          "description": calc.description,
          "url": `https://dailyfinance.tools${getToolUrl(calc.slug)}`,
          "applicationCategory": "BusinessApplication"
        }
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background pb-20">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-border/40">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Text */}
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6 max-w-2xl leading-tight">
                  Professional financial tools for <span className="text-primary font-bold">everyone.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Stop guessing your taxes, margins, and financial runway. Use our free suite of advanced calculators to make data-driven decisions for your future.
                </p>
              </div>

              {/* Right Column: Abstract Floating UI Illustration */}
              <div className="hidden lg:block relative w-full h-[350px] z-0 perspective-1000">
                {/* Background Grid Accent */}
                <svg className="absolute -right-10 -top-10 w-[120%] h-[120%] opacity-[0.03] dark:opacity-[0.05] -z-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Main Dashboard Card */}
                <div className="absolute right-4 top-4 w-[380px] shadow-2xl rounded-2xl bg-card border border-border/60 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="h-3 w-24 bg-foreground/80 rounded-full mb-2"></div>
                        <div className="h-2 w-16 bg-muted-foreground/50 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-6 w-16 bg-accent/10 text-accent text-[9px] font-bold flex items-center justify-center rounded-full">+24.5%</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end gap-2 pt-2 h-24">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="w-full bg-primary/10 rounded-t-sm relative group">
                          <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Secondary Floating Element (Overlapping) */}
                <div className="absolute -bottom-4 -left-4 w-56 shadow-xl rounded-xl bg-card border border-border/60 p-5 transform -rotate-3 hover:-rotate-1 transition-transform duration-700 z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <PieChart className="w-4 h-4 text-accent" />
                    </div>
                    <div className="h-2.5 w-20 bg-foreground/70 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent border-r-accent"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-2 w-full bg-muted rounded-full"></div>
                      <div className="h-2 w-2/3 bg-muted rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Directory Sections */}
        <section className="container mx-auto px-4 md:px-8 py-16 space-y-24">
          {navigationCategories.map((category) => {
            const CategoryIcon = category.icon
            
            return (
              <div key={category.slug} className="scroll-mt-24" id={category.slug}>
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-border/60">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-xl ${category.colorClass}`}>
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                        {category.name}
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Grid of Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.calculators.map((calc) => {
                    const CalcIcon = calc.icon || Calculator
                    return (
                      <Link 
                        key={calc.slug}
                        href={getToolUrl(calc.slug)}
                        className="group flex flex-col justify-between p-6 bg-card border border-border/60 rounded-3xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                      >
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-muted/50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                              <CalcIcon className="w-6 h-6 text-foreground/60 group-hover:text-primary transition-colors" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                          </div>
                          
                          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {calc.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {calc.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </>
  )
}
