/**
 * Shared tool search — the ONE matching implementation for both the live
 * search dropdown (useMyTools, client) and the /tools?q= results route
 * (server). Both call searchEntries with the same rules so the dropdown
 * and the results page can never disagree about what matches.
 *
 * Matching rules:
 * - Case-insensitive; the query is split into words and EVERY word must
 *   appear in at least one field (title, keywords/aliases, category name,
 *   description) — words may match across different fields, so "tax
 *   freelance" finds a freelance tool whose description mentions tax.
 * - Words match as substrings within a field, so partial typing ("mortg")
 *   still finds "Mortgage Calculator".
 * - Ranking: title matches rank first, then keywords/aliases, then
 *   category, then description. A whole-phrase title hit outranks
 *   everything. Ties keep the input order (stable sort).
 */

export interface SearchFields {
  title: string
  /** Aliases / target keywords — slug words for navigation tools, the
   *  registry `keyword` for directory tools. */
  keywords?: string[]
  categoryName?: string
  description?: string
}

const TITLE_WEIGHT = 10
const KEYWORD_WEIGHT = 6
const CATEGORY_WEIGHT = 3
const DESCRIPTION_WEIGHT = 2
const TITLE_PHRASE_BONUS = 20
const KEYWORD_PHRASE_BONUS = 10

function words(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

/** Score for one entry, or null when it does not match. */
function scoreEntry(query: string, fields: SearchFields): number | null {
  const queryWords = words(query)
  if (queryWords.length === 0) return null

  const title = fields.title.toLowerCase()
  const keywords = (fields.keywords ?? []).map((k) => k.toLowerCase())
  const category = (fields.categoryName ?? '').toLowerCase()
  const description = (fields.description ?? '').toLowerCase()

  let score = 0
  for (const word of queryWords) {
    if (title.includes(word)) score += TITLE_WEIGHT
    else if (keywords.some((k) => k.includes(word))) score += KEYWORD_WEIGHT
    else if (category.includes(word)) score += CATEGORY_WEIGHT
    else if (description.includes(word)) score += DESCRIPTION_WEIGHT
    else return null // every word must match somewhere
  }

  // Whole-phrase hits outrank word-scatter hits.
  const phrase = query.trim().toLowerCase()
  if (title.includes(phrase)) score += TITLE_PHRASE_BONUS
  else if (keywords.some((k) => k.includes(phrase))) score += KEYWORD_PHRASE_BONUS
  return score
}

/**
 * Filter + rank entries by the shared rules. Returns at most `limit`
 * entries (unlimited when omitted). An empty/blank query matches nothing.
 */
export function searchEntries<T>(
  query: string,
  entries: T[],
  getFields: (entry: T) => SearchFields,
  limit?: number
): T[] {
  if (!query.trim()) return []
  const scored = entries
    .map((entry, index) => ({ entry, index, score: scoreEntry(query, getFields(entry)) }))
    .filter((s): s is { entry: T; index: number; score: number } => s.score !== null)
    .sort((a, b) => b.score - a.score || a.index - b.index)
  const ranked = scored.map((s) => s.entry)
  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked
}
