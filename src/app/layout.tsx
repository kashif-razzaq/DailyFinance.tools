import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
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
    template: '%s | DailyFinance',
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <ConditionalLayout header={<Navbar />} footer={<Footer />}>
          {children}
          <FloatingConsultationBubble />
        </ConditionalLayout>
      </body>
    </html>
  );
}
