import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"

export default function Page() {
  return (
    <ToolLayout title="BRRRR Strategy Analyzer" description="Buy, Rehab, Rent, Refinance, Repeat ROI." slug="brrrr-strategy-analyzer" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<div className="prose max-w-none"><p>Stub content.</p></div>)}
    </ToolLayout>
  )
}
