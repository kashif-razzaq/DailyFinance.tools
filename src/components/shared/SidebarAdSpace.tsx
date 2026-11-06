import { AdSlot } from "@/components/shared/AdSlot"

/** Sticky sidebar ad (300x600 capable). Renders a real unit once the AdSense
 *  publisher ID + sidebar slot are configured; invisible in production until then. */
export function SidebarAdSpace() {
  return (
    <AdSlot
      slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR}
      label="Sidebar AdSense Placement"
      className="w-full min-h-[600px] rounded-3xl"
    />
  )
}
