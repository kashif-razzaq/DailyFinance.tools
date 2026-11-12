import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { organization, webSite, siteNavigation, stringifyJsonLd } from "@/lib/schema";
import { Footer } from "@/components/layout/Footer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { FloatingConsultationBubble } from "@/components/shared/FloatingConsultationBubble";
import { AdSenseScript } from "@/components/shared/AdSenseScript";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const SITE_DESCRIPTION =
  '100+ free financial calculators: mortgages, loans, taxes, retirement, freelance rates, creator earnings and e-commerce margins. No signup required.';

// Browser chrome colour, matched to the site's own backgrounds in both modes.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dailyfinance.tools'),
  title: {
    default: 'DailyFinance.tools | 100+ Free Financial Calculators',
    template: '%s',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'financial calculators',
    'freelance tax calculator',
    'creator economy calculators',
    'ecommerce profit calculator',
    'real estate investment calculator',
    'FIRE calculator',
    'hourly rate calculator',
    'compound interest calculator',
    'business finance tools',
  ],
  // Canonical for the homepage only: the home page is a client component and
  // cannot export metadata. Every other indexable route defines its own
  // canonical (via generateCalculatorMetadata or its own metadata export),
  // which overrides this value; it is otherwise inherited only by the
  // robots-disallowed /dashboard, /login and /embed routes.
  alternates: {
    canonical: 'https://www.dailyfinance.tools/',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'DailyFinance.tools | 100+ Free Financial Calculators',
    description: SITE_DESCRIPTION,
    url: 'https://www.dailyfinance.tools',
    siteName: 'DailyFinance.tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.dailyfinance.tools/images/og-base.jpg',
        width: 1376,
        height: 768,
        alt: 'DailyFinance.tools — free financial calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailyFinance.tools | 100+ Free Financial Calculators',
    description: SITE_DESCRIPTION,
    images: ['https://www.dailyfinance.tools/images/og-base.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        {/* Apply the stored/system theme before first paint (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('df-theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <AdSenseScript />
        <script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(organization()) }}
        />
        <script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(webSite()) }}
        />
        <script
          id="schema-navigation"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(siteNavigation()) }}
        />
        <ConditionalLayout header={<Navbar />} footer={<Footer />}>
          {children}
          <FloatingConsultationBubble />
        </ConditionalLayout>
      </body>
    </html>
  );
}
