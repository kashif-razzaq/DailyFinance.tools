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
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.seoTitle,
      description: guide.description,
      url,
      siteName: "DailyFinance.tools",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: `https://dailyfinance.tools${guide.image}`,
          width: 2048,
          height: 1152,
          alt: guide.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle,
      description: guide.description,
      images: [`https://dailyfinance.tools${guide.image}`],
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  return <GuideArticle guide={guide} />
}
