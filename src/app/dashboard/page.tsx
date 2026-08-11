import { getSavedCalculatorsAction } from "@/actions/calculator.actions"
import { ScenarioCard } from "@/components/dashboard/ScenarioCard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, FolderGit2 } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const savedCalculators = await getSavedCalculatorsAction()
  
  // Group calculators by category for the Vault UI
  const groupedCalculators = savedCalculators.reduce((acc, calc) => {
    const cat = calc.category || 'uncategorized'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(calc)
    return acc
  }, {} as Record<string, typeof savedCalculators>)

  const categories = Object.keys(groupedCalculators).sort()

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scenario Vault</h1>
          <p className="text-muted-foreground mt-1">Manage and clone your saved financial states.</p>
        </div>
      </div>

      {savedCalculators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-48 h-48 mb-6 relative">
             {/* Premium abstract conceptual asset instead of a generic vector */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl rotate-3"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-6 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-sm">
               <FolderGit2 className="w-16 h-16 text-primary opacity-50" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Your vault is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Start building your financial drive. Calculate, strategize, and save your scenarios here to track them over time.
          </p>
          <Link href="/tools">
            <Button size="lg" className="rounded-full px-8">Browse Tools</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-2">
                <FolderGit2 className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-xl font-semibold capitalize tracking-tight text-foreground">
                  {category.replace(/-/g, ' ')}
                </h3>
                <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {groupedCalculators[category].length}
                </span>
              </div>
              
              {/* Bento Grid Layout */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {groupedCalculators[category].map((calc) => (
                  <ScenarioCard key={calc.id} calc={calc} />
                ))}
                
                {/* Add New Card Slot */}
                <Card className="border-dashed flex flex-col items-center justify-center text-center p-6 min-h-[250px] bg-transparent hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="bg-muted p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Calculator className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-1 text-foreground">New {category.replace(/-/g, ' ')} Scenario</h3>
                  <Link href="/tools" className="mt-4">
                    <Button variant="outline" size="sm" className="rounded-full">Create</Button>
                  </Link>
                </Card>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
