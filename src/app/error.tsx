"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="w-full bg-background min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">The page hit an unexpected error. Your saved calculators and account are unaffected. Try again, or head back to the tools directory.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => reset()} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">Try again</button>
          <Link href="/tools" className="bg-card border px-6 py-3 rounded-xl font-semibold text-sm hover:border-primary/40 transition-colors">Browse all tools</Link>
        </div>
      </div>
    </main>
  )
}
