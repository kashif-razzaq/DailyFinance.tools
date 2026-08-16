import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Briefcase, User, Clock, AlertTriangle, Target, LineChart } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Agency vs Solo Creator Calculator | Outsourcing ROI",
  description: "Calculate the financial ROI of hiring a video editor, thumbnail artist, or agency. See if you are losing money by doing everything yourself.",
  keywords: ["creator hiring calculator", "agency vs solo creator", "video editor ROI calculator", "should I hire an editor", "creator business margin", "time arbitrage calculator"],
  slug: "creator/agency-vs-solo-margin-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "How do I calculate my effective hourly rate?",
    answer: "Your effective hourly rate is your total monthly revenue divided by the total hours you work. If you make $5,000 a month and work 100 hours, your effective rate is $50/hr. If you are doing tasks that you could outsource for $20/hr, you are actively losing money."
  },
  {
    question: "When should a creator hire a video editor?",
    answer: "You should hire a video editor as soon as your effective hourly rate exceeds the editor's hourly rate (including management time). If editing takes you 15 hours, and you can pay someone $300 to do it, you just bought back 15 hours of your life for $20/hr."
  },
  {
    question: "What is management time in outsourcing?",
    answer: "When you hire a freelancer, the task doesn't take 0 hours. You must factor in management time: drafting the creative brief, reviewing the first cut, requesting revisions, and processing invoices. A 10-hour editing job might still require 2 hours of your management time."
  },
  {
    question: "What is time arbitrage?",
    answer: "Time arbitrage is buying someone else's time at a lower rate than your own time is worth, and using your newly freed-up time to generate high-leverage income. Buying an editor's time for $25/hr so you can spend that time securing a $2,000 sponsorship is positive time arbitrage."
  }
]

export default function AgencyVsSoloPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Agency vs Solo Creator Calculator",
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
    "name": "How to Calculate the ROI of Hiring a Freelancer",
    "description": "Determine if it is financially viable to outsource your creative work.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Establish Your Hourly Value",
        "text": "Determine what an hour of your time is currently worth based on your monthly revenue."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Solo Time",
        "text": "Honestly calculate how many hours you currently spend on the task (e.g., video editing)."
      },
      {
        "@type": "HowToStep",
        "name": "Input Contractor Costs",
        "text": "Enter the hourly rate and estimated completion time of the freelancer you want to hire."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Time Arbitrage",
        "text": "If the financial ROI is positive, hire the contractor immediately."
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
        "@id": "https://dailyfinance.tools/creator/agency-vs-solo-margin-calculator",
        "url": "https://dailyfinance.tools/creator/agency-vs-solo-margin-calculator",
        "name": "Agency vs Solo Creator Calculator | Outsourcing ROI",
        "description": "Calculate the financial ROI of hiring a video editor, thumbnail artist, or agency. See if you are losing money by doing everything yourself."
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
        title="Creator Outsourcing ROI Calculator"
        description="Stop editing your own videos if it's losing you money. Calculate the financial arbitrage of hiring a freelancer versus doing it yourself."
        slug="agency-vs-solo-margin-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-violet-600" />
              Quick Answer: When Should a Creator Hire an Editor?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              You should hire an editor the moment your <strong>Effective Hourly Rate</strong> surpasses the editor's hourly rate. If your channel generates $4,000 a month and you work 80 hours, your time is worth $50/hr. If you spend 15 hours editing a video ($750 of your time), but you can hire an editor for $30/hr who finishes it in 10 hours ($300), you are actively losing $450 every time you open Premiere Pro.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Trap of the "Solo Creator"
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            In the early days of building a channel or brand, you have more time than money. You wear every hat: writer, shooter, editor, thumbnail designer, and marketer. This is necessary for survival. But as your revenue grows, your time becomes the bottleneck to scaling.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Many creators fall into the trap of thinking, "Nobody can edit exactly like I do." This perfectionism prevents them from outsourcing, trapping them at a revenue ceiling because they physically cannot produce more than one video a week.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">High Leverage Work</h3>
              <p className="text-sm text-neutral-500 font-light">Your job as a creator is to generate ideas, be on camera, and close brand deals. These tasks generate the most revenue and cannot be outsourced.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Low Leverage Work</h3>
              <p className="text-sm text-neutral-500 font-light">Chopping out dead air, color grading, and adding subtitles are highly commoditized skills. You should not be doing them.</p>
            </div>
          </section>

        </>
      )}
      </ToolLayout>
    </>
  )
}
