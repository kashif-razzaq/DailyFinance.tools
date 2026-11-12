import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_A1: Record<string, ToolContentEntry> = {
  "personal-wealth/savings-calculator": {
    quickAnswer:
      "A savings calculator projects what a starting balance plus regular deposits grows to at a given APY. Deposit $10,000, add $300 a month at 4.5% APY, and after 10 years you hold about $61,029 — $46,000 of deposits and roughly $15,029 of interest, earned month by month as each balance compounds.",
    howItWorks: [
      "Enter your starting balance, monthly deposit, APY and years. The calculator credits interest on the balance each month, then adds your deposit, so every deposit starts earning the month after it lands. APY is the rate you actually earn over a year once compounding is included, which is why the tool asks for APY rather than the nominal rate your bank may advertise alongside it.",
      "Read the split between deposits and interest, not just the final balance. If deposits dominate, a higher rate matters less than a higher deposit; if interest is a large share, the rate is doing real work and shopping for a better APY pays off. The year-by-year chart shows the bend: growth starts almost flat, then curves upward as interest earns interest on a larger base.",
      "The rate you enter is a snapshot, not a promise. High-yield savings rates move with the federal funds rate, which the Federal Reserve held at 3.75% to 4.00% in October 2026 after raising it in September. Top accounts paid about 4.2% to 4.4% APY in November 2026, while the national average savings rate sat at 0.38% — the gap between those two numbers is what switching banks is worth.",
      "The projection is pre-tax. Interest in a regular savings account is taxed as ordinary income in the year it is credited, and your bank reports it on Form 1099-INT when it exceeds $10. At a 22% marginal rate, roughly a fifth of the interest in the example below goes to tax. The calculator does not deduct tax, so treat its interest figure as the amount before the IRS takes its share.",
      "Two assumptions deserve a second look. The calculator holds your rate and deposit constant for the whole horizon, and it assumes no withdrawals — real savings plans change both. It also shows nominal dollars: at 3% inflation, the purchasing power of the final balance is roughly three-quarters of the headline figure after 10 years. Re-run the numbers when your rate changes rather than trusting a projection made years earlier.",
    ],
    formula: "Future value = P × (1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) − 1) / (r/12)], where P is the starting balance, PMT the monthly deposit, r the annual rate as a decimal and t the years.",
    example: {
      title: "Worked example: $10,000 plus $300 a month for 10 years",
      body: "Start with $10,000 and deposit $300 a month into an account paying 4.5% APY, compounded monthly, for 10 years. Your deposits total $46,000 ($10,000 plus 120 deposits of $300). The end balance is $61,029, so interest contributes about $15,029 — roughly a quarter of the final amount, earned without any extra deposits. Run the same plan at the 0.38% national average rate and the balance reaches only $47,074, with barely $1,074 of interest: the rate choice alone is worth about $13,955 over the decade. The interest share also grows with time: the account earns about $540 of interest in its first year, but roughly $2,600 in its tenth, because the balance doing the earning is far larger by then.",
    },
    faqs: [
      {
        question: "What APY should I enter?",
        answer:
          "Use the APY your bank quotes, not the nominal interest rate. APY already includes compounding, so a 4.5% APY account grows slightly faster than a 4.5% nominal rate compounded monthly. In November 2026 top online accounts paid roughly 4.2% to 4.4% APY while the national average sat at 0.38%; rates are variable and move with the Federal Reserve rate.",
      },
      {
        question: "Is the interest on savings taxed?",
        answer:
          "Yes. Interest earned in a regular savings account is taxed as ordinary income in the year it is credited, and your bank reports it on Form 1099-INT if it exceeds $10. The calculator shows pre-tax growth, so at a 22% marginal rate you would keep about 78% of the interest shown.",
      },
      {
        question: "How much faster does monthly compounding grow money than annual?",
        answer:
          "By a small amount. At a 4.5% nominal rate, monthly compounding turns the rate into a 4.59% effective yield. Compounding frequency matters far less than the rate itself and the size of your deposits, so chase the rate first and treat frequency as a tiebreaker.",
      },
      {
        question: "Does this calculator account for inflation?",
        answer:
          "No. It shows nominal dollars. At 3% inflation, the $61,029 balance in the worked example buys what about $45,400 buys today, so a balance growing at 4.5% gains roughly 1.5% a year in real terms before tax. Use the inflation calculator alongside this one for the real picture.",
      },
    ],
  },

  "personal-wealth/compound-interest-scaler-calculator": {
    quickAnswer:
      "This calculator scales compound growth: it shows how a starting amount plus monthly contributions multiplies over long horizons. $5,000 invested with $250 a month at a 7% annual return becomes about $150,425 in 20 years — $65,000 contributed and $85,425 of growth, more than everything paid in over the two decades.",
    howItWorks: [
      "Enter a starting amount, a monthly contribution, an annual return, a time horizon and a compounding frequency for the lump sum. Contributions are always modelled monthly, so each one starts earning from the month after it lands. The frequency choice changes the result by a little: at 7%, annual compounding turns a $5,000 lump sum into $19,348 over 20 years, while monthly compounding gives $20,194 — about $845 more from crediting interest twelve times a year instead of once.",
      "The point of the tool is the scaling effect. In the first years, contributions do most of the work. Later, returns on the accumulated balance overtake contributions: in the example below, the first 10 years build about $53,320, and the second 10 add about $97,105, even though the deposits in each decade are identical at $30,000. The crossover arrives in the second decade: by year 17, growth of about $57,900 has passed total contributions of $56,000.",
      "Test the horizon before you test the rate. Extending the example from 20 to 25 years adds about $80,720, taking the balance to roughly $231,145 — and the horizon is the one input you control completely. Raising the assumed return by a point looks similar on screen, but no investment guarantees the higher return.",
      "Choose the return honestly. US stocks have returned roughly 10% a year before inflation over very long periods, but with deep falls along the way, and many planners model 6% to 8% for a diversified portfolio. This calculator assumes a smooth return; real returns arrive unevenly, and a bad sequence early on leaves a smaller base for later growth.",
      "Remember the wrapper matters as much as the return. In a taxable account, dividends and realised gains are taxed as they occur, which drags the compounding rate down. Inside a 401(k) or IRA, the same return compounds untaxed until withdrawal — or never taxed, for a Roth. The calculator shows pre-tax growth either way.",
    ],
    formula: "Future value = P × (1 + r/n)^(n×t) + PMT × [((1 + r/12)^(12t) − 1) / (r/12)], with P the starting amount, PMT the monthly contribution, r the annual return, n the compounding periods per year for the lump sum and t the years.",
    example: {
      title: "Worked example: $5,000 and $250 a month at 7% for 20 years",
      body: "Invest $5,000, add $250 a month, and earn a steady 7% a year for 20 years. Total contributions are $65,000. The final value is about $150,425, which means compounding added $85,425 — more than you put in. Stop after 10 years instead and the balance is only about $53,320, which is why the second decade matters so much: it contributes roughly $97,105 of growth on the same $30,000 of deposits. Extend the plan five more years, to 25, and the balance reaches about $231,145.",
    },
    faqs: [
      {
        question: "What return should I assume for investments?",
        answer:
          "Use a cautious planning figure, not a best case. US stocks have returned roughly 10% a year before inflation over very long periods, but with deep falls along the way. Many planners model 6% to 8% for a diversified portfolio. This calculator assumes a smooth return; real returns arrive unevenly.",
      },
      {
        question: "Why does the last decade add so much more than the first?",
        answer:
          "Because interest earns interest on a bigger base. In the worked example, the first 10 years build about $53,320; the next 10 add about $97,105, even though contributions are identical. The base, not the deposit, drives late growth — which is why starting early beats starting big.",
      },
      {
        question: "Is compound interest taxed every year?",
        answer:
          "In a taxable brokerage account, dividends and realised gains are taxed as they occur. In a 401(k) or IRA, tax is deferred or, for a Roth account, not charged on qualified withdrawals — which is why the same return compounds faster inside a retirement account.",
      },
      {
        question: "What is the difference between compounding monthly and annually?",
        answer:
          "Monthly compounding credits returns 12 times a year, so each credit starts earning sooner. At 7%, monthly compounding produces an effective annual yield of about 7.23%. The gap grows with the rate and the horizon, but it stays small next to the effect of the rate itself.",
      },
    ],
  },

  "personal-wealth/interest-calculator": {
    quickAnswer:
      "An interest calculator computes simple and compound interest on the same principal so you can compare them. On $20,000 at 6% for 5 years, simple interest pays $6,000; compound interest, credited monthly, pays $6,977 — the $977 gap is interest earned on interest, and it widens every year.",
    howItWorks: [
      "Enter the principal, any monthly contribution, the annual rate, the term and how often interest compounds. The calculator returns the interest earned and the final amount under both methods, side by side, with a chart tracking the two balances year by year so the gap is visible rather than abstract.",
      "Simple interest is charged or paid only on the original principal, so it grows in a straight line — the same dollar amount every year. In this tool the simple leg accrues on deposited principal only, never on past interest, so monthly contributions add to the base but the interest they earn does not itself earn interest. That linearity is the method's signature: the interest column in the year-by-year table rises by the same dollar amount every year, while the compound column's yearly interest grows.",
      "Compound interest is calculated on principal plus accumulated interest, so it accelerates. The tool converts your chosen frequency into an effective monthly rate: with monthly compounding selected, a 6% nominal rate credits 0.5% each month. At 6% nominal, the effective annual yield is 6.00% compounded annually, 6.14% quarterly, 6.17% monthly and 6.18% daily — the whole frequency range is worth 18 basis points, while a single point of rate is worth far more.",
      "The method is written into the product terms. Savings accounts, money market accounts and CDs compound, and banks quote APY so you can compare them directly. Most consumer loans — mortgages, auto loans, personal loans — charge simple interest on the outstanding balance. Credit cards effectively compound, because unpaid interest is added to the balance each cycle.",
      "Use the comparison to judge offers, but read the whole offer. A deposit quoted with monthly compounding beats the same rate compounded annually, and a loan quote means little until you know the method and the fees. Fees are captured by APR, not by the interest rate, so two loans at the same rate can cost very different amounts.",
    ],
    formula: "Simple: A = P × (1 + r × t). Compound: A = P × (1 + r/n)^(n×t), where P is principal, r the annual rate, t the years and n the compounding periods per year. Monthly contributions compound from the month they are made.",
    example: {
      title: "Worked example: $20,000 at 6% for 5 years",
      body: "Simple interest: $20,000 × 6% × 5 = $6,000 of interest, final amount $26,000. Compound interest, credited monthly: $20,000 × (1 + 0.06/12)^60 = $26,977, so interest is $6,977. Over 5 years the methods differ by $977. Stretch the term to 20 years and simple interest pays $24,000 while monthly compounding pays about $46,204 — the gap widens from under $1,000 to more than $22,000, which is why the method matters far more over decades than over months.",
    },
    faqs: [
      {
        question: "Which bank accounts pay compound interest?",
        answer:
          "Almost all of them. Savings accounts, money market accounts and CDs credit interest to the balance, and later interest is calculated on the higher balance. Banks quote APY, which is the compounded rate, so you can compare accounts directly without doing the frequency maths yourself.",
      },
      {
        question: "Do loans use simple or compound interest?",
        answer:
          "Most consumer loans — mortgages, auto loans, personal loans — use simple interest calculated on the outstanding balance, which falls as you pay. Credit cards effectively compound because unpaid interest is added to the balance each cycle, so carrying a balance costs more than the stated rate suggests.",
      },
      {
        question: "What does compounding daily versus monthly change?",
        answer:
          "Very little at normal rates. A 6% nominal rate becomes about 6.17% effective with monthly compounding and about 6.18% with daily compounding. Rate and term matter far more than frequency — on $20,000 over 5 years, the daily-versus-monthly difference is only a few dollars.",
      },
      {
        question: "Why do two calculators give different answers for the same inputs?",
        answer:
          "Usually the compounding frequency or the timing of deposits differs. Check whether interest is credited monthly or annually and whether a deposit is assumed at the start or the end of each period. Both change the result by small, explainable amounts — the method, not an error, is usually the cause.",
      },
    ],
  },

  "personal-wealth/simple-interest-calculator": {
    quickAnswer:
      "Simple interest is calculated only on the original principal: interest = principal × rate × time. Borrow or deposit $8,000 at 5% for 3 years and the interest is exactly $1,200, for a total of $9,200 — the same $400 every year, with no interest on interest at any point in the term.",
    howItWorks: [
      "Enter the principal, the annual interest rate and the term in years and months. The calculator converts the term to years — 18 months is 1.5 years — then multiplies the three together. There is no compounding step, so interest never earns interest, and the result shows the interest per year and per month alongside the total.",
      "Because growth is linear, each year adds the same amount of interest: in the example, $400 a year, every year. Doubling the term exactly doubles the interest, which makes simple interest easy to check by hand and easy to spot in a loan quote — if the interest charge is identical in year one and year five, the loan is simple.",
      "Switch on the compound comparison to see what monthly compounding at the same rate would give instead. On the worked example the difference is only $92 over 3 years, which is why the two methods look similar over short terms. Over 20 years the same $8,000 at 5% earns $8,000 of simple interest but about $13,701 compounded monthly — the gap is a rounding error at first, then most of the return.",
      "Simple interest shows up in short-term lending, many auto loans and some personal loans, where interest is charged on the outstanding balance without compounding. US Treasury bills and some short-term notes are also priced on a simple basis. Most savings products compound instead, so this calculator is the wrong tool for projecting a savings account.",
      "Mortgages work on a related idea: each month's interest is charged on the current balance only, and the payment is set so the balance reaches zero at the end of the term. That schedule is called amortization, and interest is never charged on past interest as long as you pay on time. If a product does compound, this calculator understates the true growth or cost, so confirm the method in the product terms first.",
    ],
    formula: "Interest = P × r × t; Amount = P × (1 + r × t), where P is principal, r the annual rate as a decimal and t the time in years (years plus months ÷ 12).",
    example: {
      title: "Worked example: $8,000 at 5% for 3 years",
      body: "Interest = $8,000 × 0.05 × 3 = $1,200. The final amount is $8,000 + $1,200 = $9,200, with $400 of interest landing each year and $33.33 each month. If the same money compounded monthly, the final amount would be $9,292 — only $92 more over 3 years. Stretch the term to 20 years and the picture changes: simple interest pays $8,000 in total, while monthly compounding pays about $13,701. Time, not the rate, is what turns the compounding gap from a footnote into the main event.",
    },
    faqs: [
      {
        question: "Where is simple interest actually used?",
        answer:
          "Short-term loans, many auto loans, and some personal loans calculate interest on the outstanding balance without compounding. US Treasury bills and some short-term notes are also priced on a simple basis. Most savings products compound instead, which is why a savings projection needs a compound calculator.",
      },
      {
        question: "How do I calculate simple interest for months instead of years?",
        answer:
          "Convert the term to years: 18 months is 1.5 years. Interest = principal × rate × 1.5. The same works for days — divide the number of days by 365 (some lenders use 360; check the loan terms). This calculator takes years and months separately and does the conversion for you.",
      },
      {
        question: "Is simple interest better for borrowers or lenders?",
        answer:
          "For borrowers, when the alternative is compounding at the same rate, because unpaid interest does not itself accrue interest. For savers it is worse. In practice, the rate and fees usually matter more than the method — a 2-point rate difference swamps the simple-versus-compound gap on most short loans.",
      },
      {
        question: "Does a mortgage use simple interest?",
        answer:
          "Effectively yes, in a specific way: each month's interest is charged on the current balance only, and the payment is set so the balance reaches zero at the end of the term. That schedule is called amortization, and interest is never charged on past interest as long as you pay on time.",
      },
    ],
  },

  "personal-wealth/apy-calculator": {
    quickAnswer:
      "This calculator converts a nominal interest rate and compounding frequency into APY — the effective annual yield — and can run the conversion in reverse. A 4.8% nominal rate compounded monthly is a 4.91% APY; compounded daily it is about 4.92%. Banks must quote APY on deposit accounts so you can compare them on equal terms.",
    howItWorks: [
      "Choose a direction first. Forward mode takes the nominal (stated) annual rate a bank advertises and shows the true yield after compounding. Reverse mode takes a quoted APY and backs out the nominal rate behind it — handy when you want to compare a deposit against a loan quoted in APR. Then pick the compounding frequency: annually, quarterly, monthly or daily.",
      "APY answers the question that matters for a deposit: if I leave $100 here for a year, what rate describes my actual earnings? Two accounts with the same nominal rate but different compounding have different APYs, and the higher APY pays more. The difference is small at ordinary rates, but it is real money on a large balance held for years.",
      "The frequency table makes the premium visible. The same 4.8% nominal rate is a 4.80% APY compounded annually, 4.89% quarterly, 4.91% monthly and 4.92% daily. Moving from annual to monthly compounding is worth about 11 basis points; moving from monthly to daily is worth about 1. Frequency is a tiebreaker, not a reason to choose an account.",
      "Use APY only for comparing deposit accounts with each other. For loans, the equivalent comparison figure is APR, which goes further and folds in fees but does not compound. Comparing a loan's APR with a savings account's APY is a common and misleading shortcut — they measure different things, and the reverse mode exists precisely to put them on the same footing.",
      "Remember the APY is a snapshot with conditions attached. On a variable-rate savings account the bank can change the rate at any time, and the APY follows; on a CD the APY is fixed for the term. APY also assumes the balance stays in the account for a full year and that all interest stays and compounds — withdrawals, a part-year balance or a tiered rate all reduce what you actually receive.",
    ],
    formula: "APY = (1 + r/n)^n − 1, where r is the nominal annual rate and n the number of compounding periods per year. Reverse: APR = n × ((1 + APY)^(1/n) − 1).",
    example: {
      title: "Worked example: 4.8% nominal, compounded monthly",
      body: "Divide 4.8% by 12 to get 0.4% per month. Compound it 12 times: (1.004)^12 − 1 = 4.907%, so the APY is 4.91%. On a $25,000 balance held a full year, that is about $1,227 of interest rather than the $1,200 the nominal rate suggests. Run the reverse mode on a 4.91% APY and you get back an equivalent 4.80% nominal rate. Hold the full $25,000 for 5 years at that APY and the balance reaches about $31,766, with monthly compounding adding roughly $766 beyond what simple interest at 4.8% would pay.",
    },
    faqs: [
      {
        question: "What is the difference between APR and APY?",
        answer:
          "APY describes what a deposit earns, including compounding. APR describes what a loan costs, including most fees, but it does not compound. Comparing a loan's APR with a savings account's APY is a common and misleading shortcut — use this calculator's reverse mode to put both on a nominal footing first.",
      },
      {
        question: "Can APY change after I open the account?",
        answer:
          "On a variable-rate savings account, yes — the bank can change the rate at any time, and the APY follows. On a CD, the APY is fixed for the term. The APY quoted at opening is a snapshot, not a promise, for variable accounts, which is why high-yield rates moved with the Fed's September 2026 rate rise.",
      },
      {
        question: "Why is my interest payment lower than the APY suggests?",
        answer:
          "APY assumes the balance stays in the account for a full year and that all interest stays and compounds. Withdrawals, a balance that was present for only part of the period, or a tiered rate on part of the balance all reduce what you actually receive. Check the statement period before concluding the bank paid short.",
      },
      {
        question: "Do all banks have to disclose APY?",
        answer:
          "In the US, yes. The Truth in Savings Act requires banks to disclose the APY for deposit accounts in a standard format, which is what makes cross-bank comparison possible. Credit unions follow the same rule through the NCUA, so a credit union APY and a bank APY are directly comparable.",
      },
    ],
  },

  "personal-wealth/high-yield-savings-cd-calculator": {
    quickAnswer:
      "This calculator compares a high-yield savings account with a CD on the same deposit, before and after tax. On $25,000 over 3 years, a 5.0% CD grows to $29,037 and a 4.6% high-yield savings account to $28,692 — the CD pays about $345 more, in exchange for locking the money up.",
    howItWorks: [
      "Enter the deposit, the CD's APY, the savings account's APY, the term, the compounding frequency and your marginal tax rate. Both products use the same frequency, so the comparison is clean. A third bar shows a regular 0.5% savings account on the same deposit, which prices the decision to move the money at all, not just the choice between the two better options.",
      "Interest on both products is taxed as ordinary income in the year it is credited, including inside a CD you cannot touch yet. The calculator shows each product's earnings before tax and after tax at your marginal rate, as a flat reduction on the total interest. That is a simplification: in reality the tax is due year by year, which slightly reduces the compounding, so the after-tax figures are close estimates rather than exact.",
      "The decision is rarely the headline rate. A CD wins when its rate premium is real and you will not need the money early — early-withdrawal penalties, commonly 3 to 12 months of interest, erase the advantage quickly. On the worked example, a 6-month penalty at 5% costs $625, which wipes out the CD's $345 edge and leaves you worse off than the savings account.",
      "Savings wins when the money is an emergency fund or a near-term purchase, and when rates are rising: the savings rate follows the market up while the CD is stuck at its locked rate. In November 2026 top high-yield accounts paid about 4.2% to 4.4% APY while jumbo CDs reached up to 4.85% — a premium of under half a point, which rarely compensates for losing access for years.",
      "Both products carry the same federal insurance: FDIC coverage up to $250,000 per depositor, per bank, per ownership category, with credit union accounts covered to the same limit through the NCUA. If the choice feels close, a CD ladder — splitting the deposit across CDs of different terms so one matures every year — averages the rates on offer and restores regular access to part of the money.",
    ],
    formula: "Value = Deposit × (1 + APY/n)^(n×t), where n is the compounding periods per year and t the term in years. After-tax earnings = earnings × (1 − marginal tax rate).",
    example: {
      title: "Worked example: $25,000 for 3 years, CD at 5.0% vs savings at 4.6%",
      body: "With monthly compounding, the CD reaches $25,000 × (1 + 0.05/12)^36 = $29,037 and the savings account reaches $25,000 × (1 + 0.046/12)^36 = $28,692. The CD's edge is $345 over 3 years. At a 22% marginal tax rate, the CD's $4,037 of interest keeps $3,149 after tax and the savings account's $3,692 keeps $2,880 — the ranking does not change. Against a regular 0.5% account, which reaches only $25,378, the better option earns an extra $3,659, which is the real prize in this comparison.",
    },
    faqs: [
      {
        question: "What is the penalty for breaking a CD early?",
        answer:
          "It is set by the bank: commonly 90 days of interest on terms under a year, and 6 to 12 months of interest on longer terms. The penalty can eat into principal if you withdraw very early. Brokered CDs work differently — you sell them on a market, possibly at a loss, rather than paying a bank penalty.",
      },
      {
        question: "Are CDs and high-yield savings accounts insured?",
        answer:
          "Yes, both are deposit accounts. FDIC insurance covers up to $250,000 per depositor, per bank, per ownership category; credit union accounts carry the same limit through the NCUA. Balances above the limit at one bank are uninsured, so large deposits should be spread across banks.",
      },
      {
        question: "When does a high-yield savings account beat a CD?",
        answer:
          "When rates are rising (the savings rate follows the market up while the CD is stuck), when you may need the money, or when the CD's rate premium is small. A premium under about half a percentage point rarely compensates for losing access for years — in November 2026 the gap between top savings and jumbo CD rates was about that size.",
      },
      {
        question: "What is a CD ladder?",
        answer:
          "Splitting a deposit across CDs of different terms — for example 1, 2, 3, 4 and 5 years — so one matures every year. It averages the rates on offer and restores regular access to part of the money, reducing both lock-in and reinvestment risk. Each maturing rung can be spent or rolled into a new 5-year CD.",
      },
    ],
  },

  "personal-wealth/high-yield-savings-calculator": {
    quickAnswer:
      "A high-yield savings calculator shows what a deposit earns at an online-bank APY versus a low branch rate. $15,000 held 3 years grows to $17,164 at 4.5% APY but only $15,457 at 1.0% — a $1,707 difference for the same money and the same federal insurance.",
    howItWorks: [
      "Enter your deposit, a monthly contribution, the time period, the high-yield APY and the regular APY. Both accounts use monthly compounding with the same deposit and the same contribution, so the gap between them is pure rate advantage — nothing else differs, and the year-by-year table lists both balances and the gap at each year-end so the cost of waiting is visible rather than abstract.",
      "Adding a monthly contribution widens the gap further, because every deposit earns the higher rate too. With a $10,000 deposit plus $300 a month over 5 years, a 4.5% account reaches $32,662 while a 0.4% account reaches $28,380 — a $4,281 difference on $28,000 paid in. The contribution does not change the rate story; it scales it.",
      "Online banks can pay more because they have no branch network to fund, and they compete nationally for deposits. The accounts carry the same FDIC insurance — up to $250,000 per depositor, per bank — as a branch account. The trade-offs are usually no cash deposits and transfers that take 1 to 3 business days, which matters for money you might need instantly.",
      "Remember the rate is variable. The APY you see today follows the federal funds rate with a lag — the Fed held its target at 3.75% to 4.00% in October 2026 after raising it in September, and top online accounts paid about 4.2% to 4.4% APY in November 2026 against a 0.38% national average. Re-run the calculator when rates move rather than treating the first projection as a forecast.",
      "The projection is pre-tax. Interest is taxed as ordinary income in the year it is paid, so on the $2,164 of interest in the worked example a saver in the 22% bracket owes about $476. That does not change the comparison — both accounts are taxed the same way — but it does change what you keep, and it is one more reason the account suits an emergency fund rather than long-term wealth building. Keep one month of expenses in your everyday account for instant access and the rest here, since transfers out can take a few days.",
    ],
    formula: "Future value = Deposit × (1 + APY/12)^(12t), plus monthly contributions compounded the same way. Interest earned = future value − deposit − total contributions.",
    example: {
      title: "Worked example: $15,000 for 3 years at 4.5% vs 1.0%",
      body: "With monthly compounding, $15,000 at 4.5% APY becomes $15,000 × (1 + 0.045/12)^36 = $17,164, so interest is $2,164. At 1.0% the same deposit becomes $15,457, so interest is $457. Same deposit, same insurance, same access — the higher APY pays $1,707 more over the 3 years. At the 0.38% national average the balance would reach only about $15,172, which is why the comparison that matters is against your current account's actual rate, not against 1.0%.",
    },
    faqs: [
      {
        question: "Why can online banks pay higher APYs?",
        answer:
          "They have no branch network to fund, and they compete nationally for deposits. The accounts carry the same FDIC insurance (up to $250,000 per depositor, per bank) as a branch account. The trade-offs are usually no cash deposits and transfers that take 1 to 3 business days.",
      },
      {
        question: "Is interest from a high-yield savings account taxed?",
        answer:
          "Yes, as ordinary income in the year it is paid, at your marginal rate. On $2,164 of interest, a saver in the 22% bracket owes about $476. The calculator shows pre-tax growth, so subtract your tax rate from the interest figure to see what you keep.",
      },
      {
        question: "How many withdrawals can I make each month?",
        answer:
          "Federal rules that once capped savings withdrawals at six per month were suspended in 2020, but many banks keep their own limits or excess-withdrawal fees in the account terms. Check the fee schedule if you plan to use the account like a current account.",
      },
      {
        question: "Should my emergency fund sit in a high-yield account?",
        answer:
          "Yes — it is the standard place for one. The money stays liquid and insured while earning a market rate. Keep one month of expenses in your everyday account for instant access and the rest in the high-yield account, since transfers out can take a few days.",
      },
    ],
  },

  "personal-wealth/savings-goal-calculator": {
    quickAnswer:
      "A savings goal calculator works backwards: it tells you the monthly deposit needed to reach a target by a deadline. To reach $30,000 in 5 years starting from $5,000 at a 4% return, you need to save about $360 a month.",
    howItWorks: [
      "The tool runs in two modes. Monthly mode solves for the deposit: enter the target, what you have saved, the expected return and the deadline, and it returns the monthly amount that gets you there. Time mode works the other way: enter the monthly amount you can actually afford and it simulates month by month until the balance reaches the goal, or warns you if it never does.",
      "The monthly figure comes from growing your existing savings forward, subtracting that from the target, and solving for the deposit that covers the rest with interest. If your savings already cover the goal, the required deposit is zero. The tool also shows your progress as a percentage of the goal, so a $5,000 start on a $30,000 target reads as 16.7% funded before the first new deposit lands.",
      "The return assumption should match where the money will sit. For a goal under 3 years away, that is a savings account rate — top high-yield accounts paid about 4.2% to 4.4% APY in November 2026. Investing a short-term goal in stocks can leave you short exactly when the money is due, because a market fall near the deadline has no time to recover.",
      "Read the output as a budget line, not a wish. If the required deposit does not fit your budget, the honest levers are a later deadline, a smaller target, or a lump sum added now — each month of delay raises the required deposit because there is less time for both deposits and growth. Money added today is worth more than the same money spread out: $2,000 added now at 4% is worth about $2,443 in 5 years.",
      "For goals priced in today's money — a house deposit, a car, a wedding — remember the target moves while you save. Either raise the target by roughly 3% per year of waiting, or use a return net of inflation in the calculator. House deposits are the classic case: the price of the house, and therefore the deposit, rises while the savings plan runs.",
    ],
    formula: "Monthly deposit = [Target − Saved × (1 + r/12)^(12t)] × (r/12) / [((1 + r/12)^(12t)) − 1], where r is the annual return and t the years to the deadline.",
    example: {
      title: "Worked example: $30,000 house deposit in 5 years",
      body: "You have $5,000 saved and the money earns 4% a year. The $5,000 grows to about $6,105 in 5 years, leaving $23,895 to come from deposits and their earnings. The required deposit is $360.41 a month — call it $361. Total deposits come to $21,625, and interest supplies the remaining $3,375 of the target. Switch to time mode with $500 a month instead and the goal is reached in just 45 months, a year and a quarter early.",
    },
    faqs: [
      {
        question: "What if I save weekly or every payday instead of monthly?",
        answer:
          "Convert to a monthly equivalent: a deposit every two weeks happens 26 times a year, so multiply it by 26 and divide by 12. Saving $167 every payday is about $362 a month. More frequent deposits earn marginally more because the money arrives sooner on average.",
      },
      {
        question: "Should I include inflation in my target?",
        answer:
          "For goals priced in today's money — a house deposit, a car, a wedding — yes, if the price is likely to rise. Either raise the target by roughly 3% per year of waiting, or use a return net of inflation in the calculator. House deposits are the classic case: the target moves while you save.",
      },
      {
        question: "What return should I use for a goal 10 or more years away?",
        answer:
          "A balanced portfolio assumption of 5% to 7% is common for long horizons, but the result is an estimate, not a promise. Run the calculation at a lower return as well; if the plan only works at the optimistic rate, the deposit is too small.",
      },
      {
        question: "Is it better to add a lump sum or raise the monthly deposit?",
        answer:
          "Mathematically, money added earlier is worth more because it compounds for the whole period. $2,000 added today at 4% is worth about $2,443 in 5 years; the same $2,000 spread as extra deposits arrives later and grows less. If a bonus or tax refund is available, front-loading wins.",
      },
    ],
  },

  "personal-wealth/future-value-calculator": {
    quickAnswer:
      "A future value calculator projects what a sum of money will be worth at a future date given a growth rate. $12,000 growing at 8% a year for 15 years has a future value of about $38,066 compounded annually — $39,683 with monthly compounding, the tool's default — the original sum plus about $26,000 of growth.",
    howItWorks: [
      "Enter the present amount, a periodic payment, the payment frequency, the annual growth rate and the number of years. The calculator compounds the lump sum and each payment for the time it is invested, then splits the result into growth on the lump sum and growth on the payments, so you can see which input is doing the work.",
      "Frequency is a real input here, not a display choice. Monthly compounding of the same 8% turns $12,000 into $39,683 over 15 years, against $38,066 compounded annually — $1,617 more from crediting interest 12 times a year instead of once. Payments follow the same frequency: $500 a month at 8% grows to about $173,019 on its own over 15 years.",
      "The annuity-type switch changes when payments are assumed to land. Ordinary payments arrive at the end of each period; annuity-due payments arrive at the start and earn one extra period of growth each. On the $500-a-month example that timing difference is worth about $1,153 over 15 years — small, but it is the difference between a contribution made on payday and one made a month later.",
      "Treat the rate as the whole story. At 15 years, the difference between 6% and 8% on $12,000 is about $9,307 — a third more growth from two extra points. Fees work the same way in reverse: an investment earning 8% with a 1% annual fee compounds at about 7%, cutting the 15-year result from $38,066 to roughly $33,108.",
      "Read the inflation-adjusted figure before deciding whether a plan is enough. The tool divides the nominal result by the inflation factor you enter: at 3% inflation, the $38,066 example is worth about $24,433 in today's purchasing power. Future value is the base calculation behind retirement projections and savings goals; its mirror image is present value, which discounts a future amount back to today at the same rate.",
    ],
    formula: "Future value = Present value × (1 + r)^t. With regular contributions: FV = PV × (1 + r)^t + PMT × [((1 + r)^t − 1) / r], where r is the periodic rate and t the number of periods. Annuity-due payments are multiplied by (1 + r).",
    example: {
      title: "Worked example: $12,000 at 8% for 15 years",
      body: "FV = $12,000 × 1.08^15 = $12,000 × 3.172 = $38,066 with annual compounding. The growth of $26,066 is more than double the amount invested. With monthly compounding, the tool's default, the same inputs give $39,683. At 6% instead, the annual-compounded result is $28,759 — a reminder that the assumed rate, which no saver can guarantee, moves the answer more than most other inputs. Add $500 every single month and the 15-year total reaches about $212,702.",
    },
    faqs: [
      {
        question: "What is the difference between future value and present value?",
        answer:
          "They are the same calculation run in opposite directions. Future value grows today's money forward at a rate; present value discounts a future amount back at the same rate. $38,066 in 15 years at 8% and $12,000 today are the same value expressed at different dates.",
      },
      {
        question: "Should the growth rate be before or after inflation?",
        answer:
          "Either works, but be consistent. Use a nominal rate (for example 8%) to see the nominal future balance. Use a real rate (nominal minus inflation, roughly 5% if inflation is 3%) to see the answer in today's purchasing power — or use the tool's inflation input, which shows both.",
      },
      {
        question: "How do fees change future value?",
        answer:
          "Fees reduce the effective rate. An investment earning 8% with a 1% annual fee compounds at about 7%. Over 15 years on $12,000 that cuts the future value from $38,066 to roughly $33,108 — the fee consumes about $5,000 of growth, which is why low-cost funds matter most over long horizons.",
      },
      {
        question: "Does future value work for a single deposit only?",
        answer:
          "No. The formula extends to a series of deposits (an annuity) by compounding each deposit for the time it is invested. Most savings and retirement calculators are future-value calculations with a deposit stream added, and this tool's payment input is exactly that stream.",
      },
    ],
  },

  "personal-wealth/budget-calculator": {
    quickAnswer:
      "A budget calculator totals your income and spending by category and shows what is left. On take-home pay of $6,200 a month with $4,900 of expenses and $800 saved, the leftover is $500 — and the savings rate is 12.9%, the single number that decides how fast your finances improve.",
    howItWorks: [
      "Enter your monthly take-home pay, then your spending across nine categories: housing, transport, food, utilities, insurance, entertainment, dining, subscriptions and other. Use bank and card statements for a real month rather than estimating — most people underestimate food and discretionary spending by a wide margin, and a budget built on guesses fails in the first week.",
      "The calculator sums the categories and subtracts them, plus your savings, from income. The leftover is unallocated money: positive means the plan funds itself, negative means the budget is funded by borrowing, and the shortfall amount is the size of the problem to fix. The savings rate — savings divided by income — is shown alongside, because it predicts progress better than any single category.",
      "Work through the output in order: the largest categories first. Housing and transport are usually 40% to 55% of spending between them, so a 10% cut there beats eliminating small subscriptions many times over. In the worked example, housing alone is $1,850 — 29.8% of take-home pay — so a $185 housing saving is worth more than every subscription combined. A common planning target is a 15% to 20% savings rate including any employer match; below 10%, retirement at a conventional age usually requires a long career or a high income.",
      "Treat savings as a line item, not a residual. Enter the amount you intend to save and let the leftover absorb the pressure; then set that amount to move automatically on payday, or it will be spent. Automating the transfer matters more than the amount: a $600 transfer that happens on payday beats an $800 intention that depends on willpower at month-end, because the leftover is spent by default and saved only by design.",
      "Two cases need a different setup. Irregular expenses — insurance premiums, annual subscriptions, holidays, car maintenance — should be converted to a monthly amount and saved in advance (a sinking fund): add up a full year of them and divide by 12. If your income varies, budget fixed costs against your lowest typical month and hold one to two months of expenses as a buffer that smooths the good months into the lean ones.",
    ],
    formula: "Leftover = Total monthly income − total monthly expenses − savings. Savings rate = savings ÷ income × 100.",
    example: {
      title: "Worked example: $6,200 take-home pay",
      body: "Monthly spending: housing $1,850, utilities $320, food $780, transport $540, insurance $460, entertainment $200, dining $300, subscriptions $80, other $370. The categories total $4,900. Add $800 of planned savings and the total outflow is $5,700, leaving $500 unallocated — a cushion for the month something breaks, not money to spend. The savings rate is $800 ÷ $6,200 = 12.9%, or $9,600 a year directed to an emergency fund, investing or extra debt payments.",
    },
    faqs: [
      {
        question: "What savings rate should I aim for?",
        answer:
          "A common planning target is 15% to 20% of gross income directed to retirement and savings combined, including any employer match. Below 10%, retirement at a conventional age usually requires a long career or a high income. The right rate depends on when you start: starting at 25 needs far less per month than starting at 45.",
      },
      {
        question: "Should I budget on gross or take-home pay?",
        answer:
          "Take-home pay — the amount that actually reaches your account. Gross pay includes taxes and payroll deductions you never control. Budgeting on gross overstates your capacity by 20% to 30% for most employees, which is why the calculator asks for take-home pay.",
      },
      {
        question: "How do I budget for irregular expenses like car repairs?",
        answer:
          "Convert them to a monthly amount and save it in advance (a sinking fund). Insurance premiums, annual subscriptions, holidays and car maintenance are predictable in total even if the timing is not. Add up a full year of them and divide by 12.",
      },
      {
        question: "What if my income varies month to month?",
        answer:
          "Budget fixed costs against your lowest typical month, not your average. Save the surplus in good months to a buffer account and pay yourself a steady amount from it. Freelancers commonly hold one to two months of expenses as this buffer.",
      },
    ],
  },

  "personal-wealth/50-30-20-budget-calculator": {
    quickAnswer:
      "The 50/30/20 rule splits take-home pay into 50% needs, 30% wants and 20% savings and debt repayment. On $5,400 a month of take-home pay, that is $2,700 for needs, $1,620 for wants and $1,080 for savings.",
    howItWorks: [
      "Enter your monthly take-home pay and your actual spending in each of the three buckets: needs, wants and savings. The calculator applies the three percentages to your pay and compares each target with your actual figure, in dollars and in percentage points, so you can see exactly which bucket is off and by how much.",
      "Needs are the bills you must pay to live and work: rent or mortgage, utilities, basic groceries, transport, insurance and minimum debt payments. Wants are everything that improves life but is optional: eating out, travel, streaming, gym memberships, upgraded groceries. Savings covers emergency funds, investing and debt payments above the minimum. The borderline cases decide the result: a basic phone plan is a need, the premium handset upgrade is a want, and extra card payments above the minimum count toward the 20% line because they build net worth rather than fund consumption.",
      "Compare the targets with your actual spending, category by category. The rule's value is diagnostic: most people who break it break the needs line, usually because housing costs more than 30% of take-home pay in expensive cities. In the worked example, needs run at $3,100 (57%) while wants sit inside their limit at $1,500 (28%) — the $400 needs overspend is what squeezes savings to $800 (15%).",
      "If the textbook split cannot apply yet, use a modified one rather than abandoning the savings line. A 60/25/15 split protects real saving while housing costs are addressed, and the needs percentage becomes the problem to work on over time — through income growth or a housing change — instead of a number to feel guilty about. Even 10% saved beats a plan that saves nothing.",
      "The rule is a floor, not an optimum. Needs rarely scale with income, so a high earner following the rule loosely can often save 30% to 50%. At low incomes, needs can consume 70% or more no matter how carefully money is managed, and the rule offers little guidance beyond prioritising essentials. Students and early-career workers often find the same problem from the other side: when rent alone takes 45% of take-home pay, the honest response is a temporary split that still saves something, not abandoning the habit. Employer retirement contributions count toward the 20%: if your employer matches 4% and you contribute 6%, you are already at 10% before any other saving.",
    ],
    formula: "Needs target = 0.50 × take-home pay; Wants target = 0.30 × take-home pay; Savings target = 0.20 × take-home pay.",
    example: {
      title: "Worked example: $5,400 monthly take-home pay",
      body: "Needs: $5,400 × 50% = $2,700. Wants: $5,400 × 30% = $1,620. Savings and extra debt payments: $5,400 × 20% = $1,080. If your actual needs are $3,100 (57%) and wants are $1,500 (28%), the gap to close is the $400 of needs overspend — savings are being squeezed to $800 (15%) even though wants are inside their limit. The fix is on the needs side: $400 of housing, transport or insurance cost, not $400 of cancelled fun.",
    },
    faqs: [
      {
        question: "Is a mortgage payment a need or a want?",
        answer:
          "The payment itself is a need, including principal, interest, tax and insurance. The rule was popularised by Senator Elizabeth Warren's book All Your Worth. Note that only minimum payments on other debts count as needs; anything above the minimum counts toward the 20% savings and debt line.",
      },
      {
        question: "What if housing alone exceeds 50% of my pay?",
        answer:
          "Then the textbook split cannot apply yet, and you are not alone — in high-cost cities rent alone can take 40% or more of take-home pay. Use a modified split that protects some savings (even 10%) and treat the needs percentage as the problem to work on over time, through income growth or a housing change, rather than abandoning the savings line entirely.",
      },
      {
        question: "Do employer retirement contributions count toward the 20%?",
        answer:
          "They should. If your employer matches 4% of pay into a 401(k) and you contribute 6%, your total saving is 10% before any other saving. Count both sides to judge whether you are on track, but note the rule is usually applied to take-home pay while contributions come out of gross pay.",
      },
      {
        question: "Is 50/30/20 right for high earners?",
        answer:
          "It is a floor, not an optimum. Needs rarely scale with income, so a high earner following the rule loosely can often save 30% to 50%. Conversely, at low incomes needs can consume 70% or more no matter how carefully money is managed, and the rule offers little guidance beyond prioritising essentials.",
      },
    ],
  },

  "personal-wealth/net-worth-tracker": {
    quickAnswer:
      "Net worth is everything you own minus everything you owe. A household with $545,000 of assets and $339,000 of debts has a net worth of $206,000. It is the single figure that shows whether your finances are moving forward, regardless of income.",
    howItWorks: [
      "List assets at realistic current values: bank balances, investments and retirement accounts at today's value, your home at an honest market estimate, vehicles at resale value rather than what you paid. Then list every debt: mortgage, auto loan, student loans, credit cards and anything else. The tool takes five asset categories and five debt categories. Other assets — jewellery, collectables, a small business — belong in the other line only at a value you could actually realise in a sale, not what you paid or hope for.",
      "The calculator subtracts total debts from total assets, then breaks the result into its parts: home equity, investments, cash, vehicles net of the auto loan, and other debts. In the worked example that is $122,000 of home equity, $85,000 of investments, $18,000 of cash, $8,000 of net vehicle value and $27,000 of other debts — the breakdown shows where the net worth actually lives.",
      "Update it on a fixed schedule — quarterly works — using the same valuation rules each time, or the changes will reflect your mood about house prices rather than your actual progress. A home revalued optimistically in a good month and pessimistically in a bad one produces a net worth that jumps for no reason. Valuation rules matter most for the two biggest lines: value the home from recent comparable sales rather than a listing site's estimate, and value vehicles from a resale guide rather than the purchase price — a car bought for $28,000 may be worth $22,000 within a year, and counting it at cost flatters the balance sheet by $6,000.",
      "Read the change, not the level. Net worth rises from three sources: saving and investing, debt principal paid down, and asset appreciation. Only the first two are under your control. A rising net worth driven purely by house prices can reverse; one driven by contributions compounds reliably, and the quarterly change shows which kind of growth you have.",
      "Two judgement calls are worth settling in advance. Home equity cannot pay a bill without selling or borrowing, so some people also track a liquid net worth (financial assets minus debts) alongside the headline figure. And pre-tax retirement accounts are usually counted at full balance, though a stricter approach discounts them by the tax due on withdrawal — at a 20% assumed rate, a $100,000 balance counts as $80,000. Either is defensible; be consistent between updates.",
    ],
    formula: "Net worth = Total assets − Total liabilities.",
    example: {
      title: "Worked example: a household balance sheet",
      body: "Assets: home $420,000, investments and retirement accounts $85,000, bank and cash $18,000, vehicles $22,000 — total $545,000. Debts: mortgage $298,000, auto loan $14,000, credit cards $6,000, student loans $21,000 — total $339,000. Net worth = $545,000 − $339,000 = $206,000. Note the mortgage is 88% of all debt, which is normal for a homeowner, and home equity of $122,000 is more than half the net worth — a reminder that this household's wealth is mostly bricks, not cash.",
    },
    faqs: [
      {
        question: "Should I include my home in net worth?",
        answer:
          "Yes — it is an asset, and the mortgage is the matching liability, so excluding one without the other distorts the figure. Some people also track a separate liquid net worth (financial assets minus debts) because home equity cannot pay a bill without selling or borrowing.",
      },
      {
        question: "Do I include retirement accounts at full value?",
        answer:
          "The standard approach is yes, at current balance. A stricter approach discounts pre-tax accounts like a traditional 401(k) by the tax you will pay on withdrawal — at a 20% assumed rate, a $100,000 balance counts as $80,000. Either is defensible; be consistent between updates.",
      },
      {
        question: "What is a good net worth by age?",
        answer:
          "There is no official benchmark, and surveys (such as the Federal Reserve's Survey of Consumer Finances) show wide spreads at every age because income and housing costs differ. A more useful test is direction and savings rate: net worth growing faster than inflation, year after year, puts you ahead of most households regardless of the level.",
      },
      {
        question: "Can net worth be negative?",
        answer:
          "Yes, and it is common early in working life when student loans and car finance exceed assets. It is a starting point, not a verdict. Every debt payment and contribution moves it up; tracking it quarterly makes the progress visible while it still feels slow.",
      },
    ],
  },

  "personal-wealth/emergency-fund-visualizer": {
    quickAnswer:
      "An emergency fund covers essential spending when income stops. Add up essentials — here $3,300 a month — and the standard target is 3 to 6 months of them: $9,900 to $19,800. Job loss, not car repairs, is the event the fund is sized for.",
    howItWorks: [
      "Enter your essential monthly costs only: rent, food, transport, insurance and other must-pay bills. Leave out dining out, subscriptions and travel — those stop when income stops. The visualizer stacks these into your true monthly burn rate, which is almost always lower than your salary and lower than your total spending.",
      "Choose your cover in months. Three months suits a dual-income household with secure jobs; six months suits a single earner, a freelancer, or anyone whose job would take long to replace. The tool shows the target at 1, 3, 6, 9 and 12 months of cover, then compares your chosen target with what you have saved and how fast you are adding to it. The tiers make the trade-offs concrete: one month is a buffer against a surprise bill, three months covers a short job search, six months covers a serious one, and twelve months is the level freelancers with lumpy income often aim for.",
      "The two numbers that matter are months covered now and the time to close the gap. Months covered is your savings divided by monthly essentials; the gap is the target minus savings, divided by your monthly saving. In the worked example, $7,500 saved covers 2.3 months, and $500 a month closes the remaining $12,300 gap to the six-month target in about 25 months.",
      "Keep the finished fund in a high-yield savings account: separate from everyday money, insured, and reachable within a few days. Top high-yield accounts paid about 4.2% to 4.4% APY in November 2026, so the fund earns a real return while it waits. Money invested in stocks is not an emergency fund — the emergency and the market fall tend to arrive together. Keep one month of expenses in your everyday account for instant access and the rest in the high-yield account, since transfers out can take a few days — the split costs a little interest and buys immediate access when the emergency is same-day.",
      "Build in the right order. A small starter fund first — around one month of essentials or $1,000 to $2,000 — then attack high-interest debt, then finish the fund. Without any buffer, the next unexpected bill goes straight back onto the card you just cleared, and the debt payoff has to start over.",
    ],
    formula: "Target fund = Monthly essential spending × Months of cover. Months covered now = Current savings ÷ Monthly essential spending.",
    example: {
      title: "Worked example: $3,300 a month of essentials",
      body: "Essentials: rent $1,650, food $620, transport $340, insurance $410, other $280 — total $3,300 a month. Three months of cover is $9,900; six months is $19,800. With $7,500 already saved, you hold 2.3 months of cover. Saving $500 a month closes the gap to the six-month target in about 25 months. A single earner in the same position might reasonably target 9 months, $29,700, which takes about 45 months at the same saving rate.",
    },
    faqs: [
      {
        question: "How many months of expenses do I really need?",
        answer:
          "Three to six months of essential spending is the standard range. Push toward six if you are the only earner, self-employed, work in a cyclical industry, or have dependants. Two earners in unrelated industries can reasonably hold less, because both incomes rarely stop at once.",
      },
      {
        question: "Should I build the fund before paying off credit cards?",
        answer:
          "Build a small starter fund first — around one month of essentials or $1,000 to $2,000 — then attack high-interest debt, then finish the fund. Without any buffer, the next unexpected bill goes straight back onto the card you just cleared.",
      },
      {
        question: "Does the fund need to cover my full salary?",
        answer:
          "No, it covers essential spending, which is normally well below salary because taxes, saving and discretionary spending pause during an emergency. In the worked example, essentials of $3,300 might sit under take-home pay of $5,000 — that gap is why the fund is smaller than people expect.",
      },
      {
        question: "Where should I keep an emergency fund?",
        answer:
          "In an insured savings account, ideally a high-yield one earning around 4.2% to 4.4% APY in November 2026, at a different bank if that helps you leave it alone. Avoid CDs with early penalties for the core fund and avoid anything whose value can fall.",
      },
    ],
  },

  "personal-wealth/inflation-purchasing-power-calculator": {
    quickAnswer:
      "This calculator shows what inflation does to money over time. At 3% annual inflation, $50,000 kept in cash for 20 years buys what $27,684 buys today — and you would need $90,306 in 20 years to match today's $50,000 of purchasing power.",
    howItWorks: [
      "Enter an amount, an inflation rate and a number of years. The calculator discounts the amount by inflation each year, which is the same compounding formula as investment growth run in reverse. The chart plots the 2% and 5% paths alongside your rate, so you can see how sensitive the answer is to a single point of inflation.",
      "Use it in both directions. The forward answer — what a future price or salary is worth in today's money — tells you whether a future amount is actually progress. The reverse answer — what today's amount becomes in future prices — tells you how much a goal like a house deposit or retirement income really needs to be. Spending of $60,000 a year today needs about $108,367 a year in 20 years at 3% inflation to buy the same life.",
      "Pick the inflation rate deliberately. US inflation averaged roughly 3% over the very long run, ran above 8% in 2022, and the Federal Reserve targets 2%. The latest official annual reading was 3.7% for September 2026; the October 2026 release carried no year-over-year rate because October 2025 prices were never collected during the federal shutdown. Your personal inflation also depends on your spending mix: housing, healthcare and education have often risen faster than the headline rate.",
      "Compare the rate with what your money earns. At 3.7% inflation, a savings account paying 4.5% APY keeps about 3.51% after tax at the 22% bracket — a real return of roughly −0.18%, meaning the balance barely holds its value. Cash in a 0.5% account loses close to 3% of value a year at the same inflation rate, which is why idle cash is the most expensive place to keep money over decades.",
      "The rule of 72 works for inflation too: divide 72 by the inflation rate to get the years for purchasing power to halve. At 3% inflation, money halves in value in about 24 years; at 6%, about 12 years. Retirement calculators that show a large future balance are usually showing nominal dollars — divide by the inflation factor to see the figure in today's terms before deciding the plan is enough.",
    ],
    formula: "Purchasing power = Amount ÷ (1 + inflation rate)^years. Future nominal equivalent = Amount × (1 + inflation rate)^years.",
    example: {
      title: "Worked example: $50,000 over 20 years at 3% inflation",
      body: "Purchasing power in today's terms: $50,000 ÷ 1.03^20 = $50,000 ÷ 1.806 = $27,684. Working the other way, matching today's $50,000 in 20 years takes $50,000 × 1.03^20 = $90,306. Cash under the mattress therefore loses about 45% of its value over the period; a savings account must earn at least 3% just to stand still in real terms. At the September 2026 inflation rate of 3.7%, the same $50,000 would be worth only about $24,177 in today's money after 20 years.",
    },
    faqs: [
      {
        question: "What inflation rate should I use for planning?",
        answer:
          "2.5% to 3% is a reasonable long-term planning assumption for the US — above the Federal Reserve's 2% target, below the spikes of 2021–2023 and the 3.7% reading of September 2026. For a conservative plan, test 3.5% as well and check the plan still works.",
      },
      {
        question: "How does inflation affect my savings account?",
        answer:
          "Compare the account's APY with inflation. At 4.5% APY and 3% inflation, your real return is roughly 1.5% before tax — and interest is taxed, so after tax at the 22% bracket the real return falls to about 0.5%. Cash in a 0.5% account loses close to 2.5% of value a year at 3% inflation.",
      },
      {
        question: "What is the rule of 72 for inflation?",
        answer:
          "Divide 72 by the inflation rate to get the years for purchasing power to halve. At 3% inflation, money halves in value in about 24 years. At 6%, about 12 years. It is the same rule used for investment doubling, run in reverse.",
      },
      {
        question: "Does inflation change how much I need to retire?",
        answer:
          "Directly. Spending of $60,000 a year today needs to be about $108,367 a year in 20 years at 3% inflation to buy the same life. Retirement calculators that show a large future balance are usually showing nominal dollars; divide by the inflation factor to see the figure in today's terms.",
      },
    ],
  },

  "personal-wealth/rule-of-72-calculator": {
    quickAnswer:
      "The rule of 72 estimates doubling time: divide 72 by your annual return. At 8%, money doubles in about 9 years (the exact answer is 9.01 years). At 4%, it takes about 18 years. It also works in reverse for inflation and debt.",
    howItWorks: [
      "Enter an annual rate of return. The calculator divides 72 by the rate and shows the approximate years to double, alongside the exact logarithmic answer and the percentage error, so you can see how close the shortcut lands. Enter a target number of years instead and it reverses the calculation: the return you need to double in that time, rule estimate and exact figure side by side.",
      "The rule works because 72 is close to 100 × ln(2) adjusted for typical rates, and because 72 divides cleanly by 2, 3, 4, 6, 8, 9 and 12. It is most accurate between about 5% and 12%; at very low or very high rates the error grows, which the exact figure exposes. At 2% the rule gives 36 years against an exact 35.0; at 20% it gives 3.6 years against an exact 3.8.",
      "The comparison table runs the rule against the exact answer at 2%, 4%, 6%, 8%, 10%, 12% and 15%, so you can see where the shortcut drifts. The error is smallest in the middle of that range and largest at the ends — which is fine, because the rates most savers actually meet sit in the middle, and the rule was built for mental arithmetic, not contracts.",
      "Apply it beyond investments. At 3% inflation, purchasing power halves in about 24 years (the exact figure is 23.45). The same logic prices debt directly: a $5,000 card balance at 24% APR doubles to $10,000 in about 3 years if no payments are made — and the exact figure, 3.22 years, is close enough to the rule's 3.0 that the warning lands either way. The same three-second calculation frames all three decisions: growth, erosion and debt.",
      "Know its limits. The rule describes a single sum compounding; with monthly contributions your balance doubles faster than the rule suggests because new money keeps arriving. Use it to judge the growth engine, and a savings or investment calculator for the contribution plan itself. For any figure that goes into a contract or a tax return, use the exact formula.",
    ],
    formula: "Years to double ≈ 72 ÷ annual rate (%). Exact: years = ln(2) ÷ ln(1 + r). Required rate to double in a target time ≈ 72 ÷ target years.",
    example: {
      title: "Worked example: doubling at 8%",
      body: "72 ÷ 8 = 9 years. The exact calculation, ln(2) ÷ ln(1.08), gives 9.01 years — the rule is off by about four days. Invest $10,000 at a steady 8% and it becomes roughly $20,000 in year 9, $40,000 in year 18 and $80,000 in year 27: three doublings in total, which is why starting a decade earlier matters more than most contribution increases. At 4% the same three doublings take about 54 years instead of just 27.",
    },
    faqs: [
      {
        question: "Why 72 and not 70 or 69?",
        answer:
          "69.3 is the mathematically exact constant for continuous compounding, and 70 is a common alternative. 72 is used because it divides evenly by most rates people actually meet and it slightly corrects for annual compounding at mid-range rates, landing closer than 69.3 does between 5% and 12%.",
      },
      {
        question: "How accurate is the rule of 72?",
        answer:
          "Very close in its sweet spot: at 8% it gives 9 years against an exact 9.01. At 2% it gives 36 years against an exact 35.0 — about a year out. At 20% it gives 3.6 years against an exact 3.8. For planning estimates, the error is acceptable; for contracts, use the exact formula.",
      },
      {
        question: "Can I use the rule for monthly contributions?",
        answer:
          "Not directly — the rule describes a single sum compounding. With monthly contributions your balance doubles faster than the rule suggests because new money keeps arriving. Use it to judge the growth engine, and a savings or investment calculator for the contribution plan itself.",
      },
      {
        question: "What return makes money double in 10 years?",
        answer:
          "72 ÷ 10 = 7.2% a year (the exact figure is 7.18%). That is a useful benchmark: a portfolio returning about 7% doubles each decade, before inflation. Against 3% inflation, the real doubling takes roughly 17 years because the real return is about 4%.",
      },
    ],
  },

  "personal-wealth/retirement-calculator": {
    quickAnswer:
      "A retirement calculator projects the pot you will have at retirement from your current savings, monthly contributions and an assumed return. $80,000 saved by age 35, plus $800 a month at a 7% return, grows to about $1,625,000 by 65 — roughly $670,000 in today's purchasing power after 3% inflation.",
    howItWorks: [
      "Enter your current age, retirement age, current savings, monthly contribution, expected return, the annual spending you expect in retirement and your life expectancy. The calculator compounds the existing pot monthly for the full period and each monthly contribution for the time it is invested, then plots the balance year by year to retirement.",
      "Then judge the result against spending, not against the headline number. The tool sets two targets: simple drawdown (annual spending times years in retirement) and the 4%-rule target (spending times 25). With $40,000 of annual spending and a life expectancy of 90, both targets are $1,000,000 — and the projected pot supports about $5,418 a month of spending over 25 years. The two targets answer different questions: drawdown assumes the pot is spent to zero by life expectancy, while the 4%-rule target assumes withdrawals of 4% a year, adjusted for inflation, with the pot intended to last indefinitely.",
      "If the projection falls short of the target, the tool solves for the extra monthly saving that closes the gap. At a 5% return with $60,000 of annual spending, the target is $1,500,000 against a projected $1,023,226 — a $476,774 shortfall that needs about $573 a month extra, starting now. The earlier the extra saving starts, the smaller it needs to be.",
      "Run the pessimistic case before trusting the plan. Drop the return to 5% and the same saver reaches roughly $1,023,226. Retire at 60 instead of 65 and the pot falls to about $1,106,091 — five fewer years of contributions and growth, and five more years of spending. Contribution and retirement age are the levers you control; the return is not.",
      "The projection covers your own savings only. Social Security is a separate income stream — the average retired worker received about $2,071 a month in January 2026, and benefits replace roughly 40% of pre-retirement income for a medium earner. Taxes and inflation are also outside this projection: the $1,625,000 headline is nominal, and its purchasing power at 3% inflation is about $670,000 in today's money.",
    ],
    formula: "Projected pot = Current savings × (1 + r/12)^(12 × years) + Monthly contribution × [((1 + r/12)^(12 × years) − 1) / (r/12)]. Target = annual spending × years in retirement; 4%-rule target = spending × 25.",
    example: {
      title: "Worked example: saving from 35 to 65 at 7%",
      body: "Current savings $80,000, contributions $800 a month, return 7%, horizon 30 years. The existing pot grows to about $649,320 and the contributions — $288,000 paid in — grow to about $975,977. Total: roughly $1,625,297. A 4% first-year withdrawal implies about $65,012 a year of portfolio income, before Social Security and taxes. Discounted at 3% inflation, the pot is about $670,000 in today's money, which is the figure to compare with the retirement spending you have in mind.",
    },
    faqs: [
      {
        question: "How much should I have saved by each age?",
        answer:
          "A widely used guideline (Fidelity's) suggests about 1× your salary saved by 30, 3× by 40, 6× by 50 and 10× by 67, assuming retirement at 67 and a conventional lifestyle. It is a checkpoint, not a rule — a late start can be offset by higher contributions, later retirement, or lower planned spending.",
      },
      {
        question: "What return should I assume before retirement?",
        answer:
          "Many planners use 6% to 7% nominal for a diversified stock-heavy portfolio and 5% for a balanced one, then test 2 points lower. Using 10% because it is the long-run US stock average leaves no margin for a bad decade near retirement, when the damage is hardest to repair.",
      },
      {
        question: "Does the calculator include Social Security?",
        answer:
          "This projection covers your own savings only. Social Security is a separate income stream: the average retired worker received about $2,071 a month in January 2026, and benefits replace roughly 40% of pre-retirement income for a medium earner, claimed between 62 and 70. Add your estimated benefit on top of what the portfolio can sustainably pay.",
      },
      {
        question: "How does retiring five years earlier change the result?",
        answer:
          "Twice over: five fewer years of contributions and growth, and five more years of spending. In the worked example, retiring at 60 instead of 65 cuts the pot from about $1,625,000 to about $1,106,000 — roughly a third less, from a change that feels like a sixth of the timeline.",
      },
    ],
  },

  "personal-wealth/roth-ira-calculator": {
    quickAnswer:
      "A Roth IRA calculator projects tax-free retirement savings: you contribute after-tax money and withdraw it tax-free in retirement. $500 a month for 30 years at a 7% return grows to about $567,000, of which $180,000 is contributions and roughly $387,000 is growth you never pay tax on if withdrawals are qualified.",
    howItWorks: [
      "Enter your current age, retirement age, current balance, annual contribution, expected return and the tax rate used for the comparison. The calculator compounds annually, adding each year's contribution at year-end. Contributions are capped at the IRS limit — for tax year 2026, $7,500 if you are under 50 and $8,600 at 50 or older — and the tool applies that cap to any figure you enter above it.",
      "Contributions are made from taxed income, so there is no deduction now. In exchange, qualified withdrawals after age 59½ are completely tax-free, including decades of growth. The 5-year rule must also be met: the account must have been open at least five tax years before earnings come out tax-free. Your own contributions, as opposed to earnings, can be withdrawn at any age with no tax and no penalty.",
      "The comparison beside the projection is what the Roth is worth against a taxable account. The tool grows identical after-tax contributions at the same return, then taxes the growth once at your rate at the end. On the worked example, growth of about $386,765 taxed at 15% costs $58,015 — that is the advantage the Roth wrapper buys with the tax you paid up front.",
      "Compare the Roth with a traditional IRA on one question: is your tax rate higher now or in retirement? Paying 12% now to avoid 22% later makes the Roth the clear winner. Paying 24% now to avoid 12% later favours the traditional account. Near-equal rates make the Roth's flexibility — contributions withdrawable any time, and no required minimum distributions for the owner — the tiebreaker.",
      "Two constraints shape real Roth saving. You need earned income at least equal to your contribution, and direct contributions phase out at higher incomes: for 2026 the phase-out runs from $153,000 to $168,000 of modified AGI for single filers and $242,000 to $252,000 for married couples filing jointly. There is no income limit on converting traditional IRA money to a Roth, which is the basis of the backdoor Roth.",
    ],
    formula: "Projected value = Annual contribution × [((1 + r)^t − 1) / r] + Current balance × (1 + r)^t, with annual compounding. Tax-free growth = projected value − balance − total contributions.",
    example: {
      title: "Worked example: $500 a month for 30 years at 7%",
      body: "Contributions total $500 × 360 = $180,000, or $6,000 a year. Compounded annually at 7%, they reach about $566,765. The growth of roughly $386,765 is tax-free on a qualified withdrawal. In a taxable account, that same growth taxed once at a 15% capital gains rate would cost about $58,015, leaving $508,750. Note the tool compounds annually: monthly compounding of the same $500 a month would give about $609,985, so the annual figure is the conservative one.",
    },
    faqs: [
      {
        question: "What is the Roth IRA contribution limit for 2026?",
        answer:
          "For 2026 the limit is $7,500 if you are under 50, and $8,600 at 50 or older (the $7,500 plus a $1,100 catch-up), across all your IRAs combined. You also need earned income at least equal to your contribution, and direct Roth contributions phase out from $153,000 to $168,000 of modified AGI for single filers.",
      },
      {
        question: "Can I withdraw my Roth IRA contributions early?",
        answer:
          "Yes. Your own contributions (not earnings) can be withdrawn at any age, at any time, with no tax and no penalty, because the tax was already paid. Earnings withdrawn before 59½ and before the account is five years old are taxed and usually hit with a 10% penalty, with exceptions such as up to $10,000 for a first home.",
      },
      {
        question: "Is there an income limit for a Roth IRA?",
        answer:
          "Yes for direct contributions — for 2026 the phase-out is $153,000 to $168,000 of modified AGI for single filers and $242,000 to $252,000 for married couples filing jointly. There is no income limit on converting traditional IRA money to a Roth, which is the basis of the so-called backdoor Roth: contribute to a traditional IRA without a deduction, then convert.",
      },
      {
        question: "Do Roth IRAs have required minimum distributions?",
        answer:
          "No — not for the original owner. Since 2024, Roth 401(k)s are also exempt. This is a real planning advantage: the account can keep compounding for life and pass to heirs, who generally must empty an inherited Roth within 10 years but owe no income tax on it.",
      },
    ],
  },

  "personal-wealth/ira-calculator": {
    quickAnswer:
      "An IRA calculator projects retirement savings in an individual retirement account and compares traditional and Roth outcomes after tax. $7,000 a year for 25 years at 7% grows to about $442,743 before tax — worth $389,614 in a traditional IRA withdrawn at 12%, or $345,340 in a Roth funded at a 22% rate today.",
    howItWorks: [
      "Enter your current age, retirement age, current balance, annual contribution, expected return, and your tax rate now and in retirement. The calculator compounds annually, with contributions added at each year-end, and runs both account types on the same gross pot so the comparison is a pure tax comparison rather than two different savings plans.",
      "The comparison is built on equal out-of-pocket cost. A traditional IRA is funded with pre-tax money and taxed at withdrawal; a Roth is funded with after-tax money and never taxed again. Because the gross growth is identical, the Roth wins exactly when your retirement tax rate is higher than today's, the traditional wins when it is lower, and they tie when the rates are equal. That single comparison is the whole decision.",
      "A traditional IRA defers tax: contributions may be deductible now, growth is untaxed along the way, and withdrawals in retirement are taxed as ordinary income. The deduction phases out at higher incomes if you are covered by a workplace plan — for 2026, from $81,000 to $91,000 of modified AGI for single filers and $129,000 to $149,000 for married couples filing jointly. Required minimum distributions apply from age 73 (75 if you were born in 1960 or later).",
      "Two constraints shape real IRA saving. Contributions are capped each year — $7,500 for 2026 across all your IRAs combined, $8,600 at age 50 or older — and you need earned income to contribute. A 401(k) does not consume IRA room: the 2026 elective deferral limit for a 401(k) is $24,500, separate from the IRA limit, and contributions for 2026 can be made until the April 2027 filing deadline.",
      "What the comparison leaves out is flexibility, which is real but hard to price. A Roth lets you withdraw contributions at any time without tax or penalty and has no required distributions for the owner; a traditional IRA gives you the deduction now, which the tool's equal-cost framing already accounts for by funding the Roth with after-tax money only. Tax diversification — holding some of each — is the usual answer when the future rate is genuinely uncertain.",
    ],
    formula: "Gross value = Balance × (1 + r)^t + Annual contribution × [((1 + r)^t − 1) / r]. Traditional after-tax = gross × (1 − retirement rate). Roth after-tax = gross × (1 − today's rate).",
    example: {
      title: "Worked example: $7,000 a year for 25 years at 7%",
      body: "Contributing $7,000 a year for 25 years at a 7% return produces a gross pot of about $442,743, from $175,000 of contributions. With a 22% rate today and a 12% rate in retirement, the traditional IRA keeps $389,614 and the Roth keeps $345,340 — the traditional wins by $44,274. Flip the rates (12% now, 22% later) and the Roth wins by the same margin. Add a $50,000 starting balance and the gross pot becomes $714,115, with the same logic deciding the winner.",
    },
    faqs: [
      {
        question: "What is the IRA contribution limit for 2026?",
        answer:
          "For 2026 the limit is $7,500 if under 50 and $8,600 at 50-plus, across all your IRAs combined (traditional and Roth together). The limit is per person, so a married couple can contribute up to double, provided household earned income covers it. Contributions for 2026 can be made until the April 2027 filing deadline.",
      },
      {
        question: "Can I contribute to both a 401(k) and an IRA?",
        answer:
          "Yes. Having a workplace plan does not stop IRA contributions, but it can limit the traditional IRA deduction at higher incomes — for 2026 the deduction phases out from $81,000 to $91,000 of modified AGI for single filers. Roth IRA contributions have their own income phase-outs. The limits for each account type are separate.",
      },
      {
        question: "When can I withdraw IRA money without penalty?",
        answer:
          "From age 59½, for both types. Traditional withdrawals are taxed as income whenever they happen. Earlier withdrawals are usually taxed plus a 10% penalty, with exceptions including certain education costs, up to $10,000 for a first home, and substantially equal periodic payments under rule 72(t).",
      },
      {
        question: "What happens if I contribute too much to an IRA?",
        answer:
          "The excess is taxed at 6% for every year it stays in the account. You can avoid the penalty by withdrawing the excess and its earnings before the tax filing deadline for that year. Contribution room is use-it-or-lose-it each year, but over-contributing is worse than missing a year.",
      },
    ],
  },

  "personal-wealth/roth-ira-conversion-simulator": {
    quickAnswer:
      "A Roth conversion moves money from a traditional IRA or 401(k) into a Roth IRA, triggering tax now in exchange for tax-free growth and withdrawals later. Converting $40,000 in the 22% bracket costs $8,800 in tax; left to grow 20 years at 7%, that money becomes about $154,787 of tax-free value versus about $117,638 kept if a traditional withdrawal is taxed at 24%.",
    howItWorks: [
      "Enter your total traditional balance, the amount to convert, your tax rate today, your expected tax rate in retirement, the growth rate and the years until you spend the money. The simulator grows the converted amount tax-free and grows the unconverted amount, then taxes it at withdrawal, and shows the whole-balance totals for converting versus leaving everything traditional.",
      "The net-benefit figure is the honest comparison, because it charges the conversion for the growth the tax payment would have earned. The $8,800 of tax paid today, invested at 7% for 20 years, would itself have become $34,053. After that charge, converting $40,000 wins by about $3,096 when the retirement rate is 24%, but loses by about $15,479 when it is 12% — the margin is far smaller than the headline gap suggests.",
      "The conversion itself is a taxable event: the amount converted is added to your ordinary income for that year. Converting in a low-income year — after retiring, before Social Security and required distributions begin — can fill a low bracket cheaply. Converting on top of a full salary usually cannot. Convert in tranches across the year if you want to manage the tax bill against income you can only estimate.",
      "The comparison assumes the conversion tax is paid from money outside the IRA. Paying the tax out of the converted amount shrinks what lands in the Roth and weakens the case, especially under age 59½, when the withheld portion can also count as an early distribution. If the tax has to come from inside the account, the conversion rarely wins.",
      "Model the side effects before converting. Converted amounts count in modified adjusted gross income, which drives Medicare IRMAA premium surcharges two years later, the taxation of Social Security benefits, and eligibility for various credits. A conversion that is cheap on the income tax line can still be expensive overall. Conversions are also permanent since 2018 — recharacterisation was removed by the Tax Cuts and Jobs Act — and the pro-rata rule taxes conversions in proportion to your pre-tax share across all traditional IRAs.",
    ],
    formula: "Roth outcome = Converted amount × (1 + r)^t, with tax of (converted amount × today's rate) paid separately. Traditional outcome = Converted amount × (1 + r)^t × (1 − retirement rate). Net benefit = Roth outcome − (tax × (1 + r)^t) − traditional outcome.",
    example: {
      title: "Worked example: converting $40,000 with 20 years to grow",
      body: "Convert $40,000 at a 22% rate today: the tax bill is $8,800, paid from savings. At 7% for 20 years, the Roth holds $40,000 × 1.07^20 ≈ $154,787, all withdrawable tax-free. Left in the traditional IRA, the same growth gives $154,787 before tax: keep $117,638 if taxed at 24% in retirement, or $136,213 if taxed at 12%. After charging the $8,800 tax payment for its lost growth ($34,053), the conversion wins by about $3,096 at a 24% future rate and loses by about $15,479 at 12%.",
    },
    faqs: [
      {
        question: "When is the best time to do a Roth conversion?",
        answer:
          "In years when your taxable income is unusually low: early retirement before Social Security starts, a career break, or a year with large deductions. The window between retiring and required minimum distributions at 73 is the classic opportunity, because you control how much income to create, bracket by bracket.",
      },
      {
        question: "Can I undo a Roth conversion?",
        answer:
          "No. Recharacterisation of conversions was removed by the Tax Cuts and Jobs Act — since 2018 a conversion is permanent. Convert in tranches across the year if you want to manage the tax bill against income you can only estimate.",
      },
      {
        question: "Does a conversion affect Medicare premiums or other thresholds?",
        answer:
          "It can. Converted amounts count in modified adjusted gross income, which drives Medicare IRMAA premium surcharges two years later, the taxation of Social Security benefits, and eligibility for various credits. A conversion that is cheap on the income tax line can still be expensive overall — model the full picture, not just the bracket.",
      },
      {
        question: "What is the pro-rata rule?",
        answer:
          "If you hold any pre-tax IRA money, a conversion is taxed in proportion to your pre-tax share across all traditional IRAs, not just the account you convert from. Holding a large pre-tax IRA makes 'convert only the after-tax part' impossible. Rolling pre-tax IRA money into a 401(k) first is the standard workaround.",
      },
    ],
  },

  "personal-wealth/rmd-calculator": {
    quickAnswer:
      "An RMD calculator divides your prior year-end retirement account balance by an IRS life-expectancy factor. At age 75 with a $480,000 traditional IRA balance, the factor is 24.6 and the required minimum distribution is $19,512 — money that must come out and be taxed that year whether you need it or not.",
    howItWorks: [
      "Enter your age at the end of the distribution year, the account balance on the previous 31 December and an assumed return for the projection. The calculator looks up your factor in the IRS Uniform Lifetime Table and divides. That specific balance date — not today's balance — is what the IRS uses, and it surprises people every year.",
      "RMDs apply to traditional IRAs, SEP and SIMPLE IRAs, and workplace plans like 401(k)s and 403(b)s. Roth IRAs have none for the owner, and Roth 401(k)s have been exempt since 2024. You can withdraw more than the RMD; you cannot withdraw less without a penalty, and extra taken one year does not reduce next year's requirement.",
      "RMDs start at age 73 if you were born between 1951 and 1959, and at age 75 if you were born in 1960 or later, under the SECURE 2.0 Act. Your first RMD can be delayed until 1 April of the following year, but that forces two distributions into one tax year, which can push you into a higher bracket. The tool shows no RMD before age 73.",
      "The 10-year projection shows why the balance often keeps growing despite withdrawals. Each year the RMD is calculated on the starting balance, then the balance grows at your assumed return minus the RMD. At a 5% return, a $500,000 balance at age 73 pays about $234,557 of RMDs over 10 years and still ends at about $524,760 — because the required share starts at just 3.77% and only reaches 4.95% by age 80.",
      "If you have several traditional IRAs, the total RMD is calculated across all of them but can be taken from any one or combination. Workplace plans are stricter: each 401(k) generally requires its own distribution, unless you still work for that employer. From age 70½, a qualified charitable distribution — up to $111,000 for 2026 — counts toward the RMD and is excluded from taxable income entirely.",
    ],
    formula: "RMD = Account balance on 31 December of the prior year ÷ Uniform Lifetime Table factor for your age. Selected factors: age 73 → 26.5, age 75 → 24.6, age 80 → 20.2, age 85 → 16.0, age 90 → 12.2.",
    example: {
      title: "Worked example: age 75 with a $480,000 IRA",
      body: "Your traditional IRA held $480,000 on 31 December last year and you turn 75 this year. The Uniform Lifetime Table factor for 75 is 24.6. RMD = $480,000 ÷ 24.6 = $19,512.20. That amount is added to your taxable income for the year. At age 80 the same $480,000 balance would require $480,000 ÷ 20.2 = $23,762, and at age 73 it would have required $480,000 ÷ 26.5 = $18,113 — the required share rises every year even if the balance does not.",
    },
    faqs: [
      {
        question: "At what age do RMDs start?",
        answer:
          "Age 73 if you were born between 1951 and 1959, and age 75 if you were born in 1960 or later, under the SECURE 2.0 Act. Your first RMD can be delayed until 1 April of the following year, but that forces two distributions into one tax year, which can push you into a higher bracket.",
      },
      {
        question: "What is the penalty for missing an RMD?",
        answer:
          "25% of the amount you failed to withdraw, reduced to 10% if the shortfall is corrected promptly and a return is filed. It was 50% before 2023. The IRS can also waive the penalty for reasonable error if you take the missed distribution and file Form 5329 with an explanation.",
      },
      {
        question: "Can I satisfy my RMD with a charitable donation?",
        answer:
          "Yes, from age 70½, through a qualified charitable distribution (QCD): a direct transfer from an IRA to a charity counts toward your RMD and is excluded from taxable income entirely, up to $111,000 for 2026. For charitably inclined retirees it usually beats withdrawing, paying tax and then donating.",
      },
      {
        question: "Do I owe an RMD on an inherited IRA?",
        answer:
          "Usually yes, under different rules. Most non-spouse beneficiaries must empty an inherited IRA within 10 years, and if the original owner had reached RMD age, annual distributions are generally required in years 1 to 9 as well. Spouses have more options, including treating the account as their own.",
      },
    ],
  },

  "personal-wealth/social-security-calculator": {
    quickAnswer:
      "This calculator estimates your Social Security retirement benefit from your annual earnings, years worked and claiming age. A worker earning $60,000 a year for 35 years has a full-retirement-age benefit of about $2,281 a month — cut to roughly $1,597 if claimed at 62, or raised to about $2,828 if delayed to 70.",
    howItWorks: [
      "Enter your average annual earnings and the number of years you worked. If you worked fewer than 35 years, the missing years count as $0, so your effective average is scaled down — 20 years at $60,000 counts as about $34,286 a year. Divide by 12 to get average indexed monthly earnings (AIME), which the benefit formula then turns into your primary insurance amount (PIA).",
      "The formula replaces 90% of the first slice of AIME, 32% of the next slice and 15% above that — the bend points. This calculator uses the 2024 bend points, $1,174 and $7,078, as a simplified estimate. The 2026 bend points, for workers turning 62 in 2026, are $1,286 and $7,749, which would give the same $5,000 AIME a PIA of about $2,346 — so the tool's figure is slightly conservative for 2026 eligibility.",
      "Claiming age then adjusts that amount permanently. Claiming at 62 with a full retirement age of 67 cuts the benefit by 30%. Each year of delay past full retirement age adds 8% in delayed retirement credits, up to age 70. There is no advantage to waiting beyond 70. The break-even ages tell the same story in years: 67 versus 62 breaks even at about 78.7, 70 versus 62 at about 80.4, and 70 versus 67 at about 82.5.",
      "Lifetime totals to age 85 make the trade concrete. On a PIA of $2,281, claiming at 62 pays about $440,674 by 85, claiming at 67 pays about $492,679, and claiming at 70 pays about $509,101 — delaying trades fewer years of payments for a permanently higher, inflation-indexed income. The 2026 cost-of-living adjustment was 2.8%, and the SSA has announced 3.6% for 2027; the average retired worker received about $2,071 a month in January 2026.",
      "This is a simplified estimate built on the inputs you give. It ignores wage-indexing detail, cost-of-living adjustments after claiming, spousal and survivor benefits, taxation of benefits and the earnings test. Your actual benefit depends on your full earnings record, which only the Social Security Administration holds. Get your real figures from your statement at ssa.gov before making a claiming decision — for most households it is the largest retirement decision they make.",
    ],
    formula: "PIA = 90% of AIME up to the first bend point + 32% of AIME between the bend points + 15% above the second bend point. Tool bend points: $1,174 and $7,078 (2024). Claiming adjustment: −30% at 62 (FRA 67) to +24% at 70.",
    example: {
      title: "Worked example: $60,000 a year for 35 years, full retirement age 67",
      body: "Thirty-five years at $60,000 gives an AIME of $5,000. PIA = 0.90 × $1,174 + 0.32 × ($5,000 − $1,174) = $1,056.60 + $1,224.32 = $2,280.92, so about $2,281 a month at 67. Claim at 62 and it falls by 30% to about $1,597. Delay to 70 and it rises by 24% to about $2,828. With the 2026 bend points ($1,286 and $7,749), the same earnings record gives a PIA of about $2,346 — the difference is a reminder to check the current-year figures at ssa.gov.",
    },
    faqs: [
      {
        question: "What is full retirement age?",
        answer:
          "67 for anyone born in 1960 or later; between 66 and 67 for those born from 1943 to 1959. Benefits can start at 62 with a permanent reduction, or be delayed to 70 for the maximum. The reduction for claiming 60 months early, with a full retirement age of 67, is 30%.",
      },
      {
        question: "How many years of work do I need to qualify?",
        answer:
          "You need 40 credits — roughly 10 years of covered work; in 2026 one credit is earned for every $1,890 of earnings, up to four a year. The benefit amount, though, is based on your highest 35 years of earnings. Fewer than 35 years means zeros are averaged in, which is why extra years of work late in a career can still raise the benefit.",
      },
      {
        question: "Is Social Security taxed?",
        answer:
          "For most retirees with other income, yes: up to 85% of benefits can be included in taxable income, depending on combined income. Below $25,000 of combined income for single filers ($32,000 married), benefits are not taxed federally. Some states also tax benefits, though most do not.",
      },
      {
        question: "Can I work while claiming Social Security?",
        answer:
          "Yes, but before full retirement age the earnings test temporarily withholds $1 of benefits for every $2 earned above an annual limit ($24,480 for 2026; $65,160 in the year you reach full retirement age, at $1 for every $3). Withheld amounts are not lost — your benefit is recalculated upward at full retirement age. From full retirement age on, you can earn any amount with no reduction.",
      },
    ],
  },

  "personal-wealth/investment-calculator": {
    quickAnswer:
      "An investment calculator projects portfolio growth from an initial investment plus regular contributions, net of fees. $25,000 invested with $400 a month at an 8% average annual return, less 0.5% fees, grows to about $333,013 in 20 years — $121,000 contributed and roughly $212,013 of growth.",
    howItWorks: [
      "Enter the initial amount, monthly contribution, expected annual return, annual fees, inflation and horizon — or pick a scenario: Conservative at 5%, Base at 8% or Aggressive at 11%. The calculator compounds monthly at the return net of fees, so each contribution starts growing the month after it is invested and the existing balance compounds throughout.",
      "Fees are a first-class input, not a footnote. The tool shows the ending balance with fees and without them, and the difference is the fee cost. On the worked example, 0.5% a year costs $25,766 over 20 years: $358,778 without fees against $333,013 with them. A fund charging 1% a year against one charging 0.1% turns an 8% market return into 7% versus 7.9% — the gap compounds exactly like the return does.",
      "Read the three scenarios as the honest range, not a forecast. Net of the default 0.5% fees, the same $25,000 and $400 a month reaches about $216,636 at the Conservative 5% return, $333,013 at Base 8% and $526,500 at Aggressive 11%. The spread between the low and high cases is over $300,000 — that uncertainty is the real content of a 20-year projection.",
      "Compare the contribution total with the growth total in the results. Early in the horizon, contributions dominate — your saving rate is the engine. Later, growth dominates — the portfolio's return is the engine. In the worked example, growth supplies about two-thirds of the end value. That crossover is the point at which investment decisions start to matter more than budget decisions.",
      "The tool also shows the result in today's money: at 3% inflation, the $333,013 example is worth about $184,381 in real terms. What it does not model is volatility or tax. Real returns arrive unevenly, including falls of 30% or more, and the smooth line will never match a real account statement. In a taxable account, dividends and realised gains are taxed along the way; in an IRA or 401(k), the balance shown is pre-tax and withdrawals may be taxed.",
    ],
    formula: "Future value = Initial × (1 + m)^(12t) + Monthly × [((1 + m)^(12t) − 1) / m], where m = (annual return − fees) ÷ 100 ÷ 12 and t the years. Real value = nominal value ÷ (1 + inflation)^t.",
    example: {
      title: "Worked example: $25,000 plus $400 a month at 8% for 20 years",
      body: "At 8% less 0.5% fees, the net return is 7.5%. The initial $25,000 compounds to about $111,500 and the 240 contributions of $400 — $96,000 paid in — grow to about $221,500. Combined future value: roughly $333,013, with growth supplying about two-thirds of the end value. Without fees the same plan reaches $358,778. Cut the gross return to 6% and it ends near $267,571 before fees, which is the sensitivity to keep in mind before treating any projection as a promise.",
    },
    faqs: [
      {
        question: "Should I use pre-tax or after-tax returns?",
        answer:
          "For money in an IRA or 401(k), project the account balance with pre-tax returns and remember withdrawals may be taxed (traditional) or not (Roth). In a taxable account, dividends, interest and realised gains are taxed along the way, so an 8% gross return might compound at closer to 7% after tax depending on the investments and your bracket.",
      },
      {
        question: "How do investment fees affect the projection?",
        answer:
          "Subtract them from the return. A fund charging 1% a year against one charging 0.1% turns an 8% market return into 7% versus 7.9%. On the worked example, compounding at 7% instead of 7.9% cuts the 20-year result from about $353,000 to about $309,000 — roughly $44,000 paid for the fee difference.",
      },
      {
        question: "What return should I enter for a 60/40 portfolio?",
        answer:
          "Historical nominal returns for a 60% stock / 40% bond mix have been around 8% over very long periods, but forward-looking planner assumptions are often 5% to 7% because bond yields and valuations change the outlook. Model the lower figure for decisions you cannot afford to get wrong, like a retirement date.",
      },
      {
        question: "Does the calculator include inflation?",
        answer:
          "Results are nominal, but the tool shows the inflation-adjusted value alongside: at 3% inflation, divide the result by about 1.81 for a 20-year horizon to see today's purchasing power — the $333,013 example is roughly $184,381 in today's money. Decisions about whether a plan is 'enough' should always be made in real terms.",
      },
    ],
  },

};
