/**
 * CalcWord — the hero's signature word. "calculators" set in an animated
 * brand-orange gradient with the DailyFinance bar chart living underneath
 * as a tiny equalizer (bars rise and fall like a market ticker).
 * Styling lives in globals.css (.calc-word / .calc-word-bars).
 */
export function CalcWord({ children = 'calculators' }: { children?: string }) {
  const bars = [45, 72, 100, 58, 86, 64, 78]
  return (
    <span className="calc-word">
      {children}
      <span className="calc-word-bars" aria-hidden="true">
        {bars.map((h, i) => (
          <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.13}s` }} />
        ))}
      </span>
    </span>
  )
}
