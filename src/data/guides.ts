/**
 * Editorial guides — long-form, researched content written in the site voice
 * (see TONE-OF-VOICE.md: professional, direct, concrete numbers, no filler).
 * Each guide links to the calculators that act on it (internal linking is
 * deliberate: guide → tool → related guide). State and city guides live in
 * the programmatic routes under /guides/states and reuse the location data.
 */

export interface GuideSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  table?: { head: string[]; rows: string[][] }
}

export interface Guide {
  slug: string
  title: string
  /** Search-result title tag (SEL 3C rules, approved 2026-11-11). The on-page H1 stays `title`. */
  seoTitle: string
  description: string
  /** Featured image (public path) + its alt text — every guide carries one. */
  image: string
  imageAlt: string
  hub: string
  updated: string
  readMinutes: number
  relatedTools: { name: string; url: string }[]
  intro: string
  sections: GuideSection[]
  faqs: { question: string; answer: string }[]
}

export const GUIDES: Guide[] = [
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works (With Real Number Examples)",
    seoTitle: "How Compound Interest Works (With Real Number Examples)",
    description: "How compound interest works, with real numbers: the formula, why the early years matter most, and what fees and inflation change. Free calculator included.",
    image: "/images/how-compound-interest-works.jpg",
    imageAlt: "Illustration of compound growth: coins growing on an upward curve like a plant",
    hub: "Personal Finance",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Compound Interest Calculator", url: "/personal-wealth/compound-interest-scaler-calculator" },
      { name: "Interest Calculator", url: "/personal-wealth/interest-calculator" },
      { name: "Rule of 72 Calculator", url: "/personal-wealth/rule-of-72-calculator" },
    ],
    intro: "Compound interest is interest earned on interest. A balance grows slowly at first, then faster, because each year's earnings join the principal and earn their own return the year after. The effect is weak over months and decisive over decades, which is why the start date of a savings habit matters more than its size.",
    sections: [
      {
        heading: "The formula, in plain terms",
        paragraphs: [
          "The future value of a lump sum is A = P × (1 + r)^t, where P is the starting amount, r is the annual rate, and t is the number of years. $10,000 at 7% for 30 years becomes $10,000 × 1.07^30 = $76,123. You deposited $10,000; compounding supplied the other $66,123.",
          "Monthly contributions change the picture again. Saving $300 a month at 7% for 30 years means depositing $108,000 and ending near $365,000. More than two-thirds of the final balance is growth, not deposits. Shorten the period to 20 years and the same habit ends near $156,000 — the last decade does most of the work, which is exactly why starting early beats saving more later.",
        ],
      },
      {
        heading: "Why the rate matters less than the calendar",
        paragraphs: [
          "The Rule of 72 gives the doubling time of money: divide 72 by the annual return. At 4%, money doubles in 18 years. At 8%, in 9 years. At 10%, in about 7. Over a 36-year horizon that is the difference between two doublings and five — a balance that ends 4 times larger versus 32 times larger, from the same deposit.",
          "Fees work in reverse. A 1% annual fee on a portfolio earning 8% does not reduce the outcome by 1%; over 30 years it removes roughly a quarter of the final balance, because every fee dollar also loses its own future compounding. Inflation does the same: at 3% inflation, a 7% nominal return is a 4% real return, and the real doubling time stretches from 10 years to 18.",
        ],
        bullets: [
          "Compare accounts by APY, which already includes compounding frequency.",
          "A higher rate compounded monthly beats the same rate compounded yearly, by a small margin.",
          "What matters most, in order: years invested, total contributed, rate, fees.",
        ],
      },
      {
        heading: "Where compounding works against you",
        paragraphs: [
          "Debt compounds with the same mathematics. A credit card balance at 24% APR doubles in about three years if no payment touches the principal. Minimum payments are set low precisely so the balance survives long enough to compound in the lender's favour. The same curve that builds savings quietly is the one that makes revolving debt so hard to escape.",
        ],
      },
    ],
    faqs: [
      { question: "How often is interest compounded?", answer: "It depends on the account: savings accounts usually compound daily or monthly, bonds pay semi-annually, and most investment returns are quoted as annual figures. More frequent compounding produces a slightly higher effective yield, which is what APY measures." },
      { question: "Is compound interest guaranteed?", answer: "On deposit accounts, yes, at the stated APY. On investments, no — returns vary year by year, and compounding applies to whatever return actually occurs, including negative years." },
    ],
  },
  {
    slug: "how-to-build-an-emergency-fund",
    title: "How to Build an Emergency Fund (How Much You Actually Need)",
    seoTitle: "How to Build an Emergency Fund (How Much You Actually Need)",
    description: "How to build an emergency fund: how much you actually need, where to keep it, and the order to build it in — without derailing your other goals.",
    image: "/images/how-to-build-an-emergency-fund.jpg",
    imageAlt: "Illustration of an emergency fund: stacked coins sheltered under an umbrella",
    hub: "Personal Finance",
    updated: "2026-11-06",
    readMinutes: 5,
    relatedTools: [
      { name: "Emergency Fund Visualizer", url: "/personal-wealth/emergency-fund-visualizer" },
      { name: "High-Yield Savings Calculator", url: "/personal-wealth/high-yield-savings-calculator" },
      { name: "Savings Goal Calculator", url: "/personal-wealth/savings-goal-calculator" },
    ],
    intro: "An emergency fund is cash set aside for the expenses that arrive uninvited: a job loss, a car repair, a medical bill. Its job is not to earn a return. Its job is to keep a bad month from becoming credit card debt at 24% APR.",
    sections: [
      {
        heading: "How much is enough",
        paragraphs: [
          "The standard target is three to six months of essential spending — not income, spending, and only the essentials: housing, utilities, food, insurance, minimum debt payments, transport. A household spending $3,800 a month on essentials needs $11,400 to $22,800. One month of essentials is a sensible first milestone; it already covers the most common emergencies, which are repairs and bills rather than job losses.",
          "Lean toward six months or more if your income is variable (freelance, commission, seasonal work), if you are the only earner, or if your job would take a long time to replace. Lean toward three if you have two stable incomes and low fixed costs. Self-employed workers should also hold a separate tax buffer — estimated taxes are a known bill, not an emergency.",
        ],
      },
      {
        heading: "Where to hold it",
        paragraphs: [
          "Keep the fund in a separate high-yield savings account: same-day or next-day access, FDIC insurance up to $250,000, and a yield that at least roughly tracks inflation. Separation matters more than yield — money sitting in the everyday checking account gets spent by drift. Do not invest the emergency fund in stocks or crypto; the emergency and the market drop often arrive together.",
        ],
        bullets: [
          "Starter goal: $1,000, then one month of essentials.",
          "Automate a transfer for the day after payday, even if it is small.",
          "Replenish the fund first after any withdrawal, before extra investing.",
          "Review the target once a year or after any income change.",
        ],
      },
    ],
    faqs: [
      { question: "Should I pay off debt or build the fund first?", answer: "Build a starter fund of about one month of essentials first, then attack high-interest debt, then complete the fund. Without any buffer, the next surprise goes straight back onto the card you just paid off." },
      { question: "Is a credit card an emergency fund?", answer: "No. It is borrowed money at a high rate, available exactly as long as the issuer chooses to keep the account open — which may not include the month you lose your income." },
    ],
  },
  {
    slug: "50-30-20-rule-explained",
    title: "What Is the 50/30/20 Rule? Budget Breakdown With Examples",
    seoTitle: "What Is the 50/30/20 Rule? Budget Breakdown With Examples",
    description: "What is the 50/30/20 rule? What it gets right, where it breaks in expensive cities, and how to adapt the percentages to your actual rent.",
    image: "/images/50-30-20-rule-explained.jpg",
    imageAlt: "Illustration of the 50/30/20 budget rule as a three-part circle chart",
    hub: "Personal Finance",
    updated: "2026-11-06",
    readMinutes: 5,
    relatedTools: [
      { name: "50/30/20 Budget Calculator", url: "/personal-wealth/50-30-20-budget-calculator" },
      { name: "Budget Calculator", url: "/personal-wealth/budget-calculator" },
    ],
    intro: "The 50/30/20 rule splits after-tax income into three buckets: 50% for needs, 30% for wants, 20% for savings and debt payoff. It is popular because it is memorable, not because the percentages are magic. Used as a diagnostic rather than a law, it shows quickly which bucket is out of line — and it is almost always housing.",
    sections: [
      {
        heading: "What counts where",
        paragraphs: [
          "Needs are the bills that continue whether you are careful or not: rent or mortgage, utilities, groceries, insurance, minimum loan payments, essential transport. Wants are everything that makes life better but optional: eating out, travel, streaming, the upgraded version of anything. Savings includes retirement contributions, emergency fund deposits and extra debt payments above the minimum.",
          "On a $4,500 monthly take-home, the rule suggests $2,250 needs, $1,350 wants and $900 saved. If your rent alone is $2,100, the needs bucket is blown before food — the rule is not telling you that you are irresponsible; it is telling you the ratio cannot survive your housing cost, and no amount of skipping coffee closes a gap that size.",
        ],
      },
      {
        heading: "Adapting the rule",
        paragraphs: [
          "In high-cost cities, a 60/25/15 or even 70/20/10 split is common while income grows. The part worth protecting is the savings bucket, because it is the only one that changes your future options. If savings is at zero, the honest fix order is: cut wants that are not actually enjoyed, then renegotiate needs (insurance, phone, subscriptions, refinancing), then grow income. Guilt is not a strategy; arithmetic is.",
        ],
        bullets: [
          "Run the rule on take-home pay, not gross salary.",
          "Count employer retirement contributions toward the 20% if you want the full picture.",
          "Re-run it after any move, raise or new loan — the buckets drift.",
        ],
      },
    ],
    faqs: [
      { question: "Does the 20% include debt payments?", answer: "Minimum payments sit in needs. Extra payments above the minimum count toward the 20%, along with savings and investing." },
      { question: "What if my needs are 70%?", answer: "Then the rule has done its job: it located the problem. Work with 70/20/10 temporarily and treat reducing fixed costs or raising income as the main project." },
    ],
  },
]
GUIDES.push(
  {
    slug: "how-mortgage-amortization-works",
    title: "Mortgage Amortization Explained: How Your Payments Are Split",
    seoTitle: "Mortgage Amortization Explained: How Your Payments Are Split",
    description: "How mortgage amortization works: why early payments are mostly interest, how the schedule shifts over time, and what extra payments actually change.",
    image: "/images/how-mortgage-amortization-works.jpg",
    imageAlt: "Illustration of mortgage amortization: payment blocks shifting colour over time in front of a house",
    hub: "Mortgage & Real Estate",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Mortgage Calculator", url: "/real-estate/mortgage-amortization-calculator" },
      { name: "Mortgage Payoff Calculator", url: "/real-estate/mortgage-payoff-calculator" },
      { name: "Mortgage Payment Calculator", url: "/real-estate/mortgage-payment-calculator" },
    ],
    intro: "A mortgage payment looks level, but its composition is not. In the first years most of each payment is interest; in the last years most is principal. That split — the amortization schedule — decides how much equity you build, how much interest you pay, and why extra payments early in the loan are worth far more than the same payments later.",
    sections: [
      {
        heading: "The schedule, in numbers",
        paragraphs: [
          "Take a $400,000 loan at 6.5% for 30 years. The payment is $2,528 a month. The first payment sends $2,167 to interest and $362 to principal. After 10 years the balance is still about $354,000 — you have paid $303,000 and reduced the debt by $46,000. Half the loan is repaid only around year 19. Total interest over the full term: roughly $510,000, more than the house cost.",
          "This is not a trick by the lender; it is arithmetic. Interest each month is the current balance times the monthly rate. A large balance charges large interest, leaving little of a fixed payment for principal. As the balance falls, the interest share falls with it, and the same payment retires more debt. The schedule is front-loaded because the balance is.",
        ],
      },
      {
        heading: "What extra payments change",
        paragraphs: [
          "An extra $200 a month on that loan pays it off about 5 years early and saves roughly $113,000 of interest. Extra payments work because every dollar goes entirely to principal, and a dollar of principal removed in year 2 would otherwise have charged interest for the remaining 28 years. The same $200 started in year 20 saves a fraction as much. If you plan to prepay, earlier is worth more — but keep the emergency fund and higher-interest debt ahead of the mortgage in the queue.",
        ],
        bullets: [
          "Biweekly half-payments equal one extra payment a year — worth about 4–5 years off a 30-year loan at typical rates.",
          "A lump sum (bonus, tax refund) applied to principal has the same effect as many small extras.",
          "Check for prepayment penalties before sending large extras; they are uncommon on modern US mortgages but exist.",
        ],
      },
    ],
    faqs: [
      { question: "Does a shorter term or extra payments save more?", answer: "A 15-year term usually carries a lower rate and forces faster payoff, saving the most interest — but it commits you to the higher payment. Extra payments on a 30-year loan save slightly less yet stay optional in a hard month." },
      { question: "Why is my payoff amount higher than my balance?", answer: "The payoff figure adds interest accrued since the last statement and any fees. The balance is the principal only." },
    ],
  },
  {
    slug: "how-much-house-can-i-afford",
    title: "How Much House Can You Actually Afford? (28/36 Rule Explained)",
    seoTitle: "How Much House Can You Actually Afford? (28/36 Rule Explained)",
    description: "How much house can you afford? The 28/36 rule lenders use, why the bank's maximum is not your budget, and the costs listings never show.",
    image: "/images/how-much-house-can-i-afford.jpg",
    imageAlt: "Illustration of home affordability: a house with a price tag and magnifier",
    hub: "Mortgage & Real Estate",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Home Affordability Calculator", url: "/real-estate/home-affordability-calculator" },
      { name: "Down Payment Calculator", url: "/real-estate/down-payment-calculator" },
      { name: "Closing Cost Calculator", url: "/real-estate/closing-cost-calculator" },
    ],
    intro: "Lenders approve a payment, not a lifestyle. The maximum a bank will offer is set by its risk rules, and it routinely exceeds what a household can carry while still saving, eating out occasionally and sleeping well. Affordability has two answers — the lender's and yours — and the smaller one is the right one.",
    sections: [
      {
        heading: "The lender's arithmetic: 28/36",
        paragraphs: [
          "Most lenders cap housing costs (principal, interest, property tax, insurance, HOA) at about 28% of gross monthly income, and total debt payments at about 36–43%. On $110,000 a year, 28% is $2,567 a month for housing. At 6.5% with typical tax and insurance, that supports a loan near $330,000 — a home around $390,000–$410,000 with 15–20% down. Existing car and card payments eat the same 36% bucket and reduce the house budget directly.",
        ],
      },
      {
        heading: "Your arithmetic: the costs the listing hides",
        paragraphs: [
          "Ownership adds costs renters never see: maintenance and repairs run about 1% of the home's value per year on average — $4,000 on a $400,000 home, arriving in lumps (a roof, a furnace). Property tax and insurance rise over time. Buying itself costs 2–5% in closing costs, and selling costs 5–6% in commissions, which is why moving within three years usually loses money. A payment that leaves no room for a savings rate of at least 10% and a maintenance reserve is not affordable, whatever the approval letter says.",
        ],
        bullets: [
          "Keep total housing cost (PITI + HOA) under roughly 25–28% of gross income to leave savings room.",
          "Budget 1% of value per year for maintenance from day one, in a separate account.",
          "Under 20% down usually means PMI — about 0.5–1% of the loan per year until you reach 20% equity.",
        ],
      },
    ],
    faqs: [
      { question: "Should I use my full pre-approval amount?", answer: "Treat it as a ceiling set by the lender's risk model, not a target. Buy at the price where the total monthly cost still fits your savings plan." },
      { question: "Does a bigger down payment change affordability?", answer: "Yes: it shrinks the loan, the payment and total interest, and removes PMI at 20%. It does not change the maintenance, tax and insurance costs of the same house." },
    ],
  },
  {
    slug: "avalanche-vs-snowball-debt-payoff",
    title: "Debt Avalanche vs Snowball: Which Payoff Method Saves More?",
    seoTitle: "Debt Avalanche vs Snowball: Which Payoff Method Saves More?",
    description: "Debt avalanche vs snowball: avalanche saves the most interest, snowball clears debts fastest. The maths, the trade-off, and how to choose yours.",
    image: "/images/avalanche-vs-snowball-debt-payoff.jpg",
    imageAlt: "Illustration of debt payoff methods: an avalanche slope and a rolling snowball clearing debt blocks",
    hub: "Loans & Debt",
    updated: "2026-11-06",
    readMinutes: 5,
    relatedTools: [
      { name: "Debt Payoff Calculator", url: "/loans/debt-payoff-calculator" },
      { name: "Credit Card Calculator", url: "/loans/credit-card-calculator" },
      { name: "Debt Consolidation Calculator", url: "/loans/debt-consolidation-calculator" },
    ],
    intro: "Once minimums are covered, any extra money can attack debts in two orders. The avalanche pays the highest interest rate first. The snowball pays the smallest balance first. One is better arithmetic; the other is better psychology. The difference in cost is usually smaller than people expect — and far smaller than the cost of quitting.",
    sections: [
      {
        heading: "A worked comparison",
        paragraphs: [
          "Three debts: a $900 card at 26%, a $4,000 card at 21%, and a $9,500 loan at 9%, with $650 a month total to pay them. Snowball clears the $900 card in about two months — a quick win — then rolls its payment into the next. Avalanche starts on the same $900 card here (it is also the most expensive), then takes the 21% card before the 9% loan. In this example avalanche saves a few hundred dollars and about a month. When the smallest debt is also the cheapest, the gap widens; when rates are close, it nearly vanishes.",
          "The real variable is adherence. A plan followed for 18 months beats a theoretically better plan abandoned in month four. If quick wins keep you going, the snowball's modest extra interest is a fair price for finishing. If you are motivated by the numbers themselves, avalanche is strictly better. Either way, the plan fails without a small emergency buffer — one surprise expense on a cleared card restarts the cycle.",
        ],
        bullets: [
          "Always pay every minimum first; missed payments cost more than any ordering saves.",
          "Automate the extra payment for payday so the plan does not depend on willpower.",
          "Stop adding to the cards while paying them off — new charges refill the hole.",
        ],
      },
    ],
    faqs: [
      { question: "Can I mix both methods?", answer: "Yes. A common hybrid: clear one small debt for momentum, then switch to avalanche for the rest. The maths cost is small and the motivation is real." },
      { question: "Does the order affect my credit score?", answer: "Barely. Scores respond to balances falling and payments being on time, not to the order you chose." },
    ],
  },
  {
    slug: "how-credit-card-interest-works",
    title: "How Credit Card Interest Is Calculated (APR Explained)",
    seoTitle: "How Credit Card Interest Is Calculated (APR Explained)",
    description: "How credit card interest is calculated: average daily balance, grace periods, and why minimum payments keep you in debt — with the numbers statements hide.",
    image: "/images/how-credit-card-interest-works.jpg",
    imageAlt: "Illustration of credit card interest: a card with a circular percentage motif",
    hub: "Loans & Debt",
    updated: "2026-11-06",
    readMinutes: 5,
    relatedTools: [
      { name: "Credit Card Calculator", url: "/loans/credit-card-calculator" },
      { name: "Credit Card Payoff Calculator", url: "/personal-wealth/credit-card-payoff-calculator" },
      { name: "APR Calculator", url: "/loans/apr-calculator" },
    ],
    intro: "Credit card interest is not charged on what you spent. It is charged on your average daily balance, at a daily rate derived from an APR that now averages above 20% — and the grace period that protects new purchases disappears the moment you carry any balance at all.",
    sections: [
      {
        heading: "The mechanics",
        paragraphs: [
          "Issuers divide the APR by 365 to get a daily rate — 24% APR becomes 0.0658% per day — and apply it to the average of each day's balance across the cycle. On a steady $5,000 balance that is about $100 a month, $1,200 a year, for borrowing money you already spent. Pay in full every month and the grace period means you pay none of it. Carry even $50 past the due date and interest accrues on new purchases from the day they post, on most cards.",
          "Minimum payments are typically the interest plus about 1% of the balance, or a small fixed floor. On that $5,000 balance at 24%, paying only the minimum takes roughly 18 years and costs about $6,800 in interest — more than the original spending. A fixed $200 payment instead clears it in about 32 months with roughly $1,750 of interest. Same card, same balance; the payment rule is the whole difference.",
        ],
        bullets: [
          "Interest is calculated on average daily balance, not the statement balance.",
          "Cash advances and balance transfers often have separate, higher APRs and no grace period.",
          "Two payments a month (splitting payday) slightly reduces the average daily balance.",
        ],
      },
    ],
    faqs: [
      { question: "Why did I pay interest in a month I paid the statement balance?", answer: "Trailing interest: interest accrued between the statement date and the day your payment posted. It appears on the next statement even after the balance is cleared." },
      { question: "Does a 0% balance transfer help?", answer: "It pauses interest for the promo window, minus a 3–5% transfer fee. It helps if the balance is gone before the window closes; whatever remains then reverts to the standard APR." },
    ],
  },
)
GUIDES.push(
  {
    slug: "how-federal-income-tax-brackets-work",
    title: "How Federal Income Tax Brackets Work in 2026 (With Examples)",
    seoTitle: "How Federal Income Tax Brackets Work in 2026 (With Examples)",
    description: "How tax brackets work: marginal vs effective rates explained with a worked example — and what actually happens when a raise moves you up a bracket.",
    image: "/images/how-federal-income-tax-brackets-work.jpg",
    imageAlt: "Illustration of tax brackets as ascending emerald steps with a gold coin on each",
    hub: "Salary, Tax, Retirement & Investing",
    updated: "2026-11-06",
    readMinutes: 5,
    relatedTools: [
      { name: "Income Tax Calculator", url: "/tax/income-tax-calculator" },
      { name: "Tax Calculator", url: "/tax/tax-calculator" },
      { name: "Take-Home Pay Calculator", url: "/tax/take-home-pay-calculator" },
    ],
    intro: "The most persistent myth in personal tax is that moving into a higher bracket taxes all your income at the higher rate. It does not. Each bracket taxes only the slice of income inside it. A raise is never a pay cut via federal income tax — the maths below shows why.",
    sections: [
      {
        heading: "A worked example (2026, single filer)",
        paragraphs: [
          "The standard deduction comes off first: $16,100 for a single filer in 2026. On an $85,000 salary, taxable income is $68,900. Tax is then built in slices: 10% on the first $11,925 ($1,193), 12% on the next slice up to $48,475 ($4,386), and 22% on the remainder up to $68,900 ($4,494). Total federal income tax: about $10,072 — an effective rate of 11.8% of gross pay, even though the marginal bracket is 22%.",
          "Now add a $5,000 raise. Only the new $5,000 is taxed at 22% ($1,100); the rest of the income is taxed exactly as before. You keep $3,900 of the raise before FICA and state tax. The marginal rate is the price of the next dollar; the effective rate is what you actually pay on average. Confusing the two leads people to refuse overtime, fear bonuses and misjudge job offers.",
        ],
        bullets: [
          "Withholding is an estimate settled at filing — a refund means you overpaid during the year, not that you were taxed less.",
          "Pre-tax 401(k) and HSA contributions reduce taxable income in the top slice first — they save tax at your marginal rate.",
          "FICA (Social Security + Medicare, 7.65%) applies on top of income tax and is mostly flat, with a Social Security wage cap.",
        ],
      },
    ],
    faqs: [
      { question: "Why is my bonus withheld at a higher rate?", answer: "Bonuses are often withheld at a flat 22% supplemental rate. That is withholding, not the tax itself — it settles to your real marginal rate when you file." },
      { question: "Do state taxes use brackets too?", answer: "Most do, with their own rates and deductions; a few states use a flat rate and nine levy no tax on wages at all. Your state guide covers the structure where you live." },
    ],
  },
  {
    slug: "how-to-read-your-paycheck",
    title: "How to Read Your Paycheck (Pay Stub): Deductions Explained",
    seoTitle: "How to Read Your Paycheck (Pay Stub): Deductions Explained",
    description: "How to read your paycheck: gross pay, FICA, withholding and every deduction line explained — plus two mistakes worth checking every year.",
    image: "/images/how-to-read-your-paycheck.jpg",
    imageAlt: "Illustration of a paycheck: a payslip with neat rows, a magnifier and a coin stack",
    hub: "Salary, Tax, Retirement & Investing",
    updated: "2026-11-06",
    readMinutes: 5,
    relatedTools: [
      { name: "Paycheck Calculator", url: "/tax/paycheck-calculator" },
      { name: "Salary Calculator", url: "/tax/salary-calculator" },
      { name: "Overtime Calculator", url: "/tax/overtime-calculator" },
    ],
    intro: "A pay stub is a small financial statement. Between gross pay and the deposit, four things leave: pre-tax deductions, federal withholding, FICA, and state/local tax — in that order, and the order matters because each step shrinks the base the next one taxes.",
    sections: [
      {
        heading: "The order money leaves",
        paragraphs: [
          "Start with gross pay. Pre-tax deductions come out first: traditional 401(k) contributions, health premiums and HSA/FSA contributions. These reduce the income the IRS taxes, which is why a 6% 401(k) contribution on a $70,000 salary removes $4,200 from taxable wages, not just from your deposit. Federal withholding is then estimated from the W-4 you filed, using the bracket system. FICA follows: 6.2% Social Security up to the annual wage cap plus 1.45% Medicare, matched by your employer. State and local taxes come last, where they exist.",
          "Two checks are worth doing annually. First, whether your withholding roughly matches your actual tax — a large refund every year is an interest-free loan you can redirect by adjusting your W-4. Second, whether your year-to-date Social Security wages stop at the cap; payroll errors do happen, and excess FICA is only recoverable at filing.",
        ],
        bullets: [
          "Roth 401(k) contributions are post-tax: they do not reduce this year's taxable wages.",
          "Garnishments, union dues and after-tax benefits appear after taxes — read them separately from tax lines.",
          "Your final stub of the year is the draft of your W-2; discrepancies are easiest to fix in January.",
        ],
      },
    ],
    faqs: [
      { question: "Why did my take-home change in January?", answer: "Common causes: new benefit premiums, a reset of the Social Security wage base, updated tax tables, or a fresh 401(k) election. Compare line by line against the last stub of the old year." },
      { question: "What is the difference between gross and taxable wages?", answer: "Taxable wages are gross minus pre-tax deductions. The gap between them is why two people on the same salary can owe different tax." },
    ],
  },
  {
    slug: "roth-vs-traditional-ira",
    title: "Roth vs Traditional IRA: Which Is Better for Your Taxes?",
    seoTitle: "Roth vs Traditional IRA: Which Is Better for Your Taxes?",
    description: "Roth vs traditional IRA: both shelter growth, so the choice is when you pay tax — a bet on your current bracket vs your retirement bracket. How to decide.",
    image: "/images/roth-vs-traditional-ira.jpg",
    imageAlt: "Illustration of Roth vs Traditional IRA: two plant pots on a balance, one in sun and one in shade",
    hub: "Salary, Tax, Retirement & Investing",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Roth IRA Calculator", url: "/personal-wealth/roth-ira-calculator" },
      { name: "IRA Calculator", url: "/personal-wealth/ira-calculator" },
      { name: "Retirement Calculator", url: "/personal-wealth/retirement-calculator" },
    ],
    intro: "A traditional IRA deducts contributions now and taxes withdrawals later. A Roth IRA taxes contributions now and never taxes qualified withdrawals. If your tax rate is the same on both ends, the outcomes are identical to the dollar. The entire decision is a comparison of two tax rates — today's and retirement's — plus a few rules that break the tie.",
    sections: [
      {
        heading: "The maths of the tie",
        paragraphs: [
          "Contribute $7,500 at a 22% bracket. Traditional: the full $7,500 goes in (saving $1,650 of tax now), grows for 30 years at 7% to about $57,100, and is taxed at withdrawal. At 22%, you keep $44,500. Roth: you pay the $1,650 now, contribute $5,850 of after-tax money... to compare fairly, invest the same total outlay — $7,500 of earnings. After tax, $5,850 goes into the Roth and grows to about $44,500, tax-free. Identical. Change the retirement bracket to 12% and traditional wins; change it to 32% and Roth wins by a wide margin.",
          "Most early-career savers are in the 12% or 22% bracket with decades of raises ahead — Roth contributions at a known, low rate are usually the better bet. Peak-earning years in the 32%+ brackets favour traditional deductions. Many households end up holding both, which creates tax diversification: in retirement you can choose which account funds each year, managing brackets year by year.",
        ],
        bullets: [
          "2026 contribution limit: $7,500 under 50; $8,600 at 50+. Verify current limits with the IRS before contributing.",
          "Roth contributions (not earnings) can be withdrawn any time without tax or penalty — a flexibility traditional IRAs do not offer.",
          "Traditional IRAs force required minimum distributions in your 70s; Roth IRAs do not for the original owner.",
          "Roth income limits can be worked around via the backdoor Roth — a conversion with paperwork that must be done correctly.",
        ],
      },
    ],
    faqs: [
      { question: "Can I convert a traditional IRA to a Roth?", answer: "Yes — a Roth conversion. The converted amount is taxed as income in the conversion year, so conversions are cheapest in low-income years, such as early retirement before Social Security starts." },
      { question: "Which is better if I expect tax rates to rise generally?", answer: "Rising future rates favour the Roth: you lock in today's lower rate and future withdrawals are insulated from whatever Congress does next." },
    ],
  },
  {
    slug: "self-employment-tax-explained",
    title: "Self-Employment Tax 2026: Rate, Deductions & How It Works",
    seoTitle: "Self-Employment Tax 2026: Rate, Deductions & How It Works",
    description: "Self-employment tax explained: the 15.3% rate, the 92.35% rule, the deduction most freelancers miss, and how quarterly payments actually work.",
    image: "/images/self-employment-tax-explained.jpg",
    imageAlt: "Illustration of self-employment: a laptop, briefcase and coin gears on a desk",
    hub: "Freelance & Business",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Self-Employment Tax Calculator", url: "/freelance/self-employment-tax-calculator" },
      { name: "1099 Tax Calculator", url: "/freelance/1099-tax-calculator" },
      { name: "Quarterly Estimated Tax Calculator", url: "/freelance/quarterly-estimated-tax-calculator" },
    ],
    intro: "Employees split Social Security and Medicare taxes with their employer, 7.65% each. The self-employed pay both halves: 15.3% self-employment tax on top of ordinary income tax. It is the tax that surprises every new freelancer in their first April, and it is entirely predictable once you know the three rules that govern it.",
    sections: [
      {
        heading: "The three rules",
        paragraphs: [
          "First, the tax applies to net earnings, not gross receipts: business expenses come off before the 15.3% is calculated. Second, only 92.35% of net earnings is subject to the tax — a rough allowance for the employer half you are also paying. Third, you may deduct half of the self-employment tax from your income tax calculation. On $80,000 of net freelance income: the taxable base is $73,880, SE tax is about $11,303, and roughly $5,652 of that is deducted against income tax.",
          "The Social Security part (12.4%) stops at the annual wage cap; the Medicare part (2.9%) does not, and an additional 0.9% Medicare tax applies at higher incomes. Income tax is separate and additional — a freelancer in the 22% bracket with no deductions beyond the standard one often owes a combined effective rate near 30% of net income. Setting aside 25–30% of every payment, in a separate account, is the habit that makes April boring.",
        ],
        bullets: [
          "Estimated taxes are due quarterly (mid-April, June, September, January); underpayment penalties apply even if you pay in full by filing.",
          "An S-corp election can reduce SE tax by splitting income into salary (taxed) and distributions (not SE-taxed) — worthwhile usually above ~$80–100k of net profit, after accounting costs.",
          "Retirement contributions (SEP-IRA, Solo 401(k)) reduce income tax but not SE tax; business expenses reduce both.",
        ],
      },
    ],
    faqs: [
      { question: "Do I pay SE tax if freelancing is a side income?", answer: "Yes, on net self-employment income above $400 a year — and any W-2 wages you also earn count toward the Social Security wage cap first." },
      { question: "What counts as a business expense?", answer: "Costs that are ordinary and necessary for the work: software, equipment, home office, professional services, mileage. Keep records; the deduction is only as good as its documentation." },
    ],
  },
  {
    slug: "how-youtube-pays-creators",
    title: "How YouTube Pays Creators: CPM, RPM & Payout Rules Explained",
    seoTitle: "How YouTube Pays Creators: CPM, RPM & Payout Rules Explained",
    description: "How YouTube pays creators in 2026: CPM vs RPM, the 55% revenue share, why niches pay so differently, and what a million views is really worth.",
    image: "/images/how-youtube-pays-creators.jpg",
    imageAlt: "Illustration of YouTube earnings: a play button with rising coin bars",
    hub: "Creator & E-Commerce",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "YouTube Money Calculator", url: "/creator/youtube-adsense-estimator" },
      { name: "YouTube CPM / RPM Calculator", url: "/creator/youtube-cpm-calculator" },
      { name: "TikTok Earnings Calculator", url: "/creator/tiktok-creator-fund-calculator" },
    ],
    intro: "Creators quote earnings per thousand views, but two different numbers get mixed up. CPM is what advertisers pay for a thousand ad impressions. RPM is what the creator actually receives per thousand views, after YouTube's cut and after counting views that showed no ad at all. RPM is the only number that reaches a bank account.",
    sections: [
      {
        heading: "From advertiser money to creator money",
        paragraphs: [
          "Advertisers bid for placements; a finance video watched in the US might carry a $30–$50 CPM, while a general entertainment video might clear $4–$10. YouTube keeps 45% of ad revenue and pays the creator 55%. Then RPM dilutes further: not every view is monetised (ad blockers, no suitable ad, Premium views pay differently), so a $30 CPM commonly becomes a $10–$16 RPM. A million views at $12 RPM is $12,000 — a good month, and roughly what the headline CPM would have promised at $30,000 before the two haircuts.",
          "Niche is the largest lever because advertisers pay for the audience's buying intent. Personal finance, B2B software and insurance audiences are worth multiples of comedy or gaming audiences. Geography is second: a US viewer is worth several times a viewer in a lower-ad-spend market. Video length matters too — videos over 8 minutes can carry mid-roll ads, which is why long-form finance content compounds RPM advantages.",
        ],
        bullets: [
          "Partner Program threshold: 1,000 subscribers plus 4,000 public watch hours (or 10M Shorts views in 90 days).",
          "Shorts pay from a shared pool at far lower RPM — typically cents per thousand views, not dollars.",
          "Sponsorships, affiliates and products usually overtake AdSense once a channel passes ~50k subscribers in a commercial niche.",
        ],
      },
    ],
    faqs: [
      { question: "Why did my RPM drop in January?", answer: "Advertiser budgets reset after the holidays. Q4 RPMs are seasonally the highest of the year and Q1 the lowest, across nearly every niche." },
      { question: "Do Premium views pay?", answer: "Yes. A share of each Premium subscriber's fee is distributed by watch time. It is included in RPM but not visible as a separate CPM." },
    ],
  },
)
GUIDES.push(
  {
    slug: "rent-vs-buy-guide",
    title: "Renting vs Buying a Home: The Real Costs Compared (2026)",
    seoTitle: "Renting vs Buying a Home: The Real Costs Compared (2026)",
    description: "Renting vs buying a home: the real costs on both sides, the break-even point most people miss, and how to tell which choice wins for you.",
    image: "/images/rent-vs-buy-guide.jpg",
    imageAlt: "Illustration of renting vs buying: two doors, one with a key and one with a house roof, on a scale",
    hub: "Mortgage & Real Estate",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Rent vs Buy Calculator", url: "/real-estate/rent-vs-buy-calculator" },
      { name: "Home Affordability Calculator", url: "/real-estate/home-affordability-calculator" },
    ],
    intro: "\"Rent is throwing money away\" is a slogan, not an analysis. Both renting and owning have unrecoverable costs — money that buys no equity. Rent is one. On the ownership side: interest, property tax, insurance and maintenance are equally gone. The honest comparison lines those up, then asks how long you will stay.",
    sections: [
      {
        heading: "Unrecoverable costs, side by side",
        paragraphs: [
          "On a $450,000 home bought with 20% down at 6.5%, the first year's unrecoverable ownership costs are roughly: $23,000 interest, $5,400 property tax, $2,200 insurance, $4,500 maintenance — about $35,000 that builds no equity, against $31,000 of principal paid down... no: principal is the recoverable part, and in year one it is only about $7,000 of the payments. Compare renting the same home at $2,400 a month: $28,800 unrecoverable. In year one, renting is often cheaper than owning on a pure cost basis.",
          "Time reverses it. Rent rises with the market; a fixed mortgage payment does not, and its interest share shrinks every year while the principal share grows. Buying also carries roughly 2–5% in purchase costs and 5–6% in selling costs, which is why the break-even against renting usually sits between five and seven years. Stay two years and renting wins almost everywhere. Stay twelve and buying usually wins by a wide margin. The calculator exists because the answer is arithmetic, not ideology.",
        ],
        bullets: [
          "A useful shortcut: if the home's price is more than ~20x its annual rent, renting is usually cheaper; under ~15x, buying usually is.",
          "The down payment has an opportunity cost — it could have been invested. Honest comparisons charge the buyer for it.",
          "Job mobility has value. Buying sells flexibility; price that in if your career moves cities.",
        ],
      },
    ],
    faqs: [
      { question: "Does buying always build wealth faster?", answer: "Over long horizons, usually, because the mortgage forces saving and the asset is leveraged. Over short horizons, transaction costs and front-loaded interest routinely make it the worse choice." },
      { question: "What if rates fall after I buy?", answer: "Refinancing can capture lower rates, at a cost of roughly 0.5–1.5% of the loan. Renters capture falling rents only at lease renewal, and rents historically fall far less than rates." },
    ],
  },
  {
    slug: "how-to-price-freelance-work",
    title: "How to Price Freelance Work: Rates, Formulas & Real Examples",
    seoTitle: "How to Price Freelance Work: Rates, Formulas & Real Examples",
    description: "How to price freelance work from your costs up: the billable-hours reality, why hourly pricing caps your income, and how to move to project pricing.",
    image: "/images/how-to-price-freelance-work.jpg",
    imageAlt: "Illustration of freelance pricing: a price tag, a clock and a laptop in balance",
    hub: "Freelance & Business",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Freelance Hourly Rate Calculator", url: "/freelance/freelance-hourly-rate-calculator" },
      { name: "Project Pricing Calculator", url: "/freelance/freelance-project-pricing-calculator" },
      { name: "Billable Hours Calculator", url: "/freelance/billable-hours-calculator" },
    ],
    intro: "Most freelance rates are copied from a competitor's website or reverse-engineered from a salary by dividing by 2,000 hours. Both methods underprice. A sustainable rate starts from your costs — including the taxes and unpaid hours employment used to hide — and divides by the hours you can actually bill, which are far fewer than the hours you work.",
    sections: [
      {
        heading: "The billable-hours reality",
        paragraphs: [
          "A full-time year is 2,080 hours. Remove holidays, vacation and sick days and you are near 1,850. Remove sales calls, admin, invoicing and marketing — typically 30–40% of a solo practice — and billable time lands near 1,100–1,250 hours. To net what a $90,000 salary provides, after self-employment tax, benefits you now buy yourself (health insurance, retirement), software and a profit margin, the required billing is often near $130,000 — which at 1,150 billable hours is about $113 an hour. The common mistake of charging $45 (salary ÷ 2,000) quietly pays you half of what you intended.",
        ],
      },
      {
        heading: "From hourly to project pricing",
        paragraphs: [
          "Hourly pricing sells your time; project pricing sells an outcome, and it rewards the speed that experience brings. Price a project from the hourly floor, never below it: estimate hours honestly, multiply by your rate, then adjust for the value to the client and the risk you absorb (fixed price means overruns are yours). Add a rush premium rather than absorbing urgency for free. Raise rates for new clients first — existing clients follow at renewal — and expect the correct price to lose some enquiries. A 100% close rate is not success; it is evidence the price is too low.",
        ],
        bullets: [
          "Rebuild your rate whenever a major cost changes — taxes, insurance, rent.",
          "Track realised rate (project fee ÷ actual hours) after every project; it is the only honest measure.",
          "Deposits of 30–50% before starting are standard risk management, not rudeness.",
        ],
      },
    ],
    faqs: [
      { question: "Should I show my hourly rate publicly?", answer: "Publishing a rate filters enquiries and builds trust, but anchors negotiation. Many established freelancers publish a project minimum instead and keep the hourly maths private." },
      { question: "How do I raise rates with existing clients?", answer: "Give notice at a natural boundary (new project, new quarter), state the new rate plainly, and keep the tone brief. Clients who value the work adjust; the ones who leave free capacity for better-fit work." },
    ],
  },
  {
    slug: "etsy-and-ebay-fees-explained",
    title: "Etsy and eBay Fees Explained: 2026 Rates, Line by Line",
    seoTitle: "Etsy and eBay Fees Explained: 2026 Rates, Line by Line",
    description: "Etsy and eBay fees explained line by line: every charge on a typical sale, what they add up to, and how to price so the platform keeps less of your margin.",
    image: "/images/etsy-and-ebay-fees-explained.jpg",
    imageAlt: "Illustration of marketplace fees: an open parcel with coins dropping into separate jars",
    hub: "Creator & E-Commerce",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Etsy Fee Calculator", url: "/ecommerce/etsy-fee-calculator" },
      { name: "eBay Fee Calculator", url: "/ecommerce/ebay-fee-calculator" },
      { name: "Profit Margin Calculator", url: "/ecommerce/profit-margin-calculator" },
    ],
    intro: "Marketplace fees look small one at a time. Stacked on a single sale — listing, transaction percentage, payment processing, regulatory fees, promoted listings — they routinely take 12–20% of the sale price before shipping and materials. Pricing without the full stack is how busy shops end the month wondering where the money went.",
    sections: [
      {
        heading: "Etsy, on a $40 sale",
        paragraphs: [
          "Etsy charges a $0.20 listing fee (per item, renewing every four months), a 6.5% transaction fee on the total including shipping charged to the buyer, payment processing around 3% + $0.25, and a small regulatory fee that varies by country. On a $40 item with $5 shipping: transaction fee $2.93, processing about $1.60, listing $0.20 — roughly $4.75, or about 11% of what the buyer paid, before any Etsy Ads or Offsite Ads charges. Offsite Ads deserve attention: if a buyer arrives via one, Etsy takes an additional 12–15%, and sellers above a revenue threshold cannot opt out.",
        ],
      },
      {
        heading: "eBay, on the same sale",
        paragraphs: [
          "eBay's main charge is the final value fee: for most categories about 13.25% of the total amount of the sale (including shipping and tax where applicable) plus a per-order fee of $0.30–$0.40. On the same $45 total that is about $6.36 — roughly 14%. Promoted listings add whatever percentage you bid. eBay's stack is simpler but heavier at the base rate; Etsy's is lighter until advertising fees attach.",
        ],
        bullets: [
          "Price from net backwards: decide the margin you need after fees, then set the price that produces it.",
          "Shipping charges are fee-bearing on both platforms — 'free shipping' is a pricing decision, not an absence of cost.",
          "Recheck fee schedules quarterly; both platforms revise them and announce changes in seller updates.",
        ],
      },
    ],
    faqs: [
      { question: "Which platform is cheaper overall?", answer: "For an unpromoted sale, Etsy is usually cheaper. With Offsite Ads fees triggered, Etsy can exceed eBay. Your own fee mix — testable in the calculators — decides it for your products." },
      { question: "Are marketplace fees tax deductible?", answer: "Yes, for a business seller they are ordinary business expenses that reduce taxable profit. Keep the platform's fee reports with your records." },
    ],
  },
  {
    slug: "social-security-benefits-explained",
    title: "How Social Security Benefits Are Calculated: The Formula",
    seoTitle: "How Social Security Benefits Are Calculated: The Formula",
    description: "How Social Security benefits are calculated: your 35 best years, why claiming age moves the amount by 76%, and the spousal and tax rules that matter.",
    image: "/images/social-security-benefits-explained.jpg",
    imageAlt: "Illustration of Social Security: a shield with a rising sun and coin steps",
    hub: "Salary, Tax, Retirement & Investing",
    updated: "2026-11-06",
    readMinutes: 6,
    relatedTools: [
      { name: "Social Security Calculator", url: "/personal-wealth/social-security-calculator" },
      { name: "Retirement Calculator", url: "/personal-wealth/retirement-calculator" },
      { name: "RMD Calculator", url: "/personal-wealth/rmd-calculator" },
    ],
    intro: "Your Social Security benefit is not based on your last or best salary. It is built from your 35 highest-earning years, indexed for wage growth, run through a formula that replaces a larger share of income for lower earners — and then permanently adjusted up or down by the age at which you claim.",
    sections: [
      {
        heading: "The 35-year rule and the bend points",
        paragraphs: [
          "The SSA averages your best 35 years of indexed earnings into a monthly figure (AIME), then applies bend points: 90% of the first slice, 32% of the middle slice, 15% above that. That progressive formula is why the system replaces roughly 55% of income for a low earner and about 28% for a high earner. Work fewer than 35 years and the missing years enter as zeros — a 30-year career carries five zero years in the average, which is why late-career years of work sometimes replace early low or zero years and raise the benefit more than expected.",
        ],
      },
      {
        heading: "Claiming age: the 76% swing",
        paragraphs: [
          "Claiming at 62 instead of full retirement age (67 for those born in 1960 or later) cuts the benefit by about 30%, permanently. Waiting to 70 adds delayed retirement credits of 8% per year past full retirement age — a benefit about 76% larger than the age-62 amount. The break-even for waiting is typically the early-to-mid 80s: live past it and waiting wins by an increasing margin. Health, a spouse's benefit, and whether you keep working before full retirement age (the earnings test can temporarily withhold benefits) all belong in the decision — it is insurance against a long life more than an investment to maximise.",
        ],
        bullets: [
          "A spousal benefit can reach 50% of the worker's full-retirement amount; survivor benefits reach up to 100%.",
          "Benefits are taxable on up to 85% of the amount, depending on combined income.",
          "Check your earnings record at ssa.gov — unreported or mis-credited years directly cut the benefit.",
        ],
      },
    ],
    faqs: [
      { question: "Will Social Security run out?", answer: "Trust-fund projections show a shortfall in the mid-2030s that would cut scheduled benefits by roughly a fifth if Congress does nothing. Payroll taxes would still cover the majority of benefits — planning with a haircut is prudent, planning on zero is not supported by the projections." },
      { question: "Can I claim and keep working?", answer: "Yes. Before full retirement age, earning above the annual limit temporarily withholds $1 of benefits per $2 earned above it (the withheld amounts are credited back later). After full retirement age there is no limit." },
    ],
  },
  {
    slug: "how-va-loans-work",
    title: "How VA Loans Work (Funding Fee, Eligibility & Payments)",
    seoTitle: "How VA Loans Work (Funding Fee, Eligibility & Payments)",
    description: "How VA loans work: who qualifies, the funding fee table, what your payment includes, and how VA compares with FHA and conventional loans.",
    image: "/images/how-va-loans-work.jpg",
    imageAlt: "Illustration of a veteran receiving house keys in front of a home, with a VA loan document and a funding fee chart",
    hub: "Mortgage & Real Estate",
    updated: "2026-11-12",
    readMinutes: 7,
    relatedTools: [
      { name: "VA Loan Calculator", url: "/real-estate/va-loan-calculator" },
      { name: "Mortgage Payment Calculator", url: "/real-estate/mortgage-payment-calculator" },
      { name: "Home Affordability Calculator", url: "/real-estate/home-affordability-calculator" },
    ],
    intro: "A VA loan is a mortgage guaranteed by the Department of Veterans Affairs for eligible service members, veterans, and surviving spouses. The VA guarantee lets private lenders offer no down payment and no monthly mortgage insurance. Instead, most borrowers pay a one-time funding fee of 1.25% to 3.3% of the loan, which can be financed into the balance.",
    sections: [
      {
        heading: "Eligibility and the Certificate of Eligibility",
        paragraphs: [
          "You qualify through service: 90 consecutive days of active duty during wartime, 181 days during peacetime, or six years in the National Guard or Reserves. Surviving spouses of service members who died in service, or from a service-connected disability, also qualify. There is no minimum credit score set by the VA itself, though most lenders require around 620.",
          "Before you apply, you need a Certificate of Eligibility (COE), which confirms your service record and how much entitlement you have. Your lender can usually pull it from the VA's system in minutes; you can also apply on VA.gov or by mailing VA Form 26-1880. Entitlement is reusable: once a VA loan is paid off, usually by selling the home, your full entitlement is restored and you can use the benefit again.",
        ],
      },
      {
        heading: "The funding fee, tier by tier",
        paragraphs: [
          "The funding fee is the VA's one-time charge for guaranteeing the loan, and it replaces monthly mortgage insurance. The rate depends on your down payment and whether you have used a VA loan before. It is charged on the base loan amount — the price minus your down payment — not on the purchase price. These rates come from the VA funding fee table on VA.gov, effective April 7, 2023.",
          "Some borrowers pay nothing: you are exempt if you receive VA compensation for a service-connected disability, or would receive it but take retirement or active-duty pay instead; if you are a surviving spouse receiving Dependency and Indemnity Compensation (DIC); or if you are an active-duty service member who received a Purple Heart before closing. Everyone else can finance the fee into the loan — the only closing cost VA rules allow you to finance on a purchase — or pay it in cash at closing. A streamline refinance (IRRRL) carries a flat 0.5% fee.",
        ],
        table: {
          head: ["Down payment", "First use", "Subsequent use"],
          rows: [
            ["Less than 5%", "2.15%", "3.3%"],
            ["5% or more", "1.5%", "1.5%"],
            ["10% or more", "1.25%", "1.25%"],
          ],
        },
      },
      {
        heading: "What the monthly payment includes",
        paragraphs: [
          "A VA loan payment is principal and interest plus property tax and homeowners insurance, with HOA dues on top when they apply. There is no PMI line — VA loans never charge private mortgage insurance, and the funding fee is what takes its place. If you finance the fee, it joins the loan balance and adds to principal and interest every month for the whole term.",
          "The numbers show the trade. On a $375,000 home with no down payment, first use, 6.5% over 30 years, the 2.15% fee is $8,062.50 and the financed loan is $383,062.50. Principal and interest is $2,421.22 a month; with $4,125 a year of tax and $1,875 of insurance, the total payment is $2,921.22. Paying the fee in cash instead would cut the payment to $2,370.26 and save $10,283.10 of interest over the term.",
        ],
      },
      {
        heading: "VA vs FHA vs conventional",
        paragraphs: [
          "For eligible borrowers, VA usually wins on monthly cost: no down payment required, no monthly insurance premium, and rates that typically price below conventional. The main cost is the funding fee, and it is a one-time charge — unlike FHA's annual mortgage insurance premium of 0.55%, which lasts the life of the loan when you put less than 10% down, or conventional PMI at 0.3% to 1.5% a year until you reach 80% loan-to-value.",
          "VA is not always the cheapest route. A subsequent-use borrower putting nothing down pays a 3.3% fee — $12,375 on a $375,000 loan — while a conventional borrower with 20% down pays no PMI and no funding fee at all. And VA loans are for primary residences only, with a VA appraisal that can slow a purchase in a competitive market. If you have a large down payment and strong credit, run both options through the calculators before deciding.",
        ],
        table: {
          head: ["", "VA loan", "FHA loan", "Conventional loan"],
          rows: [
            ["Minimum down payment", "0%", "3.5% (580+ credit)", "3%"],
            ["Upfront fee", "1.25–3.3% funding fee", "1.75% upfront MIP", "None"],
            ["Monthly insurance", "None — no PMI, ever", "0.55%/yr MIP, life of loan below 10% down", "PMI 0.3–1.5%/yr below 20% down, cancellable at 80% LTV"],
            ["Who qualifies", "Veterans, service members, surviving spouses", "Any buyer meeting credit and DTI rules", "Any buyer meeting credit and DTI rules"],
          ],
        },
      },
    ],
    faqs: [
      { question: "Can I use a VA loan more than once?", answer: "Yes — there is no limit on how many times you can use the benefit. Once a VA loan is paid off, usually by selling the home, your full entitlement is restored. The cost of reuse is the subsequent-use funding fee: 3.3% with less than 5% down, versus 2.15% on first use. At 5% down both are 1.5%, and at 10% down both are 1.25%." },
      { question: "Is there a maximum loan amount on a VA loan?", answer: "The VA sets no maximum loan amount for borrowers with full entitlement. In practice, lenders cap no-down-payment VA loans at the conforming loan limit — $832,750 for a single-family home in most counties in 2026. Above that, the lender typically asks for a down payment on the amount over the limit." },
      { question: "How long does it take to get a Certificate of Eligibility?", answer: "Usually minutes. Most lenders can pull your COE from the VA's system while you apply. If the VA needs more documentation, applying online at VA.gov or by mailing VA Form 26-1880 takes longer — days to weeks — so it is worth requesting the COE before you start house hunting." },
      { question: "Can the seller pay my VA funding fee?", answer: "Yes, within limits. The VA allows sellers to offer credits toward closing costs, and a credit for the funding fee counts as a seller concession. Concessions are capped at 4% of the home's reasonable value, so on a $375,000 home the seller can contribute up to $15,000 toward your funding fee and other closing costs." },
    ],
  },
  {
    slug: "how-fha-loans-work",
    title: "How FHA Loans Work (MIP, Down Payment & Limits)",
    seoTitle: "How FHA Loans Work (MIP, Down Payment & Limits)",
    description: "How FHA loans work: the 3.5% down payment, the two MIP charges and how long they last, 2026 loan limits, and how FHA compares with conventional loans.",
    image: "/images/how-fha-loans-work.jpg",
    imageAlt: "Illustration of a first-time buyer receiving the keys to a modest house, with a small FHA shield emblem",
    hub: "Mortgage & Real Estate",
    updated: "2026-11-12",
    readMinutes: 7,
    relatedTools: [
      { name: "FHA Loan Calculator", url: "/real-estate/fha-loan-calculator" },
      { name: "Mortgage Payment Calculator", url: "/real-estate/mortgage-payment-calculator" },
      { name: "Down Payment Calculator", url: "/real-estate/down-payment-calculator" },
    ],
    intro: "An FHA loan is a mortgage insured by the Federal Housing Administration, which lets lenders accept a 3.5% down payment and credit scores from 580. In exchange, every borrower pays two mortgage insurance premiums: 1.75% of the loan upfront and an annual premium of 0.15% to 0.75%, which can run for the life of the loan.",
    sections: [
      {
        heading: "Who FHA loans are for, and the down payment rules",
        paragraphs: [
          "The FHA does not lend money itself. A private lender makes the loan, and the Federal Housing Administration — part of HUD — insures it, which is what lets the lender accept a small down payment and a lower credit score than a conventional loan would allow. The trade is mortgage insurance on every loan, with no exceptions.",
          "The minimum down payment is 3.5% with a credit score of 580 or higher, or 10% with a score of 500 to 579. Below 500, FHA-insured financing is not available. These are HUD's floors, not guarantees: individual lenders can set stricter minimums, and many do — a 620 score is a common lender overlay even though HUD allows 580.",
          "The home must be your primary residence. You have to move in within 60 days of closing and live there for at least a year, so FHA loans do not work for investment properties or second homes. The loan also has to fit your county's FHA limit, covered below.",
        ],
      },
      {
        heading: "The two MIP charges, and what they cost",
        paragraphs: [
          "Every FHA loan carries two separate insurance charges. The upfront mortgage insurance premium (UFMIP) is a one-time 1.75% of the base loan amount, charged at closing. Most buyers finance it into the loan, which raises the amount they pay interest on for the whole term: on a $337,750 base loan the UFMIP is $5,911, making the total loan $343,661.",
          "The monthly amount is not a flat rate times the original balance. HUD charges each year's premium on the average outstanding balance for that year, so the payment falls as the balance amortises. On a $350,000 home with 3.5% down at 6.5% over 30 years, year-1 monthly MIP is $157 at 0.55%, and total MIP over the loan is $37,000. With 10% down instead, the rate drops to 0.50%, MIP ends after 11 years, and the total is $16,277.",
          "Base loans above the $832,750 conforming limit pay higher rates: 0.70% or 0.75% on terms over 15 years, and 0.15% to 0.65% on terms of 15 years or less. The duration rule is the same either way — the dividing line is the down payment. Under 10% down, annual MIP runs for the life of the loan; at 10% or more, it ends after 11 years.",
          "The annual MIP is the ongoing charge, paid monthly. Its rate comes from HUD Mortgagee Letter 2023-05 and depends on the loan term, the loan-to-value ratio and whether the base loan is above the national conforming limit ($832,750 for 2026). For base loans at or below that limit, the rates are:",
        ],
        table: {
          head: ["Term", "Loan-to-value", "Annual MIP", "How long it lasts"],
          rows: [
            ["Over 15 years", "90% or less", "0.50%", "11 years"],
            ["Over 15 years", "90% to 95%", "0.50%", "Life of the loan"],
            ["Over 15 years", "Over 95%", "0.55%", "Life of the loan"],
            ["15 years or less", "90% or less", "0.15%", "11 years"],
            ["15 years or less", "Over 90%", "0.40%", "Life of the loan"],
          ],
        },
      },
      {
        heading: "Loan limits in 2026",
        paragraphs: [
          "FHA caps the base loan by county, and the cap moves with local home prices. For 2026 the national floor is $541,287 for a one-unit home in low-cost counties, and the ceiling is $1,249,125 in the highest-cost counties, set by HUD Mortgagee Letter 2025-23. Most counties sit at the floor; a smaller number sit at the ceiling, and some land in between.",
          "The limit applies to the base loan — price minus down payment — before any financed upfront MIP, not to the home price. A $600,000 home in a floor county still qualifies if the base loan is $541,287 or less, which means a down payment of about $58,700. Alaska, Hawaii, Guam and the U.S. Virgin Islands have a higher special-exception ceiling of $1,873,625 for a one-unit home.",
        ],
      },
      {
        heading: "FHA vs conventional: when each wins",
        paragraphs: [
          "FHA wins when the down payment or the credit score is the constraint. A buyer with 3.5% down and a 620 score can usually get an FHA loan where a conventional lender would decline or price the loan punitively, and FHA interest rates are often slightly lower than conventional rates for the same borrower.",
          "Conventional wins once you have 20% down or strong credit. Private mortgage insurance on a conventional loan can be cancelled — you can request it at 80% of the original value, and it must end automatically at 78% — while FHA annual MIP with less than 10% down never ends on its own. A borrower who can put 20% down and has a 720 score will almost always pay less with a conventional loan.",
          "The common middle path is to buy with FHA, then refinance into a conventional loan once the home has gained enough equity — usually 20% — to drop mortgage insurance entirely. That refinance is also the only way to escape FHA annual MIP early when it runs for the life of the loan; an FHA streamline refinance keeps MIP in place.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much house can I buy with an FHA loan?",
        answer:
          "It depends on your county. The 2026 FHA limit for a one-unit home runs from $541,287 in low-cost counties to $1,249,125 in high-cost counties, and the limit applies to the base loan, not the price — so in a floor county you can buy a more expensive home if your down payment brings the base loan under $541,287. Your income and debts still have to support the payment under the lender's debt-to-income limits.",
      },
      {
        question: "Do I need 20% down to avoid FHA mortgage insurance?",
        answer:
          "No — there is no down payment that avoids FHA mortgage insurance. UFMIP of 1.75% and annual MIP apply to every FHA loan, even at 20% down. What a bigger down payment changes is the rate and the duration: at 10% or more down, the annual rate on a 30-year loan is 0.50% and MIP ends after 11 years, instead of 0.55% for the life of the loan at 3.5% down.",
      },
      {
        question: "Can I use an FHA loan for an investment property?",
        answer:
          "No. FHA loans are for primary residences only — you must move in within 60 days of closing and live in the home for at least a year. Buying a property you do not intend to live in with an FHA loan is occupancy fraud. One exception buyers use legitimately is a two- to four-unit property: you live in one unit and rent the others, and FHA allows that with higher loan limits for multi-unit homes.",
      },
      {
        question: "What credit score do I need for an FHA loan?",
        answer:
          "HUD's minimum is 580 for the 3.5% down payment, or 500 to 579 with 10% down. In practice most lenders add their own overlays — a 620 minimum is common — so a score between 500 and 620 may qualify on paper but find few lenders willing to write the loan. A higher score does not change the MIP rate, which is set by term, loan-to-value and loan size, but it usually earns a lower interest rate.",
      },
    ],
  },

)

export const GUIDE_HUBS = [...new Set(GUIDES.map((g) => g.hub))]
export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug)
export const guidesByHub = (hub: string) => GUIDES.filter((g) => g.hub === hub)
