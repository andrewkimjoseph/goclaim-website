# GoClaim Marketing Site

Static marketing website for **GoClaim** at [goclaim.xyz](https://goclaim.xyz). Explains the product and routes users to the dapp at [app.goclaim.xyz](https://app.goclaim.xyz) to connect their wallet and set up autopilot claiming.

This site is **not** the dapp. It's a brutalist-styled 3-page marketing surface that visually matches the live product.

## Pages

- `/` — Landing: hero, primary CTAs, "How it works" steps
- `/faqs` — 8-item accordion with FAQPage JSON-LD
- `/about` — Product and technology overview

## Design

- Brutalist UI: 2px hard borders, hard shadows, no soft radii
- Shell green background (`#085020`), watermelon red primary (`#F83028`)
- Typography: Bricolage Grotesque (display) + Hanken Grotesk (body)
- Watermelon logo used in header and favicon
- Responsive: stacked mobile, multi-column tablet grids, split hero + 2-column desktop

## Stack

- TanStack Start v1 (React 19, file-based routing in `src/routes/`)
- Vite 7
- Tailwind CSS v4 (tokens in `src/styles.css`)

## Develop

```bash
bun install
bun dev
```

## Structure

```text
src/
  routes/
    __root.tsx      # fonts, favicon, theme color
    index.tsx       # landing
    faqs.tsx        # FAQ accordion + JSON-LD
    about.tsx       # about cards
  components/
    Shell.tsx       # page shell wrapper
    Header.tsx      # logo + nav
    Footer.tsx      # footer
    Step.tsx        # "how it works" step card
    Faq.tsx         # accordion item
  styles.css        # brutalist tokens + utility classes
public/
  brand/watermelon.png
```

All primary CTAs link to `https://app.goclaim.xyz`.