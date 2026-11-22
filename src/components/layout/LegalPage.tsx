import React from "react"
import { BadgeCheck } from "lucide-react"

interface LegalPageProps {
  title: string
  updated: string
  intro: string
  sections: { heading: string; paragraphs: string[] }[]
  /** Optional second stamp under "Last updated" (e.g. the methodology
   *  page's "Last audited: November 2026"). Other legal pages omit it. */
  auditNote?: string
}

export function LegalPage({ title, updated, intro, sections, auditNote }: LegalPageProps) {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{title}</h1>
        {auditNote ? (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">Last updated: {updated}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground m-0">
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#064E3B] dark:text-emerald-400" aria-hidden="true" />
              {auditNote}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-6">Last updated: {updated}</p>
        )}
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">{intro}</p>
        <div className="content-prose max-w-none">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((para, i) => (<p key={i}>{para}</p>))}
            </section>
          ))}
        </div>
      </div>
    </div>
    </main>
  )
}
