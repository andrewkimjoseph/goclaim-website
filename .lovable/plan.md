
## Goal

Build a static 3-page marketing site for GoClaim that visually matches the live dapp at app.goclaim.xyz (brutalist style, green shell, watermelon logo). All primary CTAs link out to the dapp. No wallet, no backend, no dashboard.

## Pages

- `/` — Hero with logo, headline "Your UBI, on autopilot.", subhead, two CTAs (Get started → app.goclaim.xyz, Read FAQs → /faqs), and a "How it works" 3-step section.
- `/faqs` — Intro + 8-item `<details>` accordion (verbatim copy from spec) + bottom "Get started" CTA.
- `/about` — Intro + 5 white card sections (What is GoClaim?, Who is it for?, How it works (reused step layout), Your wallet stays yours, Built with) + "Open GoClaim" CTA.

## Design system

Add tokens to `src/styles.css` via `@theme`:
- Colors: `shell #085020`, `primary #F83028`, `accent #80B040`, `foreground #000`, `background #fff`
- Radius: `--radius-brutal: 2px`
- Shadows registered as utilities: `shadow-brutal` (`4px 4px 0 0 #000`), `shadow-brutal-sm` (`3px 3px 0 0 #000`)
- Fonts: Bricolage Grotesque (display) + Hanken Grotesk (body), loaded via `<link>` tags in `src/routes/__root.tsx` (per Tailwind v4 rule — no URL `@import` in CSS). Expose as `--font-display` and `--font-sans`.
- `theme-color` meta `#085020` set in root head.

Component classes defined as `@utility` in `src/styles.css`: `.app-shell`, `.header-bar`, `.section-label-inverse`, `.btn-hero-primary`, `.btn-hero-tertiary`, `.card`, `.step-badge` — matching the CSS provided in the spec.

## Assets

Download `https://app.goclaim.xyz/brand/watermelon.png` to `public/brand/watermelon.png`. Set as favicon and use in header (48px) and hero (128px).

## Routes & files

```
src/routes/
  __root.tsx          (update: fonts <link>, theme-color, favicon, default meta)
  index.tsx           (landing: hero + how it works)
  faqs.tsx            (FAQs page)
  about.tsx           (About page)
src/components/
  Shell.tsx           (app-shell wrapper)
  Header.tsx          (logo + nav pills, prop-driven for which pills to show)
  Footer.tsx          ("GoClaim — built on Celo + GoodDollar")
  Step.tsx            (step badge + title + description card row)
  Faq.tsx             (single <details> accordion item with +/− toggle)
public/brand/watermelon.png
```

Each route file uses `createFileRoute` with per-route `head()` setting title, description, og:title, og:description, og:url, and `<link rel="canonical">` (relative paths since no domain baked in).

## Behavior

- External CTAs use plain `<a href="https://app.goclaim.xyz" rel="noopener noreferrer">` (no `target="_blank"` for primary app link, matches typical "go to app" UX — will use `target="_blank"` only for the optional gooddollar.org / celo.org links in About).
- Internal nav uses TanStack `<Link>`.
- Header nav pills: on `/` show FAQs + ABOUT; on `/faqs` and `/about` show HOME.
- Reduced-motion respected on the FAQ toggle transitions.
- Mobile-first: container `max-w-[460px] md:max-w-2xl mx-auto px-4`.

## Out of scope (explicit)

No wagmi/RainbowKit/SIWE, no `/dashboard`, no API calls to the app, no iframe of the dapp, no emojis, no gradients/glass.

## Verification

After build: visit `/`, `/faqs`, `/about` in the preview to confirm green shell, fonts loaded, brutalist shadows, accordion +/− toggle behavior, and CTAs link to `https://app.goclaim.xyz`.
