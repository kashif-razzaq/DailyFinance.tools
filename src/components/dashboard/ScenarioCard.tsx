'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Trash2, Copy, Globe } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cloneCalculatorAction, deleteCalculatorAction } from "@/actions/calculator.actions"
import type { SavedCalculator } from "@/types/database"
import { useState } from "react"

export function ScenarioCard({ calc }: { calc: SavedCalculator }) {
  const [isCloning, setIsCloning] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleClone = async () => {
    setIsCloning(true)
    try {
      await cloneCalculatorAction(calc.id)
    } catch (error) {
      console.error(error)
    } finally {
      setIsCloning(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteCalculatorAction(calc.id)
    } catch (error) {
      console.error(error)
      setIsDeleting(false) 
    }
  }

  // Extract just the calculator name without the folder path (e.g., "emergency-fund-calculator")
  const displaySlug = calc.calculator_slug.split('/').pop()?.replace(/-/g, ' ') || ''

  // Format the correct route link directly from the root
  const scenarioUrl = `/${calc.calculator_slug}?savedId=${calc.id}`

  return (
    <Card className="relative overflow-hidden group flex flex-col border-border/50 hover:border-border transition-colors bg-card shadow-sm">
      <CardHeader className="pb-4 flex-1">
        <div className="flex justify-between items-start">
          <div className="bg-primary/10 p-2 rounded-lg text-primary mb-2 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {calc.is_public && (
              <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-foreground/80">
                <Globe className="w-3 h-3 mr-1" />
                Shared
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground" 
              onClick={handleClone}
              disabled={isCloning}
              title="Duplicate Scenario"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive" 
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete Scenario"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardTitle className="text-xl line-clamp-1">{calc.saved_name}</CardTitle>
        <CardDescription className="capitalize">
          {displaySlug}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {calc.core_metric !== null && calc.core_metric !== undefined && (
          <div className="mb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">Core Metric</p>
            <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(calc.core_metric)}
            </p>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(calc.last_updated), { addSuffix: true })}
        </p>
      </CardContent>
      
      <CardFooter className="pt-4 border-t mt-auto bg-muted/20">
        <Link href={scenarioUrl} className="w-full">
          <Button variant="outline" className="w-full justify-between hover:bg-background">
            Open Scenario
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}