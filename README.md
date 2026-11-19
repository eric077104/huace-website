# HC 畫策整合行銷官方網站

Next.js App Router、TypeScript、Tailwind CSS 與 Sanity。未設定 Sanity 帳號時，網站以 `src/content/seed.ts` 內的型別化初始內容運作；Sanity 已設定時，服務、方案、案例、文章與網站設定由 CMS 提供。管理介面位於 `/studio`。

## 本機開發

需求：Node.js 20 或更新版本、npm。複製 `.env.example` 為 `.env.local`；未串接第三方服務時可保留空值。

```sh
npm install
npm run dev
```

正式檢查：`npm run lint`、`npm run typecheck`、`npm run build`。

## 環境變數及帳號

| 變數 | 用途／帳號 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 正式網站網址；Vercel 專案設定，供 canonical、sitemap 與結構化資料使用 |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 專案 ID；Sanity 管理帳號 |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset，通常為 `production` |
| `SANITY_API_READ_TOKEN` | 可讀取草稿或私有 dataset 時使用；Sanity API token，僅伺服器端 |
| `SANITY_API_WRITE_TOKEN` | 匯入初始資料及儲存表單詢問；Sanity Editor 權限 token，僅伺服器端 |
| `RESEND_API_KEY` | 表單通知寄信；Resend 帳號 |
| `CONTACT_TO_EMAIL` | 接收詢問的公司信箱，由網站管理者設定 |
| `CONTACT_FROM_EMAIL` | Resend 已驗證網域上的寄件地址 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | 表單反垃圾驗證的公開 Site Key；Cloudflare 帳號 |
| `TURNSTILE_SECRET_KEY` | Turnstile 私密驗證金鑰；Cloudflare 帳號，僅伺服器端 |
| `NEXT_PUBLIC_GA4_ID` | GA4 Measurement ID；Google Analytics 帳號 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID；Meta Business 帳號 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads 轉換 ID；Google Ads 帳號 |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Google Ads 轉換標籤；Google Ads 帳號 |

所有 `NEXT_PUBLIC_` 值會送至瀏覽器，僅可放公開 ID，絕不可放 token 或密鑰。第三方帳號與正式網域應由公司持有。

## 建立 Sanity 專案與匯入

1. 以公司持有的 Sanity 帳號建立專案與 `production` dataset。
2. 複製 Project ID、建立 API token，設定於本機 `.env.local`。Studio 的編輯人員應使用 Sanity 登入與角色權限管理。
3. 啟動網站後開啟 `/studio`，以 Sanity 帳號登入並依畫面引導授權。
4. 要匯入初始服務、方案、案例占位項目、分類及網站設定，執行 `npm run sanity:seed`。
5. 網站讀取 CMS 時會以 CMS 資料為準；若未設定 Project ID，使用 repo seed。正式環境建議在 Vercel 設定 Sanity ID、dataset 與必要 token。

## CMS 編輯指南

登入 `/studio` 後，左側選單以中文顯示內容類型。先在「網站設定」更新品牌名稱、公司名稱、聯絡方式、LINE／社群連結、預設 SEO 與 Insights 顯示開關。首頁文字在「首頁內容」，About 內容在「About 頁面」。服務領域可編輯定位、解決問題、內容、對象、執行方式及搭配服務；整合方案可調整名稱及說明。案例只有取得公開授權並確認專案資訊後才填真實內容，初始項目明確標示為占位。文章先建立分類，再新增文章、填寫 SEO 與發布日期；Insights 開關關閉時，導覽與頁面會隱藏。編輯後使用 Publish 發布；未發布草稿不應視為正式網站內容。

## Vercel 部署

將 Git repository 匯入公司持有的 Vercel 帳號，使用 Next.js 預設建置設定。於 Vercel Project Settings → Environment Variables 填入正式環境所需變數，再部署。設定正式網址 `NEXT_PUBLIC_SITE_URL` 及 DNS；部署後提交 `/sitemap.xml` 至 Google Search Console，並確認 GA4、表單通知及 Turnstile。開發、Preview、Production 的憑證應分開設定。

## 內容與上線前素材

目前採文字 wordmark 與中性色設計 token（`src/app/globals.css`）。上線前請公司提供正式 Logo、品牌色、Email／電話／LINE、可公開案例與影像、隱私告知及政策內容，並建立公司持有的 Sanity、Vercel、Resend、Cloudflare、GA4、Meta 與 Google Ads 帳號（依使用需求）。
