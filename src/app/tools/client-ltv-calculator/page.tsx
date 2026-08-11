import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "Freelance Client LTV (Lifetime Value) Calculator | DailyFinance",
  description: "Calculate the true Lifetime Value (LTV) of your freelance and agency clients. Determine your maximum acceptable Customer Acquisition Cost (CAC) for profitable growth.",
  keywords: ["client lTV calculator", "freelance customer lifetime value", "agency ltv to cac ratio", "retainer ltv calculator", "freelance client retention"],
}

const FAQS = [
  {
    question: "What is Client LTV?",
    answer: "Client Lifetime Value (LTV) is the total gross profit a client will generate for your freelance business over the entire duration of your relationship, factoring in churn rate and gross margin."
  },
  {
    question: "What is a good LTV to CAC ratio for freelancers?",
    answer: "A healthy LTV:CAC ratio is generally 3:1 or higher. This means if a client brings in $3,000 in lifetime profit, you should spend no more than $1,000 in marketing, sales time, or platform fees to acquire them."
  },
  {
    question: "How do you calculate LTV for retainer clients?",
    answer: "Divide your average monthly profit per client by your monthly churn rate. If you make $1,000/mo profit from a client, and 10% of your clients leave each month, your LTV is $1,000 / 0.10 = $10,000."
  }
]

export default function ClientLTVCalculatorPage() {
  return (
    <ToolLayout
      title="Client Lifetime Value (LTV) Calculator"
      description="Stop guessing how much you can afford to spend on marketing. Calculate your exact Client Lifetime Value and Customer Acquisition Cost (CAC) limits to scale your freelance business profitably."
      slug="client-ltv-calculator"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="border-l-4 border-amber-500 bg-amber-50 p-4 mb-8 text-amber-900 italic rounded-r-lg">
            <strong>Quick Answer:</strong> To calculate Freelance Client LTV for retainer businesses, multiply your Average Monthly Revenue per client by your Gross Margin, then divide by your Monthly Churn Rate. A client paying $2,000/month at a 70% margin with a 5% churn rate has an LTV of $28,000. You should aim for a 3:1 LTV:CAC ratio, meaning your maximum acquisition cost for this client is $9,333.
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="why-ltv-matters">Why Freelancers Must Track LTV</h2>
          <p>
            Most freelancers focus entirely on the value of the <em>initial project</em>. If they sell a website for $3,000, they view the client as being worth $3,000. This mindset prevents scalable growth.
          </p>
          <p>
            If that same client signs a $500/month maintenance retainer and stays for 3 years, their actual value to your business is $21,000. Understanding this <strong>Lifetime Value (LTV)</strong> changes how you run your business.
          </p>
          
          <h3 className="text-xl font-bold mb-3">The Magic of the LTV:CAC Ratio</h3>
          <p>
            Once you know your LTV, you can determine your <strong>Customer Acquisition Cost (CAC)</strong>. This is how much money (in ads, networking events) or time (in cold outreach hours) you can afford to spend to get one client.
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li><strong>Under 1:1</strong> You are losing money on every client you acquire.</li>
            <li><strong>1:1 to 2:1</strong> You are barely breaking even. Growth will be slow and painful.</li>
            <li><strong>3:1 or Higher</strong> The golden ratio. Your business is a highly profitable, scalable machine.</li>
          </ul>
        </>
      )}
    </ToolLayout>
  )
}
