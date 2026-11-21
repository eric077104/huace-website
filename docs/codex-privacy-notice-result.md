# 個人資料蒐集告知更新結果

- 修改檔案：`src/components/ContactForm.tsx`、`src/app/contact/page.tsx`、`src/app/globals.css`、`package.json`。
- 告知全文放在 `/contact` 聯絡表單內、同意勾選欄位上方，完整顯示並可在窄螢幕換行閱讀；網站沒有獨立隱私權頁面。
- 同意勾選文字已更新為「我已閱讀並了解以上個人資料蒐集告知事項。」
- lint：`npm run lint` 成功（掃描 `src`，排除生成產物）。
- build：`NODE_OPTIONS=--max-old-space-size=8192 npm run build` 成功；Next.js 15.5.29 production build 完成，`/contact` 靜態產生。
