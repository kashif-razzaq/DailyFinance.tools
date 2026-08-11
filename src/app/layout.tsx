import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "DailyFinance | Precision Financial Calculators",
  description: "High-speed directory of interactive financial calculators for modern entrepreneurs.",
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
        </ConditionalLayout>
      </body>
    </html>
  );
}
