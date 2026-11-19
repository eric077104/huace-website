# 追蹤事件

網站透過 `NEXT_PUBLIC_GA4_ID` 啟用 Google Analytics 4；Meta Pixel 與 Google Ads 為選用設定。未設定 ID 時不載入相應追蹤程式。

| 事件 | 觸發時機 | 參數 |
| --- | --- | --- |
| `contact_form_submit` | 合作表單成功提交 | 無個資 |
| `click_email` | 點擊 Email 連結 | 無 |
| `click_phone` | 點擊電話連結 | 無 |
| `line_click` | 點擊「加入 LINE 官方帳號」連結 | GA4 自訂事件；Meta Pixel 標準 `Contact` 事件 |
| `cta_click` | 點擊主要洽談或服務 CTA | `cta_name` |
| `service_page_view` | 開啟服務詳細頁 | `service_name` |
| `case_study_view` | 開啟案例詳細頁 | `case_name` |

不要將姓名、Email、電話、需求文字等個人資料送入分析平台。GA4 與廣告轉換需由網站管理員在各平台完成帳戶、資料串流及轉換動作設定。
