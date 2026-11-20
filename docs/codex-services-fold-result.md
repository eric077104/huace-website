# Services block fold result (§12)

Implemented the approved §12 layout for `/services` and the home capabilities section. Service names, summaries, and package content come from the existing Sanity/seed data; the home hero copy is unchanged. Service rows remain a single tracked link with the full Chinese service label exposed through `aria-label`; mobile links route to `/services/<slug>#content`.

## Playwright measurements

Measured with Chromium at the requested viewports (`/home/box/.cache/ms-playwright/chromium-1194/chrome-linux/chrome`). Coordinates are CSS pixels from the top of the document unless marked viewport-relative.

### `/services`, 390 × 844

- Header: 0–56px.
- Compact hero: 56–229px.
- Four 89px rendered rows (the 1px separators make the measured bounds match the spec): 230–319px, 319–408px, 408–497px, 497–586px.
- All four rows fit in the first 844px viewport.
- Mobile packages: all four render. Card bounds: 902–1035px, 1047–1146px, 1158–1260px, 1272–1374px.

### `/services`, 1440 × 900

- Header: 0–64px.
- Compact hero: 64–452px.
- Four service cards: 452–844px. All card bottoms are at 844px, within the 900px fold.

### Home capabilities, 390 × 844

Scrolled to place the sticky 56px header below the viewport top, as in the mockup:

- H2: viewport y=152–231px.
- Four 88px service rows: y=290–378px, 378–466px, 466–554px, 554–642px.
- Section ends at y=738px.
- Clicking a service row resolves to `/services/strategy#content` (same pattern for the other slugs).

## Checks

- `npm run lint` — passed.
- `npx tsc --noEmit` — passed.
- `npm run build` — passed.
