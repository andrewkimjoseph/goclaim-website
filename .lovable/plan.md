## Problem

On the FAQs page, the cards sit in a 2-column CSS grid. When one card is expanded, its grid row stretches to match the tallest sibling, leaving a big empty white box next to it (the "Who can use it?" card in the screenshot looks empty because it's been stretched).

Secondary issues with the current accordion:
- No animation — the panel just snaps open.
- The toggle icon uses raw `+` / `−` characters which look misaligned against the brutalist square.
- The whole card is the click target but there's no hover/focus affordance.

## Plan

### 1. Stop sibling cards from stretching
In `src/routes/faqs.tsx`, change the grid container so each card sizes to its own content instead of filling the row:
- Add `auto-rows-min` (and `items-start`) to the `md:grid-cols-2 lg:grid-cols-2` grid.
- Result: an expanded card grows downward; the neighbor keeps its natural collapsed height.

### 2. Smooth open/close animation
In `src/components/Faq.tsx`, swap the bare `<details>` for an accessible controlled accordion:
- `useState` for open, `aria-expanded`, `aria-controls`, button summary.
- Animate the panel height using a CSS grid-rows `0fr → 1fr` trick (no JS measuring, respects reduced-motion). Duration ~180ms, brutalist easing (`ease-out`).
- Keep the existing `.card` brutalist shell (2px border, hard shadow) and `.faq-toggle` square.

### 3. Polish the toggle and interaction
- Replace the `+ / −` glyphs with proper SVG icons (plus / minus) centered in the square so they read crisply at all sizes.
- Add `hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000]` micro-interaction on the card to match the brutalist buttons elsewhere.
- Add a visible focus ring (`focus-visible:outline-2 outline-[#F83028]`) on the summary button for keyboard users.

### 4. Optional: single-open behavior
Keep multi-open (current behavior) — simpler and matches the app. No state lifting needed.

## Files touched

- `src/routes/faqs.tsx` — add `auto-rows-min items-start` to the FAQ grid.
- `src/components/Faq.tsx` — rewrite as controlled accordion with animated panel, SVG icons, hover/focus polish.

No copy changes, no new dependencies, no routing changes.
