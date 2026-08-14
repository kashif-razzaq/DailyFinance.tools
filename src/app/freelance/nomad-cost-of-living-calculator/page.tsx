import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Globe, Plane, ShieldAlert, TrendingUp, DollarSign, MapPin, Briefcase, FileWarning } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Digital Nomad Cost of Living Calculator: Freelance Geo-Arbitrage",
  description: "Calculate how much longer your freelance runway will last by relocating to a lower cost of living city. See your exact payback period and new monthly profit.",
  keywords: ["nomad cost of living calculator", "geo arbitrage calculator", "freelance runway calculator", "digital nomad savings calculator", "cost of living comparison for freelancers", "relocation payback period"],
  slug: "freelance/nomad-cost-of-living-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "What is Geo-Arbitrage?",
    answer: "Geo-arbitrage is the financial strategy of earning money in a strong, high-value currency (like USD, GBP, or EUR) while living in a location with a significantly lower cost of living (like Southeast Asia or Latin America). It allows freelancers to drastically increase their profit margins without working more hours or raising their rates."
  },
  {
    question: "What is a relocation payback period?",
    answer: "Moving across the world costs money (flights, visas, temporary Airbnbs). The payback period is a financial metric showing exactly how many months it takes for your new, lower living expenses to completely offset the upfront cost of the move."
  },
  {
    question: "How does cost of living affect my freelance runway?",
    answer: "Your 'runway' is how many months you can survive on your current savings if your income unexpectedly drops to zero. If you move somewhere that is 50% cheaper, you mathematically double your runway, significantly reducing the daily anxiety of freelancing."
  },
  {
    question: "Do I still have to pay taxes as a digital nomad?",
    answer: "Yes. Leaving your home country does not automatically sever your tax residency. US citizens, for example, must file US taxes regardless of where they live (though they may qualify for the Foreign Earned Income Exclusion). Always consult an expat tax professional."
  },
  {
    question: "What are hidden digital nomad costs?",
    answer: "Beyond rent and food, nomads must budget for global health insurance, visa run flights, coworking space memberships, foreign transaction fees, and the cost of breaking a lease in their home country."
  }
]

export default function NomadCOLPage() {
  return (
    <ToolLayout
      title="Digital Nomad Cost of Living Calculator"
      description="Stop burning your savings in expensive cities. Calculate exactly how many months you can extend your runway (and how much profit you'll add) by leveraging global geo-arbitrage."
      slug="nomad-cost-of-living-calculator"
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
              Quick Answer: How Geo-Arbitrage Works
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Geo-arbitrage allows remote freelancers to instantly increase their profit margins by keeping their income the same while slashing their expenses. To calculate your savings, subtract your new target monthly expenses from your current monthly expenses. For example, moving from a city that costs $5,000/month to one that costs $2,000/month saves you $3,000 every month ($36,000 a year). If your upfront relocation costs (flights, visa, deposit) are $3,000, your <strong>Payback Period</strong> is exactly 1 month. After that first month, the move becomes entirely pure profit.
            </p>
          </section>

          <h2 id="why-freelancers-use-geo-arbitrage" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Economics of Geo-Arbitrage
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Unlike traditional W-2 employees, freelancers are completely decoupled from geography. You do not need to commute to an office, yet millions of freelancers continue to live in high cost-of-living (HCOL) cities like New York, London, Toronto, or San Francisco.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            In these cities, freelancers are forced onto a treadmill. They must charge astronomical rates, work grueling hours, and take on stressful clients <em>just to break even</em> on $4,000/month rent. The financial pressure is immense, and the profit margins are razor-thin.
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            <strong>Geo-arbitrage</strong> flips this script entirely. By relocating to a cheaper city (or an entirely different country), you leverage the purchasing power of a strong currency (like the US Dollar) in an economy where the local currency is weaker. You can achieve financial independence years faster, work fewer hours, and experience a dramatically higher quality of life.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Geo-Arbitrage</h3>
              <p className="text-sm text-neutral-500 font-light">Earning a strong currency while spending a weaker currency to maximize savings.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <ShieldAlert className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Financial Runway</h3>
              <p className="text-sm text-neutral-500 font-light">The number of months you can survive on savings if your income drops to zero.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Plane className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Payback Period</h3>
              <p className="text-sm text-neutral-500 font-light">How long it takes for your new, lower expenses to "pay off" the cost of moving.</p>
            </div>
          </section>

          <h2 id="the-runway-extension" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Magic of "Runway Extension"
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Freelancing is inherently volatile. Clients fire you, projects get delayed, and invoices go unpaid. The metric that dictates your stress levels is your <strong>Financial Runway</strong>.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you have $20,000 in your bank account, how long will that money last? That depends entirely on where you choose to sleep at night.
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-[#D97706]" />
              Runway Mathematics
            </h3>
            
            <ul className="space-y-8 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Scenario A: Remaining in a HCOL City</strong>
                  <p className="mb-4">You live in San Francisco. Your rent, health insurance, and food cost $5,000/month. You have $20,000 in savings.</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-sm block mb-2">$20,000 ÷ $5,000/mo = 4-Month Runway</code>
                  <p className="text-sm text-white/60">Result: Extreme stress. If you lose a major client, you are immediately at risk of eviction.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Scenario B: Relocating to a LCOL Hub</strong>
                  <p className="mb-4">You move to Chiang Mai, Thailand, or Medellin, Colombia. Your total expenses drop to $2,000/month. (Assuming a $2,000 upfront moving cost).</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-sm block mb-2">$18,000 ÷ $2,000/mo = 9-Month Runway</code>
                  <p className="text-sm text-white/60">Result: Complete peace of mind. You instantly bought yourself 5 extra months of survival without working a single extra hour.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">The Power to Say "No"</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              When your runway is short, you are forced to take on abusive clients and low-paying projects just to survive. When your runway is 9 to 12 months long, you gain the ultimate freelance superpower: the ability to say "No." Geo-arbitrage allows you to build that runway in a fraction of the time.
            </p>
          </div>

          <h2 id="relocation-costs" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The True Cost of Relocation (The Payback Period)
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Moving to a new country is not free. You cannot simply look at the $500/month rent in Vietnam and assume you are saving money on day one. You must calculate the upfront capitalization required to execute the move, and then determine your <strong>Payback Period</strong>.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <MapPin className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Hidden Upfront Costs</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Moving requires flights ($500-$1,500), visa application fees, breaking your current lease, and putting down 1-3 months of rent as a security deposit in your new location. You might easily need $3,000 to $5,000 in cash just to execute the move.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <DollarSign className="h-8 w-8 text-[#064E3B] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Calculating the Payback Period</strong>
                <span className="text-neutral-600 font-light leading-relaxed">If it costs you $4,000 to move, but your new monthly expenses are $2,000 cheaper than your old city, your payback period is exactly 2 months ($4,000 ÷ $2,000). For the first two months, you are merely breaking even on the move. By month 3, you are generating pure, accelerated profit.</span>
              </div>
            </li>
          </ul>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="the-tax-trap" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Digital Nomad Tax Trap
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            The biggest mistake new digital nomads make is assuming that leaving their home country means they no longer have to pay taxes. This is incredibly dangerous and can result in devastating IRS penalties.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <ul className="space-y-4 text-neutral-600 font-light text-lg">
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <FileWarning className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>Tax Residency:</strong> Most countries consider you a tax resident if you stay longer than 183 days. You could accidentally owe taxes to your host country.</span>
              </li>
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <FileWarning className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>US Citizens:</strong> The US taxes based on citizenship, not geography. You must file a US tax return every year, no matter where you live on Earth.</span>
              </li>
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <FileWarning className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>FEIE (Foreign Earned Income Exclusion):</strong> US citizens can exclude over $120k of income from federal taxes if they meet the strict Physical Presence Test (outside the US for 330 days).</span>
              </li>
              <li className="flex items-center gap-3 pb-2">
                <FileWarning className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>Double Taxation:</strong> Without proper planning, you could owe taxes to both your home country AND your host country. Always consult an expat CPA.</span>
              </li>
            </ul>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Is the Move Worth It?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Geo-arbitrage is a powerful financial lever, but it is not a vacation. You are building a business, just in a different timezone. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above to run the math on your specific scenario. Enter your current expenses, estimate your new expenses using data from sites like NomadList or Numbeo, and include a realistic relocation budget. If the payback period is less than 6 months, and the move doubles your runway, geo-arbitrage might be the smartest business decision you ever make.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
