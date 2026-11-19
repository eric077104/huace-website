# Mobile v3 fix round 3 result

## Change

Added `CjkWords` in `src/lib/cjkWords.tsx`. It segments Traditional Chinese text with `Intl.Segmenter('zh-Hant', { granularity: 'word' })` and wraps multi-character CJK word segments in `.cjk-w`. The class only prevents wrapping below 768px; wider layouts retain normal whitespace behavior. Oversized segments can emergency-wrap to avoid forcing horizontal overflow.

Applied the helper to the home H1 and H2s, service detail H1s and H2s, the services page H2s, and service CTA titles. The existing manual `.br-m` breaks are preserved. Service CTA titles keep `開始討論。` together as a preferred unit.

## Verification

- `npm run lint` — passed.
- `npx tsc --noEmit` — passed.
- `npm run build` — passed.
- Loaded `/`, `/services/strategy`, `/services/content`, `/services/performance`, and `/services/ai-digital` in Chromium at 360px and 390px. All ten page/viewport combinations had no document horizontal overflow. All generated CJK heading spans used `white-space: nowrap` and stayed within their heading boxes.
