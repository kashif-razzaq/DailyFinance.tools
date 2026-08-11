import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Briefcase, PlaySquare, TrendingUp } from "lucide-react"

export default function Home() {
  const tools = [
    {
      title: "Freelance Hourly Rate",
      description: "Calculate what you need to charge to hit your monthly goals.",
      slug: "freelance-hourly-rate",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      tag: "Freelance"
    },
    {
      title: "YouTube AdSense Estimator",
      description: "Project your revenue based on niche, RPM, and views.",
      slug: "youtube-adsense-estimator",
      icon: <PlaySquare className="h-6 w-6 text-accent" />,
      tag: "Creator"
    },
    {
      title: "E-commerce ROAS Target",
      description: "Determine the exact Return on Ad Spend needed to break even.",
      slug: "ecommerce-roas-target",
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />,
      tag: "E-commerce"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
            Smarter Tools for <br className="hidden md:block" />
            <span className="text-primary">Modern Finance</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A premium collection of 50+ financial calculators designed for freelancers, creators, gig-workers, and entrepreneurs.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/tools">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                Browse All Tools
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-background">
                Unlock Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20 px-4 container mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Popular Calculators</h2>
            <p className="text-muted-foreground mt-2">Our most used tools right now.</p>
          </div>
          <Link href="/tools" className="hidden sm:block text-primary hover:underline font-medium">
            View all 50+ tools &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group h-full flex">
              <Card className="w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 bg-card flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-muted p-3 rounded-xl">
                      {tool.icon}
                    </div>
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {tool.tag}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm text-muted-foreground">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <Calculator className="h-16 w-16 mx-auto opacity-80" />
          <h2 className="text-4xl font-bold">Stop guessing with your money.</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of modern workers who use DailyFinance.tools to track their goals, optimize their rates, and manage their wealth.
          </p>
          <div className="pt-4">
            <Link href="/pricing">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-10">
                Start for $2.99/mo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
