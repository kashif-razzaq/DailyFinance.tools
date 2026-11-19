/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * ThemeToggle — light/dark switching for the whole site.
 *
 * Icon-only button: shows the sun in dark mode (tap for light) and the moon
 * in light mode (tap for dark). It flips the .dark class on <html>, persists
 * the choice in localStorage ('df-theme'), and broadcasts 'df:theme-change'
 * so every mounted toggle stays in sync. With no stored choice the site
 * follows the device: the pre-paint init script in the root layout applies
 * the stored (or system) choice before first render, so there is no flash.
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

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    setDark(currentDark())
    const onChange = () => setDark(currentDark())
    window.addEventListener(THEME_EVENT, onChange)
    return () => window.removeEventListener(THEME_EVENT, onChange)
  }, [])

  return (
    <button
      type="button"
      onClick={() => applyTheme(!currentDark())}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-foreground transition-colors hover:bg-muted"
    >
      {dark === null ? (
        <Sun className="h-5 w-5" />
      ) : dark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}
