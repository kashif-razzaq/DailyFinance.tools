import type { Metadata } from 'next'
import { ResetPasswordForm } from './ResetPasswordForm'

type PageProps = {
  searchParams: Promise<{ mode?: string | string[] }>
}

function isInviteMode(params: { mode?: string | string[] } | undefined): boolean {
  const raw = Array.isArray(params?.mode) ? params.mode[0] : params?.mode
  return raw === 'invite'
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  if (isInviteMode(params)) {
    return {
      title: 'Set your password — DailyFinance',
      description: 'Set a password to finish setting up your DailyFinance account.',
      robots: { index: false, follow: true },
    }
  }
  return {
    title: 'Choose a new password — DailyFinance',
    description: 'Choose a new password for your DailyFinance account.',
    robots: { index: false, follow: true },
  }
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const params = await searchParams
  const mode = isInviteMode(params) ? 'invite' : 'reset'
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <ResetPasswordForm mode={mode} />
      </div>
    </div>
  )
}
