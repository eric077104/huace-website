# Mobile v3 QA fixes

All visual overrides are scoped to `@media (max-width: 767px)`; desktop and tablet layouts are unchanged.

1. **Contact form surface:** Explicitly set the contact grid container to `#F9FAFB` with dark text, preserving readable labels/privacy copy and blue `.m-contact-alt` links.
2. **Optional contact fields:** Mobile flex ordering places the optional toggle directly after the need type control, with company, budget, and start time grouped immediately after it. The desktop DOM order, payload, and zod schema are unchanged.
3. **Contact hero:** Hide the HeroField canvas on mobile and reduce hero vertical spacing so the form begins higher in the viewport.
4. **CTA pills:** Kept mobile CTA buttons auto width with 28px horizontal padding and a 50px height.
5. **Service CTA title:** Reduced the mobile CTA title to 30px and prevented wrapping to keep service labels on one line at 390px.
6. **Service H1 breaks:** Split service titles at the first full-width comma and inserted a mobile-only break, allowing the remaining title to balance naturally.
7. **Service hero visualization:** Increased mobile canvas brightness/contrast and the visualization background contrast.
8. **Package composition:** Removed the first bullet on mobile, rendered separators as cyan full-width plus signs, and balanced the package aside copy within 300px.

Verification: lint, TypeScript, and production build results are recorded in the commit summary.
