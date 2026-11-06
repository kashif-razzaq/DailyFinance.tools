import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Payoff Calculator: Payoff Date, Interest & Extra Payments',
  description: 'Calculate your student loan payoff date, total interest and exactly how much time and money extra monthly payments save you. Free student loan payoff calculator.',
  keywords: ['student loan payoff calculator', 'student loan calculator', 'how long to pay off student loan', 'student loan interest calculator'],
  slug: "personal-wealth/student-loan-payoff-calculator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "Divide nothing \u2014 amortisation does it monthly: interest is charged on the remaining balance each month, and the rest of your payment reduces principal. At $37,000 and 6.5 percent with a $400 payment, payoff takes about ten years and costs roughly $11,800 in interest. Enter your figures above for your exact date and total.",
    "question": "How long will it take to pay off my student loan?"
  },
  {
    "answer": "Yes, whenever the alternative is not a higher-interest debt or a forgiveness route. Extra payments go entirely to principal, cutting both the payoff time and the total interest \u2014 the first extra dollars are worth most, because they remove principal that would have charged interest for the longest time.",
    "question": "Do extra payments really save that much on student loans?"
  },
  {
    "answer": "Federal loans offer income-driven repayment, deferment and forgiveness programmes including Public Service Loan Forgiveness; private loans generally offer none of these but can sometimes be refinanced at lower rates. Because the protections differ so much, extra payments usually target private and higher-rate loans first.",
    "question": "What is the difference between federal and private student loan payoff?"
  },
  {
    "answer": "Possibly. If you work in qualifying public service or your income-driven plan will forgive a balance, extra payments on that loan can be wasted money \u2014 the forgiven amount is reduced by every extra dollar you paid. Check your eligibility carefully before accelerating a federal loan.",
    "question": "Could paying extra ever be a mistake?"
  },
  {
    "answer": "Refinancing replaces your loan with a new private loan at a different rate \u2014 worth considering if your credit and income are strong and the rate drops meaningfully. You permanently give up federal protections and forgiveness eligibility on refinanced federal loans, which is a one-way door to weigh carefully.",
    "question": "Should I refinance my student loan instead?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Student Loan Payoff Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/student-loan-payoff-calculator", "url": "https://dailyfinance.tools/personal-wealth/student-loan-payoff-calculator", "name": 'Student Loan Payoff Calculator: Payoff Date, Interest & Extra Payments', "description": 'Calculate your student loan payoff date, total interest and exactly how much time and money extra monthly payments save you. Free student loan payoff calculator.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Student Loan Payoff Calculator', "item": "https://dailyfinance.tools/personal-wealth/student-loan-payoff-calculator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Student Loan Payoff Calculator' description='Calculate your student loan payoff date, total interest and exactly how much time and money extra monthly payments save you. Free student loan payoff calculator.' slug="student-loan-payoff-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: How Fast Can You Be Done With Student Debt?</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Enter your balance, interest rate and monthly payment to see your student loan payoff date and total interest. Because interest is charged on the remaining balance, even a small extra monthly payment cuts years off the loan and saves thousands — the calculator shows both figures side by side.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Student Loans: What the Standard Plan Really Costs</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A student loan is usually the first large debt of a person's life, and it is engineered to feel harmless: the payment is a few hundred a month, the term is a decade, and everyone you know has one. The harm is in the total. At typical balances and rates, the standard plan quietly adds somewhere between a quarter and a third of the original amount again in interest — money that bought no education, no experience, nothing at all. This calculator exists to make that total visible, along with the date it finally ends.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The second thing the calculator makes visible is leverage. Because interest is charged on the remaining balance, extra payments do not save money in proportion — they save it in cascade. A hundred dollars extra a month in the early years can remove years from the end of the loan and thousands from its cost, as the worked examples below show with real numbers you can reproduce above. Few financial moves available to a young borrower are as reliably valuable as a modest, sustained extra payment on a mid-rate loan.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use the tool to set a date. Enter your balance, rate and current payment to see your baseline debt-free date and total interest, then move the extra payment slider until the date becomes one you are willing to commit to. The sections that follow explain the amortisation maths, where student loans differ from other debts (federal protections and forgiveness routes change the strategy), and the order in which to attack them alongside your other debts and goals.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Extra Payments Punch Above Their Weight</h3>
              <p className="text-sm text-neutral-500 font-light">Every extra dollar goes entirely to principal. On a loan with years left, that dollar also deletes the interest it would have generated every month for the rest of the term — which is why early extra payments are the most powerful ones.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Federal vs Private Is a Strategy Question</h3>
              <p className="text-sm text-neutral-500 font-light">Federal loans carry forgiveness routes, income-driven plans and hardship pauses that private loans do not. Extra payments usually belong on private and high-rate loans first; federal balances deserve a plan check before a payoff sprint.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Standard Plan Is Not a Deadline</h3>
              <p className="text-sm text-neutral-500 font-light">Ten years is simply the default repayment schedule, not a moral obligation. The gap between the standard plan's interest and your plan's interest is, quite literally, money available for your other goals.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A student loan amortises like any other loan, and the monthly rhythm is unforgiving in a specific way: interest is charged on whatever balance remains, so early payments are mostly interest and late payments are mostly principal. That is why the balance seems to barely move for the first years of a standard plan — and why extra payments early, when the balance and therefore the monthly interest charge are at their largest, do disproportionate damage to the loan's total cost.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">How Student Loan Amortisation Works</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Monthly interest = Balance x (APR / 12)  ·  Principal paid = Payment - Interest  ·  Repeat monthly until the balance reaches zero; months counted = payoff time, interest summed = total cost</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Find the Monthly Interest Charge</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Multiply the balance by the APR and divide by twelve. On $37,000 at 6.5 percent, the first month's interest is about $200 — half of a $400 payment, gone before the balance moves at all. This is the number that decides whether a payment plan works at all: any payment below it means the loan grows instead of shrinking, which the calculator will warn you about.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Track the Principal Portion</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Subtract the interest from the payment; the rest reduces the balance. Next month the interest is charged on a slightly smaller balance, so slightly more of the same payment reaches the principal. Month by month the split tilts in your favour — slowly at first, then dramatically near the end. The loan's shape is a long shallow slope followed by a cliff, as the balance chart above shows.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: See What Extra Payments Actually Do</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">An extra payment skips the interest split entirely: every cent reduces principal. That smaller balance then charges less interest every remaining month of the loan, which frees more of each future payment for principal, which shrinks the balance faster still. Simulating that cascade — not a rough estimate, the actual month-by-month loop — is exactly what this calculator runs when you change the extra payment figure.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: The Average Borrower, $400 a Month</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Take a $37,000 balance at 6.5 percent — close to the average federal borrower's position — with a $400 monthly payment. The calculator clears it in about ten years, with total interest in the region of $11,800: the degree effectively costs nearly $49,000. Nothing about that outcome is unusual, which is exactly why it is worth seeing written down. The standard decade of payments feels normal because everyone around you is doing it; the interest figure reveals what normal costs.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Adding $100 a Month</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Add just one hundred dollars, taking the payment to $500. The payoff arrives roughly two and a half years sooner, and total interest falls by around $3,300 — meaning that $100 a month, paid only while the loan lives, returns its cost many times over across the loan's remaining life. Notice the asymmetry the calculator exposes: the first extra dollars are the most valuable, because they remove principal that would otherwise have charged interest for the longest remaining time. Later extra payments help too, but the biggest win is simply starting.</p>
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
              <div><strong className="text-[#1F2937] block text-lg mb-1">Paying Extra Toward a Loan Headed for Forgiveness</strong><span className="text-neutral-600 font-light leading-relaxed">If you are on track for Public Service Loan Forgiveness or income-driven forgiveness, every extra dollar simply reduces the amount forgiven. That is the one scenario where extra student loan payments reliably lose money. Establish your forgiveness position first; sprint second.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Attacking a 5 Percent Loan While Carrying a 25 Percent Card</strong><span className="text-neutral-600 font-light leading-relaxed">All debt is not equal, and urgency should follow the interest rate. Clearing expensive card balances first, while paying student loan minimums, almost always saves more total interest than the reverse — run the rates, not the emotional salience of the word 'student'.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Refinancing Federal Loans for a Small Rate Saving</strong><span className="text-neutral-600 font-light leading-relaxed">Refinancing federal loans into a private loan is irreversible and surrenders income-driven plans, hardship pauses and forgiveness eligibility. A saving of half a percent rarely compensates for losing an insurance policy of that size. If you refinance, do it with strong income stability and your eyes open.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Letting the Payment Sit in a Bank Account After Payoff</strong><span className="text-neutral-600 font-light leading-relaxed">The months after a loan clears are a financial fork: the payment amount is already built into your budget, so redirecting it to investing costs no lifestyle at all. Households that let it dissolve into spending lose the largest easy investing habit they will ever be offered. Automate the redirection the same month the loan dies.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring Interest Capitalisation Events</strong><span className="text-neutral-600 font-light leading-relaxed">During deferment, some forbearance and certain plan changes, unpaid interest can capitalise — it joins the principal and itself starts earning interest. Knowing when your loans capitalise, and paying at least the interest before those dates, prevents a quiet step-up in everything you owe.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Payoff vs Forgiveness: Check Your Route Before You Sprint</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Before accelerating, check whether any of your balance qualifies for forgiveness routes — public service forgiveness, income-driven forgiveness timelines, or employer repayment assistance — because paying extra toward a balance that would have been forgiven is the one way extra payments lose money. If forgiveness is plausible, the optimal move is often the opposite: pay the calculated minimum on the qualifying plan and invest the difference. The calculator's baseline is the standard repayment world; forgiveness moves you to a different board, and you should be sure which board you are on.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">If no forgiveness applies, the sequence most households follow is: keep a starter emergency fund, clear any debt more expensive than the student loan (cards, almost always), capture any employer retirement match, then aim surplus income at the student balance, highest rate first if you hold several loans. When the loan finally clears — check your date above and put it in a calendar — redirect the entire payment, untouched, into investing on the same payday. A payment your budget already survived is the easiest investment habit you will ever build.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> Estimates use a standard amortisation model with the rate and payment you enter; federal income-driven plans, forgiveness programmes, deferment and servicer practices can change real outcomes significantly. This page is educational information, not financial or student-loan advice.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
