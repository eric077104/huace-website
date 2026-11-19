# Mobile v3 implementation result

Implemented the v3 mobile layouts for screens below 768px, including the simplified home sections and service pages, the CMS-backed contact alternatives, and mobile-only collapse controls for service scope and optional contact fields. The home hero uses the quiet mobile field parameters and calm loop behavior. Footer social and LINE links preserve their tracking events and only render when configured.

Files changed:
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/services/[slug]/page.tsx`
- `src/app/contact/page.tsx`
- `src/components/ContactForm.tsx`
- `src/components/HeroField.tsx`
- `src/components/Sections.tsx`
- `src/components/SiteChrome.tsx`
- `src/components/MobilePackageMore.tsx`
- `src/components/ServiceScopeList.tsx`

Spec rows not implemented: none.

Checks: `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed.
