# Icon fixes result

- Replaced the incorrect Threads squiggle with the Simple Icons Threads logo path in a 24×24 inline SVG using `currentColor`.
- Replaced the LINE button's green dot with the supplied `public/brand/line-logo-source.png`, displayed at 24×24 with rounded corners. Reusing the supplied PNG avoids introducing a second asset while keeping it crisp at the button's display size.
- The LINE label was invisible on the light contact page because `.line-button` always used `--on-dark-1` (`#F9FAFB`), regardless of its background. The contact section is light, so the label had almost no contrast. `.contact-line .line-button` now uses the light text color and a subtle light-surface border/background. Footer buttons retain their existing light text on the dark footer.
- Kept `line_click` tracking and the mobile v3 footer LINE pill behavior.

## Verification

- `npm run lint` — passed with no warnings.
- `npx tsc --noEmit` — passed.
- `npm run build` — passed.
