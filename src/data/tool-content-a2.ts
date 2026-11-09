import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_A2: Record<string, ToolContentEntry> = {
  "personal-wealth/credit-card-payoff-calculator": {
    quickAnswer:
      "A credit card payoff calculator turns a balance, an APR and a monthly payment into a payoff date and total interest. A $6,500 balance at 24.99% APR paid at $250 a month is gone in 38 months with $2,957 of interest — paying only the minimum would stretch past two decades and cost several times more.",
    howItWorks: [
      "Enter the balance, the APR from your statement and the fixed amount you can pay each month. The calculator applies interest to the balance monthly, subtracts your payment, and repeats until the balance clears, reporting the month count and the total interest along the way.",
      "A fixed payment is the key choice. A payment that shrinks with the balance — which is how minimum payments are calculated — spends most of its early life covering interest. Holding the payment at the level of your first month's minimum, and never letting it drop, typically cuts the payoff time by years.",
      "Check the warning case: if your payment is less than one month's interest — on $6,500 at 24.99%, about $135 — the balance grows despite paying. The calculator will show that the debt never clears. Any workable plan starts above that line.",
    ],
    formula: "Each month: interest = balance × APR ÷ 12; new balance = balance + interest − payment. Total interest is the sum of all monthly interest charges until the balance reaches zero.",
    example: {
      title: "Worked example: $6,500 at 24.99% APR, $250 a month",
      body: "Month one: interest is $6,500 × 24.99% ÷ 12 ≈ $135, so $115 of the $250 reduces the balance. As the balance falls, the interest share shrinks and the principal share grows. The debt clears in month 38, and total interest paid is $2,957 — about 46 cents of interest per dollar borrowed. Raise the payment to $350 and the same debt clears in about 24 months with roughly $1,804 of interest.",
    },
    faqs: [
      {
        question: "How are credit card minimum payments calculated?",
        answer:
          "Most issuers charge the greater of a flat floor (often $25 to $35) or a formula such as the month's interest plus 1% of the balance, sometimes plus fees. Because the payment falls as the balance falls, minimum-only repayment of a large balance can take 20 years or more — your statement is required to show exactly how long, and what paying more would save.",
      },
      {
        question: "Does a 0% balance transfer help?",
        answer:
          "It can: moving a balance to a 0% promotional APR (typically 12 to 21 months) stops interest entirely, so every dollar of payment cuts principal. Count the transfer fee — usually 3% to 5% of the balance — and have a plan for the end of the promotion, when the remaining balance reverts to a high standard APR.",
      },
      {
        question: "Should I pay off the card with the highest APR or the smallest balance first?",
        answer:
          "Highest APR first (the avalanche method) always costs less interest. Smallest balance first (the snowball method) costs more but clears individual cards sooner, which some people find keeps them going. The interest difference on moderate balances is often a few hundred dollars — the method you will actually stick to is the better one.",
      },
      {
        question: "Will paying off my cards improve my credit score?",
        answer:
          "Usually, yes, mainly through utilisation: balances relative to credit limits are a major scoring factor, and keeping reported utilisation below about 30% — lower is better — helps. Keep paid-off cards open unless there is an annual fee problem, because closing them cuts your total limit and raises utilisation on the rest.",
      },
    ],
  },

  "personal-wealth/debt-avalanche-vs-snowball-calculator": {
    quickAnswer:
      "This calculator compares the two standard debt repayment orders on your actual debts. On a $2,400 store card at 12% and a $4,800 credit card at 28%, paid with $400 a month, the avalanche method (highest rate first) clears everything in 22 months for $1,500 of interest; the snowball (smallest balance first) takes 23 months and $1,996 — the order alone costs $495.",
    howItWorks: [
      "List each debt with its balance, APR and minimum payment. Both strategies pay every minimum first. They differ only in where the leftover money goes: avalanche aims it at the highest APR; snowball aims it at the smallest balance to score an early win.",
      "When a debt clears under either method, its minimum payment is rolled into the attack payment for the next debt. That roll-up — the thing both methods are named for — is why the payoff accelerates sharply in the later months under both.",
      "Read the interest totals and the date of the first cleared debt side by side. Avalanche always wins on cost; it cannot lose, because it retires the most expensive dollars first. Snowball wins on early momentum. On small balances the cost gap is often trivial; on large, high-rate balances it runs to thousands, and the honest choice is avalanche.",
    ],
    formula: "Both methods simulate month by month: interest = balance × APR ÷ 12 on each debt; minimums are paid first; surplus goes to the target debt (highest APR or smallest balance). Total cost = sum of all interest charged until every balance is zero.",
    example: {
      title: "Worked example: two cards, $400 a month total",
      body: "Store card: $2,400 at 12% APR, $60 minimum. Credit card: $4,800 at 28% APR, $110 minimum. Minimums total $170, leaving $230 of attack money. Avalanche sends the $230 to the 28% card: all debt gone in 22 months, interest $1,500. Snowball sends it to the store card, clearing it first for motivation: debt-free in 23 months, interest $1,996. Same payments, same debts — the order costs $495 and one extra month.",
    },
    faqs: [
      {
        question: "Is the avalanche method always cheaper?",
        answer:
          "Yes, mathematically, whenever the APR order differs from the balance order. Interest accrues fastest on the highest-rate balance, so killing it first minimises total interest. When the smallest debt is also the highest-rate one — common with store cards — both methods are identical.",
      },
      {
        question: "Why do people choose snowball if it costs more?",
        answer:
          "Behaviour. Clearing a debt entirely removes a payment and produces visible progress early, and researchers have found small-debt wins can improve follow-through. A plan abandoned in month three costs more than either. The worked example prices the trade-off precisely: here, momentum costs $495.",
      },
      {
        question: "What if I have a 0% promotional balance?",
        answer:
          "Treat its APR as 0% until the promotion ends, then as the full go-to rate — avalanche logic handles it automatically if you update the rate at expiry. Watch for deferred-interest retail promotions, which are different: miss the deadline and interest is charged back to the purchase date.",
      },
      {
        question: "Should I stop investing while paying off debt?",
        answer:
          "Capture any employer 401(k) match first — that is an immediate 50% to 100% return no debt can beat. Beyond the match, paying a 28% APR is a guaranteed 28% return, which no investment reliably offers. Once expensive debt is gone, redirect the entire payoff budget into investing.",
      },
    ],
  },

  "personal-wealth/student-loan-payoff-calculator": {
    quickAnswer:
      "This calculator shows how extra payments change a student loan's payoff date and total interest. A $38,000 loan at 5.5% on the standard 10-year plan costs $412 a month and $11,488 of interest. Adding $150 a month clears it in 82 months instead of 120 and saves $3,908 of interest.",
    howItWorks: [
      "Enter your balance, interest rate and either your current payment or your loan term. The calculator amortises the loan month by month: interest on the balance first, the rest of the payment to principal, then repeats on the smaller balance.",
      "Add an extra monthly amount to see the effect of overpaying. Extra payments go entirely to principal (confirm your servicer applies them that way and not as advance payments on future bills), so they shorten the loan from the end and remove the interest those final years would have charged.",
      "Compare the saving against your alternatives honestly. At 5.5%, an extra dollar earns a guaranteed 5.5% by avoiding interest. That beats a savings account and carries no market risk, but it is below the long-run return investors hope for from equities — and unlike an investment, a paid-off loan cannot be re-borrowed in an emergency, so keep your cash buffer intact first.",
    ],
    formula: "Monthly payment = Balance × (r ÷ 12) ÷ [1 − (1 + r ÷ 12)^(−months)]. Total interest = (payment × months) − balance. Extra payments shorten the month count in the month-by-month simulation.",
    example: {
      title: "Worked example: $38,000 at 5.5%, standard plan plus $150 extra",
      body: "Standard 10-year payment: $412.40 a month. Over 120 payments you repay $49,488, so interest is $11,488. Pay $562.40 instead and the balance clears in 82 months — 3 years and 2 months early — with total interest of $7,580. The extra $150 a month, $12,300 paid in total, removes $3,908 of interest and 38 payments.",
    },
    faqs: [
      {
        question: "What is the standard federal student loan repayment term?",
        answer:
          "10 years on the Standard Repayment Plan, with a minimum payment of $50. Federal undergraduate loans for recent years carried fixed rates around 5.5% to 6.5%; graduate and PLUS loans are higher. Rates are set each year by Congress's formula and fixed for the life of each loan.",
      },
      {
        question: "Should I pay extra or use an income-driven plan?",
        answer:
          "They solve different problems. Income-driven repayment caps payments at a share of income (typically 10% of discretionary income on current plans) and forgives any balance after 20 to 25 years, but total interest paid is usually higher. If you can afford the standard payment comfortably, extra payments cost less overall. Rules for these plans change with administrations and court rulings — verify the current options at studentaid.gov.",
      },
      {
        question: "Does paying extra on student loans affect my taxes?",
        answer:
          "The student loan interest deduction allows up to $2,500 of interest paid to be deducted, subject to income phase-outs (for 2025, phasing out between $75,000 and $85,000 of modified AGI for single filers). Paying the loan off faster reduces the interest you can deduct, but a dollar of interest saved is worth more than the roughly 22 cents of tax it might have saved a borrower in the 22% bracket.",
      },
      {
        question: "Should I pay off student loans before investing?",
        answer:
          "After capturing any employer retirement match and holding a starter emergency fund, compare rates. Above roughly 7%, paying the loan down is hard to beat on a risk-adjusted basis. At 4% to 5%, investing the surplus is defensible, especially inside tax-advantaged accounts whose annual contribution room expires.",
      },
    ],
  },

  "personal-wealth/401k-vs-solo-401k-calculator": {
    quickAnswer:
      "This calculator compares retirement saving as a W-2 employee with a 401(k) against self-employment with a Solo 401(k). On $120,000 of pay, a W-2 worker contributing $20,000 with a 4% employer match saves $24,800 a year. A self-employed person on the same income can add an employer profit-sharing contribution of up to 25% of compensation — $30,000 — for a total of $50,000.",
    howItWorks: [
      "Enter your compensation, the employee contribution you plan to make, and the employer match in the W-2 scenario. The calculator projects both balances forward at your expected return, with the same contributions each year.",
      "The Solo 401(k) advantage is structural: as your own employer, you make both sides of the contribution. The employee side follows the same elective deferral limit as any 401(k). The employer side allows up to 25% of compensation as a profit-sharing contribution, subject to the overall annual additions limit.",
      "For the self-employed, 'compensation' has a specific meaning: net earnings after the deductible half of self-employment tax and after the employer contribution itself, which makes the effective maximum about 20% of net self-employment income for a sole proprietor. S-corps calculate it from W-2 wages instead. The calculator's percentage input approximates this — your tax adviser computes the exact figure.",
    ],
    formula: "W-2 total = Employee contribution + (Match % × Salary). Solo total = Employee contribution + (Profit-sharing % × Compensation), capped at the IRS overall limit ($72,000 for 2026, plus catch-ups if eligible — an estimate to verify with the IRS).",
    example: {
      title: "Worked example: $120,000 of income, $20,000 employee contribution",
      body: "W-2 scenario: you defer $20,000 and your employer matches 4% of salary — $4,800 — for $24,800 a year going in. Solo scenario: you defer the same $20,000 as employee, then your business adds 25% of $120,000 compensation — $30,000 — as employer, for $50,000 a year. Over 20 years at a 7% return, that contribution gap compounds to roughly $1,026,000 versus $508,000 — the account type matters as much as the saving habit.",
    },
    faqs: [
      {
        question: "What is the 401(k) contribution limit for 2026?",
        answer:
          "The employee elective deferral limit is an estimated $24,500 for 2026 if under 50, with catch-up contributions of $8,000 at 50-plus and a higher $11,250 catch-up for ages 60 to 63 under SECURE 2.0. The combined employee-plus-employer limit is an estimated $72,000. These figures are indexed and published by the IRS each autumn — confirm before maxing out.",
      },
      {
        question: "Who can open a Solo 401(k)?",
        answer:
          "A self-employed person or business owner with no employees other than a spouse. If you hire other staff, you generally must move to a regular 401(k) or another plan. Side income counts: many W-2 employees with freelance income open a Solo 401(k) for that business, but the employee deferral limit is shared across all your 401(k)s combined.",
      },
      {
        question: "What is the deadline for Solo 401(k) contributions?",
        answer:
          "The plan must be established by the end of the tax year (31 December) for sole proprietors under current rules — SECURE 2.0 extended this for first plans in some cases. Employee deferrals are elected by year-end; employer profit-sharing contributions can typically be funded up to the business tax filing deadline, including extensions.",
      },
      {
        question: "Solo 401(k) or SEP IRA — which allows more?",
        answer:
          "At the same income, the Solo 401(k) usually allows more, because the SEP only has the employer side (up to 25% of compensation). At $60,000 of self-employment compensation, a SEP allows about $12,000 (the effective 20% for sole proprietors), while a Solo 401(k) allows that plus the full employee deferral. The Solo 401(k) also permits Roth contributions and loans, which a SEP does not.",
      },
    ],
  },

  "personal-wealth/coast-fire-calculator": {
    quickAnswer:
      "Coast FIRE is the point where your invested savings, left untouched, will grow into a full retirement pot by retirement age without another contribution. If you need $1,500,000 at 65 and expect a 7% return, the coast number at 35 is about $197,000 — invest that by 35 and compounding does the rest.",
    howItWorks: [
      "Enter your expected annual spending in retirement, your current age, retirement age and expected return. The calculator first sizes the full retirement pot using the 25× spending rule (spending divided by a 4% withdrawal rate), then discounts it back to today at your return to find the coast number.",
      "Add what you have already invested and any monthly contribution to find your coast date: the age at which your balance crosses the (also growing) coast line. Before that date, contributions matter enormously. After it, your obligation shrinks to covering current living costs — the freedom the concept is actually about.",
      "Respect the assumptions. The coast number is acutely sensitive to the return: at 5% instead of 7%, the 35-year-old's target rises from about $197,000 to about $272,000. Inflation is handled by using a return net of inflation, or by stating future spending in today's money as this calculator does. A coast plan built on an optimistic return is a plan to return to full saving later.",
    ],
    formula: "Full retirement pot = Annual retirement spending × 25. Coast number = Full pot ÷ (1 + return)^(years until retirement).",
    example: {
      title: "Worked example: coast number at 35 for retirement at 65",
      body: "Planned retirement spending: $60,000 a year, so the full pot target is $60,000 × 25 = $1,500,000. Discount at 7% over 30 years: $1,500,000 ÷ 1.07^30 = $197,051. Invest roughly $197,000 by age 35 and, if 7% materialises, the pot reaches $1,500,000 at 65 with no further contributions. Already holding $150,000 at 35 leaves a gap of about $47,000 — at $800 a month, roughly four more years of contributing before you can coast.",
    },
    faqs: [
      {
        question: "Where does the 25× spending figure come from?",
        answer:
          "It is the inverse of the 4% withdrawal guideline: a pot of 25 times annual spending can pay out 4% in the first year and adjust for inflation, and historically that has usually lasted 30 years. It is a planning heuristic from US market data, not a guarantee — lower expected returns argue for 28× to 33× (a 3% to 3.5% withdrawal rate).",
      },
      {
        question: "Does Coast FIRE mean I can stop working?",
        answer:
          "No — it means you can stop saving for retirement. You still need income to cover living costs between now and retirement age. What changes is the type of work you can accept: a lower-paid, less stressful or part-time job that covers expenses becomes viable because retirement is already funded in the background.",
      },
      {
        question: "Should Social Security change my coast number?",
        answer:
          "It reduces the pot you need. If Social Security will cover $25,000 of your $60,000 spending, the portfolio only needs to supply $35,000, and the target falls from $1,500,000 to $875,000. Conservative planners discount the benefit (for example by 25%) rather than ignoring it entirely, given the programme's projected funding shortfall.",
      },
      {
        question: "What return should I use for the coast calculation?",
        answer:
          "A real (after-inflation) return keeps the maths in today's money: roughly 4% to 5% for a stock-heavy portfolio if you expect 7% nominal returns and 2% to 3% inflation. Using the nominal return against today's spending target overstates your progress — the most common Coast FIRE error.",
      },
    ],
  },

  "personal-wealth/fat-fire-vs-lean-fire-calculator": {
    quickAnswer:
      "This calculator sizes two versions of financial independence: lean FIRE on a frugal budget and fat FIRE on a generous one. At $3,500 a month of spending, lean FIRE needs a pot of about $1,050,000. At $9,000 a month, fat FIRE needs about $2,700,000 — the lifestyle decision changes the target by roughly $1.65 million and, on typical savings, more than a decade of work.",
    howItWorks: [
      "Enter your lean and fat monthly spending figures, what you have invested and your monthly saving. The calculator multiplies each spending level by 12 and then by 25 to get the two target pots (the 4% withdrawal guideline), then projects when your savings cross each line at your expected return.",
      "The useful output is the gap in years, not just the gap in dollars. Because of compounding, the last stretch to fat FIRE is disproportionately long: the pot is bigger, but by then your portfolio's own growth rivals your contributions, so each additional year of work buys more than it did at the start.",
      "Test the spending inputs before anything else. The difference between $6,000 and $7,000 a month of planned retirement spending is $300,000 of required pot — several years of saving for most households. Knowing which expenses actually drive your quality of life is worth more than any return assumption.",
    ],
    formula: "Target pot = Monthly spending × 12 × 25. Time to target is solved from: Target = Invested × (1 + r/12)^(12t) + Monthly saving × [((1 + r/12)^(12t) − 1) / (r/12)].",
    example: {
      title: "Worked example: $180,000 invested, $1,500 a month saved, 7% return",
      body: "Lean FIRE at $3,500 a month: target $1,050,000, reached in about 15.8 years. Fat FIRE at $9,000 a month: target $2,700,000, reached in about 27.4 years. The fat lifestyle costs roughly 11.6 extra years of saving on this plan. Halving the gap — planning on $6,000 a month — sets a $1,800,000 target and lands around year 23, which is why most people end up planning for something between the two poles.",
    },
    faqs: [
      {
        question: "What spending levels count as lean and fat FIRE?",
        answer:
          "The community usage is loose: lean FIRE usually means under about $40,000 to $45,000 a year of spending, fat FIRE above $100,000 a year, with regular FIRE between. The labels matter less than your own two numbers — price the life you would accept and the life you would choose, and look at the years between them.",
      },
      {
        question: "Is the 4% rule safe for a 40- or 50-year retirement?",
        answer:
          "It was derived for roughly 30-year retirements. For very early retirees, a 3.25% to 3.5% withdrawal rate (a 29× to 31× pot) is a more common planning choice, because the portfolio must survive more market cycles and there is less room to return to work. Building the target with 25× and retiring at 35 leaves thin margins.",
      },
      {
        question: "Does fat FIRE require a higher income, or just more time?",
        answer:
          "Either. In the worked example, the fat target takes about 27 years on $1,500 a month of saving. Raising saving to $3,000 a month cuts it to roughly 20 years. The mathematics is indifferent: more saved per month, or more months. Income growth directed entirely to saving is the lever that moves it most.",
      },
      {
        question: "Should my FIRE spending include housing and healthcare?",
        answer:
          "Yes — the target must cover all spending the portfolio will fund, including housing (or rent), health insurance premiums before Medicare at 65 (a major early-retirement cost in the US), and taxes on withdrawals. Paid-off housing lowers the spending figure substantially, which is why many early retirees treat the mortgage payoff as part of the plan.",
      },
    ],
  },

  "personal-wealth/hsa-triple-tax-advantage-calculator": {
    quickAnswer:
      "An HSA is the only US account that is tax-free going in, growing and coming out for medical costs. This calculator shows the compounding effect: contributing the 2026 self-only maximum of $4,400 a year for 25 years at a 7% return builds about $297,000 — $110,000 of contributions and roughly $187,000 of growth that is never taxed if spent on qualified medical expenses.",
    howItWorks: [
      "Enter your annual contribution, current balance, expected return, years and marginal tax bracket. The calculator compounds the account like an investment account, then quantifies the tax you avoided: the deduction (or payroll exclusion) on the way in, and the tax-free growth and withdrawals.",
      "The 'triple' advantage is literal. Contributions through payroll also escape Social Security and Medicare tax (7.65%), which even a 401(k) contribution does not. Growth is untaxed. Withdrawals for qualified medical expenses — premiums in some cases, dental, vision, prescriptions, most care — are untaxed.",
      "The strategy the calculator prices is paying current medical bills from cash flow, saving the receipts, and letting the HSA invest for decades. There is no deadline for reimbursing yourself for an expense incurred while the HSA existed, so the account can be tapped tax-free in retirement against a drawer of old receipts.",
    ],
    formula: "Projected value = Balance × (1 + r/12)^(12t) + (Annual contribution ÷ 12) × [((1 + r/12)^(12t) − 1) / (r/12)]. Upfront tax saved per year = Contribution × (marginal income tax rate + 7.65% if contributed through payroll).",
    example: {
      title: "Worked example: $4,400 a year for 25 years at 7%",
      body: "Contributions total $110,000. Invested monthly at 7%, the account reaches about $297,026. Each year's $4,400 contribution, made through payroll by someone in the 22% bracket, saves about $1,305 in tax that year (22% income tax plus 7.65% payroll tax). The growth of roughly $187,026 is never taxed if used for medical costs — the same growth in a brokerage account would owe capital gains tax, and in a traditional 401(k) full income tax.",
    },
    faqs: [
      {
        question: "What are the HSA contribution limits for 2026?",
        answer:
          "An estimated $4,400 for self-only coverage and $8,750 for family coverage for 2026, plus a $1,000 catch-up at 55 or older. You must be enrolled in an HSA-qualifying high-deductible health plan and have no other disqualifying coverage. Verify the final IRS figures for the year, as they are indexed to inflation.",
      },
      {
        question: "Can I invest HSA money or must it sit in cash?",
        answer:
          "You can invest it. Most providers require a minimum cash balance (often $1,000 to $2,000) and let you invest the rest in mutual funds or ETFs. The long-horizon strategy only works if the money is invested; an HSA left in a low-interest sweep account for 25 years forfeits most of the advantage the calculator shows.",
      },
      {
        question: "What happens to an HSA at age 65?",
        answer:
          "It becomes more flexible: withdrawals for non-medical expenses are taxed as ordinary income — like a traditional IRA — with no penalty after 65. Medicare premiums can be paid from an HSA tax-free. You can no longer contribute once enrolled in Medicare.",
      },
      {
        question: "Do HSA balances expire or get forfeited?",
        answer:
          "No. Unlike a flexible spending account, an HSA is yours permanently, rolls over every year, and moves with you between employers. There is no use-it-or-lose-it rule and no deadline on reimbursing eligible expenses you paid out of pocket, provided the expense came after the HSA was established.",
      },
    ],
  },

  "real-estate/mortgage-payment-calculator": {
    quickAnswer:
      "A mortgage payment calculator builds your full monthly payment — principal, interest, tax and insurance (PITI) — not just the loan part. A $400,000 loan at 6.5% over 30 years costs $2,528 a month in principal and interest; add typical tax and insurance on a $500,000 home and the real payment is about $3,167.",
    howItWorks: [
      "Enter the loan amount, interest rate and term. The calculator computes the fixed principal-and-interest payment that amortises the loan to zero on schedule. Then add property tax (as a yearly percentage of the home's value) and homeowners insurance to reach the payment you will actually make.",
      "Most lenders collect tax and insurance monthly into an escrow account and pay the bills for you, so the PITI figure is the cheque you write. Two parts of it move over time: tax follows your local assessment and insurance premiums have risen sharply in many states, so a payment quoted at purchase is not fixed for 30 years even on a fixed-rate loan.",
      "Compare loans on the interest rate and fees, but budget on PITI. The gap between the two in the example — $639 a month — is where buyers who shop on the loan payment alone get caught out, along with HOA dues and, below 20% down, private mortgage insurance.",
    ],
    formula: "Monthly principal and interest = Loan × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where r is the monthly rate (annual rate ÷ 12) and n the number of payments. PITI = principal and interest + (home value × tax rate ÷ 12) + (annual insurance ÷ 12).",
    example: {
      title: "Worked example: $500,000 home, $400,000 loan at 6.5%",
      body: "Principal and interest on $400,000 at 6.5% over 360 payments: $2,528.27. Property tax at 1.1% of the $500,000 value: $458.33 a month. Insurance at $2,160 a year: $180 a month. Total PITI = $3,166.60. Over the full term, the loan part alone totals $910,177 — $510,177 of interest on top of the $400,000 borrowed, which is the real price of a 30-year term.",
    },
    faqs: [
      {
        question: "How much of my first payment is interest?",
        answer:
          "Most of it. On the worked example, month one's interest is $400,000 × 6.5% ÷ 12 = $2,166.67 of the $2,528.27 payment — 86%. The split improves every month as the balance falls; by year 20 of a 30-year loan at this rate, roughly half the payment is principal. This front-loading is just the arithmetic of interest on a large starting balance, not a lender trick.",
      },
      {
        question: "What is PMI and when does it apply?",
        answer:
          "Private mortgage insurance protects the lender when you put down less than 20% on a conventional loan. It typically costs 0.3% to 1.5% of the loan amount per year — $100 to $500 a month on a $400,000 loan — and can usually be cancelled once your balance reaches 78% to 80% of the home's value. FHA loans charge mortgage insurance premiums on a different, less escapable schedule.",
      },
      {
        question: "15-year or 30-year mortgage — how big is the difference?",
        answer:
          "On $400,000 at the same 6.5%, a 15-year payment is about $3,484 but total interest falls from $510,177 to about $227,200. In practice 15-year rates are usually lower than 30-year rates, widening the saving further. The trade is flexibility: the 30-year's lower required payment can be voluntarily overpaid, while the 15-year's higher payment is compulsory in a bad month too.",
      },
      {
        question: "Are taxes and insurance the same everywhere?",
        answer:
          "No — this is the biggest regional variable in housing cost. Effective property tax rates run from about 0.3% of value in Hawaii to around 2.4% in New Jersey, and insurance varies several-fold between low-risk inland areas and hurricane or wildfire zones. Always model with your actual local figures, not national averages.",
      },
    ],
  },

  "real-estate/mortgage-amortization-calculator": {
    quickAnswer:
      "An amortization calculator lays out a loan month by month: payment, interest, principal and remaining balance. A $350,000 mortgage at 6% over 30 years has a payment of $2,098.43 — and a total interest bill of $405,434, more than the loan itself. The schedule shows exactly where each payment goes.",
    howItWorks: [
      "Enter the loan amount, rate and term. The calculator fixes the payment that clears the loan exactly on schedule, then builds the full table: each month, interest is charged on the outstanding balance, the remainder of the payment reduces principal, and the balance steps down.",
      "Early payments are mostly interest because the balance is at its largest; the principal share grows every month as the balance falls. Halfway through a 30-year loan you have not repaid half the money — on the example loan, after 15 years the balance is still about $239,000 of the original $350,000.",
      "Use the yearly view to plan. The schedule shows your balance at any future date (what you would owe if you sold or refinanced), the interest you will pay in any year (the figure relevant to tax deductions), and how extra payments rewrite the end of the schedule.",
    ],
    formula: "Payment = Loan × [r(1 + r)^n] ÷ [(1 + r)^n − 1]. Each period: interest = balance × r; principal = payment − interest; new balance = balance − principal, where r is the monthly rate and n the total payments.",
    example: {
      title: "Worked example: $350,000 at 6% for 30 years",
      body: "Payment: $2,098.43. Month one: interest $1,750, principal $348.43, balance $349,651.57. In year one you pay $25,181 and reduce the debt by only about $4,340. Total paid over 360 months: $755,434, of which $405,434 is interest. The crossover point where principal first exceeds interest in a monthly payment arrives in month 223 — over 18 years in.",
    },
    faqs: [
      {
        question: "Why is so much interest charged at the start?",
        answer:
          "Because interest is charged on what you owe, and you owe the most at the start. The rate never changes; the balance it applies to does. There is no front-loading rule to negotiate away — any loan at 6% on a $350,000 balance costs $1,750 in its first month, whatever the payment schedule.",
      },
      {
        question: "What does an extra payment do to the schedule?",
        answer:
          "It removes principal immediately, so every subsequent month's interest charge falls. Extra paid early is worth most, because it avoids interest for the longest time. A single extra $2,098 payment in month one of the example loan saves about $10,300 of interest and shortens the loan by five months.",
      },
      {
        question: "Does amortization apply to interest-only loans?",
        answer:
          "No — interest-only payments do not amortise at all; the balance is unchanged until the interest-only period ends, when payments jump to amortise the full amount over the remaining term. The calculator's schedule assumes a fully amortising loan, which covers most fixed-rate mortgages.",
      },
      {
        question: "Can I see how much interest I will pay this tax year?",
        answer:
          "Yes — sum the interest column for the 12 payments falling in the calendar year. That is the figure your lender reports on Form 1098. Mortgage interest is deductible in the US if you itemise, on acquisition debt up to $750,000 for loans taken out after December 2017, but most households now take the standard deduction instead — for 2026 an estimated $16,100 single and $32,200 married filing jointly.",
      },
    ],
  },

  "real-estate/mortgage-payoff-calculator": {
    quickAnswer:
      "A mortgage payoff calculator shows what extra payments buy you. On a $320,000 balance at 5.5% with 25 years left, the standard payment of $1,965 runs to month 300 and $269,524 of remaining interest. Adding $300 a month ends the loan in 229 months — nearly 6 years early — and saves $73,023 of interest.",
    howItWorks: [
      "Enter your current balance, rate, remaining term and any extra amount you can add monthly or as a lump sum. The calculator re-amortises the loan: the required payment stays the same, the extra goes entirely to principal, and the loan ends when the balance hits zero instead of at the scheduled date.",
      "Every extra dollar has a double effect — it removes that dollar of debt and all the interest that dollar would have attracted for the rest of the term. That is why extra payments made early, with decades of interest ahead of them, are worth several times their face value by the end.",
      "Compare the guaranteed return honestly. Paying extra on a 5.5% mortgage earns a certain 5.5%. If your rate is 3%, the same logic makes extra payments a poor use of money next to almost any alternative. The calculator gives you the interest saved; whether to chase it depends on your rate, your liquidity and your other debts.",
    ],
    formula: "Simulated month by month: interest = balance × rate ÷ 12; principal = (scheduled payment + extra) − interest; balance falls by principal until it reaches zero. Interest saved = interest on the original schedule − interest on the accelerated schedule.",
    example: {
      title: "Worked example: $320,000 at 5.5%, 25 years left, plus $300 a month",
      body: "Scheduled payment on $320,000 at 5.5% over 300 months: $1,965.08, with $269,524 of interest still to pay. Add $300 a month (total $2,265.08) and the loan clears in 229 months — 71 payments early — with $196,501 of interest. Saving: $73,023. The extra contributions total $68,700 over the period, so each extra dollar saved slightly more than a dollar of interest.",
    },
    faqs: [
      {
        question: "Is one extra payment a year as good as it sounds?",
        answer:
          "It is a real effect. Making 13 payments' worth per year — commonly done by paying half the monthly amount every two weeks, which yields 26 half-payments — on a 30-year loan at typical rates cuts roughly 4 to 6 years off the term. Monthly extra payments of the same annual total do slightly better, because the money reduces the balance sooner on average.",
      },
      {
        question: "Should I pay off my mortgage or invest?",
        answer:
          "Compare your mortgage rate with an after-tax, risk-adjusted investment return. At a 7% mortgage rate, payoff is a guaranteed 7% — hard to beat. At 3%, investing has historically won comfortably, though it is never guaranteed. Also weigh liquidity: home equity is hard to access in a crisis, while an investment account can be sold in days. Many households split the difference.",
      },
      {
        question: "Does my mortgage have a prepayment penalty?",
        answer:
          "Most modern US residential mortgages do not, and federal rules restrict prepayment penalties on most loans made after 2014. Check your closing disclosure to be sure, and tell your servicer explicitly that extra funds go to principal — otherwise they may be applied to future payments, which does not reduce interest the same way.",
      },
      {
        question: "Is a lump sum or monthly extra better?",
        answer:
          "For the same total money, earlier is better: a lump sum today removes principal for the entire remaining term. $10,000 paid today on the example loan saves more interest than $10,000 dribbled in over the next three years. If the money is available now and your emergency fund is intact, the lump sum wins mathematically.",
      },
    ],
  },

  "real-estate/home-affordability-calculator": {
    quickAnswer:
      "A home affordability calculator works from your income and debts to a maximum home price, using the lender's 28/36 rule: housing costs under 28% of gross income, all debts under 36%. On an income of $110,000 with $650 a month of other debts, the housing budget is $2,567 a month — roughly a $396,000 home with 20% down at 6.5%.",
    howItWorks: [
      "Enter your gross annual income, monthly debts (car, cards, student loans — minimum payments as a lender counts them), your down payment and a mortgage rate. The calculator applies the front-end ratio (28% of gross monthly income for housing, including tax and insurance) and the back-end ratio (36% for housing plus all other debts) and takes the lower of the two as your payment budget.",
      "It then converts the payment budget into a loan amount at your rate and term, subtracts estimated tax and insurance, and adds your down payment to reach a price. The tax and insurance assumptions move the answer a lot — the same income supports a much cheaper house in a 2% property-tax state than in a 0.5% one.",
      "Treat the result as a lender's ceiling, not a target. Lenders approve against gross income and ignore childcare, savings goals and the rest of your actual life. Many buyers are comfortable only at 80% or so of the maximum a lender would allow; your own budget, run on take-home pay, is the binding test.",
    ],
    formula: "Max housing payment = min(28% × gross monthly income, 36% × gross monthly income − monthly debts). Max loan = payment available for principal and interest ÷ mortgage payment factor at the given rate and term. Max price = max loan + down payment.",
    example: {
      title: "Worked example: $110,000 income, $650 a month of debts, 20% down",
      body: "Gross monthly income is $9,166.67. Front-end limit: 28% = $2,566.67 for housing. Back-end limit: 36% = $3,300, minus $650 of debts = $2,650 — so the front-end figure binds at $2,566.67. Assuming tax at 1.1% of value and insurance at about 0.6% of value per year, that payment supports a price of roughly $396,000 with 20% down ($79,200) and a loan near $317,000 at 6.5%.",
    },
    faqs: [
      {
        question: "What do lenders actually count as debts in the back-end ratio?",
        answer:
          "The minimum monthly payments on revolving and installment debts as they appear on your credit report: car loans, student loans, credit card minimums, personal loans. Utilities, insurance premiums, rent and subscriptions do not count. For student loans in income-driven repayment, lenders use specific rules (often the actual payment, or 0.5% to 1% of the balance) that vary by loan programme.",
      },
      {
        question: "How much do I need for a down payment?",
        answer:
          "Less than the traditional 20% in most cases: conventional loans start at 3% down for eligible buyers, FHA at 3.5%. But a smaller down payment means a bigger loan, a higher payment, and mortgage insurance — on the example income, dropping from 20% to 5% down cuts the affordable price substantially because the payment budget must now cover a larger loan plus PMI.",
      },
      {
        question: "Why do different calculators give me different prices?",
        answer:
          "Different ratio assumptions (some lenders stretch to 45% or higher on the back-end ratio with strong credit), different tax and insurance estimates, and whether HOA dues and PMI are included. A $200-a-month difference in assumed tax and insurance is worth roughly $25,000 to $30,000 of price at current rates.",
      },
      {
        question: "Does a higher credit score change affordability?",
        answer:
          "Yes, through the rate. Mortgage pricing is tiered by credit score and down payment; a borrower at 780 typically pays a rate half a point or more below a borrower at 660 for the same loan. On a $317,000 loan, half a point is about $105 a month — which is itself worth roughly $16,000 of additional price at the same payment.",
      },
    ],
  },

  "real-estate/refinance-calculator": {
    quickAnswer:
      "A refinance calculator compares your current loan with a new one and finds the break-even point. Refinancing a $360,000 balance from 7.25% to 5.9% cuts the payment from $2,535 to $2,135 — saving $400 a month — so $7,200 of closing costs are recovered in 18 months. Stay longer than that and the refinance pays; move sooner and it loses money.",
    howItWorks: [
      "Enter your current balance, current rate and remaining term, then the new rate, new term and the closing costs of the new loan. The calculator computes both payments, the monthly saving, and divides the costs by the saving to get break-even in months.",
      "Watch the term reset. Refinancing 27 remaining years into a new 30-year loan lowers the payment partly by stretching the debt, not only by cutting the rate. The calculator's total interest comparison exposes this: a refinance can show a monthly saving and a higher lifetime cost at the same time. Refinancing into a term equal to or shorter than what remains avoids the trap.",
      "Costs can be quoted three ways: paid in cash, rolled into the loan (raising the balance), or covered by a higher rate in a 'no-cost' refinance. The maths only works if you count them. Rolling $7,200 into the example loan raises the balance to $367,200 and the payment to about $2,178 — the saving shrinks, and break-even stretches.",
    ],
    formula: "Monthly saving = current payment − new payment. Break-even months = total closing costs ÷ monthly saving. Payments from: Payment = Balance × [r(1 + r)^n] ÷ [(1 + r)^n − 1].",
    example: {
      title: "Worked example: $360,000 from 7.25% to 5.9%",
      body: "Current: $360,000 at 7.25% with 27 years (324 payments) left — payment $2,535.10, remaining interest about $461,372. New: $360,000 at 5.9% over 30 years — payment $2,135.29. Monthly saving $399.81; closing costs of $7,200 break even at 18 months. Caveat the calculator makes visible: the new loan's total interest is about $408,704 over its longer life. Refinance instead into 27 years at 5.9% (payment $2,223.93) and total interest falls to about $360,552 — a saving on both measures.",
    },
    faqs: [
      {
        question: "How much rate drop justifies a refinance?",
        answer:
          "The old rule of 1% is too crude — what matters is the dollar saving against the costs and how long you will keep the loan. On a $360,000 balance, even 0.5% saves about $120 a month and can break even in 3 to 4 years. On a $120,000 balance the same half point saves $40 a month and may never repay $5,000 of costs. Run your own numbers.",
      },
      {
        question: "What do refinance closing costs typically include?",
        answer:
          "Lender fees (origination, underwriting), appraisal, title insurance and search, recording fees, and prepaid escrows for tax and insurance. Total costs commonly run 2% to 5% of the loan amount, though competition and state title costs move this widely. You receive a Loan Estimate within three business days of applying — compare the 'services you cannot shop for' and lender fees between lenders.",
      },
      {
        question: "Does refinancing hurt my credit score?",
        answer:
          "Briefly, by a small amount: a hard inquiry and a new account typically cost a few points, recovering within months. Rate-shopping for a mortgage within a 14- to 45-day window counts as a single inquiry under FICO and VantageScore models, so gather quotes together. The far larger score factor is continuing to pay every existing account on time.",
      },
      {
        question: "What is a cash-out refinance and when does it make sense?",
        answer:
          "You borrow more than the current balance and take the difference in cash. It can be rational for consolidating much more expensive debt or funding home improvements, because mortgage rates are usually the cheapest borrowing available. It converts unsecured debt into debt secured on your home, however, and cash-out pricing is slightly worse than rate-and-term pricing — the discipline to not re-run the cards is the real cost.",
      },
    ],
  },

  "real-estate/rent-vs-buy-calculator": {
    quickAnswer:
      "Rent vs buy is decided mainly by how long you will stay. On a $425,000 home with 20% down at 6.4%, buying's net cost over 7 years is about $197,400 including the opportunity cost of the down payment, versus about $193,100 of rent starting at $2,100 a month — nearly a tie. At 3 years renting wins clearly; at 12 years buying usually pulls ahead. There is no universal answer, only a break-even horizon.",
    howItWorks: [
      "Enter the home price, down payment, mortgage rate, expected years in the home, and the rent of a comparable place. The calculator totals the true cost of each path over that horizon — not the payments, the costs: for buying, interest, tax, insurance, maintenance, buying and selling costs, minus the equity you keep and any appreciation; for renting, the rent paid with annual increases.",
      "The down payment needs a cost assigned to it, because $85,000 sitting in a house is $85,000 not invested. The calculator counts an opportunity cost on the deposit (5% a year in the example). Ignore it, and buying looks artificially cheap on every comparison you run.",
      "The result flips with the horizon because buying's heavy fixed costs — about 2% to buy and 6% to sell — are paid once, while its running costs are partly offset by principal repayment and appreciation. Short stays cannot amortise the transaction costs. That, more than the rate or the price, is why the answer is 'it depends how long'.",
    ],
    formula: "Net cost of buying = down payment + buying costs + all payments + tax, insurance and maintenance + selling costs − (sale price − remaining loan balance) + opportunity cost of the down payment. Net cost of renting = sum of rent over the horizon with annual increases.",
    example: {
      title: "Worked example: $425,000 home vs $2,100 a month rent, 7 years",
      body: "Buy: $85,000 down, $340,000 loan at 6.4% (payment $2,126.72). Over 7 years you pay $178,645 in mortgage payments, about $75,000 in tax, insurance and maintenance, $8,500 to buy and about $31,400 to sell at an appreciated value of $522,696 (3% a year). You recover the sale price minus the $306,900 balance. Net cost before opportunity cost: about $162,800; add $34,600 of foregone growth on the down payment at 5% and the true figure is about $197,400. Rent at $2,100 rising 3% a year totals about $193,100. Verdict for this horizon: effectively even, with renting marginally ahead — extend the stay to 10-plus years and buying takes the lead.",
    },
    faqs: [
      {
        question: "What is the 5% rule for rent vs buy?",
        answer:
          "A shortcut from Canadian planner Ben Felix: estimate the annual unrecoverable cost of owning as about 5% of the home's value (roughly 1% tax, 1% maintenance, 3% cost of capital). If you can rent a comparable home for less than that per year — $21,250 on a $425,000 home, or $1,771 a month — renting is financially competitive. It is a screening rule, not a substitute for the full calculation.",
      },
      {
        question: "Isn't rent just throwing money away?",
        answer:
          "No — rent buys housing, exactly as the interest, tax, insurance and maintenance portions of a mortgage payment do. Only the principal portion of a mortgage payment builds wealth, and early in a loan that portion is small: on the example loan, about $300 of the first $2,127 payment. The honest comparison is unrecoverable cost versus unrecoverable cost, which is what this calculator does.",
      },
      {
        question: "How much does home price appreciation change the answer?",
        answer:
          "More than any other assumption. At 3% a year the example home gains about $97,700 over 7 years; at 0% it gains nothing and buying's net cost rises by roughly that amount, making renting the clear winner; at 5% buying wins comfortably. Appreciation is the one input nobody can forecast, so run the 0% case before deciding.",
      },
      {
        question: "How long do I need to stay for buying to pay off?",
        answer:
          "At current rates and typical transaction costs, the break-even horizon is commonly 5 to 7 years, longer when rates are high or rent is cheap relative to prices, shorter when rent is high. If there is a realistic chance of moving within 3 years — job, family, city — renting is usually the financially safer choice.",
      },
    ],
  },

  "real-estate/down-payment-calculator": {
    quickAnswer:
      "A down payment calculator converts a home price into the cash you need at each percentage level, and how long saving takes. On a $385,000 home: 20% down is $77,000, 10% is $38,500, and the FHA minimum of 3.5% is $13,475. Saving $650 a month at 4% reaches the 20% target in about 101 months.",
    howItWorks: [
      "Enter the target home price and the down payment percentage, or enter a savings amount and monthly contribution to see the timeline. The calculator shows the cash required, the resulting loan amount, and — because the loan shrinks as the deposit grows — the monthly payment at each level.",
      "The percentage matters in three places at once. It sets the loan size and therefore the payment. It decides whether you pay mortgage insurance: below 20% on a conventional loan, PMI applies until you reach roughly 20% equity. And it affects the rate you are offered, because lenders price loans in tiers by loan-to-value.",
      "Do not empty yourself to reach 20%. Closing costs add 2% to 5% of the price on top of the deposit, and moving into a home with no cash reserve left is how a routine repair becomes credit card debt. For many buyers, 10% down with a plan to remove PMI beats 20% down with empty accounts.",
    ],
    formula: "Down payment = Home price × down payment %. Loan amount = price − down payment. Months to save = solved from: Target = monthly saving × [((1 + r/12)^months − 1) / (r/12)].",
    example: {
      title: "Worked example: $385,000 home at three deposit levels",
      body: "20% down: $77,000 deposit, loan $308,000, payment at 6.5% about $1,947 a month, no PMI. 10% down: $38,500, loan $346,500, payment about $2,190 plus PMI until equity builds. 3.5% down (FHA): $13,475, loan $371,525, payment about $2,348 plus FHA mortgage insurance. Saving for the 20% target at $650 a month earning 4% takes about 101 months — 8 years and 5 months — which is itself an argument for weighing the smaller-deposit options.",
    },
    faqs: [
      {
        question: "What is the minimum down payment in the US?",
        answer:
          "3% for many conventional loans (for eligible first-time and lower-income buyers), 3.5% for FHA loans, and 0% for VA loans and USDA loans in eligible rural areas. Low-deposit loans carry mortgage insurance and higher payments, but they let buyers purchase years earlier — often the better trade in a rising market.",
      },
      {
        question: "How does PMI removal work?",
        answer:
          "On a conventional loan, you can request PMI cancellation when the balance reaches 80% of the home's original value, and it must terminate automatically at 78% on the original amortisation schedule. If the home has appreciated, a new appraisal (at your cost) can establish 20% equity sooner. FHA mortgage insurance on low-deposit loans generally lasts the life of the loan, removable only by refinancing into a conventional loan.",
      },
      {
        question: "Can my down payment be a gift?",
        answer:
          "Usually yes, from a family member, with a signed gift letter stating the money is not a loan, and a paper trail of the transfer. Lenders scrutinise large deposits: expect to document the source of any deposit larger than about half the monthly income. Seasoned funds — in your account for at least two statement cycles — attract fewer questions.",
      },
      {
        question: "Should I keep saving for 20% or buy sooner with less?",
        answer:
          "Compare the cost of waiting: PMI and a higher rate for a period, versus house price growth and rent paid while you save. If prices rise 3% a year, a $385,000 home costs about $11,550 more per year of waiting. Buying at 10% down and cancelling PMI within a few years is frequently the cheaper path — run both timelines with real numbers rather than following the 20% rule by default.",
      },
    ],
  },

  "real-estate/closing-cost-calculator": {
    quickAnswer:
      "Closing costs are the fees and prepayments due on top of your down payment when you buy — typically 2% to 5% of the purchase price. On a $450,000 purchase with a $360,000 loan, a realistic itemised total is about $8,773: roughly $5,735 of lender, title and government fees plus about $3,038 of prepaid tax and insurance.",
    howItWorks: [
      "Work through the list line by line: lender charges (origination, application, underwriting), third-party services (appraisal, credit report, title search, title insurance, survey, attorney), government charges (recording fees, transfer taxes where they apply), and prepaids (a year of homeowners insurance, several months of property tax, and the initial escrow deposit).",
      "The calculator separates true fees from prepaids, which matters for judgement. Prepaids are your own future bills collected early — they would be paid anyway. Fees are the transaction's real friction, and they are the part worth negotiating and comparing between lenders on the Loan Estimate form.",
      "Some costs scale with the loan (origination as a percentage, title insurance bands), some with the price (transfer taxes), and many are flat (appraisal, recording). That mix is why the total lands in a 2% to 5% band rather than at a single percentage, and why expensive homes in low-tax states sit near the bottom of the band.",
    ],
    formula: "Total closing costs = lender fees + third-party fees + government charges + prepaid items and escrow deposits. As a rule of thumb: 2% to 5% of purchase price for a purchase; refinances typically run lower, around 2% to 3% of the loan amount.",
    example: {
      title: "Worked example: $450,000 purchase, $360,000 loan",
      body: "Lender and third-party fees: origination 0.5% of the loan $1,800, appraisal $450, credit report $60, title search $300, title insurance $2,100, settlement/attorney $900, recording fees $125 — subtotal $5,735. Prepaids: 12 months of homeowners insurance $1,800, plus 3 months of property tax at 1.1% of the price ($1,237.50) — subtotal $3,037.50. Total cash to close beyond the down payment: $8,772.50, about 1.9% of the price. In a high-transfer-tax city the same purchase could total twice that.",
    },
    faqs: [
      {
        question: "Who pays closing costs — buyer or seller?",
        answer:
          "The buyer pays most, but the split is negotiable and custom varies by market. Sellers pay their own costs, dominated by agent commissions (historically 5% to 6% of price, now negotiable and often split differently since the 2024 NAR settlement changes). Buyers can also ask for a seller concession — the seller credits part of the buyer's closing costs — which is effectively a price adjustment and is capped by loan programme rules.",
      },
      {
        question: "Can closing costs be rolled into the loan?",
        answer:
          "Effectively, in three ways: a larger loan amount (needs sufficient equity and appraisal value), a lender credit in exchange for a slightly higher rate, or a seller concession. All three trade a higher ongoing cost for lower cash today. Compare the lender-credit option's rate increase against the fee it covers — on a long-held loan, a quarter-point higher rate usually costs far more than the fee.",
      },
      {
        question: "What is the Loan Estimate and why does it matter?",
        answer:
          "It is the standardised three-page form a lender must give you within three business days of application, itemising the rate, payment and every closing cost, and marking which services you may shop for. Federal rules limit how much final costs can exceed the estimate for most categories: lender fees and transfer taxes cannot increase, and many third-party fees are capped at a 10% cumulative tolerance.",
      },
      {
        question: "Are closing costs tax-deductible?",
        answer:
          "Mostly no for a purchase — they are added to your cost basis in the home instead, which reduces taxable gain when you sell. Points paid to buy down the rate on a primary-home purchase are generally deductible in the year paid if you itemise, and prepaid property tax and mortgage interest follow their own deduction rules. Keep the Closing Disclosure; it is the document your basis calculation will rely on.",
      },
    ],
  },

  "real-estate/home-equity-calculator": {
    quickAnswer:
      "Home equity is your home's value minus what you owe on it. A $520,000 home with a $310,000 mortgage holds $210,000 of equity — 40.4% of the value. Lenders typically let you borrow against part of it: at an 80% combined loan-to-value cap, accessible equity on this home is $106,000.",
    howItWorks: [
      "Enter your home's current market value and the balances of every loan secured on it — first mortgage, HELOC, home equity loan. The calculator subtracts total debt from value and expresses the result in dollars and as a percentage of the home's value (your equity position; one minus the combined loan-to-value).",
      "Then it applies a lender cap. Most lenders cap combined loan-to-value at 80% to 90% for equity products, so the full equity figure is not borrowable. The accessible amount is (cap × value) − existing balances, which the calculator shows.",
      "Equity changes from three directions: principal repayment (slow, reliable), appreciation (fast, unreliable) and new borrowing (instant, negative). Track which one moved your number. Equity built by appreciation can vanish in a downturn, which is why borrowing against the full appraised value at a market peak is how households end up owing more than the home is worth.",
    ],
    formula: "Equity = Home value − total mortgage balances. Equity % = equity ÷ home value. Accessible equity at a lender cap = (CLTV cap × home value) − existing balances.",
    example: {
      title: "Worked example: $520,000 home, $310,000 mortgage",
      body: "Equity = $520,000 − $310,000 = $210,000, which is 40.4% of the value (combined LTV 59.6%). At an 80% CLTV cap, total borrowing against the home may reach $416,000, so accessible equity is $416,000 − $310,000 = $106,000. At a 90% cap — offered by some lenders at higher rates — the accessible figure rises to $158,000, but the payment and risk rise with it.",
    },
    faqs: [
      {
        question: "How can I build equity faster?",
        answer:
          "Principal payments are the lever you control: extra monthly payments, a lump sum, or a shorter loan term all move the balance down faster than the standard schedule. Appreciation may help but cannot be scheduled. Note that in the early years of a 30-year mortgage, scheduled principal is small — on a $310,000 balance at 6.5%, only about $280 of the first payment is principal.",
      },
      {
        question: "HELOC or home equity loan — what is the difference?",
        answer:
          "A home equity loan is a fixed lump sum with a fixed rate and payment, disbursed once. A HELOC is a revolving credit line, usually with a variable rate, a draw period (often 10 years, interest-only) and then a repayment period. HELOC rates move with the prime rate, so a line opened at 8% can be at 10% within a year; the loan's fixed rate cannot.",
      },
      {
        question: "Is home equity loan interest tax-deductible?",
        answer:
          "Only when the borrowed money is used to buy, build or substantially improve the home securing the loan, and only if you itemise deductions, within the overall $750,000 acquisition-debt cap for newer loans. Interest on equity borrowed for other purposes — debt consolidation, a car, tuition — has not been deductible since 2018.",
      },
      {
        question: "How is my home's value determined for an equity loan?",
        answer:
          "The lender orders an appraisal or an automated valuation. The number that matters is the lender's value, which may come in below your estimate; a low appraisal shrinks accessible equity directly. If you disagree, you can pay for a full appraisal or apply elsewhere, but the same valuation data drives most lenders' models.",
      },
    ],
  },

  "real-estate/cap-rate-calculator": {
    quickAnswer:
      "The capitalization rate measures a rental property's return independent of financing: annual net operating income divided by price. A property renting for $2,400 a month with $13,224 of yearly operating expenses produces NOI of $15,576; at a $260,000 price, that is a cap rate of 5.99% — about 6.0%.",
    howItWorks: [
      "Enter the annual rent and the operating expenses: property tax, insurance, maintenance, vacancy allowance, management and HOA. The calculator subtracts expenses from rent to get net operating income (NOI), then divides by the purchase price (or current value) to give the cap rate.",
      "Two things are deliberately excluded from NOI: the mortgage payment and depreciation. That is the point of the measure — it prices the building, not your loan, so two investors with different financing can compare the same property, and one investor can compare properties across cities.",
      "Judge the result against local norms and the risk-free alternative. Cap rates run roughly 4% to 5% in expensive coastal markets and 7% to 10% in cheaper, slower-growing ones. A cap rate far above the local norm is usually compensation for something — deferred maintenance, a weak tenant base, or a declining area — not a bargain.",
    ],
    formula: "Cap rate = Net operating income ÷ Property value. NOI = Gross rental income − vacancy loss − operating expenses (excluding mortgage payments and depreciation).",
    example: {
      title: "Worked example: $2,400 a month rent, $260,000 price",
      body: "Gross rent: $28,800 a year. Expenses: property tax $4,800, insurance $1,800, maintenance at 10% of rent $2,880, vacancy at 5% $1,440, management at 8% $2,304 — total $13,224. NOI = $28,800 − $13,224 = $15,576. Cap rate = $15,576 ÷ $260,000 = 5.99%. Finance it with 25% down at 7% and the cash return on your deposit is far lower than 5.99% in year one — the calculator's companion figure, cash-on-cash, captures that.",
    },
    faqs: [
      {
        question: "What is a good cap rate?",
        answer:
          "There is no universal figure; it prices risk and growth expectations in a specific market. Compare the property's cap rate with recent sales of similar local properties and with the yield on a 10-year Treasury (roughly 4% to 4.5% recently). A rental returning barely more than a government bond, with far more work and risk, is priced for appreciation, not income.",
      },
      {
        question: "What expenses do sellers leave out of advertised cap rates?",
        answer:
          "Vacancy, management (even if you self-manage — your time has a value and a buyer will charge it), and realistic maintenance and capital reserves are the usual omissions. A listing showing a 9% cap rate on rent minus tax and insurance alone can be a 6% cap rate once the missing lines are restored. Rebuild NOI from your own expense estimates before trusting any advertised figure.",
      },
      {
        question: "Is a higher cap rate always better?",
        answer:
          "No. A high cap rate means the price is low relative to current income, which the market usually sets because it expects income to fall, expenses to rise, or the area to decline — or because the building needs work the income statement doesn't show yet. It is a starting question ('why is this cheap?'), not an answer.",
      },
      {
        question: "How do I use cap rate to estimate a property's value?",
        answer:
          "Rearrange the formula: value = NOI ÷ market cap rate. If a building produces $15,576 of NOI and comparable properties trade at a 6.5% cap rate, the income-based value is about $239,600 — below the $260,000 asking price in the example, which tells you the seller is pricing in either lower expenses or expected rent growth.",
      },
    ],
  },

  "real-estate/rental-cash-flow-calculator": {
    quickAnswer:
      "A rental cash flow calculator subtracts every monthly cost — mortgage, tax, insurance, maintenance, management — from the rent. A $275,000 property renting for $2,150 a month with 25% down at 7% produces about $108 a month of cash flow after all expenses: thin, and typical when rates are high. The calculator exists to find that out before you buy, not after.",
    howItWorks: [
      "Enter the price, down payment, loan rate and term, the expected rent, and each operating expense: property tax, insurance, HOA, a maintenance reserve and a management fee, both commonly set as percentages of rent. The calculator computes the mortgage payment, totals the expenses and shows the monthly and annual cash flow.",
      "It also returns the two companion measures. Cap rate (NOI ÷ price) judges the building unleveraged. Cash-on-cash return (annual cash flow ÷ total cash invested, including closing costs) judges your actual deal — at high interest rates the two diverge sharply, and cash-on-cash is the one that pays your bills.",
      "Stress the inputs before believing the output. Drop the rent 5%, raise maintenance, add a vacancy allowance (5% to 8% of rent is a standard provision even though this calculator's lines focus on cash expenses). A deal that only works with full occupancy and zero repairs is not a deal; it is a hope.",
    ],
    formula: "Monthly cash flow = Rent − mortgage payment (P&I) − tax − insurance − HOA − maintenance reserve − management fee. NOI = annual rent − annual operating expenses (excluding the mortgage). Cash-on-cash = annual cash flow ÷ (down payment + closing costs).",
    example: {
      title: "Worked example: $275,000 purchase, $2,150 monthly rent",
      body: "25% down is $68,750; the $206,250 loan at 7% over 30 years costs $1,372.19 a month. Expenses: tax $260, insurance $130, maintenance at 5% of rent $107.50, management at 8% $172 — total $669.50. Cash flow = $2,150 − $1,372.19 − $669.50 = $108.31 a month, $1,300 a year. NOI is $17,766 (rent minus operating expenses), a cap rate of 6.46%. Cash invested is $74,250 including estimated closing costs, so cash-on-cash return is about 1.75% — the honest summary of leverage at a 7% mortgage rate.",
    },
    faqs: [
      {
        question: "What is the 1% rule in rental property?",
        answer:
          "A screening heuristic: monthly rent should be at least 1% of the total purchase price for a property to have a chance of cash-flowing. The example property rents at 0.78% of price ($2,150 ÷ $275,000) and indeed produces only thin cash flow. In high-price coastal markets few properties pass 0.7%; in parts of the Midwest 1% or better is achievable. It screens deals in seconds and replaces none of the detailed maths.",
      },
      {
        question: "How much should I reserve for maintenance and capital expenses?",
        answer:
          "A common provision is 5% of rent for routine maintenance plus a separate capital reserve for big items — roof, HVAC, water heater — based on their remaining life. Older properties need more. Properties shown with zero maintenance are being marketed, not analysed; a single $8,000 roof erases over six years of the example's cash flow.",
      },
      {
        question: "Should I include vacancy in cash flow?",
        answer:
          "Yes — budget 5% to 8% of rent even in a strong market. A property that is empty for one month in twelve, plus turnover costs, roughly matches a 8% to 10% economic vacancy. In the worked example, applying 5% vacancy ($107.50 a month) reduces cash flow to about $1 a month, which is exactly the kind of fragility the check is meant to expose.",
      },
      {
        question: "Why is cash flow low when the cap rate looks decent?",
        answer:
          "Because the mortgage rate (7%) exceeds the cap rate (6.46%). When borrowing costs more than the property yields, leverage works against you — negative leverage. Cash flow then depends on rent growth and appreciation rather than current income, which is a speculation the calculator makes visible rather than hiding.",
      },
    ],
  },

};
