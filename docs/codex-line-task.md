# Add LINE Official Account as the primary contact channel
LINE link (from the current site): https://lihi1.cc/8QRPx  (redirects to https://lihi1.cc/8QRPx, LINE ID @950mcddk)
Email from the current site: chunk.huace@gmail.com
Do:
1. Add CMS-editable fields (Sanity site settings) lineUrl and lineId, with seed defaults above; set seed contact email to chunk.huace@gmail.com. Keep phone unset (hide row).
2. Add a prominent "加入 LINE 官方帳號" button (opens lineUrl in new tab, rel="noopener") in: Contact page left column (with LINE ID @950mcddk shown), footer Contact column, the home/service CTA panel as secondary action, and the mobile menu. Style per /workspace/hc-design/DESIGN-SPEC.md (no icon packs; a small text label or pixel mark is fine; LINE green #06C755 allowed only for this button's small dot/accent if needed).
3. Contact form keeps working; LINE is an alternative channel, not a replacement.
4. Track clicks as a "line_click" event via the existing analytics helper (GA4 + Meta Pixel Contact event); document it in docs/tracking-events.md.
5. lint, typecheck, build; commit "Add LINE official account contact".
