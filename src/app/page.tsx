import { MobileHome } from '@/components/home/MobileHome'
import { DesktopHome } from '@/components/home/DesktopHome'
import { GUIDES } from '@/data/guides'
import type { GuideSummary } from '@/data/guide-meta'

/**
 * Homepage — two purpose-built trees sharing one retention engine
 * (useMyTools): an app-style layout on phones, and a full desktop layout
 * from md up. Both render from the live navigation/guide data, so counts,
 * links and picks are always current.
 *
 * The home guide cards need only 6 fields per guide. They are computed
 * here (server) and passed as props — the home components must NOT import
 * GUIDES themselves, or the full ~2.1 MB guide dataset ships in a client
 * JS chunk on every page (ARB round 2, issue 1).
 */
const HOME_GUIDES: GuideSummary[] = GUIDES.slice(0, 8).map(
  ({ slug, title, description, image, imageAlt, hub }) => ({ slug, title, description, image, imageAlt, hub }),
)

export default function HomePage() {
  return (
    <>
      <div className="md:hidden">
        <MobileHome guides={HOME_GUIDES} />
      </div>
      <div className="hidden md:block">
        <DesktopHome guides={HOME_GUIDES} />
      </div>
    </>
  )
}
