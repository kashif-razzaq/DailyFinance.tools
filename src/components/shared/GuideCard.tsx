import Link from "next/link"
import { ArrowRight, CalendarDays, Clock } from "lucide-react"
import type { Guide } from "@/data/guides"
import { formatGuideDate } from "@/data/guides"
import { GuideImage } from "@/components/shared/GuideImage"

/**
 * Guide card — the one card design for every guide listing (guides index,
 * hub category pages, search results). Shows the featured image, title,
 * description, published date + read time, and the read link. Dates on
 * listing cards are part of a proper blog structure: they signal freshness
 * to readers and to Google.
 */
export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="border rounded-3xl overflow-hidden hover:border-[#064E3B] hover:shadow-md transition-all group bg-card flex flex-col"
    >
      <GuideImage src={guide.image} alt={guide.imageAlt} imgClassName="aspect-video w-full object-cover" />
      <span className="flex flex-col p-6 flex-1">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-2">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" /> {formatGuideDate(guide.published)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {guide.readMinutes} min read
          </span>
        </span>
        <h3 className="font-bold text-lg leading-snug mb-2 group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{guide.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.description}</p>
        <span className="mt-auto text-sm font-semibold text-[#064E3B] dark:text-emerald-400 inline-flex items-center gap-1.5">
          Read the guide <ArrowRight className="h-4 w-4" />
        </span>
      </span>
    </Link>
  )
}
