import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'

export const metadata: Metadata = {
  title: 'Sign-in link problem — DailyFinance',
  description: 'Something went wrong with your DailyFinance sign-in link.',
  robots: { index: false, follow: true },
}

/**
 * Auth error page — the callback route redirects here when a sign-in,
 * confirmation, reset or email-change link fails. The `reason` param is
 * mapped to friendly copy; Supabase's raw error_description is never
 * rendered, so no technical detail leaks to the page.
 */
const MESSAGES: Record<string, { heading: string; body: string }> = {
  expired: {
    heading: 'That link has expired',
    body: 'Links work once and last 1 hour. Request a new one below.',
  },
  failed: {
    heading: 'Something went wrong signing you in',
    body: 'Try again — if it keeps happening, request a new sign-in link.',
  },
}

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string | string[] }>
}) {
  const params = await searchParams
  const rawReason = Array.isArray(params?.reason) ? params.reason[0] : params?.reason
  const message = MESSAGES[rawReason ?? ''] ?? MESSAGES.failed

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 p-2 rounded-lg mb-4">
            <Logo className="h-8 w-8 text-primary" />
          </div>
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-2xl text-center font-bold tracking-tight text-foreground mt-4">
            {message.heading}
          </h2>
          <p className="text-center text-sm text-muted-foreground mt-2 max-w-[300px]">
            {message.body}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/login"
            className="flex w-full h-12 items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Request a new sign-in link
          </Link>
          <Link
            href="/auth/forgot-password"
            className="flex w-full h-12 items-center justify-center rounded-xl border text-base font-semibold hover:bg-muted/50 transition-all active:scale-[0.98]"
          >
            Reset your password
          </Link>
        </div>
      </div>
    </div>
  )
}
