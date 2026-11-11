"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { StateCard } from "@/components/locations/StateCard"
import type { USState } from "@/data/locations/us-states"

/**
 * The state directory used on both state indexes (/locations, /guides/states).
 * Heading on the left, search on the right of the same row; typing filters
 * all 51 entries by name, abbreviation, capital or largest city.
 */
export function StateDirectory({
  states,
  hrefPrefix,
  cta,
  heading,
}: {
  states: USState[]
  hrefPrefix: string
  /** "explore" -> "Explore <state>", "guide" -> "<state> tax guide" */
  cta: "explore" | "guide"
  heading: string
}) {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const visible = q
    ? states.filter((s) => [s.name, s.abbr, s.capital, s.largestCity].join(" ").toLowerCase().includes(q))
    : states

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        <label className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search states…"
            aria-label="Search states"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#064E3B]/50 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/15"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mb-14 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No states match &ldquo;{query}&rdquo;.{" "}
          <button type="button" onClick={() => setQuery("")} className="font-semibold text-[#064E3B] hover:underline dark:text-emerald-400">
            Clear search
          </button>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-14">
          {visible.map((s) => (
            <StateCard
              key={s.slug}
              state={s}
              href={`${hrefPrefix}/${s.slug}`}
              cta={cta === "explore" ? `Explore ${s.name}` : `${s.name} tax guide`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
