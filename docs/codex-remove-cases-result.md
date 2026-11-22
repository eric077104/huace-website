# Remove case study section result

## Files changed

- `src/app/page.tsx`
- `src/components/Sections.tsx`
- `src/app/globals.css`
- `docs/codex-remove-cases-result.md`

## Changes

Removed the homepage “Selected work / 讓策略走進真實專案。” section and its `CaseFeature` import. Deleted the unused `CaseFeature` component and its `Image`, seed case, and `getCases` imports. Removed the section's case card, placeholder, and responsive CSS rules. No homepage header, footer, mobile menu, CTA, or JSON-LD references to `#work` or the case section remained.

The `/cases/[slug]` route, sitemap case logic, and Sanity `getCases` function are unchanged.

## Spacing and background

No fix was needed. The remaining solutions section is white and the CTA is dark; the CTA band has no top padding, so the transition remains clean without stacked section padding.

## Checks

- `npm run lint` — passed.
- `npm run build` — passed; Next.js compiled and generated all 16 static pages, including the cases route.
