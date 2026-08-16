import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Receipt, Globe, DollarSign, Percent, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Sales Tax & VAT Calculator | Ecommerce Pricing Tool",
  description: "Calculate Sales Tax and VAT for your ecommerce store. Easily switch between Tax-Exclusive (USA) and Tax-Inclusive (EU/UK) pricing models to find your true revenue.",
  keywords: ["sales tax calculator", "vat calculator", "tax inclusive vs exclusive", "ecommerce tax calculator", "how to calculate vat from total", "sales tax formula"],
  slug: "ecommerce/sales-tax-vat-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is the difference between Tax Exclusive and Tax Inclusive pricing?",
    answer: "Tax Exclusive (common in the USA) means the displayed price does NOT include tax; the tax is added dynamically at checkout based on the customer's state. Tax Inclusive (common in the EU, UK, and Australia) means the displayed price already has the VAT/Tax baked into it."
  },
  {
    question: "How do I extract VAT from an inclusive total?",
    answer: "You cannot simply multiply the total by the tax rate. To extract VAT from a total, the mathematical formula is: Total Price / (1 + Tax Rate). For example, a $120 item with 20% inclusive VAT: $120 / 1.20 = $100 base price. The VAT is $20."
  },
  {
    question: "Do I pay Shopify processing fees on sales tax?",
    answer: "Yes. Payment processors like Stripe, PayPal, and Shopify Payments charge their processing fee (e.g., 2.9% + 30 cents) on the total amount charged to the customer's credit card, which INCLUDES the sales tax. This slightly lowers your net margin."
  },
  {
    question: "When do I need to charge sales tax?",
    answer: "In the US, you generally must collect sales tax in states where you have 'Nexus' (a physical presence like a warehouse/office, or economic nexus via crossing a specific sales threshold like $100,000 in revenue in that state)."
  }
]

export default function SalesTaxPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Sales Tax & VAT Calculator",
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
    "name": "How to Calculate Sales Tax and VAT",
    "description": "Calculate exactly how much tax to remit to the government.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select Pricing Model",
        "text": "Choose Tax-Exclusive if you are in the US or Canada. Choose Tax-Inclusive if you are in the UK, EU, or Australia."
      },
      {
        "@type": "HowToStep",
        "name": "Input Price",
        "text": "Enter the base price (for exclusive) or the final retail price (for inclusive)."
      },
      {
        "@type": "HowToStep",
        "name": "Input Tax Rate",
        "text": "Enter the percentage required by the local jurisdiction (e.g., 20% for UK VAT)."
      },
      {
        "@type": "HowToStep",
        "name": "Review Tax to Remit",
        "text": "Set aside the 'Tax Amount' in a separate bank account so you can pay the government at the end of the quarter."
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
        "@id": "https://dailyfinance.tools/ecommerce/sales-tax-vat-calculator",
        "url": "https://dailyfinance.tools/ecommerce/sales-tax-vat-calculator",
        "name": "Sales Tax & VAT Calculator | Ecommerce Pricing Tool",
        "description": "Calculate Sales Tax and VAT for your ecommerce store. Easily switch between Tax-Exclusive and Tax-Inclusive models."
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
        title="Sales Tax & VAT Calculator"
        description="Extract VAT from your gross prices or calculate US state sales tax add-ons. Ensure you are setting aside exactly the right amount of money to remit to the government."
        slug="sales-tax-vat-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Receipt className="h-5 w-5 text-indigo-500" />
              Quick Answer: How Do You Extract VAT From a Total?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              You cannot extract VAT simply by multiplying the total by the tax percentage. If you sell an item for $120 inclusive of a 20% VAT, multiplying $120 by 20% gives you $24, which is mathematically incorrect. The correct formula to extract the base price is: <strong>Total Price / (1 + Tax Rate)</strong>. Therefore, $120 / 1.20 = $100 base price. The actual VAT you owe the government is $20. Our calculator automatically handles this reverse math.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Complexity of Global Ecommerce Tax
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you launch an online store, it is thrilling to get your first international order. However, selling across borders introduces significant tax complexity that can wipe out your profit margins if handled incorrectly.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The fundamental difference between North American ecommerce and European/Australian ecommerce is the psychological presentation of price. If you do not configure your Shopify or WooCommerce store to handle these geographic expectations, your conversion rates will plummet.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Tax Exclusive (USA Model)</h3>
              <p className="text-sm text-neutral-500 font-light">In the US, you display a product for $99. When the customer enters their address at checkout, a dynamic 7% state sales tax is added, bringing the total to $105.93. The customer expects this friction.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Tax Inclusive (EU/UK Model)</h3>
              <p className="text-sm text-neutral-500 font-light">In Europe, if a product is listed for €100, the customer expects to be charged exactly €100 at checkout. The 20% VAT is already baked into the price. You must manually extract the VAT later for accounting.</p>
            </div>
          </section>

        </>
      )}
      </ToolLayout>
    </>
  )
}
