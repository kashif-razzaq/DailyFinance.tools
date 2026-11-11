import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Crown, Sparkles } from "lucide-react"
import Link from "next/link"
import { getToolUrl, navigationCategories } from "@/config/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { safeGetUser } from "@/utils/supabase/safe-user"

// The Pro-exclusive suite comes straight from the Pro Tools navigation
// category — the same five tools that sit behind ProGuard at /pro/*.
const proCategory = navigationCategories.find((cat) => cat.slug === "pro")
const proTools = proCategory?.calculators ?? []
const proSlugs = new Set(proTools.map((c) => c.slug))

// The advanced end of the free suite, pulled from the real navigation
// data so this library can never drift from what is actually published.
const ADVANCED_SLUGS = [
  "coast-fire",
  "fat-fire",
  "brrrr",
  "roth-ira-conversion",
  "debt-avalanche",
  "capital-gains",
  "s-corp",
  "house-hacking",
]

const advancedFreeTools = navigationCategories.flatMap((cat) =>
  cat.calculators
    .filter((calc) => !proSlugs.has(calc.slug) && ADVANCED_SLUGS.some((s) => calc.slug.includes(s)))
    .map((calc) => ({
      id: calc.slug,
      title: calc.title,
      description: calc.description,
      category: cat.name,
    })),
)

export default async function ProToolsLibrary() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() } } }
  )
  const user = await safeGetUser(supabase)
  let isPro = false
  if (user) {
    const { data: profile } = await supabase.from("users").select("subscription_status").eq("id", user.id).single()
    isPro = profile?.subscription_status === "active"
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">Pro Tools Library</h1>
          <p className="text-muted-foreground mt-1">
            The five Pro-exclusive simulators, plus the most advanced free calculators in the suite.
          </p>
        </div>
      </div>

      {/* ── Pro exclusive ─────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Crown className="h-5 w-5 text-[#D97706]" /> Pro exclusive
          <span className="text-sm font-medium text-muted-foreground">— included with Pro, $2.99/mo</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {proTools.map((tool) => (
            <Card key={tool.slug} className="relative overflow-hidden group flex flex-col border-[#D97706]/30 hover:border-[#D97706]/60 transition-colors bg-card shadow-sm">
              <CardHeader className="pb-4 flex-1">
                <div className="flex justify-between items-start">
                  <div className="bg-[#D97706]/10 p-2 rounded-lg text-[#D97706] mb-3">
                    <Crown className="h-5 w-5" />
                  </div>
                  <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/20">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro Exclusive
                  </span>
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="pt-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4 border-t mt-auto bg-muted/20">
                <Link href={getToolUrl(tool.slug)} className="w-full">
                  <Button variant="default" className="w-full justify-between shadow-sm">
                    {isPro ? "Open Calculator" : "Preview the tool"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {!isPro && (
          <p className="text-sm text-muted-foreground">
            You can preview each Pro tool — the calculator itself unlocks with{" "}
            <Link href="/pricing" className="font-semibold text-[#064E3B] underline">
              Pro ($2.99/mo)
            </Link>
            .
          </p>
        )}
      </section>

      {/* ── Advanced free tools ───────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Sparkles className="h-5 w-5 text-primary" /> Advanced free tools
          <span className="text-sm font-medium text-muted-foreground">— free for everyone, forever</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advancedFreeTools.map((tool) => (
            <Card key={tool.id} className="relative overflow-hidden group flex flex-col border-border/50 hover:border-border transition-colors bg-card shadow-sm">
              <CardHeader className="pb-4 flex-1">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary mb-3">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Free
                  </span>
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="pt-2">{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-4 border-t mt-auto bg-muted/20">
                <Link href={getToolUrl(tool.id)} className="w-full">
                  <Button variant="default" className="w-full justify-between shadow-sm">
                    Open Calculator
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
