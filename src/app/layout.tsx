import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { FloatingConsultationBubble } from "@/components/shared/FloatingConsultationBubble";
import { AdSenseScript } from "@/components/shared/AdSenseScript";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

const SITE_DESCRIPTION =
  '100+ free financial calculators for personal finance, mortgages, loans, taxes, retirement, freelance rates, creator earnings and e-commerce margins. No signup required.';

export const metadata: Metadata = {
  metadataBase: new URL('https://dailyfinance.tools'),
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
    canonical: 'https://dailyfinance.tools/',
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
    url: 'https://dailyfinance.tools',
    siteName: 'DailyFinance.tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://dailyfinance.tools/images/og-base.jpg',
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
    images: ['https://dailyfinance.tools/images/og-base.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DailyFinance.tools",
    url: "https://dailyfinance.tools",
    logo: "https://dailyfinance.tools/logo.svg",
    sameAs: [],
    description:
      "100+ free financial calculators for personal finance, mortgages, loans, taxes, retirement, freelancers, creators and e-commerce sellers.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "momintechltd@gmail.com",
      contactType: "customer support",
    },
  };

  // No SearchAction: the site has no search results route (the /tools
  // directory does not consume a query parameter), so claiming one would
  // point search engines at a URL that does not perform a search.
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DailyFinance.tools",
    url: "https://dailyfinance.tools",
    publisher: {
      "@type": "Organization",
      name: "DailyFinance.tools",
      url: "https://dailyfinance.tools",
    },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Freelance Tools",
      "Creator Economy Tools",
      "E-Commerce Tools",
      "Real Estate Tools",
      "Personal Wealth Tools",
      "Loans & Debt Tools",
      "Tax & Salary Tools",
      "Guides",
    ],
    url: [
      "https://dailyfinance.tools/freelance",
      "https://dailyfinance.tools/creator",
      "https://dailyfinance.tools/ecommerce",
      "https://dailyfinance.tools/real-estate",
      "https://dailyfinance.tools/personal-wealth",
      "https://dailyfinance.tools/loans",
      "https://dailyfinance.tools/tax",
      "https://dailyfinance.tools/guides",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <AdSenseScript />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Script
          id="schema-navigation"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
        <ConditionalLayout header={<Navbar />} footer={<Footer />}>
          {children}
          <FloatingConsultationBubble />
        </ConditionalLayout>
      </body>
    </html>
  );
}
