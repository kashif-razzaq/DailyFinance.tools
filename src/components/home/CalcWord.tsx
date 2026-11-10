/**
 * CalcWord — the hero's signature word. "calculators" in the brand orange:
 * the letters rise in one by one, a light shine ripples across the word on
 * a slow loop, and an amber underline draws itself in underneath — a small
 * signature moment for the page. Styling lives in globals.css (.calc-word*).
 */
export function CalcWord({ children = 'calculators' }: { children?: string }) {
  const letters = children.split('')
  return (
    <span className="calc-word" role="text" aria-label={children}>
      <span aria-hidden="true">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="calc-word-letter"
            style={{ animationDelay: `${i * 0.045}s, ${0.7 + i * 0.09}s` }}
          >
            {letter}
          </span>
        ))}
      </span>
      <svg className="calc-word-underline" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 9 C 30 3, 60 11, 117 5" pathLength={100} />
      </svg>
    </span>
  )
}
