import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Personal Wealth Calculators — FIRE, Retirement, Debt Payoff & Savings Tools",
  description: "Free personal wealth calculators: compound interest, Coast FIRE and FIRE numbers, 401(k) and Roth IRA projections, debt avalanche vs snowball payoff, credit card and student loan payoff, net worth and emergency funds.",
  keywords: ["personal finance calculators", "compound interest calculator", "coast fire calculator", "retirement calculator", "debt payoff calculator", "net worth calculator"],
  slug: "personal-wealth",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="personal-wealth"
      quickAnswer={"Personal wealth calculators project where your money is heading. Compound growth is balance \u00d7 (1 + return) compounded over time with regular contributions; your FIRE number is roughly 25\u00d7 annual spending; and debts fall fastest mathematically with the avalanche method (highest rate first), while the snowball method (smallest balance first) wins for motivation. Small rate and fee differences dominate every long-term result."}
      intro={[
      "Long-term wealth is decided by a handful of mechanics: how much you save, the return you earn, the interest you stop paying, and the tax wrappers you use. This hub gives each mechanic a proper model \u2014 retirement accounts with contribution limits and tax treatment, debt payoff simulated month by month under both major strategies, and savings tools that show inflation quietly taxing idle cash.",
      "If debt comes first, run the avalanche vs snowball comparison and the credit card and student loan payoff tools to get a debt-free date. Then build the base: an emergency fund sized to your life, and a net worth statement you can re-measure quarterly. Investors can project compound growth, test a Roth conversion, compare Fat and Lean FIRE targets, and find the Coast FIRE point where contributions can stop and compounding finishes the job.",
      "All projections are estimates based on the returns and rates you enter \u2014 markets do not move in straight lines. The tools show their formulas and scenario tables precisely so you can test pessimistic assumptions, not just hopeful ones. Nothing here is personal financial advice; use the numbers to plan and to have better conversations with a qualified adviser."
]}
      decisions={[
      {
            "need": "Getting out of debt",
            "toolSlug": "debt-avalanche-vs-snowball-calculator",
            "why": "simulates both strategies on your real balances."
      },
      {
            "need": "Seeing compound growth",
            "toolSlug": "compound-interest-scaler-calculator",
            "why": "projects savings with monthly contributions over decades."
      },
      {
            "need": "Planning early retirement",
            "toolSlug": "coast-fire-calculator",
            "why": "finds when you can stop contributing and let growth finish."
      },
      {
            "need": "Choosing retirement accounts",
            "toolSlug": "401k-vs-solo-401k-calculator",
            "why": "compares contribution room for employees and the self-employed."
      },
      {
            "need": "Knowing where you stand",
            "toolSlug": "net-worth-tracker",
            "why": "assets minus liabilities, broken down clearly."
      }
]}
      faqs={[
      {
            "question": "How much do I need to retire?",
            "answer": "A common starting point is 25\u00d7 your annual spending (the 4% rule). The FIRE calculators personalise this with your spending, savings rate and expected return, and Coast FIRE shows an earlier milestone on the way."
      },
      {
            "question": "Avalanche or snowball for debt payoff?",
            "answer": "Avalanche (highest interest first) always costs less; snowball (smallest balance first) often keeps people going longer. The comparison tool shows the exact cost difference on your debts so you can choose with open eyes."
      },
      {
            "question": "Are the retirement limits current?",
            "answer": "Retirement tools reference current IRS contribution limits and note where catch-up contributions apply. Limits change most years \u2014 the tools flag the year they use, and you should confirm with the IRS before contributing."
      },
      {
            "question": "Is this financial advice?",
            "answer": "No. These are educational calculators and estimates, not personal financial advice. See our Disclaimer page and consult a qualified professional for decisions about your own situation."
      }
]}
    />
  )
}
