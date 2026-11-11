import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import Link from "next/link"
import { FolderGit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSavedCalculatorsAction } from "@/actions/calculator.actions"
import { VaultBrowser } from "@/components/dashboard/VaultBrowser"
import { safeGetUser } from "@/utils/supabase/safe-user"

export default async function DashboardPage() {
  const savedCalculators = await getSavedCalculatorsAction()

  // Pro status drives the Vault's usage meter and the compare gate.
  let isPro = false
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (supabaseUrl && supabaseKey) {
    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: { getAll() { return cookieStore.getAll() } },
    })
    const user = await safeGetUser(supabase)
    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("subscription_status")
        .eq("id", user.id)
        .single()
      isPro = profile?.subscription_status === "active"
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scenario Vault</h1>
          <p className="text-muted-foreground mt-1">
            Your saved scenarios, organized by hub. Open one and the calculator restores your exact numbers.
          </p>
        </div>
        <Link href="/dashboard/analytics">
          <Button variant="outline" className="rounded-full">View analytics</Button>
        </Link>
      </div>

      {savedCalculators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-48 h-48 mb-6 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl rotate-3"></div>
            <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-6 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-sm">
              <FolderGit2 className="w-16 h-16 text-primary opacity-50" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Your vault is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Run any calculator, hit Save, and your scenario lands here — grouped by hub, ready to reopen, compare and build on.
          </p>
          <Link href="/tools">
            <Button size="lg" className="rounded-full px-8">Browse Tools</Button>
          </Link>
        </div>
      ) : (
        <VaultBrowser calculators={savedCalculators} isPro={isPro} />
      )}
    </div>
  )
}
