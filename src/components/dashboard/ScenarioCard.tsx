'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Trash2, Copy, Globe, Scale, Share2, Link2, Check } from "lucide-react"
import Link from "next/link"
import { getScenarioUrl } from "@/config/navigation"
import { formatDistanceToNow } from "date-fns"
import { cloneCalculatorAction, deleteCalculatorAction, setCalculatorPublicAction } from "@/actions/calculator.actions"
import type { SavedCalculator } from "@/types/database"
import { ProUpgradeModal } from "@/components/shared/ProUpgradeModal"
import { useState } from "react"

export function ScenarioCard({
  calc,
  isPro = false,
  selectable = false,
  selected = false,
  onToggleSelect,
}: {
  calc: SavedCalculator
  isPro?: boolean
  selectable?: boolean
  selected?: boolean
  onToggleSelect?: () => void
}) {
  const [isCloning, setIsCloning] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isShared, setIsShared] = useState(calc.is_public)
  const [isSharing, setIsSharing] = useState(false)
  const [confirmUnshare, setConfirmUnshare] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareError, setShareError] = useState<string | null>(null)
  const [showProModal, setShowProModal] = useState(false)

  // The live link: anyone who opens it sees this scenario's numbers
  // (getSharedCalculatorAction returns the row when is_public is true).
  const liveLink = `https://www.dailyfinance.tools${getScenarioUrl(calc.calculator_slug)}?savedId=${calc.id}`

  const copyLiveLink = async () => {
    try {
      await navigator.clipboard.writeText(liveLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (permissions): the link stays copyable from
      // the footer button; sharing itself is unaffected.
    }
  }

  const handleShare = async () => {
    // Live sharing is Pro-only: free users get the upgrade modal, and the
    // server action re-checks the subscription before changing anything.
    if (!isPro) {
      setShowProModal(true)
      return
    }
    if (isShared) {
      // Two-tap confirm, like delete: unsharing breaks links already sent.
      if (!confirmUnshare) {
        setConfirmUnshare(true)
        setTimeout(() => setConfirmUnshare(false), 3000)
        return
      }
      setIsSharing(true)
      setShareError(null)
      try {
        const result = await setCalculatorPublicAction(calc.id, false)
        if (result.ok) {
          setIsShared(false)
        } else {
          setShareError(result.message)
        }
      } catch {
        setShareError('Could not stop sharing. Please try again.')
      } finally {
        setIsSharing(false)
        setConfirmUnshare(false)
      }
      return
    }
    setIsSharing(true)
    setShareError(null)
    try {
      const result = await setCalculatorPublicAction(calc.id, true)
      if (result.ok) {
        setIsShared(true)
        // Publish + copy in one tap: the link is ready to paste.
        await copyLiveLink()
      } else {
        setShareError(result.message)
      }
    } catch {
      setShareError('Could not share this scenario. Please try again.')
    } finally {
      setIsSharing(false)
    }
  }

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
    // Two-tap confirm: the button is always visible now (including on
    // touch screens), so the first tap arms it and the second deletes.
    if (!confirmDelete) {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
      return
    }
    setIsDeleting(true)
    try {
      await deleteCalculatorAction(calc.id)
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  return (
    <Card className={`relative overflow-hidden group flex flex-col border-border/50 hover:border-border transition-colors bg-card shadow-sm ${selected ? "ring-2 ring-primary border-primary" : ""}`}>
      <CardHeader className="pb-4 flex-1">
        <div className="flex justify-between items-start">
          <div className="bg-primary/10 p-2 rounded-lg text-primary mb-2 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {isShared && (
              <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-foreground/80">
                <Globe className="w-3 h-3 mr-1" />
                Shared
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {selectable && (
              <button
                onClick={onToggleSelect}
                aria-pressed={selected}
                title={selected ? "Selected for comparison" : "Select to compare with another scenario of this tool"}
                className={`flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold transition-colors ${
                  selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Scale className="h-3.5 w-3.5" />
                {selected ? "Selected" : "Compare"}
              </button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 text-muted-foreground hover:text-foreground ${
                confirmUnshare
                  ? "w-auto gap-1 rounded-full bg-muted px-2.5 text-xs font-bold text-foreground hover:bg-muted"
                  : isShared
                    ? "w-8 bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                    : "w-8 bg-muted/60 hover:bg-muted"
              }`}
              onClick={handleShare}
              disabled={isSharing}
              title={
                !isPro
                  ? "Share a live link (Pro)"
                  : isShared
                    ? confirmUnshare
                      ? "Tap again to stop sharing"
                      : "Sharing on — tap to stop sharing"
                    : "Share a live link"
              }
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : isShared ? (
                <Globe className="h-4 w-4" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              {confirmUnshare && "Stop?"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={handleClone}
              disabled={isCloning}
              title="Duplicate Scenario"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 text-muted-foreground hover:text-destructive ${
                confirmDelete
                  ? "w-auto gap-1 rounded-full bg-destructive px-2.5 text-xs font-bold text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground"
                  : "w-8 bg-muted/60 hover:bg-muted"
              }`}
              onClick={handleDelete}
              disabled={isDeleting}
              title={confirmDelete ? "Tap again to delete" : "Delete Scenario"}
            >
              <Trash2 className="h-4 w-4" />
              {confirmDelete && "Sure?"}
            </Button>
          </div>
        </div>
        
        <CardTitle className="text-xl line-clamp-1">{calc.saved_name}</CardTitle>
        <CardDescription className="capitalize">
          {calc.calculator_slug.replace(/-/g, ' ')}
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
        {shareError && (
          <p className="mt-2 text-xs font-medium text-destructive">{shareError}</p>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t mt-auto bg-muted/20">
        <div className="flex w-full gap-2">
          <Link href={`${getScenarioUrl(calc.calculator_slug)}?savedId=${calc.id}`} className="flex-1">
            <Button variant="outline" className="w-full justify-between hover:bg-background">
              Open Scenario
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {isShared && (
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 shrink-0 hover:bg-background"
              onClick={copyLiveLink}
              title="Copy live link"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardFooter>
      <ProUpgradeModal isOpen={showProModal} onClose={() => setShowProModal(false)} />
    </Card>
  )
}
