import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, AlertTriangle, TrendingUp, ShieldCheck, Target, Clock, Zap, FileWarning, HelpCircle } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Freelance Project Pricing Calculator: Flat-Fee Quote Estimator",
  description: "Convert your hourly estimates into profitable flat-fee project proposals. Automatically account for scope creep, communication buffers, and risk premiums.",
  keywords: ["freelance flat fee calculator", "project quote calculator", "hourly to flat rate calculator", "value based pricing calculator", "scope creep buffer", "freelance risk premium", "how to quote a project"],
  slug: "freelance/freelance-project-pricing-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate a flat fee for a project?",
    answer: "To calculate a flat fee, multiply your estimated execution hours by your target hourly rate. Then, add a 15% to 20% Communication Buffer (for emails, calls, and admin) and a 10% to 30% Risk Premium (to cover scope creep and unexpected revisions)."
  },
  {
    question: "Why should freelancers charge flat fees instead of hourly?",
    answer: "Hourly billing punishes efficiency. If you optimize your workflow and get faster, you get paid less. Flat fees detach your income from your time, allowing you to increase your effective hourly rate through expertise and systems."
  },
  {
    question: "What is a Risk Premium in project pricing?",
    answer: "A Risk Premium is a financial markup applied to flat-fee projects to insure against the unknown. Since the freelancer eats the cost of unexpected technical delays or difficult clients in a flat-fee model, the base price must be higher to compensate for absorbing that risk."
  },
  {
    question: "How do I handle scope creep on a flat-fee project?",
    answer: "You must clearly define what is 'out of scope' in your initial Statement of Work (SOW). When a client requests something outside that SOW, you utilize a Change Order—an agreement to perform the extra work for an additional fee."
  },
  {
    question: "What is Value-Based Pricing?",
    answer: "Value-based pricing ignores hours entirely. Instead, you price the project based on the financial ROI it will generate for the client. If your work will make the client $100,000, charging $10,000 (10% of the value) is a steal, even if it only takes you 5 hours to do."
  }
]

export default function ProjectFlatFeeQuoterPage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelance Project Pricing Calculator: Flat-Fee Quote Estimator",
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
    "name": "How to Use the Freelance Project Pricing Calculator",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Core Execution Hours",
        "text": "Input the estimated number of hours required to complete the core work of your project."
      },
      {
        "@type": "HowToStep",
        "name": "Set Target Hourly Rate",
        "text": "Provide your desired base hourly rate to establish the initial cost estimate."
      },
      {
        "@type": "HowToStep",
        "name": "Apply Communication Buffer",
        "text": "Add a percentage markup to account for non-billable time like client meetings, emails, and admin tasks."
      },
      {
        "@type": "HowToStep",
        "name": "Include Risk Premium",
        "text": "Select an appropriate risk premium percentage based on project complexity to protect against scope creep."
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
    "@type": "WebPage",
    "name": "Freelance Project Pricing Calculator: Flat-Fee Quote Estimator",
    "url": "https://dailyfinance.tools/freelance/freelance-project-pricing-calculator"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "item": "https://dailyfinance.tools/freelance/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Freelance Project Pricing Calculator",
        "item": "https://dailyfinance.tools/freelance/freelance-project-pricing-calculator/"
      }
    ]
  };

  return (
    <ToolLayout
      title="Freelance Project Pricing Calculator"
      description="Stop getting punished for working quickly. Convert your hourly estimates into robust, highly profitable flat-fee quotes that protect you from scope creep and endless revisions."
      slug="freelance-project-pricing-calculator"
      faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
          <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
          <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
          <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How to Price a Flat-Fee Project
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Never quote a flat fee by simply multiplying your hourly rate by your estimated hours. That guarantees a loss. A professional, profitable flat-fee quote is calculated using this formula: <code>(Estimated Core Hours × Target Hourly Rate) + 20% Communication & Admin Buffer + 15% Risk Premium</code>. The buffer pays for your non-billable emails and calls, while the risk premium acts as insurance against inevitable scope creep and client revisions.
            </p>
          </section>

          <h2 id="the-trap-of-hourly-billing" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Trap of Hourly Billing
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When most freelancers start out, they default to hourly billing because it feels safe. It is a direct 1-to-1 transaction: you trade 60 minutes of your life for a set amount of dollars. However, as you gain experience, hourly billing rapidly transforms from a safety net into a financial straitjacket.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Hourly billing creates an inherent, toxic conflict of interest between you and your client. The client's goal is to get the project done as quickly and cheaply as possible. Your financial incentive is to stretch the project out to maximize your billable hours. 
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Worst of all, hourly billing actively punishes you for becoming an expert. If you spend 5 years mastering a software tool so you can complete a 10-hour task in just 2 hours, an hourly model means you just gave yourself an 80% pay cut. Flat-fee and Value-Based pricing models solve this entirely by detaching your income from the clock.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Efficiency Penalty</h3>
              <p className="text-sm text-neutral-500 font-light">The faster and better you get at your job, the less money you make under an hourly model.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Income Ceiling</h3>
              <p className="text-sm text-neutral-500 font-light">There are only 24 hours in a day. If you sell your time, your revenue potential has a hard, physical cap.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Client Anxiety</h3>
              <p className="text-sm text-neutral-500 font-light">Clients hate hourly billing because they have no budget certainty. They fear a massive, unexpected final bill.</p>
            </div>
          </section>

          <h2 id="anatomy-of-a-safe-quote" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Anatomy of a Safe Flat-Fee Quote
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When transitioning to flat fees, many freelancers accidentally bankrupt themselves on their first few projects. They look at a project, estimate that it will take 20 hours to execute, multiply 20 hours by their $100/hr rate, and quote the client $2,000.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This is a catastrophic error. That 20-hour estimate only accounts for the <strong>Core Execution Phase</strong> (writing the code, designing the logo, writing the copy). It completely ignores the invisible time sinks that swallow modern freelance projects. To build a highly profitable quote, you must construct it using three distinct pillars.
          </p>

          <div className="bg-[#1E3A5F] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The 3 Pillars of a Flat-Fee Proposal</h3>
            <ul className="space-y-6 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">1</span>
                <div>
                  <strong className="block text-xl mb-1">Pillar 1: Base Execution Cost</strong>
                  This is the raw, baseline estimate. (e.g., 20 hours of coding × $100/hr = $2,000). This is the absolute minimum cost of goods sold.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">2</span>
                <div>
                  <strong className="block text-xl mb-1">Pillar 2: The Communication Buffer (15% to 25%)</strong>
                  Clients require hand-holding. This markup pays for the Zoom kickoff calls, the endless Slack thread replies, the project management setup, and the final handover meetings. Without this buffer, you are communicating for free.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">3</span>
                <div>
                  <strong className="block text-xl mb-1">Pillar 3: The Risk Premium (15% to 30%)</strong>
                  In an hourly model, the client assumes all financial risk. If the project takes longer, the client pays more. In a flat-fee model, YOU assume all the risk. The Risk Premium is a mandatory insurance policy applied to every quote to cover scope creep, technical roadblocks, and nit-picky revisions.
                </div>
              </li>
            </ul>
          </div>

          <h2 id="calculating-the-risk-premium" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Calculate Your Risk Premium
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The size of your Risk Premium should not be a static number. It must scale dynamically based on the specific context of the client and the technological complexity of the project.
          </p>
          
          <ul className="list-disc pl-6 space-y-4 mb-12 text-neutral-600 font-light text-lg">
            <li><strong>Low Risk (10% Premium):</strong> You have worked with this client before, they have a track record of decisive feedback, and the technical requirements are standard boilerplate work you have done a hundred times.</li>
            <li><strong>Medium Risk (20% Premium):</strong> A new client with multiple stakeholders. The project involves some bespoke requirements that will require light R&D or trial and error.</li>
            <li><strong>High Risk (30%+ Premium):</strong> A massive corporate client where every decision requires committee approval. The project relies on third-party APIs or legacy codebases that are notoriously unstable. You are guaranteed to hit roadblocks.</li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">
              <strong>The Golden Rule:</strong> If you apply a 20% Risk Premium to a quote, and the project goes flawlessly with zero scope creep, that 20% becomes pure profit. It is your reward for building a hyper-efficient system. 
            </p>
          </div>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="managing-scope-creep" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Defending the Flat Fee: Managing Scope Creep
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Even with a healthy Risk Premium, flat-fee projects can become unprofitable if you allow the client to endlessly expand the boundaries of the original agreement. This phenomenon is known as <strong>Scope Creep</strong>.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <FileWarning className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Define What is "Out of Scope"</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Your Statement of Work (SOW) must be ironclad. Do not just list what you are doing; explicitly list what you are NOT doing. For example: "This flat fee includes 3 total homepage revisions. It does not include copywriting, stock photo licensing, or ongoing SEO maintenance."</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <ShieldCheck className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">The Hybrid Change Order Strategy</strong>
                <span className="text-neutral-600 font-light leading-relaxed">When a client requests a feature that is clearly outside the SOW, you do not say "No." You say: "I would love to add that feature. That falls outside our current SOW, so I will draft up a Change Order with the additional hourly cost, and we can get started right away." This hybrid approach protects the flat fee while creating opportunities for upsells.</span>
              </div>
            </li>
          </ul>

          <h2 id="value-based-pricing" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Next Evolution: Value-Based Pricing
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            Once you have mastered the flat-fee model (quoting based on buffered hours), the final tier of freelance pricing is <strong>Value-Based Pricing</strong>.
          </p>

          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            In Value-Based Pricing, you abandon hour estimates entirely. You price the project based on the financial ROI it will generate for the client. 
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6">A Value-Based Example</h3>
            <p className="text-neutral-600 font-light text-lg mb-4">
              Imagine an e-commerce client hires you to rewrite their checkout page copy. Under a flat-fee model, you might calculate that it will take you 10 hours, plus buffers, and quote them $1,500.
            </p>
            <p className="text-neutral-600 font-light text-lg mb-6">
              However, during your discovery call, you learn that this checkout page processes $5,000,000 in sales annually. You know that your new copy will increase their conversion rate by at least 10%. That means your work will generate an extra <strong>$500,000 in pure revenue</strong> for the client this year.
            </p>
            <div className="bg-[#FAFAFA] p-6 rounded-xl border border-neutral-100">
              <p className="text-[#1F2937] font-medium m-0">
                Instead of charging $1,500 for your time, you charge a Value-Based flat fee of $25,000. To the client, spending $25k to make $500k is a massive win. To you, you just earned a multi-five-figure payout for a few days of highly specialized work. 
              </p>
            </div>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Start Quoting Like a Business
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Transitioning away from hourly billing is a psychological leap. It requires confidence, tight contracts, and a willingness to say no to clients who demand line-item hour breakdowns. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above on your next project proposal. Enter your baseline hours, apply a 20% communication buffer, and assess the client risk level. Present the final flat-fee number to the client with confidence. By transferring the financial risk from the client to yourself, you unlock the ability to get paid for your expertise, not just your time.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
