'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { getFeedbackAction, voteFeedbackAction } from '@/actions/calculator.actions'

export function HelpfulWidget({ slug }: { slug: string }) {
  const [helpfulCount, setHelpfulCount] = useState(0)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    getFeedbackAction(slug).then(res => {
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
    <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/50">
      <span className="text-sm font-medium text-muted-foreground">
        Was this tool helpful?
      </span>
      <div className="flex items-center gap-1">
        <span className="text-xs font-semibold text-muted-foreground mr-2 w-4 text-center">
          {helpfulCount > 0 ? `+${helpfulCount}` : helpfulCount}
        </span>
        <Button variant="ghost" size="icon" onClick={() => handleVote('up')} className={`h-8 w-8 rounded-full transition-colors cursor-pointer ${userVote === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50'}`}>
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleVote('down')} className={`h-8 w-8 rounded-full transition-colors cursor-pointer ${userVote === 'down' ? 'text-red-600 bg-red-50' : 'text-muted-foreground hover:text-red-600 hover:bg-red-50'}`}>
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
