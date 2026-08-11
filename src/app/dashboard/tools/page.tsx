import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Star, Crown } from "lucide-react"
import Link from "next/link"

// Temporary mock data until we build all 50 tools
const upcomingTools = [
  {
    id: "saas-burn-rate-runway",
    title: "SaaS Burn Rate & Runway Forecaster",
    description: "Model startup survival timelines based on ARR growth, headcount scaling, and fixed costs.",
    category: "Business",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "monte-carlo-fire",
    title: "Monte Carlo FIRE Simulator",
    description: "Run 10,000 market simulations to determine the absolute success rate of your early retirement.",
    category: "Investing",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "rsu-tax-planner",
    title: "RSU & Stock Options Tax Planner",
    description: "Optimize the sale of Restricted Stock Units to minimize short-term capital gains hits.",
    category: "Investing",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "private-equity-waterfall",
    title: "Private Equity Waterfall Modeler",
    description: "Calculate LP vs GP return distributions across multiple IRR hurdles.",
    category: "Investing",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "real-estate-syndication",
    title: "Real Estate Syndication Analyzer",
    description: "Deep dive into multi-family syndication cash-on-cash returns and equity multipliers.",
    category: "Real Estate",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "creator-ma-valuation",
    title: "Creator M&A Valuation Engine",
    description: "Value a media brand or YouTube channel for acquisition based on trailing 12-month EBITDA.",
    category: "Creator Economy",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "freelance-ltv-churn",
    title: "Freelance Client LTV Forecaster",
    description: "Model the exact revenue impact of losing a retainer client vs acquiring a new one.",
    category: "Business",
    isPro: true,
    status: "upcoming"
  },
  {
    id: "lease-vs-buy-advanced",
    title: "Advanced Auto Lease vs Buy",
    description: "Factor in precise depreciation curves, opportunity cost of capital, and hidden dealership fees.",
    category: "Personal Finance",
    isPro: true,
    status: "upcoming"
  }
]

export default function ProToolsLibrary() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pro Tools Library</h1>
          <p className="text-muted-foreground mt-1">Access the complete suite of financial modeling calculators.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingTools.map((tool) => (
          <Card key={tool.id} className="relative overflow-hidden group flex flex-col border-border/50 hover:border-border transition-colors bg-card shadow-sm">
            <CardHeader className="pb-4 flex-1">
              <div className="flex justify-between items-start">
                <div className="bg-primary/10 p-2 rounded-lg text-primary mb-3">
                  <Calculator className="h-5 w-5" />
                </div>
                {tool.isPro && (
                  <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground border border-accent/20">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro Exclusive
                  </span>
                )}
              </div>
              <CardTitle className="text-xl">{tool.title}</CardTitle>
              <CardDescription className="pt-2">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-4 border-t mt-auto bg-muted/20">
              {tool.status === "ready" ? (
                <Link href={`/tools/${tool.id}`} className="w-full">
                  <Button variant="default" className="w-full justify-between shadow-sm">
                    Open Calculator
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" disabled className="w-full justify-between">
                  Coming Soon
                  <Star className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
