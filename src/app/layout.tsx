import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { FloatingConsultationBubble } from "@/components/shared/FloatingConsultationBubble";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://dailyfinance.tools'),
  title: {
    default: 'DailyFinance | 57+ Free & Pro Financial Calculators',
    template: '%s',
  },
  description:
    'Free 57+ professional financial calculators. Optimize taxes, investments, cash flow, and wealth building with precision-engineered tools. No signup required.',
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
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'DailyFinance | Professional Financial Calculators',
    description:
      'Free 57+ professional financial calculators. Optimize taxes, investments, cash flow, and wealth building with precision-engineered tools. No signup required.',
    url: 'https://dailyfinance.tools',
    siteName: 'DailyFinance Tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DailyFinance | Professional Financial Calculators',
    description:
      'Free 57+ professional financial calculators. Optimize taxes, investments, cash flow, and wealth building with precision-engineered tools. No signup required.',
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
    name: "DailyFinance",
    url: "https://dailyfinance.tools",
    logo: "https://dailyfinance.tools/logo.png",
    sameAs: [],
    description:
      "Free 57+ professional financial calculators for freelancers, creators, ecommerce sellers, real estate investors, and wealth builders.",
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DailyFinance",
    url: "https://dailyfinance.tools",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dailyfinance.tools/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Freelance Tools",
      "Creator Economy Tools",
      "Ecommerce Tools",
      "Real Estate Tools",
      "Personal Wealth Tools",
    ],
    url: [
      "https://dailyfinance.tools/freelance/freelance-hourly-rate-calculator",
      "https://dailyfinance.tools/creator/youtube-adsense-estimator",
      "https://dailyfinance.tools/ecommerce/shopify-margin-calculator",
      "https://dailyfinance.tools/real-estate/rental-cash-flow-calculator",
      "https://dailyfinance.tools/personal-wealth/compound-interest-scaler-calculator",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
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
