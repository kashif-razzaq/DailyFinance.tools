import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Emergency Fund Calculator: How Many Months Do You Need?',
  description: 'Calculate your emergency fund target from your real essential spending and risk level, see how many months you already cover, and when you will be fully funded. Free.',
  keywords: ['emergency fund calculator', 'how much emergency fund do i need', 'months of expenses saved', 'starter emergency fund'],
  slug: "personal-wealth/emergency-fund-visualizer",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "Three months of essential spending suits dual-income households with stable jobs. Six months suits single earners and most families. Nine to twelve months suits freelancers, commission-based workers, single parents and anyone whose income could stop suddenly or take a long time to replace.",
    "question": "How many months of emergency fund do I need?"
  },
  {
    "answer": "Expenses \u2014 specifically essential expenses only. In a genuine emergency you would cut discretionary spending, so the fund only needs to cover housing, food, transport, insurance, utilities and minimum debt payments. Basing it on income produces a target that is usually far larger than necessary.",
    "question": "Should my emergency fund be based on income or expenses?"
  },
  {
    "answer": "In an insured, instant-access savings account \u2014 ideally a high-yield savings account so it earns something while it waits. It should not be invested in the stock market, locked into a certificate of deposit, or mixed into the account you spend from daily.",
    "question": "Where should I keep my emergency fund?"
  },
  {
    "answer": "Usually in stages: build a starter fund of about one month of essentials first, then attack high-interest debt, then complete the emergency fund. Going all-in on debt with zero cash means the next unexpected bill goes straight back onto a card; going all-in on savings while carrying 25 percent APR debt is expensive safety.",
    "question": "Should I build an emergency fund or pay off debt first?"
  },
  {
    "answer": "Job loss, essential car or home repairs, urgent medical costs and other sudden, necessary, unexpected expenses. Predictable costs \u2014 annual bills, holidays, routine servicing \u2014 should be planned in separate sinking funds so the emergency fund stays intact for genuine shocks.",
    "question": "What counts as an emergency worth using the fund for?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Emergency Fund Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/emergency-fund-visualizer", "url": "https://dailyfinance.tools/personal-wealth/emergency-fund-visualizer", "name": 'Emergency Fund Calculator: How Many Months Do You Need?', "description": 'Calculate your emergency fund target from your real essential spending and risk level, see how many months you already cover, and when you will be fully funded. Free.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Emergency Fund Calculator', "item": "https://dailyfinance.tools/personal-wealth/emergency-fund-visualizer" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Emergency Fund Calculator' description='Calculate your emergency fund target from your real essential spending and risk level, see how many months you already cover, and when you will be fully funded. Free.' slug="emergency-fund-visualizer" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: How Big Should an Emergency Fund Be?</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">An emergency fund should cover three to six months of essential spending — not income, and not your full lifestyle budget. Count only bills that continue if your income stops: housing, food, transport, insurance and minimum payments. Single earners, freelancers and sole breadwinners should aim nearer six to twelve months.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Most Boring, Most Important Number in Your Finances</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">An emergency fund is not an investment and was never meant to be. It will not beat inflation reliably, it will not impress anyone, and in a good year it does absolutely nothing. Its entire job is to sit quietly between you and the day your income stops or your car, boiler or body breaks — and to make sure that day becomes an inconvenience paid in cash instead of a crisis financed at credit-card interest rates.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The standard advice — three to six months — is usually quoted against the wrong number. Months of what? Not your salary, and not your full spending, which includes restaurants, holidays and subscriptions you would cut in a genuine emergency. The right base is your essential monthly spending: the housing payment, groceries, transport, insurance premiums, utilities and minimum debt payments that continue whether you are earning or not. For most households that figure is far lower than take-home pay, which means the target is closer than they feared.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator builds your target from those essentials, then scales it by the risk you actually carry. A dual-income couple with stable jobs and no dependants can sleep well at three months. A freelancer, a single earner, or anyone whose household depends on one industry should be looking at six, nine or even twelve. Finally, it compares the target with what you have already saved and your monthly saving rate, and tells you the month your fund is finished — because a target without a completion date is just a wish.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Essentials Only, Always</h3>
              <p className="text-sm text-neutral-500 font-light">Build the target from spending that cannot stop: housing, food, transport, insurance, utilities and minimum payments. Discretionary spending would be cut in a real emergency, so funding it in advance overstates the target and delays every other goal.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Risk Sets the Months</h3>
              <p className="text-sm text-neutral-500 font-light">Three months suits two stable incomes. Six suits a single income or a variable one. Nine to twelve suits freelancers, commission earners, single parents and anyone whose job and industry could disappear in the same week.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Where It Lives Matters</h3>
              <p className="text-sm text-neutral-500 font-light">An emergency fund belongs in an instant-access, insured savings account — ideally a high-yield one — not invested, not locked in a CD, and not in an account so convenient that a sale weekend counts as an emergency.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The emergency fund formula is a multiplication, not a mystery — but both sides of it deserve scrutiny. The monthly figure must be essentials only, gathered from real bank statements rather than memory, and the months figure must reflect your income stability, your dependants, your insurance gaps and how long replacing your income would realistically take in your field. The calculator also derives your funding timeline by dividing the remaining gap by your monthly saving, which turns an abstract target into a date.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Emergency Fund Equation</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Target Fund = Essential Monthly Spending x Months of Cover  ·  Months to finish = (Target - Already Saved) / Monthly Saving</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Add Up a Survival Month</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Go through three months of bank statements and mark only the spending that continues with no income: rent or mortgage, groceries (not dining out), transport to work or job interviews, insurance premiums, utilities, phone, and minimum debt payments. That trimmed total — often 55 to 75 percent of normal spending — is your essential month.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Choose Your Months Honestly</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use your risk, not your optimism. Two earners in different, stable industries: three months is defensible. One earner, or income that varies month to month: six. Self-employment, a single income supporting dependants, health concerns, or a niche career with long hiring cycles: nine to twelve. If replacing your job would take six months, a three-month fund is a plan to borrow.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Fund It in Stages</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Do not let a twelve-month target paralyse you. Stage one is a starter fund of about one month of essentials, which already covers most real emergencies (which are usually a repair bill, not a redundancy). Stage two reaches three months. After that, clear expensive debt, then finish the fund. The calculator's tier chart shows every stage so progress is visible long before the final target.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A Single Renter Spending $3,200 on Essentials</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A renter's essentials — $1,500 rent, $600 food, $350 transport, $300 insurance and minimums, $450 utilities and other basics — total $3,200 a month. As a single earner she chooses six months of cover: a target of $19,200. She has $5,000 saved, so the gap is $14,200, and at $400 a month she is fully funded in about thirty-six months. That sounds slow, but the tier view reframes it: she already covers more than a month and a half, and she passes the crucial three-month line ($9,600) in about a year.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A Freelancer Who Needs Twelve Months</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A freelance designer with irregular income has essentials of $2,800 a month but no employer, no sick pay and clients concentrated in one industry. Twelve months of cover sets a $33,600 target. It is a big number — and the honest one, because his realistic bad case is not a broken appliance, it is two clients pausing work in the same quarter. He funds it in stages: one month fast, three months next, and treats everything beyond six months as a slower, background goal funded from good quarters.</p>
          </div>
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes to Avoid</h2>
          <ul className="space-y-6 mb-16">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Basing the Fund on Your Salary</strong><span className="text-neutral-600 font-light leading-relaxed">Three to six months of income is almost always too much, because you would not spend your full income in an emergency — you would spend your essentials. The oversized target takes years longer to reach, earns little while it waits, and delays debt repayment and investing that would have made you safer in other ways.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Investing the Fund for a Better Return</strong><span className="text-neutral-600 font-light leading-relaxed">An emergency fund invested in stocks can be down thirty percent on exactly the day you lose your job — recessions cause both. The fund's return is not measured in percent; it is measured in crises that did not become debt. Keep it in insured, instant-access cash and let your retirement accounts do the growing.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Counting a Credit Card as the Emergency Fund</strong><span className="text-neutral-600 font-light leading-relaxed">Available credit is not an emergency fund; it is emergency debt waiting for an emergency. Limits can be cut precisely when lenders get nervous, and funding a job loss at twenty-five percent interest converts a three-month problem into a three-year one. Credit is a backup to the fund, never a substitute for it.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">One Joint Number for Very Different Risks</strong><span className="text-neutral-600 font-light leading-relaxed">A household with two incomes in unrelated industries and a household with one self-employed income may spend identical amounts yet need funds two or three times different in size. The months multiplier is where your personal risk lives — set it from your income stability and dependants, not from a headline you read once.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Raiding the Fund for Predictable Expenses</strong><span className="text-neutral-600 font-light leading-relaxed">Annual insurance, holidays, car servicing and sales are not emergencies — they are certain expenses with uncertain dates, and they belong in separate sinking funds. Every raid for a foreseeable cost resets your protection to zero. If it can be seen coming, budget for it; the emergency fund is only for what cannot.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">After the Fund: Keeping It Full and Putting It to Sleep</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Once your target is reached, stop. An over-built emergency fund is its own quiet mistake: cash beyond your risk-based target, sitting at savings-account rates, is money that should be clearing debt or compounding in investments. Set a ceiling, redirect the monthly saving the day you hit it, and let the fund do its one job. Review the target once a year, or whenever your essentials, household or income type changes — a new mortgage, a child, or a move to self-employment all rewrite the calculation.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">When you do use the fund — and using it for a genuine emergency is success, not failure — refilling it becomes your first financial priority, ahead of extra investing and extra debt payments beyond minimums. You are, for that period, uninsured again, and the maths of risk says the cheapest time to rebuild protection is before the next problem arrives. Many people automate a standing transfer the day after payday sized from this calculator's timeline, so the fund quietly refills itself without monthly decisions or willpower.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> This calculator provides educational estimates based on the spending and saving figures you enter. It is not financial advice. How much cover you need depends on your personal circumstances, employment rights, insurance and dependants — consider your own situation carefully.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
