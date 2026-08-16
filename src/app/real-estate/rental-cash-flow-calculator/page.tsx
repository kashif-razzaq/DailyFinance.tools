import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"

export default function Page() {
  return (
    <ToolLayout title="Rental Cash Flow Calculator" description="Calculate cap rate, cash on cash return, and monthly net operating income." slug="rental-cash-flow-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<div className="prose max-w-none"><p>Stub content.</p></div>)}
    </ToolLayout>
  )
}
