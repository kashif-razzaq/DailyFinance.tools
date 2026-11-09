import { MobileHome } from '@/components/home/MobileHome'
import { DesktopHome } from '@/components/home/DesktopHome'

/**
 * Homepage — two purpose-built trees sharing one retention engine
 * (useMyTools): an app-style layout on phones, and a full desktop layout
 * from md up. Both render from the live navigation/guide data, so counts,
 * links and picks are always current.
 */
export default function HomePage() {
  return (
    <>
      <div className="md:hidden">
        <MobileHome />
      </div>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
    </>
  )
}
