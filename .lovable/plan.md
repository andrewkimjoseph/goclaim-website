
## Problem

The `.app-shell` is capped at `max-w-[460px]` (mobile) / `max-w-2xl` (md+) and centered, so on tablet/desktop the body's default white background shows on the left and right of the green column.

## Fix the white sides (all breakpoints)

Paint the page background green so nothing white ever shows behind the shell:
- Set `body { background-color: var(--color-shell); }` in `src/styles.css`.
- Keep `.app-shell` as the centered content column (now seamless against the body).

## Per-breakpoint layouts

Mobile stays exactly as it is today. Tablet and desktop get genuinely different compositions instead of just a wider mobile column.

### Mobile (< 768px) — unchanged
- Single column, `max-w-[460px]`, stacked CTAs, vertical step cards, vertical FAQ list.

### Tablet (768–1023px)
- Content column widens to `max-w-3xl`.
- Landing: hero stays centered; CTAs sit side-by-side in a 2-column grid (`Get started` | `Read FAQs`); "How it works" becomes a 3-column grid of step cards.
- FAQs: 2-column grid of accordion items, with a wider intro block above.
- About: text cards stay full width for readability; "Built with" list goes 3-column; bottom CTA constrained to `max-w-sm` and centered.
- Header pills slightly larger; logo unchanged.

### Desktop (≥ 1024px)
- Content column widens to `max-w-5xl` with `px-8`.
- Landing: split hero — left column has the logo + headline + subhead + stacked CTAs (left-aligned), right column shows the "How it works" 3 steps stacked vertically as a side panel. Below the fold: a wider edge-to-edge band (still inside the column) with a secondary "Why GoClaim" callout strip (3 short value props in a row) reusing existing card tokens — no new copy invented, derived from existing How-it-works/About content.
- FAQs: 2-column accordion grid with a sticky-feeling intro on the left at `lg:` (intro column + accordion column using `lg:grid-cols-[18rem_1fr]`).
- About: 2-column grid for the 5 cards (text cards span 2, "Built with" + "Your wallet stays yours" sit side-by-side); "How it works" steps go 3-across.
- Bottom CTA on FAQs/About constrained to `max-w-sm` and left-aligned (not stretched edge-to-edge).

All breakpoint changes use Tailwind responsive prefixes (`md:`, `lg:`) on existing markup — no new components needed beyond minor wrappers. Brutalist tokens (2px radius, hard shadows, 2px black borders, color palette) are preserved at every breakpoint.

## Files touched

- `src/styles.css` — set body bg to shell green; widen `.app-shell` max-width at `lg:` to `max-w-5xl` and bump horizontal padding at `lg:`.
- `src/routes/index.tsx` — responsive grid for CTAs and How-it-works; desktop split hero.
- `src/routes/faqs.tsx` — responsive grid for accordion + intro/accordion split at `lg:`; constrain bottom CTA.
- `src/routes/about.tsx` — responsive 2-col grid for cards; 3-col "Built with"; constrain bottom CTA.
- `src/components/Header.tsx` — no structural change; nav pills only.

## Out of scope

- No new copy, no new sections beyond the desktop value-props strip (which reuses existing wording).
- No color, font, radius, or shadow changes.
- No wallet/backend code.

## Verification

After build, check `/`, `/faqs`, `/about` at mobile / tablet / desktop viewports. Confirm: no white margins at any width, mobile layout unchanged, tablet shows multi-column grids, desktop shows split hero and 2-column content.
