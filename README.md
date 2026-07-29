# SNKR Shop

A small sneaker storefront built with Next.js, used as a demo app for
[Argos](https://argos-ci.com) visual testing. The interesting part isn't the
shop — it's the Playwright suite that screenshots it and uploads the results to
Argos so visual changes show up as a reviewable diff on every pull request.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
  components (Radix primitives, `class-variance-authority`, `react-twc`)
- [Playwright](https://playwright.dev/) for end-to-end tests
- [`@argos-ci/playwright`](https://argos-ci.com/docs/quickstart/playwright) for
  screenshot capture and upload

Product data is static: [src/assets/data.json](src/assets/data.json) holds the
catalog, and the cart lives in React state via
[CartContext.tsx](src/components/CartContext.tsx) — there is no backend or
database.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Routes:

| Path             | File                                                             |
| ---------------- | ---------------------------------------------------------------- |
| `/`              | [src/app/page.tsx](src/app/page.tsx)                             |
| `/sneakers`      | [src/app/sneakers/page.tsx](src/app/sneakers/page.tsx)           |
| `/sneakers/[id]` | [src/app/sneakers/[id]/page.tsx](src/app/sneakers/[id]/page.tsx) |
| `/cart`          | [src/app/cart/page.tsx](src/app/cart/page.tsx)                   |

## Visual testing

```bash
npx playwright install   # first run only
npx playwright test
```

Playwright starts the dev server itself (see the `webServer` block in
[playwright.config.ts](playwright.config.ts)), so no separate `npm run dev` is
needed.

The suite in [tests/](tests/):

- [screenshot-pages.spec.ts](tests/screenshot-pages.spec.ts) — walks the four
  routes and takes a full-page `argosScreenshot` of each at two viewports:
  `macbook-13` and a 480×860 mobile size.
- [add-to-card.spec.ts](tests/add-to-card.spec.ts) — picks a size, adds the
  sneaker to the cart, asserts the toast, and screenshots that state.
- [open-product-detail.spec.ts](tests/open-product-detail.spec.ts) — checks
  navigation from the list to the detail page.
- [check-cart-content.spec.ts](tests/check-cart-content.spec.ts) — currently
  skipped.

Screenshots are only uploaded when `CI` is set; locally the reporter captures
them without sending anything. Uploads authenticate with `ARGOS_TOKEN`:

```bash
CI=1 ARGOS_TOKEN=<your-token> npx playwright test
```

Chromium runs with `--disable-lcd-text --font-render-hinting=none` so font
rendering stays deterministic between runs — without it, antialiasing noise
produces false-positive diffs.

## CI

[.github/workflows/playwright.yml](.github/workflows/playwright.yml) runs the
suite on pushes and pull requests to `main`/`master`, and uploads the Playwright
HTML report as an artifact.

Argos uploads authenticate with the `ARGOS_TOKEN` repository secret, passed to
the test step.

## Other commands

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```
