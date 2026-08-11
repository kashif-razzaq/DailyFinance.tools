import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "Digital Nomad Cost of Living & Geo-Arbitrage Calculator | DailyFinance",
  description: "Calculate how much longer your freelance runway will last by relocating to a lower cost of living city. See your exact payback period and new monthly profit.",
  keywords: ["nomad cost of living calculator", "geo arbitrage calculator", "freelance runway calculator", "digital nomad savings calculator", "cost of living comparison for freelancers"],
}

const FAQS = [
  {
    question: "What is Geo-Arbitrage?",
    answer: "Geo-arbitrage is the practice of earning money in a strong currency (like USD or EUR) while living in a location with a significantly lower cost of living (like Southeast Asia or Latin America). It allows freelancers to drastically increase their profit margins without raising their rates."
  },
  {
    question: "What is a relocation payback period?",
    answer: "Moving across the world costs money (flights, visas, temporary Airbnbs). The payback period is how many months it takes for your new, lower living expenses to offset the upfront cost of the move."
  },
  {
    question: "How does cost of living affect my freelance runway?",
    answer: "Your runway is how many months you can survive on your current savings if your income drops to zero. If you move somewhere that is 50% cheaper, you instantly double your runway, significantly reducing freelance anxiety."
  }
]

export default function NomadCOLPage() {
  return (
    <ToolLayout
      title="Digital Nomad Geo-Arbitrage Calculator"
      description="Stop burning your savings in expensive cities. Calculate exactly how many months you can extend your runway (and how much profit you'll add) by leveraging global geo-arbitrage."
      slug="nomad-cost-of-living-calculator"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="bg-primary/5 border border-primary/20 p-6 mb-8 text-foreground/80 rounded-xl leading-relaxed shadow-sm">
            <strong>Quick Answer:</strong> Geo-arbitrage allows freelancers to instantly increase their profit margins by keeping their income the same while slashing their expenses. For example, moving from a city that costs $5,000/month to one that costs $2,000/month saves you $36,000 a year. Even if it costs $3,000 to relocate, your "payback period" is just 1 month.
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="why-freelancers-use-geo-arbitrage">Why Freelancers Use Geo-Arbitrage</h2>
          <p>
            Unlike traditional employees, freelancers are not tied to a specific geographic location. Yet many freelancers continue to live in high cost-of-living (HCOL) cities like New York, London, or San Francisco, where they must charge astronomical rates just to break even.
          </p>
          <p>
            <strong>Geo-arbitrage</strong> flips the script. By relocating to a cheaper city (or country), you can achieve financial independence years faster. 
          </p>
          
          <h3 className="text-xl font-bold mb-3">The Power of "Runway Extension"</h3>
          <p>
            Freelancing is inherently volatile. Your "Runway" is the mathematical calculation of how long you can survive on your cash reserves if all your clients suddenly left you.
          </p>
          <ul>
            <li>If you have $20,000 in the bank and your expenses are $5,000/month, you have a <strong>4-month runway</strong>. This is highly stressful.</li>
            <li>If you relocate to a city where your expenses are $2,000/month, that exact same $20,000 (minus $2k for the flight) gives you a <strong>9-month runway</strong>. You just bought yourself 5 extra months of peace of mind without earning a single extra dollar.</li>
          </ul>
        </>
      )}
    </ToolLayout>
  )
}
