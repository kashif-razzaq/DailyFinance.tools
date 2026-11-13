'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Calculator, ChevronRight, Search, X } from 'lucide-react'
import { getToolUrl } from '@/config/navigation'
import { useMyTools } from '@/components/home/useMyTools'

/**
 * HeaderSearch — the header search button + command-palette overlay.
 * Rendered by the (server) Navbar on every page. The trigger copies the
 * mobile sign-in chip exactly (48×48 footprint, same chip + icon sizes)
 * and is always visible, at every breakpoint, logged in or out.
 *
 * The overlay reuses the home search dropdown's design (icon tile, title,
 * category, ChevronRight) and the shared matcher via useMyTools'
 * searchTools, so header results can never disagree with /tools?q=.
 */
export function HeaderSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // The overlay portals to document.body (below), so it must only render
  // after mount — the header's backdrop-blur makes the header the
  // containing block for fixed descendants, which would clip a fixed
  // overlay rendered inside it to the 65px header box.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(-1)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { popularTools, recordRecent, searchTools } = useMyTools()

  const trimmedQuery = query.trim()
  // One matcher call per query: slice 8 for display, keep the true total
  // for the "See all N results" row.
  const allMatches = trimmedQuery ? searchTools(query, 1000) : []
  const totalResults = allMatches.length
  const displayedResults = allMatches.slice(0, 8)
  // Empty query shows popular tools; keyboard nav works over whichever
  // list is currently shown.
  const items = trimmedQuery ? displayedResults : popularTools.slice(0, 6)
  const resultsHref = `/tools?q=${encodeURIComponent(trimmedQuery)}`

  const close = () => {
    setOpen(false)
    setQuery('')
    setHighlighted(-1)
    triggerRef.current?.focus()
  }

  const openPalette = () => {
    setOpen(true)
    setHighlighted(-1)
  }

  // Focus the input on open.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open ])

  // Lock body scroll while open; restore on close/unmount.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open ])

  // Global ⌘K / Ctrl+K opens the palette from anywhere — except while
  // typing in a field (or in the palette input itself).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      setOpen(true)
      setHighlighted(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Escape closes even when focus has left the input.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open ])

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (items.length === 0) return
      setHighlighted((h) =>
        e.key === 'ArrowDown'
          ? (h + 1) % items.length
          : (h - 1 + items.length) % items.length
      )
    } else if (e.key === 'Enter') {
      const hit = highlighted >= 0 && highlighted < items.length ? items[highlighted] : undefined
      if (hit) {
        recordRecent(hit.tool.slug)
        setOpen(false)
        setQuery('')
        setHighlighted(-1)
        router.push(getToolUrl(hit.tool.slug))
      } else if (trimmedQuery) {
        setOpen(false)
        setQuery('')
        setHighlighted(-1)
        router.push(resultsHref)
      }
    } else if (e.key === 'Escape') {
      close()
    }
  }

  const activeId =
    highlighted >= 0 && highlighted < items.length
      ? `header-search-result-${items[highlighted].tool.slug}`
      : undefined

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={openPalette}
        aria-label="Search"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group flex items-center justify-center p-[6px] cursor-pointer"
      >
        <span className="flex items-center justify-center bg-primary/10 rounded-lg w-9 h-9 text-primary group-hover:bg-primary/20 transition-colors">
          <Search className="h-4 w-4" />
        </span>
      </button>

      {open && mounted && createPortal(
        <div className="fixed inset-0 z-[100] sm:flex sm:items-start sm:justify-center sm:px-4 sm:pt-[12vh]">
          {/* Backdrop — click closes. */}
          <div
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search calculators"
            className="relative flex h-full w-full flex-col overflow-hidden bg-card shadow-2xl sm:h-auto sm:max-h-[70vh] sm:max-w-xl sm:rounded-2xl sm:border sm:border-border"
          >
            {/* Input row */}
            <div className="flex items-center gap-2 border-b border-border px-4 sm:px-5">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setHighlighted(-1)
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search calculators — try “mortgage”, “paycheck”, “ROI”…"
                aria-label="Search calculators"
                aria-expanded={items.length > 0}
                aria-controls="header-search-listbox"
                aria-activedescendant={activeId}
                className="w-full bg-transparent py-4 text-lg font-medium text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Results */}
            {trimmedQuery && totalResults === 0 ? (
              <p className="px-5 py-6 text-center text-sm font-light text-muted-foreground">
                No calculators match “{trimmedQuery}”. Try “tax”, “loan” or “ROI”.
              </p>
            ) : (
              <>
                {!trimmedQuery && (
                  <p className="px-5 pb-1 pt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Popular tools
                  </p>
                )}
                <div
                  id="header-search-listbox"
                  role="listbox"
                  aria-label={trimmedQuery ? 'Search results' : 'Popular tools'}
                  className="min-h-0 flex-1 overflow-y-auto py-1.5"
                >
                  {items.map(({ tool, category }, i) => {
                    const Icon = tool.icon || Calculator
                    return (
                      <Link
                        key={tool.slug}
                        id={`header-search-result-${tool.slug}`}
                        role="option"
                        aria-selected={i === highlighted}
                        href={getToolUrl(tool.slug)}
                        onClick={() => {
                          recordRecent(tool.slug)
                          setOpen(false)
                          setQuery('')
                          setHighlighted(-1)
                        }}
                        onMouseEnter={() => setHighlighted(i)}
                        className={`flex items-center gap-4 px-5 py-3 transition-colors hover:bg-muted ${i === highlighted ? 'bg-muted' : ''}`}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${category.colorClass}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-bold text-foreground">{tool.title}</span>
                          <span className="block truncate text-[13px] font-light text-muted-foreground">{category.name}</span>
                        </span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                      </Link>
                    )
                  })}
                </div>
                {trimmedQuery && totalResults > 0 && (
                  <Link
                    href={resultsHref}
                    onClick={() => {
                      setOpen(false)
                      setQuery('')
                      setHighlighted(-1)
                    }}
                    className="flex items-center gap-4 border-t border-border px-5 py-3.5 transition-colors hover:bg-muted"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
                      <Search className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1 text-[15px] font-bold text-foreground">
                      See all {totalResults} result{totalResults === 1 ? '' : 's'} for “{trimmedQuery}”
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                  </Link>
                )}
              </>
            )}

            {/* Shortcut hints */}
            <p className="border-t border-border px-5 py-3 text-center text-xs text-muted-foreground">
              ↑↓ to navigate · Enter to open · Esc to close · ⌘K to search
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
