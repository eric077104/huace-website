已完成並提交，commit 為 `a34c881`（`Add LINE official account contact`）。

- Sanity site settings 新增可編輯的 `lineUrl`、`lineId`；seed 設為 `https://lihi1.cc/8QRPx`、`@950mcddk`、`chunk.huace@gmail.com`，電話留空並隱藏未設定的列。
- 聯絡頁、頁尾、CTA 面板與手機選單加入「加入 LINE 官方帳號」按鈕；聯絡表單仍可正常使用。
- LINE 點擊送出 GA4 `line_click`，並觸發 Meta Pixel 標準 `Contact` 事件；已更新追蹤文件。
- `npm run lint`、`npm run typecheck`、`npm run build` 均通過。

工作目錄另有未提交的 `docs/` 檔案，未納入此次提交。