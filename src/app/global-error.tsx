'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

// Global error page: renders when the root layout itself fails, so it
// replaces the root layout and must define its own <html> and <body> tags
// (Next.js 16 error-handling docs). It is deliberately self-contained — no
// imports from the app, no next/link, inline styles only — because the root
// layout's globals.css and providers are not available here. Tone and copy
// match the branded error.tsx page.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          backgroundColor: '#fafafa',
          color: '#1f2937',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <main style={{ padding: '4rem 1rem', maxWidth: '36rem', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: '0 0 1rem',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ color: '#6b7280', margin: '0 0 2rem', lineHeight: '1.625' }}>
            The page hit an unexpected error. Your saved calculators and account
            are unaffected. Try again, or head back to the tools directory.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            <button
              onClick={() => retry()}
              style={{
                backgroundColor: '#064e3b',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/tools"
              style={{
                backgroundColor: '#ffffff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Browse all tools
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
