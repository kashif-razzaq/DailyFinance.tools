import type { Metadata } from 'next'

interface SEOMetadataProps {
  title: string
  description: string
  keywords?: string[]
  slug: string
  category?: string
}

// Title band is 50–60 chars (ARB). Tool titles are written per page and most
// land in band, but ~30 are short (39–49 chars). Lengthen only those, trying
// the suffixes in order and taking the first that lands the title in band:
// in-band titles pass through untouched. Over-long titles are left alone —
// shortening them here would cut words, so those pages need their own
// title rewrite.
const TITLE_SUFFIXES = [
  ' | Daily Finance Tools', // 22 chars — brand suffix, for titles of 28–38
  ' — Free Financial Calculator', // 29 chars — for titles of 21–31
  ' | Free Calculator', // 17 chars — for titles of 39–43
  ' | Free Tool', // 12 chars — for titles of 44–48
  ' — Free', // 7 chars — for titles of 49
]

function fitTitle(title: string): string {
  if (title.length >= 50) return title
  for (const suffix of TITLE_SUFFIXES) {
    const candidate = `${title}${suffix}`
    if (candidate.length >= 50 && candidate.length <= 60) return candidate
  }
  return title
}

export function generateCalculatorMetadata({
  title,
  description,
  keywords = [],
  slug,
  category = 'Calculator',
}: SEOMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dailyfinance.tools'
  const url = `${baseUrl}/${slug}`

  // In-band title for the <title> tag, OG/Twitter cards and the OG image.
  const displayTitle = fitTitle(title)

  // Construct dynamic OG image URL
  const ogImageUrl = new URL(`${baseUrl}/api/og`)
  ogImageUrl.searchParams.set('title', displayTitle)
  ogImageUrl.searchParams.set('description', description)
  ogImageUrl.searchParams.set('category', category)

  return {
    title: displayTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: displayTitle,
      description,
      url,
      siteName: 'Daily Finance Tools',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: displayTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [ogImageUrl.toString()],
    },
  }
}
