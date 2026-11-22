'use client'

import { useState } from 'react'
import { Check, Link2, Mail } from 'lucide-react'

// Brand icons as inline SVGs (lucide's brand icons are unreliable in this
// version — same approach as the Footer). X + LinkedIn paths match the
// Footer; Facebook + WhatsApp are the simple-icons v14 paths.
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

/**
 * Guide share buttons. Native share intents only — no third-party SDKs, no
 * tracking, no share counts. (Share-count libraries are dead: X and
 * LinkedIn removed their count endpoints years ago, Facebook needs an
 * access token, and ShareThis/AddThis are trackers — all at odds with the
 * site's privacy promise.) Layouts: "rail" (vertical, sticky beside the
 * article on wide screens) and "row" (horizontal, under the intro on
 * smaller screens).
 */
export function GuideShare({
  url,
  title,
  layout,
  className = '',
}: {
  url: string
  title: string
  layout: 'rail' | 'row'
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard API unavailable (older browser / non-secure context):
      // fall back to the legacy execCommand path.
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const buttons = [
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, hover: 'hover:text-foreground hover:border-foreground/30', Icon: XIcon },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, hover: 'hover:text-[#1877F2] hover:border-[#1877F2]/40', Icon: FacebookIcon },
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, hover: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40', Icon: LinkedInIcon },
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, hover: 'hover:text-[#25D366] hover:border-[#25D366]/40', Icon: WhatsAppIcon },
  ]

  // UX13: 48×48 hit area (was 40×40); icons stay 18px so the look is unchanged.
  // shrink-0: without it the row flex container squeezes the buttons below
  // 48px wide on narrow screens (measured 39×48 at 375px before this).
  const buttonClass =
    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground transition-colors'

  return (
    <div
      className={
        layout === 'rail'
          ? `flex flex-col items-center gap-2 ${className}`
          : `flex flex-wrap items-center gap-2 ${className}`
      }
      role="group"
      aria-label="Share this guide"
    >
      {layout === 'row' && (
        <span className="mr-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Share</span>
      )}
      {buttons.map(({ label, href, hover, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${buttonClass} ${hover}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        aria-label="Share by email"
        title="Share by email"
        className={`${buttonClass} hover:text-[#064E3B] hover:border-[#064E3B]/40 dark:hover:text-emerald-400`}
      >
        <Mail className="h-[18px] w-[18px]" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Copied!' : 'Copy link'}
        className={`${buttonClass} ${copied ? 'border-[#064E3B]/40 text-[#064E3B] dark:text-emerald-400' : 'hover:text-[#064E3B] hover:border-[#064E3B]/40 dark:hover:text-emerald-400'}`}
      >
        {copied ? <Check className="h-[18px] w-[18px]" /> : <Link2 className="h-[18px] w-[18px]" />}
      </button>
    </div>
  )
}
