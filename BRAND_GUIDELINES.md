# Brand & Design Guidelines: DailyFinance

## 1. Core Identity
- **Brand Name:** DailyFinance (Dropping the ".tools" for a cleaner, more authoritative feel).
- **Vibe:** Premium, modern, authoritative, and slightly playful. It should feel like a high-end fintech app (Stripe meets Robinhood), not a boring 2010s tax blog.
- **Motif:** Growth, precision, wealth. The "Forest & Gold" theme.

## 2. Color System
The color system relies on high-contrast, rich tones:
- **Background:** `#FAFAFA` (Off-white, almost eggshell) for a clean canvas.
- **Surface (Cards):** `#FFFFFF` with very subtle, large radius box-shadows.
- **Primary:** `#064E3B` (Deep Emerald/Forest Green) - Used for primary buttons, massive headings, and active states. Projects wealth and stability.
- **Accent:** `#D97706` (Rich Amber/Gold) - Used for premium features, CTAs, and highlight spans. Projects exclusivity.
- **Interactive/Success:** `#10B981` (Vibrant Mint/Emerald) - For success states, positive numbers, and interactive hover states.
- **Text:** `#1F2937` (Very Dark Slate) - High readability, softer than pure black.

## 3. Typography
- **Headings & Body:** `Plus Jakarta Sans` - Sleek, geometric, highly legible at small sizes. Used for all UI text, paragraphs, and standard headings. Tight tracking (`tracking-tight`).
- **Numbers & Data:** `JetBrains Mono` - Used exclusively for calculation inputs, outputs, currency symbols, and code snippets. Gives a "terminal/precise" developer-centric feel.

## 4. UI/UX "Scandinavian Minimal" Principles
1. **Flat & Crisp:** Avoid deep shadows, glowing gradients, or heavy depth effects. Use crisp borders (`border-border`), subtle flat shadows (`shadow-sm`), and negative space.
2. **Glassmorphism:** Use `backdrop-blur` selectively on fixed elements (navbars, sticky headers) but do not combine it with colored glowing blobs. Keep it clean.
3. **Micro-Interactions:** Buttons shouldn't just change color; they should slightly scale down (`active:scale-95`) or have inner shadow changes.
4. **Zero-Clutter Inputs:** Form fields should look beautiful. Use soft borders, focus rings (`focus-visible:ring-primary`), and inline icons.

## 5. Animation Physics
- **Curve:** We avoid linear animations. Always use spring-like or ease-out curves. In Tailwind: `transition-all duration-300 ease-out`.
- **Modals:** Popups should scale up slightly (`scale-95` to `scale-100`) and fade in (`opacity-0` to `opacity-100`) to feel like they are expanding from the center.

## 6. Iconography
- Use **Lucide React**. Keep stroke widths consistent (usually `1.5` or `2`).
- Mix solid background icon containers with contrasting foreground icons (e.g., a primary green box with a white icon inside).
