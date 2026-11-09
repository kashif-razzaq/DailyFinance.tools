import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Crown } from "lucide-react"
import Link from "next/link"
import { getToolUrl } from "@/config/navigation"

import { navigationCategories } from "@/config/navigation"

// The advanced end of the live suite, pulled from the real navigation data
// so this library can never drift from what is actually published.
const ADVANCED_SLUGS = [
  "coast-fire",
  "fat-fire",
  "brrrr",
  "roth-ira-conversion",
  "debt-avalanche",
  "capital-gains",
  "s-corp",
  "house-hacking",
]

const upcomingTools = navigationCategories.flatMap((cat) =>
  cat.calculators
    .filter((calc) => ADVANCED_SLUGS.some((s) => calc.slug.includes(s)))
    .map((calc) => ({
      id: calc.slug,
      title: calc.title,
      description: calc.description,
      category: cat.name,
      isPro: false,
      status: "ready",
    })),
)

export default function ProToolsLibrary() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pro Tools Library</h1>
          <p className="text-muted-foreground mt-1">Advanced calculators from the full DailyFinance suite — every one live and ready to open.</p>
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
              <Link href={getToolUrl(tool.id)} className="w-full">
                <Button variant="default" className="w-full justify-between shadow-sm">
                  Open Calculator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
