import React from "react"

interface LegalPageProps {
  title: string
  updated: string
  intro: string
  sections: { heading: string; paragraphs: string[] }[]
}

export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-14 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{title}</h1>
        <p className="text-sm text-muted-foreground mb-6">Last updated: {updated}</p>
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
    </main>
  )
}
