# Brand name unification result

Updated visible brand references to **畫策整合行銷**.

## Replaced locations

- `src/content/seed.ts`: set `brandName` and `companyName` to 畫策整合行銷; changed the default SEO title, homepage subtitle, and About page body to use the unified name.
- `src/app/layout.tsx`: changed the title template suffix to 畫策整合行銷; the Open Graph `siteName` continues to use the CMS `brandName` setting.
- `src/app/insights/page.tsx`: changed the SEO description and category fallback to use the full brand name.
- `src/app/contact/page.tsx`: changed the SEO description to use the full brand name.
- `src/app/not-found.tsx`: changed the page description to use the full brand name.
- `src/app/services/page.tsx`: changed the SEO description to use the full brand name.
- `src/app/page.tsx`: changed the visible homepage badge to 畫策整合行銷; Organization JSON-LD now uses the brand as `name` and the registered company name as `legalName`.
- `src/app/about/page.tsx`: changed the About eyebrow and fallback SEO description, and changed Organization JSON-LD `name`; retained the registered company name only in JSON-LD `legalName`.
- `src/app/insights/[slug]/page.tsx`: changed the Article publisher JSON-LD `name` to the brand; kept the registered company name in `legalName`.
- `src/app/services/[slug]/page.tsx`: changed the Open Graph title suffix and Service provider JSON-LD `name`; kept the registered company name in `legalName`.
- `src/components/SiteChrome.tsx`: changed desktop/mobile logo `aria-label` and `alt`, the About link, and desktop/mobile footer copyright to use `brandName` from settings.
- `src/components/SocialLinks.tsx`: changed social link accessible labels to use 畫策整合行銷.
- `sanity/schemas/types.ts`: set initial values for `brandName` and `companyName` to 畫策整合行銷.

Logo artwork and the footer signature `HC / HUACE — DIGITAL GROWTH PARTNER` were left unchanged.

## Validation

- `rg -n "畫策管理顧問有限公司|HC 畫策|畫策整合行銷 HC" src`: the legal company name remains only as `legalName` in JSON-LD.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
