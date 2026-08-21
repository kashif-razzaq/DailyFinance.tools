import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"

export default function Page() {
  return (
    <ToolLayout title="House Hacking ROI Calculator" description="Calculate your effective housing cost." slug="house-hacking-roi-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<div className="prose max-w-none"><p>Stub content.</p></div>)}
    </ToolLayout>
  )
}
