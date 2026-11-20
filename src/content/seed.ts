import type { AboutPageContent, Article, CaseStudy, HomePageContent, Service, SiteSettings, Solution } from "./types";

export const services: Service[] = [
  { slug: "strategy", number: "01", name: "Strategy", label: "策略", title: "先看清方向，再讓每一步投入都更有意義。", summary: "釐清品牌定位、市場脈絡與行銷目標，整理出可執行的溝通與行銷方向。", problems: ["品牌定位與市場溝通不一致", "行銷活動很多，卻缺少共同目標", "需要外部視角梳理下一步"], items: ["品牌策略與品牌定位", "行銷策略規劃", "市場與競爭分析", "行銷企劃", "社群策略", "數位行銷顧問", "企業行銷診斷", "行銷專案規劃"], audience: "正在調整品牌方向、準備拓展市場，或需要建立行銷節奏的企業。", method: "先理解商業目標與現況，再整理市場洞察、溝通主軸與執行優先順序。", pair: ["content", "performance"] },
  { slug: "content", number: "02", name: "Content", label: "內容與創意", title: "讓品牌被看見，也讓每一次溝通留下印象。", summary: "依品牌方向規劃影像與影音內容，建立一致且可持續執行的品牌表達。", problems: ["有產品優勢，卻難以轉化成有感內容", "需要短影音，但沒有穩定製作流程", "品牌素材分散，溝通風格不一致"], items: ["品牌影像製作", "商業攝影／商品攝影", "人物及企業形象攝影", "短影音企劃與製作", "社群影音內容", "Reels、TikTok 短影音", "影片剪輯及後製", "創意企劃", "視覺設計及行銷素材"], audience: "希望建立品牌辨識、穩定產出內容，或強化產品與服務溝通的團隊。", method: "從受眾與溝通目的開始，規劃腳本、拍攝、製作及內容延伸運用。", pair: ["strategy", "performance"] },
  { slug: "performance", number: "03", name: "Performance", label: "成效行銷", title: "把媒體預算放進可追蹤、可學習的循環。", summary: "結合媒體規劃、素材測試與數據回顧，持續檢視投放表現並調整方向。", problems: ["有廣告預算，卻看不清成效來源", "素材與受眾缺乏持續測試", "流量增加，詢問品質沒有改善"], items: ["Meta Ads 廣告代操", "Google Ads", "TikTok Ads", "小紅書行銷及廣告（依專案與平台可行性）", "廣告策略及投放規劃", "廣告素材策略", "廣告數據分析", "成效追蹤及優化", "Conversion／Lead Generation", "社群及數位媒體整合"], audience: "需要規劃媒體投放、改善轉換路徑，或建立數據回顧機制的企業。", method: "確認目標與追蹤設定，規劃受眾及素材，依數據持續檢視與調整。", pair: ["strategy", "content"] },
  { slug: "ai-digital", number: "04", name: "AI & Digital", label: "AI 與數位應用", title: "從真正耗時的流程開始，讓工具回到工作現場。", summary: "依團隊的實際工作流程，評估適用工具與自動化方式，協助導入與應用。", problems: ["知道 AI 很重要，卻不知道從何開始", "重複作業佔去團隊太多時間", "工具很多，資料與流程仍然分散"], items: ["AI 行銷應用", "AI 影音及內容工作流程", "AI 行銷工具導入", "行銷流程自動化", "企業數位化顧問", "AI 教育訓練及企業課程", "工作流程及系統整合", "客製化工具或軟體開發（依專案）", "數位營運效率改善"], audience: "想改善行銷營運效率、培養團隊能力，或評估數位工具應用的企業。", method: "從任務與流程盤點開始，選擇合適工具、建立使用方式並協助團隊上手。", pair: ["strategy", "content"] }
];

export const solutions: Solution[] = [
  { name: "Brand Growth", label: "品牌成長", parts: "品牌策略＋內容＋媒體投放", desc: "從定位與訊息出發，串起內容溝通與媒體觸及。" },
  { name: "Content Engine", label: "內容引擎", parts: "內容策略＋攝影＋短影音", desc: "建立能持續運轉的內容規劃與製作節奏。" },
  { name: "Performance Marketing", label: "成效行銷", parts: "廣告策略＋素材＋數據優化", desc: "用測試與回顧，逐步校準投放方向。" },
  { name: "AI Marketing Workflow", label: "AI 行銷流程", parts: "AI 工具＋流程設計＋教育訓練", desc: "將工具放進實際工作流程，讓團隊能持續運用。" }
];

export const cases: CaseStudy[] = [{ slug: "case-placeholder", name: "案例內容準備中", category: "精選案例", tags: ["Strategy", "Content"], description: "案例將於取得公開授權並確認專案內容後更新。", placeholder: true }];
export const categories = ["品牌策略", "內容與創意", "成效行銷", "AI 與數位應用"];
export const articles: Article[] = [{ slug: "insights-coming-soon", title: "Insights 內容準備中", category: "品牌策略", excerpt: "文章將於內容確認後發布。", publishedAt: "2026-11-19", body: "" }];
export const siteSettings: SiteSettings = { companyName: "畫策整合行銷", brandName: "畫策整合行銷", email: "chunk.huace@gmail.com", phone: "", lineUrl: "https://lihi1.cc/8QRPx", lineId: "@950mcddk", facebookUrl: "https://www.facebook.com/HuaCE.online", instagramUrl: "https://www.instagram.com/hc.digital.tw/", threadsUrl: "https://www.threads.com/@hc.digital.tw", socialUrl: "", privacyNotice: "個資告知內容將於確認後提供。", insightsEnabled: false, seoTitle: "畫策整合行銷｜讓行銷策略、內容與投放，朝同一個成長目標前進。", seoDescription: "整合行銷策略、品牌內容、數位廣告與 AI 數位應用，協助企業建立可持續運作的行銷成長系統。", defaultSeo: { title: "畫策整合行銷｜讓行銷策略、內容與投放，朝同一個成長目標前進。", description: "整合行銷策略、品牌內容、數位廣告與 AI 數位應用，協助企業建立可持續運作的行銷成長系統。" } };

export const homePage: HomePageContent = {
  title: "讓行銷策略、內容與投放，朝同一個成長目標前進。",
  subtitle: "畫策整合行銷，從企業目標出發，整合品牌策略、內容製作、成效行銷與 AI 數位應用，協助團隊把行銷工作規劃得更清楚、執行得更連貫。",
  primaryCta: "了解我們的服務",
  secondaryCta: "洽談合作",
  positioning: "企業的外部數位行銷與成長合作夥伴。",
  problemScenarios: ["品牌有產品，但缺乏有效的市場溝通。", "社群持續更新，卻無法帶來有效詢問。", "有廣告預算，缺少策略及數據管理。", "需要短影音，卻無法建立持續製作流程。", "行銷人力有限，需要外部協作。", "想導入 AI，卻不知道從哪些流程開始。"],
  solutionsIntro: "依企業目標整合策略、內容、媒體與數位工具。",
};
export const aboutPage: AboutPageContent = {
  title: "不只完成行銷任務，也建立運作方式。",
  body: "畫策整合行銷不只是提供單一行銷服務，而是依企業階段、商業目標及市場需求，整合策略、內容、媒體與數位工具，協助企業建立適合自身的行銷運作模式。",
  capabilities: ["連結商業目標", "整合不同專業", "建立可持續流程", "依數據持續優化"],
};
