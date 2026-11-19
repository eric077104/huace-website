import { createClient } from "@sanity/client";
import { services, solutions, cases, articles, categories, siteSettings } from "../src/content/seed";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("請設定 NEXT_PUBLIC_SANITY_PROJECT_ID 與 SANITY_API_WRITE_TOKEN。");
const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });
const portableText = (text: string) => text ? [{ _type: "block", _key: "seed-paragraph", style: "normal", markDefs: [], children: [{ _type: "span", _key: "seed-span", text, marks: [] }] }] : [];
const docs = [
  { _id: "siteSettings", _type: "siteSettings", ...siteSettings, defaultSeo: { title: siteSettings.seoTitle, description: siteSettings.seoDescription } },
  { _id: "homePage", _type: "homePage", title: "讓行銷，成為企業的成長系統。", subtitle: "整合策略、內容、成效與 AI 數位應用，協助企業建立更有效率、更具成效的行銷運作方式。", primaryCta: "了解我們的服務", secondaryCta: "洽談合作", positioning: "企業的外部數位行銷與成長合作夥伴。", problemScenarios: ["品牌有產品，但缺乏有效的市場溝通。", "社群持續更新，卻無法帶來有效詢問。", "有廣告預算，缺少策略及數據管理。", "需要短影音，卻無法建立持續製作流程。", "行銷人力有限，需要外部協作。", "想導入 AI，卻不知道從哪些流程開始。"], solutionsIntro: "依企業目標整合策略、內容、媒體與數位工具。" },
  { _id: "aboutPage", _type: "aboutPage", title: "不只完成行銷任務，也建立運作方式。", body: portableText("畫策不只是提供單一行銷服務，而是依企業階段、商業目標及市場需求，整合策略、內容、媒體與數位工具，協助企業建立適合自身的行銷運作模式。"), capabilities: ["連結商業目標", "整合不同專業", "建立可持續流程", "依數據持續優化"] },
  ...services.map((x, i) => ({ ...x, _id: `service-${x.slug}`, _type: "service", slug: { _type: "slug", current: x.slug }, order: i + 1 })),
  ...solutions.map((x, i) => ({ ...x, _id: `solution-${i + 1}`, _type: "solution", slug: { _type: "slug", current: x.name.toLowerCase().replaceAll(" ", "-") }, order: i + 1 })),
  ...cases.map((x, i) => ({ ...x, _id: `case-${x.slug}`, _type: "caseStudy", slug: { _type: "slug", current: x.slug }, order: i + 1, detailEnabled: false })),
  ...categories.map((title, i) => ({ _id: `articleCategory-${i + 1}`, _type: "articleCategory", title })),
  ...articles.map((x) => ({ ...x, _id: `article-${x.slug}`, _type: "article", slug: { _type: "slug", current: x.slug }, category: { _type: "reference", _ref: `articleCategory-${categories.indexOf(x.category) + 1}` }, body: portableText(x.body) })),
];
const transaction = client.transaction();
for (const doc of docs) transaction.createOrReplace(doc as never);
await transaction.commit();
console.log(`已匯入 ${docs.length} 筆初始內容至 ${dataset}。`);
