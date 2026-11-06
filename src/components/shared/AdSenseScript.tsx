import Script from "next/script"

/**
 * Google AdSense loader.
 * Renders ONLY when NEXT_PUBLIC_ADSENSE_ID (e.g. "ca-pub-XXXXXXXXXXXXXXXX") is set.
 * Until then the site ships with the existing ad placeholder slots and no ad code,
 * which keeps development/preview clean. See ADSENSE-SETUP.md at the repo root.
 */
export function AdSenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID
  if (!publisherId) return null
  return (
    <Script
      id="adsense-loader"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  )
}
