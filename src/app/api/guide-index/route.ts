import { GUIDES } from '@/data/guides'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

/**
 * Minimal guide fields for client-side search. The full guide data
 * (~250k words of prose) must never ship to the browser — the search
 * dropdowns fetch this index once (lazily, on first search) and match
 * locally with the shared matcher. Rebuilt on every deploy, so it can
 * never go stale when guides are added.
 */
export async function GET() {
  const index = GUIDES.map((g) => ({
    slug: g.slug,
    title: g.title,
    hub: g.hub,
    description: g.description,
    readMinutes: g.readMinutes,
  }))
  return NextResponse.json(index, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
  })
}
