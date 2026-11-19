# Mobile v3 QA fix pass 2

Implemented the second mobile-only QA pass for screens below 768px.

- Service CTA headings wrap instead of clipping, with a preferred break after 「開始」. The primary CTA pill is content-width, centered, and 50px tall with 28px horizontal padding.
- Service H1s use 40px type, break after the title delimiter, and keep 「追蹤」 together while applying strict CJK punctuation wrapping.
- The package intro aside keeps CJK phrases together.
- Reduced contact hero vertical padding; at 390×844, 「需求類型」 starts at 772px.
- Increased the service hero pixel grid’s blue density and added a subtle single white cell.

## Verification

- `npm run lint` — passed
- `npx tsc --noEmit` — passed
- `npm run build` — passed
- Chrome viewport checks at 360px and 390px: all four service H1s and CTA titles fit without horizontal overflow; CTA pill is 146×50px and centered.
- Chrome contact check at 390×844: 「需求類型」 is visible above the fold.
- Desktop and tablet rules were not changed; CSS additions are under `@media (max-width: 767px)`.
