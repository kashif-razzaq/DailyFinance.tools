import { AuthForm } from "@/components/auth/AuthForm"
import { Quote, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
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

      {/* Right Column: Crafted Visual/Quote (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden bg-primary">
        
        {/* Deep Green Base with Sovereign Gold Glows */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#d97706]/30 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-blue-400/10 to-transparent rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        {/* Abstract Financial Pattern (Grid, Candlesticks & Trendline) */}
        <div className="absolute inset-0 opacity-[0.15]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-100" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Subtle upward trending line */}
            <path d="M-100,900 Q300,700 500,600 T1000,400 T1500,100" fill="none" stroke="#d97706" strokeWidth="3" opacity="0.7" />
            
            {/* Abstract Candlesticks */}
            <g opacity="0.6">
              {/* Bullish */}
              <rect x="200" y="680" width="12" height="60" rx="4" fill="#3b82f6" />
              <line x1="206" y1="650" x2="206" y2="770" stroke="#3b82f6" strokeWidth="2" />

              {/* Bullish */}
              <rect x="450" y="580" width="12" height="80" rx="4" fill="#3b82f6" />
              <line x1="456" y1="530" x2="456" y2="690" stroke="#3b82f6" strokeWidth="2" />

              {/* Bearish (Orange Accent) */}
              <rect x="750" y="450" width="12" height="50" rx="4" fill="#d97706" />
              <line x1="756" y1="420" x2="756" y2="530" stroke="#d97706" strokeWidth="2" />

              {/* Bullish */}
              <rect x="1100" y="320" width="12" height="90" rx="4" fill="#3b82f6" />
              <line x1="1106" y1="280" x2="1106" y2="450" stroke="#3b82f6" strokeWidth="2" />
            </g>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-lg px-12">
          <Quote className="h-12 w-12 text-[#d97706] mb-6 opacity-90" />
          <blockquote className="space-y-6">
            <p className="text-3xl font-medium text-white leading-tight font-sans">
              "Understanding your numbers is the difference between working for a living and building true wealth. DailyFinance brings clarity to the chaos."
            </p>
            <footer className="text-[#d97706] font-mono text-sm uppercase tracking-widest">
              &mdash; The DailyFinance Team
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
