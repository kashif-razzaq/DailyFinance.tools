/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Globe2,
  Lock,
  Zap,
  Search,
  Calculator,
  ChevronRight,
  Crown
} from 'lucide-react'
import { navigationCategories, CalculatorItem } from '@/config/navigation'

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function HomePage() {
  const [randomTools, setRandomTools] = useState<CalculatorItem[]>([])
  const [isMounted, setIsMounted] = useState(false)
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // 1. Flatten all 50 calculators from the navigation config
  const allTools = useMemo(() => navigationCategories.flatMap((cat) => cat.calculators), [])

  useEffect(() => {
    // 2. Shuffle and pick exactly 8
    const shuffled = shuffleArray(allTools).slice(0, 8)
    setRandomTools(shuffled)
    setIsMounted(true)
  }, [allTools])

  // 3. Derived search results (max 5)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const lowerQuery = searchQuery.toLowerCase()
    return allTools
      .filter((tool) => 
        tool.title.toLowerCase().includes(lowerQuery) || 
        tool.description.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
  }, [searchQuery, allTools])

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      
      {/* 
        Abstract Background Animations 
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float-slower {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.1); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-1 { animation: float-slow 18s ease-in-out infinite; }
        .animate-blob-2 { animation: float-slower 24s ease-in-out infinite; animation-delay: -5s; }
      `}} />

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO (Search Centric & Abstract)
      ═══════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-48 bg-white flex flex-col items-center justify-center min-h-[75vh] z-20">
        
        {/* Abstract Generated Background Layer */}
<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#FAFAFA]">
    <img 
        src="/hero-bg.jpg" 
        alt="Abstract Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply :"  
    />
    
    {/* Overlays for depth and text contrast (Top-down and Left-Right Vignette) */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA]/60 via-transparent to-transparent" />
    
    {/* NEW: Bottom gradient to blend into the white section below */}
</div>

        <div className="container mx-auto px-4 md:px-8 relative z-20 flex flex-col items-center text-center max-w-4xl">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-8">
            <Calculator className="w-4 h-4 text-primary" />
            <span>50+ Free Financial Calculators & Tools</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter text-[#1F2937] mb-8 leading-[1.05]">
            Find the perfect <br />
            financial tool. <span className="text-accent">Instantly.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-500 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Search our directory of 50+ professional-grade calculators engineered for global freelancers, creators, and founders.
          </p>

          {/* MASSIVE LIVE SEARCH BAR */}
          <div className="w-full max-w-2xl relative mx-auto z-50">
            <div className={`relative flex items-center bg-white rounded-2xl border-2 transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] ${isSearchFocused ? 'border-[#D97706] shadow-[0_10px_40px_-10px_rgba(217,119,6,0.2)]' : 'border-transparent'}`}>
              <div className="pl-6 pr-4">
                <Search className={`w-6 h-6 transition-colors duration-300 ${isSearchFocused ? 'text-[#D97706]' : 'text-neutral-400'}`} />
              </div>
              <input 
                type="text"
                placeholder="Search 'taxes', 'S-Corp', 'ROI'..."
                className="w-full py-5 pr-6 bg-transparent text-[#1F2937] text-lg outline-none placeholder:text-neutral-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  // Delay closing the dropdown to allow clicks on results
                  setTimeout(() => setIsSearchFocused(false), 200)
                }}
              />
            </div>

            {/* Dropdown Results */}
            {searchQuery.trim().length > 0 && isSearchFocused && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 text-left">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((tool) => {
                      const Icon = tool.icon || Calculator
                      return (
                        <Link 
                          key={tool.slug} 
                          href={`/tools/${tool.slug}`}
                          className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 border-l-4 border-transparent hover:border-[#D97706] transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:text-[#D97706] group-hover:bg-[#D97706]/10 transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-[#1F2937] text-base">{tool.title}</div>
                              <div className="text-sm text-neutral-500 font-light truncate max-w-sm">{tool.description}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-[#D97706] transition-colors" />
                        </Link>
                      )
                    })}
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center text-neutral-500 font-medium">
                    No calculators found for "{searchQuery}". <br/>
                    <span className="text-sm font-light">Try searching for keywords like "ROI", "Tax", or "Freelance".</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium z-10 relative">
             <span className="text-neutral-500 mr-2">Popular:</span>
             <Link href="/tools/hourly-rate-reverse-engineer-calculator" className="px-4 py-2 bg-white/70 backdrop-blur-md border border-neutral-200/60 rounded-full text-[#1F2937] hover:bg-white hover:border-[#D97706]/50 hover:text-[#D97706] transition-all shadow-sm">Hourly Rate</Link>
             <Link href="/tools/s-corp-salary-dividend-calculator" className="px-4 py-2 bg-white/70 backdrop-blur-md border border-neutral-200/60 rounded-full text-[#1F2937] hover:bg-white hover:border-[#D97706]/50 hover:text-[#D97706] transition-all shadow-sm">S-Corp Tax</Link>
             <Link href="/tools/nomad-cost-of-living-calculator" className="px-4 py-2 bg-white/70 backdrop-blur-md border border-neutral-200/60 rounded-full text-[#1F2937] hover:bg-white hover:border-[#D97706]/50 hover:text-[#D97706] transition-all shadow-sm">Nomad Life</Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — CORE PHILOSOPHY (Clean Icons)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-white  relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
            
            {/* Philosophy 1 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 text-[#1F2937]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3 tracking-tight">Zero Latency</h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                Calculations are processed instantly in your browser. No server round-trips, no loading spinners, no waiting.
              </p>
            </div>

            {/* Philosophy 2 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 text-[#1F2937]">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3 tracking-tight">Built for Global</h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                Cross-border FX impacts, nomad cost of living, and localized scenarios. Engineered for the modern, borderless professional.
              </p>
            </div>

            {/* Philosophy 3 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 text-[#1F2937]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3 tracking-tight">Absolute Privacy</h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                Your financial data never touches a server. Everything executes locally on your device for complete peace of mind.
              </p>
            </div>

            {/* Philosophy 4 */}
            <div className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 text-[#1F2937]">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3 tracking-tight">Pro Features</h3>
              <p className="text-neutral-500 leading-relaxed font-light">
                Unlock the Scenario Vault and advanced modeling tools. Build complex projections and save your progress.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — FEATURED TOOLS (8 Randomized)
      ═══════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
        
     
    
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl relative">
              {/* Small accent pill */}
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#064E3B]/10 border border-[#064E3B]/20 text-[#064E3B] text-xs font-bold uppercase tracking-wider">
                Our Collection
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1F2937] mb-4">
                Explore the tools
              </h2>
              <p className="text-neutral-500 text-lg font-light">
                A selection of our 50+ instruments. Refresh the page to discover more.
              </p>
            </div>
            <Link 
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#064E3B] text-white hover:bg-[#043327] font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              View full directory <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid Layout for the 8 Randomized Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Show skeleton loader until mounted to avoid hydration errors */}
            {!isMounted && (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-neutral-100 p-8 h-[240px] animate-pulse flex flex-col shadow-sm">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg mb-6" />
                  <div className="h-6 bg-neutral-100 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-neutral-100 rounded w-full mb-2" />
                  <div className="h-4 bg-neutral-100 rounded w-2/3" />
                </div>
              ))
            )}

            {/* Mounted: Render exactly 8 randomized cards */}
            {isMounted && randomTools.map((tool) => {
              const Icon = tool.icon || BarChart3 // Fallback just in case
              
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group h-full">
                  <div className="bg-white rounded-2xl border border-neutral-100 p-8 h-full transition-all duration-300 hover:border-[#064E3B]/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col hover:-translate-y-1 shadow-sm relative overflow-hidden">
                    
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 text-neutral-400 group-hover:text-[#064E3B] group-hover:bg-[#064E3B]/5 group-hover:border-[#064E3B]/20 transition-colors relative z-10">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#1F2937] mb-3 tracking-tight group-hover:text-[#064E3B] transition-colors relative z-10">
                      {tool.title}
                    </h3>
                    
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-light flex-1 relative z-10">
                      {tool.description}
                    </p>
                    
                    <div className="mt-auto flex items-center font-bold text-sm text-[#1F2937] group-hover:text-[#064E3B] transition-colors relative z-10">
                      Open Tool <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>

                    {/* Subtle hover gradient bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#064E3B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none" />

                  </div>
                </Link>
              )
            })}

          </div>

        </div>
      </section>
    

    </div>
  )
}
