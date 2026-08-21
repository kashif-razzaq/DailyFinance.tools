import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Target, TrendingUp, AlertTriangle, Users, DollarSign, Repeat, ArrowDownRight, BarChart } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Customer Lifetime Value (CLV) Calculator | Free Tool & Formula",
  description: "Calculate Customer Lifetime Value (CLV), customer lifecycle value, and profitability using the standard CLV formula. Optimize your marketing ROI.",
  keywords: ["customer lifetime value calculator", "clv calculator", "lifetime value of a customer", "customer lifecycle value", "ltv customer lifetime value", "customer lifetime value formula", "lifetime value formula", "clv formula", "how to calculate customer lifetime value"],
  slug: "freelance/client-lifetime-value-calculator",
  category: "Business",
});

const faqs: FAQ[] = [
  {
    question: "What is the Customer Lifetime Value (CLV) formula?",
    answer: "The standard customer lifetime value formula is: (Average Purchase Value × Purchase Frequency) × Customer Lifespan. For example, if a customer spends $100 per order, orders 4 times a year, and stays loyal for 5 years, their Basic CLV is $2,000. To find the Profit-Adjusted CLV, multiply that $2,000 by your gross profit margin."
  },
  {
    question: "What is the difference between LTV and CLV?",
    answer: "LTV (Lifetime Value) and CLV (Customer Lifetime Value) are generally used interchangeably. Both refer to the total revenue or profit a business can expect from a single customer over the entire duration of their relationship. The phrase 'Customer Lifecycle Value' is also commonly used to describe the exact same metric."
  },
  {
    question: "Why should I calculate the Profit-Adjusted CLV?",
    answer: "Calculating Basic CLV (which uses gross revenue) can be dangerous because it ignores the cost of goods sold (COGS). If a customer generates $5,000 in revenue but your gross margin is only 20%, their actual profit value to your business is only $1,000. You must use Profit-Adjusted CLV to determine how much you can safely spend to acquire them."
  },
  {
    question: "What is Customer Acquisition Cost (CAC)?",
    answer: "Customer Acquisition Cost (CAC) is the total amount of money spent on marketing and sales to acquire one new customer. By comparing your CLV to your CAC (the CLV:CAC ratio), you can determine if your business model is sustainable. A healthy ratio is typically 3:1."
  },
  {
    question: "How can I improve my Customer Lifecycle Value?",
    answer: "To increase your CLV, you can focus on three levers: increase the Average Purchase Value (through upselling or raising prices), increase Purchase Frequency (through email marketing or loyalty programs), or extend the Customer Lifespan (through better customer service and retention strategies)."
  }
]

export default function CustomerLTVCalculatorPage() {
  const schemaSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Customer Lifetime Value (CLV) Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate Customer Lifetime Value (CLV), Customer Lifecycle Value, and determine your optimal acquisition cost limits."
  };

  const schemaHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Customer Lifetime Value (CLV)",
    "description": "A step-by-step guide to calculating the lifetime value of a customer using the standard CLV formula.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Average Purchase Value",
        "text": "Calculate your total revenue divided by the total number of purchases over a specific period. Enter this as the APV."
      },
      {
        "@type": "HowToStep",
        "name": "Determine Purchase Frequency",
        "text": "Divide the total number of purchases by the number of unique customers to find how often an average customer buys from you annually."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Customer Lifespan",
        "text": "Determine the average number of years a customer continues buying from your brand before churning."
      },
      {
        "@type": "HowToStep",
        "name": "Apply Gross Margin",
        "text": "Enter your gross profit margin percentage to calculate the Profit-Adjusted CLV, which reveals the true value of the customer."
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
    "name": "Customer Lifetime Value (CLV) Calculator",
    "url": "https://dailyfinance.tools/freelance/client-lifetime-value-calculator",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dailyfinance.tools"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Freelance & Business",
          "item": "https://dailyfinance.tools/freelance"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Customer Lifetime Value Calculator",
          "item": "https://dailyfinance.tools/freelance/client-lifetime-value-calculator"
        }
      ]
    }
  };

  return (
    <>
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }} />
      <ToolLayout
        title="Customer Lifetime Value (CLV) Calculator"
        description="Calculate the true lifetime value of a customer (CLV). Optimize your marketing budgets, identify your most profitable segments, and ensure your acquisition costs are sustainable."
        slug="client-lifetime-value-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
        {(isPro) => (
          <>
            {/* Answer Engine Optimization (AEO) Block */}
            <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#D97706]" />
                Quick Answer: The Customer Lifetime Value Formula
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Customer Lifetime Value (CLV) is calculated by multiplying your <strong>Average Purchase Value</strong> by your <strong>Purchase Frequency</strong>, and then multiplying that total by your <strong>Customer Lifespan</strong>. This yields the Basic CLV. For a profit-adjusted view, you must multiply the Basic CLV by your <strong>Gross Margin Percentage</strong>. Knowing this number allows you to confidently set your maximum allowable Customer Acquisition Cost (CAC).
              </p>
            </section>

            <h2 id="the-core-metrics" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Understanding the 4 Core CLV Metrics
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Many business owners track vanity metrics like top-line revenue or website traffic. However, the most successful brands ruthlessly optimize the lifetime value of a customer. To use our CLV calculator effectively, you must understand the four variables that control your customer lifecycle value.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-5 w-5 text-[#059669]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Average Purchase Value (APV)</h3>
                <p className="text-sm text-neutral-500 font-light">Calculated by dividing your total revenue in a given period by the total number of purchases. This tells you how much a customer spends on a single transaction.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <Repeat className="h-5 w-5 text-[#059669]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Purchase Frequency (PF)</h3>
                <p className="text-sm text-neutral-500 font-light">Calculated by dividing the total number of purchases by the number of unique customers. This reveals how many times an average customer buys from you annually.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-[#059669]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Customer Lifespan (LT)</h3>
                <p className="text-sm text-neutral-500 font-light">The average number of years (or months) a customer continues buying from you before churning or abandoning your brand entirely.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-[#059669]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Gross Margin (GM)</h3>
                <p className="text-sm text-neutral-500 font-light">The percentage of revenue left after subtracting the Cost of Goods Sold (COGS). This is the secret to uncovering true profitability.</p>
              </div>
            </section>

            <h2 id="calculating-clv" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              The Two CLV Formulas You Need to Know
            </h2>

            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              There is a massive difference between top-line CLV and bottom-line CLV. A customer who spends $10,000 might actually be losing you money if your fulfillment costs are $11,000. This is why our tool runs two distinct calculations simultaneously.
            </p>

            <div className="bg-[#1E3A5F] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/30 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">Formula 1: Basic CLV (Revenue)</h3>
              <div className="bg-black/20 p-5 rounded-xl border border-white/10 relative z-10 mb-8">
                <code className="text-lg font-mono text-blue-300">Basic CLV = (APV × Purchase Frequency) × Customer Lifespan</code>
              </div>
              <p className="text-white/80 font-light leading-relaxed mb-10 relative z-10">
                If an eCommerce shopper spends $50 per order (APV), buys 3 times a year (Frequency), and stays a customer for 4 years (Lifespan), their Basic CLV is <strong>$600</strong>. This represents gross revenue.
              </p>

              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">Formula 2: Profit-Adjusted CLV</h3>
              <div className="bg-black/20 p-5 rounded-xl border border-white/10 relative z-10 mb-6">
                <code className="text-lg font-mono text-[#D97706]">Profit-Adjusted CLV = Basic CLV × Gross Margin %</code>
              </div>
              <p className="text-white/80 font-light leading-relaxed relative z-10">
                If that same business has a 40% gross margin on their products, the Profit-Adjusted CLV drops from $600 down to <strong>$240</strong>. This $240 is the actual cash the business gets to keep to pay for overhead, marketing, and profit.
              </p>
            </div>

            <h2 id="understanding-cac" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Determining Your Acquisition Cost (CAC)
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Once you know your Profit-Adjusted CLV, you unlock the ultimate marketing superpower: knowing exactly how much you can afford to "buy" a customer for. This is your <strong>Customer Acquisition Cost (CAC)</strong> limit.
            </p>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
              If a business owner does not know their CLV, they are flying blind. They might spend $50 on Facebook ads to acquire a customer, fail to turn a profit on the first order, panic, and shut the ads off. But if they knew the lifetime value of a customer was $240 in pure profit, they would realize that spending $50 on ads is actually a wildly profitable long-term investment.
            </p>

            <h2 id="the-golden-metric" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              The LTV to CAC Ratio
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              The relationship between what a customer makes you (CLV) and what they cost to acquire (CAC) is expressed as a ratio. This ratio is the definitive health check for your marketing engine. Our CLV calculator asks you to input a Target Ratio so it can instantly calculate your maximum allowable ad spend.
            </p>

            <ul className="space-y-6 mb-16">
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <ArrowDownRight className="h-8 w-8 text-red-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">Under 1:1 (Losing Money)</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">If you spend $300 in ads to acquire a customer whose lifetime profit is only $200, your business model is broken. You are paying for the privilege of working.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">1:1 to 2:1 (The Danger Zone)</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">You are breaking even or making a tiny profit, but you have no margin for error. If a competitor bids up ad costs, you will instantly dip into the red.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <BarChart className="h-8 w-8 text-[#059669] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">3:1 (The Gold Standard)</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">This is the optimal balance for healthy growth. If your Profit-Adjusted CLV is $300, you should comfortably be willing to spend up to $100 to acquire a new customer.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <TrendingUp className="h-8 w-8 text-blue-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">5:1 or Higher (Under-Investing)</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">Counter-intuitively, an incredibly high ratio means you are growing too slowly. You are generating massive profit from customers but failing to aggressively reinvest it into marketing to capture market share.</span>
                </div>
              </li>
            </ul>

            <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Stop Guessing, Start Calculating
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Use the customer lifetime value formula via the calculator above to model your current business economics. Play with the numbers. See what happens to your profitability if you manage to increase your purchase frequency from 2 to 3 times a year, or if you extend your customer lifespan by 6 months through a better loyalty program.
            </p>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Small improvements in retention and average order value have exponential impacts on the overall lifetime value of a customer. Run the math, establish your baseline, and start scaling with confidence.
            </p>
          </>
        )}
      </ToolLayout>
    </>
  )
}
