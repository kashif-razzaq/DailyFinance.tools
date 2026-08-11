export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sleek, Minimalist Financial Bar Chart */}
      <rect x="20" y="55" width="14" height="25" rx="4" fill="currentColor" />
      <rect x="43" y="35" width="14" height="45" rx="4" fill="currentColor" />
      {/* Sovereign Gold Accent Bar */}
      <rect x="66" y="15" width="14" height="65" rx="4" fill="#D97706" />
    </svg>
  )
}
