import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { DashboardSidebar } from "@/components/layout/DashboardSidebar"
import { DashboardMobileNav } from "@/components/layout/DashboardMobileNav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  // Secure all dashboard routes
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Check Subscription Status
  let isPro = false
  const { data: dbUser } = await supabase
    .from('users')
    .select('subscription_status')
    .eq('id', user.id)
    .single()
    
  if (dbUser?.subscription_status === 'active') {
    isPro = true
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/20 pb-16 md:pb-0">
      <DashboardSidebar isPro={isPro} />


      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>

      <DashboardMobileNav />
    </div>
  )
}
