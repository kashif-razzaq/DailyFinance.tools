import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calendar, DollarSign, Activity, AlertTriangle, TrendingDown, Building, Shield } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Business Loan Calculator | Cash Runway Estimator",
  description: "Calculate how a business loan impacts your monthly burn rate and extends your cash runway. Factor in interest rates and monthly servicing costs.",
  keywords: ["business loan calculator", "runway calculator", "burn rate calculator", "cash flow calculator", "sba loan calculator", "ecommerce financing"],
  slug: "ecommerce/business-loan-runway-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is Cash Runway?",
    answer: "Runway is the number of months your business can survive before running out of money, assuming revenue and expenses stay exactly the same. It is calculated by dividing your total Cash on Hand by your Monthly Burn Rate."
  },
  {
    question: "What is Monthly Burn Rate?",
    answer: "Burn rate is the speed at which your business is losing money. If you generate $15,000 in revenue but have $20,000 in expenses, your monthly burn rate is $5,000. If your business is profitable, your burn rate is technically negative (or zero), and your runway is theoretically infinite."
  },
  {
    question: "How does a loan affect my burn rate?",
    answer: "Taking a loan gives you a massive injection of cash (extending your runway), but it also increases your monthly expenses because you now have a mandatory monthly loan payment. This increased expense means your new monthly burn rate will be higher than your old burn rate."
  },
  {
    question: "Should I take a loan if my business is profitable?",
    answer: "Profitable businesses take loans to accelerate growth (e.g., buying 10,000 units of inventory upfront to secure a 30% discount from a supplier). If the return on investment (ROI) of that inventory outpaces the interest rate of the loan, it is 'good debt'."
  },
  {
    question: "What is amortized interest?",
    answer: "Our calculator uses standard amortization. This means your monthly payment remains identical for the length of the term, but in the early months, a large portion of the payment goes toward interest. In the later months, the payment goes mostly toward the principal."
  }
]

export default function LoanRunwayPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Business Loan Runway Calculator",
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
    "name": "How to Calculate Your Business Runway After a Loan",
    "description": "Determine if a business loan extends your survival time long enough to reach profitability.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Current Financials",
        "text": "Enter your exact cash on hand, average monthly revenue, and average monthly expenses to determine your current baseline burn rate."
      },
      {
        "@type": "HowToStep",
        "name": "Set Loan Parameters",
        "text": "Input the principal loan amount, the annual interest rate (APR), and the repayment term in months."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Servicing Costs",
        "text": "Review the 'Monthly Loan Payment' to see exactly how much higher your new monthly burn rate will be."
      },
      {
        "@type": "HowToStep",
        "name": "Evaluate the Runway Extension",
        "text": "Look at the 'Runway Extended By' metric. If the loan only buys you 2 extra months of survival, the underlying business model is fundamentally broken."
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
        "@id": "https://dailyfinance.tools/ecommerce/business-loan-runway-calculator",
        "url": "https://dailyfinance.tools/ecommerce/business-loan-runway-calculator",
        "name": "Business Loan Calculator | Cash Runway Estimator",
        "description": "Calculate how a business loan impacts your monthly burn rate and extends your cash runway."
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
        title="Business Loan & Runway Calculator"
        description="Taking a loan injects cash but increases your monthly burn rate. Calculate exactly how many months of survival (runway) a loan actually buys you before you sign the paperwork."
        slug="business-loan-runway-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-500" />
              Quick Answer: How Does a Loan Affect Runway?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              A business loan is a double-edged sword. It immediately increases your <strong>Cash on Hand</strong> (extending your runway), but it also introduces a mandatory monthly payment, which increases your <strong>Monthly Burn Rate</strong> (accelerating cash depletion). If you are burning $5,000 a month and take a $50,000 loan, you might think you bought 10 months of runway. But if the loan payment is $1,500/mo, your new burn rate is $6,500. The loan actually only bought you <strong>7.6 months</strong> of survival.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            Good Debt vs. Bad Debt
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            In the ecommerce space, financing is inevitable. Whether it is an SBA loan, Shopify Capital, or a traditional bank line of credit, almost every brand that scales past 7 figures utilizes leverage. But using leverage to scale is entirely different from using a loan to survive.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Good Debt (Growth Capital)</h3>
              <p className="text-sm text-neutral-500 font-light">Your business is profitable. You take a $100k loan at 8% interest to buy inventory in bulk, which lowers your COGS by 15%. The ROI of the cheaper inventory vastly outpaces the 8% interest. The debt pays for itself.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Bad Debt (Survival Capital)</h3>
              <p className="text-sm text-neutral-500 font-light">Your business is losing $10,000 a month because your Facebook Ads are unprofitable. You take a $50k loan to "keep the lights on" without changing your ad strategy. You go bankrupt 4 months later with personal liabilities.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Loan Servicing Costs
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you sign a loan agreement, you are legally obligated to "service" that debt every month. Our calculator reveals the true cost of this servicing.
          </p>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-2">The Cash Flow Squeeze</h4>
            <p className="text-lg text-neutral-600 m-0 leading-relaxed font-light">
              Suppose you secure a 12-month loan from a merchant cash advance company (like Shopify Capital). Because the term is only 12 months, the monthly payments will be massive. If you borrow $120,000, you will owe roughly $10,000+ every month. If your business suffers a slow sales month in July, that $10,000 payment will instantly drain your operating cash reserves. Always optimize for longer loan terms to keep monthly servicing costs low and protect your cash flow.
            </p>
          </div>

        </>
      )}
      </ToolLayout>
    </>
  )
}
