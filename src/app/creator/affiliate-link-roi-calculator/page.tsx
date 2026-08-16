import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Link2, MousePointerClick, TrendingUp, DollarSign, Activity, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Affiliate Link ROI Calculator | EPC & Earnings Estimator",
  description: "Calculate your Earnings Per Click (EPC), Click-Through Rates, and total affiliate commissions. See how much money your traffic can generate through affiliate marketing.",
  keywords: ["affiliate link calculator", "earnings per click calculator", "EPC calculator", "affiliate marketing calculator", "affiliate commission calculator", "creator affiliate revenue"],
  slug: "creator/affiliate-link-roi-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "What is Earnings Per Click (EPC)?",
    answer: "Earnings Per Click (EPC) is the average amount of money you earn every time someone clicks your affiliate link. If you send 100 clicks to Amazon and earn $50 in commissions, your EPC is $0.50. This is the most important metric for comparing different affiliate programs."
  },
  {
    question: "What is a good Click-Through Rate (CTR) for affiliate links?",
    answer: "A good CTR depends entirely on the context. An affiliate link in a dedicated YouTube product review video might see a 10-15% CTR. An affiliate link sitting in a generic Instagram bio might see a 0.5% CTR."
  },
  {
    question: "What is a normal affiliate conversion rate?",
    answer: "A standard affiliate conversion rate (the percentage of clicks that turn into purchases) is 1% to 3%. High-intent traffic (like someone searching for 'best camera for vlogging') can convert at 5% to 8%, while low-intent traffic (like a viral TikTok dance) might convert at 0.1%."
  },
  {
    question: "How do I increase my affiliate commissions?",
    answer: "You can increase commissions by pulling three levers: Drive more total traffic (SEO/social), increase your CTR (better calls-to-action), or promote products with higher Average Order Values (AOV) and commission percentages."
  }
]

export default function AffiliatePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Affiliate Link ROI Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Affiliate Marketing ROI",
    "description": "Calculate your potential affiliate commissions based on traffic and conversion rates.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Monthly Traffic",
        "text": "Input the total number of views or visitors that see the content containing your affiliate link."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate CTR and Conversion",
        "text": "Input your expected Click-Through Rate (usually 1-5%) and the merchant's conversion rate (usually 1-3%)."
      },
      {
        "@type": "HowToStep",
        "name": "Input Product Economics",
        "text": "Enter the Average Order Value (AOV) of the product and your commission percentage."
      }
    ]
  };

  const faqSchema = {
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/creator/affiliate-link-roi-calculator",
        "url": "https://dailyfinance.tools/creator/affiliate-link-roi-calculator",
        "name": "Affiliate Link ROI Calculator | EPC & Earnings Estimator",
        "description": "Calculate your Earnings Per Click (EPC), Click-Through Rates, and total affiliate commissions."
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ToolLayout
        title="Affiliate Link ROI Calculator"
        description="Calculate your projected affiliate commissions, Earnings Per Click (EPC), and overall ROI. See exactly how much money your traffic is worth to brand partners."
        slug="affiliate-link-roi-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Link2 className="h-5 w-5 text-emerald-500" />
              Quick Answer: What is a Good Affiliate Conversion Rate?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              A standard affiliate conversion rate is between <strong>1% and 3%</strong>. This means out of every 100 people who click your link, 1 to 3 will make a purchase. For high-intent traffic (e.g., someone searching for a specific product review), conversion rates can spike to 5-10%. For low-intent traffic (e.g., a generic link in an Instagram bio), it often drops below 0.5%.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            Understanding Affiliate Mathematics
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Affiliate marketing is often pitched as "passive income," but making significant money requires a deep understanding of funnel mathematics. The creators making six figures from affiliate links don't just paste links randomly; they calculate their Earnings Per Click (EPC) and optimize their content formats to drive high-intent traffic.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <MousePointerClick className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">EPC (Earnings Per Click)</h3>
              <p className="text-sm text-neutral-500 font-light">This is the ultimate metric for comparing affiliate programs. If Program A pays 50% commission but converts terribly, its EPC might be $0.10. If Program B pays 10% commission but converts incredibly well, its EPC might be $1.50.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Intent Dictates CTR</h3>
              <p className="text-sm text-neutral-500 font-light">Traffic volume doesn't matter if there's no purchase intent. A tutorial video with 5,000 views can generate more clicks and sales than a comedy video with 500,000 views.</p>
            </div>
          </section>

        </>
      )}
      </ToolLayout>
    </>
  )
}
