import type { Metadata } from 'next'

interface SEOMetadataProps {
  title: string
  description: string
  keywords?: string[]
  slug: string
  category?: string
}

export function generateCalculatorMetadata({
  title,
  description,
  keywords = [],
  slug,
  category = 'Calculator',
}: SEOMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dailyfinance.tools'
  const url = `${baseUrl}/${slug}`
  
  // Construct dynamic OG image URL
  const ogImageUrl = new URL(`${baseUrl}/api/og`)
  ogImageUrl.searchParams.set('title', title)
  ogImageUrl.searchParams.set('description', description)
  ogImageUrl.searchParams.set('category', category)

  return {
    title: `${title} | DailyFinance.tools`,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'DailyFinance.tools',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl.toString()],
    },
  }
}
