import type { Guide } from "../guides"

/** Editorial guides — Freelance, Creator & Business hub. Part of the 100-article framework set. */
export const GUIDES_FREELANCE_CREATOR_BUSINESS: Guide[] = [
  {
    "cornerstone": false,
    "description": "Self-employment tax explained for 2026: the 15.3% rate, the 92.35% rule, the $184,500 wage base, the deduction most freelancers miss, and quarterly payments.",
    "faqs": [
      {
        "answer": "Yes. Self-employment tax applies to net self-employment earnings above $400 a year, however small the side income. Your W-2 wages count toward the $184,500 Social Security wage base first, so if your salary already reaches the cap, only the 2.9% Medicare part applies to your freelance earnings. The income is still reported on Schedule C.",
        "question": "Do I pay SE tax if freelancing is a side income?"
      },
      {
        "answer": "Costs that are ordinary and necessary for the work: software, equipment, home office, professional services, and business mileage. Every dollar of legitimate expense reduces both your self-employment tax and your income tax, which is why tracking matters. Keep receipts and a note of the business purpose; a deduction is only as good as its documentation.",
        "question": "What counts as a business expense?"
      },
      {
        "answer": "April 15, June 15, September 15, and January 15 of the following year. If a due date falls on a weekend or holiday, payment is on time the next business day. Pay through IRS Direct Pay, EFTPS, or your IRS online account. Missing a deadline can trigger an underpayment penalty even if you pay in full when you file.",
        "question": "When are quarterly estimated taxes due?"
      },
      {
        "answer": "No. It applies to 92.35% of net earnings, not gross receipts, and the 12.4% Social Security part stops at the $184,500 wage base for 2026. Above that, only the 2.9% Medicare part continues, plus an additional 0.9% Medicare tax on earnings above $200,000 for single filers or $250,000 for joint filers.",
        "question": "Does the 15.3% rate apply to all my freelance income?"
      },
      {
        "answer": "An S-corp election can reduce it: you pay yourself a reasonable salary, which carries payroll taxes, and take remaining profit as distributions, which do not carry self-employment tax. The savings must outweigh payroll, bookkeeping, and filing costs, so the move usually pays only above roughly $80,000 to $100,000 of net profit. Get professional advice before electing.",
        "question": "Can I reduce self-employment tax with an S-corp?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/self-employment-tax-explained.jpg",
    "imageAlt": "Illustration of self-employment: a laptop, briefcase and coin gears on a desk",
    "inlineImage": "/images/self-employment-tax-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a calculator, stacked coins, a calendar page, and a briefcase",
    "intro": "Self-employment tax is the 15.3% Social Security and Medicare tax freelancers pay on net earnings — both the employee and employer halves, since you are both. It applies to 92.35% of net profit, sits on top of income tax, and is paid quarterly. This guide works through the rate, the cap, and the deductions that shrink it.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Self-Employment Tax Calculator",
        "url": "/freelance/self-employment-tax-calculator"
      },
      {
        "name": "1099 Tax Calculator",
        "url": "/freelance/1099-tax-calculator"
      },
      {
        "name": "Quarterly Estimated Tax Calculator",
        "url": "/freelance/quarterly-estimated-tax-calculator"
      },
      {
        "name": "S-Corp Tax Savings Calculator",
        "url": "/freelance/s-corp-tax-savings-calculator"
      },
      {
        "name": "Business Vehicle Tax Deduction Calculator",
        "url": "/freelance/business-vehicle-tax-deduction-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Estimated taxes are due quarterly (mid-April, June, September, January); underpayment penalties apply even if you pay in full by filing.",
          "An S-corp election can reduce SE tax by splitting income into salary (taxed) and distributions (not SE-taxed) — worthwhile usually above ~$80–100k of net profit, after accounting costs.",
          "Retirement contributions (SEP-IRA, Solo 401(k)) reduce income tax but not SE tax; business expenses reduce both."
        ],
        "heading": "The three rules",
        "paragraphs": [
          "First, the tax applies to net earnings, not gross receipts: business expenses come off before the 15.3% is calculated. Second, only 92.35% of net earnings is subject to the tax — a rough allowance for the employer half you are also paying. Third, you may deduct half of the self-employment tax from your income tax calculation. On $80,000 of net freelance income: the taxable base is $73,880, SE tax is about $11,303, and roughly $5,652 of that is deducted against income tax.",
          "The Social Security part (12.4%) stops at the annual wage cap; the Medicare part (2.9%) does not, and an additional 0.9% Medicare tax applies at higher incomes. Income tax is separate and additional — a freelancer in the 22% bracket with no deductions beyond the standard one often owes a combined effective rate near 30% of net income. Setting aside 25–30% of every payment, in a separate account, is the habit that makes April boring."
        ]
      },
      {
        "heading": "Who owes it and when it starts",
        "paragraphs": [
          "You owe self-employment tax if your net earnings from self-employment reach $400 in a year. That covers sole proprietors, independent contractors, partners in a partnership, and members of a single-member LLC taxed as a sole proprietorship. The IRS applies the rule regardless of age and even if you already receive Social Security or Medicare. There is no minimum age, no registration step, and no way to opt out: earning the income creates the obligation.",
          "Side income counts the same as full-time freelancing. A weekend of consulting, a few marketplace sales, or a month of gig work all produce self-employment income once net earnings pass $400. Clients generally send Form 1099-NEC when they pay you $2,000 or more in 2026, but the absence of a form changes nothing: income is taxable whether or not anyone reports it, and the IRS receives the forms your clients do send. Keep your own record of every payment.",
          "If you also hold a W-2 job, your wages count toward the Social Security wage base first. A salary of $150,000 leaves only $34,500 of the $184,500 base for your freelance earnings, so the 12.4% part applies to a smaller slice of your side income. The 2.9% Medicare part has no cap and applies to all net earnings either way. This is one reason the self-employment tax calculator matters for part-timers: the bill is rarely the flat 15.3% people expect."
        ]
      },
      {
        "heading": "How the rate is built",
        "paragraphs": [
          "The 15.3% rate has two parts. The Social Security part is 12.4% of net earnings up to the annual wage base, $184,500 for 2026. The Medicare part is 2.9% of all net earnings, with no cap. An employee pays half of each — 6.2% and 1.45%, or 7.65% — while the employer pays the other half. A freelancer pays both halves, which is why the rate looks steep next to a pay stub.",
          "The 92.35% factor softens the blow slightly. Only 92.35% of net earnings is subject to the tax, which roughly mirrors the employer share an employee never pays tax on. The calculation runs on net earnings — gross receipts minus business expenses — so every legitimate expense reduces the tax twice over, once against self-employment tax and once against income tax.",
          "High earners face one more layer. An additional 0.9% Medicare tax applies to earnings above $200,000 for single filers, $250,000 for married couples filing jointly, and $125,000 for married filing separately. It applies to the total of wages and self-employment income, has no employer match, and cannot be avoided by shifting income between categories. For most freelancers it is a distant concern; for those crossing the threshold, it adds $900 per $100,000 of earnings above it."
        ]
      },
      {
        "heading": "Worked examples by income level",
        "paragraphs": [
          "The table shows the tax at seven levels of net profit for a single filer with no W-2 wages, using 2026 figures. Read the effective rate column, not just the dollar amount: the rate holds near 14.1% of net earnings until the wage base binds, then falls as income rises, because the 12.4% Social Security part stops while only the Medicare parts continue.",
          "The deductible half is the part freelancers most often miss. Half of the self-employment tax is deductible when calculating adjusted gross income, so a $60,000 freelancer deducts $4,239 before income tax is figured. That deduction cuts income tax only; it does not reduce the self-employment tax itself or the net earnings it is calculated on.",
          "Compare the same $100,000 earned as salary. An employee pays 7.65% in Social Security and Medicare taxes — $7,650 — while the employer pays the other $7,650. The freelancer pays the full $14,130. The gap is real, but it is not pure loss: the freelancer also controls deductions an employee cannot claim, from the home office to business mileage, and sets their own retirement contributions. The honest comparison is total tax after deductions, not the headline rate."
        ],
        "table": {
          "head": [
            "Net earnings",
            "Taxable base (92.35%)",
            "SE tax",
            "Effective rate",
            "Deductible half"
          ],
          "rows": [
            [
              "$30,000",
              "$27,705",
              "$4,239",
              "14.1%",
              "$2,119"
            ],
            [
              "$60,000",
              "$55,410",
              "$8,478",
              "14.1%",
              "$4,239"
            ],
            [
              "$100,000",
              "$92,350",
              "$14,130",
              "14.1%",
              "$7,065"
            ],
            [
              "$150,000",
              "$138,525",
              "$21,194",
              "14.1%",
              "$10,597"
            ],
            [
              "$200,000",
              "$184,700",
              "$28,234",
              "14.1%",
              "$14,117"
            ],
            [
              "$250,000",
              "$230,875",
              "$29,851",
              "11.9%",
              "$14,926"
            ],
            [
              "$300,000",
              "$277,050",
              "$31,606",
              "10.5%",
              "$15,803"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Track expenses as they happen; reconstructing a year of receipts in April misses deductions and invites errors.",
          "A mileage log needs four things: date, destination, business purpose, and miles. Without it, the deduction is hard to support.",
          "Separate business and personal money from day one; a dedicated account makes every deduction traceable."
        ],
        "heading": "The deductions that shrink the bill",
        "paragraphs": [
          "Business expenses are the strongest lever because they reduce both taxes at once. The IRS test is that an expense is ordinary and necessary for the work: software, equipment, professional services, advertising, and a home office all qualify. A $5,000 expense for a freelancer in the 22% income-tax bracket saves about $706 in self-employment tax and about $1,178 in income tax — roughly $1,884 in total.",
          "Three deductions deserve specific attention. The home office deduction has a simplified option of $5 per square foot up to 300 square feet, a maximum of $1,500 a year, with no utility tracking. Business mileage uses the IRS standard rate: 72.5 cents per mile for January through June 2026 and 76 cents from July through December. Health insurance premiums are deductible for income tax when you are self-employed and not eligible for coverage through a spouse's employer plan, limited to your net business profit.",
          "Two more items complete the picture. Half of your self-employment tax is deductible from income, as the table above shows. Many freelancers may also qualify for the qualified business income deduction of up to 20% of qualified business income, though income limits and other rules apply. Both reduce income tax only, not self-employment tax — a distinction worth keeping straight when you estimate what you owe."
        ]
      },
      {
        "bullets": [
          "Set aside 25–30% of every payment in a separate account the day it arrives; pay each quarter from that account.",
          "Refigure your estimate each quarter with Form 1040-ES; a strong quarter raises the next payment, a weak one lowers it.",
          "A W-2 job can cover the gap: raising withholding on Form W-4 counts the same as estimated payments."
        ],
        "heading": "Quarterly estimated taxes",
        "paragraphs": [
          "No employer withholds tax from freelance payments, so the IRS requires you to pay as you earn through quarterly estimated taxes. The deadlines are April 15, June 15, September 15, and January 15 of the following year. If a due date falls on a weekend or holiday, the next business day counts. You generally must pay estimates if you expect to owe $1,000 or more when your return is filed.",
          "The underpayment penalty is the part that surprises people: it can apply even if you pay in full by the filing deadline, because the IRS charges for paying late, not just for paying short. Three safe harbors avoid it: owing less than $1,000 after withholding and credits, paying at least 90% of the current year's tax, or paying 100% of the prior year's tax, whichever of the last two is smaller. Special rules apply to farmers, fishermen, and certain higher-income taxpayers.",
          "Freelance income rarely arrives evenly, and the IRS allows for that. If your income is bunched into part of the year, you can annualize it and make unequal quarterly payments using Form 2210, which can reduce or eliminate the penalty. Payments go through IRS Direct Pay, the Electronic Federal Tax Payment System (EFTPS), your IRS online account, or the IRS app — and you can pay weekly or monthly as long as enough is in by each quarter's end."
        ]
      },
      {
        "heading": "The S-corp question",
        "paragraphs": [
          "The most-discussed way to cut self-employment tax is electing S corporation status for your LLC or corporation. As an S-corp owner you pay yourself a salary, which carries payroll taxes, and take remaining profit as distributions, which do not carry self-employment tax. On $120,000 of net profit with a $70,000 salary, roughly $50,000 escapes the 15.3% rate — a saving near $7,000 before costs.",
          "The catch is cost and compliance. An S-corp needs payroll processing, a separate business tax return, bookkeeping that keeps salary and distributions distinct, and often an accountant. Those costs commonly run into the low thousands per year, which is why the election usually pays only above roughly $80,000 to $100,000 of net profit. Below that, the administration eats the saving.",
          "The salary must also be reasonable for the work performed. Paying yourself $20,000 while distributing $100,000 invites an IRS challenge and back taxes with penalties. The right salary depends on your field, experience, and hours — and the election itself is a decision to make with a tax professional, not a blog post. Run the numbers for your income first with an S-corp savings calculator.",
          "The break-even test is simple: estimate the SE tax saved on distributions, then subtract payroll processing, the separate business return, bookkeeping, and any state-level S-corp fees or franchise taxes. If the saving clears those costs by a comfortable margin and your profit is stable year to year, the election earns its keep. If profit is volatile or barely above the threshold, the fixed costs can turn a saving into a loss in a bad year."
        ]
      },
      {
        "heading": "Self-employment tax and your future benefits",
        "paragraphs": [
          "Self-employment tax is not only a bill; it is what buys your future Social Security and Medicare coverage. The net earnings you report on Schedule SE become your Social Security earnings record, and that record is what your retirement benefit is calculated from. Every year of reported earnings adds to it, and years with no reported earnings add nothing.",
          "That creates a trade-off worth understanding. Aggressive deductions lower today's tax, but they also lower the earnings record that sets your benefit. A freelancer who reports minimal net income for years may owe little now and qualify for a smaller retirement benefit later. The answer is not to overpay tax — it is to report income honestly and treat retirement savings as a separate decision, funded deliberately rather than left to whatever the benefit formula produces.",
          "Medicare works the same way: the 2.9% Medicare part of the tax is what builds eligibility for premium-free Part A in retirement. Employees build it through payroll withholding; freelancers build it through the same tax paid quarterly. The coverage is identical either way — the only difference is who sends the money in."
        ]
      },
      {
        "heading": "Retirement accounts and SE tax",
        "paragraphs": [
          "Retirement contributions are the largest income-tax lever most freelancers have, but they do not reduce self-employment tax. A SEP IRA accepts employer contributions of roughly 20% of net earnings, capped at $72,000 for 2026. A Solo 401(k) adds an employee deferral of up to $24,500 on top of the same employer contribution, with the same $72,000 combined cap.",
          "The difference is concrete. On $80,000 of net profit, the SEP IRA maximum is about $14,870. With a Solo 401(k), the same freelancer adds the $24,500 employee deferral for a total near $39,370 — more than twice as much sheltered. The Solo 401(k) takes more paperwork to set up and requires a short annual filing once plan assets pass $250,000.",
          "The SEP IRA still wins on simplicity, and it is the better choice if you may hire employees soon: a Solo 401(k) is only available to businesses with no employees other than the owner and a spouse. Either way, contributions are made with pre-tax money and reduce taxable income in the year you contribute, which is why funding retirement early in the year — rather than scrambling in April — is worth building into your quarterly routine."
        ]
      },
      {
        "bullets": [
          "Forgetting state income tax: most states tax freelance income too, on top of the federal bill.",
          "Assuming the wage cap covers you: it applies to combined wages and net earnings, not to each separately.",
          "Skipping the half-of-SE-tax deduction: it is automatic on the return, but only if you file Schedule SE."
        ],
        "heading": "Common mistakes",
        "paragraphs": [
          "The costliest mistake is treating a payment as income rather than revenue. A $10,000 invoice is not $10,000 of spending money: after self-employment tax and income tax, roughly $7,000 of it is yours, and the rest belongs to the IRS on a quarterly schedule. Freelancers who spend the gross amount spend the tax money too, and April becomes a crisis instead of a formality.",
          "The second mistake is sloppy records. Expenses without receipts, mileage without a log, and business costs mixed into a personal account all cost deductions at filing time — or worse, fail under audit. The IRS generally has three years from your filing date to audit a return, so records need to survive that long.",
          "First-year freelancers face a special trap. If you had no tax liability at all last year, the IRS does not require estimated payments for the current year — but the full year's tax still comes due in April, on twelve months of earnings at once. The set-aside habit matters most exactly when the rules do not force it: transfer 25–30% of every payment from the first invoice, and the first April is a routine filing instead of a shock."
        ]
      },
      {
        "heading": "Filing and paying, step by step",
        "paragraphs": [
          "At tax time the chain runs through three forms. Schedule C reports your business income and expenses and produces net profit. Schedule SE takes that figure, applies the 92.35% factor, and calculates the self-employment tax. Form 1040 pulls it together, claims the half-of-SE-tax deduction, and adds the result to your income tax.",
          "During the year, Form 1040-ES is the worksheet for quarterly estimates. Use last year's return as the starting point, adjust for what this year actually looks like, and refigure each quarter. The IRS online account shows your payment history and balance, which makes it easy to check whether you are on track before the next deadline.",
          "If the numbers feel uncertain, a tax professional earns their fee quickly on a first freelance return: they catch deductions you missed, set the S-corp question in your actual numbers, and establish an estimated-payment schedule you can repeat. After that, most freelancers can run the routine themselves with a calculator and a separate tax account."
        ]
      }
    ],
    "seoTitle": "Self-Employment Tax 2026: Rate, Deductions and How It Works",
    "slug": "self-employment-tax-explained",
    "sources": [
      {
        "label": "IRS — Self-Employment Tax",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS — Estimated Taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      },
      {
        "label": "IRS — Form 1099-K FAQs: General information",
        "url": "https://www.irs.gov/newsroom/form-1099-k-faqs-general-information"
      }
    ],
    "title": "Self-Employment Tax 2026: Rate, Deductions & How It Works",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "How YouTube pays creators in 2026: CPM vs RPM, the 55% revenue share, Partner Program thresholds, Shorts payouts, and what a million views is really worth.",
    "faqs": [
      {
        "answer": "Advertiser budgets reset after the holidays. Q4 RPMs are seasonally the highest of the year and Q1 the lowest, across nearly every niche, so a January drop usually reflects the calendar rather than your channel. Compare January with last January, not with December, and check whether your audience mix or niche changed before assuming something is wrong.",
        "question": "Why did my RPM drop in January?"
      },
      {
        "answer": "Yes. A share of each Premium subscriber's fee is distributed to creators by watch time, and it is included in RPM but not visible as a separate CPM. Premium viewers see no ads, so their contribution comes entirely from the subscription share. For Shorts, YouTube pays 45% of the net Premium revenue allocated to monetizing creators.",
        "question": "Do Premium views pay?"
      },
      {
        "answer": "Subscribers themselves pay nothing; views do. A channel with 1,000 subscribers and 100,000 monthly views at a $12 RPM earns about $1,200 a month, while a channel with 100,000 subscribers and the same views earns the same. Subscriber count matters because it unlocks the Partner Program and signals trust to sponsors — but the income follows views, not the subscriber number.",
        "question": "How much is 1,000 subscribers worth?"
      },
      {
        "answer": "After your AdSense balance reaches the $100 payment threshold and you have verified your identity and address. Earnings are finalized early the following month and issued between the 21st and the 26th; a bank transfer arrives up to seven business days later. Below $100, earnings roll over month to month until the threshold is met.",
        "question": "When do I get my first YouTube payment?"
      },
      {
        "answer": "Almost never. Shorts pay from a shared pool at RPMs measured in cents per thousand views, so even millions of monthly views produce modest AdSense income. Shorts work best as an audience engine: they build subscribers quickly, and the income comes when those subscribers watch long-form videos, join memberships, or buy products. Treat Shorts as marketing, not as the business.",
        "question": "Can Shorts alone support a full-time income?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-youtube-pays-creators.jpg",
    "imageAlt": "Illustration of YouTube earnings: a play button with rising coin bars",
    "inlineImage": "/images/how-youtube-pays-creators-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a video player with a play triangle, rising stacks of coins, and a camera",
    "intro": "YouTube pays creators 55% of ad revenue, but the number that reaches your bank account is RPM — revenue per thousand views after YouTube's cut and after unmonetized views. This guide explains CPM versus RPM, the Partner Program thresholds, Shorts payouts, the payment cycle, and what a channel actually earns at different sizes.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "YouTube Money Calculator",
        "url": "/creator/youtube-adsense-estimator"
      },
      {
        "name": "YouTube CPM / RPM Calculator",
        "url": "/creator/youtube-cpm-calculator"
      },
      {
        "name": "TikTok Earnings Calculator",
        "url": "/creator/tiktok-creator-fund-calculator"
      },
      {
        "name": "Sponsorship Pricing Calculator",
        "url": "/creator/sponsorship-pricing-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Partner Program threshold: 1,000 subscribers plus 4,000 public watch hours (or 10M Shorts views in 90 days).",
          "Shorts pay from a shared pool at far lower RPM — typically cents per thousand views, not dollars.",
          "Sponsorships, affiliates and products usually overtake AdSense once a channel passes ~50k subscribers in a commercial niche."
        ],
        "heading": "From advertiser money to creator money",
        "paragraphs": [
          "Advertisers bid for placements; a finance video watched in the US might carry a $30–$50 CPM, while a general entertainment video might clear $4–$10. YouTube keeps 45% of ad revenue and pays the creator 55%. Then RPM dilutes further: not every view is monetized (ad blockers, no suitable ad, Premium views pay differently), so a $30 CPM commonly becomes a $10–$16 RPM. A million views at $12 RPM is $12,000 — a good month, and roughly what the headline CPM would have promised at $30,000 before the two haircuts.",
          "Niche is the largest lever because advertisers pay for the audience's buying intent. Personal finance, B2B software and insurance audiences are worth multiples of comedy or gaming audiences. Geography is second: a US viewer is worth several times a viewer in a lower-ad-spend market. Video length matters too — videos over 8 minutes can carry mid-roll ads, which is why long-form finance content compounds RPM advantages."
        ]
      },
      {
        "heading": "Joining the Partner Program",
        "paragraphs": [
          "Ad revenue starts with the YouTube Partner Program, and the threshold is specific: 1,000 subscribers plus 4,000 qualified watch hours on public long-form videos in the last 12 months, or 1,000 subscribers plus 10 million qualified Shorts views in the last 90 days. Watch hours from Shorts viewed in the Shorts Feed do not count toward the 4,000 hours. YouTube reviews the channel before accepting it and keeps reviewing it afterward; meeting the numbers is necessary, not sufficient.",
          "Some features unlock earlier. Channel memberships open at 500 subscribers with 3 public uploads in the last 90 days and either 3,000 qualified watch hours in the last year or 3 million qualified Shorts views in the last 90 days. Super Chat, Super Stickers, and Super Thanks require the creator to be at least 18. For ad revenue itself, creators must be 18 or have a legal guardian over 18 handling payments through AdSense for YouTube, and must live in a country where the program is available.",
          "Acceptance also means accepting contract modules — the terms that govern each way of earning — and creating content that meets YouTube's advertiser-friendly guidelines. Videos that breach those guidelines can be demonetized individually even on a monetized channel, which is why creators in sensitive niches check the guidelines before publishing, not after. Monetization is reviewed continuously, so a channel that drifts from the policies can lose it even after years in the program."
        ]
      },
      {
        "heading": "CPM, RPM, and the metrics that matter",
        "paragraphs": [
          "Three metrics describe YouTube money, and only one of them pays you. CPM is what advertisers pay per thousand ad impressions — the price of the audience. Playback-based CPM narrows that to ad impressions on actual playbacks. RPM is what you receive per thousand views: all revenue — ads, Premium, memberships, Super Chat — divided by views, after YouTube's share. RPM is the number that reaches a bank account; CPM is the number advertisers see.",
          "The gap between them has three causes. YouTube keeps 45% of ad revenue. Not every view shows an ad: ad blockers, viewers without a suitable ad, and embedded views all dilute the count. And Premium revenue, which has no CPM at all, enters RPM through a separate share of subscription fees. A $30 CPM becoming a $10–$16 RPM is not a malfunction; it is the normal result of those three haircuts applied in sequence.",
          "Use RPM for forecasting and CPM for diagnosing. If RPM falls while views hold steady, check whether the audience mix changed — more viewers from lower-ad-spend countries, or a seasonal dip in advertiser demand. If CPM falls, advertisers are paying less for your audience, which usually means the niche or the season moved. Both numbers live in YouTube Analytics under the Revenue tab, broken down by video, country, and traffic source — the breakdown is where the explanation usually sits."
        ]
      },
      {
        "bullets": [
          "Check RPM by video, not just by channel: one high-RPM video can carry a month, and one low-RPM viral video can mislead you about what the channel earns.",
          "Shorts views dilute channel RPM if you mix them into the same calculation — keep Shorts and long-form revenue separate when you forecast."
        ],
        "heading": "Why RPM varies so much",
        "paragraphs": [
          "Niche is the largest lever because advertisers pay for the audience's buying intent. Personal finance, B2B software, and insurance audiences are worth multiples of comedy or gaming audiences: the advertiser selling a $2,000 software contract can afford a $30–$50 CPM, while the advertiser selling a $5 snack cannot. The same million views in finance and in gaming can differ tenfold in revenue, and no amount of optimization closes that gap.",
          "Geography is second. A US viewer is worth several times a viewer in a lower-ad-spend market, because advertisers bid more for audiences in wealthy countries. A channel whose audience is mostly American earns far more per view than a channel with the same views spread across countries where ad budgets are small. Audience geography is visible in Analytics, and it explains most of the RPM difference between two channels in the same niche.",
          "Length and season do the rest. Videos over 8 minutes can carry mid-roll ads, which is why long-form finance content compounds its RPM advantages — more ad slots on a high-value audience. Seasonality runs on the advertiser calendar: Q4 RPMs are the highest of the year as holiday budgets peak, and Q1 the lowest as budgets reset. A January RPM drop is usually the calendar, not the channel."
        ]
      },
      {
        "heading": "Shorts: the pool, not the split",
        "paragraphs": [
          "Shorts pay from a shared pool, not from the ads on your own videos. Each month, revenue from ads shown between videos in the Shorts Feed is pooled together, music licensing costs are covered from the pool, and the remainder — the Creator Pool — is distributed to monetizing creators based on their share of total engaged views in each country. Creators keep 45% of their allocated revenue, whether or not they used music.",
          "The result is RPM measured in cents per thousand views, not dollars. A Short with a million views might earn a few dollars to a few tens of dollars, where a long-form video with the same views in a commercial niche earns thousands. Shorts are an audience tool, not an income tool: they build subscribers fast, and the income comes when those subscribers watch long-form videos.",
          "The rules tighten from February 1, 2027: to earn a share of Shorts ad revenue and Premium revenue each month, a channel will need at least 10 million qualified Shorts views in the last 90 days. Views earned before accepting the Shorts Monetization Module do not count. Creators building a Shorts-first channel should plan for that bar — and for the reality that Shorts alone rarely pays a living."
        ]
      },
      {
        "heading": "Money beyond AdSense",
        "paragraphs": [
          "AdSense is the floor of creator income, not the ceiling. Channel memberships bring recurring monthly payments from fans in exchange for perks, and they open at 500 subscribers. Super Chat and Super Stickers let fans pay to highlight messages in live streams, and Super Thanks does the same in comments. YouTube Shopping lets fans buy products from your store or products you tag through the affiliate program. Each feature has its own eligibility rules on top of the Partner Program thresholds.",
          "Sponsorships are where the money usually overtakes AdSense: once a channel passes roughly 50,000 subscribers in a commercial niche, brand deals, affiliates, and products typically earn more than ads. A sponsor pays for the audience's trust, not for impressions, which is why a small channel in a valuable niche can command sponsorship fees that dwarf its AdSense check. Price sponsorships from the audience's value to the brand, not from your view count alone.",
          "Diversification is risk management, not greed. Ad revenue depends on an algorithm, advertiser budgets, and policies that change without notice. Memberships, sponsorships, courses, and products depend on the audience directly, and they survive a demonetized video or a bad quarter. The creators who treat YouTube as one income stream among several sleep better than those who treat it as the only one.",
          "One obligation comes with sponsorships and affiliate links: disclosure. US rules require creators to tell viewers clearly when a link earns them a commission or a segment is sponsored — a brief spoken note and a line in the description covers it. Disclosure does not hurt conversions the way creators fear; undisclosed promotion, discovered later, costs the trust the sponsorship was paying for."
        ]
      },
      {
        "heading": "The payment cycle",
        "paragraphs": [
          "YouTube pays through AdSense, on a monthly cycle with a lag that surprises new creators. Earnings accrue over a month, are finalized at the start of the next month — YouTube earnings are added to your AdSense balance between the 7th and 12th — and are issued between the 21st and the 26th, provided your balance has reached the $100 payment threshold and no hold is in place. By bank transfer, the money arrives up to seven business days after issue. January's earnings, in other words, reach your account in late February.",
          "Three smaller thresholds come first. Identity verification is required before the account can show ads or receive payments. Address verification triggers at $10, when Google mails a PIN to your address. Payment method selection opens at $10 as well. Changes to payment information must be completed by the 20th of the month to take effect in that month's cycle; changes made later wait until the following month.",
          "Below the $100 threshold, earnings roll over: the balance accrues month to month until it crosses the line, and only then is a payment issued. A small channel may wait several months for its first payout, which is normal. The threshold applies separately to each payments account, so creators with separate AdSense and YouTube payments accounts must clear it in each."
        ]
      },
      {
        "heading": "What channels actually earn",
        "paragraphs": [
          "The table shows monthly AdSense earnings at four audience sizes and three RPM levels. Read it as a range, not a promise: a channel's RPM depends on its niche, audience, and season, and most channels sit between the low and middle columns. The math is simple — monthly views divided by 1,000, multiplied by RPM — which is why the fastest route to more income is usually more views in a valuable niche, not a higher RPM on the same views.",
          "A full-time income from AdSense alone needs scale. At a $12 RPM, $5,000 a month requires roughly 417,000 monthly views — every month, indefinitely. That is achievable in a commercial niche with a deep library, because older videos keep earning: a channel's back catalog often produces half its monthly views. At a $4 RPM the same income needs 1.25 million monthly views, which is why niche choice matters more than upload frequency.",
          "Timelines matter as much as totals. Reaching 100,000 monthly views typically takes a year or more of consistent uploads in a competitive niche — the Partner Program threshold is the beginning of monetization, not the beginning of income. The channels that earn steadily are the ones that kept publishing through the months when AdSense paid almost nothing, because the library they built in those months is what pays now."
        ],
        "table": {
          "head": [
            "Monthly views",
            "$4 RPM",
            "$12 RPM",
            "$20 RPM"
          ],
          "rows": [
            [
              "100,000",
              "$400",
              "$1,200",
              "$2,000"
            ],
            [
              "500,000",
              "$2,000",
              "$6,000",
              "$10,000"
            ],
            [
              "1,000,000",
              "$4,000",
              "$12,000",
              "$20,000"
            ],
            [
              "5,000,000",
              "$20,000",
              "$60,000",
              "$100,000"
            ]
          ]
        }
      },
      {
        "heading": "Taxes for creators",
        "paragraphs": [
          "YouTube earnings are self-employment income, and the tax treatment surprises creators the same way it surprises freelancers. AdSense payouts, sponsorships, memberships, and affiliate income are all taxable, and no tax is withheld from them. The 15.3% self-employment tax applies to net earnings above $400 a year, on top of income tax, and quarterly estimated taxes are due April 15, June 15, September 15, and January 15.",
          "Google reports your earnings to the IRS, and you should keep your own records regardless of which forms arrive: AdSense statements, sponsorship contracts, and affiliate payouts. The reporting threshold for a 1099-NEC is $2,000 for 2026 payments, but income is taxable whether or not a form is issued. Set aside 25–30% of every payout in a separate account, the same habit that keeps freelancers out of trouble in April.",
          "The costs of creating are deductible business expenses: cameras, microphones, editing software, a home office, and the portion of internet service used for the channel. Track them as they happen, with receipts, and report income and expenses on Schedule C. Creators who treat the channel as a business from the first payout — separate account, quarterly estimates, expense records — avoid the scramble that hits creators who treat it as a hobby until the money gets serious."
        ]
      },
      {
        "heading": "Monetization mistakes that cost creators money",
        "paragraphs": [
          "The most expensive mistake is building on borrowed content. YouTube's monetization policies require original work: channels that reupload other creators' videos, compile clips with minimal commentary, or lean on repetitive templated content can be refused entry to the Partner Program or removed from it. The review is human, and the standard is whether the channel adds something of its own. A channel refused for reused content needs substantial original uploads before reapplying, not a quick appeal.",
          "Music is the quieter trap. Using a copyrighted song without a license does not usually remove the video — it hands the ad revenue to the rights holder through a Content ID claim. The video stays up and earns, but the money goes elsewhere. YouTube's own audio library exists precisely to avoid this: tracks there are cleared for monetized use. Commercial music belongs in videos only when the license covers it.",
          "Invalid traffic is the mistake that ends channels. Clicking your own ads, asking viewers to click ads, or buying views from traffic services violates AdSense policies, and Google detects it. The consequence is not a warning: accounts are closed, balances withheld, and reinstatement is rare. The rule is simple — never touch your own ads, and never pay for views. Growth that has to be bought is not growth a channel can keep."
        ]
      },
      {
        "bullets": [
          "Evergreen videos earn for years: a tutorial that ranks in search pays monthly long after the upload date.",
          "Check the advertiser-friendly guidelines before publishing sensitive topics; a demonetized video earns nothing from ads.",
          "Do not chase RPM at the cost of the audience: a channel viewers trust earns more from sponsorships than a high-RPM channel nobody watches twice."
        ],
        "heading": "Growing your RPM",
        "paragraphs": [
          "RPM grows from three levers, in order of impact: audience, length, and season. Audience means choosing topics advertisers value and viewers with spending power — the niche decision made at the start of the channel matters more than any later optimization. Length means videos over 8 minutes with mid-roll ads placed where viewers stay, not where they leave. Season means planning major uploads for Q4, when advertiser budgets peak, and expecting Q1 to be quiet.",
          "One more lever is retention. Advertisers pay for impressions, and impressions come from watch time: a video viewers finish earns more ad slots than one they abandon halfway, even at the same view count. Retention is also what the algorithm rewards, so the same improvement lifts both views and RPM. Open with the promise of the video, deliver it without padding, and cut anything the viewer would skip."
        ]
      }
    ],
    "seoTitle": "How YouTube Pays Creators: CPM, RPM, Payout Rules Explained",
    "slug": "how-youtube-pays-creators",
    "sources": [
      {
        "label": "YouTube Creators — Monetization",
        "url": "https://www.youtube.com/creators/"
      },
      {
        "label": "YouTube Help — How to earn money on YouTube",
        "url": "https://support.google.com/youtube/answer/72857"
      },
      {
        "label": "YouTube Help — Shorts monetization policies",
        "url": "https://support.google.com/youtube/answer/12504220"
      }
    ],
    "title": "How YouTube Pays Creators: CPM, RPM & Payout Rules Explained",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "How to price freelance work from your costs up: the billable-hours reality, why hourly pricing caps your income, and how to move to project and value pricing.",
    "faqs": [
      {
        "answer": "Publishing a rate filters inquiries and builds trust, but anchors negotiation: every client starts from your published number. Many established freelancers publish a project minimum instead and keep the hourly math private, which filters out small budgets without fixing a ceiling on larger work. Either approach beats no signal at all — silence invites lowball offers.",
        "question": "Should I show my hourly rate publicly?"
      },
      {
        "answer": "Give notice at a natural boundary — a new project or a new quarter — state the new rate plainly, and keep the tone brief. A sentence is enough: the rate changes on a date, and the work continues. Clients who value the work adjust; the ones who leave free capacity for better-fit work. Never apologize for a rate that reflects your costs.",
        "question": "How do I raise rates with existing clients?"
      },
      {
        "answer": "Most solo freelancers bill 1,100 to 1,250 hours a year: roughly 25 to 30 billable hours a week across 48 working weeks. The rest goes to sales, admin, invoicing, marketing, holidays, and sick days. Planning on 2,000 billable hours is the most common pricing error — it produces a rate that looks comfortable and pays half of what you intended.",
        "question": "How many billable hours can I realistically expect?"
      },
      {
        "answer": "Charge hourly for open-ended work like consulting and maintenance, where the scope is genuinely unknown. Charge per project for defined deliverables like a website or a report, where you can estimate the work and the client wants a fixed price. Either way, build project quotes from your hourly floor — estimate the hours, multiply by your rate, and add a 15 to 20 percent buffer.",
        "question": "Should I charge hourly or per project?"
      },
      {
        "answer": "A deposit of 30 to 50 percent before starting is standard in most freelance fields. It protects you against clients who disappear mid-project and confirms the client is serious before you turn down other work. For larger jobs, split the remainder into milestone payments tied to deliverables rather than waiting for one payment at the end.",
        "question": "What deposit should I ask for?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-price-freelance-work.jpg",
    "imageAlt": "Illustration of freelance pricing: a price tag, a clock and a laptop in balance",
    "inlineImage": "/images/how-to-price-freelance-work-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale weighing a clock against stacked coins, with a price tag and a laptop",
    "intro": "A sustainable freelance rate starts from your costs, not from a competitor's website or your old salary divided by 2,000 hours. This guide builds the rate from the ground up: the billable hours you actually have, the taxes and benefits employment used to hide, and how to move from hourly billing to project and value pricing.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Freelance Hourly Rate Calculator",
        "url": "/freelance/freelance-hourly-rate-calculator"
      },
      {
        "name": "Project Pricing Calculator",
        "url": "/freelance/freelance-project-pricing-calculator"
      },
      {
        "name": "Billable Hours Calculator",
        "url": "/freelance/billable-hours-calculator"
      },
      {
        "name": "Salary to Hourly Calculator",
        "url": "/freelance/salary-to-hourly-calculator"
      }
    ],
    "sections": [
      {
        "heading": "The billable-hours reality",
        "paragraphs": [
          "A full-time year is 2,080 hours. Remove holidays, vacation and sick days and you are near 1,850. Remove sales calls, admin, invoicing and marketing — typically 30–40% of a solo practice — and billable time lands near 1,100–1,250 hours. To net what a $90,000 salary provides, after self-employment tax, benefits you now buy yourself (health insurance, retirement), software and a profit margin, the required billing is often near $130,000 — which at 1,150 billable hours is about $113 an hour. The common mistake of charging $45 (salary ÷ 2,000) quietly pays you half of what you intended."
        ]
      },
      {
        "heading": "Build your rate from your costs",
        "paragraphs": [
          "A rate built from costs has four inputs: the income you want to take home, the taxes on it, the benefits you now buy yourself, and the hours you can actually bill. Add the first three together and divide by the fourth. The result is your floor — the lowest rate at which the business pays for itself. Anything below it is a subsidy you pay to your clients out of your own pocket.",
          "Here is the calculation worked through. Suppose you want $80,000 a year in take-home income. Add 30 percent for taxes and benefits: $80,000 × 1.30 = $104,000. Now count billable hours: 48 working weeks (four weeks off) × 30 billable hours a week = 1,440 hours. Divide: $104,000 ÷ 1,440 = $72 an hour. Round up to $75 to give yourself a margin for slow months and late payers. That is your floor.",
          "The table shows the same math at five salary levels, using 1,150 billable hours — the realistic figure for a solo practice after admin, sales, and time off. The multiplier is roughly 1.45: for every dollar of take-home pay, the business must bill about $1.45 to cover self-employment tax, health insurance, retirement, software, and a margin. Your multiplier will differ; run your own costs through the hourly rate calculator rather than adopting the table's.",
          "The margin in the multiplier deserves a word of its own. A rate that covers costs exactly leaves nothing for slow months, late payers, or equipment failure — and all three are certainties over a freelance career, not risks. A margin of 10 to 20 percent above bare costs turns those events from crises into inconveniences. It also funds the things that keep the business growing: training, better tools, and time spent finding the next client instead of scrambling for the next invoice."
        ],
        "table": {
          "head": [
            "Take-home target",
            "Must bill",
            "Hourly rate at 1,150 hours"
          ],
          "rows": [
            [
              "$60,000",
              "$87,000",
              "$76"
            ],
            [
              "$75,000",
              "$108,750",
              "$95"
            ],
            [
              "$90,000",
              "$130,500",
              "$113"
            ],
            [
              "$120,000",
              "$174,000",
              "$151"
            ],
            [
              "$150,000",
              "$217,500",
              "$189"
            ]
          ]
        }
      },
      {
        "heading": "Four ways to charge",
        "paragraphs": [
          "Hourly billing is the simplest model: the client pays for time, tracked and invoiced. It suits open-ended work — consulting, maintenance, support — where the scope is genuinely unknown. Its ceiling is your calendar: income stops growing when hours run out, and every efficiency gain cuts your pay. Use it where scope cannot be fixed, not as a default.",
          "Project pricing sells a defined outcome for a fixed fee. The client knows the cost before work starts, and your speed becomes profit instead of a pay cut. The risk runs the other way: underestimate the scope and you work extra hours for free. Build every project quote from your hourly floor, estimate hours honestly, and add a 15 to 20 percent buffer for revisions and scope creep.",
          "Retainers trade a lower rate for predictable income: the client pays a fixed monthly fee for a set amount of work or availability. One retainer covering a third of your monthly costs changes freelancing from precarious to manageable, because the floor is covered before the month starts. Value pricing goes further — the fee reflects the result's worth to the client, not your hours — and it only works when you can name the outcome in money: revenue gained, cost removed, risk avoided.",
          "Most established freelancers use a mix: hourly for open-ended work, project fees for defined deliverables, and one or two retainers for stability. Value pricing enters later, once you have the track record to price outcomes with confidence. The model matters less than the discipline behind it: every price starts from the same hourly floor, whatever the client sees.",
          "Day rates deserve a mention as the hybrid between hourly and project pricing. A day rate sells a full day of focused work at a premium over eight hourly units, because the client gets your undivided attention and a guaranteed delivery window. It suits workshops, audits, and intensive consulting days. Price the day from your hourly floor — eight hours at your rate, plus a premium for exclusivity — and state clearly what a day includes and when it ends."
        ]
      },
      {
        "bullets": [
          "Rebuild your rate whenever a major cost changes — taxes, insurance, rent.",
          "Track realized rate (project fee ÷ actual hours) after every project; it is the only honest measure.",
          "Deposits of 30–50% before starting are standard risk management, not rudeness."
        ],
        "heading": "From hourly to project pricing",
        "paragraphs": [
          "Hourly pricing sells your time; project pricing sells an outcome, and it rewards the speed that experience brings. Price a project from the hourly floor, never below it: estimate hours honestly, multiply by your rate, then adjust for the value to the client and the risk you absorb (fixed price means overruns are yours). Add a rush premium rather than absorbing urgency for free. Raise rates for new clients first — existing clients follow at renewal — and expect the correct price to lose some inquiries. A 100% close rate is not success; it is evidence the price is too low."
        ]
      },
      {
        "heading": "How to quote a project",
        "paragraphs": [
          "A good quote starts with scope, not price. Write down exactly what is included — deliverables, revision rounds, deadlines, what the client must supply and when — before any number appears. The single most common cause of underpriced projects is a vague scope that grows after the price is fixed. If the client cannot describe what they want, the first deliverable is a paid discovery phase, not a free guess.",
          "Price from the floor up: estimate hours honestly, multiply by your hourly rate, add the 15 to 20 percent buffer, then adjust for value and risk. A fixed price means overruns are yours, so the buffer is not padding — it is insurance you buy from yourself. Add a rush premium rather than absorbing urgency for free: a deadline that forces weekend work or displaces other clients costs real money.",
          "Put the quote in writing with payment terms attached: a deposit of 30 to 50 percent before work starts, milestone payments for larger jobs, and a due date on every invoice. When a client says the price is too high, reduce the scope, not the rate — fewer deliverables, fewer revision rounds, a longer timeline. Cutting the rate teaches the client that your first price was negotiable; cutting scope teaches them that the price reflects the work."
        ]
      },
      {
        "heading": "Raising your rates",
        "paragraphs": [
          "Three signals mean it is time to raise rates: your calendar is full weeks ahead, every prospect says yes without hesitation, or a major cost has risen. A full calendar means demand exceeds supply, and price is how a market rations supply. A 100% close rate is not success; it is evidence the price is too low. Raise rates for new clients first and let existing clients follow at renewal.",
          "How much? A 10 to 20 percent increase is a normal step for a freelancer whose demand supports it; larger jumps fit when the old rate was set long ago or the work has changed substantially. Give existing clients notice at a natural boundary — a new project, a new quarter — and state the new rate plainly, without apology or a long justification. Clients who value the work adjust; the ones who leave free capacity for better-fit work.",
          "Do not grandfather old rates indefinitely. A client paying a 2023 rate in 2026 is a client you subsidize, and the subsidy grows with every cost increase you absorb. If a long-standing client genuinely cannot meet the new rate, offer a reduced scope at the old price rather than the same work at the old rate. The relationship survives; the math does too."
        ]
      },
      {
        "heading": "Negotiating without discounting",
        "paragraphs": [
          "Most rate negotiations are not about price; they are about risk. A client pushing for a lower fee is usually unsure the work will deliver, and a discount does nothing to answer that doubt. What answers it is evidence: a clear scope, a defined outcome, a timeline with checkpoints, and references from similar work. When the conversation turns to price, steer it back to what the client gets and when — the fee follows the value, not the other way round.",
          "When a client genuinely cannot afford the full scope, trade scope for price rather than cutting the rate. Fewer deliverables, a longer timeline, or a phased start all reduce cost without touching your hourly floor. A phased start is often the best trade: a small first phase at full rate lets the client test the working relationship, and the second phase is priced when trust is established.",
          "Know your walk-away point before the conversation starts. It is your floor rate, and no project below it is worth taking — it costs you the hours you could have spent on better-paying work, and it sets a precedent the client will expect next time. Saying no to an underpriced project is not lost income; it is capacity protected for work that pays. The freelancers who struggle most with pricing are usually the ones who have never turned a project down."
        ]
      },
      {
        "heading": "Discounts, free work, and scope creep",
        "paragraphs": [
          "Discounts cost more than they appear. A 10% discount on a $5,000 project removes $500 of revenue — and because your costs do not fall, it removes $500 of profit. To earn the same profit at the discounted rate, you need roughly 11% more work. Discounts make sense only when they buy something concrete: a longer commitment, payment up front, or a client whose name opens doors. A discount given to close a deal that would have closed anyway is money left on the table.",
          "Free work follows the same test. A small project at a reduced rate for a real client, in exchange for a testimonial and the right to show the work, can be a reasonable investment early on. Free work with no testimonial, no portfolio rights, and no defined end is not an investment; it is unpaid labor with a hopeful story attached. One real case study beats ten mock projects — but one is enough.",
          "Scope creep is the slow version of the same problem: small additions that arrive after the price is fixed. The defense is a written scope and a change-order habit. When a client asks for something outside the agreed scope, acknowledge it, price it, and get approval in writing before doing it. Clients respect the boundary when it is stated plainly at the start; they test it when it is not."
        ]
      },
      {
        "heading": "Pricing different kinds of work",
        "paragraphs": [
          "The floor is the same for every service, but the packaging differs. Writing is often priced per project or per word; design per project or per day; development per project or per sprint; consulting per hour or per day. The unit should match how the client buys: a blog post is a deliverable, a workshop is a day, an audit is a project. Price in the unit the client already understands, and the quote reads as obvious rather than arbitrary.",
          "Some work carries extra charges by convention. Rush work, weekend work, and work that displaces other clients all justify a premium, because the client is buying your schedule, not just your hours. State the premium in the quote so it is a choice, not a surprise. Licensing and usage rights matter for creative work: a logo used on one website and the same logo used on national packaging are different products, and the price should reflect the difference.",
          "Per-word and per-page pricing deserve caution. They reward length over quality and punish the concise writer — the better the work, the less it pays. Where a client insists on unit pricing, set a project minimum so small jobs still cover their admin cost, and price the unit from your hourly floor: if you write 500 usable words an hour at a $75 floor, the per-word floor is 15 cents before any value adjustment."
        ]
      },
      {
        "heading": "What the market pays — and why it is a floor, not a target",
        "paragraphs": [
          "Market rates are useful as a reference, not a verdict. The Bureau of Labor Statistics publishes wage data for hundreds of occupations, and its figures show what employers pay employees for similar work. Convert an employee wage with the same multiplier as your own costs: a $70,000 salary implies roughly $101,500 of billing, or about $88 an hour at 1,150 billable hours. If your rate sits far below the converted market figure, the market is telling you something.",
          "Competitor rates are weaker evidence. A competitor's published price reflects their costs, their positioning, and their appetite for work — none of which are yours. A low competitor price may mean low costs, or it may mean a freelancer quietly going broke. Use competitor prices to understand positioning, not to set your floor: your costs decide the floor, the market decides the ceiling, and the gap between them is where your rate lives.",
          "One more check: if you cannot find anyone charging what your math requires, the problem may be the niche, not the math. Some markets genuinely cannot support a sustainable rate — the buyers are too small, the work is too commoditized, or the supply of providers is too large. That is information, not failure: it means repositioning toward buyers who can pay, or a service with fewer substitutes."
        ]
      },
      {
        "bullets": [
          "Keep a simple log: project, fee, hours, realized rate. Six months of entries shows the trend plainly.",
          "Raise the rate for new clients first; existing clients follow at renewal, with notice.",
          "If realized rate trails your floor for two quarters running, the problem is scoping or quoting — fix the process, not just the number."
        ],
        "heading": "Reviewing your rate every six months",
        "paragraphs": [
          "A rate is not a tattoo. Revisit it every six months, or whenever a major cost changes — taxes, insurance, rent, software. The review takes an hour: rerun the cost calculation with current numbers, check your realized rate across recent projects, and compare against the market reference. If demand has grown or costs have risen, the rate moves. Freelancers who review on a schedule raise rates calmly; those who wait for a crisis raise them anxiously.",
          "If the review shows your realized rate trailing your floor, the cause is usually scoping or quoting, not the rate itself. Projects that run over estimate, revision rounds that were never counted, and admin time that was never priced all drag the realized rate down while the headline rate looks fine. Fix the process first: tighter scopes, counted revisions, and a buffer that reflects your real overrun history. Then raise the rate if the math still demands it."
        ]
      }
    ],
    "seoTitle": "How to Price Freelance Work: Rates, Formulas, Real Examples",
    "slug": "how-to-price-freelance-work",
    "sources": [
      {
        "label": "BLS — Occupational Employment and Wage Statistics",
        "url": "https://www.bls.gov/oes/"
      },
      {
        "label": "IRS — Self-Employment Tax",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS — Estimated Taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      }
    ],
    "title": "How to Price Freelance Work: Rates, Formulas & Real Examples",
    "type": "How-to",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "Etsy and eBay fees explained line by line: every charge on a typical sale, what they add up to, and how to price so the platform keeps less of your margin.",
    "faqs": [
      {
        "answer": "For an unpromoted sale, Etsy is usually cheaper: roughly 9.5% plus $0.45 against eBay's 13.6% plus a per-order fee in most categories. With Offsite Ads fees triggered at 12–15%, Etsy can exceed eBay on the same sale. Your own fee mix — testable in the calculators — decides it for your products, and it changes with your category and advertising.",
        "question": "Which platform is cheaper overall?"
      },
      {
        "answer": "Yes, for a business seller they are ordinary business expenses that reduce taxable profit — listing fees, transaction fees, payment processing, and advertising all count. Keep the platform's monthly fee reports with your records and report them on Schedule C. Hobby sellers cannot deduct them the same way, so the treatment depends on whether the IRS sees the selling as a business.",
        "question": "Are marketplace fees tax deductible?"
      },
      {
        "answer": "Because 6.5% is only the transaction fee. Payment processing adds 3% plus $0.25, the listing fee adds $0.20, and a regulatory operating fee may apply in your country. On a $45 order the stack totals about $4.75 before advertising — roughly 11% of what the buyer paid, not 6.5%. Offsite Ads can add another 12–15% on top.",
        "question": "Why is Etsy's fee higher than the 6.5% I expected?"
      },
      {
        "answer": "Yes. The final value fee is calculated on the total amount of the sale, which includes the item price, shipping charged to the buyer, handling, and sales tax. Free shipping does not avoid the fee — the shipping cost moves into the item price, where the same percentage applies. The only relief is for international shipping through eBay International Shipping, where the fee on shipping is calculated differently.",
        "question": "Does eBay charge fees on shipping and tax?"
      },
      {
        "answer": "When your gross payments on a single platform exceed $20,000 and you have more than 200 transactions in the year. Both conditions must be met. Platforms may still send a form below those thresholds, and some states set lower ones. The form reports gross payments before fees and refunds, so reconcile it against your own records rather than treating it as your income.",
        "question": "When do I get a 1099-K from Etsy or eBay?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/etsy-and-ebay-fees-explained.jpg",
    "imageAlt": "Illustration of marketplace fees: an open parcel with coins dropping into separate jars",
    "inlineImage": "/images/etsy-and-ebay-fees-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of an open parcel box with coins dropping into three jars and a price tag",
    "intro": "Marketplace fees look small one at a time. Stacked on a single sale — listing, transaction percentage, payment processing, regulatory fees, promoted listings — they routinely take 12–20% of the sale price before shipping and materials. Pricing without the full stack is how busy shops end the month wondering where the money went.",
    "published": "2026-11-06",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Etsy Fee Calculator",
        "url": "/ecommerce/etsy-fee-calculator"
      },
      {
        "name": "eBay Fee Calculator",
        "url": "/ecommerce/ebay-fee-calculator"
      },
      {
        "name": "Profit Margin Calculator",
        "url": "/ecommerce/profit-margin-calculator"
      },
      {
        "name": "Markup Calculator",
        "url": "/ecommerce/markup-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Etsy, on a $40 sale",
        "paragraphs": [
          "Etsy charges a $0.20 listing fee (per item, renewing every four months), a 6.5% transaction fee on the total including shipping charged to the buyer, payment processing around 3% + $0.25, and a small regulatory fee that varies by country. On a $40 item with $5 shipping: transaction fee $2.93, processing about $1.60, listing $0.20 — roughly $4.75, or about 11% of what the buyer paid, before any Etsy Ads or Offsite Ads charges. Offsite Ads deserve attention: if a buyer arrives via one, Etsy takes an additional 12–15%, and sellers above a revenue threshold cannot opt out."
        ]
      },
      {
        "bullets": [
          "Price from net backwards: decide the margin you need after fees, then set the price that produces it.",
          "Shipping charges are fee-bearing on both platforms — 'free shipping' is a pricing decision, not an absence of cost.",
          "Recheck fee schedules quarterly; both platforms revise them and announce changes in seller updates."
        ],
        "heading": "eBay, on the same sale",
        "paragraphs": [
          "eBay's main charge is the final value fee: for most categories about 13.6% of the total amount of the sale (including shipping and tax where applicable) plus a per-order fee of $0.30–$0.40. On the same $45 total that is about $6.52 — roughly 14.5%. Promoted listings add whatever percentage you bid. eBay's stack is simpler but heavier at the base rate; Etsy's is lighter until advertising fees attach."
        ]
      },
      {
        "bullets": [
          "List in the same currency as your payment account: listing in another currency adds a 2.5% conversion fee on the sale.",
          "Fees are deducted from your payment account as sales occur; any outstanding balance is due within 15 days of your monthly statement.",
          "Etsy collects and remits US sales tax on your behalf for orders shipped to US customers."
        ],
        "heading": "The full Etsy fee stack",
        "paragraphs": [
          "Etsy's fees arrive in layers, and the listing fee is only the first. Every item costs $0.20 to list, and the listing expires after four months unless it sells or renews — auto-renew charges another $0.20 each cycle. A shop with 200 listings pays $40 every four months just to stay visible, before a single sale. Listing fees are charged whether or not the item sells.",
          "The transaction fee is 6.5% of the price you display plus what you charge for shipping and gift wrapping — and for US sellers it does not apply to sales tax. Payment processing adds 3% plus $0.25 per order for US bank accounts, assessed on the gross order amount including shipping and tax. A regulatory operating fee applies in some countries as a further percentage of price plus shipping. Add them up and the base stack on a US sale is roughly 9.5% plus $0.45, before any advertising.",
          "Two subscriptions sit on top. Etsy Plus costs $10 a month and includes 15 listing credits (worth $3) and $5 in Etsy Ads credits each cycle — the credits expire monthly, so the subscription only pays if you use them. Pattern, Etsy's standalone website builder, costs $15 a month after a 30-day free trial. A one-time set-up fee may also apply when opening a shop; the amount is shown during onboarding. Sales tax may be charged on Etsy fees themselves in some states."
        ]
      },
      {
        "bullets": [
          "Optional upgrades add up: bold text, subtitles, and reserve prices each carry their own fee, charged whether or not the item sells.",
          "A second category means a second insertion fee, and the higher of the two final value fees applies.",
          "eBay's own example: a $400 phone sale carries $58.06 in final value fees on a $424 total — about 13.7% of the total."
        ],
        "heading": "The full eBay fee stack",
        "paragraphs": [
          "eBay's main charge is the final value fee, and its rate depends on category. For most categories it is 13.6% of the total amount of the sale up to $7,500, plus 2.35% on the portion above $7,500, with a per-order fee of $0.30 on orders of $10 or less and $0.40 above that. The total amount of the sale includes the item price, shipping charged to the buyer, handling, and sales tax. There is no separate payment processing fee — the final value fee covers it.",
          "Category rates vary enough to matter. Books, movies, and music carry 15.3%; jewelry and watches 15% up to $5,000 and 9% above; coins and paper money 13.25%; guitars 6.7%. Athletic shoes sold for $150 or more carry 8% with no per-order fee. Check your category before pricing: the difference between 6.7% and 15.3% is the difference between a profitable listing and a loss.",
          "Insertion fees are the quieter charge: the first 250 listings each month are free, then $0.35 per listing, charged again each time a Good 'Til Canceled listing renews. Beyond that, an international fee of 1.65% applies when the buyer or delivery address is outside the US (waived when you use eBay International Shipping), currency conversion costs 3.25% for US sellers listing abroad, and a $20 dispute fee applies if you are found responsible for a chargeback. Below Standard sellers pay an additional 6% on final value fees — 7% after four consecutive months."
        ]
      },
      {
        "heading": "Side by side at four price points",
        "paragraphs": [
          "The table compares the base fees on the same sale on each platform — listing, transaction, and processing on Etsy; final value fee on eBay — before advertising, shipping costs, or product costs. Etsy is cheaper at every price point for an unpromoted sale, and the gap narrows as the price rises, because Etsy's fixed $0.45 matters less on a $300 sale than on a $20 one.",
          "Two caveats. First, the totals assume the buyer pays the stated amount including shipping, with no sales tax in the calculation; eBay's fee includes sales tax in its base, which adds a little more on real sales. Second, advertising changes the answer: add a 15% Offsite Ads fee to the Etsy column and Etsy becomes the expensive platform at every price. The comparison only holds for sales neither platform had to advertise.",
          "One more comparison matters: the advertised sale. Add a 15% Offsite Ads fee to the $60 Etsy row and Etsy's total becomes $15.15 — nearly double eBay's $8.56 on the same sale. At 12%, it is $13.35, still well above eBay. The crossover is the point of the exercise: Etsy wins the unpromoted sale at every price, and loses the advertised one at every price. Sellers under the $10,000 Offsite Ads threshold who can opt out should decide deliberately rather than by default."
        ],
        "table": {
          "head": [
            "Buyer pays",
            "Etsy fees",
            "You keep (Etsy)",
            "eBay fees",
            "You keep (eBay)"
          ],
          "rows": [
            [
              "$20",
              "$2.35",
              "$17.65",
              "$3.12",
              "$16.88"
            ],
            [
              "$60",
              "$6.15",
              "$53.85",
              "$8.56",
              "$51.44"
            ],
            [
              "$120",
              "$11.85",
              "$108.15",
              "$16.72",
              "$103.28"
            ],
            [
              "$300",
              "$28.95",
              "$271.05",
              "$41.20",
              "$258.80"
            ]
          ]
        }
      },
      {
        "heading": "Advertising fees: where the margin goes",
        "paragraphs": [
          "Etsy Ads works on a daily budget you set: you choose the maximum you will spend each day promoting listings inside Etsy search, and Etsy bids on your behalf. The cost is capped by your budget, which makes it predictable — but it is a cost whether or not the clicks become sales, so track what each dollar of ads returns before raising the budget.",
          "Offsite Ads is the fee that catches sellers out. Etsy advertises your listings on search engines and social networks, and if a buyer clicks and orders from your shop within 30 days, you pay 15% of the order — or 12% once your shop has passed $10,000 in sales over the prior 365 days. Shops under $10,000 can opt out; once you cross the threshold, participation is mandatory for the life of the shop, and the fee is capped at $100 per order. On the $45 sale from the first section, a 15% Offsite Ads fee adds $6.75, taking Etsy's total cut to $11.48 — over a quarter of what the buyer paid.",
          "eBay's Promoted Listings Standard works on a similar principle: you choose an ad rate as a percentage of the total sale amount, and you pay it only when a buyer clicks your promoted listing and buys within 30 days. The fee is additional to the final value fee, so a 5% ad rate on a $60 sale adds $3.00 to the $8.56 final value fee. Set the rate from your margin, not from eBay's suggestion: the breakeven ad rate is your profit margin on the sale, and anything above it loses money."
        ]
      },
      {
        "heading": "Shipping, refunds, and returns",
        "paragraphs": [
          "Shipping charges are fee-bearing on both platforms, which changes how 'free shipping' works. On Etsy, the 6.5% transaction fee applies to the shipping you charge the buyer, and the 3% processing fee applies to the gross order amount including shipping. On eBay, the final value fee is calculated on the total amount of the sale including shipping collected from the buyer. Offering free shipping does not remove the fee — it moves the shipping cost into the item price, where the fee applies to it anyway.",
          "Refunds are handled differently. On Etsy, the payment processing fee and other applicable fees are recalculated on the adjusted sale price when you refund a buyer, and the difference is credited back — except for refunds covered by Etsy under its Purchase Protection program, where fees are not credited. On eBay, you may be eligible for final value fee credits when you refund or cancel a sale, under its fee credits policy. Check the credit landed; fee refunds are not always automatic.",
          "Returns cost the seller twice: the outbound shipping is spent, and the return shipping often falls on the seller too, depending on the reason and the platform's policy. Build a return assumption into pricing rather than treating returns as surprises — a shop with a 5% return rate needs its prices to carry that 5% across all sales. Clear photos, accurate descriptions, and honest sizing cut return rates more cheaply than any pricing trick."
        ]
      },
      {
        "heading": "Pricing so the platform keeps less",
        "paragraphs": [
          "Price from net backwards: decide the margin you need after fees, then set the price that produces it. The formula is simple — price equals your costs plus your target profit plus fixed fees, divided by one minus the variable fee rate. For an Etsy item that costs $15 to make and ship, with a $20 profit target: ($15 + $20 + $0.45) ÷ (1 − 0.095) = $39.17, so a $40 price leaves the margin intact. The same item on eBay needs ($15 + $20 + $0.40) ÷ (1 − 0.136) = $40.97, so $41.",
          "Bundles help because fixed fees spread across more revenue: two items in one order pay one $0.25 processing fee and one $0.40 per-order fee instead of two. Raising prices is the bluntest tool and often the right one — a $2 increase on a $40 item flows almost entirely to profit, since the fee on the extra $2 is only about 20 cents. Sellers who fear raising prices usually underestimate how little buyers notice a small increase and overestimate how much volume a low price buys.",
          "Recheck fee schedules quarterly; both platforms revise them and announce changes in seller updates. A rate change of one percentage point on $5,000 of monthly sales is $50 a month — $600 a year — and it arrives silently if you are not watching. The calculators on this site use current rates; run your best sellers through them after every fee announcement."
        ]
      },
      {
        "heading": "Subscriptions and stores: when they pay off",
        "paragraphs": [
          "Etsy Plus costs $10 a month and returns $3 in listing credits and $5 in Etsy Ads credits each cycle — so it costs $2 a month net if you use both credits, and $10 if you use neither. It pays for shops that list regularly and advertise already; it is a donation for shops that do neither. The credits expire each month and do not roll over, so the test is whether you would spend the $8 anyway.",
          "Pattern, Etsy's $15-a-month website builder, is a different question: it buys you a standalone storefront with no per-sale marketplace fee on Pattern-only orders, but it does not bring traffic — Etsy search does not promote Pattern sites. It suits sellers with an existing audience who want their own checkout. For everyone else, the $15 buys a shop nobody visits.",
          "eBay Store subscriptions add monthly free listings beyond the standard 250 and other seller benefits, for a monthly fee. Whether one pays depends on volume: count the insertion fees you would otherwise pay at $0.35 per listing beyond your free allowance, and compare against the subscription cost. A seller listing 300 items a month saves about $17.50 in insertion fees — the subscription only earns its keep above that line, or when its other benefits matter to you."
        ]
      },
      {
        "heading": "Taxes and record-keeping for sellers",
        "paragraphs": [
          "Marketplace fees are ordinary business expenses: for a business seller, every listing fee, transaction fee, and ad fee reduces taxable profit. Keep the platform's fee reports with your records — Etsy and eBay both provide monthly statements — and report income and expenses on Schedule C. The fees are deductible in the year you pay them, which is usually the year of the sale.",
          "Form 1099-K is the reporting form for marketplace income. A platform must send one when your gross payments exceed $20,000 and your transactions number more than 200 in the year — both conditions, on a single platform. Platforms may still send a form below those thresholds, and some states set lower ones. The form reports gross payment volume before fees, shipping, and refunds, so it is not your taxable income; your Schedule C profit is.",
          "Income is taxable whether or not a form arrives, and the $20,000 threshold decides reporting, not taxability. A seller with $8,000 of profit and no 1099-K still owes tax on the $8,000. Set aside 25–30% of net profit for taxes, pay quarterly estimates if you expect to owe $1,000 or more, and keep records for at least three years — the period the IRS generally has to audit a return."
        ]
      },
      {
        "heading": "Choosing between Etsy and eBay",
        "paragraphs": [
          "Fees are only half the choice; the other half is who shops there. Etsy buyers arrive looking for handmade, vintage, and craft supplies — they browse, they gift, and they pay for uniqueness. eBay buyers arrive looking for a specific item at a competitive price — they search, they compare, and they pay for availability. The same product can thrive on one platform and stall on the other, and the fee difference is irrelevant if the listing never sells.",
          "Category fit decides most of it. Handmade jewelry, custom gifts, printables, and vintage clothing belong on Etsy, where the audience expects them and the search rewards them. Used electronics, collectibles, car parts, and branded resale belong on eBay, where the auction format and the buyer base suit them. Products that fit both — vintage home goods, for example — can run on both, with the fee comparison deciding where to push volume.",
          "Running both platforms is common and sensible once a shop has steady stock: the same listing work serves two audiences, and a slow month on one is often offset by the other. The cost is administrative — two fee structures to track, two sets of seller standards, two payout schedules — and the risk is splitting attention so thin that neither shop gets the care it needs. Start on the platform that fits the product, add the second when the first runs smoothly, and price each listing for its own platform's fees rather than copying one price across both."
        ]
      }
    ],
    "seoTitle": "Etsy and eBay Fees Explained: 2026 Rates, Line by Line",
    "slug": "etsy-and-ebay-fees-explained",
    "sources": [
      {
        "label": "Etsy — Fees & Payments Policy",
        "url": "https://www.etsy.com/legal/fees/"
      },
      {
        "label": "eBay — Selling Fees",
        "url": "https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822"
      },
      {
        "label": "IRS — Form 1099-K FAQs: General information",
        "url": "https://www.irs.gov/newsroom/form-1099-k-faqs-general-information"
      }
    ],
    "title": "Etsy and eBay Fees Explained: 2026 Rates, Line by Line",
    "type": "What",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": true,
    "description": "Start freelancing with a plan: pick a niche, set rates that cover taxes, find clients, use contracts, handle quarterly taxes, and manage irregular income.",
    "faqs": [
      {
        "answer": "You can start with very little — a laptop, an internet connection, and a way to invoice are enough for most service work. What matters more is a cash cushion: one to three months of living expenses lets you take the time to find good clients instead of accepting the first low-paying offer. Avoid spending on branding, courses, or equipment before you have paying work.",
        "question": "How much money do I need to start freelancing?"
      },
      {
        "answer": "No. You can freelance as a sole proprietor with no registration at all, reporting income on Schedule C. An LLC adds liability protection by separating your business and personal assets, which matters once you sign contracts and take on larger clients. It does not change your taxes by default, so many freelancers start as sole proprietors and form an LLC later.",
        "question": "Do I need an LLC to freelance?"
      },
      {
        "answer": "Set aside 25 to 30 percent of every payment for most freelancers, covering self-employment tax of 15.3 percent plus federal and state income tax. The exact share depends on your income and state. Transfer it to a separate savings account the day each payment arrives, and use it to pay quarterly estimated taxes due April 15, June 15, September 15, and January 15.",
        "question": "How much should I set aside for taxes as a freelancer?"
      },
      {
        "answer": "Charge hourly for open-ended work like consulting and maintenance, where the scope is genuinely unknown. Charge per project for defined deliverables like a website or a report, where you can estimate the work and the client wants a fixed price. Either way, build project quotes from your hourly floor — estimate the hours, multiply by your rate, and add a 15 to 20 percent buffer.",
        "question": "Should I charge hourly or per project?"
      },
      {
        "answer": "For most solo freelancers, a Solo 401(k) shelters the most: up to $24,500 in employee deferrals for 2026 plus roughly 20 percent of net earnings as an employer contribution, capped at $72,000 combined. A SEP IRA is simpler — employer contributions only, about 20 percent of net earnings — and the better choice if you may hire employees. Both reduce taxable income in the year you contribute.",
        "question": "What is the best retirement account for a freelancer?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-start-freelancing.jpg",
    "imageAlt": "Flat-vector illustration of a freelancer's desk with a laptop, coffee cup, notebook, and potted plant",
    "inlineImage": "/images/how-to-start-freelancing-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of two hands shaking over a signed contract, with coins and a wall calendar nearby",
    "intro": "To start freelancing, pick one service you can sell, set a rate that covers your taxes and unpaid time, register as a sole proprietor or LLC, and land your first clients through your existing network. This guide walks through each step — pricing, contracts, taxes, retirement, and managing irregular income — so your finances are right from day one.",
    "published": "2026-09-22",
    "readMinutes": 19,
    "relatedTools": [
      {
        "name": "Freelance Hourly Rate Calculator",
        "url": "/freelance/freelance-hourly-rate-calculator"
      },
      {
        "name": "Freelance Project Pricing Calculator",
        "url": "/freelance/freelance-project-pricing-calculator"
      },
      {
        "name": "Self-Employment Tax Calculator",
        "url": "/freelance/self-employment-tax-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Choose a service and a niche",
        "paragraphs": [
          "Freelancing starts with a service someone will pay for, not with a business card or a website. The fastest test is whether you can name the deliverable in one sentence: a logo, a blog post, a bookkeeping cleanup, a landing page. If you cannot describe what the client receives, you do not have a service yet — you have a skill. Skills become services when they are packaged around a result the buyer can recognize and price.",
          "A niche makes that packaging easier. A generalist designer competes with every other designer on price. A designer who builds pitch decks for seed-stage startups competes with far fewer people and can charge for specialist knowledge. Narrowing feels like turning work away, but in practice it does the opposite: referrals travel faster inside a small community, your portfolio speaks directly to the buyer, and you stop relearning a new industry for every project.",
          "Pick a niche from evidence, not enthusiasm. Look at the work you have already been paid for, the problems colleagues ask you to solve, and the industries where you have contacts. One reliable starting point is the intersection of three things: work you can do well today, buyers who already spend money on it, and a market you can reach without advertising. If any of the three is missing, the niche is a hobby, not a business.",
          "You do not need to commit forever. A niche is a starting position, not a life sentence. Most freelancers widen or shift focus within two years as they learn which clients pay on time and which work they actually enjoy. The point of choosing now is to give your first ten prospects a clear reason to hire you instead of the next generalist in the search results."
        ]
      },
      {
        "heading": "Set your rate: hourly vs project pricing",
        "paragraphs": [
          "Your rate has to cover three things your salary never showed you: the taxes an employer used to pay, the benefits an employer used to fund, and the hours you work but cannot bill. A common rule is to take your target annual income and add 25 to 30 percent for taxes, health insurance, retirement, and business costs, then divide by your realistic billable hours — not 2,080. Nobody bills 40 hours a week, 52 weeks a year. Between marketing, admin, and time off, 25 to 30 billable hours a week is a realistic target for most solo freelancers.",
          "Here is the calculation worked through. Suppose you want $80,000 a year in take-home income. Add 30 percent for taxes and benefits: $80,000 × 1.30 = $104,000. Now count billable hours: 48 working weeks (four weeks off) × 30 billable hours a week = 1,440 hours. Divide: $104,000 ÷ 1,440 = $72 an hour. Round up to $75 to give yourself a margin for slow months and late payers. That is your floor — the rate below which the business does not pay for itself.",
          "Hourly pricing is simple and honest for open-ended work, but it caps your income at the hours you can sell and punishes you for getting faster. Project pricing removes that ceiling: the client pays for the outcome, and your efficiency becomes profit instead of a pay cut. The risk runs the other way — underestimate the scope and you work extra hours for free. That is why project quotes should be built from your hourly floor, not guessed. Estimate the hours, multiply by your rate, add a 15 to 20 percent buffer for revisions and scope creep, and quote the total.",
          "Many freelancers use both. Hourly billing suits consulting, maintenance, and work where the scope is genuinely unknown. Project pricing suits defined deliverables — a website, a report, a brand package — where you can estimate the work and the client wants a fixed number. Whichever you choose, put the rate in writing before work starts, and revisit it every six months. If every prospect says yes without hesitation, your rate is too low."
        ]
      },
      {
        "heading": "Find your first clients",
        "paragraphs": [
          "Your first clients almost always come from people who already know your work. Former employers, former colleagues, and past clients are the warmest leads you will ever have: they have seen your output, they know how you work, and they do not need to be convinced you exist. Before you build a portfolio site or join a marketplace, write a list of everyone who has paid you or worked beside you, and contact the most promising ten with a short message — what you now offer, who it is for, and one sentence on the result you deliver. That list alone produces the first project for most new freelancers.",
          "Marketplaces such as Upwork and Fiverr are the second channel, and they work best as a starting ramp rather than a permanent home. They bring clients to you, which is valuable when you have no reputation, but they take a service fee from each project and put you in direct price competition with freelancers worldwide. Treat marketplace work as a way to build reviews and case studies, and move repeat clients to direct relationships once trust is established. Check the current fee schedule on the platform's own site before quoting, because fees change and they come out of your rate.",
          "Referrals are the channel that eventually replaces both. One satisfied client who mentions you to a peer is worth more than a hundred cold pitches, because the trust transfers with the introduction. Ask for referrals directly at the end of a successful project — most clients are happy to help but will not think of it unprompted. A simple line works: if you know anyone else who needs this, I would appreciate an introduction. Over time, a referral base is what lets you raise rates and stop competing on price.",
          "Cold outreach has a place, but keep it targeted. A short, specific email to a business with a visible problem you can fix — an outdated website, an empty blog, a messy bookkeeping setup — outperforms a generic pitch sent to hundreds of companies. Mention the problem, name the fix, and state your price range. Expect a low response rate and treat it as a numbers game with a quality filter: ten well-researched emails beat a hundred template blasts."
        ]
      },
      {
        "bullets": [
          "Scope of work: exactly what is included, and how many revision rounds",
          "Price and payment schedule: deposit, milestones, and final payment",
          "Deadline and what happens if the client is late with feedback or materials",
          "Ownership: when the client owns the work — usually after final payment",
          "Cancellation: what each side owes if the project stops early",
          "Late payment: due date and fee for overdue invoices"
        ],
        "heading": "Contracts and invoicing",
        "paragraphs": [
          "Never start work without a signed agreement, even for a friend. A contract does not need a lawyer to be useful — a one- or two-page document that states the scope, the price, the payment schedule, the deadline, and who owns the finished work prevents most disputes before they start. The single most important clause is scope: describe exactly what is included and what counts as a revision, so a client cannot keep adding work to a fixed price. Agree in writing how extra work is charged before the project begins.",
          "Payment terms deserve as much attention as the price. A deposit of 30 to 50 percent before work starts is standard in most freelance fields and protects you against clients who disappear mid-project. For larger jobs, split the remainder into milestone payments tied to deliverables rather than waiting for one payment at the end. State a due date on every invoice — net 15 or net 30 days — and a late fee, so there is a written consequence when payment slips.",
          "Invoicing is a system, not an event. Send the invoice the day the work is delivered, not the following week, and keep a simple record of what is owed and when it is due. A spreadsheet works at first; invoicing software becomes worth it once you have more than a handful of clients a month. Follow up politely the day an invoice becomes overdue — a short reminder email, not an apology. Late payment is usually forgetfulness, and a prompt reminder solves it in most cases.",
          "Keep every contract, invoice, and payment record for at least three years. The IRS generally has three years from your filing date to audit a return, and your contracts and invoices are the evidence that your reported income is complete. Digital copies are fine, but store them somewhere backed up, not only in an email inbox."
        ]
      },
      {
        "heading": "Choose a business structure",
        "paragraphs": [
          "Most freelancers start as sole proprietors because it requires no paperwork: if you earn money working for yourself, you are already a sole proprietor in the eyes of the IRS. You report income and expenses on Schedule C with your personal tax return, and there is no separate business tax filing. That simplicity is the main advantage, and for many freelancers it is enough for the first year or two.",
          "The trade-off is liability. As a sole proprietor, there is no legal separation between you and the business, so a client dispute or a business debt can reach your personal assets. An LLC (limited liability company) creates that separation. It is formed by filing with your state, usually for a fee that varies by state, and it can protect your personal assets from business claims — though it does not protect you from your own negligence, and it does not change your taxes by default. A single-member LLC is taxed exactly like a sole proprietorship unless you elect a different treatment.",
          "Some freelancers later elect S corporation status for their LLC, which can reduce self-employment tax by splitting income between a salary and distributions. That election adds payroll, bookkeeping, and filing costs, so it generally only pays off once net income is consistently high — many accountants suggest considering it above roughly $60,000 to $80,000 of annual net profit, though the right threshold depends on your state and situation. This is a decision to make with a tax professional, not a blog post.",
          "Whatever structure you choose, open a separate bank account for the business on day one. Mixing personal and business money is the most common bookkeeping mistake new freelancers make, and it turns tax time into a reconstruction project. A separate account also strengthens an LLC's liability protection, since courts can disregard the separation if your finances are mixed."
        ],
        "table": {
          "head": [
            "",
            "Sole proprietorship",
            "LLC"
          ],
          "rows": [
            [
              "Setup",
              "No filing required",
              "File with your state; fee varies by state"
            ],
            [
              "Tax filing",
              "Schedule C on your personal return",
              "Same by default (single-member LLC)"
            ],
            [
              "Liability",
              "No separation from personal assets",
              "Separates business and personal assets"
            ],
            [
              "Admin",
              "Minimal",
              "Annual reports and fees in most states"
            ],
            [
              "Best for",
              "Starting out, low-risk services",
              "Client work with contracts and liability exposure"
            ]
          ]
        }
      },
      {
        "heading": "Self-employment tax and quarterly estimated taxes",
        "paragraphs": [
          "The tax surprise that catches new freelancers is self-employment tax. As an employee, your employer paid half of your Social Security and Medicare taxes and you never saw it. As a freelancer, you pay both halves: 15.3 percent of your net earnings, made up of 12.4 percent Social Security on earnings up to the wage base and 2.9 percent Medicare with no cap. The tax applies to 92.35 percent of your net earnings, not 100 percent — that adjustment roughly mirrors the employer share an employee never pays tax on.",
          "Here is what that means in dollars. On $60,000 of net profit, the self-employment tax base is $60,000 × 92.35% = $55,410. The tax is $55,410 × 15.3% = $8,478. The Social Security portion stops once your earnings pass the wage base — $184,500 for 2026 — but the Medicare portion continues on all earnings. You also owe federal income tax on top, and usually state income tax as well. One offset: you can deduct half of your self-employment tax — $4,239 in this example — from your income when calculating income tax.",
          "Because no employer withholds tax from your payments, the IRS requires you to pay as you go through quarterly estimated taxes. The deadlines are April 15, June 15, September 15, and January 15 of the following year. Miss them and you can owe an underpayment penalty even if you pay in full at filing time. The simplest system is to transfer a fixed percentage of every payment into a separate savings account the day it arrives — 25 to 30 percent covers most freelancers — and pay the quarterly estimate from that account. Our Self-Employment Tax Calculator estimates your liability so the percentage you set aside matches your actual situation rather than a guess.",
          "You must pay self-employment tax once your net earnings from self-employment reach $400 in a year. Clients who pay you $2,000 or more in 2026 generally send you a Form 1099-NEC (the threshold rose from $600 under the One Big Beautiful Bill Act), but the absence of a form does not remove the obligation — all income counts, reported or not. Keep a running record of every payment you receive, because the IRS receives the same 1099s your clients send."
        ]
      },
      {
        "bullets": [
          "Software and subscriptions used for client work",
          "Equipment: laptop, monitor, phone, and peripherals",
          "Home office: simplified $5 per square foot, up to $1,500",
          "Business mileage at the IRS standard rate, with a log",
          "Professional development, courses, and books",
          "Health insurance premiums, when you are not covered elsewhere"
        ],
        "heading": "Track expenses and deductions",
        "paragraphs": [
          "Every legitimate business expense reduces the net profit your taxes are calculated on, so tracking expenses is worth real money. The IRS rule is that an expense must be ordinary and necessary for your business — ordinary meaning common in your field, necessary meaning helpful and appropriate. Software subscriptions, a work laptop, internet service used for business, professional development, and business travel all qualify. Keep receipts and a note of the business purpose for each one; a receipt without context is hard to defend years later.",
          "The home office deduction is the one most freelancers underuse. If you use part of your home regularly and exclusively for business, you can deduct it. The simplified option is $5 per square foot of office space, up to 300 square feet — a maximum of $1,500 a year — with no need to track utility bills. The regular method lets you deduct a percentage of rent, utilities, and insurance based on the office's share of your home, which can be larger but requires detailed records. Run both numbers before choosing; the simplified option is usually the better deal for a small office.",
          "Vehicle expenses work the same way, with a choice of methods. The standard mileage rate for 2026 is 72.5 cents per mile for January through June and 76 cents per mile for July through December. A freelancer who drives 5,000 business miles in the second half of the year can deduct $3,800. The alternative is deducting the business percentage of actual costs — gas, insurance, repairs, depreciation — which takes more record-keeping. Whichever method you pick, keep a mileage log: date, destination, purpose, and miles. Without a log, the deduction is difficult to support.",
          "Health insurance is another deduction many new freelancers miss. If you are self-employed and not eligible for coverage through a spouse's employer plan, you may be able to deduct the premiums you pay for medical, dental, and long-term care insurance for yourself and your family. The deduction is limited to your net business profit. Separately, many freelancers may qualify for the qualified business income deduction — up to 20 percent of qualified business income — though income limits and other rules apply. These are estimates and general rules, not tax advice for your situation; a tax professional can confirm what applies to you."
        ]
      },
      {
        "heading": "Retirement options for freelancers",
        "paragraphs": [
          "No employer means no employer retirement plan, and no match to nudge you into saving. That makes retirement planning a deliberate act rather than a default — and the main reason freelancers fall behind on it. The good news is that self-employed retirement accounts allow much larger contributions than a standard IRA, and the contributions reduce your taxable income in the year you make them.",
          "A SEP IRA is the simplest option. It accepts employer contributions only — you contribute as the business owner — up to 25 percent of compensation, which works out to roughly 20 percent of net self-employment earnings for a sole proprietor, capped at $72,000 for 2026. It takes minutes to open, has no annual filing requirement, and contributions can be made up to your tax filing deadline, including extensions. The drawback is the single contribution type: at lower incomes, you cannot shelter as much as with a Solo 401(k).",
          "A Solo 401(k), also called a one-participant 401(k), accepts two kinds of contribution. As the employee, you can defer up to $24,500 in 2026 ($32,500 if you are 50 or older, with the $8,000 catch-up). As the employer, you can add the same roughly 20 percent of net earnings the SEP allows. The combined total is capped at $72,000 for 2026, or $80,000 with the catch-up. The plan takes more paperwork to set up, and once plan assets exceed $250,000 you must file a short annual form (Form 5500-EZ), but the extra contribution room is substantial.",
          "The difference is concrete. Take a freelancer with $80,000 of net profit. After the self-employment tax adjustment, the employer contribution comes to about $14,870 — that is the SEP IRA maximum for this income. With a Solo 401(k), the same freelancer adds the $24,500 employee deferral on top, for a total of about $39,370. At the same income, the Solo 401(k) shelters more than twice as much. The SEP IRA still wins on simplicity, and it is the better choice if you may hire employees soon — a Solo 401(k) is only available to businesses with no employees other than the owner and a spouse."
        ],
        "table": {
          "head": [
            "2026 limits",
            "SEP IRA",
            "Solo 401(k)"
          ],
          "rows": [
            [
              "Employee deferral",
              "Not allowed",
              "Up to $24,500 ($32,500 age 50+)"
            ],
            [
              "Employer contribution",
              "About 20% of net earnings",
              "Same, about 20% of net earnings"
            ],
            [
              "Overall cap",
              "$72,000",
              "$72,000 ($80,000 age 50+)"
            ],
            [
              "Employees allowed",
              "Yes, with contributions for them",
              "Owner and spouse only"
            ],
            [
              "Annual filing",
              "None",
              "Form 5500-EZ once assets pass $250,000"
            ]
          ]
        }
      },
      {
        "heading": "Manage irregular income",
        "paragraphs": [
          "Irregular income is the defining financial challenge of freelancing. A $9,000 month followed by a $2,000 month is normal, and the freelancers who survive it are the ones who pay themselves a steady salary from an uneven stream. The method is simple: all client payments go into a business account, and you transfer a fixed amount to your personal account once or twice a month — the same amount whether the month was strong or weak. Good months build the buffer; lean months draw on it.",
          "The buffer is the whole system. Before you raise your salary, build a business cash reserve of two to three months of expenses in the business account. That reserve is what lets you turn down bad clients, survive a late-paying customer, and keep paying yourself through a slow quarter. A separate personal emergency fund of three to six months of living expenses sits behind it. Freelancers need a larger personal cushion than employees because there is no severance, no unemployment check, and no notice period.",
          "Budgeting on a variable income works best backwards. Start with your non-negotiable monthly costs — rent, utilities, insurance, food, minimum debt payments — and treat that total as your salary floor. In a strong month, fund the floor first, then taxes, then savings, then discretionary spending, in that order. In a weak month, the floor and taxes still get paid, and everything else waits. This priority order matters more than any budgeting app: it keeps the essentials covered when income dips.",
          "Two habits make the system hold. First, invoice immediately and follow up on overdue payments the day they become overdue — your cash flow is only as reliable as your collections. Second, keep some recurring revenue if your work allows it: a monthly retainer, a maintenance contract, or a standing content commitment turns part of your income into something you can count on. Even one retainer covering a third of your monthly floor changes the feel of freelancing from precarious to manageable."
        ]
      },
      {
        "bullets": [
          "Days 1-30: service, rate, business account, ten warm-network conversations",
          "Days 31-60: deliver first projects, testimonials, tax savings account, expense tracking",
          "Days 61-90: review real hourly earnings, raise rates for new clients, set a six-month target"
        ],
        "heading": "Your first 90 days as a freelancer",
        "paragraphs": [
          "The first three months are about proof, not polish. You do not need a perfect website, a logo, or a registered business name before you take your first client — you need a service, a rate, and a signed agreement. Everything else can be built while you work. The freelancers who stall in the first 90 days usually stall on setup: weeks spent on branding and business cards while no one is being asked to buy anything.",
          "Month one is outreach and pricing. Finalize your service and niche, run your rate calculation, set up a business bank account and a simple invoicing method, and contact your warm network. Aim for conversations, not just applications — ten real conversations with potential buyers teach you more about your market than a month of planning. If you have no portfolio, do one small project at a reduced rate for a real client in exchange for a testimonial and the right to show the work. One real case study beats ten mock projects.",
          "Month two is delivery and systems. Deliver your first projects well, ask for testimonials while the work is fresh, and set up the financial habits that will carry the business: the separate tax savings account, the expense tracking, and the fixed personal salary. This is also the right time to register your business structure if you are going beyond a sole proprietorship, and to sort out health insurance if you are leaving employer coverage.",
          "Month three is evaluation. Look at what you actually earned per hour after admin and revisions, which clients were profitable, and where your leads came from. Raise your rate for new clients if demand supports it — early freelancers almost always underprice. Then set a six-month target: a monthly income figure, a number of retainer clients, and one marketing channel to build properly. Freelancing rewards the people who keep adjusting, not the ones who get the launch perfect."
        ]
      }
    ],
    "seoTitle": "How to Start Freelancing: The Complete Guide for 2026",
    "slug": "how-to-start-freelancing",
    "sources": [
      {
        "label": "IRS — Self-Employment Tax (Social Security and Medicare Taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS — Estimated Taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      },
      {
        "label": "U.S. Small Business Administration — Choose a Business Structure",
        "url": "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure"
      },
      {
        "label": "IRS — Retirement Plans for Self-Employed People",
        "url": "https://www.irs.gov/retirement-plans/retirement-plans-for-self-employed-people"
      }
    ],
    "title": "How to Start Freelancing: The Complete Guide",
    "type": "How-to",
    "updated": "2026-09-22"
  },
  {
    "cornerstone": false,
    "description": "Set your freelance rate from your target income, self-employment tax, expenses, and billable hours — with a worked $80,000 example and the full formula.",
    "faqs": [
      {
        "answer": "There is no single beginner rate, because the right rate depends on your income target, your costs, and your billable hours. Run the formula in this guide with your own numbers. If the result is higher than clients will pay, the gap is a signal: raise your skills or your client base, or accept a lower income target for the first year. Do not price below your cost floor to win work.",
        "question": "What hourly rate should a beginner freelancer charge?"
      },
      {
        "answer": "Divide the salary by 2,080 to get its hourly equivalent, then add the costs employment used to cover. An $80,000 salary is $38.46 an hour, but a freelancer needs roughly $70 an hour to match that income after self-employment tax, business expenses, and non-billable time. Our Salary to Hourly Calculator runs the first step; the formula in this guide runs the rest.",
        "question": "How do I convert my salary to an hourly freelance rate?"
      },
      {
        "answer": "Charge per project when the scope is clear and you can estimate the work, because you keep the benefit of working faster. Charge hourly when the scope is open-ended or the client expects ongoing availability. Many freelancers use both: project prices for defined deliverables and an hourly rate for everything else. Either way, the hourly floor from your formula is the number that keeps the business viable.",
        "question": "Should I charge hourly or per project?"
      },
      {
        "answer": "Set money aside from every payment, because nothing is withheld for you. Self-employment tax alone is 15.3% of 92.35% of net earnings, about 14.13% of net earnings, and federal income tax sits on top of that. A common planning habit is to move 25 to 30% of each payment into a separate tax account and adjust after your first full tax year, when you know your real bill. Pay the IRS in quarterly estimated payments.",
        "question": "How much should I set aside for taxes as a freelancer?"
      },
      {
        "answer": "Raise it when demand outruns your capacity, when your costs rise, or once a year at minimum. A practical trigger: if you are winning more than about 80% of the work you quote, your rate is probably below what the market will pay. Raise the rate for new clients first, give existing clients 30 days' notice, and put the new rate in writing. Small regular increases are easier for clients to accept than one large jump.",
        "question": "When should I raise my freelance rate?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-set-your-freelance-rate.jpg",
    "imageAlt": "Flat vector illustration of a freelancer at a desk with a laptop, a stack of coins, and a small plant on a cream background",
    "inlineImage": "/images/how-to-set-your-freelance-rate-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a clock with coins stacked beside it and a small calendar on a cream background",
    "intro": "Set your freelance rate by working backward from the income you need: add self-employment tax and business expenses to your target salary, then divide by the hours you can actually bill. An $80,000 target works out to about $70 an hour once tax, expenses, and non-billable time are counted. This guide shows the full formula, step by step.",
    "published": "2026-09-25",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Freelance Hourly Rate Calculator",
        "url": "/freelance/freelance-hourly-rate-calculator"
      },
      {
        "name": "Salary to Hourly Calculator",
        "url": "/freelance/salary-to-hourly-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Start from your target income, not a market rate",
        "paragraphs": [
          "Most freelancers set their rate the wrong way round. They ask what other freelancers charge, pick a number near the middle, and hope it covers their costs. The problem is that the middle of the market knows nothing about your rent, your tax bill, or how many hours you can bill. A rate copied from someone else can leave you busy and broke at the same time.",
          "The reliable way is to work backward from the income you need. Choose a target annual income, add the taxes and costs that employment used to absorb, and divide by the hours you can realistically bill. The result is your floor: the lowest rate at which freelancing pays as well as the job it replaces. You can charge more than the floor. You should not charge less, except as a deliberate short-term decision you can afford.",
          "Your target income is a choice, not a fact. A common starting point is the salary you left or want to match, stated before income tax, the way a salary is normally quoted. If you earned $80,000 as an employee, $80,000 is your target. If you freelance alongside other income, the target is the gap freelancing must fill. Write the number down before anything else, because every step that follows hangs off it."
        ]
      },
      {
        "heading": "Why your freelance rate is higher than your old hourly wage",
        "paragraphs": [
          "An $80,000 salary looks like $38.46 an hour ($80,000 divided by 2,080 working hours). That number is misleading, because an employee's wage is only part of what employment costs. The employer also pays benefits: health insurance, retirement contributions, paid leave, and the employer's share of Social Security and Medicare taxes. As a freelancer, all of that comes out of your rate.",
          "The Bureau of Labor Statistics measures this gap directly. In June 2026, full-time private-industry workers cost their employers $54.00 per hour in total compensation, of which $36.97 was wages and $17.03 was benefits. Benefits added about 46% on top of wages. Your freelance rate has to carry the same load, because nobody else is paying it for you.",
          "That is why a freelance rate near your old hourly wage is a pay cut in disguise. At $38.46 an hour, you would need to bill every one of the 2,080 hours in the year just to match the wage, with nothing left for tax, expenses, holidays, or a single unpaid hour of admin. No freelancer bills 2,080 hours. The realistic number is far lower, and the rate has to rise to match.",
          "Clients sometimes push back on a rate that looks high next to an employee's wage. The comparison is wrong: the client buys a finished piece of work with no benefits, no payroll tax, no equipment, and no long-term commitment."
        ]
      },
      {
        "heading": "The rate formula, step by step",
        "paragraphs": [
          "The formula has four inputs and one division: (target income + self-employment tax + business expenses) divided by billable hours. Each input is simple on its own. The mistakes happen when one of them is skipped or guessed, so take them in order.",
          "Self-employment tax is the first addition, and the one new freelancers most often miss. As an employee, you paid 7.65% of your wages in Social Security and Medicare taxes and your employer paid the other 7.65%. As a freelancer, you pay both halves: the IRS sets the self-employment tax rate at 15.3%, made up of 12.4% for Social Security and 2.9% for Medicare. It applies to 92.35% of your net earnings from self-employment, which works out to an effective rate of about 14.13% of net earnings (15.3% times 92.35%).",
          "Two details soften that bill slightly. The Social Security part applies only up to an annual earnings limit, $184,500 for 2026, while the Medicare part applies to all net earnings. And you can deduct one-half of your self-employment tax when figuring your adjusted gross income, which lowers your income tax, though not the self-employment tax itself. The formula below uses the full 14.13% and treats any saving as a bonus.",
          "Business expenses are the second addition: software subscriptions, equipment, insurance, a phone plan, professional development, and any other ordinary and necessary cost of running the business. These come out of your revenue before you pay yourself, so they belong in the rate. Add up a year of them from your actual spending, not from a guess. The worked example uses $8,000 a year, a modest figure for a laptop-based freelancer; yours may be higher if you carry insurance or rent a workspace.",
          "Billable hours are the divisor, and they decide the rate more than any other input. The year has 2,080 working hours, but you will bill only a fraction of them once holidays, sick days, and unpaid admin are subtracted. A realistic figure for a solo freelancer is 1,200 to 1,600 billable hours a year."
        ]
      },
      {
        "heading": "Worked example: an $80,000 target becomes $70 an hour",
        "paragraphs": [
          "Here is the full calculation for a freelancer replacing an $80,000 salary, with $8,000 a year of business expenses and 1,440 billable hours. The self-employment tax step needs care: the tax is charged on net earnings, and net earnings must cover both the target income and the tax itself. The fix is to gross up: divide the target by one minus the effective tax rate.",
          "The arithmetic runs as follows. Net earnings needed are $80,000 divided by (1 - 0.1413), which is $93,164. The self-employment tax on that figure is 14.13% of $93,164, or $13,164, leaving exactly $80,000. Add the $8,000 of expenses and the revenue target is $101,164. Divide by 1,440 billable hours and the rate is $70.25 an hour. Round up to $71 to leave a small margin for rounding and late payments.",
          "Notice what the formula does not include: income tax. The $80,000 target is income before income tax, the same way a salary is quoted, so income tax comes out of the $80,000 just as it did from your pay check. If you want $80,000 after income tax, raise the target first and run the formula again."
        ],
        "table": {
          "head": [
            "Step",
            "Calculation",
            "Result"
          ],
          "rows": [
            [
              "Target income (before income tax)",
              "Your salary to replace",
              "$80,000"
            ],
            [
              "Gross up for self-employment tax",
              "$80,000 / (1 - 0.1413)",
              "$93,164"
            ],
            [
              "Self-employment tax",
              "14.13% of $93,164",
              "$13,164"
            ],
            [
              "Add business expenses",
              "$93,164 + $8,000",
              "$101,164"
            ],
            [
              "Revenue target",
              "What the business must bill",
              "$101,164"
            ],
            [
              "Hourly rate",
              "$101,164 / 1,440 billable hours",
              "$70.25"
            ]
          ]
        }
      },
      {
        "heading": "Count your billable hours honestly",
        "paragraphs": [
          "The divisor is where most rate calculations go wrong. A year has 52 weeks times 40 hours, or 2,080 hours, and it is tempting to divide by that number. But nobody bills 2,080 hours. You take holidays, you get sick, and a large share of every working week goes to tasks no client pays for: answering inquiries, writing proposals, invoicing, chasing payments, learning new tools, and keeping your own business running.",
          "A realistic subtraction starts with four weeks off: two weeks of holiday, a week of public holidays and sick days, and a week of gaps between projects. That leaves 48 working weeks, or 1,920 hours. Then allow for non-billable time inside those weeks: a quarter of a freelancer's working time going to admin and marketing is a normal planning assumption, and it leaves 1,440 billable hours.",
          "The rate is sensitive to this number. At the $101,164 revenue target, 1,600 billable hours gives $63.23 an hour, 1,440 gives $70.25, and 1,200 gives $84.30. Overestimate your billable hours and you underprice every hour you sell; the shortfall only shows up at year end, when the revenue does not add up.",
          "Track your time for a month before trusting any assumption. Log every working hour, billable or not, and look at the share clients actually pay for. The result usually surprises new freelancers, and it is the single most useful number in the whole calculation."
        ],
        "table": {
          "head": [
            "Step",
            "Hours"
          ],
          "rows": [
            [
              "Full working year (52 weeks x 40 hours)",
              "2,080"
            ],
            [
              "Less 4 weeks off (holiday, sick days, gaps)",
              "-160"
            ],
            [
              "Working hours",
              "1,920"
            ],
            [
              "Less 25% non-billable time (admin, marketing, quoting)",
              "-480"
            ],
            [
              "Billable hours",
              "1,440"
            ]
          ]
        }
      },
      {
        "heading": "Turn the hourly floor into project prices and retainers",
        "paragraphs": [
          "The hourly rate is a floor, not a pricing method. Many clients prefer a fixed project price, and many freelancers prefer it too, because it rewards working faster instead of punishing it. The hourly floor still does the work: estimate the hours a project will take, multiply by your rate, and that is the minimum project price. A project you expect to take 20 hours prices at $1,405 at the $70.25 rate, before any allowance for revisions or risk.",
          "Add a margin for the things estimates miss. Fixed-price work carries the risk that the job takes longer than planned, so add 10 to 20% to the estimate-based price, or price in phases with a defined number of revision rounds. If the client wants unlimited revisions, that is hourly work, and it should be priced hourly.",
          "Retainers suit ongoing work: a client pays a fixed monthly fee for a set amount of your time or output. Price from the same floor: ten hours a month at $70.25 is $703 a month. A small discount for guaranteed income is reasonable, but more than about 10% gives away the benefit. Put the hours, rollover rules, and notice period in writing, because an unwritten retainer drifts into unlimited availability.",
          "Value-based pricing sits above all of these. When your work is worth far more to the client than the hours it takes, for example a sales page for a product launch, the price can reflect the value rather than the time. The hourly floor still matters: it is the price below which the job loses money."
        ],
        "table": {
          "head": [
            "Pricing method",
            "How it works",
            "Best for"
          ],
          "rows": [
            [
              "Hourly",
              "Client pays for each hour worked",
              "Open-ended work, consulting, revisions"
            ],
            [
              "Project",
              "Fixed price for a defined deliverable",
              "Clear scope you can estimate in hours"
            ],
            [
              "Retainer",
              "Fixed monthly fee for set hours or output",
              "Ongoing work with a regular client"
            ],
            [
              "Value-based",
              "Price reflects the result, not the time",
              "High-impact work with a measurable payoff"
            ]
          ]
        }
      },
      {
        "heading": "Check your rate against the market without copying it",
        "paragraphs": [
          "The formula gives you a floor. The market tells you whether clients will pay it, and how much room there is above it. The two checks serve different purposes, and confusing them is how freelancers end up either underpriced or unbooked. Your floor is about your costs. The market is about what buyers pay for results like yours.",
          "Research the market the way the Small Business Administration suggests for any small business: find out what customers pay for the alternatives. For a freelancer, the alternatives are other freelancers, agencies, and the cost of hiring an employee to do the same work. Job boards, agency rate cards, and conversations with other freelancers all give useful signals. Look for ranges rather than single numbers, and note what the top of the range is attached to: usually specialization, a strong portfolio, or reliability.",
          "If your floor sits above what the market pays, you have three options: raise your value by specializing, find clients who pay more, or accept a lower income target for a period while you build up. Ignoring the gap and hoping volume makes up for it does not work: volume at a loss-making rate only produces more loss.",
          "If your floor sits well below the market, the market is telling you that you can charge more, and you should. A rate far below the going range wins clients who choose on price, and those clients are the hardest to keep and the quickest to leave. Price near the middle of the market for your skill level at minimum, and move toward the top as your work and reputation justify it."
        ]
      },
      {
        "bullets": [
          "Quote in writing, with the scope, the price, the payment schedule, and the number of revision rounds included.",
          "Ask for a deposit of 30 to 50% before starting, with the balance on delivery or on agreed milestones.",
          "Put a late-payment term in your quote, and charge it. A rate means nothing if the money arrives three months late.",
          "When a client asks for a discount, trade scope, not price: fewer revisions, a longer deadline, or a smaller deliverable.",
          "Raise your rate for new clients first, then give existing clients 30 days' written notice before the new rate applies to them."
        ],
        "heading": "Quote, negotiate, and raise your rate",
        "paragraphs": [
          "A rate only earns money when it is quoted, agreed, and paid. The mechanics around the number matter as much as the number itself. Quote in writing, always, with the scope spelled out. A verbal agreement about price is the most common source of disputes, and it is entirely avoidable.",
          "Negotiation is normal, and it does not mean your rate is wrong. When a client says the price is too high, ask what budget they had in mind and what they would cut to reach it. Most of the time the answer reveals that the scope, not the rate, is the problem. If the client genuinely cannot pay your floor, decline politely: every hour spent on below-floor work is an hour you cannot sell at your rate.",
          "Raise your rate on a schedule, not when you feel brave. Once a year at minimum, and sooner when demand outruns your capacity. A useful signal is your win rate: if you are winning nearly every quote, your rate is below what the market will bear. A win rate around 50 to 70% suggests the price is about right. Raise the rate by 10 to 15% at a time; clients accept a steady climb far more easily than a sudden jump."
        ]
      },
      {
        "bullets": [
          "Dividing by 2,080 hours. You will never bill all of them, and the rate comes out far too low.",
          "Forgetting self-employment tax. It is about 14.13% of net earnings, and it is due whether or not you planned for it.",
          "Pricing from a competitor's rate. Their costs, skills, and client base are not yours.",
          "Discounting to win work you cannot afford. A full calendar at a loss-making rate is worse than a quiet week.",
          "Leaving the rate unchanged for years. Costs rise every year; a rate that never moves is a pay cut in slow motion."
        ],
        "heading": "Common mistakes that keep rates too low",
        "paragraphs": [
          "The same five errors show up in almost every underpriced freelancer's numbers. The first is the hours error: dividing by 2,080 and treating every working hour as billable. The second is the tax error: forgetting that self-employment tax and income tax both come out of the same revenue. Together, those two mistakes can leave a rate 30 to 40% below where it needs to be.",
          "The third is copying a competitor's rate without knowing their costs. A freelancer charging $40 an hour may be a student with no rent, a retiree topping up a pension, or someone quietly going broke. The fourth is discounting to win work. A discounted project still takes the same hours, and it fills the calendar with work that does not pay the bills."
        ]
      },
      {
        "heading": "Handle the tax side from the first payment",
        "paragraphs": [
          "Nothing is withheld from freelance income, so the tax an employer used to send to the IRS is now your job. The IRS expects estimated tax payments four times a year, and you generally have to make them if you expect to owe $1,000 or more when you file. The due dates are April 15, June 15, September 15, and January 15 of the following year. Miss them and you can owe an underpayment penalty on top of the tax.",
          "The practical habit is to move money aside the moment a payment lands. Self-employment tax is about 14.13% of net earnings, and federal income tax sits on top of that at your marginal rate, so many freelancers transfer 25 to 30% of each payment into a separate tax account. That range is a rule of thumb, not a calculation: your real rate depends on your total income, deductions, and state. After your first full tax year, replace the rule of thumb with your actual effective rate.",
          "Keep records from the start. Track every payment received and every business expense, and keep receipts. Your expenses reduce your net earnings, which reduces both your self-employment tax and your income tax, so sloppy records cost real money. A simple spreadsheet is enough to begin with; the important thing is that it is complete and current.",
          "One more record matters: your hours. The billable-hours figure in your rate formula is an assumption until you measure it, and your first year of time tracking is the data that makes the second year's rate accurate. Revisit the whole formula after twelve months with real income, real expenses, and real hours, and set the next year's rate from evidence instead of estimates."
        ]
      }
    ],
    "seoTitle": "How to Set Your Freelance Rate: A Formula That Works",
    "slug": "how-to-set-your-freelance-rate",
    "sources": [
      {
        "label": "IRS — Self-employment tax (Social Security and Medicare taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS — Topic No. 554, Self-employment tax",
        "url": "https://www.irs.gov/taxtopics/tc554"
      },
      {
        "label": "IRS — Estimated taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      },
      {
        "label": "BLS — Employer Costs for Employee Compensation, June 2026",
        "url": "https://www.bls.gov/news.release/ecec.nr0.htm"
      }
    ],
    "title": "How to Set Your Freelance Rate",
    "type": "How-to",
    "updated": "2026-09-25"
  },
  {
    "cornerstone": false,
    "description": "LLC vs sole proprietorship: compare liability protection, taxes, cost, and paperwork — with a worked $80,000 tax example and the S-corp election explained.",
    "faqs": [
      {
        "answer": "Not by default. A single-member LLC is taxed exactly like a sole proprietorship: the same Schedule C, the same self-employment tax. A tax saving only appears if the LLC elects S corporation treatment and the owner's profit is high enough above a reasonable salary for the distribution to matter. Forming the LLC itself changes your legal position, not your tax bill.",
        "question": "Does an LLC save me taxes compared to a sole proprietorship?"
      },
      {
        "answer": "Yes, and it is a common step. File articles of organization with your state, get a new EIN for the LLC, move your business bank account and contracts into the LLC's name, and update any licenses. By default the LLC is taxed the same way the sole proprietorship was, so your tax return does not change unless you make a separate election.",
        "question": "Can I switch from a sole proprietorship to an LLC later?"
      },
      {
        "answer": "No. Sole proprietors deduct ordinary and necessary business expenses on Schedule C, exactly as a single-member LLC owner does. The structure has no effect on which expenses are deductible. What matters for deductions is keeping records: receipts, the business purpose of each expense, and separation between business and personal spending.",
        "question": "Do I need an LLC to deduct business expenses?"
      },
      {
        "answer": "It depends on your state. Every state charges a filing fee for the articles of organization, and the amount varies widely; many states also charge an annual report fee or franchise tax to keep the LLC active. Check your Secretary of State's website for the current figures before you file, and budget for the annual cost, not just the one-time filing fee.",
        "question": "How much does it cost to form an LLC?"
      },
      {
        "answer": "There is no fixed threshold. The election pays when your profit is high enough above a reasonable salary for the payroll tax saved on distributions to exceed the added costs of payroll processing and a separate tax return. Below that point, the extra administration costs more than it saves. Run the numbers on your own profit and salary before electing.",
        "question": "At what income does an S-corp election make sense?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/llc-vs-sole-proprietorship.jpg",
    "imageAlt": "Flat vector illustration of a small shop beside a larger office building, contrasting a sole proprietorship with an LLC, on a cream background",
    "inlineImage": "/images/llc-vs-sole-proprietorship-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a large shield protecting a small storefront, on a cream background",
    "intro": "For a solo business, the real choice is not about taxes — a single-member LLC and a sole proprietorship are taxed identically by default. The choice is about liability: an LLC separates your personal assets from business debts, while a sole proprietorship does not. This guide compares both, with a worked tax example, so you can decide on facts.",
    "published": "2026-09-29",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Self-Employment Tax Calculator",
        "url": "/freelance/self-employment-tax-calculator"
      },
      {
        "name": "S-Corp Tax Savings Calculator",
        "url": "/freelance/s-corp-tax-savings-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What each structure actually is",
        "paragraphs": [
          "A sole proprietorship is the default way of running a business alone. There is no separate legal entity: you and the business are the same person in the eyes of the law. You do not file anything to create one — if you sell a service or product without forming another entity, you are already a sole proprietor. Your business income and expenses go on Schedule C of your personal tax return.",
          "An LLC, a limited liability company, is a legal entity created under state law. The owners are called members, and an LLC can have one member or many. Forming one means filing articles of organization with your state and paying its filing fee. The point of the entity is separation: the business can own property, sign contracts, and take on debt in its own name, apart from you.",
          "One fact clears up most of the confusion. An LLC is a legal structure, not a tax classification. The IRS does not have an “LLC tax.” By default, it taxes a single-member LLC as a disregarded entity — the same as a sole proprietorship — and a multi-member LLC as a partnership. An LLC can elect a different tax treatment, but it has to file a form to do so. Nothing about forming an LLC changes your tax bill on its own.",
          "So the comparison is not really about tax, at least not at the start. It is about whether you want a legal wall between your personal life and your business, and whether that wall is worth the formation cost and the ongoing paperwork. The rest of this guide works through each side of that trade-off."
        ]
      },
      {
        "heading": "Side-by-side comparison",
        "paragraphs": [
          "The table below puts the two structures next to each other. Most rows are a wash or a small difference. The two rows that decide the question for most people are liability and federal tax treatment: liability is where an LLC earns its keep, and tax is where the two are the same.",
          "Read the table as a starting point, not a verdict. A freelancer with no employees, no lease, and no inventory gets almost nothing from the LLC column beyond liability protection, and may reasonably decide that protection is not worth the cost yet. A business that signs contracts, hires people, or holds stock gets real value from the separation. The sections below explain the rows that matter most."
        ],
        "table": {
          "head": [
            "",
            "Sole proprietorship",
            "Single-member LLC"
          ],
          "rows": [
            [
              "Formation",
              "None — you are one by doing business",
              "File articles of organization with the state"
            ],
            [
              "Legal separation",
              "None — you are the business",
              "Separate legal entity from its owner"
            ],
            [
              "Personal liability",
              "Owner personally liable for business debts",
              "Generally limited to business assets"
            ],
            [
              "Federal tax (default)",
              "Schedule C, self-employment tax",
              "Same — disregarded entity, Schedule C"
            ],
            [
              "Tax return",
              "Personal return only",
              "Personal return only (by default)"
            ],
            [
              "Ongoing paperwork",
              "Minimal; local licenses may apply",
              "Annual reports and fees in many states"
            ],
            [
              "Cost to start",
              "Effectively zero",
              "State filing fee, which varies by state"
            ],
            [
              "S-corp election",
              "Not available directly",
              "Available by filing Form 2553"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Covered: business debts, contract claims, and lawsuits against the business itself.",
          "Not covered: debts you personally guarantee, your own negligence or wrongdoing, and claims where the LLC was not kept separate from your personal finances.",
          "Insurance is separate from structure. Both sole proprietors and LLC owners need cover for the risks of their work — an LLC is not a substitute for liability insurance."
        ],
        "heading": "Liability protection: what an LLC shields and what it does not",
        "paragraphs": [
          "Liability is the main reason to form an LLC. If the business is sued or cannot pay a debt, the claim is generally against the business and its assets, not against your house, your car, or your personal savings. A sole proprietor has no such wall: business creditors can pursue personal assets, because legally there is no line between the two.",
          "The protection is real, but it has limits that catch people out. It does not cover debts you personally guarantee — and landlords and lenders routinely ask small-business owners to sign personal guarantees on leases and loans. It does not cover harm you personally cause, such as your own negligence in doing the work. And a court can disregard the LLC, a step called piercing the corporate veil, if you treat the business account as a personal wallet.",
          "That last point is the one owners control most. Keep business money in a business account, pay yourself through recorded transfers or distributions, and keep business records separate. The wall only holds if you act as though it exists. A single-member LLC with one commingled bank account offers far less protection than its owner assumes.",
          "For a sole proprietor, the exposure is total but the practical risk depends on the work. A writer working from a laptop faces little liability; a contractor working on clients' property faces much more. Weigh the actual risk of your trade, not the abstract idea of being sued."
        ]
      },
      {
        "heading": "Taxes: identical by default",
        "paragraphs": [
          "This is the most common misconception in the whole comparison: forming an LLC does not change your federal taxes. A single-member LLC is a disregarded entity for federal income tax purposes, which means the IRS taxes it exactly as it would a sole proprietorship. Income and expenses go on Schedule C, profit is subject to income tax and self-employment tax, and the same deductions are available.",
          "Self-employment tax is the tax on earnings from work you do for yourself. The rate is 15.3%: 12.4% for Social Security and 2.9% for Medicare. It applies to 92.35% of net earnings from self-employment — the 92.35% figure is the IRS's adjustment for the employer share of payroll tax that a self-employed person effectively pays for themselves. For 2026, the Social Security portion applies to the first $184,500 of combined wages, tips, and net earnings; the Medicare portion has no cap.",
          "A multi-member LLC is taxed differently by default: as a partnership, filing Form 1065 and passing income through to members on Schedule K-1. That is a separate structure with its own return, and it is outside the scope of this comparison, which assumes one owner.",
          "An LLC can elect a different tax treatment. Filing Form 8832 elects corporate taxation; filing Form 2553 elects S corporation treatment. Those elections change how the income is taxed, and the S corporation election is where a real tax saving can appear — but only under specific conditions, which the next two sections work through with numbers."
        ]
      },
      {
        "heading": "Worked example: $80,000 of profit as a sole proprietor",
        "paragraphs": [
          "Take a freelancer with $80,000 of net profit for the year — revenue minus ordinary and necessary business expenses. Net profit is the number that matters here, not revenue: expenses come off first, on Schedule C. Here is the self-employment tax on that profit, step by step.",
          "The total is $11,303.64, rounded here to $11,304 — about 14.1% of the $80,000 profit. Two details matter. First, $73,880 is below the 2026 Social Security wage base of $184,500, so the full 12.4% applies to all of it; above the wage base, only the 2.9% Medicare portion continues. Second, you can deduct one-half of the self-employment tax, $5,652, when figuring adjusted gross income. That deduction lowers income tax, not the self-employment tax itself.",
          "Income tax sits on top of this figure and depends on your total income, deductions, and filing status, so this example isolates self-employment tax only. The key point for the comparison: a single-member LLC with the same $80,000 profit produces exactly the same numbers. The structure does not change the arithmetic. Anyone who tells you forming an LLC will cut this bill is confusing the entity with the tax election described next."
        ],
        "table": {
          "head": [
            "Step",
            "Calculation",
            "Result"
          ],
          "rows": [
            [
              "1. Net earnings subject to SE tax",
              "$80,000 x 92.35%",
              "$73,880"
            ],
            [
              "2. Social Security portion",
              "$73,880 x 12.4%",
              "$9,161"
            ],
            [
              "3. Medicare portion",
              "$73,880 x 2.9%",
              "$2,143"
            ],
            [
              "4. Total self-employment tax",
              "$9,161 + $2,143",
              "$11,304"
            ]
          ]
        }
      },
      {
        "heading": "The S-corp election: where the tax saving actually comes from",
        "paragraphs": [
          "An LLC can elect to be taxed as an S corporation by filing Form 2553. The election changes how the owner's earnings are split: part is paid as a salary, which is subject to payroll taxes, and the rest can be taken as a distribution, which is not subject to self-employment or payroll tax. That split is the whole mechanism — the saving is the payroll tax avoided on the distribution.",
          "Using the same $80,000 profit, suppose the owner pays herself a $50,000 salary and takes the rest as a distribution. Payroll tax on the salary is 15.3% in total — 7.65% withheld from the employee and 7.65% paid by the business — which comes to $7,650. The employer's $3,825 share is a business expense, so the distribution is $80,000 minus the $50,000 salary minus the $3,825 employer payroll tax: $26,175. Total employment tax is $7,650, against $11,304 as a sole proprietor — a saving of $3,654.",
          "The catch is the salary. The IRS requires an S corporation owner-employee to be paid reasonable compensation for the work performed. A $50,000 salary for work that would pay $80,000 on the open market invites scrutiny, and the IRS can reclassify distributions as wages and assess back taxes. The saving only exists to the extent that a defensible salary leaves profit above it.",
          "Costs eat into the saving too. An S corporation needs payroll processing, a separate tax return (Form 1120-S), and generally more bookkeeping. Those costs vary, but they are real and recurring, which is why the election usually only pays once profit is comfortably above a reasonable salary. A sole proprietorship cannot make this election directly — it must first become an LLC or corporation, which is one more reason the structure decision matters even when the default tax treatment is the same."
        ]
      },
      {
        "heading": "Cost and paperwork compared",
        "paragraphs": [
          "A sole proprietorship costs nothing to create. There is no formation filing. Depending on where you work, you may need a local business license or a fictitious-name registration if you trade under a name other than your own, but those are local requirements, not part of the structure itself. Ongoing paperwork is minimal: keep records of income and expenses, file Schedule C with your return, and pay estimated tax during the year.",
          "An LLC costs money to create and to keep. You file articles of organization with the state and pay its filing fee. Fees vary widely by state, and many states also require an annual report and charge an annual fee or franchise tax to keep the LLC in good standing. An operating agreement — the document that sets out how the LLC is run — is worth having even for a single member, though not every state requires one.",
          "The day-to-day paperwork is similar for both: track income and expenses, keep receipts, and file on time. The LLC adds one discipline that is not optional if you want the liability protection to hold — a separate business bank account, used only for business money. Mixing personal and business funds is the fastest way to undermine the separation the LLC exists to provide.",
          "Both structures may need an Employer Identification Number (EIN) from the IRS. A sole proprietor with no employees can usually use a Social Security number for tax purposes, though an EIN is free, issued online by the IRS, and useful for keeping your Social Security number off client paperwork. An LLC typically gets its own EIN when it is formed."
        ]
      },
      {
        "bullets": [
          "Stay a sole proprietor if you are testing an idea, work alone, have no employees or lease, carry no inventory, and your personal assets are modest.",
          "Form an LLC if you sign client contracts, hire employees or contractors, lease premises, sell physical products, or hold personal assets you could not afford to lose to a business claim.",
          "Form an LLC if you plan to bring in a partner, raise money, or elect S corporation tax treatment later — the entity has to exist before any of that is possible.",
          "Revisit the decision once a year. A business that outgrows its structure — more revenue, more contracts, more exposure — should change structure before a problem forces the issue."
        ],
        "heading": "Which structure fits your situation",
        "paragraphs": [
          "There is no universally right answer. The right structure follows from the risk and scale of the work. A sole proprietorship fits a business that is small, low-risk, and still proving itself. An LLC fits a business that has something to protect — assets, contracts, employees, or a reputation that a single claim could damage.",
          "One more factor: credibility. Some clients, particularly larger companies, prefer to contract with an LLC, and some industries expect it. That preference is about perception and procurement rules, not law — a sole proprietor can sign the same contract. But if your clients expect an entity, the cost of forming one is a cost of doing business with them."
        ]
      },
      {
        "heading": "Hiring, partners, and growth change the answer",
        "paragraphs": [
          "A sole proprietorship works for one person. The moment the business grows past that, the structure starts to strain. Hiring employees adds payroll tax withholding, employment tax filings, and workers' compensation insurance in most states — obligations that apply to both structures, but that are easier to manage inside an entity with its own EIN and bank account. A sole proprietor who hires is still personally liable for employment claims, and the business has no separate identity to hold the employment relationship.",
          "Taking on a partner ends the sole proprietorship outright. Two people doing business together without forming an entity are a general partnership by default, and each partner is personally liable for the business's debts, including debts the other partner incurred. A multi-member LLC is the usual answer: it gives the partnership limited liability and a written operating agreement that sets out ownership, decision-making, and what happens when someone leaves. Forming the LLC before the partnership starts is far simpler than untangling a general partnership later.",
          "Growth also changes the tax conversation. A business earning far more than a reasonable salary for its owner is where the S corporation election starts to pay, and that election needs an entity first. Investors and lenders, for their part, generally prefer entities: a sole proprietorship has no ownership interests to sell and no separate balance sheet to lend against. None of this means a new business should start as an LLC on day one. It means the structure should be reviewed as the business grows, and changed when the work outgrows it."
        ]
      },
      {
        "heading": "You can start simple and switch later",
        "paragraphs": [
          "The decision is not permanent. Many businesses start as sole proprietorships and form an LLC once revenue, contracts, or risk justify it. The switch is straightforward: file the articles of organization, get a new EIN for the LLC, move the business bank account and contracts into the LLC's name, and update any licenses. By default the new single-member LLC is taxed exactly as the sole proprietorship was, so nothing changes on the tax return unless you elect otherwise.",
          "That reversibility is worth remembering when the choice feels high-stakes. The expensive mistake is not picking the wrong structure — it is spending weeks deciding while the business waits. Start as a sole proprietor if the work is small and low-risk, form the LLC when the business earns it, and revisit the S corporation question once profit is comfortably above a reasonable salary.",
          "Before you file anything, check two things: your state's filing fee and annual requirements on the Secretary of State's website, and whether your trade needs a license or permit that depends on the structure. Both are quick checks, and both are cheaper to do before you file than to fix afterwards."
        ]
      }
    ],
    "seoTitle": "LLC vs Sole Proprietorship: Which Is Better in 2026?",
    "slug": "llc-vs-sole-proprietorship",
    "sources": [
      {
        "label": "IRS — Limited Liability Company (LLC)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc"
      },
      {
        "label": "IRS — Sole Proprietorships",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/sole-proprietorships"
      },
      {
        "label": "IRS — Self-Employment Tax (Social Security and Medicare Taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "SBA — Choose a business structure",
        "url": "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure"
      }
    ],
    "title": "LLC vs Sole Proprietorship",
    "type": "Comparison",
    "updated": "2026-09-29"
  },
  {
    "slug": "how-self-employment-tax-works-2026",
    "title": "How Self-Employment Tax Works in 2026",
    "seoTitle": "How Self-Employment Tax Works in 2026: Rates & Examples",
    "description": "Self-employment tax is 15.3% on 92.35% of your net profit in 2026. See the $184,500 wage base, the $400 threshold, worked examples, and how to pay it.",
    "image": "/images/how-self-employment-tax-works-2026.jpg",
    "imageAlt": "Flat-vector illustration of a freelancer at a desk with a laptop, a calculator, and stacked coins beside a tax form",
    "inlineImage": "/images/how-self-employment-tax-works-2026-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a wall calendar with quarterly payment dates circled and a pencil resting nearby",
    "hub": "Freelance, Creator & Business",
    "published": "2026-10-03",
    "updated": "2026-10-03",
    "type": "What",
    "cornerstone": false,
    "sources": [
      {
        "label": "IRS — Self-Employment Tax (Social Security and Medicare Taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS — About Schedule SE (Form 1040)",
        "url": "https://www.irs.gov/forms-pubs/about-schedule-se-form-1040"
      },
      {
        "label": "IRS — Estimated Taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      },
      {
        "label": "IRS — 401(k) limit increases to $24,500 for 2026",
        "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
      }
    ],
    "relatedTools": [
      {
        "name": "Self-Employment Tax Calculator",
        "url": "/freelance/self-employment-tax-calculator"
      },
      {
        "name": "Quarterly Estimated Tax Calculator",
        "url": "/freelance/quarterly-estimated-tax-calculator"
      }
    ],
    "intro": "Self-employment tax is the Social Security and Medicare tax that freelancers, sole proprietors, and other self-employed people pay on their net profit. For 2026 it is 15.3% of 92.35% of net earnings, with the Social Security part stopping at $184,500 of earnings. This guide explains the rate, the wage base, who owes it, and how it is paid.",
    "sections": [
      {
        "heading": "What self-employment tax is",
        "paragraphs": [
          "Self-employment tax is how the United States collects Social Security and Medicare contributions from people who work for themselves. When you have a job, your employer withholds your share of these taxes from each paycheck and pays a matching share itself. When you work for yourself, there is no employer to do either job, so you pay both shares. The IRS calls the combined tax self-employment tax, or SE tax, and you calculate it on Schedule SE with your annual tax return.",
          "SE tax is separate from federal income tax. Income tax is calculated on taxable income after deductions, and the rate rises with income. SE tax is calculated on net earnings from self-employment at a flat combined rate of 15.3%, and it applies from the first dollar of qualifying earnings. A freelancer who owes little or no income tax can still owe thousands in SE tax, because the two taxes use different bases and different rules.",
          "The tax applies to net profit, not gross revenue. If your freelance work brings in $90,000 and your deductible business expenses are $30,000, your net profit is $60,000, and SE tax is calculated on that $60,000 (after the 92.35% adjustment explained below). Every legitimate business expense you record lowers the net profit the tax is charged on.",
          "SE tax also buys you something. The Social Security portion builds your earnings record, which determines your future retirement and disability benefits. The Medicare portion counts toward the quarters of coverage that qualify you for premium-free Medicare Part A at 65."
        ]
      },
      {
        "heading": "The 15.3% rate, in two parts",
        "paragraphs": [
          "The 15.3% headline rate is two taxes added together, and they behave differently. The Social Security part is 12.4% and applies only up to an annual wage base. The Medicare part is 2.9% and applies to all net earnings with no cap. For 2026, the Social Security wage base is $184,500, so the 12.4% portion stops once your combined wages and net self-employment earnings reach that amount.",
          "A third layer applies to high earners. The additional Medicare tax is 0.9% on earned income above $200,000 for single filers, $250,000 for married couples filing jointly, and $125,000 for married filing separately. These thresholds are fixed by law and are not adjusted for inflation, so more people cross them each year. The 0.9% is calculated on Form 8959 and is not part of the 15.3% rate — it is an extra charge on top.",
          "The split matters because the effective rate changes with income. Below the wage base, every additional dollar of net profit carries the full 15.3%. Above the wage base, an additional dollar carries only the 2.9% Medicare part, plus the 0.9% additional Medicare tax once the relevant threshold is passed."
        ],
        "table": {
          "head": [
            "Component",
            "Rate",
            "2026 limit"
          ],
          "rows": [
            [
              "Social Security",
              "12.4%",
              "First $184,500 of combined wages and net earnings"
            ],
            [
              "Medicare",
              "2.9%",
              "No cap — applies to all net earnings"
            ],
            [
              "Additional Medicare",
              "0.9%",
              "Earned income above $200,000 single / $250,000 joint"
            ],
            [
              "Combined SE tax",
              "15.3%",
              "Up to the wage base; 2.9% only above it"
            ]
          ]
        }
      },
      {
        "heading": "The 92.35% adjustment",
        "paragraphs": [
          "SE tax does not apply to your full net profit. Schedule SE first multiplies your net earnings by 92.35%, and the 15.3% rate applies to the result. The adjustment exists because employees never pay income tax on the employer share of payroll tax — it is invisible to them. The 92.35% factor gives self-employed people a roughly equivalent break: 92.35% is simply 100% minus 7.65%, which is half of 15.3%.",
          "Skipping this step is the most common arithmetic error in SE tax. Applying 15.3% directly to net profit overstates the tax by about 8%. On $60,000 of net profit, the wrong method gives $9,180; the correct method gives $8,478 — a difference of $702.",
          "The adjustment also sets the threshold for owing the tax at all. You must pay SE tax once your net earnings from self-employment — the figure after the 92.35% adjustment — reach $400 in a year. A net profit of $400 produces adjusted earnings of $369.40, so no SE tax is due. In practice, you need about $433 of net profit before the $400 line is crossed."
        ]
      },
      {
        "heading": "Worked example: $60,000 of net profit",
        "paragraphs": [
          "Here is the calculation for a freelancer with $60,000 of net profit and no W-2 wages. First, apply the 92.35% adjustment: $60,000 × 92.35% = $55,410. Because $55,410 is below the $184,500 wage base, the full 15.3% rate applies to all of it.",
          "Next, split the tax into its two parts. The Social Security portion is $55,410 × 12.4% = $6,871. The Medicare portion is $55,410 × 2.9% = $1,607. Add them together: $6,871 + $1,607 = $8,478. That is the total SE tax on $60,000 of net profit — an effective rate of 14.1% on the profit, because of the 92.35% adjustment.",
          "The $8,478 is not the freelancer's whole federal tax bill. Federal income tax is calculated separately, on taxable income after the standard deduction and the half-of-SE-tax deduction. For a single filer taking the 2026 standard deduction of $16,100, the income tax on this profit comes to about $4,511, for a combined federal bill of roughly $12,989 before any state tax.",
          "A second example shows how the wage base changes the result. Take a freelancer with $250,000 of net profit and no W-2 wages. Adjusted earnings are $250,000 × 92.35% = $230,875. The Social Security portion stops at the wage base: $184,500 × 12.4% = $22,878. The Medicare portion applies to all of it: $230,875 × 2.9% = $6,695. The additional Medicare tax applies to adjusted earnings above the $200,000 single threshold: ($230,875 − $200,000) × 0.9% = $278. The total is $22,878 + $6,695 + $278 = $29,851 — an effective rate of 11.9% on the original profit, lower than the $60,000 case because the Social Security portion capped out."
        ],
        "table": {
          "head": [
            "Step",
            "$60,000 net profit",
            "$250,000 net profit"
          ],
          "rows": [
            [
              "Net profit",
              "$60,000",
              "$250,000"
            ],
            [
              "Adjusted earnings (× 92.35%)",
              "$55,410",
              "$230,875"
            ],
            [
              "Social Security (12.4%)",
              "$6,871",
              "$22,878 (capped at $184,500)"
            ],
            [
              "Medicare (2.9%)",
              "$1,607",
              "$6,695"
            ],
            [
              "Additional Medicare (0.9%)",
              "$0",
              "$278"
            ],
            [
              "Total SE tax",
              "$8,478",
              "$29,851"
            ]
          ]
        }
      },
      {
        "heading": "Who has to pay it",
        "paragraphs": [
          "You owe SE tax if you are self-employed and your net earnings from self-employment reach $400 in the year. That covers sole proprietors, independent contractors, freelancers, gig workers, and partners in a partnership. It also covers people who run a side business alongside a job: the SE tax applies to the business profit even if your W-2 wages already had payroll tax withheld, though the wage base is shared between the two, as explained in the next section.",
          "The test is net earnings, not gross receipts. A creator who earns $30,000 from sponsorships and spends $8,000 on equipment, software, and travel has $22,000 of net profit and owes SE tax on it. A freelancer who earns $5,000 and spends $4,800 has $200 of net profit and owes none, because the adjusted earnings fall below $400.",
          "Some kinds of income are not subject to SE tax. Rental income from real estate is generally exempt, as is investment income such as dividends and capital gains. If you are an employee, your wages are subject to payroll tax instead. The IRS also has special rules for church employees, who owe SE tax once church employee income reaches $108.28.",
          "Your business structure changes how SE tax applies. A sole proprietor and a single-member LLC taxed as a sole proprietorship both pay SE tax on the full net profit. An S corporation owner pays SE tax only on the salary the corporation pays them, not on distributions — which is why the S corporation election is sometimes used to reduce SE tax, at the cost of payroll and filing complexity."
        ]
      },
      {
        "heading": "The wage base and mixed W-2 and freelance income",
        "paragraphs": [
          "The $184,500 Social Security wage base is shared across all your earnings in the year. Your W-2 wages count first. If your job already paid you $184,500 or more in Social Security wages, you owe no Social Security portion of SE tax on your freelance profit at all — only the 2.9% Medicare portion, plus the 0.9% additional Medicare tax if your combined earned income passes the threshold.",
          "If your W-2 wages are below the wage base, the remaining room is what your freelance income can use. Suppose your job pays $120,000 in Social Security wages and your freelance business nets $80,000. Your adjusted freelance earnings are $80,000 × 92.35% = $73,880. The wage base left over is $184,500 − $120,000 = $64,500. You pay the 12.4% Social Security portion on the smaller of those two numbers — $64,500 — which is $7,998. The 2.9% Medicare portion applies to the full $73,880, which is $2,143. Total SE tax: $10,141.",
          "This coordination is why Schedule SE asks for your W-2 wages before it calculates the Social Security portion. The Medicare portion never gets this break: it applies to every dollar of adjusted net earnings regardless of your wages. The same coordination applies to the additional Medicare tax, whose threshold is tested against combined earned income — W-2 wages plus adjusted self-employment earnings."
        ]
      },
      {
        "heading": "The half-of-SE-tax deduction",
        "paragraphs": [
          "You can deduct half of your SE tax when calculating your income tax. This is the employer-equivalent portion: it mirrors the half of payroll tax an employer pays and deducts as a business expense. On $60,000 of net profit, the SE tax is $8,478, so the deduction is $4,239. It reduces your adjusted gross income, which in turn reduces your taxable income and your income tax.",
          "The deduction is an above-the-line adjustment, which means you claim it whether or not you itemize. It appears on Schedule 1 of Form 1040 and flows into your adjusted gross income. It does not reduce your SE tax itself, and it does not reduce the net earnings your SE tax is calculated on. It only affects income tax.",
          "Two details are easy to get wrong. First, the deduction is half of the SE tax on Schedule SE — it does not include the 0.9% additional Medicare tax, which has no corresponding deduction. Second, the deduction is based on the SE tax you actually owe, not on a flat percentage of profit.",
          "The deduction is worth real money. For the $60,000 freelancer in the 12% income tax bracket, a $4,239 deduction saves about $509 in income tax ($4,239 × 12%). Combined with the 92.35% adjustment, it means the effective cost of SE tax is lower than the 15.3% headline suggests."
        ]
      },
      {
        "heading": "How and when you pay it",
        "paragraphs": [
          "SE tax is not withheld from your payments, so you pay it yourself through quarterly estimated tax payments. The IRS divides the year into four payment periods, with deadlines of April 15, June 15, September 15, and January 15 of the following year. Each payment covers both your income tax and your SE tax for the period.",
          "For the 2026 tax year, the first three deadlines — April 15, June 15, and September 15 — have already passed. The remaining payment for 2026 is due January 15, 2027. If you have not been paying during the year, that January payment cannot undo the earlier missed deadlines: the underpayment penalty is calculated quarter by quarter.",
          "You can pay online through IRS Direct Pay or your IRS online account, by phone, through the IRS2Go app, or by mailing a check with a Form 1040-ES payment voucher. The IRS also lets you pay more often than quarterly — weekly or monthly, for example — as long as enough has been paid by the end of each quarter.",
          "The amount to pay each quarter is your best estimate of the year's total tax divided by four, or a safe-harbor amount based on last year's tax. You avoid the underpayment penalty if your withholding and estimated payments total at least 90% of the current year's tax or 100% of the prior year's tax, whichever is smaller — 110% of the prior year's tax if your prior-year adjusted gross income was over $150,000. Form 1040-ES has a worksheet that walks through the calculation."
        ]
      },
      {
        "heading": "What legitimately lowers the bill",
        "paragraphs": [
          "The largest legitimate reduction comes from business expenses. Every ordinary and necessary expense — software, equipment, professional services, business travel, a home office — reduces the net profit that SE tax is calculated on. A $1,000 expense saves about $141 in SE tax at the full 15.3% rate (after the 92.35% adjustment), plus whatever it saves in income tax. The expense must be real and documented.",
          "Vehicle expenses are a common deduction for freelancers who drive for work. The standard mileage rate for 2026 is 72.5 cents per mile for January through June and 76 cents per mile for July through December, after a mid-year increase. A freelancer who drives 5,000 business miles in the second half of the year deducts $3,800. Keep a mileage log with the date, destination, purpose, and miles for each trip.",
          "Retirement contributions reduce income tax but not SE tax. A SEP IRA accepts employer contributions of roughly 20% of net self-employment earnings, up to $72,000 for 2026. A Solo 401(k) adds an employee deferral of up to $24,500 on top of the same employer contribution, with a combined cap of $72,000 ($80,000 if you are 50 or older). Both reduce your taxable income in the year you contribute, but neither reduces the net earnings on Schedule SE, so your SE tax stays the same.",
          "The S corporation election is the one structural change that can reduce SE tax itself, because distributions from an S corporation are not subject to it. The trade-off is real: you must pay yourself a reasonable salary (which carries payroll tax), run payroll, and file a separate corporate return. The election generally only pays off once net income is consistently high enough for the SE tax saving to exceed the added costs. It is a decision to make with a tax professional."
        ],
        "bullets": [
          "Track every business expense with a receipt and a note of its business purpose",
          "Log business mileage by date, with the rate that applied when you drove",
          "Open a retirement account before year-end to cut income tax on this year's profit",
          "Set aside 25 to 30 percent of every payment in a separate account for taxes",
          "Review the S corporation question with a tax professional once profit is consistently high"
        ]
      },
      {
        "heading": "Common mistakes to avoid",
        "paragraphs": [
          "The most expensive mistake is ignoring SE tax until filing time. A freelancer who earns $60,000 and sets nothing aside faces an $8,478 SE tax bill plus income tax in April, with an underpayment penalty on top if no estimated payments were made. The penalty is interest-based — the IRS underpayment rate was 7% for the fourth quarter of 2026 — and it is calculated separately for each quarter you were short.",
          "The second mistake is calculating SE tax on gross revenue instead of net profit. If you bill $90,000 and spend $30,000 on expenses, your SE tax is based on $60,000, not $90,000. Freelancers who skip expense tracking overpay by thousands and often do not realize it, because nothing on the tax return flags the error.",
          "The third mistake is assuming a 1099 form decides whether income is taxable. Clients who pay you $600 or more in a year generally send a Form 1099-NEC, but income without a form is still taxable, and the IRS receives the same 1099s your clients send. Keep a record of every payment you receive, and reconcile it against the 1099s you receive in January. If a 1099 is wrong, ask the client to correct it before you file.",
          "The fourth mistake is treating the half-of-SE-tax deduction as a reduction of SE tax itself. It reduces income tax only. And the fifth is forgetting that SE tax applies even when you owe no income tax. A freelancer whose deductions and credits wipe out income tax still owes SE tax on net earnings of $400 or more."
        ]
      }
    ],
    "faqs": [
      {
        "question": "How much is self-employment tax in 2026?",
        "answer": "Self-employment tax is 15.3% of 92.35% of your net earnings: 12.4% for Social Security on earnings up to the $184,500 wage base, plus 2.9% for Medicare with no cap. On $60,000 of net profit, the tax is $8,478. High earners also pay an additional 0.9% Medicare tax on earned income above $200,000 (single) or $250,000 (married filing jointly)."
      },
      {
        "question": "Do I have to pay self-employment tax on a side hustle?",
        "answer": "Yes, if your net earnings from the side business reach $400 in the year. The tax applies to the business profit even when you also have a W-2 job. Your wages count toward the $184,500 Social Security wage base first, so if your job already pays that much, you owe only the 2.9% Medicare portion on your freelance profit."
      },
      {
        "question": "Can I deduct self-employment tax?",
        "answer": "You can deduct half of your self-employment tax when calculating income tax. On $60,000 of net profit, the SE tax is $8,478 and the deduction is $4,239. It is an above-the-line adjustment on Schedule 1, so you claim it whether or not you itemize. It reduces income tax only — it does not reduce the SE tax itself or the net earnings it is calculated on."
      },
      {
        "question": "When is self-employment tax due?",
        "answer": "It is paid through quarterly estimated tax payments due April 15, June 15, September 15, and January 15 of the following year. For 2026, the remaining deadline is January 15, 2027. You can pay online through IRS Direct Pay or your IRS account, by phone, or by mailing a Form 1040-ES voucher. Missing a deadline can trigger an underpayment penalty even if you pay in full at filing time."
      },
      {
        "question": "Does an LLC avoid self-employment tax?",
        "answer": "No. A single-member LLC is taxed exactly like a sole proprietorship by default, so SE tax applies to the full net profit. An LLC can elect S corporation status, which removes SE tax from distributions, but the owner must then take a reasonable salary that carries payroll tax, and the business takes on payroll and corporate filing costs. The election only pays off once profit is consistently high."
      }
    ],
    "readMinutes": 13
  },
  {
    "slug": "quarterly-estimated-taxes-explained",
    "title": "Quarterly Estimated Taxes Explained",
    "seoTitle": "Quarterly Estimated Taxes Explained: 2026 Dates & Rules",
    "description": "Quarterly estimated taxes are how freelancers pay tax. Learn the 2026 deadlines, safe harbors, penalty rules, and how to calculate each payment.",
    "image": "/images/quarterly-estimated-taxes-explained.jpg",
    "imageAlt": "Flat-vector illustration of a desk calendar showing four quarterly markers, with coins and an envelope beside it",
    "inlineImage": "/images/quarterly-estimated-taxes-explained-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a laptop showing a payment screen, with a shield and a checklist floating above it",
    "hub": "Freelance, Creator & Business",
    "published": "2026-10-07",
    "updated": "2026-10-07",
    "type": "What",
    "cornerstone": false,
    "sources": [
      {
        "label": "IRS — Estimated Taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      },
      {
        "label": "IRS — Form 1040-ES, Estimated Tax for Individuals (PDF)",
        "url": "https://www.irs.gov/pub/irs-pdf/f1040es.pdf"
      },
      {
        "label": "IRS — Topic No. 306, Penalty for Underpayment of Estimated Tax",
        "url": "https://www.irs.gov/taxtopics/tc306"
      },
      {
        "label": "IRS — Quarterly Interest Rates",
        "url": "https://www.irs.gov/payments/quarterly-interest-rates"
      }
    ],
    "relatedTools": [
      {
        "name": "Quarterly Estimated Tax Calculator",
        "url": "/freelance/quarterly-estimated-tax-calculator"
      },
      {
        "name": "1099 Tax Calculator",
        "url": "/freelance/1099-tax-calculator"
      }
    ],
    "intro": "Quarterly estimated taxes are the payments self-employed people make to the IRS four times a year, because no employer withholds tax from their income. Each payment covers both income tax and self-employment tax for the period. This guide explains who has to pay, the 2026 deadlines, how much to pay, and how to avoid the underpayment penalty.",
    "sections": [
      {
        "heading": "What estimated taxes are",
        "paragraphs": [
          "The United States runs a pay-as-you-go tax system: tax is due as you earn income, not only when you file a return. Employees satisfy this through withholding — their employer sends part of each paycheck to the IRS. Self-employed people have no employer to do that, so the IRS requires them to send the money themselves, in quarterly estimated tax payments. The payments cover income tax and self-employment tax together.",
          "Estimated tax is not a separate tax. It is a payment method. The amount you pay during the year is subtracted from the total tax you owe when you file, and the difference is either a refund or a balance due. If you pay exactly the right amount across the four quarters, you owe nothing extra in April. If you overpay, the IRS refunds the excess. If you underpay, you owe the balance — and possibly a penalty.",
          "The penalty is what makes estimated taxes a deadline problem rather than just a cash-flow problem. You can owe a penalty for underpaying during the year even if you pay the full balance when you file. The IRS calculates the penalty quarter by quarter: each quarter has its own due date, and each quarter you were short accrues interest from that quarter's deadline until you pay."
        ]
      },
      {
        "heading": "Who has to pay them",
        "paragraphs": [
          "You generally have to make estimated tax payments if you expect to owe $1,000 or more in tax when you file your return, after subtracting withholding and refundable credits. For a freelancer with no withholding at all, that threshold is easy to cross: $1,000 of tax corresponds to roughly $7,100 of net profit from self-employment tax alone, before any income tax.",
          "There is a second test as well. You must pay estimated tax if you expect your withholding and refundable credits to be less than the smaller of 90% of this year's tax or 100% of last year's tax. A freelancer with no withholding fails this test as soon as the $1,000 threshold is met.",
          "There is one clear exemption. You do not have to pay estimated tax for the current year if you meet all three of these conditions: you had no tax liability for the prior year, you were a U.S. citizen or resident alien for the whole prior year, and your prior tax year covered a 12-month period. A first-year freelancer who owed no tax last year can skip estimated payments for the first year.",
          "Employees with a side business have a choice. Instead of making estimated payments, they can ask their employer to withhold more tax from their paycheck by filing a new Form W-4 with an additional withholding amount. The IRS treats withholding as paid evenly throughout the year, no matter when it was actually withheld."
        ]
      },
      {
        "heading": "The 2026 payment calendar",
        "paragraphs": [
          "The IRS divides the year into four payment periods, and the deadlines are not evenly spaced. The first period covers January through March, the second covers April and May, the third covers June through August, and the fourth covers September through December. The deadlines are April 15, June 15, September 15, and January 15 of the following year.",
          "For the 2026 tax year, three of the four deadlines have already passed: April 15, June 15, and September 15, 2026. The remaining payment is due Friday, January 15, 2027. That payment covers income earned from September through December 2026. If you file your 2026 return by February 1, 2027 and pay the entire balance due with it, the January 15 payment is not required — but that only works if your return is genuinely ready that early.",
          "The uneven periods matter when income is uneven. The second period is only two months long, which is why the June deadline comes just two months after the April one. The annualized installment method, explained later in this guide, lets you match each payment to the income actually earned in that period instead of paying four equal installments.",
          "State estimated taxes run on a similar schedule but with their own forms, deadlines, and thresholds. This guide covers federal estimated taxes only; check your state tax agency's site for its own rules, and budget for state payments on top of the federal ones."
        ],
        "table": {
          "head": [
            "Payment",
            "Income period",
            "2026 due date",
            "Status"
          ],
          "rows": [
            [
              "1st quarter",
              "Jan 1 – Mar 31, 2026",
              "April 15, 2026",
              "Past"
            ],
            [
              "2nd quarter",
              "Apr 1 – May 31, 2026",
              "June 15, 2026",
              "Past"
            ],
            [
              "3rd quarter",
              "Jun 1 – Aug 31, 2026",
              "September 15, 2026",
              "Past"
            ],
            [
              "4th quarter",
              "Sep 1 – Dec 31, 2026",
              "January 15, 2027",
              "Upcoming"
            ]
          ]
        }
      },
      {
        "heading": "How much to pay: the worksheet method",
        "paragraphs": [
          "Form 1040-ES includes an estimated tax worksheet that walks through the calculation. The method is straightforward: estimate your total income for the year, subtract deductions and credits, calculate the tax on the result — including self-employment tax — subtract any withholding, and divide what remains by four. Each quarterly payment is one quarter of the annual estimate.",
          "The starting point for most freelancers is last year's return. Use last year's income, deductions, and credits as the base, then adjust for what has changed: a higher or lower income, a new deduction, a change in filing status. If you estimated too high, complete a new worksheet and reduce the next payment. If you estimated too low, refigure and increase it. The IRS expects estimates to be revised during the year.",
          "New freelancers without a prior year to copy from should estimate from their actual income so far. Take your net profit to date, add a realistic projection for the rest of the year, and run the worksheet on that total. Then set aside a percentage of every payment as it arrives — 25 to 30 percent covers income tax and self-employment tax for most freelancers — and pay the quarterly amount from that set-aside account."
        ]
      },
      {
        "heading": "The safe harbors that prevent a penalty",
        "paragraphs": [
          "The safe harbors are the most useful rules in estimated tax, because they let you avoid the underpayment penalty without knowing your final tax bill. You generally owe no penalty if your withholding and timely estimated payments total at least the smaller of 90% of the current year's tax or 100% of the prior year's tax. If your prior-year adjusted gross income was over $150,000 ($75,000 if married filing separately), the prior-year figure is 110% instead of 100%.",
          "The prior-year safe harbor is the easier one to plan around, because last year's tax is a known number. If your total tax on your 2025 return was $9,600 and your income was under $150,000, paying $2,400 on each of the four 2026 due dates protects you from the penalty — even if your 2026 tax turns out to be $15,000. You will still owe the $5,400 difference when you file, but no penalty attaches to it.",
          "The 90% current-year safe harbor is the better target when income falls. If your 2025 tax was $12,000 but your 2026 tax will be only $6,000, the smaller number is 90% of $6,000, which is $5,400. Paying $1,350 a quarter is enough.",
          "The 110% tier exists to stop high earners from deferring a rising bill by paying only last year's amount. If your 2025 adjusted gross income was over $150,000 and your 2025 tax was $20,000, the prior-year safe harbor is $22,000, or $5,500 a quarter. There is also a de minimis rule: if you owe less than $1,000 after subtracting withholding and credits, no penalty applies regardless of the safe harbors."
        ],
        "table": {
          "head": [
            "Safe harbor",
            "Target",
            "When it is the better choice"
          ],
          "rows": [
            [
              "Current year",
              "90% of this year's tax",
              "Income fell from last year"
            ],
            [
              "Prior year",
              "100% of last year's tax",
              "Income rose; last year's number is known"
            ],
            [
              "Prior year, high income",
              "110% of last year's tax",
              "Prior-year AGI over $150,000 ($75,000 MFS)"
            ],
            [
              "De minimis",
              "Balance due under $1,000",
              "Small tax bills of any kind"
            ]
          ]
        }
      },
      {
        "heading": "Worked example: a freelancer's full year",
        "paragraphs": [
          "Take a single freelancer with $60,000 of net profit in 2026 and no W-2 income. The first step is self-employment tax: $60,000 × 92.35% = $55,410, and $55,410 × 15.3% = $8,478. The second step is the half-of-SE-tax deduction: $8,478 ÷ 2 = $4,239, which reduces adjusted gross income to $60,000 − $4,239 = $55,761.",
          "The third step is income tax. The 2026 standard deduction for a single filer is $16,100, so taxable income is $55,761 − $16,100 = $39,661. The 2026 single brackets tax the first $12,400 at 10% ($1,240) and the rest at 12%: ($39,661 − $12,400) × 12% = $3,271. Total income tax is $1,240 + $3,271 = $4,511. This example ignores the qualified business income deduction and state tax, both of which would change the result.",
          "The fourth step is the total and the quarterly amount. Total federal tax is $8,478 of SE tax plus $4,511 of income tax, which is $12,989. Divided by four, each quarterly payment is $3,247. As a share of net profit, the total is 21.6% — which is why the common advice to set aside 25 to 30 percent of each payment leaves room for state tax.",
          "Now check the safe harbors. Suppose this freelancer's total tax on the 2025 return was $10,000. The prior-year safe harbor would be $10,000, or $2,500 a quarter — lower than the $3,247 the worksheet gives. Paying $2,500 a quarter avoids the penalty, but leaves $2,989 to pay in April."
        ],
        "table": {
          "head": [
            "Line",
            "Amount"
          ],
          "rows": [
            [
              "Net profit",
              "$60,000"
            ],
            [
              "Self-employment tax (15.3% of $55,410)",
              "$8,478"
            ],
            [
              "Half-of-SE-tax deduction",
              "−$4,239"
            ],
            [
              "Adjusted gross income",
              "$55,761"
            ],
            [
              "Standard deduction (single, 2026)",
              "−$16,100"
            ],
            [
              "Taxable income",
              "$39,661"
            ],
            [
              "Federal income tax",
              "$4,511"
            ],
            [
              "Total federal tax",
              "$12,989"
            ],
            [
              "Quarterly payment ($12,989 ÷ 4)",
              "$3,247"
            ]
          ]
        }
      },
      {
        "heading": "How to pay",
        "paragraphs": [
          "The fastest way to pay is IRS Direct Pay, a free service on irs.gov that pulls the payment from your bank account. You select the reason for the payment (estimated tax), the tax year (2026), and the amount, and you get a confirmation number immediately. You can also pay through your IRS online account, which shows your payment history.",
          "Other options include paying by phone, through the IRS2Go mobile app, or by mailing a check or money order with a Form 1040-ES payment voucher. If you mail the payment, the U.S. postmark date is the payment date, so a check mailed on the due date counts as on time even if the IRS receives it days later. Businesses can also pay through the Electronic Federal Tax Payment System (EFTPS) or a business tax account.",
          "You are not limited to four payments a year. The IRS lets you pay weekly, biweekly, or monthly, as long as enough has been paid by the end of each quarter. A freelancer who is paid irregularly can pay a percentage of each client payment as it arrives, and the total counts toward the quarterly requirement.",
          "Keep a record of every payment: the date, the amount, the confirmation number, and the tax year it applies to. Estimated payments are credited to your account by tax year, and a payment applied to the wrong year is a common error that takes months to correct. When you file your return, the total of your estimated payments goes on Schedule 3 and is subtracted from your total tax."
        ]
      },
      {
        "heading": "Uneven income: the annualized installment method",
        "paragraphs": [
          "Four equal payments assume four equal quarters of income, which is not how freelancing works. A consultant who earns $40,000 in the first quarter and $5,000 in each of the next three would overpay in April under the equal-installment method and underpay in the middle of the year. The annualized installment method, calculated on Schedule AI of Form 2210, lets each payment match the income actually earned in that period.",
          "The method works by annualizing the income earned so far. After the first quarter, you multiply three months of income by four to estimate the annual total, calculate the tax on that figure, and pay a quarter of it. After the second period, you annualize five months of income, and so on. If a big project lands in November, the January payment covers it, and no penalty applies to the earlier quarters when the income did not yet exist.",
          "The method requires more paperwork than equal installments, and you must file Form 2210 with Schedule AI to claim it — the IRS will not apply it automatically. But for freelancers with lumpy income, it is often the difference between a penalty and no penalty. Tax software handles the calculation, and it is worth asking your preparer about it if your income varies by more than a third between quarters."
        ]
      },
      {
        "heading": "The underpayment penalty",
        "paragraphs": [
          "The underpayment penalty is interest, not a fine. The IRS charges it at the federal short-term rate plus three percentage points, reset every quarter. For the fourth quarter of 2026, the individual underpayment rate is 7% per year, compounded daily. The penalty is calculated separately for each quarter you were short, from that quarter's due date until the date you paid or April 15 of the following year, whichever comes first.",
          "The size of the penalty depends on how much you were short and for how long. A $2,000 shortfall outstanding for three months at 7% costs about $35 in interest. A $10,000 shortfall outstanding for a full year costs about $700. The penalty is best understood as the cost of borrowing from the IRS rather than a punishment — but it is avoidable in full by meeting a safe harbor.",
          "The penalty can be waived in two situations: if the underpayment was caused by a casualty, disaster, or other unusual circumstance and it would be inequitable to impose the penalty, or if you retired after reaching age 62 or became disabled during the tax year and the underpayment was due to reasonable cause rather than willful neglect. The waiver is requested on Form 2210 with an explanation.",
          "One more point: the penalty applies even if you are due a refund. If you underpaid in the first three quarters and then overpaid in the fourth, the refund does not cancel the penalty on the early quarters. The quarters are judged independently."
        ]
      },
      {
        "heading": "What to do if you missed a payment",
        "paragraphs": [
          "If you missed the September 15 payment — the most recent deadline — pay it now. Every day the shortfall is outstanding, interest accrues at the current 7% annual rate. A payment made today does not erase the penalty for the weeks already passed, but it stops further interest from building. You pay a late estimated payment the same way you would have paid it on time.",
          "If you have missed all three 2026 payments so far, the same advice applies, with one addition: recalculate before you pay. Run the Form 1040-ES worksheet on your actual income to date, and pay the total you should have paid through September 15, not just the third quarter's share.",
          "If you cannot pay the full catch-up, pay what you can. A partial payment reduces the shortfall the interest is calculated on. Do not wait until you can pay everything — the interest on the unpaid portion keeps running either way. If the balance is large, the IRS offers installment agreements that let you pay over time, though interest continues to accrue on the unpaid balance.",
          "Finally, fix the system that let the payment slip. Set up a separate savings account, transfer 25 to 30 percent of every payment into it the day it arrives, and put the four deadlines in your calendar with a reminder a week before each one."
        ],
        "bullets": [
          "Pay the missed amount now — interest accrues daily until you do",
          "Recalculate with the Form 1040-ES worksheet before paying a multi-quarter catch-up",
          "Pay what you can if you cannot pay in full; partial payments reduce the interest",
          "Move 25 to 30 percent of every client payment into a separate tax account",
          "Calendar the January 15, 2027 deadline with a reminder one week ahead"
        ]
      }
    ],
    "faqs": [
      {
        "question": "How much should I pay in quarterly estimated taxes?",
        "answer": "Divide your estimated annual federal tax by four. For a freelancer with $60,000 of net profit, the total federal tax is about $12,989 — $8,478 of self-employment tax plus $4,511 of income tax — so each quarterly payment is about $3,247. Use the Form 1040-ES worksheet for your own numbers, or pay a safe-harbor amount based on last year's tax."
      },
      {
        "question": "What happens if I miss a quarterly estimated tax payment?",
        "answer": "Interest accrues on the shortfall from the due date until you pay, at the IRS underpayment rate — 7% per year for the fourth quarter of 2026, compounded daily. The penalty is calculated separately for each quarter, so paying late stops further interest but does not erase the penalty for the time already passed. Pay the missed amount as soon as you can."
      },
      {
        "question": "What is the safe harbor for estimated taxes?",
        "answer": "You generally avoid the underpayment penalty if your withholding and on-time estimated payments total at least the smaller of 90% of the current year's tax or 100% of the prior year's tax. If your prior-year adjusted gross income was over $150,000 ($75,000 married filing separately), the prior-year figure is 110%. You also owe no penalty if your balance due is under $1,000."
      },
      {
        "question": "Can I pay estimated taxes monthly instead of quarterly?",
        "answer": "Yes. The IRS lets you pay weekly, biweekly, or monthly, as long as enough has been paid by the end of each quarter. Many freelancers transfer 25 to 30 percent of every client payment to the IRS as it arrives, which keeps the money from being spent and spreads the payments across the year. Only the quarterly totals matter for the penalty calculation."
      },
      {
        "question": "Do I need to pay estimated taxes in my first year of freelancing?",
        "answer": "Not necessarily. You do not have to pay estimated tax if you had no tax liability in the prior year, were a U.S. citizen or resident for the whole prior year, and your prior tax year covered 12 months. That exemption usually covers a first-year freelancer. From the second year on, you generally must pay if you expect to owe $1,000 or more at filing time."
      }
    ],
    "readMinutes": 13
  },
  {
    "cornerstone": false,
    "description": "Eight side hustles ranked for 2026, from freelance writing to delivery driving, with startup costs, time to first dollar, BLS pay benchmarks, and tax rules.",
    "faqs": [
      {
        "answer": "Yes. All income from self-employment is taxable whether or not anyone files a form. The $2,000 threshold for 2026 controls only whether a client must file Form 1099-NEC; it does not change what you owe. You owe self-employment tax once net earnings reach $400, and you report the income on Schedule C with your tax return. Track every payment yourself.",
        "question": "Do I need to report side hustle income if I never receive a 1099?"
      },
      {
        "answer": "Set aside a share of each payout as it arrives, not at year end. Self-employment tax alone is 15.3 percent of 92.35 percent of net profit, about 14.1 percent of profit, and income tax sits on top at your marginal rate. In the worked example above, combined federal tax came to about 25 percent of net profit. Your share depends on your bracket and deductions.",
        "question": "How much of my side income should I set aside for taxes?"
      },
      {
        "answer": "Yes. Self-employed drivers can deduct business miles at the IRS standard mileage rate instead of tracking actual car costs. For 2026 the rate is 72.5 cents per mile for January through June and 76 cents from July through December. Keep a log with the date, destination, and business purpose of each trip. The rate already covers gas, repairs, and insurance, so do not deduct those again.",
        "question": "Can I deduct mileage for delivery driving?"
      },
      {
        "answer": "Freelance writing and design have the highest benchmarks in this guide: the BLS median hourly wage is $36.98 for writers and authors and $30.27 for graphic designers. But those are employee medians, and freelancers set their own rates. Beginners earn less while they build a portfolio, and specialists earn more. Driving and pet care pay less per hour but start earning within days.",
        "question": "Which side hustle pays the most per hour?"
      },
      {
        "answer": "No. You can start as a sole proprietor with no registration: you report the income on Schedule C and pay self-employment tax on the net profit. An LLC adds liability protection but is not required to earn income. Some cities require a local business license, and some activities need permits, so check your city and state rules before you start.",
        "question": "Do I need a business license or an LLC to start a side hustle?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/best-side-hustles-2026.jpg",
    "imageAlt": "Flat-vector illustration of a person juggling a gear, a cardboard box, and a laptop, with coins and a potted plant nearby",
    "inlineImage": "/images/best-side-hustles-2026-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a delivery scooter with an insulated box, parcels, and trees",
    "intro": "The best side hustle in 2026 is freelance writing or design if you have the skill, and delivery driving if you need cash this week. This guide ranks eight hustles by startup cost, time to first dollar, and how pay works, benchmarked against Bureau of Labor Statistics wage data and the 2026 tax rules on every dollar you earn.",
    "published": "2026-10-10",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Freelance Hourly Rate Calculator",
        "url": "/freelance/freelance-hourly-rate-calculator"
      },
      {
        "name": "Salary to Hourly Calculator",
        "url": "/freelance/salary-to-hourly-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How this list ranks side hustles",
        "paragraphs": [
          "A side hustle is worth your time only if it pays after costs, fits your schedule, and starts fast enough to matter. This list ranks eight hustles on four tests: startup cost, time to first dollar, how the pay works, and how much control you keep over your hours. Skill-based work ranks first because the hourly benchmark is highest; driving and task work rank high on speed because you can earn within days.",
          "Pay figures come from the Bureau of Labor Statistics Occupational Employment and Wage Statistics survey for May 2025, published in May 2026. Those medians describe wage and salary employees; the survey excludes self-employed workers, so a freelancer's actual rate depends on what clients pay, not on the median. Where no BLS occupation matches a hustle, this guide says so and describes the pay mechanics instead of inventing a number."
        ],
        "table": {
          "head": [
            "Hustle",
            "Startup cost",
            "Time to first dollar",
            "Pay benchmark"
          ],
          "rows": [
            [
              "Freelance writing",
              "Laptop and internet only",
              "1 to 4 weeks",
              "$36.98 an hour, median employee wage (BLS)"
            ],
            [
              "Freelance design",
              "Laptop and design software",
              "1 to 4 weeks",
              "$30.27 an hour, median employee wage (BLS)"
            ],
            [
              "Tutoring",
              "Laptop, webcam, subject knowledge",
              "1 to 2 weeks",
              "$20.84 an hour, median employee wage (BLS)"
            ],
            [
              "Rideshare and delivery",
              "Car, license, insurance",
              "Days after approval",
              "$20.24 to $21.57 an hour, driver medians (BLS)"
            ],
            [
              "Reselling",
              "Inventory and shipping supplies",
              "Days to weeks",
              "No BLS benchmark; margin per sale"
            ],
            [
              "Pet care",
              "Near zero; phone and transport",
              "Days after approval",
              "$17.00 an hour, median employee wage (BLS)"
            ],
            [
              "Task work",
              "Basic tools for the jobs you take",
              "Days after approval",
              "No BLS benchmark; pay per job"
            ],
            [
              "Content creation",
              "Phone or laptop; editing time",
              "Months",
              "No BLS benchmark; ads, sponsors, sales"
            ]
          ]
        }
      },
      {
        "heading": "Freelance writing and design",
        "paragraphs": [
          "Freelance writers produce articles, web pages, emails, and marketing copy for clients who pay per project, per word, or per hour. Designers produce logos, layouts, social graphics, and brand assets on the same terms. Both sell a skill directly, so the rate reflects the value of the work rather than the hours on a shift.",
          "The BLS median hourly wage for writers and authors is $36.98, and for graphic designers $30.27, both from the May 2025 survey. Those are employee medians, and freelancers set their own rates: beginners charge less while they build samples, and specialists in a niche charge more. Marketplaces connect new freelancers with clients and deduct a service fee from each payment before payout; direct clients pay the full agreed rate but take longer to find.",
          "Startup cost is a laptop, an internet connection, and a small portfolio of samples. Design work adds design software, which most professionals rent by subscription. The first paid job usually takes one to four weeks: profile setup and proposals take days, and clients take days to answer. Repeat clients are the turning point. One client who orders every month replaces the constant search for new work, and the rate rises with each delivered project.",
          "Rates rise fastest when you specialize. A writer who covers one industry charges more than a generalist, because clients pay for knowledge they do not have to teach. Before you quote a job, work out your floor rate: the hourly figure that covers your costs and your tax bill. The Freelance Hourly Rate Calculator on this site turns a target income into that number, so you quote from arithmetic instead of guessing."
        ]
      },
      {
        "heading": "Tutoring and test prep",
        "paragraphs": [
          "Tutors teach one subject to one student at a time, online or in person. Test prep coaches students for admissions and licensing exams and usually charges more, because the stakes and the preparation are higher. Demand follows the school calendar: it rises at the start of terms and before exam dates, and falls during school breaks.",
          "The BLS median hourly wage for tutors is $20.84, with the lowest-paid 10 percent below $14.15 and the highest-paid 10 percent above $36.53. Tutoring platforms set the rate and assign students, which gives steady bookings at a fixed rate. Private tutors set their own rate and keep the full fee, but they find their own students through schools, parent groups, and referrals.",
          "Startup cost is subject knowledge, a laptop, and a webcam. No license is required to tutor, but parents check credentials and references, so a degree or teaching background shortens the trust gap. The first paid session usually comes within one to two weeks of listing on a platform or telling local parent groups. Sessions run 45 to 60 minutes, and a tutor who holds five regular students has a stable weekly schedule.",
          "Math and science draw the steadiest demand, because parents hire help for the subjects their children find hardest. Test prep pays more per hour but clusters around exam dates, so it suits tutors who can handle busy months and quiet ones. Group sessions raise the hourly take: two students at a lower per-student rate can pay more than one student at the full rate, and parents often prefer the lower price."
        ]
      },
      {
        "heading": "Rideshare and delivery driving",
        "paragraphs": [
          "Rideshare drivers carry passengers; delivery drivers carry food, groceries, and parcels. Both work through an app that assigns trips, sets the fare, and handles payment. Drivers choose when to log on, which makes this the most flexible hustle on this list and the fastest to first dollar.",
          "The BLS median hourly wage is $20.24 for taxi drivers and $21.57 for light truck drivers, the closest employee benchmarks for rideshare and delivery work. Couriers and messengers earn a median of $39,200 a year. App pay is built from a base fare per trip plus tips and occasional bonuses for busy hours or completed trip counts. The driver pays fuel, maintenance, and insurance, so the gross payout is not the wage: costs come out of it before tax.",
          "Approval takes days and includes a background check and a vehicle inspection. The car is the startup cost, and platforms set minimum vehicle age and condition rules. The mileage deduction matters here more than in any other hustle: for 2026 the IRS rate is 72.5 cents per business mile from January through June and 76 cents from July through December. A driver who logs miles carefully cuts the tax bill on every trip, and the worked example below shows the math.",
          "Hours matter more than mileage. Demand peaks around commuting hours, weekend evenings, and bad weather, when fares and tips run higher and dead time between trips shrinks. Track every expense from the first trip: fuel, car washes, a phone mount, and any platform fees. Ask your insurer whether your personal auto policy covers driving for an app, and read the platform's insurance terms before your first trip, because coverage varies by trip phase."
        ]
      },
      {
        "heading": "Reselling and flipping",
        "paragraphs": [
          "Resellers buy goods below market value and sell them on online marketplaces for more. Stock comes from thrift stores, clearance sales, estate sales, and wholesale lots. The profit on each sale is the sale price minus the purchase cost, the marketplace fee, and shipping.",
          "No BLS occupation covers reselling, so there is no official wage benchmark. Earnings depend on three things: how cheaply you source stock, how fast it sells, and how much of the sale price the marketplace and the shipper keep. Fees are deducted automatically at sale, and shipping costs come out of the seller's side unless the buyer pays them. Unsold stock ties up cash, so the risk is inventory that sits.",
          "Startup cost is an inventory budget and shipping supplies: boxes, tape, and a scale. The first sale can come within days of listing, but steady income takes weeks, because listings need photos, accurate descriptions, and competitive prices. Sellers who cross $20,000 in gross payments and 200 transactions on a marketplace in 2026 receive a Form 1099-K from the payment processor. Income below that threshold is still taxable; the form only changes the reporting.",
          "Discipline decides whether reselling makes money. Check what identical items actually sold for before you buy, not what sellers are asking. A listed price is a hope; a completed sale is a fact. Start in one category you know well, because knowledge spots underpriced stock faster than any tool. Price to move stock within weeks: a shelf of unsold items is cash you cannot spend."
        ]
      },
      {
        "heading": "Pet care and task work",
        "paragraphs": [
          "Pet care covers dog walking, pet sitting, and boarding. Task work covers furniture assembly, errands, cleaning, and small home jobs. Both run through platforms that match workers with local customers, or through direct word of mouth in a neighborhood.",
          "The BLS median hourly wage for animal caretakers is $17.00. Pet care platforms pay per booking and deduct a service fee before payout; walkers and sitters set their own rates within the platform's range. Task work pays per job: the customer posts a job with a price, or the worker quotes one. There is no BLS occupation that matches general task work, so no official benchmark exists.",
          "Startup cost is near zero: a phone, transport to the job, and basic tools for the tasks you accept. Pet sitting may need a background check and a profile with references. The first booking usually comes within days of approval, and reviews decide what happens next. A sitter with strong reviews gets booked before a new profile, so early jobs are worth taking at a lower rate to build the record.",
          "Repeat customers are the goal in both hustles. A dog owner who books the same walker every weekday is steadier income than a stream of one-off jobs, and a task client who trusts you calls first for the next job. Keep your calendar honest: overbooking leads to cancellations, and cancellations cost reviews. A reliable worker with a full week beats a fast worker with gaps."
        ]
      },
      {
        "heading": "Content creation and digital products",
        "paragraphs": [
          "Content creators publish videos, newsletters, or courses and earn from advertising, sponsorships, affiliate commissions, or direct product sales. Digital products such as templates, presets, and guides sell the same file many times after one build. The work is real, but the income curve is the slowest on this list.",
          "No BLS occupation covers independent content creation, so there is no official wage benchmark. Platforms pay creators a share of advertising revenue once the channel meets eligibility thresholds for subscribers and watch time, and payments arrive on the platform's monthly schedule. Sponsors pay per video or per campaign. Affiliate links pay a commission when a viewer buys, and the rate is set by the merchant. None of this pays in the first weeks.",
          "Startup cost is a phone or laptop and editing time. The first dollar usually takes months, not days, because income follows audience size. Creators who treat it as a second job for a year can build a catalog that earns while they sleep, but anyone who needs cash this month should pick a faster hustle from this list and build content on the side.",
          "Pick one niche and one format before you publish anything. A channel about one topic builds an audience faster than a channel about everything, and one format keeps production time down. Publish on a schedule you can hold for months: a video or post every week beats a burst of ten followed by silence. Save every idea in a list, because the second month is when most creators run out of topics."
        ]
      },
      {
        "heading": "Taxes on side income: what you owe and when",
        "paragraphs": [
          "Side income is self-employment income, and the tax rules differ from a paycheck. No employer withholds tax, so you pay it yourself. The main tax is self-employment tax: 15.3 percent of net earnings, made up of 12.4 percent for Social Security and 2.9 percent for Medicare. The Social Security part applies only to the first $184,500 of combined wages and net earnings in 2026; the Medicare part has no cap.",
          "The 15.3 percent applies to 92.35 percent of net profit, not to gross income. Net profit is gross income minus business expenses, reported on Schedule C. You owe self-employment tax once net earnings from self-employment reach $400. Income tax sits on top of self-employment tax, at your marginal rate, and you can deduct half of your self-employment tax when computing adjusted gross income.",
          "Pay in quarterly installments with Form 1040-ES. The 2026 due dates are April 15, June 15, and September 15, 2026, and January 15, 2027. You generally must pay estimated tax if you expect to owe $1,000 or more in total federal tax for the year. Missing a payment brings an underpayment penalty, so pay on the date even when the amount is an estimate.",
          "Forms follow thresholds, but income is taxable with or without a form. For 2026, a client files Form 1099-NEC when it pays you $2,000 or more for services, up from $600 in earlier years under the One Big Beautiful Bill Act. If a client pays you $1,500, no form is filed, and the $1,500 is still taxable income. Keep a record of every payment, not just the ones that arrive with a form.",
          "Drivers and anyone who uses a car for business can deduct mileage instead of actual car costs. The 2026 standard mileage rate is 72.5 cents per business mile for January through June and 76 cents from July through December. Keep a log with the date, destination, and business purpose of each trip; without a log, the deduction does not hold up. Gas, repairs, and insurance are already included in the rate, so do not deduct them again on top of it."
        ]
      },
      {
        "heading": "Worked example: one month of delivery driving",
        "paragraphs": [
          "A driver works evenings in October 2026, after the July rate change. The app pays out $2,400 for the month, including tips. She drives 1,000 business miles and spends $65 on a phone plan share and supplies. The table below works the month out in full.",
          "The self-employment tax works out to $222.54, rounded to $223. Income tax is computed on net profit minus half of self-employment tax: $1,575 minus $111 is $1,464, and 12 percent of that is $175.68, rounded to $176. The example ignores the standard deduction, the qualified business income deduction, and state tax, so a real return could owe less. Combined federal tax is $399 on $1,575 of net profit, about 25 percent. The driver keeps $1,176 of the $2,400 gross, and the gap is mostly mileage and tax."
        ],
        "table": {
          "head": [
            "Line",
            "Amount"
          ],
          "rows": [
            [
              "Gross payouts and tips",
              "$2,400"
            ],
            [
              "Mileage deduction: 1,000 miles × $0.76",
              "−$760"
            ],
            [
              "Phone and supplies",
              "−$65"
            ],
            [
              "Net profit",
              "$1,575"
            ],
            [
              "Self-employment tax: $1,575 × 92.35% × 15.3%",
              "−$223"
            ],
            [
              "Federal income tax at a 12% marginal rate",
              "−$176"
            ],
            [
              "Net kept after federal tax",
              "$1,176"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Need cash this week: delivery driving or task work. Approval takes days, and the first payout follows the first job.",
          "Have a marketable skill: freelance writing or design. The hourly benchmark is the highest on this list, and repeat clients compound.",
          "Know a subject well: tutoring. Sessions fit around a day job, and regular students make the schedule stable.",
          "Have some cash and storage space: reselling. Start with a small inventory budget and list before you buy more.",
          "Have time and patience: content creation. Build it alongside a faster hustle, not instead of one."
        ],
        "heading": "How to pick your hustle and start this week",
        "paragraphs": [
          "Pick by constraint, not by headline pay. The highest hourly benchmark means nothing if the first dollar takes a month and the rent is due Friday. Match the hustle to what you have: skill, time, a car, or cash.",
          "Whatever you pick, do three things in the first week: open a separate bank account or tracking sheet for hustle money, set aside a share of each payout for tax, and log every expense and business mile from day one. The tax rules in this guide apply from the first dollar, and clean records turn a stressful April into a routine filing."
        ]
      }
    ],
    "seoTitle": "The Best Side Hustles in 2026: Ranked and Compared",
    "slug": "best-side-hustles-2026",
    "sources": [
      {
        "label": "BLS: Occupational Employment and Wage Statistics, May 2025 national estimates",
        "url": "https://www.bls.gov/oes/2025/may/oes_nat.htm"
      },
      {
        "label": "IRS: Self-Employment Tax (Social Security and Medicare Taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS: Standard Mileage Rates",
        "url": "https://www.irs.gov/tax-professionals/standard-mileage-rates"
      },
      {
        "label": "Public Law 119-21 (One Big Beautiful Bill Act), Section 70433 — 1099 reporting threshold",
        "url": "https://www.congress.gov/119/plaws/publ21/PLAW-119publ21.htm"
      }
    ],
    "title": "The Best Side Hustles in 2026",
    "type": "Best-List",
    "updated": "2026-10-10"
  },
  {
    "cornerstone": false,
    "description": "YouTubers earn 55% of net ad revenue on long-form videos, plus sponsorships. Learn how the Partner Program pays, what CPM and RPM mean, and what drives them.",
    "faqs": [
      {
        "answer": "There is no fixed rate. YouTube pays creators a share of ad revenue, and the amount per 1,000 views — your RPM — depends on your niche, audience, and season. As an illustration only, a channel with a $5 RPM earns $5 per 1,000 views, so 100,000 views would earn $500. Your RPM is visible in YouTube Analytics under Revenue.",
        "question": "How much does YouTube pay per 1,000 views?"
      },
      {
        "answer": "You need 1,000 subscribers plus 4,000 qualified public watch hours in 12 months or 10 million qualified Shorts views in 90 days to share in ad revenue. A lower tier at 500 subscribers unlocks fan funding and Shopping features but not ads. From February 1, 2027, new applicants need 8,000 watch hours or 20 million Shorts views.",
        "question": "How many subscribers do you need to make money on YouTube?"
      },
      {
        "answer": "They pay differently, so a direct comparison misleads. Long-form ads pay you 55% of net ad revenue from ads on your videos. Shorts ads pay 45% of your allocation from a monthly Creator Pool, shared by your portion of Shorts views. Shorts usually earn less per view, but they can reach far more viewers than a long video.",
        "question": "Do YouTube Shorts pay less than long videos?"
      },
      {
        "answer": "It varies enormously, because earnings scale with monetized views and RPM. As an illustration, a channel with 500,000 monthly views at a $4 RPM earns $2,000 a month from ads. Sponsorships, memberships, and product sales can add far more. Use your own RPM from YouTube Analytics for a realistic estimate.",
        "question": "How much do YouTubers make per month?"
      },
      {
        "answer": "Yes. US creators report YouTube income as self-employment income on Schedule C and pay self-employment tax of 15.3% on net earnings of $400 or more, plus income tax. If you expect to owe $1,000 or more, the IRS generally requires quarterly estimated payments. Keep records of every payout, including sponsorships paid outside AdSense.",
        "question": "Do YouTubers have to pay taxes?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-much-do-youtubers-make.jpg",
    "imageAlt": "Flat-vector illustration of a video play button with gold coins and arrows rising from it",
    "inlineImage": "/images/how-much-do-youtubers-make-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a video camera on a tripod beside a rising bar chart",
    "intro": "YouTubers earn money mainly from ads, and there is no fixed rate per view. YouTube pays creators 55% of net ad revenue on long-form videos, so earnings depend on views, audience, and niche. A channel with 100,000 monetized views might earn a few hundred dollars from ads — and far more from sponsorships. This guide explains how each part works.",
    "published": "2026-10-14",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "YouTube AdSense Estimator",
        "url": "/creator/youtube-adsense-estimator"
      },
      {
        "name": "YouTube CPM / RPM Calculator",
        "url": "/creator/youtube-cpm-calculator"
      }
    ],
    "sections": [
      {
        "heading": "How YouTube pays creators",
        "paragraphs": [
          "YouTube does not pay creators per view. It pays them a share of the money advertisers spend. When an advertiser runs an ad on your video, Google collects the payment, keeps its cut, and sends the rest to you through AdSense for YouTube. Your earnings rise and fall with advertiser demand, not with a rate card.",
          "YouTube states plainly that there are no guarantees under the partner agreement about how much, or whether, you will be paid. Earnings are a share of advertising revenue from viewers watching your video. That share is fixed by the terms you accept in YouTube Studio, but the money it applies to changes every day.",
          "Two numbers appear in your accounts, and they are not the same. YouTube Analytics shows estimated revenue, which YouTube adjusts twice: once after a week, and again in the middle of the following month, to remove invalid traffic and reflect Content ID claims and disputes. Only the finalized figure in your AdSense for YouTube account is what you actually get paid."
        ]
      },
      {
        "heading": "Joining the YouTube Partner Program",
        "paragraphs": [
          "Ads pay nothing until your channel joins the YouTube Partner Program (YPP). YouTube sets two routes in, and you need only one. Both require 1,000 subscribers. The long-form route adds 4,000 qualified public watch hours in the last 12 months; the Shorts route adds 10 million qualified public Shorts views in the last 90 days. Shorts views do not count toward the watch-hour route, and watch hours do not count toward the Shorts route.",
          "Thresholds are only part of the application. Your channel must follow YouTube's channel monetization policies, sit in a country where YPP is available, have no active Community Guidelines strikes, have 2-Step Verification turned on, have advanced features access, and link one active AdSense for YouTube account. Meeting the numbers does not guarantee entry: every channel goes through a review of the channel as a whole, which YouTube says typically takes about a month.",
          "The expanded program is a lower tier. At 500 subscribers, with 3 valid public uploads in the last 90 days and either 3,000 qualified watch hours in 12 months or 3 million qualified Shorts views in 90 days, a channel in an eligible country can unlock fan funding and Shopping features. It does not unlock ad revenue sharing. That still needs the full 1,000-subscriber threshold.",
          "Two rules catch creators out. First, YouTube may turn off monetization on a channel that has not uploaded a video or posted to the Posts tab for 6 months or more. Second, ads can appear on videos from channels outside YPP — YouTube reserves that right in its terms — but those creators earn nothing from them.",
          "YouTube announced changes in August 2026 that take effect February 1, 2027. From that date, new applicants for ad revenue need 1,000 subscribers plus 8,000 qualified watch hours in the last 365 days or 20 million qualified Shorts views in the last 90 days. Channels already in the program keep their status, but partners must accept the updated terms in YouTube Studio by January 31, 2027 to keep monetizing."
        ],
        "table": {
          "head": [
            "Route",
            "Subscribers",
            "Activity",
            "Time window"
          ],
          "rows": [
            [
              "Long-form",
              "1,000",
              "4,000 qualified public watch hours",
              "Last 12 months"
            ],
            [
              "Shorts",
              "1,000",
              "10 million qualified public Shorts views",
              "Last 90 days"
            ],
            [
              "Expanded YPP (fan funding only)",
              "500",
              "3,000 watch hours or 3 million Shorts views, plus 3 public uploads",
              "Last 12 months / 90 days"
            ]
          ]
        }
      },
      {
        "heading": "The revenue split: what YouTube keeps",
        "paragraphs": [
          "Your share depends on the format, and YouTube publishes the rates in the module terms you accept in YouTube Studio. The headline rate is 55% of net ad revenue on long-form videos. Shorts and fan funding work differently.",
          "The Shorts model needs explaining. Ads run between Shorts in the feed, not on a single video, so YouTube pools the month's Shorts ad revenue first. Music licensing costs come out of the pool, then the rest — the Creator Pool — is allocated to channels by their share of Shorts views in each country. You keep 45% of your allocation.",
          "The percentages apply to net revenue, after transaction taxes such as sales tax, VAT, and GST, which YouTube says are not revenue to Google and are excluded from the split.",
          "YouTube Premium adds a separate stream. When Premium members watch your content, you share in their subscription revenue, allocated by watch time. Premium viewers see no ads, so a channel with a large Premium audience earns from subscriptions instead of ad impressions."
        ],
        "table": {
          "head": [
            "Revenue source",
            "Your share",
            "How it works"
          ],
          "rows": [
            [
              "Ads on long-form videos",
              "55% of net ad revenue",
              "Ads shown on your public videos' watch pages, including embeds on other sites"
            ],
            [
              "Shorts Feed ads",
              "45% of your Creator Pool allocation",
              "Monthly pool split by your share of Shorts views, after music licensing costs"
            ],
            [
              "Channel memberships and Supers",
              "70% of net revenue",
              "Monthly memberships, Super Chat, Super Stickers, Super Thanks"
            ],
            [
              "YouTube Premium",
              "Share of subscription revenue",
              "Allocated by how much Premium members watch your content"
            ]
          ]
        }
      },
      {
        "heading": "CPM vs RPM: the two numbers that matter",
        "paragraphs": [
          "Two metrics dominate every conversation about YouTube earnings, and creators mix them up constantly. CPM is what advertisers pay. RPM is what you earn. They measure different things, and RPM is almost always lower.",
          "CPM stands for cost per mille — cost per 1,000 ad impressions. It is the average amount advertisers pay to show ads on YouTube. YouTube Analytics shows two versions: CPM, the cost per 1,000 ad impressions, and playback-based CPM, the cost per 1,000 video playbacks where at least one ad was shown. Playback-based CPM is often higher, because a single playback can carry more than one ad.",
          "RPM stands for revenue per mille — revenue per 1,000 views. It is your total revenue after YouTube's share, divided by your views and multiplied by 1,000. It counts every revenue source in YouTube Analytics: ads, channel memberships, YouTube Premium, Super Chat, and Super Stickers. It also counts every view, including views on videos that showed no ads.",
          "RPM runs lower than CPM for three reasons. First, it is calculated after YouTube takes its share. Second, its denominator includes views that earned nothing — from viewers using ad blockers, from Premium members who see no ads, and from videos with ads turned off. Third, not every view is a monetized playback: a view counts the moment a video starts, but an ad impression only counts when an ad actually displays.",
          "For planning, RPM is the useful number. It answers the only question that matters for your bank balance: how much did 1,000 views actually put in your pocket? CPM answers a different question — how much advertisers are willing to pay to reach your audience — which is useful for comparing niches, not for forecasting income."
        ]
      },
      {
        "bullets": [
          "Niche: advertisers pay to reach buyers. Channels whose viewers are close to a purchase — finance, software, business — attract higher bids than channels whose viewers are browsing for entertainment. The advertiser's expected return sets the price.",
          "Audience geography: ad rates vary by country because advertiser spending varies. A view from a country where brands spend heavily on digital ads is worth more than a view from a country where they spend little.",
          "Season: advertisers spend more when shoppers spend more. The holiday shopping period at the end of the year typically brings the highest ad demand, while January typically brings the lowest, as brands reset budgets.",
          "Video length: videos 8 minutes or longer can carry mid-roll ads — ads during the video, not just before and after. More ad slots per view means more ad impressions from the same audience.",
          "Monetized share: only playbacks that show at least one ad earn ad revenue. Premium members, ad blockers, and viewers who leave before the first ad all reduce the share of views that pay.",
          "Engagement: longer watch time gives YouTube more chances to serve ads, and it signals to the recommendation system that the video holds attention, which brings more views."
        ],
        "heading": "What moves your RPM",
        "paragraphs": [
          "RPM is not a property of YouTube. It is a property of your channel, your audience, and the calendar. The same view count can produce very different earnings on two channels, and on the same channel in different months.",
          "None of these is a lever you pull once. They are the cumulative result of what you publish, who watches it, and when. That is why two channels with identical subscriber counts can earn very different amounts, and why quoting a single average RPM for YouTube is meaningless."
        ]
      },
      {
        "heading": "Worked examples: turning views into dollars",
        "paragraphs": [
          "The examples below use round assumptions so the arithmetic is easy to follow. They are illustrations, not typical earnings. Your RPM will differ — the point is to show how the math works, so you can run it with your own numbers from YouTube Analytics.",
          "The third row shows the CPM-to-earnings chain. An advertiser pays $10 per 1,000 monetized playbacks, so 100,000 playbacks generate $1,000 of ad revenue. YouTube pays you 55% of that net revenue: $550. If every view on the channel were monetized, that would equal an RPM of $5.50. In practice RPM is lower, because not every view is monetized.",
          "Shorts do not work this way. Because Shorts revenue comes from a monthly pool allocated by your share of views, there is no per-view rate to multiply. A Short with a million views earns whatever the pool allocation for that month produces — which depends on total Shorts ad revenue, total Shorts views, and your share of them. Any calculator that promises a fixed Shorts rate per view is guessing.",
          "Run the same math on your own channel before you make plans. Take your RPM from YouTube Analytics, multiply it by your monthly views divided by 1,000, and you have a realistic ad estimate. Then subtract tax — the next sections cover both."
        ],
        "table": {
          "head": [
            "Example",
            "Assumption",
            "Math",
            "Creator earns"
          ],
          "rows": [
            [
              "100,000 views at a $5 RPM",
              "$5 RPM",
              "100,000 ÷ 1,000 × $5",
              "$500"
            ],
            [
              "1,000,000 views at a $5 RPM",
              "$5 RPM",
              "1,000,000 ÷ 1,000 × $5",
              "$5,000"
            ],
            [
              "100,000 monetized playbacks at a $10 playback-based CPM",
              "$10 CPM, 55% share",
              "100,000 ÷ 1,000 × $10 × 55%",
              "$550"
            ],
            [
              "500,000 views a month at a $4 RPM",
              "$4 RPM",
              "500,000 ÷ 1,000 × $4",
              "$2,000 a month"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Sponsorships: a brand pays you to feature its product in a video. You negotiate the fee directly with the brand or through an agency, agree on what you will say and show, and disclose the paid promotion. Payment is a flat fee for the video, not a share of views.",
          "Affiliate marketing: you link to a product and earn a commission when a viewer buys through your link. YouTube's Shopping affiliate program lets eligible creators tag third-party products in their content and earn commission on resulting purchases.",
          "Merchandise: you sell branded products through a channel store. YouTube's Shopping features connect your store to your channel, and your merch retailer or platform pays you directly — not through AdSense.",
          "Channel memberships: viewers pay a monthly fee for perks such as badges, emoji, and members-only content. YouTube pays you 70% of net membership revenue.",
          "Supers: viewers pay to highlight a message in a live chat (Super Chat, Super Stickers) or to support a video (Super Thanks). YouTube pays you 70% of net revenue from Supers.",
          "Digital products: courses, presets, templates, and ebooks sell directly to your audience through your own site or a storefront. You set the price and keep the sale minus the platform's fees."
        ],
        "heading": "Income beyond ads",
        "paragraphs": [
          "Ad revenue is the most visible income stream, and for many channels it is not the largest. Creators who earn a living from YouTube usually stack several streams, and the non-ad streams often pay more per viewer than ads do.",
          "These streams change the economics of a channel. A video that earns $500 from ads can earn far more from a sponsorship or a product launch — but only if the audience trusts the creator enough to buy. That trust is why advertisers pay for sponsorships in the first place, and why it is the asset a channel cannot afford to spend carelessly."
        ]
      },
      {
        "heading": "How and when you get paid",
        "paragraphs": [
          "AdSense for YouTube is the payment system for YouTube earnings. Your finalized earnings for a month are added to your AdSense for YouTube balance between the 7th and 12th of the following month. Payouts go out between the 21st and 26th, once your balance reaches the payment threshold — $100 in the United States — and you have no payment holds.",
          "Before your first payment, you must verify your identity and your address, select a payment method, and submit your US tax information. Google withholds US taxes on earnings from viewers in the US, and if you do not submit tax information, Google may withhold at the maximum rate. Submitting tax information is required for all monetizing creators, wherever they live.",
          "Two details matter for cash flow. First, earnings are finalized after the month ends, so January's earnings reach your bank account in late February at the earliest. Second, the $100 threshold applies per payments account, so small channels may wait several months between payouts. Earnings below the threshold roll forward; they are not lost.",
          "Not all YouTube money flows through AdSense. Merchandise payments come from your retailer or platform directly. If your channel is affiliated with a multi-channel network (MCN), YouTube pays the network, and the network pays you on its own timeline."
        ]
      },
      {
        "heading": "Taxes on YouTube income",
        "paragraphs": [
          "YouTube income is taxable income. For most US creators, it is self-employment income: you report it on Schedule C, Profit or Loss from Business, and you pay self-employment tax on top of income tax. This section covers the federal rules for 2026. It is general information, not tax advice.",
          "Self-employment tax is 15.3%: 12.4% for Social Security and 2.9% for Medicare. It applies to 92.35% of your net earnings from self-employment, and you owe it once those earnings reach $400 in a year. For 2026, the 12.4% Social Security part applies only to the first $184,500 of combined wages, tips, and net earnings; the 2.9% Medicare part has no cap. You can deduct the employer-equivalent portion of the tax when figuring your adjusted gross income.",
          "Worked example: on $10,000 of net self-employment earnings, the tax applies to $9,235 (92.35% of $10,000). At 15.3%, the self-employment tax is $1,413 — before any income tax. That is why creators who treat ad payouts as spending money get a shock at filing time.",
          "Because no employer withholds tax from your payouts, the IRS generally expects quarterly estimated payments if you expect to owe $1,000 or more when you file. For 2026 income, the due dates are April 15, June 15, and September 15, 2026, and January 15, 2027. You pay with Form 1040-ES. Missing them can mean an underpayment penalty, even if you pay in full at filing time.",
          "Forms to expect: a brand that pays you $2,000 or more for services in 2026 must send you a Form 1099-NEC — the threshold rose from $600 for payments made after December 31, 2025. Payment apps and marketplaces send a Form 1099-K only when your payments exceed $20,000 and 200 transactions in the year. No form means no paperwork, not no tax: you owe tax on every dollar you earn, whether or not anyone reports it."
        ]
      }
    ],
    "seoTitle": "How Much Do YouTubers Make? Ad Revenue Explained (2026)",
    "slug": "how-much-do-youtubers-make",
    "sources": [
      {
        "label": "YouTube Partner Program overview & eligibility — YouTube Help",
        "url": "https://support.google.com/youtube/answer/72851"
      },
      {
        "label": "YouTube partner earnings overview — YouTube Help",
        "url": "https://support.google.com/youtube/answer/72902"
      },
      {
        "label": "Self-employment tax (Social Security and Medicare taxes) — IRS",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "Instructions for Forms 1099-MISC and 1099-NEC — IRS",
        "url": "https://www.irs.gov/instructions/i1099mec"
      }
    ],
    "title": "How Much Do YouTubers Make?",
    "type": "What",
    "updated": "2026-10-14"
  },
  {
    "cornerstone": false,
    "description": "New freelancers lose thousands to the same nine mistakes: underpricing, skipped taxes, no contract, no savings. Here is what each one costs and how to fix it.",
    "faqs": [
      {
        "answer": "Set aside 25 to 30 percent of every payment, in a separate savings account, the day it arrives. You owe income tax plus self-employment tax of 15.3 percent, and on $80,000 of net profit the self-employment tax alone is $11,304. Pay estimated tax quarterly, in April, June, September, and January, so the bill never lands all at once.",
        "question": "How much should a freelancer set aside for taxes?"
      },
      {
        "answer": "A one-page agreement should name the deliverables and deadline, the total price and payment dates, the number of revisions included, who owns the finished work, a late-payment term, and a kill fee if the project is canceled. Get both signatures before work starts, and take a deposit, usually 50 percent, on every project.",
        "question": "What should a freelance contract include?"
      },
      {
        "answer": "Start from your old salary, not from what other beginners charge. Divide your old salary by 2,080 hours, then multiply by about 1.3 to cover self-employment tax, lost benefits, and unpaid admin time. A $60,000 salary gives a floor of about $37.50 an hour. Charge below that and you took a pay cut to work for yourself.",
        "question": "How much should I charge as a beginner freelancer?"
      },
      {
        "answer": "The IRS does not require one, but a separate business checking account makes every deduction easier to prove and every tax return cheaper to prepare. Client payments go in, business expenses come out, and a fixed share moves to savings for taxes. Pay yourself a regular transfer to your personal account instead of dipping in whenever you need money.",
        "question": "Do I need a separate bank account for freelancing?"
      },
      {
        "answer": "In the first year. There is no employer plan and no match to catch you later, and each year without contributions is a year of tax-deferred growth lost. For 2026, a Solo 401(k) allows a $24,500 employee deferral plus an employer share up to a $72,000 combined cap, and an IRA adds $7,500. Even a small monthly contribution beats waiting.",
        "question": "When should a freelancer start saving for retirement?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/freelancing-mistakes-beginners-make.jpg",
    "imageAlt": "Flat illustration of a freelancer at a desk with a laptop, beside a winding path marked with orange warning triangles",
    "inlineImage": "/images/freelancing-mistakes-beginners-make-inline.jpg",
    "inlineImageAlt": "Flat illustration of a contract document with a pen beside a coffee cup and a potted plant",
    "intro": "Most new freelancers lose money the same nine ways: rates copied from a salary, taxes left until April, work started without a contract, and savings put off until later. Each mistake has a price, and the prices add up fast. This guide works through all nine, shows what each one costs, and gives the fix that stops it.",
    "published": "2026-10-22",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Freelance Project Pricing Calculator",
        "url": "/freelance/freelance-project-pricing-calculator"
      },
      {
        "name": "Billable Hours Calculator",
        "url": "/freelance/billable-hours-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Why the first year costs the most",
        "paragraphs": [
          "Freelancing changes who carries the costs. An employer paid half your Social Security and Medicare taxes, covered part of your health insurance, gave you paid days off, and withheld your income tax before you saw it. As a freelancer, every one of those costs lands on you, and none of them is automatic anymore.",
          "Beginners usually discover this in the wrong order. The first invoice feels like pure profit. Then the tax bill arrives, a client pays 60 days late, or a quiet month eats the checking account. None of these are surprises to experienced freelancers. They are the standard first-year pattern, and they are avoidable.",
          "The nine mistakes below are the ones that cost the most money, in the order most beginners meet them. Each section shows the arithmetic, because a mistake with a dollar figure attached is easier to take seriously than a warning. Fix them as you go, and the first year stops being expensive.",
          "This guide assumes you work in the United States as a sole proprietor, which is how most freelancers start. The tax figures are federal figures for 2026. State income tax, local business licenses, and sales tax rules vary, and they sit on top of the federal numbers here. If you have formed an LLC or an S corporation, the tax mechanics change, but the mistakes do not."
        ]
      },
      {
        "heading": "1. Charging your old hourly wage",
        "paragraphs": [
          "The most common first mistake is dividing your old salary by 2,080 hours and charging the result. A $60,000 salary works out to $28.85 an hour, so $30 an hour feels like a raise. It is not. Your salary came with benefits your employer paid for, taxes your employer split with you, and paid time off. Your freelance rate has to replace all of it.",
          "A working rule is to multiply your old hourly figure by about 1.3. That covers the employer's half of payroll taxes you now pay yourself, the paid days off you no longer get, and the hours you spend on work nobody bills for: proposals, admin, chasing invoices, learning. On a $60,000 salary, the floor is $28.85 times 1.3, or about $37.50 an hour. Below that, you took a pay cut to become your own boss.",
          "Billable hours make it worse. A 40-hour week rarely produces 40 billable hours. At 30 billable hours a week for 48 weeks, you bill 1,440 hours a year. At your old $28.85, that is $41,544 of gross income, which is $18,456 less than the salary you left, before you pay a dollar of self-employment tax. Run your own numbers through the Freelance Project Pricing Calculator before you quote your next project."
        ],
        "table": {
          "head": [
            "Figure",
            "Amount"
          ],
          "rows": [
            [
              "Old salary",
              "$60,000"
            ],
            [
              "Old hourly rate ($60,000 divided by 2,080 hours)",
              "$28.85"
            ],
            [
              "Freelance floor ($28.85 times 1.3)",
              "$37.50"
            ],
            [
              "Gross at old rate, 1,440 billable hours",
              "$41,544"
            ],
            [
              "Gap against old salary",
              "$18,456"
            ]
          ]
        }
      },
      {
        "heading": "2. Spending money that belongs to the IRS",
        "paragraphs": [
          "No employer withholds tax from your invoices, so every dollar that lands in your account looks like yours. It is not. A freelancer owes income tax plus self-employment tax of 15.3 percent: 12.4 percent for Social Security on earnings up to the $184,500 wage base for 2026, plus 2.9 percent for Medicare on all net earnings. On $80,000 of net profit, self-employment tax alone is $11,304. Spend the full invoice and the tax bill arrives as a debt.",
          "The fix is mechanical: move a fixed share of every payment into a separate savings account the day it arrives. Twenty-five to 30 percent covers most beginners. On $80,000 of net profit, 25 percent is $20,000 a year, or $5,000 a quarter. The money is still yours if you over-saved. It comes back as a refund. The mistake is treating the tax share as spending money.",
          "The IRS also expects the money during the year, not just in April. If you expect to owe $1,000 or more when you file, you generally must pay estimated tax in four installments. Miss them and the IRS charges interest on the shortfall even if you pay in full at filing time. The dates are fixed, and the periods are uneven. The last one covers four months of income."
        ],
        "table": {
          "head": [
            "Income period",
            "Payment due"
          ],
          "rows": [
            [
              "January 1 to March 31",
              "April 15"
            ],
            [
              "April 1 to May 31",
              "June 15"
            ],
            [
              "June 1 to August 31",
              "September 15"
            ],
            [
              "September 1 to December 31",
              "January 15 of the following year"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Deliverables and deadline: exactly what you will hand over, and when",
          "Total price and payment dates: what is due, and on which days",
          "Number of revisions included, and the price of extra rounds",
          "Who owns the finished work, and when ownership transfers",
          "Late-payment term: what happens if an invoice goes unpaid",
          "Kill fee: what the client pays if the project is canceled"
        ],
        "heading": "3. Starting work without a contract or a deposit",
        "paragraphs": [
          "A friendly email thread is not a contract. Without a signed agreement, there is no record of what was agreed, no late-payment term, and no scope limit. When the client asks for a fifth revision or pays 90 days late, you have nothing to point to except your memory of a phone call. The work still gets done. The argument about what it was worth starts after.",
          "A one-page agreement covers the essentials. It does not need a lawyer to be useful. What it needs is both signatures before work starts. Clients who refuse to sign are telling you something. Listen.",
          "Take a deposit on every project. Fifty percent upfront is standard for project work, and it changes the relationship: the client has money in the project, and you are never owed the full amount. On a $6,000 project, a client who disappears after delivery costs you $3,000 with a deposit and $6,000 without one. The deposit is the cheapest insurance a freelancer can buy."
        ]
      },
      {
        "heading": "4. Underpricing to win the job",
        "paragraphs": [
          "Low prices feel like a way in. A beginner with no reviews quotes $45 an hour, wins the job, and tells herself the rate will rise later. It usually does not. The client anchors on the first price, refers friends who expect the same price, and the freelancer builds a full calendar at a rate that cannot pay the bills. Raising prices on existing clients is harder than setting them right at the start.",
          "The cost compounds quietly. At 1,000 billable hours a year, the gap between $45 and $65 an hour is $20,000. That is the emergency fund, the retirement contribution, and the tax reserve, all given away in one pricing decision. Low prices also attract the clients who negotiate hardest and pay slowest, which costs more time on top of the lost income.",
          "Charge for the result, not the hour, where you can. A flat fee for a defined deliverable rewards speed instead of punishing it, and it lets a client compare your price with the value of the work rather than with the cheapest hour on the market. The Freelance Project Pricing Calculator converts an hourly rate into a flat fee that still covers your costs."
        ]
      },
      {
        "heading": "5. Running without an emergency fund",
        "paragraphs": [
          "Freelance income arrives in lumps. A good month pays three invoices at once. The next month pays none. Beginners spend the good month and borrow through the quiet one, usually on a credit card. The feast-or-famine cycle is the normal shape of freelance income, not a sign of failure. The mistake is budgeting as if every month were the good one.",
          "An emergency fund breaks the cycle. Three to six months of essential expenses in a separate savings account turns a quiet month into an inconvenience instead of a crisis. At $3,500 a month of essential spending, that is $10,500 to $21,000. Build it from a fixed share of every payment. Ten percent of each invoice is a realistic start. Fund it before you upgrade anything else.",
          "Smooth the lumps as well as saving for them. Ask regular clients for a monthly retainer instead of per-project billing, and stagger invoice dates so payments land in different weeks. A $2,000 monthly retainer from one steady client covers more than half of a $3,500 monthly budget, which turns the feast-or-famine cycle into a baseline plus bonuses.",
          "The fund also protects your rates. A freelancer with no savings takes the bad client, accepts the low price, and works weekends to close the gap. A freelancer with three months of expenses saved can say no, wait for the right project, and negotiate from a position that is not desperate. The fund is a pricing tool as much as a safety net."
        ]
      },
      {
        "heading": "6. Mixing business and personal money",
        "paragraphs": [
          "One bank account for everything feels simpler until tax time. Then every grocery run, subscription, and client payment sits in the same statement, and sorting the business expenses out of it takes a weekend you do not have. The IRS does not require a separate account, but a mixed account makes every deduction harder to prove and every tax return more expensive to prepare.",
          "Open a business checking account and a business savings account on day one. Client payments go in, business expenses come out, and a fixed share of each payment moves to savings for taxes. Pay yourself a regular transfer to your personal account, weekly or monthly, instead of dipping in whenever you need money. The transfer is your salary. The rest of the balance belongs to the business.",
          "The same rule applies to paperwork. Keep every receipt, log every mile, and record income as it arrives rather than reconstructing it in April. Clients who pay you $2,000 or more in 2026 send you a Form 1099-NEC, but you owe tax on every dollar you earn whether or not a form arrives. Your own records are the ones the return is built from."
        ]
      },
      {
        "heading": "7. Putting retirement off until later",
        "paragraphs": [
          "No employer runs a 401(k) for you anymore, and no one matches a contribution you never make. Retirement saving is the easiest expense to postpone, because the cost of waiting is invisible for years. It is also the most expensive delay in this guide: every year without contributions is a year of tax-deferred growth that does not come back.",
          "Self-employed retirement accounts are generous. For 2026, a Solo 401(k) lets you defer up to $24,500 as the employee, plus an employer contribution of up to 25 percent of compensation, which works out to 20 percent of net earnings for a sole proprietor, with a combined cap of $72,000. A SEP IRA allows up to 25 percent of compensation. A traditional or Roth IRA adds up to $7,500. The accounts take an afternoon to open.",
          "Take $80,000 of net profit. A SEP IRA contribution works out to 20 percent of net earnings after half the self-employment tax: $80,000 minus $5,652, times 20 percent, is $14,870. The same freelancer in a Solo 401(k) can add the $24,500 employee deferral on top, for $39,370 in one year. Starting at a quarter of that, $10,000 a year, beats waiting five years and trying to catch up."
        ]
      },
      {
        "heading": "8. Saying yes to every client",
        "paragraphs": [
          "Early on, every inquiry feels like money you cannot afford to refuse. So the beginner takes the client who haggles, the project outside her skill set, and the rush job at a discount. Each one costs more than it pays. The haggler consumes hours in negotiation, the wrong-fit project takes twice as long, and the discount job fills a slot a full-price client could have taken.",
          "The deeper risk is concentration. One client who supplies 60 percent of your income is not a client. It is an employer without the benefits. If that client cuts its budget, your income falls by more than half overnight. On $90,000 of annual income, a 60 percent client is $54,000 walking out the door. No single client should be more than about a third of your revenue.",
          "Firing a client is a skill, not a confrontation. Finish the work in progress, hand over the files, and say your schedule no longer fits their needs. No explanation is owed, and none helps. The space you free is worth more than the revenue you lose, because it is the only space a better client can move into.",
          "Turn down work that fails a simple test: the rate is below your floor, the scope is unclear, or the client has already shown they do not respect your time. A polite no takes a minute. A bad client takes weeks. The hours you protect are the hours you spend finding the client who pays properly."
        ]
      },
      {
        "heading": "9. Not tracking billable time",
        "paragraphs": [
          "If you do not track your hours, you do not know what you earn. Most beginners guess, and the guess is always generous. The day feels full: email, calls, revisions, research. But only some of those hours are billable, and only billable hours pay. The gap between hours worked and hours billed is where freelance income quietly disappears.",
          "The math is unforgiving. In a 40-hour week with 22 billable hours at $75 an hour, you bill $1,650. Your effective rate is $41.25 an hour, not $75. Push billable time to 30 hours and the same week bills $2,250. Nothing changed except the share of the week spent on work clients pay for. The Billable Hours Calculator shows what your own unbilled time costs.",
          "The fix costs nothing. A timer app, a spreadsheet, or a notebook all work; the method matters less than the habit. Log time as you go, not at the end of the day, because end-of-day recall rounds every hour up. After two weeks, the pattern is visible, and the fix writes itself.",
          "Track every hour for two weeks, in 15-minute blocks, and sort them into billable and non-billable. The result usually surprises people: admin, email, and unpaid revisions take a third of the week. Cut the biggest non-billable block first. Batch email, charge for revisions beyond the agreed limit, automate invoicing. The effective rate rises without a single price increase."
        ]
      },
      {
        "bullets": [
          "Set your rate floor: old hourly wage times 1.3, and quote nothing below it",
          "Open a business checking account and a tax savings account, and move 25 percent of every payment into savings",
          "Write a one-page contract with a deposit term. No signature, no work",
          "Start an emergency fund with 10 percent of every invoice until it covers three months of expenses",
          "Open a Solo 401(k) or SEP IRA and set a monthly contribution, even a small one",
          "Track every hour for two weeks and find your biggest non-billable block"
        ],
        "heading": "The first-month fix list",
        "paragraphs": [
          "None of these mistakes needs a consultant to fix. Most of them need an afternoon and a decision. Work through the list in your first month, in this order, and the expensive first year becomes an ordinary one.",
          "Revisit the list every quarter. Rates rise with experience, the tax share changes with income, and the emergency fund grows. The freelancers who last are not the ones who never made these mistakes. They are the ones who fixed them early, before the costs compounded."
        ]
      }
    ],
    "seoTitle": "9 Freelancing Mistakes Beginners Make (and How to Fix Them)",
    "slug": "freelancing-mistakes-beginners-make",
    "sources": [
      {
        "label": "IRS — Self-Employment Tax (Social Security and Medicare Taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS — Estimated Taxes",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes"
      },
      {
        "label": "IRS — Retirement Plans for Self-Employed People",
        "url": "https://www.irs.gov/retirement-plans/retirement-plans-for-self-employed-people"
      },
      {
        "label": "IRS — 401(k) Limit Increases to $24,500 for 2026, IRA Limit Increases to $7,500",
        "url": "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500"
      }
    ],
    "title": "9 Freelancing Mistakes Beginners Make",
    "type": "Mistakes",
    "updated": "2026-10-22"
  },
  {
    "slug": "how-to-price-products-on-etsy",
    "title": "How to Price Products on Etsy",
    "seoTitle": "How to Price Products on Etsy: Fees, Formula and Profit",
    "description": "Price Etsy products from real costs: materials, labor, overhead, and every Etsy fee. Worked $40 example, margin vs markup math, and a pricing formula.",
    "image": "/images/how-to-price-products-on-etsy.jpg",
    "imageAlt": "Flat vector illustration of handmade goods on a craft market stall — ceramic mugs, folded knitted scarves, wooden boxes and a woven basket under a striped awning, on a cream background",
    "inlineImage": "/images/how-to-price-products-on-etsy-inline.jpg",
    "inlineImageAlt": "Flat vector illustration of a large blank price tag beside craft supplies — spools of thread, scissors, fabric swatches and a measuring tape on a cream background",
    "hub": "Freelance, Creator & Business",
    "published": "2026-10-18",
    "updated": "2026-10-18",
    "type": "How-to",
    "cornerstone": false,
    "sources": [
      {
        "label": "Etsy — Fees & Payments Policy",
        "url": "https://www.etsy.com/legal/fees/"
      },
      {
        "label": "Etsy — Etsy Payments Policy",
        "url": "https://www.etsy.com/legal/etsy-payments/"
      },
      {
        "label": "IRS — Form 1099-K FAQs: General information",
        "url": "https://www.irs.gov/newsroom/form-1099-k-faqs-general-information"
      },
      {
        "label": "IRS — Self-employment tax (Social Security and Medicare taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      }
    ],
    "relatedTools": [
      {
        "name": "Etsy Fee Calculator",
        "url": "/ecommerce/etsy-fee-calculator"
      },
      {
        "name": "Profit Margin Calculator",
        "url": "/ecommerce/profit-margin-calculator"
      },
      {
        "name": "Markup Calculator",
        "url": "/ecommerce/markup-calculator"
      }
    ],
    "intro": "Price an Etsy product from your costs up, not from what similar listings charge. Add materials, your labor at a real hourly rate, and overhead, then add Etsy's fees — $0.20 to list, 6.5% on the sale, and 3% plus $0.25 for US payment processing — and a profit margin on top. The $40 example below shows every line.",
    "sections": [
      {
        "heading": "Start with your true cost",
        "paragraphs": [
          "Every price starts with three cost buckets: materials, labor, and overhead. Materials are everything that goes into one item — clay, glaze, and firing for a mug; fabric, thread, and buttons for a bag. Price them from your actual receipts, not from what you remember paying. A receipt total divided by the number of items it produces gives you a per-item materials cost you can defend.",
          "Labor is the cost sellers skip most often. Time yourself making one item, start to finish, including packing. Multiply those hours by an hourly rate you would accept for the work — $20 an hour is a floor, not a goal, for skilled handwork. If a mug takes 45 minutes, labor is $15 at $20 an hour. Pricing without labor means working for free and calling it a business.",
          "Overhead is the share of your running costs that each sale must carry: packaging, photography, listing renewals, tools that wear out, and a slice of your monthly shop costs. Add up a month of overhead and divide by the items you expect to sell that month. A seller with $150 of monthly overhead selling 50 items adds $3 per item. The table below puts the three buckets together for one mug."
        ],
        "table": {
          "head": [
            "Cost item",
            "Amount"
          ],
          "rows": [
            [
              "Materials (clay, glaze, firing)",
              "$7.00"
            ],
            [
              "Labor (45 minutes at $20 per hour)",
              "$15.00"
            ],
            [
              "Overhead (packaging, photography, shop costs)",
              "$3.00"
            ],
            [
              "Total cost per mug",
              "$25.00"
            ]
          ]
        }
      },
      {
        "heading": "Know Etsy's fee stack before you set the price",
        "paragraphs": [
          "Etsy charges four fees that can touch a sale. The listing fee is $0.20 per item, charged when you publish and again each time the listing renews — listings expire after four months, and a multi-quantity listing renews at $0.20 after each sale. The transaction fee is 6.5% of the price you display plus what you charge for shipping and gift wrapping. For US sellers it does not apply to sales tax.",
          "Payment processing is separate. In the US, Etsy Payments charges 3% plus $0.25 per transaction, assessed on the total sale amount including shipping and tax. The fourth fee, Offsite Ads, applies only when Etsy's advertising off the site leads to a sale: 15% of the order total for most shops, or 12% once your shop has made $10,000 in the prior 365 days. Shops under $10,000 can opt out; above it, participation is mandatory. The Offsite Ads fee on a single order is capped at $100.",
          "Two more costs belong in your overhead, not in the per-sale math. Etsy Plus costs $10 a month and includes 15 listing credits and $5 in Etsy Ads credits each month. Etsy Ads is a daily budget you set yourself. Neither is required to sell, but if you pay for them, your prices must cover them."
        ],
        "table": {
          "head": [
            "Fee",
            "Rate (US sellers)"
          ],
          "rows": [
            [
              "Listing",
              "$0.20 per listing, renewed every 4 months"
            ],
            [
              "Transaction",
              "6.5% of price plus shipping and gift wrap"
            ],
            [
              "Payment processing",
              "3% plus $0.25 per transaction"
            ],
            [
              "Offsite Ads",
              "15% of order total; 12% once over $10,000 in trailing sales"
            ]
          ]
        }
      },
      {
        "heading": "Worked example: what a $40 sale actually nets",
        "paragraphs": [
          "Take the mug from the first section: $25 in total cost, listed at $40, with the buyer paying $6 for shipping. The buyer pays $46 in total. Here is where it goes.",
          "The sale nets $10.18 after every fee, the shipping cost, and the cost of making the mug. That is a 25.5% margin on the $40 item price — $10.18 divided by $40. Note what the fees did: $4.82 of the $46 the buyer paid, or about 10.5%, went to Etsy before you paid for shipping or materials. A price set without fees would have overstated the profit by nearly half.",
          "Now add Offsite Ads. If that same sale came through an offsite ad at the 15% rate, Etsy takes another $6.90 — 15% of the $46 order total — and profit falls to $3.28. At the 12% rate for shops over $10,000 in trailing sales, the extra fee is $5.52 and profit is $4.66. This is why the fee stack matters before you price, not after: a price that works for an organic sale can barely break even on an advertised one."
        ],
        "table": {
          "head": [
            "Line",
            "Amount"
          ],
          "rows": [
            [
              "Buyer pays (item $40 plus shipping $6)",
              "$46.00"
            ],
            [
              "Listing fee",
              "−$0.20"
            ],
            [
              "Transaction fee (6.5% of $46)",
              "−$2.99"
            ],
            [
              "Payment processing (3% of $46 plus $0.25)",
              "−$1.63"
            ],
            [
              "Total Etsy fees",
              "−$4.82"
            ],
            [
              "Shipping cost",
              "−$6.00"
            ],
            [
              "Product cost",
              "−$25.00"
            ],
            [
              "Profit",
              "$10.18"
            ]
          ]
        }
      },
      {
        "heading": "Profit margin vs markup: two different numbers",
        "paragraphs": [
          "Margin and markup both describe the gap between cost and price, but they divide by different numbers, and mixing them up is one of the most common pricing errors. Markup divides the gap by cost. Margin divides it by price.",
          "On the $40 mug with a $25 cost, the gap is $15. Markup is $15 divided by $25, or 60%. Margin is $15 divided by $40, or 37.5%. Same dollars, very different percentages — and the margin is always the smaller number. A seller who aims for a 50% margin but calculates markup has actually set a 33% margin.",
          "Convert between them with two formulas. Margin equals markup divided by one plus markup: 0.60 divided by 1.60 is 37.5%. Markup equals margin divided by one minus margin: a 40% margin needs a 67% markup (0.40 divided by 0.60). Use margin when you compare products or judge whether a price is healthy, because margin is measured against the money that actually comes in. And remember the 37.5% above is the gross margin before Etsy fees; after fees, the mug's margin is 25.5%."
        ],
        "table": {
          "head": [
            "Measure",
            "Formula",
            "Mug example"
          ],
          "rows": [
            [
              "Markup",
              "(Price − Cost) ÷ Cost",
              "60%"
            ],
            [
              "Gross margin",
              "(Price − Cost) ÷ Price",
              "37.5%"
            ],
            [
              "Net margin after fees",
              "(Price − Cost − Fees) ÷ Price",
              "25.5%"
            ]
          ]
        }
      },
      {
        "heading": "A pricing formula you can reuse",
        "paragraphs": [
          "Once you know your cost and the fee rates, you can price any item in one calculation instead of guessing. The percentage fees add up to 9.5% of the sale — 6.5% transaction plus 3% payment processing — and the fixed fees add $0.45 per sale: $0.20 to list plus $0.25 on the payment. The formula builds the fees into the price instead of subtracting them afterward.",
          "Price = (Total cost + Target profit + $0.45) ÷ (1 − 0.095). For the mug, with a $25 cost and a $12 profit target: ($25 + $12 + $0.45) ÷ 0.905 = $41.38. Round up to $42. Check it: at $42 plus $6 shipping, fees total $5.01, and profit comes out at $11.99 — the $12 target, after every fee.",
          "The formula assumes the buyer pays shipping separately and no Offsite Ads fee applies. If a sale comes through Offsite Ads, expect 12% or 15% more off the top — price with enough headroom, or opt out while your shop is under the $10,000 threshold. Re-run the formula whenever a cost changes: a supplier price rise, a higher hourly rate for your labor, or a shipping rate increase all belong in the price, not in your margin."
        ]
      },
      {
        "heading": "Shipping: free vs charged separately",
        "paragraphs": [
          "You have two choices for shipping: charge it separately, or fold it into the price and call shipping free. The fees do not decide the question, because Etsy charges the transaction fee on the total either way. A $40 item plus $6 shipping and a $46 item with free shipping both produce a 6.5% transaction fee of $2.99 and payment processing of $1.63. The total the buyer pays and the total Etsy takes are identical.",
          "What differs is risk and buyer behavior. With separate shipping, the buyer sees the true cost of delivery and you recover what you actually pay the carrier. With free shipping, the price must absorb the most expensive delivery you might have to make, not the average one — a mug shipped across the country costs more than one shipped to the next state, and the difference comes out of your profit. Free shipping also raises the displayed price, which can put off buyers who compare item prices without reading the shipping line.",
          "A practical approach: charge shipping separately for heavy or fragile items where delivery costs vary widely, and use free shipping only where you know the delivery cost within a dollar or two — light items in a standard mailer, for example. Whichever you choose, weigh and measure a packed parcel before you set the number. Guessed shipping is a common source of losses that show up only at the end of the month."
        ]
      },
      {
        "heading": "Price variations, bundles, and digital products",
        "paragraphs": [
          "One price rarely fits a whole shop. Variations of the same listing — sizes, colors, materials — often cost different amounts to make, and each one needs its own price. A larger mug that uses $2 more in materials and takes 15 more minutes to make costs about $7 more than the standard one: $2 in materials plus $5 of labor at $20 an hour. Price it at least $8 higher, because the fee stack takes about $0.76 of that $8. Pricing every variation the same means the expensive ones subsidize the cheap ones.",
          "Bundles trade per-unit profit for volume, so run the numbers before you offer one. Three mugs sold separately at $40 each earn $30.54 in profit — three times the $10.18 from the worked example. Bundle the same three at $105 with one $8 shipping charge and the math changes: fees total $11.19, and profit is $18.81, or $6.27 per mug. The bundle saves the buyer $15 and saves you two parcels of packing and shipping, but it cuts per-mug profit by nearly 40%. Offer bundles to move slow stock or lift average order value, not as a default.",
          "Digital products change the cost side, not the fee side. A printable has no materials or shipping cost, but the listing fee, the 6.5% transaction fee, and payment processing still apply — and the fixed fees bite harder at low prices. The table below shows the fee share on digital sales with no shipping. At $5, nearly a fifth of the price goes to Etsy; at $40, about a tenth. Low-priced digital items need volume to earn, so price them with the fixed $0.45 in mind: on a $3 download it is 15% of the price before any percentage fee."
        ],
        "table": {
          "head": [
            "Digital item price",
            "Total Etsy fees",
            "Fee share of price"
          ],
          "rows": [
            [
              "$5.00",
              "$0.93",
              "18.6%"
            ],
            [
              "$12.00",
              "$1.59",
              "13.3%"
            ],
            [
              "$40.00",
              "$4.25",
              "10.6%"
            ]
          ]
        }
      },
      {
        "heading": "Underpricing traps to avoid",
        "paragraphs": [
          "Most Etsy pricing mistakes are underpricing mistakes, and they share a pattern: a cost left out of the math. Check your prices against this list before you publish.",
          "The fix for every trap on this list is the same: write the costs down, run the formula, and check the result against the fee stack. Pricing from a spreadsheet takes an hour to set up and saves the slow leak of selling at a loss."
        ],
        "bullets": [
          "Free labor: pricing materials only and treating your time as free. If an item takes an hour and you charge $5 over materials, you earned $5 an hour.",
          "Forgotten fees on shipping: the 6.5% transaction fee applies to the shipping charge too, so a $6 shipping charge costs you $0.39 in transaction fees plus $0.18 in processing.",
          "Copying competitors: a rival's $25 price may reflect cheaper materials, a faster process, or a seller who has not done this math. Their costs are not yours.",
          "Discounts without math: a 20% sale on the $40 mug cuts the price to $32. Fees fall to $4.06, but profit falls from $10.18 to $2.94 — a 71% drop for a 20% discount. Run every sale price through the fee stack first.",
          "Absorbing packaging: boxes, tissue, tape, and labels are overhead. A $1.50 mailer on a $15 item is 10% of the price.",
          "Renewal fees on slow listings: a $0.20 listing fee every four months is small, but 200 unsold listings cost $40 per renewal cycle. Delist what does not sell."
        ]
      },
      {
        "heading": "When and how to raise prices",
        "paragraphs": [
          "Raise prices when demand outruns your time. If your waitlist grows, if you sell out within days of listing, or if orders take so long to fill that making them crowds out everything else, your price is below what buyers will pay. A price rise is also the right response to a cost increase — materials, shipping, or your own hourly rate — rather than absorbing it.",
          "Raise in small steps on new listings first, so you can compare. A 5% to 10% increase on a few items tells you within a few weeks whether buyers still convert, without repricing the whole shop. If sales hold, apply the increase more widely. If they fall, you have learned the ceiling for that item at a small cost.",
          "Keep a simple record of each change: the item, the old price, the new price, and the date. Without it, you cannot tell whether a sales dip came from the price, the season, or a listing that slipped in search. Review prices on a schedule — once a quarter is enough for most shops — and re-run the formula each time a supplier raises a price or your hourly rate goes up. A price is a decision you revisit, not a number you set once.",
          "Do not apologize for a price rise in your listing text, and do not announce it as a sale ending. Buyers compare your item with alternatives, not with your old price. What they notice is whether the photos, description, and reviews justify the number. Spend the effort there, and let the price reflect the work."
        ]
      },
      {
        "heading": "Taxes and records: price with them in mind",
        "paragraphs": [
          "Etsy income is taxable income, whether or not you receive a tax form. Etsy files a Form 1099-K reporting your gross sales when you exceed $20,000 in payments and 200 transactions in a year, and the platform may send one at lower amounts. No form does not mean no tax — the IRS requires you to report all income, and your 1099-K reports gross sales, not profit, so your records are what prove your costs.",
          "Two other numbers matter for sellers. If you pay a contractor — a photographer, an assistant, a bookkeeper — $2,000 or more in 2026, you generally must file a Form 1099-NEC for them; the threshold rose from $600 under the One Big Beautiful Bill Act. And if your net earnings from self-employment reach $400, you owe self-employment tax: 15.3% covering Social Security and Medicare, paid with quarterly estimated tax payments.",
          "The pricing consequence is simple: your price must leave room for tax. Set aside a share of every payout for income tax and self-employment tax — separate from your business costs — and track every receipt. A seller who prices to break even before tax is pricing to lose money after it.",
          "Keep a simple ledger: date, item, sale price, fees, shipping cost, and materials cost for every order. Etsy shows the fee breakdown in your payment account, so the record is mostly a matter of exporting it and adding your own costs. At tax time, that ledger is the difference between reporting gross sales and reporting actual profit — and it is the same data that tells you which products deserve a price rise."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is a good profit margin for an Etsy seller?",
        "answer": "There is no official benchmark, so judge your margin against your own costs. After materials, labor, overhead, and Etsy fees, the sale should still leave enough to pay income and self-employment tax and leave a profit worth the work. In this guide's worked example, the $40 mug keeps a 25.5% net margin after fees. If your margin is under 20% after fees, your price is probably too low for the labor involved."
      },
      {
        "question": "How much does Etsy take from a $40 sale?",
        "answer": "On a $40 item with $6 charged for shipping, Etsy takes $4.82: a $0.20 listing fee, a 6.5% transaction fee of $2.99, and payment processing of $1.63 (3% plus $0.25). That is about 10.5% of the $46 the buyer pays. If the sale comes through Offsite Ads, add 15% of the order total — $6.90 — or 12% for shops over $10,000 in trailing sales."
      },
      {
        "question": "Should I offer free shipping on Etsy?",
        "answer": "Only when you know the delivery cost within a dollar or two. Free shipping does not save on fees — the transaction fee applies to the total either way — so the question is risk. A light item in a standard mailer is a safe candidate. A heavy or fragile item is not: one cross-country delivery can wipe out the profit on several sales. Charge shipping separately when delivery costs vary."
      },
      {
        "question": "How do I price handmade items when I am just starting out?",
        "answer": "Start with the formula in this guide: add materials, labor at a real hourly rate, and overhead, then divide by 0.905 and add $0.45 to cover Etsy fees. Do not copy competitors' prices — their costs are not yours. Price a small first batch, watch how fast it sells, and adjust: selling out in days means the price is low; no sales in a month means the listing or the price needs work."
      },
      {
        "question": "Do I have to report Etsy income if I do not get a 1099-K?",
        "answer": "Yes. All income is taxable whether or not you receive a form. Etsy files a 1099-K once you exceed $20,000 in gross payments and 200 transactions in a year, and it may send one at lower amounts. Keep records of every sale and every cost from your first order — your receipts are what turn gross sales into taxable profit on your return."
      }
    ],
    "readMinutes": 13
  },
  {
    "cornerstone": false,
    "description": "Shopify vs Etsy compared on 2026 fees: a $45 sale costs $5.20 on Etsy and $1.75 on Shopify Basic. See the break-even, traffic trade-offs, and when each wins.",
    "faqs": [
      {
        "answer": "Etsy, at low volume. With no monthly fee, a new seller pays only when something sells: about 10% of each order. Shopify Basic costs $39 a month before the first sale. The crossover sits near $600 in monthly sales at a $50 average order — below that, Etsy costs less; above it, Shopify's flat fee wins and the gap grows with every sale.",
        "question": "Is Shopify or Etsy cheaper for a new seller?"
      },
      {
        "answer": "Yes, and many sellers do. List on Etsy for discovery, run your own Shopify store for repeat buyers and full margin, and keep inventory counts in sync so you never sell the same item twice. The one rule to respect: Etsy prohibits moving Etsy transactions off its platform, so do not use listings or messages to steer Etsy buyers to your own checkout.",
        "question": "Can I sell the same products on Etsy and Shopify?"
      },
      {
        "answer": "It depends on how much you sell and how buyers pay. For 2026, a marketplace or payment app must issue a 1099-K only when you pass $20,000 in gross payments and 200 transactions through it in the year. Card payments have no threshold, so card sales through your own Shopify store can be reported at any amount. Either way, the income is taxable with or without the form.",
        "question": "Do I get a 1099-K from Etsy or Shopify?"
      },
      {
        "answer": "Etsy charges a $0.20 listing fee per item, a 6.5% transaction fee on the price plus shipping, and 3% plus $0.25 for payment processing — about 10% of a typical order before ads. Shopify charges none of those per-sale platform fees with Shopify Payments, but it charges a $39 monthly subscription. Etsy's unique sting is Offsite Ads: 15% of an order, or 12% for larger shops, when an Etsy ad brings the buyer.",
        "question": "What does Etsy charge that Shopify does not?"
      },
      {
        "answer": "Move when your monthly sales pass the break-even point — roughly $600 a month at a $50 average order — and stay there, or when repeat buyers make up a real share of your orders. You do not have to leave Etsy to open a Shopify store: keep Etsy for discovery and let your own store keep the repeat business, where the marketplace fee buys you nothing.",
        "question": "When should I move from Etsy to Shopify?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/shopify-vs-etsy-for-sellers.jpg",
    "imageAlt": "Flat-vector illustration of two contrasting storefronts side by side, one a small market stall and one a standalone shop",
    "inlineImage": "/images/shopify-vs-etsy-for-sellers-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a balance scale weighing a shopping bag against a storefront",
    "intro": "Shopify and Etsy solve different problems. Etsy hands you buyers on day one and takes about 10% of every sale. Shopify charges a flat $39 a month and takes 2.9% plus 30 cents per card payment, so it gets cheaper as you grow. Start on Etsy to test a product; move to Shopify when monthly sales pass roughly $600.",
    "published": "2026-10-29",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Shopify Margin Calculator",
        "url": "/ecommerce/shopify-margin-calculator"
      },
      {
        "name": "Etsy Fee Calculator",
        "url": "/ecommerce/etsy-fee-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What each platform actually is",
        "paragraphs": [
          "Etsy is a marketplace. You open a shop inside Etsy's store, list products alongside millions of other sellers, and buyers find you through Etsy's search, categories, and recommendations. Your shop lives at etsy.com/shop/yourname, and the checkout, payment processing, and much of the trust work belong to Etsy, not you.",
          "Shopify is software for running your own store. You rent the platform, build a shop on your own domain, and control the design, the checkout, the emails, and the customer data. Nobody arrives by accident: every visitor comes from work you did — search results, social media, ads, or word of mouth.",
          "That difference drives everything else in this comparison. Etsy sells you reach and charges a percentage of every sale for it. Shopify sells you independence and charges a flat monthly fee. Which one costs less depends entirely on how much you sell, and which one grows your business depends on where your buyers come from."
        ]
      },
      {
        "heading": "Fees side by side",
        "paragraphs": [
          "Etsy has no monthly fee for a standard shop. Instead it takes a cut of every sale: a $0.20 listing fee, a 6.5% transaction fee on the item price plus shipping and gift wrap, and 3% plus $0.25 for payment processing on US orders. Add those together and a typical sale costs about 10% before advertising.",
          "Shopify charges the other way around. The Basic plan costs $39 a month, or $29 a month if you pay yearly, and card payments through Shopify Payments cost 2.9% plus 30 cents. There is no per-sale platform fee when you use Shopify Payments. Use a different payment gateway and Shopify adds a 2% transaction fee on Basic. The higher plans — Grow at $105 a month and Advanced at $399 a month — lower the card rate to 2.7% and 2.5% plus 30 cents, but a new seller has no reason to start there.",
          "Etsy's optional costs matter too. Etsy Plus costs $10 a month and returns $3 in listing credits and $5 in Etsy Ads credits each month. Offsite Ads is the expensive one: if a buyer clicks an Etsy ad on Google or social media and buys from your shop within 30 days, Etsy takes 15% of the order, or 12% once your shop has passed $10,000 in sales over 12 months. The fee is capped at $100 per order. Shops under $10,000 can opt out; above it, participation is mandatory for the life of the shop."
        ],
        "table": {
          "head": [
            "Fee",
            "Etsy",
            "Shopify (Basic)"
          ],
          "rows": [
            [
              "Monthly subscription",
              "None (Etsy Plus optional, $10/month)",
              "$39/month, or $29/month billed yearly"
            ],
            [
              "Listing fee",
              "$0.20 per listing, renewed every 4 months",
              "None"
            ],
            [
              "Transaction fee",
              "6.5% of price plus shipping and gift wrap",
              "None with Shopify Payments; 2% with another gateway"
            ],
            [
              "Payment processing",
              "3% + $0.25 per order (US)",
              "2.9% + $0.30 per online card payment"
            ],
            [
              "Advertising fee",
              "Offsite Ads: 15%, or 12% over $10,000 a year, capped at $100 per order",
              "None built in; you buy your own ads"
            ],
            [
              "Setup fee",
              "One-time fee for new shops in some countries",
              "None"
            ]
          ]
        }
      },
      {
        "heading": "The same $45 sale on each platform",
        "paragraphs": [
          "Take a $45 handmade item with $5 shipping, a $50 order, no sales tax, and no advertising. Here is what each platform keeps.",
          "The gap is $3.45 on this order: Etsy takes $5.20, Shopify takes $1.75. But Shopify also charges $39 a month whether you sell or not. Divide the subscription by the per-order saving — $39 divided by $3.45 — and Shopify starts winning at about 12 orders a month. At a $50 average order, that is roughly $600 in monthly sales. Pay Shopify yearly at $29 a month and the break-even drops to about 9 orders, or $450 in monthly sales.",
          "Offsite Ads changes the answer fast. One attributed sale at 15% adds $7.50 to Etsy's take on this order, pushing the total to $12.70 — more than seven times Shopify's $1.75. If a large share of your Etsy orders comes through Offsite Ads, the break-even point moves far lower, and a new shop that can opt out should think hard before staying in.",
          "Run your own numbers before deciding: the break-even moves with your average order value. Higher-priced items widen the per-order gap in Shopify's favor, because Etsy's 6.5% transaction fee grows with the price while Shopify's flat subscription does not. The calculators linked below do this math for your own prices."
        ],
        "table": {
          "head": [
            "",
            "Etsy",
            "Shopify (Basic)"
          ],
          "rows": [
            [
              "Order total",
              "$50.00",
              "$50.00"
            ],
            [
              "Listing fee",
              "$0.20",
              "—"
            ],
            [
              "Transaction fee",
              "$3.25 (6.5% of $50)",
              "—"
            ],
            [
              "Payment processing",
              "$1.75 (3% + $0.25)",
              "$1.75 (2.9% + $0.30)"
            ],
            [
              "Offsite Ads (if the sale came from one)",
              "$7.50 (15% of $50)",
              "—"
            ],
            [
              "Fees on this order",
              "$5.20 ($12.70 with Offsite Ads)",
              "$1.75"
            ],
            [
              "You keep, before product and shipping costs",
              "$44.80 ($37.30 with Offsite Ads)",
              "$48.25"
            ]
          ]
        }
      },
      {
        "heading": "What it costs at different sales volumes",
        "paragraphs": [
          "The monthly picture makes the trade-off concrete. The table assumes a $50 average order, no Offsite Ads, Shopify Basic on monthly billing with Shopify Payments, and no Etsy Plus.",
          "At $500 a month the two are nearly tied, and Etsy's built-in traffic is worth more than the $4.50 difference. By $2,000 a month Shopify saves about $99 a month, or nearly $1,200 a year. At $10,000 a month the gap is $651 a month — over $7,800 a year — and that is before Offsite Ads, which only ever widens it.",
          "Yearly billing helps Shopify further: $29 a month instead of $39 saves $120 a year. But do not pay a year up front until the shop is earning. The monthly plan costs more per month and less in total if you quit in month three."
        ],
        "table": {
          "head": [
            "Monthly sales",
            "Orders",
            "Etsy fees",
            "Shopify Basic fees",
            "Cheaper by"
          ],
          "rows": [
            [
              "$500",
              "10",
              "$52.00",
              "$56.50",
              "Etsy, $4.50"
            ],
            [
              "$2,000",
              "40",
              "$208.00",
              "$109.00",
              "Shopify, $99.00"
            ],
            [
              "$5,000",
              "100",
              "$520.00",
              "$214.00",
              "Shopify, $306.00"
            ],
            [
              "$10,000",
              "200",
              "$1,040.00",
              "$389.00",
              "Shopify, $651.00"
            ]
          ]
        }
      },
      {
        "heading": "The costs neither fee table shows",
        "paragraphs": [
          "The fee tables above cover what the platforms charge. They do not cover what running a shop costs, and those costs land differently on each side. Shopify needs a domain, which you buy yearly, and a theme — free themes cover the basics, paid themes are a one-time purchase. Apps are the slow leak: email marketing, reviews, loyalty programs, and advanced shipping each add their own monthly subscription, and a store running several paid apps can quietly double its monthly bill. Etsy needs none of that: the shop, the checkout, and the design are included, and the only recurring extra is the optional $10-a-month Etsy Plus.",
          "Shipping is a cost on both, but the tools differ. Etsy lets sellers buy shipping labels inside the platform, with postage deducted from the payment account. Shopify offers discounted carrier rates through Shopify Shipping and prints labels from the dashboard. Either way, the shipping you charge the buyer is not free money: Etsy's 6.5% transaction fee applies to the shipping you charge, so inflating shipping to cover packaging costs hands Etsy 6.5% of that too. On Shopify the card fee also applies to the full amount the buyer pays, shipping included.",
          "Finally, budget for the work itself. Product photography, packaging, and the hours spent listing or marketing are real costs even though neither platform bills you for them. A seller valuing their own time at even a modest hourly rate will find that the hours dominate the platform fees at low volume — another reason the cheaper platform at $500 a month is the one that gets you selling fastest, not the one with the lowest percentage."
        ]
      },
      {
        "heading": "Traffic: who brings the buyers",
        "paragraphs": [
          "Etsy's real product is its shoppers. Buyers arrive searching for gifts, handmade goods, and vintage items, and a new shop can make its first sale in its first week without spending a dollar on marketing. That is the main reason to start there: you are testing your product, not your ability to drive traffic.",
          "The catch is that Etsy decides who sees your listings. Search ranking depends on Etsy's algorithm — relevance, recency, reviews, and shipping speed all play a part — and a change to it can cut a shop's sales overnight. Your listings also sit next to competitors selling similar items, often for less, and Etsy shows them to your buyers.",
          "Shopify gives you no traffic at all. A new store with no marketing makes no sales, full stop. You earn visitors through search engine optimization, social media, email, paid ads, or an existing audience, and that work is slow: expect months, not weeks, before organic search sends steady traffic. The payoff is that the visitors are yours. Nobody else's products appear on your pages, and nobody can change an algorithm and take your storefront away.",
          "Put a price on the traffic question. If you have no audience and no ad budget, Etsy's 10% is cheap for the buyers it delivers. If you already have an audience — a social following, an email list, a craft-fair customer base — paying Etsy 10% for buyers you found yourself is expensive, and Shopify's flat fee wins quickly."
        ]
      },
      {
        "heading": "Control, branding, and the customer relationship",
        "paragraphs": [
          "On Etsy, the customer is Etsy's. Buyers check out on Etsy's pages, receive Etsy's emails, and come back to Etsy — not to you — for their next purchase. You cannot add buyers to your own email list from Etsy sales, and your branding is limited to a shop banner, a logo, and an about section inside Etsy's layout.",
          "Shopify reverses that. Your store carries your domain, your design, and your checkout. You own the customer list, you send the emails, and repeat buyers return to your site. That matters most for products people buy again: repeat customers cost nothing to re-acquire, and on Shopify every repeat order skips the marketplace fee entirely.",
          "Control cuts the other way too. Etsy sets the rules — what you can sell, how listings must be described, how disputes are handled — and can suspend a shop that breaks them, with limited recourse. Shopify also has terms of service, but your store, your domain, and your customer list are portable: if you leave Shopify, you take them with you. An Etsy shop has no equivalent exit; the reviews and ranking you built stay on Etsy."
        ]
      },
      {
        "heading": "Setup, effort, and day-to-day running",
        "paragraphs": [
          "Etsy is the faster start. A seller can open a shop, list a first product, and take an order in a single afternoon: no domain to buy, no theme to configure, no payment gateway to set up. Etsy handles the checkout, the payment processing, and the sales tax collection on marketplace sales in most US states, where marketplace facilitator laws make the marketplace responsible.",
          "Shopify takes longer — a focused weekend is realistic for a simple store. You choose a theme, connect a domain, set up payment processing and shipping rates, and write the pages every store needs: about, shipping, returns, and contact. None of it requires code, but all of it requires decisions, and each decision is yours to get wrong.",
          "Day to day, the workload flips. Etsy shops need constant listing work: titles and tags tuned for Etsy's search, photos refreshed, listings renewed every four months at $0.20 each. Shopify stores need marketing work instead: content, email, and ads to keep visitors coming. Neither platform runs itself; they just ask for different hours."
        ]
      },
      {
        "heading": "Payments, payouts, and taxes",
        "paragraphs": [
          "Both platforms pay you through their own payment systems. Etsy Payments is required for sellers in the United States and most other countries Etsy serves, and it accepts cards, PayPal, Apple Pay, and Google Pay. Deposits land in your bank account on a schedule you choose. Shopify Payments is optional: you can use it, or connect a third-party gateway and pay Shopify's extra 2% transaction fee on the Basic plan.",
          "Tax reporting is where sellers get surprised. For 2026, a marketplace or payment app must send you a Form 1099-K only when your gross payments through it pass $20,000 and you have more than 200 transactions in the year — both conditions must be met. That threshold was restored by the One, Big, Beautiful Bill Act in 2025, replacing a planned $600 threshold that never took effect. But card payments have no threshold at all: if you take card payments directly through your own Shopify store, the card processor can report them at any amount.",
          "No form does not mean no tax. Income from selling is taxable whether or not anyone sends you a 1099-K, and both platforms report gross sales — the total buyers paid, before fees, refunds, or shipping — so your own records decide what you actually owe. Keep a simple ledger from the first sale: revenue, fees, materials, and shipping, by month. If sales pass a few thousand dollars a year, talk to a tax professional about quarterly estimated payments, and check whether your state sets a lower 1099-K threshold of its own.",
          "Sales tax is simpler on Etsy than on Shopify. As a marketplace, Etsy calculates, collects, and remits sales tax on marketplace sales in most US states. On Shopify, you configure tax collection yourself: Shopify calculates rates at checkout, but you are responsible for registering, collecting, and filing in the states where you have nexus."
        ]
      },
      {
        "bullets": [
          "Under $600 a month in sales, no audience: start on Etsy.",
          "Over $600 a month, or an audience of your own: Shopify's flat fee pays for itself.",
          "Handmade, vintage, or craft supplies: Etsy's buyers are already looking for them.",
          "Products Etsy does not allow, or a brand you want to own: Shopify.",
          "Already selling on Etsy and growing: add Shopify for repeat buyers, keep Etsy for discovery."
        ],
        "heading": "When to pick each — and using both",
        "paragraphs": [
          "Etsy wins when you are starting out, testing a product, or selling a small volume of handmade, vintage, or craft-supply items — the categories Etsy is built for and where its buyers already shop. If your monthly sales are under roughly $600, Etsy is usually cheaper as well as easier, and the traffic alone justifies the percentage.",
          "Shopify wins when you have a brand to build, an audience of your own, repeat customers, or monthly sales comfortably above the break-even point. It also wins when your products do not fit Etsy's rules: mass-produced goods and anything outside handmade, vintage, and craft supplies belong on your own store.",
          "Many sellers use both, and that is often the right answer. Etsy brings discovery — new buyers who would never have found your store — while Shopify keeps the repeat business and the margin. A common setup is to list on Etsy, include a card with each order pointing buyers to your own store, and offer the full range and repeat-purchase perks there. Just do not try to divert Etsy transactions off the platform in your listings or messages: Etsy prohibits moving a transaction off Etsy, and shops have been suspended for it."
        ]
      }
    ],
    "seoTitle": "Shopify vs Etsy for Sellers: Fees, Traffic, Real Costs",
    "slug": "shopify-vs-etsy-for-sellers",
    "sources": [
      {
        "label": "Etsy — Fees & Payments Policy",
        "url": "https://www.etsy.com/legal/fees/"
      },
      {
        "label": "Etsy — Etsy Payments Policy",
        "url": "https://www.etsy.com/legal/etsy-payments/"
      },
      {
        "label": "Shopify — Pricing",
        "url": "https://www.shopify.com/pricing"
      },
      {
        "label": "IRS — Form 1099-K FAQs: General information",
        "url": "https://www.irs.gov/newsroom/form-1099-k-faqs-general-information"
      }
    ],
    "title": "Shopify vs Etsy for Sellers",
    "type": "Comparison",
    "updated": "2026-10-29"
  },
  {
    "cornerstone": false,
    "description": "An S corp election can cut self-employment tax, but the salary rule and running costs eat into the saving. Here is the math, the rules, and when it pays.",
    "faqs": [
      {
        "answer": "A tax election. An S corp starts as a corporation or an LLC and elects pass-through tax treatment by filing Form 2553. The election changes how the IRS taxes the business, not its legal form: a corporation stays a corporation, an LLC stays an LLC. The business files Form 1120-S, and shareholders report their share of profit on Schedule K-1.",
        "question": "Is an S corp a type of business or a tax election?"
      },
      {
        "answer": "It depends on income and salary. At $100,000 of net income with a $60,000 salary, the net saving is about $2,377 a year after the QBI deduction offset and FUTA, before running costs. At $60,000 of income the saving is about $608; at $150,000 it is about $5,589. Below roughly $60,000 of net income, the costs usually absorb the saving.",
        "question": "How much can an S corp save on taxes?"
      },
      {
        "answer": "What a comparable business would pay someone else for the same work, hours, and experience. The IRS gives no formula and weighs the facts of each case, including duties, time, and market pay. Pay the salary before taking distributions, and keep a written record of how you set it. A salary set far below market pay risks reclassification as wages, with back taxes and penalties.",
        "question": "What is a reasonable salary for an S corp owner?"
      },
      {
        "answer": "Yes. A domestic single-member LLC can file Form 2553 to be treated as an S corporation, and it does not need to file a separate entity-classification election first. The LLC keeps its state-law form and gains pass-through taxation with the salary-and-distribution split. All the usual limits apply, including the reasonable salary rule and the 100-shareholder cap.",
        "question": "Can a single-member LLC elect S corp status?"
      },
      {
        "answer": "No more than two months and 15 days after the start of the tax year the election should cover — March 15 for a calendar-year business — or any time during the preceding tax year. The form is filed by mail or fax. If you miss the deadline, late-election relief is available under Revenue Procedure 2013-30 for businesses that can show reasonable cause.",
        "question": "When is the Form 2553 deadline?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/what-is-an-s-corp.jpg",
    "imageAlt": "Flat-vector illustration of a small business storefront beside a large tax document and pencil",
    "inlineImage": "/images/what-is-an-s-corp-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a pie chart split between salary and distributions, with a balance scale",
    "intro": "An S corp is not a type of business. It is a tax election that lets a corporation or LLC pass its income through to its owners while splitting what the owner takes out into salary and distributions. Only the salary carries payroll tax, which is where the saving comes from.",
    "published": "2026-10-25",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "S-Corp Tax Savings Calculator",
        "url": "/freelance/s-corp-tax-savings-calculator"
      },
      {
        "name": "W2 vs 1099 Paycheck Calculator",
        "url": "/freelance/w2-vs-1099-calculator"
      }
    ],
    "sections": [
      {
        "heading": "What an S corp actually is",
        "paragraphs": [
          "An S corporation is a corporation — or an LLC taxed as one — that has elected to pass its income, losses, deductions, and credits through to its shareholders for federal tax purposes. The business itself generally pays no federal income tax. Instead, each shareholder reports a share of the profit on a personal return and pays tax at individual rates. The IRS states the point plainly: S corporations elect pass-through treatment, which lets them avoid the double taxation a C corporation faces when profits are taxed at the company level and again as dividends.",
          "The election changes how the business is taxed, not what it is. A corporation that elects S status is still a corporation under state law, with directors, officers, and shares. An LLC that elects S status is still an LLC under state law; the election only changes its federal tax treatment, and an eligible LLC does not need to file a separate entity-classification election first — Form 2553 does the job. What changes day to day is the paperwork: the business files its own return, Form 1120-S, and each shareholder receives a Schedule K-1 reporting their share of income.",
          "The election is made on Form 2553, signed by every shareholder. It takes effect for the tax year named on the form, provided the business meets the eligibility tests on that date and the form is filed on time. Miss a test later — add an ineligible shareholder, pass 100 shareholders, create a second class of stock — and the election ends. The limits in this guide are not formalities; they are the conditions the election rests on.",
          "One consequence catches new owners by surprise: shareholders owe income tax on their share of the company's profit whether or not the company distributes it. The K-1 reports your share of income, and it is taxable in that year even if the cash stays in the business to fund growth. Owners usually take distributions at least large enough to cover the tax on their share, and the company's operating agreement or bylaws should say so before the first profitable year."
        ]
      },
      {
        "heading": "How the tax saving works",
        "paragraphs": [
          "A sole proprietor pays self-employment tax on nearly all net profit. The rate is 15.3%: 12.4% for Social Security on net earnings up to the $184,500 wage base for 2026, plus 2.9% for Medicare with no cap. The tax applies to 92.35% of net earnings, not the full amount, which mirrors the employer share of payroll tax that a W-2 employee never sees. You owe it once net earnings reach $400. Above $200,000 of income for a single filer, or $250,000 for a married couple filing jointly, an additional 0.9% Medicare tax applies.",
          "An S corporation splits what the owner takes out. The owner-employee takes a salary, which runs through payroll and carries Social Security and Medicare tax — 7.65% withheld from the employee and 7.65% paid by the company, the same 15.3% in total. Profit above the salary can come out as a distribution, and distributions carry no payroll tax at all. That is the whole saving: the 15.3% that would have applied to the distribution slice under a sole proprietorship disappears.",
          "Federal income tax does not change. Salary and distributions both land on the owner's personal return, and both are taxed at the same individual income-tax rates. The election saves payroll tax only, and only on the part of profit that is not salary. It also has a ceiling: once the salary reaches the $184,500 Social Security wage base, the only payroll tax left to save on further distributions is the 2.9% Medicare portion."
        ]
      },
      {
        "heading": "Worked example: $100,000 of net income",
        "paragraphs": [
          "Take a freelancer with $100,000 of net business income and no other earnings. As a sole proprietor, self-employment tax applies to 92.35% of that, or $92,350. At 15.3%, the bill is $14,130. As an S corporation paying a $60,000 salary, payroll tax applies only to the salary: 15.3% of $60,000 is $9,180, split between the employee and employer halves. The remaining $35,410 of profit — after the salary and the $4,590 employer share of payroll tax — can come out as a distribution with no payroll tax. The gross payroll-tax saving is $4,950.",
          "Two offsets shrink that figure. First, the company owes federal unemployment tax (FUTA) on the salary: 6.0% on the first $7,000 of wages, reduced to 0.6% — $42 a year — when state unemployment taxes are paid on time and in full. Second, and larger, the salary shrinks the qualified business income (QBI) deduction, which the next section works through. After both offsets, the net saving at $100,000 of income is about $2,377 a year, before the cost of running the S corporation.",
          "The assumptions matter. The 22% marginal income-tax rate is an assumption for this example; at a higher marginal rate the QBI offset is larger and the net saving smaller. The $60,000 salary is also an assumption — it must be defensible as reasonable pay for the work, which has a section of its own below. State income tax is excluded: a few states tax S corporation income at the entity level, which would cut the saving further."
        ],
        "table": {
          "head": [
            "",
            "Sole proprietor",
            "S corp, $60,000 salary"
          ],
          "rows": [
            [
              "Self-employment or payroll tax",
              "$14,130",
              "$9,180"
            ],
            [
              "FUTA",
              "Not applicable",
              "$42"
            ],
            [
              "QBI deduction (20%)",
              "$18,587",
              "$7,082"
            ],
            [
              "Extra income tax from smaller QBI deduction (22% rate)",
              "—",
              "$2,531"
            ],
            [
              "Net effect vs sole proprietor",
              "—",
              "$2,377 saved"
            ]
          ]
        }
      },
      {
        "heading": "The QBI deduction trade-off",
        "paragraphs": [
          "The qualified business income deduction lets owners of pass-through businesses deduct up to 20% of their qualified business income. It applies to sole proprietors and S corporations alike, so the election does not win or lose the deduction itself. What it changes is the amount the deduction is calculated on. The IRS excludes amounts received as reasonable compensation from an S corporation from qualified business income. Every dollar of salary — plus the employer payroll tax on it — comes out of the QBI base.",
          "In the example above, the sole proprietor's QBI is $92,935: $100,000 of profit minus the $7,065 deduction for half of self-employment tax. The 20% deduction is worth $18,587. The S corporation's QBI is $35,410: profit minus the $60,000 salary and the $4,590 employer payroll tax. Its deduction is $7,082. The election gives up $11,505 of deduction, which costs $2,531 of extra income tax at a 22% marginal rate — more than half the payroll-tax saving.",
          "The trade-off has a simple shape. Each $1,000 of salary shrinks the QBI deduction by roughly $215, which costs about $47 of extra income tax at a 22% marginal rate — on top of the payroll tax the salary itself carries. The higher the salary the IRS would consider reasonable for your work, the smaller the remaining saving. That is why the election pays best for businesses where a large share of profit is not tied to the owner's personal labor, and why service businesses with one working owner see the thinnest gains."
        ]
      },
      {
        "heading": "The reasonable salary rule",
        "paragraphs": [
          "The IRS requires an S corporation to pay reasonable compensation to a shareholder-employee for services before it pays non-wage distributions. Corporate officers are employees by statute, and the fact that the officer is also the shareholder does not change that. The IRS can reclassify distributions as wages when the salary is too low, and the reclassified amounts carry back employment taxes, penalties, and interest.",
          "There is no formula. The IRS fact sheet on officer compensation says there are no specific guidelines for reasonable compensation in the Code or the regulations, and courts decide on the facts of each case. The factors courts weigh include training and experience, duties and responsibilities, time devoted to the business, dividend history, pay to non-shareholder employees, what comparable businesses pay for similar services, and compensation agreements. The popular 60/40 split — 60% salary, 40% distributions — is a rule of thumb, not IRS guidance, and it will not defend a salary on its own.",
          "The risk is real. In David E. Watson, P.C. v. United States (2012), an accountant paid himself a $24,000 salary while taking large distributions; the court upheld the IRS reclassification of a large part of the distributions as wages. Set the salary from evidence — what the market pays someone doing the same work, for the same hours, in the same area — and keep a written record of how you reached the number. A salary study from a compensation database, or a note from your CPA, costs little and is the first thing you would want if the IRS asked."
        ]
      },
      {
        "bullets": [
          "Payroll: salary paid through a payroll system, with federal income tax, Social Security, and Medicare withheld, plus state withholding where it applies.",
          "Form 941, filed quarterly, reporting wages and payroll taxes; Form 940, filed annually for FUTA; a W-2 for the owner-employee at year end.",
          "Form 1120-S, the S corporation return, due March 15 for a calendar-year business, with a Schedule K-1 for each shareholder.",
          "Separate books and a separate bank account. Mixing personal and business money complicates the return and weakens the separation the election depends on.",
          "State fees and filings: annual reports, franchise taxes, and state unemployment insurance, which vary by state. A few states also tax S corporation income at the entity level.",
          "Health insurance: premiums the company pays for a shareholder-employee who owns more than 2% must be reported as wages on the W-2, though the shareholder can generally deduct them on the personal return."
        ],
        "heading": "What it costs to run an S corp",
        "paragraphs": [
          "The election adds a second tax life to the business. The company runs payroll, files employment-tax returns, keeps its own books, and files its own return. None of this is hard, but all of it costs time or money, and the costs recur every year whether profit is up or down. A sole proprietor files one Schedule C; an S corporation owner files the company return, the payroll returns, and a personal return that now includes a W-2 and a K-1.",
          "Contractors do not change. Payments to independent contractors are still reported on Form 1099-NEC when they reach the reporting threshold — $2,000 per contractor for payments made in 2026, up from $600 under the One Big Beautiful Bill Act. The election changes how the owner is paid, not how vendors are paid."
        ]
      },
      {
        "heading": "The breakeven point",
        "paragraphs": [
          "The election pays when the net tax saving clears the added annual costs of payroll, bookkeeping, and tax preparation. Those costs vary too much to fix a single number, but the saving side of the equation is computable. The table below repeats the worked example at three income levels, using the same assumptions: a 22% marginal income-tax rate, the salary shown, and no state income tax.",
          "Two patterns show in the table. First, the saving grows faster than income: raising net income from $60,000 to $150,000 lifts the net saving roughly ninefold, because each extra dollar of profit above a fixed salary escapes payroll tax. Second, at $60,000 of income the saving is $608, which leaves little room for the payroll, bookkeeping, and tax-preparation costs the election adds. That is why the election rarely pays below about $60,000 to $80,000 of net income, and why it usually pays above $100,000 if the salary stays well below profit.",
          "The salary assumption drives everything. If the work justifies an $80,000 salary at $100,000 of income rather than $60,000, the distribution slice shrinks to $13,880 and the QBI offset overtakes the payroll-tax saving: the election would cost about $1,630 a year before admin costs. Service businesses, where the owner's labor generates most of the revenue, face the highest defensible salaries and the thinnest savings. Businesses with employees, equipment, or products — where profit is not mostly the owner's own hours — keep more of the gap."
        ],
        "table": {
          "head": [
            "Net business income",
            "Reasonable salary",
            "Payroll tax saved",
            "QBI offset + FUTA",
            "Net saving"
          ],
          "rows": [
            [
              "$60,000",
              "$40,000",
              "$2,358",
              "$1,750",
              "$608"
            ],
            [
              "$100,000",
              "$60,000",
              "$4,950",
              "$2,573",
              "$2,377"
            ],
            [
              "$150,000",
              "$80,000",
              "$8,954",
              "$3,365",
              "$5,589"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Domestic: the business must be a domestic corporation or a domestic entity eligible to elect corporate treatment, such as an LLC.",
          "No more than 100 shareholders. A spouse counts as one shareholder with the other spouse, and members of a family can count as one.",
          "Allowable shareholders only: individuals, certain trusts, estates, and certain exempt organizations. Partnerships, corporations, and nonresident aliens cannot be shareholders.",
          "One class of stock: all shares must carry identical rights to distributions and liquidation proceeds. Differences in voting rights are allowed.",
          "Not an ineligible corporation: certain banks, insurance companies, and domestic international sales corporations cannot elect.",
          "Every shareholder consents, signing Form 2553 or an attached consent statement."
        ],
        "heading": "Who can elect",
        "paragraphs": [
          "The IRS sets six tests, and every one must hold on the day of the election and every day after. Failing one ends the election, often without the owners noticing until a return is filed.",
          "The shareholder limits shape real decisions. Bringing in a foreign investor, issuing preferred shares to an investor, or selling a stake to another company all end the election. Businesses that plan to raise venture capital usually stay C corporations for exactly this reason. The one-class-of-stock rule also means distributions must be pro rata: an S corporation cannot pay one shareholder a larger share of profit than their ownership justifies."
        ]
      },
      {
        "bullets": [
          "Net income is below about $60,000, where the saving rarely covers the running costs.",
          "The business expects losses: pass-through losses are limited by the shareholder's basis in stock and debt, so losses may not be deductible in the year they occur.",
          "The owners want unequal distributions, or plan to bring in investors who cannot hold S corporation shares.",
          "The owner is unwilling to run payroll and keep separate books. Skipping payroll is the fastest route to a reclassification.",
          "The business operates in a state that taxes S corporation income heavily at the entity level — check the state treatment before electing, since the federal election does not control it."
        ],
        "heading": "How to elect, and when not to",
        "paragraphs": [
          "File Form 2553, signed by all shareholders, no more than two months and 15 days after the start of the tax year the election should take effect — March 15 for a calendar-year business — or at any time during the tax year before. The form is filed by mail or fax to the IRS service center for your state; it cannot be filed online. A business that misses the deadline is not necessarily out of luck: the IRS offers late-election relief under Revenue Procedure 2013-30 for businesses that can show reasonable cause, generally if the late election is filed within three years and 75 days of the intended effective date.",
          "Do not elect on the saving alone. The election is usually the wrong move when:",
          "If the numbers work, elect early in the tax year so the salary and distribution split covers the full year, and set the salary before the first distribution. Run the figures for your own income and salary with the S-Corp Tax Savings Calculator, and have a CPA confirm the salary before you file. The election applies to the full tax year once made, so the decision deserves an hour of arithmetic, not a guess."
        ]
      }
    ],
    "seoTitle": "S Corp Explained: Tax Savings, Salary Rules and Costs",
    "slug": "what-is-an-s-corp",
    "sources": [
      {
        "label": "IRS, S corporations",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/s-corporations"
      },
      {
        "label": "IRS, Self-employment tax (Social Security and Medicare taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "IRS, S corporation compensation and medical insurance issues",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues"
      },
      {
        "label": "IRS, Qualified business income deduction",
        "url": "https://www.irs.gov/newsroom/qualified-business-income-deduction"
      }
    ],
    "title": "What Is an S Corp and Should You Elect One?",
    "type": "What",
    "updated": "2026-10-25"
  },
  {
    "cornerstone": false,
    "description": "Learn how to invoice clients: what every invoice must include, payment terms that get you paid on time, processing fees, and chasing late payers.",
    "faqs": [
      {
        "answer": "No. As a sole proprietor you can invoice under your own legal name using your Social Security number, and many freelancers start that way. Registering a business name or forming an LLC becomes worth it when you want liability protection, a business bank account, or a more formal presence with larger clients. Either way, the invoice itself works the same — the client pays the name on it.",
        "question": "Do I need a registered business to invoice clients?"
      },
      {
        "answer": "Net 30 is the standard for business clients; Net 15 suits smaller jobs and first-time clients. Always print the due date as a calendar date, not just the term, and state the payment methods you accept. For jobs over a few hundred dollars, ask for a deposit — 50% upfront is common — and put the terms in the contract before work starts, not only on the invoice.",
        "question": "What payment terms should I put on an invoice?"
      },
      {
        "answer": "A late fee works only if the client agreed to it before the work began, so put it in the contract and repeat it on the invoice. Keep it modest and simple — a flat fee or a small monthly percentage on the overdue balance. Check your state's rules first: some states limit late fees on commercial invoices, and an unenforceable fee costs you credibility.",
        "question": "Should I charge a late fee?"
      },
      {
        "answer": "Yes. The $2,000 threshold for 2026 decides whether a client must send you Form 1099-NEC; it has nothing to do with whether the income is taxable. All invoiced income is reportable on Schedule C, including payments from clients who paid you under $2,000 and sent no form. Your own invoice records are the source of truth — reconcile them against your bank deposits at year end.",
        "question": "Do I owe tax on income if no 1099-NEC arrives?"
      },
      {
        "answer": "Keep them for at least three years after you file the tax return they support — that is the IRS's general period for assessing additional tax on a return. Keep them for six years if you underreported income by more than 25% of the gross income shown, and indefinitely if you never filed a return. Digital copies count, so scan paper invoices and store them with your tax records.",
        "question": "How long should I keep copies of invoices?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-invoice-clients.jpg",
    "imageAlt": "Flat-vector illustration of an invoice document with a checkmark seal and stacked coins",
    "inlineImage": "/images/how-to-invoice-clients-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a calendar, a clock, and an envelope with a coin",
    "intro": "An invoice is a request for payment, and getting paid on time starts before you send it. Agree the price, the due date, and how the client will pay before the work begins, then send an invoice when the work is done. This guide covers what to include, what payment costs, and what to do when a client pays late.",
    "published": "2026-11-06",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Freelance Project Pricing Calculator",
        "url": "/freelance/freelance-project-pricing-calculator"
      },
      {
        "name": "Stripe & PayPal Fee Calculator",
        "url": "/freelance/stripe-paypal-fee-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Your legal name or business name, address, and contact details",
          "The client's name and billing address",
          "A unique invoice number, sequential, never reused",
          "The invoice date and the payment due date",
          "A description of the work, specific enough that the client recognizes it",
          "The quantity and rate for each line item, or the flat fee",
          "The subtotal, any tax charged, and the total due",
          "Accepted payment methods and a payment link or bank details",
          "The payment terms you agreed before the work started",
          "Your tax ID (EIN or SSN) if the client needs it for their records"
        ],
        "heading": "What every invoice must include",
        "paragraphs": [
          "A client cannot pay an invoice they cannot read or cannot act on. Every invoice needs the same set of facts, in the same place, every time. If your invoicing tool fills most of them in automatically, check the template once and stop thinking about it.",
          "Two fields cause most payment delays: the due date and the payment instructions. An invoice that says \"due on receipt\" or carries no due date at all gives the client no deadline. An invoice without a payment link or bank details forces the client to email you to ask how to pay — and every extra step is a reason to put it off until later."
        ]
      },
      {
        "heading": "Agree payment terms before you start work",
        "paragraphs": [
          "Payment terms belong in the contract or the written quote, not on the invoice. By the time the invoice arrives, the client should already know the amount, the due date, and what happens if payment is late. Negotiating terms after the work is done hands the client the leverage: they have the deliverable, and you have an unpaid invoice.",
          "Net 30 — payment due 30 days after the invoice date — is the common default for business clients. For smaller jobs and first-time clients, Net 15 gets you paid sooner and costs you nothing to ask for. State the due date as a calendar date on the invoice (\"Due November 20, 2026\"), not just \"Net 30\": a date is harder to ignore than a term.",
          "For larger jobs, split the payment. A 50% deposit before you start and 50% on delivery means you are never owed more than half the fee at any point. On a $2,400 project, that is $1,200 before you begin and $1,200 when you deliver. For a $6,000 project, three milestones of $2,000 each — start, midpoint, delivery — keep cash flow steady and give the client three smaller approvals instead of one large one.",
          "A late fee only works if the client agreed to it before the work started. Put it in the contract, repeat it on the invoice, and keep it modest. Check your state's rules before you set a rate — some states cap what you can charge on late commercial payments, and a fee you cannot enforce is worse than none."
        ]
      },
      {
        "heading": "Price the job so the invoice covers your costs",
        "paragraphs": [
          "An invoice can only collect what the price already includes. Before you quote, work out what the job actually costs you: your time at your target hourly rate, software and subcontractor costs, payment processing fees, and the tax you will owe on the income. A flat fee that ignores any of these is a discount you gave yourself.",
          "Processing fees are the cost freelancers forget most often. If a client pays a $1,000 invoice by card through Stripe, you receive $970.70 after the 2.9% + 30¢ fee. To receive the full $1,000, charge $1,030.18: (1,000 + 0.30) ÷ (1 − 0.029). Build the fee into the quote, or accept the lower amount — but decide before you invoice, not after the money lands short.",
          "Use the Freelance Project Pricing Calculator to turn an hourly rate into a flat fee that covers costs and leaves a margin, and run the result through the Stripe & PayPal Fee Calculator to see what each payment method keeps. A five-minute check before you quote beats discovering a shortfall when the payment arrives."
        ]
      },
      {
        "heading": "Choose how clients pay — and what it costs you",
        "paragraphs": [
          "Every payment method takes a cut or costs you time. Bank transfers are cheapest; card payments are fastest to set up and easiest for the client. Offer at least two methods: a low-cost one for clients who will use it, and a card option for everyone else. The table below shows what each method keeps on a $1,000 invoice.",
          "International clients cost more. Stripe adds 1.5% for international cards, plus 1% if currency conversion is required. PayPal adds 1.5% to international commercial transactions. On a $1,000 invoice paid by an international card through Stripe, the fee is 4.4% + 30¢ — $44.30 — and you receive $955.70. For recurring international work, price the surcharge into the quote or ask the client to pay in US dollars by bank transfer.",
          "Paper checks cost nothing in fees and the most in time: mail delays, deposit runs, and a payment that can bounce after you have spent it. Take them if a client insists, but do not make them your default. A payment link on the invoice — card or bank — gets the money moving the day the client opens it."
        ],
        "table": {
          "head": [
            "Payment method",
            "Fee on a $1,000 invoice",
            "You receive"
          ],
          "rows": [
            [
              "Bank transfer (ACH) via Stripe",
              "0.8% — $8.00",
              "$992.00"
            ],
            [
              "Card via Stripe",
              "2.9% + 30¢ — $29.30",
              "$970.70"
            ],
            [
              "Card via PayPal invoicing",
              "2.99% + 49¢ — $30.39",
              "$969.61"
            ],
            [
              "PayPal account via PayPal invoicing",
              "3.49% + 49¢ — $35.39",
              "$964.61"
            ],
            [
              "Paper check",
              "No processing fee",
              "$1,000.00"
            ]
          ]
        }
      },
      {
        "heading": "Send the invoice the day the work is done",
        "paragraphs": [
          "Send the invoice the same day you deliver the work, while the value is fresh in the client's mind. An invoice that arrives a week later reads like an afterthought, and a client who has moved on to the next thing will take longer to approve it. If the contract sets a milestone, invoice the moment that milestone is accepted.",
          "Number invoices sequentially — 001, 002, 003 — and never reuse a number. Sequential numbers make it easy to spot a missing invoice, and they look professional to a client's accounts team. Keep a copy of every invoice you send, with the payment date and method recorded when it is paid. That record is your accounts receivable ledger, and it is what you will reconcile against your bank statements at tax time.",
          "If you invoice the same client every month, send on the same day each month and consider recurring invoicing if your tool supports it. Predictable billing gets processed faster because the client's accounts team can plan around it."
        ]
      },
      {
        "bullets": [
          "Day 1 after the due date: a brief email restating the invoice number, amount, and due date, with the invoice attached again.",
          "Day 7: a second email, same facts, asking when payment will be made.",
          "Day 14: a phone call. Ask for a specific payment date and note it.",
          "Day 30: a formal written notice restating the amount, the agreed terms, and a final date for payment."
        ],
        "heading": "Follow up on late payments without burning the relationship",
        "paragraphs": [
          "Most late payments are forgetfulness, not refusal. A short, polite reminder is usually all it takes — and the sooner you send it, the sooner you get paid. Silence helps no one: the client assumes you are not in a hurry, and the invoice sinks further down their list.",
          "Keep every message factual and short. State the invoice number, the amount, and the due date; do not apologize for asking for money you earned. If the client gives you a payment date, diary it and follow up the day after if nothing arrives. If a client will not pay at all, stop doing further work for them until the balance is settled — continuing to work for a non-paying client only increases what you are owed."
        ]
      },
      {
        "heading": "What invoicing means at tax time",
        "paragraphs": [
          "Every dollar you invoice is income, whether or not a client sends you a tax form. For payments made in 2026, a client must send you Form 1099-NEC only if they paid you $2,000 or more during the year — up from $600 for 2025 payments under section 70433 of Public Law 119-21. The threshold is measured per client across the whole year: three $700 payments add up to $2,100, so that client must file the form. Below the threshold, no form arrives, but the income is still taxable.",
          "Self-employment tax applies to your net earnings — your invoiced income minus business expenses — once net earnings reach $400 for the year. The rate is 15.3%: 12.4% for Social Security and 2.9% for Medicare, applied to 92.35% of net earnings. On $50,000 of net earnings, the taxable base is $46,175 and the SE tax is $7,064.78. You can deduct the employer-equivalent half of that tax when figuring your adjusted gross income.",
          "Because no employer withholds tax from invoice payments, set aside a share of every payment as you receive it — 25% to 30% is a common starting point — and pay estimated taxes quarterly. The IRS charges interest on underpaid estimates, so waiting until April to settle the year's tax is the expensive option. Your invoice records, kept for at least three years after you file the return they support, are the evidence if the IRS ever asks."
        ]
      }
    ],
    "seoTitle": "How to Invoice Clients and Get Paid on Time in 2026",
    "slug": "how-to-invoice-clients",
    "sources": [
      {
        "label": "IRS — Self-employment tax (Social Security and Medicare taxes)",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes"
      },
      {
        "label": "Congress.gov — Public Law 119-21, Section 70433 (1099 reporting threshold)",
        "url": "https://www.congress.gov/119/plaws/publ21/PLAW-119publ21.htm"
      },
      {
        "label": "Stripe — Pricing & fees",
        "url": "https://stripe.com/pricing"
      },
      {
        "label": "PayPal — Merchant fees",
        "url": "https://www.paypal.com/us/webapps/mpp/merchant-fees"
      }
    ],
    "title": "How to Invoice Clients (and Get Paid on Time)",
    "type": "How-to",
    "updated": "2026-11-06"
  },
  {
    "cornerstone": false,
    "description": "Substack takes 10% and Stripe takes 2.9% + $0.30, so a $5 subscription nets $4.02. See the fee math, conversion rates, and how many subscribers you need.",
    "faqs": [
      {
        "answer": "It depends on your free list and your conversion rate. Substack says 5% to 10% of free subscribers typically convert to paid. At $8 a month, 1,000 free subscribers at 5% conversion means 50 paid readers and about $331 a month net after fees. At 10,000 free subscribers and the same conversion, that rises to about $3,306 a month. There is no per-view pay — income comes only from paying readers and anything you sell them directly.",
        "question": "How much money can you make on Substack?"
      },
      {
        "answer": "Publishing is free, no matter how many subscribers you have — no monthly fee, no charge for sending emails. You pay only when a reader pays: Substack keeps 10% of each subscription payment, and Stripe charges 2.9% plus $0.30 per card payment plus a 0.7% recurring billing fee. The only optional cost is a custom domain, a one-time $50.",
        "question": "Is Substack free to use?"
      },
      {
        "answer": "For US-dollar Stripe accounts, the minimum is $5 a month and $30 a year. You set both prices — Substack does not offer an annual-only plan. You can also add a founding member plan at any amount above your annual price. If you change prices later, only new subscribers pay the new rate; existing subscribers stay on the price they signed up at.",
        "question": "What is the minimum price for a paid Substack?"
      },
      {
        "answer": "Less than most people assume, but more than a handful. At $8 a month you keep $6.61 per paid subscriber after fees, so $500 a month net needs about 76 paid subscribers. At Substack's 5% conversion figure, that means roughly 1,500 free subscribers. Sponsorships and products can add income sooner, since they pay per deal rather than per subscriber.",
        "question": "Do you need a lot of subscribers to earn on Substack?"
      },
      {
        "answer": "Subscription income is self-employment income, taxable whether or not you receive a tax form. Stripe reports card payments on Form 1099-K, and card payments have no reporting threshold — you can receive a 1099-K for any amount. The form reports gross payments before fees, so keep your own fee records. Sponsorship payments of $2,000 or more in 2026 arrive with a Form 1099-NEC.",
        "question": "How do taxes work on Substack income?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-make-money-on-substack.jpg",
    "imageAlt": "Flat-vector illustration of a laptop with a large envelope rising from its screen, beside a stack of coins, a potted plant, and a cup",
    "inlineImage": "/images/how-to-make-money-on-substack-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a mailbox with envelopes rising along stepped blocks toward a sprouting plant",
    "intro": "You make money on Substack when readers pay for subscriptions to your publication. Publishing is free, and Substack takes 10% of each paid subscription, with Stripe adding 2.9% plus $0.30 per payment and a 0.7% recurring billing fee. A $5 subscription nets you $4.02. The work is building a free list first, then converting a share of it to paid.",
    "published": "2026-11-02",
    "readMinutes": 13,
    "relatedTools": [
      {
        "name": "Substack Growth Predictor",
        "url": "/creator/substack-growth-predictor-simulator"
      },
      {
        "name": "Patreon Tier Optimization",
        "url": "/creator/patreon-tier-optimization"
      }
    ],
    "sections": [
      {
        "heading": "How Substack pays writers",
        "paragraphs": [
          "Substack is a newsletter platform. You publish posts that reach readers by email, on the web, and in the Substack app. Readers subscribe free, or pay a monthly or annual price you set. Substack does not pay you per read, per view, or per click. Your income comes only from readers who choose to pay — plus anything you sell to your audience yourself.",
          "The platform is large. Substack says it has 5 million paid subscriptions, and that more than half of new subscribers arrive through its built-in network: recommendations from other publications, the app, and Notes, its short-post feed. Over 30% of paid subscriptions start inside that network. That discovery is the main reason to publish on Substack instead of a standalone email tool: the platform itself brings you readers you did not find.",
          "The trade is the fee. Substack takes 10% of every paid subscription, and the rate does not fall as you grow or as you stay longer. In exchange you get hosting, email delivery, payment processing, and discovery, with no monthly charge. Whether that trade is good for you depends on how much of your audience the network delivers, and on how long you plan to stay — the 10% compounds over years."
        ]
      },
      {
        "heading": "The fees, line by line",
        "paragraphs": [
          "Publishing on Substack is free, no matter how many subscribers you have. You pay nothing to start, to write, or to send emails. Fees appear only when a reader pays, and three charges come out of each payment: Substack's fee, Stripe's card-processing fee, and Stripe's recurring billing fee.",
          "The 10% applies to monthly, annual, and founding member payments alike — there is no cheaper tier for larger publications. Stripe's card fee applies to every card payment; the Billing fee applies to every recurring payment, including direct debit and other non-card methods. Readers who subscribe inside the Substack iOS app may pay more to cover Apple's fees, and Substack's 10% is calculated on your web price, not the higher in-app price.",
          "The only other charge Substack lists is the optional custom domain: $50 once, if you want your publication's website on your own address instead of the free yourname.substack.com. Everything else — hosting, email sending, analytics, the app — is included in the 10%."
        ],
        "table": {
          "head": [
            "Fee",
            "Amount",
            "When it applies"
          ],
          "rows": [
            [
              "Substack fee",
              "10% of each subscription payment",
              "Every paid subscription payment"
            ],
            [
              "Stripe card processing",
              "2.9% + $0.30 per payment (US cards)",
              "Every card payment"
            ],
            [
              "Stripe Billing",
              "0.7% of each payment",
              "Every recurring payment, including non-card methods"
            ],
            [
              "Custom domain",
              "$50, one time",
              "Optional; your site otherwise lives at yourname.substack.com"
            ]
          ]
        }
      },
      {
        "heading": "What you keep from each subscription",
        "paragraphs": [
          "Take the $5 monthly plan, the cheapest paid subscription Substack allows. On a $5 payment, Substack keeps $0.50. Stripe takes 2.9% of $5, which is $0.145, plus $0.30 — $0.445 in total. The Billing fee is 0.7% of $5, or $0.035. Add them up: $0.50 + $0.445 + $0.035 = $0.98 in fees, and you keep $4.02, or 80.4% of the price.",
          "The same math at other prices shows a pattern: the fixed $0.30 Stripe charge weighs heaviest on small payments, so cheaper plans keep a smaller share. Annual payments keep more, because the $0.30 is charged once a year instead of twelve times.",
          "Two things follow. First, the $5 minimum is the worst-paying price point: you keep barely four dollars of every five. Second, the billing period matters as much as the price. A reader paying $10 a month sends $120 a year and nets you $100.08. A reader on a $100 annual plan sends $100 and nets you $86.10. The monthly reader is worth more per year — but only if they stay all twelve months. The annual reader has already paid."
        ],
        "table": {
          "head": [
            "Plan",
            "Substack (10%)",
            "Stripe card fee",
            "Stripe Billing (0.7%)",
            "Total fees",
            "You keep",
            "Share kept"
          ],
          "rows": [
            [
              "$5/month",
              "$0.50",
              "$0.45",
              "$0.04",
              "$0.98",
              "$4.02",
              "80.4%"
            ],
            [
              "$8/month",
              "$0.80",
              "$0.53",
              "$0.06",
              "$1.39",
              "$6.61",
              "82.6%"
            ],
            [
              "$10/month",
              "$1.00",
              "$0.59",
              "$0.07",
              "$1.66",
              "$8.34",
              "83.4%"
            ],
            [
              "$30/year",
              "$3.00",
              "$1.17",
              "$0.21",
              "$4.38",
              "$25.62",
              "85.4%"
            ],
            [
              "$100/year",
              "$10.00",
              "$3.20",
              "$0.70",
              "$13.90",
              "$86.10",
              "86.1%"
            ]
          ]
        }
      },
      {
        "heading": "Monthly vs annual pricing",
        "paragraphs": [
          "For US-dollar Stripe accounts, the minimum subscription price is $5 a month and $30 a year. You set both prices; Substack does not offer an annual-only plan, so every paid publication has a monthly price. You can also add a founding member plan at any amount above your annual price, for readers who want to pay more.",
          "Compare the two billing periods at the same headline price. A reader paying $5 a month for a full year sends $60 gross; fees come to $11.76, and you keep $48.24. The same reader on a $50 annual plan sends $50 gross; fees are $7.10, and you keep $42.90. The annual plan nets $5.34 less per reader per year — the price of the two months you gave away as a discount. What you buy with that $5.34 is certainty: the money arrives upfront, in one payment, and the reader is committed for twelve months instead of deciding whether to renew every month.",
          "Price the annual plan at roughly ten months of the monthly price — $50 a year against $5 a month, or $80 against $8 — so the discount is real and easy to explain. And set the price deliberately: when you change prices later, only new subscribers pay the new rate. Existing subscribers stay on the price they originally paid, so a raise does not lift revenue from the paid list you already have."
        ]
      },
      {
        "heading": "How many subscribers you need",
        "paragraphs": [
          "Substack says it tends to see 5% to 10% of free subscribers convert to paying subscriptions, with 10% a rate to aim for. Treat that as the platform's view of a healthy publication, not a promise. Conversion depends on how much of your best work sits behind the paywall, how long readers have followed you, and whether your topic is one people pay to read about.",
          "The table below turns that range into monthly income, at $8 a month per paid subscriber — $6.61 net after fees. Read it as scenarios, not forecasts: pick your free list size, pick a conversion rate, and the table gives you the paid count and the net monthly income.",
          "Run the same math at a cautious 2% before you plan around the higher numbers. At 2%, a list of 1,000 free subscribers yields 20 paid readers and about $132 a month net. The free list is the asset; paid revenue is a percentage of it. Every realistic income plan for Substack starts with how many free subscribers you can reach, not with the price you set.",
          "One more drag on these numbers: cancellations. The table assumes every paid subscriber stays. In practice some cancel each month, and monthly subscribers cancel more readily than annual ones, because each renewal is a fresh decision. Growth has to outrun churn before income rises — another reason to push readers toward the annual plan."
        ],
        "table": {
          "head": [
            "Free subscribers",
            "Paid at 5%",
            "Paid at 10%",
            "Net per month at 5%",
            "Net per month at 10%"
          ],
          "rows": [
            [
              "1,000",
              "50",
              "100",
              "$331",
              "$661"
            ],
            [
              "5,000",
              "250",
              "500",
              "$1,653",
              "$3,306"
            ],
            [
              "10,000",
              "500",
              "1,000",
              "$3,306",
              "$6,612"
            ],
            [
              "25,000",
              "1,250",
              "2,500",
              "$8,265",
              "$16,530"
            ]
          ]
        }
      },
      {
        "bullets": [
          "Original reporting, research, or analysis readers cannot find free elsewhere.",
          "Practical material with a direct payoff: templates, checklists, data, how-to walkthroughs.",
          "Recurring formats — a weekly briefing or a monthly deep dive — that give readers a reason to stay subscribed.",
          "Community access, such as subscriber chat or Q&A sessions, for paid readers only."
        ],
        "heading": "Deciding what goes behind the paywall",
        "paragraphs": [
          "The paywall is the one decision that shapes both growth and income. Everything free grows the list; everything paid earns from it. The wrong split either way costs you: too much behind the paywall and new readers have nothing to sample; too little and there is no reason to pay.",
          "A workable split for a weekly publication is one paid post for every two or three free ones, with the paid posts carrying the material readers cannot get elsewhere — original reporting, detailed analysis, templates, data. Free posts build trust and reach; paid posts reward the readers who fund the work. You choose free or paid for each post, so the split is adjustable week by week.",
          "Paywall the work with the clearest payoff, not the work you liked writing most. A reader deciding whether to pay asks one question: will the paid posts keep being worth it next month? A single strong paid post converts a reader once; a recurring paid format — a weekly briefing, a monthly deep dive, a regular data update — converts them and keeps them. Build the paid tier around something that repeats.",
          "Keep some of your best work free. That sounds backwards, but the free archive is your sales page: it is what a prospective subscriber reads before deciding. If the free posts are thin, readers assume the paid ones are too. The strongest free posts do double duty — they grow the list through recommendations and sharing, and they prove the paid tier is worth it."
        ]
      },
      {
        "bullets": [
          "Founding members. An optional annual tier at any price above your annual plan, for readers who want to support you beyond the standard price. Substack's 10% applies to founding member payments the same way.",
          "Pledges. Before you turn on payments, free readers can pledge to pay at a price you suggest. They enter payment details but are not charged. When you enable paid subscriptions, pledges convert to paid subscriptions automatically — a way to test demand before you charge.",
          "Paid podcasts and video. Substack hosts audio and video, and you can put episodes behind the same paywall as your written posts. One subscription covers everything; the fees are the same.",
          "Sponsorships. Sell a mention or placement in your newsletter directly to a brand. Substack takes no cut of a deal it does not process — the brand pays you directly, which has its own tax paperwork (see the taxes section).",
          "Products and services. A newsletter audience is also a customer list for books, courses, consulting, or workshops you sell elsewhere. Sales Substack does not process carry no platform fee."
        ],
        "heading": "The other ways to earn on Substack",
        "paragraphs": [
          "Paid subscriptions are the main income on Substack, but they are not the only one. The rest matter because they pay per deal or per supporter, not per subscriber — a small, trusted list can earn more from one sponsorship than from months of subscriptions.",
          "Sponsorships and products usually come after the list exists — sponsors want audience numbers, and a course needs buyers. But they change the economics of a small publication: one $500 sponsorship is worth about 76 paid subscribers for a month at $8 a month. Do not ignore them once your list is large enough to attract a buyer."
        ]
      },
      {
        "bullets": [
          "Publish on a schedule readers can expect. Weekly is the common cadence for a solo writer — frequent enough to stay visible, sustainable enough to keep up for a year.",
          "Keep a share of posts free permanently. The free archive is what new readers sample before they subscribe; a fully paywalled publication gives strangers nothing to judge.",
          "Recommend publications in your niche and ask for recommendations back. The recommendation system is the network's main engine, and it runs on reciprocity.",
          "Use Notes between posts. Short ideas, questions, and links reach readers who have not subscribed yet and cost far less time than a full post.",
          "Put the subscribe prompt in every post. A reader who just enjoyed your work is most likely to subscribe in that moment, not later."
        ],
        "heading": "Growing the free list first",
        "paragraphs": [
          "Nobody pays for a newsletter they have never read. The sequence that works is to publish free posts on a schedule, let Substack's network find readers, and add paid subscriptions once free readers ask for more. The free list is the funnel; everything else follows from its size.",
          "Substack's network does real distribution work. Recommendations let other publications point their readers at yours; Notes puts short posts in front of readers who do not subscribe yet; the app surfaces posts to people browsing by topic. Substack says more than half of new subscribers arrive through this network, and over 30% of paid subscriptions start inside it. A publication that ignores the network grows only as fast as its own promotion.",
          "Growth is slow at first, and that is normal. Each post is a new entry point, recommendations accumulate, and the list compounds — but the first hundred free subscribers take longer than the next thousand. The writers who earn on Substack are usually the ones who kept publishing through the slow months."
        ]
      },
      {
        "heading": "Setting up payments and getting paid",
        "paragraphs": [
          "Turning on payments takes four steps in Substack's Settings. Open Payments, click Connect with Stripe, and fill in the details Stripe requires — identity, bank account, and tax information. Then set your monthly, yearly, and founding member prices, and toggle Enable payments. Readers do not see paid options until you switch payments on, so you can set everything up before announcing anything.",
          "Stripe handles checkout and payouts. Each payment lands in your Stripe account with Substack's fee and Stripe's fees already deducted, and Stripe pays the balance out to your linked bank account. What arrives in your bank is the net amount — the 'you keep' figures in the fee table above are what you actually receive, not what you receive before a second round of charges.",
          "Two warnings from Substack's own setup guide. First, update prices in Substack's Settings, not in the Stripe dashboard — changing plans in Stripe can leave subscriptions in a bad state. Second, remember that price changes apply to new subscribers only; your existing paid readers keep the price they signed up at. And if you want your own web address, the custom domain costs $50 once — the only optional charge in the whole setup."
        ]
      },
      {
        "heading": "Taxes on Substack income",
        "paragraphs": [
          "Subscription income is self-employment income in the United States. It is taxable whether or not anyone sends you a tax form: the IRS states plainly that all income is taxable unless the law says it is not, even if you do not receive a Form 1099-K.",
          "Stripe reports your card payments on Form 1099-K, and card payments have no reporting threshold — Stripe can send you a 1099-K for any amount, even a single $5 subscription. The $20,000-and-200-transactions threshold you may have heard about applies to payment apps and marketplaces, not to card payments. The 1099-K reports gross payments, before Substack's and Stripe's fees, so keep your own record of the fees — they are deductible business expenses, and the gross figure on the form is not your taxable income.",
          "Direct payments are different. A brand that pays you for a sponsorship sends a Form 1099-NEC, and for 2026 the reporting threshold for nonemployee compensation is $2,000 — up from $600 under the One, Big, Beautiful Bill Act. A $500 sponsorship may arrive with no form at all, but the income is still taxable, and your own records are what prove it.",
          "Keep a ledger from the first payment: gross subscription revenue, fees, sponsorship income, and expenses such as the custom domain, by month. If the income grows past a few thousand dollars a year, expect quarterly estimated tax payments — self-employment income has no withholding, so the tax bill arrives in a lump if you do not pay as you go. A tax professional can set the quarterly amounts; the ledger is what makes that conversation cheap."
        ]
      }
    ],
    "seoTitle": "How to Make Money on Substack: Fees, Math, Realistic Income",
    "slug": "how-to-make-money-on-substack",
    "sources": [
      {
        "label": "Substack — How much does Substack cost?",
        "url": "https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost"
      },
      {
        "label": "Substack — How do I set up a paid publication?",
        "url": "https://support.substack.com/hc/en-us/articles/360037459952-How-do-I-set-up-a-paid-publication-on-Substack"
      },
      {
        "label": "Substack — Going Paid: A Guide to Paid Subscriptions",
        "url": "https://substack.com/going-paid-guide"
      },
      {
        "label": "IRS — Form 1099-K FAQs: General information",
        "url": "https://www.irs.gov/newsroom/form-1099-k-faqs-general-information"
      }
    ],
    "title": "How to Make Money on Substack",
    "type": "What",
    "updated": "2026-11-02"
  },
  {
    "cornerstone": false,
    "description": "Track business expenses: separate accounts, receipt capture, mileage logs, and Schedule C categories that cut your tax bill without an audit headache.",
    "faqs": [
      {
        "answer": "An expense is deductible when it is ordinary and necessary for your trade or business: ordinary means common in your line of work, necessary means helpful and appropriate. Office supplies, software, business travel, and professional services all qualify. Personal expenses never do, even if they help you work — a suit you wear to meetings is personal, not business. When an expense is partly personal, deduct only the business share.",
        "question": "What counts as a deductible business expense?"
      },
      {
        "answer": "No. Digital copies count as records, so a clear photo or scan of a receipt is enough, provided it shows the date, amount, seller, and what you bought. Add a note about the business purpose while you still remember it. Keep the files organized by year and category, and keep a backup — a phone that dies takes your receipts with it if the photos live only on the device.",
        "question": "Do I need to keep paper receipts?"
      },
      {
        "answer": "Log every business trip the day you drive it: the date, the destination, the business purpose, and the miles. The IRS standard rate for 2026 is 72.5 cents per mile from January through June and 76 cents from July through December. A mileage app can record trips automatically; a notebook works too. Keep the log with your tax records, and add business tolls and parking on top.",
        "question": "How do I track mileage for taxes?"
      },
      {
        "answer": "Yes, if you are self-employed and use part of your home regularly and exclusively for business. The simplified method pays $5 per square foot up to 300 square feet, a maximum of $1,500 a year, with no Form 8829. W-2 employees cannot claim it. The space must be used only for business — a desk in a room you also live in does not qualify.",
        "question": "Can I deduct my home office?"
      },
      {
        "answer": "At least three years after you file the tax return they support — that is the IRS's general period for assessing additional tax. Keep them for six years if you underreported income by more than 25% of the gross income shown, and indefinitely if you never filed a return. Digital copies count, so store scanned receipts and statements with your tax files, with a backup.",
        "question": "How long should I keep expense records?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-track-business-expenses.jpg",
    "imageAlt": "Flat-vector illustration of a stack of receipts, a calculator, a ledger book with a pencil, and a jar of coins",
    "inlineImage": "/images/how-to-track-business-expenses-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a car on a winding road with a map pin, a mileage log book, and a fuel pump",
    "intro": "Tracking business expenses means recording every business cost — when you paid it, what it was for, and how much — so you can deduct it at tax time and know what your business really earns. Use a separate business account, capture receipts the day you spend, log miles as you drive, and reconcile monthly.",
    "published": "2026-11-12",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Business Vehicle Tax Deduction Calculator",
        "url": "/freelance/business-vehicle-tax-deduction-calculator"
      },
      {
        "name": "Profit Margin Calculator",
        "url": "/ecommerce/profit-margin-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Separate business money from personal money",
        "paragraphs": [
          "Open a business bank account and a business card, and run every business dollar through them. The account does half the tracking for you: your bank statement becomes a dated list of business spending, and at tax time you are not picking business purchases out of grocery runs and streaming subscriptions.",
          "Mixing money costs more than time. If a personal card pays for a business expense, you must prove it was business — with a receipt and a note — every single time. Miss the note and the deduction is hard to defend. A separate account also gives you a clean profit picture: money in minus money out is your business result, not a guess.",
          "Keep a simple rule: if the business pays, it pays from the business account. If you ever pay from a personal card by mistake, reimburse yourself the same week and note the expense. One account, one card, no exceptions."
        ]
      },
      {
        "heading": "Capture every receipt the day you spend",
        "paragraphs": [
          "A receipt you capture today is a deduction you keep; a receipt you mean to file later is one you will lose. Photograph or scan every business receipt the day you spend — paper fades, and a shoebox of crumpled slips is not a system. A digital copy counts as a record, so the photo on your phone is enough once the original is readable.",
          "Each record needs four facts: the date, the amount, the seller, and the business purpose. The receipt usually covers the first three. The purpose is the part people skip, and it is the part the IRS asks about. A $42 office-store receipt says nothing by itself; a note reading \"printer paper and ink for client proposals\" says everything. Write the note on the receipt or in the file name the same day, while you still remember why you bought it.",
          "For recurring costs — software subscriptions, phone bills, rent — save the monthly statement or invoice instead of a receipt. The statement shows the date, the amount, and the vendor; add a standing note about the business use once, and the monthly record is complete."
        ]
      },
      {
        "heading": "Sort expenses into categories that match Schedule C",
        "paragraphs": [
          "Categories are what turn a pile of receipts into a tax return. Schedule C, the form sole proprietors use to report business income and expenses, groups expenses into fixed lines. If your categories match those lines, filling in the form is a matter of adding up columns instead of re-sorting a year's worth of spending.",
          "Use the table below as your category list. Keep it short — ten to fifteen categories cover most freelancers and small businesses. A category with one $12 entry is clutter; fold small one-offs into office expense or supplies instead of inventing a line for each.",
          "When an expense fits two categories, pick the one that describes what you bought, not what you used it for, and stay consistent. A laptop is office expense or depreciation, not advertising, even if you use it to design ads. Consistency matters more than perfection: the same expense in the same category every month is easy to total and easy to explain."
        ],
        "table": {
          "head": [
            "Expense category",
            "Schedule C line",
            "Examples"
          ],
          "rows": [
            [
              "Advertising",
              "Line 8",
              "Online ads, business cards, website hosting"
            ],
            [
              "Car and truck expenses",
              "Line 9",
              "Mileage at the IRS rate, or actual vehicle costs"
            ],
            [
              "Contract labor",
              "Line 11",
              "Freelancers and subcontractors you paid"
            ],
            [
              "Insurance",
              "Line 15",
              "Business liability and professional liability premiums"
            ],
            [
              "Legal and professional services",
              "Line 17",
              "Accountant, lawyer, bookkeeper"
            ],
            [
              "Office expense",
              "Line 18",
              "Software, stationery, small equipment"
            ],
            [
              "Rent or lease",
              "Line 20",
              "Office rent, equipment leases"
            ],
            [
              "Supplies",
              "Line 22",
              "Materials and supplies not held for sale"
            ],
            [
              "Utilities",
              "Line 25",
              "Business share of phone, internet, electricity"
            ],
            [
              "Business use of your home",
              "Line 30",
              "Simplified home-office amount"
            ]
          ]
        }
      },
      {
        "heading": "Log business miles as you drive them",
        "paragraphs": [
          "Vehicle costs are the easiest deduction to lose and the easiest to keep. The IRS lets you deduct business driving at a standard rate per mile instead of tracking every gas receipt and repair bill. For 2026 the rate is 72.5 cents per mile for driving from January 1 through June 30, and 76 cents per mile from July 1 through December 31. Business parking fees and tolls are deductible on top of the mileage rate.",
          "Your log is what makes the deduction real. Publication 463 asks for the mileage of each business trip, the date, the destination, and the business purpose, plus your car's total miles for the year. A notebook in the glove box works; a mileage app that records trips automatically works better. Either way, log the trip the day you drive it — a log reconstructed months later from a calendar is the first thing an examiner questions.",
          "Worked example: you drive 4,000 business miles in the first half of 2026 and 5,000 in the second half. The first half is worth 4,000 × $0.725 = $2,900; the second half is 5,000 × $0.76 = $3,800. The year's mileage deduction is $6,700, plus any business tolls and parking you paid. Commuting from home to a regular workplace does not count — only driving for business purposes does.",
          "You can also deduct actual vehicle costs — gas, insurance, repairs, depreciation — in proportion to business use, but that means tracking every vehicle bill and choosing the method in the first year the car is used for business. Run the numbers both ways with the Business Vehicle Tax Deduction Calculator before you commit; the standard rate wins for most freelancers who drive a personal car part-time for work."
        ]
      },
      {
        "heading": "Track the home office and other shared costs",
        "paragraphs": [
          "A home office deduction needs two things: a space used regularly and exclusively for business, and a method for valuing it. Exclusive means the space is used only for business — a desk in the corner of a room you also live in does not qualify. A spare room used only as an office does.",
          "The simplified method is the easy option: multiply the office's square footage by $5, up to 300 square feet, for a maximum deduction of $1,500 a year. A 120-square-foot office gives 120 × $5 = $600. A 300-square-foot office hits the cap at $1,500. You enter the amount on Schedule C, line 30, and you do not need to file Form 8829 or track home expenses.",
          "The regular method deducts the business share of actual home costs — rent or mortgage interest, utilities, insurance — but it needs Form 8829, detailed records, and a depreciation calculation. It pays off when home costs are high and the office is a large share of the home; otherwise the simplified method's $1,500 cap is close enough to not be worth the paperwork.",
          "Shared costs outside the home work the same way: deduct the business share. If your phone plan costs $80 a month and about 70% of your use is business, the business share is $56 a month, or $672 a year. Pick a percentage you can support — call logs or a time diary — and use it consistently all year."
        ]
      },
      {
        "bullets": [
          "Match every bank and card transaction to a receipt or invoice.",
          "Categorize anything uncategorized while you still remember it.",
          "Move the month's tax set-aside into the savings account.",
          "Check for subscriptions you no longer use and cancel them."
        ],
        "heading": "Reconcile monthly and set money aside for tax",
        "paragraphs": [
          "Reconciling means comparing your expense records against your bank and card statements and fixing the gaps. Do it monthly, not in April: a missing receipt from last month is findable, a missing receipt from eleven months ago is gone. A monthly pass takes about 30 minutes once the system runs, and it catches duplicate charges, forgotten subscriptions, and uncategorized expenses.",
          "Monthly totals also tell you what the business actually earns. Gross income minus expenses is net profit, and net profit is what you pay tax on — income tax plus self-employment tax of 15.3% on 92.35% of net earnings. On $60,000 of net earnings, the self-employment tax base is $55,410 and the tax is $8,477.73. The qualified business income deduction can then cut the income-tax side by up to 20% of qualified business income for many sole proprietors.",
          "Because no employer withholds tax from your business income, set aside money from every payment as it arrives. A common starting point is 25% to 30% of net profit, adjusted once you know your real rate. On $5,000 of monthly net profit, that is $1,250 to $1,500 into a separate savings account. Pay estimated taxes quarterly — waiting until April triggers interest on underpaid estimates.",
          "Knowing your true costs also sharpens pricing. If a project brings in $2,000 and costs $650 in expenses, the margin is $1,350, or 67.5%. Run your real numbers through the Profit Margin Calculator before you quote the next job — a price that looks profitable before expenses often is not."
        ]
      },
      {
        "heading": "Keep your records for at least three years",
        "paragraphs": [
          "The IRS can generally assess additional tax for three years after you file a return, so keep the records behind each return for at least three years after the filing date. Keep them for six years if you underreported income by more than 25% of the gross income shown on the return, and indefinitely if you never filed. Digital copies count, so scanned receipts and exported statements stored with your tax files are enough — but keep a backup.",
          "Year-end is also when you settle up with the people you paid. If you paid any freelancer or contractor $2,000 or more during 2026, you must send them Form 1099-NEC by January 31, 2027, and file a copy with the IRS. The threshold rises to $2,100 for payments made in 2027. Your expense records are what make this possible: without a categorized list of contractor payments, you cannot say who crossed the threshold."
        ]
      }
    ],
    "seoTitle": "How to Track Business Expenses: A 2026 Guide That Works",
    "slug": "how-to-track-business-expenses",
    "sources": [
      {
        "label": "IRS — Standard mileage rates",
        "url": "https://www.irs.gov/tax-professionals/standard-mileage-rates"
      },
      {
        "label": "IRS — Simplified option for home office deduction",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/simplified-option-for-home-office-deduction"
      },
      {
        "label": "IRS — Publication 463, Travel, Gift, and Car Expenses",
        "url": "https://www.irs.gov/publications/p463"
      },
      {
        "label": "IRS — Recordkeeping",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping"
      }
    ],
    "title": "How to Track Business Expenses",
    "type": "How-to",
    "updated": "2026-11-12"
  },
  {
    "cornerstone": false,
    "description": "Learn exactly how to write a freelance contract that protects your pay: scope, payment terms, ownership, kill fees, and the clauses every agreement needs.",
    "faqs": [
      {
        "answer": "Yes. Small projects cause the same disputes as large ones — unpaid invoices, extra revisions, arguments about what was agreed — and a $300 project can cost you more in lost time than it pays. A short agreement covering scope, price, payment date, and ownership is enough for small jobs. Keep a one-page template so signing adds minutes, not hours, to the project.",
        "question": "Do I need a contract for a small project?"
      },
      {
        "answer": "An email thread can record an agreement, but it leaves gaps a contract closes: late fees, revision limits, ownership transfer, and cancellation terms rarely appear in emails. A signed document also proves both sides agreed to the same terms. If a client will only work by email, send a summary of scope, price, and payment terms and ask for a written reply confirming them.",
        "question": "Is an email agreement enough instead of a contract?"
      },
      {
        "answer": "Name the due date, the late fee, and when you can pause work. Common terms: invoices due within 15 or 30 days, a late fee of 1.5% per month on overdue balances, and the right to pause work if an invoice is more than 14 days overdue. State that the client owes the fee and any collection costs. Keep the fee modest — its job is to prompt payment, not to punish.",
        "question": "What should my contract say about late payment?"
      },
      {
        "answer": "Ownership without a written clause depends on the type of work, the state, and the facts of the engagement, which is exactly the uncertainty a contract removes. Without a clause, you may find you cannot reuse your own methods or show the work in your portfolio, or the client may claim broader rights than you intended. Always state who owns the deliverables and when ownership transfers.",
        "question": "Who owns the work if my contract says nothing about ownership?"
      },
      {
        "answer": "Yes, with project-specific details filled in each time: the client name, deliverables, price, dates, and any special terms. Review the template once a year and after any dispute — if a clause caused confusion, rewrite it. For projects above your usual value, or involving unusual rights such as exclusivity, have a lawyer review the contract before you sign.",
        "question": "Can I use the same contract template for every client?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/how-to-write-a-freelance-contract.jpg",
    "imageAlt": "Flat-vector illustration of a freelancer signing a contract at a desk, with a pen, stacked documents, and a laptop in emerald and orange tones",
    "inlineImage": "/images/how-to-write-a-freelance-contract-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of two hands shaking over a signed agreement, beside a wall calendar and a stack of coins, in emerald, sage, and burnt orange",
    "intro": "A freelance contract is a signed written agreement that names the work, the price, the payment schedule, and who owns the finished product. It protects you when a client expands the scope, pays late, or disputes what was agreed. Write one before any work starts, get it signed, and keep a copy. This guide walks through each clause.",
    "published": "2026-11-09",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Client Lifetime Value (LTV) Calculator",
        "url": "/freelance/client-lifetime-value-calculator"
      }
    ],
    "sections": [
      {
        "bullets": [
          "Full legal names and contact details for you and the client",
          "A description of the work: deliverables, quantities, and formats",
          "The total price, or the hourly rate and how hours are tracked",
          "The payment schedule: deposit, milestones, and due dates",
          "Delivery dates and what happens if the client is late with feedback or materials",
          "The number of revision rounds included, and the price of extra rounds",
          "Intellectual property: who owns the work, and when ownership transfers",
          "Confidentiality terms, if you will see the client's private information",
          "How either side can end the agreement, and what is owed on cancellation",
          "Governing law: the state whose law applies if there is a dispute"
        ],
        "heading": "What every freelance contract must cover",
        "paragraphs": [
          "A contract does not need legal jargon to work. It needs clear answers to the questions that cause disputes: what you will deliver, when, for how much, and what happens when plans change. This guide is practical how-to content, not legal advice. For high-value or unusual projects, have a lawyer review your template once, then reuse it.",
          "Keep one template and adjust the project details each time. A template you reuse is faster than a fresh document per client, and consistency means you learn which clauses clients push back on."
        ]
      },
      {
        "heading": "Write the scope so it cannot grow",
        "paragraphs": [
          "Scope creep is the most common way a profitable project turns into a loss. It starts small: one extra page, one more revision, a quick call that becomes a second round of strategy. Each addition is small; together they can double your hours on a fixed fee.",
          "Name every deliverable in the contract with a quantity. \"Website copy\" is vague. \"Five web pages, up to 600 words each, delivered as Google Docs\" is a scope you can price and defend. List what is not included too: design, photography, and search optimization are separate services unless the contract says otherwise.",
          "Price the extras in advance. If a $3,000 project covers five pages, your per-page rate is $600. When the client asks for two more pages, the answer is already in the contract: 2 x $600 = $1,200, added by a written change order before you start the extra work. A change order is a short signed note that describes the added work and its price.",
          "Tie the scope to a client obligation. Your delivery date should depend on the client supplying materials and feedback by stated dates. If the client sends the brand assets two weeks late, your deadline moves two weeks. Write that into the contract, or the delay becomes your problem."
        ]
      },
      {
        "heading": "Set payment terms that get you paid",
        "paragraphs": [
          "Payment terms are the part of the contract that most directly protects your income. Three decisions matter: how much you collect before you start, when the rest is due, and what happens when payment is late.",
          "Take a $4,800 project on a 50% deposit. You collect $2,400 before you start and invoice the remaining $2,400 on delivery. If the client pays 30 days late and your contract charges 1.5% per month on overdue balances, the late fee is $2,400 x 1.5% = $36 for that month. The fee itself is small; its purpose is to make late payment a cost, not a habit.",
          "State how you will be paid and who pays the fees. Name the method — bank transfer, check, or a payment platform — and say whether platform fees come out of your price or are added to the invoice. A 3% platform fee on a $4,800 project is $144; decide in advance who absorbs it."
        ],
        "table": {
          "head": [
            "Structure",
            "How it works",
            "Best for"
          ],
          "rows": [
            [
              "Upfront deposit",
              "Client pays 30-50% before work starts; balance on delivery",
              "New clients and fixed-fee projects"
            ],
            [
              "Milestone payments",
              "Fee split across stages, for example 3 payments of $1,600 on a $4,800 project",
              "Long projects with clear stages"
            ],
            [
              "Monthly retainer",
              "Fixed monthly fee for an agreed amount of work",
              "Ongoing clients with steady needs"
            ],
            [
              "Net 15 or net 30",
              "Invoice due 15 or 30 days after delivery",
              "Established clients with a payment history"
            ]
          ]
        }
      },
      {
        "heading": "Decide who owns the work",
        "paragraphs": [
          "Ownership of your work is not automatic. A contract should state exactly what transfers to the client, when it transfers, and what you keep. The usual arrangement for freelancers is simple: the client owns the finished deliverables once the invoice is paid in full, and you keep the right to show the work in your portfolio.",
          "Transfer on payment protects you. If the client has not paid, they do not yet own the work, which gives you leverage in a payment dispute. State this in plain words: \"Ownership of the deliverables transfers to the client when the final invoice is paid in full.\"",
          "Separate the deliverables from your working files and reusable material. Source files, templates, and code libraries you built before the project stay yours unless the contract sells them. If a client wants the source files, price that separately — handing over editable originals removes your control over future changes and reuse.",
          "Watch for work-for-hire language. Some client contracts label everything \"work made for hire,\" which can transfer ownership of even your reusable methods and templates. Read that clause before you sign. If it is broader than the deliverables, ask for it to be narrowed to the finished work only."
        ]
      },
      {
        "heading": "Cover revisions, deadlines, and cancellation",
        "paragraphs": [
          "Revision rounds are where fixed-fee projects lose money. Include a number in the contract — two rounds is standard for most creative work — and define a round as one consolidated set of client feedback, not a drip of comments over weeks. Extra rounds are billed at your hourly rate or a stated flat fee.",
          "Set deadlines for the client as well as for yourself. A common clause gives the client five business days to review each deliverable. If feedback arrives after that window, the delivery date moves by the same number of days. Without this, a slow client can push your schedule while your fee stays fixed.",
          "Add a cancellation clause with a kill fee. A typical structure: if the client cancels before work starts, they lose the deposit; if they cancel after the first draft, they owe 50% of the remaining fee. On a $2,000 project with a $1,000 deposit already collected, a 50% kill fee on the unpaid $1,000 balance is $500 — so you keep $1,500 for work that is already done.",
          "Also cover your own right to end the project. If a client misses two payments or stops responding for 14 days, you should be able to pause work and, after written notice, cancel. State the notice period — seven days is common — and that fees for completed work remain due."
        ]
      },
      {
        "heading": "State your independent contractor status",
        "paragraphs": [
          "Your contract should state that you are an independent contractor, not an employee. That single sentence supports the tax treatment both sides rely on: the client does not withhold payroll taxes, and you pay your own income and self-employment taxes. The IRS decides worker status from the facts of the working relationship — behavioral control, financial control, and the type of relationship — not from the contract label alone, so the way you actually work must match the words.",
          "Exchange paperwork at the start. Give the client a completed Form W-9 with your name, address, and taxpayer identification number so they can report your payments correctly. Clients report payments to noncorporate service providers on Form 1099-NEC. For 2026, the reporting threshold is $2,000, rising to $2,100 for 2027. Keep your own records regardless — a missing form does not change what you owe.",
          "The Department of Labor applies its own test under the Fair Labor Standards Act, using an economic-reality analysis. If a client controls your hours, supplies your tools, and treats you like staff, a contract label will not change the classification. Freelancers who set their own schedules, work for multiple clients, and use their own equipment fit the independent contractor pattern."
        ]
      },
      {
        "heading": "What to do when a client won't sign",
        "paragraphs": [
          "Some clients resist signing. The usual reasons are speed (\"just start, we'll sort the paperwork later\"), habit (they have never used contracts), or a clause they dislike. Speed is the weakest reason: a one-page agreement takes less time to sign than a payment dispute takes to resolve. Offer to start with a short version covering scope, price, payment, and ownership, and add the rest on the next project.",
          "If a client refuses a specific clause, negotiate the clause, not the contract. A client who objects to a 50% deposit may accept 30% upfront with the balance split across two milestones. A client who objects to a late fee may accept a shorter payment window. Every concession should trade for something: a smaller deposit for faster milestone payments, for example.",
          "Know your walk-away point. A client who will not agree to any written terms is telling you how they handle disagreements. Compare the project fee with the value of a good long-term client: a retainer client paying $800 a month is worth $9,600 over a year. One unsigned project is not worth the risk to your time, and a client who signs is more likely to become the retainer client who stays.",
          "Before you send the contract, run a final check: names and dates correct, deliverables listed with quantities, price and payment dates match your quote, revision rounds stated, ownership clause present, and both signature lines ready. Send it as a PDF, and do not start billable work until the signed copy is back."
        ]
      }
    ],
    "seoTitle": "How to Write a Freelance Contract: Clauses That Protect You",
    "slug": "how-to-write-a-freelance-contract",
    "sources": [
      {
        "label": "IRS — Independent contractor (self-employed) or employee",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee"
      },
      {
        "label": "IRS — About Form 1099-NEC, Nonemployee Compensation",
        "url": "https://www.irs.gov/forms-pubs/about-form-1099-nec"
      },
      {
        "label": "IRS — About Form W-9, Request for Taxpayer Identification Number and Certification",
        "url": "https://www.irs.gov/forms-pubs/about-form-w-9"
      },
      {
        "label": "U.S. Department of Labor — Misclassification of employees as independent contractors under the FLSA",
        "url": "https://www.dol.gov/agencies/whd/flsa/misclassification"
      }
    ],
    "title": "How to Write a Freelance Contract",
    "type": "How-to",
    "updated": "2026-11-09"
  },
  {
    "cornerstone": false,
    "description": "No Etsy sales usually means one of five problems: no traffic, weak listings, wrong pricing, thin margins, or no trust. Find yours and fix it in order.",
    "faqs": [
      {
        "answer": "There is no set timeline. A shop with 30 listings aimed at specific searches can sell in its first week, while a shop with 5 listings in a crowded category can wait months. What matters is whether shoppers find you and whether the listing convinces them. If 30 days pass with steady visits and no orders, the problem is usually price, photos, or trust, not time, and each of those has a fix.",
        "question": "How long does it take for an Etsy shop to get its first sale?"
      },
      {
        "answer": "There is no magic number, but every listing is another entry point in search, so a shop with 5 listings gives buyers little reason to browse and gives search little to surface. Aim for 20 to 30 solid listings as a starting point, each with a full title, all 13 tags, and complete attributes. Ten well-built listings beat fifty rushed ones, because a listing that does not match any search adds nothing.",
        "question": "How many listings does an Etsy shop need to sell?"
      },
      {
        "answer": "Only after you know why it is not selling. If visits are near zero, price is not the problem, because nobody sees the price; fix titles and tags first. If visits are healthy but orders are not, compare your price with the five closest listings for the same kind of item. Before you cut anything, run the fee math: a $1.50 cut on a $15 item can take nearly 30% of what you keep after fees and costs.",
        "question": "Should I lower my prices if my Etsy shop is not selling?"
      },
      {
        "answer": "Etsy Ads buy visits, not sales, so they only help once the listing converts. Test the math before you spend: divide ad spend by the orders it produced. If $60 of ads produced 4 orders, your acquisition cost is $15 per order. If you keep less than $15 per order after fees and costs, the ads lose money. Fix photos, descriptions, and pricing first, then use ads to send traffic to listings that already sell.",
        "question": "Do Etsy Ads help a shop with no sales?"
      },
      {
        "answer": "Views with no sales mean shoppers find the listing and decide against it. The usual reasons are the total cost once shipping is added, photos that do not show scale or detail, a long or unclear processing time, or no reviews on a new shop. Check the listing the way a buyer sees it: first photo, price plus shipping, delivery date, and reviews. Fix the weakest of those four first, then watch the next 30 days of stats.",
        "question": "Why am I getting views but no sales on Etsy?"
      }
    ],
    "hub": "Freelance, Creator & Business",
    "image": "/images/why-your-etsy-shop-isnt-selling.jpg",
    "imageAlt": "Flat-vector illustration of a small empty online shop storefront with a large magnifying glass over it, in deep emerald, burnt orange, and sage on a cream background",
    "inlineImage": "/images/why-your-etsy-shop-isnt-selling-inline.jpg",
    "inlineImageAlt": "Flat-vector illustration of a price tag and calculator beside shipping boxes with a small sprouting plant, in deep emerald, burnt orange, and sage on a cream background",
    "intro": "An Etsy shop with no sales usually has one of five problems: shoppers never find it, the price puts them off, the listing fails to convince them, the shop looks untrustworthy, or the margin never worked. This guide shows you how to find which one is yours, with real fee and margin numbers, and fix them in order.",
    "published": "2026-11-16",
    "readMinutes": 8,
    "relatedTools": [
      {
        "name": "Etsy Fee Calculator",
        "url": "/ecommerce/etsy-fee-calculator"
      },
      {
        "name": "Customer Acquisition Cost",
        "url": "/ecommerce/customer-acquisition-cost-calculator"
      }
    ],
    "sections": [
      {
        "heading": "Diagnose before you change anything",
        "paragraphs": [
          "Do not start by redesigning your shop or cutting prices. Start in Shop Manager, under Stats, which shows visits, favorites, and orders for each listing over the last 30 days. Those three numbers tell you where the funnel breaks, and each break has a different fix.",
          "Work the funnel backward. If visits are near zero, the problem is discovery: your listings are not matching searches. If visits are healthy but favorites are rare, shoppers see your listing and move on, which points to the first photo or the price. If favorites pile up but orders do not follow, shoppers like the product and hesitate at the total cost, the shipping time, or the lack of reviews. Guessing which stage fails wastes weeks; the stats take five minutes.",
          "Put a number on it. A shop with 1,000 visits and 10 orders converts at 1%. Doubling visits to 2,000 at the same rate gives 20 orders; doubling the conversion rate to 2% at the same traffic also gives 20 orders. Most struggling shops need the second fix first, because traffic you cannot convert is traffic you pay for twice, once in listing fees and again in ads."
        ]
      },
      {
        "heading": "Nobody finds your listings",
        "paragraphs": [
          "Etsy search matches shoppers to listings using the title, tags, attributes, category, and description. If your title reads like a brand slogan instead of a product description, search has nothing to match. A title holds up to 140 characters; use the first words for what the item is, in the words a buyer would type, and move color, size, and occasion details after that.",
          "Tags work the same way. Each listing allows up to 13 tags, each up to 20 characters, and each tag is a separate chance to match a search. Use all 13, and make each one a different phrase a buyer might type, such as leather wallet, mens gift, or anniversary gift, instead of repeating one phrase thirteen times. Fill in every attribute Etsy offers for your category too; attributes act like tags, so repeating them in your tag slots wastes space.",
          "Listings expire after four months unless auto-renew is on, and an expired listing sells nothing. A shop with three listings gives search only three chances to surface you; every listing you add is another entry point. Aim for 20 to 30: enough to give buyers a reason to browse and search far more to work with."
        ]
      },
      {
        "heading": "Your price is working against you",
        "paragraphs": [
          "Price is the fastest filter a shopper applies. Too high against similar listings and the click never happens; too low and the same shopper suspects poor quality. Compare your price with the five closest listings for the same kind of item, not with the cheapest or the most expensive one. If your price sits far outside that range, give a visible reason, better materials, personalization, or faster shipping, in the first photo or the first line of the description.",
          "Low prices also break the math before a sale ever happens. Take a $15 item with $8 in materials and shipping costs. That leaves $7 before fees. Etsy takes a 6.5% transaction fee of $0.98, a payment processing fee of $0.70 (3% plus $0.25), and a $0.20 listing fee, $1.88 in total, leaving $5.12 for your time. A 10% discount coupon then costs $1.50, nearly 30% of what you keep. Price from your costs upward, not from what feels competitive, and check the result with a fee calculator before you publish.",
          "Shipping is part of the price in the buyer's mind: a $25 item with $9 shipping reads as $34. If you fold shipping into the item price, remember the 6.5% transaction fee applies to the total the buyer pays, including shipping, so folding $6 of shipping into the price adds about $0.39 in transaction fees. Run both versions before you choose."
        ]
      },
      {
        "heading": "Fees are eating your margin",
        "paragraphs": [
          "Many shops are not failing to sell; they are selling at a loss and stopping. Etsy's fees stack: a $0.20 listing fee, a 6.5% transaction fee on the item price plus shipping and gift wrap, and a payment processing fee of 3% plus $0.25 for US sellers. Each fee is small alone; together they take roughly 10% of every order before materials, packaging, or your time.",
          "Here is what a $40 item with $6 shipping actually keeps:",
          "Offsite Ads can change that picture fast. If your shop made under $10,000 in the prior 365 days, you can opt out. Once you pass $10,000, participation is mandatory and the fee is 12% of the order total, capped at $100 per order. On that same $46 order, a 15% Offsite Ads fee adds $6.90, cutting what you keep to $34.28. Check whether you are opted in before you blame your prices, and know that a shop under the threshold can turn it off.",
          "Etsy Plus costs $10 a month and includes 15 listing credits, worth $3, and $5 in Etsy Ads credits. That covers $8 of the $10 if you use both credits, but the rest only pays for itself if the extra tools, such as restock requests, actually change how you sell. Fix your listings before you buy a subscription."
        ],
        "table": {
          "head": [
            "Charge",
            "How it is calculated",
            "Amount"
          ],
          "rows": [
            [
              "Listing fee",
              "$0.20 per listing",
              "$0.20"
            ],
            [
              "Transaction fee",
              "6.5% of $46.00",
              "$2.99"
            ],
            [
              "Payment processing",
              "3% of $46.00 plus $0.25",
              "$1.63"
            ],
            [
              "Total Etsy fees",
              "",
              "$4.82"
            ],
            [
              "You receive",
              "$46.00 minus $4.82",
              "$41.18"
            ]
          ]
        }
      },
      {
        "heading": "Your listing does not close the sale",
        "paragraphs": [
          "A shopper who clicks has already decided the product might be right. The listing then has one job: remove every reason to leave. The first photo does most of that work. Show the item clearly, in good light, against a plain background, at the size and angle a buyer needs to judge it. Then add photos that answer the next questions: scale against a familiar object, the back and details, the item in use, and the packaging.",
          "The description should answer the questions a buyer would ask in a store: exact dimensions, materials, how it is made, what is included, and how long it takes to make and ship. Put the facts first and the story second; a buyer who cannot find the size in five seconds leaves. State your processing time honestly. A handmade item that takes a week to make should say so, because a buyer who finds out after ordering leaves a one-star review instead of a repeat order.",
          "Shipping terms close or kill the sale: a buyer comparing two similar listings picks the clearer delivery date. Say when the order ships and how long delivery takes, and keep that promise. Late shipments cost more than a refund; they cost the review the next hundred buyers read."
        ]
      },
      {
        "heading": "Shoppers do not trust a new shop",
        "paragraphs": [
          "Etsy buyers take a risk on every order from a shop they have never heard of, and a shop with no reviews, no policies, and an empty About section gives them no reason to take it. Fill in every trust signal the platform offers: a shop banner and icon, an About section saying who makes the items and where, and complete policies covering payment, shipping, returns, and exchanges. A shop that looks finished sells; a shop that looks abandoned does not.",
          "Reviews are the hardest trust signal to earn and the most valuable. Your first ten reviews matter most, because they move you from unproven to proven. Ship fast, pack well, include a short thank-you note, and follow up once after delivery to ask how the item arrived. Earn them the slow way; a review a buyer leaves gladly is worth more than any shortcut.",
          "The tax side matters from the first sale, not the first profitable month. The IRS treats Etsy income as self-employment income: with net earnings of $400 or more in a year, you must file an income tax return, and you generally pay estimated taxes quarterly rather than having tax withheld. Report the income on Schedule C. Keep a simple record of every sale, fee, and supply purchase from day one. Reconstructing a year of fees from bank statements is a job that gets put off until it becomes a problem. If you pay a contractor, such as a photographer, $2,000 or more in 2026, you generally must file Form 1099-NEC for them."
        ]
      },
      {
        "bullets": [
          "Week 1, diagnose: pull 30 days of stats for every listing. Sort by visits and find the stage that fails: no visits, no favorites, or no orders.",
          "Week 2, get found: rewrite the titles and all 13 tags on your ten best listings, fill in every attribute, and renew anything expired.",
          "Week 3, fix the money: run every listing through the fee calculator, reprice anything that keeps less than 30% after fees and costs, and decide on Offsite Ads while you are still under the $10,000 threshold.",
          "Week 4, close the sale: reshoot first photos, rewrite descriptions facts-first, complete your shop policies and About section, and answer every message within a day."
        ],
        "heading": "Fix it in order: a 30-day plan",
        "paragraphs": [
          "Work the fixes in the order the funnel breaks, one week at a time. Changing everything at once tells you nothing about what worked.",
          "Only then spend on ads: Etsy Ads buy visits, not sales, and visits only pay when the listing converts. The test is simple: divide your ad spend by the orders it produced. If $60 of ads produced 4 orders, your acquisition cost is $15 per order, and if you keep $12 per order after fees and costs, the ads lose money. Fix the conversion rate first, then buy traffic.",
          "Measure the same stats again after 30 days. If visits rose but orders did not, the problem was never traffic. If orders rose, keep the changes and move to the next ten listings. Improve one stage at a time; change everything at once and you stay guessing."
        ]
      }
    ],
    "seoTitle": "Why Your Etsy Shop Isn't Selling (And How to Fix It)",
    "slug": "why-your-etsy-shop-isnt-selling",
    "sources": [
      {
        "label": "Etsy Fees & Payments Policy",
        "url": "https://www.etsy.com/legal/fees/"
      },
      {
        "label": "Etsy Payments Policy",
        "url": "https://www.etsy.com/legal/etsy-payments/"
      },
      {
        "label": "Etsy Help: How to Use Tags to Get Found in Search",
        "url": "https://help.etsy.com/hc/en-us/articles/360000336307-How-to-Use-Tags-to-Get-Found-in-Search"
      },
      {
        "label": "IRS Self-Employed Individuals Tax Center",
        "url": "https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center"
      }
    ],
    "title": "Why Your Etsy Shop Isn't Selling",
    "type": "Troubleshooting",
    "updated": "2026-11-16"
  }
]
