import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Loan & Debt Calculators — Payments, APR, Payoff Plans",
  description:
    "Free loan calculators: payments, true APR, auto and personal loans, credit card and debt payoff (avalanche vs snowball), consolidation and DTI.",
  keywords: ["loan calculator", "debt payoff calculator", "apr calculator", "auto loan calculator", "debt to income ratio"],
  slug: "loans",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="loans"
      quickAnswer={
        "Loan calculators answer three questions: what will this loan cost in total, what payment retires it by a given date, and in what order should multiple debts be paid? Start with the general loan calculator for any amortizing loan, use the APR calculator when fees make loans hard to compare, and use the debt payoff calculator when you hold several balances at once — it orders them avalanche (highest rate first, cheapest) or snowball (smallest balance first, fastest wins) and shows both payoff dates."
      }
      intro={[
        "Every loan is sold as a monthly payment and priced as a total. A $28,000 car loan at 8.5% costs $494 a month over 72 months and $7,550 in interest; over 48 months the payment rises to $690 but interest falls to $5,130. Term length is the most expensive choice in any loan, and it is the one adjusted first in a sales conversation. These calculators put the total back next to the payment, where the decision is made.",
        "Fees are the second place loans hide cost. An origination fee, dealer add-ons or financed insurance raise the amount borrowed without raising the amount received — which is why APR exists: it folds fees into a single annual rate so two offers can be compared honestly. The APR calculator shows the gap between the nominal rate on the advertisement and the rate you effectively pay.",
        "For existing debt, the order of attack matters less than starting, but it is not free: on typical card balances the avalanche order saves hundreds to thousands over the snowball order, while the snowball clears individual debts sooner. The payoff calculator runs both on your actual balances so the trade-off is a number, not an argument. If a consolidation loan is on the table, test it there too — a lower payment from a longer term is frequently a higher total, and the calculator shows both figures side by side.",
      ]}
      decisions={[
        { need: "Any loan, before signing", toolSlug: "loan-calculator", why: "shows payment, total interest and the full amortization schedule." },
        { need: "Comparing offers with different fees", toolSlug: "apr-calculator", why: "converts rate plus fees into one true APR." },
        { need: "Several debts at once", toolSlug: "debt-payoff-calculator", why: "orders them avalanche vs snowball with payoff dates for each." },
        { need: "Knowing what a lender will allow", toolSlug: "debt-to-income-ratio-calculator", why: "places your DTI against the thresholds lenders actually use." },
        { need: "A consolidation offer", toolSlug: "debt-consolidation-calculator", why: "tests whether combining debts saves money or just stretches it." },
      ]}
      faqs={[
        { question: "What is a good APR for a personal loan?", answer: "For strong credit, personal loan APRs have recently run around 8–12%; weaker credit can mean 25% or more. The right comparison is against your next alternative — a credit card at 24% makes a 15% loan a genuine saving." },
        { question: "Does extending the term ever make sense?", answer: "When the alternative is missing payments or holding more expensive debt, yes — cash flow first. But price the extension with the loan calculator so the extra interest is a decision, not a surprise." },
        { question: "Avalanche or snowball?", answer: "Avalanche (highest rate first) always costs less. Snowball (smallest balance first) clears debts sooner and keeps some people going. The payoff calculator shows both totals on your debts; the gap is often smaller than the cost of quitting either plan." },
      ]}
    />
  )
}
