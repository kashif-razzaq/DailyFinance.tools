/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * ThemeToggle — light/dark switching for the whole site.
 *
 * The design tokens already ship a full .dark palette and Tailwind's dark
 * variant is class-based; this toggle is the missing switch. It flips the
 * .dark class on <html>, persists the choice in localStorage ('df-theme'),
 * and broadcasts 'df:theme-change' so every mounted toggle stays in sync.
 * The pre-paint init script in the root layout applies the stored (or
 * system) choice before first render, so there is no flash.
 */
const THEME_EVENT = 'df:theme-change'

function currentDark() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  try {
    window.localStorage.setItem('df-theme', dark ? 'dark' : 'light')
  } catch {
    // Private mode: the choice applies to this session only.
  }
  window.dispatchEvent(new CustomEvent(THEME_EVENT))
}

export function ThemeToggle({ variant = 'icon' }: { variant?: 'icon' | 'row' }) {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(currentDark())
    const onChange = () => setDark(currentDark())
    window.addEventListener(THEME_EVENT, onChange)
    return () => window.removeEventListener(THEME_EVENT, onChange)
  }, [])

  if (variant === 'row') {
    return (
      <div className="flex items-center justify-between px-2 py-3">
        <span className="flex items-center gap-2.5 text-base font-medium">
          {dark ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
          Appearance
        </span>
        <div className="flex rounded-full border bg-muted/50 p-1" role="group" aria-label="Theme">
          <button
            type="button"
            onClick={() => applyTheme(false)}
            aria-pressed={dark === false}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
              dark === false ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            <Sun className="h-4 w-4" /> Light
          </button>
          <button
            type="button"
            onClick={() => applyTheme(true)}
            aria-pressed={dark === true}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all ${
              dark === true ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            <Moon className="h-4 w-4" /> Dark
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => applyTheme(!currentDark())}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
    >
      {dark === null ? (
        <Sun className="h-4 w-4" />
      ) : dark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
