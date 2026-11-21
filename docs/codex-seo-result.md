# SEO metadata 補齊結果

## 頁面 metadata

各頁 `og:image` 均為 `https://www.huace.asia/brand/og-image.png`；各頁亦有 `twitter:card=summary_large_image`。以下標題為輸出的 `og:title` 與 HTML title。

| 頁面 | 最終 title |
| --- | --- |
| `/` | 畫策整合行銷｜讓行銷策略、內容與投放，朝同一個成長目標前進。 |
| `/about` | 關於我們｜畫策整合行銷 |
| `/services` | 服務項目｜策略、內容、成效與 AI 數位應用｜畫策整合行銷 |
| `/contact` | 洽談合作｜畫策整合行銷 |
| `/services/strategy` | 策略服務｜畫策整合行銷 |
| `/services/content` | 內容與創意服務｜畫策整合行銷 |
| `/services/performance` | 成效行銷服務｜畫策整合行銷 |
| `/services/ai-digital` | AI 與數位應用服務｜畫策整合行銷 |

## 修改檔案

- `src/lib/pageMetadata.ts`：共用 metadata helper，完整帶入 Open Graph 與 Twitter 欄位。
- `src/app/layout.tsx`：共用 Open Graph、Twitter、metadataBase 設定。
- `src/app/page.tsx`、`src/app/about/page.tsx`、`src/app/services/page.tsx`、`src/app/contact/page.tsx`、`src/app/services/[slug]/page.tsx`：指定頁面標題與圖片 metadata。
- `src/app/cases/[slug]/page.tsx`、`src/app/insights/[slug]/page.tsx`：動態頁面也保留完整分享 metadata。
- `public/brand/og-image.png`：1200×630 品牌分享圖，內容僅品牌名與首頁標語。
- `docs/codex-seo-result.md`：本結果摘要。

Canonical URL 仍依各頁原路徑輸出，sitemap 與 robots 檔案未修改；sitemap 的 `lastModified` 保留原設定。

## 驗證

- `npm run lint`：成功。
- `NEXT_PUBLIC_SITE_URL=https://www.huace.asia NODE_OPTIONS=--max-old-space-size=8192 npm run build`：成功（Next.js 15.5.29）。
- 已檢查 `.next/server/app` 的八頁輸出：皆有 `og:title`、絕對網址 `og:image`、`twitter:card=summary_large_image`；canonical 為 `https://www.huace.asia` 加上頁面路徑。
