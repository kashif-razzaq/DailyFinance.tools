import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Target, TrendingUp, AlertTriangle, Users, DollarSign, Repeat, ArrowDownRight, BarChart } from "lucide-react"

export const metadata: Metadata = {
  title: "Freelance Client LTV (Lifetime Value) Calculator",
  description: "Calculate the true Lifetime Value (LTV) of your freelance and agency clients. Determine your maximum acceptable Customer Acquisition Cost (CAC) for profitable growth.",
  keywords: ["client ltv calculator", "freelance customer lifetime value", "agency ltv to cac ratio", "retainer ltv calculator", "freelance client retention", "customer acquisition cost freelancer", "gross margin agency"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/client-ltv-calculator",
  },
  openGraph: {
    title: "Freelance Client LTV Calculator | Scale Your Agency",
    description: "Calculate your exact Client Lifetime Value and Customer Acquisition Cost (CAC) limits to scale your freelance business profitably.",
    url: "https://dailyfinance.tools/tools/client-ltv-calculator",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Client LTV Calculator",
    description: "Calculate the true Lifetime Value (LTV) of your freelance clients.",
  },
}

const faqs: FAQ[] = [
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
  },
  {
    question: "What is Churn Rate?",
    answer: "Churn rate is the percentage of clients who cancel their retainers or stop working with you over a given time period (usually measured monthly). A high churn rate destroys your LTV."
  },
  {
    question: "Why should I include Gross Margin in my LTV calculation?",
    answer: "Revenue is vanity; profit is sanity. If a client pays you $5,000 but it costs you $4,000 in subcontractors and software to deliver the work, the client is only actually worth $1,000 to your business."
  }
]

export default function ClientLTVCalculatorPage() {
  return (
    <ToolLayout
      title="Client Lifetime Value (LTV) Calculator"
      description="Stop guessing how much you can afford to spend on marketing. Calculate your exact Client Lifetime Value and Customer Acquisition Cost (CAC) limits to scale your freelance business profitably."
      slug="client-ltv-calculator"
      faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How to Calculate Client LTV & CAC
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To accurately calculate Freelance Client LTV (Lifetime Value) for retainer businesses, multiply your Average Monthly Revenue per client by your Gross Margin, then divide by your Monthly Churn Rate. For example, a client paying $2,000/month at a 70% gross margin with a 5% monthly churn rate yields an LTV of $28,000. You should aim for a 3:1 LTV:CAC ratio, meaning your maximum Customer Acquisition Cost (marketing, sales calls, ads) for this specific client persona should be $9,333.
            </p>
          </section>

          <h2 id="the-dead-end-of-one-off-thinking" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Dead-End of "One-Off" Thinking
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Most freelancers and early-stage agency owners operate on a project-to-project basis. If they sell a custom website for $3,000, they view that client as being worth exactly $3,000. Once the website is launched, the freelancer scrambles to find the next $3,000 project to keep the lights on.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This transactional mindset is the primary reason most freelancers never scale past the six-figure mark. It creates an exhausting treadmill of perpetual lead generation. The most successful freelance businesses operate on a fundamentally different paradigm: they focus on <strong>Lifetime Value (LTV)</strong>.
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you change your model so that the $3,000 website client also signs a $500/month SEO and maintenance retainer, and they stay with you for an average of 3 years, that client is no longer worth $3,000. They are worth $21,000. Understanding this single metric completely alters how much time, effort, and money you are willing to invest to acquire them.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Lifetime Value (LTV)</h3>
              <p className="text-sm text-neutral-500 font-light">The total predictable gross profit a single client will generate over the entire lifespan of your business relationship.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Acquisition Cost (CAC)</h3>
              <p className="text-sm text-neutral-500 font-light">The total financial investment (ads, software, sales hours) required to convince a prospect to sign a contract.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Repeat className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Churn Rate</h3>
              <p className="text-sm text-neutral-500 font-light">The percentage of retainer clients who cancel their contracts each month. High churn destroys your LTV instantly.</p>
            </div>
          </section>

          <h2 id="calculating-freelance-ltv" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Calculate Freelance Client LTV
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Unlike SaaS (Software as a Service) companies, freelancers cannot calculate LTV purely on top-line revenue. When a SaaS company signs a new user, delivering the software costs them almost nothing. When a freelancer signs a new client, delivering the work requires human labor, expensive software licenses, and potentially outsourced contractors.
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The LTV Master Formula</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-6 relative z-10">
              To calculate the true value of a client to your business, you must incorporate your profit margins. 
            </p>
            <div className="bg-black/20 p-6 rounded-xl border border-white/10 relative z-10 mb-8 text-center">
              <code className="text-xl md:text-2xl font-mono text-[#D97706]">(Average Monthly Revenue × Gross Margin) ÷ Monthly Churn Rate = LTV</code>
            </div>
            
            <ul className="space-y-6 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">1</span>
                <div>
                  <strong className="block text-xl mb-1">Average Revenue:</strong> The predictable, recurring cash flow. (e.g. $2,000/month).
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">2</span>
                <div>
                  <strong className="block text-xl mb-1">Gross Margin:</strong> Your profit after direct delivery costs. If you outsource $600 of that $2,000 to a junior dev, your margin is 70%.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">3</span>
                <div>
                  <strong className="block text-xl mb-1">Churn Rate:</strong> The percentage of clients who leave. If you have 20 clients and 1 leaves every month, your churn is 5% (0.05).
                </div>
              </li>
            </ul>
          </div>

          <h2 id="understanding-cac" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Customer Acquisition Cost (CAC)
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Once you know your LTV, you unlock the ultimate superpower of business: knowing exactly how much you can afford to "buy" a customer for. This is your <strong>Customer Acquisition Cost (CAC)</strong>.
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If a freelancer does not know their CAC, they are flying blind. They might spend $500 on LinkedIn ads, fail to get a client immediately, panic, and shut the ads off. But if they knew their LTV was $28,000, they would realize that spending $3,000 on ads to acquire a single client is actually a wildly profitable investment.
          </p>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">Calculating Freelance CAC</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              Do not just calculate hard dollar costs (like Facebook ads). As a freelancer, your primary acquisition cost is often <strong>your time</strong>. If you spend 10 hours a month sending cold emails or networking, and your target hourly rate is $100, your baseline monthly sales cost is $1,000. If that $1,000 of labor results in 1 new client, your CAC is $1,000.
            </p>
          </div>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="the-golden-metric" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Golden Metric: The LTV to CAC Ratio
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The relationship between what a client makes you (LTV) and what they cost you (CAC) is expressed as a ratio. This ratio is the definitive health check for your freelance business or agency.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <ArrowDownRight className="h-8 w-8 text-red-500 shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Under 1:1 (Losing Money)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">If you spend $2,000 in time and ads to acquire a client whose lifetime profit is only $1,500, your business model is fundamentally broken. You are paying for the privilege of working. You must immediately raise your prices or lower your churn.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">1:1 to 2:1 (The Danger Zone)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">You are breaking even or making a tiny profit, but you have no margin for error. If a client churns earlier than expected, or an ad campaign underperforms, you dip into the red. Growth here is painfully slow.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <BarChart className="h-8 w-8 text-[#064E3B] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">3:1 (The Gold Standard)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">This is the optimal balance. You are generating significant profit while still investing aggressively in growth. If your LTV is $9,000, you should comfortably be willing to spend up to $3,000 to acquire a new client.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <TrendingUp className="h-8 w-8 text-blue-500 shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">5:1 or Higher (Under-Investing)</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Counter-intuitively, an incredibly high ratio (like 10:1) means you are growing too slowly. You are squeezing massive profit from clients but failing to reinvest it into marketing. You could be growing much faster by increasing your CAC budget.</span>
              </div>
            </li>
          </ul>

          <h2 id="gross-margin-vs-revenue" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Gross Margin vs. Gross Revenue: A Warning
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            The biggest mistake freelancers make when calculating LTV is confusing revenue with profit. 
          </p>

          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            If you run a Google Ads management agency and charge a client $5,000 a month, your revenue is $5,000. But if you have to pay $3,000 a month to a white-label contractor to actually run the ads, and $500 for enterprise SEO tools, your direct costs are $3,500. 
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6">Why Margin Dictates Survival</h3>
            <p className="text-neutral-600 font-light text-lg mb-6">
              In the example above, your Gross Margin is only 30% ($1,500). If you calculate your LTV using the $5,000 revenue number, you will trick yourself into believing you have a massive LTV. You will then set a massive CAC budget (e.g., $4,000). 
            </p>
            <p className="text-neutral-600 font-light text-lg mb-6">
              When you spend that $4,000 to acquire the client, but only retain $1,500 in actual profit per month, you will run into massive cash flow problems. Always, <em>always</em> calculate LTV based on the margin you actually get to keep.
            </p>
            <div className="bg-[#FAFAFA] p-6 rounded-xl border border-neutral-100 flex items-center gap-4">
              <Users className="text-[#064E3B] w-8 h-8 shrink-0" />
              <p className="text-[#1F2937] font-medium m-0">
                To improve your agency's Gross Margin, you must either raise your prices to the client, or optimize your service delivery by automating repetitive tasks and negotiating better rates with subcontractors.
              </p>
            </div>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Start Scaling with Confidence
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The difference between a struggling freelancer and a scaling agency owner is knowing these numbers. When you know your LTV is $15,000, a $500 marketing experiment on LinkedIn no longer feels risky; it feels like a mandatory tactical investment.
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above to model your current business. Play with the numbers. See what happens to your LTV if you manage to reduce your churn rate by just 2%, or if you increase your retainer price by $200. The math will show you exactly where to focus your energy to build a highly profitable, resilient business.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
