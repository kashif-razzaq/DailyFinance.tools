import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Instagram Money Calculator – Free, Instant Results (2026)', description: 'Use our free Instagram Money Calculator to estimate what an Instagram post, reel or story is worth. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['instagram money calculator', 'instagram earnings calculator', 'how much do instagram influencers make', 'instagram post price calculator'], slug: "creator/instagram-money-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="Instagram Money Calculator" description="Use our free Instagram Money Calculator to estimate what an Instagram post, reel or story is worth. Instant results with formula, worked examples and FAQs. No signup required." slug="instagram-money-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Instagram Money Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
