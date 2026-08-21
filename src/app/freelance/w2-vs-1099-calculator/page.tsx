import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import Script from "next/script"
import { CheckCircle2, AlertTriangle, Calculator, DollarSign, Clock, TrendingUp, Target, Briefcase, Zap, Shield, FileText, ArrowRightLeft, Building } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "1099 vs W2 Calculator | Rate Conversion & Pay Comparison",
  description: "Convert W2 hourly rates to 1099 equivalents and vice versa. Compare true net take-home pay, self-employment taxes, and the cost of lost benefits.",
  keywords: ["1099 vs w2 calculator", "convert w2 hourly rate to 1099 calculator", "w2 to 1099 conversion calculator", "convert 1099 to w2 calculator", "1099 equivalent w2 rate", "1099 vs w2 hourly rate calculator", "1099 to w2 converter", "1099 rate vs w2 rate calculator"],
  slug: "freelance/w2-vs-1099-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "How do you convert a W2 hourly rate to a 1099 rate?",
    answer: "To convert a W-2 hourly rate to a 1099 equivalent, you generally need to add a 25% to 35% premium. For example, if you make $50/hr as a W-2 employee, your 1099 rate should be roughly $65 to $70/hr to cover the extra self-employment taxes (15.3%), health insurance, and unpaid time off."
  },
  {
    question: "How do you convert a 1099 rate to a W2 salary?",
    answer: "To convert a 1099 hourly rate back to a W-2 salary, multiply the hourly rate by 2,080 (the standard number of working hours in a year), and then subtract roughly 20% to account for the employer benefits and tax savings you will regain."
  },
  {
    question: "Why do 1099 contractors need a higher hourly rate?",
    answer: "1099 contractors must charge more because they pay the full 15.3% Self-Employment Tax (W-2 employees only pay 7.65%), fund their own health insurance, receive no paid vacation or sick days, and must purchase their own equipment and software."
  },
  {
    question: "Do 1099 independent contractors pay more in taxes?",
    answer: "Yes, on a gross basis, 1099 contractors pay more due to the Self-Employment tax. However, they can lower their taxable income significantly by deducting business expenses (like home office, internet, and mileage) and utilizing the 20% Qualified Business Income (QBI) deduction, which W-2 employees cannot claim."
  },
  {
    question: "Is it better to be a W2 employee or 1099 contractor?",
    answer: "It depends on the rate conversion. If a company offers you $100k W-2 or $105k 1099, the W-2 is vastly better financially. If they offer $100k W-2 or $145k 1099, the 1099 contract is likely the better choice, assuming you are comfortable managing your own taxes and insurance."
  }
]

export default function W2vs1099CalculatorPage() {
  const schemaSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "1099 vs W2 Rate Conversion Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const schemaHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert W2 to 1099 Rates",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Current W2 Compensation",
        "text": "Input your current W-2 salary or hourly rate, plus the estimated cash value of your employer benefits (health insurance, 401k match, PTO)."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Proposed 1099 Rate",
        "text": "Input the 1099 hourly rate or annual contract value you are being offered."
      },
      {
        "@type": "HowToStep",
        "name": "Add Contractor Expenses",
        "text": "Estimate your annual out-of-pocket business expenses (software, home office) to see how they lower your self-employment tax burden."
      },
      {
        "@type": "HowToStep",
        "name": "Compare Equivalent Rates",
        "text": "Check the 'Conversion Equivalents' panel to instantly see exactly what 1099 rate you need to match your W2 lifestyle, and vice versa."
      }
    ]
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const schemaWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "1099 vs W2 Calculator | Rate Conversion & Pay Comparison",
    "url": "https://dailyfinance.tools/freelance/w2-vs-1099-calculator"
  };

  return (
    <>
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }} />
      <ToolLayout
        title="1099 vs W2 Calculator"
        description="Convert W2 hourly rates to 1099 equivalents. Compare your exact net take-home pay side-by-side to ensure you aren't taking a hidden pay cut."
        slug="w2-vs-1099-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
        {(isPro) => (
          <>
            {/* Answer Engine Optimization (AEO) Block */}
            <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-[#D97706]" />
                Quick Answer: Converting 1099 to W2 Rates
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Because 1099 independent contractors pay the full 15.3% Self-Employment tax and must fund their own health insurance and unpaid time off, a raw dollar-to-dollar comparison is inaccurate. To successfully <strong>convert a W2 hourly rate to a 1099 calculator</strong>, you generally need to apply a <strong>25% to 35% premium</strong>. If you make $100,000 as a W-2 employee, you need to charge roughly $130,000 to $135,000 as a 1099 contractor to take home the exact same amount of net cash.
              </p>
            </section>

            <h2 id="the-conversion-trap" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              The 1099 Conversion Trap
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              It is a common scenario in tech, nursing, and consulting: A recruiter reaches out with an opportunity. They offer you $65/hour as a 1099 contractor. You currently make $50/hour at your W-2 job. 
            </p>

            <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
              It feels like an instant $15/hour raise. But without using a rigorous 1099 vs W2 calculator to do the math, many professionals accept the job, only to discover at tax time that they actually took a massive pay cut. The shift from employee to independent contractor transfers the entire burden of taxes, insurance, and operational overhead directly onto your shoulders.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The W-2 Safety Net</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">Your employer pays half your Medicare/Social Security taxes, subsidizes expensive health premiums, gives you paid time off, and handles all tax withholding automatically.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The 1099 Reality</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">You are a one-person business. You pay the full 15.3% SE tax, buy insurance on the expensive open market, and if you take a week off for vacation, your income drops to zero.</p>
              </div>
            </section>

            <h2 id="calculating-the-difference" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              How the Math Actually Works
            </h2>

            <div className="bg-[#1E3A5F] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">Converting W2 Salary to 1099 Rate</h3>
              
              <ul className="space-y-8 relative z-10 text-white/90 font-light">
                <li className="flex items-start gap-4">
                  <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                    <strong className="block text-xl mb-2 text-[#D97706]">Step 1: The FICA Gap</strong>
                    <p className="mb-2">The IRS requires a 15.3% tax for Social Security and Medicare. W-2 employees only pay 7.65% (the employer pays the rest). 1099 contractors pay the full 15.3%.</p>
                    <code className="bg-black/30 px-3 py-1 rounded text-sm block">Premium Needed: +7.65%</code>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                    <strong className="block text-xl mb-2 text-[#D97706]">Step 2: Benefit Replacement</strong>
                    <p className="mb-2">You must replace subsidized health insurance (often $5k-$10k/year), 401k matches, and account for 3-4 weeks of unpaid vacation/sick time where you earn $0.</p>
                    <code className="bg-black/30 px-3 py-1 rounded text-sm block">Premium Needed: +15% to 20%</code>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                    <strong className="block text-xl mb-2 text-[#D97706]">Step 3: Business Overhead</strong>
                    <p className="mb-2">You must buy your own laptop, software licenses, internet, and professional liability insurance.</p>
                    <code className="bg-black/30 px-3 py-1 rounded text-sm block">Premium Needed: +2% to 5%</code>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAFAFA] border-l-4 border-[#1E3A5F] p-6 mb-16 rounded-r-xl">
              <h3 className="text-[#1F2937] font-bold text-xl mb-2">The 1099 Secret Weapon: Deductions</h3>
              <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
                If the math seems heavily skewed toward W-2s, remember that 1099 contractors can <strong>deduct business expenses before taxes are calculated</strong>. A W-2 employee making $100k pays taxes on $100k. A 1099 contractor making $100k with $15k in home office and equipment write-offs only pays taxes on $85k. This tax shielding is factored deeply into our converter tool.
              </p>
            </div>

            <h2 id="using-the-converter" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              How to Use the 1099 Equivalent W2 Rate Tool
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Our tool operates as a bi-directional 1099 vs W2 calculator. 
            </p>

            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <ArrowRightLeft className="h-8 w-8 text-[#1E3A5F] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">Finding Your 1099 Equivalent Rate</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">If you want to leave your W-2 job to go freelance, input your current salary. The "Conversion Equivalents" panel will instantly tell you exactly what hourly rate you must charge clients to safely quit your job without taking a lifestyle hit.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <ArrowRightLeft className="h-8 w-8 text-blue-600 shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">Converting 1099 to W2 Salary</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">If you are currently a contractor billing $80/hr, and a company wants to hire you full-time, input your 1099 rate. The tool will calculate your 1099 net income and reveal the exact W-2 base salary you should negotiate for to break even.</span>
                </div>
              </li>
            </ul>

            {/* AdSense Placeholder - Sole Ad Unit */}
            {!isPro && (
              <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
                <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
              </aside>
            )}
            
            <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Never Accept Blindly
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Whether you are an employer trying to figure out a fair compensation package for a contractor, or a worker comparing two competing offers, use the 1099 to W2 converter above to protect your margins. 
            </p>
          </>
        )}
      </ToolLayout>
    </>
  )
}
