'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Wraps the embedded calculator and reports its exact height to the
 * parent page via postMessage ({ type: 'df-embed-height', height }) so
 * the host site's iframe (see public/embed.js) can size itself with no
 * leftover blank space under the widget. Observes size changes, so
 * accordions, results and tabs resizing the widget are followed live.
 */
export function EmbedShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.parent === window) return
    let last = 0
    const post = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      if (h > 0 && h !== last) {
        last = h
        window.parent.postMessage({ type: 'df-embed-height', height: h }, '*')
      }
    }
    post()
    const ro = new ResizeObserver(post)
    ro.observe(el)
    const timers = [window.setTimeout(post, 300), window.setTimeout(post, 1200)]
    return () => {
      ro.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div ref={ref} className="w-full">
      {children}
    </div>
  )
}
