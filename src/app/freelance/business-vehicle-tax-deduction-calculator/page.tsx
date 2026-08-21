import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Car, TrendingUp, AlertTriangle, FileText, CheckCircle2 } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Business Vehicle Tax Deduction Calculator: Standard Mileage vs Actual Expenses",
  description: "Calculate your business vehicle tax deduction using the Standard Mileage Rate or Actual Expenses method. See how much you can write off for your leased or owned business car.",
  keywords: ["auto lease write off calculator", "car lease tax deduction calculator", "section 179 leased vehicle", "business mileage deduction calculator", "write off leased car 1099"],
  slug: "freelance/business-vehicle-tax-deduction-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "Can I write off a leased car as a 1099 contractor?",
    answer: "Yes, 1099 independent contractors and small business owners can write off the business-use portion of a leased vehicle. You can choose either the Standard Mileage Rate or the Actual Expenses method (deducting a percentage of your lease payments, gas, and insurance based on your business use percentage)."
  },
  {
    question: "Is it better to lease or buy a car for tax write-offs?",
    answer: "It depends on your business. Buying a heavy vehicle (over 6,000 lbs) allows you to use Section 179 to deduct up to 100% of the purchase price in year one. Leasing spreads the deduction out evenly over the term of the lease. Leasing is generally better for cash flow, while buying heavy vehicles provides a massive upfront tax shield."
  },
  {
    question: "Can I write off 100% of my car lease?",
    answer: "You can only write off 100% of your car lease if the vehicle is used 100% for business purposes (which the IRS heavily scrutinizes). If you drive 10,000 miles a year and 7,500 of those are for business, your business use percentage is 75%, meaning you can only deduct 75% of your lease payments."
  },
  {
    question: "How do I deduct the down payment on a leased business vehicle?",
    answer: "You cannot deduct a lease down payment (capitalized cost reduction) entirely in the year you pay it. Instead, you must amortize (spread) the down payment evenly over the life of the lease. For example, a $3,600 down payment on a 36-month lease allows a $100/month additional deduction."
  },
  {
    question: "What is a lease inclusion amount?",
    answer: "If you lease a luxury vehicle (a car valued over a certain IRS threshold, typically around $60,000), you must reduce your deductible lease payments by an 'inclusion amount'. This IRS rule is designed to equalize the tax benefits of leasing a luxury car with the depreciation limits of buying one."
  }
]

export default function AutoLeaseCalculatorPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Business Vehicle Tax Deduction Calculator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your Business Vehicle Tax Deduction",
      "description": "Step-by-step guide on how to calculate your vehicle tax deduction for a business lease using the standard mileage or actual expenses method.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Vehicle and Lease Details",
          "text": "Input your monthly lease payment and the amount of your down payment to establish your baseline vehicle costs."
        },
        {
          "@type": "HowToStep",
          "name": "Input Annual Mileage",
          "text": "Provide your total miles driven for the year and the portion of those miles used specifically for business purposes."
        },
        {
          "@type": "HowToStep",
          "name": "Add Actual Operating Expenses",
          "text": "Enter your annual costs for gas, insurance, maintenance, and registration to allow the calculator to total your actual expenses."
        },
        {
          "@type": "HowToStep",
          "name": "Compare Deduction Methods",
          "text": "Review the calculator's side-by-side comparison of the Standard Mileage Rate versus the Actual Expenses method to find your maximum tax deduction."
        }
      ]
    },
    {
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
    },
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://dailyfinance.tools/freelance/business-vehicle-tax-deduction-calculator/#webpage",
          "url": "https://dailyfinance.tools/freelance/business-vehicle-tax-deduction-calculator",
          "name": "Business Vehicle Tax Deduction Calculator: Standard Mileage vs Actual Expenses",
          "description": "Calculate your business vehicle tax deduction using the Standard Mileage Rate or Actual Expenses method. See how much you can write off for your leased or owned business car.",
          "isPartOf": {
            "@id": "https://dailyfinance.tools/#website"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://dailyfinance.tools/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Freelance",
              "item": "https://dailyfinance.tools/freelance"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Business Vehicle Tax Deduction Calculator",
              "item": "https://dailyfinance.tools/freelance/business-vehicle-tax-deduction-calculator"
            }
          ]
        }
      ]
    }
  ];

  return (
    <ToolLayout
      title="Business Vehicle Tax Deduction Calculator"
      description="Calculate your business vehicle tax deduction using the Standard Mileage Rate or Actual Expenses method. See how much you can write off for your leased or owned business car."
      slug="business-vehicle-tax-deduction-calculator"
      faqs={faqs}
      calculator={(isPro) => (
        <>
          {schemas.map((schema, index) => (
            <Script
              key={index}
              id={`schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          ))}
          <CalculatorClient />
        </>
      )}
    >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How to Calculate an Auto Lease Write-Off
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To calculate your auto lease write-off, you must first determine your <strong>Business Use Percentage</strong> by dividing your annual business miles by your total miles driven. You then multiply this percentage by your total actual vehicle expenses (annual lease payments + amortized down payment + gas + insurance). Compare this figure against the <strong>Standard Mileage Rate</strong> ($0.67 per business mile in 2024) and claim whichever deduction is higher.
            </p>
          </section>

          {/* Deep Dive Content Section */}
          <article className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Navigating the Tax Benefits of Leased Vehicles</h2>
            <p>
              For freelancers, real estate agents, and small business owners, a vehicle isn't just a mode of transportation—it's a critical operational expense and a powerful tax shield. However, the IRS has strict rules governing exactly how you can write off a leased vehicle on your Schedule C or corporate tax return.
            </p>
            <p>
              Using our <strong>Auto Lease Write-Off Calculator</strong>, you can instantly compare the two IRS-approved deduction methods to ensure you aren't leaving money on the table.
            </p>

    

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The Two Deduction Methods</h3>
            <p>
              When you lease a car for business, you are required to choose a deduction method in the first year of the lease. For leased vehicles, you must stick with the method you choose for the entire duration of the lease.
            </p>
            
            <div className="space-y-6 my-8">
              <div className="bg-white border-l-4 border-[#1E3A5F] p-6 rounded-r-xl shadow-sm">
                <h4 className="font-bold text-[#1E3A5F] text-xl mb-2 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  1. The Actual Expenses Method
                </h4>
                <p className="text-slate-700">
                  This method requires you to track every penny you spend on the vehicle throughout the year. This includes monthly lease payments, gas, charging fees, insurance, maintenance, repairs, and registration fees. You total these expenses and multiply them by your Business Use Percentage. 
                </p>
                <p className="text-slate-700 text-sm italic mt-2">
                  *Note: The down payment cannot be deducted in year one. It must be amortized evenly across the months of the lease term.
                </p>
              </div>

              <div className="bg-white border-l-4 border-[#D97706] p-6 rounded-r-xl shadow-sm">
                <h4 className="font-bold text-[#D97706] text-xl mb-2 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  2. The Standard Mileage Rate
                </h4>
                <p className="text-slate-700">
                  The IRS sets a standard mileage rate every year (e.g., 67 cents per mile in 2024). This rate is designed to cover gas, insurance, maintenance, and the "depreciation" or lease cost of the vehicle. You simply multiply your total business miles by this rate. 
                </p>
                <p className="text-slate-700 text-sm font-bold mt-2">
                  Warning: If you use the Standard Mileage Rate, you cannot deduct your lease payments on top of it. The lease payment is considered "built into" the 67 cents.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">The "Inclusion Amount" Trap for Luxury Leases</h3>
            <p>
              If you purchase a heavy SUV (over 6,000 lbs), the IRS allows massive Section 179 depreciation write-offs. But if you purchase a standard luxury sedan, strict depreciation limits apply to prevent taxpayers from writing off $100,000 Porsches at taxpayer expense.
            </p>
            <p>
              To prevent business owners from bypassing these depreciation limits by simply leasing the luxury car instead, the IRS invented the <strong>Inclusion Amount</strong>. If the fair market value of the leased car exceeds an annual threshold (around $60,000), you must reduce your deductible lease expense by an inclusion amount found in IRS Publication 463.
            </p>

            {/* AdSense Placeholder - Sole Ad Unit */}
            {!isPro && (
              <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
                <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
              </aside>
            )}

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Real-World Calculation Scenarios</h3>
            <p>Let's look at three distinct scenarios to see why running the numbers is so important.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2">Scenario A: The High-Mileage Realtor</h4>
                <p className="text-sm text-slate-600 mb-4">A real estate agent leases a mid-range Honda Accord ($400/mo) but drives 25,000 business miles a year showing houses.</p>
                <p className="text-sm text-[#1E3A5F] font-bold">Winner: Standard Mileage Rate.</p>
                <p className="text-xs text-slate-500 mt-1">Because the lease payment is low and the mileage is incredibly high, the $0.67/mile rate yields a $16,750 deduction, far exceeding their actual expenses.</p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2">Scenario B: The Low-Mileage Consultant</h4>
                <p className="text-sm text-slate-600 mb-4">A consultant leases a premium BMW ($900/mo) but only drives 5,000 business miles a year to client meetings (80% business use).</p>
                <p className="text-sm text-[#1E3A5F] font-bold">Winner: Actual Expenses.</p>
                <p className="text-xs text-slate-500 mt-1">The mileage rate would only yield a $3,350 deduction. But taking 80% of the $10,800 annual lease payments yields an $8,640 deduction.</p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2">Scenario C: The WFH Freelancer</h4>
                <p className="text-sm text-slate-600 mb-4">A freelance designer leases a car but works from home. They occasionally drive to office supply stores or coffee shops.</p>
                <p className="text-sm text-red-600 font-bold">Result: High Audit Risk.</p>
                <p className="text-xs text-slate-500 mt-1">Commuting from your home to a coffee shop is generally not deductible. Claiming a high business use percentage without a strict mileage log is a primary IRS audit trigger.</p>
              </div>
            </div>

            <div className="my-8 bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 rounded-r-xl shadow-sm">
              <h4 className="text-lg font-bold text-[#D97706] mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                The Importance of a Mileage Log
              </h4>
              <p className="text-slate-700 m-0">
                Whether you use the Standard Mileage Rate or the Actual Expenses method, the IRS requires a contemporaneous mileage log. You must track the date, miles driven, and business purpose of every trip. Apps like Everlance or MileIQ can automate this process via GPS.
              </p>
            </div>

          </article>
        </>
      )}
    </ToolLayout>
  )
}


