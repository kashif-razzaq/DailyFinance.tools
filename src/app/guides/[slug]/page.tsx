import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { GUIDES, getGuide } from "@/data/guides"
import { GuideArticle } from "@/components/layout/GuideArticle"

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  const url = `https://dailyfinance.tools/guides/${guide.slug}`
  return {
    title: `${guide.title} | DailyFinance.tools`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: "DailyFinance.tools",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "https://dailyfinance.tools/images/og-base.jpg",
          width: 1376,
          height: 768,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["https://dailyfinance.tools/images/og-base.jpg"],
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  return <GuideArticle guide={guide} />
}
