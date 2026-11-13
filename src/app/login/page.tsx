import { AuthForm } from "@/components/auth/AuthForm"
import { Logo } from "@/components/layout/Logo"
import { ArrowLeft, Banknote, Calculator, Home, TrendingUp } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { safeGetUser } from "@/utils/supabase/safe-user"

/**
 * Only same-site relative paths may be used as the post-login destination.
 * Mirrors getSafeNext in src/app/auth/callback/route.ts — a crafted `next`
 * param must never turn this page into an open redirect.
 */
function getSafeNext(raw: string | null | undefined): string {
  if (!raw) return "/dashboard"
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard"
  if (raw.includes("://") || raw.includes("\\")) return "/dashboard"
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) return "/dashboard"
  return raw
}

/**
 * Right-panel tool tiles: real tools with their real names and categories,
 * styled like the homepage popular-tools cards. Name + category only —
 * no invented figures.
 */
const PANEL_TOOLS = [
  { icon: Home, name: "Mortgage Payment Calculator", category: "Real Estate", chip: "bg-emerald-100 text-[#064E3B]" },
  { icon: Banknote, name: "Take-Home Pay Calculator", category: "Tax & Salary", chip: "bg-amber-100 text-[#92400E]" },
  { icon: TrendingUp, name: "Compound Interest Calculator", category: "Personal Wealth", chip: "bg-teal-100 text-teal-800" },
  { icon: Calculator, name: "Paycheck Calculator", category: "Tax & Salary", chip: "bg-emerald-100 text-[#064E3B]" },
]

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>
}) {
  // Already signed in? There is nothing to log in to — send them to their
  // destination (or the dashboard), never the login form.
  const resolved = (await searchParams) ?? {}
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const supabase =
    supabaseUrl && supabaseKey
      ? createServerClient(supabaseUrl, supabaseKey, {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
          },
        })
      : null
  const user = supabase ? await safeGetUser(supabase) : null
  if (user) redirect(getSafeNext(resolved.next))

  return (
    <div className="min-h-screen w-full flex">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background relative z-10">
        <div className="w-full max-w-sm space-y-8">
          <AuthForm defaultMode="login" />
        </div>
      </div>

      {/*
        Right Column (hidden on mobile): the site's own look and feel —
        the real logo lockup, the homepage hero's soft glows, and mini
        tool cards in the homepage popular-tools style. Light theme,
        matching the rest of the site.
      */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden bg-[#F7F9F8]">
        {/* Soft hero-style glows, same treatment as the desktop homepage hero */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-emerald-500/[0.08] blur-3xl" />
          <div className="absolute -bottom-16 -left-24 h-72 w-72 rounded-full bg-amber-500/[0.08] blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md px-12 xl:px-8">
          {/* Logo lockup, as on the site header — mark + wordmark */}
          <div className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              DailyFinance<span className="text-[#D97706]">.tools</span>
            </span>
          </div>

          <h2 className="mt-10 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground">
            Know your <span className="text-[#064E3B]">numbers.</span>
          </h2>
          <p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">
            Every calculator on this site answers one question: what does
            this cost me, really?
          </p>

          {/* Mini tool cards, like the homepage popular tools */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            {PANEL_TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <div key={tool.name} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tool.chip}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-[15px] font-bold leading-tight text-foreground">{tool.name}</p>
                  <p className="mt-1 text-[13px] font-light text-muted-foreground">{tool.category}</p>
                </div>
              )
            })}
          </div>

          <p className="mt-10 border-t border-border pt-6 text-sm font-medium text-muted-foreground">
            116 calculators &middot; 51 state guides &middot; No sign-up to calculate
          </p>
        </div>
      </div>
    </div>
  )
}
