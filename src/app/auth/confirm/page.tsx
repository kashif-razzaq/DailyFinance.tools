import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { ConfirmClient } from './ConfirmClient'

export const metadata: Metadata = {
  title: 'Confirming your link — DailyFinance',
  description: 'Verifying your DailyFinance sign-in link.',
  robots: { index: false, follow: true },
}

/**
 * Suspense fallback: the verifying shell. Shown in the prerendered HTML
 * and while the client component hydrates — same look as the verifying
 * state, so there is no visual jump.
 */
function ConfirmFallback() {
  return (
    <div className="py-8 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin motion-reduce:animate-none" />
      <h2 className="text-xl font-bold tracking-tight text-foreground mt-2">
        Verifying your link…
      </h2>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-sm">
        {/* White card in the site's look and feel, with the logo lockup
            as on the login panel — mark + wordmark, gold rule below. */}
        <div className="rounded-2xl border border-border bg-card shadow-sm px-6 py-10 sm:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2.5">
              <Logo className="h-10 w-10" />
              <span className="text-2xl font-extrabold tracking-tight text-foreground">
                DailyFinance<span className="text-[#D97706]">.tools</span>
              </span>
            </div>
            <div className="mt-5 h-[3px] w-9 bg-[#D97706]" aria-hidden="true" />
          </div>

          <Suspense fallback={<ConfirmFallback />}>
            <ConfirmClient />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
