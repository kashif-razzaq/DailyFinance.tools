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
  return {
    title: `${guide.title} | DailyFinance.tools`,
    description: guide.description,
    alternates: { canonical: `https://dailyfinance.tools/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, type: "article" },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  return <GuideArticle guide={guide} />
}
