import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Tax & Salary Calculators — Paycheck, Income Tax, Take-Home Pay",
  description:
    "Free tax and salary calculators: federal income tax with bracket breakdowns, paycheck and take-home pay, salary conversions, overtime pay and capital gains tax. Estimates labelled, figures shown.",
  keywords: ["tax calculator", "paycheck calculator", "income tax calculator", "take home pay calculator", "salary calculator"],
  slug: "tax",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="tax"
      quickAnswer={
        "Tax and salary calculators convert a headline salary into the number that matters: take-home pay. Federal brackets tax slices of income at rising rates — the standard deduction comes off first, then 10%, 12%, 22% and up — FICA takes a flat 7.65%, and state tax varies from zero to over 13% depending on where you live. Work through the paycheck calculator for a specific pay schedule, the income tax calculator for the full annual picture, and the bracket guide in our guides section if the marginal-versus-effective distinction is new."
      }
      intro={[
        "The most common tax misunderstanding is also the most expensive: the belief that crossing into a higher bracket taxes all of your income at the higher rate. It taxes only the slice inside the bracket. On an $85,000 salary in 2026, a single filer's effective federal rate is about 12% even though the marginal bracket is 22% — and a $5,000 raise is taxed at 22% on the new dollars only. The bracket breakdown in the tax calculator shows this slice by slice, which ends the argument better than any explanation.",
        "Between gross pay and the deposit sit four deductions in a fixed order: pre-tax contributions (401(k), HSA, health premiums), federal withholding, FICA, then state and local tax. Because pre-tax contributions reduce the taxable base, they save tax at your marginal rate — a 6% 401(k) contribution on $70,000 removes $4,200 from taxable wages. The take-home pay calculator models that waterfall explicitly, which is what makes raise and job-offer comparisons honest.",
        "State tax is the variable that changes identical salaries between states. Nine states tax no wage income; California's top rate exceeds 13%. Before accepting a remote role or a relocation, run the same salary through the paycheck calculator with both states' rates — the annual difference routinely reaches several thousand dollars, and it belongs in the negotiation.",
      ]}
      decisions={[
        { need: "A salary, raise or job offer", toolSlug: "paycheck-calculator", why: "turns gross pay into the actual deposit for your pay schedule." },
        { need: "The full annual tax picture", toolSlug: "income-tax-calculator", why: "combines federal, state and FICA into one burden breakdown." },
        { need: "Understanding your bracket", toolSlug: "tax-calculator", why: "shows each bracket slice and your effective vs marginal rate." },
        { need: "Modelling 401(k) and HSA effects", toolSlug: "take-home-pay-calculator", why: "runs the pre-tax deduction waterfall line by line." },
        { need: "Selling an investment", toolSlug: "capital-gains-tax-calculator", why: "separates short-term from long-term treatment and adds NIIT where it applies." },
      ]}
      faqs={[
        { question: "Are these calculators exact?", answer: "They are estimates built on published 2026 federal brackets and the standard deduction, labelled as estimates on every page. Individual situations — credits, itemised deductions, local taxes — move the final figure; use the result for planning and a tax professional for filing." },
        { question: "Why is my first paycheck at a new job taxed oddly?", answer: "Payroll annualises each check: a mid-period start, a signing bonus or a short first period can make withholding look high or low. It settles across the year and at filing." },
        { question: "What is the difference between marginal and effective rate?", answer: "Marginal is the rate on your next dollar; effective is total tax divided by total income. Effective is always lower in a bracket system, and it is the rate to use when comparing overall tax burdens." },
      ]}
    />
  )
}
