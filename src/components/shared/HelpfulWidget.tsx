'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { getFeedbackAction, voteFeedbackAction } from '@/actions/feedback.actions'

export function HelpfulWidget({ slug, variant = 'default' }: { slug: string, variant?: 'default' | 'inline' }) {
  const [helpfulCount, setHelpfulCount] = useState(0)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    getFeedbackAction(slug).then((res: { upvotes: number, downvotes: number }) => {
      setHelpfulCount(res.upvotes - res.downvotes)
    }).catch(console.error)
  }, [slug])

  const handleVote = async (type: 'up' | 'down') => {
    if (userVote === type) return
    
    if (userVote) {
      setHelpfulCount(prev => type === 'up' ? prev + 2 : prev - 2)
    } else {
      setHelpfulCount(prev => type === 'up' ? prev + 1 : prev - 1)
    }
    setUserVote(type)

    try {
      await voteFeedbackAction(slug, type)
    } catch (error) {
      console.error("Failed to record vote", error)
    }
  }

  return (
    <div className={`flex items-center justify-between ${variant === 'inline' ? 'py-1' : 'pt-4 mt-2 border-t border-border/50'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          Was this tool helpful?
        </span>
        {helpfulCount > 0 && (
          <span className={`items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/5 text-blue-600 border border-primary/20/50 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 w-fit ${variant === 'inline' ? 'inline-flex' : 'hidden sm:inline-flex'}`}>
            {helpfulCount} {helpfulCount === 1 ? 'Person' : 'People'} found this helpful
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => handleVote('up')} className={`h-8 w-8 rounded-full transition-colors cursor-pointer ${userVote === 'up' ? 'text-blue-600 bg-primary/5' : 'text-muted-foreground hover:text-blue-600 hover:bg-primary/5'}`}>
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleVote('down')} className={`h-8 w-8 rounded-full transition-colors cursor-pointer ${userVote === 'down' ? 'text-red-600 bg-red-50' : 'text-muted-foreground hover:text-red-600 hover:bg-red-50'}`}>
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
